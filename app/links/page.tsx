import type { Metadata } from 'next';
import '@/styles/quicklinks/quicklinks.css';
import QuicklinksClient from '@/components/pages/QuicklinksClient';

export const metadata: Metadata = { title: 'Quick Links | Ruchira Edirisinghe' };

export default function LinksPage() {
  return <QuicklinksClient />;
}
