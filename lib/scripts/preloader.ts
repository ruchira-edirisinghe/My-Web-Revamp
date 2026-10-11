/* ════════════════════════════════════════
   preloader.ts - the hyperspace preloader
   (markup: components/Preloader.tsx, styles: styles/preloader.css).

   Coming in, the screen drops out of warp: the stars (a canvas) arrive as
   long streaks and slow to a drift, while the signature tunes in like a
   hologram and fills with the site's neon from left to right: the progress
   (--p, which the styles read). Going, the stars stretch back into warp, the name rushes past
   and the overlay dissolves onto the page.

   How long it holds the page: the arrival always takes MIN_MS, on every page.
   If the page is still loading after that (a slow network), the name holds,
   breathing, until the window's load event, up to MAX_WAIT_MS so it can never
   get stuck. With reduced motion there's no warp, only fades, for the same
   minimum time.
   ════════════════════════════════════════ */

const MIN_MS = 1800;
const MAX_WAIT_MS = 8000; // the longest it waits on a slow load after the arrival
const OUT_MS = 1000; // the jump away (matches the CSS transitions)
const HOLD = 320; // the filled name's flash before the jump

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.min(1, Math.max(0, v));

interface Star { x: number; y: number; z: number; c: string }
const TINTS = ['#ffffff', '#ffffff', '#ffffff', '#8cd2ff', '#c39bff', '#5ce0ff'];

export function runPreloader(root: HTMLElement): () => void {
  if (root.style.display === 'none') return () => {};
  const canvas = root.querySelector<HTMLCanvasElement>('.pl-warp');
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let alive = true;
  let raf = 0;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

  // ── The stars ──
  const ctx = !reduce ? canvas?.getContext('2d') ?? null : null;
  const small = window.innerWidth < 700;
  const stars: Star[] = [];
  const spawn = (s: Star, far: boolean) => {
    s.x = (Math.random() * 2 - 1);
    s.y = (Math.random() * 2 - 1);
    s.z = far ? 0.85 + Math.random() * 0.15 : 0.05 + Math.random() * 0.95;
    s.c = TINTS[(Math.random() * TINTS.length) | 0];
    return s;
  };
  for (let i = 0; i < (small ? 150 : 260); i++) stars.push(spawn({ x: 0, y: 0, z: 0, c: '' }, false));

  let w = 0, h = 0, dpr = 1;
  const size = () => {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  };
  size();
  window.addEventListener('resize', size);

  // Warp speed: arrives fast and slows to a drift; the jump away ramps it back up.
  let speed = 1.6;
  let outAt = 0;
  const speedAt = (now: number, t: number) => {
    if (outAt) return 0.05 + Math.pow(Math.min(1, (now - outAt) / 700), 2) * 2.6;
    return 0.05 + 1.55 * Math.pow(1 - clamp(t / 1100), 3);
  };

  const draw = (dt: number) => {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.5;
    const trail = Math.min(0.5, speed * 0.16); // how far back each streak reaches, in z
    ctx.lineCap = 'round';
    for (const s of stars) {
      s.z -= speed * dt;
      if (s.z <= 0.02) { spawn(s, true); continue; }
      const x = cx + (s.x / s.z) * f, y = cy + (s.y / s.z) * f;
      if (x < -50 || x > w + 50 || y < -50 || y > h + 50) { spawn(s, true); continue; }
      const z0 = Math.min(1, s.z + trail);
      const x0 = cx + (s.x / z0) * f, y0 = cy + (s.y / z0) * f;
      const a = Math.min(1, (1 - s.z) * 1.4);
      ctx.globalAlpha = a;
      ctx.strokeStyle = s.c;
      ctx.lineWidth = Math.max(0.6, (1 - s.z) * 2.4);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x + 0.01, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  // ── The fill (the progress) ──
  const setProgress = (p: number) => root.style.setProperty('--p', p.toFixed(4));

  let start = 0;
  let last = 0;
  let arrived = false;
  const frame = (now: number) => {
    if (!alive) return;
    if (!start) { start = now; last = now; }
    const t = now - start;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    speed = speedAt(now, t);
    draw(dt);
    if (!arrived) {
      setProgress(reduce ? 1 : ease(clamp(t / MIN_MS)));
      if (t >= MIN_MS) {
        arrived = true;
        setProgress(1);
        whenLoaded(() => {
          root.classList.add('is-done');
          later(open, reduce ? 0 : HOLD);
        });
      }
    }
    // Stars keep moving until the overlay is gone (no canvas: stop once arrived).
    if (ctx || !arrived) raf = requestAnimationFrame(frame);
  };

  // Hold the name until the page has finished loading (it nearly always has
  // by now; on an in-site navigation it always has).
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

  // The jump: the page behind gets told it's on show.
  const open = () => {
    if (!alive) return;
    outAt = performance.now();
    root.classList.add('is-out');
    document.body.classList.add('preloader-done');
    window.dispatchEvent(new Event('preloader:reveal'));
    later(() => {
      root.style.display = 'none';
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    }, reduce ? 300 : OUT_MS);
  };

  raf = requestAnimationFrame(frame);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    window.removeEventListener('resize', size);
  };
}
