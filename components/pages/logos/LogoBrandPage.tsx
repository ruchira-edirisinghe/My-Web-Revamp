'use client';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { cssVars } from '@/lib/css';
import { pad2, useReveal } from '@/components/pages/galleries/parts';
import { Art, Mono, Photo } from './art';
import { LOGO_BRANDS, art, logoBrand, type LogoBrand, type Swatch } from './data';
import { Signage, Stationery, Uses } from './Mockups';
import { Icon } from '@/components/ui/Icon';

/**
 * A logo's brand guidelines, one page per logo in the Logo Designs gallery:
 * the idea and how it was reached, the logo and its versions, construction,
 * colour, type and pattern, and the brand on signs, paper and products. All
 * of it is drawn in code around the logo artwork, so every screen reflows
 * to any width. Data: data.ts. Mockups: Mockups.tsx. Styles: logo-brand.css.
 */

/* ── Colour maths ──────────────────────────────────── */

const rgbOf = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lum = (hex: string) => {
  const [r, g, b] = rgbOf(hex).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const sat = (hex: string) => { const c = rgbOf(hex); const mx = Math.max(...c), mn = Math.min(...c); return mx ? (mx - mn) / mx : 0; };
const cmykOf = (hex: string) => {
  const [r, g, b] = rgbOf(hex).map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return [0, 0, 0, 100];
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) => Math.round(v * 100));
};
/** Text colour that reads on a swatch. */
const inkOn = (hex: string) => (lum(hex) > 0.36 ? '#0b0d14' : '#ffffff');

/** The page's palette, as CSS variables, worked out from the brand's colours. */
function themeOf(b: LogoBrand) {
  const byLum = [...b.colors].sort((x, y) => lum(x.hex) - lum(y.hex));
  const p = b.colors[0].hex;
  const d = lum(byLum[0].hex) < 0.05 ? byLum[0].hex : '#0b0d14';
  const l = lum(byLum[byLum.length - 1].hex) > 0.7 ? byLum[byLum.length - 1].hex : '#f7f7f5';
  const x = b.colors.find((c) => ![p, d, l].includes(c.hex))?.hex ?? p;
  // The colour that glows on the site's night sky: the brightest saturated one.
  const g = [...b.colors].filter((c) => lum(c.hex) > 0.06 && sat(c.hex) > 0.3).sort((a, z) => sat(z.hex) * lum(z.hex) ** 0.3 - sat(a.hex) * lum(a.hex) ** 0.3)[0]?.hex ?? '#8cd2ff';
  return cssVars({
    '--p': p, '--pi': inkOn(p), '--d': d, '--l': l, '--x': x, '--xi': inkOn(x), '--g': g, '--a': g,
    '--fd': `'${b.display.family}', 'Montserrat', sans-serif`,
    '--ft': `'${b.text.family}', 'Montserrat', sans-serif`,
  });
}

const CHAPTERS = [
  ['thinking', 'Thinking'], ['logo', 'Logo'], ['colourways', 'Colourways'], ['construction', 'Construction'],
  ['colour', 'Colour'], ['type', 'Type'], ['pattern', 'Pattern'], ['world', 'In the world'],
  ['stationery', 'Stationery'], ['in-use', 'In use'], ['usage', 'Usage'],
] as const;

function Chapter({ id, title, children, intro }: { id: (typeof CHAPTERS)[number][0]; title: string; intro: ReactNode; children: ReactNode }) {
  const n = CHAPTERS.findIndex((c) => c[0] === id) + 1;
  return (
    <section id={id} className="lb-sec" aria-labelledby={`${id}-h`}>
      <header className="lb-sec-head gx-rv">
        <span className="lb-sec-no" aria-hidden="true">{pad2(n)}</span>
        <div>
          <p className="lb-sec-kicker">{CHAPTERS[n - 1][1]}</p>
          <h2 id={`${id}-h`}>{title}</h2>
        </div>
        <p className="lb-sec-intro">{intro}</p>
      </header>
      {children}
    </section>
  );
}

export default function LogoBrandPage({ slug, photos = [] }: { slug: string; photos?: string[] }) {
  const b = logoBrand(slug)!;
  const at = LOGO_BRANDS.indexOf(b);
  const prev = LOGO_BRANDS[(at - 1 + LOGO_BRANDS.length) % LOGO_BRANDS.length];
  const next = LOGO_BRANDS[(at + 1) % LOGO_BRANDS.length];
  const of = b.mark ? 'mark' : 'logo';

  useEffect(() => initProjects(), []);
  useReveal([slug]);

  return (
    <StandardShell active="projects" dataPage="projects" tagline={<>Brand guidelines for <span className="tagline-name">{b.name}</span></>}>
      <main className={`lb${b.illustrated ? ' is-illustrated' : ''}`} style={themeOf(b)}>
        {/* ── Hero ── */}
        <header className="lb-hero">
          <div className="lb-hero-copy">
            <Link href="/projects/graphic/logos" className="back-link"><span><Icon name="ArrowLeft" /></span> Back to Logo Designs</Link>
            <p className="section-label">{b.sector} · Brand guidelines</p>
            <h1 className="lb-title">{b.name}</h1>
            <p className="lb-idea">“{b.idea}”</p>
            <p className="lb-client">{b.client}</p>
            <ul className="lb-keys">{b.keywords.map((k) => <li key={k}>{k}</li>)}</ul>
          </div>
          <figure className="lb-board">
            <span className="lb-board-crop" aria-hidden="true"><i /><i /><i /><i /></span>
            <img src={art(b, 'logo')} alt={`The ${b.name} logo`} decoding="async" />
            <figcaption><span>Primary logo</span><span className="lb-board-dots">{b.colors.map((c) => <i key={c.hex} style={{ background: c.hex }} />)}</span></figcaption>
          </figure>
        </header>

        <nav className="lb-toc" aria-label="Chapters">
          {CHAPTERS.map(([id, name], i) => <a key={id} href={`#${id}`}><small>{pad2(i + 1)}</small>{name}</a>)}
        </nav>

        {/* ── 01 Thinking ── */}
        <Chapter id="thinking" title="From idea to mark" intro={<>How the {b.name} logo was found, in four moves: from what the brand needed to say, to a symbol, to a shape, to its colour and type.</>}>
          <ol className="lb-steps">
            {(['The brief', 'The symbol', 'The shape', 'Colour & type'] as const).map((t, i) => (
              <li key={t} className="lb-step gx-rv" style={cssVars({ '--i': i })}>
                <div className={`lb-step-vis is-${i}`}><StepVisual b={b} step={i} /></div>
                <span className="lb-step-no">{pad2(i + 1)}</span>
                <h3>{t}</h3>
                <p>{b.steps[i]}</p>
              </li>
            ))}
          </ol>
        </Chapter>

        {/* ── 02 Logo ── */}
        <Chapter id="logo" title="The primary logo" intro={<>The full logo is the brand’s signature. It comes in two versions: one for light grounds and one for dark. Always use the artwork files; never redraw or retype it.</>}>
          <div className="lb-versions">
            <figure className="lb-ver is-light gx-rv">
              <Art b={b} />
              <figcaption>On light <small>{b.colors.find((c) => lum(c.hex) > 0.7)?.name ?? 'White'}</small></figcaption>
            </figure>
            <figure className="lb-ver is-dark gx-rv" style={cssVars({ '--i': 1 })}>
              <Art b={b} on="dark" />
              <figcaption>On dark <small>{b.onDark === 'plate' ? 'On its light plate' : b.onDark === 'alt' ? 'Light ink version' : 'Full colour'}</small></figcaption>
            </figure>
          </div>
        </Chapter>

        {/* ── 03 Colourways ── */}
        <Chapter id="colourways" title="One mark, many grounds"
          intro={b.illustrated
            ? <>The {b.name} artwork is detailed and shaded, so it always keeps its full colour. On busy or dark grounds it sits on a clean plate, and in one-colour print it is reproduced in greyscale.</>
            : <>{b.mark ? 'The symbol also works on its own, as an app icon, a stamp or a favicon.' : 'The logo also works in a single colour.'} These are the approved colourways: one ink on one ground, always with strong contrast.</>}>
          <div className="lb-ways">
            {b.illustrated ? (
              <>
                <div className="lb-way gx-rv" style={{ background: 'var(--l)' }}><Art b={b} /><span>Full colour</span></div>
                <div className="lb-way gx-rv" style={{ ...cssVars({ '--i': 1 }), background: 'var(--d)', color: '#fff' }}><Art b={b} on="dark" /><span>On dark</span></div>
                <div className="lb-way gx-rv" style={{ ...cssVars({ '--i': 2 }), background: '#fff' }}><Art b={b} className="is-grey" /><span>Greyscale</span></div>
                <div className="lb-way gx-rv" style={{ ...cssVars({ '--i': 3 }), background: 'var(--x)', color: 'var(--xi)' }}><Art b={b} on="dark" className="is-plated" /><span>On colour, plated</span></div>
              </>
            ) : (
              ([
                lum(b.colors[0].hex) > 0.36 ? ['var(--p)', 'var(--d)', 'Primary on dark'] : ['var(--p)', 'var(--l)', 'Primary on light'],
                ['var(--pi)', 'var(--p)', 'Reversed on primary'],
                ['var(--g)', 'var(--d)', 'Accent on dark'],
                ['var(--d)', '#ffffff', 'One colour on white'],
              ] as const).map(([ink, ground, name], i) => (
                <div key={name} className="lb-way gx-rv" style={{ ...cssVars({ '--i': i }), background: ground, color: inkOnVar(ground, b) }}>
                  <Mono b={b} of={of} color={ink} />
                  <span>{name}</span>
                </div>
              ))
            )}
          </div>
        </Chapter>

        {/* ── 04 Construction ── */}
        <Chapter id="construction" title="Built on a grid, given room" intro={<>The {of === 'mark' ? 'symbol' : 'logo'} sits on a simple grid of halves, diagonals and circles. Keep a clear space of <b>x</b> around it on every side (x is a quarter of its height), and never use it smaller than its minimum size.</>}>
          <div className="lb-build">
            <div className="lb-grid gx-rv">
              <div className="lb-clear">
                <span className="lb-x is-t">x</span><span className="lb-x is-l">x</span><span className="lb-x is-r">x</span><span className="lb-x is-b">x</span>
                <div className="lb-grid-art">
                  <Art b={b} of={of} />
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 0 L100 100 M100 0 L0 100 M50 0 V100 M0 50 H100 M25 0 V100 M75 0 V100 M0 25 H100 M0 75 H100" />
                  </svg>
                  <svg viewBox="0 0 100 100" aria-hidden="true" className="lb-grid-rings">
                    <circle cx="50" cy="50" r="48" /><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="12" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="lb-min gx-rv" style={cssVars({ '--i': 1 })}>
              <h3>Minimum size</h3>
              <div className="lb-min-row">
                {[[100, '120 px · 30 mm'], [64, '80 px · 20 mm'], [40, b.mark ? '32 px · 10 mm' : '56 px · 15 mm']].map(([w, label], i) => (
                  <figure key={i} style={cssVars({ '--w': `${w}%` })}>
                    <span><Art b={b} of={i === 2 ? of : 'logo'} /></span>
                    <figcaption>{i === 2 ? (b.mark ? 'Symbol' : 'Smallest') : i === 0 ? 'Preferred' : 'Small'}<small>{label}</small></figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Chapter>

        {/* ── 05 Colour ── */}
        <Chapter id="colour" title="The colour system" intro={<>{b.colors[0].name} leads, the others support it. The bar shows roughly how much of each colour a typical layout uses. Click a swatch to copy its HEX code.</>}>
          <div className="lb-ratio gx-rv" aria-hidden="true">
            {b.colors.map((c, i) => <i key={c.hex} style={{ background: c.hex, flexGrow: [46, 22, 14, 10, 8][i] ?? 6 }} />)}
          </div>
          <ul className="lb-swatches">
            {b.colors.map((c, i) => <SwatchCard key={c.hex} c={c} i={i} />)}
          </ul>
        </Chapter>

        {/* ── 06 Type ── */}
        <Chapter id="type" title="Typography" intro={<>{b.display.family === b.text.family ? <>One family, <b>{b.display.family}</b>, carries the whole brand, with weight doing the work of hierarchy.</> : <><b>{b.display.family}</b> sets headlines with the brand’s voice. <b>{b.text.family}</b> handles everything people read at length.</>} Both are free Google Fonts.</>}>
          <div className="lb-type">
            <div className="lb-face is-display gx-rv">
              <span className="lb-face-role">Display</span>
              <span className="lb-aa" style={{ fontFamily: 'var(--fd)' }}>Aa</span>
              <h3 style={{ fontFamily: 'var(--fd)' }}>{b.display.family}</h3>
              <p className="lb-glyphs" style={{ fontFamily: 'var(--fd)' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 &amp;!?</p>
              <ul className="lb-weights">{b.display.weights.map((w) => <li key={w} style={{ fontFamily: 'var(--fd)', fontWeight: w }}>{w}</li>)}</ul>
            </div>
            <div className="lb-face is-text gx-rv" style={cssVars({ '--i': 1 })}>
              <span className="lb-face-role">Text</span>
              <span className="lb-aa" style={{ fontFamily: 'var(--ft)' }}>Aa</span>
              <h3 style={{ fontFamily: 'var(--ft)' }}>{b.text.family}</h3>
              <p className="lb-glyphs" style={{ fontFamily: 'var(--ft)' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 &amp;!?</p>
              <ul className="lb-weights">{b.text.weights.map((w) => <li key={w} style={{ fontFamily: 'var(--ft)', fontWeight: w }}>{w}</li>)}</ul>
            </div>
            <div className="lb-specimen gx-rv" style={cssVars({ '--i': 2 })}>
              <span className="lb-spec-tag">H1 · {b.display.family}</span>
              <p className="lb-spec-h1">{b.line}</p>
              <span className="lb-spec-tag">H2 · {b.display.family}</span>
              <p className="lb-spec-h2">{b.keywords.join(' · ')}</p>
              <span className="lb-spec-tag">Body · {b.text.family}</span>
              <p className="lb-spec-body">{b.client} {b.steps[0]}</p>
            </div>
          </div>
        </Chapter>

        {/* ── 07 Pattern ── */}
        <Chapter id="pattern" title="Pattern & texture" intro={<>The {of === 'mark' ? 'symbol' : 'logo'} repeats into a pattern for packaging, backgrounds and merchandise, and crops in close as a bold graphic that still reads as {b.name}.</>}>
          <div className="lb-pats">
            <div className={`lb-pat is-${b.pattern} gx-rv`}><Pattern b={b} kind={b.pattern} color="var(--pi)" /></div>
            <div className="lb-crop gx-rv" style={cssVars({ '--i': 1 })}>
              <Mono b={b} of={of} color="var(--p)" on="light" className="lb-crop-big" />
              <Art b={b} className="lb-crop-small" />
            </div>
            <div className="lb-pat is-dark is-grid gx-rv" style={cssVars({ '--i': 2 })}><Pattern b={b} kind="grid" color="var(--g)" /></div>
          </div>
        </Chapter>

        {/* ── 08 In the world ── */}
        <Chapter id="world" title={{ office: 'On the wall', store: 'On the shopfront', van: 'On the road', stage: 'On stage', billboard: 'On the street' }[b.signage]}
          intro={{
            office: <>On the wall where visitors arrive: the first thing anyone coming to {b.name} sees.</>,
            store: <>On the fascia, the door and the window display, the logo leads people in from the street.</>,
            van: <>Every delivery is an advert. On the side of a vehicle the logo has to read from across the road, at speed.</>,
            stage: <>On the big screen at an event, the logo has to hold its own under stage lights and a crowd’s attention.</>,
            billboard: <>At billboard scale, one logo and one line. If it reads here in a glance, it reads anywhere.</>,
          }[b.signage]}>
          <div className="lb-world gx-rv">{photos.includes(b.signage) ? <Photo b={b} scene={b.signage} /> : <Signage b={b} />}</div>
        </Chapter>

        {/* ── 09 Stationery ── */}
        <Chapter id="stationery" title="Stationery" intro={photos.includes('stationery')
          ? <>Letterhead, envelope and business cards on uncoated stock. The logo leads on white paper, and the second card carries it on a brand colour.</>
          : <>Letterhead, envelope and business cards. The front of the card carries the {b.mark ? 'symbol' : 'logo'} alone on {b.colors[0].name}; the back carries the details.</>}>
          <div className="lb-desk gx-rv">{photos.includes('stationery') ? <Photo b={b} scene="stationery" /> : <Stationery b={b} />}</div>
        </Chapter>

        {/* ── 10 In use ── */}
        <Chapter id="in-use" title="Brand in use" intro={<>Where people meet {b.name} day to day. The same few rules carry through: the logo with room around it, the palette, and the brand line “{b.line}”</>}>
          <Uses b={b} photos={photos} />
        </Chapter>

        {/* ── 11 Usage ── */}
        <Chapter id="usage" title="Do’s and don’ts" intro={<>A logo only builds recognition if it looks the same everywhere. These are the common mistakes to avoid.</>}>
          <ul className="lb-rules">
            {RULES.map(([cls, ok, name], i) => (
              <li key={cls} className={`lb-rule ${cls} ${ok ? 'is-ok' : 'is-no'} gx-rv`} style={cssVars({ '--i': i % 4 })}>
                <span className="lb-rule-vis"><Art b={b} /></span>
                <span className="lb-rule-name"><i><Icon name={ok ? 'Check' : 'X'} strokeWidth={2.5} /></i>{name}</span>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── Next / previous ── */}
        <nav className="lb-pager" aria-label="More logos">
          {[prev, next].map((o, i) => (
            <Link key={o.slug} href={`/projects/graphic/logos/${o.slug}`} className={`lb-page${i ? ' is-next' : ''}`}>
              <span className="lb-page-art"><img src={art(o, 'logo')} alt="" loading="lazy" decoding="async" /></span>
              <span className="lb-page-txt"><small>{i ? <>Next logo <Icon name="ArrowRight" /></> : <><Icon name="ArrowLeft" /> Previous logo</>}</small><b>{o.name}</b><span>{o.sector}</span></span>
            </Link>
          ))}
        </nav>
        <Link href="/projects/graphic/logos" className="lb-all">All {LOGO_BRANDS.length} logos</Link>
      </main>
    </StandardShell>
  );
}

/** The text colour for a ground given as a page variable. */
function inkOnVar(ground: string, b: LogoBrand) {
  const s = ground.match(/--(\w+)/)?.[1];
  const hex = s === 'p' ? b.colors[0].hex : s === 'l' ? '#f7f7f5' : s === 'd' ? '#0b0d14' : ground;  return hex.startsWith('#') ? inkOn(hex) : '#fff';
}

const RULES: [string, boolean, string][] = [
  ['r-ok', true, 'Use the artwork as supplied'],
  ['r-space', true, 'Give it room to breathe'],
  ['r-stretch', false, 'Don’t stretch or squash it'],
  ['r-rotate', false, 'Don’t rotate it'],
  ['r-recolour', false, 'Don’t change its colours'],
  ['r-effects', false, 'Don’t add shadows or effects'],
  ['r-busy', false, 'Don’t place it on busy images'],
  ['r-outline', false, 'Don’t outline or crop it'],
];

/* ── The four steps, drawn ─────────────────────────── */

function StepVisual({ b, step }: { b: LogoBrand; step: number }) {
  const of = b.mark ? 'mark' : 'logo';
  if (step === 0) {
    return (
      <div className="lb-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 50 L18 24 M50 50 L82 30 M50 50 L46 86" /></svg>
        <span className="lb-map-core">{b.name}</span>
        {b.keywords.map((k, i) => <span key={k} className={`lb-map-k is-${i}`}>{k}</span>)}
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="lb-sketch">
        <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" /><path d="M8 52 Q50 46 92 54 M48 8 Q52 50 50 92" /></svg>
        {b.illustrated ? <Art b={b} of={of} className="lb-pencil-img" /> : <span className="lb-pencil"><Mono b={b} of={of} color="" className="lb-hatch" /></span>}
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="lb-blue">
        <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" /><circle cx="50" cy="50" r="22" /><path d="M8 50 H92 M50 8 V92 M20 20 L80 80 M80 20 L20 80" /></svg>
        {b.illustrated ? <Art b={b} of={of} className="lb-blue-img" /> : <span className="lb-wire"><Mono b={b} of={of} color="rgba(140,220,255,.16)" /></span>}
      </div>
    );
  }
  return (
    <div className="lb-final">
      <Art b={b} of="logo" />
      <span className="lb-final-row">
        <span className="lb-final-dots">{b.colors.slice(0, 4).map((c) => <i key={c.hex} style={{ background: c.hex }} />)}</span>
        <b style={{ fontFamily: 'var(--fd)' }}>Aa</b>
      </span>
    </div>
  );
}

/* ── Pattern ───────────────────────────────────────── */

function Pattern({ b, kind, color }: { b: LogoBrand; kind: LogoBrand['pattern']; color: string }) {
  const of = b.mark ? 'mark' : 'logo';
  if (kind === 'rings') {
    const items: { x: number; y: number; s: number; r: number }[] = [{ x: 50, y: 50, s: 1.5, r: 0 }];
    [1, 2, 3, 4].forEach((ring) => {
      const n = ring * 7;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + ring * 0.4;
        items.push({ x: 50 + Math.cos(a) * ring * 15, y: 50 + Math.sin(a) * ring * 15 * 1.6, s: 1 - ring * 0.14, r: (a * 180) / Math.PI + 90 });
      }
    });
    return (
      <div className="lb-pat-rings">
        {items.map((it, i) => (
          <span key={i} style={cssVars({ '--x': `${it.x}%`, '--y': `${it.y}%`, '--s': it.s, '--r': `${it.r}deg` })}><Mono b={b} of={of} color={color} on="light" /></span>
        ))}
      </div>
    );
  }
  const rows = kind === 'diagonal' ? 9 : 6, cols = kind === 'diagonal' ? 11 : 8;
  return (
    <div className="lb-pat-grid" style={cssVars({ '--cols': cols })}>
      {Array.from({ length: rows * cols }, (_, i) => (
        <span key={i} className={Math.floor(i / cols) % 2 ? 'is-odd' : undefined}><Mono b={b} of={of} color={color} on="light" /></span>
      ))}
    </div>
  );
}

/* ── Colour swatch ─────────────────────────────────── */

function SwatchCard({ c, i }: { c: Swatch; i: number }) {
  const [copied, setCopied] = useState(false);
  const rgb = rgbOf(c.hex);
  const copy = () => {
    navigator.clipboard?.writeText(c.hex).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }).catch(() => {});
  };
  return (
    <li className="lb-swatch gx-rv" style={cssVars({ '--i': i, '--c': c.hex, '--ci': inkOn(c.hex) }) as CSSProperties}>
      <button type="button" className="lb-swatch-chip" onClick={copy} aria-label={`Copy ${c.name}, ${c.hex}`}>
        <span className="lb-swatch-role">{c.role}</span>
        <b>{c.name}</b>
        <span className="lb-swatch-copy" aria-live="polite">{copied ? 'Copied' : 'Copy HEX'}</span>
      </button>
      <dl>
        <div><dt>HEX</dt><dd>{c.hex}</dd></div>
        <div><dt>RGB</dt><dd>{rgb.join(' ')}</dd></div>
        <div><dt>CMYK</dt><dd>{cmykOf(c.hex).join(' ')}</dd></div>
      </dl>
    </li>
  );
}
