/* ═══════════════════════════════════════════════════════════════════════════
   Install the Whack-A-Mole captures into the slots the case study reads.

   The raw files arrive as browser screenshots - `Screenshot 2026-09-07 ....png`
   at 2943x1755, with 143px of Chrome's own tab strip and address bar across the
   top. That chrome has to come off: it is not part of the game, it carries the
   author's open tabs and bookmarks into a public portfolio, and left on it makes
   the capture 1.68:1 where every other game's is 1.82:1, so the gallery cards
   would crop it differently from every other case study.

   CROP_TOP was measured rather than guessed - see the row-brightness probe in
   the commit that added this: the page's own dark sky begins at y=143, and the
   rows above it are the browser.

   Each capture is cropped, then written to the filename the component asks for.
   The originals are left where they are; `npm run images:wam-src` moves them out
   of public/ afterwards so they are kept but not deployed.
   ═══════════════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { readdir, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'public/Images/projects/whack-a-mole';
const SRC_KEEP = 'assets-src/whack-a-mole';
const CROP_TOP = 143;

/** Which raw capture fills which slot, keyed by the timestamp in its filename. */
const SLOTS = [
  ['170520', 'title-screen.png',  'the title screen and its four headline chips'],
  ['170528', 'how-to-play.png',   'the how-it-works card, three speeds and paytable'],
  ['170537', 'betting-board.png', 'stake for the next frenzy - speeds and chips'],
  ['170615', 'frenzy.png',        'mid-frenzy: a golden mole up, mallet and aim ring'],
  ['170622', 'round-result.png',  'the result card - stake x multiplier = returned'],
  ['170739', 'game-hub.png',      "the arcade's own info screen for the game"],
  ['170836', 'provably-fair.png', 'the sealed board published in full'],
];

const files = await readdir(DIR);
const rawOf = (stamp) =>
  files.find((f) => /^Screenshot/i.test(f) && f.includes(stamp) && !/-card\.png$/i.test(f));

let done = 0;
for (const [stamp, out, what] of SLOTS) {
  const raw = rawOf(stamp);
  if (!raw) { console.warn(`no raw capture matching ${stamp} - skipping ${out}`); continue; }

  const src = path.join(DIR, raw);
  const meta = await sharp(src).metadata();
  await sharp(src)
    .extract({ left: 0, top: CROP_TOP, width: meta.width, height: meta.height - CROP_TOP })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(path.join(DIR, `${out}.tmp`));
  await rename(path.join(DIR, `${out}.tmp`), path.join(DIR, out));
  console.log(`${out.padEnd(20)} <- ${raw}   (${what})`);
  done++;
}

/* ── The cover and the wordmark ──────────────────────────────────────────
   Both come out of the hub capture, which is where the game's own lockup is
   shown at its largest: a square panel with the wordmark centred on it. The
   panel's box was measured on the 1100px-wide proof and scaled up. */
const hub = rawOf('170739');
if (hub) {
  const src = path.join(DIR, hub);
  const meta = await sharp(src).metadata();
  const k = meta.width / 1100; // the proof was rendered at 1100px wide

  /* The logo panel on the hub, as measured: x 212..479, y 117..383. */
  const panel = {
    left: Math.round(212 * k),
    top: Math.round(117 * k),
    width: Math.round((479 - 212) * k),
    height: Math.round((383 - 117) * k),
  };

  await sharp(src).extract(panel).resize(1254, 1254, { fit: 'cover' })
    .png({ compressionLevel: 9, effort: 10 }).toFile(path.join(DIR, 'logo.png.tmp'));
  await rename(path.join(DIR, 'logo.png.tmp'), path.join(DIR, 'logo.png'));
  console.log('logo.png             <- hub capture, logo panel');

  await sharp(src).extract(panel).resize(1600, 1600, { fit: 'cover' })
    .png({ compressionLevel: 9, effort: 10 }).toFile(path.join(DIR, 'cover.png.tmp'));
  await rename(path.join(DIR, 'cover.png.tmp'), path.join(DIR, 'cover.png'));
  console.log('cover.png            <- hub capture, logo panel');

  await sharp(src).extract(panel).resize(700, 700, { fit: 'cover' })
    .png({ compressionLevel: 9, effort: 10 }).toFile(path.join(DIR, 'cover-thumb.png.tmp'));
  await rename(path.join(DIR, 'cover-thumb.png.tmp'), path.join(DIR, 'cover-thumb.png'));
  console.log('cover-thumb.png      <- hub capture, logo panel');
}

/* ── Keep the raws, stop shipping them ─────────────────────────────────── */
await mkdir(SRC_KEEP, { recursive: true });
let moved = 0;
for (const f of files) {
  if (!/^Screenshot/i.test(f)) continue;
  await rename(path.join(DIR, f), path.join(SRC_KEEP, f));
  moved++;
}
console.log(`\n${done} slots filled; ${moved} raw file(s) moved to ${SRC_KEEP}/ (kept, not deployed).`);
