import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = projectMeta('/projects/web/horse-racing/', 'horse-racing', {
  name: 'Derby Kings',
  title: 'Derby Kings - Unity Game | Ruchira Edirisinghe',
  description: `${gameBySlug('horse-racing').tagline} A Unity game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <GameShowcase slug="horse-racing" />;
}
