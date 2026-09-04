'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyAetherDynasty() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Chasing the <span className="tagline-name">Dynasty</span></>}
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
            <h1 className="cs-hero-title">Aether<br/>Dynasty</h1>
            <p className="cs-hero-subtitle">46,656 Ways - A Cascading Slot Built with Next.js &amp; Vibe Coding, Wrapped in Neon Antiquity</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/aether-dynasty/cover.png" alt="Aether Dynasty - Neon Antiquity slot game cover"
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
              <div className="cs-meta-value">Web Slot Game<br/>iGaming</div>
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
              Aether Dynasty is a fully playable browser slot with a cascading expanding board - seven Greek-mythology symbols, a Golden Frame that transforms into a Wild, board growth from 4,096 to a maximum 46,656 ways, Free Games with a rising multiplier, and a maximum payout of Rs 10,000,000. The whole engine runs client-side with no backend. The aesthetic is <em className="cs-em-cyan">"Neon Antiquity"</em> - an ancient torchlit temple carved in stone, electrified by holographic scanlines and a counter-rotating astrolabe rune-ring. Built entirely through vibe coding.
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
              A cascading expanding-board slot is one of the most complex game mechanics in iGaming. Unlike a fixed-reel slot, every spin triggers a chain: winning cells are eliminated, new symbols drop, the board dynamically grows as cascades land, and the entire win evaluation re-runs after each step. Wild symbols have survival counters that must decrement correctly. Golden Frames transform into Wilds only on elimination. Free Games trigger only when the board hits its maximum size. All of this had to run synchronously, be replayed smoothly in the UI, and produce statistically fair outcomes - with no server to verify any of it. The added constraint: it was all built through vibe coding.
            </p>

            <div className="cs-highlight">
              <p>"A cascading slot isn't just <em>one game per spin</em> - it's <em>an unbounded chain of game states</em>, each depending on the one before it. You have to resolve the whole chain before showing the player anything."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏛️</div>
                <h4>Design Problem</h4>
                <p>Build a "Neon Antiquity" slot - a credible blend of an ancient Greek stone temple (Orbitron displays, Marcellus SC inscriptions, torchlit stone) with holographic neon grids and a rotating astrolabe rune-ring - that feels cohesive, not kitsch.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>Technical Problem</h4>
                <p>Implement a cascading board that expands reel-by-reel through consecutive wins, from 4,096 starting ways up to 46,656 maximum - resolving the full cascade chain in one engine pass, then replaying it step-by-step in the UI.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>The Constraint</h4>
                <p>Describe each sub-system to an AI and iterate - which demands a precise mental model of cascade order, Wild counter logic, board height tracking, and Free Game trigger conditions, or the generated code silently breaks.</p>
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
              The game is a single Next.js (App Router) application in TypeScript, bundled with Turbopack and deployed to Netlify. The key architectural decision is its <strong>imperative controller pattern</strong> - the React component renders the full game markup once on mount and never re-renders. All subsequent state changes are DOM mutations driven by <code className="cs-code-cyan">controller.ts</code>. The game engine (<code className="cs-code-cyan">engine.ts</code>) resolves the entire cascade chain synchronously and returns it as a data structure; the controller then replays it visually, step by step.
            </p>

            <h3 className="cs-sub-heading">Simple Slot vs. How Aether Dynasty Is Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Simple Slot</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Pick one random symbol per reel cell - no cascade, no board growth</span></li>
                    <li><div className="cs-list-bullet"></div><span>Fixed grid (6×4 forever) with static pay-line evaluation</span></li>
                    <li><div className="cs-list-bullet"></div><span>React state drives every frame → stale closure bugs + unnecessary re-renders</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Aether Dynasty Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Cascade engine resolves the full chain (eliminate → drop → refill → expand) in one pass</span></li>
                    <li><div className="cs-list-bullet"></div><span>Board heights tracked per-reel; ways = product of all heights (max 6⁶ = 46,656)</span></li>
                    <li><div className="cs-list-bullet"></div><span>Imperative controller mutates DOM by ID - no React state, no re-render overhead</span></li>
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
                  <div className="persona-role">Next.js · TypeScript · Turbopack</div>
                  <div className="persona-traits">
                    <span className="persona-trait">App Router</span>
                    <span className="persona-trait">Static Export</span>
                    <span className="persona-trait">Netlify</span>
                  </div>
                  <p className="persona-quote">"Single Next.js app - no database, no server. The cascade engine lives entirely in the browser."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎰</div>
                <div>
                  <div className="persona-name">Game Engine</div>
                  <div className="persona-role">engine.ts · symbols.ts · rules.ts</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Cascade Chain</span>
                    <span className="persona-trait">Ways-Pays</span>
                    <span className="persona-trait">Board Expansion</span>
                  </div>
                  <p className="persona-quote">"The full cascade chain is resolved in a single synchronous engine call and returned as a replay-able data structure."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎨</div>
                <div>
                  <div className="persona-name">Presentation</div>
                  <div className="persona-role">controller.ts · CSS Animations · SVG</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Imperative DOM</span>
                    <span className="persona-trait">PNG Symbols</span>
                    <span className="persona-trait">Runtime SVG</span>
                  </div>
                  <p className="persona-quote">"Symbol art in PNG; astrolabe rune-ring, torches and pillars generated as SVG at runtime. No sprite sheets."</p>
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
                <div className="cs-comp-header">⚙️ engine.ts</div>
                <div className="cs-comp-cell" data-label="Responsibility">Resolve full cascade chain per spin.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Correct order: eliminate → transform → decrement → gravity → refill → expand.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Single synchronous pass returns array of <code className="cs-sm">CascadeStep[]</code> for UI replay.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🕹️ controller.ts</div>
                <div className="cs-comp-cell" data-label="Responsibility">Animate cascade replay + manage UI state.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Play each cascade step at the right speed without React state.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">DOM mutation by ID; sequenced with async/await per step.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📋 rules.ts</div>
                <div className="cs-comp-cell" data-label="Responsibility">Define pay-table, Wild rules, Free Game trigger.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Ways-pays math: payout = multiplier × ways × bet.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Per-way multipliers defined per symbol; total ways computed as height product.</div>
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

            <h3 className="cs-sub-heading">The Cascade Loop</h3>

            <p className="cs-body">
              Every spin resolves in two phases. First, the engine computes the entire cascade chain synchronously - the result is an array of steps. Then the controller replays each step visually with timed delays. This separation means the outcome is always known before the first animation frame plays, which makes turbo mode trivial (skip the animation) and keeps the controller decoupled from the engine entirely.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">⚡</div><div className="flow-label">Spin</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💥</div><div className="flow-label">Eliminate</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">⬇️</div><div className="flow-label">Drop</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📐</div><div className="flow-label">Expand</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔁</div><div className="flow-label">Re-evaluate</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The cascade chain has <strong className="cs-w">no fixed length</strong> - it continues until no new winning combinations form. In the best case, the board expands every cascade and reaches 46,656 ways, triggering Free Games. The engine handles all of this in a <strong className="cs-w">single synchronous call</strong> before the first animation frame begins.</p>
            </div>

            <h3 className="cs-sub-heading">The Imperative Controller Pattern</h3>

            <p className="cs-body">
              <code className="cs-code-cyan">Game.tsx</code> renders the complete game markup once - the board cells, HUD, modals, reels. It never re-renders. On mount, <code className="cs-code-cyan">useEffect</code> calls <code className="cs-code-cyan">boot()</code> from the controller, which attaches all event listeners and begins the game loop. After that, every visual update is a direct DOM mutation by element ID. This makes it behave more like a game engine than a typical React app - and avoids the stale closure and reconciliation overhead that would come from tracking a cascading board in React state.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📁</div>
                <h4>engine.ts</h4>
                <p>Pure logic. Takes the current board + heights + bet, resolves the full cascade chain, returns <code className="cs-sm">SpinResult</code> with cascades, totalWin, finalHeights, and a Free Game trigger flag.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎮</div>
                <h4>controller.ts</h4>
                <p>Boots from <code className="cs-sm">useEffect</code> via <code className="cs-sm">boot()</code>. Calls the engine on each spin, then replays the cascade steps frame-by-frame through DOM mutations. Owns turbo, auto-spin, and sound.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪙</div>
                <h4>symbols.ts</h4>
                <p>Registers 7 symbols + Wild. Each symbol has a weight (frequency on reels) and a per-way multiplier table for 3/4/5/6 matches. PNG asset paths are listed here.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📋</div>
                <h4>rules.ts</h4>
                <p>Defines paytable values, Wild counter logic, Golden Frame columns (reels 2-5), free-game multiplier progression, Golden Treasure trigger conditions, and the Rs 10M payout cap.</p>
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
              The board starts at <strong>4 rows × 6 reels = 4,096 ways</strong>. Each cascade that produces a win expands one participating reel by one row (randomly selected from touched columns), slowly growing the board toward <strong>46,656 ways (6⁶)</strong>. Ways are always the product of active row heights across all six reels - <code className="cs-code-cyan">waysOf(heights)</code> multiplies them together. Reaching the maximum triggers Free Games.
            </p>

            <code className="cs-code">
              {'// engine.ts - cascade resolved in one pass, replayed in UI\n'}
              {'spin(board, heights, bet): SpinResult {\n'}
              {'  cascades: CascadeStep[]  // every eliminate → drop → refill step\n'}
              {'  totalWin: number         // Σ(ways × multiplier × bet) across all cascades\n'}
              {'  finalHeights: number[]   // [h0..h5] after last board expansion\n'}
              {'  maxReached: boolean      // 6^6 = 46,656 → triggers Free Games\n'}
              {'}\n\n'}
              {'// One cascade step (applyCascade)\n'}
              {'1. Eliminate winning cells                 // remove matched symbols\n'}
              {'2. Transform Golden Frame → Wild           // counter randomly set 1-3\n'}
              {'3. Decrement Wild counters                 // remove Wild if counter hits 0\n'}
              {'4. Apply gravity: survivors fall, gaps rise\n'}
              {'5. Refill from top with new symbols\n'}
              {'6. expandCols: one touched reel += 1 row   // until height === MAX_ROWS (6)'}
            </code>

            <h3 className="cs-sub-heading">Symbols - The Seven Faces of the Dynasty</h3>

            <p className="cs-body">
              Seven symbols populate the reels, weighted so the premium Greek gods appear rarely and the card suits fill frequently. All pays are <em>per-way</em> - the win multiplier is applied once for every matching combination the ways engine finds.
            </p>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">⚡</div>
                <div>
                  <div className="persona-name">ZEUS · ATHENA · APHRODITE</div>
                  <div className="persona-role">Premium Gods - Low Frequency</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Zeus: 0.50× / 6</span>
                    <span className="persona-trait">Athena: 0.32×</span>
                    <span className="persona-trait">Aphrodite: 0.24×</span>
                  </div>
                  <p className="persona-quote">"High multipliers, low weight. A Zeus cluster on a full-board cascade is the pivotal moment the game is designed around."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">♠</div>
                <div>
                  <div className="persona-name">♥ ♠ ◆ ♣</div>
                  <div className="persona-role">Card Suits - High Frequency</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Heart: 0.20×</span>
                    <span className="persona-trait">Spade: 0.16×</span>
                    <span className="persona-trait">Diamond: 0.13×</span>
                    <span className="persona-trait">Club: 0.10×</span>
                  </div>
                  <p className="persona-quote">"Common fillers that keep cascades ticking. Their frequency drives board expansion even when gods don't land."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🏆</div>
                <div>
                  <div className="persona-name">WILD - Golden Chalice</div>
                  <div className="persona-role">Survival Counter · Substitutes All</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Counter: 1-3</span>
                    <span className="persona-trait">Golden Frame → Wild</span>
                    <span className="persona-trait">Reels 2-5 only</span>
                  </div>
                  <p className="persona-quote">"Never placed randomly - only born from a Golden Frame when it's eliminated. Persists through multiple cascades if the counter stays above zero."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Special Features</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail" style={{ '--cs-accent': 'rgba(164, 75, 255, 0.2)', '--cs-accent-border': 'rgba(164, 75, 255, 0.4)' } as React.CSSProperties}>
                <div className="cs-compare-label"><i>🌟</i> Free Games</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Triggered when the board hits <strong>46,656 ways</strong> (all reels at max height)</span></li>
                    <li><div className="cs-list-bullet"></div><span>6 starting games; each elimination that creates a Wild can grant +1 extra (up to 24 total)</span></li>
                    <li><div className="cs-list-bullet"></div><span>Rising multiplier - increments every winning spin, capped at 3×</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✨</i> Golden Treasure</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Triggers when the board hits 46,656 ways <em>inside</em> a Free Games session</span></li>
                    <li><div className="cs-list-bullet"></div><span>Randomly picks one symbol type, converts the entire board to it, and resolves continuously</span></li>
                    <li><div className="cs-list-bullet"></div><span>Maximum payout: <strong>Rs 10,000,000</strong> - the absolute hard cap</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="creative-styleguide">

              {/* Typography - PhURL-style specimen */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="typo-hero">Spectral</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-fw-300">Light</span>
                    <span className="typo-weight-item cs-fw-400">Regular</span>
                    <span className="typo-weight-item cs-fw-400 cs-italic">Italic</span>
                    <span className="typo-weight-item cs-fw-500">Medium</span>
                    <span className="typo-weight-item cs-fw-600">Semi Bold</span>
                    <span className="typo-weight-item cs-fw-700">Bold</span>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Colour - Neon Antiquity Palette</div>
                  <p className="sg-unit-desc">Deep warm blacks from ancient stone, ink-parchment for text, neon cyan for the holographic layer, gold for divine symbols, and plasma purple for the mystical atmosphere. The tension between stone warmth and neon cold defines the aesthetic.</p>
                  <div className="color-strip cs-mt-20">
                    <div className="color-block" style={cssVars({ '--sw': '#0c0608' })}><span className="color-hex">bg-0</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#1b0f16' })}><span className="color-hex">bg-1</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#241b12' })}><span className="color-hex">stone-d</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#3a2f22' })}><span className="color-hex">stone-2</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#5a4a36' })}><span className="color-hex">stone-1</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#f3e7cf' })}><span className="color-hex">ink</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#43e8ff' })}><span className="color-hex">neon</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#9af6ff' })}><span className="color-hex">neon-2</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#f4c64a' })}><span className="color-hex">gold-2</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#b9821f' })}><span className="color-hex">gold-3</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#a64bff' })}><span className="color-hex">plasma</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#ff8a1e' })}><span className="color-hex">orange</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The game across its key states - main board, the board expanding through a cascade, a win result, auto-spin and sound configuration, and the transaction history. Click any screen to open it full-size.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {[
                  { src: '/Images/projects/aether-dynasty/main-game-board.png', alt: 'Aether Dynasty - main game board', label: 'Main Game Board' },
                  { src: '/Images/projects/aether-dynasty/cascade-in-progress.png', alt: 'Aether Dynasty - cascade in progress', label: 'Cascade in Progress' },
                  { src: '/Images/projects/aether-dynasty/win-payout.png', alt: 'Aether Dynasty - win payout', label: 'Win Payout' },
                  { src: '/Images/projects/aether-dynasty/auto-spin-config.png', alt: 'Aether Dynasty - auto-spin config', label: 'Auto-Spin Config' },
                  { src: '/Images/projects/aether-dynasty/transaction-history.png', alt: 'Aether Dynasty - transaction history', label: 'Transaction History' },
                ].concat([
                  { src: '/Images/projects/aether-dynasty/main-game-board.png', alt: 'Aether Dynasty - main game board', label: 'Main Game Board' },
                  { src: '/Images/projects/aether-dynasty/cascade-in-progress.png', alt: 'Aether Dynasty - cascade in progress', label: 'Cascade in Progress' },
                  { src: '/Images/projects/aether-dynasty/win-payout.png', alt: 'Aether Dynasty - win payout', label: 'Win Payout' },
                  { src: '/Images/projects/aether-dynasty/auto-spin-config.png', alt: 'Aether Dynasty - auto-spin config', label: 'Auto-Spin Config' },
                  { src: '/Images/projects/aether-dynasty/transaction-history.png', alt: 'Aether Dynasty - transaction history', label: 'Transaction History' },
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
                  { src: '/Images/projects/aether-dynasty/transaction-history.png', alt: 'Bet history log', label: 'Bet History' },
                  { src: '/Images/projects/aether-dynasty/win-payout.png', alt: 'Win celebration overlay', label: 'Win Overlay' },
                  { src: '/Images/projects/aether-dynasty/auto-spin-config.png', alt: 'Auto-spin running', label: 'Auto-Spin Running' },
                  { src: '/Images/projects/aether-dynasty/cascade-in-progress.png', alt: 'Board expanding', label: 'Board Expanding' },
                  { src: '/Images/projects/aether-dynasty/main-game-board.png', alt: 'Sound and settings panel', label: 'Sound Controls' },
                ].concat([
                  { src: '/Images/projects/aether-dynasty/transaction-history.png', alt: 'Bet history log', label: 'Bet History' },
                  { src: '/Images/projects/aether-dynasty/win-payout.png', alt: 'Win celebration overlay', label: 'Win Overlay' },
                  { src: '/Images/projects/aether-dynasty/auto-spin-config.png', alt: 'Auto-spin running', label: 'Auto-Spin Running' },
                  { src: '/Images/projects/aether-dynasty/cascade-in-progress.png', alt: 'Board expanding', label: 'Board Expanding' },
                  { src: '/Images/projects/aether-dynasty/main-game-board.png', alt: 'Sound and settings panel', label: 'Sound Controls' },
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
              Vibe-coding a cascading slot works only if you own the game logic before you open a prompt. I designed the cascade sequence, board expansion rules, symbol weights, per-way multipliers, and Free Game trigger conditions entirely on paper first. Only then did I start prompting - describing one sub-system at a time and verifying each against the spec before layering the next. The AI accelerated every implementation step; the spec made the output trustworthy.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📐</div>
                <h4>1 · Design the Math</h4>
                <p>Specified the cascade sequence (eliminate → transform → decrement → gravity → refill → expand), symbol weights and per-way multipliers, board height rules, and Free Game trigger condition - all verified on paper before a single prompt.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>2 · Build the Engine</h4>
                <p>Implemented <code className="cs-sm">engine.ts</code> first - the pure cascade resolver that takes a board state and returns the complete chain as <code className="cs-sm">CascadeStep[]</code>. Validated payouts manually against known board states before moving on.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎮</div>
                <h4>3 · Imperative Controller</h4>
                <p>Built <code className="cs-sm">controller.ts</code> as the only piece that touches the DOM. The <code className="cs-sm">boot()</code> pattern keeps React out of the game loop entirely - no state, no re-renders, no stale closures mid-cascade.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏛️</div>
                <h4>4 · Neon Antiquity Skin</h4>
                <p>Translated the three-font system (Orbitron / Marcellus SC / Spectral), the stone-and-neon colour palette, the astrolabe rune-ring SVG, and the torch/pillar decorative layer into the CSS and runtime SVG generation layer.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🚀</div>
                <h4>5 · Polish &amp; Ship</h4>
                <p>Added turbo spin (skips animation, shows result instantly), configurable auto-spin, two-channel audio (Music / Effects with individual sliders), transaction history modal, and deployed the static export to Netlify.</p>
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
                <div className="outcome-metric" data-count="46656" data-suffix=" Ways">0</div>
                <div className="outcome-label">Maximum board ways - cascading from 4,096 through board expansion</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Backend">0</div>
                <div className="outcome-label">A complete iGaming slot engine running entirely client-side on Netlify</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>"From 4,096 to 46,656 ways through cascades - seven symbols, a Golden Chalice Wild, Free Games, Golden Treasure, and a Rs 10M payout ceiling - <em>built end-to-end through vibe coding.</em>"</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped, playable browser slot: cascading board expansion (4,096 → 46,656 ways), 7 weighted symbols, Golden Frame → Wild transformation, survival-counter Wilds, Free Games with rising multiplier, Golden Treasure feature, configurable auto-spin, and two-channel audio - all client-side.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Cascade logic has a strict ordering constraint - get eliminate/transform/decrement/gravity/refill/expand wrong and wins are miscounted or Wilds vanish too early. Getting this right through vibe coding required writing the spec before writing a single prompt.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>The imperative controller pattern is the right architecture for a complex game on React - no state, no reconciliation overhead. The AI generated it correctly only after I specified the pattern explicitly. Design-first vibe coding is the only vibe coding that works at this complexity level.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Add a provably-fair seed system so players can verify spin outcomes, implement a progressive jackpot tier above the Golden Treasure feature, and build a leaderboard backed by a lightweight serverless function.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/matching-game" target="_blank"
                rel="noopener" className="cs-cta-btn primary">Play the Game →</a>
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
