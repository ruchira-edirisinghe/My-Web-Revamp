/* ════════════════════════════════════════
   clash.ts - "Cosmic Clash", the intro on a visitor's first page of a session
   (markup: components/cosmic/CosmicPreloader.tsx, styles: styles/cosmic.css).

   Two little astronauts, Nova and Astra, drift into orbit above the
   RUCHIRA EDIRISINGHE logotype, notice each other and start a playful
   zero-gravity scuffle while the site loads. They are rigged 3D models
   (lib/cosmic/cast.ts, three.js), with planets turning in the corners; GSAP
   moves invisible proxies for them and the beats set off the models' own
   animation clips. It's a state machine, not a video:

     entrance  ->  beats (repeat while loading)  ->  finale  ->  reveal

   Each beat is a short choreographed exchange (a blaster shot and a ducking
   barrel roll, a head-on punch-up, a star tossed, juggled and volleyed, a
   loop around the other's helmet), and each one ends with energy flying into the
   logo, which fills with the REAL progress (LoadingProgressManager, --p).
   Between beats, motes stream from the jetpacks into the rising fill, and
   25 / 50 / 75% get a pulse and a reaction. The beats are reshuffled every
   round so a slow load doesn't look like a loop. Once everything is in, the
   beat in progress finishes, the pair high-five above the full logo, it
   glows in its true colours, and the page opens through an expanding orbital
   ring centred on the logo, with the page's own entrance playing as it does.

   At least one beat always plays, so even an instant load gets the story
   (about four seconds); Skip goes straight to the reveal. With reduced
   motion it's a still scene: the logo and bar fill, then a short fade. If
   WebGL or the models are unavailable, the logo, bar and sparks carry on
   without the astronauts. GSAP core only (no plugins).
   ════════════════════════════════════════ */
import { gsap } from 'gsap';
import { CosmicBackground } from './background';
import { ClashCast, type Part, type Who } from './cast';
import { cover, reveal } from './controller';
import { canWebGL } from './models';
import { collectInitial, startLoad, type LoadState } from './progress';

const KEY = 're-intro';
const WATCHDOG_MS = 26000; // nothing can hold the intro longer than this
const CAST_WAIT_MS = 9000; // how long the story waits for the models before going on without them
const STATUS: [number, string][] = [
  [0, 'Fuelling thrusters'],
  [0.25, 'Entering orbit'],
  [0.5, 'Charging the core'],
  [0.75, 'Final approach'],
  [1, 'All systems go'],
];
const C = { nova: '#5ce0ff', astra: '#ff6bd5', gold: '#ffd166', violet: '#bc6fff' };

/** An astronaut's proxy: GSAP moves these, and the 3D model follows. */
interface Actor {
  who: Who; el: HTMLElement; float: HTMLElement; pose: HTMLElement; mark: HTMLElement;
  dir: 1 | -1; color: string; home: [number, number];
}

const q = <T extends Element>(root: ParentNode, sel: string) => root.querySelector(sel) as T;
const wait = (s: number) => new Promise<void>((r) => gsap.delayedCall(s, r));
const num = (el: Element, p: string) => Number(gsap.getProperty(el, p)) || 0;

export function runCosmicClash(root: HTMLElement): () => void {
  const html = document.documentElement;
  const layer = q<HTMLElement>(root, '.cz');
  const stage = q<HTMLElement>(root, '.cz-stage');
  const logo = q<HTMLElement>(root, '.cz-logo');
  const pctEl = q<HTMLElement>(root, '.cz-pct');
  const statusEl = q<HTMLElement>(root, '.cz-status');
  const bar = q<HTMLElement>(root, '.cz-meta');
  const skip = q<HTMLButtonElement>(root, '.cz-skip');
  const orb = q<HTMLElement>(root, '.cz-orb');
  const star = q<HTMLElement>(root, '.cz-star');
  const ring = q<HTMLElement>(root, '.cz-ring');
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const small = window.innerWidth < 700;

  let alive = true;
  let finished = false;
  try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode: it just plays again */ }
  cover();
  const bg = reduce ? null : new CosmicBackground(q<HTMLCanvasElement>(root, '.cz-bg'), small);
  const fx = q<HTMLElement>(root, '.cz-fx');
  const canvas3d = q<HTMLCanvasElement>(root, '.cz-3d');
  let cast: ClashCast | null = null;
  try { if (canWebGL()) cast = new ClashCast(canvas3d, small); } catch { cast = null; }

  // ── Real progress ──
  const load = startLoad();
  let state: LoadState = load.state;
  const unsub = load.subscribe((s) => { state = s; });
  collectInitial(load);
  // The cast's own models count towards the loading, like the page's assets.
  if (cast) load.add('cast', cast.ready, 2);
  requestAnimationFrame(() => load.seal());

  let shown = 0;
  let milestone = 0;
  let raf = 0, last = 0;
  const tick = (now: number) => {
    if (!alive) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    // Smoothed, but never ahead of the real state, and 100% only when complete.
    const goal = state.complete ? 1 : Math.min(state.progress, 0.99);
    shown += (goal - shown) * Math.min(1, dt * 5);
    if (goal === 1 && shown > 0.996) shown = 1;
    const pct = Math.floor(shown * 100);
    root.style.setProperty('--p', shown.toFixed(4));
    pctEl.textContent = `${pct}%`;
    bar.setAttribute('aria-valuenow', String(pct));
    statusEl.textContent = [...STATUS].reverse().find(([at]) => shown >= at)![1];
    while (milestone < 3 && shown >= (milestone + 1) * 0.25) { milestone++; if (!reduce) react(); }
    if (cast && castOn) {
      for (const a of actors) {
        cast.pose(a.who, {
          x: num(a.el, 'x') + AW / 2,
          y: num(a.el, 'y') + num(a.float, 'y') + AH / 2,
          rot: num(a.float, 'rotation') + num(a.pose, 'rotation'),
          sx: num(a.pose, 'scaleX') * num(a.float, 'scale'),
          sy: num(a.pose, 'scaleY') * num(a.float, 'scale'),
          o: num(a.el, 'opacity'),
        });
      }
      cast.frame(reduce ? 0 : dt);
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  const ready = () => state.complete && shown >= 1;

  // ── Geometry: stage fractions -> pixels ──
  let W = 0, H = 0, AW = 0, AH = 0;
  let castOn = false; // the models are in, and following their proxies
  const measure = () => {
    const r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    AW = actors[0]?.el.offsetWidth || 100; AH = AW * (164 / 120);
    cast?.layout(r, AH * 1.1);
  };
  const xy = (fx: number, fy: number) => ({ x: fx * W - AW / 2, y: fy * H - AH / 2 });
  /** A point inside the stage, in viewport pixels (for the canvas effects). */
  const view = (sx: number, sy: number) => { const r = stage.getBoundingClientRect(); return [r.left + sx, r.top + sy] as const; };
  /** Where an astronaut's hand, helmet, body or blaster is, in stage pixels. */
  const partOf = (a: Actor, part: Part): readonly [number, number] => {
    const p = castOn ? cast!.point(a.who, part) : null;
    if (p) return p;
    // Without the models: about where that part would be on the proxy.
    const cx = num(a.el, 'x') + AW / 2, cy = num(a.el, 'y') + num(a.float, 'y') + AH / 2;
    if (part === 'head') return [cx, cy - AH * 0.3];
    if (part === 'body') return [cx, cy];
    return [cx + a.dir * AW * 0.4, cy - AH * 0.05];
  };
  /** Where the energy surface is: a random spot along the logo at the current fill level. */
  const fillPoint = () => {
    const r = logo.getBoundingClientRect(), s = stage.getBoundingClientRect();
    const x = r.left - s.left + r.width * (0.06 + Math.random() * 0.88);
    const y = r.top - s.top + r.height * Math.min(0.92, Math.max(0.12, 1 - shown + 0.08));
    return [x, y] as const;
  };

  const actor = (who: Who, el: HTMLElement, dir: 1 | -1, color: string, home: [number, number]): Actor => ({
    who, el, dir, color, home,
    float: q(el, '.cz-float'), pose: q(el, '.cz-pose'), mark: q(el, '.cz-mark'),
  });
  const actors: Actor[] = [
    actor(0, q(root, '.cz-actor.is-nova'), 1, C.nova, [0.24, 0.27]),
    actor(1, q(root, '.cz-actor.is-astra'), -1, C.astra, [0.76, 0.24]),
  ];
  const [nova, astra] = actors;
  measure();
  window.addEventListener('resize', measure);

  // ── Little shared moves ──
  /** Sets off one of an astronaut's animation clips (lib/cosmic/cast.ts). */
  const clip = (a: Actor, name: string, speed = 1) => { if (castOn) cast!.play(a.who, name, { speed }); };
  const flashLogo = (amount = 0.7) => gsap.fromTo(logo.querySelector('.lf-flash'), { opacity: amount }, { opacity: 0, duration: 0.6, ease: 'power2.out' });
  const impact = (sx: number, sy: number, color: string, n = 22) => {
    const [x, y] = view(sx, sy);
    bg?.burst(x, y, color, small ? Math.ceil(n * 0.6) : n);
  };
  const hitLogo = (sx: number, sy: number, color: string) => {
    impact(sx, sy, color, 26);
    impact(sx, sy, '#ffffff', 8);
    flashLogo(0.55);
    gsap.fromTo(logo, { scale: 1 }, { scale: 1.015, duration: 0.09, yoyo: true, repeat: 1, ease: 'power1.out' });
  };
  /** A cheer: arms thrown up, then back to floating. */
  const happy = (a: Actor) => clip(a, 'Jump', 0.55);
  /** A start: the hit-react flinch and a little pop. */
  const surprised = (a: Actor) => {
    clip(a, 'HitReact', 0.8);
    gsap.fromTo(a.float, { scale: 1 }, { scale: 1.08, duration: 0.14, yoyo: true, repeat: 1, ease: 'back.out(3)' });
  };

  /** A milestone: the logo pulses and both nod along, delighted. */
  function react() {
    flashLogo(0.8);
    const r = logo.getBoundingClientRect();
    bg?.burst(r.left + r.width / 2, r.top + r.height / 2, C.violet, small ? 16 : 30, 1.6);
    gsap.fromTo(logo.querySelector('.lf-energy'), { filter: 'brightness(1.8)' }, { filter: 'brightness(1)', duration: 0.8, ease: 'power2.out' });
    // Only one that's just floating: a milestone never cuts a move short.
    for (const a of actors) if (castOn && cast!.floating(a.who)) clip(a, 'Yes', 1.3);
  }

  // ── Idle life: bobbing and swaying, motes from their suits into the logo ──
  const idle = () => {
    actors.forEach((a, i) => {
      gsap.to(a.float, { y: -9, rotation: 4 * a.dir, duration: 1.5 + i * 0.25, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
    const stream = () => {
      if (!alive || finished) return;
      if (bg && shown < 1) {
        const a = actors[(Math.random() * 2) | 0];
        const [jx, jy] = partOf(a, 'body');
        const [fx, fy] = fillPoint();
        const [x0, y0] = view(jx, jy), [x1, y1] = view(fx, fy);
        bg.mote(x0, y0, x1, y1, a.color);
      }
      gsap.delayedCall(small ? 0.28 : 0.16, stream);
    };
    gsap.delayedCall(1.2, stream);
  };

  /** Fires the orb from a's blaster at b; b dodges, so it sails on into the logo. */
  const fireOrb = (a: Actor, b: Actor) => {
    const [px, py] = partOf(a, 'gun');
    const [bx, by] = partOf(b, 'body');
    const [lx, ly] = fillPoint();
    gsap.set(orb, { x: px, y: py, opacity: 1, scale: 0.4, rotation: 0, background: `radial-gradient(circle, #fff 0 25%, ${a.color} 45%, transparent 70%)` });
    const ang1 = (Math.atan2(by - py, bx - px) * 180) / Math.PI;
    const ang2 = (Math.atan2(ly - by, lx - bx) * 180) / Math.PI;
    return gsap.timeline()
      .to(orb, { scale: 1, scaleX: 2.2, rotation: ang1, duration: 0.08 })
      .to(orb, { x: bx, y: by, duration: 0.34, ease: 'none' }, '<')
      .to(orb, { rotation: ang2, duration: 0.12 })
      .to(orb, { x: lx, duration: 0.42, ease: 'none' }, '<')
      .to(orb, { y: ly, duration: 0.42, ease: 'power2.in' }, '<')
      .add(() => hitLogo(lx, ly, a.color))
      .to(orb, { opacity: 0, scale: 0.2, duration: 0.12 });
  };

  // ── The beats ──
  const goHome = (a: Actor, d = 0.6) => gsap.to(a.el, { ...xy(...a.home), duration: d, ease: 'sine.inOut' });
  /** A jolt through everything on the stage, 3D layer included. */
  const shake = () => gsap.fromTo([stage, fx, canvas3d], { x: 0 }, { x: 5, duration: 0.04, yoyo: true, repeat: 5, ease: 'none', clearProps: 'x' });

  async function entrance() {
    gsap.set(nova.el, xy(-0.3, 0.45));
    gsap.set(astra.el, xy(1.3, 0.05));
    gsap.set([nova.el, astra.el], { opacity: 1 });
    const tl = gsap.timeline();
    tl.to(nova.el, { ...xy(...nova.home), duration: 1.5, ease: 'power3.out' }, 0)
      .from(nova.pose, { rotation: 28, scaleX: 1.15, scaleY: 0.9, duration: 1.4, ease: 'power2.out' }, 0)
      .to(astra.el, { ...xy(...astra.home), duration: 1.6, ease: 'power3.out' }, 0.15)
      .from(astra.pose, { rotation: 300, duration: 1.7, ease: 'power3.out' }, 0.15)
      // They notice each other.
      .fromTo([nova.mark, astra.mark], { scale: 0, opacity: 0, y: 8 }, { scale: 1, opacity: 1, y: 0, duration: 0.28, ease: 'back.out(3)', stagger: 0.08 }, 1.5)
      .add(() => { surprised(nova); surprised(astra); }, 1.5)
      .to([nova.mark, astra.mark], { opacity: 0, y: -6, duration: 0.2 }, 2.15);
    await tl;
  }

  /** a draws a blaster and fires at b, who ducks into a barrel roll and cheers. */
  async function zap(a: Actor, b: Actor) {
    const tl = gsap.timeline();
    tl.add(() => { cast?.gun(a.who, true); clip(a, 'Weapon', 1.15); }, 0)
      .to(a.pose, { rotation: -8 * a.dir, duration: 0.3, ease: 'power2.out' }, 0)
      .add(() => {
        fireOrb(a, b);
        const [mx, my] = partOf(a, 'gun');
        impact(mx, my, a.color, 10);
      }, 0.36)
      // Recoil.
      .to(a.pose, { scaleX: 1.1, scaleY: 0.92, rotation: 8 * a.dir, duration: 0.09, ease: 'power3.out' }, 0.36)
      .to(a.el, { x: `-=${16 * a.dir}`, duration: 0.3, ease: 'power2.out' }, 0.36)
      .to(a.pose, { scaleX: 1, scaleY: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' }, 0.45)
      .add(() => { cast?.gun(a.who, false); }, 1.0)
      // b sees it coming, ducks and rolls out of the way.
      .add(() => { clip(b, 'Duck', 1.7); }, 0.3)
      .to(b.pose, { rotation: -360 * b.dir, duration: 0.75, ease: 'power2.out' }, 0.46)
      .to(b.el, { y: `-=${H * 0.14}`, duration: 0.36, ease: 'power2.out', yoyo: true, repeat: 1 }, 0.46)
      .set(b.pose, { rotation: 0 }, 1.22)
      .add(() => { happy(b); }, 1.25)
      .add(() => { goHome(a, 0.7); }, 1.1);
    await tl;
  }

  /** Both charge, trade punches head-on with a pop, and tumble apart. */
  async function bump() {
    const tl = gsap.timeline();
    const meet = 0.27;
    tl.to(nova.el, { ...xy(0.17, 0.31), duration: 0.45, ease: 'power2.out' }, 0)
      .to(astra.el, { ...xy(0.83, 0.23), duration: 0.45, ease: 'power2.out' }, 0)
      .to(nova.pose, { scaleX: 0.9, scaleY: 1.08, rotation: -14, duration: 0.45 }, 0)
      .to(astra.pose, { scaleX: 0.9, scaleY: 1.08, rotation: 14, duration: 0.45 }, 0)
      .add(() => { clip(nova, 'Punch', 1.25); clip(astra, 'Punch', 1.25); }, 0.5)
      .to(nova.el, { ...xy(0.42, meet), duration: 0.32, ease: 'power3.in' }, 0.5)
      .to(astra.el, { ...xy(0.58, meet), duration: 0.32, ease: 'power3.in' }, 0.5)
      .to([nova.pose, astra.pose], { scaleX: 1.12, scaleY: 0.9, rotation: 0, duration: 0.32, ease: 'power2.in' }, 0.5)
      // Impact frame.
      .add(() => {
        impact(W * 0.5, H * meet, C.gold, 26);
        shake();
        for (let i = 0; i < (small ? 4 : 8); i++) {
          const [x0, y0] = view(W * 0.5, H * meet), [fx1, fy1] = fillPoint(), [x1, y1] = view(fx1, fy1);
          bg?.mote(x0, y0, x1, y1, i % 2 ? C.nova : C.astra, i === 0 ? () => flashLogo(0.45) : undefined);
        }
      }, 0.82)
      .to([nova.pose, astra.pose], { scaleX: 0.85, scaleY: 1.14, duration: 0.07 }, 0.82)
      .add(() => { surprised(nova); surprised(astra); }, 0.86)
      .to(nova.el, { ...xy(0.27, 0.2), duration: 1.0, ease: 'power2.out' }, 0.9)
      .to(astra.el, { ...xy(0.73, 0.32), duration: 1.0, ease: 'power2.out' }, 0.9)
      .to(nova.pose, { rotation: -340, scaleX: 1, scaleY: 1, duration: 1.15, ease: 'power2.out' }, 0.9)
      .to(astra.pose, { rotation: 340, scaleX: 1, scaleY: 1, duration: 1.15, ease: 'power2.out' }, 0.9)
      .set([nova.pose, astra.pose], { rotation: 0 }, 2.06)
      .add(() => { happy(nova); happy(astra); goHome(nova, 0.6); goHome(astra, 0.6); }, 2.06);
    await tl;
    await wait(0.4);
  }

  /** Astra tosses a star; Nova heads it twice and volleys it into the logo. */
  async function juggle() {
    const [ax, ay] = partOf(astra, 'hand');
    const [hx, hy] = partOf(nova, 'head');
    const top = hy - AH * 0.32;
    gsap.set(star, { x: ax, y: ay, opacity: 0, scale: 0.4, rotation: 0 });
    const tl = gsap.timeline();
    tl.add(() => { clip(astra, 'Punch', 1.1); }, 0.12)
      .to(star, { opacity: 1, scale: 1, duration: 0.12 }, 0.42)
      .to(star, { x: hx, duration: 0.6, ease: 'none' }, 0.42)
      .to(star, { y: Math.min(ay, top) - H * 0.16, duration: 0.3, ease: 'power2.out' }, 0.42)
      .to(star, { y: top, duration: 0.3, ease: 'power2.in' }, 0.72)
      .to(star, { rotation: 400, duration: 0.6, ease: 'none' }, 0.42);
    // Two headers: Nova bobs up into it, the star pops back up.
    for (let i = 0; i < 2; i++) {
      const t = 1.02 + i * 0.5;
      tl.add(() => { clip(nova, 'Jump', 1.4); }, t - 0.12)
        .to(nova.pose, { scaleX: 1.08, scaleY: 0.92, duration: 0.07, yoyo: true, repeat: 1, transformOrigin: '50% 100%' }, t)
        .add(() => impact(hx, top, C.gold, 8), t)
        .to(star, { y: top - H * 0.13, duration: 0.24, ease: 'power2.out', yoyo: true, repeat: 1 }, t)
        .to(star, { rotation: `+=${180}`, duration: 0.48, ease: 'none' }, t);
    }
    // The volley.
    const [lx, ly] = fillPoint();
    tl.add(() => { clip(nova, 'Punch', 1.5); }, 1.95)
      .to(nova.pose, { rotation: -16, duration: 0.14 }, 2.0)
      .to(star, { x: lx, duration: 0.42, ease: 'power1.in' }, 2.18)
      .to(star, { y: ly, duration: 0.42, ease: 'power2.in' }, 2.18)
      .to(star, { rotation: '+=540', duration: 0.42, ease: 'none' }, 2.18)
      .add(() => hitLogo(lx, ly, C.gold), 2.6)
      .to(star, { opacity: 0, scale: 0.2, duration: 0.12 }, 2.6)
      .to(nova.pose, { rotation: 0, duration: 0.5, ease: 'power2.out' }, 2.3)
      .add(() => { happy(nova); clip(astra, 'No', 1.2); }, 2.62);
    await tl;
  }

  /** Nova loops round Astra's helmet, trailing energy, and leaves her dizzy. */
  async function orbit() {
    const [cx, cy] = [astra.home[0] * W, astra.home[1] * H];
    const R = Math.min(W * 0.17, H * 0.32);
    const frames = Array.from({ length: 13 }, (_, i) => {
      const a = Math.PI + (i / 12) * Math.PI * 2;
      return { x: cx + Math.cos(a) * R - AW / 2, y: cy + Math.sin(a) * R * 0.7 - AH / 2 };
    });
    const tl = gsap.timeline();
    tl.to(nova.el, { ...frames[0], duration: 0.5, ease: 'power2.inOut' }, 0)
      .to(nova.pose, { scaleX: 1.1, scaleY: 0.92, duration: 0.3 }, 0.2)
      .to(nova.el, { keyframes: frames.slice(1).map((f) => ({ ...f, duration: 1.3 / 12, ease: 'none' })) }, 0.5)
      .to(nova.pose, { rotation: 360, duration: 1.3, ease: 'none' }, 0.5)
      .add(() => { clip(astra, 'No', 0.9); }, 0.6)
      .add(() => {
        // A ring of energy left behind, peeling off into the logo.
        for (let i = 0; i < (small ? 5 : 10); i++) {
          const f = frames[i + 1];
          const [x0, y0] = view(f.x + AW / 2, f.y + AH / 2), [fx1, fy1] = fillPoint(), [x1, y1] = view(fx1, fy1);
          gsap.delayedCall(i * 0.06, () => bg?.mote(x0, y0, x1, y1, i % 2 ? C.nova : C.violet, i === 9 ? () => flashLogo(0.5) : undefined));
        }
      }, 1.2)
      .set(nova.pose, { rotation: 0, scaleX: 1, scaleY: 1 }, 1.8)
      .add(() => { happy(nova); goHome(nova, 0.7); }, 1.8)
      .to(astra.pose, { rotation: 10, duration: 0.22, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 1.8)
      .set(astra.pose, { rotation: 0 }, 2.7);
    await tl;
  }

  const BEATS = [() => zap(nova, astra), bump, () => zap(astra, nova), juggle, orbit];

  async function finale() {
    finished = true;
    const tl = gsap.timeline();
    tl.to(nova.el, { ...xy(0.42, 0.3), duration: 0.6, ease: 'power2.inOut' }, 0)
      .to(astra.el, { ...xy(0.58, 0.3), duration: 0.6, ease: 'power2.inOut' }, 0)
      .to([nova.pose, astra.pose], { rotation: 0, scaleX: 1, scaleY: 1, duration: 0.4 }, 0)
      // Hands up for a high five.
      .add(() => { clip(nova, 'Wave', 1.4); clip(astra, 'Wave', 1.4); }, 0.12)
      .to(nova.pose, { rotation: 9, duration: 0.3 }, 0.42)
      .to(astra.pose, { rotation: -9, duration: 0.3 }, 0.42)
      .add(() => {
        const [ax, ay] = partOf(nova, 'hand'), [bx, by] = partOf(astra, 'hand');
        const x = (ax + bx) / 2, y = Math.min(ay, by);
        impact(x, y, '#ffffff', 30);
        impact(x, y, C.gold, 18);
      }, 0.72)
      .to([nova.pose, astra.pose], { scaleX: 0.92, scaleY: 1.08, duration: 0.08, yoyo: true, repeat: 1 }, 0.72)
      // Both cheer at the full logo as it lights up.
      .add(() => {
        root.classList.add('is-complete');
        flashLogo(1);
        const r = logo.getBoundingClientRect();
        bg?.burst(r.left + r.width / 2, r.top + r.height / 2, C.nova, small ? 20 : 40, 2.2);
        happy(nova); happy(astra);
      }, 0.95)
      .to([nova.pose, astra.pose], { rotation: 0, duration: 0.4 }, 1.0)
      // They zip off as the page opens.
      .to(nova.el, { ...xy(-0.45, -0.35), duration: 0.7, ease: 'power3.in' }, 1.55)
      .to(astra.el, { ...xy(1.45, -0.35), duration: 0.7, ease: 'power3.in' }, 1.55)
      .to(nova.pose, { scaleX: 1.25, scaleY: 0.85, rotation: -30, duration: 0.4 }, 1.55)
      .to(astra.pose, { scaleX: 1.25, scaleY: 0.85, rotation: 30, duration: 0.4 }, 1.55)
      .add(() => { open(); }, 1.7);
    await tl;
  }

  /** The reveal: an orbital ring opens out from the logo and the page shows through. */
  function open() {
    if (!alive || root.classList.contains('is-opening')) return;
    const r = logo.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const far = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) + 40;
    root.style.setProperty('--cx', `${cx}px`);
    root.style.setProperty('--cy', `${cy}px`);
    root.classList.add('is-opening');
    reveal();
    const hole = { r: 0 };
    const dur = reduce ? 0.01 : 1.05;
    gsap.to(hole, {
      r: far, duration: dur, ease: 'power2.in',
      onUpdate: () => {
        root.style.setProperty('--hole', `${hole.r}px`);
        ring.style.width = ring.style.height = `${hole.r * 2}px`;
      },
      onComplete: done,
    });
    gsap.to([stage, fx, canvas3d], { scale: 1.35, opacity: 0, duration: dur * 0.9, ease: 'power2.in' });
    gsap.to([bar, skip], { opacity: 0, duration: 0.3 });
  }

  function done() {
    if (!alive) return;
    alive = false;
    // Focus back to the page if it was on the overlay (the Skip button).
    if (root.contains(document.activeElement)) {
      const main = document.querySelector('main') as HTMLElement | null;
      if (main) { main.tabIndex = -1; main.focus({ preventScroll: true }); }
    }
    html.classList.remove('intro');
    root.remove();
    cleanup();
  }

  function cleanup() {
    alive = false;
    cancelAnimationFrame(raf);
    unsub();
    bg?.stop();
    cast?.stop();
    // Every tween on the overlay, including the endless idle ones.
    gsap.killTweensOf([root, ...Array.from(root.querySelectorAll('*'))]);
    window.removeEventListener('resize', measure);
    clearTimeout(watchdog);
  }

  // ── Run it ──
  const watchdog = setTimeout(() => { reveal(); if (alive) open(); setTimeout(() => alive && done(), 1500); }, WATCHDOG_MS);
  skip.addEventListener('click', () => { finished = true; root.classList.add('is-complete'); open(); });

  const story = async () => {
    // The models first (they load alongside the page, so this is usually brief).
    const castReady = cast ? cast.ready.then(() => true, () => false) : Promise.resolve(false);
    castOn = alive && await Promise.race([castReady, wait(CAST_WAIT_MS / 1000).then(() => false)]);
    if (!castOn && cast) { cast.stop(); cast = null; canvas3d.remove(); }
    if (reduce || !castOn) {
      // A still scene: the fill and bar follow the load, then a short fade.
      actors.forEach((a) => gsap.set(a.el, { ...xy(...a.home), opacity: castOn ? 1 : 0 }));
      while (alive && !ready()) await wait(0.1);
      if (!alive) return;
      root.classList.add('is-complete');
      await wait(0.4);
      open();
      return;
    }
    idle();
    await entrance();
    let order = BEATS.slice();
    let played = 0, lastBeat: (typeof BEATS)[number] | null = null;
    while (alive && !finished && (played === 0 || !ready())) {
      if (!order.length) {
        order = BEATS.slice().sort(() => Math.random() - 0.5);
        if (order[0] === lastBeat) order.push(order.shift()!);
      }
      lastBeat = order.shift()!;
      await lastBeat();
      played++;
    }
    // Loaded, or skipped: finish on the high five (a skip has already opened).
    while (alive && !finished && !ready()) await wait(0.1);
    if (alive && !root.classList.contains('is-opening')) await finale();
  };
  story().catch(() => {
    // An animation error must never hold the page: fall back to the reveal.
    root.classList.add('is-complete');
    open();
  });

  return cleanup;
}
