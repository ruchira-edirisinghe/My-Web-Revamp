import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = {
  title: 'LKR P2P Rate - Android App | Ruchira Edirisinghe',
  description: projectBySlug('lkr-p2p-rate').tagline,
};

export default function Page() {
  return <ProjectShowcase slug="lkr-p2p-rate" />;
}
