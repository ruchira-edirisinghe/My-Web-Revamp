'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyLottogram() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Placing Your <span className="tagline-name">Bets</span></>}
    >
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Problem</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Research</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Structure</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Design</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-vibe"><span className="cs-toc-label">Interactions</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span
              className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>

        <div className="cs-wrap">

          <a href="/projects/web" className="back-link"><span>←</span> Back to Projects</a>

          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Lottogram</h1>
            <p className="cs-hero-subtitle">A Betting &amp; Lottery Platform — Designed for Both Desktop and Mobile</p>
          </header>

          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/lottogram/cover.png" alt="Lottogram — betting &amp; lottery platform cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Engineer<br/>Product Designer</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">iGaming / Betting<br/>Web + Mobile</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Design System</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>&amp; Mobile</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Views</div>
              <div className="cs-meta-value">Desktop<br/>&amp; Mobile</div>
            </div>
          </div>

          <div className="cs-elevator">
            <p>
              A betting and lottery platform is one of the densest products to design — odds, slips, wallets, live events, loyalty and promotions all fighting for attention. Lottogram tames that complexity into a bold, confident experience that feels <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>consistent and trustworthy across desktop and mobile alike.</em>
            </p>
          </div>


          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              Betting platforms live and die on clarity and trust. Users move fast across games, live events and their wallet — often switching between a desktop session and their phone mid-bet. Most platforms feel cluttered and inconsistent between the two, eroding confidence right where money is on the line.
            </p>

            <div className="cs-highlight">
              <p>"In betting, the interface <em>is</em> the trust — it has to feel as confident on a phone in your hand as on a desktop at home."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>A data-dense product — odds, bet history, wallets, live events — was hard to make scannable and trustworthy, and even harder to keep consistent across desktop and mobile.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Design a bold, cohesive platform with a single design system that scales seamlessly from a wide desktop layout to a focused mobile experience.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Casual players chasing promotions and games, and serious bettors who track odds, bet history and their wallet closely — on whichever device they're on.</p>
              </div>
            </div>
          </section>


          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 ——</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              The research centred on two truths: betting users are impatient and detail-hungry at the same time, and they expect total parity between desktop and mobile. Designing one without the other was never an option.
            </p>

            <h3 className="cs-sub-heading">Typical Betting Apps vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Platform Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Cluttered screens that bury odds and the bet slip</li>
                    <li><div className="cs-list-bullet"></div>Desktop and mobile that feel like different products</li>
                    <li><div className="cs-list-bullet"></div>Wallet and history that are hard to trust at a glance</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Lottogram's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>A bold red-and-gold system that guides the eye to what matters</li>
                    <li><div className="cs-list-bullet"></div>One design language scaled across desktop &amp; mobile</li>
                    <li><div className="cs-list-bullet"></div>Clear wallet, bet history &amp; loyalty built for confidence</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🎰</div>
                <div>
                  <div className="persona-name">The Casual Player</div>
                  <div className="persona-role">Primary — Plays for Fun</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Promo-driven</span>
                    <span className="persona-trait">Impulsive</span>
                  </div>
                  <p className="persona-quote">"Show me what's hot, let me grab a bonus, and make placing a bet feel effortless."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📊</div>
                <div>
                  <div className="persona-name">The Serious Bettor</div>
                  <div className="persona-role">Secondary — Tracks Everything</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Data-hungry</span>
                    <span className="persona-trait">Desktop power-user</span>
                    <span className="persona-trait">Methodical</span>
                  </div>
                  <p className="persona-quote">"I live in my bet history and wallet — I need detail, accuracy and fast switching."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📡</div>
                <div>
                  <div className="persona-name">The Live Bettor</div>
                  <div className="persona-role">Tertiary — In-Play</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Real-time</span>
                    <span className="persona-trait">On-the-go</span>
                    <span className="persona-trait">Reactive</span>
                  </div>
                  <p className="persona-quote">"When an event is live, every second counts — the odds and slip have to keep up."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Cross-Persona Insights</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Primary Goal</div>
                <div className="cs-comp-row-label">Core Frustration</div>
                <div className="cs-comp-row-label highlight">Design Insight</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎰 Casual Player</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Find promos and place a quick bet.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Too much noise, hard to find offers.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Bold promotions &amp; games front-and-centre.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📊 Serious Bettor</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Track odds, history and wallet precisely.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Dense data that's hard to scan.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Structured wallet, bet &amp; betbuilder history.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📡 Live Bettor</div>
                <div className="cs-comp-cell" data-label="Primary Goal">React to in-play events instantly.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Slow, cramped live screens on mobile.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A live-events layout tuned for both devices.</div>
              </div>
            </div>
          </section>


          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 ——</span>
              <span className="cs-section-num">Structure &amp; Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation &amp; Structure</h2>

            <h3 className="cs-sub-heading">User Flow: From Browse to Bet</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏠</div><div className="flow-label">Home</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🎮</div><div className="flow-label">Games / Live</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧾</div><div className="flow-label">Bet Slip</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">👛</div><div className="flow-label">Wallet</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📈</div><div className="flow-label">Bet History</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The same information architecture was designed <strong style={{ color: '#fff' }}>twice in parallel</strong> — a wide desktop layout (with a foldable sidebar) and a focused mobile layout — sharing one component system so nothing felt out of place between them.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎮</div>
                <h4>Play</h4>
                <p>Home · Games · Live Events</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎁</div>
                <h4>Engage</h4>
                <p>Promotions · Affiliate · Messages</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👛</div>
                <h4>My Wallet</h4>
                <p>Balance · Loyalty · Bonuses</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📈</div>
                <h4>History</h4>
                <p>Bet · BetBuilder · My Info</p>
              </div>
            </div>
          </section>


          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 ——</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

            <p className="cs-body">
              The identity leans into the energy of the lottery — a bold red core lit with gold for wins and value, grounded by deep navy and clean neutrals. Everything sits on a strict, documented system (a Lexend type scale, plus consistent gaps of 4–80 and paddings of 20–80) so the design stays tight and consistent across every screen and both devices.
            </p>

            <div className="creative-styleguide">

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Lexend — a clean, friendly sans designed for reading proficiency, keeping a data-heavy betting interface legible at every size.</p>
                  <div className="typo-hero">Lexend</div>
                  <div className="typo-scale-row">
                    <span className="typo-scale-item">36pt</span>
                    <span className="typo-scale-item">32pt</span>
                    <span className="typo-scale-item">24pt</span>
                    <span className="typo-scale-item">16pt</span>
                    <span className="typo-scale-item">14pt</span>
                    <span className="typo-scale-item">12pt</span>
                  </div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item" style={{ fontWeight: 400 }}>Regular</span>
                    <span className="typo-weight-item" style={{ fontWeight: 500 }}>Medium</span>
                  </div>
                </div>
              </div>

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A bold red-and-gold core for energy and value, balanced with deep navies, a fresh green and clean neutrals.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">#000000</span></div>
                    <div className="color-block" style={{ background: '#A8A8A8' }}><span className="color-hex">#A8A8A8</span></div>
                    <div className="color-block" style={{ background: '#CE0D05' }}><span className="color-hex">#CE0D05</span></div>
                    <div className="color-block" style={{ background: '#6D1010' }}><span className="color-hex">#6D1010</span></div>
                    <div className="color-block" style={{ background: '#380100' }}><span className="color-hex">#380100</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#150000' }}><span className="color-hex">#150000</span></div>
                    <div className="color-block" style={{ background: '#61D28F' }}><span className="color-hex">#61D28F</span></div>
                    <div className="color-block" style={{ background: '#EFBF04' }}><span className="color-hex">#EFBF04</span></div>
                    <div className="color-block" style={{ background: '#BE990C' }}><span className="color-hex">#BE990C</span></div>
                    <div className="color-block" style={{ background: '#0088CC' }}><span className="color-hex">#0088CC</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#060B2A' }}><span className="color-hex">#060B2A</span></div>
                    <div className="color-block" style={{ background: '#00138B' }}><span className="color-hex">#00138B</span></div>
                    <div className="color-block" style={{ background: '#2E3FA1' }}><span className="color-hex">#2E3FA1</span></div>
                    <div className="color-block" style={{ background: '#282E51' }}><span className="color-hex">#282E51</span></div>
                    <div className="color-block" style={{ background: '#000210' }}><span className="color-hex">#000210</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The same platform, designed end-to-end for both devices. Switch between the desktop and mobile views below, and click any screen to open it in high resolution.</p>

            <div className="device-toggle" role="tablist" aria-label="Device view">
              <button className="device-btn active" type="button" data-device="desktop" aria-selected="true">Desktop</button>
              <button className="device-btn" type="button" data-device="mobile" aria-selected="false">Mobile</button>
            </div>

            <div className="ui-gallery device-gallery is-desktop" data-device="desktop">
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Home%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Home%20-%20Unfolded.png" alt="Desktop — Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Games%20-%20Folded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Games%20-%20Folded.png" alt="Desktop — Games" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Games</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Live%20Events%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Live%20Events%20-%20Unfolded.png" alt="Desktop — Live Events" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Live Events</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Promotions%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Promotions%20-%20Unfolded.png" alt="Desktop — Promotions" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Promotions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Home%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Home%20-%20Unfolded.png" alt="Desktop — Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Games%20-%20Folded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Games%20-%20Folded.png" alt="Desktop — Games" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Games</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Live%20Events%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Live%20Events%20-%20Unfolded.png" alt="Desktop — Live Events" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Live Events</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Promotions%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Promotions%20-%20Unfolded.png" alt="Desktop — Promotions" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Promotions</div>
                </div>
              </div>
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Unfolded.png" alt="Desktop — My Wallet" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Wallet</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History%20-%20Unfolded.png" alt="Desktop — Bet History" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Bet History</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Messages%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Messages%20-%20Unfolded.png" alt="Desktop — Messages" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Messages</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Affiliate%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Affiliate%20-%20Unfolded.png" alt="Desktop — Affiliate" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Affiliate</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Unfolded.png" alt="Desktop — My Wallet" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Wallet</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History%20-%20Unfolded.png" alt="Desktop — Bet History" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Bet History</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Messages%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Messages%20-%20Unfolded.png" alt="Desktop — Messages" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Messages</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Desktop%20-%20Affiliate%20-%20Unfolded.png">
                  <img src="/Images/projects/lottogram/Desktop%20-%20Affiliate%20-%20Unfolded.png" alt="Desktop — Affiliate" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Affiliate</div>
                </div>
              </div>
            </div>

            <div className="ui-gallery device-gallery is-mobile" data-device="mobile" hidden>
              <div className="ui-marquee-track ui-track-2" id="marquee-3">
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Home.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Home.png" alt="Mobile — Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Games.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Games.png" alt="Mobile — Games" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Games</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Live%20Events.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Live%20Events.png" alt="Mobile — Live Events" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Live Events</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Promotions.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Promotions.png" alt="Mobile — Promotions" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Promotions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Home.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Home.png" alt="Mobile — Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Games.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Games.png" alt="Mobile — Games" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Games</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Live%20Events.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Live%20Events.png" alt="Mobile — Live Events" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Live Events</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Promotions.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Promotions.png" alt="Mobile — Promotions" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Promotions</div>
                </div>
              </div>
              <div className="ui-marquee-track ui-track-1" id="marquee-4">
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet.png" alt="Mobile — My Wallet" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Wallet</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History.png" alt="Mobile — Bet History" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Bet History</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Message.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Message.png" alt="Mobile — Messages" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Messages</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Affiliate.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Affiliate.png" alt="Mobile — Affiliate" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Affiliate</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet.png" alt="Mobile — My Wallet" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Wallet</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20My%20Profile%20-%20My%20Wallet%20-%20Bet%20History.png" alt="Mobile — Bet History" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Bet History</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Message.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Message.png" alt="Mobile — Messages" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Messages</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lottogram/Mobile/Mobile%20-%20Affiliate.png">
                  <img src="/Images/projects/lottogram/Mobile/Mobile%20-%20Affiliate.png" alt="Mobile — Affiliate" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Affiliate</div>
                </div>
              </div>
            </div>
          </section>


          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">Interactions</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

            <p className="cs-body">
              The feeling to evoke is the buzz of the game — energetic and exciting, but never reckless. Bold reds and golds create momentum, while clear structure around money keeps it trustworthy.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">↔️</div>
                <h4>Foldable Desktop Sidebar</h4>
                <p>On desktop, a foldable navigation sidebar lets power users reclaim space for dense odds and history, or expand for easy browsing.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👛</div>
                <h4>Wallet &amp; Loyalty</h4>
                <p>Balance, bonuses, loyalty and bet/betbuilder history are organised into a clear, confidence-building wallet — the same logic on both devices.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📱</div>
                <h4>Desktop ↔ Mobile Parity</h4>
                <p>A shared component system means a user who starts on desktop and finishes on mobile never feels lost — same language, re-tuned for each screen.</p>
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
                <div className="outcome-metric" data-count="2" data-suffix=" Platforms">0</div>
                <div className="outcome-label">Designed in full for desktop and mobile</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="30" data-suffix="+ Screens">0</div>
                <div className="outcome-label">High-fidelity screens across both views on one system</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"A dense betting product made bold, clear and genuinely <em>consistent</em> — from a wide desktop layout right down to a phone in your hand."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete iGaming design system: Home, Games, Live Events, Promotions, Wallet, Bet &amp; BetBuilder history, Loyalty, Messages and Affiliate — designed end-to-end for both desktop and mobile.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Keeping a data-dense product feeling bold yet trustworthy, and holding perfect parity between two very different layouts from a single component system.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Designing desktop and mobile in parallel — not one then the other — is what keeps a system honest. A strict spacing and type scale is the glue that holds parity together.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Hand off to engineering, prototype the live in-play interactions, and extend the system to tablet and additional game verticals.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.figma.com/design/M2WdMhxNjcPGODYaGeBchT/Lottogram-UI?node-id=1328-2510" target="_blank"
                rel="noopener" className="cs-cta-btn primary">Open in Figma →</a>
            </div>
          </section>

        </div>
      </main>

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
