import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/propbet-case-study.css';
import CaseStudyPropBet from '@/components/pages/casestudies/propbet';

export const metadata: Metadata = { title: 'PropBet Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyPropBet />;
}
