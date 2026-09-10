/* ═══════════════════════════════════════════════════════════════════════════
   to-webp.mjs — re-encode public/Images as WebP and repoint the markup.

   THE PROBLEM THIS SOLVES
   -----------------------
   `optimize-images.mjs` capped every capture at 1920px, which fixed the
   absurd case (8 MB screenshots). What it deliberately did NOT do was change
   format, so the site still shipped 994 PNGs — and PNG is the wrong container
   for a photograph or a screenshot with gradients in it. A case-study page was
   still asking for ~2.6 MB of images, the projects hub for ~3.4 MB, and the
   home page spent 1 MB on a single hero portrait. At q85 WebP the same files
   come out around 75% smaller with no visible difference at the sizes they are
   actually drawn.

   WHAT IT DOES
   ------------
   1. Converts every raster under public/Images to .webp beside the original.
   2. Deletes the original, so nothing ships twice.
   3. Rewrites every `/Images/....png|jpg` string in app/, components/ and lib/
      to point at the .webp — src, data-full, and anything else spelt as a
      literal path.

   WHAT IT LEAVES ALONE
   --------------------
   • public/Images/favicon/** — the manifest and <link rel=icon> declare
     `type: image/png`, and favicon handling is the one place where an exotic
     format is still a real compatibility risk for zero gain (these files are
     a few kB).
   • mynew.png — the Open Graph / Twitter card image. Crawlers, not browsers,
     fetch it, and several still do not take WebP. The webp copy is generated
     and used by the on-page <img>; the png stays for the meta tags only.
   • SVGs, which are already the right thing.

   SAFE TO RE-RUN
   --------------
   Idempotent: a file that has already been converted is gone, and a rewritten
   path already ends in .webp, so a second run reports zero work. Run it after
   dropping new screenshots in (after optimize-images.mjs, which does the
   resizing):

       node scripts/optimize-images.mjs
       node scripts/to-webp.mjs
       node scripts/to-webp.mjs --dry-run   # just report

   ONLY TOUCHES FILES GIT ALREADY HAS
   ----------------------------------
   Same guard as optimize-images.mjs, and for the same reason: this deletes
   the original once the .webp is written. For a committed file that is fine —
   `git checkout` brings it straight back. For a screenshot dropped in ten
   minutes ago and not yet committed there is no other copy anywhere.
   ═══════════════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { readdir, stat, readFile, writeFile, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const IMG_ROOT = 'public/Images';
const CODE_ROOTS = ['app', 'components', 'lib'];
const RASTER = /\.(png|jpe?g)$/i;

/* q85 is the knee of the curve for this material. Below it the flat UI panels
   in the product screenshots start to band; above it the file size climbs
   without anything on screen changing. `effort: 6` costs build time only. */
const QUALITY = 85;
const EFFORT = 6;

/** Not touched at all — no .webp is even generated. See the header for why. */
const SKIP = (p) => p.replace(/\\/g, '/').includes('/Images/favicon/');

/** Converted, but the original stays because something else still reads it. */
const KEEP_ORIGINAL = (p) => path.basename(p).toLowerCase() === 'mynew.png';

const DRY = process.argv.includes('--dry-run');
const FORCE_UNTRACKED = process.argv.includes('--include-untracked');

/** Files git already has a copy of, so deleting the original is recoverable. */
function trackedFiles() {
  try {
    return new Set(
      execFileSync('git', ['ls-files', IMG_ROOT], { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean)
        .map((p) => path.normalize(p)),
    );
  } catch {
    return null; // not a git repo — handled by the caller
  }
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function convertImages(tracked) {
  const files = (await walk(IMG_ROOT)).filter((f) => RASTER.test(f));
  let before = 0;
  let after = 0;
  let done = 0;
  let skipped = 0;

  for (const file of files) {
    if (SKIP(file)) { skipped++; continue; }
    const keep = KEEP_ORIGINAL(file);
    if (!FORCE_UNTRACKED && tracked && !tracked.has(path.normalize(file))) {
      console.log(`  skip (untracked)  ${file}`);
      skipped++;
      continue;
    }

    const src = (await stat(file)).size;
    const dest = file.replace(RASTER, '.webp');

    if (DRY) {
      before += src;
      done++;
      continue;
    }

    const buf = await sharp(file).webp({ quality: QUALITY, effort: EFFORT }).toBuffer();
    await writeFile(dest, buf);
    // The og:image keeps its png; everything else has no second reader.
    if (!keep) await unlink(file);

    before += src;
    after += buf.length;
    done++;
    if (done % 100 === 0) console.log(`  ...${done}/${files.length}`);
  }

  console.log(
    DRY
      ? `\n${done} images would be converted (${kb(before)} of source), ${skipped} skipped`
      : `\n${done} images converted: ${kb(before)} -> ${kb(after)} ` +
        `(${Math.round((1 - after / before) * 100)}% smaller), ${skipped} skipped`,
  );
}

async function rewriteReferences() {
  const files = [];
  for (const root of CODE_ROOTS) await walk(root, files);
  const code = files.filter((f) => /\.(tsx?|jsx?|mjs)$/.test(f));

  // Any literal /Images/... path ending in a raster extension. Most capture
  // filenames here contain spaces ("Desktop - Home.png"), so the character
  // class must allow them - it stops at the quote that closes the attribute,
  // which is the only boundary that actually matters.
  const ref = /(\/Images\/[^"'`<>]+?)\.(png|jpe?g)\b/gi;
  let changedFiles = 0;
  let changedRefs = 0;

  for (const file of code) {
    // app/layout.tsx holds only the icon links and the og:image — every path in
    // it is one of the two that deliberately stays PNG. Skipping the file whole
    // is simpler to reason about than pattern-matching the paths inside it.
    if (path.normalize(file) === path.normalize('app/layout.tsx')) continue;

    const text = await readFile(file, 'utf8');
    let hits = 0;
    const next = text.replace(ref, (whole, stem) => {
      if (/\/Images\/favicon\//i.test(whole)) return whole;
      hits++;
      return `${stem}.webp`;
    });
    if (hits === 0) continue;
    if (!DRY) await writeFile(file, next);
    changedFiles++;
    changedRefs += hits;
  }

  console.log(
    `${DRY ? 'would rewrite' : 'rewrote'} ${changedRefs} image paths in ${changedFiles} files`,
  );
}

const tracked = trackedFiles();
if (!tracked && !FORCE_UNTRACKED) {
  console.error('Not a git repo (or git unavailable). Re-run with --include-untracked ' +
                'only if you have another copy of public/Images.');
  process.exit(1);
}

console.log(`${DRY ? '[dry run] ' : ''}converting ${IMG_ROOT} to WebP q${QUALITY}\n`);
await convertImages(tracked);
await rewriteReferences();
