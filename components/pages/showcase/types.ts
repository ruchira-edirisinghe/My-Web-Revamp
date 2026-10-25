/**
 * Data shapes for the three project-page templates (see ProjectShowcase.tsx).
 *
 * Each kind of project is presented the way that kind of work is usually
 * presented:
 *
 *   design - a UI/UX case study: brief, problem, research, structure, design
 *            system, the screens, interaction details, outcome.
 *   dev    - a software project: overview, problem, features, architecture,
 *            stack, screenshots, engineering challenges, results.
 *   game   - a game page: pitch, pillars, core loop, features, screenshots,
 *            the maths/fairness, tech, post-mortem.
 *
 * Content lives in data/*.ts; the template decides the order and layout.
 */

import type { IconName } from '@/components/ui/Icon';

export interface Fact { label: string; value: string }
export interface Item { icon?: IconName; title: string; text: string }
export interface Metric { value: string; label: string }
export interface Shot { src: string; caption: string }
export interface ShotGroup {
  /** Tab label when a gallery has several groups (Desktop / Mobile, Dark / Light...). */
  label?: string;
  orientation: 'landscape' | 'portrait';
  shots: Shot[];
}
export interface Link { label: string; href: string }
export interface Persona { icon: IconName; name: string; role: string; traits: string[]; quote: string }
export interface Challenge { problem: string; solution: string }

interface Base {
  slug: string;
  title: string;
  /** One-line hook under the title. */
  tagline: string;
  /** Small label above the title, e.g. "UI/UX Case Study · Fintech". */
  kicker: string;
  cover: string;
  accent: string;
  accent2: string;
  facts: Fact[];
  links: Link[];
}

export interface DesignStudy extends Base {
  kind: 'design';
  brief: string[];
  problem: { statement: string; goal: string; audience: string; quote?: string };
  research: {
    summary: string;
    compare?: { before: { label: string; items: string[] }; after: { label: string; items: string[] } };
    personas?: Persona[];
    insights?: Item[];
  };
  structure: { flow?: string[]; note?: string; ia: Item[] };
  system: {
    summary: string;
    colors: { hex: string; name?: string }[];
    fonts: { name: string; use: string }[];
    notes?: Item[];
  };
  screens: ShotGroup[];
  interactions: Item[];
  outcome: { metrics?: Metric[]; summary: string; challenge: string; learned: string; next?: string; quote?: string };
}

export interface DevProject extends Base {
  kind: 'dev';
  overview: string[];
  problem: Item[];
  features: Item[];
  architecture: { summary?: string; parts: Item[] };
  stack: { group: string; items: string[] }[];
  screens: ShotGroup[];
  /** Optional extra sections a project needs (team, release history...). */
  extras?: { id: string; title: string; lede?: string; items: Item[] }[];
  challenges: Challenge[];
  results: { metrics?: Metric[]; points: string[] };
  learned: string[];
}

export interface WebGame extends Base {
  kind: 'game';
  pitch: string[];
  pillars: Item[];
  loop: Item[];
  features: Item[];
  screens: ShotGroup[];
  /** Pricing / fairness / rules maths - the part that makes a betting game honest. */
  math: { summary?: string; items: Item[] };
  tech: Item[];
  challenges: Challenge[];
  stack: string[];
  results: { metrics?: Metric[]; points: string[] };
  learned: string[];
}

export type Project = DesignStudy | DevProject | WebGame;
