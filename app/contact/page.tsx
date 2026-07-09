import type { Metadata } from 'next';
import '@/styles/contact/contact.css';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Ruchira Edirisinghe',
  description:
    'Get in touch with Ruchira Edirisinghe. Reach out by email, WhatsApp, LinkedIn, GitHub, Behance, or Instagram to talk product design and UI/UX work.',
};

export default function ContactPage() {
  return <ContactClient />;
}
