/**
 * Runs `fn` once, either when `el` comes within `margin` of the viewport or
 * when the browser is next idle after load, whichever is first. Mounting a
 * WebGL figure while idle keeps its setup (environment map, shader compile)
 * out of the visitor's scroll. Returns a cancel function.
 */
export function onNearOrIdle(el: Element, fn: () => void, margin = '700px 0px'): () => void {
  let done = false;
  const run = () => { if (done) return; done = true; stop(); fn(); };
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); }, { rootMargin: margin });
  io.observe(el);
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  let idle = 0, timer = 0;
  const arm = () => {
    timer = window.setTimeout(() => {
      if (w.requestIdleCallback) idle = w.requestIdleCallback(run, { timeout: 4000 });
      else run();
    }, 1200);
  };
  if (document.readyState === 'complete') arm(); else window.addEventListener('load', arm, { once: true });
  function stop() {
    io.disconnect();
    window.removeEventListener('load', arm);
    clearTimeout(timer);
    if (idle) w.cancelIdleCallback?.(idle);
  }
  return () => { done = true; stop(); };
}
