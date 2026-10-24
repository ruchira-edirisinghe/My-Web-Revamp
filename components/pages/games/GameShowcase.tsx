'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { cardSrc } from '@/lib/cardSrc';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';
import { GAMES, gameBySlug } from './gameData';
import Facts from '@/components/pages/showcase/Facts';
import SectionRail from '@/components/pages/showcase/SectionRail';
import ProjectPager from '@/components/pages/showcase/ProjectPager';
import ProjectJsonLd from '@/components/ProjectJsonLd';

/**
 * One page per Unity game, laid out like a developer's game page rather than a
 * UI/UX case study: key art and the pitch up top, a fact sheet, screenshots
 * early, then the loop, features, what I built, the tech, the art pipeline and a
 * short post-mortem. The lightbox and section reveal come from the shared
 * case-study engine, which is why the gallery uses `.ui-card` / `#cs-modal`.
 */
/** Every Unity game page has the same sections, in this order. */
const SECTIONS = [
  { id: 'overview', title: 'The Game' },
  { id: 'media', title: 'Screenshots' },
  { id: 'loop', title: 'Core Loop' },
  { id: 'features', title: 'Key Features' },
  { id: 'role', title: 'What I Built' },
  { id: 'tech', title: 'Under the Hood' },
  { id: 'pipeline', title: 'Art & Audio Pipeline' },
  { id: 'challenges', title: 'Challenges & Solutions' },
  { id: 'learned', title: 'Tools & Takeaways' },
];

export default function GameShowcase({ slug }: { slug: string }) {
  const g = gameBySlug(slug);
  const dir = `/Images/projects/${g.slug}`;

  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Loading <span className="tagline-name">{g.title}</span></>}
    >
      <ProjectJsonLd slug={g.slug} name={g.title} description={g.tagline} kind="game" />
      <main>
        <div className="gs-page" style={cssVars({ '--gs-a': g.accent, '--gs-b': g.accent2 })}>
          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* ── HERO ── */}
          <header className="gs-hero">
            <div className="gs-hero-art" id="hero-banner">
              <img src={`${dir}/cover.webp`} alt={`${g.title} key art`} id="hero-img"
                loading="eager" decoding="async" fetchPriority="high" />
            </div>
            <div className="gs-hero-copy">
              <div className="gs-kicker">Unity Game · Solo Project</div>
              <h1 className="gs-title">{g.title}</h1>
              <p className="gs-tagline">{g.tagline}</p>
              <div className="gs-cta-row">
                {g.links.map((l) => (
                  <a key={l.href} className="gs-btn gs-btn-primary" href={l.href} target="_blank" rel="noopener">
                    ▶ {l.label}
                  </a>
                ))}
                <a className="gs-btn" href="#gs-media">Screenshots</a>
              </div>
            </div>
          </header>

          {/* ── FACT SHEET ── */}
          <Facts facts={g.facts} />
          <SectionRail items={SECTIONS} />

          {/* ── OVERVIEW ── */}
          <section className="cs-section gs-section" id="gs-overview">
            <h2 className="gs-h2"><span>{num()}</span>The Game</h2>
            <div className="gs-pitch">
              {g.pitch.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="gs-pillars">
              {g.pillars.map((p) => (
                <div className="gs-pillar" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SCREENSHOTS ── */}
          <section className="cs-section gs-section" id="gs-media">
            <h2 className="gs-h2"><span>{num()}</span>Screenshots</h2>
            <p className="gs-lede">These screenshots were captured straight from the game. Tap any of them to see it bigger.</p>
            <div className={`gs-gallery gs-gallery-${g.orientation}`}>
              {g.shots.map((s) => {
                const full = `${dir}/${s.file}.webp`;
                return (
                  <figure className="ui-card gs-shot" key={s.file} data-full={full}>
                    <img src={cardSrc(full)} alt={`${g.title} - ${s.caption}`} loading="lazy" decoding="async" />
                    <figcaption className="ui-card-label">{s.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </section>

          {/* ── CORE LOOP ── */}
          <section className="cs-section gs-section" id="gs-loop">
            <h2 className="gs-h2"><span>{num()}</span>Core Loop</h2>
            <ol className="gs-loop">
              {g.loop.map((s, i) => (
                <li key={s.title}>
                  <div className="gs-loop-step">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── FEATURES ── */}
          <section className="cs-section gs-section" id="gs-features">
            <h2 className="gs-h2"><span>{num()}</span>Key Features</h2>
            <div className="gs-features">
              {g.features.map((f) => (
                <div className="gs-feature" key={f.title}>
                  <div className="gs-feature-icon" aria-hidden="true">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ROLE ── */}
          <section className="cs-section gs-section" id="gs-role">
            <h2 className="gs-h2"><span>{num()}</span>What I Built</h2>
            <p className="gs-lede">I made this game on my own, so I handled the design, the code, the art pipeline, the audio and the release.</p>
            <ul className="gs-role">
              {g.role.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>

          {/* ── TECH ── */}
          <section className="cs-section gs-section" id="gs-tech">
            <h2 className="gs-h2"><span>{num()}</span>Under the Hood</h2>
            <div className="gs-tech">
              {g.tech.map((t) => (
                <article className="gs-tech-card" key={t.title}>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── ART & AUDIO ── */}
          <section className="cs-section gs-section" id="gs-pipeline">
            <h2 className="gs-h2"><span>{num()}</span>Art &amp; Audio Pipeline</h2>
            <div className="gs-pipeline">
              {g.pipeline.map((p) => (
                <div className="gs-pipe" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── POST-MORTEM ── */}
          <section className="cs-section gs-section" id="gs-challenges">
            <h2 className="gs-h2"><span>{num()}</span>Challenges &amp; Solutions</h2>
            <div className="gs-challenges">
              {g.challenges.map((c) => (
                <div className="gs-challenge" key={c.problem}>
                  <div className="gs-problem"><b>Problem</b>{c.problem}</div>
                  <div className="gs-solution"><b>Solution</b>{c.solution}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── STACK + LEARNINGS ── */}
          <section className="cs-section gs-section" id="gs-learned">
            <h2 className="gs-h2"><span>{num()}</span>Tools &amp; Takeaways</h2>
            <div className="gs-stack">
              {g.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
            <ul className="gs-learned">
              {g.learned.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <p className="gs-credits"><b>Credits.</b> {g.credits}</p>
          </section>

          <ProjectPager items={GAMES.map((o) => ({
            slug: o.slug, title: o.title, kicker: 'Unity game', tagline: o.tagline, accent: o.accent,
            cover: `/Images/projects/${o.slug}/cover-card.webp`, thumb: `/Images/projects/${o.slug}/cover-thumb.webp`,
          }))} slug={g.slug} label="Unity games" listHref="/projects/web/?type=unity" />
        </div>
      </main>

      {/* ── SCREENSHOT LIGHTBOX (driven by initCaseStudy) ── */}
      <div id="cs-modal" className="cs-modal-overlay" aria-hidden="true">
        <button id="cs-modal-zoom" className="cs-modal-btn zoom-btn" aria-label="Zoom image">
          <svg viewBox="0 0 24 24">
            <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
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
            <img id="cs-modal-img" alt={`${g.title} screenshot`} loading="lazy" decoding="async" />
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
