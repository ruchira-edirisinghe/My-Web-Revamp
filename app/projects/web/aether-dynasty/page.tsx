import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/aether-dynasty-case-study.css';
import CaseStudyAetherDynasty from '@/components/pages/casestudies/aether-dynasty';

export const metadata: Metadata = { title: 'Aether Dynasty Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyAetherDynasty />;
}
