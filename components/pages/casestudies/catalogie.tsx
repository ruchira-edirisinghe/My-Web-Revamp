'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

/* Shipped releases, newest first. Catalogie is a live product - when a new
   version goes out, add an entry at the top of this list and the timeline in
   section 06 grows with it. Mirrors the dev diaries on catalogie.com. */
const RELEASES = [
  {
    version: 'v1.2.0',
    tag: 'Release',
    date: '25 July 2026',
    title: 'Books from readers, sharper ratings, dozens of new badges',
    points: [
      'Reader-contributed books - describe a missing title once and, after moderation, it becomes a shared catalogue entry everyone can track',
      'Rate your way: 5 stars with halves or a 10-point scale, set independently per medium, with the Catalogie community average shown beside the external score',
      'Per-episode ratings, each with its own external score on the still',
      'Milestone badges grew from 6 to 35+ in tiers, and Yearly Wraps was rebuilt around any year you pick',
      'A still-airing series now sits under "More episodes coming" instead of being filed away as finished',
    ],
  },
  {
    version: 'v1.1.3',
    tag: 'Patch',
    date: '17 July 2026',
    title: 'A faster library, clearer messages and performance work',
    points: [
      'Fixed a future-dated game session that could take the whole dashboard down with it',
      'Library and follower counts refresh as you move through the app - no reload to see a change made on another device',
      'Movie watch dates surfaced at last: they had been recorded for years and simply never shown',
      'Posters load as you scroll, the library ships about half the payload it used to, and book pages return faster',
    ],
  },
  {
    version: 'v1.1.2',
    tag: 'Patch',
    date: '16 June 2026',
    title: 'A clearer sign-in, steadier rendering and the dev diaries',
    points: [
      'Sign-in and create-account now state the Terms and Privacy Policy, both linked, with a way back to the homepage',
      'Fixed a bug where slow or blocked web fonts could briefly scramble a page - fonts are now self-hosted',
      'Shipped the standalone Dev Diaries page that documents every release',
    ],
  },
  {
    version: 'v1.1.1',
    tag: 'Patch',
    date: '15 June 2026',
    title: 'Sign-up safety, a friendlier date picker and polish',
    points: [
      'Closed a sign-up bug that could permanently lock someone out of their own account',
      'Unverified sign-ins auto-resend a fresh verification email if one goes missing',
      'A new date picker for logging watch dates, and heatmaps that open on your most recent week',
    ],
  },
  {
    version: 'v1.1.0',
    tag: 'Release',
    date: '14 June 2026',
    title: 'Following, notifications and a faster library',
    points: [
      'Follow other people and shape a public profile you control down to a single title',
      'Comments and reactions on the titles you track',
      'Opt-in push notifications, and Founding Member badges for the first 1,000 accounts',
    ],
  },
  {
    version: 'v1.0.0',
    tag: 'Launch',
    date: '13 June 2026',
    title: 'Catalogie is live - one home for everything you track',
    points: [
      'Movies, TV, games and books in a single library',
      'Progress by episode, chapter, page or hours played',
      'A dashboard with streaks, genres and time counted',
      'Accounts with email or Google sign-in, private by default',
    ],
  },
];

const APP_SHOTS = [
  { src: '/Images/projects/catalogie/app-dashboard.png', alt: 'Catalogie - profile and analytics dashboard', label: 'Dashboard & Profile' },
  { src: '/Images/projects/catalogie/app-discover.png', alt: 'Catalogie - Discover, searching across every medium', label: 'Discover' },
  { src: '/Images/projects/catalogie/app-movies.png', alt: 'Catalogie - movie watchlist and watched grid', label: 'Movie Watchlist' },
  { src: '/Images/projects/catalogie/app-games.png', alt: 'Catalogie - games playlist with hours played', label: 'Games Playlist' },
  { src: '/Images/projects/catalogie/app-books.png', alt: 'Catalogie - reading list with page progress', label: 'Reading List' },
  { src: '/Images/projects/catalogie/app-login.png', alt: 'Catalogie - sign in and create account', label: 'Sign In' },
];

const SITE_SHOTS = [
  { src: '/Images/projects/catalogie/home-hero.png', alt: 'catalogie.com - hero', label: 'Marketing Hero' },
  { src: '/Images/projects/catalogie/home-founding.png', alt: 'catalogie.com - Founding Members', label: 'Founding Members' },
  { src: '/Images/projects/catalogie/home-features.png', alt: 'catalogie.com - feature bento grid', label: 'Feature Grid' },
  { src: '/Images/projects/catalogie/home-dashboard.png', alt: 'catalogie.com - dashboard showcase', label: 'Dashboard Story' },
  { src: '/Images/projects/catalogie/home-pricing.png', alt: 'catalogie.com - free forever', label: 'Free Forever' },
  { src: '/Images/projects/catalogie/home-roadmap.png', alt: 'catalogie.com - roadmap', label: 'Roadmap' },
  { src: '/Images/projects/catalogie/home-faq.png', alt: 'catalogie.com - FAQ accordion', label: 'FAQ' },
  { src: '/Images/projects/catalogie/home-diaries.png', alt: 'catalogie.com - dev diaries', label: 'Dev Diaries' },
  { src: '/Images/projects/catalogie/homepage.png', alt: 'catalogie.com - the full homepage', label: 'Homepage' },
];


const RAIL_GAP = 20; // keep in sync with .cat-rail-track gap

export default function CaseStudyCatalogie() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  /* ── Release rail ──
     Buttons, the mouse wheel and drag-release momentum all feed one target
     scroll position, and a single rAF loop eases the rail toward it. Routing
     every input through the same loop is what lets them interrupt each other
     smoothly instead of fighting. It is also why the motion is hand-animated
     rather than `behavior: 'smooth'` - browsers suppress native smooth
     scrolling when the OS asks for reduced motion, which would jump-cut. */
  const railRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const raf = useRef<number | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const syncEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  const stopAnim = useCallback(() => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  }, []);

  // Ease toward `target` by a fixed fraction each frame, so a new target
  // mid-flight is simply followed rather than restarting a timed tween.
  const runAnim = useCallback(() => {
    if (raf.current !== null) return;
    const step = () => {
      const el = railRef.current;
      if (!el) { raf.current = null; return; }
      const diff = target.current - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target.current;
        raf.current = null;
        return;
      }
      el.scrollLeft += diff * 0.16;
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  // Where the next motion should start from: the live position when nothing
  // is animating, otherwise the target already in flight.
  const basis = useCallback(() => {
    const el = railRef.current;
    if (!el) return 0;
    return raf.current === null ? el.scrollLeft : target.current;
  }, []);

  const slide = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.cat-release');
    const step = card ? card.offsetWidth + RAIL_GAP : el.clientWidth * 0.8;
    target.current = Math.max(0, Math.min(basis() + dir * step, el.scrollWidth - el.clientWidth));
    runAnim();
  }, [basis, runAnim]);

  /* ── Leaving-the-site confirmation ──
     Reuses the very same #redirect-modal the shared case-study engine drives
     for the CTA buttons, so a collaborator link gets an identical prompt. We
     only need to *open* it - the engine already owns cancel, confirm, overlay
     click and Escape, and its handlers close whatever opened it. */
  const opener = useRef<HTMLElement | null>(null);

  const confirmLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>, who: string) => {
    const modal = document.getElementById('redirect-modal');
    const msg = document.getElementById('redirect-msg');
    const go = document.getElementById('redirect-confirm');
    const stay = document.getElementById('redirect-cancel');
    // If the engine has not mounted the modal, let the link behave normally.
    if (!modal || !msg || !go) return;
    e.preventDefault();
    opener.current = e.currentTarget;
    msg.textContent = `Do you wish to continue to ${who}?`;
    go.setAttribute('href', e.currentTarget.getAttribute('href') || '#');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (stay instanceof HTMLElement) stay.focus();
  }, []);

  // Send focus back to the card that opened the prompt, whichever way it closed.
  useEffect(() => {
    const modal = document.getElementById('redirect-modal');
    if (!modal) return;
    const obs = new MutationObserver(() => {
      if (!modal.classList.contains('active') && opener.current) {
        opener.current.focus();
        opener.current = null;
      }
    });
    obs.observe(modal, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener('scroll', syncEdges, { passive: true });
    window.addEventListener('resize', syncEdges);

    /* Mouse wheel - a vertical wheel drives the rail sideways. */
    const onWheel = (e: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      // Trackpads that already send horizontal intent pass straight through.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      const from = basis();
      const to = Math.max(0, Math.min(from + delta, max));
      // At either end, release the wheel back to the page instead of
      // trapping the pointer inside the rail.
      if (to === from) return;
      e.preventDefault();
      target.current = to;
      runAnim();
    };
    el.addEventListener('wheel', onWheel, { passive: false });

    /* Drag to scroll - mouse only. Touch already has native momentum, and
       hijacking it here would be strictly worse than what the browser does. */
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0; // px per ms

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      velocity = 0;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastT = performance.now();
      stopAnim();
      el.classList.add('is-dragging');
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const max = el.scrollWidth - el.clientWidth;
      el.scrollLeft = Math.max(0, Math.min(startScroll - (e.clientX - startX), max));
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) velocity = (lastX - e.clientX) / dt;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      // Carry the release velocity into a short glide.
      const max = el.scrollWidth - el.clientWidth;
      target.current = Math.max(0, Math.min(el.scrollLeft + velocity * 180, max));
      runAnim();
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    return () => {
      el.removeEventListener('scroll', syncEdges);
      window.removeEventListener('resize', syncEdges);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      stopAnim();
    };
  }, [syncEdges, basis, runAnim, stopAnim]);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>One Catalog for <span className="tagline-name">Everything</span></>}
    >
      {/* ═══════════════════════════════
           FLOATING TABLE OF CONTENTS
      ═══════════════════════════════ */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Challenge</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-team"><span className="cs-toc-label">The Team</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-stack"><span className="cs-toc-label">Architecture</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-product"><span className="cs-toc-label">The Product</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-site"><span className="cs-toc-label">The Site</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-releases"><span className="cs-toc-label">Shipping</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>
        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* ═══════════════════════════════
               HERO - Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <div className="cs-hero-labels">
              <span className="cs-label">Collaborative Project</span>
              <span className="cs-label">Team of Three</span>
              <span className="cs-label">Live Product</span>
            </div>
            <h1 className="cs-hero-title">Catalogie</h1>
            <p className="cs-hero-subtitle">
              Track everything you watch, play &amp; read - movies, TV series, games and books
              in one catalog, on a self-hosted PERN stack we build together and keep shipping.
            </p>
            <div className="cat-status-row">
              <span className="cat-status"><span className="dot"></span>Live at catalogie.com</span>
              <span className="cat-status is-ongoing"><span className="dot"></span>Ongoing · currently v1.2.0</span>
            </div>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/catalogie/cover.png" alt="Catalogie - one catalog for movies, TV, games and books"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>

          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">My Role</div>
              <div className="cs-meta-value">Design &amp;<br/>Engineering</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Team</div>
              <div className="cs-meta-value">Collaborative<br/>3 People</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Media Tracker<br/>Web App + PWA</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Stack</div>
              <div className="cs-meta-value">React · Express 5<br/>PostgreSQL · TS</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Status</div>
              <div className="cs-meta-value">Live &amp; Ongoing<br/>Since Jun 2026</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Catalogie is a media tracker that puts <em className="cat-em">movies, TV series, games and books</em> in
              a single catalog - logged at the unit each medium actually deserves: the episode, the watch, the hour played, the page.
              It is a real product with real users, built and operated by <em className="cat-em">three of us</em>,
              running on our own hardware behind a TypeScript API, and it is <em className="cat-em">still being built</em> -
              six versions have shipped since launch and the roadmap is public. This case study covers both halves: the app at
              app.catalogie.com and the marketing site at catalogie.com.
            </p>
          </div>


          {/* ═══════════════════════════════
               01 - THE CHALLENGE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 --</span>
              <span className="cs-section-num">The Challenge</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Four Apps, One Media Life</h2>

            <p className="cs-body">
              Anyone who consumes a reasonable amount of media ends up running four systems at once: a film diary in one app,
              a game backlog in a spreadsheet, a reading list in a third place, and TV they simply try to remember. None of them
              talk to each other, none of them can answer &ldquo;what did I actually do this year&rdquo;, and every one of them is a
              different company&apos;s idea of what your history is worth. The obvious fix - one tracker for everything - is
              deceptively hard, because the four media do not share a unit of progress. A series is tracked by episode across
              seasons. A film is a single event you may repeat. A game is an open-ended pile of hours. A book is a page number.
              Force them into one schema too early and every medium ends up tracked badly.
            </p>

            <div className="cs-highlight">
              <p>&ldquo;Four media, four different units of progress. The hard part is not storing them - it&apos;s making one interface where <em>all four feel native</em>.&rdquo;</p>
            </div>

            <div className="cs-cards-grid is-2x2">
              <div className="cs-card">
                <div className="cs-card-icon">🧩</div>
                <h4>Product Problem</h4>
                <p>Track four media whose progress models have nothing in common, in one library, without any of them feeling like an afterthought bolted onto a TV app.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔌</div>
                <h4>Data Problem</h4>
                <p>No single catalog covers all four. TV and film, games, and books each come from different providers with their own auth, quotas and licence terms - and none of their keys may ever reach a browser.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏗️</div>
                <h4>Platform Problem</h4>
                <p>A tracker only earns trust if the history survives. That meant real accounts, a real database, backups, and infrastructure we own - not a prototype with everything in localStorage.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Team Problem</h4>
                <p>Three people on one codebase, plus a native mobile app being built in a separate repo - so the API had to be a documented contract, not an internal detail of the web client.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               02 - THE TEAM
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-team">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 --</span>
              <span className="cs-section-num">The Team</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">A Collaborative Build</h2>

            <p className="cs-body">
              Catalogie began as my idea, and it is now designed, built and looked after by three of us - the credit sits
              inside the app itself under <strong>Settings → Made by</strong>. I own the product direction and work across the
              whole stack: the UI design, the React client, and the TypeScript backend from schema to deployment. I share that
              engineering surface with <strong>Nimna Niwarthana</strong>, while <strong>Thaanu Perera</strong> builds the
              native mobile app against the same API in a separate repository. That third consumer is the reason the backend
              was designed API-first from day one.
            </p>

            <div className="cat-team-grid">
              {/* Not a link - you are already on my site. */}
              <div className="cat-member is-me is-static">
                <img className="cat-avatar" src="/Images/projects/catalogie/team-ruchira.png" alt="" width="76" height="76" loading="lazy" />
                <div className="cat-member-name">Ruchira Edirisinghe</div>
                <div className="cat-member-role">Concept · Design · Engineering</div>
                <p className="cat-member-note">That&apos;s me - Catalogie started as my idea. Product and UI design, the React client, the backend API and deployment.</p>
                <span className="cat-member-here">You&apos;re on my portfolio</span>
              </div>
              <a className="cat-member" href="https://nimna-niwarthana.com" target="_blank" rel="noopener"
                onClick={(e) => confirmLeave(e, "Nimna Niwarthana's portfolio")}>
                <img className="cat-avatar" src="/Images/projects/catalogie/team-nimna.png" alt="" width="76" height="76" loading="lazy" />
                <div className="cat-member-name">Nimna Niwarthana</div>
                <div className="cat-member-role">Design &amp; Engineering</div>
                <p className="cat-member-note">Client, API and infrastructure, plus the admin panel.</p>
                <span className="cat-member-link">Portfolio ↗</span>
              </a>
              <a className="cat-member" href="https://www.linkedin.com/in/thaanu-perera-0a84b9194/" target="_blank" rel="noopener"
                onClick={(e) => confirmLeave(e, "Thaanu Perera's LinkedIn")}>
                <img className="cat-avatar" src="/Images/projects/catalogie/team-thaanu.png" alt="" width="76" height="76" loading="lazy" />
                <div className="cat-member-name">Thaanu Perera</div>
                <div className="cat-member-role">Mobile Development</div>
                <p className="cat-member-note">The native iOS and Android apps, on the same API.</p>
                <span className="cat-member-link">LinkedIn ↗</span>
              </a>
            </div>

            <h3 className="cs-sub-heading">How Three People Share One Codebase</h3>

            <p className="cs-body">
              With more than one person shipping daily, process is not bureaucracy - it is the only thing keeping a live product
              stable. Work flows from a personal branch to <code className="cat-code">dev</code> to
              <code className="cat-code"> main</code>, where every merge is reviewed and
              <code className="cat-code"> main</code> is the release branch. Two CI jobs gate every push -
              lint, typecheck, test and build for the server, the same for the client - plus a security job running
              <code className="cat-code"> npm audit</code> and a gitleaks secret scan over full history.
              The architecture lives in a committed plan document and every decision that deviates from it is written into a
              decision log, so nobody has to reconstruct why something was built a certain way six weeks later.
            </p>

            <div className="cs-flow">
              <div className="flow-step"><div className="flow-node">🌿</div><div className="flow-label">Personal Branch</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🔀</div><div className="flow-label">dev + Review</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">✅</div><div className="flow-label">CI Gates</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">📦</div><div className="flow-label">main → GHCR</div></div>
              <div className="flow-arrow"></div>
              <div className="flow-step"><div className="flow-node">🚀</div><div className="flow-label">Deploy + Diary</div></div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">📓</div>
              <p className="cs-callout-text">Every release also ships a <strong className="cat-strong">dev diary</strong> - a plain-English account of what changed, including the bugs we got wrong. It is published on the marketing site and is a deliberate part of the process: <strong className="cat-strong">if it shipped, it gets written up.</strong></p>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 - STACK & ARCHITECTURE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-stack">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 --</span>
              <span className="cs-section-num">Architecture</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Stack &amp; Architecture</h2>

            <p className="cs-body">
              Catalogie runs on the <strong>PERN stack</strong> - PostgreSQL 17, Express 5, React 18, Node 24 - with the entire
              server written in <strong>strict TypeScript</strong>. It is a <strong>modular monolith</strong>: one Express
              process, fourteen feature modules, and background jobs in-process, because at this scale microservices would only
              add operational surface. The whole thing self-hosts on an <strong>Oracle Ampere A1</strong> VM (4 OCPU / 24 GB,
              Ubuntu arm64) behind <strong>Caddy</strong>, which terminates TLS and serves two vhosts: the built React SPA as
              static files at <code className="cat-code">app.catalogie.com</code>, and a reverse proxy to
              the API at <code className="cat-code">api.catalogie.com</code>. Sharing one registrable
              domain is what lets web auth cookies stay first-party.
            </p>

            <h3 className="cs-sub-heading">A Prototype Backend vs. What Catalogie Runs</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Where It Started</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>All user state in <code className="cat-code-sm">localStorage</code> - one cleared browser and years of history are gone</span></li>
                    <li><div className="cs-list-bullet"></div><span>A plain-JS Express prototype with per-media tables and no auth</span></li>
                    <li><div className="cs-list-bullet"></div><span>Serverless proxies on someone else&apos;s platform, no database, no backups</span></li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> Where It Runs Now</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div><span>PostgreSQL 17 with 36 reviewed SQL migrations and nightly encrypted off-box backups</span></li>
                    <li><div className="cs-list-bullet"></div><span>Strict-TypeScript Express 5 API - Zod at every boundary, ownership checks from the session</span></li>
                    <li><div className="cs-list-bullet"></div><span>Self-hosted on our own VM, TLS by Caddy, deployed from CI by container image</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Stack at a Glance</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">⚛️</div>
                <div>
                  <div className="persona-name">Client</div>
                  <div className="persona-role">React 18 · Vite · PWA</div>
                  <div className="persona-traits">
                    <span className="persona-trait">SPA</span>
                    <span className="persona-trait">Service Worker</span>
                    <span className="persona-trait">Installable</span>
                  </div>
                  <p className="persona-quote">&ldquo;Static build served straight off our own Caddy - and installable to a phone home screen with no app store in the loop.&rdquo;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🛡️</div>
                <div>
                  <div className="persona-name">API</div>
                  <div className="persona-role">Express 5 · TypeScript · Zod</div>
                  <div className="persona-traits">
                    <span className="persona-trait">14 Modules</span>
                    <span className="persona-trait">OpenAPI Docs</span>
                    <span className="persona-trait">better-auth</span>
                  </div>
                  <p className="persona-quote">&ldquo;Routers parse, services decide, repos query. No <code>any</code>, and no unvalidated request body ever reaches business logic.&rdquo;</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🐘</div>
                <div>
                  <div className="persona-name">Data &amp; Jobs</div>
                  <div className="persona-role">PostgreSQL 17 · Drizzle · pg-boss</div>
                  <div className="persona-traits">
                    <span className="persona-trait">36 Migrations</span>
                    <span className="persona-trait">Cron in Postgres</span>
                    <span className="persona-trait">No Redis</span>
                  </div>
                  <p className="persona-quote">&ldquo;The queue lives in the database we already run - one less service to operate, and every job is idempotent and retried.&rdquo;</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">The Progress Model - Four Media, One Library</h3>

            <p className="cs-body">
              The schema decision that makes the whole product work is refusing to flatten the four media into one progress
              column. A single <code className="cat-code">library_entries</code> row holds what is genuinely
              shared - the title, the status, favourite, rating, notes - with a uniqueness constraint of one entry per user per
              title. Everything that differs lives in its own append-only event table, which is also what makes rewatches,
              replays and re-reads possible instead of a single boolean.
            </p>

            <div className="cat-media-grid">
              <div className="cat-media tv">
                <div className="cat-media-icon">📺</div>
                <h4>TV Series</h4>
                <div className="cat-media-unit">Unit · Episode</div>
                <p>An <code className="cat-code-sm">episode_watches</code> row per viewing - append-only, so a rewatch is another row, not an overwrite. Season bulk-marking, per-episode ratings.</p>
              </div>
              <div className="cat-media movies">
                <div className="cat-media-icon">🎬</div>
                <h4>Movies</h4>
                <div className="cat-media-unit">Unit · Watch Event</div>
                <p><code className="cat-code-sm">title_watches</code> records each viewing with its date, so watch count is a <code className="cat-code-sm">COUNT(*)</code> and your history has a timeline.</p>
              </div>
              <div className="cat-media games">
                <div className="cat-media-icon">🎮</div>
                <h4>Games</h4>
                <div className="cat-media-unit">Unit · Hours Played</div>
                <p><code className="cat-code-sm">play_sessions</code> logs hours against a date with an optional note. Total playtime is a sum, so a backlog becomes measurable.</p>
              </div>
              <div className="cat-media books">
                <div className="cat-media-icon">📖</div>
                <h4>Books</h4>
                <div className="cat-media-unit">Unit · Pages</div>
                <p><code className="cat-code-sm">reading_logs</code> plus a current page on the entry - progress is a percentage of a real page count, not a guess.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">💡</div>
              <p className="cs-callout-text">All four event tables are unioned into one <strong className="cat-strong">SQL view</strong>, <code className="cat-code-plain">activity_events</code>. That single view is what powers the streak counter, the activity heatmap and the yearly wrap - so <strong className="cat-strong">finishing a book and beating a game feed the same streak</strong>, which is the entire point of one catalog.</p>
            </div>

            <h3 className="cs-sub-heading">Catalog Integrations - Federated Metadata, Zero Keys in the Browser</h3>

            <p className="cs-body">
              No single metadata source covers movies, TV, games and books, so Catalogie federates several third-party
              catalogs behind one internal interface - and every one of them is called from the server. Keys live only in
              environment variables, outbound calls go to a fixed host allowlist (so a client-supplied URL can never trigger
              a request), each has a 10-second timeout and one retry, and responses are cached to respect quotas that are a
              shared, finite resource for a live product. Each provider sits behind its own typed client module, so swapping
              one out is a single file.
            </p>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Covers</div>
                <div className="cs-comp-row-label">Auth Model</div>
                <div className="cs-comp-row-label highlight">Quota Strategy</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📺 Screen Catalog</div>
                <div className="cs-comp-cell" data-label="Covers">Series, seasons, episodes and films - the spine of the catalog.</div>
                <div className="cs-comp-cell" data-label="Auth Model">Server-side login exchanged for a token, cached and refreshed well before its expiry.</div>
                <div className="cs-comp-cell highlight" data-label="Quota Strategy">A 10-minute LRU on every response, and one silent retry when a token goes stale.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎮 Games Catalog</div>
                <div className="cs-comp-cell" data-label="Covers">Games, platforms, studios and artwork, with a second source filling the two gaps the first leaves - critic score and average playtime.</div>
                <div className="cs-comp-cell" data-label="Auth Model">OAuth client-credentials token cached for its full lifetime; the supplementary source is matched by title and release year.</div>
                <div className="cs-comp-cell highlight" data-label="Quota Strategy">A limiter holds requests under the published rate ceiling, backs off once when throttled, and caches for 10 minutes. The enrichment source is optional - no key, no enrichment, and the page renders exactly as before.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">📚 Books · ⭐ Ratings · 📅 Releases</div>
                <div className="cs-comp-cell" data-label="Covers">Book records and cover art, external critic and audience scores, and upcoming release dates for the calendar.</div>
                <div className="cs-comp-cell" data-label="Auth Model">Keys server-side only, each behind its own typed client module.</div>
                <div className="cs-comp-cell highlight" data-label="Quota Strategy">The tightest daily quota is cached in Postgres with a 24-hour TTL and coalesced requests; release data merges best-effort, so the calendar never breaks when a source is down.</div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Security &amp; Operations</h3>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🔐</div>
                <h4>Auth Built for Two Clients</h4>
                <p><strong>better-auth</strong> handles email + password and Google sign-in with DB-backed sessions. The web client uses first-party <code className="cat-code-sm">SameSite=Lax</code> cookies; the native app uses the bearer plugin to get the same session as a token - because a native app has no browser origin and never sees a cookie.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧪</div>
                <h4>Tests Ship With the Feature</h4>
                <p>Integration-first with Vitest and Supertest against a real Postgres, never mocks of our own SQL. 62 server suites and 20 client suites, plus an <strong>authz matrix</strong> that asserts user A cannot touch user B&apos;s entries, comments or uploads. Both are required CI jobs.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🖼️</div>
                <h4>Uploads Treated as Hostile</h4>
                <p>Avatars and comment attachments are validated by <strong>magic bytes</strong> rather than MIME or extension, re-encoded through sharp to strip EXIF and any embedded payload, stored under random UUIDs, and served with <code className="cat-code-sm">nosniff</code> from a path that cannot execute anything.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💾</div>
                <h4>Backups &amp; Restore Drills</h4>
                <p>Nightly <code className="cat-code-sm">pg_dump</code> shipped off-box to object storage with 30-day retention, uploads rsynced weekly - and a <strong>monthly restore drill</strong>, because a backup nobody has restored is a hypothesis, not a backup.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⏱️</div>
                <h4>Background Jobs</h4>
                <p>pg-boss runs the cron in Postgres: episode sync at 03:00, release dates at 04:00, ratings refresh at 04:30 within a daily quota budget, weekly upload cleanup, an email outbox drained every two minutes and push delivery every minute.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📊</div>
                <h4>Measured, Not Guessed</h4>
                <p>Load testing pinned the API to one core and found the ceiling was <strong>Node CPU, not Postgres</strong>. The fixes followed the measurement - trimming the heaviest field from the library list payload and compressing responses - rather than the reflex of adding a cache layer.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               04 - THE PRODUCT
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-product">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 --</span>
              <span className="cs-section-num">The Product</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Covering Almost Every Tracking Need</h2>

            <p className="cs-body">
              The goal was never &ldquo;a TV tracker that also does books&rdquo;. It was to answer every question a person
              actually asks about their own media life - and to answer all of them in one place. Working through those questions
              one at a time is how the feature set was decided, and it is why the app now covers close to the whole surface of
              what a tracker is asked to do.
            </p>

            <div className="insight-grid">
              <div className="insight-card">
                <div className="insight-num">01</div>
                <div className="insight-title">What am I tracking?</div>
                <p className="insight-body">One library across all four media, with per-medium statuses that use the right words - <em>watching / watchlist</em> for TV, <em>playing / wish</em> for games, <em>reading / want</em> for books - plus favourites and custom filters.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">02</div>
                <div className="insight-title">Where did I stop?</div>
                <p className="insight-body">Progress at the natural unit: the episode inside its season, the page inside the book, the hours inside the playthrough. Bulk-mark a whole season, or log a session with the date it happened.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">03</div>
                <div className="insight-title">What did I think of it?</div>
                <p className="insight-body">Rate on your own scale - five stars with halves or a ten-point scale, chosen independently per medium - and rate individual episodes. The number on disk is always canonical, so switching scale is presentation, never a migration.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">04</div>
                <div className="insight-title">What did everyone else think?</div>
                <p className="insight-body">External critic and audience scores sit beside a <strong>Catalogie community average</strong> aggregated anonymously from members&apos; own ratings - shown in whichever scale you prefer.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">05</div>
                <div className="insight-title">What&apos;s next?</div>
                <p className="insight-body">A watchlist, backlog and TBR pile in one queue, a release calendar of what is coming, and opt-in push notifications so a new season or a shipped game finds you instead of the other way round.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">06</div>
                <div className="insight-title">What have I actually done?</div>
                <p className="insight-body">Time counted per medium, a genre fingerprint, an activity heatmap with current and longest streaks, 35+ milestone badges in tiers, and a Yearly Wrap for any year you pick.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">07</div>
                <div className="insight-title">Who else is watching this?</div>
                <p className="insight-body">Follow other people, keep a profile you control down to a single title, and leave threaded comments with reactions and image attachments - on a title or on a specific episode.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">08</div>
                <div className="insight-title">I already have years of history.</div>
                <p className="insight-body">Importers bring an existing watch history across rather than asking anyone to start from zero - parsed, matched against the catalog and reviewed before anything lands in the library.</p>
              </div>
              <div className="insight-card">
                <div className="insight-num">09</div>
                <div className="insight-title">The catalog is missing my book.</div>
                <p className="insight-body">Describe it once and, after a moderation pass, it becomes a real shared entry everyone can track - and you get told when yours goes in. The catalog grows from its readers.</p>
              </div>
            </div>

            <h3 className="cs-sub-heading">Where It Deliberately Stops</h3>

            <p className="cs-body">
              &ldquo;Almost all&rdquo; is the honest claim, not &ldquo;all&rdquo;. Music and podcasts are not tracked yet, native
              iOS and Android apps are in build rather than shipped, and recommendations are drawn from what you finish and rate
              rather than anything more sophisticated. Those are on the roadmap in the open - the feature request path is a
              support email that goes straight onto the list, which is how several shipped features got there.
            </p>

            <div className="cs-callout">
              <div className="cs-callout-icon">🔒</div>
              <p className="cs-callout-text">Two product promises shape everything above: Catalogie is <strong className="cat-strong">free to use, forever</strong> - no tier, no card, no trial clock - and your catalog is <strong className="cat-strong">private by default</strong>, shareable down to a single title, with export always free. The first 1,000 accounts become <strong className="cat-strong">Founding Members</strong> with a permanent badge.</p>
            </div>

            <h3 className="cs-sub-heading">The App, Screen by Screen</h3>
            <p className="cs-body">The live app across its main surfaces - the dashboard and profile, Discover across all four media, the movie watchlist, the games playlist with hours played, the reading list, and sign-in. Click any screen to open it full-size.</p>

            <div className="ui-gallery">
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {APP_SHOTS.concat(APP_SHOTS).map((item, i) => (
                  <div key={i} className="ui-card" data-full={item.src}>
                    <img src={item.src} alt={item.alt} className="ui-thumb" loading="lazy" decoding="async"/>
                    <div className="ui-card-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               05 - THE MARKETING SITE
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-site">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 --</span>
              <span className="cs-section-num">The Site</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The Front Door - catalogie.com</h2>

            <p className="cs-body">
              The second half of the project is a separate repository: a one-page marketing site that has to sell a tracker to
              someone who has never heard of one. It is React 18 and TypeScript on <strong>Vite</strong>, animated with
              <strong> Framer Motion</strong> - scroll reveals, staggered entrances, magnetic buttons, count-up statistics,
              animated charts - over <strong>Lenis</strong> smooth scrolling, with a scroll progress bar and a navbar that
              highlights whichever section is in view. There is no UI kit and no icon package: every icon is inline SVG and the
              donut, genre bars and activity heatmap are hand-built in SVG and CSS. It deploys to GitHub Pages from a workflow
              on every merge.
            </p>

            <div className="cs-cards-grid is-2x2">
              <div className="cs-card">
                <div className="cs-card-icon">✍️</div>
                <h4>Copy in One File</h4>
                <p>Every word on the site - headlines, features, FAQ, roadmap, legal, dev diaries - lives in a single typed content module. Rewriting the pitch never means touching a component, which is what makes the messaging fast to iterate.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🎨</div>
                <h4>An Accent Per Medium</h4>
                <p>The brand gold carries the CTAs, and each tracked medium owns a hue - amber for movies, violet for TV, green for games, rose for books. The same four accents run through the app, so the site and the product read as one system.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🔢</div>
                <h4>A Live Founding Counter</h4>
                <p>The Founding Member section is not decorative - it calls the production API for the real remaining count, so the scarcity on the page is the actual number of spots left.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📜</div>
                <h4>Hidden, Not Deleted</h4>
                <p>Catalogie is presented as free forever, but the earlier tiered-pricing copy is commented out in place rather than removed - so if paid plans ever arrive, the plan grid and its FAQ answers come back as they were written.</p>
              </div>
            </div>

            <div className="creative-styleguide">

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="typo-hero">Talina</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item tw-400">Talina · Titles</span>
                    <span className="typo-weight-item tw-600">Montserrat · Numbers</span>
                    <span className="typo-weight-item tw-500">Inter · Body</span>
                    <span className="typo-weight-item tw-italic">Instrument Serif · Accent</span>
                  </div>
                </div>
              </div>

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">A cinematic near-black base with a single brand gold for anything actionable, and one accent per tracked medium so a glance at a card tells you what kind of thing it is before you read a word.</p>
                  <div className="color-strip">
                    <div className="color-block sw-gold"><span className="color-hex">#F5C451<br/>Brand Gold</span></div>
                    <div className="color-block sw-movies"><span className="color-hex">#F5A623<br/>Movies</span></div>
                    <div className="color-block sw-tv"><span className="color-hex">#A78BFA<br/>TV Series</span></div>
                    <div className="color-block sw-games"><span className="color-hex">#34D399<br/>Games</span></div>
                    <div className="color-block sw-books"><span className="color-hex">#FB7185<br/>Books</span></div>
                    <div className="color-block sw-base"><span className="color-hex">#0A0A0B<br/>Base</span></div>
                  </div>
                </div>
              </div>

            </div>

            <h3 className="cs-sub-heading">The Site, Section by Section</h3>
            <p className="cs-body">Captured live from catalogie.com - the hero, Founding Members, the feature grid, the dashboard story, free-forever, the roadmap, the FAQ, the dev diaries, and the mobile view.</p>

            <div className="ui-gallery">
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {SITE_SHOTS.concat(SITE_SHOTS).map((item, i) => (
                  <div key={i} className="ui-card" data-full={item.src}>
                    <img src={item.src} alt={item.alt} className="ui-thumb" loading="lazy" decoding="async"/>
                    <div className="ui-card-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               06 - SHIPPING / ONGOING
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-releases">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 --</span>
              <span className="cs-section-num">Shipping</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">An Ongoing Project</h2>

            <p className="cs-body">
              This is the part that makes Catalogie different from everything else in this portfolio: <strong>it is not
              finished, and it is not meant to be.</strong> It is a live product with real accounts on it, and new versions go
              out regularly - six of them since launch, each with a public dev diary explaining what changed. The section below
              is a snapshot, not a conclusion; it grows every time we ship.
            </p>

            <div className="cat-rail">
              <div className="cat-rail-head">
                <span className="cat-rail-hint">{RELEASES.length} releases · slide to browse</span>
                <div className="cat-rail-nav">
                  <button type="button" className="cat-rail-btn" aria-label="Previous releases"
                    onClick={() => slide(-1)} disabled={edge.start}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button type="button" className="cat-rail-btn" aria-label="Next releases"
                    onClick={() => slide(1)} disabled={edge.end}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              </div>

              <div className="cat-rail-track" ref={railRef} tabIndex={0}
                role="region" aria-label="Catalogie release history - scroll horizontally">
                {RELEASES.map((r, i) => (
                  <article key={r.version} className={'cat-release' + (i === 0 ? ' is-latest' : '')}>
                    <div className="cat-release-head">
                      <span className="cat-ver">{r.version}</span>
                      <span className="cat-ver-tag">{r.tag}</span>
                      <span className="cat-ver-date">{r.date}</span>
                    </div>
                    <h4>{r.title}</h4>
                    <ul>
                      {r.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <h3 className="cs-sub-heading">What Ships Next</h3>

            <div className="ia-grid">
              <div className="ia-card">
                <div className="ia-card-icon">📱</div>
                <h4>Native Apps</h4>
                <p>iOS and Android against the same API and account, with offline logging and push reminders. Already the reason the API speaks bearer tokens.</p>
              </div>
              <div className="ia-card">
                <div className="ia-card-icon">🌍</div>
                <h4>A Second Region</h4>
                <p>A UK VM plus a CDN in front, designed before it is built - the scaling path is documented rather than improvised.</p>
              </div>
              <div className="ia-card">
                <div className="ia-card-icon">📥</div>
                <h4>More Importers</h4>
                <p>Every tracker people are leaving behind is another parser and matcher, so nobody has to retype a decade of history.</p>
              </div>
              <div className="ia-card">
                <div className="ia-card-icon">🗳️</div>
                <h4>Requested Features</h4>
                <p>A support email goes straight onto the roadmap, and Founding Members get a direct line into what gets built next.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               07 - RESULTS & REFLECTION
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">07 --</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-count="4" data-suffix=" Media">0</div>
                <div className="outcome-label">Movies, TV, games and books tracked in a single library</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="6" data-suffix=" Versions">0</div>
                <div className="outcome-label">Shipped since launch, each with a public dev diary</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="14" data-suffix=" Modules">0</div>
                <div className="outcome-label">Feature modules behind one documented TypeScript API</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="3" data-suffix=" Builders">0</div>
                <div className="outcome-label">Designing, engineering and operating it together</div>
              </div>
            </div>

            <div className="cs-highlight is-spaced">
              <p>&ldquo;A film diary, a game spreadsheet, a reading list and a season you half-remember - <em>replaced by one catalog that is still being built.</em>&rdquo;</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A live, self-hosted media tracker with real accounts on it: four media in one library, progress at four different units, ratings on your own scale, a social layer, an analytics dashboard, importers, a release calendar and push notifications - behind a strict-TypeScript API with 36 migrations, an authz test matrix and nightly off-box backups.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenge</h4>
                <p>Keeping a deployed product working while rebuilding its entire backend underneath it. Every commit had to leave the live site functional, which meant the new API grew module by module beside the old one and only took over at cutover - no big-bang rewrite, no weekend of downtime.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>Shared external quotas are production infrastructure. Burning a catalog API key during testing took a real feature down for real users, and the rule that came out of it - test against internal endpoints, stub the catalog, keep dev keys separate from production - is now written into the project&apos;s working rules.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>Ship the native iOS and Android apps against the existing API, widen the importers, add a second region behind a CDN once there are users to justify it, and keep the release cadence - every version with a diary that explains, in plain language, what changed and what we got wrong.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              {/* The shared engine guesses the destination from the button text and
                  falls back to "Behance", which is wrong for both of these. Naming
                  the destination here overrides that guess - this handler runs after
                  the engine's, so the accurate message is the one that survives. */}
              <a href="https://app.catalogie.com/" target="_blank" rel="noopener"
                className="cs-cta-btn primary"
                onClick={(e) => confirmLeave(e, 'the Catalogie app')}>Open the App →</a>
              <a href="https://catalogie.com/" target="_blank" rel="noopener"
                className="cs-cta-btn ghost"
                onClick={(e) => confirmLeave(e, 'the Catalogie website')}>Visit the Live Site ↗</a>
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

      {/* ── REDIRECT MODAL ── */}
      <div id="redirect-modal" className="redirect-modal-overlay" aria-hidden="true">
        <div className="redirect-modal-card">
          <div className="redirect-modal-icon">
            {/* Stroke styling lives in CSS, not on the element - see the note
                on `.redirect-modal-icon svg`. */}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
          <h3 id="redirect-title" className="redirect-title">Leaving the Catalog</h3>
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
