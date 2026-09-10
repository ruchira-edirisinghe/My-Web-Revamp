'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';
import { cardSrc } from '@/lib/cardSrc';

const IMG = '/Images/projects/whack-a-mole';

/** One screen in the gallery marquee. */
type Shot = { file: string; label: string; alt: string; w: number; h: number };

/* Game screens are captured at 2943x1612 - the browser's own chrome is cropped
   off by scripts/install-wam-captures.mjs, which is what leaves them at the same
   1.826 aspect the rest of the arcade's captures use. The lockup is square. */
const SCREEN = { w: 2943, h: 1612 };
const SQUARE = { w: 1254, h: 1254 };

/**
 * The two marquee rows.
 *
 * Written as data rather than as forty hand-written cards. The marquee needs
 * every row rendered twice for its -50% translate to loop seamlessly, and the
 * other case studies do that by duplicating the markup by hand - which is how
 * one of them ended up with a second copy whose labels had drifted out of step
 * with the first. Here the duplicate is generated, so it cannot drift.
 */
const GALLERY_ROWS: Shot[][] = [
  [
    { file: 'title-screen.webp', label: 'Title Screen', alt: 'Whack-A-Mole title screen with the lockup and the four headline chips', ...SCREEN },
    { file: 'betting-board.webp', label: 'Speed & Chip', alt: 'Stake for the next frenzy - the three speeds and the chip row', ...SCREEN },
    { file: 'frenzy.webp', label: 'The Frenzy', alt: 'Mid-frenzy - a golden mole up, the mallet and its aim ring on a hole', ...SCREEN },
    { file: 'round-result.webp', label: 'Result Card', alt: 'The result card - stake times multiplier equals what came back', ...SCREEN },
    { file: 'provably-fair.webp', label: 'Sealed Board', alt: 'The fairness panel - block, seed, reward draw and every creature published', ...SCREEN },
  ],
  [
    { file: 'logo.webp', label: 'The Lockup', alt: 'The Whack-A-Mole wordmark, gavel and golden mole lockup', ...SQUARE },
    { file: 'mole-up.webp', label: 'A Standard Mole', alt: 'A standard brown mole up in a back-row hole, eleven seconds left', ...SCREEN },
    { file: 'game-hub.webp', label: 'Info Screen', alt: "The arcade's info screen for Whack-A-Mole", ...SCREEN },
    { file: 'how-to-play.webp', label: 'How It Works', alt: 'The how-it-works card with the three-speed paytable', ...SCREEN },
    /* The last one is a repeat from row 1, and deliberately carries the SAME
       label. The lightbox de-duplicates its list on `data-full` and keeps the
       first label it saw, so a repeat filed under a new name would open showing
       the other one's caption.
       `cover.webp` is not among them on purpose: it is now the 16:9 key-art
       banner, and it is already on the page as the hero. */
    { file: 'provably-fair.webp', label: 'Sealed Board', alt: '', ...SCREEN },
  ],
];

export default function CaseStudyWhackAMole() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Fifteen Seconds, <span className="tagline-name">Nine Holes</span></>}
    >
      {/* ═══════════════════════════════
           FLOATING TABLE OF CONTENTS
      ═══════════════════════════════ */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Challenge</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Stack</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">The Price</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Game Logic</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-vibe"><span className="cs-toc-label">Build</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span
              className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>

        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* ═══════════════════════════════
               HERO - Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Whack<br/>A-Mole</h1>
            <p className="cs-hero-subtitle">Speed &amp; Bounty - The Fairground Cabinet as a Fifteen-Second Betting Round, and the Arcade&apos;s Only Priced Game of Skill</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src={`${IMG}/cover.webp`} alt="Whack-A-Mole - browser fairground whacking betting game key art"
              className="cs-cover-img" id="hero-img" width="1600" height="900" loading="eager" fetchPriority="high" decoding="async" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">Developer<br/>Game Designer</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Web Game<br/>Skill · Priced</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>three.js · TS</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Engine</div>
              <div className="cs-meta-value">WebGL · Canvas<br/>Textures · WebAudio</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Fairness</div>
              <div className="cs-meta-value">Sealed Board<br/>Drawn Price</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Whack-A-Mole is the fairground cabinet as a fifteen-second betting round. Nine holes in a lit mound at a fair after dark, one gavel, and a tempo that keeps quickening: moles pay a point, golden moles five, a bomb halves the bounty you have collected and a skull ends the round on the spot - but only if you swing at them. The interesting engineering is not the whacking, it is the pricing: <em className="cs-em-gold">every other game in this arcade is priced off a probability the player is not part of. Here their hands are in the outcome.</em>
            </p>
          </div>


          {/* ═══════════════════════════════
               01 - THE CHALLENGE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 --</span>
              <span className="cs-section-num">The Challenge</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">How Do You Price a Game of Skill?</h2>

            <p className="cs-body">
              The rest of the arcade prices itself off a number nobody can influence - the tower&apos;s collapse curve, five coins in a column of light, eight pullers gripping or slipping. Take that technique to a reaction game and it breaks, because the outcome is partly the player&apos;s hands. The first version of the pricing solved it the obvious way and the answer it produced looked perfect.
            </p>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Priced to a Reference Player</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Model an &quot;arcade regular&quot; - <strong>320ms reaction, 90% accuracy</strong>, leaves most bombs alone</span></li>
                    <li><div className="cs-list-bullet"></div><span>Solve the point value so that player returns exactly 97%</span></li>
                    <li><div className="cs-list-bullet"></div><span>Novice <strong>46.5%</strong> · regular <strong>97.0%</strong> · expert <strong>138.5%</strong></span></li>
                    <li><div className="cs-list-bullet"></div><span>A game that pays a good player 138% is not a house edge, it is a promotion</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Priced to a Perfect One</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span><code>pointValue = drawn ceiling / clearPoints</code> - a perfect clear returns the ceiling</span></li>
                    <li><div className="cs-list-bullet"></div><span>Every hand short of perfect returns <strong>less</strong>. There is nothing above it to climb to</span></li>
                    <li><div className="cs-list-bullet"></div><span>The ceiling is a <strong className="cs-w">ceiling</strong>, not an average - the only promise this game can keep</span></li>
                    <li><div className="cs-list-bullet"></div><span>RTP is published as a <strong>band</strong>, because quoting 97% beside a 51% beginner is a lie</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cs-highlight">
              <p>&quot;The calibration target is not a typical player. <em>It is a perfect one - and no level of skill beats the house because there is nothing above the ceiling to reach.</em>&quot;</p>
            </div>

            <p className="cs-body">
              Nothing about the edge was thin in the first version - it was <strong>negative</strong> for the part of the audience most likely to keep playing. Solving from a perfect clear inverts that: the return curve now runs from about 35% for a first attempt on the hardest board up to the level&apos;s own stated ceiling, and it can never cross it. The second half of the problem is that a fifteen-second round with a fixed price has exactly one random input, so a player who has played thirty of them has already seen the whole distribution - which is what section 03 is about.
            </p>
          </section>


          {/* ═══════════════════════════════
               02 - TECH STACK
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 --</span>
              <span className="cs-section-num">Tech Stack</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Tech Stack &amp; Approach</h2>

            <p className="cs-body">
              Next.js 15 (App Router), React 19, strict TypeScript and three.js. React owns the game - the wallet, the stake, the sealed board, the point total, the phase machine - and the 3D world owns the picture and answers exactly one geometry question: <em>which hole is under this pixel</em>. Nothing in <code>engine/</code> imports React and nothing in <code>components/</code> imports three; the doors between them are <code>World.setView()</code> and a handful of one-shot cues. The seed is fetched through a server route so the upstream auth token never reaches the browser bundle.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It&apos;s Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Build</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Seed the tempo too, so the round&apos;s pace is a draw as well</span></li>
                    <li><div className="cs-list-bullet"></div><span>Damp the mallet like everything else, because damping reads as weight</span></li>
                    <li><div className="cs-list-bullet"></div><span>Raycast the swing against nine invisible spheres at head height</span></li>
                    <li><div className="cs-list-bullet"></div><span>Ship image files for the grass, the soil and the fur</span></li>
                    <li><div className="cs-list-bullet"></div><span>Allocate the stars and dirt per hit and let the GC sort it out</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span><strong>Fixed tempo</strong> per level; only the creatures and the price are sealed</span></li>
                    <li><div className="cs-list-bullet"></div><span>Aim axes <strong>hard-set from the pointer</strong>, zero smoothing - everything else damped</span></li>
                    <li><div className="cs-list-bullet"></div><span><strong>One projection</strong> drives both the reticle and the hit test</span></li>
                    <li><div className="cs-list-bullet"></div><span>Every texture drawn with a 2D canvas at boot - <strong className="cs-w">not one image file</strong></span></li>
                    <li><div className="cs-list-bullet"></div><span>One pre-allocated particle pool that <strong>drops</strong> rather than grows</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">The Stack, Layer by Layer</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">▲</div>
                <div>
                  <div className="persona-name">Framework</div>
                  <div className="persona-role">Next.js 15 · React 19 · TS strict</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Server seed route</span>
                    <span className="persona-trait">Private token</span>
                    <span className="persona-trait">Lag ladder · 9s cache</span>
                  </div>
                  <p className="persona-quote">&quot;A fifteen-second round means four boards a minute. The route always answers 200, so the network is never between the player and the buzzer.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🔨</div>
                <div>
                  <div className="persona-name">The Lawn</div>
                  <div className="persona-role">three.js · one fixed camera</div>
                  <div className="persona-traits">
                    <span className="persona-trait">33° pitch, 8° tilt</span>
                    <span className="persona-trait">Canvas textures</span>
                    <span className="persona-trait">Pooled particles</span>
                  </div>
                  <p className="persona-quote">&quot;The camera never moves during a round. A dolly-in on the rush read to players as the game &lsquo;stopping registering&rsquo;.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎚️</div>
                <div>
                  <div className="persona-name">The Sound</div>
                  <div className="persona-role">WebAudio · fully synthesised</div>
                  <div className="persona-traits">
                    <span className="persona-trait">108bpm → double time</span>
                    <span className="persona-trait">90ms bonks</span>
                    <span className="persona-trait">Lazy context</span>
                  </div>
                  <p className="persona-quote">&quot;The bed is a function of the clock, so a player who has stopped watching the timer still knows the round is nearly over.&quot;</p>
                </div>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🖌️</div>
              <p className="cs-callout-text">There is <strong className="cs-w">not one image file in the game</strong>. Nine rims share one soil map, four creatures share one fur map, and the stars, puffs and glows share one sprite each - all drawn with a 2D canvas at boot and cached by key. That is not a purity exercise: it is why the whole lawn is a few tens of kilobytes of JavaScript and shows up on the first frame, in an embedded webview, on a connection that has already spent its budget on the page.</p>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 - THE PRICE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">The Price</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Three Speeds, Three Bands, and the Price Is Drawn</h2>

            <h3 className="cs-sub-heading">From Block to Bounty</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🔗</div><div className="flow-label">Block Seed</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">⚡</div><div className="flow-label">Speed + Chip</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Price Drawn</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🕳️</div><div className="flow-label">Board Sealed</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔨</div><div className="flow-label">15s Frenzy</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔓</div><div className="flow-label">Published</div></div>
            </div>

            <p className="cs-body">
              The speed is not a difficulty setting sitting in a menu - it is <strong>part of the bet</strong>, chosen beside the chip, because it changes what the round can pay as much as the stake does. Each level owns a reward band, and the round&apos;s own ceiling is drawn from that band out of the same sealed block value that decides the creatures. The bands are <em>ordered and disjoint</em>: for the same share of the board cleared, a frantic round always pays more than a brisk one and a brisk one always pays more than a steady one. No draw on a slower level can ever beat a draw on a faster one.
            </p>

            {/* Four metrics per speed, so the grid needs five columns - see the
                note on .cs-insight-comp in the stylesheet. */}
            <div className="cs-insight-comp" style={cssVars({ '--cs-metrics': 4 })}>
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Creatures</div>
                <div className="cs-comp-row-label">Window: open → close</div>
                <div className="cs-comp-row-label">Reward band</div>
                <div className="cs-comp-row-label highlight">Top payout</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Steady</div>
                <div className="cs-comp-cell" data-label="Creatures">16 · 4 in the rush</div>
                <div className="cs-comp-cell" data-label="Window: open → close">1450ms → 1153ms</div>
                <div className="cs-comp-cell" data-label="Reward band">88.00% - 91.00%</div>
                <div className="cs-comp-cell highlight" data-label="Top payout">3.92× - 4.05×</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Brisk</div>
                <div className="cs-comp-cell" data-label="Creatures">22 · 6 in the rush</div>
                <div className="cs-comp-cell" data-label="Window: open → close">1250ms → 855ms</div>
                <div className="cs-comp-cell" data-label="Reward band">91.50% - 94.00%</div>
                <div className="cs-comp-cell highlight" data-label="Top payout">4.07× - 4.18×</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Frantic</div>
                <div className="cs-comp-cell" data-label="Creatures">27 · 8 in the rush</div>
                <div className="cs-comp-cell" data-label="Window: open → close">1040ms → 648ms</div>
                <div className="cs-comp-cell" data-label="Reward band">94.50% - 97.00%</div>
                <div className="cs-comp-cell highlight" data-label="Top payout">4.21× - 4.32×</div>
              </div>
            </div>

            <p className="cs-body">
              What the faster level costs is the <em>share</em>. Its windows are shorter, so a real pair of hands converts less of the board - and because the point value is derived from the level&apos;s own clear total rather than typed in, changing a tempo constant moves the whole paytable with it. The other half of a level is the <em>gap</em> between one creature breaking the surface and the next, which narrows from 1060ms to 700ms on steady, 880ms to 420ms on brisk and <strong>740ms to 340ms on frantic</strong> - and that last figure is shorter than frantic&apos;s own closing window, so by the end of the round two creatures are up at once and the player has to choose. That is the fumble the whole game is built around, and it is why the frantic board carries half again as many creatures as the steady one in the same fifteen seconds.
            </p>

            <code className="cs-code"><span className="cm">{'// priceRound - the ceiling is drawn, the point value is derived'}</span>{'\n[lo, hi] = REWARD_BANDS[level]  '}<span className="cm">{'// frantic → [0.945, 0.97]'}</span>{'\nrtp        = '}<span className="nm">price</span>{'(lo + (hi - lo) * rewardDraw)\npointValue = '}<span className="nm">price</span>{'(rtp / CLEAR_POINTS[level])\n\n'}<span className="cm">{'// every price FLOORED, never rounded to nearest -'}</span>{'\n'}<span className="cm">{'// a value rounded up is a value the house pays more than it said'}</span></code>

            <div className="cs-callout">
              <div className="cs-callout-icon">📉</div>
              <p className="cs-callout-text">The bands carry a <strong className="cs-w">0.5pp gutter</strong> between neighbours and it is not decoration. Every price in the file is floored, and a gutter smaller than the quantisation could let a truncated figure from one band tie with one from the next. Half a point is four thousand times the four-decimal quantum, so the ordering survives every rounding anywhere downstream - including the two-decimal <code>toFixed</code> the headline multiplier is printed with. <code>check()</code> re-derives the whole paytable from the schedules, the mix and the bands and asserts three flags rather than trusting the comment: <em>capped</em>, <em>ordered</em>, <em>reachable</em>.</p>
            </div>

            <h3 className="cs-sub-heading">Why the Price Is Drawn At All</h3>

            <p className="cs-body">
              Because a fifteen-second round with a fixed tempo and a fixed price has one random input - the gold on the board - and thirty rounds is the whole distribution. Drawing the ceiling too puts a second, <em>visible</em> variable in front of the player before the countdown finishes: this board pays 96.31% at the top, the last one paid 95.02%. It is sealed, it is published, it is bounded by the level&apos;s band, and it cannot be nudged by the house between rounds - which is exactly the set of properties that makes it a feature rather than a fiddle.
            </p>

            <h3 className="cs-sub-heading">Verified: No Hand Climbs Past the Ceiling</h3>

            <p className="cs-body">
              The return for five hands on all three levels is derived in <strong>closed form, not simulated</strong> - which is only possible because both things a bad creature does to the bounty are linear in it. A bomb maps <em>B</em> to <em>B/2</em> and a skull maps it to <em>0</em>, so expectation passes straight through both and the whole round propagates as two running numbers: the expected point total, and the chance the round has not met a skull yet. A Monte-Carlo would have made the check slow, non-deterministic and - the part that matters - a <em>measurement</em> rather than a derivation.
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Steady (88-91%)</div>
                <div className="cs-comp-row-label">Brisk (91.5-94%)</div>
                <div className="cs-comp-row-label highlight">Frantic (94.5-97%)</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">First go</div>
                <div className="cs-comp-cell" data-label="Steady (88-91%)">55.0 - 56.9%</div>
                <div className="cs-comp-cell" data-label="Brisk (91.5-94%)">48.3 - 49.6%</div>
                <div className="cs-comp-cell highlight" data-label="Frantic (94.5-97%)">34.7 - 35.6%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Regular</div>
                <div className="cs-comp-cell" data-label="Steady (88-91%)">77.7 - 80.3%</div>
                <div className="cs-comp-cell" data-label="Brisk (91.5-94%)">78.5 - 80.6%</div>
                <div className="cs-comp-cell highlight" data-label="Frantic (94.5-97%)">67.6 - 69.4%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Expert</div>
                <div className="cs-comp-cell" data-label="Steady (88-91%)">85.2 - 88.1%</div>
                <div className="cs-comp-cell" data-label="Brisk (91.5-94%)">87.9 - 90.3%</div>
                <div className="cs-comp-cell highlight" data-label="Frantic (94.5-97%)">85.1 - 87.4%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Perfect clear</div>
                <div className="cs-comp-cell" data-label="Steady (88-91%)">88.0 - 91.0%</div>
                <div className="cs-comp-cell" data-label="Brisk (91.5-94%)">91.5 - 94.0%</div>
                <div className="cs-comp-cell highlight" data-label="Frantic (94.5-97%)">94.5 - 97.0%</div>
              </div>
            </div>

            <p className="cs-body">
              A casual pair of hands converts about <strong>75%</strong> of a steady board and about <strong>53%</strong> of a frantic one. That is the whole content of the difficulty choice: the ceiling rises and the odds of touching it fall, which is why frantic is not simply the correct pick. The flooring a bomb applies to a real point total is deliberately left out of the derivation, because flooring is not linear and an expectation cannot carry it - which makes the bound very slightly <em>optimistic</em>, the safe direction for a number whose whole job is to be a ceiling.
            </p>
          </section>


          {/* ═══════════════════════════════
               04 - GAME LOGIC
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">Game Logic</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Game Systems &amp; Visual Language</h2>

            <h3 className="cs-sub-heading">Four Creatures, and Two of Them Bite</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Share of the board</div>
                <div className="cs-comp-row-label">Worth</div>
                <div className="cs-comp-row-label highlight">Silhouette · value</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🐹 Mole</div>
                <div className="cs-comp-cell" data-label="Share of the board">72%</div>
                <div className="cs-comp-cell" data-label="Worth">+1 point</div>
                <div className="cs-comp-cell highlight" data-label="Silhouette · value">Smooth round lump · mid-brown</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">👑 Golden</div>
                <div className="cs-comp-cell" data-label="Share of the board">8%</div>
                <div className="cs-comp-cell" data-label="Worth">+5 points</div>
                <div className="cs-comp-cell highlight" data-label="Silhouette · value">Crown breaks the outline · bright yellow</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💣 Bomb</div>
                <div className="cs-comp-cell" data-label="Share of the board">16%</div>
                <div className="cs-comp-cell" data-label="Worth">Halves the bounty</div>
                <div className="cs-comp-cell highlight" data-label="Silhouette · value">Sphere with a hard spike · near-black</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💀 Skull</div>
                <div className="cs-comp-cell" data-label="Share of the board">4%</div>
                <div className="cs-comp-cell" data-label="Worth">Ends the round</div>
                <div className="cs-comp-cell highlight" data-label="Silhouette · value">Angular, two black voids · near-white</div>
              </div>
            </div>

            <p className="cs-body">
              The mix is not even, and each share was picked against a specific constraint. <strong>Gold is the bet</strong>: at 8% and five points each, golden moles are a third of a perfect board&apos;s value while being a twelfth of its creatures, which is what gives a fifteen-second round a real spread. Raising their share <em>flattens</em> it - more goldens means each one matters less and the distribution tightens, the opposite of what &quot;more gold&quot; sounds like it does. Bad ones sit at one in five so a player meets four or five per round and cannot treat the board as a tapping exercise, and the skull sits at 4% because at twice that, cashing out early stops being a decision and becomes the only sane move.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🎨</div>
              <p className="cs-callout-text">The four are separated on <strong className="cs-w">two channels at once</strong> - shape and value - because speed is the whole game and a player has about four hundred milliseconds to find the right one of nine. Any one of the four is identifiable from its <em>shadow alone</em>, which is the test that covers every colour deficiency at once. The models themselves are spheres and boxes; everything that makes them read as characters is in four movement rules: they overshoot and wobble down rather than lift, they conserve volume when they squash, their eyes track the mallet <em>faster than the head turns</em>, and the head is a third of total height.</p>
            </div>

            <h3 className="cs-sub-heading">The Bounty, and the Golden Rush</h3>

            <p className="cs-body">
              A point is worth a few hundredths of the stake and the meter shows it in rupees the whole way through - the meter is not a preview of the payout, it <em>is</em> the payout, because the figure ticking on it, the figure on the cash-out button and the figure added to the wallet all come out of the same function. The last <strong>four seconds are the Golden Rush</strong>: every point counts double, the sky turns gold and the music jumps a fifth and goes to double time.
            </p>

            <code className="cs-code"><span className="cm">{'// applyHit - the one function that decides what a swing is worth'}</span>{'\n'}<span className="nm">skull</span>{'  → { points: 0, busted: true }\n'}<span className="nm">bomb</span>{'   → { points: '}<span className="nm">Math.floor</span>{'(points * 0.5), halved: true }\n'}<span className="nm">mole</span>{'   → points + 1 * (rush ? 2 : 1)\n'}<span className="nm">golden</span>{' → points + 5 * (rush ? 2 : 1)\n\n'}<span className="cm">{'// FLOORED, not rounded: a bomb that rounded up would hand back'}</span>{'\n'}<span className="cm">{'// a point it had just taken - and a player counting notices'}</span></code>

            <p className="cs-body">
              Four seconds is deliberate. The rush has to be long enough to feel it arrive and change how you are playing, and short enough that it is the <em>end</em> of the round rather than a second half of it. It catches the stretch where the windows are shortest and the mistakes are likeliest - the most valuable part of the round is the part you are least in control of, which is what makes cashing out early a real decision instead of an obviously bad one. It is the same four seconds on every level, because a rush that scaled with the tempo would move the one landmark the player uses to decide whether to hold on.
            </p>

            <h3 className="cs-sub-heading">One Projection for the Aim and the Hit</h3>

            <p className="cs-body">
              This game was, for a while, unaccountably hard to land a hit in - and nothing was wrong with the hit test. The mallet slid over an invisible plane at deck level while the swing was raycast against nine invisible spheres floating at head height, stretched 1.5× tall and sorted by distance. Three consequences, all invisible to the player:
            </p>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Three Planes, Three Bugs</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>The spheres <strong>shadowed each other</strong> - a swing at the back row resolved against the middle</span></li>
                    <li><div className="cs-list-bullet"></div><span>The scoring region sat <strong>up-screen of the reticle</strong> that claimed to be the hit point</span></li>
                    <li><div className="cs-list-bullet"></div><span>A pointer past the plane&apos;s edge <strong>froze the mallet</strong>, which reads as dropped input</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> One Surface, Unbounded</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span><code>boardPoint()</code> puts the pointer on <strong>one plane</strong> in the mound&apos;s own space</span></li>
                    <li><div className="cs-list-bullet"></div><span>Both <code>aim()</code> and <code>holeAt()</code> read it - the picture cannot lie about the hit</span></li>
                    <li><div className="cs-list-bullet"></div><span>The aim axes are <strong className="cs-w">hard-set with no damping</strong>; only height, tilt, roll and recoil are smoothed</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="cs-body">
              The mallet is the one object the player is holding, so it gets a rule the rest of the scene does not: it must never be where the game thinks it should be, it must be where the pointer is, immediately. The first version damped it at a lambda that looked lovely in isolation and produced a game that felt broken - the hit registered against the pointer while the hammer was still forty milliseconds behind it, so at speed the mallet was visibly striking one hole while the score came off another.
            </p>

            <h3 className="cs-sub-heading">Keyboard Play, and It Is Not a Nicety</h3>

            <p className="cs-body">
              The entire input of this game is &quot;point at one of nine things and click&quot;, which is unplayable for anyone who cannot use a pointer - and unlike the rest of the arcade there is no way to express the move as a button, because the whole difficulty <em>is</em> the aiming. So the 3×3 grid is mapped onto two 3×3 blocks of keys that already exist on every keyboard, in the same spatial arrangement as the holes.
            </p>

            <code className="cs-code"><span className="cm">{'// KEY_HOLES - both blocks live at once'}</span>{'\nQ W E     7 8 9    '}<span className="cm">{'// back row   (holes 0 1 2)'}</span>{'\nA S D     4 5 6    '}<span className="cm">{'// middle row (holes 3 4 5)'}</span>{'\nZ X C     1 2 3    '}<span className="cm">{'// front row  (holes 6 7 8)'}</span>{'\n\n'}<span className="cm">{'// the number block is spatially true on a numpad, and QWE is'}</span>{'\n'}<span className="cm">{'// the block that works on a laptop that has no numpad'}</span></code>

            <p className="cs-body">
              The rest of the interface is DOM over a transparent canvas rather than canvas-drawn chrome: a timer, a bounty meter, a chip row and a cash-out button are all things CSS does natively and a canvas has to reimplement. Real <code>&lt;button&gt;</code> elements mean the accessibility story is not a hidden mirror that has to be kept in step with a drawing - it is just HTML, focusable and labelled. The one thing that cannot be DOM is the swing.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">A rounded, bouncy display face for the headings and the big numbers - the same shape language as creatures who are spheres with things stuck on them. Its quiet cousin reads the actual sentences, and a third, tabular face carries every figure that changes fast.</p>
                  <div className="typo-hero">Whack!</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-baloo cs-fw-800">Baloo 2 · Display</span>
                    <span className="typo-weight-item cs-ff-nunito cs-fw-600">Nunito · Sentences</span>
                    <span className="typo-weight-item cs-ff-nunito-sans cs-fw-700">Nunito Sans · Tabular</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">A lit booth in a dark fair. The scene used to be a midday sky lighting the world flatly - correct for readability and weatherless. Now a warm stage rig is aimed at the mound and everything competing with the nine holes for attention is left in the dark.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#070B1C' })}><span className="color-hex">#070B1C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#101833' })}><span className="color-hex">#101833</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#4A3A52' })}><span className="color-hex">#4A3A52</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFCF7A' })}><span className="color-hex">#FFCF7A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFE6C4' })}><span className="color-hex">#FFE6C4</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#3F7A2A' })}><span className="color-hex">#3F7A2A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#8DDC3C' })}><span className="color-hex">#8DDC3C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E8AE3C' })}><span className="color-hex">#E8AE3C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFC82F' })}><span className="color-hex">#FFC82F</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF8A1F' })}><span className="color-hex">#FF8A1F</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E2382C' })}><span className="color-hex">#E2382C</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The round across its beats - the title screen, the betting board with its three speeds priced apart, a golden mole up mid-frenzy with the mallet&apos;s aim ring on the hole, the result card, and the fairness panel with the whole sealed board printed out row by row. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {GALLERY_ROWS.map((row, r) => (
                <div
                  key={r}
                  className={`ui-marquee-track ui-track-${r === 0 ? 2 : 1}`}
                  id={`marquee-${r + 1}`}
                >
                  {/* The set is rendered twice because the marquee keyframe
                      translates the track by -50%: the second copy is what is
                      on screen while the first scrolls off, so the loop has no
                      seam. `aria-hidden` on the duplicate keeps a screen reader
                      from reading the same five screens out a second time. */}
                  {[0, 1].map((copy) =>
                    row.map((shot) => (
                      <div
                        key={`${copy}-${shot.file}-${shot.label}`}
                        className="ui-card"
                        data-full={`${IMG}/${shot.file}`}
                        /* The whole duplicate card is hidden from assistive tech,
                           not just its image. It exists to make a CSS loop seamless,
                           so a screen reader announcing a second "View Title Screen"
                           button is reporting an implementation detail. Hiding the
                           card rather than the <img decoding="async"> also keeps it out of the tab
                           order - see the aria-hidden guard in case-study.ts, which
                           is what stops a hidden card being given tabindex="0". */
                        aria-hidden={copy === 1 || undefined}
                      >
                        <img
                          src={cardSrc(`${IMG}/${shot.file}`)}
                          alt={copy === 0 ? shot.alt : ''}
                          className="ui-thumb"
                          width={shot.w}
                          height={shot.h}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="ui-card-label">{shot.label}</div>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </section>


          {/* ═══════════════════════════════
               05 - THE BUILD
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 --</span>
              <span className="cs-section-num">The Build</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">How It Was Built</h2>

            <p className="cs-body">
              Whack-A-Mole shipped first as one speed with one price and was then rebuilt around the pricing problem. The tempo took a wrong turn to find: the first version <em>seeded</em> it, which made the payout depend on how fast the round happened to run - a second random variable on top of the creatures, and one the player is not betting on and cannot see coming. Worse, it made the difficulty a lottery: the same player got a gentle board and a brutal board and read the difference as their own hands.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🕳️</div>
                <h3>1 · The Lawn</h3>
                <p>Built the nine holes flat rather than dished, tipped 8° back to meet a camera at 33°, so every hole reads as an open ellipse and no row occludes another. The angle came down from 38°, and those five degrees are what bought a band of sky.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🐹</div>
                <h3>2 · The Creatures</h3>
                <p>Four prototypes built once and cloned per hole on first use - building all thirty-six up front is four hundred objects allocated during the title screen for a board that will use twenty of them.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⏱️</div>
                <h3>3 · Fix the Tempo</h3>
                <p>Solved three schedules once at module load and took the seed out of them. The escalation became a promise rather than a draw, and the two things that vary are the two things that get sealed and published.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h3>4 · Reprice It</h3>
                <p>Threw out the reference player, solved the point value from a perfect clear, split the ceiling into three disjoint bands and made the round draw its own out of the block value.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h3>5 · One Projection</h3>
                <p>Collapsed the aim plane and the nine hit spheres into a single unbounded surface in the mound&apos;s own space, so the number the picture is drawn from is the number the hit is decided from.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h3>6 · Seal the Board</h3>
                <p>Moved the seed fetch server-side - private token, five-step lag ladder, 9s success cache, 5s negative cache, and a guaranteed 200 - then drew the price and every creature up front from one committed seed.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🎲</div>
              <p className="cs-callout-text">A block only changes every twelve seconds and a fifteen-second round means a player gets through three or four boards on one of them. Without protection those would be the same board four times over - which here is not merely suspicious, it is <strong className="cs-w">a straightforward exploit</strong>, because a player who has just seen this board knows where the goldens and the skulls are going to be. The nonce fixes it with a stride of <code>1,000,003</code>, which is strictly <em>above</em> everything the block term can reach. Collapse Factor shipped with a stride of 100,003 - a tenth of the range it was being added to - and 42% of (block, nonce) pairs landed on a seed some other pair already owned.</p>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💥</div>
              <p className="cs-callout-text">A blow landing produces three separate effects on three different clocks, and collapsing them into one duration is the mistake no amount of art recovers. <strong className="cs-w">Stars</strong> answer &quot;that connected&quot; - instant, hard-edged, gone in 400ms, and they fire before anything else because they are the feedback the player&apos;s hands are waiting on. <strong className="cs-w">Dirt</strong> answers &quot;it was in the ground&quot; - 700ms, heavy, falling, and it is what ties the hit to the lawn rather than to the HUD. <strong className="cs-w">The flying number</strong> answers &quot;and it was worth this&quot; - 900ms, the only one carrying information the player has to read, so it is the only one that gets time.</p>
            </div>

            <p className="cs-body">
              The particle pool is pre-allocated at boot and a full pool <em>drops</em> the effect rather than growing. At the close of the frenzy a good player is landing a blow every four hundred milliseconds and every blow is a dozen particles; allocating per hit means the garbage collector runs during the busiest four seconds of the game, which shows up as exactly the stutter the player will blame on their own hands. A missing star during a frenzy is invisible. A hitch is not.
            </p>
          </section>

          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 --</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-text="4.32×">0</div>
                <div className="outcome-label">The best figure any board in the game can be priced to</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="5" data-suffix=" Hands Derived">0</div>
                <div className="outcome-label">From a first attempt to a perfect clear - and none of them beats the ceiling</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="3" data-suffix=" Disjoint Bands">0</div>
                <div className="outcome-label">Ordered and gapped, so a faster speed always pays more for the same share</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Image Files">0</div>
                <div className="outcome-label">Every texture in the game is drawn with a 2D canvas at boot</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;A game that pays a good player 138% is not a game with a house edge. <em>It is a promotion - and the edge was negative for the part of the audience most likely to keep playing.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h3>📈 Outcome</h3>
                <p>A shipped 3D betting game on the most familiar cabinet there is, and the arcade&apos;s only priced game of skill: a paytable derived rather than typed, three disjoint reward bands whose ordering is asserted by a check rather than promised by a comment, a whole board sealed to a block before the first swing, a full keyboard route onto the nine holes, and not one image file.</p>
              </div>
              <div className="reflection-card">
                <h3>🧗 Challenge</h3>
                <p>Pricing an outcome the player is part of. Every technique the rest of the arcade uses assumes a probability nobody can influence, and the obvious replacement - calibrate to a typical player - produced a paytable that paid experts a bonus and beginners a penalty while reading as exactly 97%.</p>
              </div>
              <div className="reflection-card">
                <h3>💡 What I Learned</h3>
                <p>That the picture can lie about the logic and the player will blame themselves. A damped mallet, three stacked hit planes and a dolly-in on the rush were each defensible in isolation; together they produced a game people described as &quot;stopping registering&quot; near the end. None of it was in the hit test.</p>
              </div>
              <div className="reflection-card">
                <h3>🚀 Next Steps</h3>
                <p>Move settlement server-side so the seal binds a modified client too, and take the derived-then-asserted paytable pattern - <code>check()</code> re-deriving the whole table from the constants - back through the arcade&apos;s older games, where the returns are still comments.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/whack-a-mole" target="_blank"
                rel="noopener" className="cs-cta-btn primary">Play the Game →</a>
            </div>
          </section>

        </div>
      </main>

      {/* ── CASE STUDY IMAGE MODAL ── */}
      <div id="cs-modal" className="cs-modal-overlay" aria-hidden="true">
        <button id="cs-modal-zoom" className="cs-modal-btn zoom-btn" aria-label="Zoom image">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </button>
        <button id="cs-modal-close" className="cs-modal-btn" aria-label="Close modal">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <button id="cs-modal-prev" className="cs-modal-nav-btn" aria-label="Previous image">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button id="cs-modal-next" className="cs-modal-nav-btn" aria-label="Next image">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="cs-modal-container">
          <div className="cs-modal-content">
            <img id="cs-modal-img" alt="Case Study Preview" loading="lazy" decoding="async"/>
            <div className="cs-modal-info">
              <div id="cs-modal-counter" className="cs-modal-counter">0 / 0</div>
              <h3 id="cs-modal-title" className="cs-modal-title"></h3>
            </div>
          </div>
        </div>
      </div>

      {/* ── REDIRECTION MODAL ── */}
      <div id="redirect-modal" className="redirect-modal-overlay" aria-hidden="true">
        <div className="redirect-modal-card">
          <div className="redirect-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
          <h3 id="redirect-title" className="redirect-title">Exiting Habitat</h3>
          <p id="redirect-msg" className="redirect-msg">Do you wish to continue to view this project externally?</p>
          <div className="redirect-cta-row">
            <button id="redirect-cancel" className="redirect-btn ghost">Stay Here</button>
            <a id="redirect-confirm" href="#" target="_blank" rel="noopener" className="redirect-btn primary">Continue ↗</a>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
