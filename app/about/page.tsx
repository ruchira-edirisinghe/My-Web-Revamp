import type { Metadata } from 'next';
import '@/styles/about/about.css';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = { title: 'About Me — Ruchira Edirisinghe' };

export default function AboutPage() {
  return <AboutClient />;
}
