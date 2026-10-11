import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = {
  title: 'Digital Artworks | Ruchira Edirisinghe',
  description: 'Digital paintings and fan art by Ruchira Edirisinghe.',
};

export default function ArtworksPage() {
  return <GalleryPage slug="artworks" />;
}
