import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import ProjectsHubClient from '@/components/pages/ProjectsHubClient';

export const metadata: Metadata = {
  title: 'Projects — Ruchira Edirisinghe',
  description:
    'Explore the work of Ruchira Edirisinghe — web product case studies and graphic design projects spanning UI/UX, branding, and interface engineering.',
};

export default function ProjectsPage() {
  return <ProjectsHubClient />;
}
