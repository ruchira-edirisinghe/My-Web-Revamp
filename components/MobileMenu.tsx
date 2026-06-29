import type { NavKey } from './Navbar';

/**
 * Mobile top bar (music + logo + hamburger) and the slide-in mobile menu panel.
 * The page engine (projects.ts / about.ts / etc.) wires #menu-btn / #mobile-menu /
 * #menu-close-mobile and the .mobile-menu-link items.
 */
export default function MobileMenu({ active = null }: { active?: NavKey }) {
  const cls = (key: NavKey) => 'mobile-menu-link' + (active === key ? ' active' : '');
  return (
    <>
      <div id="mobile-topbar">
        <button id="music-btn" aria-label="Toggle music">
          <canvas id="spectrum-canvas" width="26" height="18"></canvas>
        </button>
        <a href="/" className="mobile-logo-link" aria-label="Home">
          <img className="mobile-logo" src="/Images/longlogo.svg" alt="Logo" />
        </a>
        <button id="menu-btn" className="glass-round-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span>
        </button>
      </div>

      <div id="mobile-menu" aria-hidden="true">
        <nav className="mobile-menu-panel">
          <a href="/about" data-page="about" className={cls('about')}>
            <span className="mobile-menu-title">About Me</span>
            <span className="mobile-menu-desc">Who I am &amp; what drives me</span>
          </a>
          <a href="/experience" data-page="experience" className={cls('experience')}>
            <span className="mobile-menu-title">Experience</span>
            <span className="mobile-menu-desc">My journey &amp; career highlights</span>
          </a>
          <a href="/projects" data-page="projects" className={cls('projects')}>
            <span className="mobile-menu-title">Projects</span>
            <span className="mobile-menu-desc">Work I&apos;ve crafted &amp; shipped</span>
          </a>
          <a href="/links" data-page="links" className={cls('links')}>
            <span className="mobile-menu-title">Quick Links</span>
            <span className="mobile-menu-desc">Digital Constellation</span>
          </a>
          <a href="/contact" data-page="contact" className={cls('contact')}>
            <span className="mobile-menu-title">Contact Me</span>
            <span className="mobile-menu-desc">Let&apos;s build something cosmic</span>
          </a>
        </nav>

        <button id="menu-close-mobile" className="menu-close-btn" aria-label="Close menu">
          <svg viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}
