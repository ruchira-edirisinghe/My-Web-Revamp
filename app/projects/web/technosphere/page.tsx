import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/technosphere-case-study.css';
import CaseStudyTechnosphere from '@/components/pages/casestudies/technosphere';

export const metadata: Metadata = { title: 'Technosphere Case Study | Ruchira Edirisinghe' };

export default function TechnosphereCaseStudyPage() {
  return <CaseStudyTechnosphere />;
}
