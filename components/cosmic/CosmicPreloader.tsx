'use client';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { onTagline } from '@/lib/cosmic/controller';
import '@/styles/cosmic.css';
import { Icon } from '@/components/ui/Icon';

/**
 * The intro on a visitor's first page of a session, after the WebGL liquid
 * texture loader: the screen is liquid space, pouring from one nebula into
 * the next at the pace of the page's real loading, while drops of liquid
 * glass gather into the RUCHIRA EDIRISINGHE logotype. Once everything is in
 * the letters set (with the page's tagline under them), a sheen sweeps them,
 * and the liquid drains off the screen onto the page as its own entrance
 * plays. Mounted once in app/layout.tsx; it only shows when the head script has put .intro on <html> (once per
 * session, never for crawlers). Timeline: lib/cosmic/intro.ts (GSAP); the
 * stage: lib/cosmic/liquid.ts (WebGL). Styles: styles/cosmic.css.
 */
export default function CosmicPreloader() {
  const root = useRef<HTMLDivElement>(null);
  const [tagline, setTagline] = useState<ReactNode>(null);

  useEffect(() => onTagline(setTagline), []);

  useEffect(() => {
    const el = root.current;
    if (!el || !document.documentElement.classList.contains('intro')) return;
    let stop: (() => void) | undefined;
    let gone = false;
    import('@/lib/cosmic/intro')
      .then(({ runIntro }) => { if (!gone) stop = runIntro(el); })
      .catch(async () => {
        // The animation couldn't load: open the page rather than strand it.
        const { reveal } = await import('@/lib/cosmic/controller');
        reveal();
        document.documentElement.classList.remove('intro');
      });
    return () => { gone = true; stop?.(); };
  }, []);

  return (
    <div id="cosmic" className="czr" ref={root}>
      <canvas className="cz-gl" aria-hidden="true" />
      {/* Without WebGL: the plain logo. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cz-fallback" src="/Images/longlogo.svg" alt="" aria-hidden="true" draggable={false} data-loader-ignore />
      <p className="cz-tag" aria-hidden="true">{tagline}</p>
      <div className="cz-meta" role="progressbar" aria-label="Loading the site" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
        <div className="cz-count" aria-hidden="true"><span className="cz-num">0</span><small>%</small></div>
        {/* The liquid thread is drawn into this box by the stage. */}
        <span className="cz-track" aria-hidden="true"><i /></span>
        <span className="cz-status"><i>Charting the void</i></span>
      </div>
      <p className="cz-credit">Cosmic Cliffs, Carina Nebula · NASA, ESA, CSA, STScI</p>
      <button type="button" className="cz-skip">Skip <Icon name="ArrowRight" /></button>
    </div>
  );
}
