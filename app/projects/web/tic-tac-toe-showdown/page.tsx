import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = projectMeta('/projects/web/tic-tac-toe-showdown/', 'tic-tac-toe-showdown', {
  name: 'Tic-Tac-Toe Showdown',
  title: 'Tic-Tac-Toe Showdown - Unity Game | Ruchira Edirisinghe',
  description: `${gameBySlug('tic-tac-toe-showdown').tagline} A Unity game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <GameShowcase slug="tic-tac-toe-showdown" />;
}
