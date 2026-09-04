'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyKanaMutti() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Sealed Until the <span className="tagline-name">Last Swing</span></>}
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
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">The Seal</span><span
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
            <h1 className="cs-hero-title">Kana<br/>Mutti</h1>
            <p className="cs-hero-subtitle">කණ මුට්ටි - The Avurudu Blindfold Pot-Smash as a Cash-Out Ladder, With a Board You Cannot Read Until It Is Over</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/kana-mutti/cover.png" alt="Kana Mutti - browser blindfold pot-smashing betting game cover"
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
              <div className="cs-meta-value">WebGL + DOM<br/>Mirror · WebAudio</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Fairness</div>
              <div className="cs-meta-value">Sealed Reveal<br/>Blockchain Seed</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Kana Mutti is Sri Lanka&apos;s Avurudu blindfold pot-smashing game as a real-time 3D betting round. Four clay pots hang from a rope; the player stakes a bet, picks a risk level - how many of the four are empty - and points a blindfolded striker at one pot at a time. Every pot of coins lifts the multiplier; an empty one ends it. The interesting engineering is not the ladder, it is the trust problem: <em className="cs-em-gold">the board has to be publicly verifiable eventually, and completely unguessable right now.</em>
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
            <h2 className="cs-section-title">Two Requirements That Fight Each Other</h2>

            <p className="cs-body">
              Every other game in this arcade has one of these problems. Kana Mutti is the first to have both at once, and resolving them is what the whole build is about.
            </p>

            <div className="cs-compare">
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Must Be Verifiable</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>The outcome should come from a <strong>public, independently checkable</strong> source</span></li>
                    <li><div className="cs-list-bullet"></div><span>Not a hidden server roll the operator&apos;s word is the only evidence for</span></li>
                    <li><div className="cs-list-bullet"></div><span>A result should be re-computable after the fact by anyone</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Must Stay Secret</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>The whole game is <em>&quot;pick a pot without knowing what&apos;s inside&quot;</em></span></li>
                    <li><div className="cs-list-bullet"></div><span>The board-generating code ships in the client bundle and is readable</span></li>
                    <li><div className="cs-list-bullet"></div><span>Publish the seed at round start and a player reads all four pots</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cs-highlight">
              <p>&quot;The board has to be public knowledge eventually - that is what provably fair <em>means</em>. <em>It just cannot be public yet.</em>&quot;</p>
            </div>

            <p className="cs-body">
              The sibling poker game in the same arcade resolved a similar tension by abandoning the blockchain entirely and using the browser&apos;s crypto RNG - correct there, because a poker deal must stay secret <em>forever</em>. Kana Mutti does not have that trade to make: its secret only needs to hold until the player has finished picking. So it keeps the public seed and adds a rule that exists nowhere else in the engine - <strong>the audit trail is sealed until the round is over.</strong>
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
              Next.js 15 (App Router), React 19, strict TypeScript and three.js. Almost the entire interface is drawn on the WebGL canvas, with an <strong>accessible HTML mirror underneath it</strong> for keyboard and screen-reader use. The seed is fetched through a <em>server-side route</em> rather than a client rewrite - copied near-verbatim from the arcade&apos;s best-engineered game - so the upstream auth token never reaches the browser bundle and a cold-start 502 never surfaces as a console error.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It&apos;s Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Build</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Shuffle with the browser&apos;s crypto RNG - good, but unauditable</span></li>
                    <li><div className="cs-list-bullet"></div><span>Show the block the moment the round starts, like every other game</span></li>
                    <li><div className="cs-list-bullet"></div><span>Fetch the seed client-side with the auth token in the bundle</span></li>
                    <li><div className="cs-list-bullet"></div><span>Re-seed once and let two fast rounds share a board</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Same shuffle, seeded from a <strong>public block</strong> - fully auditable</span></li>
                    <li><div className="cs-list-bullet"></div><span>Audit trail held in a ref; state set at <strong>exactly three</strong> round-ending points</span></li>
                    <li><div className="cs-list-bullet"></div><span>Server route, private token, 9s cache, negative cache, always 200</span></li>
                    <li><div className="cs-list-bullet"></div><span>A monotonic <strong>nonce</strong> with a prime stride mixed into every round</span></li>
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
                    <span className="persona-trait">Backoff refresh</span>
                  </div>
                  <p className="persona-quote">&quot;The client only ever sees a clean 200, with a fallback flag when the chain is genuinely unreachable.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🔒</div>
                <div>
                  <div className="persona-name">The Seal</div>
                  <div className="persona-role">Refs, not state</div>
                  <div className="persona-traits">
                    <span className="persona-trait">3 reveal points</span>
                    <span className="persona-trait">mulberry32</span>
                    <span className="persona-trait">Prime-stride nonce</span>
                  </div>
                  <p className="persona-quote">&quot;What the UI renders from starts every round at null. It is only set when the round is already over.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🏺</div>
                <div>
                  <div className="persona-name">The Scene</div>
                  <div className="persona-role">three.js · WebAudio · DOM mirror</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Blindfold striker</span>
                    <span className="persona-trait">Hanging pots</span>
                    <span className="persona-trait">Focus trapping</span>
                  </div>
                  <p className="persona-quote">&quot;The trust chip is real HTML, because readable text, a data table and a close button are things HTML already does well.&quot;</p>
                </div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 - THE SEAL
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">The Seal</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Architecture: the Sealed Reveal</h2>

            <h3 className="cs-sub-heading">Ten Steps From Block to Payout</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🔗</div><div className="flow-label">Block Seed</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🎚️</div><div className="flow-label">Stake + Risk</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🎲</div><div className="flow-label">Shuffle</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔒</div><div className="flow-label">Sealed</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏺</div><div className="flow-label">Smash</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔓</div><div className="flow-label">Unsealed</div></div>
            </div>

            <p className="cs-body">
              A background refresh keeps a block-derived number on hand. When the player presses <em>Smash</em>, that number is normalised, mixed with a monotonic per-round nonce, and used to seed a mulberry32 generator. That generator drives a textbook Fisher-Yates shuffle of the four pot indices, truncated to the first <em>n</em> - which is the board. Every step from the derivation onward is <strong>deterministic</strong>: feed the same block value and nonce and you get the same four-pot board, on any machine.
            </p>

            <code className="cs-code"><span className="cm">{'// startRound - the board, and the audit trail that is NOT shown'}</span>{'\nbase   = latestBlockSeed          '}<span className="cm">{'// 17179 / 99999 = 0.171802…'}</span>{'\nnonce  = roundNonce++             '}<span className="cm">{'// never resets during a session'}</span>{'\nseed   = '}<span className="nm">deriveRoundSeed</span>{'(base, nonce)\nrng    = '}<span className="nm">makeRng</span>{'(seed)             '}<span className="cm">{'// mulberry32'}</span>{'\nduds   = '}<span className="nm">placeDuds</span>{'(n, rng)          '}<span className="cm">{'// Fisher-Yates → e.g. {2}'}</span>{'\n\nroundAuditRef.current = { blockNumber, blockHash, number, nonce, duds };\n'}<span className="nm">setFair</span>{'(null);                   '}<span className="cm">{'// ← what the UI actually renders from'}</span></code>

            <div className="cs-callout">
              <div className="cs-callout-icon">🔐</div>
              <p className="cs-callout-text">The whole fix is one line and one discipline. The derivation, the generator and the shuffle are <strong className="cs-w">pure, public functions shipped in the client bundle</strong> - anyone with dev tools can read them. If the UI showed the block value when the round started, a player could paste it into those same three functions and read every pot before swinging once. So the audit trail goes into a <em>ref</em> the UI never reads, and the state the popup renders from starts every round at <code>null</code> - set at exactly three places, all of them a round <em>ending</em>: cash out, bust, or board cleared. Abandon the round and the audit is discarded too, because there is no further pick it could still influence.</p>
            </div>

            <h3 className="cs-sub-heading">Three States, One Chip</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Shown while</div>
                <div className="cs-comp-row-label">Chip reads</div>
                <div className="cs-comp-row-label highlight">Popup content</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🛡️ No round yet</div>
                <div className="cs-comp-cell" data-label="Shown while">Start, how-to, or before the first deal</div>
                <div className="cs-comp-cell" data-label="Chip reads">FAIR</div>
                <div className="cs-comp-cell highlight" data-label="Popup content">A generic explainer of the fairness model.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🔒 Sealed</div>
                <div className="cs-comp-cell" data-label="Shown while">A round is dealt but not decided</div>
                <div className="cs-comp-cell" data-label="Chip reads">SEALED</div>
                <div className="cs-comp-cell highlight" data-label="Popup content">An explicit &quot;sealed until this round ends&quot;, with the reason.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🔓 Revealed</div>
                <div className="cs-comp-cell" data-label="Shown while">The round is over</div>
                <div className="cs-comp-cell" data-label="Chip reads">#blockNumber</div>
                <div className="cs-comp-cell highlight" data-label="Popup content">Source, block #, block value, hash, round nonce, board.</div>
              </div>
            </div>

            <p className="cs-body">
              The chip sits bottom-left - the one screen corner the 3D layer never puts chrome into in any phase - and it is real HTML rather than canvas-drawn, because readable text, a data table, a close button and focus trapping are things HTML already does well; duplicating that as canvas text plus a second focus-management system would not have bought anything. The popup closes on Escape, traps Tab, and restores focus to whatever opened it.
            </p>

            <p className="cs-body">
              What this buys is precise, and the limits are worth stating. The block <em>number</em> was never secret - it is on the public chain the instant it is mined. What is withheld is the derived seed value combined with <em>timing</em>: showing it at round start would hand a player the exact input to a function they can already read, at the one moment reading it would matter. It does not defend against a modified client reading the ref directly, and no client-side scheme can - which is the same caveat the whole arcade carries: &quot;provably fair&quot; here means the seed is verifiable after the fact, not that a commit-reveal cryptographically binds the operator in advance.
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

            <h3 className="cs-sub-heading">The Ladder</h3>

            <p className="cs-body">
              The multiplier after <em>k</em> safe picks is the reciprocal of the probability of drawing <em>k</em> safe pots in a row without replacement - a hypergeometric ladder rather than an invented curve - scaled by a per-risk-level return.
            </p>

            <code className="cs-code"><span className="cm">{'// fair odds after k safe picks, from n pots with d duds'}</span>{'\nm = 1\nfor (j = 0; j < k; j++) m *= (n - j) / (n - d - j)\nreturn m * level.ret\n\n'}<span className="cm">{'// Careful (1 dud) and Risky (2) → 0.97   ·   Daredevil (3) → 1.75'}</span></code>

            <p className="cs-body">
              Careful and Risky run at a <strong>97% RTP</strong>. Daredevil is different, deliberately: with only four pots, choosing 1 of 4 and choosing 3 of 4 have the same number of combinations, so the <em>fair</em> top prizes for Careful and Daredevil are mathematically identical - while the game&apos;s own copy promises &quot;more empties, bigger payouts&quot;. Rather than break the promise or quietly leave it false, Daredevil is boosted to <strong>175%</strong>: a player-favourable payout on a 1-in-4 shot, and the one place in the game where the player has the edge. It is safe only because the bankroll is a demo number, and the source comment says exactly that.
            </p>

            <h3 className="cs-sub-heading">Verified: No Positional Bias</h3>

            <p className="cs-body">
              The shipped shuffle, seed derivation and generator were simulated directly - byte-identical copies, not a re-derivation from memory - across <strong>400,000 rounds per risk level</strong>, with the block value swept across the full 1-99,999 range rather than held fixed.
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Empty pots</div>
                <div className="cs-comp-row-label">Expected share per pot</div>
                <div className="cs-comp-row-label highlight">Measured spread</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Careful</div>
                <div className="cs-comp-cell" data-label="Empty pots">1 of 4</div>
                <div className="cs-comp-cell" data-label="Expected share per pot">25.00%</div>
                <div className="cs-comp-cell highlight" data-label="Measured spread">24.96 - 25.07% (max dev 0.29 pp)</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Risky</div>
                <div className="cs-comp-cell" data-label="Empty pots">2 of 4</div>
                <div className="cs-comp-cell" data-label="Expected share per pot">50.00%</div>
                <div className="cs-comp-cell highlight" data-label="Measured spread">49.80 - 50.17% (max dev 0.39 pp)</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Daredevil</div>
                <div className="cs-comp-cell" data-label="Empty pots">3 of 4</div>
                <div className="cs-comp-cell" data-label="Expected share per pot">75.00%</div>
                <div className="cs-comp-cell highlight" data-label="Measured spread">74.84 - 75.09% (max dev 0.22 pp)</div>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">📊</div>
              <p className="cs-callout-text">One counter-intuitive result worth recording. Holding the block value fixed and comparing consecutive nonces at Risky - where only <strong className="cs-w">six boards exist</strong> - the same board recurred 16.9% of 100,000 trials. That is not a flaw; it is almost exactly 1/6, the collision rate you would get from two genuinely independent draws over a six-outcome space. The nonce is doing its job. The <em>board space</em> is simply small, which means &quot;the same board as last round&quot; is a common and expected event at this pot count, not a sign of a stuck generator.</p>
            </div>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Festival lettering for the title and the multiplier, a plain interface face for controls, and monospace anywhere a number is a measurement - the ladder, the balance and the audit table in the fairness popup.</p>
                  <div className="typo-hero">Avurudu</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-bungee">Display · Festival</span>
                    <span className="typo-weight-item cs-ff-mont cs-fw-600">Interface · Controls</span>
                    <span className="typo-weight-item cs-ff-mono">Mono · Ladder &amp; Audit</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">A festival palette against a dusk-maroon ground: terracotta for the clay pots, gold for the coins and the money, leaf-green for the trees the rope is slung between, and red at the top of every risk ramp.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#100409' })}><span className="color-hex">#100409</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#1A0710' })}><span className="color-hex">#1A0710</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#250B18' })}><span className="color-hex">#250B18</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#331020' })}><span className="color-hex">#331020</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFD9B8' })}><span className="color-hex">#FFD9B8</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#F0803A' })}><span className="color-hex">#F0803A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFC94D' })}><span className="color-hex">#FFC94D</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#8FC63D' })}><span className="color-hex">#8FC63D</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#C0553C' })}><span className="color-hex">#C0553C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E0483C' })}><span className="color-hex">#E0483C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#9A6A55' })}><span className="color-hex">#9A6A55</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The round across its beats - the title screen, four pots on the rope, the striker&apos;s swing, the cash-out ladder and the sealed-then-revealed fairness popup. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/kana-mutti/title-screen.png">
                  <img src="/Images/projects/kana-mutti/title-screen.png" alt="Kana Mutti title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Screen</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-selection.png">
                  <img src="/Images/projects/kana-mutti/pot-selection.png" alt="Four clay pots on the rope" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Four Pots</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-smashed.png">
                  <img src="/Images/projects/kana-mutti/pot-smashed.png" alt="A pot smashed - coins and shards in the air" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Pot Smashed</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/place-bet.png">
                  <img src="/Images/projects/kana-mutti/place-bet.png" alt="Place your bet - stake and risk level" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Place Your Bet</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/round-win.png">
                  <img src="/Images/projects/kana-mutti/round-win.png" alt="Cleared them all - the payout card" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cleared Them All</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/kana-mutti/title-screen.png">
                  <img src="/Images/projects/kana-mutti/title-screen.png" alt="Kana Mutti title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Screen</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-selection.png">
                  <img src="/Images/projects/kana-mutti/pot-selection.png" alt="Four clay pots on the rope" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Four Pots</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-smashed.png">
                  <img src="/Images/projects/kana-mutti/pot-smashed.png" alt="A pot smashed - coins and shards in the air" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Pot Smashed</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/place-bet.png">
                  <img src="/Images/projects/kana-mutti/place-bet.png" alt="Place your bet - stake and risk level" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Place Your Bet</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/round-win.png">
                  <img src="/Images/projects/kana-mutti/round-win.png" alt="Cleared them all - the payout card" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cleared Them All</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/kana-mutti/logo.png">
                  <img src="/Images/projects/kana-mutti/logo.png" alt="Kana Mutti wordmark" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Wordmark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/cover.png">
                  <img src="/Images/projects/kana-mutti/cover.png" alt="Kana Mutti cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/place-bet.png">
                  <img src="/Images/projects/kana-mutti/place-bet.png" alt="The three risk levels" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Risk Levels</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-selection.png">
                  <img src="/Images/projects/kana-mutti/pot-selection.png" alt="The sealed trust chip" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">SEALED Chip</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-smashed.png">
                  <img src="/Images/projects/kana-mutti/pot-smashed.png" alt="A pot shattering into coins" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Coins!</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/kana-mutti/logo.png">
                  <img src="/Images/projects/kana-mutti/logo.png" alt="Kana Mutti wordmark" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Wordmark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/cover.png">
                  <img src="/Images/projects/kana-mutti/cover.png" alt="Kana Mutti cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/place-bet.png">
                  <img src="/Images/projects/kana-mutti/place-bet.png" alt="The three risk levels" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Risk Levels</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-selection.png">
                  <img src="/Images/projects/kana-mutti/pot-selection.png" alt="The sealed trust chip" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">SEALED Chip</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kana-mutti/pot-smashed.png">
                  <img src="/Images/projects/kana-mutti/pot-smashed.png" alt="A pot shattering into coins" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Coins!</div>
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
              Kana Mutti shipped first with a locally-generated board and was then rebuilt around the trust problem. The shuffle algorithm never changed - only where its numbers come from, and when the player is allowed to see them.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏺</div>
                <h4>1 · The Scene</h4>
                <p>Built the 3D festival scene first - four pots on a rope between two trees, a blindfolded striker who marches and swings, coins and shards on a hit - with an accessible DOM mirror underneath from day one.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪜</div>
                <h4>2 · The Ladder</h4>
                <p>Derived the multiplier from the without-replacement probability rather than inventing a curve, then set three risk levels and resolved the four-pot symmetry problem in favour of the player.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h4>3 · Swap the Entropy</h4>
                <p>Replaced the local crypto RNG with a block-derived seed, keeping the shuffle byte-for-byte identical. The shuffle takes its generator as an argument, so the seed source swapped without touching the logic.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🖥️</div>
                <h4>4 · Server Route</h4>
                <p>Moved the fetch server-side - private token, lag ladder, 9-second success cache, 5-second negative cache, exponential backoff, and a guaranteed 200 with a fallback flag.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔒</div>
                <h4>5 · Seal It</h4>
                <p>Moved the audit trail into a ref, made the rendered state start at null every round, and set it at exactly three places - all of them a round ending. Then built the three-state trust chip around that.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🎲</div>
              <p className="cs-callout-text">A block only changes every twelve seconds or so, but a player can deal a new board faster than that. Without protection two consecutive rounds from the same block would get the <strong className="cs-w">identical set of empty pots</strong>. The nonce fixes it with a prime stride - consecutive rounds land far apart in seed space rather than adjacent - and it never resets during a session, so even a repeated block yields a fresh board.</p>
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
                <div className="outcome-metric" data-text="0.39 pp">0</div>
                <div className="outcome-label">Worst positional deviation over 400k rounds per risk level</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="3" data-suffix=" Reveal Points">0</div>
                <div className="outcome-label">Cash out, bust or board cleared - and nothing else unseals it</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="97" data-suffix="% RTP">0</div>
                <div className="outcome-label">On Careful and Risky; Daredevil deliberately runs at 175%</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" Token Leaks">0</div>
                <div className="outcome-label">The upstream auth token never reaches the client bundle</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;Every other game shows the block the moment the round starts. <em>Here that would hand the player the exact input to a function they can already read.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped 3D betting game on a traditional Avurudu pastime, and the arcade&apos;s reference implementation for sealed-reveal fairness: a server-side seed route, a prime-stride nonce, a statistically sound generator, a three-state trust chip in real HTML, and a full DOM accessibility mirror over the WebGL scene.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Holding two requirements that pull in opposite directions - publicly auditable, and unguessable while it matters - without falling back on a hidden server roll or abandoning verifiability the way a hidden-information card game has to.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Trust UI is engineering, not decoration. The seal is worth nothing if it is a promise; it is worth something because it is a ref the render path cannot read, set at three enumerable points, with the sealed state <em>shown</em> rather than hidden - a lock icon beats an empty space that looks like a bug.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Roll the sealed-reveal pattern out across the racing games, whose seeds are still readable during the betting window, and move outcome resolution server-side so the seal binds a modified client too.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/kana-mutti" target="_blank"
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
