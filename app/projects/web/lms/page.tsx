import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/lms-case-study.css';
import CaseStudyLms from '@/components/pages/casestudies/lms';

export const metadata: Metadata = { title: 'ZUSE Corporate LMS Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyLms />;
}
