import type { Metadata } from 'next';
import '@/styles/experience/expadditional.css';
import '@/styles/experience/experience-inline.css';
import ExperienceClient from '@/components/pages/ExperienceClient';

export const metadata: Metadata = { title: 'Experience - Ruchira Edirisinghe' };

export default function ExperiencePage() {
  return <ExperienceClient />;
}
