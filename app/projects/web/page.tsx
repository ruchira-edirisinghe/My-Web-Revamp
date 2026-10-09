import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/projects-index.css';
import WebProjectsClient from '@/components/pages/WebProjectsClient';

export const metadata: Metadata = {
  title: 'Web Projects - Ruchira Edirisinghe',
  description:
    'UI/UX case studies, full-stack products, and web and Unity games you can play, all designed and built by Ruchira Edirisinghe.',
};

export default function WebProjectsPage() {
  return <WebProjectsClient />;
}
