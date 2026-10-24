/* ════════════════════════════════════════
   transition.ts - the short page transition (markup:
   components/cosmic/PageTransitionOverlay.tsx, styles: styles/cosmic.css).

   The same world as the intro, in well under a second: Nova's spaceship
   streaks across the screen on a slanted energy edge, and the trail it leaves
   is the cover. As it passes, the RE monogram in the middle charges up (its
   fill is the destination's real readiness). Then Astra's ship streaks after
   it on a second edge that wipes the cover away the same way, revealing the
   new page as the monogram flashes. The ships are 3D (lib/cosmic/ships.ts),
   loaded once the browser is idle; until they're in, the edges fly alone.

     click -> cover (~300 ms) -> navigate -> hold until the destination's
     above-the-fold images and critical work are ready -> reveal (~380 ms)

   Back/forward and other route changes the click handler didn't see start
   already covered (before paint) and go straight to hold and reveal. A full
   reload that isn't a session's first page starts covered from the head
   script (.pt-cover) and does the same, waiting on the page's initial load.
   The hold is capped (HOLD_CAP_MS) on top of the manager's own timeouts, so a
   slow asset never strands the visitor.
   ════════════════════════════════════════ */
import { cover, reveal, setTagline } from './controller';
import { canWebGL } from './models';
import { collectImages, collectInitial, startLoad, type LoadingProgressManager } from './progress';
import type { Ships, Ship } from './ships';

const COVER_MS = 300;
const REVEAL_MS = 380;
const MIN_HOLD_MS = 90; // long enough for the monogram's flash to register
const HOLD_CAP_MS = 6000;
const SLANT = 0.15; // the edge's lean, as a share of the width

type Phase = 'idle' | 'covering' | 'holding' | 'revealing';
const easeIn = (t: number) => t * t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export class PageTransitions {
  private phase: Phase = 'idle';
  private load: LoadingProgressManager | null = null;
  private routed = false;
  private covered: Promise<void> = Promise.resolve();
  private reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  private riderA: HTMLElement;
  private riderB: HTMLElement;
  private ships: Ships | null = null;
  private idleId = 0;
  private alive = true;

  constructor(private root: HTMLElement, private push: (href: string) => void) {
    this.riderA = root.querySelector('.pt-rider.is-a')!;
    this.riderB = root.querySelector('.pt-rider.is-b')!;
    this.lean();
    window.addEventListener('resize', this.lean);
    // The ships come in when the browser has nothing better to do.
    if (!this.reduce && canWebGL()) {
      const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1500));
      this.idleId = idle(() => {
        import('./ships').then(({ Ships }) => {
          if (this.alive) this.ships = new Ships(root.querySelector<HTMLCanvasElement>('.pt-ships')!);
        }).catch(() => { /* the edges fly alone */ });
      }, { timeout: 4000 });
    }
  }

  /** The skew that lines the edges up with the slanted mask. */
  private lean = () => {
    const deg = (-Math.atan((SLANT * window.innerWidth) / window.innerHeight) * 180) / Math.PI;
    this.root.style.setProperty('--sk', `${deg.toFixed(2)}deg`);
    this.ships?.layout();
  };

  get busy() { return this.phase !== 'idle'; }

  /** A link was clicked: cover, then navigate. */
  go(href: string) {
    if (this.busy) { this.push(href); return; }
    this.begin('covering');
    this.covered = this.tween('--a', 0, 1, this.reduce ? 120 : COVER_MS, easeIn, this.riderA, 0).then(() => {
      if (!this.alive) return;
      // Covered: Nova and her edge are gone while the router fetches the page.
      this.root.dataset.state = 'holding';
      this.push(href);
    });
  }

  /** The route changed (from the layout, before paint). */
  routeChanged() {
    if (this.phase === 'idle') {
      // Back/forward or a programmatic change: be covered already.
      this.begin('holding');
      this.set('--a', 1);
    }
    if (this.routed) return;
    this.routed = true;
    this.covered.then(() => this.hold(false));
  }

  /** A full page load that isn't the session's first (.pt-cover from the head script). */
  initial() {
    this.begin('holding');
    this.set('--a', 1);
    this.routed = true;
    this.hold(true);
  }

  private begin(phase: Phase) {
    this.phase = phase;
    this.routed = false;
    cover();
    setTagline(null);
    this.load = startLoad();
    this.root.dataset.state = phase;
    this.root.classList.remove('is-charged');
    this.set('--b', 0);
    this.set('--p', 0);
    document.documentElement.classList.add('pt-busy');
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
      let shown = 0;
      const step = () => {
        if (!this.alive) return resolve();
        const s = load.state;
        const goal = s.complete ? 1 : Math.min(s.progress, 0.99);
        shown += (goal - shown) * 0.25;
        this.set('--p', shown);
        const t = performance.now() - start;
        if ((s.complete && t >= MIN_HOLD_MS && shown > 0.97) || t > HOLD_CAP_MS) return resolve();
        requestAnimationFrame(step);
      };
      step();
    });
    this.set('--p', 1);
    this.root.classList.add('is-charged');
    this.open();
  }

  private async open() {
    if (!this.alive) return;
    this.phase = 'revealing';
    this.root.dataset.state = 'revealing';
    reveal();
    await this.tween('--b', 0, 1, this.reduce ? 160 : REVEAL_MS, easeInOut, this.riderB, 1);
    if (!this.alive) return;
    this.phase = 'idle';
    this.root.dataset.state = 'idle';
    this.set('--a', 0);
    this.set('--b', 0);
    document.documentElement.classList.remove('pt-busy', 'pt-cover');
  }

  private set(name: string, v: number) { this.root.style.setProperty(name, v.toFixed(4)); }

  /** Animates one edge (a CSS variable) and the ship riding it. */
  private tween(name: string, from: number, to: number, ms: number, ease: (t: number) => number, rider: HTMLElement, ship: Ship) {
    return new Promise<void>((resolve) => {
      const t0 = performance.now();
      const frame = (now: number) => {
        if (!this.alive) return resolve();
        const k = Math.min(1, (now - t0) / ms);
        const v = from + (to - from) * ease(k);
        this.set(name, v);
        // Rides the edge's midpoint, leaning into the speed.
        const x = (v * (1 + SLANT) - SLANT / 2) * window.innerWidth;
        const speed = k < 1 ? Math.abs(ease(Math.min(1, k + 0.02)) - ease(k)) * 50 : 0;
        const y = window.innerHeight * 0.5, tilt = -8 - speed * 6, stretch = 1 + speed * 0.25;
        rider.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${tilt}deg) scaleX(${stretch})`;
        if (k < 1) { this.ships?.fly(ship, x, y, tilt, stretch); requestAnimationFrame(frame); }
        else { this.ships?.land(); resolve(); }
      };
      requestAnimationFrame(frame);
    });
  }

  destroy() {
    this.alive = false;
    window.cancelIdleCallback?.(this.idleId);
    this.ships?.destroy();
    window.removeEventListener('resize', this.lean);
  }
}
