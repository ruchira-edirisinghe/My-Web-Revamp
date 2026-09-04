import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/kana-mutti-case-study.css';
import CaseStudyKanaMutti from '@/components/pages/casestudies/kana-mutti';

export const metadata: Metadata = { title: 'Kana Mutti Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyKanaMutti />;
}
