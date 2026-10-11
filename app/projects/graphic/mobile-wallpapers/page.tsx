import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = {
  title: 'Mobile Wallpapers | Ruchira Edirisinghe',
  description: 'Free phone wallpapers designed by Ruchira Edirisinghe.',
};

export default function MobileWallpapersPage() {
  return <GalleryPage slug="mobile-wallpapers" />;
}
