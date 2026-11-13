import type { Shot, WebGame } from '../types';

/** `[file, caption]` pairs under one folder → gallery shots. */
const shots = (dir: string, list: [string, string][]): Shot[] =>
  list.map(([file, caption]) => ({ src: `${dir}/${file}.webp`, caption }));

const ENGINE = 'https://arcade.747sandbox.com/games';

/* Web games from the Game Engine arcade, in the order the projects grid lists them. */
export const GAMES: WebGame[] = [
  /* ───────────────────────────── COLLAPSE FACTOR ───────────────────────────── */
  {
    kind: 'game',
    slug: 'collapse-factor',
    title: 'Collapse Factor',
    tagline: 'Think Jenga, but as a betting game. It’s drawn to look like an engineering blueprint, and it shows you the risk on a gauge before every move you make.',
    kicker: 'Web Game · 3D Cash-Out Ladder',
    cover: '/Images/projects/collapse-factor/cover.webp',
    accent: '#3fe0ff',
    accent2: '#ffb020',
    facts: [
      { label: 'Role', value: 'Developer · Game designer' },
      { label: 'Genre', value: 'Cash-out ladder · 2 markets' },
      { label: 'Return', value: '97% at every rung' },
      { label: 'Stack', value: 'Next.js 15 · React 19 · three.js' },
      { label: 'Audio', value: 'Synthesised WebAudio' },
      { label: 'Fairness', value: 'Block seed, sealed per tower' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/collapse-factor` }],
    pitch: [
      'A tower of 48 blocks stands on a measured test plate, lit by a single lamp. On every turn, a robotic claw pulls a block from near the bottom and places it on top. The tower keeps getting taller, while the part holding it up keeps getting thinner.',
      'Most cash-out games have two problems. First, you’re asked whether you want to go one more step without ever being told how risky that step is. Second, once you cash out, there’s nothing left for you to care about. Collapse Factor fixes both. It shows the chance of collapse on a gauge before each pull, it sets the payouts using that same curve, and it adds a second bet on when the tower will fall.',
    ],
    pillars: [
      { icon: 'Megaphone', title: 'Publish the risk', text: 'Before you commit, the gauge shows you the chance that this pull will bring the tower down, so you’re making a real judgement instead of guessing.' },
      { icon: 'Scale', title: 'Price it honestly', text: 'The payouts come straight from the published risk curve, so no step is a better deal than any other.' },
      { icon: 'Drama', title: 'Fake the physics, honestly', text: 'Whether the tower falls is decided before the claw even moves, and the animation never pretends that it isn’t.' },
    ],
    loop: [
      { title: 'Build', text: 'A new 48-block tower is built and its seed is locked in.' },
      { title: 'Stake', text: 'Buy a climb ticket, a tumble ticket, or both.' },
      { title: 'Pull', text: 'The claw pulls a block from the bottom 68% of the tower and puts it on top.' },
      { title: 'Hold', text: 'You get 8 seconds to decide whether to keep going or cash out. If you let the timer run out, you’re cashed out automatically.' },
      { title: 'Tumble', text: 'When the tower falls, the seed is revealed so every roll can be checked.' },
    ],
    features: [
      { icon: 'TrendingUp', title: 'A 16-rung ladder', text: 'The climb maxes out at pull 16, paying 484.85×. Roughly one tower in 500 gets that far.' },
      { icon: 'Ticket', title: 'Tumble bands', text: 'A separate bet on which pull will knock the tower down: 1-3, 4-6, 7-9 or 10 and up.' },
      { icon: 'Shield', title: 'Safe by default', text: 'If you run out of time, you’re cashed out rather than losing. You can also set a plan to ride to a certain pull, so the game doesn’t become a test of how fast you can tap.' },
      { icon: 'SlidersHorizontal', title: 'One number, every channel', text: 'The collapse factor controls almost everything you see and hear: how much the tower sways, the colour of the floor ring, the claw’s lamp, the vignette, the dust, the pitch of the background hum and the gauge itself.' },
      { icon: 'FileText', title: 'An engineering sheet', text: 'The whole look sticks to navy, cyan and amber, with sharp corners, monospaced numbers and an interface grid that lines up with the floor texture, just like a technical drawing.' },
      { icon: 'Receipt', title: 'Run record', text: 'The fairness panel lists every roll in the run next to the collapse factor it was tested against.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/collapse-factor', [
          ['title-screen', 'Title plate'],
          ['claw-pull', 'The claw pulls'],
          ['betting-board', 'The gauge & board'],
          ['cash-out-decision', 'Cash out or ride'],
          ['provably-fair', 'Run record'],
        ]),
      },
    ],
    math: {
      summary: 'Everything in the game comes from a single function, hazard(n), which gives the collapse factor for pull number n.',
      items: [
        { icon: 'Ruler', title: 'The hazard ramp', text: 'The risk starts at 4% and goes up by 3.5 percentage points with each pull, until collapse is certain at pull 29. That end point is calculated from the curve rather than typed in, so if the step size changes, every table updates itself.' },
        { icon: 'ChartNoAxesColumnIncreasing', title: 'The climb', text: 'The payout is climbPays(n) = RTP / SURVIVAL[n], with an RTP of 0.97. In other words, the multiplier you’re paid is the fair one scaled by a fixed amount, so the return is the same at every step.' },
        { icon: 'Scissors', title: 'Truncated, never rounded up', text: 'Prices are shown to two decimal places and always rounded down, never up. A check() function then works out the real return from those rounded prices: between 96.42% and 97.00% on the climb, and between 96.66% and 96.91% on the tumble bets.' },
        { icon: 'Target', title: 'Tumble bands', text: '1-3 Brittle 20.97% → 4.62× · 4-6 Shaky 35.54% → 2.72× · 7-9 Sturdy 27.64% → 3.50× · 10+ Monolith 15.86% → 6.11×. The ranges are split where most collapses actually happen, so none of them is a long-shot lottery ticket.' },
        { icon: 'Lock', title: 'One seal per tower', text: 'drawRun uses one seeded stream to draw all 29 rolls at the very start. The block value is locked in when the tower is built and revealed when it falls.' },
      ],
    },
    tech: [
      { icon: 'Blocks', title: 'Strict layering', text: 'React looks after the wallet, the tickets and the current phase, and it gives the 3D world a single read-only WorldView. Apart from that, the only way the two talk is through four one-off cues: build, pull, tumble and cashOut. The engine/ folder never imports React, and the components/ folder never imports three.js.' },
      { icon: 'Waves', title: 'Three effects, no solver', text: 'Swaying, settling and falling all move the blocks more the higher up they are. That one property is what makes a pile of blocks look like a real stack.' },
      { icon: 'Camera', title: 'Camera fit', text: 'The camera works out how to frame the tower based on its current height, so as the tower grows it never gets cut off.' },
      { icon: 'Accessibility', title: 'Real DOM controls', text: 'Buttons, keyboard focus and screen reader support are all real HTML sitting on top of a transparent canvas, not drawn pixels.' },
    ],
    challenges: [
      { problem: 'A real physics engine would have to be told the outcome in advance anyway.', solution: 'Instead, I used three simple effects that scale with height and play out the result that’s already been decided.' },
      { problem: 'If the risk curve is public, players could hunt for the step with the best value.', solution: 'Every step is priced from the curve at the same return, so there’s no clever place to stop.' },
      { problem: 'If the visuals look more nervous than the maths says they should, that gives something away. If they look calmer, that’s misleading.', solution: 'Only one function is allowed to choose a colour, a sway amount or a pitch for the current level of risk.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript (strict)', 'three.js', 'WebAudio', 'mulberry32'],
    results: {
      metrics: [
        { value: '97%', label: 'RTP at every rung, by construction' },
        { value: '484.85×', label: 'top of the climb at pull 16' },
        { value: '2', label: 'markets settled by one tower' },
        { value: '0', label: 'physics solvers' },
      ],
      points: [
        'A complete 3D betting game with a 48-block tower, a robotic claw, a public risk gauge, a 16-step ladder, four tumble bets and a background hum that tightens as the risk goes up.',
        'Provably fair towers, each locked to a block value for the whole run.',
        'Next up: publishing a hash of the seed before each run, settling bets on the server, and a shared tower that several players can ride together.',
      ],
    },
    learned: [
      'Showing players the odds isn’t giving anything away. It’s a design feature, and it forces the payouts to be honest.',
      'Build the maths first. The visuals should show what the numbers say, not come up with their own idea of risk.',
      'Sometimes the most important product decision is a default. Here, it was making sure that running out of time is safe.',
    ],
  },
  /* ─────────────────────────────── COIN DUEL ─────────────────────────────── */
  {
    kind: 'game',
    slug: 'coin-duel',
    title: 'Coin Duel',
    tagline: 'Five coins are tossed, and whichever face lands on more of them wins. It’s a neon 3D betting arena where the price changes every round but the maths behind it never does.',
    kicker: 'Web Game · 3D Coin Duel',
    cover: '/Images/projects/coin-duel/cover.webp',
    accent: '#ffc24a',
    accent2: '#ff8a3d',
    facts: [
      { label: 'Role', value: 'Developer · Game designer' },
      { label: 'Genre', value: 'Coin-toss duel · 2 buttons' },
      { label: 'Return', value: 'Exactly 97.000%' },
      { label: 'Stack', value: 'Next.js 15 · React 19 · three.js' },
      { label: 'Rendering', value: 'WebGL · UnrealBloom · procedural' },
      { label: 'Fairness', value: 'Block seed, sealed per duel' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/coin-duel` }],
    pitch: [
      'A slot in the floor of a neon arena mints five coins and fires them up into a column of light. Each coin has a SUN on one side and a MOON on the other. You bet on the face you think will land on more of them.',
      'A coin flip is the easiest bet in the world to price, and one of the hardest to make interesting to watch. My goal was to keep the bet exactly that simple, with one question, two buttons and no ties, while giving the game some shape, momentum and the chance of a comeback. The important rule was that none of that extra drama could ever affect the coins themselves.',
    ],
    pillars: [
      { icon: 'CircleHelp', title: 'One question', text: 'Two buttons and nothing else. I also built bets on the winning margin and a 5-0 lottery bet, and they were priced correctly, but I cut them because they made the game harder to understand.' },
      { icon: 'Swords', title: 'Something to watch', text: 'Whichever face lands on the majority of coins settles the bet. The size of the win then decides how hard the hit lands in a duel that keeps a running score.' },
      { icon: 'Banknote', title: 'A price that moves', text: 'Each face gets a new price every round, taken from a ladder of prices that is never in the player’s favour.' },
    ],
    loop: [
      { title: 'Lobby', text: 'Two fighters stand on their platforms, each starting with 12 life and a hexagonal shield.' },
      { title: 'Bet', text: 'You get 20 seconds to back SUN or MOON at this round’s price.' },
      { title: 'Toss', text: 'The mint shoots five coins up into the column of light.' },
      { title: 'Settle', text: 'The faces are counted, and the camera keeps all five coins in view until the strike lands.' },
      { title: 'Strike', text: 'The score turns into damage. Shields wear down, and once a shield breaks, hits do double damage.' },
      { title: 'Review', text: 'This is a proper phase with no timer. It only ends when you press the button.' },
    ],
    features: [
      { icon: 'Coins', title: 'Five minted coins', text: 'With an odd number of coins, every bet is settled. There’s no tie and no refund.' },
      { icon: 'Shield', title: 'Breakable shields', text: 'Shields wear down at a rate that usually breaks them around round seven, which is why the last third of a duel is where the big hits happen.' },
      { icon: 'Orbit', title: 'A procedural neon pit', text: 'The coin faces, hex shields, floor patterns, LED scoreboard and a holographic crowd are all generated in code. On top of that, there’s a bloom effect and a custom vignette.' },
      { icon: 'Volume2', title: 'Synthesised sound', text: 'Sound effects are generated in WebAudio. The one recorded music track only gets downloaded the first time music is actually needed.' },
      { icon: 'Accessibility', title: 'DOM accessibility mirror', text: 'Every control and readout in the 3D world has a real HTML copy, so the game works with keyboards and screen readers.' },
      { icon: 'Palette', title: 'One source of geometry', text: 'The sun and moon designs come from a single file of vector paths. That same file is used to draw the logo, the SVG buttons and the canvas texture on the 3D coins.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/coin-duel', [
          ['title-screen', 'Title · the badge'],
          ['betting-board', 'The pit & the board'],
          ['coin-toss', 'The toss'],
          ['round-result', 'Settle · the score'],
          ['duel-summary', 'Duel summary'],
        ]),
      },
    ],
    math: {
      summary: 'Let k be the number of coins that land SUN-up, so k follows Binomial(5, ½). The score is 2k − 5, which means it’s always ±1, ±3 or ±5 and never 0.',
      items: [
        { icon: 'Dices', title: 'The bet', text: 'The chance of SUN winning is P(k ≥ 3) = 16/32 = ½, which follows from symmetry. So the fair price on either face is exactly 2.00×.' },
        { icon: 'Bomb', title: 'The fight', text: 'Damage equals the size of the score. A 3-2 graze happens 62.50% of the time, a 4-1 hit 31.25% and a 5-0 sweep 6.25%. The average damage is 1.875, so a duel starting at 12 life lasts about 12 rounds.' },
        { icon: 'ChartNoAxesColumnIncreasing', title: 'The price ladder', text: 'Every round, each face is priced from six matching steps between 1.89× and 1.99×, picked using a second slice of the sealed block value. The average comes out at exactly 1.94×, which makes the return to player exactly 97.000%.' },
        { icon: 'Ban', title: 'Never above fair', text: 'Even the best price, 1.99×, is below the fair 2.00×, so no single round ever favours the player. Someone who only ever bet at the best price would get 99.5% back. A swing of ±0.05 is as wide as the price can go while still being honest.' },
        { icon: 'Blocks', title: 'The shield never touches the coin', text: 'Shields only change the damage after the score is known, and the bet is settled on the score alone. check() confirms this, because if a worn-down fighter were more likely to lose a toss, the real price would quietly change.' },
      ],
    },
    tech: [
      { icon: 'Handshake', title: 'React ↔ three.js contract', text: 'React looks after the wallet, the bet, the duel and the current phase, and it hands the 3D world a read-only WorldView. Player input comes back as Intents. The engine/ folder never imports React and components/ never imports three.js. Three other games in the arcade use this same setup.' },
      { icon: 'Video', title: 'Crop-proof camera', text: 'Every camera shot defines an area that must never be cut off, and the camera works out how far back it needs to be for the current screen shape. That way, phones never lose a coin off the edge.' },
      { icon: 'Type', title: 'Self-hosted fonts', text: 'The 3D layer draws its text with fillText, so if a web font failed to load, the whole interface would fall back to Times New Roman. Hosting the fonts myself avoids that.' },
      { icon: 'Lock', title: 'Duel-wide seal', text: 'A server route fetches the block value. It seeds mulberry32 for every toss in the duel and is revealed once one of the fighters goes down.' },
    ],
    challenges: [
      { problem: 'If three coins are enough to settle the bet, the other two would just be decoration.', solution: 'The size of the win drives the duel and decides the damage, while the bet itself stays one simple question with an exact price.' },
      { problem: 'A fixed price on an even bet makes for a board that nobody bothers to look at twice.', solution: 'A moving price that’s the same for both sides, with the best price still below fair. It’s shown before the toss and can be recalculated afterwards.' },
      { problem: 'Playtesters had no idea what "Sol takes this volley" meant.', solution: 'After two rounds of playtesting, I rewrote every word in the game, using plain terms like SUN and MOON, round, score, shield and "lands on more coins". None of the numbers changed.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript (strict)', 'three.js', 'UnrealBloom', 'WebAudio', 'mulberry32'],
    results: {
      metrics: [
        { value: '97.000%', label: 'RTP, exact to every decimal' },
        { value: '0', label: 'ties - every stake resolves' },
        { value: '6', label: 'price rungs, none above fair' },
        { value: '2', label: 'buttons on the board' },
      ],
      points: [
        'A finished 3D betting game with a generated arena, breakable shields, a holographic crowd, generated sound and a full HTML copy of the interface for accessibility.',
        'Every duel is locked to a block value from the first toss to the final knockout.',
        'Next up: publishing a hash of the seed in advance, settling bets on the server, and letting two players duel each other on the same sealed coins.',
      ],
    },
    learned: [
      'Cutting things is the hard part. Every square I removed was priced correctly, but each one made the game worse.',
      'Words are part of the design. Getting the wording right took longer than getting the maths right.',
      'There’s no good length for a fixed review timer, so the review screen doesn’t have one.',
    ],
  },
  /* ─────────────────────────────── WHACK-A-MOLE ─────────────────────────────── */
  {
    kind: 'game',
    slug: 'whack-a-mole',
    title: 'Whack-A-Mole',
    tagline: 'The classic fairground game turned into a fifteen-second betting round. It’s also the only game of skill in the arcade, and the price is still completely honest.',
    kicker: 'Web Game · Priced Skill',
    cover: '/Images/projects/whack-a-mole/cover.webp',
    accent: '#ffcc33',
    accent2: '#ff7a45',
    facts: [
      { label: 'Role', value: 'Developer · Game designer' },
      { label: 'Genre', value: 'Reaction game · 15s rounds' },
      { label: 'Return', value: '88-97% ceiling, by speed' },
      { label: 'Stack', value: 'Next.js 15 · React 19 · three.js' },
      { label: 'Assets', value: '0 image files - all canvas-drawn' },
      { label: 'Fairness', value: 'Board & price sealed per round' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/whack-a-mole` }],
    pitch: [
      'There are nine holes in a lit-up mound at a fair after dark, one mallet, and a pace that keeps getting faster. Regular moles are worth a point and golden moles are worth five. Hitting a bomb halves your winnings, and hitting a skull ends the round straight away, but only if you swing at them. The last four seconds are the Golden Rush, where everything is worth double.',
      'Every other game in the arcade sets its prices from a number that nobody can influence. Here, the result partly depends on the player’s skill. So the real challenge was working out how to price a game of skill without handing good players a bonus and punishing beginners.',
    ],
    pillars: [
      { icon: 'Target', title: 'Priced to a perfect player', text: 'The value of each point is worked out from a perfect round, so nobody, however good they are, can beat the house.' },
      { icon: 'Zap', title: 'Speed is part of the bet', text: 'You choose Steady, Brisk or Frantic right next to your bet, because each speed pays out within its own range.' },
      { icon: 'Hammer', title: 'The picture never lies', text: 'The mallet is always exactly where your pointer is, and one calculation decides both where you’re aiming and what you hit.' },
    ],
    loop: [
      { title: 'Speed & chip', text: 'Choose your bet and a speed, and each speed comes with its own reward range.' },
      { title: 'Price drawn', text: 'This round’s maximum return is picked from that range, using the sealed block value.' },
      { title: 'Board sealed', text: 'Every creature that will appear in the round is decided up front from the same locked-in seed.' },
      { title: 'Frenzy', text: 'Fifteen seconds of whacking, with the Golden Rush doubling everything in the last four.' },
      { title: 'Published', text: 'Cash out your winnings, and the whole board is printed out row by row in the fairness panel.' },
    ],
    features: [
      { icon: 'Squirrel', title: 'Four creatures', text: 'Moles appear 72% of the time (+1), golden moles 8% (+5), bombs 16% (they halve your winnings) and skulls 4% (they end the round). You can tell them apart from their shadows alone.' },
      { icon: 'Crown', title: 'The Golden Rush', text: 'The last four seconds score double, right when the creatures appear for the shortest time and mistakes are most likely.' },
      { icon: 'Keyboard', title: 'Full keyboard play', text: 'The 3×3 grid is mapped to QWE/ASD/ZXC and to the number pad keys 7-9/4-6/1-3, and both work at the same time.' },
      { icon: 'Music', title: 'Synthesised sound', text: 'A 108bpm music track that doubles its tempo as the clock runs down, and 90ms bonk sounds, all generated with WebAudio.' },
      { icon: 'Paintbrush', title: 'Zero image files', text: 'The soil, fur, stars, puffs and glows are all drawn with a 2D canvas when the game loads and then cached, so the whole lawn only weighs tens of kilobytes.' },
      { icon: 'Bomb', title: 'Pooled particles', text: 'All the particles come from one pool that’s set up in advance. When it’s full, it skips effects instead of growing, so there are no garbage collection pauses during the busiest four seconds.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/whack-a-mole', [
          ['title-screen', 'Title screen'],
          ['game-hub', 'Info screen'],
          ['how-to-play', 'How it works'],
          ['betting-board', 'Speed & chip'],
          ['mole-up', 'A standard mole'],
          ['frenzy', 'The frenzy'],
          ['round-result', 'Result card'],
          ['provably-fair', 'Sealed board'],
        ]),
      },
    ],
    math: {
      summary: 'The first version was priced around a typical "arcade regular". It paid back 46.5% to beginners and 138.5% to experts, even though it said 97% on the screen. The rebuild prices everything against a perfect round instead.',
      items: [
        { icon: 'Calculator', title: 'Derived point value', text: 'The value of a point is pointValue = price(rtp / CLEAR_POINTS[level]). A perfect round pays back the maximum, and anything less than perfect pays back less.' },
        { icon: 'SlidersHorizontal', title: 'Three disjoint bands', text: 'Steady pays 88-91% (3.92-4.05×), Brisk 91.5-94% (4.07-4.18×) and Frantic 94.5-97% (4.21-4.32×). There’s a 0.5-point gap between each range, so rounding down can never make two neighbouring ranges overlap.' },
        { icon: 'TrendingDown', title: 'Floored, never rounded', text: 'Every price, and every time a bomb halves your winnings, is rounded down. Rounding up would mean the house pays more than it said it would.' },
        { icon: 'Ruler', title: 'Closed-form returns', text: 'A bomb turns your winnings B into B/2, and a skull turns them into 0. Both of those are simple linear changes, so I could work out the exact return for five different skill levels. It ranges from about 35% for a first go at Frantic up to the level’s maximum, and never goes past it.' },
        { icon: 'Timer', title: 'Fixed tempo', text: 'When creatures pop up follows a fixed schedule for each level (for example, from 1040ms down to 648ms on Frantic). Only which creatures appear and the price are random, and both are sealed.' },
      ],
    },
    tech: [
      { icon: 'Target', title: 'One projection', text: 'boardPoint() places the pointer on one flat, unlimited surface in the mound’s space, and both aim() and holeAt() read from it. This replaced the old setup of one aiming surface plus nine stacked hit spheres, which was causing missed hits.' },
      { icon: 'Hammer', title: 'An undamped mallet', text: 'The mallet’s position follows the pointer directly with no smoothing at all. Only its height, tilt, roll and recoil are smoothed.' },
      { icon: 'Camera', title: 'A fixed camera', text: 'The camera looks down at 33° over a mound tilted back 8°, so every hole looks like an open oval. I tried zooming the camera in during the Golden Rush, but it felt like the game had stopped registering clicks, so I took it out.' },
      { icon: 'Satellite', title: 'Server seed route', text: 'The server route keeps its token private, retries up to five times if the block clock lags, caches good results for 9 seconds and failures for 5 seconds, and always responds with a 200. It also adds a counter so four rounds on the same block never get the same board.' },
    ],
    challenges: [
      { problem: 'Pricing the game around a typical player meant experts got 138% back and beginners only 46.5%.', solution: 'I priced it against a perfect round instead and showed the return as a range, so nobody can get more than the maximum.' },
      { problem: 'Players felt like their hits weren’t registering near the end of a round.', solution: 'The problem wasn’t in the hit detection at all. A smoothed mallet, stacked hit surfaces and a camera zoom were each slightly misleading players about where they were aiming. I removed all three.' },
      { problem: 'Three or four rounds can happen within one roughly 12-second block, so boards could repeat, which would be an easy exploit.', solution: 'A counter for each round is mixed into the seed, so every board is new.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript (strict)', 'three.js', 'Canvas textures', 'WebAudio', 'mulberry32'],
    results: {
      metrics: [
        { value: '4.32×', label: 'best price any board can carry' },
        { value: '5', label: 'skill levels with derived returns' },
        { value: '3', label: 'disjoint, ordered reward bands' },
        { value: '0', label: 'image files in the game' },
      ],
      points: [
        'A finished 3D betting game and the only priced game of skill in the arcade. Its payout table is calculated and then checked by check(), rather than typed in by hand.',
        'Whole boards are locked to a block before the first swing, there’s full keyboard support, and the controls are real HTML on top of the canvas.',
        'Next up: settling bets on the server, and bringing this calculate-then-check approach to payout tables back to the older games.',
      ],
    },
    learned: [
      'The visuals can mislead players about what’s really happening, and they’ll blame themselves for it.',
      'For a game of skill, the only honest promise you can make is a maximum return, not an average.',
      'Feedback happens on several timelines at once. If you squash them all into one duration, no amount of art can fix it.',
    ],
  },
];
