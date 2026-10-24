import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/whack-a-mole/', 'whack-a-mole', {
  name: 'Whack-A-Mole',
  title: 'Whack-A-Mole - Web Game | Ruchira Edirisinghe',
  description: `${projectBySlug('whack-a-mole').tagline} A web game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="whack-a-mole" />;
}
