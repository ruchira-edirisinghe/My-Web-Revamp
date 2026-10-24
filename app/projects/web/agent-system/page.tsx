import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/agent-system/', 'agent-system', {
  name: '747 Agent Dashboard',
  title: '747 Agent Dashboard - UI/UX Case Study | Ruchira Edirisinghe',
  description: `${projectBySlug('agent-system').tagline} A UI/UX case study by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="agent-system" />;
}
