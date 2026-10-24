import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/pixel-poker/', 'pixel-poker', {
  name: 'Pixel Perfect Poker',
  title: 'Pixel Perfect Poker - Web Game | Ruchira Edirisinghe',
  description: `${projectBySlug('pixel-poker').tagline} A web game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="pixel-poker" />;
}
