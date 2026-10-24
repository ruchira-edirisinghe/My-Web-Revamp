'use client';
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LogoFillAnimation from './LogoFillAnimation';
import { onTagline } from '@/lib/cosmic/controller';
import type { PageTransitions } from '@/lib/cosmic/transition';
import '@/styles/cosmic.css';

/**
 * The short page transition between internal pages (lib/cosmic/transition.ts):
 * Nova's 3D spaceship streaks across on an energy edge that covers the page,
 * the RE monogram charges with the destination's real readiness (with its
 * tagline under it), and Astra's ship wipes the cover away onto the new page.
 * The ships are drawn in the .pt-ships canvas (lib/cosmic/ships.ts); the
 * .pt-rider elements carry only their exhaust trails.
 * Mounted once in app/layout.tsx. It takes over same-site link clicks in the
 * capture phase (so Next's <Link> stands down), then navigates with the
 * router; back/forward and deep links are handled from the route change.
 * Links opt out with data-no-transition.
 */
export default function PageTransitionOverlay() {
  const root = useRef<HTMLDivElement>(null);
  const pt = useRef<PageTransitions | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const first = useRef(true);
  const [tagline, setTagline] = useState<ReactNode>(null);

  useEffect(() => onTagline(setTagline), []);

  // The engine is small but only needed once the page is up: load it at once.
  useEffect(() => {
    let gone = false;
    import('@/lib/cosmic/transition').then(({ PageTransitions }) => {
      if (gone || !root.current) return;
      pt.current = new PageTransitions(root.current, (href) => router.push(href));
      if (document.documentElement.classList.contains('pt-cover')) pt.current.initial();
    }).catch(async () => {
      // No transitions this visit; never leave the page covered.
      const { reveal } = await import('@/lib/cosmic/controller');
      document.documentElement.classList.remove('pt-cover', 'pt-busy');
      reveal();
    });
    return () => { gone = true; pt.current?.destroy(); pt.current = null; };
  }, [router]);

  // Same-site links: cover first, then navigate.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.closest('[data-no-transition]')) return;
      let url: URL;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const html = document.documentElement;
      if (!pt.current || html.classList.contains('intro')) return; // let the link work normally
      e.preventDefault();
      pt.current.go(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Every route change after the first is a transition (covered before paint).
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    pt.current?.routeChanged();
  }, [pathname]);

  return (
    <div className="pt" ref={root} data-state="idle" aria-hidden="true">
      <div className="pt-panel">
        <div className="pt-centre">
          <LogoFillAnimation mark="monogram" className="pt-mono" />
          <p className="pt-tag">{tagline}</p>
        </div>
      </div>
      <i className="pt-edge is-a" />
      <i className="pt-edge is-b" />
      <i className="pt-rider is-a" />
      <i className="pt-rider is-b" />
      <canvas className="pt-ships" />
    </div>
  );
}
