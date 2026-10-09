import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/projects-hub.css';
import ProjectsHubClient from '@/components/pages/ProjectsHubClient';

export const metadata: Metadata = {
  title: 'Projects - Ruchira Edirisinghe',
  description:
    'Explore the work of Ruchira Edirisinghe, from UI/UX case studies and full-stack web products to games and graphic design projects.',
};

export default function ProjectsPage() {
  return <ProjectsHubClient />;
}
