'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DesignStudy } from './types';

/**
 * The "Visual Design System" section of a UI/UX case study, as something to
 * use rather than read: pick a colour from the strip to inspect it (values you
 * can copy, WCAG contrast against white and black), watch a small UI built
 * from the palette re-theme around it, and type into a live specimen of each
 * typeface at any size and weight.
 */

type System = DesignStudy['system'];

/* ── Colour maths ── */

const rgbOf = (hex: string) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};

const hslOf = ([r, g, b]: readonly number[]) => {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb), d = max - min;
  const l = (max + min) / 2;
  if (!d) return [0, 0, Math.round(l * 100)];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === rr ? ((gg - bb) / d) % 6 : max === gg ? (bb - rr) / d + 2 : (rr - gg) / d + 4;
  return [Math.round((h * 60 + 360) % 360), Math.round(s * 100), Math.round(l * 100)];
};

const luminance = (hex: string) => {
  const [r, g, b] = rgbOf(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const grade = (ratio: number) =>
  ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail';

/** Black or white text, whichever reads better on `bg`. */
const inkOn = (bg: string) => (contrast(bg, '#ffffff') >= contrast(bg, '#0b0b10') ? '#ffffff' : '#0b0b10');

/* Faces the site already loads from Google Fonts (app/layout.tsx); anything
   else is a licensed face shown in the nearest loaded stand-in. */
const LOADED = ['Inter', 'Instrument Sans', 'Lexend', 'Poppins', 'Sora', 'Montserrat'];
const STAND_IN: Record<string, string> = { Gilroy: 'Poppins', 'SF Pro Display': 'Inter' };
const familyOf = (name: string) =>
  `'${name}', '${STAND_IN[name] || 'Poppins'}', system-ui, sans-serif`;

const WEIGHTS = [300, 400, 500, 600, 700];

/* ── Component ── */

export default function DesignSystem({ system, title }: { system: System; title: string }) {
  const colors = system.colors;
  const [sel, setSel] = useState(0);
  const [surfaceMode, setSurfaceMode] = useState<'dark' | 'light'>('dark');
  const [toggle, setToggle] = useState(true);
  const [copied, setCopied] = useState('');
  const timer = useRef<number | undefined>(undefined);

  const [font, setFont] = useState(0);
  const [sample, setSample] = useState(title);
  const [size, setSize] = useState(44);
  const [weight, setWeight] = useState(600);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const byLum = useMemo(() => [...colors].sort((a, b) => luminance(a.hex) - luminance(b.hex)), [colors]);
  const darkest = byLum[0].hex;
  const lightest = byLum[byLum.length - 1].hex;

  const c = colors[sel];
  const rgb = rgbOf(c.hex);
  const [h, s, l] = hslOf(rgb);
  const values = [
    { k: 'HEX', v: c.hex.toUpperCase() },
    { k: 'RGB', v: `${rgb[0]}, ${rgb[1]}, ${rgb[2]}` },
    { k: 'HSL', v: `${h}°, ${s}%, ${l}%` },
  ];

  // The preview's surface: the palette's own darkest or lightest colour (or
  // plain black / white if the palette has no dark or light tone at all).
  const darkSurface = luminance(darkest) < 0.08 ? darkest : '#0d0d14';
  const lightSurface = luminance(lightest) > 0.75 ? lightest : '#ffffff';
  let surface = surfaceMode === 'dark' ? darkSurface : lightSurface;
  if (surface.toLowerCase() === c.hex.toLowerCase()) surface = surfaceMode === 'dark' ? '#0d0d14' : '#ffffff';
  const ink = inkOn(surface);
  const accent = c.hex;
  const onAccent = inkOn(accent);
  const accentRatio = contrast(accent, surface);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(''), 1600);
  };

  const f = system.fonts[font];
  const standIn = !LOADED.includes(f.name);

  return (
    <div className="gs-ds">
      {/* Palette strip */}
      <div className="gs-ds-head">
        <h3 className="gs-h3">Colour palette</h3>
        <span className="gs-ds-hint">Select a colour to inspect it and re-theme the preview</span>
      </div>
      <div className="gs-ds-strip" role="radiogroup" aria-label={`${title} colour palette`}>
        {colors.map((col, i) => (
          <button key={col.hex + i} type="button" role="radio" aria-checked={i === sel}
            className={`gs-ds-chip${i === sel ? ' on' : ''}`}
            style={{ background: col.hex, color: inkOn(col.hex) }}
            aria-label={`${col.name || 'Colour'} ${col.hex}`}
            onClick={() => setSel(i)}>
            <span className="gs-ds-chip-name">{col.name || `Colour ${i + 1}`}</span>
            <span className="gs-ds-chip-hex">{col.hex.toUpperCase()}</span>
          </button>
        ))}
      </div>

      <div className="gs-ds-grid">
        {/* Inspector */}
        <div className="gs-ds-card gs-ds-inspect">
          <div className="gs-ds-tile" style={{ background: c.hex, color: inkOn(c.hex) }}>
            <span>{c.name || 'Colour'}</span>
            <b>Aa</b>
          </div>
          <div className="gs-ds-values">
            {values.map((v) => (
              <button key={v.k} type="button" className="gs-ds-value" onClick={() => copy(v.v)}
                aria-label={`Copy ${v.k} ${v.v}`}>
                <small>{v.k}</small>
                <code>{v.v}</code>
                <i aria-hidden="true">{copied === v.v ? '✓' : '⧉'}</i>
              </button>
            ))}
          </div>
          <div className="gs-ds-contrast">
            {(['#ffffff', '#000000'] as const).map((bg) => {
              const r = contrast(c.hex, bg);
              const g = grade(r);
              return (
                <div key={bg} className="gs-ds-ratio">
                  <span className="gs-ds-ratio-swatch" style={{ background: bg, color: c.hex }}>Aa</span>
                  <span>
                    <b>{r.toFixed(2)}:1</b>
                    <small>on {bg === '#ffffff' ? 'white' : 'black'}</small>
                  </span>
                  <em className={`gs-ds-grade ${g === 'Fail' ? 'fail' : g === 'AA Large' ? 'mid' : 'pass'}`}>{g}</em>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live preview */}
        <div className="gs-ds-card gs-ds-live">
          <div className="gs-ds-live-bar">
            <span>Live preview</span>
            <div className="gs-ds-seg" role="group" aria-label="Preview surface">
              {(['dark', 'light'] as const).map((m) => (
                <button key={m} type="button" aria-pressed={surfaceMode === m}
                  className={surfaceMode === m ? 'on' : ''} onClick={() => setSurfaceMode(m)}>
                  {m === 'dark' ? 'Dark' : 'Light'}
                </button>
              ))}
            </div>
          </div>
          <div className="gs-ds-mock" style={{ background: surface, color: ink, fontFamily: familyOf(system.fonts[0].name) }}>
            <span className="gs-ds-mock-kicker" style={{ color: accent }}>{title}</span>
            <h4>Designed around one palette</h4>
            <p>Every background, button and state in this project is built from the colour and type tokens on the left.</p>
            <div className="gs-ds-mock-row">
              <span className="gs-ds-btn" style={{ background: accent, color: onAccent }}>Get started</span>
              <span className="gs-ds-btn ghost" style={{ borderColor: accent, color: accentRatio >= 3 ? accent : ink }}>Learn more</span>
            </div>
            <div className="gs-ds-mock-row">
              {colors.slice(0, 4).map((col, i) => (
                <span key={col.hex + i} className="gs-ds-tag"
                  style={{ background: `color-mix(in srgb, ${col.hex} 18%, transparent)`, borderColor: col.hex }}>
                  {col.name || col.hex}
                </span>
              ))}
            </div>
            <div className="gs-ds-mock-row gs-ds-mock-controls">
              <span className="gs-ds-progress" style={{ background: `color-mix(in srgb, ${ink} 14%, transparent)` }}>
                <span style={{ background: accent }} />
              </span>
              <button type="button" role="switch" aria-checked={toggle} aria-label="Preview toggle"
                className={`gs-ds-switch${toggle ? ' on' : ''}`}
                style={{ background: toggle ? accent : `color-mix(in srgb, ${ink} 25%, transparent)` }}
                onClick={() => setToggle((t) => !t)}>
                <span style={{ background: toggle ? onAccent : surface }} />
              </button>
            </div>
          </div>
          <div className="gs-ds-live-foot">
            Accent on this surface <b>{accentRatio.toFixed(2)}:1</b>
            <em className={`gs-ds-grade ${grade(accentRatio) === 'Fail' ? 'fail' : grade(accentRatio) === 'AA Large' ? 'mid' : 'pass'}`}>
              {grade(accentRatio)}
            </em>
          </div>
        </div>
      </div>

      {/* Type specimen */}
      <div className="gs-ds-head">
        <h3 className="gs-h3">Typography</h3>
        <span className="gs-ds-hint">Type in your own text and try out different sizes and weights</span>
      </div>
      <div className="gs-ds-card gs-ds-type">
        {system.fonts.length > 1 && (
          <div className="gs-ds-seg gs-ds-fonts" role="tablist" aria-label="Typefaces">
            {system.fonts.map((ff, i) => (
              <button key={ff.name} type="button" role="tab" aria-selected={i === font}
                className={i === font ? 'on' : ''} onClick={() => setFont(i)}>
                {ff.name}
              </button>
            ))}
          </div>
        )}
        <div className="gs-ds-type-main">
          <div className="gs-ds-aa" style={{ fontFamily: familyOf(f.name), color: accent }} aria-hidden="true">Aa</div>
          <div className="gs-ds-type-info">
            <b>{f.name}</b>
            <p>{f.use}</p>
            {standIn && <small>Licensed face - previewed here in {STAND_IN[f.name] || 'Poppins'}, its closest web match.</small>}
          </div>
        </div>
        {/* A textarea so long text and large sizes wrap instead of clipping on a phone. */}
        <textarea className="gs-ds-sample" value={sample} onChange={(e) => setSample(e.target.value)}
          aria-label="Specimen text" spellCheck={false} rows={2}
          style={{ fontFamily: familyOf(f.name), fontSize: size, fontWeight: weight }} />
        <div className="gs-ds-type-controls">
          <label className="gs-ds-range">
            <span>Size <b>{size}px</b></span>
            <input type="range" min={14} max={84} value={size} onChange={(e) => setSize(+e.target.value)} />
          </label>
          <div className="gs-ds-seg" role="group" aria-label="Weight">
            {WEIGHTS.map((w) => (
              <button key={w} type="button" aria-pressed={weight === w} className={weight === w ? 'on' : ''}
                onClick={() => setWeight(w)} style={{ fontWeight: w }}>
                {w}
              </button>
            ))}
          </div>
        </div>
        <div className="gs-ds-glyphs" style={{ fontFamily: familyOf(f.name), fontWeight: weight }} aria-hidden="true">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 &amp; ? ! @ % ₹ $
        </div>
      </div>
      <p className="gs-ds-live-region" aria-live="polite">{copied ? `Copied ${copied}` : ''}</p>
    </div>
  );
}
