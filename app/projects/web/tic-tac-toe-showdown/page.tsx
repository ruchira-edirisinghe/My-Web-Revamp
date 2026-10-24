import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Showdown - Unity Game | Ruchira Edirisinghe',
  description: gameBySlug('tic-tac-toe-showdown').tagline,
};

export default function Page() {
  return <GameShowcase slug="tic-tac-toe-showdown" />;
}
