import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/artworks.css';
import GalleryArtworks from '@/components/pages/galleries/artworks';

export const metadata: Metadata = { title: 'Digital Artworks | Ruchira Edirisinghe' };

export default function ArtworksPage() {
  return <GalleryArtworks />;
}
