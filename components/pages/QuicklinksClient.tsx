'use client';
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initQuicklinks } from '@/lib/scripts/quicklinks';
import { BentoCard, BRAND, ZEN_CHANNELS as CHANNELS } from '@/components/BentoCard';

/* Quick Links - the page behind a bio link or a QR code, so it is built for a
   phone held in one hand. It speaks the rest of the site's language: the home
   hero's portrait and name, then sections that each open with a kicker and a
   Burgundia title over a numbered glass panel, like the About page's tech stack.
   Every link opens on the first tap. */

const EMAIL = 'ruchira.ed@proton.me';
const WHATSAPP = 'https://wa.me/94774009851';
const VCARD = '/ruchira-edirisinghe.vcf';

const ARROW = <path d="M7 17 17 7M8 7h9v9" />;

const ICON = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  chat: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-.9.9a3.6 3.6 0 0 1-2-2l.9-.9-1-2L9 9.5Z" /></>,
  save: <><circle cx="10" cy="8" r="3.5" /><path d="M3.5 19a6.5 6.5 0 0 1 11-4.7M18 14v6M15 17h6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></>,
  case: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  palette: <><path d="M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.9 1.4-2l-.3-.8c-.4-1.1.4-2.2 1.6-2.2H17a4 4 0 0 0 4-4c0-5-4-9-9-9Z" /><circle cx="7.5" cy="11" r="1.2" /><circle cx="10" cy="7" r="1.2" /><circle cx="15" cy="7.5" r="1.2" /></>,
};

/** `cta` marks a wide bento card; the rest pair up side by side. */
interface Profile { id: keyof typeof BRAND; name: string; handle: string; href: string; color: string; note: string; cta?: string }
const PROFILES: Profile[] = [
  { id: 'linkedin', name: 'LinkedIn', handle: 'in/ruchiraedirisinghe', href: 'https://www.linkedin.com/in/ruchiraedirisinghe/', color: '#3d8bfd', note: 'Professional', cta: 'Connect' },
  { id: 'github', name: 'GitHub', handle: '@ruchira-edirisinghe', href: 'https://github.com/ruchira-edirisinghe', color: '#e6edf3', note: 'Open source' },
  { id: 'behance', name: 'Behance', handle: 'ruchiraedirisinghe', href: 'https://www.behance.net/ruchiraedirisinghe', color: '#4d8dff', note: 'Case studies' },
  { id: 'instagram', name: 'Instagram', handle: '@ruchii_zzz', href: 'https://www.instagram.com/ruchii_zzz/', color: '#ff5c93', note: 'Day to day', cta: 'Follow' },
];

const PAGES = [
  { href: '/projects/', label: 'Projects', note: '30+ case studies', icon: ICON.grid, color: '#8cd2ff' },
  { href: '/projects/graphic/', label: 'Graphics', note: 'Artwork & logos', icon: ICON.palette, color: '#ffb84d' },
  { href: '/experience/', label: 'Experience', note: 'Career timeline', icon: ICON.case, color: '#6dffb4' },
  { href: '/about/', label: 'About', note: 'Story & stack', icon: ICON.user, color: '#c39bff' },
];

const Svg = ({ children, className = 'ql-i' }: { children: ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);
const tint = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra }) as CSSProperties;

/** A site-style section: kicker + Burgundia title, then a glass panel - the
    About tech-stack panel. */
function Section({ id, step, accent, kicker, title, children }: {
  id: string; step: number; accent: string; kicker: string; title: ReactNode; children: ReactNode;
}) {
  return (
    <section className="ql-sec ql-rv" style={{ '--r': step, '--a': accent } as CSSProperties} aria-labelledby={id}>
      <div className="ql-head">
        <p className="ql-kicker">{kicker}</p>
        <h2 className="ql-title" id={id}>{title}</h2>
      </div>
      <div className="ql-panel">
        {children}
      </div>
    </section>
  );
}

/** Local time in Colombo, ticking each minute. Empty until mounted so the
    static HTML never disagrees with the visitor's clock. */
function useColomboTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit' });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function QuicklinksClient() {
  useEffect(() => {
    const disposers = [initQuicklinks()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  const time = useColomboTime();
  // The scroll cue (phones only, see links-deck.css) goes once the visitor scrolls.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => { if (window.scrollY > 60) { setScrolled(true); window.removeEventListener('scroll', on); } };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <StandardShell
      active="links"
      dataPage="links"
      tagline={<>Opening The Gateway To My <span className="tagline-name">Digital Presence</span></>}
    >
      <main className="ql">
        <div className="ql-deck">
          {/* ── Hero: portrait, roles, name and the direct lines ── */}
          <header className="ql-hero ql-rv" style={{ '--r': 0 } as CSSProperties}>
            <div className="ql-avatar">
              <span className="ql-avatar-glow" aria-hidden="true" />
              <span className="ql-avatar-dash" aria-hidden="true" />
              <span className="ql-avatar-ring" aria-hidden="true" />
              <span className="ql-avatar-orbit" aria-hidden="true"><i /></span>
              <div className="ql-photo">
                <img src="/Images/links/portrait.webp" alt="Ruchira Edirisinghe" width={560} height={560} decoding="async" />
              </div>
            </div>
            <p className="ql-sub">UI UX Engineer <span aria-hidden="true">|</span> Game Developer<br />Vibe Coding Enthusiast</p>
            <h1 className="ql-name">Ruchira Edirisinghe</h1>
            <p className="ql-status"><i aria-hidden="true" />Available for new projects</p>
            <p className="ql-meta">
              <span><Svg>{ICON.pin}</Svg>Sri Lanka</span>
              <span><Svg>{ICON.clock}</Svg>{time ? <><time>{time}</time>&nbsp;local time</> : 'GMT+5:30'}</span>
            </p>
            <div className="ql-cta">
              <a className="ql-btn ql-btn-outline" href={`mailto:${EMAIL}`} style={tint('#8cd2ff')}>
                <Svg>{ICON.mail}</Svg>Email
              </a>
              <a className="ql-btn ql-btn-outline" href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={tint('#5ee38a')}>
                <Svg>{ICON.chat}</Svg>WhatsApp
              </a>
              <a className="ql-btn ql-btn-solid ql-btn-wide" href={VCARD} download="Ruchira-Edirisinghe.vcf">
                <Svg>{ICON.save}</Svg>Save contact
              </a>
            </div>
          </header>

          <div className="ql-flow">
            {/* ── 01 Portfolio ── */}
            <Section id="ql-port" step={1} accent="#c39bff" kicker="Explore my work" title="The Portfolio">
              <Link href="/" className="ql-portal">
                <span className="ql-portal-orbits" aria-hidden="true">
                  <i /><i /><i />
                  <span className="ql-portal-core" />
                </span>
                <span className="ql-portal-txt">
                  <span className="ql-portal-kick">The full site</span>
                  <b>Enter the Portfolio</b>
                  <span className="ql-portal-url"><Svg>{ICON.globe}</Svg>ruchira-edirisinghe.vercel.app</span>
                </span>
                <span className="ql-portal-go" aria-hidden="true"><Svg>{ARROW}</Svg></span>
              </Link>
              <nav className="ql-tiles" aria-label="Portfolio pages">
                {PAGES.map((pg, i) => (
                  <Link key={pg.href} href={pg.href} className="ql-tile" style={tint(pg.color)}>
                    <span className="ql-tile-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ql-node-ico"><Svg>{pg.icon}</Svg></span>
                    <span className="ql-tile-txt"><b>{pg.label}</b><span>{pg.note}</span></span>
                    <Svg className="ql-i ql-go">{ARROW}</Svg>
                  </Link>
                ))}
              </nav>
            </Section>

            {/* ── 02 Profiles ── */}
            <Section id="ql-social" step={2} accent="#4d8dff" kicker="Find me online" title="Socials">
              <ul className="ql-bento">
                {PROFILES.map((pr) => (
                  <BentoCard key={pr.id} id={pr.id} name={pr.name} href={pr.href} color={pr.color}
                    note={pr.note} sub={pr.handle} cta={pr.cta} label={`${pr.name} - ${pr.handle}`} />
                ))}
              </ul>
            </Section>

            {/* ── 03 Zenitron Gaming ── */}
            <Section id="ql-zen" step={3} accent="#ff8a3d" kicker="Watch me play"
              title={<img className="ql-zen-logo" src="/Images/links/zenitron-logo.webp" alt="Zenitron Gaming" width={840} height={304} decoding="async" />}>
              <ul className="ql-bento">
                {CHANNELS.map((c) => (
                  <BentoCard key={c.id} id={c.id} name={c.name} href={c.href} color={c.color}
                    note={c.kind} sub={`${c.stat} ${c.unit}`} cta={c.cta} live={c.live}
                    label={`${c.name} - ${c.handle}, ${c.stat} ${c.unit}${c.live ? ', streams live' : ''}`} />
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <p className={`ql-scroll${scrolled ? ' is-gone' : ''}`} aria-hidden="true">
          Scroll for more<span className="ql-scroll-chev"><i /><i /></span>
        </p>
      </main>
    </StandardShell>
  );
}
