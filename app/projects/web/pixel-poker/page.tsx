import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/pixel-poker-case-study.css';
import CaseStudyPixelPoker from '@/components/pages/casestudies/pixel-poker';

export const metadata: Metadata = { title: 'Pixel Perfect Poker Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyPixelPoker />;
}
