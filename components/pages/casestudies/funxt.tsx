'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyFunxt() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Scaling Ambition With <span className="tagline-name">Technology</span></>}
    >
      <main>

        <div className="cs-wrap">

          <a href="/projects/web" className="back-link"><span>←</span> Back to Projects</a>

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Fun Extreme Technology</h1>
            <p className="cs-hero-subtitle">A Gaming-Tech Corporate Website — Designed for Desktop &amp; Mobile</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/funxt/cover.png" alt="Fun Extreme Technology — corporate website cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Engineer<br/>Web Designer</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Corporate Website<br/>Gaming-Tech B2B</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Design System</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>(Live Site)</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Views</div>
              <div className="cs-meta-value">Desktop<br/>&amp; Mobile</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Fun Extreme Technology LLC builds software for gaming platforms worldwide — and needed a corporate home that could prove it. The brief: a website spanning Home, four Solution pillars, Company, Careers and Contact that feels <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>bold enough for gaming, credible enough for enterprise — on desktop and mobile alike.</em>
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
              Fun Extreme provides end-to-end technology services tailored for gaming businesses — and that dual identity is the whole challenge. Most B2B tech sites read dry and templated; most gaming sites read playful but unserious. One website had to convince enterprise decision-makers, excite gaming operators, and recruit top engineers — without splitting into two designs.
            </p>

            <div className="cs-highlight">
              <p>"Fun is literally in the company's name — but the clients are enterprises. The site had to look like <em>both, at once</em>."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>A gaming-technology firm needs a corporate site that feels energetic enough for play yet rigorous enough for enterprise buyers — most websites only manage one of the two.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>One bold, red-led system covering Home, Solutions, Company, Careers and Contact — with every page designed in full for both desktop and mobile.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Gaming operators and platform owners evaluating a technology partner, engineers exploring careers, and partners looking for trust signals.</p>
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
              Three very different visitors land on the same homepage: a potential client auditing capability, a candidate evaluating culture, and a partner checking credibility. The standout insight — all three scan for proof, not prose. Stats, named solution pillars and real partnerships had to surface early, with deeper detail always one click away.
            </p>

            <h3 className="cs-sub-heading">Typical B2B Tech Sites vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Generic stock-photo corporate templates with no personality</li>
                    <li><div className="cs-list-bullet"></div>Service lists written as jargon walls nobody scans</li>
                    <li><div className="cs-list-bullet"></div>A single funnel that ignores clients, candidates and partners alike</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Fun Extreme's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>One confident red-gradient identity over calm blue-ash neutrals</li>
                    <li><div className="cs-list-bullet"></div>Four named solution pillars, each with its own deep-dive page</li>
                    <li><div className="cs-list-bullet"></div>Dedicated journeys — Solutions, Company, Careers and Contact</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🕹️</div>
                <div>
                  <div className="persona-name">The Gaming Operator</div>
                  <div className="persona-role">Primary — Evaluating a Partner</div>
                  <div className="persona-traits">
                    <span className="persona-trait">ROI-driven</span>
                    <span className="persona-trait">Time-poor</span>
                    <span className="persona-trait">Skeptical</span>
                  </div>
                  <p className="persona-quote">"Show me you've shipped gaming tech at scale — fast, secure and compliant."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">👩‍💻</div>
                <div>
                  <div className="persona-name">The Engineer Candidate</div>
                  <div className="persona-role">Secondary — Exploring Careers</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Craft-focused</span>
                    <span className="persona-trait">Culture-curious</span>
                    <span className="persona-trait">Mobile-first</span>
                  </div>
                  <p className="persona-quote">"I want to see what I'd build and who I'd build it with — before I hit Apply."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🤝</div>
                <div>
                  <div className="persona-name">The Strategic Partner</div>
                  <div className="persona-role">Tertiary — Verifying Credibility</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Trust-seeking</span>
                    <span className="persona-trait">Detail-oriented</span>
                    <span className="persona-trait">Brand-aware</span>
                  </div>
                  <p className="persona-quote">"Numbers, partnerships and a global footprint tell me this company is real."</p>
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
                <div className="cs-comp-header">🕹️ Operator</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Find a capable end-to-end tech partner.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Vague service pages with no specifics.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Four pillars broken into six concrete services each.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">👩‍💻 Candidate</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Understand the work and the culture.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Careers pages that are just a form.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A careers hub with rich role cards and clear applies.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🤝 Partner</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Verify scale, stability and reach.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Big claims with no proof behind them.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Stats, partner logos and a global-network section up front.</div>
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

            <h3 className="cs-sub-heading">User Flow: From First Impression to Conversation</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏠</div><div className="flow-label">Home</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧭</div><div className="flow-label">Solutions</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧱</div><div className="flow-label">Pillar Deep-Dive</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏢</div><div className="flow-label">Company</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✉️</div><div className="flow-label">Contact &amp; Careers</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The four solution pillars — <strong style={{ color: '#fff' }}>Design &amp; Development, Cloud &amp; Operations, Security &amp; Compliance, and Innovation &amp; Planning</strong> — structure the entire site: the homepage grid, the Solutions overview, and four dedicated deep-dive pages that each unpack a pillar into six concrete services.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏠</div>
                <h4>Home</h4>
                <p>Hero · Stats · Pillars · Partners</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧭</div>
                <h4>Solutions</h4>
                <p>Overview · 4 Pillar Pages · 24 Services</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏢</div>
                <h4>Company</h4>
                <p>Why Us · Engagement Models · Global Network</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✉️</div>
                <h4>Careers &amp; Contact</h4>
                <p>Role Cards · Apply · Get-In-Touch Form</p>
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
              The identity hangs on a single, confident red gradient — #FF5757 into #CD0505 — cutting through clean white space and a family of "blue-ash" greys. Every neutral is defined with explicit opacity steps (8, 12, 20, 40 and 80%), so the same tokens hold up on bright corporate sections and deep charcoal bands alike — across both desktop and mobile.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">A geometric sans with real presence — Gilroy carries everything from hero statements down to data labels, in five weights from Regular to Black.</p>
                  <div className="typo-hero">Gilroy</div>
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
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 800 }}>Heavy</span>
                    <span className="typo-weight-item" style={{ fontWeight: 900 }}>Black</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">One red gradient over white, black and two blue-ash greys — with documented 8–80% opacity steps that keep the palette consistent in light sections and dark.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#FF5757' }}><span className="color-hex">#FF5757</span></div>
                    <div className="color-block" style={{ background: '#CD0505' }}><span className="color-hex">#CD0505</span></div>
                    <div className="color-block" style={{ background: '#7B7B94' }}><span className="color-hex">#7B7B94</span></div>
                    <div className="color-block" style={{ background: '#A9A9B9' }}><span className="color-hex">#A9A9B9</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">#000000</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: 'rgba(255,255,255,0.8)' }}><span className="color-hex">FFF · 80%</span></div>
                    <div className="color-block" style={{ background: 'rgba(255,255,255,0.08)' }}><span className="color-hex">FFF · 8%</span></div>
                    <div className="color-block" style={{ background: 'rgba(123,123,148,0.4)' }}><span className="color-hex">7B7B94 · 40%</span></div>
                    <div className="color-block" style={{ background: 'rgba(169,169,185,0.2)' }}><span className="color-hex">A9A9B9 · 20%</span></div>
                    <div className="color-block" style={{ background: 'rgba(0,0,0,0.12)' }}><span className="color-hex">000 · 12%</span></div>
                    <div className="color-block" style={{ background: 'rgba(0,0,0,0.4)' }}><span className="color-hex">000 · 40%</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The full corporate journey — home, solutions, company, careers and contact — designed for both devices. Switch between the desktop and mobile views below, and click any screen to open it in high resolution.</p>

            {/* Desktop / Mobile switcher */}
            <div className="device-toggle" role="tablist" aria-label="Device view">
              <button className="device-btn active" type="button" data-device="desktop" aria-selected="true">Desktop</button>
              <button className="device-btn" type="button" data-device="mobile" aria-selected="false">Mobile</button>
            </div>

            {/* DESKTOP GALLERY (landscape) */}
            <div className="ui-gallery device-gallery is-desktop" data-device="desktop">
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Home.png">
                  <img src="/Images/projects/funxt/desktop/Home.png" alt="Desktop — Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions.png">
                  <img src="/Images/projects/funxt/desktop/Solutions.png" alt="Desktop — Solutions Overview" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Solutions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20DESIGN%20AND%20DEVELOPMENT.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20DESIGN%20AND%20DEVELOPMENT.png" alt="Desktop — Design and Development" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Design &amp; Development</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20CLOUD%20AND%20OPERATIONS.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20CLOUD%20AND%20OPERATIONS.png" alt="Desktop — Cloud and Operations" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Cloud &amp; Operations</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Company.png">
                  <img src="/Images/projects/funxt/desktop/Company.png" alt="Desktop — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Home.png">
                  <img src="/Images/projects/funxt/desktop/Home.png" alt="Desktop — Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions.png">
                  <img src="/Images/projects/funxt/desktop/Solutions.png" alt="Desktop — Solutions Overview" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Solutions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20DESIGN%20AND%20DEVELOPMENT.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20DESIGN%20AND%20DEVELOPMENT.png" alt="Desktop — Design and Development" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Design &amp; Development</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20CLOUD%20AND%20OPERATIONS.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20CLOUD%20AND%20OPERATIONS.png" alt="Desktop — Cloud and Operations" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Cloud &amp; Operations</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Company.png">
                  <img src="/Images/projects/funxt/desktop/Company.png" alt="Desktop — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
              </div>
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20SECURITY%20AND%20COMPLIANCE.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20SECURITY%20AND%20COMPLIANCE.png" alt="Desktop — Security and Compliance" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Security &amp; Compliance</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20INNOVATION%20AND%20PLANNING.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20INNOVATION%20AND%20PLANNING.png" alt="Desktop — Innovation and Planning" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Innovation &amp; Planning</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Careers.png">
                  <img src="/Images/projects/funxt/desktop/Careers.png" alt="Desktop — Careers" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Careers</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Contact%20Us.png">
                  <img src="/Images/projects/funxt/desktop/Contact%20Us.png" alt="Desktop — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20SECURITY%20AND%20COMPLIANCE.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20SECURITY%20AND%20COMPLIANCE.png" alt="Desktop — Security and Compliance" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Security &amp; Compliance</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Solutions%20_%20INNOVATION%20AND%20PLANNING.png">
                  <img src="/Images/projects/funxt/desktop/Solutions%20_%20INNOVATION%20AND%20PLANNING.png" alt="Desktop — Innovation and Planning" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Innovation &amp; Planning</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Careers.png">
                  <img src="/Images/projects/funxt/desktop/Careers.png" alt="Desktop — Careers" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Careers</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/desktop/Contact%20Us.png">
                  <img src="/Images/projects/funxt/desktop/Contact%20Us.png" alt="Desktop — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
              </div>
            </div>

            {/* MOBILE GALLERY (portrait) */}
            <div className="ui-gallery device-gallery is-mobile" data-device="mobile" hidden>
              <div className="ui-marquee-track ui-track-2" id="marquee-3">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Home.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Home.png" alt="Mobile — Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png" alt="Mobile — Solutions Overview" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Solutions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png" alt="Mobile — Design and Development" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Design &amp; Development</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Home.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Home.png" alt="Mobile — Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png" alt="Mobile — Solutions Overview" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Solutions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png" alt="Mobile — Design and Development" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Design &amp; Development</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Home.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Home.png" alt="Mobile — Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png" alt="Mobile — Solutions Overview" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Solutions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png" alt="Mobile — Design and Development" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Design &amp; Development</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Home.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Home.png" alt="Mobile — Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions.png" alt="Mobile — Solutions Overview" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Solutions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Solutions-1.png" alt="Mobile — Design and Development" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Design &amp; Development</div>
                </div>
              </div>
              <div className="ui-marquee-track ui-track-1" id="marquee-4">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Company.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Company.png" alt="Mobile — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png" alt="Mobile — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Company.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Company.png" alt="Mobile — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png" alt="Mobile — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Company.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Company.png" alt="Mobile — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png" alt="Mobile — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Company.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Company.png" alt="Mobile — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png" alt="Mobile — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Company.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Company.png" alt="Mobile — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png" alt="Mobile — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Company.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Company.png" alt="Mobile — Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png">
                  <img src="/Images/projects/funxt/mobile/Mobile%20-%20Contact%20us.png" alt="Mobile — Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
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
              The feeling to land is confident momentum — sweeping red gradient bands between clean white sections, stats that count up as you scroll, and solution pillars that invite you to go one level deeper.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧱</div>
                <h4>Pillar-Driven Navigation</h4>
                <p>The four solution tiles act as the site's engine — each one opens a deep-dive page that unpacks the pillar into six concrete services, from core game engineering to system integration.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📈</div>
                <h4>Proof Through Numbers</h4>
                <p>Animated counters — 100+ dedicated employees, operations across 5+ countries — plus partner logos and a global-network section turn big claims into visible credibility.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✉️</div>
                <h4>Conversion Touchpoints</h4>
                <p>A persistent dual CTA band — "Interested in joining us?" and "Speak with our team of experts" — plus rich careers role cards and a focused get-in-touch form keep the next step always in reach.</p>
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
                <div className="outcome-label">Every page designed in full for desktop and mobile</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="9" data-suffix="+ Pages">0</div>
                <div className="outcome-label">Home, solutions, four pillar deep-dives, company, careers &amp; contact</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"A gaming-tech company that finally looks the part — <em>bold enough for play, credible enough for enterprise.</em>"</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete corporate web presence: home, a four-pillar solutions system with dedicated deep-dive pages, company, careers and contact — every page designed for desktop and mobile, and shipped to a live site.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Balancing two registers in one identity — the energy of gaming and the rigor of enterprise — while keeping nine content-heavy pages consistent across two device layouts.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>A small, disciplined palette goes furthest: one red gradient plus documented opacity steps of white, black and blue-ash did the work of a much larger system — and made light and dark sections feel like one site.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Extend the system with case-study and insights content, add motion polish to the gradient bands, and localize the site for the company's global markets.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://funextreme-web.vercel.app" target="_blank"
                rel="noopener" className="cs-cta-btn primary">View Live Site →</a>
              <a href="https://www.figma.com/design/Rte3UE8njPV64UYW35l5g8/Fun-Extreme-LLC-WEB?node-id=0-1" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">Open in Figma →</a>
            </div>
          </section>

        </div>
      </main>

      {/* FLOATING TABLE OF CONTENTS */}
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

      {/* CASE STUDY IMAGE MODAL */}
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
            <img id="cs-modal-img" src="" alt="Case Study Preview" loading="lazy" decoding="async" />
            <div className="cs-modal-info">
              <div id="cs-modal-counter" className="cs-modal-counter">0 / 0</div>
              <h3 id="cs-modal-title" className="cs-modal-title"></h3>
            </div>
          </div>
        </div>
      </div>

      {/* REDIRECTION MODAL */}
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
