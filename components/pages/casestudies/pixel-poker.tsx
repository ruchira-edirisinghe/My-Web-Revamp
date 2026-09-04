'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyPixelPoker() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Last Stack <span className="tagline-name">Standing</span></>}
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
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Engine</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">The Bots</span><span
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
            <h1 className="cs-hero-title">Pixel Perfect<br/>Poker</h1>
            <p className="cs-hero-subtitle">A 6-Max No-Limit Hold&apos;em Sit &amp; Go With Real Side Pots, Monte-Carlo Bots and a Deal That Must Stay Secret</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/pixel-poker/cover.png" alt="Pixel Perfect Poker - browser Texas Hold'em tournament cover"
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
              <div className="cs-meta-value">Web Game<br/>Skill · No House</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">Next.js · React<br/>TypeScript</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Multiplayer</div>
              <div className="cs-meta-value">Firebase RTDB<br/>Host-Authoritative</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Randomness</div>
              <div className="cs-meta-value">crypto<br/>getRandomValues</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Pixel Perfect Poker is a single-table No-Limit Hold&apos;em tournament against five AI rivals with distinct personalities, in a retro pixel-art skin. It is the odd one out in this arcade: no bet, no odds, no payout multiplier and <em className="cs-em-gold">no house edge - because there is no house.</em> Chips move between players only. Everything interesting here lives in two places: a rules engine that has to get side pots right, and bots that have to play well without ever seeing a card they shouldn&apos;t.
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
            <h2 className="cs-section-title">A Different Game From Everything Around It</h2>

            <p className="cs-body">
              Every other game in the engine generates <em>a number</em>; this one generates <em>a card order</em>. Every other game gives the player no influence at all - bet and watch; here every decision matters. And every other game needs its randomness to be <strong>verifiable</strong>; this one needs it to be <strong>secret</strong>. That last inversion is the single most important design decision in the build, and it forced a completely different entropy source from the rest of the arcade.
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Outcome type</div>
                <div className="cs-comp-row-label">Player influence</div>
                <div className="cs-comp-row-label highlight">What must be true</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎰 The Other Games</div>
                <div className="cs-comp-cell" data-label="Outcome type">A number is generated.</div>
                <div className="cs-comp-cell" data-label="Player influence">None - bet and watch.</div>
                <div className="cs-comp-cell highlight" data-label="What must be true">Verifiable. Publish the seed.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🃏 Pixel Poker</div>
                <div className="cs-comp-cell" data-label="Outcome type">A card order is generated.</div>
                <div className="cs-comp-cell" data-label="Player influence">Total - every decision counts.</div>
                <div className="cs-comp-cell highlight" data-label="What must be true">Secret. Never publish anything.</div>
              </div>
            </div>

            <div className="cs-highlight">
              <p>&quot;The provably-fair mechanism that makes a race or a crash round trustworthy would <em>destroy</em> a poker game. Anyone who read the seed could recompute the deck and see every opponent&apos;s cards.&quot;</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🔐</div>
                <h4>Secrecy Over Audit</h4>
                <p>The deal uses the browser&apos;s cryptographically secure RNG instead of the shared blockchain seed. Unpredictable <em>and</em> unreadable - the right trade where secrecy matters more than public audit.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>Side Pots, Correctly</h4>
                <p>The most commonly botched part of a poker engine. Layered pots from each player&apos;s total commitment, uncalled chips handled explicitly, ties split with the odd chip to the earliest seat.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>Bots That Don&apos;t Cheat</h4>
                <p>The first thing a player suspects. The decision function reads only public information, and the equity estimator deals opponents <em>random</em> hands from the unseen stub - it never inspects the actual deck.</p>
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
              Next.js 15 (App Router), React 19 and strict TypeScript. There is no 3D layer here - the table is DOM and SVG, with <strong>pixel-bitmap cards, chips and avatars drawn as SVG</strong> and every sound effect synthesized as chiptune WebAudio. Multiplayer runs on Firebase Realtime Database with no game server at all: lobby and room state live in RTDB, and live play is <em>host-authoritative</em> - the host&apos;s browser runs the engine and broadcasts table state, while other clients submit actions for the host to apply.
            </p>

            <h3 className="cs-sub-heading">Naive Build vs. How It&apos;s Engineered</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> The Naive Build</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>Deal from <code>Math.random()</code>, or worse, a published seed</span></li>
                    <li><div className="cs-list-bullet"></div><span>Give bots a peek at the deck so they &quot;play well&quot;</span></li>
                    <li><div className="cs-list-bullet"></div><span>One big pot; hope nobody goes all-in short</span></li>
                    <li><div className="cs-list-bullet"></div><span>Let the React layer own the rules and the animation together</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> The Engineered Approach</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span><code>crypto.getRandomValues</code> + a correct <strong>Fisher-Yates</strong> shuffle</span></li>
                    <li><div className="cs-list-bullet"></div><span>Bots run a <strong>Monte-Carlo equity</strong> sim over the unseen stub</span></li>
                    <li><div className="cs-list-bullet"></div><span>Layered side pots awarded independently, per eligibility list</span></li>
                    <li><div className="cs-list-bullet"></div><span>Engine owns the rules; React owns <strong>pacing</strong>, and only pacing</span></li>
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
                    <span className="persona-trait">SVG bitmaps</span>
                    <span className="persona-trait">Chiptune WebAudio</span>
                  </div>
                  <p className="persona-quote">&quot;No 3D layer and no sprite sheets - the cards, chips and avatars are pixel bitmaps drawn as SVG, so they stay crisp at any size.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">⚙️</div>
                <div>
                  <div className="persona-name">The Engine</div>
                  <div className="persona-role">A strict state machine</div>
                  <div className="persona-traits">
                    <span className="persona-trait">7 phases</span>
                    <span className="persona-trait">Side pots</span>
                    <span className="persona-trait">Blind levels</span>
                  </div>
                  <p className="persona-quote">&quot;The engine owns every rule and mutates synchronously; the React layer calls one method, animates the result, then asks for the next step.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🌐</div>
                <div>
                  <div className="persona-name">Multiplayer</div>
                  <div className="persona-role">Firebase RTDB · host-authoritative</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Invite codes</span>
                    <span className="persona-trait">Presence</span>
                    <span className="persona-trait">Action queue</span>
                  </div>
                  <p className="persona-quote">&quot;There is no game server: rooms, presence, host state broadcast and a client action queue, all in the database.&quot;</p>
                </div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 - THE ENGINE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">The Engine</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Architecture &amp; the Hand State Machine</h2>

            <p className="cs-body">
              One table of up to six players, driven by a strict phase machine. The split is deliberate and it is what keeps a rules engine testable: <strong>the engine owns every rule</strong> - dealing, betting, side pots, showdown, eliminations, blind escalation - and mutates synchronously. <strong>React owns pacing</strong>: it calls one engine method, animates the result, and then asks for the next step. Nothing about how long a chip takes to slide lives in the rules.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🎴</div><div className="flow-label">Betting</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">➡️</div><div className="flow-label">Street End</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🃏</div><div className="flow-label">Runout</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">👁️</div><div className="flow-label">Showdown</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💰</div><div className="flow-label">Hand Over</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">👑</div><div className="flow-label">Game Over</div></div>
            </div>

            <h3 className="cs-sub-heading">Turning a Hand Into One Integer</h3>

            <p className="cs-body">
              The evaluator&apos;s job is to reduce any five to seven cards to a <strong>single number</strong>, so comparing two hands is just <code>&gt;</code>. Ranks are numeric (11=J through 14=A) so they can be sorted and compared arithmetically with no lookup, and the score packs the category followed by five tie-break ranks in <strong>base 15</strong> - chosen because ranks run 2-14, so fifteen values fit each digit without collision.
            </p>

            <code className="cs-code"><span className="cm">{'// evaluator.ts - category, then five tie-breaks, packed base-15'}</span>{'\nscore = cat\nfor (i = 0; i < 5; i++) score = score * 15 + (tie[i] ?? 0)\n\n'}<span className="cm">{'// worked example - a pair of Kings with A, 9, 4 kickers'}</span>{'\ncat = 1 (PAIR), tie = [13, 14, 9, 4]\nscore = 1 → 28 → 434 → 6519 → 97789 → '}<span className="nm">1466835</span>{'\n\n'}<span className="cm">{'// best 5 of 7: brute force over C(7,5) = 21 subsets - exhaustively correct'}</span></code>

            <p className="cs-body">
              Category dominates because it occupies the highest-order digit; within a category the tie-break ranks decide in significance order. A royal flush is not a separate category - it is simply an ace-high straight flush, which the encoding handles for free. The wheel is handled explicitly: A-5-4-3-2 plays as a <em>five</em>-high straight, so the ace demotes below the 5 and it correctly loses to 6-5-4-3-2. Finding the best five of seven is brute force over all 21 subsets - trivially cheap and exhaustively correct - with the subset index lists cached per size, which matters because the bot equity simulation calls the evaluator hundreds of thousands of times per hand.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">💰</div>
              <p className="cs-callout-text">Side-pot logic is the part of a poker engine that is most often wrong. When a short-stacked player is all-in they can only win the portion of the pot they matched, so the engine builds <strong className="cs-w">layered pots</strong> from each player&apos;s total commitment, each with its own eligibility list. Uncalled chips are handled explicitly rather than refunded, adjacent pots with identical eligibility are merged for display so the UI shows &quot;Main pot / Side pot 1&quot; instead of a confusing stack of layers, and each pot is awarded independently at showdown - ties split, odd chip to the earliest eligible seat.</p>
            </div>

            <h3 className="cs-sub-heading">Core Modules</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>lib/engine.ts</h4>
                <p>Phase machine · Betting rules · Side pots · Blind levels</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏅</div>
                <h4>lib/evaluator.ts</h4>
                <p>Base-15 hand score · Best 5 of 7 · The wheel</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>lib/ai.ts</h4>
                <p>Chen formula · Monte-Carlo equity · Pot odds · Bluffing</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌐</div>
                <h4>lib/multiplayer.ts</h4>
                <p>RTDB rooms · Presence · Host broadcast · Action queue</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               04 - THE BOTS
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">The Bots</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The AI Rivals &amp; Visual Language</h2>

            <p className="cs-body">
              Five opponents, each with three personality parameters - <strong>loose</strong> (how many hands they play), <strong>aggr</strong> (how often they bet or raise rather than call) and <strong>bluff</strong> (how often they bet with nothing). Unlike the inert stat blocks on the racing games in the same arcade, these <em>genuinely drive behaviour</em>: they appear in every decision threshold, so a loose bot visibly plays more hands than a rock does.
            </p>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🐍</div>
                <div>
                  <div className="persona-name">Viper</div>
                  <div className="persona-role">Tight &amp; Aggressive</div>
                  <div className="persona-traits">
                    <span className="persona-trait">loose 0.25</span>
                    <span className="persona-trait">aggr 0.85</span>
                    <span className="persona-trait">bluff 0.50</span>
                  </div>
                  <p className="persona-quote">&quot;Waits for a hand, then hits it hard.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🌙</div>
                <div>
                  <div className="persona-name">Luna</div>
                  <div className="persona-role">Loose &amp; Passive</div>
                  <div className="persona-traits">
                    <span className="persona-trait">loose 0.60</span>
                    <span className="persona-trait">aggr 0.45</span>
                    <span className="persona-trait">bluff 0.35</span>
                  </div>
                  <p className="persona-quote">&quot;Plays plenty of hands and calls too many of them down.&quot;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🗿</div>
                <div>
                  <div className="persona-name">Dmitri</div>
                  <div className="persona-role">The Rock</div>
                  <div className="persona-traits">
                    <span className="persona-trait">loose 0.20</span>
                    <span className="persona-trait">aggr 0.30</span>
                    <span className="persona-trait">bluff 0.10</span>
                  </div>
                  <p className="persona-quote">&quot;If Dmitri is in the pot, believe him.&quot;</p>
                </div>
              </div>
            </div>

            <p className="cs-body">
              Sasha (loose 0.75, aggr 0.70) is the maniac and Kane (0.45 / 0.55) is the balanced one. The personality is real, not decorative: Sasha opens at a threshold of 0.36 where Dmitri needs 0.457, so Sasha visibly plays more hands than anyone at the table.
            </p>

            <h3 className="cs-sub-heading">Pre-Flop: the Chen Formula</h3>

            <p className="cs-body">
              Before the flop there is a well-known heuristic for rating starting hands, and the bots use it: the <strong>Chen formula</strong>, which scores roughly -1 to 20 (pocket aces 20, K-K 16, A-K suited 12, 7-2 offsuit -1.5). Points come from the high card, doubled for a pocket pair, plus a suited bonus and a gap penalty, with a small bonus for low connectors because they make more straights. That score is normalised, given ±6% of noise, and compared against thresholds that <em>loose</em> and <em>aggr</em> lower.
            </p>

            <p className="cs-body">
              Two details there are real tournament strategy rather than approximations. Short-stack play <strong>switches to push/fold at 8 big blinds</strong>, which is correct. And raise sizing accounts for limpers - 2.2 to 3.2 big blinds plus one per player already in - which is how a competent human sizes an open.
            </p>

            <h3 className="cs-sub-heading">Post-Flop: Monte-Carlo Equity</h3>

            <p className="cs-body">
              After the flop there is no lookup formula, so the bot <strong>simulates</strong>. It removes every known card from a fresh deck to leave the stub, then 130 times deals random hole cards to each opponent, completes the board, and evaluates every hand - counting wins, with ties scored proportionally so a three-way tie is 0.33 rather than 1.0 or 0.
            </p>

            <code className="cs-code"><span className="cm">{'// ai.ts - equity by simulation, 130 trials'}</span>{'\nstub = fresh deck minus (my hole cards + visible board)\nneed = opp * 2 + (5 - board.length)\n\n'}<span className="cm">{'// partial Fisher-Yates: only the first `need` positions are drawn'}</span>{'\n'}<span className="cm">{'// …which is still a uniform random sample, and saves most of the work'}</span>{'\n\nequity = wins / trials           '}<span className="cm">{'// standard error ≈ √(0.25/130) ≈ 4.4%'}</span>{'\n\n'}<span className="cm">{'// the classic decision: call if equity ≥ pot odds'}</span>{'\npotOdds = toCall / (pot + toCall)\nif (equity >= potOdds + 0.04 - loose * 0.05) '}<span className="nm">call</span></code>

            <p className="cs-body">
              Two efficiency choices are worth noting. The shuffle inside the loop is a <strong>partial Fisher-Yates</strong> - only the positions actually needed are drawn, which the algorithm guarantees is still a uniform sample and which saves most of the work over shuffling a 45-card stub. And the opponent count is capped at three: a deliberate accuracy-for-speed trade that approximates four- and five-way pots as three-way, leaving bots marginally optimistic in very multi-way pots.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🎭</div>
              <p className="cs-callout-text">130 trials is <strong className="cs-w">deliberately imprecise</strong> - a standard error of about 4.4%. Bots make small misjudgements, which is what makes them feel human rather than robotic; perfect bots would be unpleasant to play against. The bluffing logic is shaped the same way and it is genuine poker reasoning: they bluff only with weak hands, only heads-up or three-handed, and more often on the river where there are no cards left to come. Thinking time is 650-1750ms, extended 35% when facing a bet, so harder spots read as deliberation.</p>
            </div>

            <p className="cs-body">
              One architectural rule keeps all of this honest: every <code>Math.random()</code> call in the AI is <strong>gameplay flavour, not fairness</strong>. It adds noise to thresholds, varies bet sizing and decides bluff frequency. It never touches the deal - that uses the crypto RNG, and the separation is stated explicitly in the source. One secure generator for anything that determines cards, an ordinary one for anything cosmetic or behavioural.
            </p>

            <h3 className="cs-sub-heading">Tournament Structure</h3>

            <p className="cs-body">
              Six players, 2,000 chips each, blinds rising every six hands across ten levels - from 10/20 (a deep 100 big blinds) to 500/1000 (two big blinds). That last figure is a <strong>structural guarantee that the tournament terminates</strong>: by level ten the blinds alone consume a starting stack in two hands, so it cannot run forever. Heads-up play is handled correctly too - the dealer posts the small blind and acts first pre-flop, which is the real rule and a common thing to get wrong.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">A pixel display face for the wordmark, stack sizes and the blind clock; a plain interface face for the reading text and rules chart. Every chip count is monospaced so the numbers do not jitter as they count down between levels.</p>
                  <div className="typo-hero">Orbitron</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item cs-ff-bungee">Pixel · Wordmark &amp; Stacks</span>
                    <span className="typo-weight-item cs-ff-mont cs-fw-600">Interface · Actions</span>
                    <span className="typo-weight-item cs-ff-mono">Mono · Chips &amp; Blinds</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">Arcade-CRT green on near-black felt, with gold reserved for chips and the pot, magenta for the acting seat and the raise slider, and red for a fold or a bust. The winning five cards light up at every showdown, which is the one moment the palette is allowed to shout.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#020604' })}><span className="color-hex">#020604</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#050A08' })}><span className="color-hex">#050A08</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#0A140F' })}><span className="color-hex">#0A140F</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#0F1E16' })}><span className="color-hex">#0F1E16</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#B8FFD6' })}><span className="color-hex">#B8FFD6</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#3DDC78' })}><span className="color-hex">#3DDC78</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFD24A' })}><span className="color-hex">#FFD24A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF3DA5' })}><span className="color-hex">#FF3DA5</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF4D6D' })}><span className="color-hex">#FF4D6D</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#2E9B5A' })}><span className="color-hex">#2E9B5A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#7A8C82' })}><span className="color-hex">#7A8C82</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">In-Game Screens</h3>
            <p className="cs-body">The tournament across its beats - the title screen with its mode select, the six-max table pre-flop, the in-game hand rankings, the practice-table briefing, and the Create Lobby setup. Click any screen to open it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1 */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/pixel-poker/title-screen.png">
                  <img src="/Images/projects/pixel-poker/title-screen.png" alt="Pixel Perfect Poker title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Screen</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/table-preflop.png">
                  <img src="/Images/projects/pixel-poker/table-preflop.png" alt="The six-max pixel table" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">6-Max Table</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/hand-rankings.png">
                  <img src="/Images/projects/pixel-poker/hand-rankings.png" alt="The in-game hand rankings chart" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Hand Rankings</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/how-to-play.png">
                  <img src="/Images/projects/pixel-poker/how-to-play.png" alt="The practice-table rules card" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Practice Table</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/create-lobby.png">
                  <img src="/Images/projects/pixel-poker/create-lobby.png" alt="The Create Lobby table setup" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Create Lobby</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/pixel-poker/title-screen.png">
                  <img src="/Images/projects/pixel-poker/title-screen.png" alt="Pixel Perfect Poker title screen" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Title Screen</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/table-preflop.png">
                  <img src="/Images/projects/pixel-poker/table-preflop.png" alt="The six-max pixel table" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">6-Max Table</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/hand-rankings.png">
                  <img src="/Images/projects/pixel-poker/hand-rankings.png" alt="The in-game hand rankings chart" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Hand Rankings</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/how-to-play.png">
                  <img src="/Images/projects/pixel-poker/how-to-play.png" alt="The practice-table rules card" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Practice Table</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/create-lobby.png">
                  <img src="/Images/projects/pixel-poker/create-lobby.png" alt="The Create Lobby table setup" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Create Lobby</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/pixel-poker/logo.png">
                  <img src="/Images/projects/pixel-poker/logo.png" alt="Pixel Perfect Poker wordmark" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Wordmark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/cover.png">
                  <img src="/Images/projects/pixel-poker/cover.png" alt="Pixel Perfect Poker cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/table-preflop.png">
                  <img src="/Images/projects/pixel-poker/table-preflop.png" alt="Pixel bitmap cards and chips" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cards &amp; Chips</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/hand-rankings.png">
                  <img src="/Images/projects/pixel-poker/hand-rankings.png" alt="The hand rankings chart" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Raise Slider</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/how-to-play.png">
                  <img src="/Images/projects/pixel-poker/how-to-play.png" alt="The practice-table briefing" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Five Rivals</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/pixel-poker/logo.png">
                  <img src="/Images/projects/pixel-poker/logo.png" alt="Pixel Perfect Poker wordmark" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Wordmark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/cover.png">
                  <img src="/Images/projects/pixel-poker/cover.png" alt="Pixel Perfect Poker cover art" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cover Art</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/table-preflop.png">
                  <img src="/Images/projects/pixel-poker/table-preflop.png" alt="Pixel bitmap cards and chips" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Cards &amp; Chips</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/hand-rankings.png">
                  <img src="/Images/projects/pixel-poker/hand-rankings.png" alt="The hand rankings chart" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Raise Slider</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/pixel-poker/how-to-play.png">
                  <img src="/Images/projects/pixel-poker/how-to-play.png" alt="The practice-table briefing" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Five Rivals</div>
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
              Rules first, then opponents, then the skin, then the network. Poker is unusually unforgiving to build in the other order - a table that looks right and mis-awards a side pot is worse than no table at all - so the engine was written and driven headlessly before any of it was drawn.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏅</div>
                <h4>1 · The Evaluator</h4>
                <p>Built hand scoring first, as one integer: base-15 packing, brute force over all 21 five-card subsets, cached subset indices, and the wheel handled as an explicit special case.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>2 · The Rules Engine</h4>
                <p>A strict phase machine over one table - min-raise rules, the big-blind option, short all-ins that cannot reopen betting, layered side pots, rising blinds and eliminations - all synchronous and independent of any UI.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤖</div>
                <h4>3 · The Opponents</h4>
                <p>Chen formula pre-flop, Monte-Carlo equity post-flop, pot-odds calling, and three personality parameters wired into every threshold so five bots play visibly differently.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🕹️</div>
                <h4>4 · The Arcade Skin</h4>
                <p>Pixel-bitmap cards, chips and avatars drawn as SVG rather than sprite sheets, with chiptune WebAudio effects synthesized rather than sampled - so the whole skin ships with no image assets.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌐</div>
                <h4>5 · Multiplayer</h4>
                <p>Firebase RTDB rooms with invite codes and presence, host-authoritative play, and a client action queue - the same lobby shape as the arcade&apos;s racing games, adapted to six-max poker.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🔍</div>
              <p className="cs-callout-text">One implementation note recorded honestly rather than papered over: taking a random index as <code>buf[0] % n</code> introduces <strong className="cs-w">modulo bias</strong>, because 2³² is not divisible by most values of <em>n</em>. For a 52-card deck that bias is on the order of one part in 10⁸ - undetectable in play and irrelevant for a play-money game - but it is a real property of the code, and the textbook fix (rejection sampling) is documented next to it.</p>
            </div>
          </section>

          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 --</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">What a Review Confirmed</h3>

            <p className="cs-body">
              The crypto RNG is the right primitive for a hidden-information game, and deliberately <em>not</em> using the shared blockchain seed was the right call. The shuffle is a correct Fisher-Yates rather than one of the naive alternatives that produce biased permutations, and a fresh deck is shuffled every hand with no carry-over. Fairness-critical randomness is cleanly separated from cosmetic randomness. There is no house edge, because there is no house. And - the thing a player suspects first - <strong>there is no code path by which a bot can see another player&apos;s cards.</strong>
            </p>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="0" data-suffix=" House Edge">0</div>
                <div className="outcome-label">A tournament, not a wager - chips move between players only</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="130" data-suffix=" Trials">0</div>
                <div className="outcome-label">Monte-Carlo equity per decision, deliberately imprecise</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="10" data-suffix=" Levels">0</div>
                <div className="outcome-label">Rising blinds that structurally guarantee the game terminates</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="5" data-suffix=" AI Styles">0</div>
                <div className="outcome-label">Personality parameters wired into every decision threshold</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>&quot;Provable fairness and hidden information are in direct opposition. <em>For a game where secrecy matters more than public audit, an unreadable RNG is the correct trade.</em>&quot;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete poker engine in the browser: correct betting rules, layered side pots, split pots, the wheel, heads-up blinds, rising levels and eliminations - plus five Monte-Carlo bots, a full pixel-art skin with no image assets, and Firebase-backed multiplayer rooms.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Side pots and min-raise edge cases are where poker engines quietly go wrong, and none of it shows up until a specific all-in shape occurs. Getting bots to feel human rather than robotic turned out to be a matter of adding the <em>right amount</em> of imprecision.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Two RNGs is an architecture, not a shortcut - one secure generator for anything that determines cards, an ordinary one for anything cosmetic. And a game with hidden information cannot borrow the fairness model of a game without it, however good that model is.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Move the deal server-side, which is what real stakes or human-versus-human play would require, and add a commit-reveal scheme that commits the deck order before the hand and reveals it after - the industry answer to proving a deal was fair without breaking the game.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://game-engine-snowy.vercel.app/games/pixel-poker" target="_blank"
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
