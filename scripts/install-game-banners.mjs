/* ═══════════════════════════════════════════════════════════════════════════
   Install the ten generated 16:9 key-art banners as the ten games' covers.

   WHY 16:9 IS THE RIGHT SHAPE HERE
   -------------------------------
   The projects grid draws every card image into a `.project-image-wrap` with
   `aspect-ratio: 16/9` and `object-fit: cover`. Six of the ten games were
   supplying a SQUARE cover (1024x1024 up to 1600x1600), so the grid was
   throwing away the top and bottom 44% of the artwork - which for a lockup with
   a wordmark across the middle meant the game's own name was the part being
   cropped. The other four were already 16:9. These banners make all ten match
   the box they are drawn in.

   The same file is the case-study hero (`.cs-cover-banner`), where a square
   cover was a full-width 1:1 slab pushing the whole page down; 16:9 is a banner.

   WHAT IS WRITTEN, AND WHY THESE SIZES
   ------------------------------------
     cover.png        1600x900   the hero banner, and the lightbox target.
                                 1600x900 rather than the source's 1672x941
                                 because four of the ten already used exactly
                                 that, and a mixed set is a set someone has to
                                 check before using.
     cover-thumb.png   700x394   the projects-grid card. 700x394 is what the
                                 four 16:9 games already shipped.
     cover-card.png   1100x619   the gallery marquee card, for the case studies
                                 that show the cover as one of their screens.

   The sources are moved to assets-src/banners/ afterwards - kept in the repo,
   outside public/, so they are never deployed and never confused for the
   installed copies.
   ═══════════════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { readdir, mkdir, rename, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC_DIR = 'public/Images/projects';
const KEEP = 'assets-src/banners';

/** Which generated banner belongs to which game folder, by the timestamp in
 *  its filename. Every one was identified by reading the artwork's wordmark. */
const BANNERS = [
  ['04_16_35', 'collapse-factor', 'Collapse Factor'],
  ['04_16_46', 'propbet', 'PropBet'],
  ['04_16_51', 'whack-a-mole', 'Whack-A-Mole'],
  ['04_20_50', 'coin-duel', 'Coin Duel'],
  ['04_22_30', 'kamba-adeema', 'Kamba Adeema (Tug of War)'],
  ['04_29_45', 'kana-mutti', 'Kana Mutti'],
  ['04_31_31', 'horse-game', 'Horse Racing Elite'],
  ['04_31_42', 'pixel-poker', 'Pixel Perfect Poker'],
  ['04_33_58', 'car-game', 'Ready To Race Unlimited'],
  ['04_41_46', 'aether-dynasty', 'Aether Dynasty'],
];

const OUTPUTS = [
  ['cover.png', 1600, 900],
  ['cover-thumb.png', 700, 394],
  ['cover-card.png', 1100, 619],
];

const files = await readdir(SRC_DIR);
const rawOf = (stamp) => files.find((f) => /^ChatGPT/i.test(f) && f.includes(stamp));

const mb = (n) => (n / 1048576).toFixed(2);
let installed = 0;

for (const [stamp, folder, label] of BANNERS) {
  const raw = rawOf(stamp);
  if (!raw) { console.warn(`no banner matching ${stamp} - skipping ${folder}`); continue; }

  const src = path.join(SRC_DIR, raw);
  const dir = path.join(SRC_DIR, folder);
  const line = [];

  for (const [name, w, h] of OUTPUTS) {
    const dest = path.join(dir, name);
    let was = null;
    try { was = (await stat(dest)).size; } catch { /* new file */ }

    const tmp = `${dest}.tmp`;
    await sharp(src)
      /* `cover` rather than `inside`: the source is 1.777 and every target is
         exactly 16:9, so this trims at most a pixel row - it is here to
         guarantee the exact output dimensions, not to crop. */
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(tmp);
    await rename(tmp, dest);

    const now = (await stat(dest)).size;
    line.push(`${name} ${w}x${h} ${mb(now)}MB${was ? ` (was ${mb(was)}MB)` : ' (new)'}`);
  }

  console.log(`${label}\n  ${folder}/  ${line.join('\n  ' + ' '.repeat(folder.length + 3))}`);
  installed++;
}

/* ── Keep the sources, stop shipping them ── */
await mkdir(KEEP, { recursive: true });
let moved = 0;
for (const f of files) {
  if (!/^ChatGPT/i.test(f)) continue;
  await rename(path.join(SRC_DIR, f), path.join(KEEP, f));
  moved++;
}
console.log(`\n${installed}/10 banners installed; ${moved} source file(s) moved to ${KEEP}/`);
