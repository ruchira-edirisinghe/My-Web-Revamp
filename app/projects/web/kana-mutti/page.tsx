import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = {
  title: 'Kana Mutti - Web Game | Ruchira Edirisinghe',
  description: projectBySlug('kana-mutti').tagline,
};

export default function Page() {
  return <ProjectShowcase slug="kana-mutti" />;
}
