'use client';
import { type CSSProperties, type PointerEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';

/* Projects hub - the fork between the two halves of the portfolio, sized to
   one desktop screen. Two image panels share the width; the one under the
   pointer widens, reveals its description, chips and button, and carries a
   light that follows the cursor while its picture drifts with it. The other
   dims and its title steps back. An "or" rides the seam between them. */

interface Path {
  href: string;
  img: string;
  color: string;
  label: string;
  title: [string, string];
  count: string;
  desc: string;
  tags: string[];
  cta: string;
}

const PATHS: Path[] = [
  {
    href: '/projects/web',
    img: '/Images/projects/web-projects.webp',
    color: '#8cd2ff',
    label: 'Digital Systems',
    title: ['Web Design &', 'Development'],
    count: '30 projects',
    desc: 'Websites, apps and games I’ve designed and built, with UI/UX case studies that explain how each one came together.',
    tags: ['UI/UX case studies', 'Full-stack apps', 'Unity games', 'Web games'],
    cta: 'Enter portfolio',
  },
  {
    href: '/projects/graphic',
    img: '/Images/projects/graphic-projects.webp',
    color: '#c39bff',
    label: 'Creative Vision',
    title: ['Graphic', 'Design'],
    count: '5 galleries',
    desc: 'Logos, brand identities, posters and digital art from the graphic design side of my work.',
    tags: ['Logos', 'Digital art', 'Event posters', 'Wallpapers'],
    cta: 'Explore gallery',
  },
];

const ARROW = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;

function PathPanel({ p, i }: { p: Path; i: number }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Pointer position -> CSS vars, at most once a frame. --mx/--my place the
  // light; --px/--py nudge the picture against the pointer.
  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = clientX - r.left, y = clientY - r.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--px', `${((x / r.width) - 0.5) * -18}px`);
      el.style.setProperty('--py', `${((y / r.height) - 0.5) * -12}px`);
    });
  };

  return (
    <Link href={p.href} className="hx-panel" style={{ '--c': p.color, '--i': i } as CSSProperties} onPointerMove={track}>
      <img className="hx-img" src={p.img} alt="" width={1024} height={1024} decoding="async" fetchPriority={i === 0 ? 'high' : undefined} />
      <span className="hx-shade" aria-hidden="true" />
      <span className="hx-dim" aria-hidden="true" />
      <span className="hx-glow" aria-hidden="true" />

      <span className="hx-top">
        <span className="hx-num">{String(i + 1).padStart(2, '0')}</span>
        <span className="hx-count"><i aria-hidden="true" />{p.count}</span>
      </span>

      <span className="hx-content">
        <span className="hx-label">{p.label}</span>
        <h2 className="hx-title">{p.title[0]}<br />{p.title[1]}</h2>
        <span className="hx-more">
          <span className="hx-more-in">
            <span className="hx-desc">{p.desc}</span>
            <span className="hx-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</span>
          </span>
        </span>
        <span className="hx-cta">{p.cta}<span className="hx-cta-go">{ARROW}</span></span>
      </span>
    </Link>
  );
}

export default function ProjectsHubClient() {
  useEffect(() => initProjects(), []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects-hub"
      tagline={<>Materializing My <span className="tagline-name">Creative Constellation</span></>}
    >
      <main>
        <header id="hero-heading" className="hx-hero">
          <p className="section-label">Creative Portfolio</p>
          <h1 className="page-title">Project Nexus</h1>
          <p className="bio-para">
            A curated selection of my digital architecture, ranging from high-performance web applications to experimental
            cosmic interfaces.
          </p>
        </header>

        <nav className="hx-split" aria-label="Project categories">
          <PathPanel p={PATHS[0]} i={0} />
          <span className="hx-or" aria-hidden="true"><b>or</b></span>
          <PathPanel p={PATHS[1]} i={1} />
        </nav>
      </main>
    </StandardShell>
  );
}
