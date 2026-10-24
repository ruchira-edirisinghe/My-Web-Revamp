import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/ncgws/', 'ncgws', {
  name: 'NCG Warehouse',
  title: 'NCG Warehouse - UI/UX Case Study | Ruchira Edirisinghe',
  description: `${projectBySlug('ncgws').tagline} A UI/UX case study by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="ncgws" />;
}
