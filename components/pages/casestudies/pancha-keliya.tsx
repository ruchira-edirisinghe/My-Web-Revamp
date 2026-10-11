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
            <img src="/Images/projects/pancha-keliya/cover.webp" alt="Pancha Keliya - browser cowrie-shell board game cover"
              className="cs-cover-img" id="hero-img" loading="eager" decoding="async" />
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
              Pancha Keliya is the cowrie-shell board game that Sri Lankan families play during Avurudu, and I rebuilt it as a 3D table with two live betting markets. Four players sit around a mat, and six cowrie shells are shaken in half a coconut shell and tipped out. <em className="cs-em-gold">The number of shells that land mouth-up settles a thirteen-square betting cloth and moves a piece on the board, both at the same time.</em> So one roll of six shells works as a dice game and as the next move in a board game. That wasn&apos;t something I added for effect. It&apos;s how the traditional game has always worked.
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
              A board game is slow to bet on. A single race takes almost two hundred throws, and if the only bet is <em>who wins</em>, the player makes one decision at the start and then just watches for nine minutes. My answer was to make each throw do two jobs. It settles a quick bet straight away, and it moves the board. That means <strong>the player always has something to do</strong>, because every throw is a chance to bet, even on a rival&apos;s turn. It also meant the slower race bet had to be priced by simulating the real rules, rather than guessing.
            </p>

            <div className="cs-highlight">
              <p>&quot;The board is generated in code, not drawn by hand. <em>Change one leg of the chart and the printed ink, the movement rules and all twelve pieces follow along.</em>&quot;</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h3>Get the Rules Right</h3>
                <p>I didn&apos;t make up the board or the throw values. They come from historical sources, Parker&apos;s <em>Ancient Ceylon</em> (1909) and Murray&apos;s <em>History of Board-Games</em> (1951), through the Ludii project&apos;s formal description of the game.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎲</div>
                <h3>Two Markets, One Number</h3>
                <p>There&apos;s a thirteen-square betting cloth that&apos;s settled in seconds using the odds of six shells (a Binomial(6, ½) distribution), and a race bet on who gets all three pieces home first. The same throw decides both.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚡</div>
                <h3>Price a Race Live</h3>
                <p>The race odds are worked out by playing the rest of the game hundreds of times in the background, using exactly the same rules as the live table. It&apos;s fast enough to run between throws, and it never slows down the animation.</p>
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
              The chart is one long track. It starts with nine squares along the bottom row, then continues for another 25 squares, changing direction every five: up, then right, then up again, then diagonally up and to the left, then diagonally down and to the left. When you walk it out from the five legs described in the sources, it forms the shape of a <strong>house</strong>, and a symmetrical one at that, which is a good sign the reading is correct. Six squares are marked with an <strong>X</strong>, one at every fifth position, and a piece standing on one of them can&apos;t be sent back to the start.
            </p>

            <p className="cs-body">
              The bottom row is the only part of the track that <em>isn&apos;t</em> shared. The two sides start at opposite ends and walk in towards the middle, so one side&apos;s second square is the other side&apos;s eighth, while both sides&apos; fifth position is the same centre square. That&apos;s why each piece is identified with <code>squareId(side, pos)</code> instead of just its position, since comparing positions alone would get both the shared squares and the split ones wrong. A piece&apos;s full journey is 5 + 25 = <strong>30 squares</strong>, and it only leaves the board with an exact throw that takes it to 31.
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
              <p className="cs-callout-text">Nothing on the board runs on a fixed timer. Each of the twelve pieces keeps track of its position on the track and moves towards wherever React says it should be at <strong className="cs-w">7.5 squares per second</strong>. It hops once per square and follows the corners of the chart instead of cutting across them, so a throw of 6 visibly takes six times longer than a throw of 1, and the piece walks over the exact squares it passed. The game waits at least 340 ms and then <em>waits for the board to finish</em> rather than guessing how long a move will take, with a safety net so a stuck animation can never freeze the game. The number on the shells, the piece on the board and the commentary always describe the same moment.</p>
            </div>

            <h3 className="cs-sub-heading">Two Details the Twelve Pieces Forced</h3>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🫂</div>
                <h3>Crowding</h3>
                <p>Pieces share squares all the time, and up to four can pile up on a marked X square. They&apos;re grouped by <em>board square</em> rather than track position (because the two sides number the bottom row from opposite ends) and slide into slots, two side by side, or three or more in a small ring. Without this, a stack of pieces flickers into one blurry shape and the board ends up lying about how many pieces are actually there.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h3>Where the Ring Goes</h3>
                <p>The highlight ring follows whichever piece is actually being moved, because the move tells the game both the seat <em>and</em> the piece. Between moves, it goes back to the thrower&apos;s leading piece. The seated characters use the same information to decide where to look, so all four of them are watching whatever is happening.</p>
              </div>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h3>rules.ts</h3>
                <p>Shell roll · Piece policy · Opening probabilities · Playouts</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h3>market.ts</h3>
                <p>13-square paytable · Race odds · Cash-out · <code>check()</code></p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏠</div>
                <h3>engine/layout.ts</h3>
                <p>The chart walked from five legs · Yards · Home shelves</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔗</div>
                <h3>blockchainRng.ts</h3>
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
              Six fair shells follow a <strong>Binomial(6, ½)</strong> distribution, so the real chance of every square is a known fraction out of 64. That&apos;s what makes it possible to price a thirteen-square cloth without running a single simulation. Because everything comes from the sealed seed, the positions where the shells <em>land</em> are drawn from the same random stream as which way up they land. So if you replay a throw, you see exactly what the player saw, not just the number they were paid on.
            </p>

            <code className="cs-code"><span className="cm">{'// Six cowries in a half coconut → Binomial(6, ½)'}</span>{'\nfaces  = six draws of rng() < 0.5\ncount  = number of shells landing mouth-up      '}<span className="cm">{'// 0 … 6'}</span>{'\n\nways/64:   1    6    15    '}<span className="nm">20</span>{'    15    6    1\nchance:  1.56  9.38  23.44  '}<span className="nm">31.25</span>{'  23.44  9.38  1.56  %\nnames:   Dhas Ondira   -      -      -   Pancha Sadaya\n\n'}<span className="cm">{'// every square: fair payout × RTP 0.97, then rounded to something readable'}</span>{'\n'}<span className="nm">rtpOf</span>{'(square)  '}<span className="cm">{'// re-derived from the distribution, printed in the paytable'}</span></code>

            <p className="cs-body">
              A throw of <strong>6, 5 or 1</strong> gives you another throw, and it&apos;s the only kind of throw that can bring a new piece onto the board, which is why <em>AGAIN</em> is a square you can bet on. A throw of zero doesn&apos;t move anything and ends your turn. You can get at most three extra throws in a row, which stops a lucky streak from going on forever. Without some kind of limit, a turn could in theory never end.
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
              There are thirteen squares in total, plus <em>AGAIN</em> (a 1, 5 or 6, paying 4.77×) and <em>ALL</em> (a 0 or 6, paying 31.00×). The house edge is between <strong className="cs-gold">3.00% and 3.20% on every square of the cloth</strong>, so there&apos;s no trap square, and no bet is worse than any other by more than two tenths of a percentage point. That&apos;s exactly why I priced everything from one distribution instead of by feel. The paytable screen shows the <em>measured</em> return in its right-hand column, calculated from the distribution rather than typed in by hand.
            </p>

            <h3 className="cs-sub-heading">The Race Market, and a Defect It Found</h3>

            <p className="cs-body">
              You get one bet per game on who will get all three of their pieces off the board first, and it&apos;s priced using a <strong>live simulation of the real rules</strong>. The odds engine plays out the rest of the race hundreds of times using the same rules for choosing pieces and capturing as the live game does, so the odds can never quietly describe a slightly different game from the one on the table. Cashing out pays stake × odds × current probability × 0.96. The 0.96 is a spread, not a second house edge, because the player already paid the 3% once when they placed the bet.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🐛</div>
              <p className="cs-callout-text">Testing turned up a real bug, and I fixed it rather than just writing it down. The opening prices were originally worked out from a fresh simulation, the same way prices partway through the race are. But <strong className="cs-w">every race starts from exactly the same position</strong>, so there&apos;s nothing to simulate, and the opening prices should simply be a constant. Simulating them anyway added about ±0.2 of random noise to each of the four prices, so individual runners were being offered at anywhere from <em>90% to 106%</em> return. A player who always backed the longest price would, by definition, be picking whichever runner the simulation had underestimated the most. To fix it, I measured the opening probabilities once over 700,000 races and stored them as a constant, and the pricing function now uses that constant whenever the race hasn&apos;t started moving yet.</p>
            </div>

            <p className="cs-body">
              Going first is a real advantage. Seat one gets the first chance at the 6, 5 or 1 needed to bring a piece on, and every square it takes is one the other players can be sent home from. So the order is <em>priced in</em>. Measured over 700,000 complete races, the gap from first to last seat is 1.7 percentage points (25.86% down to 24.20%), and the four prices follow it, from 3.75× to 4.01×, all returning between 96.93% and 97.08%. No seat is a better bet than any other.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">The printed design on the chart is generated as a texture from the same path that defines the track, so the ink and the rules can never disagree. The lettering on the mat uses a warm, hand-painted display font, while the betting cloth and paytable stay in a monospaced font, because a price is a measurement and should read like one.</p>
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
                  <p className="sg-unit-desc">A deep teal for the mat, marigold for the printed chart and anything to do with money, and terracotta for captures and the risky end of every scale. The game&apos;s name is printed in the open sky under the roof, with the sun and the moon on either side. The two open corners of the room hold twelve home shelves, three for each seat.</p>
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
            <p className="cs-body">Here&apos;s the table at each stage of a game: the title mat, the generated chart, the thirteen-square betting cloth, the shells being tipped out and a piece walking home. Click any screen to see it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.webp">
                  <img src="/Images/projects/pancha-keliya/home.webp" alt="Pancha Keliya title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Mat</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.webp">
                  <img src="/Images/projects/pancha-keliya/board.webp" alt="The generated chart and four seats" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Chart</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.webp">
                  <img src="/Images/projects/pancha-keliya/cloth.webp" alt="The thirteen-square betting cloth" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Betting Cloth</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.webp">
                  <img src="/Images/projects/pancha-keliya/throw.webp" alt="Six cowries tipped from a half coconut" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Throw</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/result.webp">
                  <img src="/Images/projects/pancha-keliya/result.webp" alt="A piece reaching its home shelf" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home Shelf</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.webp">
                  <img src="/Images/projects/pancha-keliya/home.webp" alt="Pancha Keliya title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Mat</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.webp">
                  <img src="/Images/projects/pancha-keliya/board.webp" alt="The generated chart and four seats" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Chart</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.webp">
                  <img src="/Images/projects/pancha-keliya/cloth.webp" alt="The thirteen-square betting cloth" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Betting Cloth</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.webp">
                  <img src="/Images/projects/pancha-keliya/throw.webp" alt="Six cowries tipped from a half coconut" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">The Throw</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/result.webp">
                  <img src="/Images/projects/pancha-keliya/result.webp" alt="A piece reaching its home shelf" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home Shelf</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cover.webp">
                  <img src="/Images/projects/pancha-keliya/cover.webp" alt="Pancha Keliya cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.webp">
                  <img src="/Images/projects/pancha-keliya/board.webp" alt="The X-marked safe squares" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Marked Squares</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.webp">
                  <img src="/Images/projects/pancha-keliya/cloth.webp" alt="Live race odds and cash-out" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Race Odds</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.webp">
                  <img src="/Images/projects/pancha-keliya/throw.webp" alt="Shells landing mouth-up" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Mouth-Up Count</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.webp">
                  <img src="/Images/projects/pancha-keliya/home.webp" alt="Paytable with measured returns" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Measured Paytable</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cover.webp">
                  <img src="/Images/projects/pancha-keliya/cover.webp" alt="Pancha Keliya cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/board.webp">
                  <img src="/Images/projects/pancha-keliya/board.webp" alt="The X-marked safe squares" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Marked Squares</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/cloth.webp">
                  <img src="/Images/projects/pancha-keliya/cloth.webp" alt="Live race odds and cash-out" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Race Odds</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/throw.webp">
                  <img src="/Images/projects/pancha-keliya/throw.webp" alt="Shells landing mouth-up" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Mouth-Up Count</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pancha-keliya/home.webp">
                  <img src="/Images/projects/pancha-keliya/home.webp" alt="Paytable with measured returns" className="ui-thumb" loading="lazy" decoding="async"/>
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
              The work started with the historical sources and ended in the profiler. First I read the chart out of a description from 1909 and generated it in code. Next I priced the betting cloth using the binomial distribution. The last stretch was making it possible to price a 193-throw race <em>between throws</em>, without slowing down the animation.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h3>1 · Read the Sources</h3>
                <p>I traced the five legs of the track from the Parker and Murray descriptions into a generated chart, then made sure the printed texture, the movement rules and all twelve pieces read from that same path.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧿</div>
                <h3>2 · Price the Cloth</h3>
                <p>I priced all thirteen squares directly from the Binomial(6, ½) distribution with a 97% target, and the real return is calculated rather than typed in, so the paytable shows a measurement and not just an intention.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏇</div>
                <h3>3 · Price the Race</h3>
                <p>I built a simulator that plays the race out using the live rules exactly as they are. It turned up the problem with the opening prices, which I fixed by replacing them with a constant measured over 700,000 races.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚡</div>
                <h3>4 · Make It Fast</h3>
                <p>I stored the race state as a simple twelve-item array, made the function that chooses a piece reuse one object instead of creating new ones, used typed arrays for lookups, and drew throws from a precalculated table, so each throw needs one random number instead of six.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⏳</div>
                <h3>5 · Cut the Beats</h3>
                <p>I tightened the pacing. The shells went from 2.48s to 1.80s, the result is now held on screen for 0.70s instead of 1.20s, and the move no longer has a fixed duration at all. It waits a short minimum, then waits for the piece to arrive. Turbo mode went from ×2 to ×3.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🔒</div>
              <p className="cs-callout-text">The seal covers the <strong className="cs-w">whole race, not just one throw</strong>, and there&apos;s a stronger reason for this here than anywhere else in the arcade. A race is <em>193 throws</em> on average, and every one of them is worked out publicly and predictably from one committed number. Publishing that number at the start wouldn&apos;t just give away the next throw. It would give away every remaining throw in the game, and the betting cloth is a bet on exactly those numbers. So the number is locked in when the race is dealt and revealed the moment a player&apos;s last piece leaves the board, and the race can&apos;t finish without revealing it.</p>
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
              I checked everything against a faithful copy of the shipped code, over <strong>5,999,940 throws</strong> (every possible block value with 60 consecutive counters each) plus 700,000 complete races. The shells match Binomial(6, ½) to within <strong>0.042 percentage points</strong>. The betting cloth measured between 96.65% and 97.69% return against a design target of 96.8% to 97.0%, and the two squares outside that range are the 62× ones, which naturally swing by about ±0.31 points at this sample size. The race bet returns <strong>97.01%</strong> evenly across all four runners, with no better option to pick. Every single race finished well within the 6,000-throw limit.
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
              <p>&quot;One throw settles two bets, <em>and the race odds come from simulating the exact rules the table is playing by.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h3>📈 Outcome</h3>
                <p>A finished 3D board and betting game that stays true to a ruleset documented in 1909. It has a generated chart, twelve pieces that walk in real time, a thirteen-square betting cloth, live race odds with cash-out, and races sealed to a blockchain block from the first throw until the last piece gets home.</p>
              </div>
              <div className="reflection-card">
                <h3>🧗 Challenge</h3>
                <p>With three pieces per player, a game takes a while: around 193 throws and about ten minutes, or three and a half minutes in turbo mode. I trimmed every moment as far as I could while still letting each throw be readable. That length is simply the honest cost of using the traditional rules, not a problem I created.</p>
              </div>
              <div className="reflection-card">
                <h3>💡 What I Learned</h3>
                <p>If you&apos;re pricing things with simulations, you need to know when <em>not</em> to simulate. Simulating something that&apos;s actually a constant doesn&apos;t make it more accurate. It just gives players a list where the longest price is always the one you got most wrong.</p>
              </div>
              <div className="reflection-card">
                <h3>🚀 Next Steps</h3>
                <p>Next, I&apos;d like to let players choose which of their three pieces moves on each throw (while keeping the house rules for rivals and for the pricing simulation), add a proper commit-and-reveal step, and let four real players sit around the same sealed mat.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://github.com/ruchira-edirisinghe/Game-Engine" target="_blank"
                rel="noopener noreferrer" className="cs-cta-btn ghost">View Source ↗</a>
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

    </StandardShell>
  );
}
