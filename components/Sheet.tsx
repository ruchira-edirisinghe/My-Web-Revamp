'use client';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';
import { prefersReducedMotion } from '@/lib/scripts/_util';

/* The site's popup: a centred card on desktop, a bottom sheet on phones that
   slides up on open and folds back down on close (styles/ext-guard.css).
   It stays mounted until the closing animation ends, then calls `onClosed`.
   While open the page is frozen in place (lib/scroll-lock), Escape and a tap
   outside close it, and Tab stays inside. The element marked data-autofocus
   (or the first button) takes focus. */
export default function Sheet({ open, onClose, onClosed, color = '#8cd2ff', labelledBy, describedBy, children }: {
  open: boolean;
  onClose: () => void;
  onClosed?: () => void;
  color?: string;
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const closedRef = useRef(onClosed);
  closedRef.current = onClosed;

  useEffect(() => {
    if (open) { setMounted(true); setClosing(false); return; }
    if (!mounted) return;
    if (prefersReducedMotion()) { setMounted(false); closedRef.current?.(); }
    else setClosing(true);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mounted) return;
    lockScroll();
    const el = card.current;
    (el?.querySelector<HTMLElement>('[data-autofocus]') || el?.querySelector<HTMLElement>('button, a[href]'))?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeRef.current(); return; }
      if (e.key !== 'Tab' || !el) return;
      const stops = Array.from(el.querySelectorAll<HTMLElement>('button, a[href]'));
      const i = stops.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); stops[stops.length - 1]?.focus(); }
      else if (!e.shiftKey && i === stops.length - 1) { e.preventDefault(); stops[0]?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); unlockScroll(); };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <div
      className={`xg${closing ? ' is-out' : ''}`}
      style={{ '--c': color } as CSSProperties}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={card}
        className="xg-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onAnimationEnd={(e) => {
          if (!closing || e.target !== e.currentTarget) return;
          setMounted(false);
          setClosing(false);
          closedRef.current?.();
        }}
      >
        <span className="xg-grab" aria-hidden="true" />
        {children}
      </div>
    </div>,
    document.body,
  );
}
