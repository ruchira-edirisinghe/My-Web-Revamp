import type { Metadata } from 'next';
import '@/styles/comingsoon.css';
import ComingSoonClient from '@/components/pages/ComingSoonClient';

export const metadata: Metadata = {
  title: 'Coming Soon — Ruchira Edirisinghe',
  description:
    'Something new from Ruchira Edirisinghe is on the way. This page is still under construction — check back soon.',
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
