import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/car-racing-case-study.css';
import CaseStudyCarRacing from '@/components/pages/casestudies/car-racing';

export const metadata: Metadata = { title: 'Ready To Race Unlimited Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyCarRacing />;
}
