import type { Metadata } from 'next';
import { projectMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/project-showcase.css';
import GameShowcase from '@/components/pages/games/GameShowcase';
import { gameBySlug } from '@/components/pages/games/gameData';

export const metadata: Metadata = projectMeta('/projects/web/kana-mutti/', 'kana-mutti', {
  name: 'Blind-Fold Pot Smash (Kana Mutti)',
  title: 'Blind-Fold Pot Smash (Kana Mutti) - Unity Game | Ruchira Edirisinghe',
  description: `${gameBySlug('kana-mutti').tagline} A Unity game by Ruchira Edirisinghe.`,
});

export default function Page() {
  return <GameShowcase slug="kana-mutti" />;
}
