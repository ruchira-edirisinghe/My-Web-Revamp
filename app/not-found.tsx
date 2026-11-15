import type { Metadata } from 'next';
import StatusScreen from '@/components/errors/StatusScreen';

export const metadata: Metadata = {
  title: 'Page not found - Ruchira Edirisinghe',
  description: 'This page could not be found. Head back to the homepage or have a look through the projects instead.',
  // The root layout's canonical './' and index robots would otherwise apply here too: the export names
  // /_not-found/ (itself a 404) as the canonical for every missing URL and contradicts Next's own noindex.
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

/**
 * Branded cosmic 404, served as the static export's 404.html. The screen itself
 * (components/errors/) and its words (data.ts) are shared with the other error pages.
 */
export default function NotFound() {
  return <StatusScreen code="404" />;
}
