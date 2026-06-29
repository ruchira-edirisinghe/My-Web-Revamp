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
