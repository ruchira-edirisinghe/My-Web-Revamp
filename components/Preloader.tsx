'use client';
import { useEffect, type ReactNode } from 'react';
import { setTagline, whenRevealed } from '@/lib/cosmic/controller';

/**
 * Every page's hook into the cosmic preloader system (lib/cosmic/*). It draws
 * nothing itself: the Cosmic Clash intro or the page transition covers the
 * page (both mounted in app/layout.tsx), and this tells the page when it's
 * on show, through `preloader:reveal` on window and body.preloader-done, so
 * entrances play as the overlay opens rather than behind it. The tagline is
 * shown under the monogram while a transition into this page holds.
 */
export default function Preloader({ tagline }: { tagline?: ReactNode }) {
  useEffect(() => { setTagline(tagline ?? null); }, [tagline]);
  useEffect(() => whenRevealed(() => {
    document.body.classList.add('preloader-done');
    window.dispatchEvent(new Event('preloader:reveal'));
  }), []);

  return null;
}
