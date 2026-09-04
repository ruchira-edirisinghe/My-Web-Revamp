'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyPanchaKeliya() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Six Cowries, <span className="tagline-name">Two Markets</span></>}
    >
      {/* ═══════════════════════════════
           FLOATING TABLE OF CONTENTS
      ═══════════════════════════════ */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Challenge</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Sources</span><span
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
            <h1 className="cs-hero-title">Pancha<br/>Keliya</h1>
            <p className="cs-hero-subtitle">පංච කෙළිය - A 1909 Cowrie-Shell Board Game Rebuilt as a Two-Market Betting Table in 3D</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/pancha-keliya/cover.png" alt="Pancha Keliya - browser cowrie-shell board game cover"
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
              <div className="cs-meta-value">Web Game<br/>Board + Betting</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>three.js · TS</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Research</div>
              <div className="cs-meta-value">Parker 1909<br/>Murray 1951</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Fairness</div>
              <div className="cs-meta-value">Blockchain<br/>Race-Wide Seal</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Pancha Keliya is the cowrie-shell board game Sri Lankan families play through Avurudu, rebuilt as a 3D table with two live betting markets. Four players sit round a mat; six cowries are shaken in a half coconut and tipped out, and <em className="cs-em-gold">the number landing mouth-up settles a thirteen-square betting cloth and moves a piece on the chart at the same time.</em> One roll of six shells is simultaneously a dice game and the next move of a board game - which is not a design flourish, it is what the traditional game already is.
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
              A board game is a slow thing to bet on. A race takes nearly two hundred throws, and if the only market is <em>who wins</em>, the player has one decision at the start and then nine minutes of watching. The answer was to make the same number do two jobs: settle a fast market immediately, and move the board. That means <strong>the player is never idle</strong> - the next throw is always a bet, including on a rival&apos;s turn - and it means the slow market has to be priced by simulating the actual rules, not by guessing at them.
            </p>

            <div className="cs-highlight">
              <p>&quot;The board is generated, not drawn. <em>Move a leg of the chart and the ink, the movement rules and the twelve pieces all follow.</em>&quot;</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h4>Get the Rules Right</h4>
                <p>The board and the throw values are documented, not invented - Parker&apos;s <em>Ancient Ceylon</em> (1909) and Murray&apos;s <em>History of Board-Games</em> (1951), by way of the Ludii ludeme formalisation.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎲</div>
                <h4>Two Markets, One Number</h4>
                <p>A thirteen-square cloth settled in seconds off a Binomial(6, ½) shell distribution, and a race bet on who gets three pieces home first - both decided by the same throw.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚡</div>
                <h4>Price a Race Live</h4>
                <p>Race odds priced by playing the rest of the game out hundreds of times with the same rules the live table uses - fast enough to run between throws, never on a render frame.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               02 - SOURCES
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 --</span>
              <span className="cs-section-num">Sources &amp; Stack</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The Rules, and Where They Come From</h2>

            <p className="cs-body">
              The chart is a single track: nine squares along the bottom row, then a track of 25 that turns every five spaces - vertically, then right, then vertically, then diagonally up-left, then diagonally down-left. Walked out from the five legs the sources describe, it comes out as a <strong>house</strong>, and a symmetrical one, which is how you know the reading is right. Six squares carry an <strong>X</strong> - every fifth position - and a piece standing on one cannot be sent back to start.
            </p>

            <p className="cs-body">
              The bottom row is the only part of the track that is <em>not</em> shared: the two sides begin at opposite ends and walk inwards to the central space, so one side&apos;s second square is another side&apos;s eighth, while both sides&apos; fifth position is the same centre square. That is why a piece is identified by <code>squareId(side, pos)</code> rather than by position alone - comparing positions would get the shared squares and the split ones both wrong. A piece&apos;s whole journey is 5 + 25 = <strong>30 squares</strong>, and it leaves the board only on an exact throw to 31.
            </p>

            <h3 className="cs-sub-heading">Three Things the Sources Do Not Settle</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">The question</div>
                <div className="cs-comp-row-label">The choice made</div>
                <div className="cs-comp-row-label highlight">Why</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">👥 Seats</div>
                <div className="cs-comp-cell" data-label="The question">How many players?</div>
                <div className="cs-comp-cell" data-label="The choice made">Four, paired onto the two ends.</div>
                <div className="cs-comp-cell highlight" data-label="Why">The traditional game is two-sided; alternating seats keep the turn order running side to side.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">♟️ Piece choice</div>
                <div className="cs-comp-cell" data-label="The question">Which of three pieces takes a throw?</div>
                <div className="cs-comp-cell" data-label="The choice made">One house policy, for every seat.</div>
                <div className="cs-comp-cell highlight" data-label="Why">A policy has to exist for the pricing simulation - using the same one live is what stops the odds describing a different game.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🔁 Capture bonus</div>
                <div className="cs-comp-cell" data-label="The question">Does a capture grant an extra throw?</div>
                <div className="cs-comp-cell" data-label="The choice made">It does not.</div>
                <div className="cs-comp-cell highlight" data-label="Why">AGAIN is a square on the cloth, and a market has to be decidable from the shells alone.</div>
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
                    <span className="persona-trait">three.js</span>
                  </div>
                  <p className="persona-quote">&quot;engine/ never imports React, components/ never imports three - one immutable view in, intents out.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧮</div>
                <div>
                  <div className="persona-name">The Maths</div>
                  <div className="persona-role">rules.ts · market.ts - pure</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Binomial(6, ½)</span>
                    <span className="persona-trait">Live playouts</span>
                    <span className="persona-trait">check() · rtpOf()</span>
                  </div>
                  <p className="persona-quote">&quot;Both are pure and free of rendering - which is what lets the race odds be priced by simulating the real rules.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🏠</div>
                <div>
                  <div className="persona-name">The Table</div>
                  <div className="persona-role">Generated chart · 12 pieces · 4 seats</div>
                  <div className="persona-traits">
                    <span className="persona-trait">layout.ts</span>
                    <span className="persona-trait">Printed face</span>
                    <span className="persona-trait">Real-time walk</span>
                  </div>
                  <p className="persona-quote">&quot;The arrows are placed from the track heading, so an arrow can never point somewhere a piece doesn&apos;t go.&quot;</p>
                </div>
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
            <h2 className="cs-section-title">Architecture &amp; the Throw Loop</h2>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🪑</div><div className="flow-label">Seat</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧿</div><div className="flow-label">Cover Cloth</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🥥</div><div className="flow-label">Throw</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Settle</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">♟️</div><div className="flow-label">Move</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏆</div><div className="flow-label">Home</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">⏱️</div>
              <p className="cs-callout-text">Nothing on the board runs on a timer. Each of the twelve pieces keeps a floating-point track coordinate that chases the position React hands it at <strong className="cs-w">7.5 squares per second</strong>, hopping once per square and taking the corners of the chart rather than cutting across them - so a 6 visibly takes six times as long as a 1, and it walks over the squares it actually passed. The phase machine holds for a 340 ms floor and then <em>waits on the board</em> rather than guessing a duration, with a backstop so a wedged animation can never freeze the game. The number on the shells, the piece on the board and the line of commentary always describe the same instant.</p>
            </div>

            <h3 className="cs-sub-heading">Two Details the Twelve Pieces Forced</h3>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🫂</div>
                <h4>Crowding</h4>
                <p>Pieces share squares constantly, and on a marked X square four can pile up. They are grouped by <em>board square</em> (not track position, because the two sides number the bottom row from opposite ends) and eased onto slots - two abreast, three or more on a small ring. Without it a stack z-fights into a single smear and the board lies about how many pieces are on it.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Where the Ring Goes</h4>
                <p>The highlight ring follows the piece actually in play - the move effect names the seat <em>and</em> the piece - and falls back to the thrower&apos;s leading piece between moves. The seated figures&apos; eyelines come from the same lookup, so four people are looking at the thing that is happening.</p>
              </div>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h4>rules.ts</h4>
                <p>Shell roll · Piece policy · Opening probabilities · Playouts</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>market.ts</h4>
                <p>13-square paytable · Race odds · Cash-out · <code>check()</code></p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏠</div>
                <h4>engine/layout.ts</h4>
                <p>The chart walked from five legs · Yards · Home shelves</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h4>blockchainRng.ts</h4>
                <p>Server seed route · mulberry32 · race-wide seal</p>
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

            <h3 className="cs-sub-heading">One Throw, Two Jobs</h3>

            <p className="cs-body">
              Six fair shells give <strong>Binomial(6, ½)</strong>, so every square&apos;s true chance is a known rational number over 64. That is what makes a thirteen-square cloth pricable without a single simulation - and, because the whole stream is a pure function of the sealed seed, the shells&apos; <em>landing positions</em> are drawn from the same stream as their faces, so a replayed throw reproduces what the player actually saw rather than merely the number they were paid on.
            </p>

            <code className="cs-code"><span className="cm">{'// Six cowries in a half coconut → Binomial(6, ½)'}</span>{'\nfaces  = six draws of rng() < 0.5\ncount  = number of shells landing mouth-up      '}<span className="cm">{'// 0 … 6'}</span>{'\n\nways/64:   1    6    15    '}<span className="nm">20</span>{'    15    6    1\nchance:  1.56  9.38  23.44  '}<span className="nm">31.25</span>{'  23.44  9.38  1.56  %\nnames:   Dhas Ondira   -      -      -   Pancha Sadaya\n\n'}<span className="cm">{'// every square: fair payout × RTP 0.97, then rounded to something readable'}</span>{'\n'}<span className="nm">rtpOf</span>{'(square)  '}<span className="cm">{'// re-derived from the distribution, printed in the paytable'}</span></code>

            <p className="cs-body">
              A throw of <strong>6, 5 or 1</strong> grants an extra throw and is the only throw that can bring a piece onto the board - which is why <em>AGAIN</em> is a square you can bet on. Zero moves nothing and ends the turn. A cap of three consecutive extra throws bounds a lucky streak; without some cap the turn has no bound at all.
            </p>

            <h3 className="cs-sub-heading">The Betting Cloth</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Wins on</div>
                <div className="cs-comp-row-label">Fair</div>
                <div className="cs-comp-row-label highlight">Pays / Return</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Dhas · Sadaya</div>
                <div className="cs-comp-cell" data-label="Wins on">exactly 0 or exactly 6</div>
                <div className="cs-comp-cell" data-label="Fair">64.00×</div>
                <div className="cs-comp-cell highlight" data-label="Pays / Return">62.00× · 96.88%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">Ondira · Pancha</div>
                <div className="cs-comp-cell" data-label="Wins on">exactly 1 or exactly 5</div>
                <div className="cs-comp-cell" data-label="Fair">10.67×</div>
                <div className="cs-comp-cell highlight" data-label="Pays / Return">10.34× · 96.94%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">LOW · HIGH</div>
                <div className="cs-comp-cell" data-label="Wins on">0-1-2 or 4-5-6</div>
                <div className="cs-comp-cell" data-label="Fair">2.91×</div>
                <div className="cs-comp-cell highlight" data-label="Pays / Return">2.82× · 96.94%</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">EVEN · ODD</div>
                <div className="cs-comp-cell" data-label="Wins on">0-2-4-6 or 1-3-5</div>
                <div className="cs-comp-cell" data-label="Fair">2.00×</div>
                <div className="cs-comp-cell highlight" data-label="Pays / Return">1.94× · 97.00%</div>
              </div>
            </div>

            <p className="cs-body">
              Thirteen squares in all, plus <em>AGAIN</em> (1, 5 or 6 at 4.77×) and <em>ALL</em> (0 or 6 at 31.00×). The house edge is between <strong className="cs-gold">3.00% and 3.20% on every square of the cloth</strong> - there is no trap square, and a player cannot pick a worse bet than any other by more than two tenths of a percentage point. That is the whole point of pricing off one number rather than by feel. The paytable screen prints the <em>measured</em> return in its right-hand column, re-derived from the distribution rather than typed in beside it.
            </p>

            <h3 className="cs-sub-heading">The Race Market, and a Defect It Found</h3>

            <p className="cs-body">
              One bet per game on who gets all three pieces off first, priced from a <strong>live simulation of the actual rules</strong>: the odds engine plays the rest of the race out hundreds of times using the same piece-choice policy and the same capture logic that decide the live game, so the odds cannot quietly describe a slightly different game from the one on the table. Cash-out is stake × odds × current probability × 0.96 - the 0.96 is a spread, not a second house edge, because the player has already paid the 3% once at placement.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🐛</div>
              <p className="cs-callout-text">Verification found a real defect and it was fixed rather than documented. Opening prices were originally quoted from a fresh playout run, the same way mid-race prices are - but <strong className="cs-w">every race opens from an identical position</strong>, so there is nothing to sample: the opening prices are a constant. Sampling them anyway put ±0.2 of noise on each of four quotes, and individual runners were being offered at anywhere from <em>90% to 106%</em> return. A player who simply backed the longest price each race was, by construction, choosing whichever runner the simulation had most underestimated. The fix: the opening probabilities became a measured constant from a 700,000-race run, and the pricing function short-circuits to it whenever the race is still at its opening position.</p>
            </div>

            <p className="cs-body">
              Throwing order is a real advantage - seat one gets first crack at the 6/5/1 needed to enter, and every square it occupies is one the others can be sent home from - so it is <em>priced</em>. Measured over 700,000 complete races the spread is 1.7 percentage points from first to last (25.86% down to 24.20%), and the four prices track it at 3.75× to 4.01×, returning 96.93% - 97.08% flat. No seat is a better bet than another.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">The chart&apos;s printed face is generated as a texture from the same walk that defines the track, so the ink and the rules cannot drift apart. Type on the mat is a warm painted display face; the market and the paytable stay monospaced, because a price is a measurement.</p>
                  <div className="typo-hero">Painted Mat</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-bungee">Display · The Chart</span>
                    <span className="typo-weight-item cs-ff-mont cs-fw-600">Interface · Labels</span>
                    <span className="typo-weight-item cs-ff-mono">Mono · Paytable</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">Deep mat-teal for the ground, marigold for the printed chart and the money, terracotta for captures and the risk end of every ramp. The name is printed in the open sky under the gable, with the sun and the moon either side of it; the two open quarters of the room hold twelve home shelves, three per seat.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#030D0B' })}><span className="color-hex">#030D0B</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#06150F' })}><span className="color-hex">#06150F</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#0A1F1A' })}><span className="color-hex">#0A1F1A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#0F2B24' })}><span className="color-hex">#0F2B24</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#B6EEDC' })}><span className="color-hex">#B6EEDC</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#4FC3A1' })}><span className="color-hex">#4FC3A1</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E0912C' })}><span className="color-hex">#E0912C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#F2C94C' })}><span className="color-hex">#F2C94C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#C0553C' })}><span className="color-hex">#C0553C</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#D8453A' })}><span className="color-hex">#D8453A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#7A9A8C' })}><span className="color-hex">#7A9A8C</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The table across its beats - the title mat, the generated chart, the thirteen-square cloth, the shells being tipped and a piece walking home. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.png">
                  <img src="/Images/projects/pancha-keliya/home.png" alt="Pancha Keliya title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Mat</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.png">
                  <img src="/Images/projects/pancha-keliya/board.png" alt="The generated chart and four seats" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Chart</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.png">
                  <img src="/Images/projects/pancha-keliya/cloth.png" alt="The thirteen-square betting cloth" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Betting Cloth</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.png">
                  <img src="/Images/projects/pancha-keliya/throw.png" alt="Six cowries tipped from a half coconut" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Throw</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/result.png">
                  <img src="/Images/projects/pancha-keliya/result.png" alt="A piece reaching its home shelf" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home Shelf</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.png">
                  <img src="/Images/projects/pancha-keliya/home.png" alt="Pancha Keliya title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Mat</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.png">
                  <img src="/Images/projects/pancha-keliya/board.png" alt="The generated chart and four seats" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Chart</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.png">
                  <img src="/Images/projects/pancha-keliya/cloth.png" alt="The thirteen-square betting cloth" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Betting Cloth</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.png">
                  <img src="/Images/projects/pancha-keliya/throw.png" alt="Six cowries tipped from a half coconut" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Throw</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/result.png">
                  <img src="/Images/projects/pancha-keliya/result.png" alt="A piece reaching its home shelf" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home Shelf</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cover.png">
                  <img src="/Images/projects/pancha-keliya/cover.png" alt="Pancha Keliya cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.png">
                  <img src="/Images/projects/pancha-keliya/board.png" alt="The X-marked safe squares" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Marked Squares</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.png">
                  <img src="/Images/projects/pancha-keliya/cloth.png" alt="Live race odds and cash-out" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Race Odds</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.png">
                  <img src="/Images/projects/pancha-keliya/throw.png" alt="Shells landing mouth-up" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Mouth-Up Count</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.png">
                  <img src="/Images/projects/pancha-keliya/home.png" alt="Paytable with measured returns" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Measured Paytable</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cover.png">
                  <img src="/Images/projects/pancha-keliya/cover.png" alt="Pancha Keliya cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.png">
                  <img src="/Images/projects/pancha-keliya/board.png" alt="The X-marked safe squares" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Marked Squares</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.png">
                  <img src="/Images/projects/pancha-keliya/cloth.png" alt="Live race odds and cash-out" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Race Odds</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.png">
                  <img src="/Images/projects/pancha-keliya/throw.png" alt="Shells landing mouth-up" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Mouth-Up Count</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.png">
                  <img src="/Images/projects/pancha-keliya/home.png" alt="Paytable with measured returns" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Measured Paytable</div>
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
              The build started in the sources and ended in the profiler. Reading the chart out of a 1909 description and generating it in code came first; pricing the cloth off the binomial came second; and the last stretch was making a 193-throw race pricable <em>between throws</em> rather than on a render frame.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h4>1 · Read the Sources</h4>
                <p>Walked the five legs out of the Parker/Murray description into a generated chart, then made the printed texture, the movement rules and the twelve pieces all read the same walk.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧿</div>
                <h4>2 · Price the Cloth</h4>
                <p>Thirteen squares priced straight off Binomial(6, ½) at a 97% target, with the actual return re-derived rather than typed - so the paytable prints measurement, not intention.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏇</div>
                <h4>3 · Price the Race</h4>
                <p>Built a playout sampler that uses the live rules verbatim. Found and fixed the sampled-opening-price defect, replacing it with a measured constant from 700,000 races.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚡</div>
                <h4>4 · Make It Fast</h4>
                <p>Flattened the race state to a twelve-element array, made the piece-choice function write into one reused object, used typed arrays for lookups, and drew throws from a cumulative table - one random per throw instead of six.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⏳</div>
                <h4>5 · Cut the Beats</h4>
                <p>Shells 2.48s → 1.80s, the number held 1.20s → 0.70s, and the move stopped being a duration at all - a floor, then wait for the piece to arrive. Turbo went ×2 → ×3.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🔒</div>
              <p className="cs-callout-text">The seal covers a <strong className="cs-w">whole race, not a throw</strong>, and the justification is the strongest in the arcade: a race is on average <em>193 throws</em>, every one derived publicly and deterministically from one committed number. Publishing it at the start would not leak the next throw - it would leak every remaining throw of the game, and the cloth is a bet on exactly those numbers. Committed when the race is dealt, revealed the instant a player&apos;s last piece is off, and the race cannot end without unsealing it.</p>
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
              Measured against a faithful reimplementation of the shipped pipeline over <strong>5,999,940 throws</strong> - every reachable block value × 60 consecutive nonces - plus 700,000 complete races. The shells reproduce Binomial(6, ½) to within <strong>0.042 percentage points</strong>; the cloth measures 96.65% - 97.69% RTP against a 96.8-97.0% design, with the two outliers being the 62× squares whose sampling error at this size is ±0.31 pp per standard deviation; and the race market returns <strong>97.01%</strong> flat across all four runners with no shoppable edge. Zero races failed to finish inside a 6,000-throw cap.
            </p>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="13" data-suffix=" Squares">0</div>
                <div className="outcome-label">A betting cloth priced straight off the binomial, 3.0-3.2% edge</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-text="97.01%">0</div>
                <div className="outcome-label">Race-market RTP, flat across all four runners</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="6" data-suffix="M Throws">0</div>
                <div className="outcome-label">Simulated to confirm the shells are fair to 0.042 pp</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="45" data-suffix=" ms">0</div>
                <div className="outcome-label">Worst case for a 900-playout live odds quote, between throws</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;One throw settles two markets - <em>and the race odds are priced by simulating the exact rules the table is playing.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A shipped 3D board-and-betting game faithful to a documented 1909 ruleset: a generated chart, twelve pieces walking in real time, a thirteen-square cloth, live race odds with cash-out, and races sealed to a blockchain block from the first throw to the last piece home.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Three pieces per player make a long game - 193 throws, about ten minutes, three and a half in turbo - and every beat had to be cut as far as it goes while a throw still reads. That is the honest cost of the traditional rules, not a regression.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Simulation-derived prices need to know when <em>not</em> to simulate. Sampling a quantity that is a constant does not make it more accurate - it hands the player a menu whose longest price is always the one you got most wrong.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Let the player choose which of their three pieces takes a throw (keeping the house policy for rivals and for the pricing simulation), a binding commit-reveal, and four real players round one sealed mat.</p>
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
