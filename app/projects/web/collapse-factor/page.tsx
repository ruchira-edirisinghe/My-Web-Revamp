import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/collapse-factor-case-study.css';
import CaseStudyCollapseFactor from '@/components/pages/casestudies/collapse-factor';

export const metadata: Metadata = { title: 'Collapse Factor Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyCollapseFactor />;
}
