import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import ProjectShowcase from '@/components/pages/showcase/ProjectShowcase';
import { projectBySlug } from '@/components/pages/showcase/data';

export const metadata: Metadata = projectMeta('/projects/web/dtmhms/', 'dtmhms', {
  name: 'DTM Hall Management System',
  title: 'DTM Hall Management System - UI/UX Case Study | Ruchira Edirisinghe',
  description: `${projectBySlug('dtmhms').tagline} A UI/UX case study by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <ProjectShowcase slug="dtmhms" />;
}
