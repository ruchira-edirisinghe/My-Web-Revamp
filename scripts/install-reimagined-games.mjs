/* ═══════════════════════════════════════════════════════════════════════════
   Install the covers and screenshots of the four "Reimagined" Unity rebuilds
   that replaced web games: Derby Kings, Nitro Nights, PropBet and Tug of War.

   They keep the portfolio routes the web versions had (horse-racing,
   car-racing, propbet, kamba-adeema), so links already out there still work;
   the image folders follow those routes, as <GameShowcase> expects.

   COVERS
   ------
   Same method as install-unity-games.mjs: each game's square key art
   (Showcase-Game-Engine/public/banners) recomposed into a 16:9 banner with
   GPT Image 2.5 on Higgsfield, same logo and characters, scene extended
   sideways. The 2688x1520 results and their job records are kept in
   assets-src/banners/unity/, and written here at the three cover sizes.

   SCREENSHOTS
   -----------
   Real captures from each repo's DeviceScreenshotTests (and the racing games'
   camera tours): portrait 20:9 phone shots for the three portrait games, a
   16:9 phone for Tug of War, which is landscape. Each is written at up to
   1920px on its long side, with a `-card` sibling at up to 1100px - the pair
   `lib/cardSrc.ts` maps between.

   The old web versions' folders are removed outright, so their captures don't
   linger beside the new ones.

   Run from the repo root:  node scripts/install-reimagined-games.mjs
   ═══════════════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const GAMES_ROOT = '../../Game Platform & Games';
const OUT = 'public/Images/projects';
const WEBP = { quality: 85, effort: 6 };

/** [portfolio folder, 16:9 source in assets-src/banners/unity] */
const COVERS = [
  ['horse-racing', 'derby-kings-16x9.png'],
  ['car-racing', 'nitro-nights-16x9.png'],
  ['propbet', 'propbet-16x9.png'],
  ['kamba-adeema', 'tug-of-war-16x9.png'],
];

const COVER_SIZES = [
  ['cover.webp', 1600, 900],
  ['cover-thumb.webp', 700, 394],
  ['cover-card.webp', 1100, 619],
];

/** Folders of the web versions these replace. */
const RETIRED = ['horse-game', 'car-game', 'propbet', 'kamba-adeema'];

const derby = `${GAMES_ROOT}/Horse Racing Reimagined/Screenshots/`;
const nitro = `${GAMES_ROOT}/Car Racing Reimagined/Screenshots/`;
const prop = `${GAMES_ROOT}/Propbet Reimagined/Screenshots/phone_20x9__`;
const tug = `${GAMES_ROOT}/Tug Of War Reimagined/Screenshots/phone_16x9__`;

/** [folder, output name, source file] */
const SHOTS = [
  ['horse-racing', 'title', `${derby}phone_20x9__01_title.png`],
  ['horse-racing', 'race-day', `${derby}phone_20x9__01c_home.png`],
  ['horse-racing', 'race-card', `${derby}phone_20x9__04_card_pick.png`],
  ['horse-racing', 'the-off', `${derby}cam__01.png`],
  ['horse-racing', 'finish', `${derby}cam__11.png`],
  ['horse-racing', 'result', `${derby}phone_20x9__09_result.png`],
  ['horse-racing', 'create-arena', `${derby}phone_20x9__16_create.png`],

  ['car-racing', 'title', `${nitro}phone_20x9__01_title.png`],
  ['car-racing', 'home', `${nitro}phone_20x9__01b_home.png`],
  ['car-racing', 'race-card', `${nitro}phone_20x9__04_card_pick.png`],
  ['car-racing', 'start-lights', `${nitro}phone_20x9__06_race_start.png`],
  ['car-racing', 'desert-oval', `${nitro}phone_20x9__07_race_mid.png`],
  ['car-racing', 'final-lap', `${nitro}camera/12_tv.png`],
  ['car-racing', 'arena-bet', `${nitro}phone_20x9__15b_arena_bet.png`],

  ['propbet', 'home', `${prop}00_home.png`],
  ['propbet', 'betting', `${prop}01_betting.png`],
  ['propbet', 'bail-out', `${prop}03a_jump.png`],
  ['propbet', 'space', `${prop}05_space.png`],
  ['propbet', 'big-win', `${prop}10_big-win.png`],
  ['propbet', 'hangar', `${prop}13_hangar.png`],
  ['propbet', 'provably-fair', `${prop}16_fair.png`],

  ['kamba-adeema', 'loading', `${tug}00_loading.png`],
  ['kamba-adeema', 'title', `${tug}01_title.png`],
  ['kamba-adeema', 'bet-dock', `${tug}02_match.png`],
  ['kamba-adeema', 'power-bet', `${tug}03_pick_power.png`],
  ['kamba-adeema', 'grips', `${tug}05_grips.png`],
  ['kamba-adeema', 'big-heave', `${tug}07_settled.png`],
  ['kamba-adeema', 'match-over', `${tug}08_match_over.png`],
];

for (const dir of RETIRED) await rm(path.join(OUT, dir), { recursive: true, force: true });

for (const [folder, src] of COVERS) {
  const dir = path.join(OUT, folder);
  await mkdir(dir, { recursive: true });
  for (const [name, w, h] of COVER_SIZES) {
    await sharp(path.join('assets-src/banners/unity', src))
      .resize(w, h, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
      .webp(WEBP)
      .toFile(path.join(dir, name));
  }
  console.log(`${folder}: cover x${COVER_SIZES.length}`);
}

for (const [folder, name, src] of SHOTS) {
  const dir = path.join(OUT, folder);
  await mkdir(dir, { recursive: true });
  const fit = (max) => ({ width: max, height: max, fit: 'inside', withoutEnlargement: true });
  await sharp(src).resize(fit(1920)).webp(WEBP).toFile(path.join(dir, `${name}.webp`));
  await sharp(src).resize(fit(1100)).webp(WEBP).toFile(path.join(dir, `${name}-card.webp`));
  console.log(`${folder}/${name}`);
}
