import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = pageMeta('/projects/graphic/mobile-wallpapers/', {
  title: 'Mobile Wallpapers | Ruchira Edirisinghe',
  description:
    'Free phone wallpapers designed by Ruchira Edirisinghe: space scenes, abstract art and illustrated backgrounds sized for modern phones. View them full size.',
});

export default function MobileWallpapersPage() {
  return <GalleryPage slug="mobile-wallpapers" />;
}
