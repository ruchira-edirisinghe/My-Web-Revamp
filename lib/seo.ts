// Per-page metadata, used by every page.tsx (server-only: it runs at build).
//
// Next replaces a parent's openGraph/twitter objects instead of merging them,
// so a page that only sets title and description shares with the home page
// its og:title, og:description and og:url when it's linked anywhere.
// pageMeta() gives each page its own: title, description, canonical URL and
// share card. Case studies and games share their own key art (projectMeta).
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

const SITE_NAME = 'Ruchira Edirisinghe';
const OG_CARD = { url: '/Images/og-card.jpg', width: 1200, height: 630, alt: 'Ruchira Edirisinghe - UI/UX Engineer & Game Developer' };

interface PageMeta {
  title: string;
  description: string;
  /** A share image of the page's own (the site card is the fallback). */
  image?: { url: string; alt: string };
  robots?: Metadata['robots'];
}

/** Metadata for the page at `route` (with its trailing slash, as the site serves it). */
export function pageMeta(route: string, { title, description, image, robots }: PageMeta): Metadata {
  const images = image ? [image, OG_CARD] : [OG_CARD];
  return {
    title,
    description,
    alternates: { canonical: route },
    ...(robots ? { robots } : {}),
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', url: route, title, description, images },
    twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
  };
}

/** A case study or game: its own key art as the share image, when it has one. */
export function projectMeta(route: string, slug: string, meta: Omit<PageMeta, 'image'> & { name: string }): Metadata {
  const cover = `/Images/projects/${slug}/cover.webp`;
  const has = fs.existsSync(path.join(process.cwd(), 'public', cover));
  return pageMeta(route, { ...meta, image: has ? { url: cover, alt: `${meta.name} - key art` } : undefined });
}
