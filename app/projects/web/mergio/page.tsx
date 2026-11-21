import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/mergio/', 'mergio', {
  name: 'Mergio',
  title: 'Mergio - Open Source Streaming App | Ruchira Edirisinghe',
  description: `${projectBySlug('mergio').tagline} An open source desktop app by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="mergio" />;
}
