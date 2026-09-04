'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyKambaAdeema() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Eight Grips on <span className="tagline-name">One Rope</span></>}
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
            <h1 className="cs-hero-title">Kamba<br/>Adeema</h1>
            <p className="cs-hero-subtitle">කඹ ඇදීම - The Avurudu Tug of War as a One-Bet Betting Pitch, in 3D, in Front of Two Hundred People</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/kamba-adeema/cover.png" alt="Kamba Adeema - browser tug-of-war betting game cover"
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
              <div className="cs-meta-value">Web Game<br/>Cultural Sport</div>
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
              <div className="cs-meta-value">Blockchain<br/>Match-Wide Seal</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Kamba Adeema is the tug of war that closes a Sri Lankan Avurudu sports day, rebuilt as a betting pitch. Two halves of a village - <strong>Uda Pila</strong> and <strong>Yati Pila</strong> - take four a side on one rope in front of about two hundred spectators. On every heave each of the eight pullers grips or slips as an independent fair coin, and the difference settles the bet <em>and</em> drags the rope that many marks. There is exactly one bet, two buttons, and <em className="cs-em-gold">a fair price of exactly 2.00× that falls out of symmetry rather than arithmetic.</em>
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
              Traditional games do not arrive with a paytable. Turning one into a betting product means finding the single honest question the contest can be asked, pricing it from the real distribution rather than by feel, and building a 3D scene around it that a player can read without being taught. The hard part here was not the maths - it was <strong>knowing what to cut</strong>. The board started at fifteen squares, every one of them correctly priced, and none of it legible.
            </p>

            <div className="cs-highlight">
              <p>&quot;The margin is something you watch, not something you have an opinion about. <em>Nobody sitting down to a tug of war thinks &apos;three marks, either side&apos;.</em>&quot;</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🪢</div>
                <h4>One Honest Question</h4>
                <p>Who takes this heave. It resolves in about four seconds, it is what anyone watching a rope is already asking, and it is the only bet on the board.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚖️</div>
                <h4>Keep the Contest Separable</h4>
                <p>Stamina, collapse and the lime lines are what make a run of heaves a contest rather than a row of coin flips - and not one of them is allowed to touch the price.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎪</div>
                <h4>Put the Village In</h4>
                <p>An empty pitch is a physics demo. Two hundred spectators, their arms, flags and parasols had to be there - and had to cost a handful of draw calls, not a frame budget.</p>
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
              Next.js 15 (App Router), React 19, strict TypeScript, and a single three.js canvas carrying the pitch, the eight figures, the rope and the crowd. The entire interface is drawn in 3D as canvas text over the scene, with a <strong>hidden DOM mirror</strong> underneath it so every canvas control is a real focusable element with an ARIA label, sliders render as real range inputs, and commentary goes to a live region. Audio is synthesized in WebAudio over one recorded bed. The seed comes from a server-side route that is guaranteed to answer 200.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It&apos;s Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Build</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>A tired side grips less often - realistic, and it breaks the price</span></li>
                    <li><div className="cs-list-bullet"></div><span>Animate the rope, the hands and the bodies on their own clocks</span></li>
                    <li><div className="cs-list-bullet"></div><span>Play a fixed-length haul animation regardless of distance</span></li>
                    <li><div className="cs-list-bullet"></div><span>Fifteen priced squares, four chip denominations, two markets</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Stamina scales the <strong>haul</strong>; the bet settles against the <strong>swing</strong></span></li>
                    <li><div className="cs-list-bullet"></div><span>The rope owns the position and everything else reads it every frame</span></li>
                    <li><div className="cs-list-bullet"></div><span>The haul phase waits on <code>ropeBusy</code>, so a creep ≠ a collapse</span></li>
                    <li><div className="cs-list-bullet"></div><span>Two buttons, one stake plank, one price - and a draw that refunds</span></li>
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
                    <span className="persona-trait">Server seed route</span>
                    <span className="persona-trait">Route-scoped CSS</span>
                  </div>
                  <p className="persona-quote">&quot;The auth token stays server-side, and the endpoint always answers 200 - an upstream cold start never reaches the browser as an error.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧮</div>
                <div>
                  <div className="persona-name">The Maths</div>
                  <div className="persona-role">rules.ts · market.ts - pure</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Binomial(8, ½)</span>
                    <span className="persona-trait">Closed form</span>
                    <span className="persona-trait">check()</span>
                  </div>
                  <p className="persona-quote">&quot;Nine outcomes over a denominator of 256 - every one a known rational, which is what lets the bet be priced without sampling.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎪</div>
                <div>
                  <div className="persona-name">The Pitch</div>
                  <div className="persona-role">three.js · InstancedMesh · WebAudio</div>
                  <div className="persona-traits">
                    <span className="persona-trait">~200 crowd</span>
                    <span className="persona-trait">Solved hands</span>
                    <span className="persona-trait">3D HUD</span>
                  </div>
                  <p className="persona-quote">&quot;Five instanced meshes carry two hundred spectators, their arms, their flags and their parasols.&quot;</p>
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
                <div className="cs-comp-header">🪙 The Swing</div>
                <div className="cs-comp-cell" data-label="Responsibility">Eight coins, one signed number.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Must stay exactly binomial.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Vandermonde collapses the difference to Binomial(8, ½).</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💰 The One Price</div>
                <div className="cs-comp-cell" data-label="Responsibility">Pay the side that takes it.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">No shoppable side.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Draw refunds ⇒ fair is exactly 2.00× by symmetry.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🪢 The Rope</div>
                <div className="cs-comp-cell" data-label="Responsibility">Own the contest&apos;s position.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Hands must not leave the rope.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Grips solved onto the rope&apos;s live curve every frame.</div>
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
            <h2 className="cs-section-title">Architecture &amp; the Heave Loop</h2>

            <h3 className="cs-sub-heading">The Contract Between React and three.js</h3>

            <p className="cs-body">
              React owns the wallet, the bet, the match and the phase, and hands the world one immutable <code>WorldView</code> whenever any of it changes; the world hands back <code>Intent</code>s. <code>engine/</code> never imports React and <code>components/</code> never imports three - a boundary that lets a 3.5k-line scene layer and a 1.5k-line phase machine evolve without touching each other.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏘️</div><div className="flow-label">Lobby</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🪢</div><div className="flow-label">Take Rope</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Back a Side</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💪</div><div className="flow-label">Heave</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">➡️</div><div className="flow-label">Haul</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏁</div><div className="flow-label">Line</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🪢</div>
              <p className="cs-callout-text">The rope owns the position, and everything else follows it. <code>setMark</code> is the <strong className="cs-w">only</strong> way the contest moves: the eight figures read the rope&apos;s shift every frame so they travel exactly as far as it does, their hands are solved onto its live curve, and their bodies lean on its tension. Animate any of those on its own clock and hands come off the rope. The haul phase waits on <code>ropeBusy</code> rather than a duration, so a one-mark creep and a four-mark collapse are <em>different events</em> rather than the same animation played further.</p>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🪙</div>
                <h4>rules.ts</h4>
                <p>Coins · Swing · Stamina · Collapse · Marks</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>market.ts</h4>
                <p>The one price · Stake ladder · <code>check()</code></p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎪</div>
                <h4>engine/</h4>
                <p>Rope · Pullers · Instanced crowd · Camera · 3D HUD</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h4>blockchainRng.ts</h4>
                <p>Server seed route · mulberry32 · match-wide seal</p>
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

            <h3 className="cs-sub-heading">Eight Coins, One Number</h3>

            <p className="cs-body">
              Eight pullers, four a side. On every heave each of them grips or slips as an independent fair coin. The <strong>swing</strong> is Uda&apos;s grips minus Yati&apos;s - a signed number from -4 to +4 - and it settles the bet <em>and</em> drags the rope that many marks toward whoever had more. The eight booleans are handed to the 3D engine as well as to the market, so the figure that lets go on screen is the one whose coin came up false: what the player watches and what the player is paid for are the same eight bits.
            </p>

            <code className="cs-code"><span className="cm">{'// rules.ts - the swing is exactly Binomial(8, ½), shifted'}</span>{'\ngrips  = 8 draws of rng() < 0.5\nswing  = (g0+g1+g2+g3) - (g4+g5+g6+g7)      '}<span className="cm">{'// -4 … +4'}</span>{'\n\n'}<span className="cm">{"// Vandermonde's identity collapses the difference:"}</span>{'\nP(swing = s) = Σ C(4,k)·C(4,k+s) / 2⁸ = '}<span className="nm">C(8, s+4) / 256</span>{'\n\nways/256:  1   8   28   56   '}<span className="nm">70</span>{'   56   28   8   1     '}<span className="cm">{'// -4 … +4'}</span></code>

            <p className="cs-body">
              Nine outcomes over a denominator of 256, every one a known rational number - which is what lets the bet be priced in <strong>closed form</strong> rather than sampled. A <code>check()</code> function asserts four things when the interface is built: the distribution sums to 1, the two sides plus the draw partition the outcomes exactly once, the measured return sits inside tolerance, and the two sides have <em>identical</em> win chances - because a one-sided price would be a free bet on the other button.
            </p>

            <h3 className="cs-sub-heading">Why the Fair Price Is Exactly Evens</h3>

            <p className="cs-body">
              The bet resolves only on the heaves somebody wins. Four all is a draw, nobody takes it, and the stake is refunded - which is how every draw-no-bet market already works. Because the contest is symmetric, the resolving heaves split exactly in half:
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Ways</div>
                <div className="cs-comp-row-label">Chance</div>
                <div className="cs-comp-row-label highlight">You get</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Yati take it</div>
                <div className="cs-comp-cell" data-label="Ways">93 / 256</div>
                <div className="cs-comp-cell" data-label="Chance">36.328%</div>
                <div className="cs-comp-cell highlight" data-label="You get">1.92×</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Four all</div>
                <div className="cs-comp-cell" data-label="Ways">70 / 256</div>
                <div className="cs-comp-cell" data-label="Chance">27.344%</div>
                <div className="cs-comp-cell highlight" data-label="You get">Stake back</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Uda take it</div>
                <div className="cs-comp-cell" data-label="Ways">93 / 256</div>
                <div className="cs-comp-cell" data-label="Chance">36.328%</div>
                <div className="cs-comp-cell highlight" data-label="You get">1.92×</div>
              </div>
            </div>

            <p className="cs-body">
              Fair = (1 - 70/256) / (93/256) = 186/93 = <strong className="cs-gold">2.00× exactly</strong>, by symmetry rather than by arithmetic. The paid 1.92× <em>is</em> the edge, with nothing to derive: return = 1.92 × 93/256 + 1 × 70/256 = <strong className="cs-gold">97.09375%</strong>. That is the entire paytable - no table of squares to keep in tolerance, no rare outcome absorbing a harsh rounding, and nothing to shop between.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">⚠️</div>
              <p className="cs-callout-text">The one invariant the whole design rests on: <strong className="cs-w">stamina must never touch the coin.</strong> Grips burn stamina and a spent side pulled two marks or more is dragged double - but that collapse rule doubles the <em>haul</em>, and the bet is settled against the <em>swing</em>. Uda pays because Uda took the heave, whether that heave moved the rope two marks or, after a collapse, four. Make a tired side grip less often instead and the price silently drifts off its stated return with nothing to notice.</p>
            </div>

            <h3 className="cs-sub-heading">How the Board Got to Two Buttons</h3>

            <p className="cs-body">
              Three reductions, each arrived at by looking at the thing rather than reasoning about it. <strong>Fifteen squares</strong> - nine exact swings plus six combinations, priced 1.36× to 248× - were all correctly priced and none of it legible: the ±4 squares hit once in 256 and existed to be a lottery ticket, EVEN and ODD asked a player to bet on the <em>parity</em> of a tug of war, and finding the bet you wanted meant reading nine numbers. <strong>Seven cells</strong> split it into <em>who</em> and <em>by how many</em>, which was a real improvement and still one question too many. <strong>Three cells</strong> - a plain 1/X/2 - looked like the floor, and for a board it was. <strong>Two buttons</strong> came from noticing that <em>the draw is not an opinion</em>: nobody watching a rope thinks &quot;four all&quot;, it is what happens when the thing you were betting on didn&apos;t. So it stopped being a square you can lose on and became a refund.
            </p>

            <p className="cs-body">
              The chip rail went at the same time. Four denominations laid out as chips are four targets that all mean &quot;money&quot;, plus a fifth decision - which one is currently picked - before you have bet on anything. It is now one stake on a plank with a minus and a plus, which leaves the two tickets as the only places on screen where a bet happens. A second market on the whole match, priced by a few thousand playouts between heaves with a running cash-out, was <em>also</em> removed: it measured correctly at 96.95% and was exactly symmetric. It went because it was a second price to track on top of a bet that resolves every four seconds - the fast bet is the game, the slow one was homework.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Every glyph in the interface is drawn onto a canvas with <code>fillText</code>, so the fonts are self-hosted through <code>next/font</code> - a face that fails to arrive is not a slightly different page, it is the whole interface in Times New Roman. A painted display face carries the village-fair signage; numbers stay monospaced.</p>
                  <div className="typo-hero">Painted Sign</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-bungee">Display · Signage</span>
                    <span className="typo-weight-item cs-ff-mont cs-fw-600">Interface · Labels</span>
                    <span className="typo-weight-item cs-ff-mono">Mono · Marks &amp; Odds</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">A painted village-fair palette: sun-bleached gold for the signage and the carved medallion, terracotta for Uda, lime for the pitch lines and Yati, over a warm dusk base. The vignette is a squashed oval because the subject is horizontal - two teams facing across the frame.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#0D0906' })}><span className="color-hex">#0D0906</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#16100A' })}><span className="color-hex">#16100A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#201810' })}><span className="color-hex">#201810</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#2C2016' })}><span className="color-hex">#2C2016</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#F5E0B0' })}><span className="color-hex">#F5E0B0</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#E8B94A' })}><span className="color-hex">#E8B94A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#D8A63A' })}><span className="color-hex">#D8A63A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF7A3D' })}><span className="color-hex">#FF7A3D</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#8FC63D' })}><span className="color-hex">#8FC63D</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E0483C' })}><span className="color-hex">#E0483C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#7A6242' })}><span className="color-hex">#7A6242</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">Two Hundred People, Five Draw Calls</h3>

            <p className="cs-body">
              The crowd is five <code>InstancedMesh</code>es carrying about two hundred spectators, their arms, their flags and their parasols, on a terraced bank plus two corner wedges. The wedges run on a diagonal for a reason that is pure camera maths: the visible half-width of a perspective frustum is roughly 0.6 × depth, so a knot of people sitting at a constant distance from the centre line is both clear of the pitch <em>and</em> outside the frame. Placing them along the frustum instead puts them where the shot actually is.
            </p>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The pitch across its beats - the carved title medallion, the two sides taking the rope, a heave being called, the marks moving and the match ending at the line. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/home.png">
                  <img src="/Images/projects/kamba-adeema/home.png" alt="Kamba Adeema title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title · The Medallion</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/pitch.png">
                  <img src="/Images/projects/kamba-adeema/pitch.png" alt="The pitch, the rope and the crowd" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Pitch</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/heave.png">
                  <img src="/Images/projects/kamba-adeema/heave.png" alt="A heave being called" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Heave</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/odds.png">
                  <img src="/Images/projects/kamba-adeema/odds.png" alt="Two buttons and the stake plank" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Yati / Uda</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/result.png">
                  <img src="/Images/projects/kamba-adeema/result.png" alt="The ribbon crosses the line" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Past the Line</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/home.png">
                  <img src="/Images/projects/kamba-adeema/home.png" alt="Kamba Adeema title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title · The Medallion</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/pitch.png">
                  <img src="/Images/projects/kamba-adeema/pitch.png" alt="The pitch, the rope and the crowd" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Pitch</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/heave.png">
                  <img src="/Images/projects/kamba-adeema/heave.png" alt="A heave being called" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Heave</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/odds.png">
                  <img src="/Images/projects/kamba-adeema/odds.png" alt="Two buttons and the stake plank" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Yati / Uda</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/result.png">
                  <img src="/Images/projects/kamba-adeema/result.png" alt="The ribbon crosses the line" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Past the Line</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/logo.png">
                  <img src="/Images/projects/kamba-adeema/logo.png" alt="The carved Kamba Adeema medallion" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Carved Medallion</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/cover.png">
                  <img src="/Images/projects/kamba-adeema/cover.png" alt="Kamba Adeema cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/heave.png">
                  <img src="/Images/projects/kamba-adeema/heave.png" alt="Stamina meters on the rope board" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Stamina Meters</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/pitch.png">
                  <img src="/Images/projects/kamba-adeema/pitch.png" alt="The instanced crowd on the bank" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Crowd</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/odds.png">
                  <img src="/Images/projects/kamba-adeema/odds.png" alt="The odds card" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Odds Card</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/logo.png">
                  <img src="/Images/projects/kamba-adeema/logo.png" alt="The carved Kamba Adeema medallion" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Carved Medallion</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/cover.png">
                  <img src="/Images/projects/kamba-adeema/cover.png" alt="Kamba Adeema cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/heave.png">
                  <img src="/Images/projects/kamba-adeema/heave.png" alt="Stamina meters on the rope board" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Stamina Meters</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/pitch.png">
                  <img src="/Images/projects/kamba-adeema/pitch.png" alt="The instanced crowd on the bank" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Crowd</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kamba-adeema/odds.png">
                  <img src="/Images/projects/kamba-adeema/odds.png" alt="The odds card" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Odds Card</div>
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
              Roughly sixteen thousand lines across the engine, the rules and the interface - and the order they were built in is the reason the price never drifted. The distribution was settled before the pitch existed, the pitch was generated from a handful of constants rather than modelled, and the board was cut down three times after the game was already playable.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧮</div>
                <h4>1 · The Distribution</h4>
                <p>Wrote the coins, the swing and the closed-form price first, with <code>check()</code> asserting the partition and the symmetry - so the property the design rests on could not silently break later.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📐</div>
                <h4>2 · Generate the Pitch</h4>
                <p>The eight stations, the rope&apos;s length, the mark size and the lime lines all come off the same few constants, so the pitch, the rules and the figures cannot drift apart.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪢</div>
                <h4>3 · Rope-First Animation</h4>
                <p>Made the rope the single owner of position, solved the eight figures&apos; hands onto its live curve, and made the haul phase wait on the rope rather than on a stopwatch.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✂️</div>
                <h4>4 · Cut the Board</h4>
                <p>Fifteen squares → seven cells → three cells → two buttons, and a whole second market removed. Every cut was priced correctly first, which is what made it a design call rather than a shortcut.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">♿</div>
                <h4>5 · Mirror &amp; Seal</h4>
                <p>Built the hidden DOM mirror so a canvas interface is still keyboard- and screen-reader-navigable, then added the match-wide commit-reveal and the trust chip.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🔒</div>
              <p className="cs-callout-text">The seal covers a <strong className="cs-w">whole match, not a heave</strong>. One block value seeds a mean of eighteen heaves through a public, deterministic derivation - so publishing it at the start would not leak the next heave, it would leak <em>all</em> of them, and the bet on the board is a bet on exactly those coins. The value is committed when the match is drawn, held in a ref, and revealed the moment the ribbon crosses a line. Walking away mid-match forfeits the reveal: there is no longer a match for it to attest to.</p>
            </div>
          </section>

          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 --</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Verified, Not Asserted</h3>

            <p className="cs-body">
              Every claim was measured against a faithful reimplementation of the shipped engine path - the same seed derivation, the same PRNG, the same grip roll, the same haul rules - run over <strong>6,000,000 heaves</strong> (every reachable block value × 60 consecutive nonces) and <strong>500,000 complete matches</strong>. The swing reproduces Binomial(8, ½) to within 0.045 percentage points across the entire seed space; the single price measures 97.08% - 97.11% against a closed-form 97.09375%; and the contest is symmetric to 0.03 pp, with Uda winning 49.97% of matches.
            </p>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-text="97.09%">0</div>
                <div className="outcome-label">Closed-form RTP; measured 97.08-97.11% over 6M heaves</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-text="2.00×">0</div>
                <div className="outcome-label">Fair price, exact by symmetry rather than by arithmetic</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="200" data-suffix=" Spectators">0</div>
                <div className="outcome-label">Carried by five instanced meshes on a terraced bank</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="1" data-suffix=" Bet">0</div>
                <div className="outcome-label">Down from fifteen priced squares and a second market</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;There is one price, it is evens-minus-the-edge by construction, and <em>stamina is structurally prevented from touching the coin.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped 3D betting game built on a traditional Sri Lankan sport: eight solved figures on one rope, a two-hundred-strong instanced crowd, a canvas HUD with a full DOM accessibility mirror, WebAudio, and matches sealed to a blockchain block from the first heave to the line.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Keeping the contest interesting - stamina, collapse, a comeback - while structurally guaranteeing that none of it reaches the coin, and resisting the pull to add a second market that was measurably correct and made the game worse.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>The best pricing work here was deletion. Fifteen correctly-priced squares are worse than one, and a bet that resolves every four seconds does not want a slow market on top of it. Legibility is a maths property too.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>A commit-reveal that binds the operator in advance rather than only proving the seed after the fact, server-side settlement, and real village-vs-village multiplayer on one shared sealed match.</p>
              </div>
            </div>

            <div className="cs-cta-row">
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
