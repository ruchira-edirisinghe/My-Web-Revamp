import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = {
  title: 'Aether Dynasty - Unity Game | Ruchira Edirisinghe',
  description: gameBySlug('aether-dynasty').tagline,
};

export default function Page() {
  return <GameShowcase slug="aether-dynasty" />;
}
