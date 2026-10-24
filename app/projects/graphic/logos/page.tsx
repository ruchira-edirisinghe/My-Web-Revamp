import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = pageMeta('/projects/graphic/logos/', {
  title: 'Logo Design & Branding | Ruchira Edirisinghe',
  description: 'Logos and brand identities designed by Ruchira Edirisinghe for startups, clubs, companies and personal brands.',
});

export default function LogosPage() {
  return <GalleryPage slug="logos" />;
}
