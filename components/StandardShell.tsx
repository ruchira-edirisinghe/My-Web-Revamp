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

  // Skip the full preloader on revisits within the same session
  useLayoutEffect(() => {
    if (sessionStorage.getItem('site_visited')) {
      const hide = (id: string) => {
        const el = document.getElementById(id);
        if (el) { el.style.cssText = 'display:none!important;opacity:0;'; }
      };
      hide('preloader'); hide('split-top'); hide('split-bottom');
      document.body.classList.add('skip-preloader');
    } else {
      sessionStorage.setItem('site_visited', '1');
    }
  }, []);

  // Smooth page-enter transition on client-side navigations + close mobile menu
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    // Close any open mobile menu
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
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
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
