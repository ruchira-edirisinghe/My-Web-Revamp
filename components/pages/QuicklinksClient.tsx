'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initQuicklinks } from '@/lib/scripts/quicklinks';

export default function QuicklinksClient() {
  useEffect(() => {
    const disposers = [initQuicklinks()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="links"
      dataPage="links"
      tagline={<>Opening The Gateway To My <span className="tagline-name">Digital Presence</span></>}
    >
      <main>
        <div className="links-content">
          <header id="hero-heading">
            <p className="section-label">Digital Presence</p>
            <h1 className="page-title">Digital Nexus</h1>
            <br /><br />
            <div className="para-container">
              <p className="bio-para" style={cssVars({ '--para-delay': '0.1s' })}>
                A consolidated gateway to my multifaceted online identity, professional presence, and creative outlets — all
                in one celestial orbit.
              </p>
            </div>
          </header>

          {/* Tier 0: Personal Portfolio Hub */}
          <section className="tier-section">
            <div className="about-block">
              <div className="links-grid grid-1">
                <Link href="/" id="portfolio-nexus-link" className="social-card cc-portfolio"
                  data-name="Personal Portfolio" data-action="Return to main portfolio landing page"
                  data-detail="index.html">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Main Gateway</span>
                    <p className="sc-name">Personal Portfolio</p>
                    <p className="sc-handle">Explore the full digital ecosystem</p>
                  </div>
                  <p className="sc-desc">The primary hub for my work, experience, and the comprehensive narrative of my journey.
                  </p>
                </Link>
              </div>
            </div>
          </section>


          {/* Tier 2 & 3: Professional & Creative */}
          <section className="tier-section dual-grid">
            <div className="about-block">
              <div className="links-grid">
                <a href="https://www.linkedin.com/in/ruchiraedirisinghe/" target="_blank" rel="noopener noreferrer" className="social-card cc-linkedin"
                  data-url="https://www.linkedin.com/in/ruchiraedirisinghe/" data-name="LinkedIn"
                  data-action="LinkedIn to explore my professional network" data-detail="in/ruchiraedirisinghe">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Professional Network</span>
                    <p className="sc-name">LinkedIn</p>
                    <p className="sc-handle">in/ruchiraedirisinghe</p>
                  </div>
                  <p className="sc-desc">Connect professionally, explore my work history, endorsements, and career journey in
                    detail.</p>
                </a>
                <a href="https://github.com/ruchira-edirisinghe" target="_blank" rel="noopener noreferrer" className="social-card cc-github"
                  data-url="https://github.com/ruchira-edirisinghe" data-name="GitHub"
                  data-action="GitHub to explore my code repositories" data-detail="@ruchira-edirisinghe">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Open Source</span>
                    <p className="sc-name">GitHub</p>
                    <p className="sc-handle">@ruchira-edirisinghe</p>
                  </div>
                  <p className="sc-desc">Explore my code repositories, open-source contributions, and technical projects.</p>
                </a>
              </div>
            </div>

            <div className="about-block">
              <div className="links-grid">
                <a href="https://www.behance.net/ruchiraedirisinghe" target="_blank" rel="noopener noreferrer" className="social-card cc-behance"
                  data-url="https://www.behance.net/ruchiraedirisinghe" data-name="Behance"
                  data-action="Behance to browse my design portfolio" data-detail="ruchiraedirisinghe">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path
                        d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Design Portfolio</span>
                    <p className="sc-name">Behance</p>
                    <p className="sc-handle">ruchiraedirisinghe</p>
                  </div>
                  <p className="sc-desc">Browse my UI/UX design work, creative projects, and curated design case studies.</p>
                </a>
                <a href="https://www.instagram.com/ruchii_zzz/" target="_blank" rel="noopener noreferrer" className="social-card cc-instagram"
                  data-url="https://www.instagram.com/ruchii_zzz/" data-name="Instagram"
                  data-action="Instagram to browse my visual stories" data-detail="@ruchii_zzz">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Visual Stories</span>
                    <p className="sc-name">Instagram</p>
                    <p className="sc-handle">@ruchii_zzz</p>
                  </div>
                  <p className="sc-desc">Behind-the-scenes, creative process snapshots, and a glimpse into my visual world.</p>
                </a>
              </div>
            </div>
          </section>

          {/* Tier 4: Gaming Universe */}
          <section className="tier-section">
            <div className="about-block block-full gaming-universe-glass">
              <div className="gaming-grid" id="gaming-grid">
                <a className="platform-card pc-yt stream-card" href="https://www.youtube.com/@zenitrongaming" target="_blank"
                  rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.0s' })} data-url="https://youtube.com/@zenitrongaming"
                  data-name="YouTube" data-action="YouTube to visit Zenitron Gaming channel" data-detail="@zenitrongaming">
                  <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg></div>
                  <span className="pc-name">YouTube</span>
                  <span className="pc-username">@zenitrongaming</span>
                  <div className="pc-stats">
                    <div className="pc-stat"><span className="pc-stat-label">Subscribers</span><span
                      className="pc-stat-value">375+</span>
                    </div>
                    <div className="pc-stat"><span className="pc-stat-label">Videos</span><span className="pc-stat-value">120+</span>
                    </div>
                  </div>
                  <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                    Visit Channel
                    <svg viewBox="0 0 24 24"
                      style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                      <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </a>

                <a className="platform-card pc-fb stream-card" href="https://www.facebook.com/gaming/zenitrongaming"
                  target="_blank" rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.1s' })}
                  data-url="https://www.facebook.com/gaming/zenitrongaming" data-name="Facebook"
                  data-action="Facebook to visit Zenitron Gaming page" data-detail="@zenitrongaming">
                  <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg></div>
                  <span className="pc-name">Facebook</span>
                  <span className="pc-username">@zenitrongaming</span>
                  <div className="pc-stats">
                    <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">440+</span>
                    </div>
                    <div className="pc-stat"><span className="pc-stat-label">Type</span><span
                      className="pc-stat-value">Live</span>
                    </div>
                  </div>

                  <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                    Visit Channel
                    <svg viewBox="0 0 24 24"
                      style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                      <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </a>

                <a className="platform-card pc-tt stream-card" href="https://www.tiktok.com/@zenitrongaming" target="_blank"
                  rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.2s' })} data-url="https://tiktok.com/@zenitrongaming"
                  data-name="TikTok" data-action="TikTok to watch Zenitron Gaming content" data-detail="@zenitrongaming">
                  <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.65a8.23 8.23 0 004.84 1.55V6.75a4.85 4.85 0 01-1.07-.06z" />
                  </svg></div>
                  <span className="pc-name">TikTok</span>
                  <span className="pc-username">@zenitrongaming</span>
                  <div className="pc-stats">
                    <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">1.2K</span>
                    </div>
                    <div className="pc-stat"><span className="pc-stat-label">Videos</span><span className="pc-stat-value">60+</span>
                    </div>
                  </div>
                  <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                    Visit Channel
                    <svg viewBox="0 0 24 24"
                      style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                      <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </a>

                <a className="platform-card pc-tw stream-card" href="https://www.twitch.tv/zenitrongaminglive" target="_blank"
                  rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.3s' })} data-url="https://twitch.tv/zenitrongaminglive"
                  data-name="Twitch" data-action="Twitch to join the live stream" data-detail="@zenitrongaminglive">
                  <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                  </svg></div>
                  <span className="pc-name">Twitch</span>
                  <span className="pc-username">@zenitrongaminglive</span>
                  <div className="pc-stats">
                    <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">20+</span>
                    </div>
                    <div className="pc-stat"><span className="pc-stat-label">Type</span><span
                      className="pc-stat-value">Live</span>
                    </div>
                  </div>
                  <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                    Visit Channel
                    <svg viewBox="0 0 24 24"
                      style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                      <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </a>

                <a className="platform-card pc-kick stream-card" href="https://kick.com/zenitrongaminglive" target="_blank"
                  rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.4s' })} data-url="https://kick.com/zenitrongaminglive"
                  data-name="Kick" data-action="Kick to join the green-team stream" data-detail="@zenitrongaminglive">
                  <div className="pc-icon-wrap"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
                    <path
                      d="M37 .036h164.448v113.621h54.71v-56.82h54.731V.036h164.448v170.777h-54.73v56.82h-54.711v56.8h54.71v56.82h54.73V512.03H310.89v-56.82h-54.73v-56.8h-54.711v113.62H37V.036z"
                      fill="#53fc18" />
                  </svg></div>
                  <span className="pc-name">Kick</span>
                  <span className="pc-username">@zenitrongaminglive</span>
                  <div className="pc-stats">
                    <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">20+</span>
                    </div>
                    <div className="pc-stat"><span className="pc-stat-label">Type</span><span
                      className="pc-stat-value">Live</span>
                    </div>
                  </div>
                  <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                    Visit Channel
                    <svg viewBox="0 0 24 24"
                      style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                      <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </section>

          {/* Tier 1: Direct Connect */}
          <section className="tier-section">
            <div className="about-block">
              <div className="links-grid grid-2">
                <a href="mailto:ruchira.ed@proton.me" className="social-card cc-email" data-url="mailto:ruchira.ed@proton.me"
                  data-name="Email" data-action="Email to direct contact Ruchira Edirisinghe"
                  data-detail="ruchira.ed@proton.me">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Direct Mail</span>
                    <p className="sc-name">Email</p>
                    <p className="sc-handle">ruchira.ed@proton.me</p>
                  </div>
                  <p className="sc-desc">Best for project inquiries, collaboration proposals, and anything that deserves a
                    thoughtful reply.</p>
                </a>
                <a href="https://wa.me/94774009851" target="_blank" rel="noopener noreferrer" className="social-card cc-phone"
                  data-url="https://wa.me/94774009851" data-name="WhatsApp / Call"
                  data-action="WhatsApp to direct contact Ruchira Edirisinghe" data-detail="+94 77 400 9851">
                  <div className="cc-arrow"><svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg></div>
                  <div className="sc-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                      strokeLinejoin="round">
                      <path fill="none"
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="sc-label">Direct Contact</span>
                    <p className="sc-name">WhatsApp / Call</p>
                    <p className="sc-handle">+94 77 400 9851</p>
                  </div>
                  <p className="sc-desc">Direct line for urgent discussions, fast updates, or informal brainstorming sessions.
                  </p>
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* REDIRECT PROMPT MODAL */}
      <div id="nexus-redirect-overlay" className="nexus-modal-overlay">
        <div className="nexus-modal-card">
          <div className="nexus-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h2 className="nexus-modal-title">Ready To Know Me More?</h2>
          <p className="nexus-modal-text">Click on the below confirm button to visit the main portfolio site of <strong>Ruchira
            Edirisinghe</strong></p>

          <div className="nexus-modal-actions">
            <button id="nexus-modal-cancel" className="nexus-btn btn-dim">View Quick Links</button>
            <button id="nexus-modal-confirm" className="nexus-btn btn-glow">Confirm</button>
          </div>

          <div className="nexus-modal-footer">
            This "Quick Links" page is just a shortcut menu. Tapping confirm will take you back to the primary home screen.
          </div>
        </div>
      </div>

      {/* ORIGINAL REDIRECT PROMPT MODAL */}
      <div id="cert-prompt-overlay" className="modal-overlay">
        <div className="modal-card">
          <div id="modal-icon-wrap" className="modal-icon-wrap"></div>
          <p id="modal-detail-box"></p>
          <p className="modal-instruction">You are going to be redirected to <span id="modal-action-text"
            style={{ color: '#fff', fontWeight: 600 }}>the application</span>.<br />Do you wish to continue?</p>
          <div className="modal-actions">
            <button id="modal-cancel" className="modal-btn btn-secondary">Go Back</button>
            <button id="modal-confirm" className="modal-btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
