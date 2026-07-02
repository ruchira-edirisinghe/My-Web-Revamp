'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyDtmhms() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Streamlining the <span className="tagline-name">Hall Booking</span></>}
    >
      <main>

        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* HERO — Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">DTM Hall<br/>Management System</h1>
            <p className="cs-hero-subtitle">Turning Paper-Based Venue Booking into a Clean, Digital Experience</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/dtmhms/COVER.png" alt="DTM Hall Management System — booking platform cover"
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
              <div className="cs-meta-value">Web UI/UX<br/>Design System</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>React.js · SVG</div>
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
              Booking a school hall shouldn't mean phone calls, paper forms and double-booked dates. The DTM Hall Management System digitises venue booking for Lyceum's premises — replacing a scattered, paper-based process with one unified platform where availability, pricing and layouts are all <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>clear, visual and bookable in a few taps.</em>
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
              DreamTeam spotted a real gap in Sri Lanka's education sector: institutions were still juggling hall bookings on paper and over the phone. The result was confusion at every step — unclear availability, opaque pricing, and no easy way to compare one venue against another before committing.
            </p>

            <div className="cs-highlight">
              <p>"<em>91%</em> of users preferred a visual calendar over text lists, while <em>62%</em> abandoned a booking because pricing was unclear."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>A paper-based, fragmented booking process made it hard to see what was available, compare venues, or trust the pricing — slowing institutions down and frustrating one-off bookers alike.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Simplify complex booking flows, build institutional trust, optimise for very different users, and establish a consistent, scalable visual system across the platform.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Administrative staff who need real-time availability and bulk booking, alongside occasional end-users who just need a clear, intuitive way to reserve a hall.</p>
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
              Research split cleanly into two audiences — the administrators who run bookings daily, and the people who book a hall once in a while. Listening to both surfaced consistent pain points and a clear set of patterns to design against.
            </p>

            <h3 className="cs-sub-heading">What the Research Revealed</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Pain Points (Findings)</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>78% struggled to compare venue features</li>
                    <li><div className="cs-list-bullet"></div>62% abandoned bookings over unclear pricing</li>
                    <li><div className="cs-list-bullet"></div>91% preferred visual calendars over text lists</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Design Opportunities</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Side-by-side venue comparison to ease decisions</li>
                    <li><div className="cs-list-bullet"></div>Transparent, upfront pricing to build trust</li>
                    <li><div className="cs-list-bullet"></div>A colour-coded calendar as the booking centrepiece</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🗂️</div>
                <div>
                  <div className="persona-name">The Administrator</div>
                  <div className="persona-role">Primary — Operations Staff</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Power-user</span>
                    <span className="persona-trait">Time-pressured</span>
                    <span className="persona-trait">Detail-oriented</span>
                  </div>
                  <p className="persona-quote">"I need to see what's free at a glance and manage many bookings without ever double-booking a hall."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🙋</div>
                <div>
                  <div className="persona-name">The Occasional Booker</div>
                  <div className="persona-role">Secondary — One-off User</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Infrequent</span>
                    <span className="persona-trait">Price-sensitive</span>
                    <span className="persona-trait">Wants simplicity</span>
                  </div>
                  <p className="persona-quote">"I book a hall once in a while — it has to be obvious, with no surprise costs."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">📅</div>
                <div>
                  <div className="persona-name">The Event Coordinator</div>
                  <div className="persona-role">Tertiary — Recurring Planner</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Planner</span>
                    <span className="persona-trait">Visual</span>
                    <span className="persona-trait">Recurring needs</span>
                  </div>
                  <p className="persona-quote">"The calendar view saves me hours each week."</p>
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
                <div className="cs-comp-header">🗂️ Administrator</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Manage availability and bulk bookings without clashes.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Paper processes hide conflicts until it's too late.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A real-time, colour-coded calendar with conflict warnings.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🙋 Occasional Booker</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Book the right hall quickly and confidently.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Unclear pricing makes them abandon the booking.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Upfront pricing and a simple, guided booking flow.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📅 Event Coordinator</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Plan recurring events around venue availability.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Comparing venues across text lists is slow.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Side-by-side comparison plus a planning-friendly calendar.</div>
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

            <h3 className="cs-sub-heading">User Flow: Booking a Hall</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🏠</div><div className="flow-label">Home</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🏛️</div><div className="flow-label">Explore Halls</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">⚖️</div><div className="flow-label">Compare &amp; Layout</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📅</div><div className="flow-label">Check Calendar</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✅</div><div className="flow-label">Book &amp; Confirm</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">The architecture was organised into four clear flows — Discovery, Venue Exploration, Booking Management and Support — using <strong style={{ color: '#fff' }}>progressive disclosure</strong> so complex options only appear when a user actually needs them.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧭</div>
                <h4>Discovery</h4>
                <p>Home · About · Orientation</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏛️</div>
                <h4>Venue Exploration</h4>
                <p>Halls · Layouts · Comparison</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📅</div>
                <h4>Booking Management</h4>
                <p>Calendar · Availability · Confirm</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💬</div>
                <h4>Support Channels</h4>
                <p>Contact · Help · Enquiries</p>
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
              The interface leans on a clean, mostly-white canvas with a single confident green accent — calm enough to feel trustworthy for an institution, sharp enough to feel modern. Card-based layouts make information easy to scan, and adaptive typography keeps everything readable from a 320px phone to a 1440px+ admin dashboard.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">Sora was chosen for its crisp, modern character — a type family with subtle cues of early-screen typography, but built for the sharp digital environment of today.</p>
                  <div className="typo-hero">Sora</div>
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

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A green and mainly-white themed palette was used to portray a clean and sleek user interface.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#000000' }}><span className="color-hex">#000000</span></div>
                    <div className="color-block" style={{ background: '#00B6AA' }}><span className="color-hex">#00B6AA</span></div>
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The core of the experience — from the landing page to the hall layout and the colour-coded booking calendar. Click any screen to view it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/dtmhms/Home.png">
                  <img src="/Images/projects/dtmhms/Home.png" alt="Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall.png" alt="Book Your Hall" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Book Your Hall</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Layout.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Layout.png" alt="Hall Layout View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Hall · Layout View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png" alt="Booking Calendar View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Hall · Calendar View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/About Us.png">
                  <img src="/Images/projects/dtmhms/About Us.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">About Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Contact us.png">
                  <img src="/Images/projects/dtmhms/Contact us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/dtmhms/Home.png">
                  <img src="/Images/projects/dtmhms/Home.png" alt="Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall.png" alt="Book Your Hall" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Book Your Hall</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Layout.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Layout.png" alt="Hall Layout View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Hall · Layout View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png" alt="Booking Calendar View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Hall · Calendar View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/About Us.png">
                  <img src="/Images/projects/dtmhms/About Us.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">About Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Contact us.png">
                  <img src="/Images/projects/dtmhms/Contact us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png" alt="Booking Calendar View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Calendar View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Layout.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Layout.png" alt="Hall Layout View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Layout View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Home.png">
                  <img src="/Images/projects/dtmhms/Home.png" alt="Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/About Us.png">
                  <img src="/Images/projects/dtmhms/About Us.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">About Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Contact us.png">
                  <img src="/Images/projects/dtmhms/Contact us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall.png" alt="Book Your Hall" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Book Your Hall</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Calendar View.png" alt="Booking Calendar View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Calendar View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall --_ Layout.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall --_ Layout.png" alt="Hall Layout View" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Layout View</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Home.png">
                  <img src="/Images/projects/dtmhms/Home.png" alt="Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/About Us.png">
                  <img src="/Images/projects/dtmhms/About Us.png" alt="About Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">About Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Contact us.png">
                  <img src="/Images/projects/dtmhms/Contact us.png" alt="Contact Us" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Contact Us</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/dtmhms/Book Your Hall.png">
                  <img src="/Images/projects/dtmhms/Book Your Hall.png" alt="Book Your Hall" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Book Your Hall</div>
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
              For an institutional tool, the feeling to aim for is quiet confidence — every interaction should reduce doubt, not add to it. Three signature patterns carry that intent across the whole experience.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📅</div>
                <h4>Dynamic Calendar</h4>
                <p>Colour-coded availability indicators let anyone read what's free or booked at a single glance — turning the calendar into the heart of the product.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚖️</div>
                <h4>Comparative View</h4>
                <p>Side-by-side venue and feature analysis removes the guesswork, so users can choose the right hall with confidence instead of scrolling endless lists.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪄</div>
                <h4>Progressive Disclosure</h4>
                <p>Complex options stay tucked away until they're relevant — keeping the interface calm and clean while still supporting power-user depth.</p>
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
                <div className="outcome-metric" data-count="63" data-suffix="%">0</div>
                <div className="outcome-label">Reduction in booking errors</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="88" data-suffix="%">0</div>
                <div className="outcome-label">First-time success rate on critical tasks</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"Finally feels like we've entered the digital age." — <em>School Administrator</em> &nbsp;·&nbsp; "The calendar view saves me hours each week." — <em>Event Coordinator</em></p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>Booking errors fell 63% and first-time task success hit 88%, with average session duration up to 4.2 minutes — backed by a sub-1.2s booking engine and a 95% Lighthouse accessibility score.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Balancing rich detail with a clean interface. The fix: priority content upfront, secondary details on demand, and visual amenity indicators instead of dense text.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>ERP system integration, AI-powered availability suggestions, and multi-language regional support to widen reach across institutions.</p>
              </div>
              <div className="reflection-card">
                <h4>💬 Conclusion</h4>
                <p>DTM HMS shows how thoughtful UX engineering can transform an institutional process — reducing administrative burden while positioning DreamTeam as an edtech innovator.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.behance.net/gallery/199006183/DTM-Hall-Management-System" target="_blank" rel="noopener"
                className="cs-cta-btn primary">View on Behance →</a>
              <a href="https://www.figma.com/file/l6I5kiLJkE6iOv5vH3gHeO/Hall-Management-Web-UI" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
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
            <img id="cs-modal-img" alt="Case Study Preview" loading="lazy" decoding="async" />
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
