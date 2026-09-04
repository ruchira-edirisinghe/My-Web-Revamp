'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudy747Social() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Dealing You In to <span className="tagline-name">747</span></>}
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

          {/* HERO - Title + Cover Banner */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">747 Social Casino</h1>
            <p className="cs-hero-subtitle">Where Social Networking Meets the Casino - Designed for Desktop &amp; Mobile</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/social-casino/cover.png" alt="747 Social Casino - social casino platform cover"
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
              <div className="cs-meta-value">Social Casino<br/>Web + Mobile</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma<br/>Design System</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>&amp; Mobile</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Views</div>
              <div className="cs-meta-value">Desktop<br/>&amp; Mobile</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              747 Social Casino is a different kind of casino - one built around people, not just play. It fuses a full social network (profiles, stories, posts and comments) with gaming and prizes, all wrapped in a rich onboarding journey. The challenge was to make something this layered feel <em className="cs-em-gold">effortless, premium and consistent - across desktop and mobile alike.</em>
            </p>
          </div>


          {/* 01 - THE PROBLEM */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 --</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              A social casino has to be two products at once - a vibrant social feed and an exciting game floor - without feeling like either was bolted on. On top of that sits a long onboarding flow (profile, cover, rich "About Me" media, invites) that's prime territory for drop-off, all of which has to feel identical on a wide desktop and a phone.
            </p>

            <div className="cs-highlight">
              <p>"The hard part isn't the games or the feed on their own - it's making them feel like <em>one premium product</em>, on every screen."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>Blending a social network and a casino into one coherent product - with a deep onboarding flow - risks feeling cluttered, inconsistent, and exhausting before users ever reach the fun.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Build a premium, unified system where social and gaming live together, onboarding feels light and rewarding, and every screen is designed for both desktop and mobile.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Socially-driven players who want community and self-expression, and casual gamers chasing fun, prizes and rewards.</p>
              </div>
            </div>
          </section>


          {/* 02 - RESEARCH */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 --</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              The standout insight was that "social" and "casino" users overlap but want different first moments - one wants to express themselves, the other wants to play. The product had to welcome both, guide them through onboarding, and stay identical across devices.
            </p>

            <h3 className="cs-sub-heading">Typical Social/Casino Apps vs. The Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Common Pitfalls</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Onboarding that dumps every field at once</li>
                    <li><div className="cs-list-bullet"></div>Social and gaming that feel like two apps stitched together</li>
                    <li><div className="cs-list-bullet"></div>Desktop and mobile that drift apart over time</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> 747's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Progressive onboarding with clear complete / incomplete states</li>
                    <li><div className="cs-list-bullet"></div>One green-and-gold system uniting social &amp; gaming</li>
                    <li><div className="cs-list-bullet"></div>A documented token system for true light/dark, multi-device parity</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">User Personas</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">💬</div>
                <div>
                  <div className="persona-name">The Social Player</div>
                  <div className="persona-role">Primary - Community-first</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Expressive</span>
                    <span className="persona-trait">Content-creator</span>
                    <span className="persona-trait">Mobile-first</span>
                  </div>
                  <p className="persona-quote">"I'm here for the community as much as the games - show me stories, posts and profiles."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎁</div>
                <div>
                  <div className="persona-name">The Casual Gamer</div>
                  <div className="persona-role">Secondary - Plays for Rewards</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Prize-driven</span>
                    <span className="persona-trait">Casual</span>
                    <span className="persona-trait">Quick sessions</span>
                  </div>
                  <p className="persona-quote">"I want quick games and a real shot at a prize - make claiming rewards feel great."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🆕</div>
                <div>
                  <div className="persona-name">The New User</div>
                  <div className="persona-role">Tertiary - Onboarding</div>
                  <div className="persona-traits">
                    <span className="persona-trait">First-timer</span>
                    <span className="persona-trait">Cautious</span>
                    <span className="persona-trait">Time-poor</span>
                  </div>
                  <p className="persona-quote">"Don't make me fill in everything at once - let me complete my profile bit by bit."</p>
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
                <div className="cs-comp-header">💬 Social Player</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Connect, post and express themselves.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Shallow profiles, no real self-expression.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Rich "About Me" - photo, text, video &amp; voice.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎁 Casual Gamer</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Play and win rewards quickly.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Boring, unrewarding prize mechanics.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">A prize timer with a satisfying claim moment.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🆕 New User</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Get set up without friction.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Long forms that demand everything upfront.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Progressive onboarding with clear progress states.</div>
              </div>
            </div>
          </section>


          {/* 03 - IDEATION / STRUCTURE */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">Structure &amp; Flow</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Ideation &amp; Structure</h2>

            <h3 className="cs-sub-heading">User Flow: From Sign-Up to Social Play</h3>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🔑</div><div className="flow-label">Login</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🧩</div><div className="flow-label">Onboarding</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🪪</div><div className="flow-label">Build Profile</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📰</div><div className="flow-label">Social Feed</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🎁</div><div className="flow-label">Play &amp; Win</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">Onboarding was broken into <strong className="cs-w">staged, skippable steps</strong> - profile, cover, "About Me" media, invites and games - each with explicit complete / incomplete states, so users build their presence at their own pace without ever feeling stuck.</p>
            </div>

            <h3 className="cs-sub-heading">Information Architecture</h3>

            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">📰</div>
                <h4>Social Feed</h4>
                <p>Home · Stories · Posts · Comments</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🪪</div>
                <h4>Profile</h4>
                <p>About Me · Media · Edit</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎁</div>
                <h4>Play &amp; Prizes</h4>
                <p>Games · Prize Timer · Claim</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔔</div>
                <h4>Account</h4>
                <p>Onboarding · Login · Notifications</p>
              </div>
            </div>
          </section>


          {/* 04 - VISUAL DESIGN */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">The Solution</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Visual Design &amp; Style Guide</h2>

            <p className="cs-body">
              The identity centres on a confident casino green lifted with gold for value and wins, grounded by deep navy text and clean neutrals. Crucially, it's all defined as a proper token system - primary, surfaces, text, borders and dedicated success / error / warning states - with full light and dark modes, so the product stays consistent across every screen and both devices.
            </p>

            <div className="creative-styleguide">

              {/* Typography Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Typography</div>
                  <p className="sg-unit-desc">A clean, highly legible sans keeps a content-rich social product readable - clear hierarchy from headings down to metadata across light and dark.</p>
                  <div className="typo-hero">Poppins</div>
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
                    <span className="typo-weight-item cs-fw-300">Light</span>
                    <span className="typo-weight-item cs-fw-400">Regular</span>
                    <span className="typo-weight-item cs-fw-500">Medium</span>
                    <span className="typo-weight-item cs-fw-600">Semi Bold</span>
                    <span className="typo-weight-item cs-fw-700">Bold</span>
                  </div>
                </div>
              </div>

              {/* Color Section */}
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color Tokens</div>
                  <p className="sg-unit-desc">A green-and-gold core with navy text and clean neutrals, plus dedicated success, error and warning states - all with full light &amp; dark modes.</p>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#009F68' })}><span className="color-hex">#009F68</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#007A50' })}><span className="color-hex">#007A50</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#D4AF37' })}><span className="color-hex">#D4AF37</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FF3939' })}><span className="color-hex">#FF3939</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#192B4A' })}><span className="color-hex">#192B4A</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#9BAEC9' })}><span className="color-hex">#9BAEC9</span></div>
                  </div>
                  <div className="color-strip">
                    <div className="color-block" style={cssVars({ '--sw': '#F8FAFC' })}><span className="color-hex">#F8FAFC</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#151515' })}><span className="color-hex">#151515</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#FFFFFF' })}><span className="color-hex">#FFFFFF</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#E2E8F0' })}><span className="color-hex">#E2E8F0</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#CBD5E1' })}><span className="color-hex">#CBD5E1</span></div>
                    <div className="color-block" style={cssVars({ '--sw': '#EEF2FF' })}><span className="color-hex">#EEF2FF</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The same social-casino experience, designed end-to-end for both devices. Switch between the desktop and mobile views below, and click any screen to open it in high resolution.</p>

            {/* Desktop / Mobile switcher */}
            <div className="device-toggle" role="tablist" aria-label="Device view">
              <button className="device-btn active" type="button" data-device="desktop" aria-selected="true">Desktop</button>
              <button className="device-btn" type="button" data-device="mobile" aria-selected="false">Mobile</button>
            </div>

            {/* ─── DESKTOP GALLERY (landscape) ─── */}
            <div className="ui-gallery device-gallery is-desktop" data-device="desktop">
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Home.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Home.png" alt="Desktop - Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Login.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Login.png" alt="Desktop - Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Onboarding 1.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Onboarding 1.png" alt="Desktop - Onboarding" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Onboarding</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Story And Post 1.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Story And Post 1.png" alt="Desktop - Stories and Posts" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Stories &amp; Posts</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Home.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Home.png" alt="Desktop - Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Login.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Login.png" alt="Desktop - Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Onboarding 1.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Onboarding 1.png" alt="Desktop - Onboarding" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Onboarding</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Story And Post 1.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Story And Post 1.png" alt="Desktop - Stories and Posts" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Stories &amp; Posts</div>
                </div>
              </div>
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Profile - About Me Photo.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Profile - About Me Photo.png" alt="Desktop - Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Comments.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Comments.png" alt="Desktop - Comments" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Comments</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Notifications.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Notifications.png" alt="Desktop - Notifications" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Notifications</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Prize Timer Popup - Ready To Claim.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Prize Timer Popup - Ready To Claim.png" alt="Desktop - Prize Claim" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Prize Claim</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Profile - About Me Photo.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Profile - About Me Photo.png" alt="Desktop - Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Comments.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Comments.png" alt="Desktop - Comments" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Comments</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Notifications.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Notifications.png" alt="Desktop - Notifications" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Notifications</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/desktop/Desktop - Prize Timer Popup - Ready To Claim.png">
                  <img src="/Images/projects/social-casino/desktop/Desktop - Prize Timer Popup - Ready To Claim.png" alt="Desktop - Prize Claim" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Prize Claim</div>
                </div>
              </div>
            </div>

            {/* ─── MOBILE GALLERY (portrait) ─── */}
            <div className="ui-gallery device-gallery is-mobile" data-device="mobile" hidden>
              <div className="ui-marquee-track ui-track-2" id="marquee-3">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Home.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Home.png" alt="Mobile - Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Login.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Login.png" alt="Mobile - Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - 1 - Story.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - 1 - Story.png" alt="Mobile - Stories" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Stories</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - 5 - Single Post.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - 5 - Single Post.png" alt="Mobile - Post" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Post</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Home.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Home.png" alt="Mobile - Home" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Login.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Login.png" alt="Mobile - Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - 1 - Story.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - 1 - Story.png" alt="Mobile - Stories" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Stories</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - 5 - Single Post.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - 5 - Single Post.png" alt="Mobile - Post" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Post</div>
                </div>
              </div>
              <div className="ui-marquee-track ui-track-1" id="marquee-4">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Profile - About Me Photo.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Profile - About Me Photo.png" alt="Mobile - Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Comments.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Comments.png" alt="Mobile - Comments" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Comments</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - 1 - Notifications Full.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - 1 - Notifications Full.png" alt="Mobile - Notifications" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Notifications</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Onboarding 4 - Invite.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Onboarding 4 - Invite.png" alt="Mobile - Onboarding Invite" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Onboarding · Invite</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Profile - About Me Photo.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Profile - About Me Photo.png" alt="Mobile - Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Comments.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Comments.png" alt="Mobile - Comments" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Comments</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - 1 - Notifications Full.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - 1 - Notifications Full.png" alt="Mobile - Notifications" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Notifications</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/social-casino/mobile/Mobile - Onboarding 4 - Invite.png">
                  <img src="/Images/projects/social-casino/mobile/Mobile - Onboarding 4 - Invite.png" alt="Mobile - Onboarding Invite" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Onboarding · Invite</div>
                </div>
              </div>
            </div>
          </section>


          {/* 05 - VIBE & INTERACTIONS */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 --</span>
              <span className="cs-section-num">Interactions</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Interaction Design &amp; Emotional Intent</h2>

            <p className="cs-body">
              The feeling to land is a premium, social buzz - celebratory but classy. Green and gold signal value and wins, while social touches and a satisfying prize moment keep people coming back.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🧩</div>
                <h4>Progressive Onboarding</h4>
                <p>Profile, cover and rich "About Me" media - photo, text, video and voice - are built step by step, each with clear complete and incomplete states.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📰</div>
                <h4>Stories, Posts &amp; Comments</h4>
                <p>A full social layer - stories, single and multi-image posts, and comments - gives the casino a genuine community heartbeat.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎁</div>
                <h4>Prizes &amp; Floating Actions</h4>
                <p>A prize timer counts down to a satisfying "ready to claim" moment, while a floating action icon keeps key interactions a tap away on mobile.</p>
              </div>
            </div>
          </section>

          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 --</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="2" data-suffix=" Platforms">0</div>
                <div className="outcome-label">Designed in full for desktop and mobile</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="90" data-suffix="+ Screens">0</div>
                <div className="outcome-label">Across onboarding, social feed, profiles, games &amp; prizes</div>
              </div>
            </div>

            <div className="cs-highlight cs-mt-28">
              <p>"Two products - a social network and a casino - designed as <em>one premium experience</em>, on a real token system, for every screen."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A complete social-casino design system: a multi-step onboarding, a full social feed (stories, posts, comments), rich profiles, games, prizes and notifications - all designed for both desktop and mobile, in light and dark.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Unifying a social network and a casino into one premium product, and keeping a deep onboarding flow and dozens of states consistent across two device layouts.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>A documented token system - primary, surfaces, text, borders and status, with light/dark - is what makes a product this large stay coherent. Designing the in-between states is half the work.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Hand off to engineering, prototype the live story and prize-claim interactions, and extend the system to additional game types and a tablet layout.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.figma.com/design/50pSddynqetCpXJCHFhyDm/747-Social-Casino?node-id=73-6900" target="_blank"
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
