/* ════════════════════════════════════════
   cast.ts - the Cosmic Clash intro's 3D layer (three.js): Nova and Astra
   as rigged, animated astronauts, and three planets drifting in the corners.
   All of them are Quaternius's CC0 Ultimate Space Kit models
   (lib/cosmic/models.ts).

   clash.ts still choreographs everything with GSAP, on invisible proxy
   elements (where each astronaut is, its roll and its squash and stretch).
   Every frame it hands those poses over here, and this puts the models
   there in an orthographic camera measured in viewport pixels, so the 3D
   figures line up exactly with the DOM effects around them (the orb, the
   star, the logo). The beats also trigger the models' own animation clips
   (a blaster shot, a duck, a punch, a wave, a cheer), cross-faded back into
   a floating loop, and ask for where a hand, a helmet or a blaster really is
   so shots and sparks start from them.
   ════════════════════════════════════════ */
import * as THREE from 'three';
import { fit, loadModel, type ModelName } from './models';

export type Who = 0 | 1;
export type Part = 'hand' | 'head' | 'body' | 'gun';
/** A proxy's pose: its centre in stage pixels, roll in degrees, squash and stretch, opacity. */
export interface Pose { x: number; y: number; rot: number; sx: number; sy: number; o: number }

const D = Math.PI / 180;
const BASE_CLIP = 'Jump_Idle'; // airborne, legs dangling: floating in zero g
const BASE_SPEED = 0.55;

interface Figure {
  holder: THREE.Group;
  turn: THREE.Group;
  mixer: THREE.AnimationMixer;
  actions: Map<string, THREE.AnimationAction>;
  current: THREE.AnimationAction | null;
  bones: Record<Exclude<Part, 'gun'>, THREE.Object3D>;
  gun: THREE.Object3D | null;
  face: number;
}

interface Planet { obj: THREE.Group; unit: number; fx: number; fy: number; size: number; spin: number; z: number }

const PLANETS: { name: ModelName; at: [number, number]; atSmall: [number, number]; size: number; tilt: [number, number]; spin: number }[] = [
  { name: 'ringed', at: [0.11, 0.2], atSmall: [0.14, 0.1], size: 0.3, tilt: [0.32, 0.38], spin: 0.12 },
  { name: 'violet', at: [0.9, 0.8], atSmall: [0.86, 0.73], size: 0.22, tilt: [0.1, -0.2], spin: -0.09 },
  { name: 'moon', at: [0.85, 0.15], atSmall: [0.88, 0.2], size: 0.085, tilt: [0.2, 0.1], spin: 0.2 },
];

export class ClashCast {
  readonly ready: Promise<void>;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
  private figs: Figure[] = [];
  private planets: Planet[] = [];
  private vw = 0;
  private vh = 0;
  private sl = 0; // the stage's offset in the viewport
  private st = 0;
  private height = 100; // an astronaut's height in pixels
  private appear = 0; // the planets drifting in, 0-1
  private look = { x: 0, y: 0, tx: 0, ty: 0 };
  private v = new THREE.Vector3();

  constructor(canvas: HTMLCanvasElement, private small: boolean) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0);

    // Soft fill, a white key from the front, and the two heroes' colours as rims.
    this.scene.add(new THREE.HemisphereLight(0xdcecff, 0x241640, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(0.35, 0.8, 1);
    const rimA = new THREE.DirectionalLight(0x5ce0ff, 3.2);
    rimA.position.set(-1, 0.35, -0.5);
    const rimB = new THREE.DirectionalLight(0xff6bd5, 3.2);
    rimB.position.set(1, 0.35, -0.5);
    this.scene.add(key, rimA, rimB);
    this.camera.position.z = 0;

    window.addEventListener('pointermove', this.onPointer, { passive: true });
    this.ready = this.build();
  }

  private onPointer = (e: PointerEvent) => {
    this.look.tx = e.clientX / (window.innerWidth || 1) - 0.5;
    this.look.ty = e.clientY / (window.innerHeight || 1) - 0.5;
  };

  private async build() {
    const [nova, astra] = await Promise.all([loadModel('nova'), loadModel('astra')]);
    this.figs = [this.figure(nova, 0.8), this.figure(astra, -0.8)];
    // Nova a touch in front, so a head-on bump overlaps cleanly.
    this.figs[0].holder.position.z = 120;
    // The planets are scenery: if one fails, the scene goes on without it.
    const planets = await Promise.allSettled(PLANETS.map((p) => loadModel(p.name)));
    planets.forEach((r, i) => {
      if (r.status !== 'fulfilled') return;
      const p = PLANETS[i];
      const inner = r.value.scene;
      inner.rotation.set(p.tilt[0], 0, p.tilt[1]);
      const obj = fit(inner, 1);
      const [fx, fy] = this.small ? p.atSmall : p.at;
      this.planets.push({ obj, unit: obj.scale.x, fx, fy, size: p.size, spin: p.spin, z: -2000 - i * 100 });
      this.scene.add(obj);
    });
    this.layout();
  }

  private figure(gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }, face: number): Figure {
    const model = gltf.scene;
    const turn = fit(model, 1);
    turn.rotation.y = face;
    const holder = new THREE.Group();
    holder.add(turn);
    holder.visible = false;
    this.scene.add(holder);

    const mixer = new THREE.AnimationMixer(model);
    const actions = new Map<string, THREE.AnimationAction>();
    for (const clip of gltf.animations) actions.set(clip.name.split('|').pop()!, mixer.clipAction(clip));
    const find = (n: string) => model.getObjectByName(n) ?? model;
    const gun = model.getObjectByName('Pistol') ?? null;
    if (gun) gun.visible = false;
    const fig: Figure = {
      holder, turn, mixer, actions, current: null, face, gun,
      bones: { hand: find('Middle1.R'), head: find('Head'), body: find('Torso') },
    };
    const base = actions.get(BASE_CLIP);
    if (base) { base.timeScale = BASE_SPEED; base.play(); fig.current = base; }
    // A one-shot clip that has finished drifts back into the float.
    mixer.addEventListener('finished', (e) => { if (e.action === fig.current) this.toBase(fig); });
    return fig;
  }

  private toBase(f: Figure) {
    const base = f.actions.get(BASE_CLIP);
    if (!base || f.current === base) return;
    base.reset().setLoop(THREE.LoopRepeat, Infinity);
    base.timeScale = BASE_SPEED;
    base.play();
    if (f.current) base.crossFadeFrom(f.current, 0.3, false);
    f.current = base;
  }

  /** Plays one of the model's clips once, then floats again. */
  play(who: Who, name: string, { speed = 1, fade = 0.12 }: { speed?: number; fade?: number } = {}) {
    const f = this.figs[who];
    const a = f?.actions.get(name);
    if (!f || !a) return;
    const prev = f.current;
    a.reset().setLoop(THREE.LoopOnce, 1);
    a.clampWhenFinished = true;
    a.timeScale = speed;
    a.play();
    if (prev && prev !== a) a.crossFadeFrom(prev, fade, false);
    f.current = a;
  }

  /** The astronaut is just floating, not in the middle of a move. */
  floating(who: Who) {
    const f = this.figs[who];
    return !!f && f.current === f.actions.get(BASE_CLIP);
  }

  /** Shows or hides an astronaut's blaster. */
  gun(who: Who, on: boolean) {
    const g = this.figs[who]?.gun;
    if (g) g.visible = on;
  }

  /** Where a part of an astronaut is, in stage pixels (as of the last frame). */
  point(who: Who, part: Part): [number, number] | null {
    const f = this.figs[who];
    if (!f) return null;
    const o = part === 'gun' ? f.gun ?? f.bones.hand : f.bones[part];
    o.getWorldPosition(this.v);
    return [this.v.x + this.vw / 2 - this.sl, this.vh / 2 - this.v.y - this.st];
  }

  /** The viewport, where the stage sits in it and how tall an astronaut is. */
  layout(stage?: DOMRect, height?: number) {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    if (stage) { this.sl = stage.left; this.st = stage.top; }
    if (height) this.height = height;
    this.renderer.setSize(this.vw, this.vh, false);
    Object.assign(this.camera, { left: -this.vw / 2, right: this.vw / 2, top: this.vh / 2, bottom: -this.vh / 2 });
    this.camera.updateProjectionMatrix();
  }

  /** Puts an astronaut where its proxy is. */
  pose(who: Who, p: Pose) {
    const f = this.figs[who];
    if (!f) return;
    f.holder.visible = p.o > 0.02;
    f.holder.position.x = this.sl + p.x - this.vw / 2;
    f.holder.position.y = this.vh / 2 - (this.st + p.y);
    f.holder.rotation.z = -p.rot * D;
    f.holder.scale.set(p.sx * this.height, p.sy * this.height, this.height);
  }

  /** Advances the clips and planets by dt seconds (0 for a still frame) and draws. */
  frame(dt: number) {
    for (const f of this.figs) f.mixer.update(dt);
    const L = this.look;
    L.x += (L.tx - L.x) * Math.min(1, dt * 2.5);
    L.y += (L.ty - L.y) * Math.min(1, dt * 2.5);
    this.appear = dt ? Math.min(1, this.appear + dt / 1.8) : 1;
    const e = 1 - Math.pow(1 - this.appear, 3);
    const m = Math.min(this.vw, this.vh);
    this.planets.forEach((p, i) => {
      const s = p.size * m * (0.75 + 0.25 * e);
      // Drift in from outside their corners, and lean a little against the pointer.
      const out = (1 - e) * 0.08;
      const fx = p.fx + (p.fx < 0.5 ? -out : out);
      const fy = p.fy + (p.fy < 0.5 ? -out : out);
      const depth = 10 + i * 6;
      p.obj.position.set(fx * this.vw - this.vw / 2 - L.x * depth, this.vh / 2 - fy * this.vh + L.y * depth, p.z);
      p.obj.scale.setScalar(s * p.unit);
      p.obj.rotation.y += dt * p.spin;
    });
    this.renderer.render(this.scene, this.camera);
  }

  stop() {
    window.removeEventListener('pointermove', this.onPointer);
    for (const f of this.figs) f.mixer.stopAllAction();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
