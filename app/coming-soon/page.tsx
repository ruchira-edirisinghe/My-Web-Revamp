import type { Metadata } from 'next';
import '@/styles/comingsoon.css';
import ComingSoonClient from '@/components/pages/ComingSoonClient';

export const metadata: Metadata = { title: 'Coming Soon — Ruchira Edirisinghe' };

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
