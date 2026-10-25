/* ════════════════════════════════════════
   warm.ts - the rest of the site, fetched while the intro plays.

   On a session's first page the intro is on screen for a few seconds anyway,
   so that's when everything the other pages would otherwise fetch on arrival
   comes down: the 3D figures' models and code, the ambient music, the
   display faces, and the images at the top of every main page. A later
   page then finds them cached and opens without a stall or a hitch.

   The intro waits on it at most WAIT_MS; on a slow connection the rest
   carries on in the background. With Save-Data on, or on 2G, only the
   light part (code, fonts) is fetched.
   ════════════════════════════════════════ */

/** The pages the navigation leads to. */
export const MAIN_ROUTES = ['/', '/about/', '/experience/', '/projects/', '/projects/web/', '/projects/graphic/', '/contact/', '/links/'];

const MODELS = [
  '/models/contact/astronaut.glb',
  '/models/contact/desk.glb',
  '/models/contact/astronaut-wave.glb',
  '/models/contact/gloves.glb',
  '/models/about/ufo.glb',
];
const MUSIC = '/audio/ambient.mp3';
const FACES = ['400 1em "Epic Pro"', '700 1em Montserrat', '400 1em Montserrat'];
/** Images per page: the first screen's, not the whole page's. */
const IMAGES_PER_PAGE = 6;
const WAIT_MS = 6000;

/** Decoded images stay referenced for the session, so a client-side
 *  navigation draws them straight from memory. */
const kept: HTMLImageElement[] = [];

const light = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData || /(^|-)2g$/.test(c.effectiveType ?? ''));
};

const fetchAll = (urls: string[]) =>
  Promise.all(urls.map((u) => fetch(u).then((r) => r.arrayBuffer()).catch(() => {})));

const decode = (src: string) => {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  kept.push(img);
  return img.decode().catch(() => {});
};

/** The images a page loads eagerly (its first screen), read from its static HTML. */
async function pageImages(route: string) {
  const html = await fetch(route).then((r) => (r.ok ? r.text() : ''));
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('img'))
    .filter((img) => img.getAttribute('loading') !== 'lazy')
    .map((img) => img.getAttribute('src'))
    .filter((src): src is string => !!src && src.startsWith('/'))
    .slice(0, IMAGES_PER_PAGE);
}

/** Starts the warm-up; resolves when it's done or WAIT_MS has passed. */
export function warmSite(routes: string[]): Promise<void> {
  const here = location.pathname;
  const jobs: Promise<unknown>[] = [
    import('@/lib/scripts/contact-3d'),
    ...(document.fonts ? FACES.map((f) => document.fonts.load(f).catch(() => {})) : []),
  ];
  if (!light()) {
    jobs.push(fetchAll([...MODELS, MUSIC]));
    // Statically exported pages only: in development every route would have
    // to be compiled on the spot just to be read.
    if (process.env.NODE_ENV === 'production') {
      jobs.push(Promise.all(routes.filter((r) => r !== here).map((r) =>
        pageImages(r).then((srcs) => Promise.all(srcs.map(decode))).catch(() => {}))));
    }
  }
  const all = Promise.all(jobs).then(() => {});
  return Promise.race([all, new Promise<void>((r) => setTimeout(r, WAIT_MS))]);
}
