import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import ExternalGuard from '@/components/ExternalGuard';
import CosmicPreloader from '@/components/cosmic/CosmicPreloader';
import PageTransitionOverlay from '@/components/cosmic/PageTransitionOverlay';
import PersonJsonLd from '@/components/PersonJsonLd';
import { SITE_URL } from '@/lib/site';

// Union of every Google-Fonts family used across the original site, loaded once
// site-wide. Faithful to the originals (which loaded subsets per page) while
// keeping head management in one place.
// The four faces at the end (Bungee, Fredoka, JetBrains Mono, Rubik) are the
// ones the .cs-ff-* type-specimen utilities in projects.css name. They were
// never in this list, so eight case studies rendered a specimen labelled
// "JetBrains Mono" or "Bungee" in the fallback face instead - the one place on
// the site where showing the wrong font is a factual error rather than a
// nitpick. Baloo 2 / Nunito / Nunito Sans are Whack-A-Mole's own three faces,
// for the same reason. Marcellus SC came out: it was never applied to an
// element, so it was a family requested on every route and rendered on none.
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Cinzel+Decorative:wght@400;700;900',
    'family=Inter:wght@400;500;600;700;800;900',
    'family=Instrument+Sans:wght@400;500;600;700',
    'family=Lexend:wght@300;400;500;600;700',
    'family=Montserrat:wght@300;400;500;600;700;800',
    'family=Orbitron:wght@500;700;800;900',
    'family=Poppins:wght@300;400;500;600;700',
    'family=Rajdhani:wght@400;500;600;700',
    'family=Sora:wght@300;400;500;600;700',
    'family=Baloo+2:wght@600;700;800',
    'family=Nunito:wght@400;600;700',
    'family=Nunito+Sans:wght@600;700;800',
    'family=Bungee',
    'family=Fredoka:wght@400;600',
    'family=JetBrains+Mono:wght@400;500;700',
    'family=Rubik:wght@400;500;700',
  ].join('&') +
  '&display=swap';

// Before first paint: a session's first page gets the liquid intro
// (.intro), any later full load starts under the page transition's cover
// (.pt-cover), and crawlers get neither (lib/cosmic/controller.ts).
const INTRO_GATE =
  "try{var d=document.documentElement;if(!/bot|crawl|spider|slurp|lighthouse|headlesschrome|preview/i.test(navigator.userAgent))d.classList.add(sessionStorage.getItem('re-intro')?'pt-cover':'intro')}catch(e){}";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ruchira Edirisinghe - UI/UX Engineer & Game Developer',
  description:
    'The portfolio of Ruchira Edirisinghe, a UI/UX engineer and game developer. See his product design, web and mobile UI/UX work, development projects and games.',
  applicationName: 'Ruchira Edirisinghe',
  authors: [{ name: 'Ruchira Edirisinghe', url: '/' }],
  creator: 'Ruchira Edirisinghe',
  // './' resolves against each route's own path, so every page names itself
  // (on whatever domain SITE_URL points at) as the one URL to index.
  alternates: { canonical: './' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Search Console / Bing Webmaster verification codes, set as env vars in Vercel
  // so verifying a new property is a redeploy rather than a code change.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    type: 'website',
    siteName: 'Ruchira Edirisinghe',
    title: 'Ruchira Edirisinghe - UI/UX Engineer & Game Developer',
    description:
      'The portfolio of Ruchira Edirisinghe, with detailed UI/UX case studies, web and mobile products, games and graphic design projects.',
    images: [{ url: '/Images/og-card.jpg', width: 1200, height: 630, alt: 'Ruchira Edirisinghe - UI/UX Engineer & Game Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruchira Edirisinghe - UI/UX Engineer & Game Developer',
    description:
      'The portfolio of Ruchira Edirisinghe, with UI/UX case studies, web and mobile products, games and graphic design projects.',
    images: ['/Images/og-card.jpg'],
  },
  icons: {
    icon: [
      { url: '/Images/favicon/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/Images/favicon/icon.svg', type: 'image/svg+xml' },
      { url: '/Images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/Images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Images/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/Images/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/Images/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/Images/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#02030a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Dark Reader) inject
    // attributes onto <html> before hydration; this tolerates that one node's
    // attribute diff without silencing warnings for the rest of the tree.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* The site is already dark: this tells Dark Reader to leave it alone, so it
            doesn't rewrite inline styles before hydration (a hydration mismatch). */}
        <meta name="darkreader-lock" />
        {/* Before first paint: which overlay covers this load (see INTRO_GATE). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        <PersonJsonLd />
      </head>
      <body><CosmicPreloader /><PageTransitionOverlay />{children}<ExternalGuard /><Analytics /><SpeedInsights /></body>
    </html>
  );
}
