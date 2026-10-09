'use client';
import { type CSSProperties, useEffect, useRef, useState } from 'react';

/**
 * "On this page" navigator for the project pages. On wide screens it is a
 * ruler of ticks pinned to the right edge, middle of the viewport, that opens
 * into a labelled panel on hover or keyboard focus. On narrow screens it is a
 * pill at the bottom showing the current section, which opens a sheet with
 * the full list. It only shows once the hero has scrolled away.
 */
export default function SectionRail({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const els = items.map((s) => document.getElementById(`gs-${s.id}`));
      const first = els[0];
      const last = els[els.length - 1];
      if (!first || !last) return;
      const line = window.innerHeight * 0.35;
      let at = 0;
      els.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= line) at = i; });
      const start = first.getBoundingClientRect().top + window.scrollY - line;
      const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const y = window.scrollY;
      setActive(at);
      setProgress(Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start))));
      // Visible from the first section until the last one has scrolled past,
      // and never over the footer (where the mobile pill would cover its links).
      const foot = document.querySelector('footer');
      setShow(first.getBoundingClientRect().top < window.innerHeight * 0.8 &&
        last.getBoundingClientRect().bottom > window.innerHeight * 0.3 &&
        (window.innerWidth > 1100 || !foot || foot.getBoundingClientRect().top > window.innerHeight - 24));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  // The mobile sheet closes on Escape, on a tap outside, or when the rail hides.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);
  useEffect(() => { if (!show) setOpen(false); }, [show]);

  const go = (id: string) => {
    const el = document.getElementById(`gs-${id}`);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setOpen(false);
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const current = items[active];

  return (
    <nav ref={navRef} className={`gs-rail${show ? ' show' : ''}${open ? ' open' : ''}`} aria-label="On this page"
      style={{ '--p': progress } as CSSProperties}>
      <button type="button" className="gs-rail-toggle" aria-expanded={open} aria-controls="gs-rail-list"
        onClick={() => setOpen((o) => !o)} tabIndex={show ? 0 : -1}>
        <span className="gs-rail-ring" aria-hidden="true">
          <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" /><circle className="gs-rail-ring-fill" cx="18" cy="18" r="15" pathLength="1" /></svg>
          <b>{pad(active + 1)}</b>
        </span>
        <span className="gs-rail-now">
          <small>On this page · {pad(active + 1)} / {pad(items.length)}</small>
          <span>{current?.title}</span>
        </span>
        <svg className="gs-rail-chev" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 12 5-5 5 5" /></svg>
      </button>

      <div className="gs-rail-panel">
        <div className="gs-rail-head" aria-hidden="true"><b>{pad(active + 1)}</b><span>/ {pad(items.length)}</span></div>
        <ol id="gs-rail-list" className="gs-rail-list">
          {items.map((s, i) => (
            <li key={s.id}>
              <a href={`#gs-${s.id}`} className={`${i === active ? 'on' : ''}${i < active ? ' past' : ''}`}
                aria-current={i === active ? 'location' : undefined} tabIndex={show ? 0 : -1}
                onClick={(e) => { e.preventDefault(); go(s.id); }}>
                <span className="gs-rail-no">{pad(i + 1)}</span>
                <span className="gs-rail-label">{s.title}</span>
                <i className="gs-rail-tick" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
