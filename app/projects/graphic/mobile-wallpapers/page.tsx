import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/artworks.css';
import GalleryMobileWallpapers from '@/components/pages/galleries/mobile-wallpapers';

export const metadata: Metadata = { title: 'Mobile Wallpapers | Ruchira Edirisinghe' };

export default function MobileWallpapersPage() {
  return <GalleryMobileWallpapers />;
}
