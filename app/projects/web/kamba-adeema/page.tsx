import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/kamba-adeema-case-study.css';
import CaseStudyKambaAdeema from '@/components/pages/casestudies/kamba-adeema';

export const metadata: Metadata = { title: 'Kamba Adeema Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyKambaAdeema />;
}
