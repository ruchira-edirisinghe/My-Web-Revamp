import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/projects-index.css';
import '@/styles/projects/graphic.css';
import GraphicProjectsClient from '@/components/pages/GraphicProjectsClient';

export const metadata: Metadata = pageMeta('/projects/graphic/', {
  title: 'Graphic Projects - Ruchira Edirisinghe',
  description:
    'Graphic design work by Ruchira Edirisinghe, including logos, brand identities, event posters, digital artwork and phone wallpapers.',
});

export default function GraphicProjectsPage() {
  return <GraphicProjectsClient />;
}
