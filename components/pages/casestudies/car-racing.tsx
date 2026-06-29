'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyCarRacing() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Warming Up the <span className="tagline-name">Grid</span></>}
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
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Architecture</span><span
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
               HERO — Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Ready To Race<br/>Unlimited</h1>
            <p className="cs-hero-subtitle">A Browser Multiplayer Car-Racing Arena — Built with Next.js &amp; Vibe Coding</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/car-game/cover.png" alt="Ready To Race Unlimited — browser car-racing game cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">Developer<br/>Vibe Coder</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Web Game<br/>Racing Arena</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>TypeScript</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Build</div>
              <div className="cs-meta-value">Turbopack<br/>Netlify</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Approach</div>
              <div className="cs-meta-value">Vibe-Coded<br/>AI-Assisted</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Ready To Race Unlimited is a fully playable, real-time car-racing arena that lives entirely in the browser — odds, betting, a 60fps race simulation and a neon e-sports skin, with no backend at all. It's also an experiment in <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>vibe coding: building a complete game by steering an AI conversationally, prompt by prompt, system by system.</em>
            </p>
          </div>


          {/* ═══════════════════════════════
               01 — THE CHALLENGE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Challenge</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The Build Challenge</h2>

            <p className="cs-body">
              A racing game looks simple until you build one. It needs a race that's <em>exciting but fair</em>, betting math that actually pays out correctly, animation that stays smooth on any machine, a grid full of opponents, sound, and persistence — and here, all of it had to run client-side with zero server. The twist: the whole thing was built through vibe coding, so the real challenge was decomposing a game into prompts an AI could implement cleanly, then reviewing and steering the output.
            </p>

            <div className="cs-highlight">
              <p>"The hard part of a betting race isn't the visuals — it's making outcomes feel <em>random and dramatic, yet provably fair and reproducible.</em>"</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Technical Problem</h4>
                <p>Simulate a believable race with live lead-changes, drive an odds-based betting economy, and animate it all at 60fps — entirely in the browser, with no backend to authoritatively run the race.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>A self-contained Next.js game: deterministic seeded races, six cars with real stats, working bets and payouts, bot opponents, audio and a polished neon e-sports UI with swappable palettes.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>The Constraint</h4>
                <p>Build it by vibe coding — describing each system to an AI and iterating — which demands a clear mental model of the architecture so the generated code stays consistent and debuggable.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               02 — TECH STACK
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 ——</span>
              <span className="cs-section-num">Tech Stack</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Tech Stack &amp; Approach</h2>

            <p className="cs-body">
              The whole game is a single Next.js (App Router) application bundled with Turbopack and deployed to Netlify. There's no database and no game server — every car, bet, race and saved stat lives in React state and the browser's localStorage. State is driven by hooks and reducers (the UI alone runs dozens of <code>useState</code> and <code>useReducer</code> stores), and the race itself is a hand-rolled simulation on <code>requestAnimationFrame</code>.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It's Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Move cars with <code>Math.random()</code> each frame — janky and unfair</span></li>
                    <li><div className="cs-list-bullet"></div><span>Tie game speed to frame rate, so fast machines race faster</span></li>
                    <li><div className="cs-list-bullet"></div><span>Hard-code one look and recompute payouts ad-hoc per bet</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>A <strong>seeded PRNG</strong> so a race is deterministic and replayable</span></li>
                    <li><div className="cs-list-bullet"></div><span>A <strong>fixed-timestep loop</strong> — identical physics at any FPS</span></li>
                    <li><div className="cs-list-bullet"></div><span>Token-driven palettes and a single odds → payout formula</span></li>
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
                  <div className="persona-role">Next.js · React · TypeScript</div>
                  <div className="persona-traits">
                    <span className="persona-trait">App Router</span>
                    <span className="persona-trait">Turbopack</span>
                    <span className="persona-trait">Netlify</span>
                  </div>
                  <p className="persona-quote">"A single client-side Next app — no server, no database. The browser is the whole game."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">⚙️</div>
                <div>
                  <div className="persona-name">Game Engine</div>
                  <div className="persona-role">rAF Simulation · Seeded RNG</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Fixed-step</span>
                    <span className="persona-trait">Deterministic</span>
                    <span className="persona-trait">60 FPS</span>
                  </div>
                  <p className="persona-quote">"A hand-written race loop — velocity from stats, jitter for drama, finish detection per tick."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎨</div>
                <div>
                  <div className="persona-name">Presentation</div>
                  <div className="persona-role">CSS Tokens · Orbitron · Audio</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Palettes</span>
                    <span className="persona-trait">WAAPI</span>
                    <span className="persona-trait">HTMLAudio</span>
                  </div>
                  <p className="persona-quote">"Swappable neon palettes via CSS custom properties, plus countdown &amp; ambient sound."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Core Systems at a Glance</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Responsibility</div>
                <div className="cs-comp-row-label">Key Challenge</div>
                <div className="cs-comp-row-label highlight">How It's Solved</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">⚙️ Race Engine</div>
                <div className="cs-comp-cell" data-label="Responsibility">Advance six cars to the finish line.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Fair, dramatic, frame-rate independent.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Seeded PRNG + fixed-timestep accumulator loop.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💰 Betting &amp; Economy</div>
                <div className="cs-comp-cell" data-label="Responsibility">Take wagers, settle winnings.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Correct odds-based payouts &amp; balances.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Single payout = stake × odds formula per car.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💾 State &amp; Persistence</div>
                <div className="cs-comp-cell" data-label="Responsibility">Track credits, stats, settings.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Survive reloads with no backend.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">React reducers mirrored into localStorage.</div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 — ARCHITECTURE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 ——</span>
              <span className="cs-section-num">Architecture</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Architecture &amp; Game Loop</h2>

            <h3 className="cs-sub-heading">The Phase State Machine</h3>

            <p className="cs-body">
              The entire game is driven by one screen-phase state machine. Each phase owns its own UI and logic, and transitions are explicit — which keeps a complex game readable and made it easy to build phase-by-phase while vibe coding.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏠</div><div className="flow-label">Home</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🛰️</div><div className="flow-label">Lobby</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Betting</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">⏱️</div><div className="flow-label">Countdown</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏎️</div><div className="flow-label">Racing</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏆</div><div className="flow-label">Finished</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The race runs on a <strong style={{ color: '#fff' }}>fixed-timestep loop</strong>: a <code>requestAnimationFrame</code> callback accumulates real elapsed time and advances the simulation in fixed <strong style={{ color: '#fff' }}>16ms steps</strong> (capped at four catch-up steps per frame). Physics is therefore identical whether the device runs at 30, 60 or 144Hz — and a pause flag simply re-queues the frame without advancing time.</p>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>Race Engine</h4>
                <p>Seeded RNG · Fixed-step loop · Finish detect</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>Betting &amp; Odds</h4>
                <p>Wagers · Payout math · Live wager feed</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>Bots &amp; Rooms</h4>
                <p>AI opponents · Public / private rooms</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔊</div>
                <h4>FX &amp; Persistence</h4>
                <p>Audio · Palettes · localStorage</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               04 — GAME LOGIC
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 ——</span>
              <span className="cs-section-num">Game Logic</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Game Systems &amp; Visual Language</h2>

            <p className="cs-body">
              Every car is a small data object — name, driver, colour, odds, recent form and two stats: <strong>speed</strong> and <strong>handling</strong>. The race converts those stats into a base velocity, then adds controlled randomness so no two runs are identical. Because the randomness flows from a single seed, the same seed always produces the same race — the basis of a fair, reproducible result.
            </p>

            <code className="cs-code"><span className="cm">// each car advances per fixed 16ms tick</span>{'\nseed     = roomSeed ?? '}<span className="nm">Math.floor</span>{'(1e4 * '}<span className="nm">Math.random</span>{'()) + 1\nbaseVel  = 0.55 * (0.6*'}<span className="nm">speed</span>{' + 0.4*'}<span className="nm">handling</span>{') / 100 + 0.1 * rng()\nstrideΔ  = (rng() - 0.5) * 0.2   '}<span className="cm">// ± jitter → lead changes</span>{'\nposition += baseVel + strideΔ    '}<span className="cm">// first past the line wins</span>{'\n\npayout   = stake * '}<span className="nm">car.odds</span>{'     '}<span className="cm">// e.g. 50cr on 4.0x → 200cr</span></code>

            <p className="cs-body">
              The six cars are tuned so odds, stats and drama line up: the favourite <strong style={{ color: 'var(--lyc-gold)' }}>Thunder Strike</strong> sits at 2.5× with high speed, while the long shot <strong style={{ color: 'var(--lyc-gold)' }}>Blue Thunder</strong> pays 12× — a bigger gamble with weaker odds. A 60% speed / 40% handling weighting decides the baseline, and the per-tick jitter is what creates the lead-changes that make a race worth watching.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">A three-font e-sports system: Orbitron for display &amp; numbers, Rajdhani for UI text, and JetBrains Mono for data, timers and stats — all loaded via Google Fonts.</p>
                  <div className="typo-hero">Orbitron</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item" style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800 }}>Orbitron · Display</span>
                    <span className="typo-weight-item" style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>Rajdhani · Interface</span>
                    <span className="typo-weight-item" style={{ fontFamily: "'JetBrains Mono',monospace" }}>JetBrains Mono · Data</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">A deep-violet base (<code>--bg-0</code> → <code>--bg-3</code>) lit by neon accents — orange, cyan and pink over a violet glow — plus a win-green. The whole skin is token-driven, so palettes (Default · Cyber · eSports) swap with one attribute.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#070012' }}><span className="color-hex">#070012</span></div>
                    <div className="color-block" style={{ background: '#0E001E' }}><span className="color-hex">#0E001E</span></div>
                    <div className="color-block" style={{ background: '#160028' }}><span className="color-hex">#160028</span></div>
                    <div className="color-block" style={{ background: '#1E0038' }}><span className="color-hex">#1E0038</span></div>
                    <div className="color-block" style={{ background: '#F5EEFF' }}><span className="color-hex">#F5EEFF</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#FF6B00' }}><span className="color-hex">#FF6B00</span></div>
                    <div className="color-block" style={{ background: '#00E5FF' }}><span className="color-hex">#00E5FF</span></div>
                    <div className="color-block" style={{ background: '#FF2E7A' }}><span className="color-hex">#FF2E7A</span></div>
                    <div className="color-block" style={{ background: '#00FF88' }}><span className="color-hex">#00FF88</span></div>
                    <div className="color-block" style={{ background: '#A050FF' }}><span className="color-hex">#A050FF</span></div>
                    <div className="color-block" style={{ background: '#FF00CC' }}><span className="color-hex">#FF00CC</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The arena across its phases — home hub, the matchmaking lobby, grid sync, the betting board and the live race. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/car-game/home.png">
                  <img src="/Images/projects/car-game/home.png" alt="Home — Elite Circuit hub" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home · Elite Circuit</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/lobby.png">
                  <img src="/Images/projects/car-game/lobby.png" alt="Lobby — Player's Arena" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Lobby · Player's Arena</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/race.png">
                  <img src="/Images/projects/car-game/race.png" alt="Betting board and race" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Betting &amp; Race</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/race-rules.png">
                  <img src="/Images/projects/car-game/race-rules.png" alt="Create Arena and rules" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Create Arena</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/loading.png">
                  <img src="/Images/projects/car-game/loading.png" alt="Syncing grid loading screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Syncing Grid</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/car-game/home.png">
                  <img src="/Images/projects/car-game/home.png" alt="Home — Elite Circuit hub" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home · Elite Circuit</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/lobby.png">
                  <img src="/Images/projects/car-game/lobby.png" alt="Lobby — Player's Arena" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Lobby · Player's Arena</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/race.png">
                  <img src="/Images/projects/car-game/race.png" alt="Betting board and race" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Betting &amp; Race</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/race-rules.png">
                  <img src="/Images/projects/car-game/race-rules.png" alt="Create Arena and rules" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Create Arena</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/loading.png">
                  <img src="/Images/projects/car-game/loading.png" alt="Syncing grid loading screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Syncing Grid</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/car-game/race.png">
                  <img src="/Images/projects/car-game/race.png" alt="Live race" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Pick Your Car</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/loading.png">
                  <img src="/Images/projects/car-game/loading.png" alt="Grid sync" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Grid Sync</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/lobby.png">
                  <img src="/Images/projects/car-game/lobby.png" alt="Runners live odds" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Grid · Live Odds</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/race-rules.png">
                  <img src="/Images/projects/car-game/race-rules.png" alt="Arena configuration" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Arena Config</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/home.png">
                  <img src="/Images/projects/car-game/home.png" alt="Leaderboard and daily bounty" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Leaderboard &amp; Bounty</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/car-game/race.png">
                  <img src="/Images/projects/car-game/race.png" alt="Live race" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Pick Your Car</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/loading.png">
                  <img src="/Images/projects/car-game/loading.png" alt="Grid sync" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Grid Sync</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/lobby.png">
                  <img src="/Images/projects/car-game/lobby.png" alt="Runners live odds" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Grid · Live Odds</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/race-rules.png">
                  <img src="/Images/projects/car-game/race-rules.png" alt="Arena configuration" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Arena Config</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/car-game/home.png">
                  <img src="/Images/projects/car-game/home.png" alt="Leaderboard and daily bounty" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Leaderboard &amp; Bounty</div>
                </div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               05 — THE BUILD (VIBE CODING)
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">The Build</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The Vibe-Coding Build Process</h2>

            <p className="cs-body">
              Vibe coding only works if you bring the architecture. I drove the build in deliberate passes — scaffolding the app, then growing one system at a time, prompting the AI for each piece, reviewing the output, and refactoring before moving on. Treating the AI like a fast pair-programmer (not a vending machine) is what kept a feature-rich game coherent.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧱</div>
                <h4>1 · Scaffold</h4>
                <p>Spun up a Next.js + TypeScript app on Turbopack, defined the screen-phase state machine, and stubbed each phase as an empty component so the skeleton was navigable first.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>2 · The Race Engine</h4>
                <p>Built the heart of the game next — the car data model, seeded PRNG, the velocity formula and the fixed-timestep <code>requestAnimationFrame</code> loop — and tuned it until races felt fair and tense.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>3 · Betting &amp; Bots</h4>
                <p>Layered the economy on top: odds, the stake × odds payout, credit balances persisted to localStorage, plus bot opponents and a live wager feed to fill the grid.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✨</div>
                <h4>4 · Juice</h4>
                <p>Added the feel — Orbitron/Rajdhani type, the token-driven neon palettes, countdown and ambient audio with volume fades, and Web-Animations transitions between phases.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🚀</div>
                <h4>5 · Ship</h4>
                <p>Wired up rooms, ranks, seasons and the daily bounty, did a polish-and-bugfix pass, and deployed the static build to Netlify as a no-backend, fully client-side game.</p>
              </div>
            </div>
          </section>

          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 ——</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="60" data-suffix=" FPS">0</div>
                <div className="outcome-label">Frame-rate-independent fixed-timestep race loop</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Backend">0</div>
                <div className="outcome-label">A complete game running fully client-side on Netlify</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"A fully playable betting race — deterministic, 60fps and backend-free — <em>built end-to-end through vibe coding.</em>"</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped, playable web game: six stat-driven cars, odds-based betting and payouts, a seeded fixed-step race engine, bots, rooms, ranks, seasons, audio and a swappable neon e-sports skin — all client-side.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Making races feel random yet fair and reproducible, keeping the simulation smooth across frame rates, and holding a large codebase coherent while generating most of it through AI prompts.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Vibe coding rewards architecture. The clearer my model of the engine, state machine and economy, the cleaner the generated code — the AI accelerates building, but the design decisions stay yours.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Add real-time multiplayer over WebSockets, server-authoritative seeds for trust, more tracks and cars, and a proper progression economy beyond local persistence.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://testing-car-game.netlify.app" target="_blank"
                rel="noopener" className="cs-cta-btn primary">Play the Game →</a>
              <a href="https://github.com/ruchira-edirisinghe/testing-car-game" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">View Source ↗</a>
            </div>
          </section>

        </div>
      </main>

      {/* ── CASE STUDY IMAGE MODAL ── */}
      <div id="cs-modal" className="cs-modal-overlay" aria-hidden="true">
        <button id="cs-modal-zoom" className="cs-modal-btn zoom-btn" aria-label="Zoom image">
          <svg viewBox="0 0 24 24">
            <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </button>
        <button id="cs-modal-close" className="cs-modal-btn" aria-label="Close modal">
          <svg viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <button id="cs-modal-prev" className="cs-modal-nav-btn" aria-label="Previous image">
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button id="cs-modal-next" className="cs-modal-nav-btn" aria-label="Next image">
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="cs-modal-container">
          <div className="cs-modal-content">
            <img id="cs-modal-img" src="" alt="Case Study Preview" loading="lazy" decoding="async"/>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
