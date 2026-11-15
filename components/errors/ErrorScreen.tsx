import Link from 'next/link';
import type { ReactNode } from 'react';
import './error-screen.css';

interface ErrorScreenProps {
  /** The big orbited text: a status code, or a word for errors without one. */
  code: string;
  /** Status pill, e.g. "Error 404 · Page not found". */
  label: string;
  title: string;
  text: ReactNode;
  /** 'server' (5xx and crashes) turns the status light amber. */
  tone?: 'client' | 'server';
  /** A second button beside Back to home. */
  secondary?: ReactNode;
  /** The page's illustration (components/errors/artworks.tsx). */
  art?: ReactNode;
  /** A plain <a> home instead of <Link>: global-error can't trust the router. */
  hardHome?: boolean;
}

/**
 * The cosmic error screen every error page shares: starfield, the page's
 * illustration, the code with a ring and a satellite around it, a status pill,
 * the message and a Back to home button. The art sits beside the words on wide
 * and landscape screens and above them on phones (error-screen.css). Self-contained (no space-canvas engine) so it renders as a static
 * export page and when the app itself has crashed.
 */
export default function ErrorScreen({ code, label, title, text, tone = 'client', secondary, art, hardHome }: ErrorScreenProps) {
  const Home = hardHome ? 'a' : Link;

  return (
    <main className="err-page" data-tone={tone}>
      <div className="err-stars" aria-hidden="true" />
      <div className="err-nebula" aria-hidden="true" />

      <Home href="/" className="err-logo" aria-label="Ruchira Edirisinghe - home">
        <img src="/Images/longlogo.svg" alt="" width={1762} height={446} decoding="async" />
      </Home>

      <div className="err-layout">
        {art && <div className="err-art">{art}</div>}

        <div className="err-content">
          {/* The pill below says the code in words; this is the picture of it. */}
          <div className={`err-hero${code.length > 3 ? ' err-hero--wide' : ''}`} aria-hidden="true">
            <span className="err-ring err-ring--back" />
            <p className="err-code">{code}</p>
            <span className="err-ring err-ring--front" />
            <span className="err-sat">
              <span className="err-sat-x">
                <span className="err-sat-y">
                  <span className="err-sat-dot" />
                </span>
              </span>
            </span>
          </div>

          <div>
            <p className="err-pill">
              <span className="err-dot" aria-hidden="true" />
              {label}
            </p>
          </div>
          <h1 className="err-title">{title}</h1>
          <p className="err-text">{text}</p>

          <div className="err-actions">
            <Home href="/" className="err-btn err-btn-primary">
              <HomeIcon />
              Back to home
            </Home>
            {secondary}
          </div>
        </div>
      </div>
    </main>
  );
}

/** A ghost-style link for the second button (See my work, Get in touch). */
export function ErrorLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="err-btn err-btn-ghost">
      {children}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}
