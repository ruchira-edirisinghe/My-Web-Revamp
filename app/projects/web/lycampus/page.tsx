import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/lycampus-case-study.css';
import CaseStudyLycampus from '@/components/pages/casestudies/lycampus';

export const metadata: Metadata = { title: 'Lyceum Campus Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyLycampus />;
}
