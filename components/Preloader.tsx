'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { runSignatureLoader } from '@/lib/scripts/signature-loader';
import { cssVars } from '@/lib/css';
import '@/styles/sig-loader.css';

/**
 * The preloader on every page: the signature writes itself, then the screen
 * opens like a portal onto the page. Runs itself (lib/scripts/signature-loader.ts);
 * the page hears `preloader:reveal` on window (and body gets .preloader-done)
 * as it opens. Styles: styles/sig-loader.css.
 */

// Sparks that pop round the name once it's signed.
const SPARKS = [
  [6, 30], [18, 8], [34, 92], [47, 4], [61, 96], [74, 10], [88, 84], [97, 38], [27, 50], [82, 52],
].map(([x, y], i) => ({ '--x': `${x}%`, '--y': `${y}%`, '--i': i }));

export default function Preloader({ tagline }: { tagline?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? runSignatureLoader(root.current) : undefined), []);

  return (
    <div id="sig-loader" className="sl" ref={root} aria-hidden="true">
      <div className="sl-sky">
        <i className="sl-neb is-1" />
        <i className="sl-neb is-2" />
        <i className="sl-stars" />
        <i className="sl-stars is-2" />
      </div>

      <div className="sl-stage">
        <div className="sl-halo">
          <i className="sl-ring is-1"><b /></i>
          <i className="sl-ring is-2"><b /></i>
        </div>

        <div className="sl-sign">
          {/* A ghost of the name to write over (and the stand-in if the paths don't load). */}
          <i className="sl-ghost" />
          <i className="sl-ghost is-wipe" />
          <svg className="sl-svg" viewBox="0 0 2574 973">
            <defs>
              <linearGradient id="sl-ink" gradientUnits="userSpaceOnUse" x1="200" y1="0" x2="2400" y2="0">
                <stop offset="0" stopColor="#5ce0ff" />
                <stop offset="0.5" stopColor="#bc6fff" />
                <stop offset="1" stopColor="#ff6bd5" />
              </linearGradient>
              <clipPath id="sl-clip"><rect className="sl-clip-rect" x="0" y="0" width="0" height="973" /></clipPath>
            </defs>
            <g className="sl-fill" clipPath="url(#sl-clip)" />
            <g className="sl-trace" />
          </svg>
          <i className="sl-shine" />
          <i className="sl-nib" />
          <span className="sl-sparks">
            {SPARKS.map((s, i) => <b key={i} style={cssVars(s)} />)}
          </span>
        </div>

        {/* The flourish under the name: the progress bar. */}
        <svg className="sl-flourish" viewBox="0 0 600 40" fill="none">
          <defs>
            <linearGradient id="sl-ink-bar" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
              <stop offset="0" stopColor="#5ce0ff" />
              <stop offset="0.5" stopColor="#bc6fff" />
              <stop offset="1" stopColor="#ff6bd5" />
            </linearGradient>
          </defs>
          <path className="sl-flourish-bg" d="M8 24C110 8 220 34 330 20S520 10 592 22" />
          <path className="sl-flourish-ink" d="M8 24C110 8 220 34 330 20S520 10 592 22" pathLength={1} />
        </svg>

        {tagline ? <p className="sl-tagline">{tagline}</p> : null}
      </div>

      <i className="sl-portal" />
    </div>
  );
}
