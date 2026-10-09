import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = {
  title: 'Pixel Perfect Poker - Web Game | Ruchira Edirisinghe',
  description: projectBySlug('pixel-poker').tagline,
};

export default function Page() {
  return <ProjectShowcase slug="pixel-poker" />;
}
