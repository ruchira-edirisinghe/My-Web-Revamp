import type { CSSProperties } from 'react';

/**
 * Build a style object that includes CSS custom properties (e.g. `--card-index`).
 * React accepts custom properties at runtime, but the CSSProperties type doesn't
 * list them - this casts a plain record so call sites stay type-clean.
 */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}
