import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = {
  title: 'Glass Bridge - Unity Game | Ruchira Edirisinghe',
  description: gameBySlug('glass-bridge').tagline,
};

export default function Page() {
  return <GameShowcase slug="glass-bridge" />;
}
