import type { ReactNode, SVGProps } from 'react';
import type { ErrorCode } from './data';

// One illustration per error page, drawn as inline SVG so it stays crisp at any
// size and costs a few KB. Shared language: navy hulls with light-blue outlines,
// the logo's cyan-to-violet neon for accents, amber for 5xx faults. Motion
// classes (ea-*) live in error-screen.css and stop under reduced motion.
// An animated element never carries a transform attribute of its own (CSS
// transforms would replace it), so positions sit on a wrapper <g>.

const INK: SVGProps<SVGGElement> = {
  stroke: '#cfe3ff',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'url(#ea-hull)',
};

const STARS: [number, number, number, number][] = [
  [40, 52, 1.6, 0], [282, 40, 1.3, 1.1], [302, 172, 1.1, 2], [22, 190, 1.3, 0.6],
  [68, 292, 1.1, 1.7], [264, 296, 1.5, 0.3], [150, 20, 1.1, 2.4], [300, 252, 1, 1.4],
];

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg className="err-art-svg" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ea-halo">
          <stop offset="0" stopColor="#4f7dff" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#7a5cff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#7a5cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ea-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24386f" />
          <stop offset="1" stopColor="#0e1636" />
        </linearGradient>
        <linearGradient id="ea-neon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ce0ff" />
          <stop offset="1" stopColor="#bc6fff" />
        </linearGradient>
        <linearGradient id="ea-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe8ff" />
          <stop offset="1" stopColor="#3b2a8f" />
        </linearGradient>
        <linearGradient id="ea-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd59a" />
          <stop offset="1" stopColor="#ff8a3d" />
        </linearGradient>
        <linearGradient id="ea-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a3" />
          <stop offset="0.5" stopColor="#ff9a5a" />
          <stop offset="1" stopColor="#ff5fa2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ea-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f58b8" />
          <stop offset="1" stopColor="#15275e" />
        </linearGradient>
      </defs>
      <circle cx="160" cy="160" r="152" fill="url(#ea-halo)" />
      {STARS.map(([x, y, r, d]) => (
        <circle key={`${x}-${y}`} className="ea-tw" cx={x} cy={y} r={r} fill="#dbeaff" style={{ animationDelay: `${-d}s` }} />
      ))}
      {children}
    </svg>
  );
}

/* ── Shared pieces ───────────────────────────────────────────── */

/** A rocket, nose at (0,-90), nozzle at y 30-40. */
function Rocket({ flame }: { flame?: boolean }) {
  return (
    <g {...INK}>
      {flame && (
        <>
          <path className="ea-flicker" d="M-15 42 Q0 108 15 42 Z" fill="url(#ea-flame)" stroke="none" />
          <path className="ea-flicker" d="M-7 42 Q0 80 7 42 Z" fill="#fff6e0" stroke="none" style={{ animationDelay: '-0.09s' }} />
        </>
      )}
      <path d="M-26 10 L-50 48 L-24 37 Z" fill="url(#ea-neon)" />
      <path d="M26 10 L50 48 L24 37 Z" fill="url(#ea-neon)" />
      <rect x="-18" y="29" width="36" height="11" rx="3" />
      <path d="M0 -90 C26 -64 32 -20 26 30 H-26 C-32 -20 -26 -64 0 -90 Z" />
      <path d="M-12 -62 C-5 -67 5 -67 12 -62" fill="none" strokeOpacity="0.6" />
      <circle cy="-30" r="14" fill="url(#ea-visor)" />
      <path d="M-7 -36 q4 -4 10 -3" fill="none" stroke="#fff" strokeOpacity="0.8" />
      <path d="M-28 4 H28" fill="none" stroke="url(#ea-neon)" strokeWidth="3" />
    </g>
  );
}

/** A radio dish on a stand. The stand's foot sits 74px below (x, y). */
function Dish({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y})`} {...INK}>
      <path d="M-26 74 L-9 26 H9 L26 74 Z" />
      <g transform={`translate(0 24) rotate(${angle}) translate(0 -30)`}>
        <path d="M-58 0 Q0 54 58 0 Z" />
        <ellipse rx="58" ry="11" fill="#142050" />
        <path d="M-38 4 L0 -46 L38 4" fill="none" />
        <circle cy="-50" r="6.5" fill="url(#ea-neon)" />
      </g>
      <circle cy="24" r="7" />
    </g>
  );
}

/** Floats, with an optional phase so neighbours don't bob in step. */
function Float({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <g className="ea-float" style={delay ? { animationDelay: `${-delay}s` } : undefined}>{children}</g>;
}

/** A small spark of short rays, blinking. */
function Spark({ x, y, color = '#ffb86b', delay = 0 }: { x: number; y: number; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ea-blink" stroke={color} strokeWidth="2.4" strokeLinecap="round" style={{ animationDelay: `${-delay}s` }}>
        <path d="M0 -12 V-5 M0 5 V12 M-12 0 H-5 M5 0 H12 M-8 -8 l3 3 M5 5 l3 3 M8 -8 l-3 3 M-5 5 l-3 3" />
      </g>
    </g>
  );
}

function Drift({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <g className="ea-drift" style={{ animationDelay: `${-delay}s` }}>{children}</g>;
}

function Smoke({ x, y, r, delay = 0 }: { x: number; y: number; r: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className="ea-rise" r={r} fill="#3a4a80" fillOpacity="0.55" stroke="#8a9ad0" strokeOpacity="0.45" strokeWidth="1.6" style={{ animationDelay: `${-delay}s` }} />
    </g>
  );
}

/* ── 4xx ─────────────────────────────────────────────────────── */

/** 400 - a dish catching a signal that arrives in pieces. */
function Garbled() {
  const noise: [number, number, number][] = [
    [214, 52, 0], [262, 66, 0.7], [278, 132, 1.3], [238, 150, 0.4], [198, 94, 1.9], [292, 92, 1.1], [250, 40, 2.3],
  ];
  return (
    <Frame>
      <path d="M68 264 H252" stroke="#cfe3ff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <Dish x={146} y={190} angle={34} />
      <g fill="none" stroke="url(#ea-neon)" strokeWidth="3" strokeLinecap="round">
        <path className="ea-tw" d="M236 92 A26 26 0 0 1 252 112" strokeDasharray="10 6" />
        <path className="ea-tw" d="M232 70 A46 46 0 0 1 270 112" strokeDasharray="14 7 3 7" style={{ animationDelay: '-0.8s' }} />
        <path className="ea-tw" d="M228 48 A66 66 0 0 1 290 114" strokeDasharray="6 9 18 9" style={{ animationDelay: '-1.6s' }} />
      </g>
      <path d="M190 128 l8 -8 l6 6 l8 -10 l6 6" fill="none" stroke="#ff7aa8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {noise.map(([x, y, d]) => (
        <rect key={`${x}-${y}`} className="ea-tw" x={x} y={y} width="7" height="7" rx="1.5" fill="url(#ea-neon)" style={{ animationDelay: `${-d}s` }} />
      ))}
    </Frame>
  );
}

/** 401 - a hatch padlocked shut, the keycard just out of reach. */
function Locked() {
  const bolts = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return [Math.round((160 + 29 * Math.cos(a)) * 100) / 100, Math.round((198 + 29 * Math.sin(a)) * 100) / 100];
  });
  return (
    <Frame>
      <Float>
        <path d="M122 150 V114 A38 38 0 0 1 198 114 V150" fill="none" stroke="#cfe3ff" strokeWidth="20" strokeLinecap="round" />
        <path d="M122 150 V114 A38 38 0 0 1 198 114 V150" fill="none" stroke="#1d2e60" strokeWidth="14" strokeLinecap="round" />
        <g {...INK}>
          <rect x="96" y="142" width="128" height="112" rx="24" />
          <circle cx="160" cy="198" r="35" fill="#0b1230" />
          <circle cx="160" cy="198" r="23" fill="url(#ea-visor)" stroke="none" opacity="0.9" />
          <circle cx="112" cy="158" r="3" fill="#8cc4ff" stroke="none" />
          <circle cx="112" cy="238" r="3" fill="#8cc4ff" stroke="none" />
          <circle cx="208" cy="238" r="3" fill="#8cc4ff" stroke="none" />
        </g>
        {bolts.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#8cc4ff" />)}
        <circle cx="160" cy="193" r="6.5" fill="#02030a" />
        <path d="M156 196 H164 L162 211 H158 Z" fill="#02030a" />
        <circle className="ea-blink" cx="208" cy="158" r="4.5" fill="#ff6b81" />
      </Float>
      <Float delay={2.2}>
        <g transform="translate(250 92) rotate(16)" {...INK}>
          <rect x="-26" y="-17" width="52" height="34" rx="6" />
          <rect x="-26" y="-9" width="52" height="7" fill="url(#ea-neon)" stroke="none" />
          <rect x="-17" y="5" width="15" height="6" rx="2" fill="#8cc4ff" stroke="none" />
          <circle cx="13" cy="8" r="4" fill="none" strokeOpacity="0.7" />
        </g>
      </Float>
    </Frame>
  );
}

/** 403 - a station under a force field, a no-entry beacon above it. */
function Shielded() {
  return (
    <Frame>
      <defs>
        <pattern id="ea-hex" width="24" height="42" patternUnits="userSpaceOnUse">
          <path d="M0 7 L12 0 L24 7 V21 L12 28 L0 21 Z M12 28 V42" fill="none" stroke="#8fd8ff" strokeOpacity="0.28" strokeWidth="1.2" />
        </pattern>
        <linearGradient id="ea-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ce0ff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#bc6fff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g {...INK}>
        <ellipse cx="160" cy="252" rx="114" ry="15" fill="#0e1636" />
        <rect x="132" y="212" width="56" height="36" rx="9" />
        <circle cx="148" cy="228" r="5" fill="url(#ea-visor)" />
        <circle cx="172" cy="228" r="5" fill="url(#ea-visor)" />
        <path d="M160 212 V192" fill="none" />
        <circle cx="160" cy="189" r="4" fill="url(#ea-neon)" />
      </g>
      <path d="M62 250 A98 98 0 0 1 258 250 Z" fill="url(#ea-shield)" stroke="#8fd8ff" strokeWidth="2" />
      <path d="M62 250 A98 98 0 0 1 258 250 Z" fill="url(#ea-hex)" />
      <path className="ea-tw" d="M84 198 A98 98 0 0 1 140 156" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <Spark x={74} y={176} color="#8fd8ff" delay={0.4} />
      <Float delay={1.4}>
        <circle className="ea-tw" cx="248" cy="80" r="34" fill="#ff6b81" opacity="0.14" />
        <circle cx="248" cy="80" r="22" fill="#2a0f22" stroke="#ff6b81" strokeWidth="2.6" />
        <rect x="234" y="76" width="28" height="8" rx="3" fill="#ff6b81" />
      </Float>
    </Frame>
  );
}

/** 404 - an astronaut adrift, the tether cut, far from home. */
function Adrift() {
  return (
    <Frame>
      <g {...INK}>
        <ellipse cx="74" cy="250" rx="52" ry="11" transform="rotate(-16 74 250)" fill="none" stroke="url(#ea-neon)" strokeOpacity="0.8" />
        <circle cx="74" cy="250" r="30" />
        <ellipse cx="64" cy="242" rx="7" ry="4" fill="#142050" />
        <ellipse cx="86" cy="260" rx="5" ry="3" fill="#142050" />
      </g>
      <Float>
        <path d="M182 162 C214 182 236 140 258 168 S272 226 250 240" fill="none" stroke="#8cc4ff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M250 240 l-8 3 M250 240 l-3 8 M250 240 l5 6" stroke="#8cc4ff" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(150 160) rotate(-18)" {...INK}>
          <rect x="-31" y="-16" width="62" height="58" rx="14" />
          <rect x="-21" y="34" width="17" height="34" rx="8" />
          <rect x="4" y="34" width="17" height="34" rx="8" />
          <rect x="-46" y="-6" width="17" height="40" rx="8.5" transform="rotate(18 -37 0)" />
          <rect x="-25" y="-12" width="50" height="56" rx="18" />
          <rect x="28" y="-46" width="17" height="40" rx="8.5" transform="rotate(-28 36 -8)" />
          <circle cy="-36" r="29" />
          <rect x="-20" y="-50" width="40" height="27" rx="13.5" fill="url(#ea-visor)" stroke="none" />
          <path d="M-12 -44 q6 -4 13 -3" fill="none" stroke="#fff" strokeOpacity="0.8" />
          <rect x="-12" y="4" width="24" height="15" rx="4" fill="#0b1230" />
          <circle cx="-5" cy="11.5" r="2.5" fill="#5ce0ff" stroke="none" />
          <circle cx="5" cy="11.5" r="2.5" fill="#bc6fff" stroke="none" />
        </g>
      </Float>
      <Float delay={3}>
        <text x="222" y="104" transform="rotate(14 230 92)" fontFamily="Orbitron, sans-serif" fontWeight="800" fontSize="40" fill="url(#ea-neon)">?</text>
      </Float>
    </Frame>
  );
}

/** 408 - an hourglass whose sand drifts off before it lands. */
function Hourglass() {
  return (
    <Frame>
      <Float>
        <g transform="rotate(-12 160 160)">
          <path d="M124 94 C124 140 154 150 154 160 C154 170 124 180 124 226 H196 C196 180 166 170 166 160 C166 150 196 140 196 94 Z" fill="#5ce0ff" fillOpacity="0.07" stroke="#cfe3ff" strokeWidth="2" strokeLinejoin="round" />
          <path d="M140 126 H180 C176 140 164 150 160 156 C156 150 144 140 140 126 Z" fill="url(#ea-neon)" />
          <path d="M127 224 C140 194 180 194 193 224 Z" fill="url(#ea-neon)" />
          <path className="ea-flow" d="M160 158 V204" stroke="#7fe8ff" strokeWidth="2.4" strokeDasharray="2 6" strokeLinecap="round" />
          <g {...INK}>
            <path d="M114 94 V226 M206 94 V226" fill="none" strokeWidth="3" />
            <rect x="104" y="80" width="112" height="14" rx="7" />
            <rect x="104" y="226" width="112" height="14" rx="7" />
          </g>
        </g>
      </Float>
      {[[206, 150, 0], [222, 136, 1.2], [214, 168, 2.2], [236, 152, 3]].map(([x, y, d]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <Drift delay={d}><circle r="2.6" fill="url(#ea-neon)" /></Drift>
        </g>
      ))}
    </Frame>
  );
}

/** 410 - a star that has burned out and is crumbling away. */
function BurnedOut() {
  return (
    <Frame>
      <defs>
        <radialGradient id="ea-dead" cx="38%" cy="34%">
          <stop offset="0" stopColor="#4a5478" />
          <stop offset="1" stopColor="#11162a" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="168" r="86" fill="none" stroke="#8cc4ff" strokeOpacity="0.3" strokeDasharray="2 9" strokeWidth="2" />
      <circle cx="150" cy="168" r="60" fill="url(#ea-dead)" stroke="#6f7cab" strokeWidth="2" />
      <g fill="none" stroke="#3c4670" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M112 140 l16 10 l-4 14 l12 9" />
        <path d="M172 126 l-8 17 l11 12" />
        <path d="M134 206 l12 -10 l14 6 l7 -12" />
      </g>
      <g fill="#1c2340" stroke="#4a557f" strokeWidth="1.6">
        <ellipse cx="176" cy="188" rx="10" ry="6" />
        <ellipse cx="126" cy="176" rx="7" ry="4" />
        <ellipse cx="156" cy="146" rx="5" ry="3" />
      </g>
      <path d="M180 116 c6 -10 -4 -16 4 -27" fill="none" stroke="#6f7cab" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      {[[214, 112, 0, 'M0 -6 L7 -1 L4 6 L-5 4 Z'], [236, 94, 1.6, 'M0 -5 L6 0 L1 5 L-5 1 Z'], [222, 132, 2.8, 'M0 -4 L4 2 L-4 3 Z']].map(([x, y, d, p]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <Drift delay={d as number}><path d={p as string} fill="#2a3358" stroke="#6f7cab" strokeWidth="1.6" strokeLinejoin="round" /></Drift>
        </g>
      ))}
      {[[204, 128, 0.6], [248, 112, 2], [230, 78, 3.4]].map(([x, y, d]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <Drift delay={d}><circle r="2.2" fill="#ff9a6b" opacity="0.75" /></Drift>
        </g>
      ))}
    </Frame>
  );
}

/** 429 - a rocket pushed too hard, the gauge in the red. */
function Overheated() {
  return (
    <Frame>
      <Smoke x={98} y={248} r={14} />
      <Smoke x={74} y={262} r={10} delay={1.2} />
      <Smoke x={120} y={268} r={9} delay={2.1} />
      <Float>
        <g transform="translate(170 148) rotate(32)"><Rocket flame /></g>
      </Float>
      <g fill="none" stroke="#ff9a6b" strokeWidth="2.4" strokeLinecap="round">
        <path className="ea-tw" d="M232 78 q8 -7 0 -14 q-8 -7 0 -14" />
        <path className="ea-tw" d="M250 92 q8 -7 0 -14 q-8 -7 0 -14" style={{ animationDelay: '-0.7s' }} />
        <path className="ea-tw" d="M268 106 q8 -7 0 -14 q-8 -7 0 -14" style={{ animationDelay: '-1.4s' }} />
      </g>
      <g {...INK}>
        <rect x="50" y="48" width="18" height="76" rx="9" />
        <circle cx="59" cy="128" r="13" fill="#ff6b6b" />
        <path d="M68 62 h6 M68 76 h6 M68 90 h6 M68 104 h6" fill="none" />
      </g>
      <rect className="ea-tw" x="55" y="58" width="8" height="66" rx="4" fill="#ff6b6b" style={{ animationDuration: '1.4s' }} />
    </Frame>
  );
}

/* ── 5xx and crashes ─────────────────────────────────────────── */

/** 500 - a satellite with a snapped solar panel, sparking. */
function Broken() {
  return (
    <Frame>
      <Smoke x={168} y={104} r={9} />
      <Smoke x={178} y={86} r={12} delay={1.5} />
      <Float>
        <g transform="rotate(-10 160 166)">
          <g {...INK}>
            <path d="M126 166 H136 M188 166 H196" fill="none" strokeWidth="3" />
            <rect x="56" y="146" width="70" height="40" rx="3" fill="url(#ea-panel)" />
            <path d="M73.5 146 V186 M91 146 V186 M108.5 146 V186 M56 166 H126" fill="none" strokeOpacity="0.5" />
            <g transform="rotate(36 196 166)">
              <path d="M196 148 H246 L238 160 L252 170 L240 184 H196 Z" fill="url(#ea-panel)" />
              <path d="M212 148 V184 M228 148 V184 M196 166 H244" fill="none" strokeOpacity="0.5" />
            </g>
            <path d="M148 136 Q164 116 180 136" />
            <path d="M164 126 V108" fill="none" />
            <circle cx="164" cy="105" r="4" fill="url(#ea-neon)" />
            <rect x="136" y="136" width="56" height="60" rx="8" />
            <rect x="136" y="172" width="56" height="6" fill="url(#ea-amber)" stroke="none" />
          </g>
          <circle className="ea-blink" cx="150" cy="150" r="4.5" fill="#ffb86b" />
        </g>
      </Float>
      <Spark x={202} y={170} />
      <Spark x={214} y={150} delay={0.5} />
      <g transform="translate(266 214)">
        <Drift delay={1}><path d="M0 0 l18 4 l-6 14 l-16 -6 Z" fill="url(#ea-panel)" stroke="#cfe3ff" strokeWidth="2" strokeLinejoin="round" /></Drift>
      </g>
    </Frame>
  );
}

/** 502 - two relay towers, the link between them snapped. */
function Relay() {
  const tower = 'M-16 0 L0 -104 L16 0 M-12 -26 H12 M-9 -50 H9 M-6 -74 H6 M-12 -26 L9 -50 M-9 -50 L6 -74';
  return (
    <Frame>
      <path d="M10 282 Q160 236 310 282 Q160 330 10 282 Z" fill="url(#ea-hull)" stroke="#cfe3ff" strokeWidth="2" />
      <g {...INK} fill="none">
        <path d={tower} transform="translate(80 264)" />
        <path d={tower} transform="translate(240 264)" />
      </g>
      <g {...INK}>
        <circle cx="80" cy="152" r="9" />
        <circle cx="240" cy="152" r="9" />
      </g>
      <circle className="ea-blink" cx="80" cy="152" r="3.5" fill="#5ce0ff" />
      <circle cx="240" cy="152" r="3.5" fill="#4a557f" />
      <path className="ea-flow" d="M92 150 L132 141" stroke="url(#ea-neon)" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <path d="M188 141 L228 150" stroke="#8cc4ff" strokeOpacity="0.3" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <g fill="none" stroke="#cfe3ff" strokeWidth="3">
        <rect x="124" y="132" width="26" height="16" rx="8" transform="rotate(-16 137 140)" />
        <rect x="170" y="128" width="26" height="16" rx="8" transform="rotate(16 183 136)" />
      </g>
      <g transform="translate(160 136)">
        <path className="ea-blink" d="M0 -14 l3.5 10.5 l10.5 3.5 l-10.5 3.5 l-3.5 10.5 l-3.5 -10.5 l-10.5 -3.5 l10.5 -3.5 Z" fill="url(#ea-amber)" />
      </g>
    </Frame>
  );
}

/** 503 - a station docked for repairs, a robot arm at work. */
function Maintenance() {
  return (
    <Frame>
      <ellipse cx="160" cy="170" rx="94" ry="26" fill="none" stroke="#8cc4ff" strokeOpacity="0.45" strokeWidth="2" />
      <g {...INK}>
        <path d="M90 170 H116 M204 170 H230" fill="none" strokeWidth="3" />
        <rect x="40" y="156" width="50" height="28" rx="3" fill="url(#ea-panel)" />
        <rect x="230" y="156" width="50" height="28" rx="3" fill="url(#ea-panel)" />
        <path d="M56.6 156 V184 M73.3 156 V184 M246.6 156 V184 M263.3 156 V184" fill="none" strokeOpacity="0.5" />
        <rect x="154" y="132" width="12" height="12" rx="3" />
        <rect x="114" y="142" width="92" height="54" rx="27" />
        <circle cx="140" cy="169" r="5.5" fill="url(#ea-visor)" />
        <circle cx="160" cy="169" r="5.5" fill="url(#ea-visor)" />
        <circle cx="180" cy="169" r="5.5" fill="url(#ea-visor)" />
      </g>
      <path d="M66 170 A94 26 0 0 0 254 170" fill="none" stroke="#cfe3ff" strokeWidth="2" />
      <circle className="ea-tw" cx="160" cy="128" r="12" fill="#ffb86b" opacity="0.2" />
      <circle className="ea-blink" cx="160" cy="128" r="5" fill="#ffb86b" />
      <Float delay={1}>
        <path d="M304 34 L250 74 L218 116" fill="none" stroke="#cfe3ff" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M304 34 L250 74 L218 116" fill="none" stroke="#22356b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="250" cy="74" r="8" fill="url(#ea-hull)" stroke="#cfe3ff" strokeWidth="2" />
        <g transform="translate(212 124) rotate(40)" fill="#cfe3ff">
          <rect x="-4" y="-22" width="8" height="26" rx="3" />
          <path d="M-11 4 A11 11 0 1 0 11 4 L4 4 V12 H-4 V4 Z" />
        </g>
      </Float>
      <Float delay={2.6}>
        <path d="M66 58 L92 104 H40 Z" fill="url(#ea-amber)" />
        <rect x="64" y="72" width="4" height="17" rx="2" fill="#02030a" />
        <circle cx="66" cy="96" r="2.5" fill="#02030a" />
      </Float>
      <g transform="translate(96 246)">
        <Drift delay={0.8}><path d="M0 -8 L7 -4 V4 L0 8 L-7 4 V-4 Z M0 -3 a3 3 0 1 0 0.01 0" fill="#cfe3ff" fillRule="evenodd" /></Drift>
      </g>
    </Frame>
  );
}

/** 504 - a dish calling out, a clock ticking, no answer coming back. */
function Waiting() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const r = (n: number) => Math.round(n * 100) / 100;
    return `M${r(238 + 24 * Math.sin(a))} ${r(92 - 24 * Math.cos(a))} L${r(238 + 20 * Math.sin(a))} ${r(92 - 20 * Math.cos(a))}`;
  }).join(' ');
  return (
    <Frame>
      <path d="M40 270 H280" stroke="#cfe3ff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <Dish x={116} y={196} angle={-32} />
      <g fill="none" stroke="url(#ea-neon)" strokeWidth="3" strokeLinecap="round">
        <path className="ea-tw" d="M70 116 A26 26 0 0 1 86 96" />
        <path className="ea-tw" d="M54 106 A46 46 0 0 1 80 72" style={{ animationDelay: '-0.6s' }} />
        <path className="ea-tw" d="M38 96 A66 66 0 0 1 74 48" style={{ animationDelay: '-1.2s' }} />
      </g>
      <Float delay={1.8}>
        <circle cx="238" cy="92" r="31" fill="url(#ea-hull)" stroke="#cfe3ff" strokeWidth="2" />
        <path d={ticks} stroke="#8cc4ff" strokeWidth="2" strokeLinecap="round" />
        <path className="ea-spin ea-spin-slow" d="M238 92 V76" stroke="#cfe3ff" strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '238px 92px' }} />
        <path className="ea-spin" d="M238 92 H256" stroke="url(#ea-amber)" strokeWidth="2.4" strokeLinecap="round" style={{ transformOrigin: '238px 92px' }} />
        <circle cx="238" cy="92" r="3.5" fill="#ffb86b" />
      </Float>
      {[0, 1, 2].map((i) => (
        <circle key={i} className="ea-blink" cx={222 + i * 16} cy="148" r="4.5" fill="#ffb86b" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </Frame>
  );
}

/** Runtime crash - a rocket nose-first in the dust of a small moon. */
export function CrashArt() {
  return (
    <Frame>
      <Smoke x={138} y={146} r={10} />
      <Smoke x={126} y={120} r={14} delay={1.1} />
      <Smoke x={116} y={90} r={18} delay={2.2} />
      <g transform="translate(166 194) rotate(150)"><Rocket /></g>
      <path d="M-6 250 Q160 212 326 250 Q160 340 -6 250 Z" fill="url(#ea-hull)" stroke="#cfe3ff" strokeWidth="2" />
      <g fill="#142050" stroke="#4a557f" strokeWidth="1.6">
        <ellipse cx="78" cy="260" rx="18" ry="5" />
        <ellipse cx="236" cy="266" rx="20" ry="5" />
      </g>
      <g fill="url(#ea-hull)" stroke="#cfe3ff" strokeWidth="2" strokeLinejoin="round">
        <path d="M188 238 l10 -8 l8 6 l-4 6 Z" />
        <path d="M238 238 l8 -6 l7 5 l-3 5 Z" />
        <path d="M168 242 l6 -5 l6 4 Z" />
      </g>
      <Spark x={234} y={222} />
      <Spark x={256} y={204} delay={0.6} />
      <g transform="translate(60 84)">
        <Drift delay={1.4}><path d="M0 -8 L7 -4 V4 L0 8 L-7 4 V-4 Z M0 -3 a3 3 0 1 0 0.01 0" fill="#cfe3ff" fillRule="evenodd" /></Drift>
      </g>
    </Frame>
  );
}

export const ERROR_ART = {
  '400': <Garbled />,
  '401': <Locked />,
  '403': <Shielded />,
  '404': <Adrift />,
  '408': <Hourglass />,
  '410': <BurnedOut />,
  '429': <Overheated />,
  '500': <Broken />,
  '502': <Relay />,
  '503': <Maintenance />,
  '504': <Waiting />,
} satisfies Record<ErrorCode, ReactNode>;
