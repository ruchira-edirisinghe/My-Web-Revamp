import type { Metadata } from 'next';
import '@/styles/comingsoon.css';
import ComingSoonClient from '@/components/pages/ComingSoonClient';

export const metadata: Metadata = {
  title: 'Coming Soon - Ruchira Edirisinghe',
  description:
    'Ruchira Edirisinghe is still working on this page. Please check back again soon to see what is new.',
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
