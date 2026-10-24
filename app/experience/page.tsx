import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/experience/expadditional.css';
import '@/styles/experience/experience-inline.css';
import '@/styles/experience/exp-v2.css';
import '@/styles/voices.css';
import '@/styles/signoff.css';
import '@/styles/astro-peek.css';
import ExperienceClient from '@/components/pages/ExperienceClient';

export const metadata: Metadata = pageMeta('/experience/', {
  title: 'Experience - Ruchira Edirisinghe',
  description:
    "Where Ruchira Edirisinghe has worked and what he did there, along with his certifications, skills, education and volunteer work as a UI/UX engineer and game developer.",
});

export default function ExperiencePage() {
  return <ExperienceClient />;
}
