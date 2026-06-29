import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import GraphicProjectsClient from '@/components/pages/GraphicProjectsClient';

export const metadata: Metadata = { title: 'Graphic Projects | Ruchira Edirisinghe' };

export default function GraphicProjectsPage() {
  return <GraphicProjectsClient />;
}
