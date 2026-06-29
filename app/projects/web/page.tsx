import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import WebProjectsClient from '@/components/pages/WebProjectsClient';

export const metadata: Metadata = { title: 'Web Projects | Ruchira Edirisinghe' };

export default function WebProjectsPage() {
  return <WebProjectsClient />;
}
