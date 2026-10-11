import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = {
  title: 'Event Posters | Ruchira Edirisinghe',
  description: 'Event and social media posters designed by Ruchira Edirisinghe.',
};

export default function EventPostersPage() {
  return <GalleryPage slug="event-posters" />;
}
