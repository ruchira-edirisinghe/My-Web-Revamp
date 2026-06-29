'use client';
import type { ReactNode } from 'react';
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
