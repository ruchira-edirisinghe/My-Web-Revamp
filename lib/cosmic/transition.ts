/* ════════════════════════════════════════
   transition.ts - the short page transition (markup:
   components/cosmic/PageTransitionOverlay.tsx, styles: styles/cosmic.css),
   drawn on the intro's liquid stage (lib/cosmic/liquid.ts).

   The intro's liquid, in under a second each way, and a different sky every
   time (one of the stage's PALETTES, never the one before). On a click the
   page floods from the bottom up with the sky the last transition left,
   while drops gather in the middle into the RE monogram. While the
   destination loads, that liquid pours into a new sky and the monogram sets,
   both at its real readiness,
   with its tagline under it (held long enough to read, TAG_MS). Then a sheen
   sweeps the monogram and the liquid drains off from the bottom up onto the
   new page, the tagline fading as the surface passes it.

     click -> flood (~650 ms) -> navigate -> hold until the destination's
     above-the-fold images and critical work are ready -> drain (~820 ms)

   Back/forward and other route changes the click handler didn't see start
   already flooded (before paint) and go straight to hold and drain. A full
   reload that isn't a session's first page starts covered from the head
   script (.pt-cover) and does the same, waiting on the page's initial load.
   The hold is capped (HOLD_CAP_MS) on top of the manager's own timeouts, so a
   slow asset never strands the visitor. On a session's first page the stage
   is set up and every sky baked during the intro, which waits for them, so no
   transition later has anything to prepare; otherwise that happens when the
   browser is idle. A slow frame never skips an animation ahead (tween). Without
   WebGL, or with reduced motion, a plain panel fades in and out with the
   monogram on it.
   ════════════════════════════════════════ */
import { cover, onTagline, reveal, setTagline } from './controller';
import { collectImages, collectInitial, startLoad, trackCritical, type LoadingProgressManager } from './progress';
import { LiquidStage, logoBox, PALETTES } from './liquid';

const IN_MS = 650;
const OUT_MS = 820;
const MIN_HOLD_MS = 280; // long enough for the pour and the monogram to register
const HOLD_CAP_MS = 6000;
const TAG_MS = 1000; // the destination's tagline stays up at least this long, to be read
const FORM_COVERED = 0.32; // how far the monogram has gathered once the page is flooded

type Phase = 'idle' | 'covering' | 'holding' | 'revealing';
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** Any sky but `not`. */
const otherSky = (not: number) => (not + 1 + Math.floor(Math.random() * (PALETTES.length - 1))) % PALETTES.length;

export class PageTransitions {
  private phase: Phase = 'idle';
  private load: LoadingProgressManager | null = null;
  private routed = false;
  private covered: Promise<void> = Promise.resolve();
  private reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  private stage: LiquidStage | null = null;
  private tried = false;
  /** The sky the last transition left, and the one the next will pour into (baked ahead). */
  private sky = Math.floor(Math.random() * PALETTES.length);
  private next = otherSky(this.sky);
  private idleId = 0;
  private alive = true;
  /** When the destination's tagline came up (0: none yet, or the page has none). */
  private tagAt = 0;
  private offTag: () => void;

  constructor(private root: HTMLElement, private push: (href: string) => void) {
    // Timed from when it first appears (a page re-rendering sets it again).
    this.offTag = onTagline((t) => { this.tagAt = !t ? 0 : this.tagAt || performance.now(); });
    this.layout();
    window.addEventListener('resize', this.layout);
    // Under the intro: set everything up now, while the first load is being
    // waited on anyway. Otherwise when the browser has nothing better to do.
    if (document.documentElement.classList.contains('intro')) this.ensure();
    else {
      const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1500));
      this.idleId = idle(() => { if (this.alive) this.ensure(); }, { timeout: 4000 });
    }
  }

  get busy() { return this.phase !== 'idle'; }

  /** The stage, set up the first time it's needed (null without WebGL or with reduced motion). */
  private ensure() {
    if (this.tried) return this.stage;
    this.tried = true;
    if (!this.reduce) this.stage = LiquidStage.create(this.root.querySelector<HTMLCanvasElement>('.pt-gl')!, 'monogram');
    if (this.stage) {
      this.stage.onFirstFrame = () => this.root.classList.add('is-gl');
      this.stage.onLost = () => {
        this.stage = null;
        this.root.classList.remove('is-gl');
        this.root.classList.add('no-gl');
        this.set('--f', this.phase === 'idle' ? 0 : 1);
      };
      // Bake every sky while nothing is happening, so a click never waits on one
      // (and the intro counts them in its load).
      const baking = this.stage.prebake(PALETTES.map((_, i) => (this.sky + i) % PALETTES.length));
      if (document.documentElement.classList.contains('intro')) trackCritical('transition skies', baking, null, 1);
    } else this.root.classList.add('no-gl');
    this.layout();
    return this.stage;
  }

  /** Keeps the stage and the tagline (under the monogram) fitted to the window. */
  private layout = () => {
    const box = this.stage?.layout() ?? logoBox('monogram', window.innerWidth, window.innerHeight);
    this.root.style.setProperty('--mono-top', `${box.y.toFixed(1)}px`);
    this.root.style.setProperty('--mono-bottom', `${(box.y + box.h).toFixed(1)}px`);
    this.root.style.setProperty('--mono-w', `${box.w.toFixed(1)}px`);
  };

  /** A link was clicked: flood, then navigate. */
  go(href: string) {
    if (this.busy) { this.push(href); return; }
    this.begin('covering');
    const s = this.stage;
    if (s) { s.in = 0; s.form = 0; }
    this.covered = this.tween(this.reduce ? 150 : IN_MS, (k) => {
      if (s) { s.in = inOut(k); s.form = FORM_COVERED * easeOut(k); } else this.set('--f', k);
    }).then(() => {
      if (!this.alive) return;
      this.root.dataset.state = 'holding';
      this.push(href);
    });
  }

  /** The route changed (from the layout, before paint). */
  routeChanged() {
    if (this.phase === 'idle') {
      // Back/forward or a programmatic change: be flooded already.
      this.begin('holding');
      this.covers();
    }
    if (this.routed) return;
    this.routed = true;
    this.covered.then(() => this.hold(false));
  }

  /** A full page load that isn't the session's first (.pt-cover from the head script). */
  initial() {
    this.begin('holding');
    this.covers();
    this.routed = true;
    this.hold(true);
  }

  private covers() {
    if (this.stage) { this.stage.in = 1; this.stage.form = FORM_COVERED; this.stage.draw(); } else this.set('--f', 1);
  }

  private begin(phase: Phase) {
    this.phase = phase;
    this.routed = false;
    cover();
    setTagline(null);
    this.load = startLoad();
    this.root.dataset.state = phase;
    this.set('--p', 0);
    document.documentElement.classList.add('pt-busy');
    const s = this.ensure();
    if (s) {
      s.show(s.palette(this.sky), s.palette(this.next));
      s.mix = 0; s.out = 0; s.flash = 0;
      s.angle = Math.random() * Math.PI * 2;
      s.start();
    }
  }

  private async hold(initial: boolean) {
    if (!this.alive || !this.load) return;
    const load = this.load;
    this.phase = 'holding';
    this.root.dataset.state = 'holding';
    // Let the destination render a frame, then see what's on its first screen.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (initial) collectInitial(load); else collectImages(load);
    load.seal();
    const start = performance.now();
    await new Promise<void>((resolve) => {
      let shown = 0, last = start;
      const step = () => {
        if (!this.alive) return resolve();
        const now = performance.now();
        const dt = Math.min(0.034, (now - last) / 1000);
        last = now;
        const s = load.state;
        const goal = s.complete ? 1 : Math.min(s.progress, 0.99);
        shown += (goal - shown) * Math.min(1, dt * 7);
        this.set('--p', shown);
        if (this.stage) {
          this.stage.mix = inOut(shown);
          this.stage.form = FORM_COVERED + (1 - FORM_COVERED) * shown;
        }
        const t = now - start;
        const read = !this.tagAt || now - this.tagAt >= TAG_MS;
        if ((s.complete && t >= MIN_HOLD_MS && shown > 0.985 && read) || t > HOLD_CAP_MS) return resolve();
        requestAnimationFrame(step);
      };
      step();
    });
    this.set('--p', 1);
    if (this.stage) { this.stage.mix = 1; this.stage.form = 1; }
    this.open();
  }

  private async open() {
    if (!this.alive) return;
    this.phase = 'revealing';
    this.root.dataset.state = 'revealing';
    reveal();
    const s = this.stage;
    await this.tween(this.reduce ? 200 : OUT_MS, (k) => {
      if (s) { s.flash = Math.min(1, k * 1.8); s.out = inOut(k); s.form = 1 - 0.4 * k * k; } else this.set('--f', 1 - k);
    });
    if (!this.alive) return;
    this.stage?.stop();
    // This sky stays for the next flood; pick (and bake) the one after.
    this.sky = this.next;
    this.next = otherSky(this.sky);
    this.phase = 'idle';
    this.root.dataset.state = 'idle';
    document.documentElement.classList.remove('pt-busy', 'pt-cover');
  }

  private set(name: string, v: number) { this.root.style.setProperty(name, v.toFixed(4)); }

  /** Runs fn(0-1) over ms, one frame at a time. A long frame (the router
   *  rendering the next page) counts as a short one, so the animation plays
   *  out in full rather than jumping ahead. */
  private tween(ms: number, fn: (k: number) => void) {
    return new Promise<void>((resolve) => {
      let t = 0, last = performance.now();
      const frame = (now: number) => {
        if (!this.alive) return resolve();
        t += Math.min(34, now - last);
        last = now;
        const k = Math.min(1, t / ms);
        fn(k);
        if (k < 1) requestAnimationFrame(frame); else resolve();
      };
      requestAnimationFrame(frame);
    });
  }

  destroy() {
    this.alive = false;
    this.offTag();
    window.cancelIdleCallback?.(this.idleId);
    window.removeEventListener('resize', this.layout);
    this.stage?.destroy();
  }
}
