'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyNcgws() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Bringing Clarity to <span className="tagline-name">Logistics</span></>}
    >
      {/* ═══════════════════════════════
           FLOATING TABLE OF CONTENTS
      ═══════════════════════════════ */}
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

          {/* ═══════════════════════════════
               HERO — Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">NCG Warehouse</h1>
            <p className="cs-hero-subtitle">A Warehouse Management Web UI That Mirrors Operational Excellence</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/ncgws/cover.png" alt="NCG Warehouse Solutions — corporate website cover"
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
              <div className="cs-meta-value">Corporate Web<br/>UI/UX</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Vue.js · SVG</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>Responsive</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Published</div>
              <div className="cs-meta-value">Behance<br/>Figma</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              NCG Warehouse Solutions — a Lyceum Global subsidiary running 30,000+ sq ft of storage and an island-wide fleet — had the operations, but not the digital presence to match. This redesign set out to give a complex logistics business a website as organised as its warehouse floor: <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>clear capacity, findable tenders, and trust at first glance.</em>
            </p>
          </div>


          {/* ═══════════════════════════════
               01 — THE PROBLEM
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              For a logistics company, credibility lives in the details — capacity figures, service levels, and live tender timelines. NCG's old site buried all of it. Supply-chain stakeholders couldn't quickly gauge what NCG offered, and the people who mattered most — corporate clients and vendors — were left guessing.
            </p>

            <div className="cs-highlight">
              <p>"<em>68%</em> of users struggled to locate tender documents, warehouse capacity was buried in PDFs, and mobile visitors (42% of traffic) bounced <em>73%</em> more often."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>Key information — capacity, services and tenders — was hidden in PDFs and unclear pages, so the site failed to communicate NCG's real operational strength to its stakeholders.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Clearly communicate warehouse capabilities, streamline tender discovery and submission, reflect Lyceum Global's corporate identity, and serve users of every technical literacy.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Corporate clients needing capacity metrics, SLAs and tender timelines — and job applicants needing clear career paths and a mobile-friendly application process.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               02 — RESEARCH
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 ——</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              User research with 47 participants — spanning corporate buyers, vendors and applicants — turned vague complaints into a sharp picture of where the old site failed and where the new one could win.
            </p>

            <h3 className="cs-sub-heading">What the Research Revealed</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Pain Points (Findings)</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>68% struggled to locate tender documents</li>
                    <li><div className="cs-list-bullet"></div>Warehouse capacity data was buried in PDFs</li>
                    <li><div className="cs-list-bullet"></div>Mobile users (42%) bounced 73% more often</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Design Opportunities</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Surface capacity as live, visual dashboards</li>
                    <li><div className="cs-list-bullet"></div>Make tenders discoverable with smart filters</li>
                    <li><div className="cs-list-bullet"></div>Design mobile-first for on-the-go stakeholders</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🏢</div>
                <div>
                  <div className="persona-name">The Corporate Client</div>
                  <div className="persona-role">Primary — Supply-Chain Buyer</div>
                  <div className="persona-traits">
                    <span className="persona-trait">B2B</span>
                    <span className="persona-trait">Data-driven</span>
                    <span className="persona-trait">Time-pressured</span>
                  </div>
                  <p className="persona-quote">"I need capacity, service levels and tender deadlines up front — not buried in a PDF."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📑</div>
                <div>
                  <div className="persona-name">The Vendor / Bidder</div>
                  <div className="persona-role">Secondary — Tender Applicant</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Deadline-driven</span>
                    <span className="persona-trait">Detail-oriented</span>
                    <span className="persona-trait">Compliance</span>
                  </div>
                  <p className="persona-quote">"Applying for tenders now takes half the time."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧑‍💼</div>
                <div>
                  <div className="persona-name">The Job Applicant</div>
                  <div className="persona-role">Tertiary — Career Seeker</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Career-focused</span>
                    <span className="persona-trait">Quick-scan</span>
                  </div>
                  <p className="persona-quote">"I browse and apply on my phone — it has to be quick and clear."</p>
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
                <div className="cs-comp-header">🏢 Corporate Client</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Assess capacity, SLAs and tender timelines fast.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Critical data hidden inside downloadable PDFs.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A live capacity dashboard, surfaced on the page.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📑 Vendor / Bidder</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Find and submit relevant tenders on time.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">68% couldn't even locate the tender documents.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Smart tender filters with timeline + alerts.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🧑‍💼 Job Applicant</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Understand roles and apply quickly.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Mobile experience drove a 73% higher bounce.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A mobile-first, role-based careers flow.</div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 — IDEATION / STRUCTURE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 ——</span>
              <span className="cs-section-num">Structure &amp; Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation &amp; Structure</h2>

            <h3 className="cs-sub-heading">User Flow: From Discovery to Tender</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏠</div><div className="flow-label">Home</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📦</div><div className="flow-label">Our Operations</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📊</div><div className="flow-label">Capacity &amp; Fleet</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📑</div><div className="flow-label">Tenders</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✅</div><div className="flow-label">Submit / Enquire</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">A clean <strong style={{ color: '#fff' }}>7-page architecture</strong> — Home, About Us, Our Team, Our Operations, Tenders, Join Us and Contact — used a top-level overview with <strong style={{ color: '#fff' }}>drill-down</strong> into department flows and equipment details only when needed.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏢</div>
                <h4>Company</h4>
                <p>Home · About Us · Our Team</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📦</div>
                <h4>Operations</h4>
                <p>Capacity · Fleet · Workflow</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📑</div>
                <h4>Tenders</h4>
                <p>Listings · Filters · Submission</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤝</div>
                <h4>Engage</h4>
                <p>Join Us · Careers · Contact</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               04 — VISUAL DESIGN
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 ——</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

            <p className="cs-body">
              The visual language pairs Lyceum Global's corporate blue — for trust — with a warehouse-yellow accent for energy and visibility. Isometric warehouse diagrams, animated process flows and a living style guide keep the whole experience consistent, credible and easy to scan across devices.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Geometric sans-serif typefaces have always been popular, and with support for both the Devanagari and Latin writing systems, Poppins is an internationalist addition to the genre.</p>
                  <div className="typo-hero">Poppins</div>
                  <div className="typo-scale-row">
                    <span className="typo-scale-item">65pt</span>
                    <span className="typo-scale-item">60pt</span>
                    <span className="typo-scale-item">35pt</span>
                    <span className="typo-scale-item">30pt</span>
                    <span className="typo-scale-item">25pt</span>
                    <span className="typo-scale-item">20pt</span>
                    <span className="typo-scale-item">18pt</span>
                    <span className="typo-scale-item">15pt</span>
                    <span className="typo-scale-item">14pt</span>
                    <span className="typo-scale-item">12pt</span>
                  </div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item" style={{ fontWeight: 300 }}>Light</span>
                    <span className="typo-weight-item" style={{ fontWeight: 400 }}>Regular</span>
                    <span className="typo-weight-item" style={{ fontWeight: 500 }}>Medium</span>
                    <span className="typo-weight-item" style={{ fontWeight: 600 }}>Semi Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Heavy</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A basic colour palette offering a broad range of options for design and artistic purposes is used.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">#000000</span></div>
                    <div className="color-block" style={{ background: '#8B181F' }}><span className="color-hex">#8B181F</span></div>
                    <div className="color-block" style={{ background: '#B2B2B2' }}><span className="color-hex">#B2B2B2</span></div>
                    <div className="color-block" style={{ background: '#0654A1' }}><span className="color-hex">#0654A1</span></div>
                    <div className="color-block" style={{ background: '#FED217' }}><span className="color-hex">#FED217</span></div>
                    <div className="color-block" style={{ background: '#198754' }}><span className="color-hex">#198754</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The core of the experience — from the operations overview to the tender listings and the careers flow. Click any screen to view it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/ncgws/HOME Screen.png">
                  <img src="/Images/projects/ncgws/HOME Screen.png" alt="Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/About -_ About Us.png">
                  <img src="/Images/projects/ncgws/About -_ About Us.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">About Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/About -_ Our Team.png">
                  <img src="/Images/projects/ncgws/About -_ Our Team.png" alt="Our Team" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Team</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Our Operations.png">
                  <img src="/Images/projects/ncgws/Our Operations.png" alt="Our Operations" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Operations</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Tenders.png">
                  <img src="/Images/projects/ncgws/Tenders.png" alt="Tenders" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Tenders</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/ncgws/HOME Screen.png">
                  <img src="/Images/projects/ncgws/HOME Screen.png" alt="Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/About -_ About Us.png">
                  <img src="/Images/projects/ncgws/About -_ About Us.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">About Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/About -_ Our Team.png">
                  <img src="/Images/projects/ncgws/About -_ Our Team.png" alt="Our Team" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Team</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Our Operations.png">
                  <img src="/Images/projects/ncgws/Our Operations.png" alt="Our Operations" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Operations</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Tenders.png">
                  <img src="/Images/projects/ncgws/Tenders.png" alt="Tenders" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Tenders</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/ncgws/Join Us.png">
                  <img src="/Images/projects/ncgws/Join Us.png" alt="Join Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Join Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Join Us - Job Description.png">
                  <img src="/Images/projects/ncgws/Join Us - Job Description.png" alt="Job Description" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Job Description</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Login.png">
                  <img src="/Images/projects/ncgws/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Sign in.png">
                  <img src="/Images/projects/ncgws/Sign in.png" alt="Sign In" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Sign In</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Contact Us.png">
                  <img src="/Images/projects/ncgws/Contact Us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/ncgws/Join Us.png">
                  <img src="/Images/projects/ncgws/Join Us.png" alt="Join Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Join Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Join Us - Job Description.png">
                  <img src="/Images/projects/ncgws/Join Us - Job Description.png" alt="Job Description" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Job Description</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Login.png">
                  <img src="/Images/projects/ncgws/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Sign in.png">
                  <img src="/Images/projects/ncgws/Sign in.png" alt="Sign In" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Sign In</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/ncgws/Contact Us.png">
                  <img src="/Images/projects/ncgws/Contact Us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               05 — VIBE & INTERACTIONS
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">Interactions</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

            <p className="cs-body">
              Industrial operations are complex — the interactions had to make that complexity feel effortless and trustworthy. Three signature patterns turn dense logistics data into something anyone can read at a glance.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📊</div>
                <h4>Capacity Dashboard</h4>
                <p>Real-time warehouse occupancy visualisations bring 30,000+ sq ft of storage to life — no PDFs, just a glanceable view of what's available.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📑</div>
                <h4>Tender Timeline</h4>
                <p>Smart filters by date, type and value, plus alert subscriptions and a timeline generator, so vendors never miss a relevant tender again.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🚚</div>
                <h4>Fleet Tracking Preview</h4>
                <p>An embedded mapping preview hints at the island-wide fleet, reinforcing NCG's operational reach right on the page.</p>
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
                <div className="outcome-metric" data-count="57" data-suffix="%">0</div>
                <div className="outcome-label">Reduction in tender-related support queries</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="39" data-suffix="%">0</div>
                <div className="outcome-label">Improvement in mobile conversion rate</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"The operations page finally makes sense of their complex workflow." — <em>Logistics Manager</em> &nbsp;·&nbsp; "Applying for tenders now takes half the time." — <em>Vendor Representative</em></p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>Tender support queries fell 57% and mobile conversions rose 39%, with average sessions reaching 5.1 minutes on a fast 0.8s-loading site — clarity, efficiency and brand elevation in one.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Communicating multi-layered warehouse operations without overwhelming users. The fix: a top-level overview with drill-down into department flows and equipment details on demand.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>ERP system integration, augmented-reality warehouse tours, and multilingual support (Sinhala / Tamil) to reach every stakeholder.</p>
              </div>
              <div className="reflection-card">
                <h4>💬 Conclusion</h4>
                <p>NCG Warehouse shows how thoughtful UX engineering can bring clarity to complex industrial operations — turning information into intuitive, interactive experiences.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.behance.net/gallery/199114839/NCG-Warehouse-Web-UI-Design" target="_blank" rel="noopener"
                className="cs-cta-btn primary">View on Behance →</a>
              <a href="https://www.figma.com/design/DDVOHEwoIH67XnmMrvX65k/NCG-Warehouse" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
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
            <img id="cs-modal-img" src="" alt="Case Study Preview" loading="lazy" decoding="async" />
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
