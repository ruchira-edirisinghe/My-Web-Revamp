import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/lkr-p2p-rate/', 'lkr-p2p-rate', {
  name: 'LKR P2P Rate',
  title: 'LKR P2P Rate - Android App | Ruchira Edirisinghe',
  description: `${projectBySlug('lkr-p2p-rate').tagline} An Android app by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="lkr-p2p-rate" />;
}
