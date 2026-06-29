import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/747social-case-study.css';
import CaseStudy747Social from '@/components/pages/casestudies/747social';

export const metadata: Metadata = { title: '747 Social Casino Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudy747Social />;
}
