import type { ReactNode } from 'react';
import {
  type SimpleIcon,
  siAndroid, siBetterauth, siCaddy, siCss, siDjango, siDocker, siDrizzle, siExpress, siFigma, siFirebase,
  siFramer, siGit, siGithub, siGithubactions, siHtml5, siJavascript, siJetpackcompose, siJunit5,
  siKotlin, siMaterialdesign, siNextdotjs, siNodedotjs, siNumpy, siOpenapiinitiative, siPandas,
  siPostgresql, siPwa, siPython, siReact, siScikitlearn, siSqlite, siSvg, siThreedotjs, siTypescript,
  siVite, siVitest, siZod,
} from 'simple-icons';

/**
 * Logos for the tech-stack chips on the project pages. Chip text is free-form
 * ("Express 5", "Django REST Framework", "Vitest · Supertest"), so each brand
 * is matched by pattern, first rule wins. Brand marks come from Simple Icons
 * (CC0); anything without one gets a generic line icon for its kind of tool,
 * so every chip carries an icon and the row stays even.
 */
const BRANDS: [RegExp, SimpleIcon][] = [
  [/vitest/i, siVitest],
  [/^vite\b/i, siVite],
  [/next\.js/i, siNextdotjs],
  [/react/i, siReact],
  [/\bnode\b/i, siNodedotjs],
  [/express/i, siExpress],
  [/postgres/i, siPostgresql],
  [/drizzle/i, siDrizzle],
  [/typescript/i, siTypescript],
  [/javascript/i, siJavascript],
  [/^css\b/i, siCss],
  [/\bzod\b/i, siZod],
  [/figma/i, siFigma],
  [/framer/i, siFramer],
  [/github actions/i, siGithubactions],
  [/github pages/i, siGithub],
  [/^git$/i, siGit],
  [/ghcr|docker/i, siDocker],
  [/caddy/i, siCaddy],
  [/django/i, siDjango],
  [/numpy/i, siNumpy],
  [/pandas/i, siPandas],
  [/scikit/i, siScikitlearn],
  [/python/i, siPython],
  [/sqlite/i, siSqlite],
  [/openapi/i, siOpenapiinitiative],
  [/kotlin/i, siKotlin],
  [/jetpack/i, siJetpackcompose],
  [/material/i, siMaterialdesign],
  [/junit/i, siJunit5],
  [/android|\br8\b|workmanager|alarmmanager|viewmodel/i, siAndroid],
  [/\bpwa\b/i, siPwa],
  [/three\.js|instancedmesh|unrealbloom/i, siThreedotjs],
  [/firebase/i, siFirebase],
  [/html5|canvas/i, siHtml5],
  [/^svg$/i, siSvg],
  [/better-auth/i, siBetterauth],
];

const GENERIC: [RegExp, ReactNode][] = [
  // tests
  [/test|supertest/i, <><circle cx="10" cy="10" r="7" /><path d="m6.8 10.2 2.2 2.2 4.2-4.6" /></>],
  // security
  [/gitleaks|cors|crypto|oauth/i, <><path d="M10 2.5 16 5v4.6c0 3.7-2.5 6.6-6 7.9-3.5-1.3-6-4.2-6-7.9V5Z" /><path d="m7.4 10 1.8 1.8 3.5-3.6" /></>],
  // data and storage
  [/sql|migration|pg-boss|joblib|rtdb/i, <><ellipse cx="10" cy="5" rx="6" ry="2.5" /><path d="M4 5v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" /></>],
  // machine learning
  [/gbm|xgboost|model/i, <><circle cx="5" cy="6" r="1.8" /><circle cx="5" cy="14" r="1.8" /><circle cx="15" cy="10" r="1.8" /><path d="M6.7 6.6 13.3 9.4M6.7 13.4l6.6-2.8" /></>],
  // audio
  [/audio/i, <><path d="M3 8v4h3l4 3.5v-11L6 8Z" /><path d="M13 7.2a4 4 0 0 1 0 5.6" /></>],
  // notifications / scheduling
  [/notification|alarm/i, <><path d="M5 14V9a5 5 0 0 1 10 0v5l1.5 1.5h-13Z" /><path d="M8.5 17.5h3" /></>],
  // motion / animation
  [/lenis|animation|requestanimationframe/i, <><path d="M2.5 13c2-6 4-6 6 0s4 6 6 0" /><path d="M15.5 6.5 17.5 5" /></>],
  // images
  [/pillow|image|texture/i, <><rect x="3" y="4" width="14" height="12" rx="2" /><circle cx="7.5" cy="8.5" r="1.3" /><path d="m3.5 14 4-3.5 3 2.5 2.5-2 3.5 3" /></>],
];
// Everything else: a package.
const PACKAGE = <><path d="M10 2.5 16.5 6v8L10 17.5 3.5 14V6Z" /><path d="M3.5 6 10 9.5 16.5 6M10 9.5v8" /></>;

/**
 * Brand colours too dark to read on the page (under ~3:1 against it) are
 * lifted toward white, keeping their hue; near-black marks become white.
 */
function onDark(hex: string): string {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (lum < 0.03) return '#ffffff';
  if (lum < 0.12) return `color-mix(in srgb, #${hex} 50%, #fff)`;
  return `#${hex}`;
}

export default function TechLogo({ name }: { name: string }) {
  const brand = BRANDS.find(([re]) => re.test(name))?.[1];
  if (brand) {
    return (
      <svg className="gs-tech-logo" viewBox="0 0 24 24" aria-hidden="true" style={{ fill: onDark(brand.hex) }}>
        <path d={brand.path} />
      </svg>
    );
  }
  const glyph = GENERIC.find(([re]) => re.test(name))?.[1] ?? PACKAGE;
  return <svg className="gs-tech-logo gs-tech-logo-generic" viewBox="0 0 20 20" aria-hidden="true">{glyph}</svg>;
}
