import type { Project } from '../types';
import { DESIGN } from './design';
import { DEV } from './dev';
import { GAMES } from './games';

export const PROJECTS: Project[] = [...DESIGN, ...DEV, ...GAMES];

export const projectBySlug = (slug: string): Project => {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return p;
};
