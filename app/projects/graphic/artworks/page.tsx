import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = pageMeta('/projects/graphic/artworks/', {
  title: 'Digital Artworks | Ruchira Edirisinghe',
  description:
    'Digital paintings, character studies and fan art by Ruchira Edirisinghe, a UI/UX engineer and designer from Sri Lanka. See each piece full size in the gallery.',
});

export default function ArtworksPage() {
  return <GalleryPage slug="artworks" />;
}
