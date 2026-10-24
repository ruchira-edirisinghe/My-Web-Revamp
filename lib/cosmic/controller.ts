/* ════════════════════════════════════════
   controller.ts - who reveals the page.

   Two systems cover the site: the Cosmic Clash intro (a visitor's first page
   of a session, components/cosmic/CosmicPreloader.tsx) and the short page
   transition (every other page, PageTransitionOverlay.tsx). Whichever is up
   calls reveal() when its destination is genuinely ready; pages wait for it
   with whenRevealed() (via <Preloader />), which is when they get
   `preloader:reveal` and body.preloader-done and play their entrances, so
   nothing half-rendered shows through.

   The head script in app/layout.tsx decides before first paint: .intro on
   <html> for the intro, .pt-cover for the transition's covered start, neither
   for crawlers (pages are revealed at once).
   ════════════════════════════════════════ */
import type { ReactNode } from 'react';

let covered =
  typeof document !== 'undefined' &&
  (document.documentElement.classList.contains('intro') || document.documentElement.classList.contains('pt-cover'));
const waiting = new Set<() => void>();

export const isCovered = () => covered;

/** An overlay is now hiding the page. */
export function cover() { covered = true; }

/** The overlay is opening: pages may show themselves. */
export function reveal() {
  covered = false;
  const fns = Array.from(waiting);
  waiting.clear();
  fns.forEach((fn) => fn());
}

/** Runs fn once the page is on show (at once if it already is). */
export function whenRevealed(fn: () => void): () => void {
  if (!covered) { fn(); return () => {}; }
  waiting.add(fn);
  return () => { waiting.delete(fn); };
}

/* The destination page's tagline, shown under the monogram while a transition holds. */
let tagline: ReactNode = null;
const tagListeners = new Set<(t: ReactNode) => void>();
export function setTagline(t: ReactNode) {
  tagline = t;
  tagListeners.forEach((fn) => fn(t));
}
export function onTagline(fn: (t: ReactNode) => void): () => void {
  tagListeners.add(fn);
  fn(tagline);
  return () => { tagListeners.delete(fn); };
}
