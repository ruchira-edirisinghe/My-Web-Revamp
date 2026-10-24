import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/kana-mutti/', 'kana-mutti', {
  name: 'Kana Mutti',
  title: 'Kana Mutti - Web Game | Ruchira Edirisinghe',
  description: `${projectBySlug('kana-mutti').tagline} A web game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="kana-mutti" />;
}
