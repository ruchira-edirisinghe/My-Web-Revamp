import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = projectMeta('/projects/web/glacier-glide/', 'glacier-glide', {
  name: 'Glacier Glide',
  title: 'Glacier Glide - Unity Game | Ruchira Edirisinghe',
  description: `${gameBySlug('glacier-glide').tagline} A Unity game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <GameShowcase slug="glacier-glide" />;
}
