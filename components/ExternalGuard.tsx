'use client';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import '@/styles/ext-guard.css';

/* "You're leaving the site" confirmation, for every page (mounted once in
   app/layout.tsx). A delegated click listener catches any link to another
   site, asks first, and opens the destination in a new tab on Continue.
   Ctrl/Cmd/Shift/middle clicks are left to the browser - those already say
   "new tab". A link opts out with data-no-guard; a click an earlier handler
   already took (defaultPrevented) is left alone. */

interface Brand { name: string; c: string; d: string }
/* Simple Icons paths (24x24) for the places this site links to most. */
const BRANDS: Record<string, Brand> = {
  'linkedin.com': { name: 'LinkedIn', c: '#2f8cff', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  'github.com': { name: 'GitHub', c: '#e6edf3', d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  'behance.net': { name: 'Behance', c: '#3d7bff', d: 'M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z' },
  'instagram.com': { name: 'Instagram', c: '#ff5fa2', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  'youtube.com': { name: 'YouTube', c: '#ff4b4b', d: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  'facebook.com': { name: 'Facebook', c: '#4b8bff', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  'tiktok.com': { name: 'TikTok', c: '#4ff0e6', d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  'wa.me': { name: 'WhatsApp', c: '#4be38a', d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
};
const ALIAS: Record<string, string> = { 'youtu.be': 'youtube.com', 'fb.com': 'facebook.com', 'api.whatsapp.com': 'wa.me', 'whatsapp.com': 'wa.me' };
const NAMES: Record<string, string> = {
  'coursera.org': 'Coursera', 'credly.com': 'Credly', 'drive.google.com': 'Google Drive', 'figma.com': 'Figma',
  'dribbble.com': 'Dribbble', 'vercel.app': 'the live site', 'itch.io': 'itch.io',
};
const GLOBE = <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>;

interface Pending { url: string; host: string; title: string; detail: string; brand?: Brand; label: string; c: string }

function describe(a: HTMLAnchorElement, url: URL): Pending {
  const host = url.hostname.replace(/^www\./, '');
  const key = ALIAS[host] || Object.keys(BRANDS).find((k) => host === k || host.endsWith('.' + k));
  const brand = key ? BRANDS[ALIAS[host] || key] : undefined;
  const named = brand?.name || Object.entries(NAMES).find(([k]) => host === k || host.endsWith('.' + k))?.[1] || host;
  // A card's first line is its name; the rest (issuer, year...) is noise here.
  const raw = a.dataset.name || a.getAttribute('aria-label') || (a.innerText || a.textContent || '').trim().split('\n')[0];
  const text = raw.replace(/\(opens.*?\)/i, '').replace(/\s+/g, ' ').trim();
  return {
    url: url.href, host, brand, label: named,
    title: text && text.length <= 70 ? text : `Open ${named}`,
    detail: a.dataset.detail || '',
    c: brand?.c || '#8cd2ff',
  };
}

const Svg = ({ children, cls }: { children: ReactNode; cls?: string }) => (
  <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);

export default function ExternalGuard() {
  const [p, setP] = useState<Pending | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const stayRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setP(null);
    opener.current?.focus?.({ preventScroll: true });
    opener.current = null;
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.hasAttribute('download') || a.closest('[data-no-guard]')) return;
      let url: URL;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (!/^https?:$/.test(url.protocol) || url.host === location.host) return;
      e.preventDefault();
      opener.current = a;
      setP(describe(a, url));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!p) return;
    // The safe choice takes focus, so a stray Enter doesn't leave the site.
    stayRef.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const stops = Array.from(document.querySelectorAll<HTMLElement>('.xg-card button'));
      const i = stops.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); stops[stops.length - 1]?.focus(); }
      else if (!e.shiftKey && i === stops.length - 1) { e.preventDefault(); stops[0]?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { html.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [p, close]);

  const go = () => {
    if (!p) return;
    window.open(p.url, '_blank', 'noopener,noreferrer');
    close();
  };

  if (!p) return null;
  return (
    <div className="xg" onClick={(e) => { if (e.target === e.currentTarget) close(); }} style={{ '--c': p.c } as CSSProperties}>
      <div className="xg-card" role="dialog" aria-modal="true" aria-labelledby="xg-title" aria-describedby="xg-desc">
        <span className="xg-grab" aria-hidden="true" />
        <div className="xg-orb" aria-hidden="true">
          <span className="xg-orb-ring" />
          {p.brand
            ? <Svg cls="xg-orb-icon is-brand"><path d={p.brand.d} /></Svg>
            : <Svg cls="xg-orb-icon">{GLOBE}</Svg>}
        </div>
        <p className="xg-kicker">Leaving the site</p>
        <h2 id="xg-title" className="xg-title">{p.title}</h2>
        {p.detail && <p className="xg-detail">{p.detail}</p>}
        <p id="xg-desc" className="xg-desc">
          This opens <strong>{p.label}</strong> in a new tab. This page stays right where you left it.
        </p>
        <div className="xg-dest" title={p.url}>
          <Svg cls="xg-lock"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>
          <span>{p.host}</span>
          <Svg cls="xg-newtab"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></Svg>
        </div>
        <div className="xg-actions">
          <button ref={stayRef} type="button" className="xg-btn" onClick={close}>Stay here</button>
          <button type="button" className="xg-btn is-go" onClick={go}>
            Continue
            <Svg><path d="M7 17 17 7M8 7h9v9" /></Svg>
          </button>
        </div>
      </div>
    </div>
  );
}
