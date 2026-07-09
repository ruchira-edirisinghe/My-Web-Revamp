import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// Union of every Google-Fonts family used across the original site, loaded once
// site-wide. Faithful to the originals (which loaded subsets per page) while
// keeping head management in one place.
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Cinzel+Decorative:wght@400;700;900',
    'family=Inter:wght@400;500;600;700;800;900',
    'family=Instrument+Sans:wght@400;500;600;700',
    'family=Lexend:wght@300;400;500;600;700',
    'family=Marcellus+SC',
    'family=Montserrat:wght@300;400;500;600;700;800',
    'family=Orbitron:wght@500;700;800;900',
    'family=Poppins:wght@300;400;500;600;700',
    'family=Rajdhani:wght@400;500;600;700',
    'family=Sora:wght@300;400;500;600;700',
    'family=Spectral:wght@300;400;500;600;700',
  ].join('&') +
  '&display=swap';

// Deployed origin — set NEXT_PUBLIC_SITE_URL at build time so Open Graph / Twitter
// image URLs resolve to absolute links. Update the fallback to your production domain.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruchira-edirisinghe.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ruchira Edirisinghe',
  description:
    'Ruchira Edirisinghe — UI/UX Engineer & Consultant. Portfolio of product design, web and mobile UI/UX work.',
  openGraph: {
    type: 'website',
    siteName: 'Ruchira Edirisinghe',
    title: 'Ruchira Edirisinghe — UI/UX Engineer & Consultant',
    description:
      'Portfolio of Ruchira Edirisinghe — product design and web/mobile UI/UX work, with detailed case studies and graphic design projects.',
    images: [{ url: '/Images/mynew.png', alt: 'Ruchira Edirisinghe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruchira Edirisinghe — UI/UX Engineer & Consultant',
    description:
      'Portfolio of Ruchira Edirisinghe — product design and web/mobile UI/UX work, with case studies and graphic design projects.',
    images: ['/Images/mynew.png'],
  },
  icons: {
    icon: [
      { url: '/Images/favicon/favicon.ico', type: 'image/x-icon' },
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </head>
      <body>{children}<Analytics /><SpeedInsights /></body>
    </html>
  );
}
