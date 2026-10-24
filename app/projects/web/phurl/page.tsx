import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/phurl/', 'phurl', {
  name: 'Project PhURL',
  title: 'Project PhURL - Full-Stack Project | Ruchira Edirisinghe',
  description: `${projectBySlug('phurl').tagline} A full-stack project by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="phurl" />;
}
