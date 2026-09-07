/* ═══════════════════════════════════════════════════════════════════════════
   optimize-images.mjs — bring public/Images down to a weight a phone can load.

   THE PROBLEM THIS SOLVES
   -----------------------
   The game case studies ship their captures at the resolution they were taken
   at: 2943x1613 PNGs, seven to nine megabytes each. A single case-study page
   references ten to twelve of them, so opening one asked the browser for
   somewhere between sixty and eighty megabytes of PNG — for a gallery whose
   cards are 540 CSS px wide and a lightbox that never draws past the viewport.
   On a phone on mobile data that is not a slow page, it is a page that does not
   arrive.

   WHAT IT DOES
   ------------
   Resizes any raster in public/Images wider than MAX_W down to MAX_W and
   re-encodes it in place, keeping the original format and filename so not one
   `src` anywhere in the codebase has to change. Nothing is deleted and nothing
   is renamed; the pre-resize originals stay in git history if a full-resolution
   copy is ever needed again.

   WHY 1920 AND NOT 1600
   ---------------------
   The widest thing any of these images has to fill is the lightbox, which is
   the viewport. 1600 was measurably smaller and visibly soft on a 2560px
   desktop; 1920 still takes a 8.8 MB capture to about 0.74 MB, which is a 92%
   cut, and leaves the largest common desktop viewport served at 1:1.

   SAFE TO RE-RUN
   --------------
   Idempotent: a file already at or under MAX_W is skipped untouched, so a
   second run reports zero work rather than degenerating the images a second
   time. Run it after dropping new screenshots in:

       node scripts/optimize-images.mjs           # do it
       node scripts/optimize-images.mjs --dry-run # just report
   ═══════════════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const ROOT = 'public/Images';
const MAX_W = 1920;
/* Bytes per pixel above which a PNG is worth re-deflating in place. A tightly
   packed capture lands around 0.2-0.35 B/px; anything past 0.45 was written by
   an exporter that did not try. */
const BPP_FLOOR = 0.45;
const DRY = process.argv.includes('--dry-run');
const FORCE_UNTRACKED = process.argv.includes('--include-untracked');

/**
 * Only rewrite files git already has a copy of.
 *
 * This resizes in place, which means the original is gone from disk the moment
 * it succeeds. For a committed file that is fine - `git checkout` brings it
 * straight back. For an UNTRACKED file it is not: a screenshot dropped into the
 * folder ten minutes ago and not yet committed has no other copy anywhere, and
 * shrinking it would be an irreversible edit to something the author has not
 * even looked at in the site yet.
 *
 * So untracked rasters are skipped by default and reported at the end. Commit
 * them (or pass --include-untracked, deliberately) to have them optimised.
 */
function trackedSet() {
  try {
    const out = execFileSync('git', ['ls-files', '-z', '--', ROOT], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
    /* git prints forward slashes on every platform; normalise the walker's
       output the same way before comparing. */
    return new Set(out.split('\0').filter(Boolean));
  } catch {
    console.warn('git not available - treating every file as untracked (nothing will be rewritten)');
    return new Set();
  }
}

/* Formats worth resizing. Everything else (svg, ico, webmanifest) is left be:
   an SVG has no pixel width to cap and an .ico is already tiny. */
const RASTER = /\.(png|jpe?g|webp)$/i;

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (RASTER.test(e.name)) out.push(p);
  }
  return out;
}

const mb = (n) => (n / 1048576).toFixed(2);

const files = (await walk(ROOT)).sort();
const tracked = trackedSet();
let touched = 0, before = 0, after = 0, skipped = 0, failed = 0, untracked = 0;
let totalBefore = 0;
const untrackedBig = [];

for (const file of files) {
  const sizeBefore = (await stat(file)).size;
  totalBefore += sizeBefore;

  const gitPath = file.split(path.sep).join('/');
  const isTracked = tracked.has(gitPath);

  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch {
    console.warn(`unreadable  ${file}`);
    failed++;
    continue;
  }

  /* A file already within the width cap can still be far heavier than its own
     pixels justify. A lot of these were exported by tools that write PNG at a
     low compression level: `kamba-adeema/cover.png` was 2.53 MB for 1024x1024
     - two and a half bytes per pixel - and re-deflating the exact same pixels
     at effort 10 brought it to 0.67 MB. That is a 73% saving with no resize and
     no quality loss of any kind, so it is worth doing to everything rather than
     only to the oversized files.

     BPP_FLOOR skips the ones already tight enough that a re-encode would cost
     more CPU than it saves bytes. */
  const needsResize = !!meta.width && meta.width > MAX_W;
  const bpp = meta.width && meta.height ? sizeBefore / (meta.width * meta.height) : 0;
  const worthRecompressing = meta.format === 'png' && bpp > BPP_FLOOR;

  if (!needsResize && !worthRecompressing) { skipped++; continue; }

  if (!isTracked && !FORCE_UNTRACKED) {
    untracked++;
    untrackedBig.push(`${gitPath}  (${meta.width}x${meta.height}, ${mb(sizeBefore)} MB)`);
    continue;
  }

  if (DRY) {
    console.log(
      `would ${needsResize ? 'resize' : 'repack'} ${file}  ${meta.width}x${meta.height}  ${mb(sizeBefore)} MB`
    );
    touched++;
    before += sizeBefore;
    continue;
  }

  /* Encode to a sibling temp file, then swap. Writing straight over the input
     while sharp still has it open truncates the source mid-read on Windows and
     leaves a zero-byte image with no error. */
  const tmp = `${file}.opt.tmp`;
  try {
    /* A file inside the width cap that only needs repacking keeps its exact
       pixels - no resize step at all, so the result is bit-for-bit the same
       image in a smaller container. */
    const loaded = sharp(file);
    const pipeline = needsResize
      ? loaded.resize({ width: MAX_W, withoutEnlargement: true })
      : loaded;

    if (meta.format === 'png') {
      /* Full-colour, not palette: these are 3D renders with long gradients and
         256 colours bands them visibly in the sky. Palette mode measured the
         same size here anyway, so there was nothing to buy. */
      await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(tmp);
    } else if (meta.format === 'webp') {
      await pipeline.webp({ quality: 86, effort: 6 }).toFile(tmp);
    } else {
      await pipeline.jpeg({ quality: 86, mozjpeg: true, progressive: true }).toFile(tmp);
    }

    const sizeAfter = (await stat(tmp)).size;

    /* Refuse a swap that would make the file bigger — a small, already-tight
       source occasionally re-encodes heavier, and shipping that would be a
       regression dressed as an optimisation. */
    if (sizeAfter >= sizeBefore) {
      await unlink(tmp);
      skipped++;
      continue;
    }

    await rename(tmp, file);
    touched++;
    before += sizeBefore;
    after += sizeAfter;
    console.log(
      needsResize
        ? `resized  ${file.padEnd(56)} ${meta.width}px → ${MAX_W}px  ${mb(sizeBefore)} → ${mb(sizeAfter)} MB`
        : `repacked ${file.padEnd(56)} ${meta.width}px kept     ${mb(sizeBefore)} → ${mb(sizeAfter)} MB`
    );
  } catch (err) {
    await unlink(tmp).catch(() => {});
    console.error(`FAILED  ${file}: ${err.message}`);
    failed++;
  }
}

console.log('\n────────────────────────────────────────────');
console.log(`scanned      ${files.length} files, ${mb(totalBefore)} MB`);
console.log(`${DRY ? 'would resize' : 'resized     '} ${touched} files`);
if (!DRY && touched) {
  console.log(`those files  ${mb(before)} MB → ${mb(after)} MB  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`);
  console.log(`library now  ${mb(totalBefore - before + after)} MB`);
}
/* ═══════════════════════════════════════════════════════════════════════════
   PASS TWO — card-sized variants for the gallery marquees.

   The case-study galleries draw each capture into a 540x296 card on desktop and
   a 300x164 one on a phone. Handing those a 1920px file is between three and
   six times more pixels than the card can show, and there are ten of them per
   page: scrolling to the gallery pulled about six megabytes to fill a strip of
   thumbnails.

   So every capture also gets a `<name>-card.png` at CARD_W, and the gallery
   <img> points at that while the card's own `data-full` keeps pointing at the
   full-size file for the lightbox. 1100px covers a 540px card at DPR 2 and a
   300px one at DPR 3, which is the widest either gets.

   Everything under `public/Images/projects/` is walked, AT ANY DEPTH - several
   galleries keep their captures a level further down (`vebuild/block/`,
   `funxt/desktop/`, `funxt/mobile/`, `lottogram/Mobile/`), and a first version
   of this that matched only `projects/<game>/*.png` silently left those pages
   loading full-size files into 540px cards. VeBuild was still pulling 9 MB.

   Covers, wordmarks and anything already suffixed are left out - a `-thumb` is
   a thumbnail already and a cover is drawn full-bleed.
   ═══════════════════════════════════════════════════════════════════════════ */
const CARD_W = 1100;
/**
 * …and a height cap, which the first version of this did not have.
 *
 * The UI/UX case studies show FULL-PAGE site captures - VeBuild's are 1600x2834
 * - so capping width alone still left a card variant carrying two million
 * pixels, and VeBuild's gallery was still pulling 7.5 MB. The cards those go
 * into are 540x340 with `object-fit: cover; object-position: top`, so only the
 * top of a tall capture is ever on screen; the rest is being downloaded to be
 * cropped away.
 *
 * 1500 keeps a tall capture legible when it IS the whole card and takes the
 * worst of them to about a third of the pixels. `fit: inside` rather than a
 * crop, so nothing is thrown away that the lightbox might have wanted - the
 * lightbox reads `data-full`, which still points at the full-size file.
 */
const CARD_H = 1500;
const CARD_SUFFIX = '-card';
/**
 * Basenames that get no card variant.
 *
 * Only the ones that ARE already a small variant. Anchored at the end, because
 * an unanchored `-card` also matched `result-card.png` - a legitimate capture
 * whose name happens to end in the suffix - and silently denied it the variant
 * the gallery then asked for.
 *
 * `cover` and `logo` are NOT excluded, though the first version of this did
 * exclude them on the reasoning that a cover is drawn full-bleed. That is true
 * of the hero banner, which reads `cover.png` directly and still gets the
 * full-size file - but several galleries ALSO put the cover and the wordmark in
 * a marquee card, and those were loading a 1600x1600 file into a 540x296 box.
 */
const NOT_CARDED = /(-thumb|-card)$/i;

let cards = 0, cardsKept = 0, cardBytes = 0;
for (const file of files) {
  const rel = file.split(path.sep).join('/');
  const m = rel.match(/^public\/Images\/projects\/.+\/([^/]+)\.png$/i);
  if (!m) continue;
  if (NOT_CARDED.test(m[1])) continue;

  const out = file.replace(/\.png$/i, `${CARD_SUFFIX}.png`);

  let src;
  try {
    src = await sharp(file).metadata();
  } catch { continue; }
  if ((src.width ?? 0) <= CARD_W && (src.height ?? 0) <= CARD_H) { cardsKept++; continue; }

  /* An existing card is reused only if it already honours BOTH caps. That is
     what lets a cap be tightened here and picked up on the next run instead of
     needing the whole set deleted by hand. */
  if (files.includes(out)) {
    try {
      const have = await sharp(out).metadata();
      if ((have.width ?? 0) <= CARD_W && (have.height ?? 0) <= CARD_H) { cardsKept++; continue; }
    } catch { /* unreadable - fall through and rewrite it */ }
  }

  if (DRY) { console.log(`would card ${out}`); cards++; continue; }

  try {
    await sharp(file)
      .resize({ width: CARD_W, height: CARD_H, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(out);
    cardBytes += (await stat(out)).size;
    cards++;
  } catch (err) {
    console.error(`FAILED card ${out}: ${err.message}`);
    failed++;
  }
}

if (cards || cardsKept) {
  console.log(
    `\ncard variants ${DRY ? 'to write' : 'written'}: ${cards}` +
      (cards && !DRY ? `  (${mb(cardBytes)} MB total, ~${Math.round(cardBytes / cards / 1024)} KB each)` : '') +
      `, ${cardsKept} already present or small enough`
  );
}

console.log(`left alone   ${skipped} files (already ${MAX_W}px or narrower)`);
if (failed) console.log(`failed       ${failed} files`);
if (untracked) {
  console.log(
    `\nskipped ${untracked} oversized file(s) that git has no copy of, because` +
      `\nresizing them in place would be irreversible:`
  );
  for (const u of untrackedBig) console.log(`  · ${u}`);
  console.log('\nCommit them first, or re-run with --include-untracked.');
}
