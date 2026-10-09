import Link from 'next/link';
import { cssVars } from '@/lib/css';

export interface PagerItem { slug: string; title: string; thumb: string; cover: string; kicker: string; tagline: string; accent: string }

/**
 * The end of a project page: a large "up next" card with the next project's
 * cover, a smaller card back to the previous one, and a link to the full list.
 * Wraps around, so the last project's "up next" is the first.
 */
export default function ProjectPager({ items, slug, label, listHref }: {
  items: PagerItem[]; slug: string; label: string; listHref: string;
}) {
  const at = items.findIndex((x) => x.slug === slug);
  const prev = items[(at - 1 + items.length) % items.length];
  const next = items[(at + 1) % items.length];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <nav className="gs-nu" aria-label={`More ${label}`}>
      <header className="gs-nu-head">
        <h2>Keep exploring</h2>
        <p><b>{pad(at + 1)}</b> / {pad(items.length)} {label}</p>
      </header>

      <div className="gs-nu-grid">
        <Link href={`/projects/web/${next.slug}`} className="gs-nu-next" style={cssVars({ '--nu-a': next.accent })}>
          <img src={next.cover} alt="" loading="lazy" decoding="async" />
          <span className="gs-nu-next-body">
            <small><i aria-hidden="true" />Up next</small>
            <b>{next.title}</b>
            <span className="gs-nu-kicker">{next.kicker}</span>
            <span className="gs-nu-tagline">{next.tagline}</span>
          </span>
          <span className="gs-nu-go" aria-hidden="true">
            <svg viewBox="0 0 20 20"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" /></svg>
          </span>
        </Link>

        <Link href={`/projects/web/${prev.slug}`} className="gs-nu-prev" style={cssVars({ '--nu-a': prev.accent })}>
          <span className="gs-nu-prev-media"><img src={prev.thumb} alt="" loading="lazy" decoding="async" /></span>
          <span className="gs-nu-prev-body">
            <small>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H5M9 5.5 4.5 10 9 14.5" /></svg>
              Previous
            </small>
            <b>{prev.title}</b>
            <span className="gs-nu-kicker">{prev.kicker}</span>
          </span>
        </Link>
      </div>

      <div className="gs-nu-foot">
        <Link href={listHref} className="gs-nu-all">
          All {label}
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" /></svg>
        </Link>
      </div>
    </nav>
  );
}
