import type { Metadata } from 'next';
import '@/styles/quicklinks/quicklinks.css';
import QuicklinksClient from '@/components/pages/QuicklinksClient';

export const metadata: Metadata = {
  title: 'Quick Links - Ruchira Edirisinghe',
  description:
    'Quick links to every place you can find Ruchira Edirisinghe online - portfolio, social profiles, and professional platforms in one constellation.',
};

export default function LinksPage() {
  return <QuicklinksClient />;
}
