import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import GalleryPage from '@/components/pages/galleries/GalleryPage';

export const metadata: Metadata = pageMeta('/projects/graphic/event-posters/', {
  title: 'Event Posters | Ruchira Edirisinghe',
  description:
    'Event, campaign and social media posters designed by Ruchira Edirisinghe for clubs, universities and brands, with bold type, layout and colour work.',
});

export default function EventPostersPage() {
  return <GalleryPage slug="event-posters" />;
}
