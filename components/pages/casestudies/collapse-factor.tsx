'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyCollapseFactor() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Pulling the <span className="tagline-name">Bottom Course</span></>}
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
               HERO - Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Collapse<br/>Factor</h1>
            <p className="cs-hero-subtitle">Jenga as a Cash-Out Ladder - A 3D Betting Machine Drawn as an Engineering Sheet</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/collapse-factor/cover.png" alt="Collapse Factor - browser tower-pull betting game cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
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
              <div className="cs-meta-value">Web Game<br/>Cash-Out Ladder</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>three.js · TS</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Engine</div>
              <div className="cs-meta-value">WebGL<br/>WebAudio</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Fairness</div>
              <div className="cs-meta-value">Blockchain<br/>Commit-Reveal</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Collapse Factor is Jenga rebuilt as a betting machine. A tower of 48 blocks stands on a graduated test plate under one raking lamp; an automated claw pulls a block out of the lower courses every turn and sets it on top, so the tower gets taller while the part holding it up gets thinner. What makes it engineering rather than novelty is that <em className="cs-em-gold">the risk is printed on screen before you take it, and the ladder is priced from that same published curve - so every rung returns exactly 97%.</em>
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
            <h2 className="cs-section-title">The Design Problem</h2>

            <p className="cs-body">
              Every cash-out ladder has the same two holes. The first is that the player is asked to answer <em>&quot;is one more rung worth it?&quot;</em> with a number they have never been shown - so the tension is guesswork rather than judgement. The second is that the moment you cash out, the thing on screen stops being about you: the run keeps going, and its best moment belongs to nobody. This build closes both, and it has to do it while keeping a 3D tower that <em>reads</em> like a tower without ever running a rigid-body solver.
            </p>

            <div className="cs-highlight">
              <p>&quot;A picture that is more nervous than the maths is a tell. One that is calmer is a lie. <em>The wobble on screen had to be the number on the meter.</em>&quot;</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📐</div>
                <h4>Publish the Risk</h4>
                <p>The collapse factor - the chance <em>this</em> pull brings it down - is drawn on a graduated gauge before the player commits. Hiding it does not make the decision harder, it makes it arbitrary.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Price It Honestly</h4>
                <p>If the curve is public, the ladder has to be priced <em>from</em> it - otherwise a player can find the rung where the trade is best, and the game becomes a test with a correct answer.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧱</div>
                <h4>Fake the Physics</h4>
                <p>The pull it falls on is drawn from a sealed block value before the claw moves. A solver would be a solver that has to be told what to conclude - so the tower is faked, and the fake is honest.</p>
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
            <h2 className="cs-section-title">Tech Stack &amp; Architecture Rules</h2>

            <p className="cs-body">
              The game ships inside a Next.js 15 (App Router) arcade hub on React 19 and strict TypeScript. The scene is one three.js WebGL canvas; the controls are <strong>real DOM over a transparent canvas</strong>, so buttons, focus and screen readers are HTML doing what HTML is already good at. Audio is synthesized with WebAudio. There is no game server - outcomes are drawn client-side from a seed the server fetches on the player&apos;s behalf.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It&apos;s Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Build</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>A rigid-body solver told in advance what to conclude</span></li>
                    <li><div className="cs-list-bullet"></div><span>Hide the risk curve; round every price to nearest</span></li>
                    <li><div className="cs-list-bullet"></div><span>A hold clock that burns the stake if you look away</span></li>
                    <li><div className="cs-list-bullet"></div><span>React and three.js tangled through the same components</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Three <strong>height-scaled effects</strong> - sway, settle, fall - and no solver</span></li>
                    <li><div className="cs-list-bullet"></div><span>Curve published; prices <strong>truncated down</strong>, never rounded up</span></li>
                    <li><div className="cs-list-bullet"></div><span>The hold clock&apos;s default is <strong>SAFE</strong> - a lapse cashes you out</span></li>
                    <li><div className="cs-list-bullet"></div><span><code>engine/</code> never imports React; <code>components/</code> never imports three</span></li>
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
                    <span className="persona-trait">App Router</span>
                    <span className="persona-trait">Route-scoped CSS</span>
                    <span className="persona-trait">Server seed route</span>
                  </div>
                  <p className="persona-quote">&quot;One arcade hub, one path alias per game - so every game stays isolated from its neighbours.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧮</div>
                <div>
                  <div className="persona-name">The Maths</div>
                  <div className="persona-role">rules.ts · market.ts - pure</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Hazard curve</span>
                    <span className="persona-trait">Survival table</span>
                    <span className="persona-trait">check()</span>
                  </div>
                  <p className="persona-quote">&quot;Nothing here knows about three.js, React, money or animation. It is the tower and nothing else.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📄</div>
                <div>
                  <div className="persona-name">The Sheet</div>
                  <div className="persona-role">three.js · WebAudio · DOM HUD</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Zero radii</span>
                    <span className="persona-trait">Emissive ruling</span>
                    <span className="persona-trait">Room tone</span>
                  </div>
                  <p className="persona-quote">&quot;The HUD grid is ruled to the module the floor texture is - the room and the interface are one piece of paper.&quot;</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Core Systems at a Glance</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Responsibility</div>
                <div className="cs-comp-row-label">Key Challenge</div>
                <div className="cs-comp-row-label highlight">How It&apos;s Solved</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📈 The Curve</div>
                <div className="cs-comp-cell" data-label="Responsibility">Decide when the tower falls.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Rising, bounded and legible.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">A linear hazard ramp; the ceiling is derived, not typed.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💰 Two Markets</div>
                <div className="cs-comp-cell" data-label="Responsibility">Price the climb and the tumble.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">No rung better than any other.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Both priced from one survival table at RTP 0.97.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🔒 The Seal</div>
                <div className="cs-comp-cell" data-label="Responsibility">Prove the tower was not steered.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Publishing early leaks the whole run.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Committed at build, revealed the moment it falls.</div>
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
            <h2 className="cs-section-title">Architecture &amp; the Turn Loop</h2>

            <h3 className="cs-sub-heading">One Turn, Six Beats</h3>

            <p className="cs-body">
              A run is a phase machine, and the phase machine is the whole game. React owns the wallet, the tickets and the phase; it hands the 3D world one immutable <code>WorldView</code> whenever any of that changes and gets <code>Intent</code>s back. Four one-shot cues - <code>build</code>, <code>pull</code>, <code>tumble</code> and <code>cashOut</code> - are the only other door between them, which is what keeps a 3D scene and a betting interface from growing into each other.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏗️</div><div className="flow-label">Build</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Stake</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🦾</div><div className="flow-label">Pull</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">⏱️</div><div className="flow-label">Hold 8s</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🪜</div><div className="flow-label">Ride / Cash</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💥</div><div className="flow-label">Tumble</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The run is drawn <strong className="cs-w">all at once, not pull by pull</strong>. <code>drawRun</code> takes one seeded stream and draws all 29 rolls up front - interleaved with the claw&apos;s block choices - then reports the first roll that came in under its own threshold. The outcome is identical to rolling live; the <strong className="cs-w">record</strong> is not. The fairness panel can print every roll of the run beside the factor it was tested against, including the ones after the tumble, so a player recomputes the whole tower rather than the single number that ended it.</p>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📐</div>
                <h4>rules.ts</h4>
                <p>Hazard curve · Survival table · <code>drawRun</code> · derived ceiling</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>market.ts</h4>
                <p>Climb ladder · Tumble bands · <code>price()</code> · <code>check()</code></p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🦾</div>
                <h4>engine/</h4>
                <p>Tower · Claw · Camera fit · Dust · Sheet textures</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h4>blockchainRng.ts</h4>
                <p>Server seed route · mulberry32 · commit-reveal</p>
              </div>
            </div>
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

            <p className="cs-body">
              Everything in the game hangs off one function. <code>hazard(n)</code> is the collapse factor for pull <em>n</em>: it starts at 4% and climbs three and a half points a pull, reaching a certainty at pull 29. That ceiling is <strong>derived by solving the curve</strong> rather than typed as a constant, so nudging the step moves the ceiling and every table below re-derives with it.
            </p>

            <code className="cs-code"><span className="cm">{'// rules.ts - the whole game, in four constants'}</span>{'\n'}<span className="nm">hazard</span>{'(n)   = 0.04 + 0.035 * (n - 1)      '}<span className="cm">{'// 4% → 35.5% at 10 → 1.0 at 29'}</span>{'\nSURVIVAL[n] = SURVIVAL[n-1] * (1 - '}<span className="nm">hazard</span>{'(n))\nTUMBLE[n]   = SURVIVAL[n-1] * '}<span className="nm">hazard</span>{'(n)   '}<span className="cm">{'// sums to exactly 1'}</span>{'\n\n'}<span className="cm">{'// market.ts - the ladder is priced FROM that curve'}</span>{'\n'}<span className="nm">climbPays</span>{'(n) = '}<span className="nm">price</span>{'(0.97 / SURVIVAL[n])   '}<span className="cm">{'// price() truncates, never rounds up'}</span>{'\nreturn      = SURVIVAL[n] * 0.97 / SURVIVAL[n] = '}<span className="nm">0.97</span>{'   '}<span className="cm">{'// …at EVERY rung'}</span></code>

            <p className="cs-body">
              That last line is the point of the whole build. Because the paid multiplier is the fair multiplier scaled by a constant RTP, the return is that constant <em>everywhere on the ladder</em> - there is no clever place to get off, and the paytable can say so honestly. The only thing that moves it off exact is printing to two decimals, and those are truncated down rather than rounded, so the measured band is <strong className="cs-gold">96.42% - 97.00%</strong> on the climb and <strong className="cs-gold">96.66% - 96.91%</strong> on the tumble bands. A <code>check()</code> function re-derives both bands from the distribution rather than asserting them, so a retune reports the truth instead of the intention.
            </p>

            <h3 className="cs-sub-heading">Two Bets on One Tower</h3>

            <p className="cs-body">
              A ladder on its own leaves the player who cashed at pull three with nothing riding on the run that goes eleven deep. The <strong>tumble band</strong> fixes that with the same tower: a separate ticket on <em>which pull</em> brings it down, in four bands. The cuts are not equal-width - the probability mass bunches between pulls 3 and 8 - so they sit where the four prices come out legible, and none of them is a lottery square.
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Chance</div>
                <div className="cs-comp-row-label">Pays</div>
                <div className="cs-comp-row-label highlight">Return</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">1-3 · Brittle</div>
                <div className="cs-comp-cell" data-label="Chance">20.97%</div>
                <div className="cs-comp-cell" data-label="Pays">4.62×</div>
                <div className="cs-comp-cell highlight" data-label="Return">96.87%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">4-6 · Shaky</div>
                <div className="cs-comp-cell" data-label="Chance">35.54%</div>
                <div className="cs-comp-cell" data-label="Pays">2.72×</div>
                <div className="cs-comp-cell highlight" data-label="Return">96.66%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">7-9 · Sturdy</div>
                <div className="cs-comp-cell" data-label="Chance">27.64%</div>
                <div className="cs-comp-cell" data-label="Pays">3.50×</div>
                <div className="cs-comp-cell highlight" data-label="Return">96.72%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">10+ · Monolith</div>
                <div className="cs-comp-cell" data-label="Chance">15.86%</div>
                <div className="cs-comp-cell" data-label="Pays">6.11×</div>
                <div className="cs-comp-cell highlight" data-label="Return">96.91%</div>
              </div>
            </div>

            <p className="cs-body">
              The two bets genuinely pull against each other - cash out early and back <em>10+</em>, or ride the ladder and back <em>1-3</em> as insurance - which is a real decision rather than a second button. The climb itself is capped at pull 16, where the survival chance is almost exactly 1 in 500: <strong className="cs-gold">484.85×</strong>, rare enough to be worth telling somebody about and common enough that a regular player genuinely sees it. Anything higher would be a number that exists only in the paytable, because the uncapped ladder pays eight digits by pull 29.
            </p>

            <h3 className="cs-sub-heading">Faked Physics, Honestly</h3>

            <p className="cs-body">
              The tower never runs a solver, and it never could: the pull it comes down on was decided before the claw moved. What is there instead is three effects - <strong>sway</strong>, <strong>settle</strong> and <strong>fall</strong> - that all scale displacement with <strong>height</strong>, which is the one property that makes a stack read as a stack. The claw only takes from the bottom 68% of the tower, written as a <em>fraction</em> rather than a tier count because every pulled block goes back on top and a fixed ceiling would describe a smaller and smaller share of the thing it is a ceiling on. The camera solves its framing against the tower&apos;s <em>live</em> height, because the subject grows a course every three pulls and a hand-composed shot would crop the half the player is actually watching.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🎚️</div>
              <p className="cs-callout-text">One number drives the entire picture. The collapse factor sets the tower&apos;s sway amplitude, the floor ring&apos;s colour and pulse rate, the claw&apos;s status lamp, the vignette tint, the dust volume on a pull, the room tone&apos;s pitch and the gauge&apos;s arc - all through a <strong className="cs-w">single risk-ramp function</strong> that is the only place in the codebase allowed to pick a point on the ramp.</p>
            </div>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Every number in the interface is monospaced, because on a drawing a number is a measurement - and a measurement that shifts width as it counts is one you cannot read. Display type is a squared technical face; the reading text is a plain grotesque.</p>
                  <div className="typo-hero">Monospaced</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-mono">Mono · Every Measurement</span>
                    <span className="typo-weight-item cs-ff-rajdhani cs-fw-600">Squared · Display</span>
                    <span className="typo-weight-item cs-ff-mont">Grotesque · Reading</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">Three hues and no more: navy for the sheet, cyan for the apparatus, amber for caution - plus red at the end of the risk ramp and one near-white reserved for money. Border radii are <strong>0</strong> throughout; one rounded panel drags the whole thing back to being a UI with a blue background.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#020A12' })}><span className="color-hex">#020A12</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#04101C' })}><span className="color-hex">#04101C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#071A2B' })}><span className="color-hex">#071A2B</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#0B2438' })}><span className="color-hex">#0B2438</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#B8E8F5' })}><span className="color-hex">#B8E8F5</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#4FD2E8' })}><span className="color-hex">#4FD2E8</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#2E9BD4' })}><span className="color-hex">#2E9BD4</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFB020' })}><span className="color-hex">#FFB020</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF4D5E' })}><span className="color-hex">#FF4D5E</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#8FA6B8' })}><span className="color-hex">#8FA6B8</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E8D9B0' })}><span className="color-hex">#E8D9B0</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The sheet across its beats - the title plate, the tower under the lamp, the collapse-factor gauge, the cash-out window and the run record. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/collapse-factor/title-screen.png">
                  <img src="/Images/projects/collapse-factor/title-screen.png" alt="Collapse Factor title plate" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Plate</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/claw-pull.png">
                  <img src="/Images/projects/collapse-factor/claw-pull.png" alt="The claw pulling a block out of the tower" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Claw Pulls</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/betting-board.png">
                  <img src="/Images/projects/collapse-factor/betting-board.png" alt="The collapse-factor gauge above the betting board" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Gauge</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/cash-out-decision.png">
                  <img src="/Images/projects/collapse-factor/cash-out-decision.png" alt="Cash out or ride on, mid-climb" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cash Out or Ride</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/provably-fair.png">
                  <img src="/Images/projects/collapse-factor/provably-fair.png" alt="Run record and fairness panel" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Run Record</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/collapse-factor/title-screen.png">
                  <img src="/Images/projects/collapse-factor/title-screen.png" alt="Collapse Factor title plate" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Plate</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/claw-pull.png">
                  <img src="/Images/projects/collapse-factor/claw-pull.png" alt="The claw pulling a block out of the tower" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Claw Pulls</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/betting-board.png">
                  <img src="/Images/projects/collapse-factor/betting-board.png" alt="The collapse-factor gauge above the betting board" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Gauge</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/cash-out-decision.png">
                  <img src="/Images/projects/collapse-factor/cash-out-decision.png" alt="Cash out or ride on, mid-climb" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cash Out or Ride</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/provably-fair.png">
                  <img src="/Images/projects/collapse-factor/provably-fair.png" alt="Run record and fairness panel" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Run Record</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/collapse-factor/cover.png">
                  <img src="/Images/projects/collapse-factor/cover.png" alt="Collapse Factor cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/logo.png">
                  <img src="/Images/projects/collapse-factor/logo.png" alt="Collapse Factor wordmark" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Wordmark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/betting-board.png">
                  <img src="/Images/projects/collapse-factor/betting-board.png" alt="Risk ramp at full stress" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Risk Ramp</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/claw-pull.png">
                  <img src="/Images/projects/collapse-factor/claw-pull.png" alt="The claw taking a block" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Claw</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/cash-out-decision.png">
                  <img src="/Images/projects/collapse-factor/cash-out-decision.png" alt="Climb ladder strip" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Climb Ladder</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/collapse-factor/cover.png">
                  <img src="/Images/projects/collapse-factor/cover.png" alt="Collapse Factor cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/logo.png">
                  <img src="/Images/projects/collapse-factor/logo.png" alt="Collapse Factor wordmark" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Wordmark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/betting-board.png">
                  <img src="/Images/projects/collapse-factor/betting-board.png" alt="Risk ramp at full stress" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Risk Ramp</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/claw-pull.png">
                  <img src="/Images/projects/collapse-factor/claw-pull.png" alt="The claw taking a block" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Claw</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/collapse-factor/cash-out-decision.png">
                  <img src="/Images/projects/collapse-factor/cash-out-decision.png" alt="Climb ladder strip" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Climb Ladder</div>
                </div>
              </div>
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
              The build ran maths-first, which is the opposite of how a game with a tower in it wants to be built - and it is the reason the picture and the paytable agree. Nothing was modelled until the curve, the ladder and the bands were priced and self-checking; then the scene was built to <em>read out</em> those numbers rather than to invent its own idea of how close the tower was to going.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📐</div>
                <h4>1 · The Curve</h4>
                <p>Wrote <code>rules.ts</code> as pure functions with no renderer near it - hazard ramp, survival table, tumble distribution and a derived ceiling. Tuned the base and step until a run felt like a run.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>2 · The Board</h4>
                <p>Priced both markets from that one table, added <code>price()</code> to truncate downward, and wrote <code>check()</code> to re-derive the actual return rather than assert the intended one.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧱</div>
                <h4>3 · The Tower</h4>
                <p>Built the three height-scaled effects and the claw, then solved the camera against the tower&apos;s live height so a growing subject never crops. The block&apos;s 3:1 proportion is written as a product, not typed.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📄</div>
                <h4>4 · The Sheet</h4>
                <p>Ruled the HUD grid to the same module as the floor texture, baked the floor rules into an emissive map so they exist outside the lamp cone, and drove every colour off one risk-ramp function.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔒</div>
                <h4>5 · The Seal</h4>
                <p>Added the server-side seed route and the commit-reveal: one block value decides every roll of the run, held back until the tower falls, and the run cannot end without unsealing it.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">⏱️</div>
              <p className="cs-callout-text">The single most consequential product decision in the game is a default. Every other cash-out ladder rides on inaction and burns the stake if you look away; here a pull is a discrete commitment, so a hold that <strong className="cs-w">times out cashes you out</strong>. A declared <em>ride to pull N</em> plan, set before the claw starts, is what stops that becoming a tapping exercise.</p>
            </div>
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
                <div className="outcome-metric" data-count="97" data-suffix="% RTP">0</div>
                <div className="outcome-label">Identical at every rung of the ladder, by construction</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-text="484.85×">0</div>
                <div className="outcome-label">Top of the climb at pull 16 - roughly 1 tower in 500</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="2" data-suffix=" Markets">0</div>
                <div className="outcome-label">A climb and a tumble band settled by the same number</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Solver">0</div>
                <div className="outcome-label">Three height-scaled effects instead of rigid-body physics</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;The collapse factor is published, not hidden - <em>and that costs the house nothing, because the ladder is priced from the curve.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete 3D betting game: a 48-block tower, an automated claw, a published risk gauge, a 16-rung cash-out ladder to 484.85×, four tumble bands, a WebAudio room tone that tightens with the risk, and provably-fair towers sealed to a blockchain block for the whole run.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Making a tower read as a tower without a solver, and keeping every visual channel honest to the maths - a picture more nervous than the numbers is a tell, and one that is calmer is a lie.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Publishing the odds is a design feature, not a giveaway. Once the ladder is priced <em>from</em> the curve, showing the curve removes the guesswork without conceding anything - and it forces the paytable to be true rather than aspirational.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>A full commit-reveal binding - publishing a hash of the seed before the run, not just the seed after it - server-side settlement, and a shared tower where several players ride the same claw.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/collapse-factor" target="_blank"
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
