'use client';
import { useEffect, useRef } from 'react';
import { cssVars } from '@/lib/css';

/* About: the mission log. A 3D flying saucer ('ufo' in lib/scripts/contact-3d.ts,
   built in Blender) flies in over the section and switches on its tractor
   beam - a soft cone of light with rays and drifting dust, pooling where it
   lands. The three stats are beamed down into it one by one, each as a 3D
   illustration (a laptop, a ringed planet with a moon for each year, a happy
   star): a shimmer of sparks, the object resolving out of the light and
   coming to hover there, then its number counts up and its words appear
   (lib/scripts/about.ts starts it all once the scene is well on screen).
   Tapping the saucer flares the beam or sends it into a spin.
   three.js and the model load only as the section nears; if WebGL or the
   download fails, the beam and the stats still show without the saucer.
   Styles: styles/about/about-v2.css. */

// The art is rendered in Blender (scripts/render-stat-art.py).
const STATS = [
  { n: 50, label: 'Projects completed', note: 'Sites, apps, games and brand work, sketch to launch.', c: '#5ce0ff', art: 'laptop' },
  { n: 4, label: 'Years of experience', note: 'Working where design and code meet.', c: '#bc6fff', art: 'planet' },
  { n: 30, label: 'Happy customers', note: 'Clients and teams I’ve designed and built for.', c: '#ffc94d', art: 'star' },
];

// Dust drifting up through the light: across it, staggered, each with its own sway.
const DUST = [14, 27, 36, 43, 49, 54, 60, 66, 75, 86, 22, 40, 57, 71, 31, 63, 46, 80].map((x, k) => ({ x, k, dx: ((k * 7) % 11) - 5 }));

export default function AboutStats() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const load = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      load.disconnect();
      import('@/lib/scripts/contact-3d')
        .then(({ mountFigure }) => { if (!cancelled) dispose = mountFigure(el, 'ufo', '/models/about/'); })
        .catch(() => el.classList.add('is-failed'));
    }, { rootMargin: '700px 0px' });
    load.observe(el);
    return () => { cancelled = true; load.disconnect(); dispose?.(); };
  }, []);

  return (
    <section className="ab-sec ab-stats" aria-labelledby="ab-stats-t">
      <header className="ab-head ab-rv">
        <p className="ab-kicker">Mission log</p>
        <h2 className="ab-title" id="ab-stats-t">The story <span className="ab-glow">so far</span></h2>
      </header>

      <div className="ab-ufo">
        <div className="ab-ufo-craft">
          <div
            ref={host}
            className="ab-ufo-3d"
            role="button"
            tabIndex={0}
            aria-label="A 3D flying saucer with a little alien in its glass dome, beaming down the numbers below. Drag or use the arrow keys to turn it; tap or press Enter to make it flare its beam or spin."
          />
        </div>

        <div className="ab-ufo-field">
          <div className="ab-beam" aria-hidden="true">
            <div className="ab-beam-soft">
              <i className="ab-beam-cone" />
              <i className="ab-beam-core" />
            </div>
            <i className="ab-beam-rays" />
            <i className="ab-beam-hot" />
            <span className="ab-beam-dust">
              {DUST.map((m) => <i key={m.k} style={cssVars({ '--x': `${m.x}%`, '--k': m.k, '--dx': `${m.dx * 4}px` })} />)}
            </span>
          </div>
          <i className="ab-beam-pool" aria-hidden="true" />

          <ul className="ab-pods">
            {STATS.map((s, i) => (
              <li key={s.label} className={`ab-pod is-${s.art}`} style={cssVars({ '--c': s.c, '--d': `${2.1 + i * 0.45}s`, '--i': i })}>
                <div className="ab-pod-fig" aria-hidden="true">
                  <i className="ab-pod-pad" />
                  <i className="ab-pod-spark" />
                  <div className="ab-pod-float">
                    <img className="ab-pod-art" src={`/Images/about/stat-${s.art}.webp`} alt="" decoding="async" loading="lazy" />
                  </div>
                  {[0, 1, 2].map((k) => <i key={k} className="ab-pod-twinkle" style={cssVars({ '--k': k })} />)}
                </div>
                <div className="ab-pod-text">
                  <p className="ab-pod-num"><b data-count={s.n}>{s.n}</b>+</p>
                  <h3 className="ab-pod-label">{s.label}</h3>
                  <p className="ab-pod-note">{s.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
