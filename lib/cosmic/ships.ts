/* ════════════════════════════════════════
   ships.ts - the page transition's 3D spaceships (three.js): Nova's green
   and gold ship streaks across on the edge that covers the page, Astra's
   pink one on the edge that reveals the next (lib/cosmic/transition.ts).
   Quaternius's CC0 Ultimate Space Kit models (lib/cosmic/models.ts).

   One transparent canvas over the overlay, an orthographic camera measured
   in viewport pixels, and drawing only while a ship is flying. The models
   load when the browser is idle after the page has opened, so they never
   compete with the page's own loading; until then a transition simply has
   its energy edges without the ships.
   ════════════════════════════════════════ */
import * as THREE from 'three';
import { loadModel, type ModelName } from './models';

const D = Math.PI / 180;
export type Ship = 0 | 1;
const FILES: ModelName[] = ['shipNova', 'shipAstra'];
const RIM = [0x5ce0ff, 0xff6bd5];

interface Craft { holder: THREE.Group; roll: THREE.Group; light: THREE.DirectionalLight }

export class Ships {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
  private crafts: (Craft | null)[] = [null, null];
  private vw = 0;
  private vh = 0;
  private drawn = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0);
    this.scene.add(new THREE.HemisphereLight(0xdcecff, 0x241640, 1.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(0.2, 1, 0.8);
    this.scene.add(key);
    this.layout();
    FILES.forEach((name, i) => {
      loadModel(name).then((gltf) => { this.crafts[i] = this.craft(gltf.scene.clone(), RIM[i]); }, () => { /* no ship: the edge alone */ });
    });
  }

  private craft(model: THREE.Object3D, rim: number): Craft {
    // Nose (+z) to the right, then normalised to a length of about 1 (by the
    // wingspan as well, as the frog's ship is short with wide wings).
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(box.getCenter(new THREE.Vector3()));
    const turn = new THREE.Group();
    turn.add(model);
    turn.rotation.y = 90 * D;
    turn.scale.setScalar(1 / (Math.max(size.z, size.x * 0.55) || 1));
    const roll = new THREE.Group(); // banks about the nose, showing a little of the top
    roll.add(turn);
    const holder = new THREE.Group();
    holder.add(roll);
    holder.visible = false;
    // Each ship lit from behind in its pilot's colour.
    const light = new THREE.DirectionalLight(rim, 3.4);
    light.position.set(-1, 0.4, -0.6);
    holder.add(light);
    this.scene.add(holder);
    return { holder, roll, light };
  }

  layout() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.renderer.setSize(this.vw, this.vh, false);
    Object.assign(this.camera, { left: -this.vw / 2, right: this.vw / 2, top: this.vh / 2, bottom: -this.vh / 2 });
    this.camera.updateProjectionMatrix();
  }

  /** Flies a ship at (x, y) in viewport pixels, nose tilted by tilt degrees, stretched by speed. */
  fly(which: Ship, x: number, y: number, tilt: number, stretch: number) {
    const c = this.crafts[which];
    if (!c) return;
    const len = Math.min(170, Math.max(96, this.vw * 0.1));
    c.holder.visible = true;
    c.holder.position.set(x - this.vw / 2, this.vh / 2 - y, 0);
    c.holder.rotation.z = -tilt * D;
    c.holder.scale.set(len * stretch, len, len);
    c.roll.rotation.x = -0.55 + Math.sin(performance.now() / 140) * 0.06;
    this.renderer.render(this.scene, this.camera);
    this.drawn = true;
  }

  /** Clears the canvas once a ship has flown. */
  land() {
    for (const c of this.crafts) if (c) c.holder.visible = false;
    if (this.drawn) { this.renderer.render(this.scene, this.camera); this.drawn = false; }
  }

  destroy() {
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
