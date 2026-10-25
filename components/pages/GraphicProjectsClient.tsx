'use client';
import { useEffect, type CSSProperties } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { COLLECTIONS, type Collection, countOf, hrefOf, piecesOf, thumbOf } from '@/components/pages/galleries/data';
import { Fan, ICONS, pad2, useReveal } from '@/components/pages/galleries/parts';
import { Icon } from '@/components/ui/Icon';

/* Graphic Design: the way into the five collections. The hero counts the
   work (a tile per collection with its count, like the Web Projects page),
   then each collection gets a showcase with three of its own pieces fanned
   out, and a strip of highlights drifts past at the end.
   Styles: styles/projects/graphic.css (+ projects-index.css for the tiles). */

const TOTAL = COLLECTIONS.reduce((n, c) => n + countOf(c), 0);

/** A strip of pieces for the highlights: every other piece of a few collections. */
const strip = (slugs: string[]) =>
  slugs.flatMap((s) => {
    const c = COLLECTIONS.find((x) => x.slug === s)!;
    return piecesOf(c).filter((_, i) => i % 2 === 0).slice(0, 6).map((p) => ({ c, p }));
  });
const ROW_A = strip(['artworks', 'event-posters']);
const ROW_B = strip(['other-stuff', 'logos']);

export default function GraphicProjectsClient() {
  useEffect(() => initProjects(), []);
  useReveal();

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Visualizing the <span className="tagline-name">Creative Galaxy</span></>}
    >
      <main className="gx gx-home pj-page">
        <header className="pj-hero">
          <Link href="/projects" className="back-link"><span><Icon name="ArrowLeft" /></span> Back to Project Categories</Link>
          <p className="section-label">Visual Artistry</p>
          <h1 className="page-title">Graphic Design</h1>
          <p className="pj-intro">
            Alongside UI/UX and development, I&apos;ve always loved graphic design. This is where I keep that side of my
            work, from logos and brand identities to event posters, phone wallpapers and digital art. Pick a collection
            below to take a closer look.
          </p>
          <div className="pj-mix">
            <div className="pj-mix-total">
              <b>{TOTAL}</b>
              <span>Pieces across<br />{COLLECTIONS.length} collections</span>
            </div>
            <ul className="pj-mix-kinds">
              {COLLECTIONS.map((c, i) => {
                const n = countOf(c);
                return (
                  <li key={c.slug}>
                    <a href={`#gx-${c.slug}`} className="pj-kind" style={{ '--d': i, '--pj-a': c.accent } as CSSProperties}
                      aria-label={`${n} ${c.unit[1]} - jump to ${c.title}`}>
                      <span className="pj-kind-top">
                        <svg className="pj-kind-ico" viewBox="0 0 20 20" aria-hidden="true">{ICONS[c.slug]}</svg>
                        <svg className="pj-kind-go" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>
                      </span>
                      <b>{n}</b>
                      <span className="pj-kind-label">{c.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </header>

        <div className="gx-cols">
          {COLLECTIONS.map((c, i) => <Showcase key={c.slug} c={c} i={i} />)}
        </div>

        <section className="gx-high" aria-labelledby="gx-high-t">
          <header className="gx-high-head gx-rv">
            <p className="section-label">From the collections</p>
            <h2 id="gx-high-t" className="gx-high-title">A few highlights</h2>
          </header>
          {[ROW_A, ROW_B].map((row, r) => (
            <div key={r} className={`gx-marquee${r ? ' is-rev' : ''}`}>
              <div className="gx-marquee-track">
                {[0, 1].map((copy) => (
                  <ul key={copy} className="gx-marquee-set" aria-hidden={copy === 1 || undefined}>
                    {row.map(({ c, p }) => (
                      <li key={c.slug + p.file} style={{ '--r': p.w / p.h, '--a': c.accent } as CSSProperties}>
                        <Link href={hrefOf(c)} tabIndex={copy ? -1 : undefined} aria-label={`${p.title} - in ${c.title}`}>
                          <img src={thumbOf(c, p)} alt="" loading="lazy" decoding="async" width={p.w} height={p.h} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </StandardShell>
  );
}

function Showcase({ c, i }: { c: Collection; i: number }) {
  const n = countOf(c);
  return (
    <article id={`gx-${c.slug}`} className={`gx-col gx-rv${i % 2 ? ' is-flip' : ''}`} style={{ '--a': c.accent } as CSSProperties}>
      <div className="gx-col-art">
        <i className="gx-col-glow" aria-hidden="true" />
        <Fan c={c} eager={i < 2} />
      </div>
      <div className="gx-col-txt">
        <span className="gx-col-no" aria-hidden="true">{pad2(i + 1)}</span>
        <p className="gx-col-kick">
          <svg viewBox="0 0 20 20" aria-hidden="true">{ICONS[c.slug]}</svg>{c.label}
        </p>
        <h2 className="gx-col-title">
          <Link href={hrefOf(c)} className="gx-stretch">{c.title}</Link>
        </h2>
        <p className="gx-col-desc">{c.blurb}</p>
        <ul className="gx-col-tags">
          {c.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <span className="gx-col-go">
          Open the {n} {c.unit[1]} <i><Icon name="ArrowRight" /></i>
        </span>
      </div>
    </article>
  );
}
