import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/phurl-case-study.css';
import CaseStudyPhurl from '@/components/pages/casestudies/phurl';

export const metadata: Metadata = { title: 'Project PhURL Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyPhurl />;
}
