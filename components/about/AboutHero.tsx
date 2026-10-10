'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cssVars } from '@/lib/css';
import EasterEgg from '@/components/about/EasterEgg';

/* About hero: the photo in the middle, standing on a glowing disc ringed by
   slowly turning orbits, two phrases either side and the CV and work buttons
   underneath. Each phrase is joined to the disc by a thin wire; a spotlight
   passes from one phrase to the next, clockwise, lighting its wire and
   dimming the rest. It only moves while on screen, and stands still with
   reduced motion. A tap on the photo leaves the photo alone but wakes the
   space behind it: the glow flares and shifts colour, the rim and orbits
   whirl round, rings ripple out and stardust bursts from behind him. Five
   quick taps in a row open the easter egg
   (EasterEgg.tsx). Styles: styles/about/about-v2.css (.ab-halo). */

const PHRASES = [
  { a: 'Turning ideas', b: 'into reality', c: '#5ce0ff' },
  { a: 'Designing for', b: 'better UX', c: '#bc6fff' },
  { a: 'Crafting digital', b: 'experiences', c: '#6dff8a' },
  { a: 'Building creative', b: 'interfaces', c: '#ffc94d' },
];
// Clockwise: left top, right top, right bottom, left bottom.
const ORDER = [0, 2, 3, 1];
const STEP_MS = 1900;
// Taps further apart than this start the count again.
const TAP_GAP_MS = 1100;
const TAPS = 5;
// Stardust for a tap: each mote's direction, distance, size, colour and delay.
const DUST_C = ['#5ce0ff', '#bc6fff', '#ff6bd5', '#6dff8a', '#ffc94d', '#ffffff'];
const DUST = Array.from({ length: 26 }, (_, i) => ({
  '--a': `${(360 / 26) * i + (i % 4) * 9}deg`,
  '--r': 58 + ((i * 29) % 34),
  '--s': `${3 + (i % 4) * 1.6}px`,
  '--k': DUST_C[i % DUST_C.length],
  '--t': `${(i % 6) * 0.035}s`,
}));

export default function AboutHero({ onCv }: { onCv: () => void }) {
  const [step, setStep] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const taps = useRef({ n: 0, at: 0 });
  const [ripple, setRipple] = useState(0);
  const [egg, setEgg] = useState(false);

  const poke = () => {
    const now = performance.now();
    const t = taps.current;
    t.n = now - t.at < TAP_GAP_MS ? t.n + 1 : 1;
    t.at = now;
    setRipple((r) => r + 1);
    const el = disc.current;
    if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const q = (c: string) => el.querySelector<HTMLElement>(c);
      const ease = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
      // The glow flares and runs through the colours; each tap in a run goes a little further.
      q('.ab-halo-glow')?.animate([
        { scale: '1', filter: 'blur(50px) hue-rotate(0deg) saturate(1)', opacity: 0.24 },
        { scale: `${1.06 + t.n * 0.012}`, filter: `blur(48px) hue-rotate(${70 + t.n * 25}deg) saturate(1.3)`, opacity: 0.55, offset: 0.3 },
        { scale: '1', filter: 'blur(50px) hue-rotate(0deg) saturate(1)', opacity: 0.24 },
      ], { duration: 1600, easing: ease });
      // The disc lights up from inside.
      q('.ab-halo-core')?.animate([
        { filter: 'brightness(1)' }, { filter: 'brightness(1.35) saturate(1.15)', offset: 0.2 }, { filter: 'brightness(1)' },
      ], { duration: 1200, easing: ease });
      // The orbits whirl an extra turn each way (`rotate` adds to their own slow spin).
      q('.ab-halo-orbit.is-1')?.animate([{ rotate: '0deg' }, { rotate: '360deg' }], { duration: 1400, easing: ease });
      q('.ab-halo-orbit.is-2')?.animate([{ rotate: '0deg' }, { rotate: '-360deg' }], { duration: 1700, easing: ease });
    }
    if (t.n >= TAPS) { t.n = 0; setTimeout(() => setEgg(true), 380); }
  };

  useEffect(() => {
    const el = host.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    const id = setInterval(() => { if (visible && !document.hidden) setStep((s) => s + 1); }, STEP_MS);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  const on = ORDER[step % ORDER.length];
  const phrase = (i: number) => {
    const p = PHRASES[i];
    return (
      <li key={i} className={i === on ? 'is-on' : undefined} style={cssVars({ '--c': p.c, '--i': i })}>
        <span className="ab-halo-a">{p.a}</span>
        <span className="ab-halo-b">{p.b}</span>
        <i className="ab-halo-wire" aria-hidden="true" />
      </li>
    );
  };

  return (
    <div className="ab-halo" ref={host}>
      <ul className="ab-halo-side is-l" aria-label="What I do">{[0, 1].map(phrase)}</ul>

      <div className="ab-halo-pic" onClick={poke}>
        <div className="ab-halo-disc" aria-hidden="true" ref={disc}>
          <i className="ab-halo-glow" />
          <i className="ab-halo-orbit is-1"><b /></i>
          <i className="ab-halo-orbit is-2"><b /></i>
          <i className="ab-halo-core" />
          {ripple > 0 && (
            <span key={ripple} className="ab-halo-tap">
              <i className="ab-halo-ripple" />
              <i className="ab-halo-ripple is-2" />
              {DUST.map((d, i) => <b key={i} style={cssVars(d)} />)}
            </span>
          )}
        </div>
        <img src="/Images/mefront.webp" alt="Ruchira Edirisinghe" decoding="async" />
      </div>

      <ul className="ab-halo-side is-r" aria-label="What I do">{[2, 3].map(phrase)}</ul>

      <div className="ab-halo-ctas">
        <button type="button" className="hero-cta-primary" onClick={onCv}>
          Download CV
          <svg viewBox="0 0 24 24">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
        <Link href="/projects" className="hero-cta-ghost">View My Work</Link>
      </div>

      <EasterEgg open={egg} onClose={() => setEgg(false)} />
    </div>
  );
}
