import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/contact/contact.css';
import '@/styles/contact/contact-v2.css';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = pageMeta('/contact/', {
  title: 'Contact - Ruchira Edirisinghe',
  description:
    'Get in touch with Ruchira Edirisinghe by email, WhatsApp, LinkedIn, GitHub, Behance or Instagram to talk about a project, a role or a collaboration in UI/UX, web or game development.',
});

export default function ContactPage() {
  return <ContactClient />;
}
