import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = {
  title: 'Other Stuff | Ruchira Edirisinghe',
  description: 'Social posts, T-shirt designs and printed brand material by Ruchira Edirisinghe.',
};

export default function OtherStuffPage() {
  return <GalleryPage slug="other-stuff" />;
}
