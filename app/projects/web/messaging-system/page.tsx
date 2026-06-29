import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/messaging-system-case-study.css';
import CaseStudyMessagingSystem from '@/components/pages/casestudies/messaging-system';

export const metadata: Metadata = { title: 'Messaging Platform Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyMessagingSystem />;
}
