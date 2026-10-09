'use client';
import { useEffect, useRef } from 'react';

/* The Contact page's astronaut, drawn as vector art so it stays crisp at any
   size and picks up the site's palette. He floats on a tilt, waves with one
   glove and sketches a glowing trail with an oversized golden pencil; his legs
   drift, the visor catches a passing glint, the chest lights blink and the
   jetpack puffs.

   The limbs move with SMIL (it animates SVG transforms around their own pivots
   without any per-frame JavaScript); the gentle bob of the whole figure is CSS
   on the <svg>. Everything stops while he is off screen, and for visitors who
   prefer reduced motion he holds a single pose. */

const EASE = '0.45 0 0.55 1';
/** keySplines for `n` eased segments. */
const ease = (n: number) => Array(n).fill(EASE).join(';');

/** A swinging rotation about a fixed pivot. */
function Swing({ values, pivot, dur, begin = '0s', keyTimes }: {
  values: number[]; pivot: [number, number]; dur: string; begin?: string; keyTimes?: string;
}) {
  return (
    <animateTransform
      attributeName="transform"
      type="rotate"
      values={values.map((v) => `${v} ${pivot[0]} ${pivot[1]}`).join(';')}
      keyTimes={keyTimes}
      dur={dur}
      begin={begin}
      calcMode="spline"
      keySplines={ease(values.length - 1)}
      repeatCount="indefinite"
    />
  );
}

/** A four-point twinkle. */
const Spark = ({ x, y, s, begin, color }: { x: number; y: number; s: number; begin: string; color: string }) => (
  <path
    d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`}
    fill={color}
    opacity="0"
  >
    <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={begin} repeatCount="indefinite" />
  </path>
);

export default function Astronaut({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || typeof svg.pauseAnimations !== 'function') return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = false;
    const sync = () => {
      if (still.matches) {
        // A good resting frame: arm up mid-wave, trail fully drawn.
        svg.setCurrentTime(1.1);
        svg.pauseAnimations();
      } else if (onScreen) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
    io.observe(svg);
    still.addEventListener('change', sync);
    sync();
    return () => { io.disconnect(); still.removeEventListener('change', sync); };
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 24 480 404"
      role="img"
      aria-label="An astronaut floating in space, waving and sketching a glowing line with a giant golden pencil"
    >
      <defs>
        <linearGradient id="as-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9d3e8" />
        </linearGradient>
        <linearGradient id="as-suit-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3e9f5" />
          <stop offset="1" stopColor="#a9b5d0" />
        </linearGradient>
        <linearGradient id="as-pack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8c3dc" />
          <stop offset="1" stopColor="#7884a6" />
        </linearGradient>
        <radialGradient id="as-helmet" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c5cfe6" />
        </radialGradient>
        <linearGradient id="as-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1230" />
          <stop offset="0.6" stopColor="#251a56" />
          <stop offset="1" stopColor="#5b3ea0" />
        </linearGradient>
        <radialGradient id="as-earth" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#8cd2ff" />
          <stop offset="0.7" stopColor="#3a6fd8" />
          <stop offset="1" stopColor="#23307a" />
        </radialGradient>
        <linearGradient id="as-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="0.45" stopColor="#ffbe4d" />
          <stop offset="1" stopColor="#b86d12" />
        </linearGradient>
        <linearGradient id="as-trail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6dffb4" />
          <stop offset="0.5" stopColor="#8cd2ff" />
          <stop offset="1" stopColor="#c39bff" />
        </linearGradient>
        <clipPath id="as-visor-clip">
          <rect x="305" y="95" width="90" height="72" rx="34" />
        </clipPath>
      </defs>

      <g transform="rotate(-10 350 230)">
        {/* ── The line he is drawing ── */}
        <g fill="none" strokeLinecap="round">
          <path d="M26 300C44 238 96 254 82 204C72 166 104 140 129 151" stroke="url(#as-trail)" strokeWidth="12" opacity="0.18" pathLength="100" strokeDasharray="100 100">
            <animate attributeName="stroke-dashoffset" values="100;0;0;-100" keyTimes="0;0.45;0.8;1" dur="5s" repeatCount="indefinite" />
          </path>
          <path d="M26 300C44 238 96 254 82 204C72 166 104 140 129 151" stroke="url(#as-trail)" strokeWidth="3.5" pathLength="100" strokeDasharray="100 100">
            <animate attributeName="stroke-dashoffset" values="100;0;0;-100" keyTimes="0;0.45;0.8;1" dur="5s" repeatCount="indefinite" />
          </path>
        </g>
        <Spark x={54} y={236} s={9} begin="0.6s" color="#8cd2ff" />
        <Spark x={100} y={176} s={7} begin="1.4s" color="#c39bff" />
        <Spark x={30} y={274} s={6} begin="2.1s" color="#6dffb4" />
        <Spark x={128} y={128} s={8} begin="0.2s" color="#ffd27a" />

        {/* ── Jetpack exhaust ── */}
        {[309, 391].map((x, i) => (
          <g key={x}>
            {[0, 0.7, 1.4].map((d) => (
              <circle key={d} cx={x} cy="320" r="5" fill="#dfe8ff" opacity="0">
                <animate attributeName="cy" values="320;370" dur="2.1s" begin={`${d + i * 0.35}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="4;15" dur="2.1s" begin={`${d + i * 0.35}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.55;0" dur="2.1s" begin={`${d + i * 0.35}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <ellipse cx={x} cy="322" rx="6" ry="9" fill="#ffbe4d" opacity="0.8">
              <animate attributeName="ry" values="7;12;7" dur="0.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </ellipse>
          </g>
        ))}

        {/* ── Backpack ── */}
        <rect x="288" y="168" width="124" height="134" rx="28" fill="url(#as-pack)" />
        <rect x="296" y="298" width="26" height="16" rx="5" fill="#59627f" />
        <rect x="378" y="298" width="26" height="16" rx="5" fill="#59627f" />

        {/* ── Legs (behind the torso) ── */}
        <g transform="rotate(28 327 295)">
          <Swing values={[24, 34, 24]} pivot={[327, 295]} dur="6s" />
          <rect x="310" y="282" width="34" height="96" rx="17" fill="url(#as-suit-dark)" />
          <ellipse cx="327" cy="334" rx="14" ry="8" fill="#b6c1da" />
          <rect x="305" y="366" width="46" height="30" rx="12" fill="#6c7896" />
          <rect x="305" y="386" width="46" height="10" rx="5" fill="#4a5470" />
        </g>
        <g transform="rotate(-8 373 295)">
          <Swing values={[-4, -14, -4]} pivot={[373, 295]} dur="6s" begin="-2s" />
          <rect x="356" y="282" width="34" height="96" rx="17" fill="url(#as-suit-dark)" />
          <ellipse cx="373" cy="334" rx="14" ry="8" fill="#b6c1da" />
          <rect x="351" y="366" width="46" height="30" rx="12" fill="#6c7896" />
          <rect x="351" y="386" width="46" height="10" rx="5" fill="#4a5470" />
        </g>

        {/* ── Torso ── */}
        <rect x="300" y="182" width="100" height="122" rx="40" fill="url(#as-suit)" stroke="#9aa6c4" strokeWidth="1.5" />
        <rect x="322" y="212" width="56" height="38" rx="9" fill="#1d2542" stroke="rgba(140,210,255,0.35)" />
        {[
          { x: 336, c: '#8cd2ff', d: '0s' },
          { x: 350, c: '#c39bff', d: '0.5s' },
          { x: 364, c: '#ffbe4d', d: '1s' },
        ].map((l) => (
          <circle key={l.x} cx={l.x} cy="225" r="4" fill={l.c}>
            <animate attributeName="opacity" values="1;0.25;1" dur="1.5s" begin={l.d} repeatCount="indefinite" />
          </circle>
        ))}
        <rect x="330" y="236" width="40" height="5" rx="2.5" fill="rgba(140,210,255,0.18)" />
        <rect x="330" y="236" width="12" height="5" rx="2.5" fill="#6dffb4">
          <animate attributeName="width" values="8;40;8" dur="3s" calcMode="spline" keySplines={ease(2)} repeatCount="indefinite" />
        </rect>
        <rect x="302" y="274" width="96" height="12" rx="6" fill="#aab4cd" />
        <rect x="342" y="272" width="16" height="16" rx="4" fill="#8cd2ff" />

        {/* ── Waving arm ── */}
        <g transform="rotate(-140 395 205)">
          <Swing values={[-128, -156, -128, -156, -128, -128]} keyTimes="0;0.15;0.3;0.45;0.6;1" pivot={[395, 205]} dur="4s" />
          <rect x="382" y="198" width="26" height="66" rx="13" fill="url(#as-suit)" stroke="#9aa6c4" strokeWidth="1.2" />
          <rect x="382" y="250" width="26" height="9" rx="4" fill="#aab4cd" />
          <circle cx="395" cy="270" r="15" fill="#eef2fa" stroke="#9aa6c4" strokeWidth="1.2" />
          <rect x="387" y="252" width="5" height="12" rx="2.5" fill="#eef2fa" stroke="#9aa6c4" strokeWidth="1" transform="rotate(-25 389 258)" />
        </g>
        <circle cx="395" cy="205" r="16" fill="url(#as-suit)" stroke="#9aa6c4" strokeWidth="1.2" />

        {/* ── Pencil arm: sleeve, then the pencil, then the glove around it ── */}
        <g transform="rotate(40 305 205)">
          <rect x="292" y="198" width="26" height="62" rx="13" fill="url(#as-suit)" stroke="#9aa6c4" strokeWidth="1.2" />
          {/* Sri Lanka flag patch */}
          <rect x="296" y="210" width="18" height="12" rx="2" fill="#ffbe29" />
          <rect x="297.5" y="211.5" width="3" height="9" fill="#00534e" />
          <rect x="300.5" y="211.5" width="3" height="9" fill="#eb7400" />
          <rect x="304.5" y="211.5" width="8" height="9" fill="#8d153a" />
          <rect x="292" y="246" width="26" height="9" rx="4" fill="#aab4cd" />
        </g>
        <circle cx="305" cy="205" r="16" fill="url(#as-suit)" stroke="#9aa6c4" strokeWidth="1.2" />

        <g transform="rotate(35 268 249)">
          <Swing values={[33, 38, 33]} pivot={[268, 249]} dur="2.5s" />
          {/* Laid out along +x, tip at 98: the grip sits at the hand (268). */}
          <g>
            <path d="M98 249l14-4v8z" fill="#2a2f45" />
            <path d="M112 245l32-9v26l-32-9z" fill="#f3d2a2" />
            <path d="M112 245l32-9v26l-32-9z" fill="none" stroke="#c9a06a" strokeWidth="1" />
            <rect x="144" y="236" width="140" height="26" fill="url(#as-gold)" />
            <path d="M144 241.5h140M144 256.5h140" stroke="#8a4e0e" strokeWidth="1" opacity="0.55" />
            {/* A run of little lotus diamonds down the barrel */}
            <path
              d={Array.from({ length: 9 }, (_, k) => {
                const x = 156 + k * 15;
                return `M${x} 249l5-5 5 5-5 5z`;
              }).join('')}
              fill="#fff3cc"
              stroke="#8a4e0e"
              strokeWidth="0.9"
              opacity="0.85"
            />
            <rect x="284" y="236" width="15" height="26" fill="#d7dce8" />
            <path d="M289 236v26M294 236v26" stroke="#9aa3b8" strokeWidth="1.2" />
            <rect x="297" y="236" width="20" height="26" rx="6" fill="#ff8fb1" />
          </g>
        </g>
        <circle cx="268" cy="249" r="16" fill="#eef2fa" stroke="#9aa6c4" strokeWidth="1.2" />
        <path d="M257 242q11-6 22 2M256 251q12-5 24 2" fill="none" stroke="#b8c2d9" strokeWidth="2" strokeLinecap="round" />

        {/* ── Collar + helmet ── */}
        <ellipse cx="350" cy="186" rx="46" ry="13" fill="#aab4cd" />
        <rect x="282" y="112" width="14" height="38" rx="7" fill="#aab4cd" />
        <rect x="404" y="112" width="14" height="38" rx="7" fill="#aab4cd" />
        <circle cx="350" cy="130" r="62" fill="url(#as-helmet)" stroke="#9aa6c4" strokeWidth="1.5" />
        <path d="M378 76l13-26" stroke="#b8c3dc" strokeWidth="3" strokeLinecap="round" />
        <circle cx="391" cy="48" r="5" fill="#ff6b8b">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
        </circle>

        <rect x="305" y="95" width="90" height="72" rx="34" fill="url(#as-visor)" />
        <g clipPath="url(#as-visor-clip)">
          <circle cx="350" cy="206" r="58" fill="url(#as-earth)" opacity="0.85" />
          <path d="M318 162q12-10 26-4t24-4" fill="none" stroke="#6dffb4" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          {[[322, 112, 1.4], [362, 106, 1], [380, 126, 1.6], [338, 128, 0.9], [372, 142, 1.1]].map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff" opacity="0.8" />
          ))}
          <rect x="300" y="80" width="18" height="110" rx="9" fill="#fff" opacity="0.22" transform="rotate(24 309 135)">
            <animateTransform attributeName="transform" type="translate" additive="sum" values="-40 0;140 0;140 0" keyTimes="0;0.35;1" dur="5s" repeatCount="indefinite" />
          </rect>
          <path d="M318 112a30 30 0 0 1 22-14" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
        </g>
        <rect x="305" y="95" width="90" height="72" rx="34" fill="none" stroke="#e7ecf7" strokeWidth="3" />
      </g>
    </svg>
  );
}
