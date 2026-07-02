'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyMessagingSystem() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Orchestrating <span className="tagline-name">Every Message</span></>}
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

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Messaging Platform</h1>
            <p className="cs-hero-subtitle">A Multi-Channel Messaging Services Platform for Developers &amp; Teams</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/msg_platform/cover.png" alt="Messaging Platform — multi-channel messaging dashboard cover"
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
              <div className="cs-meta-value">SaaS Dashboard<br/>Web App</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>UI Design</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>Responsive</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Scope</div>
              <div className="cs-meta-value">40+ Screens<br/>Design System</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Sending a message is easy; running the system behind it is not — services, channels, message parameters, API keys, logs and billing all have to live in one place. This Messaging Platform turns that sprawling back-end into a single, calm control centre, where developers and teams can <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>configure, send and monitor with confidence.</em>
            </p>
          </div>


          {/* 01 — THE PROBLEM */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              Multi-channel messaging platforms are deceptively complex. Behind a single "send" lies a web of services, channels, reusable parameters, API tokens, delivery logs and billing — and most dashboards bolt these together into something only their builders can navigate. Developers lose time; teams lose trust.
            </p>

            <div className="cs-highlight">
              <p>"The hardest part of a messaging platform isn't sending the message — it's making the system <em>behind it</em> feel simple."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>Configuring services, building message parameters, managing API keys and reading logs were scattered and intimidating — turning routine setup into a support burden.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Unify the entire workflow into one coherent dashboard — guided service creation, a clear parameter builder, secure token management, and transparent logs and billing.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Developers integrating messaging via API, team admins managing services and access, and business owners watching usage and billing.</p>
              </div>
            </div>
          </section>


          {/* 02 — RESEARCH */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 ——</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              The platform serves distinct mindsets — the developer who lives in tokens and logs, the admin who governs services and access, and the owner who tracks spend. Designing for all three meant separating power from simplicity without splitting the product in two.
            </p>

            <h3 className="cs-sub-heading">Typical Dashboards vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Platform Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Dense, developer-only UIs that intimidate teams</li>
                    <li><div className="cs-list-bullet"></div>Multi-step setup with no guidance or feedback</li>
                    <li><div className="cs-list-bullet"></div>Security &amp; billing treated as afterthoughts</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Platform's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Guided onboarding &amp; service-creation wizards</li>
                    <li><div className="cs-list-bullet"></div>A visual parameter builder for text, image &amp; link</li>
                    <li><div className="cs-list-bullet"></div>First-class 2FA security and transparent billing</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">👨‍💻</div>
                <div>
                  <div className="persona-name">The Developer</div>
                  <div className="persona-role">Primary — Integrator</div>
                  <div className="persona-traits">
                    <span className="persona-trait">API-driven</span>
                    <span className="persona-trait">Detail-oriented</span>
                    <span className="persona-trait">Efficiency</span>
                  </div>
                  <p className="persona-quote">"Give me clean tokens, clear docs and readable logs — I'll handle the rest."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🛠️</div>
                <div>
                  <div className="persona-name">The Team Admin</div>
                  <div className="persona-role">Secondary — Operator</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Governance</span>
                    <span className="persona-trait">Configures</span>
                    <span className="persona-trait">Security</span>
                  </div>
                  <p className="persona-quote">"I set up services and channels, and I need access and security to be airtight."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📈</div>
                <div>
                  <div className="persona-name">The Business Owner</div>
                  <div className="persona-role">Tertiary — Stakeholder</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Cost-aware</span>
                    <span className="persona-trait">Big-picture</span>
                    <span className="persona-trait">Occasional</span>
                  </div>
                  <p className="persona-quote">"I just want to see what we're sending and what it's costing — clearly."</p>
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
                <div className="cs-comp-header">👨‍💻 Developer</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Integrate quickly and debug confidently.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Tokens, docs and logs scattered across tools.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A unified Tokens, Logs &amp; Documentation hub.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🛠️ Team Admin</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Set up services and channels safely.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Complex setup with no guidance.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Step-by-step service wizard + 2FA security.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📈 Business Owner</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Track usage and control cost.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Billing buried and hard to interpret.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Clear Billing &amp; Pricing with usage at a glance.</div>
              </div>
            </div>
          </section>


          {/* 03 — IDEATION / STRUCTURE */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 ——</span>
              <span className="cs-section-num">Structure &amp; Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation &amp; Structure</h2>

            <h3 className="cs-sub-heading">User Flow: From Login to Live Service</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🔐</div><div className="flow-label">Login + 2FA</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📊</div><div className="flow-label">Dashboard</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">⚙️</div><div className="flow-label">Create Service</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧩</div><div className="flow-label">Add Parameters</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔑</div><div className="flow-label">Token &amp; Send</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">Multi-step tasks — service onboarding and the new-parameter builder — were broken into <strong style={{ color: '#fff' }}>guided wizards with success states</strong>, so even complex configuration feels like a checklist, not a maze.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">⚙️</div>
                <h4>Services</h4>
                <p>All · New · Channels · OTP</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧩</div>
                <h4>Parameters</h4>
                <p>Text · Image · Link</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔑</div>
                <h4>Tokens &amp; Logs</h4>
                <p>API Keys · Delivery Logs</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💳</div>
                <h4>Billing &amp; Docs</h4>
                <p>Pricing · Billing · Documentation</p>
              </div>
            </div>
          </section>


          {/* 04 — VISUAL DESIGN */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 ——</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

            <p className="cs-body">
              A SaaS dashboard lives or dies on clarity. The system pairs the clean, modern character of Instrument Sans with a broad, expressive palette — calm neutrals for surfaces and structure, and a vivid spread of accents to tag channels, statuses and states across a dense product.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Instrument Sans — a clean, contemporary grotesque whose tight, even rhythm keeps a dense, data-heavy dashboard readable at every size.</p>
                  <div className="typo-hero">Instrument Sans</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 600 }}>Semi Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 500 }}>Medium</span>
                    <span className="typo-weight-item" style={{ fontWeight: 400 }}>Regular</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A broad, expressive palette — soft neutrals and greens for surfaces, with warm and bold accents for tagging channels, statuses and states.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#D6DAC8' }}><span className="color-hex">#D6DAC8</span></div>
                    <div className="color-block" style={{ background: '#9CAFAA' }}><span className="color-hex">#9CAFAA</span></div>
                    <div className="color-block" style={{ background: '#FBF3D5' }}><span className="color-hex">#FBF3D5</span></div>
                    <div className="color-block" style={{ background: '#22604F' }}><span className="color-hex">#22604F</span></div>
                    <div className="color-block" style={{ background: '#9CAFAA' }}><span className="color-hex">#9CAFAA</span></div>
                    <div className="color-block" style={{ background: '#11B157' }}><span className="color-hex">#11B157</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#C45A3D' }}><span className="color-hex">#C45A3D</span></div>
                    <div className="color-block" style={{ background: '#DDA82A' }}><span className="color-hex">#DDA82A</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                    <div className="color-block" style={{ background: '#D02F44' }}><span className="color-hex">#D02F44</span></div>
                    <div className="color-block" style={{ background: '#58000C' }}><span className="color-hex">#58000C</span></div>
                    <div className="color-block" style={{ background: '#920066' }}><span className="color-hex">#920066</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">A cross-section of the platform — from secure login and the dashboard to service creation, the parameter builder, tokens, logs and billing. Click any screen to view it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/msg_platform/Login.png">
                  <img src="/Images/projects/msg_platform/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/2fa Select.png">
                  <img src="/Images/projects/msg_platform/2fa Select.png" alt="2FA Verification" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">2FA Verification</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Dashboard.png">
                  <img src="/Images/projects/msg_platform/Dashboard.png" alt="Dashboard" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Services --_ All.png">
                  <img src="/Images/projects/msg_platform/Services --_ All.png" alt="Services" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Services</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Services --_ New Service --_ Select Service.png">
                  <img src="/Images/projects/msg_platform/Services --_ New Service --_ Select Service.png" alt="New Service" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">New Service</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Services --_ Onboarding --_ Welcome.png">
                  <img src="/Images/projects/msg_platform/Services --_ Onboarding --_ Welcome.png" alt="Service Onboarding" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Onboarding</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/msg_platform/Login.png">
                  <img src="/Images/projects/msg_platform/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/2fa Select.png">
                  <img src="/Images/projects/msg_platform/2fa Select.png" alt="2FA Verification" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">2FA Verification</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Dashboard.png">
                  <img src="/Images/projects/msg_platform/Dashboard.png" alt="Dashboard" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Services --_ All.png">
                  <img src="/Images/projects/msg_platform/Services --_ All.png" alt="Services" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Services</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Services --_ New Service --_ Select Service.png">
                  <img src="/Images/projects/msg_platform/Services --_ New Service --_ Select Service.png" alt="New Service" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">New Service</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Services --_ Onboarding --_ Welcome.png">
                  <img src="/Images/projects/msg_platform/Services --_ Onboarding --_ Welcome.png" alt="Service Onboarding" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Onboarding</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/msg_platform/Parameters.png">
                  <img src="/Images/projects/msg_platform/Parameters.png" alt="Parameters" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Parameters</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Prameters--_ New Parameter--_ Parameter Info add.png">
                  <img src="/Images/projects/msg_platform/Prameters--_ New Parameter--_ Parameter Info add.png" alt="Parameter Builder" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Parameter Builder</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Tokens.png">
                  <img src="/Images/projects/msg_platform/Tokens.png" alt="API Tokens" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">API Tokens</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Logs.png">
                  <img src="/Images/projects/msg_platform/Logs.png" alt="Logs" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Logs</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Documentation.png">
                  <img src="/Images/projects/msg_platform/Documentation.png" alt="Documentation" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Documentation</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Billing and Pricing --_ Billing details.png">
                  <img src="/Images/projects/msg_platform/Billing and Pricing --_ Billing details.png" alt="Billing" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Billing</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/msg_platform/Parameters.png">
                  <img src="/Images/projects/msg_platform/Parameters.png" alt="Parameters" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Parameters</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Prameters--_ New Parameter--_ Parameter Info add.png">
                  <img src="/Images/projects/msg_platform/Prameters--_ New Parameter--_ Parameter Info add.png" alt="Parameter Builder" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Parameter Builder</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Tokens.png">
                  <img src="/Images/projects/msg_platform/Tokens.png" alt="API Tokens" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">API Tokens</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Logs.png">
                  <img src="/Images/projects/msg_platform/Logs.png" alt="Logs" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Logs</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Documentation.png">
                  <img src="/Images/projects/msg_platform/Documentation.png" alt="Documentation" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Documentation</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/msg_platform/Billing and Pricing --_ Billing details.png">
                  <img src="/Images/projects/msg_platform/Billing and Pricing --_ Billing details.png" alt="Billing" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Billing</div>
                </div>
              </div>
            </div>
          </section>


          {/* 05 — VIBE & INTERACTIONS */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">Interactions</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

            <p className="cs-body">
              The emotional goal was control without fear. Powerful actions — creating services, minting keys, disabling features — are surrounded by guidance, confirmation and clear feedback, so the platform feels capable and safe in equal measure.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧭</div>
                <h4>Guided Wizards</h4>
                <p>Service onboarding and parameter creation are staged step-by-step, each ending in an explicit success state so users always know where they stand.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧩</div>
                <h4>Visual Parameter Builder</h4>
                <p>Message parameters support text, image and link types — added and previewed visually, turning a fiddly config task into a tangible building experience.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔒</div>
                <h4>Security by Default</h4>
                <p>Two-factor authentication, scoped API tokens and clear "disable" confirmations make the platform's most sensitive actions feel deliberate and safe.</p>
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
                <div className="outcome-metric" data-count="40" data-suffix="+ Screens">0</div>
                <div className="outcome-label">High-fidelity screens spanning the full platform</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-text="2FA">0</div>
                <div className="outcome-label">Security-first flows — two-factor auth &amp; scoped tokens</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"A sprawling messaging back-end, distilled into one calm control centre — powerful for developers, <em>approachable</em> for everyone else."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete, consistent SaaS design system: 40+ high-fidelity screens covering authentication, services, parameters, tokens, logs, documentation, billing and settings.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Serving developers, admins and owners in one product without overwhelming any of them — and keeping dozens of multi-step flows visually consistent.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>For complex tools, the wins are in the wizards and the empty/success/error states. A broad palette only works when it's governed by a strict, documented system.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Hand off to engineering, expand analytics on the dashboard, and add team-level roles &amp; permissions on top of the existing 2FA foundation.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.figma.com/design/MlHC1coJqFScsx4AifaKZl/Messaging-Platform-UI?node-id=74-5445" target="_blank"
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
