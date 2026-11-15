'use client';

/**
 * Try again: reloads the page, or calls onRetry (error.tsx passes Next's
 * reset()). On a host that serves /errors/<code>/ in place of the failed URL,
 * a reload asks for that URL again.
 */
export default function RetryButton({ onRetry }: { onRetry?: () => void }) {
  return (
    <button type="button" className="err-btn err-btn-ghost" onClick={onRetry ?? (() => window.location.reload())}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <polyline points="21 3 21 9 15 9" />
      </svg>
      Try again
    </button>
  );
}
