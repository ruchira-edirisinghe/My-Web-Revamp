import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/catalogie-case-study.css';
import CaseStudyCatalogie from '@/components/pages/casestudies/catalogie';

export const metadata: Metadata = { title: 'Catalogie Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyCatalogie />;
}
