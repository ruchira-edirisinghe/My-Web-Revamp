import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = {
  title: 'Derby Kings - Unity Game | Ruchira Edirisinghe',
  description: gameBySlug('horse-racing').tagline,
};

export default function Page() {
  return <GameShowcase slug="horse-racing" />;
}
