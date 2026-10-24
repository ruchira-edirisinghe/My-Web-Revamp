'use client';
import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';

interface WebProject {
  cat: string;
  idx: number;
  img: string;
  alt: string;
  tag: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
  /** Playable build on the shared Game Engine. Games only - the slug is the
   *  arcade's own route id, which is not always the portfolio's (Derby Kings
   *  lives at /projects/web/horse-racing but plays at derby-kings). */
  play?: string;
  /** Shown on the cover when the project is live or public. Games show Playable instead. */
  status?: 'Live' | 'Open source';
}

/** Every playable game (web and Unity WebGL builds) lives on the 747 Sandbox arcade. */
const SHOWCASE = 'https://arcade.747sandbox.com/games';

/**
 * How many covers are fetched up front: the featured row plus the first row
 * of the grid. Everything below is lazy - twenty-nine thumbnails used to be
 * about 3.5 MB requested before the page had finished laying out.
 */
const EAGER_CARDS = 3;

const WEB_PROJECTS: WebProject[] = [
  { cat: 'web dev', idx: 0, img: '/Images/projects/catalogie/cover-thumb.webp', alt: 'Catalogie - media tracker for movies, TV, games and books', tag: 'Collaborative · Design & Development', label: 'Live Product · Ongoing', title: 'Catalogie', desc: 'A media tracker that’s live and running on our own server, which I’m building with two collaborators. It keeps movies, TV series, games and books in one catalog and tracks each of them in the way that makes sense for it. Behind it is a strict TypeScript PERN API with ratings, social features, stats and importers, and we’ve shipped six versions since launch.', tags: ['React · Express 5', 'PostgreSQL · TS', 'Team of 3'], href: '/projects/web/catalogie', status: 'Live' },
  { cat: 'web dev', idx: 1, img: '/Images/projects/Phurl/cover-thumb.webp', alt: 'Project PhURL - AI Phishing URL Detection', tag: 'UI/UX Designing & Development', label: 'AI · Cybersecurity', title: 'Project PhURL', desc: 'A full-stack website that detects phishing links and helps people learn to spot them. It wraps a LightGBM model with 96.6% accuracy in a React and Django app, and includes a learning hub.', tags: ['UI/UX', 'React · Django', 'Machine Learning'], href: '/projects/web/phurl' },
  { cat: 'dev mobile', idx: 2, img: '/Images/projects/lkr-p2p/cover-thumb.webp', alt: 'LKR P2P Rate - Android USDT/LKR rate widgets and app', tag: 'Android Design & Development', label: 'Android App · Widgets', title: 'LKR P2P Rate', desc: 'Shows the USDT to LKR P2P rate you can actually get, plus any exchange rate, right on your Android home screen. It has resizable widgets with day, week and month charts, a converter based on real ads, the live order book, rate alerts and nine themes, and it’s open source.', tags: ['Kotlin · Compose', 'Glance Widgets', 'Open Source'], href: '/projects/web/lkr-p2p-rate', status: 'Open source' },
  { cat: 'web mobile', idx: 3, img: '/Images/projects/funxt/cover-thumb.webp', alt: 'Fun Extreme Technology Corporate Website UI', tag: 'UI/UX Designing', label: 'Corporate / Gaming-Tech', title: 'Fun Extreme Technology', desc: 'A company website for a gaming technology firm, with a homepage, four solution pillars, and company, careers and contact pages. It’s built on one bold red gradient design system, designed for desktop and mobile, and now live.', tags: ['Figma', 'UI/UX', 'Web + Mobile'], href: '/projects/web/funxt', status: 'Live' },
  { cat: 'web mobile', idx: 4, img: '/Images/projects/social-casino/cover-thumb.webp', alt: '747 Social Casino Platform UI', tag: 'UI/UX Designing', label: 'Social Casino UI', title: '747 Social Casino', desc: 'A social casino that combines a full social network, with profiles, stories, posts and comments, with games and prizes. It runs on a green and gold token system designed for both desktop and mobile.', tags: ['Figma', 'UI/UX', 'Web + Mobile'], href: '/projects/web/747social' },
  { cat: 'web mobile', idx: 5, img: '/Images/projects/lottogram/cover-thumb.webp', alt: 'Lottogram Betting & Lottery Platform UI', tag: 'UI/UX Designing', label: 'iGaming / Betting UI', title: 'Lottogram', desc: 'A bold betting and lottery platform covering games, live events, the wallet, bet history and loyalty. I designed the whole thing on one red and gold system for both desktop and mobile.', tags: ['Figma', 'UI/UX', 'Web + Mobile'], href: '/projects/web/lottogram' },
  { cat: 'dev unity', idx: 6, img: '/Images/projects/aether-dynasty/cover-thumb.webp', alt: 'Aether Dynasty - Unity mobile slot game with Greek gods', tag: 'Game Development · Unity', label: 'Unity Game / Mobile', title: 'Aether Dynasty', desc: 'A portrait-first Unity 6 rebuild of my Greek myth slot. Six stone reels grow from 729 to 46,656 ways to win, with cascading wins, golden frame wilds, storm free games and three playful 3D gods who can step in on any spin. The rules live in a shared C# core, and the return to player was measured at 94.1% over tens of millions of rounds.', tags: ['Unity 6 · C#', 'Blender Pipeline', 'Android · WebGL'], href: '/projects/web/aether-dynasty', play: `${SHOWCASE}/aether-dynasty` },
  { cat: 'dev unity', idx: 7, img: '/Images/projects/void-armada/cover-thumb.webp', alt: 'Void Armada - Unity space-marine battleship game', tag: 'Game Development · Unity', label: 'Unity Game / Strategy', title: 'Void Armada', desc: 'Battleship set among the asteroids. It’s a landscape space fleet battle with five weapon systems powered by energy, two AI commanders called Veteran and Warlord, and private rooms for playing with a friend. The server runs all the rules, and the Unity client simply draws what it’s told.', tags: ['Unity 6 · C#', 'SignalR · WebSocket', 'Online Multiplayer'], href: '/projects/web/void-armada', play: `${SHOWCASE}/void-armada` },
  { cat: 'dev unity', idx: 8, img: '/Images/projects/glacier-glide/cover-thumb.webp', alt: 'Glacier Glide - Unity endless sledding runner', tag: 'Game Development · Unity', label: 'Unity Game / Endless Runner', title: 'Glacier Glide', desc: 'An endless downhill sledding game with five heroes who each have their own perk, ten sleds, blasters for taking on bats, wolves, golems and yetis, big air ramps, power-ups and a reward chest. Every model and icon is generated by one Blender script, and every sound is generated in code.', tags: ['Unity 6 · C#', 'Procedural Blender', 'Android · WebGL'], href: '/projects/web/glacier-glide', play: `${SHOWCASE}/glacier-glide` },
  { cat: 'dev unity', idx: 9, img: '/Images/projects/glass-bridge/cover-thumb.webp', alt: 'Glass Bridge - Unity manga-style glass bridge game', tag: 'Game Development · Unity', label: 'Unity Game / Provably Fair', title: 'Glass Bridge', desc: 'One of these two panes will hold. Three chibi runners cross a gorge on pairs of glass panes, where one is tempered and the other isn’t. It features glass that shatters in real time, procedural animation with no pre-made clips, custom toon shaders, and a sealed bridge that returns exactly 97% at every step.', tags: ['Unity 6 · C#', 'Custom Shaders', 'Commit-Reveal'], href: '/projects/web/glass-bridge', play: `${SHOWCASE}/glass-bridge` },
  { cat: 'dev unity', idx: 10, img: '/Images/projects/tic-tac-toe-showdown/cover-thumb.webp', alt: 'Tic-Tac-Toe Showdown - Unity Wild West tic-tac-toe', tag: 'Game Development · Unity', label: 'Unity Game / Board', title: 'Tic-Tac-Toe Showdown', desc: 'Noughts and crosses in a Wild West corral at sunset. It has an outlaw AI that uses alpha-beta search, Tumbleweed and 5×5 Big Ranch modes, best-of series, a quick-draw timer and online rooms shared with the web version of the game.', tags: ['Unity 6 · C#', 'WebSocket · SignalR', 'Alpha-Beta AI'], href: '/projects/web/tic-tac-toe-showdown', play: `${SHOWCASE}/tic-tac-toe` },
  { cat: 'dev unity', idx: 11, img: '/Images/projects/horse-racing/cover-thumb.webp', alt: 'Derby Kings - Unity 3D horse-racing betting game', tag: 'Game Development · Unity', label: 'Unity Game / Racing', title: 'Derby Kings', desc: 'My browser horse race, rebuilt in Unity 6 as a premium sports broadcast. Read the race card, back a horse to WIN, PLACE, SHOW or FORECAST, and watch six Blender-built runners race a realistic course while a camera director cuts between shots. Paid races are drawn by the game provider, and Arenas let up to eight friends bet on the same race.', tags: ['Unity 6 · C#', 'Blender Pipeline', 'SignalR Arenas'], href: '/projects/web/horse-racing', play: `${SHOWCASE}/derby-kings` },
  { cat: 'dev unity', idx: 12, img: '/Images/projects/car-racing/cover-thumb.webp', alt: 'Nitro Nights - Unity 3D night car-racing betting game', tag: 'Game Development · Unity', label: 'Unity Game / Racing', title: 'Nitro Nights', desc: 'A live night race on TV, rebuilt in Unity 6 from my browser car racing game. Twelve Blender-built cars race four circuits in dry, hot, damp or wet weather, with five red start lights, a timing tower and a TV director. You get a 30-second window to lock in a bet on one of five markets, and the engine sounds are all synthesised.', tags: ['Unity 6 · C#', 'Synthesised Audio', 'Android · WebGL'], href: '/projects/web/car-racing', play: `${SHOWCASE}/nitro-nights` },
  { cat: 'dev unity', idx: 13, img: '/Images/projects/propbet/cover-thumb.webp', alt: 'PropBet - Unity 3D biplane crash game', tag: 'Game Development · Unity', label: 'Unity Game / Crash', title: 'PropBet', desc: 'My crash game, rebuilt in 3D in Unity 6. A two-seat biplane climbs from an airfield through the clouds and out into space while the multiplier rises, and when you cash out, your pilot bails out under a parachute. It plays on the game provider’s shared table, with provably fair rounds, 30 pilot levels and eight liveries.', tags: ['Unity 6 · C#', 'Provably Fair', 'Shared Table'], href: '/projects/web/propbet', play: `${SHOWCASE}/propbet` },
  { cat: 'dev unity', idx: 14, img: '/Images/projects/kamba-adeema/cover-thumb.webp', alt: 'Tug of War - Unity 3D Avurudu tug-of-war betting game', tag: 'Game Development · Unity', label: 'Unity Game / Cultural Sport', title: 'Tug of War', desc: 'Kamba Adeema, the Avurudu tug of war, rebuilt in Unity 6. Two teams of chibi villagers heave on a village pitch at dusk in front of 222 cheering spectators, with rope physics and a bet on every heave. Eight fair grips decide each heave, and every demo match is sealed before it starts, at a 97% return.', tags: ['Unity 6 · C#', 'Rope Physics', 'HMAC Fairness'], href: '/projects/web/kamba-adeema', play: `${SHOWCASE}/tug-of-war` },
  { cat: 'dev games', idx: 15, img: '/Images/projects/collapse-factor/cover-thumb.webp', alt: 'Collapse Factor - browser tower-pull betting game', tag: 'Development + Game Design', label: 'Web Game / 3D Betting', title: 'Collapse Factor', desc: 'Jenga turned into a cash-out game and drawn like an engineering blueprint. Every turn, a claw pulls a block out of a 48-block tower, and a gauge shows you the chance of collapse before you decide to keep going. The payouts come from that same published curve, so every step returns exactly 97%.', tags: ['Next.js · three.js', 'TypeScript', 'Provably Fair'], href: '/projects/web/collapse-factor', play: `${SHOWCASE}/collapse-factor` },
  { cat: 'dev games', idx: 16, img: '/Images/projects/coin-duel/cover-thumb.webp', alt: 'Coin Duel - browser coin-toss duelling game', tag: 'Development + Game Design', label: 'Web Game / 3D Betting', title: 'Coin Duel', desc: 'Five coins are fired into a column of light in a neon arena, and you bet on the face that lands on more of them. With an odd number of coins, a tie is impossible, and the prices for both faces change every round, from a set of prices that averages out to an exact 97.000% return.', tags: ['Next.js · three.js', 'WebGL + Bloom', 'Provably Fair'], href: '/projects/web/coin-duel', play: `${SHOWCASE}/coin-duel` },
  { cat: 'dev games', idx: 17, img: '/Images/projects/kana-mutti/cover-thumb.webp', alt: 'Kana Mutti - browser blindfold pot-smashing betting game', tag: 'Development + Game Design', label: 'Web Game / Sealed Reveal', title: 'Kana Mutti', desc: 'The blindfolded pot-smashing game from Avurudu, turned into a cash-out game. It’s also the arcade’s example of sealed-reveal fairness, where anyone can check the board afterwards but nobody can work it out while you’re still picking pots.', tags: ['Next.js · three.js', 'Commit-Reveal', 'a11y DOM Mirror'], href: '/projects/web/kana-mutti', play: `${SHOWCASE}/kana-mutti` },
  { cat: 'dev games', idx: 18, img: '/Images/projects/pixel-poker/cover-thumb.webp', alt: "Pixel Perfect Poker - browser Texas Hold'em tournament", tag: 'Development + Game Design', label: 'Web Game / Skill · No House', title: 'Pixel Perfect Poker', desc: 'A six-player No-Limit Hold’em Sit & Go with a retro pixel art look. It has a full rules engine with proper side pots and split pots, five AI opponents with their own personalities that think using simulations, and a card deal that’s kept secret rather than published.', tags: ['Next.js · React', 'Monte Carlo AI', 'Firebase MP'], href: '/projects/web/pixel-poker', play: `${SHOWCASE}/pixel-poker` },
  { cat: 'dev games', idx: 19, img: '/Images/projects/whack-a-mole/cover-thumb.webp', alt: 'Whack-A-Mole - browser fairground whacking betting game', tag: 'Development + Game Design', label: 'Web Game / Priced Skill', title: 'Whack-A-Mole', desc: 'The classic fairground game turned into a fifteen-second betting round, with nine holes, three speeds that each pay differently and a Golden Rush that doubles the last four seconds. It’s the only game of skill in the arcade, and it’s still priced honestly, because the value of each point is worked out from a perfect round, so nobody can beat the house.', tags: ['Next.js · three.js', 'Derived Paytable', 'Zero Image Files'], href: '/projects/web/whack-a-mole', play: `${SHOWCASE}/whack-a-mole` },
  { cat: 'web', idx: 20, img: '/Images/projects/lyceum/cover-thumb.webp', alt: 'Lyceum Campus', tag: 'UI/UX Designing', label: 'Academic Redesign', title: 'Lyceum Campus', desc: 'A complete website redesign for a modern university, focused on making the site easier to navigate, making courses easier to find and giving the brand a stronger identity.', tags: ['Figma', 'UI/UX', 'Research'], href: '/projects/web/lycampus' },
  { cat: 'web', idx: 21, img: '/Images/projects/msg_platform/cover-thumb.webp', alt: 'Messaging Platform UI', tag: 'UI/UX Designing', label: 'SaaS Dashboard UI', title: 'Messaging Platform', desc: 'A platform for developers and teams to send messages across multiple channels. It has guided service setup, a visual parameter builder, API tokens, logs and billing, all protected with two-factor authentication.', tags: ['Figma', 'UI/UX', 'SaaS'], href: '/projects/web/messaging-system' },
  { cat: 'web', idx: 22, img: '/Images/projects/kyc/cover-thumb.webp', alt: 'KYC Verification UI', tag: 'UI/UX Designing', label: 'Identity / Fintech UI', title: 'KYC Verification', desc: 'A guided identity verification flow that takes people through consent, document upload with live status and a face scan, over four steps. I designed the whole thing in both light and dark themes.', tags: ['Figma', 'UI/UX', 'Fintech'], href: '/projects/web/kyc' },
  { cat: 'web', idx: 23, img: '/Images/projects/agent/cover-thumb.webp', alt: '747 Agent Back-Office Dashboard UI', tag: 'UI/UX Designing', label: 'Back-Office / iGaming Ops', title: '747 Agent Back-Office', desc: 'A console for managing agents and players across several levels, with an agent tree, credit lines, transfers, commissions and a full set of reports. I designed the whole thing in two complete themes, dark and light.', tags: ['Figma', 'UI/UX', 'Dark + Light'], href: '/projects/web/agent-system' },
  { cat: 'web', idx: 24, img: '/Images/projects/LMS/cover-thumb.webp', alt: 'ZUSE Corporate LMS', tag: 'UI/UX Designing', label: 'EdTech Architecture', title: 'ZUSE Corporate LMS', desc: 'A modern learning management system that helps corporate employees learn and grow, with an easy-to-use interface and interactive learning.', tags: ['Figma', 'UI/UX', 'EdTech'], href: '/projects/web/lms' },
  { cat: 'web dev', idx: 25, img: '/Images/projects/technosphere/cover-thumb.webp', alt: 'Technosphere tech convention website', tag: 'UI/UX Designing & Development + Consulting', label: 'Event Website', title: 'Technosphere', desc: 'The website for TECHNOSPHERE 2022, the tech convention run by the FOSS Community of NSBM. It covers schedules, speakers, registration for in-person and webinar attendees, live Q&A and a CTF portal, all designed to be used on the go.', tags: ['Figma', 'UI/UX', 'Live Website'], href: '/projects/web/technosphere', status: 'Live' },
  { cat: 'web', idx: 26, img: '/Images/projects/vebuild/cover-thumb.webp', alt: 'VeBuild Construction Web UI', tag: 'UI/UX Designing', label: 'Construction Web UI', title: 'VeBuild', desc: 'A clean, sleek website redesign for a construction company. It shows two different UI directions side by side, from an earlier block-based layout to the refined final design.', tags: ['Figma', 'UI/UX', 'Web'], href: '/projects/web/vebuild' },
  { cat: 'web', idx: 27, img: '/Images/projects/dtmhms/COVER-thumb.webp', alt: 'DTM Hall Management System', tag: 'UI/UX Designing', label: 'Booking Platform UI', title: 'DTM Hall Management System', desc: 'A clean, sleek hall booking platform that replaces paper-based venue bookings with a colour-coded calendar, side-by-side venue comparisons and a design system that can grow.', tags: ['Figma', 'UI/UX', 'React.js'], href: '/projects/web/dtmhms' },
  { cat: 'web', idx: 28, img: '/Images/projects/ncgws/cover-thumb.webp', alt: 'NCG Warehouse Solutions Web UI', tag: 'UI/UX Designing', label: 'Corporate Web UI', title: 'NCG Warehouse', desc: 'A company website for a logistics and warehousing business. It shows live warehouse capacity, makes tenders easy to find and highlights how far the fleet reaches, all in a clean blue and yellow design.', tags: ['Figma', 'UI/UX', 'Vue.js'], href: '/projects/web/ncgws' },
  { cat: 'web', idx: 29, img: '/Images/projects/lyaportal/cover-thumb.webp', alt: 'Lyceum Academy Exam Portal UI', tag: 'UI/UX Designing', label: 'Multi-Role Portal UI', title: 'LYA Exam Portal', desc: 'Lyceum Academy’s online portal for registering and paying for exams. It has three separate journeys for students, parents and teachers, and flexible payment by card or bank transfer.', tags: ['Figma', 'UI/UX', 'Web Portal'], href: '/projects/web/lyaportal' },
];

/* ── What kind of work each project is ─────────────────────────────────────── */

type Kind = 'dev' | 'design' | 'game' | 'unity';

interface KindMeta { id: Kind; label: string; short: string; badge: string; blurb: string; cta: string }

const KINDS: KindMeta[] = [
  { id: 'dev', label: 'Development', short: 'Development', badge: 'Development', blurb: 'Live products, apps and full-stack projects I have built, ranging from a machine learning phishing detector to Android home screen widgets.', cta: 'View project' },
  { id: 'design', label: 'UI/UX Case Studies', short: 'UI/UX Design', badge: 'UI/UX Case Study', blurb: 'Interface design for web and mobile that starts with research, from personas and user flows all the way to complete design systems.', cta: 'Read case study' },
  { id: 'unity', label: 'Unity Games', short: 'Unity Games', badge: 'Unity Game', blurb: 'Games I built in Unity 6 that run in the browser through WebGL, with single-player modes, AI opponents and online multiplayer.', cta: 'View game' },
  { id: 'game', label: 'Web Games', short: 'Web Games', badge: 'Web Game', blurb: 'Browser games from my Game Engine arcade, with 3D scenes, real-time game loops and maths that can be proven fair.', cta: 'View game' },
];
const KIND = Object.fromEntries(KINDS.map((k) => [k.id, k])) as Record<Kind, KindMeta>;

const kindOf = (p: WebProject): Kind => {
  const cats = p.cat.split(' ');
  if (cats.includes('unity')) return 'unity';
  if (cats.includes('games')) return 'game';
  if (cats.includes('dev')) return 'dev';
  return 'design';
};

type Cat = 'all' | Kind;
/** Design work can be narrowed further to the studies that also ship a mobile layout. */
type Platform = 'all' | 'mobile';

const isMobile = (p: WebProject) => p.cat.split(' ').includes('mobile');

/** The spotlight: one live product, one design study, one Unity game, one web game. */
const SPOTLIGHT: { href: string; kicker: string; facts: [string, string][] }[] = [
  { href: '/projects/web/catalogie', kicker: 'Live product · Ongoing', facts: [['Role', 'Design + build'], ['Team', '3 people'], ['Stack', 'PERN · TypeScript']] },
  { href: '/projects/web/747social', kicker: 'Social casino · Web + mobile', facts: [['Role', 'UI/UX design'], ['Screens', '90+ high-fidelity'], ['Themes', 'Light & dark']] },
  { href: '/projects/web/void-armada', kicker: 'Unity 6 · Online multiplayer', facts: [['Engine', 'Unity 6 · C#'], ['Online', 'SignalR rooms'], ['AI', 'Veteran · Warlord']] },
  { href: '/projects/web/collapse-factor', kicker: 'Playable · Blueprint Jenga cash-out', facts: [['Engine', 'Next.js · three.js'], ['Return', '97% every step'], ['Tower', '48 blocks']] },
];

const coverOf = (p: WebProject) => p.img.replace('-thumb.webp', '-card.webp');
const pad = (n: number) => String(n).padStart(2, '0');

const matchesQuery = (p: WebProject, q: string) => {
  if (!q) return true;
  const hay = `${p.title} ${p.label} ${p.tag} ${p.desc} ${p.tags.join(' ')}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
};

/** Line icons for the type chips, drawn on a 20px grid in the chip's accent. */
const CAT_ICONS: Record<Cat, ReactNode> = {
  all: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" /><rect x="3" y="11" width="6" height="6" rx="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" /></>,
  dev: <><path d="m7 6-4 4 4 4" /><path d="m13 6 4 4-4 4" /><path d="m11 4-2 12" /></>,
  design: <><path d="M10 3 15 9.5 10 17 5 9.5Z" /><circle cx="10" cy="10.5" r="1.6" /><path d="M10 3v5.9" /></>,
  unity: <><path d="M10 2.5 16.5 6v8L10 17.5 3.5 14V6Z" /><path d="M3.5 6 10 9.5 16.5 6" /><path d="M10 9.5v8" /></>,
  game: <><path d="M6.5 6h7A3.5 3.5 0 0 1 17 9.5l.5 3.6a1.9 1.9 0 0 1-3.3 1.5L12.5 13h-5l-1.7 1.6a1.9 1.9 0 0 1-3.3-1.5L3 9.5A3.5 3.5 0 0 1 6.5 6Z" /><path d="M7 8.3v3M5.5 9.8h3" /><circle cx="13" cy="9" r=".6" /><circle cx="14.5" cy="10.6" r=".6" /></>,
};

/* ── Spotlight carousel ────────────────────────────────────────────────────── */

/** Advances when the active rail item's progress bar finishes, so pausing the
 *  bar (hover / focus) pauses the rotation with it. No auto-advance under
 *  reduced motion. */
function Spotlight() {
  const items = SPOTLIGHT.map((s) => ({ ...s, p: WEB_PROJECTS.find((x) => x.href === s.href)! })).filter((s) => s.p);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  const cur = items[active];
  const kind = kindOf(cur.p);
  const next = () => setActive((a) => (a + 1) % items.length);

  return (
    <section
      className={`px-spot px-${kind}`}
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false); }}
    >
      <div className="px-spot-stage">
        <div className="px-spot-media">
          {items.map((s, i) => (
            <img key={s.href} src={coverOf(s.p)} alt={i === active ? s.p.alt : ''} aria-hidden={i !== active}
              className={i === active ? 'on' : ''} loading="eager" decoding="async" fetchPriority={i === 0 ? 'high' : 'low'} />
          ))}
        </div>
        <div className="px-spot-copy" key={active} aria-live={paused ? 'polite' : 'off'}>
          <div className="px-spot-top">
            <span className="px-chip">{KIND[kind].badge}</span>
            <span className="px-spot-count">{pad(active + 1)} / {pad(items.length)}</span>
          </div>
          <span className="px-kicker">{cur.kicker}</span>
          <h3 className="px-spot-title">{cur.p.title}</h3>
          <p className="px-spot-desc">{cur.p.desc}</p>
          <dl className="px-facts">
            {cur.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="px-actions">
            <Link href={cur.p.href} className="px-btn">{KIND[kind].cta} <i>→</i></Link>
            {cur.p.play && (
              <a href={cur.p.play} target="_blank" rel="noopener" className="px-btn px-btn-ghost" aria-label={`Play ${cur.p.title} (opens in a new tab)`}>
                ▶ Play now
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="px-spot-rail" role="tablist" aria-label="Choose a featured project">
        {items.map((s, i) => (
          <button key={s.href} type="button" role="tab" aria-selected={i === active}
            className={`px-rail-item px-${kindOf(s.p)}${i === active ? ' on' : ''}`} onClick={() => setActive(i)}>
            <img src={s.p.img} alt="" loading="eager" decoding="async" />
            <span className="px-rail-text"><b>{s.p.title}</b><small>{KIND[kindOf(s.p)].short}</small></span>
            <span className="px-rail-bar" aria-hidden="true">
              {i === active && !still && (
                <span key={active} className="run" style={{ animationPlayState: paused ? 'paused' : 'running' }} onAnimationEnd={next} />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Gallery card ──────────────────────────────────────────────────────────── */

/** "UI/UX Designing & Development" reads as a role, not a skill list. */
const roleOf = (p: WebProject) => p.tag.replace(/Designing/g, 'Design').replace(/ \+ /g, ' · ');

/**
 * Cover → what it is → who did what with which tools →
 * what you can do next. Every card answers the same questions in the same
 * place, so a row can be scanned across as easily as one card read down.
 */
function Card({ p, i }: { p: WebProject; i: number }) {
  const kind = kindOf(p);
  return (
    <article className={`pc pc-${kind} px-${kind}`} style={{ '--i': i } as CSSProperties}>
      <div className="pc-media">
        <img src={p.img} alt={p.alt} loading={p.idx < EAGER_CARDS ? 'eager' : 'lazy'} decoding="async" />
        <span className="pc-kind"><i aria-hidden="true" />{KIND[kind].badge}</span>
        {(p.play || p.status) && (
          <span className={`pc-status${p.play ? ' pc-status-play' : ''}`}>{p.play ? 'Playable' : p.status}</span>
        )}
      </div>
      <div className="pc-body">
        <p className="pc-eyebrow">{p.label}</p>
        <h3 className="pc-title"><Link href={p.href} className="px-stretch">{p.title}</Link></h3>
        <p className="pc-desc">{p.desc}</p>
        <dl className="pc-spec">
          <div>
            <dt>
              <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.5" r="3.2" /><path d="M3.8 17c.7-3.3 3.2-5.2 6.2-5.2s5.5 1.9 6.2 5.2" /></svg>
              Role
            </dt>
            <dd><ul className="pc-tags pc-tags-role">{roleOf(p).split(' · ').map((r) => <li key={r}>{r}</li>)}</ul></dd>
          </div>
          <div>
            <dt>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 17 6.4 10 10 3 6.4Z" /><path d="m3 10 7 3.6 7-3.6" /><path d="m3 13.6 7 3.6 7-3.6" /></svg>
              Stack
            </dt>
            <dd><ul className="pc-tags">{p.tags.flatMap((t) => t.split(' · ')).map((t) => <li key={t}>{t}</li>)}</ul></dd>
          </div>
        </dl>
      </div>
      <div className="pc-foot">
        <span className="pc-cta" aria-hidden="true">{KIND[kind].cta} <i>→</i></span>
        {p.play && (
          <a href={p.play} target="_blank" rel="noopener" className="pc-play" aria-label={`Play ${p.title} (opens in a new tab)`}>
            ▶ Play
          </a>
        )}
      </div>
    </article>
  );
}

/* ── Index list with a cursor-following cover preview ──────────────────────── */

function IndexList({ items }: { items: WebProject[] }) {
  const box = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<WebProject | null>(null);
  const move = (e: React.MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (r && peek.current) peek.current.style.transform = `translate3d(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 96}px, 0)`;
  };
  return (
    <div className="px-index" ref={box} onMouseMove={move} onMouseLeave={() => setHover(null)}>
      <div className="px-index-head" aria-hidden="true">
        <span>No.</span><span>Project</span><span>Type</span><span>Built with</span><span />
      </div>
      <ol>
        {items.map((p, i) => {
          const kind = kindOf(p);
          return (
            <li key={p.href} className={`px-row px-${kind}`} style={{ '--i': i } as CSSProperties} onMouseEnter={() => setHover(p)}>
              <span className="px-row-no">{pad(i + 1)}</span>
              <img className="px-row-thumb" src={p.img} alt="" loading="lazy" decoding="async" />
              <div className="px-row-main">
                <h3><Link href={p.href} className="px-stretch">{p.title}</Link></h3>
                <p>{p.label}</p>
              </div>
              <span className="px-row-kind"><i aria-hidden="true" />{KIND[kind].short}</span>
              <span className="px-row-tags">{p.tags.join(' · ')}</span>
              <span className="px-row-end">
                {p.play && (
                  <a href={p.play} target="_blank" rel="noopener" className="px-row-play" aria-label={`Play ${p.title} (opens in a new tab)`}>▶ Play</a>
                )}
                <span className="px-row-arrow" aria-hidden="true">→</span>
              </span>
            </li>
          );
        })}
      </ol>
      <div ref={peek} className={`px-peek${hover ? ' on' : ''}${hover ? ` px-${kindOf(hover)}` : ''}`} aria-hidden="true">
        {hover && <img src={hover.img} alt="" />}
      </div>
    </div>
  );
}

function Results({ items, index }: { items: WebProject[]; index: boolean }) {
  return index ? <IndexList items={items} /> : <div className="px-gallery">{items.map((p, i) => <Card key={p.href} p={p} i={i} />)}</div>;
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function WebProjectsClient() {
  const [cat, setCat] = useState<Cat>('all');
  const [platform, setPlatform] = useState<Platform>('all');
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(false);
  const resultsTop = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => initProjects(), []);

  // The glowing pill behind the active type chip slides to whichever chip is
  // on. Measured after layout, and again on resize because chip widths follow
  // the font size.
  useLayoutEffect(() => {
    const measure = () => {
      const on = chipsRef.current?.querySelector<HTMLElement>('.px-chip-btn.on');
      if (on) setInd({ x: on.offsetLeft, w: on.offsetWidth });
    };
    measure();
    // On a phone the chips scroll sideways; bring the active one into that
    // strip without ever moving the page itself.
    const strip = chipsRef.current;
    const on = strip?.querySelector<HTMLElement>('.px-chip-btn.on');
    if (strip && on && strip.scrollWidth > strip.clientWidth) strip.scrollLeft = Math.max(0, on.offsetLeft - 24);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [cat]);

  // The bar takes a heavier shadow once it is pinned under the navbar.
  useEffect(() => {
    const el = resultsTop.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 100), {
      rootMargin: '-93px 0px 0px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // "/" jumps to search from anywhere on the page, as on most catalogues.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Category, search and layout live in the URL, so Back from a project
  // returns to the same view and a filtered list can be shared. The old
  // ?type=web / ?type=mobile links map onto the design category.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get('type');
    if (t === 'web') setCat('design');
    else if (t === 'mobile') { setCat('design'); setPlatform('mobile'); }
    else if (t && KINDS.some((k) => k.id === t)) setCat(t as Kind);
    if (sp.get('platform') === 'mobile') setPlatform('mobile');
    if (sp.get('q')) setQuery(sp.get('q')!);
    if (sp.get('view') === 'index' || sp.get('view') === 'list') setIndex(true);
  }, []);
  useEffect(() => {
    const sp = new URLSearchParams();
    if (cat !== 'all') sp.set('type', cat);
    if (cat === 'design' && platform === 'mobile') sp.set('platform', 'mobile');
    if (query) sp.set('q', query);
    if (index) sp.set('view', 'index');
    const qs = sp.toString();
    window.history.replaceState(window.history.state, '', qs ? `?${qs}` : window.location.pathname);
  }, [cat, platform, query, index]);

  const byKind = useMemo(
    () => Object.fromEntries(KINDS.map((k) => [k.id, WEB_PROJECTS.filter((p) => kindOf(p) === k.id)])) as Record<Kind, WebProject[]>,
    [],
  );
  const results = useMemo(
    () => WEB_PROJECTS.filter((p) =>
      (cat === 'all' || kindOf(p) === cat) &&
      (cat !== 'design' || platform === 'all' || isMobile(p)) &&
      matchesQuery(p, query)),
    [cat, platform, query],
  );

  const grouped = cat === 'all' && !query;

  const pickCat = (c: Cat) => {
    setCat(c);
    setPlatform('all');
    // The bar is sticky, so a chip can be pressed deep in a long list; jump
    // back to the top of the results so the new set starts in view.
    const el = resultsTop.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }
  };
  // From the hero: filter to one kind and bring its results into view.
  const jumpTo = (c: Cat) => {
    pickCat(c);
    requestAnimationFrame(() => resultsTop.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start',
    }));
  };
  const reset = () => { setCat('all'); setPlatform('all'); setQuery(''); };

  const chips: { id: Cat; label: string; n: number }[] = [
    { id: 'all', label: 'All', n: WEB_PROJECTS.length },
    ...KINDS.map((k) => ({ id: k.id, label: k.short, n: byKind[k.id].length })),
  ];

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Architecting the <span className="tagline-name">Digital Cosmos</span></>}
    >
      <main className="pj-page">
        <header className="pj-hero">
          <Link href="/projects" className="back-link"><span>←</span> Back to Project Categories</Link>
          <p className="section-label">Digital Craft</p>
          <h1 className="page-title">Web Projects</h1>
          <p className="pj-intro">
            Here you&apos;ll find the things I&apos;ve designed and built over the years. There are UI/UX case studies
            that walk through my research and design process, full-stack apps that people are using today, and browser
            games you can jump into and play right now.
          </p>
          {/* The portfolio's make-up: the total, then one tile per kind of work
              with a dot per project, so the split reads at a glance. Each tile
              filters the list below to that kind. */}
          <div className="pj-mix">
            <div className="pj-mix-total">
              <b>{WEB_PROJECTS.length}</b>
              <span>Projects in<br />the portfolio</span>
            </div>
            <ul className="pj-mix-kinds">
              {KINDS.map((k, i) => {
                const n = byKind[k.id].length;
                return (
                  <li key={k.id}>
                    <button type="button" className={`pj-kind px-${k.id}`} style={{ '--d': i } as CSSProperties}
                      onClick={() => jumpTo(k.id)} aria-label={`${n} ${k.label} - show them`}>
                      <span className="pj-kind-top">
                        <svg className="pj-kind-ico" viewBox="0 0 20 20" aria-hidden="true">{CAT_ICONS[k.id]}</svg>
                        <svg className="pj-kind-go" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>
                      </span>
                      <b>{n}</b>
                      <span className="pj-kind-label">{k.short}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </header>

        <h2 className="pj-section-h px-h">Spotlight</h2>
        <Spotlight />

        <div ref={resultsTop} className="px-anchor" />
        <div className={`px-bar px-${cat}${stuck ? ' stuck' : ''}`}>
          <div className="px-bar-status">
            <span ref={chipsRef} className={`px-chips${ind ? ' ready' : ''}`} role="group" aria-label="Filter projects by type"
              style={ind ? ({ '--x': `${ind.x}px`, '--w': `${ind.w}px` } as CSSProperties) : undefined}>
              <span className="px-chips-ind" aria-hidden="true" />
              {chips.map((c) => (
                <button key={c.id} type="button" aria-pressed={cat === c.id}
                  className={`px-chip-btn px-${c.id}${cat === c.id ? ' on' : ''}`} onClick={() => pickCat(c.id)}>
                  <svg className="px-ico" viewBox="0 0 20 20" aria-hidden="true">{CAT_ICONS[c.id]}</svg>{c.label}<span>{c.n}</span>
                </button>
              ))}
            </span>
          </div>
          <div className="px-tools">
            <label className={`px-search${query ? ' has' : ''}`}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
              <input ref={searchRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tools, tags…" aria-label="Search projects" aria-keyshortcuts="/" />
              <kbd aria-hidden="true">/</kbd>
              {query && (
                <button type="button" className="px-search-clear" aria-label="Clear search"
                  onClick={() => { setQuery(''); searchRef.current?.focus(); }}>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" /></svg>
                </button>
              )}
            </label>
            <div className="px-view" role="group" aria-label="Layout">
              <button type="button" title="Gallery view" aria-label="Gallery view" aria-pressed={!index} className={!index ? 'on' : ''} onClick={() => setIndex(false)}>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" /></svg>
                <span className="px-view-label">Gallery</span>
              </button>
              <button type="button" title="Index view" aria-label="Index view" aria-pressed={index} className={index ? 'on' : ''} onClick={() => setIndex(true)}>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 2h14v2H1zM1 7h14v2H1zM1 12h14v2H1z" /></svg>
                <span className="px-view-label">Index</span>
              </button>
            </div>
          </div>
        </div>
        <p className="pj-sr" aria-live="polite">{results.length} projects shown</p>

        {grouped ? (
          KINDS.map((k, n) => (
            <section key={k.id} className={`px-chapter px-${k.id}`} aria-labelledby={`px-h-${k.id}`}>
              <header className="px-chapter-head">
                <span className="px-chapter-no" aria-hidden="true">{pad(n + 1)}</span>
                <div>
                  <h2 id={`px-h-${k.id}`}>{k.label}</h2>
                  <p>{k.blurb}</p>
                </div>
                <span className="px-chapter-count">{byKind[k.id].length} projects</span>
              </header>
              <Results items={byKind[k.id]} index={index} />
            </section>
          ))
        ) : results.length ? (
          <section key={cat + query} className={`px-chapter${cat !== 'all' ? ` px-${cat}` : ''}`} aria-label="Matching projects">
            <header className="px-chapter-head px-chapter-head-sm">
              <div>
                <h2>{query ? <>Results for “{query}”</> : cat === 'all' ? 'All work' : KIND[cat].label}</h2>
                {cat !== 'all' && !query && <p>{KIND[cat].blurb}</p>}
              </div>
              <div className="px-chapter-side">
                {cat === 'design' && (
                  <span className="px-sub" role="group" aria-label="Screens">
                    <button type="button" aria-pressed={platform === 'all'} className={platform === 'all' ? 'on' : ''} onClick={() => setPlatform('all')}>
                      All screens
                    </button>
                    <button type="button" aria-pressed={platform === 'mobile'} className={platform === 'mobile' ? 'on' : ''} onClick={() => setPlatform('mobile')}>
                      With mobile
                    </button>
                  </span>
                )}
                <span className="px-chapter-count">{results.length} projects</span>
              </div>
            </header>
            <Results items={results} index={index} />
          </section>
        ) : (
          <div className="pj-empty">
            <p>No projects match {query ? <>“{query}”</> : 'this filter'}.</p>
            <button type="button" className="px-btn" onClick={reset}>Clear filters</button>
          </div>
        )}
      </main>
    </StandardShell>
  );
}
