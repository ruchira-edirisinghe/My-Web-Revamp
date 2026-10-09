/* ═══════════════════════════════════════════════════════════════════════════
   Install the five Unity games' covers and screenshots.

   COVERS
   ------
   Each game shipped a square 1024x1024 key art (Showcase-Game-Engine's
   public/banners). The projects grid and the game page hero are both 16:9, so
   every square was recomposed into a 16:9 banner from that same art - same
   logo, same characters, scene extended sideways - and kept in
   assets-src/banners/unity/. They are written at the sizes the ten web-game
   covers already use (see install-game-banners.mjs):

     cover.webp        1600x900   the game page hero and lightbox target
     cover-thumb.webp   700x394   the projects-grid card
     cover-card.webp   1100x619   spare, for a gallery card

   SCREENSHOTS
   -----------
   Real captures from each game: the repos' own device-screenshot and autopilot
   test output, plus Glacier Glide, Glass Bridge and Void Armada captured from
   their WebGL builds (assets-src/unity-shots/). Void Armada's repo shots
   (Battleship/logs/shots) show the earlier neon-grid look, so its captures come
   from the live build on the showcase engine instead. Each is written at up to 1920px on its long
   side for the lightbox, with a `-card` sibling at up to 1100px for the grid -
   the same pair `lib/cardSrc.ts` maps between.

   Run from the repo root:  node scripts/install-unity-games.mjs
   ═══════════════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const GAMES_ROOT = '../../Game Platform & Games';
const OUT = 'public/Images/projects';
const WEBP = { quality: 85, effort: 6 };

const COVERS = [
  ['aether-dynasty', 'aether-dynasty-16x9.png'],
  ['void-armada', 'void-armada-16x9.png'],
  ['glacier-glide', 'glacier-glide-16x9.png'],
  ['glass-bridge', 'glass-bridge-16x9.png'],
  ['tic-tac-toe-showdown', 'tic-tac-toe-16x9.png'],
];

const COVER_SIZES = [
  ['cover.webp', 1600, 900],
  ['cover-thumb.webp', 700, 394],
  ['cover-card.webp', 1100, 619],
];

const aether = `${GAMES_ROOT}/Aether Dynasty Reimagined/Screenshots/phone_20x9__`;
const armada = 'assets-src/unity-shots/void-armada/';
const ttt = `${GAMES_ROOT}/tic-tac-toe/Screenshots/phone_20x9_portrait__`;
const glacier = 'assets-src/unity-shots/glacier-glide/';
const bridge = 'assets-src/unity-shots/glass-bridge/';

/** [folder, output name, source file] */
const SHOTS = [
  ['aether-dynasty', 'home', `${aether}1_home.png`],
  ['aether-dynasty', 'board', `${aether}4_game.png`],
  ['aether-dynasty', 'divine-win', `${aether}7_big_win.png`],
  ['aether-dynasty', 'zeus-wrath', `${aether}9_perfect.png`],
  ['aether-dynasty', 'autoplay', `${aether}8_autoplay.png`],
  ['aether-dynasty', 'how-to-play', `${aether}3_rules.png`],

  ['void-armada', 'menu', `${armada}menu.png`],
  ['void-armada', 'how-to-play', `${armada}how-to-play.png`],
  ['void-armada', 'choose-enemy', `${armada}choose-enemy.png`],
  ['void-armada', 'your-turn', `${armada}your-turn.png`],
  ['void-armada', 'barrage', `${armada}barrage.png`],
  ['void-armada', 'fire-again', `${armada}fire-again.png`],
  ['void-armada', 'enemy-turn', `${armada}enemy-turn.png`],

  ['glacier-glide', 'get-ready', `${glacier}ready.png`],
  ['glacier-glide', 'coin-run', `${glacier}run11.png`],
  ['glacier-glide', 'big-air', `${glacier}run17.png`],
  ['glacier-glide', 'double-coins', `${glacier}run20.png`],
  ['glacier-glide', 'wipeout', `${glacier}end.png`],
  ['glacier-glide', 'shop-heroes', `${glacier}shop_heroes.png`],

  ['glass-bridge', 'title', `${bridge}title.png`],
  ['glass-bridge', 'stake-sheet', `${bridge}stake.png`],
  ['glass-bridge', 'first-pair', `${bridge}run_b.png`],
  ['glass-bridge', 'jump', `${bridge}hop.png`],
  ['glass-bridge', 'crash', `${bridge}break3.png`],
  ['glass-bridge', 'relay', `${bridge}after7.png`],
  ['glass-bridge', 'far-side', `${bridge}cross2.png`],

  ['tic-tac-toe-showdown', 'menu', `${ttt}1_menu.png`],
  ['tic-tac-toe-showdown', 'setup', `${ttt}2_setup.png`],
  ['tic-tac-toe-showdown', 'classic', `${ttt}3_game_classic.png`],
  ['tic-tac-toe-showdown', 'big-ranch', `${ttt}4_game_bigboard_win.png`],
  ['tic-tac-toe-showdown', 'tumbleweed', `${ttt}5_game_vanishing.png`],
  ['tic-tac-toe-showdown', 'online-posse', `${ttt}7_online.png`],
];

/* The old Aether Dynasty (the Next.js slot) is replaced outright; its captures
   must not linger beside the new ones. */
await rm(path.join(OUT, 'aether-dynasty'), { recursive: true, force: true });

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
