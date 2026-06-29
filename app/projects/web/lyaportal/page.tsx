import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/lyaportal-case-study.css';
import CaseStudyLyaportal from '@/components/pages/casestudies/lyaportal';

export const metadata: Metadata = { title: 'LYA Exam Portal Case Study | Ruchira Edirisinghe' };

export default function LyaportalPage() {
  return <CaseStudyLyaportal />;
}
