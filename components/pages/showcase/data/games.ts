import type { Shot, WebGame } from '../types';

/** `[file, caption]` pairs under one folder → gallery shots. */
const shots = (dir: string, list: [string, string][]): Shot[] =>
  list.map(([file, caption]) => ({ src: `${dir}/${file}.webp`, caption }));

const ENGINE = 'https://showcase-game-engine.netlify.app/games';

/* Web games from the Game Engine arcade, in the order the projects grid lists them. */
export const GAMES: WebGame[] = [
  /* ─────────────────────────────── HORSE RACING ─────────────────────────────── */
  {
    kind: 'game',
    slug: 'horse-racing',
    title: 'Horse Racing Elite',
    tagline: 'A horse racing game you can play right in your browser. You bet on one of six horses, then watch a smooth 60fps race play out, either on your own or in a room with friends.',
    kicker: 'Web Game · Racing & Betting',
    cover: '/Images/projects/horse-game/cover.webp',
    accent: '#ffb800',
    accent2: '#00e5ff',
    facts: [
      { label: 'Role', value: 'Developer · Vibe coder' },
      { label: 'Genre', value: 'Racing arena · Win betting' },
      { label: 'Modes', value: 'Solo · Multiplayer rooms' },
      { label: 'Stack', value: 'Next.js · React · TypeScript' },
      { label: 'Multiplayer', value: 'Firebase Realtime Database' },
      { label: 'Platform', value: 'Browser · Game Engine arcade' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/horse-racing` }],
    pitch: [
      'Horse Racing Elite is a betting arena that runs in the browser. There are six horses, you get 30 seconds to place a bet, then the race runs live and you’re paid out the moment it finishes. The whole thing sits inside a neon e-sports style theme, and you can switch between a few colour palettes if you want a different look.',
      'The most important decision I made was that the game never picks a winner. Instead, it simulates the race. Each horse gets a starting speed based on its stats and a random seed, and then a physics loop moves them along the track step by step. So the race you’re watching isn’t a replay of a result that was decided earlier. The animation is the actual calculation happening in front of you.',
      'This project was also my first real experiment with vibe coding. I broke the game down into separate systems, described each one to an AI, then reviewed and cleaned up the code it gave me before moving on to the next one.',
    ],
    pillars: [
      { icon: '🎲', title: 'Simulated, not picked', text: 'Whoever crosses the line first wins. Every player in the room runs the race from the same seed, so everyone sees exactly the same outcome.' },
      { icon: '⏱️', title: 'Same race on any screen', text: 'The physics runs in fixed time steps, so the race plays out exactly the same whether your screen refreshes at 30, 60 or 144Hz.' },
      { icon: '🏟️', title: 'A full arena', text: 'Around each race there’s a lot going on: rooms you can join with an invite code, bots to fill empty seats, ranks, seasons and a daily bounty to chase.' },
    ],
    loop: [
      { title: 'Lobby', text: 'You can play on your own, or create a multiplayer room and invite people with a code, or join someone else’s.' },
      { title: 'Bet', text: 'You have 30 seconds to pick one of the six horses and put down a bet of at least 10 credits.' },
      { title: 'Seed', text: 'The host grabs a single seed from the RNG service and saves it to the room, which means every player’s game runs the exact same race.' },
      { title: 'Race', text: 'After a countdown, the six horses race through a step-by-step physics simulation, and the lead can change hands several times along the way.' },
      { title: 'Payout', text: 'If your horse wins, you get your stake multiplied by the odds. The seed and block number are shown afterwards, so anyone can check how the race was decided.' },
    ],
    features: [
      { icon: '🐎', title: 'Six stat-driven runners', text: 'Each horse has its own name, jockey, colour, odds, recent form, speed and stamina. The favourite, Thunder Bolt, pays 2.5×, while the long shot, Blue Storm, pays 12×.' },
      { icon: '👥', title: 'Multiplayer rooms', text: 'Rooms run on the Firebase Realtime Database and you join them with an invite code. The host’s seed is what drives the race for everyone in the room.' },
      { icon: '🤖', title: 'Bots & live wager feed', text: 'AI opponents and a live feed of everyone’s bets help a room feel busy, even when there aren’t many real players in it.' },
      { icon: '🎨', title: 'Swappable palettes', text: 'You can switch between Default, Cyber and eSports themes. Because all the colours come from CSS tokens, changing the theme only takes one attribute.' },
      { icon: '🔊', title: 'Audio & motion', text: 'There’s a countdown sound and background audio that fades in and out, and the screens animate smoothly from one phase of the game to the next using the Web Animations API.' },
      { icon: '🏆', title: 'Ranks & seasons', text: 'Leaderboards, seasons and a daily bounty give players a reason to keep coming back to the arena.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/horse-game', [
          ['home', 'Home · Elite Circuit'],
          ['lobby', 'Lobby · runners & odds'],
          ['race-rules', 'Create an arena'],
          ['loading', 'Syncing the track'],
          ['race', 'Betting & the live race'],
        ]),
      },
    ],
    math: {
      summary: 'You bet on a single horse to win, and the payout includes your original stake. To make sure the numbers held up, I wrote a faithful copy of the race engine and ran every one of the 10,001 possible seeds through it.',
      items: [
        { icon: '🏁', title: 'Starting velocity', text: 'Each horse starts with base = (0.6 × speed + 0.4 × stamina) / 100, and its velocity is then set to 0.55 × base + 0.1 × rng(). This is the only point in the race where a horse’s stats actually make a difference.' },
        { icon: '〰️', title: 'The race itself', text: 'Every 16 milliseconds, each lane gets a small, limited amount of random jitter added to it. This is basically a random walk with limits, and it’s what creates all the overtaking you see during a race.' },
        { icon: '💰', title: 'Payout', text: 'The payout is floor(stake × odds), and that includes your stake. So if you bet 100 credits on Thunder Bolt at 2.5×, you get 250 back.' },
        { icon: '🔍', title: 'What the audit found', text: 'The audit showed that every horse wins roughly one race in six (between 16.5% and 16.9%). The difference the stats make (0.011) is about nine times smaller than the random part, and the random walk washes it out within about 10 of the roughly 1,470 ticks in a race. That means the fair price for every horse is really 6.0×, and the fixed odds on the board had never been checked against how the simulation actually behaves.' },
        { icon: '🛠️', title: 'The fix it calls for', text: 'There are two ways to fix it. One is to give all six horses the same odds, set a little under 6.0× (5.70× would give a 95% return). The other is to make the stats affect every tick so the win rates genuinely differ, and then measure them again and set the odds from those results.' },
      ],
    },
    tech: [
      { icon: '⚙️', title: 'Fixed-timestep loop', text: 'The game uses requestAnimationFrame to keep track of real time, then moves the simulation forward in fixed 16ms steps. It will catch up by at most four steps in a single frame, and when the game is paused it keeps the frame loop going without moving time forward.' },
      { icon: '🌱', title: 'Seeds from the RNG service', text: 'Seeds come from an RNG service based on blockchain blocks. The game reaches it through a server-side /api/blockchain proxy, so the access token never ends up in the browser. If the service lags behind, it retries a few times, and if it’s down, the game falls back to a local seed.' },
      { icon: '🧭', title: 'Phase state machine', text: 'The game moves through a set of phases: Home → Lobby → Betting → Countdown → Racing → Finished. Each phase looks after its own screens and logic, which made it easy to build the game one phase per prompt.' },
      { icon: '🔥', title: 'Firebase rooms', text: 'Room details, invite codes and the shared race seed are all stored in the Firebase Realtime Database. When you play on your own, everything stays on your device.' },
    ],
    challenges: [
      { problem: 'The races needed to feel random and exciting, but every player in a room also had to see exactly the same race.', solution: 'Each race uses one seed from the RNG service, which is shared through the room. That seed feeds a simulation that always gives the same result for the same input, and nothing in the main loop depends on clocks or the page layout.' },
      { problem: 'If the physics is tied to the frame rate, a faster computer ends up running a faster race.', solution: 'I used a fixed-timestep accumulator, so the same seed produces the same winner on any device.' },
      { problem: 'Keeping a large codebase consistent when most of it was written with AI.', solution: 'I planned the architecture before writing any prompts. The phase machine, the race engine and the betting economy were all designed up front, and then I built each system with AI, reviewed it and tidied it up one at a time.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase RTDB', 'requestAnimationFrame', 'CSS tokens', 'Vibe coding'],
    results: {
      metrics: [
        { value: '60 FPS', label: 'frame-rate-independent race loop' },
        { value: '6', label: 'runners with stats, form and odds' },
        { value: '10,001', label: 'seeds enumerated in the maths audit' },
      ],
      points: [
        'A finished, playable arena with solo play and multiplayer rooms, bots, ranks, seasons, sound and a neon theme you can swap.',
        'Races are completely reproducible, so the same seed gives the same winner on any device.',
        'A written-up maths audit that found the gap between the odds and what the simulation really does, along with a plan to fix it.',
      ],
    },
    learned: [
      'Vibe coding works much better when you’ve thought through the architecture. The clearer my picture of the engine and the economy was, the cleaner the code that came back.',
      'The odds on a betting board need to be based on what the simulation actually does, and that has to be measured rather than assumed.',
      'In multiplayer, fairness depends on everyone getting the same result from the same input. You share the seed with everyone, not the result.',
    ],
  },
  /* ─────────────────────────────── CAR RACING ─────────────────────────────── */
  {
    kind: 'game',
    slug: 'car-racing',
    title: 'Ready To Race Unlimited',
    tagline: 'The same racing arena as Horse Racing Elite, rebuilt around supercars. There are six cars, live betting and a smooth 60fps race, and you can play solo or in multiplayer rooms.',
    kicker: 'Web Game · Racing & Betting',
    cover: '/Images/projects/car-game/cover.webp',
    accent: '#ff7a1a',
    accent2: '#ff3fb4',
    facts: [
      { label: 'Role', value: 'Developer · Vibe coder' },
      { label: 'Genre', value: 'Racing arena · Win betting' },
      { label: 'Modes', value: 'Solo · Multiplayer rooms' },
      { label: 'Stack', value: 'Next.js · React · TypeScript' },
      { label: 'Multiplayer', value: 'Firebase Realtime Database' },
      { label: 'Platform', value: 'Browser · Game Engine arcade' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/car-racing` }],
    pitch: [
      'Ready To Race Unlimited takes the Horse Racing Elite arena and gives it a completely new look built around supercars. The grid has a Ferrari 488 GTB, a Porsche 911 Turbo, a Lamborghini Huracán, a Bugatti Chiron, a Mazda RX-7 and a Nissan GT-R, all racing on a deep violet neon track.',
      'Underneath, it runs on exactly the same engine: a seeded race with a fixed timestep, where the animation you see is the calculation itself. Building it taught me a lot about how to fork a game properly, including what should be shared between the two, what needs to be kept separate and what shouldn’t be copied at all.',
    ],
    pillars: [
      { icon: '🏎️', title: 'One engine, two games', text: 'The racing arena works as a reusable engine, and this game is the second look built on top of it.' },
      { icon: '🎲', title: 'Simulated outcomes', text: 'The game never chooses a winner. Six cars race through a seeded physics loop, and the first one across the line wins.' },
      { icon: '🌐', title: 'Rooms for everyone', text: 'You can play solo or in multiplayer rooms with invite codes. These rooms are kept completely separate from the horse racing game’s rooms.' },
    ],
    loop: [
      { title: 'Grid', text: 'Play on your own, or create a multiplayer room or join one.' },
      { title: 'Bet', text: 'Choose one of the six cars and place your bet before betting closes.' },
      { title: 'Sync', text: 'The room’s seed is fetched and shared, so every player’s game runs the same race.' },
      { title: 'Race', text: 'The race runs as a fixed-step simulation, with cars overtaking each other live.' },
      { title: 'Payout', text: 'If you backed the winner, you collect your stake multiplied by the odds.' },
    ],
    features: [
      { icon: '🚗', title: 'Six supercars', text: 'Every car has a speed stat and an acceleration stat (which is really the engine’s stamina field with a new name), and the odds range from 2.5× to 12×.' },
      { icon: '👥', title: 'Multiplayer rooms', text: 'The Firebase rooms use their own section of the database, so the two racing games never get mixed up with each other.' },
      { icon: '🎨', title: 'Violet neon skin', text: 'Orange, cyan and pink highlights sit over a deep violet background, and you can switch between Default, Cyber and eSports palettes.' },
      { icon: '🤖', title: 'Bots & bounty', text: 'There are AI rivals, a live feed of bets, ranks, seasons and a daily bounty.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/car-game', [
          ['home', 'Home · Elite Circuit'],
          ['lobby', 'Lobby · grid & odds'],
          ['race-rules', 'Create an arena'],
          ['loading', 'Syncing the grid'],
          ['race', 'Betting & the live race'],
        ]),
      },
    ],
    math: {
      summary: 'The maths is exactly the same as Horse Racing Elite because the code is the same. I confirmed it by running all 10,001 seeds through it.',
      items: [
        { icon: '🏁', title: 'Velocity & ticks', text: 'Each car’s starting speed is a mix of 60% speed and 40% acceleration, plus a random amount. Then every 16ms, a small, limited amount of random jitter is added.' },
        { icon: '💰', title: 'Payout', text: 'You bet on a car to win, and the payout includes your stake: floor(stake × odds).' },
        { icon: '🔍', title: 'Audit result', text: 'Every car wins about one race in six, which means the fair price for each one is 6.0×. Because the fork simply copied values by position, the Ferrari ended up with Thunder Bolt’s numbers. The tutorial line saying that lower odds mean a safer pick also isn’t true for this simulation.' },
        { icon: '🛠️', title: 'Fix', text: 'Either give all six cars the same odds, set a little under 6.0×, or make the stats affect every tick and set new odds based on the measured win rates. Either way, the tutorial text needs to be corrected too.' },
      ],
    },
    tech: [
      { icon: '🍴', title: 'A clean fork', text: 'I changed the names, the colours and added a field for the car sprites. The engine, the game loop and the economy stayed the same as the horse game’s design.' },
      { icon: '🗄️', title: 'Database namespacing', text: 'Rooms are stored under their own Firebase path, so horse rooms and car rooms can’t see each other.' },
      { icon: '⚙️', title: 'Fixed-timestep loop', text: 'It uses the same accumulator loop, which gives identical results at any refresh rate.' },
      { icon: '🌱', title: 'Seeded races', text: 'Seeds come from the RNG service through the server proxy, with a local fallback in case the service is unavailable.' },
    ],
    challenges: [
      { problem: 'When you fork a game, you end up with duplicated data, and the two versions slowly start to behave differently.', solution: 'I kept a single engine design, gave the multiplayer data its own namespace and wrote down every difference between the two games.' },
      { problem: 'The engine was built for horses, but the text and stats needed to make sense for cars.', solution: 'I renamed stamina to acceleration in the interface, without changing any of the maths underneath.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase RTDB', 'requestAnimationFrame', 'CSS tokens', 'Vibe coding'],
    results: {
      metrics: [
        { value: '2', label: 'games from one racing engine' },
        { value: '60 FPS', label: 'fixed-step race loop' },
        { value: '6', label: 'supercars on the grid' },
      ],
      points: [
        'A second full game built on the same engine, with its own look and its own multiplayer namespace.',
        'A written comparison of the two versions, listing every shared value and every change in behaviour.',
      ],
    },
    learned: [
      'Giving a game a new look is easy, but forking it well is hard. Logic that both games share should live in one place.',
      'The text is part of the maths too. What the tutorial says has to match what the engine actually does.',
    ],
  },
  /* ───────────────────────────────── PROPBET ───────────────────────────────── */
  {
    kind: 'game',
    slug: 'propbet',
    title: 'PropBet',
    tagline: 'A real-time crash game. A plane climbs up a multiplier curve, and you need to cash out before it flies away.',
    kicker: 'Web Game · Crash',
    cover: '/Images/projects/propbet/cover.webp',
    accent: '#43e8ff',
    accent2: '#f4c64a',
    facts: [
      { label: 'Role', value: 'Developer · Vibe coder' },
      { label: 'Genre', value: 'Crash game · cash-out' },
      { label: 'House edge', value: '3% · 97% RTP' },
      { label: 'Stack', value: 'Next.js · TypeScript · Canvas' },
      { label: 'Fairness', value: 'Block-seeded mulberry32' },
      { label: 'Platform', value: 'Browser · Game Engine arcade' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/sky-crash` }],
    pitch: [
      'PropBet is a crash game that runs in the browser. A plane takes off and climbs along a multiplier curve that gets steeper and steeper, and it can crash at any moment. You can place up to two bets each round, and the goal is to cash out before the plane flies off.',
      'On the surface, a crash game is just one number going up. But everything important happens in the final frame before it stops. The curve has to climb smoothly at 60fps, the crash point has to be fair and stay hidden until it happens, and when you cash out you need to get exactly the multiplier that was showing on the frame you tapped.',
    ],
    pillars: [
      { icon: '🔒', title: 'Sealed at take-off', text: 'The crash point is decided once, at the start of the round, and the game loop simply reveals it when the time comes.' },
      { icon: '🎯', title: 'Frame-exact cash-outs', text: 'Whether you cash out by hand or set an automatic target, you’re paid the multiplier from that exact frame.' },
      { icon: '🛩️', title: 'A cockpit HUD', text: 'A huge live multiplier, a neon curve and a colour-coded history bar that you can understand at a glance.' },
    ],
    loop: [
      { title: 'Bet', text: 'Place up to two bets, and set automatic cash-out targets if you want them.' },
      { title: 'Take off', text: 'The crash point is worked out from the round’s seed and locked in before the plane takes off.' },
      { title: 'Climb', text: 'The multiplier grows following e^(0.1·t), which means it hits 2× at about 7 seconds and 10× at about 23 seconds.' },
      { title: 'Cash out', text: 'Tap to cash out, or let your automatic target do it for you. Each bet panel is settled separately.' },
      { title: 'Crash', text: 'The plane flies away, any bets still open are lost, and the result is added to the history bar.' },
    ],
    features: [
      { icon: '💰', title: 'Dual bet panels', text: 'You can run two bets at once. For example, you might cash one out early at 2× to play it safe and let the other one ride for 20×. You can also queue bets up for the next round.' },
      { icon: '⚡', title: 'Auto cash-out', text: 'Set a target for each panel, and the game cashes out the moment the curve passes it.' },
      { icon: '📊', title: 'Crash-history rail', text: 'A bar showing recent results, coloured from low to high. It’s the only record of past rounds shown on screen.' },
      { icon: '👥', title: 'Simulated participants', text: 'A list of other players cashing out helps every round feel live and busy.' },
      { icon: '🔊', title: 'Synthesised sound', text: 'Every sound effect is generated with WebAudio, so there are no audio files at all. Everything runs through one master volume control, which handles muting and volume.' },
      { icon: '💥', title: 'Canvas effects', text: 'A camera that follows the plane’s altitude, layered skies that move at different speeds, exhaust particles and a 16-frame explosion animation.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/propbet', [
          ['home', 'Home screen'],
          ['board', 'Betting board on the airfield'],
          ['crashed', 'Crashed - the plane flies away'],
          ['result', 'Round result & settlement'],
          ['how-to-play', 'How to play'],
        ]),
      },
    ],
    math: {
      summary: 'It uses the standard crash distribution that most crash games use, with the house edge built right into it. That means the expected return is the same no matter what target a player chooses.',
      items: [
        { icon: '📉', title: 'Crash distribution', text: 'The chance of the plane reaching at least x is (1 − edge) / x, using a 3% edge, with a cap of 5,000×. About 3% of rounds crash immediately at 1.00×.' },
        { icon: '📈', title: 'Multiplier growth', text: 'The multiplier follows m(t) = e^(0.1·t). It climbs smoothly, speeds up over time and behaves identically on every device.' },
        { icon: '⚖️', title: 'Why every target returns 97%', text: 'If you cash out at x, you get paid x, and the chance of getting there is 0.97 / x. Multiply those together and the expected return is always 0.97, whatever target you pick. The only thing that changes is how much the results swing around.' },
        { icon: '⛓️', title: 'Seeded rounds', text: 'Each round is seeded by a number taken from a blockchain block (through /api/crash-seed), combined with a counter that only ever goes up. These seed a mulberry32 random generator, and its first number sets the crash point. If the service is down, the game falls back to Math.random and flags that it did.' },
      ],
    },
    tech: [
      { icon: '🖼️', title: 'Canvas and refs', text: 'Game.tsx draws the canvas and the bet panels once. The whole simulation lives in refs on a requestAnimationFrame loop, and React state only gets updated a few times a second.' },
      { icon: '🧮', title: 'Pure engine', text: 'engine.ts holds the crash maths, the growth curve, the timing for each phase and the limits. The random generator is passed in from outside, so the engine can be tested on its own.' },
      { icon: '⏸️', title: 'Virtual clock', text: 'Pausing uses a virtual clock, so time doesn’t suddenly jump forward when you resume.' },
      { icon: '🐛', title: 'No stale closures', text: 'Cash-outs read the live multiplier from refs rather than from a React value that’s one frame old. Without that, a tap at 8.4× could end up paying the wrong amount.' },
    ],
    challenges: [
      { problem: 'Using setInterval and React state made the curve jittery, and cash-outs were being paid on an out-of-date multiplier.', solution: 'I switched to a requestAnimationFrame loop that works with refs, and bets are settled on the exact frame where the condition is met.' },
      { problem: 'If the crash were decided partway through the flight, the outcome would depend on timing.', solution: 'The crash point is locked in at take-off. On each frame, the game only checks whether the multiplier has reached it yet.' },
      { problem: 'Building a loop where timing matters this much using vibe coding.', solution: 'I wrote out the state machine, the crash distribution, the curve and the cash-out rules on paper before writing a single prompt, then checked each part against that plan as it was built.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'HTML5 Canvas', 'WebAudio', 'mulberry32', 'Vibe coding'],
    results: {
      metrics: [
        { value: '97%', label: 'return to player at any target' },
        { value: '60 FPS', label: 'canvas render loop' },
        { value: '5,000×', label: 'maximum multiplier' },
      ],
      points: [
        'A finished crash game with two bet panels, automatic cash-outs for each, a history bar, other players, sound effects and 50,000 demo credits to play with.',
        'Rounds are seeded from blockchain blocks and can be reproduced, and the house edge sits inside the crash distribution itself.',
        'Next up: a "verify" link in the game for each round’s block, saved progress between sessions, and real multiplayer instead of simulated players.',
      ],
    },
    learned: [
      'When you’re building a real-time game in React, running the loop yourself over refs is the right approach.',
      'When the timing really matters, vibe coding only works if you’ve designed things properly first.',
    ],
  },
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
      { icon: '📢', title: 'Publish the risk', text: 'Before you commit, the gauge shows you the chance that this pull will bring the tower down, so you’re making a real judgement instead of guessing.' },
      { icon: '⚖️', title: 'Price it honestly', text: 'The payouts come straight from the published risk curve, so no step is a better deal than any other.' },
      { icon: '🎭', title: 'Fake the physics, honestly', text: 'Whether the tower falls is decided before the claw even moves, and the animation never pretends that it isn’t.' },
    ],
    loop: [
      { title: 'Build', text: 'A new 48-block tower is built and its seed is locked in.' },
      { title: 'Stake', text: 'Buy a climb ticket, a tumble ticket, or both.' },
      { title: 'Pull', text: 'The claw pulls a block from the bottom 68% of the tower and puts it on top.' },
      { title: 'Hold', text: 'You get 8 seconds to decide whether to keep going or cash out. If you let the timer run out, you’re cashed out automatically.' },
      { title: 'Tumble', text: 'When the tower falls, the seed is revealed so every roll can be checked.' },
    ],
    features: [
      { icon: '📈', title: 'A 16-rung ladder', text: 'The climb maxes out at pull 16, paying 484.85×. Roughly one tower in 500 gets that far.' },
      { icon: '🎟️', title: 'Tumble bands', text: 'A separate bet on which pull will knock the tower down: 1-3, 4-6, 7-9 or 10 and up.' },
      { icon: '🛡️', title: 'Safe by default', text: 'If you run out of time, you’re cashed out rather than losing. You can also set a plan to ride to a certain pull, so the game doesn’t become a test of how fast you can tap.' },
      { icon: '🎚️', title: 'One number, every channel', text: 'The collapse factor controls almost everything you see and hear: how much the tower sways, the colour of the floor ring, the claw’s lamp, the vignette, the dust, the pitch of the background hum and the gauge itself.' },
      { icon: '📄', title: 'An engineering sheet', text: 'The whole look sticks to navy, cyan and amber, with sharp corners, monospaced numbers and an interface grid that lines up with the floor texture, just like a technical drawing.' },
      { icon: '🧾', title: 'Run record', text: 'The fairness panel lists every roll in the run next to the collapse factor it was tested against.' },
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
        { icon: '📐', title: 'The hazard ramp', text: 'The risk starts at 4% and goes up by 3.5 percentage points with each pull, until collapse is certain at pull 29. That end point is calculated from the curve rather than typed in, so if the step size changes, every table updates itself.' },
        { icon: '🪜', title: 'The climb', text: 'The payout is climbPays(n) = RTP / SURVIVAL[n], with an RTP of 0.97. In other words, the multiplier you’re paid is the fair one scaled by a fixed amount, so the return is the same at every step.' },
        { icon: '✂️', title: 'Truncated, never rounded up', text: 'Prices are shown to two decimal places and always rounded down, never up. A check() function then works out the real return from those rounded prices: between 96.42% and 97.00% on the climb, and between 96.66% and 96.91% on the tumble bets.' },
        { icon: '🎯', title: 'Tumble bands', text: '1-3 Brittle 20.97% → 4.62× · 4-6 Shaky 35.54% → 2.72× · 7-9 Sturdy 27.64% → 3.50× · 10+ Monolith 15.86% → 6.11×. The ranges are split where most collapses actually happen, so none of them is a long-shot lottery ticket.' },
        { icon: '🔒', title: 'One seal per tower', text: 'drawRun uses one seeded stream to draw all 29 rolls at the very start. The block value is locked in when the tower is built and revealed when it falls.' },
      ],
    },
    tech: [
      { icon: '🧱', title: 'Strict layering', text: 'React looks after the wallet, the tickets and the current phase, and it gives the 3D world a single read-only WorldView. Apart from that, the only way the two talk is through four one-off cues: build, pull, tumble and cashOut. The engine/ folder never imports React, and the components/ folder never imports three.js.' },
      { icon: '🌊', title: 'Three effects, no solver', text: 'Swaying, settling and falling all move the blocks more the higher up they are. That one property is what makes a pile of blocks look like a real stack.' },
      { icon: '📷', title: 'Camera fit', text: 'The camera works out how to frame the tower based on its current height, so as the tower grows it never gets cut off.' },
      { icon: '♿', title: 'Real DOM controls', text: 'Buttons, keyboard focus and screen reader support are all real HTML sitting on top of a transparent canvas, not drawn pixels.' },
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
      { icon: '❓', title: 'One question', text: 'Two buttons and nothing else. I also built bets on the winning margin and a 5-0 lottery bet, and they were priced correctly, but I cut them because they made the game harder to understand.' },
      { icon: '🥊', title: 'Something to watch', text: 'Whichever face lands on the majority of coins settles the bet. The size of the win then decides how hard the hit lands in a duel that keeps a running score.' },
      { icon: '💱', title: 'A price that moves', text: 'Each face gets a new price every round, taken from a ladder of prices that is never in the player’s favour.' },
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
      { icon: '🪙', title: 'Five minted coins', text: 'With an odd number of coins, every bet is settled. There’s no tie and no refund.' },
      { icon: '🛡️', title: 'Breakable shields', text: 'Shields wear down at a rate that usually breaks them around round seven, which is why the last third of a duel is where the big hits happen.' },
      { icon: '🌌', title: 'A procedural neon pit', text: 'The coin faces, hex shields, floor patterns, LED scoreboard and a holographic crowd are all generated in code. On top of that, there’s a bloom effect and a custom vignette.' },
      { icon: '🔊', title: 'Synthesised sound', text: 'Sound effects are generated in WebAudio. The one recorded music track only gets downloaded the first time music is actually needed.' },
      { icon: '♿', title: 'DOM accessibility mirror', text: 'Every control and readout in the 3D world has a real HTML copy, so the game works with keyboards and screen readers.' },
      { icon: '🎨', title: 'One source of geometry', text: 'The sun and moon designs come from a single file of vector paths. That same file is used to draw the logo, the SVG buttons and the canvas texture on the 3D coins.' },
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
        { icon: '🎲', title: 'The bet', text: 'The chance of SUN winning is P(k ≥ 3) = 16/32 = ½, which follows from symmetry. So the fair price on either face is exactly 2.00×.' },
        { icon: '💥', title: 'The fight', text: 'Damage equals the size of the score. A 3-2 graze happens 62.50% of the time, a 4-1 hit 31.25% and a 5-0 sweep 6.25%. The average damage is 1.875, so a duel starting at 12 life lasts about 12 rounds.' },
        { icon: '🪜', title: 'The price ladder', text: 'Every round, each face is priced from six matching steps between 1.89× and 1.99×, picked using a second slice of the sealed block value. The average comes out at exactly 1.94×, which makes the return to player exactly 97.000%.' },
        { icon: '🚫', title: 'Never above fair', text: 'Even the best price, 1.99×, is below the fair 2.00×, so no single round ever favours the player. Someone who only ever bet at the best price would get 99.5% back. A swing of ±0.05 is as wide as the price can go while still being honest.' },
        { icon: '🧱', title: 'The shield never touches the coin', text: 'Shields only change the damage after the score is known, and the bet is settled on the score alone. check() confirms this, because if a worn-down fighter were more likely to lose a toss, the real price would quietly change.' },
      ],
    },
    tech: [
      { icon: '🤝', title: 'React ↔ three.js contract', text: 'React looks after the wallet, the bet, the duel and the current phase, and it hands the 3D world a read-only WorldView. Player input comes back as Intents. The engine/ folder never imports React and components/ never imports three.js. Three other games in the arcade use this same setup.' },
      { icon: '🎥', title: 'Crop-proof camera', text: 'Every camera shot defines an area that must never be cut off, and the camera works out how far back it needs to be for the current screen shape. That way, phones never lose a coin off the edge.' },
      { icon: '🔤', title: 'Self-hosted fonts', text: 'The 3D layer draws its text with fillText, so if a web font failed to load, the whole interface would fall back to Times New Roman. Hosting the fonts myself avoids that.' },
      { icon: '🔒', title: 'Duel-wide seal', text: 'A server route fetches the block value. It seeds mulberry32 for every toss in the duel and is revealed once one of the fighters goes down.' },
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
  /* ───────────────────────────── KAMBA ADEEMA ───────────────────────────── */
  {
    kind: 'game',
    slug: 'kamba-adeema',
    title: 'Kamba Adeema',
    tagline: 'කඹ ඇදීම - the tug of war from the Sinhala and Tamil New Year (Avurudu) festivities, turned into a simple 3D betting game played in front of a crowd of two hundred.',
    kicker: 'Web Game · Cultural Sport',
    cover: '/Images/projects/kamba-adeema/cover.webp',
    accent: '#e8b84a',
    accent2: '#b5e04a',
    facts: [
      { label: 'Role', value: 'Developer · Game designer' },
      { label: 'Genre', value: 'Tug of war · draw-no-bet' },
      { label: 'Return', value: '97.09% (closed form)' },
      { label: 'Stack', value: 'Next.js 15 · React 19 · three.js' },
      { label: 'Scale', value: '~16k lines · 200 instanced spectators' },
      { label: 'Fairness', value: 'Block seed, sealed per match' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/kamba-adeema` }],
    pitch: [
      'Kamba Adeema is the tug of war that usually wraps up a Sri Lankan Avurudu sports day, rebuilt as a betting game. Two halves of a village, Uda Pila and Yati Pila, put four people each on one rope, with around two hundred spectators watching.',
      'On every heave, each of the eight pullers either grips or slips, like eight separate fair coin tosses. The difference between the two sides settles the bet and drags the rope that many marks. Traditional games don’t come with a paytable, so most of the work was figuring out the one honest question you can bet on, and deciding what to leave out.',
    ],
    pillars: [
      { icon: '❓', title: 'One honest question', text: 'Which side wins this heave? It’s settled in about four seconds, and it’s exactly what anyone watching a tug of war is already wondering.' },
      { icon: '🧱', title: 'A separable contest', text: 'Stamina, collapsing and the lime lines turn it into a real contest, but none of them are allowed to affect the price.' },
      { icon: '🏘️', title: 'Put the village in', text: 'Without people, the field is just a physics demo. Two hundred spectators, flags and parasols only cost five draw calls.' },
    ],
    loop: [
      { title: 'Take the rope', text: 'Four pullers on each side line up on the generated field.' },
      { title: 'Back a side', text: 'Pick Uda or Yati and set your bet on a plank with a minus and a plus button.' },
      { title: 'Heave', text: 'Eight fair coin tosses decide whether each puller grips or slips.' },
      { title: 'Haul', text: 'The difference settles the bet and drags the rope. If one side is exhausted and collapses, the rope moves twice as far.' },
      { title: 'The line', text: 'The match ends when one side is dragged over the line, and then the seed is revealed.' },
    ],
    features: [
      { icon: '🪢', title: 'A rope that owns the contest', text: 'The characters check the rope’s position every frame. Their hands are placed onto its moving curve, and their bodies lean based on how tight it is.' },
      { icon: '😮‍💨', title: 'Stamina & collapse', text: 'Gripping uses up stamina. If a tired side gets pulled two marks or more, it’s dragged twice as far, which makes real comebacks possible.' },
      { icon: '👥', title: 'An instanced crowd', text: 'Five instanced meshes draw around 200 spectators, along with their arms, flags and parasols, on a terraced bank and two corner stands.' },
      { icon: '🖌️', title: 'Village-fair look', text: 'Sun-faded gold, terracotta for Uda, lime green for Yati, hand-painted signs and a carved medallion for the title. The whole thing is meant to feel like a village fair.' },
      { icon: '♿', title: 'DOM mirror', text: 'The 3D interface has a hidden HTML copy underneath, with focusable buttons that have ARIA labels, real slider inputs and spoken commentary.' },
      { icon: '🤝', title: 'A draw refunds', text: 'A four-all heave doesn’t belong to either side, so you get your stake back, the same way a draw works in any draw-no-bet market.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/kamba-adeema', [
          ['title-screen', 'Title · the medallion'],
          ['team-lineup', 'Team line-up'],
          ['betting-board', 'Back Yati or Uda'],
          ['heave-result', 'The heave'],
          ['draw-refund', 'Four all · refund'],
        ]),
      },
    ],
    math: {
      summary: 'The swing is Uda grips minus Yati grips, a number between −4 and +4. Using Vandermonde’s identity, this simplifies to a shifted Binomial(8, ½), giving 1, 8, 28, 56, 70, 56, 28, 8 and 1 ways out of 256.',
      items: [
        { icon: '⚖️', title: 'The one market', text: 'Yati win it 93/256 of the time (36.33%), it’s four all 70/256 of the time (27.34%), and Uda win it 93/256 of the time. Both sides pay 1.92×, and a draw gives your stake back.' },
        { icon: '🎯', title: 'Fair is exactly evens', text: 'The fair price is (1 − 70/256) / (93/256) = 2.00×, because both sides are the same. The return is 1.92 × 93/256 + 70/256 = 97.09375%.' },
        { icon: '🛑', title: 'Stamina never touches the coin', text: 'A collapse doubles how far the rope moves, but the bet is always settled on the swing. check() makes sure the probabilities add up to 1, that each outcome is counted only once and that both sides are priced the same.' },
        { icon: '🔬', title: 'Measured, not asserted', text: 'I wrote a faithful copy of the game logic and ran 6,000,000 heaves and 500,000 matches through it. The swing matched Binomial(8, ½) to within 0.045 percentage points, and the measured return came out between 97.08% and 97.11%.' },
        { icon: '🔒', title: 'A match-wide seal', text: 'One block value seeds a whole match of about 18 heaves. It’s locked in when the match starts and revealed when one side crosses the line.' },
      ],
    },
    tech: [
      { icon: '🤝', title: 'React ↔ three.js contract', text: 'React looks after the wallet, the bet, the match and the current phase. The 3D world gets a read-only WorldView and sends back Intents, which means the 3,500-line scene and the 1,500-line phase machine can change independently.' },
      { icon: '⏳', title: 'Wait on the rope, not a clock', text: 'The haul phase waits until the rope has finished moving (ropeBusy), so a one-mark nudge and a four-mark collapse each take as long as they look like they should.' },
      { icon: '📐', title: 'Generated pitch', text: 'Player positions, rope length, mark size and the lines are all worked out from a few constants, so the field, the rules and the characters always stay in sync.' },
      { icon: '🛰️', title: 'Server seed route', text: 'The RNG token stays on the server, and the endpoint always responds with a 200, so if the upstream service is slow to wake up the browser never sees an error.' },
    ],
    challenges: [
      { problem: 'It’s realistic for a tired team to grip less often, but that would break the price.', solution: 'Stamina only changes how far the rope moves once the swing has already been decided.' },
      { problem: 'The betting board started out with fifteen priced squares, four chip sizes and a second market.', solution: 'I cut it down to seven squares, then three, and finally to two buttons and one stake plank. Every version was priced correctly before I cut it further.' },
      { problem: 'When the bodies and the rope are animated on separate clocks, the hands come off the rope.', solution: 'setMark is the only thing that can move the contest along, and everything else just reads the rope’s position.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript (strict)', 'three.js', 'InstancedMesh', 'WebAudio', 'mulberry32'],
    results: {
      metrics: [
        { value: '97.09%', label: 'closed-form RTP, measured 97.08-97.11%' },
        { value: '2.00×', label: 'fair price, exact by symmetry' },
        { value: '200', label: 'spectators in five draw calls' },
        { value: '1', label: 'bet, down from fifteen squares' },
      ],
      points: [
        'A finished 3D game based on a traditional Sri Lankan sport, with characters that grip the rope properly, an instanced crowd and a full accessibility layer.',
        'Every match is locked to a block value from the first heave until one side crosses the line.',
        'Next up: publishing a hash of the seed in advance, settling bets on the server, and village-against-village multiplayer.',
      ],
    },
    learned: [
      'The best pricing work I did was cutting things. Fifteen correctly priced squares were worse than one.',
      'How easy a bet is to understand matters as much as the maths behind it.',
      'Check by measuring. Running a faithful copy over millions of heaves catches things that reasoning alone misses.',
    ],
  },
  /* ─────────────────────────────── KANA MUTTI ─────────────────────────────── */
  {
    kind: 'game',
    slug: 'kana-mutti',
    title: 'Kana Mutti',
    tagline: 'කණ මුට්ටි - the blindfolded pot-smashing game from the Avurudu festival, turned into a cash-out game where you can’t read the board until the round is over.',
    kicker: 'Web Game · Sealed Reveal',
    cover: '/Images/projects/kana-mutti/cover.webp',
    accent: '#f2b33d',
    accent2: '#d9673a',
    facts: [
      { label: 'Role', value: 'Developer · Game designer' },
      { label: 'Genre', value: 'Cash-out ladder · 3 risk levels' },
      { label: 'Return', value: '97% (Careful, Risky)' },
      { label: 'Stack', value: 'Next.js 15 · React 19 · three.js' },
      { label: 'Accessibility', value: 'WebGL + full DOM mirror' },
      { label: 'Fairness', value: 'Block seed, sealed reveal' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/kana-mutti` }],
    pitch: [
      'Four clay pots hang from a rope tied between two trees. You place a bet, choose how many of the four pots are empty, and then guide a blindfolded striker to one pot at a time. Every pot full of coins raises your multiplier, but an empty one ends the round.',
      'The ladder itself isn’t the interesting part. The hard part is trust. Afterwards, anyone has to be able to check the board (that’s what provably fair means), but while you’re still picking, it has to be impossible to work out. Kana Mutti is the game in the arcade that shows how to do both at the same time.',
    ],
    pillars: [
      { icon: '🔍', title: 'Verifiable', text: 'The board is built from a public block value that anyone can check independently, rather than a hidden roll on a server.' },
      { icon: '🙈', title: 'Secret while it matters', text: 'The shuffle code is included in the game’s files, so the seed is kept hidden until the round is over.' },
      { icon: '🏮', title: 'A festival pastime', text: 'A blindfolded striker, hanging pots, coins and broken shards. It’s a festival game from Avurudu, played in 3D.' },
    ],
    loop: [
      { title: 'Stake & risk', text: 'Choose Careful (1 empty pot), Risky (2) or Daredevil (3).' },
      { title: 'Shuffle', text: 'The block value and a round counter seed mulberry32, which then shuffles the four pots using a Fisher-Yates shuffle.' },
      { title: 'Sealed', text: 'The trust badge shows SEALED, and the audit details are kept somewhere the interface can’t read them.' },
      { title: 'Smash', text: 'Point the striker at a pot. Coins raise your multiplier, and an empty pot ends the round.' },
      { title: 'Unsealed', text: 'Whether you cash out, hit an empty pot or clear the whole board, the block, hash, counter and board are all revealed.' },
    ],
    features: [
      { icon: '🎚️', title: 'Three risk levels', text: 'More empty pots means bigger payouts. With only four pots, two of the risk levels would end up with the same odds, so that tie is settled in the player’s favour.' },
      { icon: '🛡️', title: 'Three-state trust chip', text: 'The badge shows FAIR before a round, SEALED during one and the block number once it’s over. It’s built in real HTML with a data table, closes with Escape and keeps keyboard focus inside while it’s open.' },
      { icon: '🧑‍🦯', title: 'Blindfolded striker', text: 'The striker walks over and swings at the pot you chose, and a hit bursts into coins and shards.' },
      { icon: '♿', title: 'Accessible from day one', text: 'There’s an HTML copy underneath the WebGL scene, so you can play with a keyboard or a screen reader.' },
      { icon: '🔊', title: 'WebAudio', text: 'Festival sound effects, all generated in code.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/kana-mutti', [
          ['title-screen', 'Title screen'],
          ['place-bet', 'Place your bet'],
          ['pot-selection', 'Four pots on the rope'],
          ['pot-smashed', 'Pot smashed'],
          ['round-win', 'Cleared them all'],
        ]),
      },
    ],
    math: {
      summary: 'The multiplier after k safe picks is one over the chance of drawing k safe pots in a row without putting any back. That’s a standard hypergeometric calculation rather than a made-up curve, and it’s then scaled by each risk level’s return.',
      items: [
        { icon: '🪜', title: 'The ladder', text: 'm = Π (n − j) / (n − d − j) for j < k, multiplied by the level’s return, which is 0.97 for Careful and Risky.' },
        { icon: '🎁', title: 'The Daredevil promise', text: 'With four pots, choosing 1 of 4 and 3 of 4 give the same number of combinations, so Careful and Daredevil would end up with the same top prize. That would break the promise that more empty pots means bigger payouts. Daredevil keeps that promise on purpose, and so it pays back 175%.' },
        { icon: '📊', title: 'No positional bias', text: 'I ran an exact copy of the shuffle code for 400,000 rounds per risk level, across the full range of block values. Empty pots landed in each position 24.96-25.07%, 49.80-50.17% and 74.84-75.09% of the time, and the biggest difference from perfect was just 0.39 percentage points.' },
        { icon: '🔁', title: 'Prime-stride nonce', text: 'New blocks come roughly every 12 seconds, but rounds can be quicker than that. So I use a counter that never resets and steps forward by a prime number, which keeps back-to-back boards independent. Boards repeat about 1 time in 6, which is exactly what you’d expect from two independent draws.' },
      ],
    },
    tech: [
      { icon: '🔐', title: 'The seal is a ref', text: 'The audit details are stored in a ref that the rendering code can’t read. The visible state resets to empty every round and is only filled in at three moments: when you cash out, when you hit an empty pot, or when you clear the board.' },
      { icon: '🛰️', title: 'Server seed route', text: 'The server route keeps its token private, retries when the block clock lags, caches good results for 9 seconds and failures for 5 seconds, backs off more each time it fails, and always responds with a 200 along with a flag if it had to fall back.' },
      { icon: '🔀', title: 'Injectable generator', text: 'The shuffle takes its random generator as an input, so I could switch the seed source from the browser’s crypto RNG to the blockchain block without touching the shuffle logic.' },
      { icon: '📍', title: 'Chrome-free corner', text: 'The trust badge sits in the bottom-left corner, the one spot the 3D scene never draws into during any phase.' },
    ],
    challenges: [
      { problem: 'If the seed were published at the start of a round, a player could run the public shuffle code themselves and know what’s in every pot.', solution: 'The seed is still public, but it’s held back until the round is over, and the game shows that it’s sealed instead of hiding the fact.' },
      { problem: 'The poker game kept its cards secret by dropping the blockchain seed altogether, but that means nobody can check it afterwards.', solution: 'Kana Mutti’s secret only needs to last until you’ve finished picking, so it can have both secrecy and the ability to be checked.' },
      { problem: 'Two quick rounds within the same block would end up with the same board.', solution: 'A counter that only ever goes up, stepping by a prime number, is mixed into every round.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript (strict)', 'three.js', 'WebAudio', 'mulberry32', 'Fisher-Yates'],
    results: {
      metrics: [
        { value: '0.39 pp', label: 'worst positional deviation over 400k rounds' },
        { value: '3', label: 'reveal points - nothing else unseals' },
        { value: '97%', label: 'RTP on Careful and Risky' },
        { value: '0', label: 'tokens in the client bundle' },
      ],
      points: [
        'A finished 3D game based on an Avurudu pastime, which also serves as the arcade’s reference example of sealed-reveal fairness.',
        'Next up: bringing the sealed reveal to the racing games, and moving the results to the server so the seal still holds even if someone tampers with their game.',
      ],
    },
    learned: [
      'Trust features are engineering, not decoration. The seal means something because it’s stored in a ref the rendering code can’t read.',
      'Showing a lock icon is better than leaving an empty space that looks like a bug.',
      'Each game needs its own kind of fairness. A poker deal has to stay secret forever, but a pot board only needs to stay secret until the round ends.',
    ],
  },
  /* ─────────────────────────────── PIXEL POKER ─────────────────────────────── */
  {
    kind: 'game',
    slug: 'pixel-poker',
    title: 'Pixel Perfect Poker',
    tagline: 'A six-player No-Limit Hold’em Sit & Go with proper side pots, AI opponents that think using simulations, and a card deal that has to stay secret.',
    kicker: 'Web Game · Skill · No House',
    cover: '/Images/projects/pixel-poker/cover.webp',
    accent: '#39ff88',
    accent2: '#ff3fd2',
    facts: [
      { label: 'Role', value: 'Developer · Game designer' },
      { label: 'Format', value: '6-max NLHE Sit & Go' },
      { label: 'Opponents', value: '5 AI personalities' },
      { label: 'Stack', value: 'Next.js 15 · React 19 · TypeScript' },
      { label: 'Multiplayer', value: 'Firebase RTDB, host-authoritative' },
      { label: 'Deal', value: 'crypto.getRandomValues' },
    ],
    links: [{ label: 'Play the game', href: `${ENGINE}/pixel-poker` }],
    pitch: [
      'Pixel Perfect Poker is a single-table No-Limit Hold’em tournament with a retro pixel-art look. You play against five AI opponents, each with their own personality, or against your friends in a multiplayer room.',
      'It’s the odd one out in the arcade. There are no odds, no payout multipliers and no house edge, because there’s no house at all. Chips only move between the players. Every other game creates a number that has to be checkable afterwards, but this one creates an order of cards that has to stay secret.',
    ],
    pillars: [
      { icon: '🤫', title: 'Secrecy over audit', text: 'If the seed were published, anyone could work out the whole deck. So the cards are dealt using the browser’s cryptographic random number generator instead.' },
      { icon: '🧮', title: 'Side pots, correctly', text: 'Pots are built up in layers based on how much each player has put in. Uncalled chips are returned, and any odd leftover chips go to the earliest seat.' },
      { icon: '🙅', title: 'Bots that don’t cheat', text: 'The bots only use information that every player can see. When they estimate their chances, they simulate the cards they can’t see rather than peeking at the real deck.' },
    ],
    loop: [
      { title: 'Deal', text: 'A newly shuffled deck is used for every hand, and the blinds are posted.' },
      { title: 'Betting', text: 'Betting happens pre-flop, on the flop, on the turn and on the river, following the minimum raise rules and giving the big blind its option.' },
      { title: 'Runout', text: 'When players are all in, the rest of the board is dealt out automatically.' },
      { title: 'Showdown', text: 'Hands are scored, side pots are paid out and the winning five cards light up.' },
      { title: 'Next level', text: 'The blinds go up every six hands until one player has all the chips.' },
    ],
    features: [
      { icon: '🃏', title: 'A complete rules engine', text: 'It handles minimum raises, short all-ins that don’t reopen the betting, split pots, the wheel straight, heads-up blinds and players being knocked out.' },
      { icon: '🤖', title: 'Five personalities', text: 'Viper plays tight and aggressive, Luna loose and passive, Dmitri is the rock, Sasha is the maniac and Kane keeps things balanced.' },
      { icon: '⏫', title: 'Ten blind levels', text: 'Everyone starts with 2,000 chips, and the blinds go from 10/20 (100 big blinds) all the way up to 500/1000, which makes sure the tournament always finishes.' },
      { icon: '👥', title: 'Multiplayer rooms', text: 'Firebase rooms with invite codes, showing who’s online, with the host sending out the game state and players’ actions queued up.' },
      { icon: '👾', title: 'Pixel art with no images', text: 'Cards, chips and avatars are pixel images drawn as SVG, and every sound is chiptune generated in code.' },
      { icon: '📖', title: 'Practice table & rankings', text: 'A practice table that walks new players through the basics, and a chart of hand rankings you can open during the game.' },
    ],
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/pixel-poker', [
          ['title-screen', 'Title & mode select'],
          ['table-preflop', '6-max table, pre-flop'],
          ['hand-rankings', 'Hand rankings'],
          ['how-to-play', 'Practice table briefing'],
          ['create-lobby', 'Create a lobby'],
        ]),
      },
    ],
    math: {
      summary: 'There’s no house edge to price here. The maths in this game is all about ranking hands, splitting side pots and estimating how likely an opponent is to win.',
      items: [
        { icon: '🔢', title: 'A hand as one integer', text: 'Each hand is turned into one number: first its category, then five tie-break ranks packed together in base 15. Comparing two hands is then just a matter of checking which number is bigger. The best five cards out of seven are found by checking all 21 combinations, and the wheel (A-5-4-3-2) is handled as a special case.' },
        { icon: '🂠', title: 'Pre-flop: the Chen formula', text: 'The bots rate their starting hands from about −1 to 20 (A-A is 20, K-K 16 and A-Ks 12). Below 8 big blinds they switch to going all in or folding, and they open with raises of 2.2 to 3.2 big blinds, plus one more for every player who just called.' },
        { icon: '🎲', title: 'Post-flop: Monte-Carlo equity', text: 'The bots run 130 quick trials, dealing random hands to up to three opponents from the cards they can’t see using a partial Fisher-Yates shuffle. That gives a margin of error of about 4.4%, which makes the bots misjudge situations a bit like real people do.' },
        { icon: '🎭', title: 'Personality in every threshold', text: 'Three settings, loose, aggr and bluff, shape every decision. Sasha will open with a hand rated at 0.36, while Dmitri waits for 0.457.' },
        { icon: '🔐', title: 'Two RNGs by design', text: 'Anything that decides which cards come out uses crypto.getRandomValues with a proper Fisher-Yates shuffle. Math.random is only used for small cosmetic variations in how the bots behave.' },
      ],
    },
    tech: [
      { icon: '⚙️', title: 'Engine owns the rules', text: 'A strict, step-by-step phase machine handles dealing, betting, pots, the showdown and the blinds. React only controls the pacing and the animations, which meant I could test the engine without any visuals at all.' },
      { icon: '🗄️', title: 'No game server', text: 'The lobby and room details are stored in the Firebase Realtime Database. During live play, the host’s game is the one in charge, and other players’ actions are sent to it through a queue.' },
      { icon: '🎨', title: 'Assets as code', text: 'Because the pixel art is SVG and the chiptune is generated with WebAudio, the game doesn’t need a single image or audio file.' },
      { icon: '📝', title: 'Honest notes', text: 'Using buf[0] % n introduces a tiny bias, about one part in 100 million for a 52-card deck. It makes no difference in play, but I wrote it down rather than hiding it.' },
    ],
    challenges: [
      { problem: 'Being provably fair and keeping information hidden pull in completely opposite directions.', solution: 'The cards are dealt with a crypto RNG that can’t be read. When secrecy matters more than public checking, that’s the right trade-off.' },
      { problem: 'Side pots and minimum raise edge cases only break with very specific all-in situations.', solution: 'I built the rules first and tested them without any visuals before drawing anything, with each pot built from its own list of eligible players.' },
      { problem: 'Playing against perfect bots isn’t any fun.', solution: 'The bots use a deliberately rough 130-trial estimate of their chances, and they only bluff with weak hands when it’s heads-up or three players.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript (strict)', 'Firebase RTDB', 'SVG', 'WebAudio', 'Web Crypto'],
    results: {
      metrics: [
        { value: '0', label: 'house edge - chips move between players' },
        { value: '130', label: 'Monte-Carlo trials per decision' },
        { value: '10', label: 'blind levels, guaranteed to finish' },
        { value: '5', label: 'AI playing styles' },
      ],
      points: [
        'A complete poker engine running in the browser, covering betting rules, side pots and split pots, the wheel straight, heads-up play, rising blinds and knockouts.',
        'A review confirmed that the crypto RNG and the Fisher-Yates shuffle are both correct, and that the randomness that matters for fairness is kept separate from the cosmetic kind.',
        'Next up: dealing the cards on the server, and committing to the deck order before revealing it, so friends can play each other for real.',
      ],
    },
    learned: [
      'Using two random generators is a deliberate design choice, not a shortcut.',
      'A game with hidden information can’t use the same fairness approach as a game without it.',
      'AI that feels human is mostly about getting the amount of imprecision just right.',
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
      { icon: '🎯', title: 'Priced to a perfect player', text: 'The value of each point is worked out from a perfect round, so nobody, however good they are, can beat the house.' },
      { icon: '⚡', title: 'Speed is part of the bet', text: 'You choose Steady, Brisk or Frantic right next to your bet, because each speed pays out within its own range.' },
      { icon: '🔨', title: 'The picture never lies', text: 'The mallet is always exactly where your pointer is, and one calculation decides both where you’re aiming and what you hit.' },
    ],
    loop: [
      { title: 'Speed & chip', text: 'Choose your bet and a speed, and each speed comes with its own reward range.' },
      { title: 'Price drawn', text: 'This round’s maximum return is picked from that range, using the sealed block value.' },
      { title: 'Board sealed', text: 'Every creature that will appear in the round is decided up front from the same locked-in seed.' },
      { title: 'Frenzy', text: 'Fifteen seconds of whacking, with the Golden Rush doubling everything in the last four.' },
      { title: 'Published', text: 'Cash out your winnings, and the whole board is printed out row by row in the fairness panel.' },
    ],
    features: [
      { icon: '🐹', title: 'Four creatures', text: 'Moles appear 72% of the time (+1), golden moles 8% (+5), bombs 16% (they halve your winnings) and skulls 4% (they end the round). You can tell them apart from their shadows alone.' },
      { icon: '👑', title: 'The Golden Rush', text: 'The last four seconds score double, right when the creatures appear for the shortest time and mistakes are most likely.' },
      { icon: '⌨️', title: 'Full keyboard play', text: 'The 3×3 grid is mapped to QWE/ASD/ZXC and to the number pad keys 7-9/4-6/1-3, and both work at the same time.' },
      { icon: '🎵', title: 'Synthesised sound', text: 'A 108bpm music track that doubles its tempo as the clock runs down, and 90ms bonk sounds, all generated with WebAudio.' },
      { icon: '🖌️', title: 'Zero image files', text: 'The soil, fur, stars, puffs and glows are all drawn with a 2D canvas when the game loads and then cached, so the whole lawn only weighs tens of kilobytes.' },
      { icon: '💥', title: 'Pooled particles', text: 'All the particles come from one pool that’s set up in advance. When it’s full, it skips effects instead of growing, so there are no garbage collection pauses during the busiest four seconds.' },
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
        { icon: '🧮', title: 'Derived point value', text: 'The value of a point is pointValue = price(rtp / CLEAR_POINTS[level]). A perfect round pays back the maximum, and anything less than perfect pays back less.' },
        { icon: '🎚️', title: 'Three disjoint bands', text: 'Steady pays 88-91% (3.92-4.05×), Brisk 91.5-94% (4.07-4.18×) and Frantic 94.5-97% (4.21-4.32×). There’s a 0.5-point gap between each range, so rounding down can never make two neighbouring ranges overlap.' },
        { icon: '📉', title: 'Floored, never rounded', text: 'Every price, and every time a bomb halves your winnings, is rounded down. Rounding up would mean the house pays more than it said it would.' },
        { icon: '📐', title: 'Closed-form returns', text: 'A bomb turns your winnings B into B/2, and a skull turns them into 0. Both of those are simple linear changes, so I could work out the exact return for five different skill levels. It ranges from about 35% for a first go at Frantic up to the level’s maximum, and never goes past it.' },
        { icon: '⏱️', title: 'Fixed tempo', text: 'When creatures pop up follows a fixed schedule for each level (for example, from 1040ms down to 648ms on Frantic). Only which creatures appear and the price are random, and both are sealed.' },
      ],
    },
    tech: [
      { icon: '🎯', title: 'One projection', text: 'boardPoint() places the pointer on one flat, unlimited surface in the mound’s space, and both aim() and holeAt() read from it. This replaced the old setup of one aiming surface plus nine stacked hit spheres, which was causing missed hits.' },
      { icon: '🔨', title: 'An undamped mallet', text: 'The mallet’s position follows the pointer directly with no smoothing at all. Only its height, tilt, roll and recoil are smoothed.' },
      { icon: '📷', title: 'A fixed camera', text: 'The camera looks down at 33° over a mound tilted back 8°, so every hole looks like an open oval. I tried zooming the camera in during the Golden Rush, but it felt like the game had stopped registering clicks, so I took it out.' },
      { icon: '🛰️', title: 'Server seed route', text: 'The server route keeps its token private, retries up to five times if the block clock lags, caches good results for 9 seconds and failures for 5 seconds, and always responds with a 200. It also adds a counter so four rounds on the same block never get the same board.' },
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
