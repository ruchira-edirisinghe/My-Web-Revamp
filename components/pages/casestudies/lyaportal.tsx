'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyLyaportal() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Simplifying the <span className="tagline-name">Exam Journey</span></>}
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

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          <header className="cs-hero-header">
            <h1 className="cs-hero-title">LYA Exam Portal</h1>
            <p className="cs-hero-subtitle">An Online Exam Registration &amp; Payment Portal for Students, Parents &amp; Teachers</p>
          </header>

          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/lyaportal/cover.png" alt="LYA Exam Portal — online examination portal cover"
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
              <div className="cs-meta-value">Web Portal<br/>Multi-Role</div>
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
              <div className="cs-meta-label">Roles</div>
              <div className="cs-meta-value">Student · Parent<br/>Teacher</div>
            </div>
          </div>

          <div className="cs-elevator">
            <p>
              Registering and paying for an exam is often the most stressful part of taking one — scattered forms, unclear fees and no shared view for the families and teachers involved. The LYA Exam Portal — Lyceum Academy's online examination platform — turns that chaos into a calm, guided journey across three roles, where every step is <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>clear, trusted and stress-free.</em>
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
              Exam registration touches three very different people — the student sitting the exam, the parent often paying for it, and the teacher who oversees the details. Most portals are built for just one of them, leaving the others to wrestle with confusing forms, opaque payment options and no shared source of truth.
            </p>

            <div className="cs-highlight">
              <p>"Registering and paying for an exam should feel as reassuring as the result itself — <em>clear, trusted, and stress-free.</em>"</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>A single, generic flow couldn't serve students, parents and teachers at once — and unclear payment options (online vs. bank transfer) made the most critical step the most anxious one.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Design one cohesive portal with tailored journeys per role, a guided registration-to-payment flow, and flexible, trustworthy payment options that work for local realities.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Students registering and sitting exams, parents paying and tracking on their behalf, and teachers confirming and overseeing exam details.</p>
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
              The defining insight was that this is a multi-role product. Each role enters with a different goal and a different anxiety, so the research focused on mapping those journeys and the trust gaps in the payment step that derail them.
            </p>

            <h3 className="cs-sub-heading">Typical Portals vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Portal Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>One generic flow forced onto every type of user</li>
                    <li><div className="cs-list-bullet"></div>Payment as a confusing dead-end with no feedback</li>
                    <li><div className="cs-list-bullet"></div>No way to handle offline / bank-transfer realities</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> LYA Portal's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Role-based dashboards for student, parent &amp; teacher</li>
                    <li><div className="cs-list-bullet"></div>A guided, well-signposted registration-to-pay flow</li>
                    <li><div className="cs-list-bullet"></div>Online + bank-transfer payment with clear status states</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🎓</div>
                <div>
                  <div className="persona-name">The Student</div>
                  <div className="persona-role">Primary — Exam Candidate</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Time-pressured</span>
                    <span className="persona-trait">Wants clarity</span>
                  </div>
                  <p className="persona-quote">"I just want to find my exam, confirm my details, and pay — without confusion."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">👨‍👩‍👧</div>
                <div>
                  <div className="persona-name">The Parent</div>
                  <div className="persona-role">Secondary — Payer / Guardian</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Trust-seeking</span>
                    <span className="persona-trait">Record-keeping</span>
                    <span className="persona-trait">Occasional</span>
                  </div>
                  <p className="persona-quote">"I'm paying for my child's exams — I need to trust the process and keep a clear record."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🧑‍🏫</div>
                <div>
                  <div className="persona-name">The Teacher</div>
                  <div className="persona-role">Tertiary — Oversight</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Detail-oriented</span>
                    <span className="persona-trait">Routine</span>
                    <span className="persona-trait">Accuracy</span>
                  </div>
                  <p className="persona-quote">"I need to confirm exam details and keep everything accurate for my students."</p>
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
                <div className="cs-comp-header">🎓 Student</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Register and pay for the right exam quickly.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Cluttered flows and an unclear payment step.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A focused dashboard and a guided, linear pay flow.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">👨‍👩‍👧 Parent</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Pay on a child's behalf and keep records.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">No trust signals or payment history.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A parent dashboard with a clear "My Payments" trail.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🧑‍🏫 Teacher</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Confirm and oversee exam details.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">No dedicated space to verify information.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A teacher flow with focused detail-confirmation screens.</div>
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

            <h3 className="cs-sub-heading">User Flow: Register to Pay</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🔐</div><div className="flow-label">Login</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📊</div><div className="flow-label">Dashboard</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📝</div><div className="flow-label">Browse Exams</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✅</div><div className="flow-label">Confirm Details</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">💳</div><div className="flow-label">Pay &amp; Confirm</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The same core journey was tailored into <strong style={{ color: '#fff' }}>three role-based flows</strong> — student, parent and teacher — sharing one design system so the portal feels consistent no matter who logs in.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📊</div>
                <h4>Dashboard</h4>
                <p>Overview · Notifications · Quick Actions</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📝</div>
                <h4>Exams</h4>
                <p>All Exams · My Exams · Details</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💳</div>
                <h4>Payments</h4>
                <p>Online · Bank Transfer · My Payments</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👤</div>
                <h4>Account</h4>
                <p>Login · Roles · Profile</p>
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
              The interface leans on a blue-and-mainly-white palette to reflect trust and professionalism — calm, welcoming, and easy to focus in, which matters most when money and exams are on the line. A single design system keeps all three role flows visually consistent.
            </p>

            <div className="creative-styleguide">

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Poppins embodies a modernist clarity and versatility — its geometric, monolinear strokes balance neutrality with subtle warmth, suiting a wide range of digital environments.</p>
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
                    <span className="typo-weight-item" style={{ fontWeight: 300 }}>Light</span>
                    <span className="typo-weight-item" style={{ fontWeight: 400 }}>Regular</span>
                    <span className="typo-weight-item" style={{ fontWeight: 500 }}>Medium</span>
                    <span className="typo-weight-item" style={{ fontWeight: 600 }}>Semi Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Bold</span>
                  </div>
                </div>
              </div>

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A blue and mainly-white palette was used to reflect trust and professionalism, for a calm and welcoming interface.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">#000000</span></div>
                    <div className="color-block" style={{ background: '#285BA2' }}><span className="color-hex">#285BA2</span></div>
                    <div className="color-block" style={{ background: '#E5EBF3' }}><span className="color-hex">#E5EBF3</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">A cross-section of the portal — from login and dashboards to the exam list, details confirmation, and the full payment journey across roles. Click any screen to view it in high resolution.</p>

            <div className="ui-gallery">
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                <div className="ui-card" data-full="/Images/projects/lyaportal/Login.png">
                  <img src="/Images/projects/lyaportal/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Dashboard 1.png">
                  <img src="/Images/projects/lyaportal/Dashboard 1.png" alt="Student Dashboard" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Student Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/All Exams.png">
                  <img src="/Images/projects/lyaportal/All Exams.png" alt="All Exams" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">All Exams</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/My Exams.png">
                  <img src="/Images/projects/lyaportal/My Exams.png" alt="My Exams" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Exams</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Details Confirmation.png">
                  <img src="/Images/projects/lyaportal/Details Confirmation.png" alt="Details Confirmation" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Details Confirmation</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/My Payments.png">
                  <img src="/Images/projects/lyaportal/My Payments.png" alt="My Payments" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Payments</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Login.png">
                  <img src="/Images/projects/lyaportal/Login.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Dashboard 1.png">
                  <img src="/Images/projects/lyaportal/Dashboard 1.png" alt="Student Dashboard" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Student Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/All Exams.png">
                  <img src="/Images/projects/lyaportal/All Exams.png" alt="All Exams" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">All Exams</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/My Exams.png">
                  <img src="/Images/projects/lyaportal/My Exams.png" alt="My Exams" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Exams</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Details Confirmation.png">
                  <img src="/Images/projects/lyaportal/Details Confirmation.png" alt="Details Confirmation" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Details Confirmation</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/My Payments.png">
                  <img src="/Images/projects/lyaportal/My Payments.png" alt="My Payments" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">My Payments</div>
                </div>
              </div>

              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                <div className="ui-card" data-full="/Images/projects/lyaportal/Select Payment Method.png">
                  <img src="/Images/projects/lyaportal/Select Payment Method.png" alt="Select Payment Method" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Select Payment</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Bank Transfer Payment.png">
                  <img src="/Images/projects/lyaportal/Bank Transfer Payment.png" alt="Bank Transfer Payment" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Bank Transfer</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Online Payment Successful.png">
                  <img src="/Images/projects/lyaportal/Online Payment Successful.png" alt="Payment Successful" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Payment Success</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Dashboard --_ Notifications.png">
                  <img src="/Images/projects/lyaportal/Dashboard --_ Notifications.png" alt="Notifications" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Notifications</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/teacher-flow/Dashboard 2.png">
                  <img src="/Images/projects/lyaportal/teacher-flow/Dashboard 2.png" alt="Teacher Dashboard" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Teacher Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/parent-flow/Dashboard 3.png">
                  <img src="/Images/projects/lyaportal/parent-flow/Dashboard 3.png" alt="Parent Dashboard" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Parent Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Select Payment Method.png">
                  <img src="/Images/projects/lyaportal/Select Payment Method.png" alt="Select Payment Method" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Select Payment</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Bank Transfer Payment.png">
                  <img src="/Images/projects/lyaportal/Bank Transfer Payment.png" alt="Bank Transfer Payment" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Bank Transfer</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Online Payment Successful.png">
                  <img src="/Images/projects/lyaportal/Online Payment Successful.png" alt="Payment Successful" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Payment Success</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/Dashboard --_ Notifications.png">
                  <img src="/Images/projects/lyaportal/Dashboard --_ Notifications.png" alt="Notifications" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Notifications</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/teacher-flow/Dashboard 2.png">
                  <img src="/Images/projects/lyaportal/teacher-flow/Dashboard 2.png" alt="Teacher Dashboard" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Teacher Dashboard</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/lyaportal/parent-flow/Dashboard 3.png">
                  <img src="/Images/projects/lyaportal/parent-flow/Dashboard 3.png" alt="Parent Dashboard" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Parent Dashboard</div>
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
              The emotional target was reassurance. Around the highest-stakes moment — payment — the design works hardest to remove doubt, with clear choices, honest status, and a graceful path back when something goes wrong.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧭</div>
                <h4>Role-Based Dashboards</h4>
                <p>Student, parent and teacher each land on a dashboard tuned to their goals — one product, three confident entry points.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💳</div>
                <h4>Flexible Payments</h4>
                <p>Instant online payment sits beside bank transfer — including an "upload slip later" path — so the portal fits real-world payment habits.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✅</div>
                <h4>Honest Status States</h4>
                <p>Every payment ends in a clear success or failure screen with next steps — turning the most anxious step into a reassuring one.</p>
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
                <div className="outcome-metric" data-count="3" data-suffix=" Roles">0</div>
                <div className="outcome-label">Dedicated journeys — Student, Parent &amp; Teacher</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="40" data-suffix="+ Screens">0</div>
                <div className="outcome-label">High-fidelity screens across every flow &amp; payment state</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"One portal, three confident journeys — with the payment step finally feeling as <em>trustworthy</em> as it should."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete, consistent multi-role portal: three tailored flows and 40+ high-fidelity screens covering registration, role-based dashboards, and every online and bank-transfer payment state.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Designing three parallel flows that stay consistent — and covering payment edge cases (failures, "upload slip later") without overwhelming the happy path.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>A shared design system is what makes multi-role products feel like one product. Designing the unhappy states (failed / pending payments) is as important as the success ones.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Hand off to development, add automated reminders for pending bank transfers, and extend the system to results publishing and admin reporting.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.figma.com/design/HaFcGnIIpF8tVnnYJudJjD/LYA-Exam-Portal-UI?node-id=264-2184" target="_blank"
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
            <img id="cs-modal-img" alt="Case Study Preview" loading="lazy" decoding="async"/>
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
