import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/ncgws-case-study.css';
import CaseStudyNcgws from '@/components/pages/casestudies/ncgws';

export const metadata: Metadata = { title: 'NCG Warehouse Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyNcgws />;
}
