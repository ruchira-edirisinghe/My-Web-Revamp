'use client';
import { type ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Preloader from './Preloader';
import Navbar, { type NavKey } from './Navbar';
import MobileMenu from './MobileMenu';
import SiteFooter from './SiteFooter';
import ScrollTop from './ScrollTop';
import { useBodyDataPage } from '@/lib/useBodyDataPage';

interface StandardShellProps {
  /** Highlights the active item in the desktop/mobile nav. */
  active?: NavKey;
  /** Value applied to <body data-page="..."> (CSS + engine read this). */
  dataPage?: string;
  /** Optional preloader tagline. */
  tagline?: ReactNode;
  /** Page <main> content. */
  children: ReactNode;
}

/**
 * Shell B chrome shared by every non-home page: preloader, space canvas, desktop
 * navbar, mobile menu, footer, desktop music button, and the custom cursor. The
 * per-page engine (projects.ts / about.ts / contact.ts / quicklinks.ts /
 * experience.ts) animates and wires these elements; this component only renders
 * the matching markup.
 */
export default function StandardShell({ active = null, dataPage, tagline, children }: StandardShellProps) {
  useBodyDataPage(dataPage);
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  // Restore body state if the browser serves this page from bfcache
  useEffect(() => {
    function handlePageShow(e: PageTransitionEvent) {
      if (!e.persisted) return;
      document.body.classList.remove('modal-active', 'modal-open', 'menu-open', 'page-transitioning');
      document.body.style.overflow = '';
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
      document.getElementById('menu-btn')?.classList.remove('is-open');
      document.getElementById('menu-btn')?.setAttribute('aria-expanded', 'false');
      document.getElementById('menu-close-mobile')?.classList.remove('visible');
    }
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  // Play the preloader on every load and every in-site navigation (no session skip).
  useLayoutEffect(() => {
    document.body.classList.remove('skip-preloader');
  }, []);

  // Smooth page-enter transition on client-side navigations + close mobile menu
  useEffect(() => {
    const firstMount = isFirstMount.current;
    if (firstMount) isFirstMount.current = false;

    // Always clear stale modal/overlay state - even on first mount, so a previously
    // active modal from a gallery page can't bleed in with display:none on main.
    document.body.classList.remove('modal-active', 'modal-open');
    document.body.style.overflow = '';

    if (firstMount) return;

    // Close any open mobile menu (only on subsequent client-side navigations)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.getElementById('menu-btn')?.classList.remove('is-open');
      document.getElementById('menu-btn')?.setAttribute('aria-expanded', 'false');
      document.getElementById('menu-close-mobile')?.classList.remove('visible');
      document.body.classList.remove('menu-open');
    }
    // Trigger page entry animation
    document.body.classList.add('page-transitioning');
    const t = setTimeout(() => document.body.classList.remove('page-transitioning'), 550);
    return () => {
      clearTimeout(t);
      // Remove page-transitioning if this shell unmounts mid-transition (e.g. navigating to home)
      document.body.classList.remove('page-transitioning');
    };
  }, [pathname]);

  return (
    <>
      {/* Non-fixed scroll target so Next's route auto-scroll doesn't iterate the fixed chrome */}
      <div aria-hidden="true" style={{ position: 'absolute', height: 0, width: 0 }} />
      <Preloader tagline={tagline} />

      <div className="top-content-fade"></div>

      <canvas id="space-canvas"></canvas>

      <Navbar active={active} />
      <MobileMenu active={active} />

      {children}

      <SiteFooter />

      <button id="music-btn-desktop" aria-label="Toggle music">
        <canvas id="spectrum-canvas-desktop" width="26" height="18"></canvas>
      </button>

      <div id="cursor-dot"></div>
      <canvas id="cursor-canvas"></canvas>

      <ScrollTop />
    </>
  );
}
