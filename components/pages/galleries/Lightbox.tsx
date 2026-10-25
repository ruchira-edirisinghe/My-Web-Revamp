'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';
import { sfxClick } from '@/lib/sfx';

export interface Slide {
  thumb: string;
  full: string;
  title: string;
  tag?: string;
  sub?: string;
  /** Aspect ratio (w / h), so the frame is the right shape before the image arrives. */
  r: number;
  /** Full-resolution original for the Download button (wallpapers). */
  original?: string;
}

/**
 * The full-screen viewer for the graphic galleries. Steps through every piece
 * on the page: arrow buttons, the arrow keys, or a swipe on a phone. The
 * thumbnail shows at once (it's already loaded) and the full-size image fades
 * in over it. Esc, the close button or a click on the backdrop closes it, and
 * focus goes back to the piece that opened it. On a downloadable collection
 * the Download button first shows a thank-you card that counts down from 3
 * and then starts the download (DownloadCard below). Styles: graphic.css.
 */
export default function Lightbox({ slides, index, accent, download, noun = 'image', phone = false, onIndex, onClose }: {
  slides: Slide[];
  index: number;
  accent: string;
  download?: boolean;
  /** What a piece is called in the download card ("wallpaper", "artwork"). */
  noun?: string;
  /** Wallpapers: the card talks about the visitor's phone. */
  phone?: boolean;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dir, setDir] = useState(0);
  const [dl, setDl] = useState<{ href: string; name: string; title: string } | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const s = slides[index];
  const n = slides.length;

  const go = useCallback((d: number) => { setDir(d); onIndex((index + d + n) % n); }, [index, n, onIndex]);
  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 260);
  }, [onClose]);

  useEffect(() => {
    opener.current = document.activeElement;
    lockScroll();
    closeBtn.current?.focus();
    return () => {
      unlockScroll();
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => setLoaded(false), [index]);

  // Warm the neighbours so stepping through is instant.
  useEffect(() => {
    for (const d of [1, -1]) { const img = new Image(); img.src = slides[(index + d + n) % n].full; }
  }, [index, n, slides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (dl) { if (e.key === 'Escape') setDl(null); return; }
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, go, dl]);

  // Downloads get the full-resolution original under a readable name
  // ("Himiko Toga 01 - Ruchira Edirisinghe.jpg"); otherwise the link just
  // opens the large web version in a new tab.
  const file = download && s.original ? s.original : s.full;
  const name = download ? `${s.title} - Ruchira Edirisinghe.${file.split('.').pop()}` : undefined;

  return createPortal(
    <div
      className={`gx-lb${closing ? ' is-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${s.title} (${index + 1} of ${n})`}
      style={{ '--a': accent } as React.CSSProperties}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onTouchStart={(e) => { if (dl) return; touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => {
        const t = touch.current;
        touch.current = null;
        if (!t) return;
        const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="gx-lb-top">
        <span className="gx-lb-count"><b>{String(index + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</span>
        <div className="gx-lb-acts">
          {download && <a className="gx-lb-btn" href={file} target="_blank" rel="noopener noreferrer" download={name}
            onClick={(e) => {
              if (!name) return;
              e.preventDefault();
              setDl({ href: file, name, title: s.title });
            }}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 16.5h12" /></svg>Download
          </a>}
          <button ref={closeBtn} type="button" className="gx-lb-x" onClick={close} aria-label="Close">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
          </button>
        </div>
      </div>

      <figure className="gx-lb-fig" key={index} data-dir={dir} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="gx-lb-img" style={{ '--r': s.r } as React.CSSProperties}>
          <img className="gx-lb-low" src={s.thumb} alt="" aria-hidden="true" />
          <img className={`gx-lb-hi${loaded ? ' on' : ''}`} src={s.full} alt={s.title} onLoad={() => setLoaded(true)} decoding="async" />
        </div>
        <figcaption className="gx-lb-cap">
          {s.tag && <span className="gx-lb-tag">{s.tag}</span>}
          <b>{s.title}</b>
          {s.sub && <p>{s.sub}</p>}
        </figcaption>
      </figure>

      {dl && <DownloadCard {...dl} noun={noun} phone={phone} onDone={() => setDl(null)} />}

      {n > 1 && (
        <>
          <button type="button" className="gx-lb-nav is-prev" onClick={() => go(-1)} aria-label="Previous">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12.5 4-6 6 6 6" /></svg>
          </button>
          <button type="button" className="gx-lb-nav is-next" onClick={() => go(1)} aria-label="Next">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" /></svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}

/** Neon confetti for the thank-you: the site's accent colours, fanned out
 *  from the ring. Positions are fixed per index so every burst looks the same. */
const CONFETTI_COLOURS = ['#5ce0ff', '#bc6fff', '#ff6bd5', '#6dff8a', '#ffd166'];
const CONFETTI = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2 + (i % 2 ? 0.11 : -0.07);
  const dist = 90 + ((i * 37) % 70);
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist * 0.8 - 20),
    r: (i * 53) % 360,
    c: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
    d: (i % 7) * 25,
    round: i % 3 === 0,
  };
});

/** The card shown when a piece downloads: a ring counts down 3, 2, 1, then
 *  the download starts and the card turns into a thank-you, with a confetti
 *  burst and a "Download again" button in case the browser blocked it.
 *  "Download now" skips the wait; Cancel or Esc backs out before it starts. */
function DownloadCard({ href, name, title, noun, phone, onDone }: {
  href: string; name: string; title: string; noun: string; phone: boolean; onDone: () => void;
}) {
  const [left, setLeft] = useState(3);
  const started = left <= 0;
  const btn = useRef<HTMLButtonElement>(null);
  const ext = (name.split('.').pop() || '').toUpperCase();

  const start = useCallback(() => {
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    sfxClick(true);
  }, [href, name]);

  useEffect(() => { btn.current?.focus(); }, [started]);

  useEffect(() => {
    if (started) { start(); return; }
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [left, started, start]);

  return (
    <div className="gx-dl" role="alertdialog" aria-modal="true" aria-labelledby="gx-dl-t" aria-describedby="gx-dl-d"
      onClick={(e) => { if (e.target === e.currentTarget) onDone(); }}>
      <div className={`gx-dl-card${started ? ' is-done' : ''}`}>
        {started && (
          <div className="gx-dl-confetti" aria-hidden="true">
            {CONFETTI.map((p, i) => (
              <i key={i} className={p.round ? 'is-dot' : undefined} style={{
                '--x': `${p.x}px`, '--y': `${p.y}px`, '--rot': `${p.r}deg`, '--c': p.c, '--d': `${p.d}ms`,
              } as React.CSSProperties} />
            ))}
          </div>
        )}
        <div className="gx-dl-ring" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <circle className="gx-dl-track" cx="50" cy="50" r="44" />
            <circle className="gx-dl-prog" cx="50" cy="50" r="44" pathLength="100" />
          </svg>
          {started ? (
            <svg className="gx-dl-tick" viewBox="0 0 20 20"><path d="m5 10.5 3.2 3.2L15 7" /></svg>
          ) : (
            <b key={left}>{left}</b>
          )}
        </div>
        <h2 id="gx-dl-t">{started ? 'Thank you!' : `Your ${noun} is on its way`}</h2>
        <p id="gx-dl-d">
          {started ? (
            <><strong>{title}</strong> is downloading in full resolution. {phone ? 'I hope it looks great on your phone.' : 'I hope you enjoy it as much as I enjoyed making it.'}</>
          ) : (
            <>The full-resolution <strong>{title}</strong> will start downloading in {left} second{left === 1 ? '' : 's'}.</>
          )}
        </p>
        {started && (
          <div className="gx-dl-meta">
            <span className="gx-dl-chip">{ext ? `${ext} · ` : ''}Full resolution</span>
          </div>
        )}
        <span className="gx-sr" aria-live="polite">{started ? 'Download started. Thank you!' : `${left}`}</span>
        {started && <p className="gx-dl-hint">Didn&apos;t start? Use Download again.</p>}
        <div className="gx-dl-acts">
          {started ? (
            <>
              <a className="gx-dl-btn is-ghost" href={href} download={name} onClick={() => sfxClick(true)}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 16.5h12" /></svg>
                Download again
              </a>
              <button ref={btn} type="button" className="gx-dl-btn is-main" onClick={onDone}>Done</button>
            </>
          ) : (
            <>
              <button type="button" className="gx-dl-btn" onClick={onDone}>Cancel</button>
              <button ref={btn} type="button" className="gx-dl-btn is-main" onClick={() => setLeft(0)}>Download now</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
