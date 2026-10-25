import type { CSSProperties } from 'react';
import { cssVars } from '@/lib/css';
import { art, type LogoBrand } from './data';

/* The logo drawn two ways, for every screen and mockup on a brand page:
   <Art> is the artwork as designed (its light-ink version on dark grounds),
   <Mono> is its silhouette in a single colour, cut with a CSS mask. A logo
   with shading and inner detail can't be a silhouette, so <Mono> shows the
   artwork instead. */

type Of = 'logo' | 'mark';

export function Art({ b, of = 'logo', on = 'light', className = '', style }: { b: LogoBrand; of?: Of; on?: 'light' | 'dark'; className?: string; style?: CSSProperties }) {
  const img = <img src={art(b, of, on === 'dark')} alt="" draggable={false} decoding="async" />;
  const plate = on === 'dark' && b.onDark === 'plate';
  return <span className={`lb-art${plate ? ' is-plate' : ''} ${className}`} style={style} aria-hidden="true">{img}</span>;
}

export function Mono({ b, of = 'mark', color, on = 'dark', className = '', style }: { b: LogoBrand; of?: Of; color: string; on?: 'light' | 'dark'; className?: string; style?: CSSProperties }) {
  if (b.illustrated) return <Art b={b} of={of} on={on} className={className} style={style} />;
  return (
    <span className={`lb-mono ${className}`} aria-hidden="true"
      style={{ ...cssVars({ '--src': `url(${art(b, of)})`, '--ink': color }), ...style }} />
  );
}

/** A real-world mockup, generated with Higgsfield from the logo artwork. */
export function Photo({ b, scene, label }: { b: LogoBrand; scene: string; label?: string }) {
  const where = SCENE_ALT[scene] ?? (label ? `on its ${label.toLowerCase()}` : 'in use');
  return <img className="lb-photo" src={`/Images/logos/${b.slug}/scene-${scene}.webp`} alt={`The ${b.name} logo ${where}`} loading="lazy" decoding="async" />;
}
const SCENE_ALT: Record<string, string> = {
  billboard: 'on a roadside billboard', office: 'on a reception wall', store: 'on a shopfront', van: 'on a delivery van', stage: 'on an event screen',
  stationery: 'on a letterhead, envelope and business cards', app: 'on a phone app', web: 'on a website', social: 'in a social post', card: 'on a member card',
  tee: 'printed on a T-shirt', cap: 'on a cap', badge: 'on pin badges', polo: 'embroidered on a polo shirt', jersey: 'printed on an esports jersey',
  mousepad: 'printed on a gaming desk mat', sticker: 'on a sticker', lanyard: 'on an ID card on a lanyard', invite: 'on an invitation card',
};
