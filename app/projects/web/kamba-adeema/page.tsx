import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = projectMeta('/projects/web/kamba-adeema/', 'kamba-adeema', {
  name: 'Tug of War (Kamba Adeema)',
  title: 'Tug of War (Kamba Adeema) - Unity Game | Ruchira Edirisinghe',
  description: `${gameBySlug('kamba-adeema').tagline} A Unity game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <GameShowcase slug="kamba-adeema" />;
}
