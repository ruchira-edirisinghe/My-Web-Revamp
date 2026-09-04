/* ══════════════════════════════════════════════════════════════════
   space-field.ts — the WebGL background's entry gate

   This module is deliberately tiny and imports nothing heavy. three.js
   is ~340 kB, and the thing it draws here is a decorative backdrop, so
   it has no business sitting in the critical path ahead of the page's
   own text. The split is:

     space-field.ts     (this file)  — sync: can we do WebGL at all?
     space-field-3d.ts               — the scene; loaded on demand

   `initSpaceField3D` answers synchronously because its callers need an
   immediate yes/no to decide whether to run their 2D fallback:

       if (initSpaceField3D(bag)) return;
       ...existing 2D starfield...

   A canvas can only ever hand out one kind of context, so the decision
   cannot be deferred — if we let the 2D field start first, the WebGL
   context would be refused when it finally arrived. So we settle it up
   front on capability alone, claim the canvas, and stream the scene in
   behind first paint.
   ══════════════════════════════════════════════════════════════════ */

import type { Bag } from './_util';

function supportsWebGL(canvas: HTMLCanvasElement): boolean {
  try {
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

/**
 * Claim #space-canvas for the WebGL field if this browser can render it.
 *
 * @returns true when the canvas is ours (caller should skip its 2D field),
 *          false when WebGL is unavailable (caller should draw its 2D field).
 */
export function initSpaceField3D(bag: Bag): boolean {
  const canvas = document.getElementById('space-canvas') as HTMLCanvasElement | null;
  if (!canvas) return false;
  if (!supportsWebGL(canvas)) return false;

  // A route change can unmount before the chunk lands; don't build into a
  // canvas whose page has already gone.
  let cancelled = false;
  bag.add(() => {
    cancelled = true;
  });

  import('./space-field-3d')
    .then((m) => {
      if (!cancelled) m.mountSpaceField(bag, canvas);
    })
    .catch(() => {
      // Chunk failed to load. We already claimed the canvas, so there is no
      // going back to the 2D field — but the page sits on a dark background
      // anyway, so the result is a plain night sky rather than a broken one.
    });

  return true;
}
