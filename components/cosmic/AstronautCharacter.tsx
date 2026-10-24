import { useId } from 'react';

/**
 * One of the two little astronauts of the Cosmic Clash (the intro) and the
 * page transition: a chibi SVG rig whose parts animate separately. The class
 * names are the rig (lib/cosmic/clash.ts and transition.ts drive them):
 * .ac-head, .ac-eyes / .ac-happy (expressions), .ac-arm-f (the front arm,
 * which throws and catches; .ac-palm is its energy glow), .ac-arm-b,
 * .ac-legs, .ac-jet (the jetpack flame) and .ac-ant (antenna lights).
 *
 * Nova (cyan, one antenna) faces right; Astra (pink and violet, twin
 * antennae) is drawn the same way and mirrored, so both rigs move alike.
 */
export type AstronautVariant = 'nova' | 'astra';

const LOOK = {
  nova: { accent: '#5ce0ff', deep: '#2b8fd6', glove: '#3a6cf0', visor: ['#071030', '#123a7a'], eye: '#c8f6ff' },
  astra: { accent: '#ff6bd5', deep: '#bc6fff', glove: '#9b4dff', visor: ['#160a30', '#4a1a6e'], eye: '#ffe0f6' },
} as const;

export default function AstronautCharacter({ variant, className }: { variant: AstronautVariant; className?: string }) {
  const k = LOOK[variant];
  const id = useId().replace(/:/g, '');
  const suit = `${id}-suit`, visor = `${id}-visor`, flame = `${id}-flame`;
  return (
    <svg className={`ac ac-${variant} ${className ?? ''}`} viewBox="-60 -98 120 164" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={suit} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c3cbe8" />
        </linearGradient>
        <linearGradient id={visor} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={k.visor[0]} />
          <stop offset="1" stopColor={k.visor[1]} />
        </linearGradient>
        <radialGradient id={flame}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor={k.accent} />
          <stop offset="1" stopColor={k.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="ac-rig" transform={variant === 'astra' ? 'scale(-1 1)' : undefined}>
        {/* Jetpack flame, behind everything. */}
        <g className="ac-jet">
          <ellipse cx="-12" cy="46" rx="6" ry="13" fill={`url(#${flame})`} />
          <ellipse cx="12" cy="46" rx="6" ry="13" fill={`url(#${flame})`} />
        </g>
        <rect x="-25" y="-16" width="50" height="46" rx="12" fill="#283152" />
        <rect x="-19" y="27" width="12" height="8" rx="2" fill="#1a2038" />
        <rect x="7" y="27" width="12" height="8" rx="2" fill="#1a2038" />

        <g className="ac-arm-b">
          <rect x="-32" y="-10" width="12" height="26" rx="6" fill="#aeb7d8" />
          <circle cx="-26" cy="17" r="6.5" fill={k.deep} />
        </g>

        <g className="ac-legs">
          <rect x="-17" y="18" width="14" height="24" rx="7" fill={`url(#${suit})`} />
          <rect x="-19" y="36" width="18" height="11" rx="5.5" fill="#39415f" />
          <rect x="3" y="18" width="14" height="24" rx="7" fill={`url(#${suit})`} />
          <rect x="1" y="36" width="18" height="11" rx="5.5" fill="#39415f" />
        </g>

        <rect x="-21" y="-16" width="42" height="40" rx="15" fill={`url(#${suit})`} />
        <rect x="-21" y="10" width="42" height="6" fill={k.accent} opacity="0.9" />
        <rect x="-9" y="-8" width="18" height="11" rx="3" fill="#1a2140" />
        <circle className="ac-light" cx="-4.5" cy="-2.5" r="2" fill={k.accent} />
        <circle cx="0.5" cy="-2.5" r="2" fill="#ffd166" />
        <circle cx="5.5" cy="-2.5" r="2" fill="#6dff8a" />

        <g className="ac-arm-f">
          <rect x="20" y="-10" width="12" height="26" rx="6" fill={`url(#${suit})`} />
          <circle cx="26" cy="17" r="6.5" fill={k.glove} />
          <circle className="ac-palm" cx="26" cy="17" r="11" fill={`url(#${flame})`} opacity="0" />
        </g>

        <g className="ac-head">
          <rect x="-15" y="-22" width="30" height="9" rx="4.5" fill="#c9d0ea" />
          {variant === 'nova' ? (
            <>
              <path d="M0 -76 V-86" stroke="#c9d0ea" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="ac-ant" cx="0" cy="-89" r="4.5" fill={k.accent} />
            </>
          ) : (
            <>
              <path d="M-8 -74 L-15 -86 M8 -74 L15 -86" stroke="#c9d0ea" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="ac-ant" cx="-16" cy="-88" r="3.8" fill={k.accent} />
              <circle className="ac-ant" cx="16" cy="-88" r="3.8" fill={k.deep} />
            </>
          )}
          <circle cx="0" cy="-47" r="30" fill={`url(#${suit})`} stroke="#b4bede" strokeWidth="1.5" />
          <ellipse cx="4" cy="-46" rx="22" ry="17.5" fill={`url(#${visor})`} />
          <path d="M-11 -56 Q-3 -62 9 -60" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
          <g className="ac-eyes">
            <rect x="-4" y="-51" width="6" height="10" rx="3" fill={k.eye} />
            <rect x="10" y="-51" width="6" height="10" rx="3" fill={k.eye} />
          </g>
          <g className="ac-happy" opacity="0">
            <path d="M-4.5 -43 Q-1 -50 2.5 -43" stroke={k.eye} strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M9.5 -43 Q13 -50 16.5 -43" stroke={k.eye} strokeWidth="2.6" strokeLinecap="round" fill="none" />
          </g>
          <ellipse cx="-6" cy="-37" rx="3.5" ry="2" fill="#ff8fc8" opacity="0.45" />
          <ellipse cx="18" cy="-37" rx="3.5" ry="2" fill="#ff8fc8" opacity="0.45" />
        </g>
      </g>
    </svg>
  );
}
