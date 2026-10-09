import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = {
  title: 'Technosphere - UI/UX Case Study | Ruchira Edirisinghe',
  description: projectBySlug('technosphere').tagline,
};

export default function Page() {
  return <ProjectShowcase slug="technosphere" />;
}
