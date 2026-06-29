import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/vebuild-case-study.css';
import CaseStudyVebuild from '@/components/pages/casestudies/vebuild';

export const metadata: Metadata = { title: 'VeBuild Case Study | Ruchira Edirisinghe' };

export default function VebuildCaseStudyPage() {
  return <CaseStudyVebuild />;
}
