'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { runPreloader } from '@/lib/scripts/preloader';
import '@/styles/preloader.css';

/**
 * The preloader on every page: a hyperspace arrival. The stars streak in and
 * slow to a drift, the signature tunes in like a hologram and fills with the
 * site's neon from left to right (the progress), then the stars stretch back
 * into warp and the name rushes past as the page appears. Runs itself (lib/scripts/preloader.ts);
 * the page hears `preloader:reveal` on window (and body gets .preloader-done)
 * as it goes. Styles: styles/preloader.css.
 */
export default function Preloader({ tagline }: { tagline?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? runPreloader(root.current) : undefined), []);

  return (
    <div id="preloader" className="pl" ref={root} aria-hidden="true">
      <canvas className="pl-warp" />
      <i className="pl-neb" />

      <div className="pl-core">
        <div className="pl-mark">
          {/* The name: a cyan and a pink ghost converge into a faint outline of it,
              which fills with the site's flowing neon from left to right (the
              progress), a bright edge riding the fill. */}
          <i className="pl-logo is-c" />
          <i className="pl-logo is-m" />
          <i className="pl-logo is-base" />
          <i className="pl-logo is-fill" />
          <i className="pl-edge" />
          <i className="pl-sheen" />
          <i className="pl-pulse" />
        </div>

        {tagline ? <p className="pl-tagline">{tagline}</p> : null}
      </div>
    </div>
  );
}
