import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/agent-system-case-study.css';
import CaseStudyAgentSystem from '@/components/pages/casestudies/agent-system';

export const metadata: Metadata = { title: '747 Agent Dashboard Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyAgentSystem />;
}
