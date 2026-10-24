import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = projectMeta('/projects/web/glass-bridge/', 'glass-bridge', {
  name: 'Glass Bridge',
  title: 'Glass Bridge - Unity Game | Ruchira Edirisinghe',
  description: `${gameBySlug('glass-bridge').tagline} A Unity game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <GameShowcase slug="glass-bridge" />;
}
