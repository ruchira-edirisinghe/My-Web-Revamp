import type { ReactNode } from 'react';

/**
 * Shared preloader markup for Shell B pages (split panels + aurora + water-fill
 * canvas + progress bar + optional tagline). Animated by the page engine
 * (projects.ts / about.ts / etc.) which targets these ids/classes.
 */
export default function Preloader({ tagline }: { tagline?: ReactNode }) {
  return (
    <>
      <div id="split-top"></div>
      <div id="split-bottom"></div>

      <div id="preloader">
        <div className="aurora-container">
          <div className="aurora-bg-pulse"></div>
          <div className="aurora-blob blob-1"></div>
          <div className="aurora-blob blob-2"></div>
          <div className="aurora-blob blob-3"></div>
          <div id="preloader-stars"></div>
        </div>
        <div className="preloader-content">
          <canvas id="preloader-canvas"></canvas>
          <div id="progress-track">
            <div id="progress-fill"></div>
          </div>
          {tagline ? <p id="preloader-tagline">{tagline}</p> : null}
        </div>
      </div>
    </>
  );
}
