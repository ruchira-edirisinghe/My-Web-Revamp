'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyLms() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Modernizing <span className="tagline-name">Knowledge Hubs</span></>}
    >
      {/* FLOATING TABLE OF CONTENTS */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Problem</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Research</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">Ideation</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Solution</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span
              className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>

        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">ZUSE Corporate<br/>Learning System</h1>
            <p className="cs-hero-subtitle">Modernizing the Corporate Knowledge Ecosystem</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/LMS/cover.png" alt="ZUSE Corporate LMS Case Study Cover" className="cs-cover-img"
              id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">Lead UI/UX Designer<br/>UX Researcher</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Timeline</div>
              <div className="cs-meta-value">8 Weeks<br/>2024</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Adobe Illustrator</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web SaaS<br/>Responsive</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Published</div>
              <div className="cs-meta-value">Behance</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Legacy LMS platforms are often where professional growth goes to die. Cluttered dashboards, confusing
              navigation, and "one-size-fits-all" learning paths create friction for the very people they are meant to
              empower. ZUSE LMS strips away this bureaucracy, replacing it with a <em
                style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>fluid, card-based interface</em> that
              treats corporate training as a premium digital experience.
            </p>
          </div>


          {/* 01 — THE PROBLEM */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context & The Friction</h2>

            <p className="cs-body">
              Corporate employees frequently report that their internal learning systems feel "disconnected" from their
              workflow. ZUSE Corporate LMS was faced with a critical challenge: How do we transform a functional necessity
              into an interactive destination that employees actually enjoy visiting? Complex hierarchies and dated UI
              patterns were causing record-high course abandonment rates among senior professionals.
            </p>

            <div className="cs-highlight">
              <p>"Employees were spending an average of <em>6–9 minutes</em> just to find basic course information —
                leading to high drop-off rates before the learning even began."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧠</div>
                <h4>Problem Statement</h4>
                <p>Dated UI hierarchies and cluttered dashboards were causing senior executives and busy professionals to
                  abandon their mandatory training modules.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Strategic Goal</h4>
                <p>Redesign the hub to achieve a 50% increase in course engagement through progressive disclosure and an
                  intuitive card-based dashboard layout.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Busy corporate professionals (25-55), company administrators, and HR managers seeking simplified
                  compliance tracking and personal growth.</p>
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
            <h2 className="cs-section-title">Discovery & Analysis</h2>

            <p className="cs-body">
              Competitive benchmarking against five major corporate training platforms revealed that "efficiency" was
              consistently sacrificed for "feature count." Observation sessions showed users getting lost in menu labyrinths
              when trying to perform the simplest task: resuming a course.
            </p>

            <h3 className="cs-sub-heading">Competitive Analysis</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Legacy LMS Failures</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Dense, table-heavy layouts with zero visual relief
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Sidebar menus with 15+ top-level links causing choice paralysis
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Poor mobile responsiveness and broken session persistence
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> ZUSE Opportunities</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Progressive disclosure of course materials to reduce cognitive load
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Personalized metrics surfacing "Next Up" modules immediately
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Dedicated "Quick Access" for certificates and achievement tracking
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🏃‍♂️</div>
                <div>
                  <div className="persona-name">Kusum Perera</div>
                  <div className="persona-role">Primary — Busy Professional · Age 28</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Impatient</span>
                    <span className="persona-trait">Achiever</span>
                  </div>
                  <p className="persona-quote">"I need to jump in, finish a module during my commute, and know exactly where I
                    left off."</p>
                </div>
              </div>

              <div className="persona-card">
                <div className="persona-avatar">💼</div>
                <div>
                  <div className="persona-name">Damith Wickramasinghe</div>
                  <div className="persona-role">Secondary — Division Manager · Age 45</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Desktop user</span>
                    <span className="persona-trait">Compliance-focused</span>
                    <span className="persona-trait">Busy</span>
                  </div>
                  <p className="persona-quote">"I need to track certifications for my entire team without digging through nested
                    reports."</p>
                </div>
              </div>

              <div className="persona-card">
                <div className="persona-avatar">🛠️</div>
                <div>
                  <div className="persona-name">Dilshan Ratnayake</div>
                  <div className="persona-role">Tertiary — HR System Admin · Age 34</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Quick-access</span>
                    <span className="persona-trait">Batch-editor</span>
                    <span className="persona-trait">Internal Tech Support</span>
                  </div>
                  <p className="persona-quote">"I spend half my day helping people reset passwords or find hidden course library
                    links."</p>
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
                <div className="cs-comp-header">🏃‍♂️ Kusum Perera (Learner)</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Skill Acquisition & quick course completion.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Menu Labyrinths. Takes 5+ clicks to resume.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a "Resume Now" primary hero action.
                </div>
              </div>

              <div className="cs-comp-col">
                <div className="cs-comp-header">💼 Damith Wickramasinghe (Manager)</div>
                <div className="cs-comp-cell" data-label="Primary Goal">One-click compliance reporting for team.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Data Overload. Reports are too complex to scan.
                </div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs visualized progress bars & red-flag
                  alerts.</div>
              </div>

              <div className="cs-comp-col">
                <div className="cs-comp-header">🛠️ Dilshan Ratnayake (Support)</div>
                <div className="cs-comp-cell" data-label="Primary Goal">System maintenance and batch user management.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">UI inconsistency between user/admin views.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a consolidated action-bar for mass
                  edits.</div>
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
            <h2 className="cs-section-title">Mapping the Workflow</h2>

            <h3 className="cs-sub-heading">User Flow: Learning Journey Redefined</h3>

            <div className="cs-flow">
              <div className="flow-step">
                <div className="flow-node">🏠</div>
                <div className="flow-label">Login</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">📊</div>
                <div className="flow-label">Dashboard</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">📚</div>
                <div className="flow-label">Course Hub</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🎓</div>
                <div className="flow-label">Learning Player</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🏆</div>
                <div className="flow-label">Certification</div>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">We reduced the navigation burden by <strong style={{ color: '#fff' }}>40%</strong> by
                condensing 12 legacy menu items into 5 intelligent dashboard categories. The persistence of learner context
                across sessions became the primary design pillar.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🏠</div>
                <h4>Dashboard</h4>
                <p>Overview · Progress · Recent · Achievements</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📚</div>
                <h4>Library</h4>
                <p>Courses · Catalog · Categories · Recommendations</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📊</div>
                <h4>Analytics</h4>
                <p>Reports · Stats · Benchmarks · Team tracking</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🛡️</div>
                <h4>Account</h4>
                <p>Profile · Settings · Notifications · Help</p>
              </div>
            </div>
          </section>


          {/* 04 — SOLUTION / DESIGN */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 ——</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Identity & Style Guide</h2>

            <p className="cs-body">
              The visual system prioritize accessibility and focus. By utilizing a high-contrast palette of deep primary
              blues and turquoise accents, we created an environment that feels both professional and energized.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">

                <div className="glass-box">
                  <div className="typo-hero">SF Pro Display</div>

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
                    <span className="typo-weight-item">Regular</span>
                    <span className="typo-weight-item">Semi Bold</span>
                    <span className="typo-weight-item">Bold</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">

                <div className="glass-box">
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#1C64F2' }}><span className="color-hex">#1C64F2</span></div>
                    <div className="color-block" style={{ background: '#FFF8F1' }}><span className="color-hex">#FFF8F1</span></div>
                    <div className="color-block" style={{ background: '#D03801' }}><span className="color-hex">#D03801</span></div>
                    <div className="color-block" style={{ background: '#EDFAFA' }}><span className="color-hex">#EDFAFA</span></div>
                    <div className="color-block" style={{ background: '#EBF5FF' }}><span className="color-hex">#EBF5FF</span></div>
                    <div className="color-block" style={{ background: '#047481' }}><span className="color-hex">#047481</span></div>
                    <div className="color-block" style={{ background: '#8458CC' }}><span className="color-hex">#8458CC</span></div>
                    <div className="color-block" style={{ background: '#07B4BA' }}><span className="color-hex">#07B4BA</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">Interface Architecture (Onboarding)</h3>
            <p className="cs-body">A streamlined 4-step onboarding flow was implemented to ensure 100% profile activation rates
              from the first login.</p>

            <div className="ia-grid" id="onboarding-grid">
              <div className="cs-card" style={{ height: 'auto' }}
                data-full="/Images/projects/LMS/User Onboarding - Account Info.png">
                <img src="/Images/projects/LMS/User Onboarding - Account Info.png" alt="Onboarding 1"
                  style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} loading="lazy" decoding="async"/>
                <span className="cs-meta-label">Step 1</span>
                <h4 className="ui-card-label">Account Discovery</h4>
              </div>
              <div className="cs-card" style={{ height: 'auto' }}
                data-full="/Images/projects/LMS/User Onboarding - Personal Info.png">
                <img src="/Images/projects/LMS/User Onboarding - Personal Info.png" alt="Onboarding 2"
                  style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} loading="lazy" decoding="async"/>
                <span className="cs-meta-label">Step 2</span>
                <h4 className="ui-card-label">Personalization</h4>
              </div>
              <div className="cs-card" style={{ height: 'auto' }}
                data-full="/Images/projects/LMS/User Onboarding - verify Confirmation.png">
                <img src="/Images/projects/LMS/User Onboarding - verify Confirmation.png" alt="Onboarding 3"
                  style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} loading="lazy" decoding="async"/>
                <span className="cs-meta-label">Step 3</span>
                <h4 className="ui-card-label">Verification</h4>
              </div>
              <div className="cs-card" style={{ height: 'auto' }}
                data-full="/Images/projects/LMS/User Onboarding - Confirmation.png">
                <img src="/Images/projects/LMS/User Onboarding - Confirmation.png" alt="Onboarding 4"
                  style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} loading="lazy" decoding="async"/>
                <span className="cs-meta-label">Step 4</span>
                <h4 className="ui-card-label">Success</h4>
              </div>
            </div>

            <h3 className="cs-sub-heading">High-Fidelity Project Deliverables</h3>

            <div className="ui-gallery">
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                <div className="ui-card" data-full="/Images/projects/LMS/Login.png"><img
                    src="/Images/projects/LMS/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Gateway</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Home.png"><img src="/Images/projects/LMS/Home.png"
                    alt="Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Courses.png"><img
                    src="/Images/projects/LMS/Courses.png" alt="Courses" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Curriculum</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course Overview.png"><img
                    src="/Images/projects/LMS/Course Overview.png" alt="Syllabus" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Syllabus</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course View.png"><img
                    src="/Images/projects/LMS/Course View.png" alt="Learning" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Active Learning</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/My Profile.png"><img
                    src="/Images/projects/LMS/My Profile.png" alt="Profile" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Identity</div>
                </div>
                {/* Duplicates */}
                <div className="ui-card" data-full="/Images/projects/LMS/Login.png"><img
                    src="/Images/projects/LMS/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Gateway</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Home.png"><img src="/Images/projects/LMS/Home.png"
                    alt="Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Courses.png"><img
                    src="/Images/projects/LMS/Courses.png" alt="Courses" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Curriculum</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course Overview.png"><img
                    src="/Images/projects/LMS/Course Overview.png" alt="Syllabus" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Syllabus</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course View.png"><img
                    src="/Images/projects/LMS/Course View.png" alt="Learning" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Active Learning</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/My Profile.png"><img
                    src="/Images/projects/LMS/My Profile.png" alt="Profile" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Identity</div>
                </div>
              </div>

              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                <div className="ui-card" data-full="/Images/projects/LMS/Courses.png"><img
                    src="/Images/projects/LMS/Courses.png" alt="Courses" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Curriculum</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course Overview.png"><img
                    src="/Images/projects/LMS/Course Overview.png" alt="Syllabus" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Syllabus</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course View.png"><img
                    src="/Images/projects/LMS/Course View.png" alt="Learning" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Active Learning</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/My Profile.png"><img
                    src="/Images/projects/LMS/My Profile.png" alt="Profile" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Identity</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Login.png"><img
                    src="/Images/projects/LMS/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Gateway</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Home.png"><img src="/Images/projects/LMS/Home.png"
                    alt="Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Dashboard</div>
                </div>
                {/* Duplicates */}
                <div className="ui-card" data-full="/Images/projects/LMS/Courses.png"><img
                    src="/Images/projects/LMS/Courses.png" alt="Courses" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Curriculum</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course Overview.png"><img
                    src="/Images/projects/LMS/Course Overview.png" alt="Syllabus" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Syllabus</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Course View.png"><img
                    src="/Images/projects/LMS/Course View.png" alt="Learning" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Active Learning</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/My Profile.png"><img
                    src="/Images/projects/LMS/My Profile.png" alt="Profile" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Identity</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Login.png"><img
                    src="/Images/projects/LMS/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Gateway</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/LMS/Home.png"><img src="/Images/projects/LMS/Home.png"
                    alt="Home" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Dashboard</div>
                </div>
              </div>
            </div>
          </section>


          {/* 05 — RESULTS & REFLECTION */}
          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">Results & Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome & Growth</h2>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="3" data-suffix=" clicks">0</div>
                <div className="outcome-label">Time to course discovery (down from 8 clicks)</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="98" data-suffix="%">0</div>
                <div className="outcome-label">Onboarding completion rate (up from 42%)</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: 28 }}>
              <p>"The redesigned interface proved that <em>professional</em> doesn't have to mean <em>boring</em>. By
                treating learners like premium customers, we saw interactivity spikes across all age groups."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>🧠 Lessons Learned</h4>
                <p>Onboarding is the most critical junction. By simplifying the entry point into 4 digestible steps, we
                  eliminated the anxiety associated with legacy corporate system complexity.</p>
              </div>
              <div className="reflection-card">
                <h4>⏮️ Reflection</h4>
                <p>Designing for a SaaS environment requires a robust design-system approach from Day 1. The card-based
                  components made scaling the courses library significantly more systematic.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.behance.net/gallery/199770923/ZUSE-Cooperate-LMS-UI" target="_blank" rel="noopener"
                className="cs-cta-btn primary">View Behance Showcase →</a>
              <a href="https://www.figma.com/design/Q6NuDc8wpRvIlUe3xndrLa/Cooperate-LMS?node-id=0-1&t=322WWMLNiS7VZs9c-1"
                target="_blank" rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round">
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
