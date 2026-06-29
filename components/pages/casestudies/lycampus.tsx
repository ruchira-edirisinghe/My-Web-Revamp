'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyLycampus() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Crafting the <span className="tagline-name">Campus Experience</span></>}
    >
      {/* FLOATING TABLE OF CONTENTS */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Problem</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Research</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Ideation</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Design</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-vibe"><span className="cs-toc-label">Vibe</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>

        <div className="cs-wrap">

          <a href="/projects/web" className="back-link"><span>←</span> Back to Projects</a>

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Lyceum Campus<br/>Web Redesign</h1>
            <p className="cs-hero-subtitle">Reimagining a University's Digital Front Door</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/lyceum/cover.png" alt="Lyceum Campus — University Website Web UI Redesign cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Designer<br/>UX Researcher</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Timeline</div>
              <div className="cs-meta-value">6 Weeks<br/>2024</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Adobe Illustrator</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>Responsive</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Published</div>
              <div className="cs-meta-value">Behance</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              A university's website is often the first handshake with a prospective student. Lyceum Campus's existing site
              was fumbling that handshake — burying course information under layers of nested menus, breaking on mobile
              devices, and looking like it hadn't seen a design update in years. This project stripped everything back to
              one question: <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>what does a student
                actually need to find, and how fast can they find it?</em>
            </p>
          </div>


          {/* 01 — THE PROBLEM */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context & The Problem</h2>

            <p className="cs-body">
              Three audiences, one website, zero clarity. Prospective students couldn't find course fees. Current
              students couldn't locate exam schedules. Faculty had no streamlined portal. The existing site had grown
              organically over years — page after page bolted on without a coherent navigation strategy — until the
              whole structure became an archaeological dig rather than a digital experience.
            </p>

            <div className="cs-highlight">
              <p>"Students were spending an average of <em>4–7 minutes</em> just to find basic course information —
                something that should take under 30 seconds."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>Inconsistent navigation, cluttered layouts, and broken information hierarchy left every user
                  group — students, parents, and faculty — confused and unable to locate critical academic resources.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Redesign the entire web presence to cut navigation friction, achieve accessibility compliance
                  across all age groups, and strengthen brand identity — targeting a 60% reduction in time-to-information.
                </p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Current students (18–26), prospective applicants & parents (16–50), and faculty/admin staff —
                  each with vastly different digital literacy levels and usage patterns.</p>
              </div>
            </div>
          </section>


          {/* 02 — RESEARCH */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 ——</span>
              <span className="cs-section-num">Discovery & Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery & Research</h2>

            <p className="cs-body">
              Before touching a single pixel, the project demanded deep listening. Competitive benchmarking against
              five local and international university sites, informal interviews with enrolled students, and direct
              observation sessions revealed patterns that no amount of guesswork could surface.
            </p>

            <h3 className="cs-sub-heading">Competitive Analysis</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Where Competitors Failed</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Dense, table-heavy layouts that overwhelm first-time visitors
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>No clear visual hierarchy between primary and secondary content
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Mobile experiences that feel like desktop pages shrunk to fit
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Opportunities Spotted</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Card-based layouts with clear CTA hierarchy perform significantly
                      better
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Progressive disclosure — surface essentials first, reveal details on
                      demand
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Dedicated "Quick Access" zones for the most-searched content
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              {/* Persona 1 */}
              <div className="persona-card">
                <div className="persona-avatar">🎓</div>
                <div>
                  <div className="persona-name">Kavya Perera</div>
                  <div className="persona-role">Primary — Prospective Student · Age 18</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Impatient</span>
                    <span className="persona-trait">Visual Learner</span>
                  </div>
                  <p className="persona-quote">"I just want to know what courses you have, how much they cost, and when intake
                    starts."</p>
                </div>
              </div>

              {/* Persona 2 */}
              <div className="persona-card">
                <div className="persona-avatar">💼</div>
                <div>
                  <div className="persona-name">Mr. Silva</div>
                  <div className="persona-role">Secondary — Parent / Sponsor · Age 48</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Desktop user</span>
                    <span className="persona-trait">Detail-oriented</span>
                    <span className="persona-trait">Seeks Trust</span>
                  </div>
                  <p className="persona-quote">"Is this a recognized degree? I need to read the full curriculum and see the
                    faculty credentials."</p>
                </div>
              </div>

              {/* Persona 3 */}
              <div className="persona-card">
                <div className="persona-avatar">🏫</div>
                <div>
                  <div className="persona-name">Dr. Fernando</div>
                  <div className="persona-role">Tertiary — Faculty / Admin · Age 55</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Quick-access</span>
                    <span className="persona-trait">Internal Portals</span>
                    <span className="persona-trait">Routine</span>
                  </div>
                  <p className="persona-quote">"I use the site purely to jump into the LMS or find academic calendar updates."
                  </p>
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
                <div className="cs-comp-header">🎓 Kavya (Student)</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Finding out if Lyceum has the exact degree she wants,
                  and how to apply.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Cluttered mobile experience. Takes 5+ clicks to find
                  fees.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a "Quick Search" and massive,
                  thumb-friendly CTAs.</div>
              </div>

              {/* Persona 2 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">💼 Mr. Silva (Parent)</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Validating the investment. Wants to read detailed
                  syllabi and accreditations.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Trust markers are missing. Text is too small to read
                  on the old site.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs structured typography, high contrast,
                  and full-page tables.</div>
              </div>

              {/* Persona 3 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">🏫 Dr. Fernando (Faculty)</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Navigating to internal staff portals (LMS, Webmail) as
                  quickly as possible.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Staff links are buried inside the generic footer
                  menu.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a dedicated sticky top-bar with
                  ultra-quick links for internal systems.</div>
              </div>
            </div>
          </section>


          {/* 03 — IDEATION */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 ——</span>
              <span className="cs-section-num">Structure & Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation & Structure</h2>

            <h3 className="cs-sub-heading">User Flow: Prospective Student Journey</h3>

            <div className="cs-flow">
              <div className="flow-step">
                <div className="flow-node">🏠</div>
                <div className="flow-label">Home</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">📚</div>
                <div className="flow-label">Browse Courses</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🔍</div>
                <div className="flow-label">Course Detail</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">📋</div>
                <div className="flow-label">Admissions Info</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">✉️</div>
                <div className="flow-label">Contact / Apply</div>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The old site forced users through 5–7 clicks to reach admissions contact. The
                redesigned flow cuts that to <strong style={{ color: '#fff' }}>3 clicks</strong> — with persistent "Apply Now"
                CTAs visible at every stage of the journey.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏛️</div>
                <h4>About</h4>
                <p>History · Mission · Leadership · Campus Life</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📚</div>
                <h4>Academics</h4>
                <p>Programs · Courses · Faculties · Calendar</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📝</div>
                <h4>Admissions</h4>
                <p>Apply · Fees · Requirements · Deadlines</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌐</div>
                <h4>Campus Life</h4>
                <p>Events · Clubs · Facilities · Gallery</p>
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
            <h2 className="cs-section-title">Visual Design & Style Guide</h2>

            <p className="cs-body">
              The visual identity was redesigned from the ground up to achieve a balance between academic tradition and
              modern accessibility. The following guidelines defined the cohesive look and feel across all digital
              touchpoints.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="typo-hero">Poppins</div>

                  <div className="typo-scale-row">
                    <span className="typo-scale-item">58pt</span>
                    <span className="typo-scale-item">32pt</span>
                    <span className="typo-scale-item">20pt</span>
                    <span className="typo-scale-item">18pt</span>
                    <span className="typo-scale-item">16pt</span>
                    <span className="typo-scale-item">15pt</span>
                    <span className="typo-scale-item">14pt</span>
                    <span className="typo-scale-item">13pt</span>
                    <span className="typo-scale-item">11pt</span>
                  </div>

                  <div className="typo-weights-row">
                    <span className="typo-weight-item">Light</span>
                    <span className="typo-weight-item">Regular</span>
                    <span className="typo-weight-item">Medium</span>
                    <span className="typo-weight-item">Semi Bold</span>
                    <span className="typo-weight-item">Bold</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">#000000</span></div>
                    <div className="color-block" style={{ background: '#285BA2' }}><span className="color-hex">#285BA2</span></div>
                    <div className="color-block" style={{ background: '#E5EBF3' }}><span className="color-hex">#E5EBF3</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Project Deliverables</h3>
            <p className="cs-body">The following interface designs represent the core of the redesign, focusing on a balance of
              information density and visual clarity. Click any screen to explore it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/lyceum/Home 1.png">
                  <img src="/Images/projects/lyceum/Home 1.png" alt="Home Page" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home Page</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Events 1.png">
                  <img src="/Images/projects/lyceum/Events 1.png" alt="Events" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Events & News</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside Event 1.png">
                  <img src="/Images/projects/lyceum/Inside Event 1.png" alt="Event Detail" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Event Detail</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside a Programme 1.png">
                  <img src="/Images/projects/lyceum/Inside a Programme 1.png" alt="Programme" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Programmes</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Student Life 1.png">
                  <img src="/Images/projects/lyceum/Student Life 1.png" alt="Student Life" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Campus Life</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ About Us 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ About Us 1.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Story</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png" alt="Governance"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Leadership</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Partners 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Partners 1.png" alt="Partners" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Global Partners</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png">
                  <img src="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png" alt="Faculty"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Faculty View</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/lyceum/Home 1.png">
                  <img src="/Images/projects/lyceum/Home 1.png" alt="Home Page" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home Page</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Events 1.png">
                  <img src="/Images/projects/lyceum/Events 1.png" alt="Events" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Events & News</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside Event 1.png">
                  <img src="/Images/projects/lyceum/Inside Event 1.png" alt="Event Detail" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Event Detail</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside a Programme 1.png">
                  <img src="/Images/projects/lyceum/Inside a Programme 1.png" alt="Programme" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Programmes</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Student Life 1.png">
                  <img src="/Images/projects/lyceum/Student Life 1.png" alt="Student Life" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Campus Life</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ About Us 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ About Us 1.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Story</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png" alt="Governance"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Leadership</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Partners 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Partners 1.png" alt="Partners" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Global Partners</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png">
                  <img src="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png" alt="Faculty"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Faculty View</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/lyceum/Home 1.png">
                  <img src="/Images/projects/lyceum/Home 1.png" alt="Home Page" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home Page</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Events 1.png">
                  <img src="/Images/projects/lyceum/Events 1.png" alt="Events" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Events & News</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside Event 1.png">
                  <img src="/Images/projects/lyceum/Inside Event 1.png" alt="Event Detail" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Event Detail</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside a Programme 1.png">
                  <img src="/Images/projects/lyceum/Inside a Programme 1.png" alt="Programme" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Programmes</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Student Life 1.png">
                  <img src="/Images/projects/lyceum/Student Life 1.png" alt="Student Life" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Campus Life</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ About Us 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ About Us 1.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Story</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png" alt="Governance"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Leadership</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Partners 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Partners 1.png" alt="Partners" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Global Partners</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png">
                  <img src="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png" alt="Faculty"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Faculty View</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/lyceum/Home 1.png">
                  <img src="/Images/projects/lyceum/Home 1.png" alt="Home Page" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home Page</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Events 1.png">
                  <img src="/Images/projects/lyceum/Events 1.png" alt="Events" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Events & News</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside Event 1.png">
                  <img src="/Images/projects/lyceum/Inside Event 1.png" alt="Event Detail" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Event Detail</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Inside a Programme 1.png">
                  <img src="/Images/projects/lyceum/Inside a Programme 1.png" alt="Programme" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Programmes</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Student Life 1.png">
                  <img src="/Images/projects/lyceum/Student Life 1.png" alt="Student Life" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Campus Life</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ About Us 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ About Us 1.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Our Story</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Leadership & Governance 1.png" alt="Governance"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Leadership</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Our Story --_ Partners 1.png">
                  <img src="/Images/projects/lyceum/Our Story --_ Partners 1.png" alt="Partners" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Global Partners</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png">
                  <img src="/Images/projects/lyceum/Man Faculty Page_ Faculty Of Education 1.png" alt="Faculty"
                    className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Faculty View</div>
                </div>
              </div>
            </div>
          </section>


          {/* 05 — VIBE & INTERACTIONS */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">The Vibe</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design & Emotional Intent</h2>

            <p className="cs-body">
              A university website should evoke the feeling of arriving on campus for the first time — a blend of
              excitement,
              quiet confidence, and the sense that this is somewhere worth being. Every hover state, every page transition,
              every colour choice was deliberately tuned to reinforce that emotional resonance.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">✨</div>
                <h4>Button Feel</h4>
                <p>Primary CTAs use a spring-bounce scale on hover, creating a subtle "press" sensation that signals
                  interactivity without distraction. The emotional intent: confidence and responsiveness.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌊</div>
                <h4>Page Transitions</h4>
                <p>Content enters through staggered fade-up animations, creating a sense of the page breathing to life —
                  evoking the experience of walking into a building and having it reveal itself naturally.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎨</div>
                <h4>Colour Psychology</h4>
                <p>Navy + Blue communicates trust and authority. Cyan accents inject energy and modernity. Together, they
                  avoid the sterile white-and-grey trap of most institutional sites.</p>
              </div>
            </div>


          </section>


          {/* 06 — RESULTS & REFLECTION */}
          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 ——</span>
              <span className="cs-section-num">Results & Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Results & Reflection</h2>

            <h3 className="cs-sub-heading">Outcome Metrics</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="3" data-suffix=" clicks">0</div>
                <div className="outcome-label">Average path to admissions info (down from 7)</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="94" data-suffix="%">0</div>
                <div className="outcome-label">Task completion rate in usability testing</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"Users described the redesigned experience as '<em>clean</em>,' '<em>professional</em>,' and — most
                importantly — '<em>easy to use</em>.' Multiple test participants wished their own university's website
                worked
                this well."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>🎓 Lessons Learned</h4>
                <p>Testing with real users — not just design peers — proved essential. Even "obvious" label choices like
                  "Programmes" vs "Courses" caused significant confusion. A single wording change measurably improved
                  findability.</p>
              </div>
              <div className="reflection-card">
                <h4>⏭️ What Could Be Different</h4>
                <p>With more time, quantitative A/B testing between card-grid and list formats for the courses page would
                  strengthen the data. A proper design-token system from the start would make responsive breakpoints more
                  systematic.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Explore AI-driven personalisation — surfacing relevant programs based on browsing patterns. A dedicated
                  mobile app with offline content support would better serve students accessing study materials on the go.
                </p>
              </div>
              <div className="reflection-card">
                <h4>💬 Conclusion</h4>
                <p>This project proved that thoughtful UX isn't about adding features — it's about removing friction. A
                  university's website should be a welcoming guide, not a bureaucratic maze. The data validated the
                  approach.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.behance.net/gallery/211863631/Lyceum-Campus-Web-Redesign" target="_blank" rel="noopener"
                className="cs-cta-btn primary">View Full Project on Behance →</a>
              <a href="https://www.figma.com/design/fIaLeCxJr8lNq84jOIo4U1/Lyceum-Campus?node-id=385-1328" target="_blank"
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
