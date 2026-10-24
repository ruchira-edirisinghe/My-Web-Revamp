import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/coin-duel/', 'coin-duel', {
  name: 'Coin Duel',
  title: 'Coin Duel - Web Game | Ruchira Edirisinghe',
  description: `${projectBySlug('coin-duel').tagline} A web game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="coin-duel" />;
}
