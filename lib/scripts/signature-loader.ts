/* ════════════════════════════════════════
   signature-loader.ts - the preloader: the signature writes itself
   (markup: components/Preloader.tsx, styles: styles/sig-loader.css).

   The logo is a handwritten signature, so the loader signs it: a glowing nib
   traces each letter's outline in the site's neon gradient, the white ink
   fills in behind it, and a flourish underneath doubles as the progress bar.
   When it's done a shine runs across the name and sparks pop; then the
   screen opens like a portal from the middle (a hole in the overlay grows
   out to the corners with a glowing rim) onto the page behind.

   The outlines are the logo's own paths, fetched from /Images/longlogo.svg
   (the browser already caches it for the nav). If that fails, a plain
   left-to-right wipe of the same logo stands in, and the timing is the same.

   How long it holds the page: the signing always takes MIN_MS, on every page.
   If the page is still loading after that (a slow network), the signed name
   holds, breathing, until the window's load event, up to MAX_WAIT_MS so it
   can never get stuck. With reduced motion the name is shown already signed,
   for the same minimum time.
   ════════════════════════════════════════ */

const LOGO = '/Images/longlogo.svg';
const VW = 2574; // the logo's viewBox width
const VH = 973;
const MIN_MS = 1800;
const MAX_WAIT_MS = 8000; // the longest it waits on a slow load after the signing
const OUT_MS = 1100; // the portal opening (matches the CSS transition)

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.min(1, Math.max(0, v));

interface Stroke { el: SVGPathElement; len: number; x0: number; w: number }

export function runSignatureLoader(root: HTMLElement): () => void {
  if (root.style.display === 'none') return () => {};
  const q = <T extends Element>(s: string) => root.querySelector<T>(s);
  const trace = q<SVGGElement>('.sl-trace');
  const fill = q<SVGGElement>('.sl-fill');
  const clip = q<SVGRectElement>('.sl-clip-rect');
  const nib = q<HTMLElement>('.sl-nib');
  const bar = q<SVGPathElement>('.sl-flourish-ink');
  if (!trace || !fill || !clip) return () => {};

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const DUR = MIN_MS;
  const HOLD = reduce ? 0 : 380;

  let strokes: Stroke[] = [];
  let raf = 0;
  let alive = true;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
  const ctl = new AbortController();

  // Bring in the logo's paths: one copy to trace, one to fill.
  trace.replaceChildren();
  fill.replaceChildren();
  fetch(LOGO, { signal: ctl.signal })
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((txt) => {
      if (!alive) return;
      const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
      const paths = Array.from(doc.querySelectorAll('path'));
      if (!paths.length) throw new Error('no paths');
      for (const src of paths) {
        const d = src.getAttribute('d');
        if (!d) continue;
        const ns = 'http://www.w3.org/2000/svg';
        const t = document.createElementNS(ns, 'path');
        t.setAttribute('d', d);
        trace.appendChild(t);
        const f = document.createElementNS(ns, 'path');
        f.setAttribute('d', d);
        fill.appendChild(f);
        const len = t.getTotalLength();
        const box = t.getBBox();
        t.style.strokeDasharray = `${len}`;
        t.style.strokeDashoffset = `${len}`;
        strokes.push({ el: t, len, x0: box.x, w: Math.max(box.width, 1) });
      }
      root.classList.add('has-ink');
    })
    .catch(() => { if (alive) root.classList.add('no-ink'); });

  let start = 0;
  const frame = (now: number) => {
    if (!alive) return;
    if (!start) start = now;
    const raw = clamp((now - start) / DUR);
    const p = reduce ? 1 : ease(raw);
    root.style.setProperty('--p', p.toFixed(4));
    if (bar) bar.style.strokeDashoffset = `${1 - p}`;

    // The nib runs a little ahead of the ink: outlines first, then the fill.
    const lead = clamp(p * 1.16) * (VW + 160) - 80;
    let tip: DOMPoint | null = null;
    let tipX = -1;
    for (const s of strokes) {
      const k = clamp((lead - s.x0) / s.w);
      s.el.style.strokeDashoffset = `${s.len * (1 - k)}`;
      if (k > 0 && k < 1 && s.x0 > tipX) { tipX = s.x0; tip = s.el.getPointAtLength(s.len * k); }
    }
    const fx = clamp((p - 0.1) / 0.9) * VW;
    clip.setAttribute('width', fx.toFixed(1));
    if (nib) {
      const x = tip ? tip.x : Math.min(lead, VW);
      const y = tip ? tip.y : VH * 0.62;
      nib.style.left = `${(x / VW) * 100}%`;
      nib.style.top = `${(y / VH) * 100}%`;
    }

    if (raw < 1) { raf = requestAnimationFrame(frame); return; }
    clip.setAttribute('width', String(VW));
    strokes.forEach((s) => { s.el.style.strokeDashoffset = '0'; });
    whenLoaded(() => {
      root.classList.add('is-done');
      later(open, HOLD);
    });
  };

  // Hold the signed name until the page has finished loading (it nearly
  // always has by now; on an in-site navigation it always has).
  const whenLoaded = (go: () => void) => {
    if (document.readyState === 'complete') { go(); return; }
    root.classList.add('is-waiting');
    let done = false;
    const finish = () => {
      if (done || !alive) return;
      done = true;
      window.removeEventListener('load', finish);
      root.classList.remove('is-waiting');
      go();
    };
    window.addEventListener('load', finish);
    later(finish, MAX_WAIT_MS);
  };

  // The portal opens; the page behind gets told it's on show.
  const open = () => {
    root.classList.add('is-out');
    document.body.classList.add('preloader-done');
    window.dispatchEvent(new Event('preloader:reveal'));
    later(() => { root.style.display = 'none'; }, reduce ? 300 : OUT_MS);
  };

  raf = requestAnimationFrame(frame);

  return () => {
    alive = false;
    ctl.abort();
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    strokes = [];
  };
}
