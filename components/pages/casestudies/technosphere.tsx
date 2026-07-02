'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyTechnosphere() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Engineering the <span className="tagline-name">Technosphere</span></>}
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

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">TECHNOSPHERE<br/>Convention UI</h1>
            <p className="cs-hero-subtitle">Innovative Technological Convention for Technophiles</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/technosphere/cover.png" alt="Technosphere — Sustainability Platform cover" className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Engineer<br/>Product Designer</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Timeline</div>
              <div className="cs-meta-value">4 Weeks<br/>2022</div>
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
              <div className="cs-meta-value">Behance<br/>FOSS NSBM</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              TECHNOSPHERE, a pioneering technical convention organized by the FOSS Community of NSBM Green University, emerged as a transformative platform for technophiles in 2022. This project reimagined the event's digital presence to answer one critical question: <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>How can we create a seamless, engaging experience that reflects the innovative spirit of a tech convention?</em>
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
              Technosphere 2022 brought together innovation, collaboration, and learning through a diverse array of sessions and a thrilling CTF competition. However, the event needed a digital platform that matched this dynamic energy. Attendees needed quick access to schedules, speaker info, and competition details without getting lost in a cluttered interface.
            </p>

            <div className="cs-highlight">
              <p>"The UI design was critical in enhancing the overall experience—captivating visitors from the moment they landed on the homepage."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>The need for a visually engaging and user-friendly interface that reflected the event's essence while ensuring seamless navigation and interaction for participants.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Enhance user engagement, facilitate seamless navigation, ensure accessibility/responsiveness, and foster event participation across all devices.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Technophiles, university students, faculty members, and tech enthusiasts participating in sessions and competitive CTF events.</p>
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
              The design process began with understanding the specific needs of tech event attendees. This involved researching current trends in technical convention UI design and identifying key interaction patterns that foster engagement in a fast-paced event environment.
            </p>

            <h3 className="cs-sub-heading">Competitive Analysis</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Event Site Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Cluttered landing pages that hide the "Join" or "Register" buttons
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Non-responsive schedules that are impossible to read on mobile during the event
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Static, boring layouts that don't reflect the innovation of the tech industry
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Technosphere Opportunities</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li>
                      <div className="cs-list-bullet"></div>Immersive hero sections with high-impact visuals to hook users instantly
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Quick-access tabs for Schedule, Speakers, and CTF Competition
                    </li>
                    <li>
                      <div className="cs-list-bullet"></div>Responsive design optimized for "on-the-go" usage during the convention
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              {/* Persona 1 */}
              <div className="persona-card">
                <div className="persona-avatar">💻</div>
                <div>
                  <div className="persona-name">Tech Enthusiast</div>
                  <div className="persona-role">Primary — CTF Competitor · Age 20-25</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Competitor</span>
                    <span className="persona-trait">Mobile-user</span>
                    <span className="persona-trait">Detail-oriented</span>
                  </div>
                  <p className="persona-quote">"I need to know the CTF rules and leaderboard updates immediately. Every second counts."</p>
                </div>
              </div>

              {/* Persona 2 */}
              <div className="persona-card">
                <div className="persona-avatar">🎤</div>
                <div>
                  <div className="persona-name">Speaker / Faculty</div>
                  <div className="persona-role">Secondary — Academic Member · Age 35-50</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Professional</span>
                    <span className="persona-trait">Schedule-focused</span>
                    <span className="persona-trait">Resource-seeker</span>
                  </div>
                  <p className="persona-quote">"I want to see the full list of speakers and the session flow to ensure everything is on track."</p>
                </div>
              </div>

              {/* Persona 3 */}
              <div className="persona-card">
                <div className="persona-avatar">🚀</div>
                <div>
                  <div className="persona-name">General Attendee</div>
                  <div className="persona-role">Tertiary — Student / Newcomer · Age 18-22</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Explorer</span>
                    <span className="persona-trait">Social</span>
                    <span className="persona-trait">Visual Learner</span>
                  </div>
                  <p className="persona-quote">"I'm here to learn and network. Show me what's happening now and where I should go."</p>
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
                <div className="cs-comp-header">💻 The Competitor</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Accessing competition rules and live CTF metrics.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Slow page loads and buried competition links.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a dedicated "CTF Portal" link in the sticky navigation.</div>
              </div>

              {/* Persona 2 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎤 The Speaker</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Checking session times and speaker profiles.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Inconsistent scheduling info between digital and physical signage.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs a real-time "Schedule" section with clear time slots.</div>
              </div>

              {/* Persona 3 */}
              <div className="cs-comp-col">
                <div className="cs-comp-header">🚀 The Newcomer</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Exploring event details and finding "What's Next".</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Overwhelming amount of text without visual hierarchy.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Needs card-based layouts for sessions and "Happening Now" indicators.</div>
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

            <h3 className="cs-sub-heading">User Flow: Convention Attendee Journey</h3>

            <div className="cs-flow">
              <div className="flow-step">
                <div className="flow-node">🏠</div>
                <div className="flow-label">Landing</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">📅</div>
                <div className="flow-label">Explore Schedule</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🎤</div>
                <div className="flow-label">Speaker Bios</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🏆</div>
                <div className="flow-label">CTF Portal</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">📝</div>
                <div className="flow-label">Join / Participate</div>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">Low-fidelity wireframes were iteratively refined based on feedback, leading to a high-fidelity prototype that mapped out the layout to ensure users could find information <strong style={{ color: '#fff' }}>quickly and intuitively</strong> during the event.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🕒</div>
                <h4>Event Schedule</h4>
                <p>Session Timings · Tracks · Breakout Rooms</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Speakers</h4>
                <p>Profiles · Topics · Q&A Links</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>CTF Competition</h4>
                <p>Rules · Challenges · Leaderboard</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏢</div>
                <h4>Venue Info</h4>
                <p>Maps · Directions · Support</p>
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
              The UI design for the TECHNOSPHERE website was guided by principles of simplicity, accessibility, and visual appeal. A modern, clean aesthetic was achieved through balanced use of whitespace, bold typography, and a carefully curated color palette.
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
                    <div className="color-block" style={{ background: '#7b6fff' }}><span className="color-hex">#7B6FFF</span></div>
                    <div className="color-block" style={{ background: '#38d9f5' }}><span className="color-hex">#38D9F5</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Project Deliverables</h3>
            <p className="cs-body">The following interface designs represent the core of the Technosphere experience, focusing on a balance of information density and visual clarity for tech enthusiasts.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/technosphere/Landing.png">
                  <img src="/Images/projects/technosphere/Landing.png" alt="Landing Page" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Landing Page</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/CTF Landing.png">
                  <img src="/Images/projects/technosphere/CTF Landing.png" alt="CTF Competition Landing" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">CTF Competition</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Register - Physical Attendee.png">
                  <img src="/Images/projects/technosphere/Register - Physical Attendee.png" alt="Register as Physical Attendee" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Register · Physical</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Register - Webinar Attendee.png">
                  <img src="/Images/projects/technosphere/Register - Webinar Attendee.png" alt="Register as Webinar Attendee" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Register · Webinar</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Register - Success Popup.png">
                  <img src="/Images/projects/technosphere/Register - Success Popup.png" alt="Registration Success Popup" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Registration Success</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/technosphere/Landing.png">
                  <img src="/Images/projects/technosphere/Landing.png" alt="Landing Page" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Landing Page</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/CTF Landing.png">
                  <img src="/Images/projects/technosphere/CTF Landing.png" alt="CTF Competition Landing" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">CTF Competition</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Register - Physical Attendee.png">
                  <img src="/Images/projects/technosphere/Register - Physical Attendee.png" alt="Register as Physical Attendee" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Register · Physical</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Register - Webinar Attendee.png">
                  <img src="/Images/projects/technosphere/Register - Webinar Attendee.png" alt="Register as Webinar Attendee" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Register · Webinar</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Register - Success Popup.png">
                  <img src="/Images/projects/technosphere/Register - Success Popup.png" alt="Registration Success Popup" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Registration Success</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/technosphere/Profile - Physical Attendee.png">
                  <img src="/Images/projects/technosphere/Profile - Physical Attendee.png" alt="Physical Attendee Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile · Physical</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Profile - Webinar Attendee.png">
                  <img src="/Images/projects/technosphere/Profile - Webinar Attendee.png" alt="Webinar Attendee Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile · Webinar</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Video-Player.png">
                  <img src="/Images/projects/technosphere/Video-Player.png" alt="Session Video Player" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Video Player</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Ask-Questions-home.png">
                  <img src="/Images/projects/technosphere/Ask-Questions-home.png" alt="Ask Questions Feed" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Ask Questions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Ask-Questions-addcomment.png">
                  <img src="/Images/projects/technosphere/Ask-Questions-addcomment.png" alt="Ask Questions Add Comment" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Q&amp;A · Add Comment</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/technosphere/Profile - Physical Attendee.png">
                  <img src="/Images/projects/technosphere/Profile - Physical Attendee.png" alt="Physical Attendee Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile · Physical</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Profile - Webinar Attendee.png">
                  <img src="/Images/projects/technosphere/Profile - Webinar Attendee.png" alt="Webinar Attendee Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile · Webinar</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Video-Player.png">
                  <img src="/Images/projects/technosphere/Video-Player.png" alt="Session Video Player" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Video Player</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Ask-Questions-home.png">
                  <img src="/Images/projects/technosphere/Ask-Questions-home.png" alt="Ask Questions Feed" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Ask Questions</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/technosphere/Ask-Questions-addcomment.png">
                  <img src="/Images/projects/technosphere/Ask-Questions-addcomment.png" alt="Ask Questions Add Comment" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Q&amp;A · Add Comment</div>
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
              A tech convention website should evoke a sense of innovation and high-energy collaboration. Every hover state, every page transition, and every color choice was deliberately tuned to reinforce that professional yet dynamic technophile resonance.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">✨</div>
                <h4>Button Feel</h4>
                <p>Strategically placed call-to-action buttons use high-contrast hover effects, ensuring that attendees can easily access information about sessions and competitions. The emotional intent: action and clarity.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌊</div>
                <h4>Responsive Flow</h4>
                <p>The layout adapts flawlessly across devices, providing optimal usability whether accessed on a desktop, tablet, or smartphone. This creates a sense of "tech everywhere" reliability.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎨</div>
                <h4>Visual Hierarchy</h4>
                <p>Purple and Teal gradients communicate innovation and the FOSS spirit. Bold typography and contrasting colors guide users' attention to key information and event highlights.</p>
              </div>
            </div>
          </section>

          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 ——</span>
              <span className="cs-section-num">Results & Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome & Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="100" data-suffix="%">0</div>
                <div className="outcome-label">Responsive layout adaptation across all tested devices</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="85" data-suffix="%">0</div>
                <div className="outcome-label">Reported increase in user exploration of event details</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"The TECHNOSPHERE website redesign exemplifies the power of user-centered design in creating digital experiences that are both functional and visually appealing."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>Increased Engagement: Users reported spending more time exploring event details and participating in sessions and competitions. Improved Accessibility made it easier for users of all technical proficiencies to navigate.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 Brand Impact</h4>
                <p>The modern, cohesive design strengthened TECHNOSPHERE’s brand identity and online presence, reinforcing the event's perception as a pioneering technical platform.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Continuously monitor user feedback, explore AI-driven personalization, and regularly update the style guide to reflect evolving design trends and user expectations.</p>
              </div>
              <div className="reflection-card">
                <h4>💬 Conclusion</h4>
                <p>This case study underscores the importance of thorough research, iterative design, and a commitment to inclusivity in UX engineering and product design for large-scale technical events.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://technosphere.fossnsbm.org/" target="_blank" rel="noopener" className="cs-cta-btn primary">View Live Website →</a>
              <a href="https://www.figma.com/file/LvdxN9OCg67try10dKlXWu/Technosphere-Website?type=design&node-id=98%3A7&mode=design&t=1NEnUEx0uzsFasP6-1" target="_blank" rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
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
          <p id="redirect-msg" className="redirect-msg">Do you wish to continue to the external link?</p>
          <div className="redirect-cta-row">
            <button id="redirect-cancel" className="redirect-btn ghost">Stay Here</button>
            <a id="redirect-confirm" href="#" target="_blank" rel="noopener" className="redirect-btn primary">Continue ↗</a>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
