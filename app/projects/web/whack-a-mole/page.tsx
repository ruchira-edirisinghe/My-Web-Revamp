import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/whack-a-mole-case-study.css';
import CaseStudyWhackAMole from '@/components/pages/casestudies/whack-a-mole';

export const metadata: Metadata = {
  title: 'Whack-A-Mole Case Study | Ruchira Edirisinghe',
  description:
    'Whack-A-Mole (Speed & Bounty) - the fairground cabinet as a fifteen-second betting round. How a game of skill gets an honest price: three disjoint reward bands, a point value derived from a perfect clear, and a whole board sealed to a blockchain block before the first swing.',
};

export default function Page() {
  return <CaseStudyWhackAMole />;
}
