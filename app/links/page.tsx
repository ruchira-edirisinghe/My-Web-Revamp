import type { Metadata } from 'next';
import '@/styles/quicklinks/quicklinks.css';
import '@/styles/quicklinks/links-deck.css';
import QuicklinksClient from '@/components/pages/QuicklinksClient';

export const metadata: Metadata = {
  title: 'Quick Links - Ruchira Edirisinghe',
  description:
    'All the ways to reach Ruchira Edirisinghe in one place, including email, WhatsApp, a contact card you can save, the portfolio, LinkedIn, GitHub, Behance, Instagram and the Zenitron Gaming channels.',
};

export default function LinksPage() {
  return <QuicklinksClient />;
}
