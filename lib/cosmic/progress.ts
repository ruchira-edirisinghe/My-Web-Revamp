/* ════════════════════════════════════════
   progress.ts - LoadingProgressManager: real readiness tracking for the
   cosmic preloader and the page transitions (lib/cosmic/*).

   A page is ready when its critical assets have genuinely finished. Each one
   is a task with a weight, settled by a real event: an above-the-fold image
   loading and decoding, a font face loading, the brand SVGs decoding, the
   window's load event, a 3D figure's first draw (trackCritical). Progress
   is the settled weight over the total, never a timer. A task that fails,
   or hangs past TASK_TIMEOUT, still settles (and is listed in `failed`), so
   nobody can be trapped behind the overlay. Below-the-fold content isn't
   waited on: it stays lazy and loads once the page is interactive.
   ════════════════════════════════════════ */

export interface LoadState {
  /** Settled weight over total weight, 0-1. */
  progress: number;
  done: number;
  total: number;
  /** Every task settled, the scan is finished and nothing new joined for a moment. */
  complete: boolean;
  failed: string[];
}
type Listener = (s: LoadState) => void;

const TASK_TIMEOUT = 12000;
/** Quiet time after the last task joins before the load counts as complete,
 *  so a figure that registers a beat late isn't left out. */
const SETTLE_MS = 160;

interface Task { name: string; weight: number; settled: boolean; failed: boolean }

export class LoadingProgressManager {
  private tasks: Task[] = [];
  private listeners = new Set<Listener>();
  private sealed = false;
  private done = false;
  private settleTimer: ReturnType<typeof setTimeout> | undefined;

  /** Wait on real work. Ignored once the load is complete (it's no longer critical). */
  add(name: string, work: Promise<unknown>, weight = 1) {
    if (this.done) return;
    const task: Task = { name, weight, settled: false, failed: false };
    this.tasks.push(task);
    const settle = (failed: boolean) => {
      if (task.settled) return;
      clearTimeout(timer);
      task.settled = true;
      task.failed = failed;
      if (failed && process.env.NODE_ENV !== 'production') console.warn(`[loader] ${name} failed or timed out`);
      this.update();
    };
    const timer = setTimeout(() => settle(true), TASK_TIMEOUT);
    work.then(() => settle(false), () => settle(true));
    this.update();
  }

  /** The initial scan is finished: complete as soon as everything has settled. */
  seal() {
    this.sealed = true;
    this.update();
  }

  get state(): LoadState {
    let total = 0, settled = 0, done = 0;
    const failed: string[] = [];
    for (const t of this.tasks) {
      total += t.weight;
      if (t.settled) { settled += t.weight; done++; }
      if (t.failed) failed.push(t.name);
    }
    return { progress: total ? settled / total : 0, done, total: this.tasks.length, complete: this.done, failed };
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.state);
    return () => { this.listeners.delete(fn); };
  }

  private update() {
    const all = this.tasks.every((t) => t.settled);
    clearTimeout(this.settleTimer);
    if (!this.done && this.sealed && all) {
      this.settleTimer = setTimeout(() => {
        if (this.tasks.every((t) => t.settled)) { this.done = true; this.notify(); }
      }, SETTLE_MS);
    }
    this.notify();
  }

  private notify() {
    const s = this.state;
    this.listeners.forEach((fn) => fn(s));
  }
}

/* ── Collectors ── */

const inView = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && r.top < window.innerHeight * 1.05 && r.bottom > -20 && r.left < window.innerWidth && r.right > 0;
};

/** Resolves when an <img> has loaded and decoded (rejects on a load error). */
const imageReady = (img: HTMLImageElement) =>
  (img.complete && img.naturalWidth
    ? Promise.resolve()
    : new Promise<void>((res, rej) => {
      img.addEventListener('load', () => res(), { once: true });
      img.addEventListener('error', () => rej(new Error(img.src)), { once: true });
    })
  ).then(() => img.decode?.().catch(() => {}));

const decodeUrl = (src: string) => {
  const img = new Image();
  img.src = src;
  return img.decode();
};

const windowLoaded = () =>
  document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));

/** The faces the first screen of most pages is set in. */
const FACES = ['700 1em Montserrat', '400 1em Burgundia', '700 1em Orbitron'];

/** Above-the-fold images: the critical ones for any page. */
export function collectImages(m: LoadingProgressManager) {
  const seen = new Set<string>();
  for (const img of Array.from(document.images)) {
    if (img.closest('[data-loader-ignore]') || !inView(img)) continue;
    const src = img.currentSrc || img.src;
    if (!src || seen.has(src)) continue;
    seen.add(src);
    m.add(`image ${src.split('/').pop()}`, imageReady(img));
  }
}

/** Everything the first page of a visit needs: fonts, the brand SVGs, the
 *  above-the-fold images and the page's own load. */
export function collectInitial(m: LoadingProgressManager) {
  m.add('app', Promise.resolve()); // hydrated: this runs from a React effect
  if (document.fonts) {
    m.add('fonts', document.fonts.ready, 2);
    for (const f of FACES) m.add(`font ${f}`, document.fonts.load(f));
  }
  m.add('logo', decodeUrl('/Images/longlogo.svg'));
  m.add('monogram', decodeUrl('/Images/shortlogo.svg'));
  collectImages(m);
  m.add('page', windowLoaded(), 2);
}

/* ── The current load, so page code can register its own critical work ── */

let current: LoadingProgressManager | null = null;
const early: [string, Promise<unknown>, number][] = [];

/** Starts tracking a load (the first page, or a navigation) and makes it the
 *  one trackCritical feeds. Work registered before it existed joins it. */
export function startLoad(): LoadingProgressManager {
  current = new LoadingProgressManager();
  for (const [name, p, w] of early.splice(0)) current.add(name, p, w);
  return current;
}

/**
 * Lets page code hold the overlay for work the first screen can't render
 * without (a 3D figure's model and first draw). With `el`, it only counts if
 * that element is on screen; below-the-fold work never holds the page.
 */
export function trackCritical(name: string, work: Promise<unknown>, el?: Element | null, weight = 2) {
  if (typeof window === 'undefined' || (el && !inView(el))) return;
  if (current) current.add(name, work, weight);
  else if (early.length < 20) early.push([name, work, weight]);
}
