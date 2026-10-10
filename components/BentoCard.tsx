import type { CSSProperties, ReactNode } from 'react';

/* The brand-tinted bento cards from Quick Links (profiles, Zenitron Gaming
   channels), shared with the About page's gaming section. Styles:
   styles/bento-cards.css. Outside links - components/ExternalGuard asks first. */

/* Brand marks (Simple Icons paths, 24x24). */
export const BRAND = {
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  behance: 'M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  youtube: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  tiktok: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.65a8.23 8.23 0 004.84 1.55V6.75a4.85 4.85 0 01-1.07-.06z',
  twitch: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
  kick: 'M37 .036h164.448v113.621h54.71v-56.82h54.731V.036h164.448v170.777h-54.73v56.82h-54.711v56.8h54.71v56.82h54.73V512.03H310.89v-56.82h-54.73v-56.8h-54.711v113.62H37V.036z',
};

export interface Channel { id: keyof typeof BRAND; name: string; handle: string; href: string; color: string; stat: string; unit: string; kind: string; cta?: string; live?: boolean }
export const ZEN_CHANNELS: Channel[] = [
  { id: 'youtube', name: 'YouTube', handle: '@zenitrongaming', href: 'https://www.youtube.com/@zenitrongaming', color: '#ff4040', stat: '375+', unit: 'subscribers', kind: 'Videos', cta: 'Subscribe' },
  { id: 'tiktok', name: 'TikTok', handle: '@zenitrongaming', href: 'https://www.tiktok.com/@zenitrongaming', color: '#25f4ee', stat: '1.2K', unit: 'followers', kind: 'Clips' },
  { id: 'facebook', name: 'Facebook', handle: '@zenitrongaming', href: 'https://www.facebook.com/gaming/zenitrongaming', color: '#4b93ff', stat: '440+', unit: 'followers', kind: 'Gaming', live: true },
  { id: 'twitch', name: 'Twitch', handle: '@zenitrongaminglive', href: 'https://www.twitch.tv/zenitrongaminglive', color: '#a970ff', stat: '20+', unit: 'followers', kind: 'Streams', live: true },
  { id: 'kick', name: 'Kick', handle: '@zenitrongaminglive', href: 'https://kick.com/zenitrongaminglive', color: '#53fc18', stat: '20+', unit: 'followers', kind: 'Streams', live: true },
];

const ARROW = <path d="M7 17 17 7M8 7h9v9" />;
const Svg = ({ children, className = 'ql-i' }: { children: ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);
const Brand = ({ id, className }: { id: keyof typeof BRAND; className: string }) => (
  // Kick's mark is drawn on a 512 grid; every other one on 24.
  <svg className={className} viewBox={id === 'kick' ? '0 0 512 512' : '0 0 24 24'} aria-hidden="true"><path d={BRAND[id]} /></svg>
);
const tint = (c: string) => ({ '--c': c }) as CSSProperties;

/** One card of a bento grid: brand-tinted, its mark oversized in the corner.
    Wide cards end in a white pill; the paired ones carry an arrow or a Live tag. */
export function BentoCard({ id, name, href, color, note, sub, cta, live, label }: {
  id: keyof typeof BRAND; name: string; href: string; color: string;
  note: string; sub: string; cta?: string; live?: boolean; label: string;
}) {
  return (
    <li className={cta ? 'is-wide' : undefined}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={tint(color)} aria-label={label}>
        <Brand id={id} className="ql-soc-mark" />
        <span className="ql-soc-ico"><Brand id={id} className="ql-b" /></span>
        <span className="ql-soc-txt">
          <span className="ql-soc-note">{note}</span>
          <b>{name}</b>
          <span>{sub}</span>
        </span>
        {cta
          ? <span className="ql-soc-cta">{cta}<Svg>{ARROW}</Svg></span>
          : live
            ? <span className="ql-live"><i />Live</span>
            : <Svg className="ql-i ql-go">{ARROW}</Svg>}
      </a>
    </li>
  );
}
