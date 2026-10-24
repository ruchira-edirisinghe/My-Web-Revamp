import type { CSSProperties } from 'react';

/**
 * Build a style object that includes CSS custom properties (e.g. `--card-index`).
 * React accepts custom properties at runtime, but the CSSProperties type doesn't
 * list them - this casts a plain record so call sites stay type-clean.
 */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

/** --gs-word for a case study title: its longest word's length in letters, so
 *  the CSS can shrink the title just enough for that word to fit on a phone. */
export function titleFit(title: string): CSSProperties {
  return cssVars({ '--gs-word': Math.max(...title.split(/\s+/).map((w) => w.length)) });
}
