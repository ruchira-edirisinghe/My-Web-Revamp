import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/funxt-case-study.css';
import CaseStudyFunxt from '@/components/pages/casestudies/funxt';

export const metadata: Metadata = { title: 'Fun Extreme Technology Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyFunxt />;
}
