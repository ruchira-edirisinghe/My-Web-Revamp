import Link from 'next/link';
import type { Metadata } from 'next';
import './not-found.css';

export const metadata: Metadata = {
  title: 'Page not found - Ruchira Edirisinghe',
  description: 'This page drifted out of orbit. Head back to the homepage or browse the work.',
};

/**
 * Branded cosmic 404. Self-contained (no space-canvas engine dependency) so it
 * renders reliably as the static-export 404.html. A pure-CSS starfield + nebula
 * keep it on-theme without any JS. Every path here leads back into the site.
 */
export default function NotFound() {
  return (
    <main className="nf-page">
      <div className="nf-stars" aria-hidden="true" />
      <div className="nf-nebula" aria-hidden="true" />

      <div className="nf-content">
        <p className="nf-code">404</p>
        <h1 className="nf-title">This page drifted out of orbit</h1>
        <p className="nf-text">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get
          you back to familiar stars.
        </p>
        <div className="nf-actions">
          <Link href="/" className="nf-btn nf-btn-primary">
            Back to home
          </Link>
          <Link href="/projects" className="nf-btn nf-btn-ghost">
            See my work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
