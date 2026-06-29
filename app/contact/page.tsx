import type { Metadata } from 'next';
import '@/styles/contact/contact.css';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = { title: 'Contact — Ruchira Edirisinghe' };

export default function ContactPage() {
  return <ContactClient />;
}
