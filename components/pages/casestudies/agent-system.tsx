'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyAgentSystem() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Running the <span className="tagline-name">Agent Network</span></>}
    >
      {/* FLOATING TABLE OF CONTENTS */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Problem</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Research</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Structure</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Design</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-vibe"><span className="cs-toc-label">Interactions</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>

        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* HERO - Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">747 Agent<br/>Back-Office</h1>
            <p className="cs-hero-subtitle">A Multi-Level Agent &amp; Player Console - Designed in Dark &amp; Light</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/agent/cover.png" alt="747 Agent - back-office dashboard cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Engineer<br/>Product Designer</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Back-Office<br/>iGaming Ops</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Design System</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web App<br/>Desktop</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Themes</div>
              <div className="cs-meta-value">Dark<br/>&amp; Light</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              747 Agent is the control room behind a sports-betting, e-sports and online-casino platform - where a multi-tier network of agents manages player accounts, credit lines, transfers and commissions. The challenge was to make a data-dense financial back-office feel <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>calm, scannable and trustworthy - in two complete themes, dark and light.</em>
            </p>
          </div>


          {/* 01 - THE PROBLEM */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 --</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              iGaming back-offices are notoriously dense - endless tables of money, agents and bets that operators live inside all day. 747 Agent has to expose a whole hierarchy at once: every agent's credit, balance, available and pending commission, their downline of sub-agents, and the players beneath them. The job was to tame that density without dumbing it down - and to do it twice, once for dark and once for light.
            </p>

            <div className="cs-highlight">
              <p>"In a financial back-office, clarity <em>is</em> the feature. If an operator misreads a balance or a credit line, that's real money."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>A multi-level agent platform packs hierarchy, money and reporting into one console. Done carelessly, it becomes an overwhelming wall of tables that's slow to read and easy to misjudge.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>A calm, consistent system that makes the agent tree, balances and reports instantly scannable - with a disciplined token set that works flawlessly in both dark and light.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Master agents managing a downline and credit, sub-agents running their own players, and operations admins overseeing reports, transactions and compliance.</p>
              </div>
            </div>
          </section>


          {/* 02 - RESEARCH */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 --</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              The key realisation: the three people who use this tool sit at different levels of the same tree, and each needs the same data framed differently. A master agent thinks in downline and credit; a sub-agent thinks in their own players; an admin thinks in platform-wide reports. The interface had to serve all three from one consistent grammar of cards, tables and roles - and respect that many operators work long shifts and switch themes for comfort.
            </p>

            <h3 className="cs-sub-heading">Typical Back-Office Pitfalls vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Endless flat tables with no visual hierarchy or grouping</li>
                    <li><div className="cs-list-bullet"></div>Money figures and statuses that all look identical at a glance</li>
                    <li><div className="cs-list-bullet"></div>A dark theme bolted on later that breaks contrast and color meaning</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> 747 Agent's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>An expandable agent tree with clear roles (AM / AG) and indentation</li>
                    <li><div className="cs-list-bullet"></div>Color-coded metric chips so deposits, bets, wins and tax read instantly</li>
                    <li><div className="cs-list-bullet"></div>One token system with true dark &amp; light parity from day one</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">👑</div>
                <div>
                  <div className="persona-name">The Master Agent</div>
                  <div className="persona-role">Primary - Runs a Downline</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Credit-focused</span>
                    <span className="persona-trait">Power-user</span>
                    <span className="persona-trait">All-day shifts</span>
                  </div>
                  <p className="persona-quote">"I need to see my whole tree - who owes what, who's earning, and move credit down the line fast."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧑‍💼</div>
                <div>
                  <div className="persona-name">The Sub-Agent</div>
                  <div className="persona-role">Secondary - Manages Players</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Player-first</span>
                    <span className="persona-trait">Commission-driven</span>
                    <span className="persona-trait">Practical</span>
                  </div>
                  <p className="persona-quote">"Show me my players, my balance and my commission - and let me transfer money without a manual."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🛡️</div>
                <div>
                  <div className="persona-name">The Operations Admin</div>
                  <div className="persona-role">Tertiary - Oversight &amp; Reports</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Compliance</span>
                    <span className="persona-trait">Report-heavy</span>
                    <span className="persona-trait">Detail-oriented</span>
                  </div>
                  <p className="persona-quote">"I live in reports - sport bets, transactions, referrals. I need to filter, export and trust the numbers."</p>
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
                <div className="cs-comp-header">👑 Master Agent</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Oversee the downline and move credit.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Can't see the hierarchy or who's pending.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">An expandable Agent Tree with credit, balance &amp; commission columns.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🧑‍💼 Sub-Agent</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Manage players and earn commission.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Transfers and balances are scattered.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A focused Wallet, Transfer Money flow and player table.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🛡️ Admin</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Audit activity across the platform.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Reports are hard to filter and export.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A Reports hub with search, filters, save &amp; export on every view.</div>
              </div>
            </div>
          </section>


          {/* 03 - IDEATION / STRUCTURE */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">Structure &amp; Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation &amp; Structure</h2>

            <h3 className="cs-sub-heading">User Flow: A Day in the Console</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🔑</div><div className="flow-label">Login</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📊</div><div className="flow-label">Dashboard</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🌳</div><div className="flow-label">Agent Tree</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💸</div><div className="flow-label">Transfer &amp; Commission</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📑</div><div className="flow-label">Reports</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The <strong style={{ color: '#fff' }}>Agent Tree</strong> is the spine of the product - a hierarchy of roles (Agent Manager &amp; Agent) that expand and collapse, each row carrying main currency, direct players, credit line, total available, balance and both available and pending commission. Every other screen hangs off a node in that tree.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📊</div>
                <h4>Overview</h4>
                <p>Dashboard · Stats · Profit · Top Bets &amp; Players</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌳</div>
                <h4>Hierarchy</h4>
                <p>Network · Agent Tree · Add Users</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎮</div>
                <h4>Players</h4>
                <p>Players · Blocked · Accounts · Logs</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💰</div>
                <h4>Finance &amp; Reports</h4>
                <p>Wallet · Transfer · Commission · Reports</p>
              </div>
            </div>
          </section>


          {/* 04 - VISUAL DESIGN */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

            <p className="cs-body">
              The system is built on a slate-and-blue foundation - deep navy surfaces lifted by a soft accent blue, with a family of role and status colors (indigo, orange, red, pink, green) used as gentle metric chips rather than loud blocks. Every value is defined as a paired token, so the dark theme's #374151 surfaces map cleanly to the light theme's #F2F3F7 - the same console, two moods.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Inter does all the heavy lifting - a UI-grade sans built for dense tables and small labels, carrying six weights from Regular through Black with perfect legibility at 12-14px.</p>
                  <div className="typo-hero">Inter</div>
                  <div className="typo-scale-row">
                    <span className="typo-scale-item">48pt</span>
                    <span className="typo-scale-item">32pt</span>
                    <span className="typo-scale-item">24pt</span>
                    <span className="typo-scale-item">18pt</span>
                    <span className="typo-scale-item">16pt</span>
                    <span className="typo-scale-item">14pt</span>
                    <span className="typo-scale-item">12pt</span>
                  </div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item" style={{ fontWeight: 400 }}>Regular</span>
                    <span className="typo-weight-item" style={{ fontWeight: 500 }}>Medium</span>
                    <span className="typo-weight-item" style={{ fontWeight: 600 }}>Semibold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 800 }}>Extrabold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 900 }}>Black</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">Slate surfaces and an accent blue anchor the UI; a set of soft semantic accents code the metric chips. Each token is paired for dark &amp; light, so contrast and meaning hold across both themes.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#374151' }}><span className="color-hex">#374151</span></div>
                    <div className="color-block" style={{ background: '#1F2A37' }}><span className="color-hex">#1F2A37</span></div>
                    <div className="color-block" style={{ background: '#44576F' }}><span className="color-hex">#44576F</span></div>
                    <div className="color-block" style={{ background: '#233876' }}><span className="color-hex">#233876</span></div>
                    <div className="color-block" style={{ background: '#A4CAFE' }}><span className="color-hex">#A4CAFE</span></div>
                    <div className="color-block" style={{ background: '#F2F3F7' }}><span className="color-hex">#F2F3F7</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#B51C85' }}><span className="color-hex">#B51C85</span></div>
                    <div className="color-block" style={{ background: '#F08A43' }}><span className="color-hex">#F08A43</span></div>
                    <div className="color-block" style={{ background: '#CE3131' }}><span className="color-hex">#CE3131</span></div>
                    <div className="color-block" style={{ background: '#FAB3E4' }}><span className="color-hex">#FAB3E4</span></div>
                    <div className="color-block" style={{ background: '#F0D4C1' }}><span className="color-hex">#F0D4C1</span></div>
                    <div className="color-block" style={{ background: '#D2E5FF' }}><span className="color-hex">#D2E5FF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The same console, designed end-to-end in two complete themes. The top row shows the <strong style={{ color: '#fff' }}>dark theme</strong>; the bottom row, the <strong style={{ color: '#fff' }}>light theme</strong>. Click any screen to open it in high resolution.</p>

            {/* ─── DARK / LIGHT GALLERY ─── */}
            <div className="ui-gallery">

              {/* Row 1 - DARK MODE */}
              <div className="ui-row-label is-dark"><span className="dot"></span> Dark Mode</div>
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/agent/dark/Dashboard - Dark.png">
                  <img src="/Images/projects/agent/dark/Dashboard - Dark.png" alt="Dashboard - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Agent Tree - Dark.png">
                  <img src="/Images/projects/agent/dark/Agent Tree - Dark.png" alt="Agent Tree - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agent Tree</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Players - Dark.png">
                  <img src="/Images/projects/agent/dark/Players - Dark.png" alt="Players - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Players</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Reports --_ Sport Bets - Dark.png">
                  <img src="/Images/projects/agent/dark/Reports --_ Sport Bets - Dark.png" alt="Reports · Sport Bets - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Reports · Sport Bets</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Transactions - Dark.png">
                  <img src="/Images/projects/agent/dark/Transactions - Dark.png" alt="Transactions - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Transactions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Agents - Dark.png">
                  <img src="/Images/projects/agent/dark/Agents - Dark.png" alt="Agents - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agents</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/agent/dark/Dashboard - Dark.png">
                  <img src="/Images/projects/agent/dark/Dashboard - Dark.png" alt="Dashboard - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Agent Tree - Dark.png">
                  <img src="/Images/projects/agent/dark/Agent Tree - Dark.png" alt="Agent Tree - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agent Tree</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Players - Dark.png">
                  <img src="/Images/projects/agent/dark/Players - Dark.png" alt="Players - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Players</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Reports --_ Sport Bets - Dark.png">
                  <img src="/Images/projects/agent/dark/Reports --_ Sport Bets - Dark.png" alt="Reports · Sport Bets - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Reports · Sport Bets</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Transactions - Dark.png">
                  <img src="/Images/projects/agent/dark/Transactions - Dark.png" alt="Transactions - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Transactions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/dark/Agents - Dark.png">
                  <img src="/Images/projects/agent/dark/Agents - Dark.png" alt="Agents - Dark" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agents</div>
                </div>
              </div>

              {/* Row 2 - LIGHT MODE */}
              <div className="ui-row-label is-light"><span className="dot"></span> Light Mode</div>
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/agent/Light/Dashboard - Light.png">
                  <img src="/Images/projects/agent/Light/Dashboard - Light.png" alt="Dashboard - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Agent Tree - Light.png">
                  <img src="/Images/projects/agent/Light/Agent Tree - Light.png" alt="Agent Tree - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agent Tree</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Players - Light.png">
                  <img src="/Images/projects/agent/Light/Players - Light.png" alt="Players - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Players</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Reports --_ Sport Bets - Light.png">
                  <img src="/Images/projects/agent/Light/Reports --_ Sport Bets - Light.png" alt="Reports · Sport Bets - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Reports · Sport Bets</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Transaction - Lght.png">
                  <img src="/Images/projects/agent/Light/Transaction - Lght.png" alt="Transactions - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Transactions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Agents - Light.png">
                  <img src="/Images/projects/agent/Light/Agents - Light.png" alt="Agents - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agents</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/agent/Light/Dashboard - Light.png">
                  <img src="/Images/projects/agent/Light/Dashboard - Light.png" alt="Dashboard - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Agent Tree - Light.png">
                  <img src="/Images/projects/agent/Light/Agent Tree - Light.png" alt="Agent Tree - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agent Tree</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Players - Light.png">
                  <img src="/Images/projects/agent/Light/Players - Light.png" alt="Players - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Players</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Reports --_ Sport Bets - Light.png">
                  <img src="/Images/projects/agent/Light/Reports --_ Sport Bets - Light.png" alt="Reports · Sport Bets - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Reports · Sport Bets</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Transaction - Lght.png">
                  <img src="/Images/projects/agent/Light/Transaction - Lght.png" alt="Transactions - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Transactions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/agent/Light/Agents - Light.png">
                  <img src="/Images/projects/agent/Light/Agents - Light.png" alt="Agents - Light" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Agents</div>
                </div>
              </div>

            </div>
          </section>


          {/* 05 - VIBE & INTERACTIONS */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 --</span>
              <span className="cs-section-num">Interactions</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

            <p className="cs-body">
              The feeling to land is quiet competence - a console an operator trusts at 2am. Generous spacing, predictable tables, color used sparingly and with meaning, and two themes that feel genuinely equal rather than one being an afterthought.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🌳</div>
                <h4>The Agent Tree</h4>
                <p>An expandable hierarchy of roles - Agent Manager and Agent - with indentation, status dots and per-row credit, balance and commission, so the whole downline is readable at a glance.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎟️</div>
                <h4>Metric Chips</h4>
                <p>Deposits, bets, wins, tax, bonuses and commission are coded as soft color chips - indigo, orange, red, green - so a dense dashboard becomes a quick visual scan instead of a number-hunt.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌗</div>
                <h4>Dark &amp; Light Parity</h4>
                <p>Every surface, text and accent is a paired token. The dark and light themes were designed together, not retrofitted - contrast and color meaning hold identically across both.</p>
              </div>
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
                <div className="outcome-metric" data-count="2" data-suffix=" Themes">0</div>
                <div className="outcome-label">Every screen designed in full for dark and light</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="60" data-suffix="+ Screens">0</div>
                <div className="outcome-label">Across dashboard, agent tree, players, finance &amp; reports</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"A data-dense financial back-office that finally feels <em>calm</em> - built on one token system, in two complete themes."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete agent back-office: dashboard with live financial stats, an expandable agent tree, player and account management, wallet and transfers, commission plans, and a full reports suite - all designed for both dark and light.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Keeping dozens of dense, table-heavy screens scannable and consistent - and maintaining true contrast and color meaning across two complete themes rather than one.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>In a financial tool, restraint is the design. Paired tokens, sparing color and a single strong structure (the agent tree) do more for usability than any amount of visual flourish.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Hand off to engineering with the token set, prototype the tree's expand/transfer interactions, and pressure-test the tables with real high-volume data and edge-case states.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.figma.com/design/97C6QDeuzBbUyRGR7rDrE3/Agent-Dashboard?node-id=69-7085" target="_blank"
                rel="noopener" className="cs-cta-btn primary">Open in Figma →</a>
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
            <img id="cs-modal-img" alt="Case Study Preview" loading="lazy" decoding="async" />
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
