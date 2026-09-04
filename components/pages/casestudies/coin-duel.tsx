'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyCoinDuel() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Five Coins in the <span className="tagline-name">Light Column</span></>}
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
            <h1 className="cs-hero-title">Coin<br/>Duel</h1>
            <p className="cs-hero-subtitle">Five Coins, One Face Wins - A Neon 3D Betting Pit Where the Price Moves and the Maths Does Not</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/coin-duel/cover.png" alt="Coin Duel - browser coin-toss duelling game cover"
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
              <div className="cs-meta-value">Web Game<br/>Coin-Toss Duel</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>three.js · TS</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Engine</div>
              <div className="cs-meta-value">WebGL + Bloom<br/>WebAudio</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Fairness</div>
              <div className="cs-meta-value">Blockchain<br/>Commit-Reveal</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Coin Duel is the simplest bet in the arcade wrapped in the most elaborate scene. A slot in the floor of a neon pit mints <strong>five coins</strong> and fires them into a column of light; each carries a <strong>SUN</strong> on one face and a <strong>MOON</strong> on the other. Back the face that lands on more of them. Five is odd, so <em className="cs-em-gold">a tie is impossible and every stake resolves - and the price on each button is re-drawn every round from a six-rung ladder that averages to an exact 97% return.</em>
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
              A coin flip is the easiest bet in the world to price and the hardest one to make worth watching. If the whole game is <em>heads or tails</em> there is nothing to look at, nothing to read, and no reason to come back for a second round. The brief was to keep the bet exactly that simple - one question, two buttons, no tie - while giving the thing on screen shape, momentum and a shot at a comeback, <strong>without letting any of that touch the coin.</strong>
            </p>

            <div className="cs-highlight">
              <p>&quot;The coins decide who. The world state decides how far. <em>The moment the second one leans on the first, the price on the board silently stops being true.</em>&quot;</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>One Question</h4>
                <p>Two buttons and nothing else. Every extra square - a margin bet, a lottery ticket on the 5-0 - was priced correctly and thrown out for being illegible next to the real bet.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚔️</div>
                <h4>Something To Watch</h4>
                <p>Five coins, when three would settle it. The other four decide how hard the hit lands - so the same toss is both a bet that resolves in four seconds and a fight with a scoreline.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📈</div>
                <h4>A Price That Moves</h4>
                <p>A fixed price on a symmetric bet is a board nobody reads twice. Re-drawing it every round gives the player something to spot - which only works if the ladder cannot ever go positive.</p>
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
              Next.js 15 (App Router), React 19 and strict TypeScript, with the entire arena on one three.js canvas running an UnrealBloom pass and a custom vignette shader. Effects are synthesized in WebAudio; the music bed is the one recorded track in the game, streamed from an <code>&lt;audio&gt;</code> element and not fetched until music is first wanted. Everything visual - coin faces, hex shields, floor inlay, the LED ribbon board - is <strong>procedural</strong>: canvas textures and shader materials, no external art beyond the fonts and the struck badge.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It&apos;s Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Build</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Let a worn-down shield make its owner flip worse</span></li>
                    <li><div className="cs-list-bullet"></div><span>Fill the board with squares - margins, parity, a 15× lottery</span></li>
                    <li><div className="cs-list-bullet"></div><span>Compose the camera at one aspect and let phones crop it</span></li>
                    <li><div className="cs-list-bullet"></div><span>Hold the result on a fixed timer before the next round</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>The shield scales <strong>damage</strong>, never the draw - asserted in <code>check()</code></span></li>
                    <li><div className="cs-list-bullet"></div><span>Two buttons; every other square priced, then deliberately cut</span></li>
                    <li><div className="cs-list-bullet"></div><span>Every shot declares a <strong>world-space box it may not crop</strong></span></li>
                    <li><div className="cs-list-bullet"></div><span><code>review</code> is a real phase with no timer - it ends on a button</span></li>
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
                    <span className="persona-trait">next/font</span>
                  </div>
                  <p className="persona-quote">&quot;Fonts are self-hosted because every glyph in the 3D layer is drawn with fillText - a font that fails to arrive is the whole interface in Times New Roman.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧮</div>
                <div>
                  <div className="persona-name">The Maths</div>
                  <div className="persona-role">rules.ts · market.ts - pure</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Binomial(5, ½)</span>
                    <span className="persona-trait">Price ladder</span>
                    <span className="persona-trait">check()</span>
                  </div>
                  <p className="persona-quote">&quot;Nothing here knows about three.js, React, money or animation. Five coins in, an outcome out.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">✨</div>
                <div>
                  <div className="persona-name">The Pit</div>
                  <div className="persona-role">three.js · Bloom · WebAudio</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Procedural</span>
                    <span className="persona-trait">Instanced crowd</span>
                    <span className="persona-trait">DOM mirror</span>
                  </div>
                  <p className="persona-quote">&quot;A neon scene with the bloom pass silently dropped does not look broken - it looks flat, and nobody reports it.&quot;</p>
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
                <div className="cs-comp-header">🪙 The Toss</div>
                <div className="cs-comp-cell" data-label="Responsibility">Five independent fair coins.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Never influenced by the fight.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Drawn from the sealed seed; shields touch damage only.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">💰 The Board</div>
                <div className="cs-comp-cell" data-label="Responsibility">Price both faces each round.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">A moving price that is still fair.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Symmetric ladder whose top rung sits below fair.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🔒 The Seal</div>
                <div className="cs-comp-cell" data-label="Responsibility">Make a duel re-checkable.</div>
                <div className="cs-comp-cell" data-label="Key Challenge">Publishing early leaks every round.</div>
                <div className="cs-comp-cell highlight" data-label="How It's Solved">Committed at the draw, revealed when a duelist goes down.</div>
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
            <h2 className="cs-section-title">Architecture &amp; the Round Loop</h2>

            <h3 className="cs-sub-heading">The Contract Between React and three.js</h3>

            <p className="cs-body">
              React owns the wallet, the bet, the duel and the phase, and hands the world one fresh <strong>immutable <code>WorldView</code></strong> whenever any of it changes. Input comes back as an <code>Intent</code>. Nothing in <code>engine/</code> imports React; nothing in <code>components/</code> imports three. That single rule is what let the arena be rebuilt around the coins without touching a line of the maths, and it is the same contract three other games in the arcade run on.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏛️</div><div className="flow-label">Lobby</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Bet · 20s</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🪙</div><div className="flow-label">Toss</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">👁️</div><div className="flow-label">Settle</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💥</div><div className="flow-label">Strike</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏆</div><div className="flow-label">Review</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🎥</div>
              <p className="cs-callout-text">The camera has one rule that overrides cinematography: <strong className="cs-w">the settle shot does not whip to whoever won.</strong> All five coins have to stay in frame from the mint firing until the strike lands, because the player is counting them to see whether their bet came in - and a dramatic push onto one duelist takes the outcome off screen. Every shot declares a world-space box it is <em>not allowed to crop</em>, and the rig solves for the distance that holds it at the current aspect; on a narrow phone frame the coin fan folds three-over-two so the width the shot must hold nearly halves.</p>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">⚔️</div>
                <h4>rules.ts</h4>
                <p>Coins · Score · Damage · Shields · Shield break</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>market.ts</h4>
                <p>Two buttons · Price ladder · <code>check()</code></p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪙</div>
                <h4>engine/</h4>
                <p>Mint · Coin flight · Shields · Holo crowd · Camera</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h4>blockchainRng.ts</h4>
                <p>Server seed route · mulberry32 · duel-wide seal</p>
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

            <h3 className="cs-sub-heading">Why Five Coins When the Bet Is a Coin Flip</h3>

            <p className="cs-body">
              Because the <em>margin</em> is the duel. Three of five settles the winner, and that is exactly one fair flip - so if that were all five coins did, four of them would be decoration. What the other four decide is <strong>how hard the hit lands</strong>: a 3-2 is a graze, a 4-1 is a real blow, a 5-0 is a sweep that takes nearly half a fighter&apos;s life. One exactly-priced question stays on the board while the thing on screen keeps its shape.
            </p>

            <code className="cs-code"><span className="cm">{'// rules.ts - five coins settle a bet AND a fight'}</span>{'\nk       = coins landing SUN-up          '}<span className="cm">{'// k ~ Binomial(5, ½)'}</span>{'\nscore   = 2k - 5                        '}<span className="cm">{'// ±1, ±3, ±5 - never 0, so never a tie'}</span>{'\ndamage  = |score|                       '}<span className="cm">{'// 1, 3 or 5, doubled on a shield break'}</span>{'\n\nP(SUN takes it) = P(k ≥ 3) = 16/32 = '}<span className="nm">½</span>{'   '}<span className="cm">{'// by symmetry, not arithmetic'}</span>{'\nmean damage     = 60/32 = '}<span className="nm">1.875</span>{'         '}<span className="cm">{'// ⇒ ~12 rounds from 12 life'}</span></code>

            <p className="cs-body">
              The distribution is exact and small enough to print: a <strong>3-2 graze</strong> lands 62.50% of the time, a <strong>4-1 clean hit</strong> 31.25%, and a <strong>5-0 sweep</strong> 6.25%. Every coin thrown <em>at</em> a fighter chips their shield, and the rest between rounds gives a little back - so the shield drains at a net rate that crosses its break threshold around round seven, which is why the last third of a duel is where the one-sided finishes live. A broken shield doubles a big hit, so a shattered sweep deals ten: it cannot kill from full life, but it ends any duel that has already been fought.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🛡️</div>
              <p className="cs-callout-text">The load-bearing invariant of the whole game: <strong className="cs-w">the shield never touches the coin.</strong> The obvious alternative - a battered fighter flips worse - would be more realistic and would silently move the price off its stated return, with no error thrown and nothing to notice until somebody measured the RTP months later. The shield decides how far a hit travels <em>once the score is known</em>, and the bet is settled against the score, never against the damage.</p>
            </div>

            <h3 className="cs-sub-heading">A Price That Moves, on Maths That Doesn&apos;t</h3>

            <p className="cs-body">
              The fair price on a symmetric coin flip is exactly <strong>2.00×</strong>. Rather than paint a single fixed number on both buttons forever, each face is priced independently every round from a <strong>six-rung ladder</strong> - 1.89× to 1.99× - drawn off a second stride of the same sealed block value, so the price is published <em>before</em> the toss and still recomputable <em>after</em> it. Two properties make a moving price a fair one, and both are computed rather than asserted:
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">The property</div>
                <div className="cs-comp-row-label">Why it matters</div>
                <div className="cs-comp-row-label highlight">Result</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">⚖️ Symmetric rungs</div>
                <div className="cs-comp-cell" data-label="The property">Equal weight either side of 1.94×.</div>
                <div className="cs-comp-cell" data-label="Why it matters">The session average must not drift.</div>
                <div className="cs-comp-cell highlight" data-label="Result">Mean exactly 1.94× ⇒ RTP exactly 97.000%.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🚫 Top rung below fair</div>
                <div className="cs-comp-cell" data-label="The property">1.99× &lt; 2.00×, always.</div>
                <div className="cs-comp-cell" data-label="Why it matters">No single round can be +EV.</div>
                <div className="cs-comp-cell highlight" data-label="Result">A player who only ever bets the best price gets 99.5%.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📏 Why ±0.05</div>
                <div className="cs-comp-cell" data-label="The property">Only 0.06 of headroom exists.</div>
                <div className="cs-comp-cell" data-label="Why it matters">A wider swing buys width with rungs above fair.</div>
                <div className="cs-comp-cell highlight" data-label="Result">The swing is as wide as it can honestly be.</div>
              </div>
            </div>

            <p className="cs-body">
              Because five coins cannot split evenly there is no draw to refund, which means <strong>no rounding residue</strong>: the return is 97% to every decimal place, not 97.09% or 96.91%. That makes it the most checkable number in the arcade, and it is printed on the paytable panel next to the fair price for exactly that reason. An <em>even</em> coin count was considered and rejected - six coins with a draw-refund lands on 97.25% or 96.91%, neither of which is 97, and a round where nobody takes the exchange is a worse thing to watch.
            </p>

            <h3 className="cs-sub-heading">The Words Changed; the Maths Did Not</h3>

            <p className="cs-body">
              Two rounds of playtesting rewrote the entire player-facing vocabulary and left every number untouched. <em>Sol / Luna</em> became <strong>SUN / MOON</strong> because that is what is legible on the coin without being told; <em>volley</em> became <strong>round</strong>; <em>edge</em> became <strong>the score</strong>, quoted as a scoreline; <em>guard</em> became <strong>shield</strong>; and &quot;Sol takes this volley&quot; became &quot;<strong>lands on more coins</strong>&quot; - the whole bet, on the button. Two wording bugs fell out of the same pass: the ribbon board was printing the same verb for exact opposites, and the headline was long enough to run off both ends of its own canvas, so it now measures itself down to fit rather than clipping.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Orbitron was cut. It is a squared, engineered face that made a betting table read as an instrument panel - so the wordmark and every big number moved to <strong>Bungee</strong> (signwriting), the labels to <strong>Fredoka</strong>, and the reading text to <strong>Rubik</strong>. All three self-hosted, because the 3D layer draws its glyphs with <code>fillText</code>.</p>
                  <div className="typo-hero">Bungee</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-bungee">Bungee · Wordmark &amp; Numbers</span>
                    <span className="typo-weight-item cs-ff-fredoka cs-fw-600">Fredoka · Labels</span>
                    <span className="typo-weight-item cs-ff-rubik">Rubik · Reading</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">Plum velvet instead of black glass, gold on everything that touches money, and two side colours that live in the <em>light around</em> the coin rather than on its surface - gold-versus-silver does not survive a bloom pass, and counting how many are suns is the one thing a player has to do at the settle beat. The sun turned from magenta to warm orange the moment it was named SUN.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#0A0310' })}><span className="color-hex">#0A0310</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#14061A' })}><span className="color-hex">#14061A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#1E0A28' })}><span className="color-hex">#1E0A28</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#2A1038' })}><span className="color-hex">#2A1038</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E9C9FF' })}><span className="color-hex">#E9C9FF</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#FF8A1E' })}><span className="color-hex">#FF8A1E</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#00E5FF' })}><span className="color-hex">#00E5FF</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFC846' })}><span className="color-hex">#FFC846</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#7C3AED' })}><span className="color-hex">#7C3AED</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF3B6B' })}><span className="color-hex">#FF3B6B</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#C0C6D0' })}><span className="color-hex">#C0C6D0</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The pit across its beats - the title badge, the two plinths, the mint firing five coins into the light column, the settle read and the aftermath. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/coin-duel/title-screen.png">
                  <img src="/Images/projects/coin-duel/title-screen.png" alt="Coin Duel title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title · The Badge</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/betting-board.png">
                  <img src="/Images/projects/coin-duel/betting-board.png" alt="The neon pit and two plinths" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Pit</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/coin-toss.png">
                  <img src="/Images/projects/coin-duel/coin-toss.png" alt="Five coins in the light column" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Toss</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/round-result.png">
                  <img src="/Images/projects/coin-duel/round-result.png" alt="Reading the five faces" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Settle · The Score</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/duel-summary.png">
                  <img src="/Images/projects/coin-duel/duel-summary.png" alt="Duel over, with the session summary" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Duel Summary</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/coin-duel/title-screen.png">
                  <img src="/Images/projects/coin-duel/title-screen.png" alt="Coin Duel title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title · The Badge</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/betting-board.png">
                  <img src="/Images/projects/coin-duel/betting-board.png" alt="The neon pit and two plinths" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Pit</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/coin-toss.png">
                  <img src="/Images/projects/coin-duel/coin-toss.png" alt="Five coins in the light column" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Toss</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/round-result.png">
                  <img src="/Images/projects/coin-duel/round-result.png" alt="Reading the five faces" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Settle · The Score</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/duel-summary.png">
                  <img src="/Images/projects/coin-duel/duel-summary.png" alt="Duel over, with the session summary" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Duel Summary</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/coin-duel/logo.png">
                  <img src="/Images/projects/coin-duel/logo.png" alt="The struck Coin Duel badge" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Struck Badge</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/cover.png">
                  <img src="/Images/projects/coin-duel/cover.png" alt="Coin Duel cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/round-result.png">
                  <img src="/Images/projects/coin-duel/round-result.png" alt="The two priced buttons" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Two Buttons</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/betting-board.png">
                  <img src="/Images/projects/coin-duel/betting-board.png" alt="Hex shields and holographic crowd" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Shields &amp; Crowd</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/coin-toss.png">
                  <img src="/Images/projects/coin-duel/coin-toss.png" alt="The mint firing" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Mint</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/coin-duel/logo.png">
                  <img src="/Images/projects/coin-duel/logo.png" alt="The struck Coin Duel badge" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Struck Badge</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/cover.png">
                  <img src="/Images/projects/coin-duel/cover.png" alt="Coin Duel cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/round-result.png">
                  <img src="/Images/projects/coin-duel/round-result.png" alt="The two priced buttons" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Two Buttons</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/betting-board.png">
                  <img src="/Images/projects/coin-duel/betting-board.png" alt="Hex shields and holographic crowd" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Shields &amp; Crowd</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/coin-duel/coin-toss.png">
                  <img src="/Images/projects/coin-duel/coin-toss.png" alt="The mint firing" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Mint</div>
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
              Coin Duel was written as a full design spec before a line of it existed, and then playtested twice into something noticeably different. The maths shipped exactly as specified; the presentation - words, type, colour and the shape of the interface - was rebuilt around what people actually did with it.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📄</div>
                <h4>1 · Spec First</h4>
                <p>Wrote the whole game down before building it: the rules as typed signatures, the exact distribution, the price ladder and the two properties that make it fair, plus a list of rejected bets and why.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">♻️</div>
                <h4>2 · Port the Frame</h4>
                <p>The world class, the 3D HUD, the camera rig, the seed route and the whole DOM-mirror accessibility layer came across from a sibling game with edits measured in lines. Only the arena was new work.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪙</div>
                <h4>3 · Coins &amp; Arena</h4>
                <p>Built the mint, the coin flight, the hex shields and the instanced holographic crowd - all procedural, and all driven off the same five booleans the market settles against.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🗣️</div>
                <h4>4 · Playtest the Words</h4>
                <p>The bet was the simplest in the arcade and its vocabulary the hardest part of it. Rewrote every player-facing term around what is visible on the coin, and split the rules screen into <em>the bet</em> and <em>the fight</em>.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎖️</div>
                <h4>5 · The Badge</h4>
                <p>A logo arrived after the game was built and disagreed with all of it. Moved the face geometry into one shared source so the SVG buttons and the 512px canvas coin texture cannot drift apart.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🖌️</div>
              <p className="cs-callout-text">One set of numbers, three renderers. The sun and moon faces are drawn on the raster badge, as SVG at any button size, and as a canvas bitmap struck onto a 3D cylinder. The old code hand-drew two of those separately with a comment asking whoever edited one to remember the other - survivable for a disc with twelve rays, not survivable for a face with brows and lips. The geometry now lives in <strong className="cs-w">one file of path strings</strong>, plus a simplified pair for anything under 30px, where the brows are a fifth of a pixel wide.</p>
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
                <div className="outcome-metric" data-text="97.000%">0</div>
                <div className="outcome-label">RTP exact to every decimal - no draw, so no rounding residue</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Ties">0</div>
                <div className="outcome-label">Five coins cannot split evenly, so every stake resolves</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="6" data-suffix=" Rungs">0</div>
                <div className="outcome-label">A price that moves each round and can never go positive</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="2" data-suffix=" Buttons">0</div>
                <div className="outcome-label">Every other square priced, then cut for being illegible</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;The price moves, the maths does not. <em>A moving price is only honest if its top rung sits below fair - so it does, by a hundredth.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped 3D betting game: a procedural neon pit, five minted coins per round, hex shields that break, an instanced holographic crowd, synthesized WebAudio effects, a full DOM accessibility mirror, and duels sealed to a blockchain block from the first toss to the knockdown.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Keeping the fight interesting without letting it touch the coin, and finding a vocabulary for a bet that is really just <em>heads or tails, best of five</em> - which turned out to be harder than any of the maths.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Subtraction is the hard part. Every square cut from the board - the margin bets, the parity squares, the 15× lottery ticket - was correctly priced and made the game worse. And a fixed review timer is the one duration that cannot be right, so the review beat has none.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>A commit-reveal that binds the operator in advance rather than only proving the seed afterwards, server-side settlement, and head-to-head duels between two real players on the same sealed coins.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/coin-duel" target="_blank"
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
