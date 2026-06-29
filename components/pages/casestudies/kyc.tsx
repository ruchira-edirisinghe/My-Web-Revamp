'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyKyc() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Verifying <span className="tagline-name">Identity</span></>}
    >
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

      <main>

        <div className="cs-wrap">

          <a href="/projects/web" className="back-link"><span>←</span> Back to Projects</a>

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">KYC Verification</h1>
            <p className="cs-hero-subtitle">A Guided Identity-Verification Flow — Designed in Both Light &amp; Dark</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/kyc/cover.png" alt="KYC Verification — identity verification flow cover"
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
              <div className="cs-meta-value">Fintech / Identity<br/>Multi-Step Flow</div>
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
              <div className="cs-meta-label">Themes</div>
              <div className="cs-meta-value">Light<br/>&amp; Dark</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              KYC is where good onboarding goes to die — long forms, blurry document uploads, anxious face scans, and no idea whether anything worked. This project reimagines identity verification as a calm, guided journey that tells you exactly what to do and what's happening at every step, <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>beautifully, in both light and dark.</em>
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
              Know-Your-Customer checks are mandatory for regulated services — but they're also one of the biggest drop-off points in onboarding. Users stall at document capture, panic during the face scan, and abandon when the interface gives no feedback on whether a step passed or failed.
            </p>

            <div className="cs-highlight">
              <p>"Verification only works when the user trusts it — every step has to say clearly <em>what to do</em>, and honestly <em>whether it worked.</em>"</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>Identity verification is high-stakes and high-friction: unclear steps, fragile document/face capture, and missing status feedback cause anxiety and abandonment.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Turn KYC into a guided, transparent flow — clear preparation, forgiving capture, explicit in-progress / success / error states, and full light &amp; dark theming.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>First-time applicants verifying their identity (often on mobile), and the compliance teams who depend on clean, reliable captures.</p>
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
              KYC sits between two needs that usually pull apart: a person who wants it over with quickly, and a compliance process that demands accuracy. The design had to satisfy both — reducing user anxiety while never compromising capture quality.
            </p>

            <h3 className="cs-sub-heading">Typical KYC Flows vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common KYC Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Dumping all requirements at once with no preparation</li>
                    <li><div className="cs-list-bullet"></div>Silent capture — no in-progress, success or error feedback</li>
                    <li><div className="cs-list-bullet"></div>One rigid theme that fights the host app's look</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Design Opportunities</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Per-step preparation screens that set expectations</li>
                    <li><div className="cs-list-bullet"></div>Live status for every upload &amp; scan (try / fail / pass)</li>
                    <li><div className="cs-list-bullet"></div>First-class light &amp; dark themes for any context</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🪪</div>
                <div>
                  <div className="persona-name">The New Applicant</div>
                  <div className="persona-role">Primary — First-time Verifier</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Impatient</span>
                    <span className="persona-trait">Privacy-aware</span>
                    <span className="persona-trait">Anxious</span>
                  </div>
                  <p className="persona-quote">"Just tell me what to do at each step — and whether it actually worked."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📱</div>
                <div>
                  <div className="persona-name">The Mobile User</div>
                  <div className="persona-role">Secondary — On-the-go</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Camera-based</span>
                    <span className="persona-trait">Distracted</span>
                  </div>
                  <p className="persona-quote">"I'm doing this on my phone — the uploads and face scan have to just work."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🛡️</div>
                <div>
                  <div className="persona-name">The Compliance Lead</div>
                  <div className="persona-role">Tertiary — Trust &amp; Risk</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Risk-aware</span>
                    <span className="persona-trait">Process-driven</span>
                    <span className="persona-trait">Auditable</span>
                  </div>
                  <p className="persona-quote">"We need clean captures and a clear pass/fail so verification holds up."</p>
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
                <div className="cs-comp-header">🪪 New Applicant</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Verify identity quickly and confidently.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">No idea if a step passed or failed.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Explicit in-progress / success / error states.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📱 Mobile User</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Capture documents &amp; face on a phone.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Fiddly capture with no guidance.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Preparation screens + forgiving, guided capture.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🛡️ Compliance Lead</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Reliable, auditable verification.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Poor captures that fail review.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Confirm-info steps and clear retry on failure.</div>
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

            <h3 className="cs-sub-heading">User Flow: The Verification Journey</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">📜</div><div className="flow-label">Consent</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧭</div><div className="flow-label">Prepare</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📄</div><div className="flow-label">Upload Documents</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🤳</div><div className="flow-label">Face Scan</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✅</div><div className="flow-label">Verified</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">Each stage opens with a <strong style={{ color: '#fff' }}>preparation screen</strong> that sets expectations before any capture, and closes with an explicit result — so users always know <strong style={{ color: '#fff' }}>what's next and whether it worked.</strong></p>
            </div>

            <h3 className="cs-sub-heading">The Four Steps</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h4>Step 1 · Consent</h4>
                <p>User consent · Preparation · Warnings</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📄</div>
                <h4>Step 2 · Documents</h4>
                <p>Upload · In-progress · Confirm info</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🤳</div>
                <h4>Step 3 · Face Scan</h4>
                <p>Liveness · Success · Retry on fail</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">✅</div>
                <h4>Step 4 · Complete</h4>
                <p>Review · Confirmation · Done</p>
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
              A verification flow has to feel secure and calm. The system pairs Inter's clean neutrality with a trust-blue core, backed by a broad, deliberate palette — greens, oranges and reds reserved strictly for success, in-progress and error states so status is never ambiguous, in either theme.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Inter — a highly legible, neutral interface typeface built for screens, keeping dense verification steps clear at every size and weight.</p>
                  <div className="typo-hero">Inter</div>
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
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A broad, system-driven palette — a trust-blue core with neutrals, plus dedicated greens, oranges, reds and purples for status and emphasis across light &amp; dark.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">FFFFFF</span></div>
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">000000</span></div>
                    <div className="color-block" style={{ background: '#666666' }}><span className="color-hex">666666</span></div>
                    <div className="color-block" style={{ background: '#233876' }}><span className="color-hex">233876</span></div>
                    <div className="color-block" style={{ background: '#E4EFFF' }}><span className="color-hex">E4EFFF</span></div>
                    <div className="color-block" style={{ background: '#8BB7FF' }}><span className="color-hex">8BB7FF</span></div>
                    <div className="color-block" style={{ background: '#1E429F' }}><span className="color-hex">1E429F</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#12224D' }}><span className="color-hex">12224D</span></div>
                    <div className="color-block" style={{ background: '#020C23' }}><span className="color-hex">020C23</span></div>
                    <div className="color-block" style={{ background: '#ACBEDB' }}><span className="color-hex">ACBEDB</span></div>
                    <div className="color-block" style={{ background: '#05505C' }}><span className="color-hex">05505C</span></div>
                    <div className="color-block" style={{ background: '#7EDCE2' }}><span className="color-hex">7EDCE2</span></div>
                    <div className="color-block" style={{ background: '#BFEEF1' }}><span className="color-hex">BFEEF1</span></div>
                    <div className="color-block" style={{ background: '#01283A' }}><span className="color-hex">01283A</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#008F0A' }}><span className="color-hex">008F0A</span></div>
                    <div className="color-block" style={{ background: '#F9C890' }}><span className="color-hex">F9C890</span></div>
                    <div className="color-block" style={{ background: '#FFEAD2' }}><span className="color-hex">FFEAD2</span></div>
                    <div className="color-block" style={{ background: '#FF8800' }}><span className="color-hex">FF8800</span></div>
                    <div className="color-block" style={{ background: '#A85A00' }}><span className="color-hex">A85A00</span></div>
                    <div className="color-block" style={{ background: '#332200' }}><span className="color-hex">332200</span></div>
                    <div className="color-block" style={{ background: '#D02F44' }}><span className="color-hex">D02F44</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#F9E0FF' }}><span className="color-hex">F9E0FF</span></div>
                    <div className="color-block" style={{ background: '#F3C3FF' }}><span className="color-hex">F3C3FF</span></div>
                    <div className="color-block" style={{ background: '#41124D' }}><span className="color-hex">41124D</span></div>
                    <div className="color-block" style={{ background: '#A85A00' }}><span className="color-hex">A85A00</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The verification journey across both themes — preparation, document upload with live status, face-scan liveness, and the final step. Click any screen to view it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1: Dark theme */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Home --_ User Consent.png">
                  <img src="/Images/projects/kyc/Dark- Home --_ User Consent.png" alt="Home and Consent (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Consent · Dark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 1 - Proceed.png">
                  <img src="/Images/projects/kyc/Dark- Step 1 - Proceed.png" alt="Step 1 Proceed (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 1 · Proceed</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 2 - Default.png">
                  <img src="/Images/projects/kyc/Dark- Step 2 - Default.png" alt="Step 2 Documents (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Documents</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 2 - info confirm.png">
                  <img src="/Images/projects/kyc/Dark- Step 2 - info confirm.png" alt="Step 2 Confirm Info (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Confirm</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 3 - Scan Face.png">
                  <img src="/Images/projects/kyc/Dark- Step 3 - Scan Face.png" alt="Step 3 Face Scan (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 3 · Face Scan</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 3 - Scan Face Success Step.png">
                  <img src="/Images/projects/kyc/Dark- Step 3 - Scan Face Success Step.png" alt="Step 3 Success (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 3 · Success</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Home --_ User Consent.png">
                  <img src="/Images/projects/kyc/Dark- Home --_ User Consent.png" alt="Home and Consent (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Consent · Dark</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 1 - Proceed.png">
                  <img src="/Images/projects/kyc/Dark- Step 1 - Proceed.png" alt="Step 1 Proceed (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 1 · Proceed</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 2 - Default.png">
                  <img src="/Images/projects/kyc/Dark- Step 2 - Default.png" alt="Step 2 Documents (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Documents</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 2 - info confirm.png">
                  <img src="/Images/projects/kyc/Dark- Step 2 - info confirm.png" alt="Step 2 Confirm Info (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Confirm</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 3 - Scan Face.png">
                  <img src="/Images/projects/kyc/Dark- Step 3 - Scan Face.png" alt="Step 3 Face Scan (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 3 · Face Scan</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Dark- Step 3 - Scan Face Success Step.png">
                  <img src="/Images/projects/kyc/Dark- Step 3 - Scan Face Success Step.png" alt="Step 3 Success (Dark)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 3 · Success</div>
                </div>
              </div>

              {/* Row 2: Light theme */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Home.png">
                  <img src="/Images/projects/kyc/Light- Home.png" alt="Home (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home · Light</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 1 - Preperation.png">
                  <img src="/Images/projects/kyc/Light- Step 1 - Preperation.png" alt="Step 1 Preparation (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 1 · Prepare</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 2 - Before Select.png">
                  <img src="/Images/projects/kyc/Light- Step 2 - Before Select.png" alt="Step 2 Upload (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Upload</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 2 - Complete.png">
                  <img src="/Images/projects/kyc/Light- Step 2 - Complete.png" alt="Step 2 Complete (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Complete</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 3 - Scan Face.png">
                  <img src="/Images/projects/kyc/Light- Step 3 - Scan Face.png" alt="Step 3 Face Scan (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 3 · Face Scan</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 4 - Preperation.png">
                  <img src="/Images/projects/kyc/Light- Step 4 - Preperation.png" alt="Step 4 (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 4 · Final</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Home.png">
                  <img src="/Images/projects/kyc/Light- Home.png" alt="Home (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Home · Light</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 1 - Preperation.png">
                  <img src="/Images/projects/kyc/Light- Step 1 - Preperation.png" alt="Step 1 Preparation (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 1 · Prepare</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 2 - Before Select.png">
                  <img src="/Images/projects/kyc/Light- Step 2 - Before Select.png" alt="Step 2 Upload (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Upload</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 2 - Complete.png">
                  <img src="/Images/projects/kyc/Light- Step 2 - Complete.png" alt="Step 2 Complete (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 2 · Complete</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 3 - Scan Face.png">
                  <img src="/Images/projects/kyc/Light- Step 3 - Scan Face.png" alt="Step 3 Face Scan (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 3 · Face Scan</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/kyc/Light- Step 4 - Preperation.png">
                  <img src="/Images/projects/kyc/Light- Step 4 - Preperation.png" alt="Step 4 (Light)" className="ui-thumb" loading="lazy" decoding="async"/>
                  <div className="ui-card-label">Step 4 · Final</div>
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
              The whole emotional goal of a KYC flow is to replace uncertainty with reassurance. Three patterns carry that intent — never leaving the user guessing about what to do, what's happening, or what went wrong.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🚦</div>
                <h4>Live Status States</h4>
                <p>Every upload and scan has explicit in-progress, success and error states — colour-coded so users instantly read pass, pending or retry.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧭</div>
                <h4>Preparation First</h4>
                <p>Each step opens with a calm preparation screen and gentle warnings, so people know exactly what they'll need before the camera ever turns on.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌓</div>
                <h4>Light &amp; Dark Parity</h4>
                <p>The entire flow is designed twice over — pixel-matched in light and dark — so it feels native inside any host app or preference.</p>
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
                <div className="outcome-metric" data-count="4" data-suffix="-Step">0</div>
                <div className="outcome-label">Guided flow — consent → documents → face scan → done</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="2" data-suffix=" Themes">0</div>
                <div className="outcome-label">Full light &amp; dark theming across every screen &amp; state</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: 28 }}>
              <p>"A high-stakes, high-friction process turned into something that feels <em>guided, honest and even calm</em> — in whichever theme the user prefers."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete, consistent verification system: a clear 4-step journey with explicit status states, fully designed in both light and dark across every preparation, capture, success and error screen.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Capturing every state — in-progress, error, retry, success — for documents and face scan, without overwhelming the user on the happy path, and keeping it all consistent across two themes.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>In verification, the "unhappy" states are the product. Designing errors and retries with the same care as success is what builds the trust that keeps people from abandoning.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Hand off to engineering, add accessibility passes for camera-based steps, and extend the status system to additional document types and regions.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.figma.com/design/4rJcjETLUrlp2fwFtKmoOt/KYC-Verification?node-id=0-1" target="_blank"
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
            <img id="cs-modal-img" src="" alt="Case Study Preview" loading="lazy" decoding="async"/>
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
