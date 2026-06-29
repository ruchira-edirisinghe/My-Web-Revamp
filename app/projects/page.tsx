import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import ProjectsHubClient from '@/components/pages/ProjectsHubClient';

export const metadata: Metadata = { title: 'Projects | Ruchira Edirisinghe' };

export default function ProjectsPage() {
  return <ProjectsHubClient />;
}
