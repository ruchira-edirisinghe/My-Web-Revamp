'use client';
import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { type Collection, piecesOf, thumbOf } from './data';

/* Bits shared by the Graphic Design page and the gallery pages.
   Styles: styles/projects/graphic.css. */

/** A line icon per collection, on a 20px grid, drawn in the collection's accent. */
export const ICONS: Record<string, ReactNode> = {
  logos: <><path d="M10 2.5 16 8l-6 9.5L4 8Z" /><circle cx="10" cy="9" r="1.7" /><path d="M10 2.5v4.8" /></>,
  artworks: <><path d="M13.5 3.5 16.5 6.5 9 14l-3.5.5.5-3.5Z" /><path d="M11.5 5.5l3 3" /><path d="M3.5 17c1.5 0 2.5-.6 2.5-2" /></>,
  'event-posters': <><rect x="4.5" y="2.5" width="11" height="15" rx="1.5" /><path d="M7.5 6.5h5M7.5 9.5h5M7.5 12.5h3" /></>,
  'mobile-wallpapers': <><rect x="5.5" y="2" width="9" height="16" rx="2" /><path d="M9 4.5h2" /><path d="m7.5 13 2-2.5 1.5 1.5 1.5-2 1 3" /></>,
  'other-stuff': <><path d="M10 2.5v3M10 14.5v3M2.5 10h3M14.5 10h3" /><path d="m5 5 1.8 1.8M13.2 13.2 15 15M15 5l-1.8 1.8M6.8 13.2 5 15" /><circle cx="10" cy="10" r="2" /></>,
};

/** Which pieces fan out on a collection's preview, middle one last. */
const PREVIEW: Record<string, string[]> = {
  logos: ['phurl.webp', 'zen.webp', 'takg.webp'],
  artworks: ['lucy-david.webp', 'Loki-sylvie.webp', 'Kakashi.webp'],
  'event-posters': ['HackToNight.webp', 'Live Now Final.webp', 'Coming-Soon-Final.webp'],
  'mobile-wallpapers': ['11.webp', '12.webp', '1.webp'],
  'other-stuff': ['Billboard.webp', 'banner.webp', 'New-Magazine.webp'],
};

/** Three real pieces from a collection, fanned like cards in a hand; they
 *  spread further when the card around them is hovered. */
export function Fan({ c, eager = false }: { c: Collection; eager?: boolean }) {
  const all = piecesOf(c);
  const picks = (PREVIEW[c.slug] ?? []).map((f) => all.find((p) => p.file === f)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <div className={`gx-fan is-${c.layout}`} aria-hidden="true">
      {picks.map((p, i) => (
        <span key={p.file} className={`gx-fan-card is-${i}`} style={{ '--r': p.w / p.h } as CSSProperties}>
          <img src={thumbOf(c, p)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" width={p.w} height={p.h} />
        </span>
      ))}
    </div>
  );
}

/** Adds .is-in to every .gx-rv inside the page the first time it scrolls
 *  into view (the CSS staggers them with --i). */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.gx-rv:not(.is-in)'));
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
