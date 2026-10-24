/* ════════════════════════════════════════
   models.ts - the 3D models the intro and the page transition share
   (public/models/cosmic, Quaternius's CC0 Ultimate Space Kit; see CREDITS.md
   there). Each file is fetched once per page and handed out as a promise, so
   the transition's spaceships come from the cache after the intro.
   ════════════════════════════════════════ */
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const BASE = '/models/cosmic/';
export const MODELS = {
  nova: 'frog.glb',
  astra: 'flamingo.glb',
  shipNova: 'ship-frog.glb',
  shipAstra: 'ship-flamingo.glb',
  ringed: 'planet-ringed.glb',
  violet: 'planet-violet.glb',
  moon: 'planet-moon.glb',
} as const;
export type ModelName = keyof typeof MODELS;

let loader: GLTFLoader | null = null;
const cache = new Map<ModelName, Promise<GLTF>>();

export function loadModel(name: ModelName): Promise<GLTF> {
  let p = cache.get(name);
  if (!p) {
    loader ??= new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    p = loader.loadAsync(BASE + MODELS[name]).then((gltf) => {
      // The kit's materials come from FBX with metalness 0.4, which turns
      // them muddy without an environment map: make them plain painted plastic.
      gltf.scene.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (m && 'metalness' in m) { m.metalness = 0; m.roughness = 0.75; }
        o.frustumCulled = false; // skinned bounds don't follow the animation
      });
      return gltf;
    });
    p.catch(() => cache.delete(name)); // a failed fetch can be retried later
    cache.set(name, p);
  }
  return p;
}

/** A WebGL context is available (some locked-down or old devices have none). */
export function canWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

/** Centres an object on its bounds and scales it to a given height; returns the wrapper. */
export function fit(obj: THREE.Object3D, height: number) {
  const box = new THREE.Box3().setFromObject(obj, true);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const s = height / (size.y || 1);
  obj.position.sub(centre);
  const wrap = new THREE.Group();
  wrap.add(obj);
  wrap.scale.setScalar(s);
  return wrap;
}
