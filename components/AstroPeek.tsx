'use client';
import { useEffect, useRef } from 'react';

/* The Contact page's 3D astronaut, peeking up from the bottom of the page
   between the footer's links: chest up, waving with his right glove and
   holding the golden pencil in his left ('peek' in lib/scripts/contact-3d.ts).
   three.js and the model load only once the visitor scrolls near the bottom. He rises from the bottom
   of the page the first time he's on screen, and a tap (or Enter) gets a big
   excited wave. If WebGL or the download fails, the strip stays empty. */
export default function AstroPeek() {
  const wrap = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = wrap.current, el = host.current;
    if (!box || !el) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    const load = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      load.disconnect();
      import('@/lib/scripts/contact-3d')
        .then(({ mountFigure }) => { if (!cancelled) dispose = mountFigure(el, 'peek'); })
        .catch(() => el.classList.add('is-failed'));
    }, { rootMargin: '700px 0px' });
    load.observe(box);

    const rise = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      rise.disconnect();
      box.classList.add('is-up');
    }, { threshold: 0.4 });
    rise.observe(box);

    // Run down behind the footer: its height, kept current as it reflows.
    // (The site footer is the page's last <footer>; the work cards have their own.)
    const foot = Array.from(document.querySelectorAll('footer')).pop();
    const sync = () => { if (foot) box.style.setProperty('--foot', `${foot.offsetHeight}px`); };
    sync();
    const ro = new ResizeObserver(sync);
    if (foot) ro.observe(foot);

    return () => { cancelled = true; load.disconnect(); rise.disconnect(); ro.disconnect(); dispose?.(); };
  }, []);

  return (
    <div ref={wrap} className="astro-peek">
      <div
        ref={host}
        className="astro-peek-3d"
        role="button"
        tabIndex={0}
        aria-label="A 3D astronaut peeking up over the footer, waving hello with a giant golden pencil in his other hand. Tap or press Enter to wave back."
      />
    </div>
  );
}
