import { SITE_URL } from '@/lib/site';
import { jsonLd } from '@/lib/jsonld';

/**
 * schema.org data for a case study or game page: the work itself (a
 * CreativeWork by the site's Person, or a VideoGame) and its breadcrumb trail
 * (Home > Projects > Web & Games > the project), which search engines can show
 * in place of the bare URL.
 */
export default function ProjectJsonLd({ slug, name, description, kind }: {
  slug: string; name: string; description: string; kind: 'design' | 'dev' | 'game';
}) {
  const url = `${SITE_URL}/projects/web/${slug}/`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': kind === 'game' ? 'VideoGame' : 'CreativeWork',
        '@id': `${url}#work`,
        name,
        description,
        url,
        image: `${SITE_URL}/Images/projects/${slug}/cover.webp`,
        author: { '@id': `${SITE_URL}/#person` },
        creator: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en',
        ...(kind === 'game' ? { genre: 'Game' } : { genre: kind === 'design' ? 'UI/UX case study' : 'Software project' }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects/` },
          { '@type': 'ListItem', position: 3, name: 'Web & Games', item: `${SITE_URL}/projects/web/` },
          { '@type': 'ListItem', position: 4, name, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />;
}
