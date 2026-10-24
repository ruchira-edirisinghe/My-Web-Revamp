import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/about/about.css';
import '@/styles/bento-cards.css';
import '@/styles/about/about-v2.css';
import '@/styles/voices.css';
import '@/styles/signoff.css';
import '@/styles/astro-peek.css';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = pageMeta('/about/', {
  title: 'About Me - Ruchira Edirisinghe',
  description:
    'Get to know Ruchira Edirisinghe, a UI/UX engineer and game developer from Sri Lanka. Read about my background, the skills and tools I use, and how I approach designing and building products.',
});

export default function AboutPage() {
  return <AboutClient />;
}
