import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/kyc-case-study.css';
import CaseStudyKyc from '@/components/pages/casestudies/kyc';

export const metadata: Metadata = { title: 'KYC Verification Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyKyc />;
}
