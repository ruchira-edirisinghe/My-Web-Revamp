import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/horse-racing-case-study.css';
import CaseStudyHorseRacing from '@/components/pages/casestudies/horse-racing';

export const metadata: Metadata = { title: 'Horse Racing Elite Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyHorseRacing />;
}
