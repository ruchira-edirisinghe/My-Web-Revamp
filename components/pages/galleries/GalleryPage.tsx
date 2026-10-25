'use client';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { COLLECTIONS, type Collection, type Piece, collection, countOf, fullOf, hrefOf, originalOf, thumbOf } from './data';
import Lightbox, { type Slide } from './Lightbox';
import { Fan, ICONS, pad2, useReveal } from './parts';
import { Icon } from '@/components/ui/Icon';

/**
 * One graphic design collection (logos, artworks, posters, wallpapers or
 * other stuff), laid out to suit its work: logo tiles, a masonry wall of
 * paintings, poster squares, phones, or justified rows of mixed shapes.
 * Every piece opens in the viewer (Lightbox.tsx), which steps through the
 * whole collection. Styles: styles/projects/graphic.css.
 */
export default function GalleryPage({ slug }: { slug: string }) {
  const c = collection(slug);
  const at = COLLECTIONS.indexOf(c);
  const next = COLLECTIONS[(at + 1) % COLLECTIONS.length];
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => initProjects(), []);
  useReveal();

  const slides: Slide[] = useMemo(
    () => c.sections.flatMap((s) => s.items).map((p) => ({ thumb: thumbOf(c, p), full: fullOf(c, p), title: p.title, tag: p.tag, sub: p.sub, r: p.w / p.h, original: originalOf(c, p) })),
    [c],
  );

  let k = 0; // running index across sections, for the viewer
  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>{c.tagline[0]} <span className="tagline-name">{c.tagline[1]}</span></>}
    >
      <main className={`gx gx-gallery is-${c.layout}`} style={{ '--a': c.accent } as CSSProperties}>
        <header className="gx-hero">
          <Link href="/projects/graphic" className="back-link"><span><Icon name="ArrowLeft" /></span> Back to Graphic Design</Link>
          <p className="section-label">{c.kicker}</p>
          <h1 className="page-title">{c.title}</h1>
          <p className="gx-intro">{c.intro}</p>
          <ul className="gx-meta">
            {c.tags.map((t, i) => (
              <li key={t} className={i === 0 ? 'is-key' : undefined}>
                {i === 0 && <svg viewBox="0 0 20 20" aria-hidden="true">{ICONS[c.slug]}</svg>}
                {t}
              </li>
            ))}
          </ul>
        </header>

        <nav className="gx-switch" aria-label="Graphic design collections">
          {COLLECTIONS.map((o) => (
            <Link key={o.slug} href={hrefOf(o)} className={`gx-switch-item${o.slug === c.slug ? ' on' : ''}`}
              aria-current={o.slug === c.slug ? 'page' : undefined} style={{ '--a': o.accent } as CSSProperties}>
              <svg viewBox="0 0 20 20" aria-hidden="true">{ICONS[o.slug]}</svg>
              <span>{o.title}</span>
              <small>{countOf(o)}</small>
            </Link>
          ))}
        </nav>

        {c.sections.map((s, si) => (
          <section key={si} className="gx-sec" aria-label={s.title ?? c.title}>
            {s.title && (
              <header className="gx-sec-head gx-rv">
                <span className="gx-sec-no" aria-hidden="true">{pad2(si + 1)}</span>
                <div>
                  <h2>{s.title}</h2>
                  {s.blurb && <p>{s.blurb}</p>}
                </div>
                <span className="gx-sec-count">{s.items.length} {s.items.length === 1 ? c.unit[0] : c.unit[1]}</span>
              </header>
            )}
            <ul className="gx-grid">
              {s.items.map((p, i) => {
                const idx = k++;
                return <Card key={p.file} c={c} p={p} i={i} onOpen={() => setOpen(idx)} />;
              })}
            </ul>
          </section>
        ))}

        <Link href={hrefOf(next)} className="gx-next gx-rv" style={{ '--a': next.accent } as CSSProperties}>
          <span className="gx-next-txt">
            <small>Next collection</small>
            <b>{next.title}</b>
            <span>{countOf(next)} {next.unit[1]} <i><Icon name="ArrowRight" /></i></span>
          </span>
          <Fan c={next} />
        </Link>
      </main>

      {open !== null && (
        <Lightbox slides={slides} index={open} accent={c.accent} download={c.downloadable} fullSize={c.layout !== 'logos'}
          noun={c.unit[0]} phone={c.layout === 'phones'}
          onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </StandardShell>
  );
}

function Card({ c, p, i, onOpen }: { c: Collection; p: Piece; i: number; onOpen: () => void }) {
  const phone = c.layout === 'phones';
  // Each logo has its own brand guidelines page instead of the viewer.
  const brand = c.layout === 'logos' ? p.file.replace(/\.\w+$/, '') : null;
  const media = (
    <span className={phone ? 'gx-phone' : 'gx-card-media'}>
      {phone && <i className="gx-phone-island" aria-hidden="true" />}
      <img src={thumbOf(c, p)} alt={p.title} width={p.w} height={p.h} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" />
      <span className="gx-card-zoom" aria-hidden="true">
        {brand
          ? <svg viewBox="0 0 20 20"><path d="M5 10h10M11 6l4 4-4 4" /></svg>
          : <svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5" /><path d="m12.5 12.5 4 4M8.5 6.5v4M6.5 8.5h4" /></svg>}
      </span>
    </span>
  );
  return (
    <li className="gx-card gx-rv" style={{ '--i': i % 8, '--r': p.w / p.h } as CSSProperties}>
      {brand ? (
        <Link href={`/projects/graphic/logos/${brand}`} className="gx-card-btn" aria-label={`${p.title} brand guidelines${p.tag ? `, ${p.tag}` : ''}`}>
          {media}
        </Link>
      ) : (
        <button type="button" className="gx-card-btn" onClick={onOpen} aria-label={`View ${p.title}${p.tag && !phone ? `, ${p.tag}` : ''}`}>
          {media}
        </button>
      )}
      {!phone ? (
        <div className="gx-card-cap">
          {p.tag && <span className="gx-card-tag">{p.tag}</span>}
          <h3>{p.title}</h3>
          {p.sub && <p>{p.sub}</p>}
        </div>
      ) : (
        <p className="gx-phone-name">{p.title}</p>
      )}
    </li>
  );
}
