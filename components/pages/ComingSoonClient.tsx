'use client';
import { useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { initComingSoon } from '@/lib/scripts/comingsoon';
import ScrollTop from '@/components/ScrollTop';

/**
 * Standalone "Coming Soon" page. Unlike the projects-family pages this is NOT
 * wrapped in StandardShell — it ships its own chrome (preloader, space canvas,
 * cursor, nav, music, footer) and the whole body is rendered here. All inline
 * scripts from comingsoon.html run via initComingSoon(); only scroll-top is the
 * shared <ScrollTop/> component.
 */
export default function ComingSoonClient() {
  useLayoutEffect(() => {
    // Play the preloader on every load and every in-site navigation (no session skip).
    document.body.classList.remove('skip-preloader');
  }, []);

  useEffect(() => initComingSoon(), []);

  return (
    <>
      {/* Non-fixed scroll target so Next's route auto-scroll doesn't iterate the fixed chrome */}
      <div aria-hidden="true" style={{ position: 'absolute', height: 0, width: 0 }} />
      <canvas id="space-canvas"></canvas>
      <canvas id="cursor-canvas"></canvas>
      <div id="cursor-dot"></div>

      <div className="cs-orb cs-orb-a"></div>
      <div className="cs-orb cs-orb-b"></div>
      <div className="cs-orb cs-orb-c"></div>
      <div className="cs-scan"></div>
      <div className="cs-corner cs-corner-tl"></div>
      <div className="cs-corner cs-corner-tr"></div>
      <div className="cs-corner cs-corner-bl"></div>
      <div className="cs-corner cs-corner-br"></div>

      <div id="nav-fade-mask"></div>
      <div id="split-top"></div>
      <div id="split-bottom"></div>

      <div id="preloader">
        <div className="aurora-container">
          <div className="aurora-bg-pulse"></div>
          <div className="aurora-blob blob-1"></div>
          <div className="aurora-blob blob-2"></div>
          <div className="aurora-blob blob-3"></div>
          <div id="preloader-stars"></div>
        </div>
        <div className="preloader-content">
          <canvas id="preloader-canvas"></canvas>
          <div id="progress-track">
            <div id="progress-fill"></div>
          </div>
          <p id="preloader-tagline">Something beautiful is<br className="tagline-br" /> <span className="tagline-name">Coming Soon</span></p>
        </div>
      </div>

      {/* Desktop nav — logo only, no pill */}
      <div id="navbar-wrap">
        <Link href="/" aria-label="Home"><img className="nav-logo" src="/Images/longlogo.svg" alt="Ruchira Edirisinghe" /></Link>
      </div>

      <button id="music-btn-desktop" aria-label="Toggle music">
        <canvas id="spectrum-canvas-desktop" width="26" height="18"></canvas>
      </button>

      {/* Mobile top bar */}
      <div id="mobile-topbar">
        <button id="music-btn" aria-label="Toggle music">
          <canvas id="spectrum-canvas" width="26" height="18"></canvas>
        </button>
        <Link href="/" className="mobile-logo-link" aria-label="Home">
          <img className="mobile-logo" src="/Images/longlogo.svg" alt="Logo" />
        </Link>
        <button id="menu-btn" className="glass-round-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span>
        </button>
      </div>

      <div id="mobile-menu" aria-hidden="true">
        <nav className="mobile-menu-panel">
          <Link href="/" data-page="index" className="mobile-menu-link"><span className="mobile-menu-title">Home</span><span className="mobile-menu-desc">Back to the beginning</span></Link>
          <Link href="/about" data-page="about" className="mobile-menu-link"><span className="mobile-menu-title">About Me</span><span className="mobile-menu-desc">Who I am &amp; what drives me</span></Link>
          <Link href="/experience" data-page="experience" className="mobile-menu-link"><span className="mobile-menu-title">Experience</span><span className="mobile-menu-desc">My journey &amp; career highlights</span></Link>
          <Link href="/projects" data-page="projects" className="mobile-menu-link"><span className="mobile-menu-title">Projects</span><span className="mobile-menu-desc">Work I&apos;ve crafted &amp; shipped</span></Link>
          <Link href="/contact" data-page="contact" className="mobile-menu-link"><span className="mobile-menu-title">Contact Me</span><span className="mobile-menu-desc">Let&apos;s build something together</span></Link>
          <Link href="/links" data-page="links" className="mobile-menu-link"><span className="mobile-menu-title">Quick Links</span><span className="mobile-menu-desc">More places to find me</span></Link>
        </nav>
      </div>
      <button id="menu-close-mobile" className="menu-close-btn" aria-label="Close menu">
        <svg viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Constellation SVG overlay */}
      <svg id="cs-constellation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"></svg>

      <main className="cs-page">
        <div className="cs-rings" aria-hidden="true">
          <div className="cs-ring cs-ring-1"></div>
          <div className="cs-ring cs-ring-2"></div>
          <div className="cs-ring cs-ring-3"></div>
        </div>

        {/* Back to Homepage Button */}
        <Link href="/" className="cs-home-btn" aria-label="Back to Homepage">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to Homepage
        </Link>

        {/* Open hero — no card box */}
        <div className="cs-hero">

          <div className="cs-eyebrow">
            <span className="cs-eyebrow-line"></span>
            Crafting the next chapter
            <span className="cs-eyebrow-line"></span>
          </div>

          <br />

          <h1 className="cs-headline"><span className="grad">Coming</span> Soon</h1>
          {/* <span class="cs-sub">This page is under construction</span> */}
          <div className="cs-rule"></div>
          <p className="cs-body">Something Thoughtful Is Taking Shape&#8202;&#8202;Refined Pixel By Pixel, Crafted Line By Line.
          </p>

        </div>

        {/* Countdown — floating, outside any box */}
        <div className="cs-countdown">
          <div className="cs-cd-unit">
            <div className="cs-cd-box"><span className="cs-cd-num" id="cd-d">30</span></div>
            <span className="cs-cd-lbl">Days</span>
          </div>
          <div className="cs-cd-sep"><span className="cs-cd-dot"></span><span className="cs-cd-dot"></span></div>
          <div className="cs-cd-unit">
            <div className="cs-cd-box"><span className="cs-cd-num" id="cd-h">00</span></div>
            <span className="cs-cd-lbl">Hours</span>
          </div>
          <div className="cs-cd-sep"><span className="cs-cd-dot"></span><span className="cs-cd-dot"></span></div>
          <div className="cs-cd-unit">
            <div className="cs-cd-box"><span className="cs-cd-num" id="cd-m">00</span></div>
            <span className="cs-cd-lbl">Mins</span>
          </div>
          <div className="cs-cd-sep"><span className="cs-cd-dot"></span><span className="cs-cd-dot"></span></div>
          <div className="cs-cd-unit">
            <div className="cs-cd-box"><span className="cs-cd-num" id="cd-s">00</span></div>
            <span className="cs-cd-lbl">Secs</span>
          </div>
        </div>

        {/* Bottom: notify + progress + tags */}
        <div className="cs-bottom">
          {/* <div class="cs-notify">
            <input type="email" class="cs-notify-input" id="cs-email" placeholder="your@email.com" />
            <button class="cs-notify-btn" id="cs-notify-btn">Notify Me</button>
          </div>
          <p class="cs-success" id="cs-success">&#10022; &nbsp; You're on the list &mdash; see you soon.</p> */}

          <div className="cs-progress-wrap">
            <div className="cs-progress-label">
              <span className="cs-progress-text">Build progress</span>
              <span className="cs-progress-pct">70%</span>
            </div>
            <div className="cs-progress-track">
              <div className="cs-progress-fill"></div>
            </div>
          </div>
        </div>
        <br /><br />

        <div className="cs-tags">
          <span className="cs-tag">UI / UX</span>
          <span className="cs-tag">Design</span>
          <span className="cs-tag">Development</span>
          <span className="cs-tag">Creative</span>
        </div>

      </main>

      <footer>
        <div className="social-links">
          <a href="https://www.behance.net/ruchiraedirisinghe" target="_blank" rel="noopener noreferrer" aria-label="Behance">
            <svg viewBox="0 0 24 24">
              <path
                d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z" />
            </svg>
          </a>
          <a href="https://github.com/ruchira-edirisinghe" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ruchiraedirisinghe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/ruchii_zzz/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>
        <span className="copyright">© 2026 Ruchira Edirisinghe</span>
      </footer>

      <ScrollTop />
    </>
  );
}
