'use client';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import StandardShell from '@/components/StandardShell';
import Astronaut from '@/components/pages/contact/Astronaut';
import Figure3D from '@/components/pages/contact/Figure3D';
import { initContact } from '@/lib/scripts/contact';

/* Contact - three beats. A hero with the pitch, the two direct lines as
   buttons and a 3D scene of a developer typing at a desk on a floating
   platform; a bento of the channels as real links (email and WhatsApp large,
   the profiles in a row beneath); and "how I work", told beside the site's
   astronaut in 3D, sketching stardust with his golden pencil. Both scenes are three.js
   (lib/scripts/contact-3d.ts); without WebGL the vector planet and astronaut
   stand in for them. */

const EMAIL = 'ruchira.ed@proton.me';
const PHONE = '+94 77 400 9851';

const ARROW = <path d="M7 17 17 7M8 7h9v9" />;

const ICON = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  chat: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-.9.9a3.6 3.6 0 0 1-2-2l.9-.9-1-2L9 9.5Z" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  // How-I-work steps
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" /><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" /></>,
  pen: <><path d="M4 20l1.2-4.6L15.6 5a2.1 2.1 0 0 1 3 0l.4.4a2.1 2.1 0 0 1 0 3L8.6 18.8 4 20Z" /><path d="M13.5 7l3.5 3.5" /></>,
  rocket: <><path d="M12 15l-3-3c1.6-4.7 4.8-7.6 10.5-8.5-.9 5.7-3.8 8.9-8.5 10.5Z" /><circle cx="15" cy="9" r="1.6" /><path d="M9 12H5.5L8 8.5h4M12 15v3.5l3.5-2.5v-4M6.5 16.5 4 20" /></>,
  sprout: <><path d="M12 21v-9" /><path d="M12 12C12 7.5 8.5 5 4 5c0 4.5 3.5 7 8 7Z" /><path d="M12 14.5c0-3.5 2.8-6 7.5-6 0 3.5-2.8 6-7.5 6Z" /></>,
};

/* Brand marks (Simple Icons paths, 24x24). */
const BRAND = {
  whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  behance: 'M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
};

type BrandId = keyof typeof BRAND;

interface Line {
  key: string; name: string; note: string; handle: string; href: string; color: string;
  desc: string; cta: string; icon: ReactNode; copy: string; copyLabel: string;
}
const LINES: Line[] = [
  {
    key: 'email', name: 'Email', note: 'Best for projects', handle: EMAIL, href: `mailto:${EMAIL}`, color: '#8cd2ff',
    desc: 'The best way to reach me about a project, a role or a collaboration idea, or anything you’d like a proper, thought-out reply to.',
    cta: 'Write an email', icon: ICON.mail, copy: EMAIL, copyLabel: 'Copy email address',
  },
  {
    key: 'whatsapp', name: 'WhatsApp / Call', note: 'Quick & urgent', handle: PHONE, href: 'https://wa.me/94774009851', color: '#4be38a',
    desc: 'Message or call me if something’s urgent, if you need a quick update, or if you’d just like to bounce some ideas around.',
    cta: 'Start a chat', icon: <path d={BRAND.whatsapp} />, copy: PHONE, copyLabel: 'Copy phone number',
  },
];

interface Profile { id: BrandId; name: string; note: string; handle: string; href: string; color: string; desc: string }
const PROFILES: Profile[] = [
  { id: 'linkedin', name: 'LinkedIn', note: 'Professional', handle: 'in/ruchiraedirisinghe', href: 'https://www.linkedin.com/in/ruchiraedirisinghe/', color: '#3d8bfd', desc: 'Work history and recommendations' },
  { id: 'github', name: 'GitHub', note: 'Open source', handle: '@ruchira-edirisinghe', href: 'https://github.com/ruchira-edirisinghe', color: '#e6edf3', desc: 'Code and technical projects' },
  { id: 'behance', name: 'Behance', note: 'Case studies', handle: 'ruchiraedirisinghe', href: 'https://www.behance.net/ruchiraedirisinghe', color: '#4d8dff', desc: 'UI/UX and creative work' },
  { id: 'instagram', name: 'Instagram', note: 'Day to day', handle: '@ruchii_zzz', href: 'https://www.instagram.com/ruchii_zzz/', color: '#ff5c93', desc: 'Process and behind the scenes' },
];

const STEPS = [
  {
    title: 'Discovery & Strategy', icon: ICON.target, color: '#8cd2ff',
    text: 'First, I spend time getting to know your goals, the people you’re building for and any limits we need to work within, like budget or deadlines. Together we’ll find the biggest opportunities and agree on a plan, so that every design decision later on has a clear reason behind it.',
  },
  {
    title: 'Design & Prototype', icon: ICON.pen, color: '#c39bff',
    text: 'Next, I turn that plan into detailed designs and clickable prototypes, so you can see and try your product before anything is built. I pay equal attention to how it looks and how it works, making sure people can find their way around easily and that the visuals feel true to your brand.',
  },
  {
    title: 'Build & Ship', icon: ICON.rocket, color: '#ffb84d',
    text: 'Then I build it using modern, reliable web technologies, with a focus on speed and accessibility. I keep the code clean and make sure everything works well on phones, tablets and desktops, so the finished product feels as good to use as it looks.',
  },
  {
    title: 'Iterate & Grow', icon: ICON.sprout, color: '#6dffb4',
    text: 'Launch day isn’t the end. I stick around to support your product and help it grow, using analytics and feedback from real users to see what’s working and what could be better. That way we can keep improving it over time and stay ahead of the competition.',
  },
];

/* What rides each orbit of the hero planet. */
const INNER: { icon: ReactNode; color: string; brand?: boolean }[] = [
  { icon: ICON.mail, color: '#8cd2ff' },
  { icon: <path d={BRAND.whatsapp} />, color: '#4be38a', brand: true },
];
const OUTER: { icon: ReactNode; color: string; brand?: boolean }[] = PROFILES.map((p) => ({
  icon: <path d={BRAND[p.id]} />, color: p.color, brand: true,
}));

const Svg = ({ children, className = 'ct-i' }: { children: ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);
const tint = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra }) as CSSProperties;

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

/** The hero graphic: a ringed planet sending out signal pulses, with the
    direct lines on a near orbit and the profiles on a far one. */
function CommsOrbit() {
  const orbit = (items: typeof INNER, cls: string) => (
    <div className={`ct-orbit ${cls}`}>
      {items.map((it, i) => (
        <span key={i} className="ct-sat" style={tint(it.color, { '--a': `${(360 / items.length) * i}deg` })}>
          <span className={it.brand ? 'ct-sat-in is-brand' : 'ct-sat-in'}><Svg>{it.icon}</Svg></span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ct-comms" aria-hidden="true">
      <span className="ct-pulse" /><span className="ct-pulse" /><span className="ct-pulse" />
      {orbit(OUTER, 'is-outer')}
      {orbit(INNER, 'is-inner')}
      <svg className="ct-planet" viewBox="0 0 240 240">
        <defs>
          <radialGradient id="ct-pl" cx="0.36" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#b9e6ff" />
            <stop offset="0.45" stopColor="#6c7dff" />
            <stop offset="1" stopColor="#2a1660" />
          </radialGradient>
          <linearGradient id="ct-ring" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8cd2ff" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#c39bff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffb84d" stopOpacity="0.2" />
          </linearGradient>
          <clipPath id="ct-pl-clip"><circle cx="120" cy="120" r="62" /></clipPath>
        </defs>
        {/* Back half of the ring, the planet, then the front half over it. */}
        <path d="M25 144a98 26 -14 0 1 190 -48" fill="none" stroke="url(#ct-ring)" strokeWidth="7" opacity="0.55" />
        <circle cx="120" cy="120" r="62" fill="url(#ct-pl)" />
        <g clipPath="url(#ct-pl-clip)" fill="none" strokeLinecap="round">
          <path d="M50 100q40-14 80-4t70-6" stroke="#fff" strokeWidth="6" opacity="0.12" />
          <path d="M52 126q36-10 74-2t76-4" stroke="#c39bff" strokeWidth="9" opacity="0.25" />
          <path d="M60 150q38-8 70 0t62-4" stroke="#fff" strokeWidth="4" opacity="0.1" />
          <circle cx="98" cy="96" r="40" fill="#fff" opacity="0.07" />
        </g>
        <path d="M215 96a98 26 -14 0 1 -190 48" fill="none" stroke="url(#ct-ring)" strokeWidth="7" />
      </svg>
    </div>
  );
}

export default function ContactClient() {
  useEffect(() => {
    const disposers = [initContact()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  const time = useColomboTime();
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState('');
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch { return; }
    setCopied(key);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(''), 1800);
  };

  return (
    <StandardShell
      active="contact"
      dataPage="contact"
      tagline={<>Connecting you with<br className="tagline-br" /> <span className="tagline-name">Ruchira Edirisinghe</span></>}
    >
      <div id="nav-fade-mask"></div>

      <main className="page ct">
        {/* ── Hero ── */}
        <section className="ct-hero" aria-labelledby="ct-h1">
          <div className="ct-hero-txt">
            <p className="ct-kicker">Let’s talk</p>
            <h1 className="ct-big" id="ct-h1">
              <span className="ct-plain">Ready To Make</span>
              <span className="ct-glow">Something Iconic?</span>
            </h1>
            <p className="ct-intro">
              If you’ve got a project in mind, want to team up on something interesting, or just feel like saying hello,
              I’d really like to hear from you. I’m always open to new opportunities, whether that’s a full-time role, a
              freelance job or a side project.
            </p>
            <div className="ct-actions">
              <a className="ct-btn is-solid" href={`mailto:${EMAIL}`}>
                <Svg>{ICON.mail}</Svg>Email me<span className="ct-btn-go"><Svg>{ARROW}</Svg></span>
              </a>
              <a className="ct-btn" href="https://wa.me/94774009851" target="_blank" rel="noopener noreferrer">
                <Svg className="ct-i is-brand"><path d={BRAND.whatsapp} /></Svg>WhatsApp
              </a>
            </div>
            <ul className="ct-meta">
              <li className="ct-avail"><i aria-hidden="true" />Available for new projects</li>
              <li><Svg>{ICON.pin}</Svg>Sri Lanka</li>
              <li><Svg>{ICON.clock}</Svg>{time ? <>{time} local time</> : 'GMT+5:30'}</li>
            </ul>
          </div>
          <div className="ct-hero-art">
            <Figure3D
              kind="desk"
              className="ct-3d-desk"
              label="A 3D developer in a wide-brimmed hat at a desk, waving up at floating cards while a cursor picks colours from a palette"
              fallback={<CommsOrbit />}
            />
          </div>
        </section>

        {/* ── Channels ── */}
        <section className="ct-sec" aria-labelledby="ct-channels">
          <header className="ct-head ct-rv">
            <p className="ct-kicker">Channels</p>
            <h2 className="ct-title" id="ct-channels">Pick Your Frequency</h2>
          </header>

          <ul className="ct-lines">
            {LINES.map((l, i) => (
              <li key={l.key} className="ct-rv" style={tint(l.color, { '--d': `${i * 0.08}s` })}>
                <a className="ct-line" href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Svg className="ct-line-mark">{l.icon}</Svg>
                  <span className="ct-line-top">
                    <span className="ct-ico"><Svg className={l.key === 'whatsapp' ? 'ct-i is-brand' : 'ct-i'}>{l.icon}</Svg></span>
                    <span className="ct-note">{l.note}</span>
                  </span>
                  <span className="ct-line-name">{l.name}</span>
                  <span className="ct-line-handle">{l.handle}</span>
                  <span className="ct-line-desc">{l.desc}</span>
                  <span className="ct-pill">{l.cta}<Svg>{ARROW}</Svg></span>
                </a>
                <button
                  type="button"
                  className={copied === l.key ? 'ct-copy is-done' : 'ct-copy'}
                  onClick={() => copy(l.key, l.copy)}
                  aria-label={l.copyLabel}
                >
                  <Svg>{copied === l.key ? ICON.check : ICON.copy}</Svg>
                  <span>{copied === l.key ? 'Copied' : 'Copy'}</span>
                </button>
              </li>
            ))}
          </ul>

          <ul className="ct-profiles">
            {PROFILES.map((p, i) => (
              <li key={p.id} className="ct-rv" style={tint(p.color, { '--d': `${0.16 + i * 0.06}s` })}>
                <a className="ct-prof" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}: ${p.handle} (opens in a new tab)`}>
                  <Svg className="ct-prof-mark"><path d={BRAND[p.id]} /></Svg>
                  <span className="ct-ico"><Svg className="ct-i is-brand"><path d={BRAND[p.id]} /></Svg></span>
                  <span className="ct-note">{p.note}</span>
                  <b>{p.name}</b>
                  <span className="ct-prof-handle">{p.handle}</span>
                  <span className="ct-prof-desc">{p.desc}</span>
                  <Svg className="ct-i ct-go">{ARROW}</Svg>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── How I work ── */}
        <section className="ct-sec ct-work" aria-labelledby="ct-work">
          <div className="ct-space ct-rv">
            <span className="ct-neb is-a" aria-hidden="true" />
            <span className="ct-neb is-b" aria-hidden="true" />
            <span className="ct-neb is-c" aria-hidden="true" />
            <span className="ct-ring" aria-hidden="true" />
            <span className="ct-moon" aria-hidden="true" />
            {[
              [12, 18, 0], [82, 12, 1.2], [90, 58, 2.4], [8, 72, 0.8], [62, 88, 1.8], [30, 40, 3], [72, 34, 2],
            ].map(([x, y, d]) => (
              <span key={`${x}-${y}`} className="ct-star" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} aria-hidden="true" />
            ))}
            <Figure3D
              kind="astronaut"
              className="ct-3d-astro"
              label="A 3D astronaut floating in space with a giant ornate golden pencil, sketching a trail of stardust"
              fallback={<Astronaut className="ct-astro" />}
            />
          </div>

          <div className="ct-work-txt">
            <header className="ct-rv">
              <p className="ct-kicker">Collaboration philosophy</p>
              <h2 className="ct-title" id="ct-work">
                <span className="ct-plain">Solving Problems,</span>
                <span className="ct-glow">One Pixel At A Time</span>
              </h2>
              <p className="ct-para">
                The best digital products start with a good conversation. Whether you come with a detailed brief or just a
                rough idea, I’ll help you shape it into something you’re proud of, keep you in the loop at every stage and
                focus on what actually makes a difference to your users. Here’s roughly how a project with me goes.
              </p>
            </header>

            <ol className="ct-steps">
              {STEPS.map((s, i) => {
                const open = step === i;
                return (
                  <li key={s.title} className="ct-step ct-rv" data-open={open} style={tint(s.color, { '--d': `${i * 0.08}s` })}>
                    <button
                      type="button"
                      className="ct-step-btn"
                      aria-expanded={open}
                      aria-controls={`ct-step-${i}`}
                      onClick={() => setStep(i)}
                    >
                      <span className="ct-step-ico"><Svg>{s.icon}</Svg></span>
                      <span className="ct-step-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="ct-step-title">{s.title}</span>
                      <span className="ct-step-tog" aria-hidden="true" />
                    </button>
                    <div className="ct-step-body" id={`ct-step-${i}`} role="region" aria-label={s.title}>
                      <div><p>{s.text}</p></div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </main>
    </StandardShell>
  );
}
