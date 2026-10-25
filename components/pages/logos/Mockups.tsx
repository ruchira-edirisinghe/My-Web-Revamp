import type { ReactNode } from 'react';
import { cssVars } from '@/lib/css';
import { Art, Mono, Photo } from './art';
import type { LogoBrand, Use } from './data';
import { Icon } from '@/components/ui/Icon';

/* The brand out in the world, drawn in code: a sign for its kind of place
   (an office wall, a shopfront, a van, a stage, a billboard), the stationery
   and the everyday things it's printed on. Every scene is sized in container
   units, so it scales as one picture from a phone to a wide screen.
   Colours come from the page's variables: --p primary, --pi ink on primary,
   --d dark, --l light, --x accent, --g glow. Styles: logo-brand.css (.sg, .st, .ap). */

/* ── Signage ───────────────────────────────────────── */

export function Signage({ b }: { b: LogoBrand }) {
  const scene: Record<LogoBrand['signage'], ReactNode> = {
    office: (
      <>
        <div className="sg-wall" />
        <div className="sg-lamps">{[0, 1, 2].map((i) => <i key={i} />)}</div>
        <div className="sg-panel"><Art b={b} on="dark" /></div>
        <div className="sg-floor" />
        <div className="sg-desk"><span className="sg-desk-top" /><Mono b={b} color="var(--pi)" /></div>
        <div className="sg-plant"><i /><i /><i /><i /><b /></div>
      </>
    ),
    store: (
      <>
        <div className="sg-dusk" />
        <div className="sg-front">
          <div className="sg-fascia"><Art b={b} on="dark" /></div>
          <div className="sg-awning" />
          <div className="sg-glass is-l"><span className="sg-shelf">{[0, 1, 2].map((i) => <i key={i}><Mono b={b} color="var(--pi)" /></i>)}</span></div>
          <div className="sg-door"><Mono b={b} color="rgba(255,255,255,.85)" /></div>
          <div className="sg-glass is-r"><span className="sg-shelf">{[0, 1].map((i) => <i key={i}><Mono b={b} color="var(--pi)" /></i>)}</span></div>
        </div>
        <div className="sg-pave" />
      </>
    ),
    van: (
      <>
        <div className="sg-dusk" />
        <div className="sg-city" />
        <div className="sg-road"><i /></div>
        <div className="sg-van">
          <svg viewBox="0 0 400 190" aria-hidden="true">
            <path className="v-body" d="M14 150 V44 Q14 24 34 24 H262 Q282 24 296 38 L346 92 Q384 100 386 124 V150 Q386 158 378 158 H22 Q14 158 14 150 Z" />
            <path className="v-stripe" d="M14 118 H386 V138 H14 Z" />
            <path className="v-glass" d="M276 44 L322 96 H276 Z" />
            <path className="v-line" d="M262 30 V156 M276 100 H306" />
            <circle className="v-tyre" cx="92" cy="158" r="26" /><circle className="v-hub" cx="92" cy="158" r="11" />
            <circle className="v-tyre" cx="318" cy="158" r="26" /><circle className="v-hub" cx="318" cy="158" r="11" />
            <rect className="v-lamp" x="374" y="108" width="12" height="9" rx="3" />
          </svg>
          <span className="sg-van-logo"><Art b={b} /></span>
          <span className="sg-van-line">{b.line}</span>
        </div>
      </>
    ),
    stage: (
      <>
        <div className="sg-night" />
        <div className="sg-truss" />
        <div className="sg-beams">{[0, 1, 2, 3].map((i) => <i key={i} />)}</div>
        <div className="sg-screen"><Art b={b} on="dark" /><span>{b.line}</span></div>
        <div className="sg-stage" />
        <div className="sg-crowd" />
      </>
    ),
    billboard: (
      <>
        <div className="sg-sunset" />
        <div className="sg-sun" />
        <div className="sg-skyline" />
        <div className="sg-board">
          <div className="sg-board-face">
            <Art b={b} />
            <span className="sg-board-line">{b.line}</span>
          </div>
          <div className="sg-board-lights">{[0, 1, 2].map((i) => <i key={i} />)}</div>
          <div className="sg-board-legs"><i /><i /></div>
        </div>
      </>
    ),
  };
  return <div className={`sg is-${b.signage}`}>{scene[b.signage]}</div>;
}

/* ── Stationery ────────────────────────────────────── */

/** Lines of text, drawn as bars, the way a mockup stands in for copy. */
const Lines = ({ n, cls = '' }: { n: number; cls?: string }) => (
  <span className={`st-lines ${cls}`}>{Array.from({ length: n }, (_, i) => <i key={i} style={cssVars({ '--w': `${[92, 78, 86, 64, 90, 72, 55][i % 7]}%` })} />)}</span>
);

export function Stationery({ b }: { b: LogoBrand }) {
  return (
    <div className="st">
      <div className="st-sheet">
        <div className="st-sheet-head"><Art b={b} /><Lines n={3} cls="is-addr" /></div>
        <Lines n={2} cls="is-to" />
        <Lines n={7} />
        <Lines n={5} />
        <span className="st-sign">{b.name}</span>
        <span className="st-sheet-foot" />
      </div>
      <div className="st-env">
        <span className="st-env-flap" />
        <Art b={b} className="st-env-logo" />
        <Lines n={3} cls="is-env" />
        <span className="st-stamp"><Mono b={b} color="var(--pi)" on="dark" /></span>
      </div>
      <div className="st-card is-front"><Mono b={b} of="mark" color="var(--pi)" on="dark" /></div>
      <div className="st-card is-back">
        <Art b={b} />
        <span className="st-card-txt"><b>{b.name}</b><Lines n={3} /></span>
      </div>
    </div>
  );
}

/* ── Brand in use ──────────────────────────────────── */

const USE_NAMES: Record<Use, string> = {
  app: 'Mobile app', web: 'Website', social: 'Social post', card: 'Member card', tee: 'T-shirt',
  cap: 'Cap', cup: 'Takeaway cup', bag: 'Tote bag', box: 'Packaging', badge: 'Pin badge',
  lanyard: 'ID lanyard', polo: 'Polo shirt', mug: 'Mug', sticker: 'Sticker', book: 'Notebook',
  bottle: 'Bottle', jersey: 'Jersey', mousepad: 'Desk mat', tag: 'Hang tag', invite: 'Invitation',
};

function UseScene({ b, use }: { b: LogoBrand; use: Use }) {
  switch (use) {
    case 'app':
      return (
        <div className="ap-phone">
          <span className="ap-island" />
          <Mono b={b} color="var(--pi)" className="ap-splash" />
          <b className="ap-phone-line">{b.line}</b>
          <span className="ap-btn">Get started</span>
          <span className="ap-icon"><Mono b={b} color="var(--pi)" /></span>
        </div>
      );
    case 'web':
      return (
        <div className="ap-browser">
          <span className="ap-bar"><i /><i /><i /><em>{b.slug}.com</em></span>
          <span className="ap-nav"><Art b={b} /><span><i /><i /><i /></span></span>
          <span className="ap-hero">
            <b>{b.line}</b>
            <Lines n={2} />
            <span className="ap-btn">Learn more</span>
          </span>
          <span className="ap-hero-art"><Mono b={b} color="var(--p)" on="light" /></span>
        </div>
      );
    case 'social':
      return (
        <div className="ap-post">
          <span className="ap-post-head"><span className="ap-avatar"><Mono b={b} color="var(--pi)" /></span><b>{b.slug}</b></span>
          <span className="ap-post-img">
            <span className="ap-dots" />
            <b>{b.line}</b>
            {!b.illustrated && <Mono b={b} of="logo" color="var(--pi)" className="ap-post-logo" />}
          </span>
          <span className="ap-post-foot"><i><Icon name="Heart" fill="currentColor" /></i><i><Icon name="Sparkle" fill="currentColor" /></i><i><Icon name="Send" /></i></span>
        </div>
      );
    case 'card':
      return (
        <div className="ap-member">
          <Mono b={b} color="var(--pi)" className="ap-member-mark" />
          <span className="ap-chip" />
          <span className="ap-member-no">•••• •••• 2026</span>
          <b>{b.name}</b>
        </div>
      );
    case 'tee':
      return (
        <div className="ap-obj is-tee">
          <svg viewBox="0 0 200 200" aria-hidden="true"><path className="o-fab" d="M62 32 L86 22 Q100 36 114 22 L138 32 L174 60 L156 84 L140 74 V182 H60 V74 L44 84 L26 60 Z" /><path className="o-seam" d="M86 22 Q100 42 114 22" /></svg>
          <Mono b={b} of="logo" color="var(--pi)" className="ap-print" />
        </div>
      );
    case 'cap':
      return (
        <div className="ap-obj is-cap">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <path className="o-fab" d="M42 128 C40 64 160 64 158 128 Z" />
            <path className="o-brim" d="M30 128 Q100 116 170 128 Q178 150 100 154 Q22 150 30 128 Z" />
            <path className="o-seam" d="M100 66 V128 M70 74 Q64 100 66 128 M130 74 Q136 100 134 128" />
            <circle className="o-btn" cx="100" cy="66" r="5" />
          </svg>
          <Mono b={b} color="var(--l)" on="dark" className="ap-print" />
        </div>
      );
    case 'cup':
      return (
        <div className="ap-obj is-cup">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <path className="o-body" d="M62 54 H138 L126 184 H74 Z" />
            <path className="o-sleeve" d="M66 92 H134 L129 146 H71 Z" />
            <path className="o-lid" d="M56 40 H144 L148 56 H52 Z" /><path className="o-lid" d="M68 30 H132 L136 40 H64 Z" />
          </svg>
          <Mono b={b} color="var(--pi)" className="ap-print" />
        </div>
      );
    case 'bag':
      return (
        <div className="ap-obj is-bag">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <path className="o-strap" d="M74 74 Q74 26 100 26 Q126 26 126 74" />
            <path className="o-bag" d="M44 70 H156 L164 186 H36 Z" />
          </svg>
          <Art b={b} className="ap-print" />
        </div>
      );
    case 'box':
      return (
        <div className="ap-box">
          <span className="ap-box-top"><i /></span>
          <span className="ap-box-front"><Art b={b} /></span>
          <span className="ap-box-side"><Mono b={b} color="var(--pi)" /></span>
        </div>
      );
    case 'badge':
      return (
        <div className="ap-badges">
          <span className="ap-pin"><Mono b={b} color="var(--pi)" /></span>
          <span className="ap-sticker"><Art b={b} /></span>
        </div>
      );
    // Uses that only ever appear as photos: the logo alone until one is generated.
    default:
      return <Art b={b} className="ap-solo" />;
  }
}

export function Uses({ b, photos }: { b: LogoBrand; photos: string[] }) {
  return (
    <ul className="ap-grid">
      {b.uses.map((u, i) => {
        const name = b.names?.[u] ?? USE_NAMES[u];
        return (
          <li key={u} className={`ap is-${u} gx-rv`} style={cssVars({ '--i': i })}>
            <div className="ap-stage">{photos.includes(u) ? <Photo b={b} scene={u} label={name} /> : <UseScene b={b} use={u} />}</div>
            <span className="ap-name">{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
