// Small helper shared by the ported vanilla-JS modules. Each original script was
// a self-running IIFE; in React they run inside useEffect and MUST clean up after
// themselves (cancel rAF loops, drop listeners, remove injected nodes) so they are
// safe under React StrictMode double-invoke and route unmounts.

export interface Bag {
  /** addEventListener + auto-removal on dispose */
  on: (target: EventTarget, type: string, handler: any, opts?: any) => void;
  /** register an arbitrary teardown callback */
  add: (fn: () => void) => void;
  /** run every teardown (swallowing errors) */
  dispose: () => void;
}

/**
 * Whether this visitor has asked for less motion.
 *
 * Read fresh on each call rather than cached at module load: the preference can
 * be toggled while the tab is open (macOS and Windows both do it live), and a
 * value captured once would then be wrong for the rest of the session.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

/**
 * `scrollIntoView` / `scrollTo` behaviour to use for a programmatic jump.
 *
 * CSS `scroll-behavior` is already switched to `auto` under reduced motion in
 * globals.css, but a `behavior: 'smooth'` passed explicitly to a scroll API
 * OVERRIDES that - so the stylesheet fix alone left every in-page anchor (the
 * case-study TOC, the scroll-to-top rail, VeBuild's tab jumps) animating anyway.
 */
export const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'auto' : 'smooth';

export function makeBag(): Bag {
  const fns: Array<() => void> = [];
  return {
    on(target, type, handler, opts) {
      target.addEventListener(type, handler, opts);
      fns.push(() => target.removeEventListener(type, handler, opts));
    },
    add(fn) {
      fns.push(fn);
    },
    dispose() {
      for (const fn of fns.splice(0).reverse()) {
        try {
          fn();
        } catch {
          /* ignore teardown errors */
        }
      }
    },
  };
}

/**
 * Clear only what the last frame actually painted.
 *
 * The custom cursor draws into a canvas that spans the whole viewport, but it
 * only ever touches a ~170px box around the pointer. Clearing the full canvas
 * every frame meant a ~2-megapixel memset plus a full-canvas texture re-upload
 * to the compositor sixty times a second, on every page, forever - by far the
 * most expensive thing the cursor did, and all of it wasted on pixels that were
 * already transparent.
 *
 * `makeDirtyClear` hands back a `clear(x, y, r)` that erases the union of the
 * previous frame's box and this one's, so the trail is still wiped correctly
 * while the work stays proportional to the cursor rather than the screen.
 * `reset()` forces the next clear to cover everything - needed on resize (the
 * backing store is reallocated) and when the loop stops.
 */
export function makeDirtyClear(ctx: CanvasRenderingContext2D) {
  let px = 0, py = 0, pr = 0, full = true;
  return {
    clear(x: number, y: number, r: number) {
      const c = ctx.canvas;
      if (full) {
        ctx.clearRect(0, 0, c.width, c.height);
        full = false;
      } else {
        // Union of last frame's box and this one, padded for stroke width and
        // the shadow blur the cursor glyphs draw with.
        const pad = 12;
        const x0 = Math.min(x - r, px - pr) - pad;
        const y0 = Math.min(y - r, py - pr) - pad;
        const x1 = Math.max(x + r, px + pr) + pad;
        const y1 = Math.max(y + r, py + pr) + pad;
        ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
      }
      px = x; py = y; pr = r;
    },
    /** Next clear wipes the whole canvas (resize, or loop stop). */
    reset() {
      full = true;
    },
  };
}
