import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

// Routes that exist but shouldn't be offered to search engines.
const EXCLUDE = new Set(['/coming-soon/']);

// Walk app/ for page.tsx files so a new case study lands in the sitemap without
// anyone remembering to list it. `_private` and `(group)` folders follow Next's
// own routing rules: the first isn't a route, the second adds no URL segment.
function collectRoutes(dir: string, route: string, out: string[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === 'page.tsx') out.push(route);
    if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name.startsWith('[')) continue;
    const seg = entry.name.startsWith('(') ? '' : `${entry.name}/`;
    collectRoutes(path.join(dir, entry.name), route + seg, out);
  }
}

function priority(route: string) {
  if (route === '/') return 1;
  if (route.split('/').length <= 3) return 0.8; // /about/, /projects/, ...
  if (route.split('/').length === 4) return 0.7; // /projects/web/
  return 0.6; // individual case studies
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: string[] = [];
  collectRoutes(path.join(process.cwd(), 'app'), '/', routes);
  const lastModified = new Date();
  return routes
    .filter((r) => !EXCLUDE.has(r))
    .sort()
    .map((r) => ({
      url: SITE_URL + r,
      lastModified,
      changeFrequency: r === '/' ? 'monthly' : 'yearly',
      priority: priority(r),
    }));
}
