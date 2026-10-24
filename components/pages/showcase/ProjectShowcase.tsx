'use client';
import { type ReactNode, useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars, titleFit } from '@/lib/css';
import { cardSrc } from '@/lib/cardSrc';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';
import type { Challenge, DesignStudy, DevProject, Item, Metric, Project, ShotGroup, WebGame } from './types';
import { PROJECTS, projectBySlug } from './data/index';
import DesignSystem from './DesignSystem';
import SectionRail from './SectionRail';
import ProjectJsonLd from '@/components/ProjectJsonLd';
import Facts from './Facts';
import TechLogo from './TechLogo';
import ProjectPager from './ProjectPager';

/**
 * The project pages. Three templates, one per kind of work (see types.ts),
 * built from the same parts so the whole projects section reads as one site.
 * The lightbox, device-tab switch and section reveal are the shared
 * case-study engine's, which is why the gallery uses `.ui-card`,
 * `.device-toggle` / `.device-gallery` and `#cs-modal`.
 */

/* ── Building blocks ─────────────────────────────────────────────────────── */

interface Sec { id: string; title: string; lede?: string; body: ReactNode }

function Cards({ items, variant = 'card' }: { items: Item[]; variant?: 'card' | 'feature' | 'pillar' | 'tech' }) {
  return (
    <div className={`gs-grid gs-grid-${variant}`}>
      {items.map((it) => (
        <div className={variant === 'tech' ? 'gs-tech-card' : `gs-${variant}`} key={it.title}>
          {it.icon && <div className="gs-feature-icon" aria-hidden="true">{it.icon}</div>}
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  );
}

function Steps({ items }: { items: Item[] }) {
  return (
    <ol className="gs-loop">
      {items.map((s, i) => (
        <li key={s.title}>
          <div className="gs-loop-step">{i + 1}</div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Bullets({ items, alt }: { items: string[]; alt?: boolean }) {
  return (
    <ul className={alt ? 'gs-learned' : 'gs-role'}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

function Metrics({ items }: { items: Metric[] }) {
  return (
    <div className="gs-metrics">
      {items.map((m) => (
        <div className="gs-metric" key={m.label}>
          <div className="gs-metric-value">{m.value}</div>
          <div className="gs-metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

function Challenges({ items }: { items: Challenge[] }) {
  return (
    <div className="gs-challenges">
      {items.map((c) => (
        <div className="gs-challenge" key={c.problem}>
          <div className="gs-problem"><b>Challenge</b>{c.problem}</div>
          <div className="gs-solution"><b>Solution</b>{c.solution}</div>
        </div>
      ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return <div className="gs-stack">{items.map((s) => <span key={s}><TechLogo name={s} />{s}</span>)}</div>;
}

function Gallery({ groups, title }: { groups: ShotGroup[]; title: string }) {
  const tabbed = groups.length > 1;
  const key = (g: ShotGroup, i: number) => (g.label || `g${i}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <>
      {tabbed && (
        <div className="device-toggle gs-tabs" role="tablist" aria-label={`${title} views`}>
          {groups.map((g, i) => (
            <button key={key(g, i)} type="button" role="tab" className={`device-btn gs-tab${i === 0 ? ' active' : ''}`}
              data-device={key(g, i)} aria-selected={i === 0 ? 'true' : 'false'}>
              {g.label}
            </button>
          ))}
        </div>
      )}
      {groups.map((g, i) => (
        <div key={key(g, i)} className={`gs-gallery gs-gallery-${g.orientation}${tabbed ? ' device-gallery' : ''}`}
          data-device={tabbed ? key(g, i) : undefined} hidden={tabbed && i > 0}>
          {g.shots.map((s) => (
            <figure className="ui-card gs-shot" key={s.src} data-full={s.src}>
              <img src={cardSrc(s.src)} alt={`${title} - ${s.caption}`} loading="lazy" decoding="async" />
              <figcaption className="ui-card-label">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </>
  );
}

const shotCount = (groups: ShotGroup[]) => groups.reduce((n, g) => n + g.shots.length, 0);

/* ── The three templates: what each kind of project shows, in order ──────── */

function designSections(p: DesignStudy): Sec[] {
  const r = p.research;
  return [
    { id: 'overview', title: 'The Brief', body: (
      <>
        <div className="gs-pitch">{p.brief.map((t, i) => <p key={i}>{t}</p>)}</div>
        <Cards variant="pillar" items={[
          { title: 'Problem', text: p.problem.statement },
          { title: 'Goal', text: p.problem.goal },
          { title: 'Audience', text: p.problem.audience },
        ]} />
        {p.problem.quote && <blockquote className="gs-quote">{p.problem.quote}</blockquote>}
      </>
    ) },
    { id: 'research', title: 'Research & Insights', lede: r.summary, body: (
      <>
        {r.compare && (
          <div className="gs-compare">
            <div className="gs-compare-side gs-before"><b>{r.compare.before.label}</b><Bullets items={r.compare.before.items} /></div>
            <div className="gs-compare-side gs-after"><b>{r.compare.after.label}</b><Bullets items={r.compare.after.items} alt /></div>
          </div>
        )}
        {r.personas && (
          <div className="gs-personas">
            {r.personas.map((u) => (
              <div className="gs-persona" key={u.name}>
                <div className="gs-persona-head">
                  <span className="gs-persona-icon" aria-hidden="true">{u.icon}</span>
                  <div><h3>{u.name}</h3><div className="gs-persona-role">{u.role}</div></div>
                </div>
                <div className="gs-persona-traits">{u.traits.map((t) => <span key={t}>{t}</span>)}</div>
                <p>“{u.quote}”</p>
              </div>
            ))}
          </div>
        )}
        {r.insights && <Cards variant="feature" items={r.insights} />}
      </>
    ) },
    { id: 'structure', title: 'Structure & Flows', lede: p.structure.note, body: (
      <>
        {p.structure.flow && (
          <div className="gs-flow">
            {p.structure.flow.map((f, i) => (
              <span key={f}>{i > 0 && <i aria-hidden="true">→</i>}<b>{f}</b></span>
            ))}
          </div>
        )}
        <Cards items={p.structure.ia} />
      </>
    ) },
    { id: 'system', title: 'Visual Design System', lede: p.system.summary, body: (
      <>
        <DesignSystem system={p.system} title={p.title} />
        {p.system.notes && <Cards items={p.system.notes} />}
      </>
    ) },
    { id: 'screens', title: 'Key Screens', lede: `${shotCount(p.screens)} high-fidelity screens from the final design. Tap any of them to see it full size.`,
      body: <Gallery groups={p.screens} title={p.title} /> },
    { id: 'interactions', title: 'Interaction Details', body: <Cards variant="feature" items={p.interactions} /> },
    { id: 'outcome', title: 'Outcome & Reflection', body: (
      <>
        {p.outcome.metrics && <Metrics items={p.outcome.metrics} />}
        {p.outcome.quote && <blockquote className="gs-quote">{p.outcome.quote}</blockquote>}
        <Cards items={[
          { icon: '📈', title: 'Outcome', text: p.outcome.summary },
          { icon: '🧗', title: 'Hardest Part', text: p.outcome.challenge },
          { icon: '💡', title: 'What I Learned', text: p.outcome.learned },
          ...(p.outcome.next ? [{ icon: '🚀', title: 'Next Steps', text: p.outcome.next }] : []),
        ]} />
      </>
    ) },
  ];
}

function devSections(p: DevProject): Sec[] {
  return [
    { id: 'overview', title: 'Overview', body: (
      <>
        <div className="gs-pitch">{p.overview.map((t, i) => <p key={i}>{t}</p>)}</div>
        <Cards variant="pillar" items={p.problem} />
      </>
    ) },
    { id: 'features', title: 'Key Features', body: <Cards variant="feature" items={p.features} /> },
    { id: 'screens', title: 'Screenshots', lede: 'Screens taken from the real product. Tap any of them to see it full size.', body: <Gallery groups={p.screens} title={p.title} /> },
    { id: 'architecture', title: 'Architecture', lede: p.architecture.summary, body: <Cards variant="tech" items={p.architecture.parts} /> },
    { id: 'stack', title: 'Tech Stack', body: (
      <div className="gs-stack-groups">
        {p.stack.map((g) => (
          <div className="gs-stack-group" key={g.group}><h3>{g.group}</h3><Chips items={g.items} /></div>
        ))}
      </div>
    ) },
    ...(p.extras || []).map((x) => ({ id: x.id, title: x.title, lede: x.lede, body: <Cards items={x.items} /> })),
    { id: 'challenges', title: 'Engineering Challenges', body: <Challenges items={p.challenges} /> },
    { id: 'results', title: 'Results & Learnings', body: (
      <>
        {p.results.metrics && <Metrics items={p.results.metrics} />}
        <Bullets items={p.results.points} />
        <h3 className="gs-h3">What I learned</h3>
        <Bullets items={p.learned} alt />
      </>
    ) },
  ];
}

function gameSections(p: WebGame): Sec[] {
  return [
    { id: 'overview', title: 'The Game', body: (
      <>
        <div className="gs-pitch">{p.pitch.map((t, i) => <p key={i}>{t}</p>)}</div>
        <Cards variant="pillar" items={p.pillars} />
      </>
    ) },
    { id: 'screens', title: 'Screenshots', lede: 'These screenshots were captured straight from the game. Tap any of them to see it bigger.', body: <Gallery groups={p.screens} title={p.title} /> },
    { id: 'loop', title: 'Core Loop', body: <Steps items={p.loop} /> },
    { id: 'features', title: 'Key Features', body: <Cards variant="feature" items={p.features} /> },
    { id: 'math', title: 'The Maths', lede: p.math.summary, body: <Cards variant="tech" items={p.math.items} /> },
    { id: 'tech', title: 'Under the Hood', body: <Cards variant="tech" items={p.tech} /> },
    { id: 'challenges', title: 'Challenges & Solutions', body: <Challenges items={p.challenges} /> },
    { id: 'results', title: 'Results & Takeaways', body: (
      <>
        {p.results.metrics && <Metrics items={p.results.metrics} />}
        <Chips items={p.stack} />
        <Bullets items={p.results.points} />
        <h3 className="gs-h3">What I learned</h3>
        <Bullets items={p.learned} alt />
      </>
    ) },
  ];
}

const KIND_LABEL = { design: 'UI/UX case studies', dev: 'development projects', game: 'web games' } as const;

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ProjectShowcase({ slug }: { slug: string }) {
  const p: Project = projectBySlug(slug);
  const sections = p.kind === 'design' ? designSections(p) : p.kind === 'dev' ? devSections(p) : gameSections(p);
  const siblings = PROJECTS.filter((x) => x.kind === p.kind).map((x) => ({
    slug: x.slug, title: x.title, kicker: x.kicker, tagline: x.tagline, accent: x.accent,
    cover: cardSrc(x.cover), thumb: x.cover.replace(/\.webp$/i, '-thumb.webp'),
  }));

  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell active="projects" dataPage="projects"
      tagline={<>Loading <span className="tagline-name">{p.title}</span></>}>
      <ProjectJsonLd slug={p.slug} name={p.title} description={p.tagline} kind={p.kind} />
      <main>
        <div className={`gs-page gs-kind-${p.kind}`} style={cssVars({ '--gs-a': p.accent, '--gs-b': p.accent2 })}>
          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          <header className="gs-hero">
            <div className="gs-hero-art" id="hero-banner">
              <img src={p.cover} alt={`${p.title} cover`} id="hero-img" loading="eager" decoding="async" fetchPriority="high" />
            </div>
            <div className="gs-hero-copy">
              <div className="gs-kicker">{p.kicker}</div>
              <h1 className="gs-title" style={titleFit(p.title)}>{p.title}</h1>
              <p className="gs-tagline">{p.tagline}</p>
              <div className="gs-cta-row">
                {p.links.map((l, i) => (
                  <a key={l.href} className={`gs-btn${i === 0 ? ' gs-btn-primary' : ''}`} href={l.href} target="_blank" rel="noopener">
                    {l.label} ↗
                  </a>
                ))}
                <a className="gs-btn" href="#gs-screens">{p.kind === 'design' ? 'See the screens' : 'Screenshots'}</a>
              </div>
            </div>
          </header>

          <Facts facts={p.facts} />

          <SectionRail items={sections.map(({ id, title }) => ({ id, title }))} />

          {sections.map((s, i) => (
            <section className="cs-section gs-section" id={`gs-${s.id}`} key={s.id}>
              <h2 className="gs-h2"><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
              {s.lede && <p className="gs-lede">{s.lede}</p>}
              {s.body}
            </section>
          ))}

          <ProjectPager items={siblings} slug={p.slug} label={KIND_LABEL[p.kind]}
            listHref={`/projects/web/?type=${p.kind}`} />
        </div>
      </main>

      <div id="cs-modal" className="cs-modal-overlay" aria-hidden="true">
        <button id="cs-modal-zoom" className="cs-modal-btn zoom-btn" aria-label="Zoom image">
          <svg viewBox="0 0 24 24"><path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" /></svg>
        </button>
        <button id="cs-modal-close" className="cs-modal-btn" aria-label="Close modal">
          <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <button id="cs-modal-prev" className="cs-modal-nav-btn" aria-label="Previous image">
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button id="cs-modal-next" className="cs-modal-nav-btn" aria-label="Next image">
          <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <div className="cs-modal-container">
          <div className="cs-modal-content">
            <img id="cs-modal-img" alt={`${p.title} screen`} loading="lazy" decoding="async" />
            <div className="cs-modal-info">
              <div id="cs-modal-counter" className="cs-modal-counter">0 / 0</div>
              <h3 id="cs-modal-title" className="cs-modal-title"></h3>
            </div>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
