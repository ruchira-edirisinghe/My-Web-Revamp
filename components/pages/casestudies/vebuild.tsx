'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';
import { initVebuildTabs } from '@/lib/scripts/vebuild';

export default function CaseStudyVebuild() {
  useEffect(() => {
    // VeBuild adds an A/B version switcher + panel-aware TOC on top of the shared engine.
    const disposers = [initProjects(), initCaseStudy(), initVebuildTabs()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Building the <span className="tagline-name">VeBuild Experience</span></>}
    >
      {/* FLOATING TABLE OF CONTENTS */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#" data-target="problem"><span className="cs-toc-label">Problem</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#" data-target="research"><span className="cs-toc-label">Research</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#" data-target="ideation"><span className="cs-toc-label">Ideation</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#" data-target="design"><span className="cs-toc-label">Design</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#" data-target="vibe"><span className="cs-toc-label">Vibe</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#" data-target="results"><span className="cs-toc-label">Results</span><span className="cs-toc-dot"></span></a>
        </div>
      </nav>

      {/* FLOATING A/B VERSION SWITCHER */}
      <div className="cs-tabs" id="version-switch" data-active="clean" role="tablist" aria-label="Design version">
        <span className="cs-tab-glider" aria-hidden="true"></span>
        <button className="cs-tab active" type="button" data-panel="clean" role="tab" aria-selected="true">Clean &amp; Sleek UI</button>
        <button className="cs-tab" type="button" data-panel="blocked" role="tab" aria-selected="false">Block Appearance UI</button>
      </div>

      <main>

        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* HERO - Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">VEBUILD<br/>Construction Web UI</h1>
            <p className="cs-hero-subtitle">A Clean &amp; Sleek Digital Presence for a Modern Construction Brand</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/vebuild/cover.png" alt="VEBUILD - Construction company website cover" className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Designer<br/>Product Designer</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Self-Initiated<br/>UI Concept</div>
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
              <div className="cs-meta-label">Published</div>
              <div className="cs-meta-value">Behance<br/>Figma</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              VEBUILD, a construction company, set out to build a digital presence as solid and refined as the structures it delivers. This project reimagined the company's website around one guiding belief: <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>The modern user expects more than just information; they seek an experience that is both visually appealing and easy to navigate.</em>
            </p>
          </div>

          {/* ═══════════════ PANEL A - CLEAN & SLEEK (current) ═══════════════ */}
          <div className="cs-panel active" id="panel-clean">

          {/* 01 - THE PROBLEM */}
          <section className="cs-section" id="sec-problem" data-sec="problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 --</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              As an established construction company, VEBUILD had the projects and credentials to inspire confidence - but its digital presence didn't reflect that craftsmanship. Prospective clients struggled to explore the portfolio, understand the company's history and values, or find a clear path to get in touch. The brand needed an interface as clean, sleek, and dependable as the work it represents.
            </p>

            <div className="cs-highlight">
              <p>"The modern user expects more than just information; they seek an experience that is both visually appealing and easy to navigate."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>A digital presence that fell short of the brand - the information was there, but the experience lacked the polish, clarity, and trust signals a modern construction client expects.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Enhance engagement with an immersive interface, simplify access to the portfolio, certifications and sustainability, build trust through history and values, and stay accessible and responsive on every device.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Prospective clients, project stakeholders, and industry professionals evaluating VEBUILD's capability, credibility, and values.</p>
              </div>
            </div>
          </section>


          {/* 02 - RESEARCH */}
          <section className="cs-section" id="sec-research" data-sec="research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 --</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              Discovery focused on how people actually evaluate a construction firm online - scanning past projects for proof of quality, looking for credibility signals, and wanting a frictionless way to enquire. I reviewed corporate and construction websites to map the patterns that build trust against the ones that quietly erode it.
            </p>

            <h3 className="cs-sub-heading">Competitive Analysis</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Construction Site Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Dense, text-heavy pages that bury the actual project work
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Generic stock imagery that fails to prove real capability
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Hidden or clunky contact paths that stall genuine enquiries
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> VEBUILD Opportunities</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>A visual-first portfolio that lets the work speak for itself
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Clear credibility cues - history, certifications, sustainability
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Prominent, low-friction calls-to-action to start a conversation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              {/* Persona 1 */}
              <div className="persona-card">
                <div className="persona-avatar">🏗️</div>
                <div>
                  <div className="persona-name">Property Developer</div>
                  <div className="persona-role">Primary - Client / Decision-Maker · Age 35-55</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Quality-focused</span>
                    <span className="persona-trait">Time-poor</span>
                    <span className="persona-trait">Risk-aware</span>
                  </div>
                  <p className="persona-quote">"I want to see proof of past work and know I can trust this team before I ever pick up the phone."</p>
                </div>
              </div>

              {/* Persona 2 */}
              <div className="persona-card">
                <div className="persona-avatar">📋</div>
                <div>
                  <div className="persona-name">Project Stakeholder</div>
                  <div className="persona-role">Secondary - Partner / Investor · Age 30-50</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Detail-oriented</span>
                    <span className="persona-trait">Process-driven</span>
                    <span className="persona-trait">Collaborative</span>
                  </div>
                  <p className="persona-quote">"I need the company's credentials, scope, and sustainability stance laid out clearly."</p>
                </div>
              </div>

              {/* Persona 3 */}
              <div className="persona-card">
                <div className="persona-avatar">🌐</div>
                <div>
                  <div className="persona-name">Industry Professional</div>
                  <div className="persona-role">Tertiary - Peer / Prospective Hire · Age 24-40</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Curious</span>
                    <span className="persona-trait">Brand-aware</span>
                    <span className="persona-trait">Mobile-first</span>
                  </div>
                  <p className="persona-quote">"I'm exploring who VEBUILD is and what they stand for - show me the values, not just the buildings."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Cross-Persona Insights</h3>

            <div className="cs-insight-comp">
              {/* Column Labels (Desktop only) */}
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Primary Goal</div>
                <div className="cs-comp-row-label">Core Frustration</div>
                <div className="cs-comp-row-label highlight">Design Insight</div>
              </div>

              {/* Persona 1 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">🏗️ The Client</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Assessing quality and trust before enquiring.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Portfolios that are hard to browse or short on detail.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a filterable, visual Projects gallery front and centre.</div>
              </div>

              {/* Persona 2 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">📋 The Stakeholder</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Verifying credentials, scope, and values.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Company info scattered across disconnected pages.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a consolidated About + Sustainability narrative.</div>
              </div>

              {/* Persona 3 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">🌐 The Professional</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Understanding the brand and its ethos.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Walls of text with no visual hierarchy.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs scannable, card-based storytelling and clear CTAs.</div>
              </div>
            </div>
          </section>


          {/* 03 - IDEATION */}
          <section className="cs-section" id="sec-ideation" data-sec="ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">Structure &amp; Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation &amp; Structure</h2>

            <h3 className="cs-sub-heading">User Flow: From First Impression to Enquiry</h3>

            <div className="cs-flow">
              <div className="flow-step">
                <div className="flow-node">🏠</div>
                <div className="flow-label">Landing</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🏗️</div>
                <div className="flow-label">Explore Projects</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🏢</div>
                <div className="flow-label">About &amp; Trust</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🌿</div>
                <div className="flow-label">Sustainability</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">✉️</div>
                <div className="flow-label">Enquire / Contact</div>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">Low-fidelity wireframes were refined iteratively and validated through user testing with a diverse group - surfacing the need for <strong style={{ color: '#fff' }}>clearer calls-to-action, improved readability, and more intuitive navigation</strong> before moving to the high-fidelity prototype.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏢</div>
                <h4>About Company</h4>
                <p>History · Values · Certifications</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏗️</div>
                <h4>Projects</h4>
                <p>Portfolio · Filters · Case Detail</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌿</div>
                <h4>Sustainability</h4>
                <p>Initiatives · Impact · Goals</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✉️</div>
                <h4>Contact</h4>
                <p>Enquiry · Locations · Details</p>
              </div>
            </div>
          </section>


          {/* 04 - VISUAL DESIGN */}
          <section className="cs-section" id="sec-design" data-sec="design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

            <p className="cs-body">
              VEBUILD's interface was guided by three principles - elegance, simplicity, and accessibility - achieved through balanced whitespace, bold typography, and a carefully curated palette. A green-and-bluish scheme drawn straight from the company's logo pairs a deep navy with a vibrant teal, creating a clean, sleek aesthetic that signals reliability and modern craftsmanship.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
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
                    <span className="typo-weight-item">Light</span>
                    <span className="typo-weight-item">Regular</span>
                    <span className="typo-weight-item">Medium</span>
                    <span className="typo-weight-item">Semi Bold</span>
                    <span className="typo-weight-item">Bold</span>
                    <span className="typo-weight-item">Heavy</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A green and bluish-toned palette was used - these are the colours of the company's logo and overall brand theme.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#1F394F' }}><span className="color-hex">#1F394F</span></div>
                    <div className="color-block" style={{ background: '#01A59E' }}><span className="color-hex">#01A59E</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Project Deliverables</h3>
            <p className="cs-body">The following screens form the core of the VEBUILD experience, balancing visual impact with the clarity and trust signals a construction client looks for.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/vebuild/Home.png">
                  <img src="/Images/projects/vebuild/Home.png" alt="VEBUILD Homepage" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Homepage</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Projects.png">
                  <img src="/Images/projects/vebuild/Projects.png" alt="Projects Portfolio" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Projects</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Our Company.png">
                  <img src="/Images/projects/vebuild/Our Company.png" alt="Our Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Group of Companies.png">
                  <img src="/Images/projects/vebuild/Group of Companies.png" alt="Group of Companies" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Group of Companies</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Certifications.png">
                  <img src="/Images/projects/vebuild/Certifications.png" alt="Certifications" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Certifications</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/vebuild/Home.png">
                  <img src="/Images/projects/vebuild/Home.png" alt="VEBUILD Homepage" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Homepage</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Projects.png">
                  <img src="/Images/projects/vebuild/Projects.png" alt="Projects Portfolio" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Projects</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Our Company.png">
                  <img src="/Images/projects/vebuild/Our Company.png" alt="Our Company" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Company</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Group of Companies.png">
                  <img src="/Images/projects/vebuild/Group of Companies.png" alt="Group of Companies" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Group of Companies</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Certifications.png">
                  <img src="/Images/projects/vebuild/Certifications.png" alt="Certifications" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Certifications</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/vebuild/CSR.png">
                  <img src="/Images/projects/vebuild/CSR.png" alt="Corporate Social Responsibility" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">CSR</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Careers.png">
                  <img src="/Images/projects/vebuild/Careers.png" alt="Careers" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Careers</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Careers --_ job.png">
                  <img src="/Images/projects/vebuild/Careers --_ job.png" alt="Careers - Job Detail" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Careers · Job</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Contact Us.png">
                  <img src="/Images/projects/vebuild/Contact Us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/vebuild/CSR.png">
                  <img src="/Images/projects/vebuild/CSR.png" alt="Corporate Social Responsibility" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">CSR</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Careers.png">
                  <img src="/Images/projects/vebuild/Careers.png" alt="Careers" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Careers</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Careers --_ job.png">
                  <img src="/Images/projects/vebuild/Careers --_ job.png" alt="Careers - Job Detail" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Careers · Job</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/vebuild/Contact Us.png">
                  <img src="/Images/projects/vebuild/Contact Us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
              </div>
            </div>
          </section>


          {/* 05 - VIBE & INTERACTIONS */}
          <section className="cs-section" id="sec-vibe" data-sec="vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 --</span>
              <span className="cs-section-num">The Vibe</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

            <p className="cs-body">
              A construction brand's site should feel grounded, confident, and modern - never flashy for its own sake. Every interaction was tuned to communicate dependability and quality, letting the work take centre stage while gently guiding visitors toward an enquiry.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">✨</div>
                <h4>Button Feel</h4>
                <p>Clear, high-contrast calls-to-action make enquiring effortless. The emotional intent is confidence and momentum - guiding clients smoothly toward starting a conversation.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌊</div>
                <h4>Responsive Flow</h4>
                <p>The layout adapts seamlessly across desktop, tablet, and mobile, so the brand feels just as polished on a site visit as it does in the boardroom.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎨</div>
                <h4>Visual Hierarchy</h4>
                <p>Vibrant teal accents against deep navy tones direct attention to projects and CTAs, while generous whitespace keeps the experience calm, premium, and easy to scan.</p>
              </div>
            </div>
          </section>

          <section className="cs-section" id="sec-results" data-sec="results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 --</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="100" data-suffix="%">0</div>
                <div className="outcome-label">Responsive layout adaptation across desktop, tablet &amp; mobile</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-text="A11Y">0</div>
                <div className="outcome-label">Accessibility-first interface - keyboard navigation, screen-reader support &amp; high-contrast schemes</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"The VEBUILD website redesign exemplifies the power of user-centered design in creating digital experiences that are both functional and visually appealing."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>Increased Engagement: users reported spending more time exploring VEBUILD's portfolio, while inclusive design made the site easier to navigate for people of all technical proficiencies.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 Brand Impact</h4>
                <p>The modern, cohesive design strengthened VEBUILD's brand identity and online presence, reinforcing its reputation as a dependable, forward-thinking construction company.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Continuously monitor user feedback, integrate emerging technologies such as AI-driven personalization, and regularly update the style guide as the brand evolves.</p>
              </div>
              <div className="reflection-card">
                <h4>💬 Conclusion</h4>
                <p>VEBUILD reaffirms that thorough research, iterative design, and a commitment to accessibility can turn a simple corporate site into a genuine trust-building experience.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.behance.net/gallery/198713933/VEBUILD-Clean-Sleek-UI-Design" target="_blank" rel="noopener" className="cs-cta-btn primary">View on Behance →</a>
              <a href="https://www.figma.com/design/zwKbWePPKM1ujfCR418sg1/VEBUILD?node-id=177%3A795&t=dglc6kTQehUtwmRP-1" target="_blank" rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
            </div>
          </section>

          </div>{/* /#panel-clean */}


          {/* ═══════════════ PANEL B - BLOCK APPEARANCE (earlier concept) ═══════════════ */}
          <div className="cs-panel" id="panel-blocked">

            {/* 01 - THE PROBLEM */}
            <section className="cs-section" data-sec="problem">
              <div className="cs-section-divider">
                <span className="cs-section-num">01 --</span>
                <span className="cs-section-num">The Problem</span>
                <div className="cs-section-line"></div>
              </div>
              <h2 className="cs-section-title">Context &amp; The Problem</h2>

              <p className="cs-body">
                VEBUILD INNOVATIONS began as a digital-transformation initiative for a construction firm looking to modernise how it communicates with clients and engages stakeholders. The core challenge: construction firms struggle to present complex, technical information accessibly - and research revealed friction points hurting both the client and recruitment journeys.
              </p>

              <div className="cs-highlight">
                <p>"Construction firms struggle to present complex technical information accessibly - friction that affects both winning clients and attracting talent."</p>
              </div>

              <div className="cs-cards-grid">
                <div className="cs-card">
                  <div className="cs-card-icon">🎯</div>
                  <h4>Problem Statement</h4>
                  <p>Dense technical content and slow, heavy galleries made it hard for clients to evaluate the firm and for candidates to apply.</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">🏁</div>
                  <h4>The Goal</h4>
                  <p>Modernise client communication and stakeholder engagement with a structured, modular interface that makes complex information scannable and trustworthy.</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">👥</div>
                  <h4>Target Audience</h4>
                  <p>Commercial clients vetting portfolios, qualifications and compliance - and job candidates exploring careers, culture and how to apply.</p>
                </div>
              </div>
            </section>


            {/* 02 - RESEARCH */}
            <section className="cs-section" data-sec="research">
              <div className="cs-section-divider">
                <span className="cs-section-num">02 --</span>
                <span className="cs-section-num">Discovery &amp; Research</span>
                <div className="cs-section-line"></div>
              </div>
              <h2 className="cs-section-title">Discovery &amp; Research</h2>

              <p className="cs-body">
                Discovery combined qualitative and behavioural data - 32 interviews with construction professionals and analysis of 150+ user sessions. The numbers exposed exactly where the old experience broke down.
              </p>

              <h3 className="cs-sub-heading">Pain Points vs. Opportunities</h3>

              <div className="cs-compare">
                <div className="cs-compare-side fail">
                  <div className="cs-compare-label"><i>✕</i> Research Pain Points</div>
                  <div className="cs-compare-body">
                    <ul className="cs-list">
                      <li><div className="cs-list-bullet"></div>73% struggled to find relevant case studies</li>
                      <li><div className="cs-list-bullet"></div>8s+ gallery load times on mobile</li>
                      <li><div className="cs-list-bullet"></div>68% abandoned the careers page</li>
                    </ul>
                  </div>
                </div>
                <div className="cs-compare-side success">
                  <div className="cs-compare-label"><i>✓</i> Block-UI Opportunities</div>
                  <div className="cs-compare-body">
                    <ul className="cs-list">
                      <li><div className="cs-list-bullet"></div>Card-based taxonomy with clear entry filters</li>
                      <li><div className="cs-list-bullet"></div>Adaptive image loading for fast galleries</li>
                      <li><div className="cs-list-bullet"></div>A streamlined, modular application flow</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="cs-sub-heading">User Personas</h3>

              <div className="cs-personas-grid">
                <div className="persona-card">
                  <div className="persona-avatar">🏢</div>
                  <div>
                    <div className="persona-name">Commercial Client</div>
                    <div className="persona-role">Primary - Buyer / Decision-Maker</div>
                    <div className="persona-traits">
                      <span className="persona-trait">Portfolio-seeker</span>
                      <span className="persona-trait">Compliance-minded</span>
                      <span className="persona-trait">ROI-driven</span>
                    </div>
                    <p className="persona-quote">"Show me proof - project portfolios, team qualifications and compliance - without making me dig."</p>
                  </div>
                </div>
                <div className="persona-card">
                  <div className="persona-avatar">💼</div>
                  <div>
                    <div className="persona-name">Job Candidate</div>
                    <div className="persona-role">Secondary - Applicant</div>
                    <div className="persona-traits">
                      <span className="persona-trait">Career-focused</span>
                      <span className="persona-trait">Mobile-first</span>
                      <span className="persona-trait">Impatient</span>
                    </div>
                    <p className="persona-quote">"I want to understand the culture and apply quickly - not abandon a slow careers page."</p>
                  </div>
                </div>
                <div className="persona-card">
                  <div className="persona-avatar">📐</div>
                  <div>
                    <div className="persona-name">Architect / Specifier</div>
                    <div className="persona-role">Tertiary - Technical Partner</div>
                    <div className="persona-traits">
                      <span className="persona-trait">Technical</span>
                      <span className="persona-trait">Detail-driven</span>
                      <span className="persona-trait">Visual</span>
                    </div>
                    <p className="persona-quote">"The blueprint tool shows the construction approach instantly."</p>
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
                  <div className="cs-comp-header">🏢 The Client</div>
                  <div className="cs-comp-cell" data-label="Primary Goal">Evaluate portfolio, qualifications and compliance.</div>
                  <div className="cs-comp-cell" data-label="Core Frustration">Couldn't find relevant case studies (73%).</div>
                  <div className="cs-comp-cell highlight" data-label="Design Insight">Card taxonomy filtered by Type, Service, Location &amp; Size.</div>
                </div>
                <div className="cs-comp-col">
                  <div className="cs-comp-header">💼 The Candidate</div>
                  <div className="cs-comp-cell" data-label="Primary Goal">Explore careers and apply fast.</div>
                  <div className="cs-comp-cell" data-label="Core Frustration">68% abandoned a slow careers page.</div>
                  <div className="cs-comp-cell highlight" data-label="Design Insight">A modular flow that cut apply time to 3.2 min.</div>
                </div>
                <div className="cs-comp-col">
                  <div className="cs-comp-header">📐 The Architect</div>
                  <div className="cs-comp-cell" data-label="Primary Goal">Understand the build approach technically.</div>
                  <div className="cs-comp-cell" data-label="Core Frustration">Static specs that are hard to interpret.</div>
                  <div className="cs-comp-cell highlight" data-label="Design Insight">Interactive Blueprint Explorer &amp; Material Selector.</div>
                </div>
              </div>
            </section>


            {/* 03 - IDEATION */}
            <section className="cs-section" data-sec="ideation">
              <div className="cs-section-divider">
                <span className="cs-section-num">03 --</span>
                <span className="cs-section-num">Structure &amp; Flow</span>
                <div className="cs-section-line"></div>
              </div>
              <h2 className="cs-section-title">Ideation &amp; Structure</h2>

              <h3 className="cs-sub-heading">User Flow: Filter, Explore, Verify, Act</h3>

              <div className="cs-flow">
                <div className="flow-step"><div className="flow-node">🏠</div><div className="flow-label">Landing</div></div>
                <div className="flow-arrow"></div>
                <div className="flow-step"><div className="flow-node">🗂️</div><div className="flow-label">Filter Projects</div></div>
                <div className="flow-arrow"></div>
                <div className="flow-step"><div className="flow-node">📐</div><div className="flow-label">Blueprint Explorer</div></div>
                <div className="flow-arrow"></div>
                <div className="flow-step"><div className="flow-node">✅</div><div className="flow-label">Verify Team</div></div>
                <div className="flow-arrow"></div>
                <div className="flow-step"><div className="flow-node">📝</div><div className="flow-label">Apply / Enquire</div></div>
              </div>

              <div className="cs-callout">
                <div className="cs-callout-icon">💡</div>
                <p className="cs-callout-text">A <strong style={{ color: '#fff' }}>card-based information architecture</strong> with four entry filters - Project Type, Service, Location and Project Size - let users slice a complex portfolio quickly, while interactive tools turned dense data into something explorable.</p>
              </div>

              <h3 className="cs-sub-heading">Architecture &amp; Interaction</h3>

              <div className="ia-grid">
                <div className="cs-card">
                  <div className="cs-card-icon">🗂️</div>
                  <h4>Card Filters</h4>
                  <p>Type · Service · Location · Size</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">📐</div>
                  <h4>Blueprint Explorer</h4>
                  <p>Interactive floorplan tool</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">🧱</div>
                  <h4>Material Selector</h4>
                  <p>Visual materials browser</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">✅</div>
                  <h4>Credentials Portal</h4>
                  <p>Quick team verification</p>
                </div>
              </div>
            </section>


            {/* 04 - VISUAL DESIGN */}
            <section className="cs-section" data-sec="design">
              <div className="cs-section-divider">
                <span className="cs-section-num">04 --</span>
                <span className="cs-section-num">The Solution</span>
                <div className="cs-section-line"></div>
              </div>
              <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

              <p className="cs-body">
                The visual system leaned into a deliberate "Block Appearance" - card-based, grid-structured layouts with distinct modular components rather than fluid, minimal surfaces. A construction-themed palette and bold, structured type reinforced a sturdy, industrial feel while holding to WCAG 2.1 AA contrast.
              </p>

              <div className="creative-styleguide">
                <div className="sg-unit">
                  <div className="glass-box">
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
                      <span className="typo-weight-item">Light</span>
                      <span className="typo-weight-item">Regular</span>
                      <span className="typo-weight-item">Medium</span>
                      <span className="typo-weight-item">Semi Bold</span>
                      <span className="typo-weight-item">Bold</span>
                      <span className="typo-weight-item">Heavy</span>
                    </div>
                  </div>
                </div>

                <div className="sg-unit">
                  <div className="glass-box">
                    <div className="sg-unit-title">Color</div>
                    <p className="sg-unit-desc">A green and bluish-toned palette was used - these are the colours of the company's logo and overall brand theme.</p>
                    <div className="color-strip">
                      <div className="color-block" style={{ background: '#1F394F' }}><span className="color-hex">#1F394F</span></div>
                      <div className="color-block" style={{ background: '#01A59E' }}><span className="color-hex">#01A59E</span></div>
                      <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="cs-sub-heading">High-Fidelity Project Deliverables</h3>
              <p className="cs-body">The block-appearance screens leaned on modular cards and a structured grid to make a dense construction portfolio easy to scan.</p>

              <div className="ui-gallery">
                {/* Row 1: Moving Right */}
                <div className="ui-marquee-track ui-track-2" id="marquee-3">
                  {/* Set 1 */}
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Home Sceen - Main View.png">
                    <img src="/Images/projects/vebuild/block/Home Sceen - Main View.png" alt="Home - Main View" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Home · Main View</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Company Description.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Company Description.png" alt="Our Company - Description" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Description</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Gallery.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Gallery.png" alt="Our Company - Gallery" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Gallery</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Organization Structure.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Organization Structure.png" alt="Our Company - Organization Structure" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Org Structure</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Certifications.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Certifications.png" alt="Our Company - Certifications" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Certifications</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Projects.png">
                    <img src="/Images/projects/vebuild/block/Projects.png" alt="Projects" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Projects</div>
                  </div>
                  {/* Set 2 (Duplicate for loop) */}
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Home Sceen - Main View.png">
                    <img src="/Images/projects/vebuild/block/Home Sceen - Main View.png" alt="Home - Main View" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Home · Main View</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Company Description.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Company Description.png" alt="Our Company - Description" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Description</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Gallery.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Gallery.png" alt="Our Company - Gallery" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Gallery</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Organization Structure.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Organization Structure.png" alt="Our Company - Organization Structure" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Org Structure</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Company - Certifications.png">
                    <img src="/Images/projects/vebuild/block/Our Company - Certifications.png" alt="Our Company - Certifications" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Company · Certifications</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Projects.png">
                    <img src="/Images/projects/vebuild/block/Projects.png" alt="Projects" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Projects</div>
                  </div>
                </div>

                {/* Row 2: Moving Left */}
                <div className="ui-marquee-track ui-track-1" id="marquee-4">
                  {/* Set 1 */}
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Products.png">
                    <img src="/Images/projects/vebuild/block/Our Products.png" alt="Our Products" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Products</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/group of companies.png">
                    <img src="/Images/projects/vebuild/block/group of companies.png" alt="Group of Companies" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Group of Companies</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/CSR.png">
                    <img src="/Images/projects/vebuild/block/CSR.png" alt="Corporate Social Responsibility" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">CSR</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/careers.png">
                    <img src="/Images/projects/vebuild/block/careers.png" alt="Careers" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Careers</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/contact us.png">
                    <img src="/Images/projects/vebuild/block/contact us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Contact Us</div>
                  </div>
                  {/* Set 2 (Duplicate for loop) */}
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/Our Products.png">
                    <img src="/Images/projects/vebuild/block/Our Products.png" alt="Our Products" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Our Products</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/group of companies.png">
                    <img src="/Images/projects/vebuild/block/group of companies.png" alt="Group of Companies" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Group of Companies</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/CSR.png">
                    <img src="/Images/projects/vebuild/block/CSR.png" alt="Corporate Social Responsibility" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">CSR</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/careers.png">
                    <img src="/Images/projects/vebuild/block/careers.png" alt="Careers" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Careers</div>
                  </div>
                  <div className="ui-card" data-full="/Images/projects/vebuild/block/contact us.png">
                    <img src="/Images/projects/vebuild/block/contact us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                    <div className="ui-card-label">Contact Us</div>
                  </div>
                </div>
              </div>
            </section>


            {/* 05 - VIBE & INTERACTIONS */}
            <section className="cs-section" data-sec="vibe">
              <div className="cs-section-divider">
                <span className="cs-section-num">05 --</span>
                <span className="cs-section-num">The Vibe</span>
                <div className="cs-section-line"></div>
              </div>
              <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

              <p className="cs-body">
                Where the later direction went fluid and minimal, this earlier concept embraced structure - modular blocks, defined edges, and an "Expert Mode" toggle that let power users dial up detail. The intent: make industrial complexity feel organised and trustworthy.
              </p>

              <div className="cs-cards-grid">
                <div className="cs-card">
                  <div className="cs-card-icon">🧱</div>
                  <h4>Modular Blocks</h4>
                  <p>Distinct, card-based components give every piece of information a clear container - reducing overwhelm when data gets dense.</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">🎚️</div>
                  <h4>Progressive Disclosure</h4>
                  <p>Simplified project cards with expandable specifications and an "Expert Mode" toggle reveal depth only when the user wants it.</p>
                </div>
                <div className="cs-card">
                  <div className="cs-card-icon">🛠️</div>
                  <h4>Interactive Tools</h4>
                  <p>A Blueprint Explorer and Material Selector turn static specs into something clients can explore and understand instantly.</p>
                </div>
              </div>
            </section>


            {/* 06 - RESULTS */}
            <section className="cs-section" data-sec="results">
              <div className="cs-section-divider">
                <span className="cs-section-num">06 --</span>
                <span className="cs-section-num">Results &amp; Reflection</span>
                <div className="cs-section-line"></div>
              </div>
              <h2 className="cs-section-title">Outcome &amp; Impact</h2>

              <h3 className="cs-sub-heading">Key Outcomes</h3>

              <div className="outcome-grid">
                <div className="outcome-card">
                  <div className="outcome-metric" data-count="62" data-suffix="%">0</div>
                  <div className="outcome-label">Increase in project-page engagement</div>
                </div>
                <div className="outcome-card">
                  <div className="outcome-metric" data-count="81" data-suffix="%">0</div>
                  <div className="outcome-label">Reduction in support queries</div>
                </div>
              </div>

              <div className="cs-highlight" style={{ marginTop: '28px' }}>
                <p>"The blueprint tool shows our construction approach instantly… it doesn't make me feel technologically challenged."</p>
              </div>

              <div className="reflection-grid">
                <div className="reflection-card">
                  <h4>📈 Outcome</h4>
                  <p>Project-page engagement rose 62% and support queries dropped 81%, while application time fell from 7.5 to 3.2 minutes - with the mobile gallery loading in under 1.5s and a 98/100 PageSpeed score.</p>
                </div>
                <div className="reflection-card">
                  <h4>💡 What Worked</h4>
                  <p>The block, card-based system made dense construction data scannable, and interactive tools like the Blueprint Explorer turned complexity into engagement.</p>
                </div>
                <div className="reflection-card">
                  <h4>🚀 Next Steps</h4>
                  <p>Planned evolution included AR project visualisation, BIM model integration, and multilingual support.</p>
                </div>
                <div className="reflection-card">
                  <h4>💬 Conclusion</h4>
                  <p>This concept showed how UX engineering can transform industrial complexity into intuitive digital experiences that educate clients, empower partners, and engage talent.</p>
                </div>
              </div>

              <div className="cs-cta-row">
                <a href="https://www.behance.net/gallery/198687327/VEBUILD-Web-UI-Design" target="_blank" rel="noopener" className="cs-cta-btn primary">View on Behance →</a>
                <a href="https://www.figma.com/design/zwKbWePPKM1ujfCR418sg1/VEBUILD?node-id=0%3A1&t=hNPTrYJYqBC6AXRC-1" target="_blank" rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
              </div>
            </section>

          </div>{/* /#panel-blocked */}

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
          <p id="redirect-msg" className="redirect-msg">Do you wish to continue to view this project on Behance?</p>
          <div className="redirect-cta-row">
            <button id="redirect-cancel" className="redirect-btn ghost">Stay Here</button>
            <a id="redirect-confirm" href="#" target="_blank" rel="noopener" className="redirect-btn primary">Continue ↗</a>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
