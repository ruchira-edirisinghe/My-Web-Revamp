'use client';
import { useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import SiteFooter from './SiteFooter';
import ScrollTop from './ScrollTop';
import { initSpaceBackground } from '@/lib/scripts/space-background';
import { initScatterMenuCursor } from '@/lib/scripts/scatter-menu-cursor';
import { initPreloader } from '@/lib/scripts/preloader';
import { initSoundMusic } from '@/lib/scripts/sound-music';

export default function HomeClient() {
  useLayoutEffect(() => {
    // The home hero layout is guarded by `body:not([data-page]) .page` in
    // styles/home/style.css. Every non-home page sets body[data-page] (via
    // StandardShell → useBodyDataPage) and clears it on unmount, but a stale
    // value can survive a back-navigation / bfcache restore — which switches
    // that guard off and lets other pages' `main`/`.page` rules bleed onto the
    // hero (enlarged photo, one-line name, mis-placed elements). Home never
    // wants a data-page, so clear it unconditionally before first paint.
    document.body.removeAttribute('data-page');

    // Play the preloader on every load and every in-site navigation (no session skip).
    document.body.classList.remove('skip-preloader');
  }, []);

  useEffect(() => {
    // Load order matches the original index.html: space bg (no deps),
    // scatter/menu/cursor, preloader, then sound.
    const disposers = [
      initSpaceBackground(),
      initScatterMenuCursor(),
      initPreloader(),
      initSoundMusic(),
    ];

    // Restore body state if the browser serves this page from bfcache
    function handlePageShow(e: PageTransitionEvent) {
      if (!e.persisted) return;
      // On bfcache restore React effects don't re-run, so re-assert the home
      // invariant here too: no stale data-page (see useLayoutEffect above).
      document.body.removeAttribute('data-page');
      document.body.classList.remove('modal-active', 'modal-open', 'menu-open', 'page-transitioning');
      document.body.style.overflow = '';
    }
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      disposers.forEach((d) => d && d());
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <>
      {/* Split panels reveal the page behind the preloader */}
      <div id="split-top"></div>
      <div id="split-bottom"></div>

      {/* Preloader */}
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
        </div>
      </div>

      {/* Background canvases */}
      <canvas id="space-canvas"></canvas>
      <canvas id="scatter-canvas"></canvas>

      <main className="page">
        <div className="hero">
          <div className="photo-wrapper" id="photo-wrapper">
            <img id="hero-img" src="/Images/mynew.png" alt="Ruchira Edirisinghe" />
          </div>
          <div className="hero-text-group">
            <p className="subtitle">
              UI UX Engineer &nbsp;|&nbsp; UI UX Consultant
              <span className="vibe-inline"> &nbsp;|&nbsp; Vibe Coding Enthusiast</span>
            </p>
            <p className="subtitle subtitle-vibe">Vibe Coding Enthusiast</p>
            <h1 className="name">Ruchira Edirisinghe</h1>
          </div>
          <div className="cta-row">
            <button type="button" className="btn btn-outline" id="btn-explore">Explore</button>
            <Link href="/projects" className="btn btn-solid" id="btn-work">
              See My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />

      {/* Overlay navigation */}
      <div id="menu-overlay">
        <nav className="menu-nav" aria-label="Site menu">
          <Link href="/about" className="menu-item">
            <span className="menu-item-title">About Me</span>
            <span className="menu-item-desc">Who I am &amp; what drives me</span>
          </Link>
          <Link href="/experience" className="menu-item">
            <span className="menu-item-title">Experience</span>
            <span className="menu-item-desc">My journey &amp; career highlights</span>
          </Link>
          <Link href="/projects" className="menu-item">
            <span className="menu-item-title">Projects</span>
            <span className="menu-item-desc">Work I&apos;ve crafted &amp; shipped</span>
          </Link>
          <Link href="/contact" className="menu-item">
            <span className="menu-item-title">Contact Me</span>
            <span className="menu-item-desc">Let&apos;s build something together</span>
          </Link>
          <Link href="/links" className="menu-item">
            <span className="menu-item-title">Quick Links</span>
            <span className="menu-item-desc">More places to find me</span>
          </Link>
        </nav>
      </div>

      <button id="menu-close" aria-label="Close menu">
        <svg viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <button id="music-btn" aria-label="Toggle music">
        <canvas id="spectrum-canvas" width="26" height="18"></canvas>
      </button>

      <canvas id="cursor-canvas"></canvas>

      <ScrollTop />
    </>
  );
}
