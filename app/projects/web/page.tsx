import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import WebProjectsClient from '@/components/pages/WebProjectsClient';

export const metadata: Metadata = {
  title: 'Web Projects - Ruchira Edirisinghe',
  description:
    'Web product case studies by Ruchira Edirisinghe - UI/UX process, design decisions, and outcomes across shipped interfaces.',
};

export default function WebProjectsPage() {
  return <WebProjectsClient />;
}
