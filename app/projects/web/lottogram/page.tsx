import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/lottogram-case-study.css';
import CaseStudyLottogram from '@/components/pages/casestudies/lottogram';

export const metadata: Metadata = { title: 'Lottogram Case Study | Ruchira Edirisinghe' };

export default function LottogramPage() {
  return <CaseStudyLottogram />;
}
