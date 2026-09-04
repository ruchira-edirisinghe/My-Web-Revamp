import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/pancha-keliya-case-study.css';
import CaseStudyPanchaKeliya from '@/components/pages/casestudies/pancha-keliya';

export const metadata: Metadata = { title: 'Pancha Keliya Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyPanchaKeliya />;
}
