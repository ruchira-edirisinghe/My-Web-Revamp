import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/artworks.css';
import GalleryEventPosters from '@/components/pages/galleries/event-posters';

export const metadata: Metadata = { title: 'Event Posters | Ruchira Edirisinghe' };

export default function EventPostersPage() {
  return <GalleryEventPosters />;
}
