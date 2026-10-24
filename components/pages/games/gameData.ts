/**
 * The nine Unity games, as data for <GameShowcase>. The last four are rebuilds
 * of web games and keep those games' routes (horse-racing, car-racing, propbet,
 * kamba-adeema) so existing links still land on them.
 *
 * Everything here comes from the games' own repos (READMEs, CREDITS, source and
 * test output) in `Game Platform & Games/`. The pages are laid out the way game
 * developers usually present a shipped title - key art, a fact sheet, the
 * screenshots up front, then the loop, features, role, tech, pipeline and
 * post-mortem - rather than the UI/UX case-study structure the rest of the
 * projects section uses.
 */

export interface GameShot {
  /** File name (no extension) under /Images/projects/<slug>/. */
  file: string;
  caption: string;
}

export interface GameData {
  slug: string;
  title: string;
  /** One-line hook under the title. */
  tagline: string;
  /** Accent colours the page is tinted with, picked from the key art. */
  accent: string;
  accent2: string;
  /** Portrait games get a phone-shaped screenshot grid, landscape games a wide one. */
  orientation: 'portrait' | 'landscape';
  facts: { label: string; value: string }[];
  links: { label: string; href: string }[];
  /** The elevator pitch. */
  pitch: string[];
  pillars: { title: string; text: string }[];
  loop: { title: string; text: string }[];
  features: { icon: string; title: string; text: string }[];
  shots: GameShot[];
  role: string[];
  tech: { title: string; text: string }[];
  pipeline: { title: string; text: string }[];
  challenges: { problem: string; solution: string }[];
  stack: string[];
  learned: string[];
  credits: string;
}

/** Where the Unity WebGL builds are published (the 747 Sandbox arcade). */
const SHOWCASE = 'https://arcade.747sandbox.com/games';

/* Newest first: add a new game at the top of this list, not the bottom. */
export const GAMES: GameData[] = [
  /* ═══════════════════════════════ DERBY KINGS ═══════════════════════════════ */
  {
    slug: 'horse-racing',
    title: 'Derby Kings',
    tagline: 'Read the race card, back a horse and watch six runners race a 3D course that’s filmed like a live sports broadcast.',
    accent: '#f7c331',
    accent2: '#3fd0ff',
    orientation: 'portrait',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL · Windows' },
      { label: 'Genre', value: 'Horse racing · betting' },
      { label: 'Orientation', value: 'Portrait, mobile-first' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/derby-kings` }],
    pitch: [
      'Derby Kings started out as Horse Racing Elite, a browser horse race in my Next.js arcade. This version is a complete rebuild in Unity 6, presented like a premium sports broadcast. There are glass panels, a LIVE bug, a race tracker, lower thirds and live commentary over a realistic course with real skies and turf, in day, golden hour, dusk or floodlit night.',
      'A race day is a session of 5 to 20 races. Each race card draws a track, a distance, the going and six runners, and every runner has a running style, recent form, a rating and a price. You can back a horse to WIN, PLACE or SHOW, or name the first two in a FORECAST, and a camera director films the race. In the arcade, every paid race is drawn and settled by the game provider, and in Arenas up to eight players bet in the same 30-second window and watch the same race.',
    ],
    pillars: [
      { title: 'Broadcast, not cartoon', text: 'It looks and sounds like race day on TV, with a tracker, lower thirds, live calls and a director cutting between cameras.' },
      { title: 'A film of a decided result', text: 'The finishing order is drawn first, and the 3D race is filmed from it, so no frame rate or physics hiccup can change who wins.' },
      { title: 'One rulebook, two places', text: 'The same C# race rules run the offline demo on your phone and the paid races on the game provider.' },
    ],
    loop: [
      { title: 'Read the card', text: 'Open the next race and check the track, the going, each horse’s form and rating, and the price.' },
      { title: 'Fill the slip', text: 'Add up to four bets, one per market (WIN, PLACE, SHOW or FORECAST), and set the stake with the chips.' },
      { title: 'Watch the race', text: 'Six runners break from the stalls while the director cuts between cameras. SKIP takes you straight to the last furlong.' },
      { title: 'Collect', text: 'The official result shows the distances (a nose, a head, lengths) and the prices, and your winning bets are paid out.' },
    ],
    features: [
      { icon: '🎥', title: 'Camera director', text: 'Gate, chase, tracking, aerial, head-on and finish shots are cut automatically, or you can lock the camera you like.' },
      { icon: '🏇', title: 'Race physics', text: 'A smoothed pace model with a break from the stalls. Front-runners, stalkers and closers hold their lines and give way, the gallop matches the stride, and close finishes go to a photo.' },
      { icon: '🌅', title: 'Four kinds of light', text: 'The same course under a bright day, golden hour, dusk or floodlit night, with skies and turf from Poly Haven.' },
      { icon: '🎟️', title: 'Four markets', text: 'WIN, PLACE (top two), SHOW (top three) and FORECAST (the first two in order), with up to four bets on one slip.' },
      { icon: '👥', title: 'Arenas', text: 'Rooms for 2 to 8 players with an invite code and an optional password, a synced 30-second betting window, a leaderboard and a daily bounty for three wins.' },
      { icon: '🔒', title: 'Sealed demo wallet', text: 'The play balance and the next seed are sealed on the device, so they can’t be edited, and play credits only top up once they run out.' },
    ],
    shots: [
      { file: 'title', caption: 'Title screen - the 3D logo over the stalls' },
      { file: 'race-day', caption: 'Race day - the next race and the session' },
      { file: 'race-card', caption: 'The race card and bet slip' },
      { file: 'the-off', caption: 'And they’re off - the chase camera' },
      { file: 'finish', caption: 'The finish camera at the line' },
      { file: 'result', caption: 'The official result, with distances and prices' },
      { file: 'create-arena', caption: 'Creating an arena for friends' },
    ],
    role: [
      'I designed the race card, the four markets, the pricing and how Arenas work.',
      'I programmed the gameplay and every screen in C#, building the UI in code with UI Toolkit.',
      'I wrote the race rules as a standalone C# package that the game provider also compiles and runs.',
      'I built the Blender Python pipeline that makes the horse and its rig, the jockey, the course kit, the 3D logo and the rendered icons.',
      'I also made the broadcast skin and the audio mix in Python, the device screenshot tests and the race simulator that checks the maths.',
    ],
    tech: [
      { title: 'Rules outside the engine', text: 'The race card, the race engine, the classic race, the race film and the random numbers live in Shared/RacingCore, a pure C# package with no Unity in it. The client runs it for the offline demo, and the provider runs the same files as the authority for paid races.' },
      { title: 'The race is a film', text: 'The provider draws the finishing order in proportion to each runner’s chance and settles the bet. RaceFilm then turns that order into a race to watch, and a test that runs 20,000 races checks that the film always keeps the drawn order.' },
      { title: 'Priced at 95%, then checked', text: 'Every price returns 95% (a 5% margin), from 1.05 up to 500. A .NET simulator checks every price on 20,000 cards, checks the finishing draw against the computed chances over 2,000,000 draws, and soaks the engine with 5,000,000 random bets.' },
      { title: 'Arenas over SignalR', text: 'A small SignalR JSON hub client runs over the build’s own WebSocket transport. In an arena, the provider draws each race’s seed and runs the original six-horse race, and every client films the same race from that seed.' },
    ],
    pipeline: [
      { title: 'A horse built in Blender', text: 'build_horse.py takes Quaternius’ CC0 horse, rigs it for a stride-matched gallop and adds the jockey in silks and the numbered saddle cloth.' },
      { title: 'The course kit', text: 'build_course.py makes the track, rails, stands and finish post, dressed with Kenney trees and Poly Haven skies and turf. The logo, a gold shield with a racehorse at full stretch and a jewelled crown, is modelled in Blender too.' },
      { title: 'Broadcast skin & sound', text: 'The glass panels, scrims and racing icons are drawn in Python, in Chakra Petch and Barlow. The music is Rossini’s William Tell finale and Kevin MacLeod tracks, under real gallop and crowd recordings, and the bugle call and the photo-finish shutter are synthesised.' },
    ],
    challenges: [
      { problem: 'A race decided by the 3D physics would play out differently on a slow phone than on a fast laptop.', solution: 'The result is drawn first and the race is only a film of it. The film test makes sure the horses always cross the line in the drawn order, whatever the frame rate.' },
      { problem: 'Arenas had to behave exactly like the rooms in the original web game, which players already knew.', solution: 'I ported the original six-horse race to C# and compared its finishing orders against the old JavaScript with a script, and I carried over the room rules: the skip penalty, the early-exit fine, end votes and end requests.' },
      { problem: 'A portrait broadcast UI has to fit tall phones, flip and fold covers, and tablets.', solution: 'A PlayMode test plays through the title, home, race card, race, result, Arenas and every menu on 11 screen shapes and saves each screen, so layout problems show up as pictures.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'UI Toolkit', 'Blender 5.2 (Python)', 'SignalR · WebSocket', '.NET race simulator', 'WebGL · Android'],
    learned: [
      'Treating the 3D race as a film of a known result made the whole game simpler to test and impossible to cheat.',
      'Porting an old game’s rules is only finished when you can prove the new one gives the same answers.',
      'A broadcast look comes from lots of small things on screen at once: a tracker, lower thirds, live calls and well-timed camera cuts.',
    ],
    credits: 'The horse is Quaternius’ (CC0), the trees are Kenney’s (CC0), and the skies and turf come from Poly Haven (CC0). The music is Rossini (public domain) and Kevin MacLeod (CC BY 4.0), the sounds come from BigSoundBank, OpenGameArt and Kenney, and the fonts are Barlow and Chakra Petch (OFL). The logo, jockey, course and interface were made for the game, and everything is credited on the in-game About screen.',
  },

  /* ═══════════════════════════════ NITRO NIGHTS ═══════════════════════════════ */
  {
    slug: 'car-racing',
    title: 'Nitro Nights',
    tagline: 'A live night race on TV: twelve Blender-built cars, five red lights and a 30-second window to lock in your bet before they go out.',
    accent: '#ff8a1f',
    accent2: '#2f8bff',
    orientation: 'portrait',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL · Windows' },
      { label: 'Genre', value: 'Car racing · betting' },
      { label: 'Orientation', value: 'Portrait, mobile-first' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/nitro-nights` }],
    pitch: [
      'Nitro Nights started out as Ready To Race Unlimited, the car racing game in my Next.js arcade. I rebuilt it in Unity 6 to look like a live night race on TV, with neon colours, dark carbon panels and Russo One lettering. During the race there’s a LIVE tag, a timing tower, five red start lights, a lap counter, a speedo and a commentary ticker on screen.',
      'A Quick race session runs 5 to 20 races, and each one opens a 30-second betting window. The race card draws one of four circuits, dry, hot, damp or wet weather, and a grid of six cars with their form, rating, speed, acceleration and handling. You pick a car, choose a market, tap a chip and lock in your bet, and then it’s lights out. In the arcade, every paid race is drawn and settled by the game provider.',
    ],
    pillars: [
      { title: 'Live TV, not a menu', text: 'Every screen is styled like a night race broadcast, from the timing tower to the podium board.' },
      { title: 'Bet against the clock', text: 'A 30-second window before every race keeps the pace up, whether you play on your own or in an arena.' },
      { title: 'Same rules everywhere', text: 'One C# rules package runs the offline demo and the provider’s paid races, so the two can never disagree.' },
    ],
    loop: [
      { title: 'Start a session', text: 'Press PLAY and start a Quick race session of 5 to 20 races, or join friends in an Arena.' },
      { title: 'Read the card', text: 'Check the circuit, the weather and each car’s form, rating, speed, acceleration and handling while the clock runs down.' },
      { title: 'Lock the bet', text: 'Pick a market and a car, type a stake or tap a chip (25, 50, 100, 250 or ALL IN), then confirm and lock it.' },
      { title: 'Lights out', text: 'Five red lights, then the race. The podium board shows the time gaps, and you can go to the next race, replay it or head home.' },
    ],
    features: [
      { icon: '🏁', title: 'Four circuits', text: 'Thunder Circuit in a storm, Sunset Speedway at golden hour, Neon City at night and Desert Oval at noon, with races of 2, 3 or 4 laps.' },
      { icon: '📺', title: 'TV director', text: 'The TV, chase, heli, onboard, head-on and finish cameras are cut automatically, or you can pick one yourself.' },
      { icon: '🎙️', title: 'Live calls', text: 'The commentary ticker calls overtakes, the final lap and wheel-to-wheel finishes as they happen.' },
      { icon: '🔢', title: 'Five markets', text: 'WIN, TOP 2, PODIUM, FORECAST (the first two in order) and NUMBERS, where you bet on the winner’s number being odd or even, high or low.' },
      { icon: '💨', title: 'Weather & effects', text: 'Smoke, rain spray, nitro and under-glow, on dry, hot, damp or wet tracks.' },
      { icon: '👥', title: 'Arenas', text: 'Rooms with an invite code and a password, a synced 30-second window on the classic six-car grid, a leaderboard and a 1,500 daily bounty for three wins.' },
    ],
    shots: [
      { file: 'title', caption: 'Title screen - the 3D logo over the grid' },
      { file: 'home', caption: 'Home - Quick race, Arenas and the daily bounty' },
      { file: 'race-card', caption: 'Picking a car on the race card' },
      { file: 'start-lights', caption: 'Five red lights on the grid' },
      { file: 'desert-oval', caption: 'Desert Oval in the wet' },
      { file: 'final-lap', caption: 'Neon City - into the final lap' },
      { file: 'arena-bet', caption: 'Betting in an arena with friends' },
    ],
    role: [
      'I designed the race card, the five markets, the betting window and the arena rules.',
      'I programmed the gameplay and every screen in C#, building the UI in code with UI Toolkit.',
      'I wrote the race rules as a standalone C# package that the game provider also compiles and runs.',
      'I built the Blender Python pipeline that makes eight of the twelve cars, the circuit kit and the 3D logo.',
      'I also synthesised the engine sounds in Python, wrote a script that generates the stylesheet, and built the device screenshot and camera tour tests.',
    ],
    tech: [
      { title: 'Rules outside the engine', text: 'The race card, the race engine, the classic race, the race film and the garage live in Shared/RacingCore, a pure C# package with no Unity in it. The client runs it for the offline demo, and the provider runs the same files for paid races.' },
      { title: 'The race is a film', text: 'The client sends the card seed, the bet and the price it showed. The provider draws the finishing order and settles the bet, and the 3D race is just a film of that order, so it can’t decide anything.' },
      { title: 'Synthesised engines', text: 'The V8 loops at idle and full revs, the roar of the field, launches, fly-bys, tyre screech, nitro and the start-light beeps are all generated by a Python script rather than recorded.' },
      { title: 'A generated stylesheet', text: 'build_uss.py writes the game’s UI Toolkit stylesheet, so the panels, chips and buttons share one set of sizes and colours across ten screen shapes.' },
    ],
    pipeline: [
      { title: 'Twelve cars, one rig', text: 'build_cars.py makes eight bodies (hyper, wedge, GT, tuner, muscle, prototype, rally and fastback GT) and brings four Quaternius cars onto the same rig, with wheels, glass, lights, liveries and race numbers.' },
      { title: 'A whole circuit kit', text: 'build_circuit.py builds the start gantry and lights, grandstands with a crowd, the pit building, control tower, podium, big screens, tyre stacks, light towers, billboards, a city skyline and a blimp.' },
      { title: 'Skin, type & music', text: 'The carbon panels, chips and trophies are drawn in Python, with Kenney icons and Russo One, Racing Sans One and Nunito lettering. Each screen has its own Kevin MacLeod track, under real crowd recordings and Kenney sound effects.' },
    ],
    challenges: [
      { problem: 'With a 30-second clock, players run out of time halfway through placing a bet.', solution: 'If the clock runs out with a car selected, the bet is locked for you. With nothing selected, you simply watch the race.' },
      { problem: 'A TV director is hard to judge from one playthrough, because the cuts happen fast.', solution: 'A camera tour test photographs a whole race every 1.5 seconds and names each frame after the director’s shot, so I could review the cutting as a strip of images.' },
      { problem: 'The layout has to work on everything from a 480p phone to flip covers and tablets.', solution: 'A PlayMode test plays through every screen on ten screen shapes and saves the captures, which made layout fixes something I could check rather than guess.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'UI Toolkit', 'Blender 5.2 (Python)', 'Synthesised audio (NumPy)', 'SignalR · WebSocket', 'WebGL · Android'],
    learned: [
      'Sharing one rules package between two racing games (and the provider) meant fixing a bug once fixed it everywhere.',
      'Synthesising engine sounds gave me loops that line up perfectly with the revs, which recordings never quite did.',
      'Camera work is easier to judge from a contact sheet than from watching the race over and over.',
    ],
    credits: 'Four of the twelve car bodies are Quaternius models (CC0), the icons and most sound effects are Kenney’s (CC0), the crowd recordings are Gregor Quendel’s (CC BY 4.0), the music is Kevin MacLeod’s (CC BY 4.0) and the fonts are Russo One, Racing Sans One and Nunito (OFL). The engines are synthesised and the other cars, the circuit and the logo were made in Blender, with no AI-generated art or audio in the game. Everything is credited on the in-game About screen.',
  },

  /* ═══════════════════════════════ TUG OF WAR ═══════════════════════════════ */
  {
    slug: 'kamba-adeema',
    title: 'Tug of War',
    tagline: 'Kamba Adeema, the Avurudu tug of war, rebuilt in 3D: two chibi village teams, one rope and a bet on every heave.',
    accent: '#ff4b3e',
    accent2: '#3d8bff',
    orientation: 'landscape',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL · Windows' },
      { label: 'Genre', value: 'Tug of war · bet per heave' },
      { label: 'Orientation', value: 'Landscape' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/tug-of-war` }],
    pitch: [
      'Kamba adeema (කඹ ඇදීම, "pulling the rope") is the tug of war played at every Avurudu fair in Sri Lanka. It started as a three.js game in my Next.js arcade, and this is its Unity 6 rebuild. Two teams of chibi villagers, Yati Pila in red and Uda Pila in blue, heave on a village pitch at dusk in front of tiered stands full of villagers waving flags, filmed side-on like a sports broadcast.',
      'You bet on each heave. Eight grips are drawn per heave, the side with more grips drags the rope, and the first team to pull the red ribbon seven marks over its line wins the match. YATI or UDA pays 1.92×, DRAW pays 3.55× and POWER pays 27.5× when your side wins the heave by three or more, all at a 97% return. In the arcade, every paid heave is drawn and settled by the game provider.',
    ],
    pillars: [
      { title: 'A festival, not a casino', text: 'Drummers, lanterns, a pahana oil lamp and a cheering village crowd make it feel like Avurudu first and a betting game second.' },
      { title: 'Eight fair coins', text: 'Every heave is eight independent, fair grips, so both sides are priced exactly the same and the maths has a closed form.' },
      { title: 'Sealed before the first heave', text: 'Each demo match is sealed with a hashed seed before it starts, and History lets you re-draw every heave once it’s over.' },
    ],
    loop: [
      { title: 'Pick a card', text: 'Tap YATI or UDA, DRAW, or POWER under your side’s card. Your pick stays on the card, so the next heave is one tap.' },
      { title: 'Set the stake', text: 'Use MIN, ½, 2× or MAX, or type a stake. AUTO repeats your bet 5, 10 or 25 times, and TURBO speeds up the pull.' },
      { title: 'HEAVE!', text: 'Press HEAVE! or swipe down. The grips light up one by one, the rope moves and you’re paid straight away. Tapping the ground cheers your side on.' },
      { title: 'Seven marks', text: 'The first team to drag the ribbon seven marks wins. The match seed is revealed and the next match seals itself after a short countdown.' },
    ],
    features: [
      { icon: '🏟️', title: 'Village arena at dusk', text: 'A packed-earth strip with a chalk line, marker flags, a red-and-blue barrier, tiered stands, lanterns, drummers and palms under a violet-to-gold sky.' },
      { icon: '👏', title: 'A crowd that reacts', text: '222 low-poly villagers in sarees, sarongs and banians wave team flags and Sri Lankan flags and cheer every heave.' },
      { icon: '🪢', title: 'Rope physics', text: 'The rope runs on a damped spring, and every puller leans on a spring of their own, kicked by the strain, each grip, each slip and the heave.' },
      { icon: '😭', title: 'Match-end reactions', text: 'The rope drops, the winners face the camera and jump with their fists up, and the losers slump to the ground and cry.' },
      { icon: '🍬', title: 'Candy 3D interface', text: 'Glossy slab buttons with a lip that sinks when pressed, jelly pick cards and cream panels under ribbons, all in Baloo 2, with big touch targets.' },
      { icon: '🪔', title: 'Pahana loading screen', text: 'A brass oil lamp whose seven wicks, one for each mark, light up as the game loads.' },
    ],
    shots: [
      { file: 'loading', caption: 'Loading - the pahana’s seven wicks' },
      { file: 'title', caption: 'Title screen over the village arena' },
      { file: 'bet-dock', caption: 'The bet dock between heaves' },
      { file: 'power-bet', caption: 'A POWER bet on Uda Pila' },
      { file: 'grips', caption: 'The grips lighting up one by one' },
      { file: 'big-heave', caption: 'A big heave, paid at once' },
      { file: 'match-over', caption: 'Match over - Uda Pila win' },
    ],
    role: [
      'I designed the betting cards, the paytable, the stamina rule and the match flow.',
      'I programmed the gameplay and every screen in C#, building the UI in code with UI Toolkit.',
      'I wrote the rules and the HMAC draw as a standalone C# package that the game provider also compiles and runs.',
      'I built the Blender Python pipeline that makes the arena, the 222-strong crowd, the villagers and their tug-of-war moves, the rope and the 3D logo.',
      'I also built the UI skin and icons in Python, found and mixed the Avurudu sounds, and wrote the fairness, layout and device screenshot tests.',
    ],
    tech: [
      { title: 'Rules in one place', text: 'The grips, marks, stamina, paytable and HMAC draw live in a pure C# package with no Unity references. The client runs it for the offline demo, and the game provider compiles the same files as the authority for paid heaves.' },
      { title: 'Closed-form maths', text: 'The swing (Yati grips minus Uda grips) is exactly a shifted Binomial(8, ½), so every bet’s price comes from a formula rather than a simulation. A .NET simulator then checks each bet’s return over real matches.' },
      { title: 'The demo seal', text: 'Before the first heave, a match is sealed with the SHA-256 of a secret seed and the hash of a fresh blockchain block. Each heave’s grips are HMAC-SHA256 of the seed, the client seed, the block hash and the heave number, and the seed is revealed when the match ends.' },
      { title: 'One draw per heave', text: 'The backend owns the match and a strictly increasing nonce, so leaving in the middle of a heave can never replay the same grips. A fairness test checks it, along with the two sides being symmetric.' },
    ],
    pipeline: [
      { title: 'A village from scripts', text: 'build_arena.py makes the pulling strip, marker flags, barrier, tiered stands, pandals, lantern poles, drummers’ stands, the pahana, palms, bunting and stalls, and build_crowd.py fills the stands with 222 villagers.' },
      { title: 'Villagers & their moves', text: 'build_villagers.py dresses KayKit characters in sarongs, banians, headbands and sarees, and animates Ready, Strain, Heave, Haul, Dragged, Slip and Fall with IK on the KayKit rig.' },
      { title: 'The sounds of Avurudu', text: 'A script found CC0 recordings on Freesound: shehnai and drums, dholak, tabla, a conch, the koel and rathinga firecrackers, cut and levelled in Python. The grunts, rope burn and claps are synthesised.' },
    ],
    challenges: [
      { problem: 'Tired teams should feel weaker, but changing the odds mid-match would make the prices dishonest.', solution: 'Stamina only changes how far the rope moves. A spent team that loses a heave by two or more is dragged double, but the odds of every heave stay exactly the same.' },
      { problem: 'A crowd of 222 animated villagers is a lot for a low-end phone.', solution: 'A performance governor drops the crowd and the effects when the frame rate falls, so the heave itself stays smooth.' },
      { problem: 'It’s a landscape game, but people open it on phones held upright and in portrait browser windows.', solution: 'Phones auto-rotate between the two landscape sides, a portrait window shows a turn-your-phone card, and a layout sweep test checks every screen from 1:1 to 21:9 for clipping and overlap.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'UI Toolkit', 'Blender 5.2 (Python)', 'HMAC-SHA256 fairness', '.NET RTP simulator', 'WebGL · Android'],
    learned: [
      'A cultural game lives or dies on the details: the conch, the koel, the pahana and the clothes do as much as the gameplay.',
      'Keeping stamina away from the odds let the game have drama without making the maths dishonest.',
      'Springs are a cheap way to make ropes and bodies look physical without a full physics simulation.',
    ],
    credits: 'The villagers are built on KayKit characters and animations (CC0), the Sri Lankan flag is public domain, the font is Baloo 2 (OFL), the recordings come from Freesound creators (CC0) and the crowd from Gregor Quendel (CC BY 4.0), with Kenney sound effects (CC0). The arena, crowd, rope, logo and the pullers’ moves were made for the game in Blender, with no AI-generated art or audio. Everything is credited on the in-game About screen.',
  },
  /* ═══════════════════════════════ AETHER DYNASTY ═══════════════════════════════ */
  {
    slug: 'aether-dynasty',
    title: 'Aether Dynasty',
    tagline: 'Take on Mount Olympus with up to 46,656 ways to win, in a cascading slot where the gods themselves step in to help.',
    accent: '#f7c948',
    accent2: '#7cc4ff',
    orientation: 'portrait',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL · Windows' },
      { label: 'Genre', value: 'Cascading ways slot' },
      { label: 'Orientation', value: 'Portrait, mobile-first' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/aether-dynasty` }],
    pitch: [
      'Aether Dynasty started out as a browser slot in my Next.js arcade. This version is a complete rebuild as a proper mobile game in Unity 6. It’s designed portrait-first so you can play it on your phone with one hand, and it has chunky, toy-like buttons, Greek key borders and three playful 3D gods, Zeus, Athena and Aphrodite, who stand above the reels and react when you tap them.',
      'Behind the cartoon look, it’s a proper ways slot. There are six stone reels that start with 3 rows and grow to 6 (going from 729 to 46,656 ways to win). Winning symbols shatter and new ones drop in, golden frames turn into wilds, and once the board is full you get a storm of free games with a multiplier that keeps climbing.',
    ],
    pillars: [
      { title: 'Playful, not casino', text: 'Bright, toy-box style art and gods with real personality, so it feels like a game first and a slot second.' },
      { title: 'One-thumb mobile', text: 'A portrait layout with big buttons, and everything you need is within reach of your thumb in the bottom third of the screen.' },
      { title: 'Provably honest', text: 'The return to player is measured rather than guessed, the randomness is unbiased, and anyone can check demo rounds after they’ve played them.' },
    ],
    loop: [
      { title: 'Stake & spin', text: 'Choose your stake and spin the six stone reels. Each reel starts with 3 rows, which gives 729 ways to win.' },
      { title: 'Shatter & cascade', text: 'Wins pay from left to right on reels next to each other. Winning symbols shatter and new ones fall into their place.' },
      { title: 'Grow the board', text: 'Every reel that’s part of a win grows by one row. Golden frames turn into WILDs with a counter, and they keep paying until it runs out.' },
      { title: 'Summon the storm', text: 'Fill the board to 46,656 ways and you trigger 8 storm free games with a rising multiplier and the Golden Treasure.' },
    ],
    features: [
      { icon: '⚡', title: 'Divine interventions', text: 'Zeus, Athena and Aphrodite can step in on any spin to help you out, and if you fill the board completely, Zeus’s Wrath goes off.' },
      { icon: '🏛️', title: 'Expanding reels', text: 'The reels grow from 3 to 6 rows, which can take the board from 729 to 46,656 ways in a single chain of wins.' },
      { icon: '🖼️', title: 'Golden frames', text: 'When a framed symbol wins, it turns into a WILD with a count of ×1 to ×3, and the count goes down with every win it’s part of.' },
      { icon: '🌩️', title: 'Storm free games', text: 'You get 8 free games that start with 4 rows, and the multiplier goes up on every winning spin.' },
      { icon: '🔁', title: 'Autoplay & turbo', text: 'Autoplay you can set up the way you like, with options to stop on free games or big wins, plus turbo spins if you want things faster.' },
      { icon: '📜', title: 'Round history', text: 'Every round is listed with its stake, how much it paid and the hash that proves the result was fixed before you spun.' },
    ],
    shots: [
      { file: 'home', caption: 'Title screen - the three gods on Olympus' },
      { file: 'board', caption: 'The opening board - six reels, 729 ways' },
      { file: 'divine-win', caption: 'Divine Win celebration' },
      { file: 'zeus-wrath', caption: 'Perfect board - Zeus’s Wrath' },
      { file: 'autoplay', caption: 'Autoplay with stop conditions' },
      { file: 'how-to-play', caption: 'In-game rules' },
    ],
    role: [
      'I designed the game, including how the board grows, how the gods step in, what triggers the free games and the paytable.',
      'I programmed the gameplay and the UI in C#, building every screen in code with UI Toolkit.',
      'I wrote the slot engine and random number generator as a standalone C# package, which the game provider also compiles and uses.',
      'I built a procedural art pipeline in Blender Python that creates the gods, symbols, logo, skies and temple.',
      'I also handled the audio mixing, the test that takes screenshots on different devices, and the RTP simulator.',
    ],
    tech: [
      { title: 'Rules outside the engine', text: 'The slot rules and random number generator live in a separate C# package (com.aetherdynasty.core) that doesn’t depend on Unity at all. The same code runs in the game’s demo mode and on the game provider for real rounds, so the two can never get out of sync.' },
      { title: 'Code-built UI', text: 'There’s no hand-built scene. A director script builds the 3D stage, the screens and the HUD while the game runs, using UI Toolkit and styled from a single USS stylesheet. That meant supporting eight different device layouts was a styling job rather than building eight separate scenes.' },
      { title: 'Measured, not guessed, RTP', text: 'A .NET simulator plays tens of millions of rounds. The declared return is 94.1%, and three runs of 10 million rounds came out at 94.21%, 94.30% and 93.80%. About a third of rounds pay something, and free games come up roughly once every 193 spins.' },
      { title: 'Provably fair demo', text: 'Demo rounds use HMAC-SHA256(serverSeed, clientSeed:nonce:block) with rejection sampling, never a simple modulo, so there’s no bias. You’re shown the hash of the seed before you play, and the seed itself is revealed in your History.' },
    ],
    pipeline: [
      { title: '3D gods from a kit', text: 'build_gods.py takes KayKit characters and turns them into Zeus, Athena and Aphrodite, adding Greek props, recoloured textures and six animations (Idle, Summon, Celebrate, Wave, Jump and Hit).' },
      { title: 'Everything else, scripted', text: 'The medallion symbols, the logo, two skies, the temple, the gems, the WILD and the golden frame are all generated by Blender Python scripts, so any of them can be rebuilt with one command.' },
      { title: 'UI kit & sound', text: 'Buttons and paper cards from the Kenney UI Pack, lettering in Lilita One and Fjalla One, and music and sound effects put together from Kenney and OpenGameArt packs by a Python build script.' },
    ],
    challenges: [
      { problem: 'Even though it’s designed for phones first, it still has to look right on foldables, flip phones and tablets.', solution: 'A PlayMode test captures the loading, home, rules, game, spin, big win and autoplay screens on 8 device profiles every time it runs, so layout problems show up as images I can look at, not as bug reports.' },
      { problem: 'If demo money never runs out, players learn nothing about the real odds.', solution: 'Demo losses stay lost. When your balance can’t cover the minimum stake, the game offers you a refill. Measured over 21 million rounds, it pays back about 95%.' },
      { problem: 'The old web version relied on Firebase, which tied it to one host.', solution: 'I removed Firebase completely. Single-player now runs on the device, and real rounds go through the game provider’s audited random number generator.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'UI Toolkit', 'Blender 5.2 (Python)', '.NET RTP simulator', 'HMAC-SHA256 fairness', 'WebGL · Android'],
    learned: [
      'Keeping the game rules in a plain C# package was the best decision I made, because this game has to run in two different places.',
      'Simulating millions of rounds is the only honest way to state a return to player.',
      'Generating assets with scripts makes it cheap to change the art direction. I rebuilt the gods several times.',
    ],
    credits: 'It only uses free CC0, CC-BY and OFL assets (from KayKit, Kenney, game-icons.net, OpenGameArt and Google Fonts), and they’re all credited on the in-game About screen. There’s no AI-generated art or audio anywhere in the game.',
  },

  /* ═══════════════════════════════ VOID ARMADA ═══════════════════════════════ */
  {
    slug: 'void-armada',
    title: 'Void Armada',
    tagline: 'Battleship set among the asteroids. It’s a space marine fleet battle you can play on your phone or in a browser.',
    accent: '#ffd23f',
    accent2: '#a46bff',
    orientation: 'landscape',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'WebGL · Windows · Android/iOS' },
      { label: 'Genre', value: 'Turn-based naval strategy' },
      { label: 'Modes', value: 'vs AI · Play a friend' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/void-armada` }],
    pitch: [
      'Void Armada is a landscape rebuild of the Battleship game from Family Games, reimagined as a space marine fleet battle. Both 10×10 grids are on screen at the same time, asteroid fields block some of the cells, and every hit lands with pop-art HIT! and SUNK! stickers, giving it the bright, chunky feel of games like BattleTabs.',
      'Instead of taking one shot per turn, you spend energy on five different weapon systems. You lock onto a target and then hit FIRE!. The server is in charge of the game. In the arcade, the game provider places the fleets, runs the AI and settles the bet, and the Unity client just draws whatever state it’s sent, which makes every battle cheat-proof.',
    ],
    pillars: [
      { title: 'Readable at a glance', text: 'Both boards are always visible, with big HUD bars and stickers that tell you exactly what just happened.' },
      { title: 'Choices every turn', text: 'The energy system turns "pick a cell" into "pick a weapon, then pick a cell".' },
      { title: 'Server is the referee', text: 'All the rules live on the backend, so single-player and online games play by exactly the same honest rules.' },
    ],
    loop: [
      { title: 'Choose your enemy', text: 'Choose to play against Veteran or Warlord and set your stake. Both fleets are placed around the asteroid sectors for you.' },
      { title: 'Charge', text: 'Your energy builds up every turn, and with every hit or ship you sink.' },
      { title: 'Strike', text: 'Fire the Plasma Lance for free, or spend energy on a barrage, railgun, scan or shield, and then hit FIRE!.' },
      { title: 'Sink the fleet', text: 'When you score a hit, you get to fire again. The first commander to sink the other fleet wins the battle and the payout.' },
    ],
    features: [
      { icon: '🔫', title: 'Five weapon systems', text: 'The Plasma Lance is free and lets you fire again on a hit. There’s also an Orbital Barrage that hits in a plus shape, a railgun that sweeps a row or column, a 3×3 scan and a shield that blocks one hit.' },
      { icon: '🤖', title: 'AI commanders', text: 'Veteran goes after damaged ships and finishes them off, and beating it pays 1.30×. Warlord uses heat-map targeting and special abilities, and beating it pays 1.80×.' },
      { icon: '🌐', title: 'Play a friend', text: 'Open a private room, send your friend the 4-character code, and the battle starts as soon as they join. It’s free to play, with a move timer and a rematch option.' },
      { icon: '☄️', title: 'Asteroid sectors', text: 'Blocked cells change where fleets can hide and how the weapons sweep across the board.' },
      { icon: '📱', title: 'Always landscape', text: 'If your phone is stuck in portrait, a "virtual landscape" mode rotates the UI and the camera for you, so you don’t have to unlock screen rotation.' },
      { icon: '💥', title: 'Pop-art feedback', text: 'HIT!, FIRE AGAIN! and ENEMY HIT! stickers, a turn timer and a live fleet tracker for both commanders.' },
    ],
    shots: [
      { file: 'menu', caption: 'Main menu' },
      { file: 'how-to-play', caption: 'How to play - fleet, energy and arsenal' },
      { file: 'choose-enemy', caption: 'Choose your enemy - Veteran or Warlord' },
      { file: 'your-turn', caption: 'Your turn - both fleets among the asteroids' },
      { file: 'barrage', caption: 'Aiming an Orbital Barrage' },
      { file: 'fire-again', caption: 'Direct hit - fire again' },
      { file: 'enemy-turn', caption: 'Enemy turn - incoming fire' },
    ],
    role: [
      'I designed the game, including the set of weapons, the energy system and the asteroid rules.',
      'I built the server-side backend in TypeScript, and later moved the game over to the game provider’s staked battle API and SignalR rooms hub.',
      'I built the Unity client in C#, including the UI, camera framing, the lock-target-then-FIRE input and the code that draws the server’s state.',
      'I generated the ship models, commander portraits and logo with Blender Python.',
      'I designed the weapon and impact sounds, and built an autopilot harness for visual testing.',
    ],
    tech: [
      { title: 'Thin client, authoritative server', text: 'The client never holds the rules. It sends what the player wants to do, such as fire, scan or shield, and draws whatever state comes back. The first server was a TypeScript GameDefinition (validated with zod, using REST and WebSocket). The arcade version plays on the game provider, which places the fleets, runs the AI and settles the bet.' },
      { title: 'Virtual landscape', text: 'On native builds, the operating system locks the game to landscape. On the web, the page asks the host to rotate, then goes fullscreen and locks the orientation. If the screen is still held in portrait, the UI is rotated −90° and the camera is rolled 90° to make up for it.' },
      { title: 'One layout for every screen', text: 'The UI is laid out on a canvas of at least 1280×720 at a fixed pixel scale and stays clear of notches and rounded corners. It was tested at 19.5:9, 16:9 and 4:3, on unfolded foldables and in rotated portrait.' },
      { title: 'Rooms over SignalR', text: 'Play a Friend runs on the provider’s /hubs/rooms SignalR hub. It has private rooms you join with a 4-character code, a move timer, a forfeit if you leave, and a rematch once both commanders ask for one.' },
    ],
    pipeline: [
      { title: 'Ships from code', text: 'generate_ships.py builds the five warship classes from a shared kit in Blender, and the same scripts render the portraits and the Void Armada logo.' },
      { title: 'Layered weapon sounds', text: 'tools/build_sfx.py layers free recordings from OpenGameArt with a generated deep bass thump to create each firing and impact sound.' },
      { title: 'Music & fonts', text: 'The music and fonts are free and credited, both on the in-game About screen and in CREDITS.md.' },
    ],
    challenges: [
      { problem: 'Mobile browsers won’t reliably rotate a page into landscape.', solution: 'I used three layers of fallback. First the game asks the host app to rotate, then it locks the orientation after the first tap, and if that still doesn’t work it rotates the game itself.' },
      { problem: 'Fitting two full boards and a HUD on a short phone screen.', solution: 'The camera framing keeps the active board between the HUD bars at any screen shape.' },
      { problem: 'Checking every stage of a battle by hand after each build.', solution: 'An autopilot mode (-autopilot ai -shots <dir>) plays a whole battle against the AI and takes a screenshot of every stage at any window size.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'Node.js · TypeScript', 'SignalR · WebSocket', 'zod', 'Blender (Python)', 'Python SFX tooling'],
    learned: [
      'Designing the server protocol first meant single-player and multiplayer could share exactly the same code.',
      'On the mobile web, screen orientation is something you have to negotiate, not something you can simply set.',
      'An autopilot that takes screenshots is the cheapest QA team you’ll ever have.',
    ],
    credits: 'The ship models, portraits and logo are all original and made in Blender. The third-party music, sound effects and fonts are free to use and credited in the game and in CREDITS.md.',
  },

  /* ═══════════════════════════════ GLACIER GLIDE ═══════════════════════════════ */
  {
    slug: 'glacier-glide',
    title: 'Glacier Glide',
    tagline: 'Pip’s Downhill Dash is an endless sledding game with blasters, big air jumps and a full shop to spend your coins in.',
    accent: '#5fd4ff',
    accent2: '#ff9a3c',
    orientation: 'landscape',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · Windows · WebGL' },
      { label: 'Genre', value: 'Endless runner' },
      { label: 'Release', value: 'Play Store-ready bundle' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/glacier-glide` }],
    pitch: [
      'Glacier Glide is an endless downhill sledding game for phones that you play in landscape. You pick a hero and ride down a winding snowy slope, dodging trees, ice spikes, fences, crevasses and rolling snowballs, while blasting bats, wolves, snow golems and yetis with your blaster.',
      'You can launch off ramps for BIG AIR, then spend your coins and gems on heroes, sleds, hats, trails, blasters and power-ups. Every 3D model and every shop icon in the game is made by a single Blender script.',
    ],
    pillars: [
      { title: 'Easy to pick up', text: 'Drag to steer, tap to jump and hold to fire. The further you go, the faster it gets.' },
      { title: 'Always something to buy', text: 'There’s always something to save up for, with five heroes, ten sleds, seven hats, five trails, four blasters and five power-ups.' },
      { title: 'Come back later', text: 'A reward chest refills every 15 minutes, even while the game is closed.' },
    ],
    loop: [
      { title: 'Gear up', text: 'Choose a difficulty and pick which boosts to bring from your stockpile on the Get Ready screen.' },
      { title: 'Ride', text: 'Steer down an endless slope, jumping over hazards and shooting enemies as it gets faster and faster.' },
      { title: 'Earn', text: 'Collect coins and gems during the run, from enemies you beat, from big air landings and from the distance bonus.' },
      { title: 'Upgrade', text: 'Spend them on heroes, sleds, cosmetics, blasters and upgrades, and then head back out for another run.' },
    ],
    features: [
      { icon: '🐧', title: 'Five heroes with perks', text: 'Pip, Kit the fox, Hoot the owl, Bjorn the polar bear and Yeti Jr each have their own perk that gets stronger over 5 levels.' },
      { icon: '🔫', title: 'Four blasters', text: 'The Snow Blaster, the Icicle Rifle that shoots straight through enemies, the 3-way Frost Shotgun and the rapid-fire Plasma Freezer.' },
      { icon: '🚀', title: 'Power-ups', text: 'Shield, Coin Magnet, Double Coins, Rocket (which lets you fly over everything) and Rapid Fire.' },
      { icon: '🏔️', title: 'Four difficulties', text: 'From Easy to Insane, with speeds from 12 up to 48 m/s. Harder levels have more hazards and bigger rewards as you unlock them.' },
      { icon: '🎁', title: 'Reward chest', text: 'It refills every 15 minutes in real time with coins, gems and 2 or 3 power-ups.' },
      { icon: '🎬', title: 'Studio intro', text: 'A Zenitron Gaming startup sequence and a 3D logo that flies in, with a loading bar that tracks real loading work.' },
    ],
    shots: [
      { file: 'get-ready', caption: 'Get Ready - difficulty and boosts' },
      { file: 'coin-run', caption: 'Collecting coins down the run' },
      { file: 'big-air', caption: 'BIG AIR off a kicker ramp' },
      { file: 'double-coins', caption: 'Double Coins power-up' },
      { file: 'wipeout', caption: 'Wipeout - the run summary' },
      { file: 'shop-heroes', caption: 'The shop - heroes and perks' },
    ],
    role: [
      'I designed the game, including the controls, the difficulty curve, the hazards, the enemies and the whole in-game economy.',
      'I programmed the gameplay in C#, including the player controller, combat and the endless track generation.',
      'I built every screen of the uGUI interface in code, including the screen that asks you to rotate your phone.',
      'I made all the 3D models and icons with a single Blender Python generator, and all the sound is generated in code.',
      'I handled the builds and the release, including a Windows installer, an Android APK and a signed bundle for the Play Store.',
    ],
    tech: [
      { title: 'Endless track generation', text: 'A mathematically defined slope, plus a chunk generator that streams hazards, enemies, pickups and scenery in ahead of the player, and gets busier the further you go.' },
      { title: 'Generated, not modelled', text: 'generate_assets.py builds the low-poly heroes, hats, sleds (with 10 paint jobs), blasters, enemies, hazards and scenery, and renders every shop icon with Cycles. The colours are passed to Unity through the material names.' },
      { title: 'Synthesised audio', text: 'There aren’t any audio files at all. The AudioManager generates every sound effect while the game is running.' },
      { title: 'Automated QA', text: 'An autopilot rides down the slope and saves screenshots, a scripted tour tests the chest, shop, upgrades and power-ups, and a responsive check captures 7 screens on 18 different phone, foldable and tablet displays.' },
    ],
    pipeline: [
      { title: 'One Blender script', text: 'Five heroes, seven hats, three sled bodies, four blasters, four types of enemy, coins, gems, power-ups, the chest and all the scenery come from one script, Tools/Blender/generate_assets.py.' },
      { title: 'Command-line builds', text: 'Tools/unity.sh rebuilds the assets, sets up the project and builds the WebGL, Android or Windows version straight from Git Bash.' },
      { title: 'Store package', text: 'A signed App Bundle, debug symbols, the icon, a feature graphic, screenshots, the store listing text and a privacy policy for Google Play.' },
    ],
    challenges: [
      { problem: 'Someone opening a landscape-only game while holding their phone upright.', solution: 'A "Rotate your phone" screen automatically pauses the run, and on Android browsers the first tap also goes fullscreen and locks the screen to landscape.' },
      { problem: 'The game stuttered on the first run whenever a new model appeared for the first time.', solution: 'The 3D logo’s loading bar tracks real work. Every model is drawn once during the intro, so the first run never stutters.' },
      { problem: 'Keeping existing players’ progress through a big update.', solution: 'Saves from version 1 are migrated, so gems, sleds and best distance all carry over.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'uGUI', 'Blender 5.2 (Python + Cycles)', 'Runtime audio synthesis', 'Android · WebGL · Windows'],
    learned: [
      'An in-game economy needs all its numbers in one place. Catalog.cs is where every price and perk lives.',
      'Autopilot screenshots across 18 screen sizes catch layout bugs that testing on one device never would.',
      'Shipping a game means installers, store listings and privacy policies, not just a build.',
    ],
    credits: 'All the 3D models and icons are original and generated in Blender. The fonts are Luckiest Guy (Apache 2.0) and Fredoka (OFL), and all the sound is generated in code.',
  },

  /* ═══════════════════════════════ GLASS BRIDGE ═══════════════════════════════ */
  {
    slug: 'glass-bridge',
    title: 'Glass Bridge',
    tagline: 'One of these two panes will hold. It’s a manga-style crossing game that’s provably fair.',
    accent: '#ff3b4e',
    accent2: '#ffd23f',
    orientation: 'portrait',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL · Windows' },
      { label: 'Genre', value: 'Cash-out risk game' },
      { label: 'Style', value: 'Manga, toon-shaded 3D' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/glass-bridge` }],
    pitch: [
      'Three chibi runners stand at the edge of a gorge. Between them and the platform on the other side is a bridge made of pairs of glass panes. In every pair, one pane is tempered and the other shatters. You choose left or right, the runner at the front jumps, and either the glass holds or someone falls.',
      'Every pane you get past raises your payout, and you can cash out whenever you like, as long as you still have runners left. The whole bridge is locked in before the first step, so every run can be checked afterwards.',
    ],
    pillars: [
      { title: 'Tension in every hop', text: 'A runner in mid-air, the glass creaking, and then either a CRASH or a safe landing.' },
      { title: 'Manga energy', text: 'Speed lines, comic sound-effect lettering, a UI styled like manga panels and cherry blossoms drifting through the gorge.' },
      { title: 'Fair by construction', text: 'It returns exactly 97% at every step, and the bridge is sealed in advance so you can check it.' },
    ],
    loop: [
      { title: 'Stake', text: 'Choose Easy, Normal or Hard (10, 18 or 24 pairs of panes) and set your stake on the stake sheet.' },
      { title: 'Choose a pane', text: 'Pick left or right. Every pair is a fair 50/50.' },
      { title: 'Hold or fall', text: 'If it’s safe, the multiplier goes up. If it breaks, the next runner walks out onto the pane you now know is safe.' },
      { title: 'Cash out or cross', text: 'You can cash out from the third pair onwards, or cross every pair to win the top prize.' },
    ],
    features: [
      { icon: '🪟', title: 'Runtime glass fracture', text: 'Panes shatter outwards from where the runner lands, breaking into real prism-shaped shards.' },
      { icon: '🏃', title: 'Procedural animation', text: 'The runners hop, squash, stretch, flail and cheer without a single pre-made animation clip.' },
      { icon: '🎌', title: 'Manga-panel UI', text: 'The UI is built entirely in code, and it rebuilds itself when you rotate the screen, fold or unfold a foldable, use split-screen or switch to a cover display.' },
      { icon: '📈', title: 'Live payout ladder', text: 'The multiplier for every step is shown on screen, and you can set it to cash out automatically at a step you choose.' },
      { icon: '⏱️', title: 'Run clock', text: 'There’s a 16-minute timer. If it runs out, your runners walk off and you’re paid at the step you’ve reached.' },
      { icon: '⚙️', title: 'Comfort settings', text: 'Options for vibration, flashing effects and gore, which are saved between sessions.' },
    ],
    shots: [
      { file: 'title', caption: 'Title screen' },
      { file: 'stake-sheet', caption: 'The stake sheet - difficulty, stake and ladder' },
      { file: 'first-pair', caption: 'Pair 1 - left or right?' },
      { file: 'jump', caption: 'Runner 1 jumps' },
      { file: 'crash', caption: 'CRASH - through the glass' },
      { file: 'relay', caption: 'The relay - runner 2 takes over' },
      { file: 'far-side', caption: 'The far side - bridge crossed' },
    ],
    role: [
      'I designed the game and worked out the payout maths, treating three runners as three lives, with a 97% return at every step.',
      'I wrote all the gameplay, world and UI code in C#, and the whole game is built while it runs by a single bootstrap script.',
      'I wrote custom Toon, Glass, Sky, Water and Particle shaders, and the glass shattering effect.',
      'I built a procedural Blender asset generator for the runners, the bridge and the floating islands.',
      'I built the fairness seal and the connection to the game provider.',
    ],
    tech: [
      { title: 'The payout math', text: 'A run reaches pair n if it makes no more than two wrong guesses in n flips. Each step pays 0.97 divided by the chance of reaching it, cut down to four significant figures, so every cash-out point has the same 97% expected return. On Hard, the top payout is 54,060×.' },
      { title: 'Sealed bridges', text: 'The bridge layout is decided before the first step. A seed taken from a blockchain block feeds a Mulberry32 random generator, a SHA-256 commitment of the seed and layout is shown before you start, and the full draw is revealed when the run is settled.' },
      { title: 'No scene authoring', text: 'GameBootstrap builds the world, the director, the UI and the audio while the game runs, behind a manga-style loading screen. The material names are how it talks to Blender: ToonLibrary replaces each imported material with the right toon material.' },
      { title: 'Adaptive camera & UI', text: 'The camera framing adjusts to the screen shape, from tall phones to foldables and desktop windows, and the panel UI rebuilds itself when the display changes shape.' },
    ],
    pipeline: [
      { title: 'Procedural assets', text: 'Blender/build_assets.py creates the runners, bridge, islands, spires, lanterns and props and exports them straight into the Unity project.' },
      { title: 'Shaders', text: 'Hand-written Toon, Glass, Sky, Water and Particle shaders give the game its cel-shaded manga look.' },
      { title: 'Sound & type', text: 'Koto and taiko music, sound effects from Kenney and other Creative Commons sources, and the Bangers, Comic Neue and Dela Gothic One fonts for the manga lettering.' },
    ],
    challenges: [
      { problem: 'Making a simple 50/50 choice feel dramatic every single time.', solution: 'The game asks the server for the result while the runner is still in the air. The landing waits for the answer, and if it takes a moment, you see "the glass creaks…".' },
      { problem: 'Players can’t trust a bridge they never saw being built.', solution: 'A commitment is shown before you play and a fairness card after, so the result can be worked out again and checked.' },
      { problem: 'Foldable phones can change shape in the middle of a run.', solution: 'The UI is built in code, so it tears itself down and rebuilds when you rotate, fold or unfold the phone, use split-screen or switch to a cover display.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'Custom HLSL shaders', 'Blender (Python)', 'SHA-256 commit-reveal', 'Mulberry32 PRNG', 'Android · WebGL'],
    learned: [
      'Pricing every step from one formula keeps the game honest without making it boring.',
      'Procedural animation gave the runners more personality than pre-made animation clips would have.',
      'Building the UI in code pays off the moment someone unfolds their phone.',
    ],
    credits: 'The Blender assets and shaders are all original. Sound effects come from Kenney and others (CC0 and CC-BY 3.0), the music is "koto" by fx10243 and "Taiko drums" by jobro, and the fonts are Bangers, Comic Neue and Dela Gothic One (OFL). The game only uses virtual coins, and there’s no real-money betting.',
  },

  /* ═══════════════════════════════ TIC-TAC-TOE SHOWDOWN ═══════════════════════════════ */
  {
    slug: 'tic-tac-toe-showdown',
    title: 'Tic-Tac-Toe Showdown',
    tagline: 'Three in a row, partner! Noughts and crosses played in a Wild West corral at sunset.',
    accent: '#ff8a3d',
    accent2: '#2ec4b6',
    orientation: 'portrait',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL' },
      { label: 'Genre', value: 'Board / party game' },
      { label: 'Modes', value: 'vs AI · Pass & play · Online' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/tic-tac-toe` }],
    pitch: [
      'This is a complete mobile rebuild of the Tic-Tac-Toe game from Family Games, turned into a Wild West showdown. It’s planks and nails for X against a lasso rope for O, on a wooden board inside a roped-off corral, with swaying cacti, rolling tumbleweeds and mesas in the distance.',
      'It keeps the original online multiplayer, talking to the same server and the same game, so people playing on their phones and people playing on the web end up in the same rooms. On top of that, it adds an outlaw AI, new modes, series play and a quick-draw timer.',
    ],
    pillars: [
      { title: 'A classic, re-dressed', text: 'The rules everyone already knows, with a whole world built around them.' },
      { title: 'Depth for regulars', text: 'Tumbleweed and Big Ranch modes, series, timers and a proper AI to beat, so regular players have plenty to dig into.' },
      { title: 'Play anyone, anywhere', text: 'Play against the AI, pass one phone back and forth with a friend, or go online against people playing on the web.' },
    ],
    loop: [
      { title: 'Pick a showdown', text: 'Choose Classic 3×3, Tumbleweed or 5×5 Big Ranch, and play against the AI, a friend or an online posse.' },
      { title: 'Draw', text: 'Drag to aim and place your mark, with an optional quick-draw timer for each turn.' },
      { title: 'Outsmart', text: 'Use hints and undo, or keep an eye on the flickering mark that’s about to blow away.' },
      { title: 'Win the series', text: 'Play best of 3 or best of 5, with lifetime stats and win streaks.' },
    ],
    features: [
      { icon: '🤠', title: 'Outlaw AI', text: 'Greenhorn, Deputy and Sheriff difficulty levels, powered by alpha-beta search.' },
      { icon: '🌵', title: 'Three modes', text: 'Classic, Tumbleweed (once you have 3 marks on the board, your oldest one blows away) and Big Ranch, a 5×5 board where you need four in a row.' },
      { icon: '🌐', title: 'Online Posse', text: 'Public and private rooms you can join with a code or an invite link, reactions shown in speech bubbles, rematches and automatic reconnection.' },
      { icon: '📱', title: 'Every phone shape', text: 'Portrait, square and landscape layouts that switch on the fly, all the way down to the cover screens on flip phones.' },
      { icon: '🎵', title: 'Country soundtrack', text: 'Music for the menu, the match and the quick-draw timer, with wood, rope, whip and coin sounds on every interaction.' },
      { icon: '⭐', title: 'Game feel', text: 'Vibration, screen shake, puffs of dust, a shower of coins and a brass sheriff’s star trophy.' },
    ],
    shots: [
      { file: 'menu', caption: 'Main menu - the corral at sunset' },
      { file: 'setup', caption: 'Showdown setup - mode, AI skill, series, timer' },
      { file: 'classic', caption: 'A classic 3×3 match' },
      { file: 'big-ranch', caption: 'Big Ranch 5×5 - a win' },
      { file: 'tumbleweed', caption: 'Tumbleweed mode' },
      { file: 'online-posse', caption: 'Online Posse - rooms and codes' },
    ],
    role: [
      'I designed the new modes, the series play and the quick-draw timer.',
      'I wrote the rules engine and the alpha-beta AI in pure C#, with unit tests.',
      'I built the network client, a REST and WebSocket port of the web client, plus a SignalR rooms hub for the arcade.',
      'I generated all the 3D assets and UI art in Blender, and built the UI Toolkit interface so it scales to any screen.',
      'I wrote EditMode and PlayMode tests, device screenshot tests and online end-to-end tests.',
    ],
    tech: [
      { title: 'Two multiplayer backends, one game', text: 'On phones and in the standalone web version, it uses the Family Games protocol (REST rooms plus WebSocket with tickets). In the Showcase arcade, it plays on the game provider’s SignalR hub instead. Both feed into the same session object, so the match code doesn’t need to care which one it’s using.' },
      { title: 'Hand-rolled SignalR', text: 'RoomsHubSocket speaks SignalR’s JSON hub protocol over whichever WebSocket the build has, which is the browser’s in WebGL and System.Net.WebSockets everywhere else. It handles pings, backing off between retries and refreshing tokens.' },
      { title: 'Protocol parity', text: 'The message format {type, roomId, seq, ts, payload} and the reconnect approach (starting at 500 ms and doubling up to 30 s, with 10 attempts) match the web client exactly, so web and phone players meet in the same rooms.' },
      { title: 'Tested end to end', text: 'There are unit tests for the rules, the AI’s strength and the protocol parsing, PlayMode tests that take screenshots on 10 device profiles, and an online end-to-end test that plays the Unity game against a Node bot running without a screen.' },
    ],
    pipeline: [
      { title: 'Procedural 3D', text: 'generate_assets.py builds the board, the plank X, the lasso O, the fence, cacti, tumbleweeds, mesas, the sheriff’s star and the app icon in Blender, running without a window.' },
      { title: 'Rendered UI art', text: 'generate_ui_art.py renders the 3D signboard logo, the loading background, the piece medallions and the parchment texture used for the "wanted poster" style UI.' },
      { title: 'Sound & type', text: 'Music by Kevin MacLeod, sound effects from Kenney and OpenGameArt, and the Rye and Arvo fonts for the frontier-style lettering.' },
    ],
    challenges: [
      { problem: 'The rules on the shared server couldn’t change without breaking the web version of the game.', solution: 'The new modes are only available offline, and online matches use the classic rules that the server controls.' },
      { problem: 'Older servers didn’t support one-time WebSocket tickets.', solution: 'If the server returns a 404, the client falls back to the room’s JWT, and it switches to tickets automatically once the server has been updated.' },
      { problem: 'The cover screens on flip phones are tiny.', solution: 'Scaling based on screen density, with an extra fitting factor and a compact layout just for cover screens.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'UI Toolkit', 'WebSocket · SignalR', 'Alpha-beta AI', 'Blender (Python)', 'Unity Test Framework'],
    learned: [
      'Matching an existing network protocol exactly, byte for byte, is what lets two different clients share one world.',
      'Even tic-tac-toe needs a well-tuned AI. A perfect one isn’t any fun, so the difficulty comes from what it deliberately chooses not to see.',
      'Device screenshot tests turn "does it fit on a Razr cover screen?" into something CI can answer.',
    ],
    credits: 'The Blender models and the icon are original. The music is by Kevin MacLeod (CC BY 4.0), the sound effects come from Kenney (CC0) and OpenGameArt creators (CC0 and CC BY), and the fonts are Rye and Arvo (OFL). Everything is credited on the in-game About screen.',
  },

  /* ═══════════════════════════════ PROPBET ═══════════════════════════════ */
  {
    slug: 'propbet',
    title: 'PropBet',
    tagline: 'A two-seat biplane climbs from an airfield, through the clouds and out into space while the multiplier rises. Cash out before it busts.',
    accent: '#f6b73c',
    accent2: '#3d9bff',
    orientation: 'portrait',
    facts: [
      { label: 'Engine', value: 'Unity 6 (URP)' },
      { label: 'Platforms', value: 'Android · WebGL · Windows' },
      { label: 'Genre', value: 'Crash game · cash-out' },
      { label: 'Orientation', value: 'Portrait, mobile-first' },
      { label: 'Role', value: 'Solo developer' },
      { label: 'Year', value: '2026' },
    ],
    links: [{ label: 'Play in the browser', href: `${SHOWCASE}/propbet` }],
    pitch: [
      'PropBet started out as a 2D canvas crash game in my Next.js arcade. This version is a complete 3D rebuild in Unity 6. A two-seat, open-cockpit biplane waits on the airfield with a pilot in each seat, one for each of your bet panels. It rolls down the runway, lifts off and climbs over farmland and mountains, through the clouds and the stratosphere and out into space, while the multiplier rises until the round busts.',
      'Cash out and your pilot stands up, leaps over the side, free-falls and drifts away under a parachute. In the arcade, it plays on the game provider’s shared crash table, so everyone at the table watches the same flight, with a live list of real players’ bets, and stakes are settled through the operator’s wallet. Offline, it runs the same rules as a demo with a simulated crowd.',
    ],
    pillars: [
      { title: 'Altitude is the multiplier', text: 'The higher the plane climbs, the more it pays, so you can read the odds just by looking out of the cockpit.' },
      { title: 'Your pilot is your bet', text: 'Each bet panel has its own pilot, and cashing out is something you see happen, not just a number that changes.' },
      { title: 'Provably fair', text: 'Every round’s seed hash is shown before take-off and the seed after the bust, so anyone can check the result.' },
    ],
    loop: [
      { title: 'Bet in the countdown', text: 'During the 6-second countdown, stake one or both bet panels, with an optional auto cash-out anywhere from 1.01× to 1,000×.' },
      { title: 'Take off', text: 'The plane rolls down the runway for 1.5 seconds at 1.00× with no cash-out, then lifts off.' },
      { title: 'Climb', text: 'The multiplier rises along e^(0.1·t) from lift-off, reaching 2× after about 7 seconds in the air and 10× after about 23.' },
      { title: 'Cash out or bust', text: 'Cash out on a panel at any moment to get stake × multiplier. When the round busts, every stake still riding is lost.' },
    ],
    features: [
      { icon: '🪂', title: 'Physics-driven bail-out', text: 'When you cash out, the pilot stands up, leaps over the side, falls arched, throws the pilot chute and swings under a ram-air canopy.' },
      { icon: '🌍', title: 'A flight that changes with altitude', text: 'The airfield and farmland, then balloons and an airship, a sea of clouds with airliners, the stratosphere, and finally black space with the curve of the Earth and the planets.' },
      { icon: '🎯', title: 'Two bet panels', text: 'Two stakes ride the same flight, each with its own auto cash-out, just like in the original game.' },
      { icon: '👥', title: 'Live All bets list', text: 'Real players’ stakes and cash-outs on the provider’s table, or a simulated crowd in the demo.' },
      { icon: '🛩️', title: 'Hangar & missions', text: 'XP across 30 pilot levels, daily missions, a leaderboard and 8 liveries for the plane, which change how it looks and never the odds.' },
      { icon: '🔐', title: 'Provably Fair screen', text: 'Every past round can be recomputed from its revealed seed, right inside the game.' },
    ],
    shots: [
      { file: 'home', caption: 'Home - the biplane on the airfield' },
      { file: 'betting', caption: 'The countdown, with two bet panels' },
      { file: 'bail-out', caption: 'One panel cashed out, the other still riding' },
      { file: 'space', caption: 'Into space at high multipliers' },
      { file: 'big-win', caption: 'A Super Win celebration' },
      { file: 'hangar', caption: 'The hangar and its liveries' },
      { file: 'provably-fair', caption: 'The Provably Fair screen' },
    ],
    role: [
      'I designed the round flow, the two-panel betting, the progression and how the cash-out is shown.',
      'I programmed the gameplay and every screen in C#, building the UI in code with UI Toolkit.',
      'I wrote the crash rules, the fairness and the progression as a standalone C# package, which a script syncs into the game provider.',
      'I built the Blender Python pipeline that makes the 3D logo, the whole world from the airfield to space, the biplane and the pilots’ outfits and parachutes.',
      'I also mixed the plane’s sounds from recordings, built the device screenshot tests and wrote the simulator that checks the return.',
    ],
    tech: [
      { title: 'One rulebook', text: 'The crash rules, the round, the fairness, the crowd and the progression live in Shared/PropBetCore, a pure C# package. The demo runs it locally, and the provider runs the same files, kept in step by sync_rules.py.' },
      { title: 'The bust distribution', text: 'The chance of reaching x is RTP / x, so about 3% of rounds bust at 1.00×, and the cap is 5,000×. The demo returns 97%, and on the provider each RTP level an operator can pick (90% to 96%) has its own table.' },
      { title: 'A shared table over SignalR', text: 'On the provider, one table runs the countdown, the flight and the bust for every player. The game joins it through a small SignalR hub client, sending bets and cash-outs and receiving the round events.' },
      { title: 'Provable fairness', text: 'The bust point comes from a uniform draw u as floor(RTP / u). Its seed hash is published before take-off and the seed is revealed after the bust, so the Provably Fair screen can recompute any past round.' },
    ],
    pipeline: [
      { title: 'A whole sky in Blender', text: 'build_world.py makes the airfield, hangars, tower, farms, windmill, mountains, clouds and cloud deck, balloons, an airship, airliners, the Earth, the planets, a space station and a satellite.' },
      { title: 'The biplane & its pilots', text: 'build_plane.py builds the two-seat biplane and its eight liveries, and build_people.py dresses Quaternius’ rigged man with helmets, goggles, harnesses and the parachutes.' },
      { title: 'Recorded sound', text: 'The propeller, wind, take-off roar, explosions and the parachute catching the air are cut and mixed from CC0 and CC BY recordings by a Python script, under Kevin MacLeod music and Montserrat lettering.' },
    ],
    challenges: [
      { problem: 'A round that busts at 1.00× while the plane is still on the runway looks broken.', solution: 'Every flight starts with a 1.5-second take-off roll held at 1.00× with no cash-out, and a 1.00× bust happens at lift-off, never before the plane is in the air.' },
      { problem: 'In most crash games, cashing out is just a number changing colour, which feels flat.', solution: 'Each bet panel has a pilot in the plane, and cashing out triggers a full, physics-driven bail-out, so you see your win happen.' },
      { problem: 'Demo money that can be edited, or that never runs out, teaches players nothing.', solution: 'The balance and the next seed are sealed on the device, and a top-up is only offered once the balance has run out.' },
    ],
    stack: ['Unity 6 · URP', 'C#', 'UI Toolkit', 'Blender 5.2 (Python)', 'SignalR · WebSocket', '.NET crash simulator', 'WebGL · Android'],
    learned: [
      'Giving the multiplier a place in the world (the altitude) made the maths easier for players to feel.',
      'A shared table changes the game: watching other people cash out is half the tension.',
      'Small rules, like the take-off roll, matter as much to whether a game feels fair as the maths does.',
    ],
    credits: 'The pilots are built on Quaternius’ rigged man (CC0). The music is by Kevin MacLeod (CC BY 4.0), the sound effects come from Kenney, OpenGameArt, Freesound and Wikimedia Commons creators (CC0, CC BY 3.0 and CC BY 4.0), the font is Montserrat (OFL) and the logo reflections use a Poly Haven HDRI (CC0). The logo, the world, the plane and the interface were made for the game, with no AI-generated art or audio. Everything is credited on the in-game About screen.',
  },
];

export const gameBySlug = (slug: string): GameData => {
  const g = GAMES.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown game: ${slug}`);
  return g;
};
