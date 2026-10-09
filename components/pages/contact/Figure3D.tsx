'use client';
import { type ReactNode, useEffect, useRef } from 'react';

/* A three.js figure (lib/scripts/contact-3d.ts), loaded only on the Contact
   page and only in the browser. The canvas fades in once the model has drawn;
   if WebGL or the download fails, `fallback` is shown instead. Visitors can
   drag (or use the arrow keys) to turn the figure, and tap it (or press
   Enter) to make it do something. */
export default function Figure3D({ kind, className, label, fallback }: {
  kind: 'desk' | 'astronaut'; className?: string; label: string; fallback: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import('@/lib/scripts/contact-3d')
      .then(({ mountFigure }) => { if (!cancelled) dispose = mountFigure(host, kind); })
      .catch(() => host.classList.add('is-failed'));
    return () => { cancelled = true; dispose?.(); };
  }, [kind]);

  return (
    <div
      ref={ref}
      className={`ct-3d ${className ?? ''}`}
      role="button"
      aria-roledescription="3D figure"
      tabIndex={0}
      aria-label={`${label}. Drag or use the arrow keys to turn it; tap or press Enter to see it move.`}
    >
      <div className="ct-3d-fallback">{fallback}</div>
      <span className="ct-3d-hint" aria-hidden="true">Drag to spin · Tap me</span>
    </div>
  );
}
