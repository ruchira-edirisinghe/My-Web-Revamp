import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = {
  title: 'Lyceum Campus - UI/UX Case Study | Ruchira Edirisinghe',
  description: projectBySlug('lycampus').tagline,
};

export default function Page() {
  return <ProjectShowcase slug="lycampus" />;
}
