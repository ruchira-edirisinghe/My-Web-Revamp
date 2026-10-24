import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = pageMeta('/projects/graphic/other-stuff/', {
  title: 'Other Stuff | Ruchira Edirisinghe',
  description:
    'More graphic design by Ruchira Edirisinghe: social media posts, T-shirt designs, printed brand material and other one-off pieces for clients and events.',
});

export default function OtherStuffPage() {
  return <GalleryPage slug="other-stuff" />;
}
