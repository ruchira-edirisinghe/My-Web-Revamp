'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyPropBet() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Racing the <span className="tagline-name">Odds</span></>}
    >
      {/* ═══════════════════════════════
           FLOATING TABLE OF CONTENTS
      ═══════════════════════════════ */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Challenge</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Stack</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Architecture</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Game Logic</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-vibe"><span className="cs-toc-label">Build</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>
        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* ═══════════════════════════════
               HERO - Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">PropBet</h1>
            <p className="cs-hero-subtitle">Race the Odds - A Real-Time Crash Betting Game Built with Next.js &amp; Vibe Coding, Cash Out Before It Flies Away</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/propbet/cover.png" alt="PropBet - real-time crash betting game cover"
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
              <div className="cs-meta-value">Web Crash Game<br/>iGaming</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>TypeScript</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Build</div>
              <div className="cs-meta-value">Game Engine<br/>Vercel</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Approach</div>
              <div className="cs-meta-value">Vibe-Coded<br/>AI-Assisted</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              PropBet is a fully playable browser crash game - a plane takes off and climbs an ever-steepening multiplier curve that can burst at any instant. Players stake up to two bets per round and race to <em className="cs-em-cyan">cash out before it flies away</em>. It ships with 50,000 demo credits, dual bet panels, auto cash-out, and a live crash-history rail - all driven client-side by a seeded round engine, with no backend to arbitrate a single outcome. PropBet is one game inside a shared <em className="cs-em-cyan">"Game Engine"</em> platform, and it was built entirely through vibe coding.
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
            <h2 className="cs-section-title">The Build Challenge</h2>

            <p className="cs-body">
              A crash game looks like nothing more than a single number going up - but the whole experience lives in the last frame before it stops. The multiplier has to climb smoothly at 60fps on any screen, the crash point has to be decided fairly and stay hidden until the exact instant it bursts, and the cash-out has to resolve against the precise multiplier on the frame the player tapped. Two independent bets and their optional auto-cash-out targets all settle inside the same tick - and there is no server to referee any of it. On top of that, PropBet is one game mounted inside a shared game-engine shell, so its entire round loop had to be self-contained and swappable. All of it was built through vibe coding.
            </p>

            <div className="cs-highlight">
              <p>"A crash game is a single number going up - but <em>everything that matters</em> happens in the last frame before it stops."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Design Problem</h4>
                <p>Build a tense aviation "cockpit HUD" - a plane climbing a neon curve, a giant live multiplier, a colour-graded crash-history rail and two bet panels - that reads at a glance and stays playable on both desktop and a phone held in one hand.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>Technical Problem</h4>
                <p>Drive a 60fps rising-multiplier curve and plane animation from a deterministic round engine, resolve manual and auto cash-outs against the exact frame multiplier, and keep the crash point sealed until the moment the plane flies away.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>The Constraint</h4>
                <p>Describe each sub-system to an AI and iterate - the round state machine, the crash RNG, the cash-out resolver, the curve easing - which demands a precise mental model of the timing race, or the generated code silently mis-pays a round.</p>
              </div>
            </div>
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
              PropBet is a single Next.js (App Router) application in TypeScript, deployed to Vercel as one game inside a shared <strong>"Game Engine"</strong> platform - each game mounts into a common shell at its own <code className="cs-code-cyan">/games/&lt;name&gt;/play</code> route. The key architectural decision is its <strong>canvas-and-refs game loop</strong> - <code className="cs-code-cyan">Game.tsx</code> renders the canvas and both bet panels once, then a <code className="cs-code-cyan">requestAnimationFrame</code> loop drives the entire simulation from refs, so it animates at 60fps while React state updates only a few times a second - just what the panels need to show. The engine (<code className="cs-code-cyan">engine.ts</code>) seals the crash point the instant a round begins; the loop simply flies the plane toward a number it already knows.
            </p>

            <h3 className="cs-sub-heading">A Naive Crash Clone vs. How PropBet Is Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Clone</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span><code className="cs-sm">setInterval</code> ticks the multiplier → jittery curve, timer drift, dropped frames</span></li>
                    <li><div className="cs-list-bullet"></div><span>Crash checked live against React state → stale-closure cash-out bugs</span></li>
                    <li><div className="cs-list-bullet"></div><span>One bet, no auto cash-out, no history - nothing to hedge with</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The PropBet Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span><code className="cs-sm">requestAnimationFrame</code> loop with a fixed-timestep accumulator → smooth 60fps climb</span></li>
                    <li><div className="cs-list-bullet"></div><span>Crash point sealed at take-off; cash-outs resolved against the exact frame multiplier</span></li>
                    <li><div className="cs-list-bullet"></div><span>Dual bet panels + per-panel auto cash-out + a live crash-history rail</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Stack at a Glance</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">▲</div>
                <div>
                  <div className="persona-name">Framework</div>
                  <div className="persona-role">Next.js · TypeScript · Vercel</div>
                  <div className="persona-traits">
                    <span className="persona-trait">App Router</span>
                    <span className="persona-trait">Multi-Game Shell</span>
                    <span className="persona-trait">Vercel</span>
                  </div>
                  <p className="persona-quote">"PropBet is one game inside a shared Game Engine - no database, no server. The round loop runs entirely in the browser."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">✈️</div>
                <div>
                  <div className="persona-name">Game Engine</div>
                  <div className="persona-role">engine.ts · blockchainRng.ts</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Crash Distribution</span>
                    <span className="persona-trait">Blockchain Seed</span>
                    <span className="persona-trait">Provably Fair</span>
                  </div>
                  <p className="persona-quote">"The crash point is sampled once at take-off from a real blockchain block - sealed the instant a round begins, and the loop just flies the plane toward a number it already knows."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎨</div>
                <div>
                  <div className="persona-name">Presentation</div>
                  <div className="persona-role">Game.tsx · Canvas · CSS</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Canvas 60fps</span>
                    <span className="persona-trait">Parallax Sky</span>
                    <span className="persona-trait">Neon HUD</span>
                  </div>
                  <p className="persona-quote">"The plane, the curve, the clouds and the multiplier are painted every frame on a canvas - React only re-renders the panels a few times a second."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Responsibility</div>
                <div className="cs-comp-row-label">Key Challenge</div>
                <div className="cs-comp-row-label highlight">How It's Solved</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">✈️ engine.ts</div>
                <div className="cs-comp-cell" data-label="Responsibility">Pure crash math - crash distribution, multiplier growth, phase timings.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">House-edge-correct odds along an exponential curve.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved"><code className="cs-sm">P(crash ≥ x) = (1−edge)/x</code> at a 3% edge; <code className="cs-sm">m(t) = e^(0.1·t)</code>.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🕹️ Game.tsx</div>
                <div className="cs-comp-cell" data-label="Responsibility">Run the 60fps loop and paint the canvas HUD.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Keep the plane and multiplier smooth at any refresh rate - without re-rendering React every frame.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved"><code className="cs-sm">requestAnimationFrame</code> drives the whole simulation from refs; React state syncs a few times a second.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎲 blockchainRng.ts · /api/crash-seed</div>
                <div className="cs-comp-cell" data-label="Responsibility">Provably-fair seed for each round's crash point.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Verifiable randomness, fetched without a browser-console error on upstream failure.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">A real blockchain block → <code className="cs-sm">mulberry32</code> PRNG → crash point; a server route proxies the chain and falls back to <code className="cs-sm">Math.random()</code>.</div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 - ARCHITECTURE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">Architecture</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Architecture &amp; Game Loop</h2>

            <h3 className="cs-sub-heading">The Round Life-Cycle</h3>

            <p className="cs-body">
              Every round runs a small state machine: place up to two bets and set auto-cash-out targets, the plane takes off, the multiplier climbs the curve, and then it either gets cashed out or the round crashes and the plane flies away. The crucial detail is that the crash point is computed <em>once</em> at take-off. The loop never "decides" mid-flight - each frame it only checks whether the current multiplier has reached the sealed crash point, or crossed any auto-cash-out target. That separation makes the outcome fixed before the first frame plays, which keeps the render loop fully decoupled from the engine.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Bet</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🛫</div><div className="flow-label">Take Off</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📈</div><div className="flow-label">Climb</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✂️</div><div className="flow-label">Cash Out</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏆</div><div className="flow-label">Payout</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">A round's crash point has <strong className="cs-w">no fixed length</strong> - most rounds burst low (1.0x-2x), while a rare few rocket past 40x, exactly like the history rail (<strong className="cs-w">1.24x · 2.00x · 5.71x · 18.4x · 42.0x</strong>). The engine seals that number at take-off from a seeded draw, so the outcome is fixed before the plane leaves the ground - the loop only <strong className="cs-w">reveals</strong> it.</p>
            </div>

            <h3 className="cs-sub-heading">The Canvas-and-Refs Game Loop</h3>

            <p className="cs-body">
              <code className="cs-code-cyan">Game.tsx</code> renders the canvas and both bet panels once, then a <code className="cs-code-cyan">useEffect</code> starts the <code className="cs-code-cyan">requestAnimationFrame</code> loop. The entire simulation - plane, multiplier, parallax clouds, exhaust particles and the other-player bots - lives in refs, and React state is synced only a few times a second to mirror what the panels show: phase, the throttled multiplier, balance and history. So the canvas animates at 60fps without React re-rendering every frame - which also sidesteps the stale-closure bug that would mis-price a cash-out if the player tapped the button at 8.4x while React held a frame-old multiplier in state.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📁</div>
                <h4>engine.ts</h4>
                <p>Pure crash math. <code className="cs-sm">sampleCrashPoint</code> draws the bust multiplier from <code className="cs-sm">P(crash ≥ x) = (1−edge)/x</code> at a 3% house edge; <code className="cs-sm">multiplierAt</code> maps flight time to the live multiplier via <code className="cs-sm">m(t) = e^(0.1·t)</code>. Owns phase timings, bet limits and the 5,000x cap.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎮</div>
                <h4>Game.tsx</h4>
                <p>The component and the loop in one. Renders the canvas + panels once, boots the <code className="cs-sm">requestAnimationFrame</code> loop, runs the whole simulation from refs, and syncs throttled state - phase, multiplier, balance, history - to the panels.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h4>blockchainRng.ts</h4>
                <p>Provably-fair seed. Fetches a real block-derived number from <code className="cs-sm">/api/crash-seed</code>, derives a per-round seed, and feeds a <code className="cs-sm">mulberry32</code> PRNG whose first output is the uniform the crash formula consumes - with a quiet <code className="cs-sm">Math.random()</code> fallback.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔊</div>
                <h4>sounds.ts</h4>
                <p>Audio cues wired to the round phase - take-off, the climbing tone, cash-out and the crash - each mutable from the HUD's sound toggle.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               04 - GAME LOGIC + VISUAL LANGUAGE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">Game Logic</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Game Systems &amp; Visual Identity</h2>

            <p className="cs-body">
              The multiplier climbs an exponential curve - <code className="cs-code-cyan">m(t) = e^(0.1·t)</code>, so 2x lands around 6.9s and 10x around 23s. A round's crash point is drawn once at take-off from the industry-standard distribution <code className="cs-code-cyan">P(crash ≥ x) = (1−edge)/x</code> at a <strong>3% house edge</strong> - a 97% long-run RTP, with about 3% of rounds busting instantly at 1.00x and a rare few flying past 40x toward the 5,000x cap. Two independent bet panels let a player hedge: cash one out early at 2x for safety and let the second ride. The whole cycle - bet, climb, cash out or crash, payout - resolves in the browser with a 50,000-credit demo balance and no real money.
            </p>

            <code className="cs-code">
              {'// engine.ts - the crash math (deterministic + provably fair)\n'}
              {'HOUSE_EDGE     = 0.03      // 97% long-run RTP\n'}
              {'GROWTH_K       = 0.1       // m(t) = e^(k·t): 2x≈6.9s, 10x≈23s, 100x≈46s\n'}
              {'MAX_MULTIPLIER = 5000      // hard cap so a round can\'t run forever\n\n'}
              {'// crash point - sampled once at take-off from the block seed\n'}
              {'sampleCrashPoint(rand):                 // rand = mulberry32(blockSeed)\n'}
              {'  u   = max(rand(), 1e-12)\n'}
              {'  raw = (1 - HOUSE_EDGE) / u            // P(crash ≥ x) = (1-edge)/x\n'}
              {'  return clamp(floor(raw*100)/100, 1, MAX_MULTIPLIER)\n\n'}
              {'// each animation frame (Game.tsx rAF loop)\n'}
              {'m = multiplierAt(elapsedMs)            // = e^(GROWTH_K · ms/1000)\n'}
              {'if auto-cashout target hit → settle panel(bet × m)\n'}
              {'if m >= crashPoint → CRASH             // plane flies away, open bets lost'}
            </code>

            <h3 className="cs-sub-heading">The Betting System - Where Rounds Are Won</h3>

            <p className="cs-body">
              PropBet gives the player three levers, and the tension between them is the whole game. All three are resolved by the same loop that draws the curve - so a payout lands on the exact frame its condition is met.
            </p>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">💰</div>
                <div>
                  <div className="persona-name">Dual Bet Panels</div>
                  <div className="persona-role">Two Independent Stakes</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Panel A + Panel B</span>
                    <span className="persona-trait">Hedge or Double</span>
                    <span className="persona-trait">Settle Separately</span>
                  </div>
                  <p className="persona-quote">"Place two bets - cash out one at 2x for safety and let the second chase 20x. Each panel settles on its own."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">⚡</div>
                <div>
                  <div className="persona-name">Auto Cash-Out</div>
                  <div className="persona-role">Set a Target, Walk Away</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Per-Panel Target</span>
                    <span className="persona-trait">Frame-Exact</span>
                    <span className="persona-trait">Hands-Off</span>
                  </div>
                  <p className="persona-quote">"Set a target multiplier and the engine settles the moment the curve crosses it - no reflexes required."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📊</div>
                <div>
                  <div className="persona-name">Crash-History Rail</div>
                  <div className="persona-role">The Only Memory On Screen</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Last Rounds</span>
                    <span className="persona-trait">Colour-Graded</span>
                    <span className="persona-trait">Low → High</span>
                  </div>
                  <p className="persona-quote">"1.24x · 2.00x · 5.71x · 18.4x · 42.0x - the rail is the only history the game shows, and every round is independent."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Fairness &amp; the Cash-Out Race</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail" style={{ '--cs-accent': 'rgba(164, 75, 255, 0.2)', '--cs-accent-border': 'rgba(164, 75, 255, 0.4)' } as React.CSSProperties}>
                <div className="cs-compare-label"><i>🎲</i> Provably-Fair Engine</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Each round's seed is a real, public <strong>blockchain block</strong> fetched via <code className="cs-sm">/api/crash-seed</code> - not <code className="cs-sm">Math.random()</code></span></li>
                    <li><div className="cs-list-bullet"></div><span>That block seeds a <code className="cs-sm">mulberry32</code> PRNG whose first draw sets the crash point, so every round is a reproducible function of a verifiable number</span></li>
                    <li><div className="cs-list-bullet"></div><span>A 3% house edge is baked into the distribution (97% RTP), with a quiet <code className="cs-sm">Math.random()</code> fallback if the chain is down</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✂️</i> The Cash-Out Race</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Manual or auto - both resolved against the <em>exact frame multiplier</em></span></li>
                    <li><div className="cs-list-bullet"></div><span>Win = stake × multiplier at the instant you cash out; both panels settle independently</span></li>
                    <li><div className="cs-list-bullet"></div><span>Wait too long and the plane flies away - any open bet on that round is lost</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="creative-styleguide">

              {/* Typography - PhURL-style specimen */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="typo-hero">Orbitron</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-fw-500">Medium</span>
                    <span className="typo-weight-item cs-fw-700">Bold</span>
                    <span className="typo-weight-item cs-fw-800">Extra Bold</span>
                    <span className="typo-weight-item cs-fw-900">Black</span>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">PropBet's cockpit-HUD palette - deep midnight-blue instrument panels, electric sky-blue for the live curve and multiplier, altitude amber for the climb, a crash crimson for the moment the plane flies away, and cash-out green for a win.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#43E8FF' })}><span className="color-hex">#43E8FF<br/>67, 232, 255</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#9AF6FF' })}><span className="color-hex">#9AF6FF<br/>154, 246, 255</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#F4C64A' })}><span className="color-hex">#F4C64A<br/>244, 198, 74</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF2E63' })}><span className="color-hex">#FF2E63<br/>255, 46, 99</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#2EE6A6' })}><span className="color-hex">#2EE6A6<br/>46, 230, 166</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#0B1220' })}><span className="color-hex">#0B1220<br/>11, 18, 32</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The game across its key states - the branded home screen, the betting board on the airfield, a round crashing mid-air, the round result and settlement, and the how-to-play guide. Click any screen to open it full-size.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {[
                  { src: '/Images/projects/propbet/home.png', alt: 'PropBet - home screen', label: 'Home Screen' },
                  { src: '/Images/projects/propbet/board.png', alt: 'PropBet - betting board on the airfield', label: 'Betting Board' },
                  { src: '/Images/projects/propbet/crashed.png', alt: 'PropBet - round crashed mid-air', label: 'Crashed!' },
                  { src: '/Images/projects/propbet/result.png', alt: 'PropBet - round result and settlement', label: 'Round Result' },
                  { src: '/Images/projects/propbet/how-to-play.png', alt: 'PropBet - how to play guide', label: 'How to Play' },
                ].concat([
                  { src: '/Images/projects/propbet/home.png', alt: 'PropBet - home screen', label: 'Home Screen' },
                  { src: '/Images/projects/propbet/board.png', alt: 'PropBet - betting board on the airfield', label: 'Betting Board' },
                  { src: '/Images/projects/propbet/crashed.png', alt: 'PropBet - round crashed mid-air', label: 'Crashed!' },
                  { src: '/Images/projects/propbet/result.png', alt: 'PropBet - round result and settlement', label: 'Round Result' },
                  { src: '/Images/projects/propbet/how-to-play.png', alt: 'PropBet - how to play guide', label: 'How to Play' },
                ]).map((item, i) => (
                  <div key={i} className="ui-card" data-full={item.src}>
                    <img src={item.src} alt={item.alt} className="ui-thumb" loading="lazy" decoding="async"/>
                    <div className="ui-card-label">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {[
                  { src: '/Images/projects/propbet/board.png', alt: 'Airfield and dual bet panels', label: 'Airfield & Bets' },
                  { src: '/Images/projects/propbet/crashed.png', alt: 'Plane flew away', label: 'Plane Flew Away' },
                  { src: '/Images/projects/propbet/result.png', alt: 'Cash-out settlement', label: 'Cash-Out Settlement' },
                  { src: '/Images/projects/propbet/how-to-play.png', alt: 'The rules', label: 'The Rules' },
                  { src: '/Images/projects/propbet/home.png', alt: 'Race the odds', label: 'Race the Odds' },
                ].concat([
                  { src: '/Images/projects/propbet/board.png', alt: 'Airfield and dual bet panels', label: 'Airfield & Bets' },
                  { src: '/Images/projects/propbet/crashed.png', alt: 'Plane flew away', label: 'Plane Flew Away' },
                  { src: '/Images/projects/propbet/result.png', alt: 'Cash-out settlement', label: 'Cash-Out Settlement' },
                  { src: '/Images/projects/propbet/how-to-play.png', alt: 'The rules', label: 'The Rules' },
                  { src: '/Images/projects/propbet/home.png', alt: 'Race the odds', label: 'Race the Odds' },
                ]).map((item, i) => (
                  <div key={i} className="ui-card" data-full={item.src}>
                    <img src={item.src} alt={item.alt} className="ui-thumb" loading="lazy" decoding="async"/>
                    <div className="ui-card-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               05 - THE BUILD (VIBE CODING)
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 --</span>
              <span className="cs-section-num">The Build</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The Vibe-Coding Build Process</h2>

            <p className="cs-body">
              Vibe-coding a crash game works only if you own the timing model before you open a prompt. I designed the round state machine, the crash-point distribution and its house edge, the exponential curve, and the cash-out resolution rules on paper first. Only then did I start prompting - describing one sub-system at a time and verifying each against the spec before layering the next. The AI accelerated every implementation step; the spec is what kept a mis-timed cash-out from silently paying the wrong amount.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📐</div>
                <h4>1 · Design the Math</h4>
                <p>Specified the round life-cycle (bet → take-off → climb → cash out / crash → payout), the exponential curve, and the seeded crash-point distribution with its house edge - all verified on paper before a single prompt.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✈️</div>
                <h4>2 · Build the Engine</h4>
                <p>Implemented <code className="cs-sm">engine.ts</code> first - the pure crash math: the <code className="cs-sm">(1−edge)/x</code> distribution, the <code className="cs-sm">e^(0.1·t)</code> growth curve, phase timings and bet limits. Validated the RTP and payouts by hand before touching the UI.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎮</div>
                <h4>3 · The Canvas Loop</h4>
                <p>Built the <code className="cs-sm">requestAnimationFrame</code> loop inside <code className="cs-sm">Game.tsx</code>, driving the whole simulation from refs so the canvas runs at 60fps while React state syncs only a few times a second - no per-frame re-renders, no stale cash-outs.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🛩️</div>
                <h4>4 · Cockpit HUD Skin</h4>
                <p>Translated the type system, the sky-blue-to-crash-crimson palette, the climbing plane path across the parallax skies, and the neon curve into CSS and the canvas render layer.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🚀</div>
                <h4>5 · Polish &amp; Ship</h4>
                <p>Added the second bet panel, per-panel auto cash-out, the colour-graded crash-history rail, sound, a how-to-play panel and 50,000 demo credits - then mounted it into the shared Game Engine shell on Vercel.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               06 - RESULTS & REFLECTION
          ═══════════════════════════════ */}
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
                <div className="outcome-metric" data-count="60" data-suffix=" FPS">0</div>
                <div className="outcome-label">A smooth rising-multiplier loop driven by requestAnimationFrame</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Backend">0</div>
                <div className="outcome-label">A complete crash-game engine running entirely client-side on Vercel</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>"From 1.00x to the moment it flies away - a seeded crash engine, dual bets, auto cash-out and a live history rail - <em>built end-to-end through vibe coding.</em>"</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped, playable browser crash game: a 60fps canvas render loop, a blockchain-seeded provably-fair crash engine, dual bet panels, per-panel auto cash-out, a colour-graded crash-history rail, simulated participants, sound and 50,000 demo credits - all client-side, mounted in a shared Game Engine platform.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>The cash-out race is unforgiving - resolve it against a frame-old multiplier and every payout is wrong. Getting it right through vibe coding meant sealing the crash point at take-off and driving the loop with rAF instead of React state, all specced before a single prompt.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>The imperative game-loop pattern is the right architecture for a real-time game on React - no state, no reconciliation overhead. The AI produced it correctly only after I specified the pattern explicitly. Design-first vibe coding is the only vibe coding that survives a timing-critical loop.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Surface the block hash behind each round as an in-game "verify" link, persist balance and history across sessions, replace the simulated participant bots with a real multiplayer socket so bets are shared between players, and grow the shared Game Engine shell with more titles beside PropBet.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/sky-crash/play" target="_blank"
                rel="noopener" className="cs-cta-btn primary">Play the Game →</a>
              <a href="https://github.com/ruchira-edirisinghe/Game-Engine" target="_blank"
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
            <img id="cs-modal-img" alt="Case Study Preview" loading="lazy" decoding="async"/>
            <div className="cs-modal-info">
              <div id="cs-modal-counter" className="cs-modal-counter">0 / 0</div>
              <h3 id="cs-modal-title" className="cs-modal-title"></h3>
            </div>
          </div>
        </div>
      </div>

      {/* ── REDIRECT MODAL ── */}
      <div id="redirect-modal" className="redirect-modal-overlay" aria-hidden="true">
        <div className="redirect-modal-card">
          <div className="redirect-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
          <h3 id="redirect-title" className="redirect-title">Leaving the Runway</h3>
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
