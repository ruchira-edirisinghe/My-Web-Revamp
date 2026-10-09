/* ══════════════════════════════════════════════════════════════════
   cursor.ts - the site's custom pointer (dot + glass ring), shared by
   every page engine.

   The pages used to draw the ring on a full-viewport 2D canvas: a fresh
   set of gradients every frame, and even the dot was painted inside that
   rAF loop, so any frame the browser dropped (the WebGL backdrop, a page's
   own animation) showed up directly as pointer lag. With the system cursor
   hidden, that lag is the first thing anyone notices.

   Now both are small DOM elements moved with `transform` only, which the
   compositor handles without repainting anything:
     • the dot is placed straight from the pointer event, no frame wait;
     • the ring eases after it with a time-based follow (so a slow frame
       doesn't make it drag), grows over links and buttons, and its loop
       sleeps once it has caught up.
   The old #cursor-canvas stays in the markup (the pages' CSS hides it on
   touch screens) but is no longer drawn into.
   ══════════════════════════════════════════════════════════════════ */
import type { Bag } from './_util';

const HOVER = 'a, button, [role="button"], .nav-link, .nav-cta, label, summary';
const SIZE = 52;

/** A hover target that swaps the ring into a bigger state with its own label. */
export interface CursorState { sel: string; scale: number; html: string }

export function initCursor(bag: Bag, hoverSel: string = HOVER, states: CursorState[] = []): void {
  let dot = document.getElementById('cursor-dot');
  const canvas = document.getElementById('cursor-canvas') as HTMLCanvasElement | null;
  if (canvas) {
    canvas.style.display = 'none';
    bag.add(() => { canvas.style.display = ''; });
  }
  const fine = window.matchMedia('(pointer: fine)');
  if (!fine.matches) return;

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  const z = (canvas && getComputedStyle(canvas).zIndex) || '100001';
  Object.assign(ring.style, {
    position: 'fixed', left: '0', top: '0', width: SIZE + 'px', height: SIZE + 'px',
    borderRadius: '50%', pointerEvents: 'none', zIndex: z === 'auto' ? '100001' : z,
    border: '1.5px solid rgba(225, 240, 255, 0.55)',
    background: 'radial-gradient(circle, rgba(200, 230, 255, 0.03) 55%, rgba(150, 200, 255, 0.09) 100%)',
    boxShadow: '0 0 16px rgba(120, 180, 255, 0.12), inset 0 0 6px rgba(255, 255, 255, 0.07)',
    opacity: '0', transition: 'opacity 0.3s ease', willChange: 'transform',
    transform: 'translate3d(-200px, -200px, 0)',
  } as Partial<CSSStyleDeclaration>);
  // The bright specular arc across its top-left, as the canvas ring had.
  const shine = document.createElement('span');
  Object.assign(shine.style, {
    position: 'absolute', inset: '1px', borderRadius: '50%',
    border: '2px solid transparent', borderTopColor: 'rgba(255, 255, 255, 0.6)',
    transform: 'rotate(-48deg)',
  } as Partial<CSSStyleDeclaration>);
  ring.appendChild(shine);
  const label = document.createElement('span');
  Object.assign(label.style, {
    position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', font: '700 5.2px Montserrat, sans-serif', letterSpacing: '0.04em',
    textShadow: '0 1px 6px rgba(0, 0, 0, 0.9)', opacity: '0', transition: 'opacity 0.2s ease',
  } as Partial<CSSStyleDeclaration>);
  ring.appendChild(label);
  document.body.appendChild(ring);
  bag.add(() => ring.remove());
  // The home page's markup has no dot (its canvas used to paint one).
  if (!dot) {
    const d = document.createElement('div');
    d.setAttribute('aria-hidden', 'true');
    Object.assign(d.style, {
      position: 'fixed', left: '0', top: '0', width: '5px', height: '5px', borderRadius: '50%',
      background: '#fff', boxShadow: '0 0 5px rgba(200, 230, 255, 0.7)', pointerEvents: 'none',
      zIndex: ring.style.zIndex, opacity: '0', transition: 'opacity 0.4s ease',
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(d);
    bag.add(() => d.remove());
    dot = d;
  }

  let mx = -200, my = -200, rx = -200, ry = -200, scale = 1, targetScale = 1;
  let raf = 0, last = 0, shown = false;
  let active: CursorState | undefined;

  const place = () => {
    ring.style.transform = `translate3d(${rx - SIZE / 2}px, ${ry - SIZE / 2}px, 0) scale(${scale})`;
  };
  const tick = (now: number) => {
    raf = 0;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
    last = now;
    // Reaches ~95% of the way in about 0.14s, whatever the frame rate.
    const k = 1 - Math.exp(-dt * 22);
    rx += (mx - rx) * k;
    ry += (my - ry) * k;
    scale += (targetScale - scale) * (1 - Math.exp(-dt * 16));
    place();
    const settled = Math.abs(mx - rx) < 0.2 && Math.abs(my - ry) < 0.2 && Math.abs(targetScale - scale) < 0.004;
    if (settled) { rx = mx; ry = my; scale = targetScale; place(); last = 0; return; }
    raf = requestAnimationFrame(tick);
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

  bag.on(document, 'pointermove', (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY;
    if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    if (!shown) {
      shown = true;
      rx = mx; ry = my;
      ring.style.opacity = '1';
      if (dot) dot.style.opacity = '1';
    }
    wake();
  }, { passive: true });
  bag.on(document, 'mouseleave', () => {
    shown = false;
    ring.style.opacity = '0';
    if (dot) dot.style.opacity = '0';
  });
  // Delegated, so links React adds later still grow the ring.
  bag.on(document, 'pointerover', (e: PointerEvent) => {
    const t = e.target as Element | null;
    const st = states.find((s) => t?.closest?.(s.sel));
    if (st !== active) {
      active = st;
      label.innerHTML = st ? st.html : '';
      label.style.opacity = st ? '1' : '0';
      if (dot) dot.style.visibility = st ? 'hidden' : '';
    }
    const next = st ? st.scale : t?.closest?.(hoverSel) ? 1.4 : 1;
    if (next !== targetScale) { targetScale = next; wake(); }
  }, { passive: true });
  bag.on(document, 'visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; last = 0; } });
  bag.add(() => cancelAnimationFrame(raf));
}
