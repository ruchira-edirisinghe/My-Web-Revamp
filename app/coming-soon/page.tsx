import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/comingsoon.css';
import ComingSoonClient from '@/components/pages/ComingSoonClient';

export const metadata: Metadata = pageMeta('/coming-soon/', {
  title: 'Coming Soon - Ruchira Edirisinghe',
  description:
    'Ruchira Edirisinghe is still working on this page. Please check back again soon to see what is new.',
  // A placeholder: keep it out of search results so it never outranks a real page.
  robots: { index: false, follow: true },
});

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
