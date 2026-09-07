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
