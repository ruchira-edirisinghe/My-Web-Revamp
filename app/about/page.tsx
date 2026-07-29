import type { Metadata } from 'next';
import '@/styles/about/about.css';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: 'About Me - Ruchira Edirisinghe',
  description:
    'Get to know Ruchira Edirisinghe - a UI/UX engineer and consultant. Background, skills, tools, and the work that shapes how I design products.',
};

export default function AboutPage() {
  return <AboutClient />;
}
