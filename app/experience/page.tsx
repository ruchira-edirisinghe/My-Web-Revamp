import type { Metadata } from 'next';
import '@/styles/experience/expadditional.css';
import '@/styles/experience/experience-inline.css';
import ExperienceClient from '@/components/pages/ExperienceClient';

export const metadata: Metadata = {
  title: 'Experience — Ruchira Edirisinghe',
  description:
    "The career journey of Ruchira Edirisinghe — roles, highlights, and certifications across the teams and products I've worked on as a UI/UX engineer.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
