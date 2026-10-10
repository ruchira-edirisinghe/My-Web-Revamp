'use client';
import { useRef, useState, type ReactNode } from 'react';
import { cssVars } from '@/lib/css';
import { TESTIMONIALS } from '@/components/about/data';

/* About: testimonials as a crew constellation. The people are stars on a
   star chart, joined by faint lines; the current one glows, a ring filling
   round it as its time runs. When it's full a comet streaks along to the next
   person and their words fade in word by word beside the map, in a box kept
   to one height. The ring waits while the section is hovered or
   focused, and with reduced motion it doesn't move on by itself. Any star can
   be picked, and on touch screens a swipe across the message moves along.
   Also on the Experience page, under that page's own heading and reveal
   (`head`, `className`, `rv`). Styles: styles/voices.css. */

const N = TESTIMONIALS.length;

// Where each person sits on the chart (a 600 × 500 box), and the lines between them.
const STARS = [
  [80, 115], [205, 55], [322, 140], [458, 72], [548, 196], [468, 332], [326, 292], [188, 372], [92, 272],
];
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [2, 6]];

export default function AboutVoices({ head, className = 'ab-sec', rv = 'ab-rv' }: { head?: ReactNode; className?: string; rv?: string } = {}) {
  const [cur, setCur] = useState(0);
  const [from, setFrom] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const go = (i: number) => {
    const next = ((i % N) + N) % N;
    if (next === cur) return;
    setFrom(cur);
    setCur(next);
  };
  const t = TESTIMONIALS[cur];
  const at = (i: number) => ({ x: STARS[i][0], y: STARS[i][1] });

  return (
    <section id="words" className={`${className} ab-voices`} aria-labelledby={head ? undefined : 'ab-voices-t'} aria-label={head ? 'Testimonials' : undefined}>
      {head ?? (
        <header className="ab-head ab-rv">
          <p className="ab-kicker">Transmissions from the crew</p>
          <h2 className="ab-title" id="ab-voices-t">What people <span className="ab-glow">say</span></h2>
        </header>
      )}

      <div className={`ab-cn ${rv}`}>
        <div className="ab-cn-map">
          <svg className="ab-cn-chart" viewBox="0 0 600 500" aria-hidden="true">
            <defs>
              <linearGradient id="ab-cn-hot" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#5ce0ff" />
                <stop offset="0.5" stopColor="#bc6fff" />
                <stop offset="1" stopColor="#6dff8a" />
              </linearGradient>
            </defs>
            <g className="ab-cn-grid">
              {[90, 170, 250].map((r) => <circle key={r} cx="300" cy="230" r={r} />)}
              <line x1="300" y1="-20" x2="300" y2="520" />
              <line x1="0" y1="230" x2="600" y2="230" />
            </g>
            {LINKS.map(([a, b], k) => (
              <line
                key={k}
                className={`ab-cn-link${a === cur || b === cur ? ' is-hot' : ''}`}
                x1={STARS[a][0]} y1={STARS[a][1]} x2={STARS[b][0]} y2={STARS[b][1]}
                pathLength={1}
                style={cssVars({ '--k': k })}
              />
            ))}
            {from !== null && (
              <g key={`${from}-${cur}`} className="ab-cn-trip">
                <line className="ab-cn-trail" x1={at(from).x} y1={at(from).y} x2={at(cur).x} y2={at(cur).y} pathLength={1} />
                <circle className="ab-cn-comet" r="5">
                  <animateMotion
                    dur="0.8s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.2 1"
                    path={`M${at(from).x},${at(from).y} L${at(cur).x},${at(cur).y}`}
                  />
                </circle>
              </g>
            )}
          </svg>

          <ol className="ab-cn-stars">
            {TESTIMONIALS.map((p, i) => (
              <li
                key={p.name}
                className={`ab-cn-star${i === cur ? ' is-on' : ''}`}
                style={cssVars({ '--x': `${(STARS[i][0] / 600) * 100}%`, '--y': `${(STARS[i][1] / 500) * 100}%`, '--k': i })}
              >
                <button type="button" className="ab-cn-node" onClick={() => go(i)} aria-current={i === cur || undefined} aria-label={`${p.name}, ${p.role}`}>
                  <img src={p.img} alt="" decoding="async" loading="lazy" />
                  {i === cur && (
                    <svg className="ab-cn-ring" viewBox="0 0 64 64" aria-hidden="true">
                      <circle cx="32" cy="32" r="30" pathLength={1} onAnimationEnd={() => go(cur + 1)} />
                    </svg>
                  )}
                </button>
                {i === cur && <span className="ab-cn-tag" aria-hidden="true">{p.name.split(' ')[0]}</span>}
              </li>
            ))}
          </ol>
        </div>

        <div
          className="ab-tx"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="ab-tx-deck">
            {/* Every message, unseen, in the same cell: the box is always as tall
                as the longest, so it doesn't jump between people. */}
            {TESTIMONIALS.map((p) => (
              <div key={p.name} className="ab-tx-msg is-sizer" aria-hidden="true">
                <blockquote className="ab-tx-quote">{p.quote}</blockquote>
                <div className="ab-tx-from">
                  <img alt="" />
                  <span className="ab-tx-name"><b>{p.name}</b><small>{p.role}</small></span>
                  <span className="ab-tx-stars"><i>★★★★★</i></span>
                </div>
              </div>
            ))}
            <figure key={cur} className="ab-tx-msg" aria-live="polite">
              <svg className="ab-tx-q" viewBox="0 0 48 36" aria-hidden="true">
                <path d="M0 36V22C0 9.6 6.4 2.4 19.2 0l2 5C14 7 10.8 11 10.4 17H20v19H0Zm28 0V22C28 9.6 34.4 2.4 47.2 0l2 5C42 7 38.8 11 38.4 17H48v19H28Z" />
              </svg>
              <blockquote className="ab-tx-quote">
                {t.quote.split(' ').map((w, i) => <span key={i} style={cssVars({ '--i': i })}>{w} </span>)}
              </blockquote>
              <figcaption className="ab-tx-from">
                <img src={t.img} alt="" decoding="async" loading="lazy" />
                <span className="ab-tx-name">
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
                <span className="ab-tx-stars" aria-label="Five stars">
                  {[0, 1, 2, 3, 4].map((s) => <i key={s} style={cssVars({ '--s': s })}>★</i>)}
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="ab-tx-nav">
            <button type="button" className="ab-tx-btn" aria-label="Previous testimonial" onClick={() => go(cur - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" className="ab-tx-btn" aria-label="Next testimonial" onClick={() => go(cur + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
