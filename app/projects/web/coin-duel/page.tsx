import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/coin-duel-case-study.css';
import CaseStudyCoinDuel from '@/components/pages/casestudies/coin-duel';

export const metadata: Metadata = { title: 'Coin Duel Case Study | Ruchira Edirisinghe' };

export default function Page() {
  return <CaseStudyCoinDuel />;
}
