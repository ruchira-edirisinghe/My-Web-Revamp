import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/artworks.css';
import GalleryOtherStuff from '@/components/pages/galleries/other-stuff';

export const metadata: Metadata = { title: 'Other Stuff | Ruchira Edirisinghe' };

export default function OtherStuffPage() {
  return <GalleryOtherStuff />;
}
