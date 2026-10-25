/* ════════════════════════════════════════
   intro.ts - the intro on a visitor's first page of a session (markup:
   components/cosmic/CosmicPreloader.tsx, styles: styles/cosmic.css), drawn on
   the liquid stage (lib/cosmic/liquid.ts).

     loading   the screen is liquid space. As the page really loads
               (LoadingProgressManager) it pours from one scene into the next,
               the WebGL liquid texture loader's morph: a violet nebula, the
               Webb photo of the Carina Nebula's Cosmic Cliffs, a cyan and
               magenta nebula, then the site's own calm navy. Meanwhile drops
               of liquid glass gather into the RUCHIRA EDIRISINGHE logotype
     loaded    the letters set into the real logo, the page's tagline (from
               <Preloader tagline>) under them, and a sheen sweeps them
     drain     the liquid drains off the screen from the bottom up, past the
               logo, uncovering the page as its entrance (preloader:reveal)
               plays

   Each pour is a GSAP tween; one runs at a time, and the next starts only
   once the real progress has passed its share, so a slow load holds on a
   flowing scene and a fast one still gets the whole sequence (MORPH_S each).
   The percentage and the logo follow whichever is behind, the load or the
   pours, so they never get ahead of what is real or of what is on screen.
   Skip goes straight to the drain; a watchdog opens the page whatever
   happens. With reduced motion it is a still nebula and logo, then a fade;
   without WebGL, the plain logo on the dark sky.
   ════════════════════════════════════════ */
import { gsap } from 'gsap';
import { cover, reveal } from './controller';
import { collectInitial, startLoad, type LoadState } from './progress';
import { MAIN_ROUTES, warmSite } from './warm';
import { LiquidStage, logoBox } from './liquid';

const KEY = 're-intro';
const MORPH_S = 1.45; // one pour from scene to scene
const WATCHDOG_MS = 20000; // nothing can hold the intro longer than this
const PHOTO = { sm: '/Images/intro/cosmic-cliffs-sm.webp', lg: '/Images/intro/cosmic-cliffs.webp' };

/** The scenes, in order: palettes (lib/cosmic/liquid.ts) or the photo. */
const SEQUENCE: (number | 'photo')[] = [0, 'photo', 1, 3];
const STATUS = ['Charting the void', 'Through the Cosmic Cliffs', 'Bending starlight', 'Ready for launch'];

export function runIntro(root: HTMLElement): () => void {
  const html = document.documentElement;
  const q = <T extends Element>(sel: string) => root.querySelector(sel) as T;
  const meta = q<HTMLElement>('.cz-meta');
  const num = q<HTMLElement>('.cz-num');
  const track = q<HTMLElement>('.cz-track');
  const status = q<HTMLElement>('.cz-status');
  const skip = q<HTMLButtonElement>('.cz-skip');
  const credit = q<HTMLElement>('.cz-credit');
  const tag = q<HTMLElement>('.cz-tag');
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let alive = true;
  // Slow frames (the page hydrating, images decoding) don't skip the
  // timelines ahead: past 50 ms a frame counts as 33 ms, so every pour and
  // the drain play out in full.
  gsap.ticker.lagSmoothing(50, 33);
  try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode: it just plays again */ }
  cover();

  // ── The stage ──
  const stage = LiquidStage.create(q<HTMLCanvasElement>('.cz-gl'), 'logotype');
  if (stage) {
    stage.onFirstFrame = () => root.classList.add('is-gl');
    stage.onLost = () => { root.classList.remove('is-gl'); root.classList.add('no-gl'); };
  } else root.classList.add('no-gl');
  // The tagline sits under the logo, wherever the stage puts it.
  const onResize = () => {
    const box = stage?.layout() ?? logoBox('logotype', window.innerWidth, window.innerHeight);
    root.style.setProperty('--logo-bottom', `${(box.y + box.h).toFixed(1)}px`);
    if (stage) stage.bar = track.getBoundingClientRect();
  };
  onResize();
  window.addEventListener('resize', onResize);

  // ── Real progress ──
  const load = startLoad();
  let state: LoadState = load.state;
  const unsub = load.subscribe((s) => { state = s; });
  collectInitial(load);
  // The other pages' models, music, code and first-screen images, so the
  // visit never stalls on them later (it waits on them for a few seconds at most).
  load.add('the rest of the site', warmSite(MAIN_ROUTES), 2);

  // The photo is one of the scenes: the load waits for it like any image. It
  // goes up to the GPU between pours (sceneAt), never in the middle of one.
  let photoImg: HTMLImageElement | null = null;
  let photo: number | null = null;
  if (stage && !reduce) {
    const img = new Image();
    img.decoding = 'async';
    img.src = window.innerWidth * (window.devicePixelRatio || 1) > 1100 ? PHOTO.lg : PHOTO.sm;
    load.add('nebula photo', img.decode().then(() => { photoImg = img; }));
  }
  requestAnimationFrame(() => load.seal());

  const steps = reduce ? 1 : SEQUENCE.length;
  // The photo's place falls back to a teal nebula if it hasn't come in by then.
  const sceneAt = (i: number) => {
    const s = SEQUENCE[i];
    if (s === 'photo') {
      if (photo === null && photoImg) photo = stage!.image(photoImg);
      return photo ?? stage!.palette(4);
    }
    return stage!.palette(s);
  };
  if (stage) {
    // Every nebula is baked now, behind the plain cover, so no pour waits on one.
    if (!reduce) SEQUENCE.forEach((s) => { if (s !== 'photo') stage.palette(s); });
    stage.palette(4);
    stage.show(sceneAt(0));
    stage.in = 1;
    if (reduce) { stage.speed = 0; stage.fx = 0; stage.form = 1; }
    stage.start();
  }

  let step = 0, pouring = false;
  /** Pours the next scene in. */
  function pour() {
    const next = step + 1;
    pouring = true;
    stage!.show(sceneAt(step), sceneAt(next));
    stage!.mix = 0;
    stage!.angle = Math.random() * Math.PI * 2;
    root.classList.toggle('is-photo', SEQUENCE[next] === 'photo' && photo !== null);
        swap(status, STATUS[next], 0.9);
    gsap.to(stage!, {
      mix: 1, duration: MORPH_S, ease: 'sine.inOut',
      onComplete: () => {
        step = next;
        stage!.show(sceneAt(step));
        stage!.mix = 0;
        pouring = false;
      },
    });
  }

  /** Crossfades the status line: the old rises away through a blur as the new rises in. */
  function swap(slot: HTMLElement, text: string, duration: number) {
    const old = Array.from(slot.children).filter((el) => !el.classList.contains('is-out')) as HTMLElement[];
    const el = document.createElement('i');
    el.textContent = text;
    slot.appendChild(el);
    gsap.fromTo(el, { opacity: 0, yPercent: 45, filter: 'blur(6px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration, ease: 'sine.out' });
    for (const o of old) {
      o.classList.add('is-out');
      gsap.to(o, { opacity: 0, yPercent: -45, filter: 'blur(6px)', duration, ease: 'sine.in', onComplete: () => o.remove() });
    }
  }

  /** The count: a plain count up, one number at a time. */
  let numShown = 0;
  function count(v: number) {
    if (v === numShown) return;
    numShown = v;
    num.textContent = String(v);
  }

  let shown = 0, form = 0, prog = 0, raf = 0, last = 0;
  const tick = (now: number) => {
    if (!alive) return;
    // A long frame counts as a short one, so nothing jumps ahead (or gets skipped).
    const dt = last ? Math.min(0.034, (now - last) / 1000) : 0.016;
    last = now;
    // Smoothed, but never ahead of the real state, and 100% only when complete.
    const goal = state.complete ? 1 : Math.min(state.progress, 0.99);
    shown += (goal - shown) * Math.min(1, dt * (reduce ? 30 : 4.5));
    if (goal === 1 && shown > 0.997) shown = 1;

    // The next pour once the load has passed its share.
    const owed = steps > 1 ? Math.floor(shown * (steps - 1) + 1e-6) : 0;
    if (stage && !pouring && step < owed) pour();

    // What's on screen: the load, held back to the pours.
    const poured = !stage || steps === 1 ? 1 : (step + (pouring ? stage.mix : 0)) / (steps - 1) + 0.2;
    const p = Math.min(shown, poured);
    // Counts up a step at a time towards it, never skipping a number by much.
    const target = p >= 1 ? 100 : Math.floor(p * 100);
    const pct = Math.min(target, numShown + Math.max(1, Math.round((target - numShown) * 0.25)));
    root.style.setProperty('--p', p.toFixed(4));
    count(pct);
    meta.setAttribute('aria-valuenow', String(pct));
    // The logo gathers on its own soft curve, so it never jumps with the load.
    form += (0.06 + 0.94 * p - form) * Math.min(1, dt * 2.2);
    if (stage && !reduce) stage.form = form;
    // The thread flows to the progress rather than stepping to it.
    prog += (p - prog) * Math.min(1, dt * 3.5);
    if (stage) stage.prog = reduce ? p : prog;

    if (shown === 1 && numShown === 100 && (!stage || (step === steps - 1 && !pouring))) finish();
    else raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  // ── Loaded: the letters set, then the liquid drains away ──
  let played = false;
  function finish() {
    if (played || !alive) return;
    played = true;
    cancelAnimationFrame(raf);
    root.style.setProperty('--p', '1');
    count(100);
    if (stage) gsap.to(stage, { prog: 1, duration: 0.4, ease: 'sine.out' });
    root.classList.add('is-loaded');

    if (!stage || reduce) { fade(0.15); return; }
    // (the drain's own tween ends the intro)
    gsap.timeline()
      .to(stage, { form: 1, duration: 0.6, ease: 'sine.out' }, 0)
      .to(stage, { flash: 1, duration: 1.1, ease: 'sine.inOut' }, 0.2)
      .to([meta, skip, credit], { opacity: 0, duration: 0.5, ease: 'sine.out' }, 0.75)
      .to(stage, { barOn: 0, duration: 0.6, ease: 'sine.in' }, 0.7)
      .add(() => drain(), 1.25);
  }

  /** The liquid drains off the screen, uncovering the page. */
  function drain(duration = 1.7) {
    if (!alive || root.classList.contains('is-leaving')) return;
    reveal();
    root.classList.add('is-leaving');
    gsap.to(stage!, { out: 1, duration, ease: 'sine.inOut', onComplete: done });
    gsap.to(stage!, { form: 0.55, duration: duration * 0.75, ease: 'sine.in' });
    gsap.to(tag, { opacity: 0, y: -8, duration: duration * 0.4, delay: duration * 0.2, ease: 'sine.in' });
  }

  /** Without the liquid (or with reduced motion): a plain fade. */
  function fade(delay: number) {
    reveal();
    root.classList.add('is-leaving');
    gsap.to(root, { opacity: 0, duration: 0.45, delay, ease: 'power1.out', onComplete: done });
  }

  /** Skip, or the watchdog: straight to the drain. */
  function leave() {
    if (!alive || root.classList.contains('is-leaving')) return;
    played = true;
    cancelAnimationFrame(raf);
    root.classList.add('is-loaded');
    gsap.killTweensOf([stage].filter(Boolean));
    gsap.to([meta, skip, credit, tag], { opacity: 0, duration: 0.25 });
    if (stage) gsap.to(stage, { barOn: 0, duration: 0.3 });
    if (!stage || reduce) { fade(0); return; }
    drain(1.1);
  }

  function done() {
    if (!alive) return;
    // Focus back to the page if it was on the overlay (the Skip button).
    if (root.contains(document.activeElement)) {
      const main = document.querySelector('main') as HTMLElement | null;
      if (main) { main.tabIndex = -1; main.focus({ preventScroll: true }); }
    }
    // Hidden, not removed: the node is React's (.czr is display: none without .intro).
    html.classList.remove('intro');
    cleanup();
  }

  function cleanup() {
    alive = false;
    gsap.ticker.lagSmoothing(500, 33); // GSAP's default, for the rest of the site
    cancelAnimationFrame(raf);
    unsub();
    gsap.killTweensOf([root, stage, meta, skip, credit, tag, ...Array.from(root.querySelectorAll('.cz-status i'))].filter(Boolean));
    clearTimeout(watchdog);
    window.removeEventListener('resize', onResize);
    stage?.destroy();
  }

  const watchdog = setTimeout(leave, WATCHDOG_MS);
  skip.addEventListener('click', leave);

  return cleanup;
}
