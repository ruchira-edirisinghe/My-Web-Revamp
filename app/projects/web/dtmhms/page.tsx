import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/dtmhms-case-study.css';
import CaseStudyDtmhms from '@/components/pages/casestudies/dtmhms';

export const metadata: Metadata = { title: 'DTM Hall Management System Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyDtmhms />;
}
