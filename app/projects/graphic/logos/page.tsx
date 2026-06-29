import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/artworks.css';
import GalleryLogos from '@/components/pages/galleries/logos';

export const metadata: Metadata = { title: 'Logo Design & Branding | Ruchira Edirisinghe' };

export default function LogosPage() {
  return <GalleryLogos />;
}
