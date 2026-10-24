'use client';
import { useEffect, useRef } from 'react';
import AstronautCharacter from './AstronautCharacter';
import LogoFillAnimation from './LogoFillAnimation';
import '@/styles/cosmic.css';

/**
 * "Cosmic Clash", the intro on a visitor's first page of a session: two
 * little astronauts scuffle in zero gravity above the RUCHIRA EDIRISINGHE
 * logotype, and everything they throw ends up as energy filling it, at the
 * pace of the page's real loading. Mounted once in app/layout.tsx; it only
 * shows when the head script has put .intro on <html> (once per session,
 * never for crawlers). The choreography (lib/cosmic/clash.ts, with GSAP) is
 * loaded only when it plays. Styles: styles/cosmic.css.
 */
export default function CosmicPreloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !document.documentElement.classList.contains('intro')) return;
    let stop: (() => void) | undefined;
    let gone = false;
    import('@/lib/cosmic/clash')
      .then(({ runCosmicClash }) => { if (!gone) stop = runCosmicClash(el); })
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
      <div className="cz">
        <i className="cz-neb" aria-hidden="true" />
        <canvas className="cz-bg" aria-hidden="true" />

        <div className="cz-stage" aria-hidden="true">
          <LogoFillAnimation mark="logotype" className="cz-logo" />
          {(['nova', 'astra'] as const).map((v) => (
            <div key={v} className={`cz-actor is-${v}`}>
              <b className="cz-mark">!</b>
              <div className="cz-float"><div className="cz-pose"><AstronautCharacter variant={v} /></div></div>
            </div>
          ))}
          <i className="cz-orb" />
          <svg className="cz-star" viewBox="-12 -12 24 24">
            <path d="M0 -11 L3.2 -3.6 L11 -3.4 L4.9 1.6 L6.9 9.4 L0 5 L-6.9 9.4 L-4.9 1.6 L-11 -3.4 L-3.2 -3.6 Z" fill="#ffd166" stroke="#fff6d6" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="cz-meta" role="progressbar" aria-label="Loading the site" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
          <span className="cz-status">Fuelling thrusters</span>
          <span className="cz-bar" aria-hidden="true"><i /></span>
          <b className="cz-pct" aria-hidden="true">0%</b>
        </div>

        <button type="button" className="cz-skip">Skip intro <span aria-hidden="true">→</span></button>
      </div>
      <i className="cz-ring" aria-hidden="true" />
    </div>
  );
}
