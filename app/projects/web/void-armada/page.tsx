import type { Metadata } from 'next';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';

export const metadata: Metadata = { title: 'Void Armada - Unity Game | Ruchira Edirisinghe' };

export default function Page() {
  return <GameShowcase slug="void-armada" />;
}
