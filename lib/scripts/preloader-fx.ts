/* ══════════════════════════════════════════════════════════════════
   preloader-fx.ts — entry gate for the preloader's warp-and-flash layer

   Same split as space-field.ts, and for a sharper reason: the preloader
   is the first thing painted, so it must never wait on a 340 kB
   three.js chunk. This file imports nothing heavy, decides in a few
   microseconds whether WebGL is even possible, and streams the scene in
   behind the load that is already running.

   Unlike the page background, there is no fallback to write. The
   preloader's own water-fill animation is the baseline and it runs
   regardless; this layer either arrives in time to decorate it or it
   does not, and nothing about the page depends on which.
   ══════════════════════════════════════════════════════════════════ */

import type { Bag } from './_util';

function supportsWebGL(canvas: HTMLCanvasElement): boolean {
  try {
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Start the warp layer if this browser can draw it. Safe to call anywhere. */
export function initPreloaderFx(bag: Bag): void {
  const canvas = document.getElementById('preloader-fx') as HTMLCanvasElement | null;
  if (!canvas) return;

  // Skip entirely when the preloader is already done — on an in-site
  // navigation the markup exists but may be hidden.
  const preloader = document.getElementById('preloader');
  if (!preloader || preloader.style.display === 'none') return;

  if (!supportsWebGL(canvas)) return;

  let cancelled = false;
  bag.add(() => {
    cancelled = true;
  });

  import('./preloader-fx-3d')
    .then((m) => {
      if (!cancelled) m.mountPreloaderFx(bag, canvas);
    })
    .catch(() => {
      // Decoration only — the water-fill preloader is unaffected.
    });
}
