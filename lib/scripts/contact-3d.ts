// @ts-nocheck
/* ════════════════════════════════════════
   contact-3d.ts - the Contact page's two three.js figures.
   Loaded on demand by components/pages/contact/Figure3D.tsx.

   'desk'      - hero: the developer from the site's old Lottie, at the desk
                 with one hand raised to the floating cards, generated in 3D
                 with Tripo from a frame of it. The cards, "!!!" and cursor
                 are built here.
   'astronaut' - "how I work": the site's astronaut, generated in 3D with
                 Tripo from the original artwork, floating, kicking and
                 sketching a trail of stardust with his golden pencil.
   'peek'      - the same astronaut, chest up, waving over the footer at the
                 end of the Experience page (components/AstroPeek.tsx).

   Both are single sculpted meshes with no skeleton, so their limbs and heads
   are bent in the vertex shader. Visitors can drag to turn either figure and
   tap it to set off one of its actions. Rendering stops while a figure is
   off screen or the tab is hidden; with reduced motion each draws one still
   frame and only redraws when turned.
   ════════════════════════════════════════ */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const D = Math.PI / 180;
const { sin, cos, min, max } = Math;
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0, ...o });

/* A soft round sprite for glows and stardust. */
function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,1)');
  r.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ── Particles: a pool of additive points that drift and fade ── */
function stardust(count, texture, size) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const alpha = new Float32Array(count);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uMap: { value: texture }, uSize: { value: size }, uScale: { value: 300 } },
    vertexShader: `
      attribute float aAlpha; attribute vec3 color;
      varying float vA; varying vec3 vC;
      uniform float uSize; uniform float uScale;
      void main() {
        vA = aAlpha; vC = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize * (0.45 + 0.55 * aAlpha) * uScale / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform sampler2D uMap; varying float vA; varying vec3 vC;
      void main() {
        float a = texture2D(uMap, gl_PointCoord).a * vA;
        if (a < 0.01) discard;
        gl_FragColor = vec4(vC * a, a);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const life = new Float32Array(count);
  const span = new Float32Array(count);
  const vel = new Float32Array(count * 3);
  let next = 0;
  return {
    points,
    emit(p, v, color, ttl) {
      const i = next; next = (next + 1) % count;
      pos.set([p.x, p.y, p.z], i * 3);
      vel.set([v.x, v.y, v.z], i * 3);
      col.set([color.r, color.g, color.b], i * 3);
      life[i] = ttl; span[i] = ttl;
      geo.attributes.color.needsUpdate = true;
    },
    update(dt) {
      for (let i = 0; i < count; i++) {
        if (life[i] <= 0) { alpha[i] = 0; continue; }
        life[i] -= dt;
        const k = i * 3;
        pos[k] += vel[k] * dt; pos[k + 1] += vel[k + 1] * dt; pos[k + 2] += vel[k + 2] * dt;
        const f = max(0, life[i] / span[i]);
        alpha[i] = f * f;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aAlpha.needsUpdate = true;
    },
  };
}

/* ── Click actions: each tap plays the next one in the list ── */
const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const bump = (x) => sin(Math.PI * min(1, max(0, x))); // 0 → 1 → 0
function actions(list) {
  let next = 0, cur = null;
  return {
    start(t) {
      if (cur) return null; // let the current one finish
      cur = { ...list[next], t0: t };
      next = (next + 1) % list.length;
      return cur.name;
    },
    /** The running action's name and progress 0..1, or null. */
    at(t) {
      if (!cur) return null;
      const p = (t - cur.t0) / cur.dur;
      if (p >= 1) { cur = null; return null; }
      return { name: cur.name, p };
    },
  };
}

/* ── Stage: renderer, camera, lights, loop and clean-up ── */
function stage(host, { fov, target, from }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  // Capped, and lowered further by mountFigure if frames start to drop.
  let dpr = min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Neutral keeps the models' colours; ACES washed the saturated ones out.
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.domElement.className = 'ct-3d-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.55;

  scene.add(new THREE.HemisphereLight(0xe4eeff, 0x2a1650, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8cd2ff, 2.2);
  rim.position.set(-5, 3, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xc39bff, 1.1);
  fill.position.set(5, -1, -3);
  scene.add(fill);

  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  const dir = new THREE.Vector3(...from).normalize();
  // Radius of the sphere, about `target`, that holds the whole figure. The
  // camera frames that sphere, so the figure stays in view however it is
  // turned. The canvas overhangs its host (see the CSS) to keep it large.
  let radius = 1;
  const resize = () => {
    const canvas = renderer.domElement;
    const w = canvas.clientWidth || host.clientWidth || 1, h = canvas.clientHeight || host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const half = min(fov * D, 2 * Math.atan(Math.tan((fov * D) / 2) * camera.aspect)) / 2;
    const dist = radius / Math.sin(half);
    camera.near = max(0.05, dist - radius * 1.5);
    camera.far = dist + radius * 2;
    camera.position.copy(dir).multiplyScalar(dist).add(new THREE.Vector3(...target));
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // What the visitor turns: `spin` pivots on the framed centre, `root` holds
  // the figure. World-space effects (stardust) go straight into `scene`.
  const spin = new THREE.Group();
  spin.position.set(...target);
  const root = new THREE.Group();
  root.position.set(-target[0], -target[1], -target[2]);
  spin.add(root);
  scene.add(spin);

  const fitTo = (r) => { radius = r; resize(); };
  const lowerRes = () => {
    if (dpr <= 1) return false;
    dpr = max(1, dpr - 0.25);
    renderer.setPixelRatio(dpr);
    resize();
    return true;
  };

  return { renderer, scene, camera, env, pmrem, ro, spin, root, fitTo, lowerRes };
}

function disposeAll(root) {
  root.traverse((n) => {
    if (n.geometry) n.geometry.dispose();
    const m = n.material;
    if (m) (Array.isArray(m) ? m : [m]).forEach((x) => {
      Object.values(x).forEach((v) => v && v.isTexture && v.dispose());
      if (x.uniforms) Object.values(x.uniforms).forEach((u) => u.value && u.value.isTexture && u.value.dispose());
      x.dispose();
    });
  });
}

/* ════════════ The astronaut ════════════ */

/* Generated with Tripo from the site's original astronaut artwork, so it is
   a single sculpted mesh with no skeleton. The kicking leg, the standing leg
   and the helmet are bent in the vertex shader instead: each turns about its
   own joint, weighted by a soft mask over the model's own coordinates, so
   the hands and the pencil never warp. Model space: +X is his front, +Y up,
   +Z his right-hand side (where the pencil tip points). */
const BEND = /* glsl */ `
  uniform float uKick; uniform float uStand; uniform float uNod; uniform float uTurn;
  mat3 rotAxis(vec3 a, float r) {
    float s = sin(r), c = cos(r), o = 1.0 - c;
    return mat3(
      o * a.x * a.x + c,       o * a.x * a.y + a.z * s, o * a.z * a.x - a.y * s,
      o * a.x * a.y - a.z * s, o * a.y * a.y + c,       o * a.y * a.z + a.x * s,
      o * a.z * a.x + a.y * s, o * a.y * a.z - a.x * s, o * a.z * a.z + c);
  }
`;
const BEND_MAIN = /* glsl */ `
  vec3 p0 = position;
  // Kicked leg: below the hips, out on his right.
  float wK = smoothstep(-0.06, -0.15, p0.y) * smoothstep(0.03, 0.12, p0.z);
  // Standing leg: below the belt, centre-left, clear of the pencil's eraser.
  float wS = smoothstep(-0.13, -0.21, p0.y) * (1.0 - smoothstep(-0.01, 0.05, p0.z)) * smoothstep(-0.3, -0.23, p0.z);
  // Helmet: above the collar, clear of the pencil and the backpack.
  float wH = smoothstep(0.22, 0.27, p0.y) * (1.0 - smoothstep(0.08, 0.14, p0.z)) * smoothstep(-0.17, -0.1, p0.x);
  mat3 rK = rotAxis(vec3(0.0, 0.0, 1.0), uKick * wK);
  mat3 rS = rotAxis(vec3(0.0, 0.0, 1.0), uStand * wS);
  mat3 rH = rotAxis(vec3(0.0, 1.0, 0.0), uTurn * wH) * rotAxis(vec3(0.0, 0.0, 1.0), uNod * wH);
  const vec3 hipK = vec3(0.0, -0.12, 0.08);
  const vec3 hipS = vec3(-0.02, -0.17, -0.08);
  const vec3 neck = vec3(-0.02, 0.22, -0.03);
`;

const TRAIL = [new THREE.Color('#8cd2ff'), new THREE.Color('#c39bff'), new THREE.Color('#6dffb4'), new THREE.Color('#ffd27a')];

async function buildAstronaut(st, base) {
  const gltf = await new GLTFLoader().loadAsync(base + 'astronaut.glb');
  const model = gltf.scene;
  const u = { uKick: { value: 0 }, uStand: { value: 0 }, uNod: { value: 0 }, uTurn: { value: 0 } };
  model.traverse((n) => {
    if (!n.isMesh) return;
    n.frustumCulled = false;
    const m = n.material;
    m.envMapIntensity = 0.9;
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, u);
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\n' + BEND)
        .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
${BEND_MAIN}
  objectNormal = rH * (rS * (rK * objectNormal));`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
  transformed = hipK + rK * (transformed - hipK);
  transformed = hipS + rS * (transformed - hipS);
  transformed = neck + rH * (transformed - neck);`);
    };
    m.customProgramCacheKey = () => 'ct-astro-bend';
  });

  // Face the visitor: his front (+X) turned toward the camera.
  const fig = new THREE.Group();
  const facing = new THREE.Group();
  facing.rotation.y = -Math.PI / 2;
  facing.add(model);
  // `trick` carries the flips and spins a tap sets off.
  const trick = new THREE.Group();
  trick.add(facing);
  fig.add(trick);
  st.root.add(fig);

  const tip = new THREE.Object3D();
  tip.position.set(0.2, 0.445, 0.465);
  model.add(tip);

  const dust = stardust(360, dotTexture(), 0.075);
  st.scene.add(dust.points);
  const tipW = new THREE.Vector3(), lastTip = new THREE.Vector3(), vel = new THREE.Vector3();
  let emitAcc = 0, emitBoost = 1, hue = 0, primed = false;

  const boot = new THREE.Object3D();
  boot.position.set(0.02, -0.4, 0.2);
  model.add(boot);
  const burstAt = (obj, n, speed) => {
    obj.getWorldPosition(tipW);
    for (let k = 0; k < n; k++) {
      vel.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(speed * (0.4 + Math.random() * 0.6));
      dust.emit(tipW, vel, TRAIL[k % TRAIL.length], 0.9 + Math.random() * 0.9);
    }
  };
  const moves = actions([
    { name: 'flip', dur: 1.5 },
    { name: 'spin', dur: 1.4 },
    { name: 'kick', dur: 1.2 },
  ]);

  function frame(t, dt) {
    // Drift, and a slow figure-of-eight sway that has the pencil tip sketch
    // loops in the air.
    const a = t * 1.1;
    fig.position.y = sin(t * 0.9) * 0.025;
    fig.rotation.set(sin(a) * 0.09, 0.32 + sin(t * 0.32) * 0.22, cos(a * 0.5) * 0.12 - 0.04);

    u.uKick.value = (sin(t * 1.4) * 13 - 3) * D;
    u.uStand.value = sin(t * 1.4 + 1.8) * 6 * D;
    u.uNod.value = sin(t * 0.8) * 5 * D;
    u.uTurn.value = sin(t * 0.45) * 10 * D;

    // Tap actions: a backflip with knees tucked, a pirouette that sprays
    // stardust, or one big kick.
    trick.rotation.set(0, 0, 0);
    trick.position.y = 0;
    const m = moves.at(t);
    emitBoost = 1;
    if (m) {
      const e = easeIO(m.p), b = bump(m.p);
      if (m.name === 'flip') {
        trick.rotation.x = -e * Math.PI * 2;
        trick.position.y = b * 0.12;
        u.uKick.value += b * 35 * D;
        u.uStand.value += b * 25 * D;
      } else if (m.name === 'spin') {
        trick.rotation.y = e * Math.PI * 2;
        trick.position.y = b * 0.05;
        emitBoost = 1 + b * 3;
      } else {
        const k = bump(m.p * 1.6) - 0.35 * bump((m.p - 0.55) * 2.2);
        u.uKick.value += k * 60 * D;
        u.uStand.value -= k * 18 * D;
        u.uNod.value -= k * 10 * D;
      }
    }

    fig.updateMatrixWorld(true);
    tip.getWorldPosition(tipW);
    if (!primed) { lastTip.copy(tipW); primed = true; }
    emitAcc += dt * 70 * emitBoost;
    while (emitAcc >= 1) {
      emitAcc -= 1;
      hue = (hue + 0.013) % TRAIL.length;
      const p = lastTip.clone().lerp(tipW, Math.random());
      vel.set((Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04 - 0.01, (Math.random() - 0.5) * 0.04);
      dust.emit(p, vel, TRAIL[Math.floor(hue)], 1.4 + Math.random() * 1.2);
    }
    lastTip.copy(tipW);
    dust.update(dt);
  }

  function act(t) {
    const name = moves.start(t);
    if (!name) return;
    fig.updateMatrixWorld(true);
    if (name === 'kick') setTimeout(() => burstAt(boot, 50, 0.5), 260);
    else burstAt(tip, 40, 0.35);
  }

  return { frame, act, hit: model, busy: (t) => !!moves.at(t) };
}

/* ════════════ The astronaut, peeking up to wave ════════════ */

/* For the foot of a page: the same astronaut, chest up, waving. In the
   original model both gloves grip the one pencil, so astronaut-wave.glb is a
   copy prepared offline in which the left glove's triangles are cut free of
   the pencil and every vertex carries a weight (`_wave`): 1 for the arm and
   glove, easing to 0 across the shoulder, 0 for the pencil and the rest of
   him. The arm turns rigidly about the shoulder by that weight, so nothing
   stretches. A short gold sleeve fills the gap the glove leaves in the pencil
   and a cap closes the glove's fist. The model is mirrored, so the waving arm
   is his right and the pencil stays in his left hand. */
const PEEK_BEND = /* glsl */ `
  attribute float _wave;
  uniform float uWave; uniform float uSwing; uniform float uLift; uniform float uNod; uniform float uTurn;
  mat3 rotAxis(vec3 a, float r) {
    float s = sin(r), c = cos(r), o = 1.0 - c;
    return mat3(
      o * a.x * a.x + c,       o * a.x * a.y + a.z * s, o * a.z * a.x - a.y * s,
      o * a.x * a.y - a.z * s, o * a.y * a.y + c,       o * a.y * a.z + a.x * s,
      o * a.z * a.x + a.y * s, o * a.y * a.z - a.x * s, o * a.z * a.z + c);
  }
`;
const PEEK_BEND_MAIN = /* glsl */ `
  vec3 p0 = position;
  float wH = smoothstep(0.22, 0.27, p0.y) * (1.0 - smoothstep(0.08, 0.14, p0.z)) * smoothstep(-0.17, -0.1, p0.x);
  mat3 rA = rotAxis(vec3(1.0, 0.0, 0.0), uWave * _wave) * rotAxis(vec3(0.0, 0.0, 1.0), uLift * _wave) * rotAxis(vec3(0.0, 1.0, 0.0), uSwing * _wave);
  mat3 rH = rotAxis(vec3(0.0, 1.0, 0.0), uTurn * wH) * rotAxis(vec3(0.0, 0.0, 1.0), uNod * wH);
  const vec3 shoulder = vec3(0.017, 0.066, -0.221);
  const vec3 neck = vec3(-0.02, 0.22, -0.03);
`;
// Model space: where the arm turns, and the pencil's axis (eraser end + direction).
const PEEK_SHOULDER = new THREE.Vector3(0.017, 0.066, -0.221);
const PEEK_PENCIL_END = new THREE.Vector3(0.198, -0.199, -0.443);
const PEEK_PENCIL_DIR = new THREE.Vector3(-0.0029, 0.5747, 0.8184).normalize();

async function buildPeek(st, base) {
  const gltf = await new GLTFLoader().loadAsync(base + 'astronaut-wave.glb');
  const model = gltf.scene;
  const u = { uWave: { value: 0 }, uSwing: { value: 0 }, uLift: { value: 0 }, uNod: { value: 0 }, uTurn: { value: 0 } };
  model.traverse((n) => {
    if (!n.isMesh) return;
    n.frustumCulled = false;
    const m = n.material;
    m.envMapIntensity = 0.9;
    m.side = THREE.DoubleSide;
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, u);
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\n' + PEEK_BEND)
        .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
${PEEK_BEND_MAIN}
  objectNormal = rH * (rA * objectNormal);`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
  transformed = shoulder + rA * (transformed - shoulder);
  transformed = neck + rH * (transformed - neck);`);
    };
    m.customProgramCacheKey = () => 'xp-astro-peek';
  });
  // A gold core along the pencil where the glove used to grip it, which shows
  // through the gap the glove leaves behind.
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.054, 0.054, 0.26, 28, 1, true),
    std('#c27a33', { roughness: 0.45, metalness: 0.25, side: THREE.DoubleSide }),
  );
  core.position.copy(PEEK_PENCIL_END).addScaledVector(PEEK_PENCIL_DIR, 0.37);
  core.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), PEEK_PENCIL_DIR);
  model.add(core);
  model.scale.z = -1;

  const fig = new THREE.Group();
  const facing = new THREE.Group();
  facing.rotation.y = -Math.PI / 2;
  facing.add(model);
  fig.add(facing);
  st.root.add(fig);

  const tip = new THREE.Object3D();
  tip.position.set(0.195, 0.44, 0.467);
  model.add(tip);
  const dust = stardust(220, dotTexture(), 0.06);
  st.scene.add(dust.points);
  const tipW = new THREE.Vector3(), lastTip = new THREE.Vector3(), vel = new THREE.Vector3();
  let emitAcc = 0, hue = 0, primed = false;

  const moves = actions([{ name: 'cheer', dur: 1.6 }]);
  const RAISE = 1.1;

  function pose(wave, swing, lift) {
    u.uWave.value = wave * D;
    u.uSwing.value = swing * D;
    u.uLift.value = lift * D;
  }

  function frame(t, dt) {
    const up = easeIO(min(1, t / RAISE));
    const cyc = (t % 3.4) / 3.4;
    const waving = t > RAISE ? bump(min(1, cyc / 0.7)) : 0;
    let wave = up * -45 + sin(t * 9) * 14 * waving;
    let lift = up * 105;
    let swing = sin(t * 9 + 0.6) * 8 * waving;

    fig.position.y = sin(t * 1.2) * 0.008;
    fig.rotation.set(sin(t * 0.9) * 0.03, 0.1 + sin(t * 0.5) * 0.06, sin(t * 0.7) * 0.025);
    u.uNod.value = (sin(t * 1.1) * 4 - 3) * D;
    u.uTurn.value = (sin(t * 0.6) * 7 - 4) * D;

    let boost = 1;
    const m = moves.at(t);
    if (m) {
      const b = bump(m.p);
      wave += b * 10 + sin(t * 16) * 16 * b;
      swing += sin(t * 16 + 0.8) * 8 * b;
      fig.position.y += b * 0.03;
      boost = 1 + b * 3;
    }
    pose(wave, swing, lift);

    fig.updateMatrixWorld(true);
    tip.getWorldPosition(tipW);
    if (!primed) { lastTip.copy(tipW); primed = true; }
    emitAcc += dt * 34 * boost;
    while (emitAcc >= 1) {
      emitAcc -= 1;
      hue = (hue + 0.02) % TRAIL.length;
      const pt = lastTip.clone().lerp(tipW, Math.random());
      vel.set((Math.random() - 0.5) * 0.05, Math.random() * 0.05 + 0.01, (Math.random() - 0.5) * 0.05);
      dust.emit(pt, vel, TRAIL[Math.floor(hue)], 1.1 + Math.random());
    }
    lastTip.copy(tipW);
    dust.update(dt);
  }

  function act(t) {
    if (!moves.start(t)) return;
    fig.updateMatrixWorld(true);
    tip.getWorldPosition(tipW);
    for (let k = 0; k < 40; k++) {
      vel.set(Math.random() - 0.5, Math.random() * 0.8, Math.random() - 0.5).normalize().multiplyScalar(0.3 * (0.4 + Math.random() * 0.6));
      dust.emit(tipW, vel, TRAIL[k % TRAIL.length], 0.9 + Math.random() * 0.9);
    }
  }

  return { frame, act, hit: model, busy: (t) => !!moves.at(t) || t < RAISE };
}

/* ════════════ The desk ════════════ */

/* Generated with Tripo from a frame of the site's old Lottie: the developer
   at the desk, one hand on the keyboard, the other raised. Like the
   astronaut it is one sculpted mesh, so the raised arm (and its hand), the
   head with its hat and the swinging leg are bent in the vertex shader about
   their joints. The floating cards, the "!!!" and the cursor were animated
   layers in the Lottie, so they are built here and move on their own.
   Model space: +X is his front, +Y up, +Z the plant's side of the desk; the
   raised arm and the laptop are toward -Z. */
const DESK_BEND = /* glsl */ `
  uniform float uArm; uniform float uWrist; uniform float uNod; uniform float uTurn; uniform float uLeg;
  mat3 rotAxis(vec3 a, float r) {
    float s = sin(r), c = cos(r), o = 1.0 - c;
    return mat3(
      o * a.x * a.x + c,       o * a.x * a.y + a.z * s, o * a.z * a.x - a.y * s,
      o * a.x * a.y - a.z * s, o * a.y * a.y + c,       o * a.y * a.z + a.x * s,
      o * a.z * a.x + a.y * s, o * a.y * a.z - a.x * s, o * a.z * a.z + c);
  }
`;
const DESK_BEND_MAIN = /* glsl */ `
  vec3 p0 = position;
  // Raised arm: out past his shoulder, behind the laptop; level with the hat
  // it has to be further out than the brim.
  float zA = mix(-0.115, -0.205, smoothstep(0.15, 0.2, p0.y));
  float wA = smoothstep(zA + 0.01, zA - 0.01, p0.z) * smoothstep(0.03, 0.07, p0.y)
           * max(smoothstep(0.17, 0.2, p0.y), 1.0 - smoothstep(-0.11, -0.08, p0.x));
  float wW = wA * smoothstep(0.3, 0.33, p0.y);
  // Head and hat: above the collar, short of the raised arm and the monitor.
  float zH = mix(-0.125, -0.185, smoothstep(0.17, 0.21, p0.y));
  float wH = smoothstep(0.1, 0.13, p0.y) * smoothstep(zH - 0.01, zH + 0.01, p0.z) * (1.0 - smoothstep(0.03, 0.07, p0.x));
  // The leg kicked out under the desk, clear of the chair, the desk leg and
  // its foot.
  float wL = smoothstep(-0.065, -0.095, p0.y) * smoothstep(-0.38, -0.34, p0.y) * smoothstep(-0.1, -0.14, p0.z)
           * smoothstep(-0.355, -0.335, p0.z) * (1.0 - smoothstep(0.2, 0.25, p0.x));
  const vec3 X = vec3(1.0, 0.0, 0.0);
  mat3 rW = rotAxis(X, uWrist * wW);
  mat3 rA = rotAxis(X, uArm * wA);
  mat3 rH = rotAxis(vec3(0.0, 1.0, 0.0), uTurn * wH) * rotAxis(vec3(0.0, 0.0, 1.0), uNod * wH);
  mat3 rL = rotAxis(X, uLeg * wL);
  const vec3 wrist = vec3(-0.12, 0.31, -0.26);
  const vec3 shoulder = vec3(-0.15, 0.07, -0.13);
  const vec3 neck = vec3(-0.12, 0.1, -0.02);
  const vec3 hip = vec3(-0.03, -0.1, -0.14);
`;

/* A card's face, drawn on a canvas the shape of the card. */
function cardFace(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  const bar = (x, y, bw, bh, col) => { g.fillStyle = col; g.beginPath(); g.roundRect(x, y, bw, bh, bh / 2); g.fill(); };
  draw(g, bar);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* A frosted card facing +X (the visitor), with its art on the front. */
function makeCard(w, h, face) {
  const card = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.024, h, w, 3, 0.011), std(0xece8f8, { roughness: 0.32, envMapIntensity: 1.1 }));
  const art = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.98, h * 0.98), new THREE.MeshStandardMaterial({ map: face, transparent: true, roughness: 0.4 }));
  art.rotation.y = Math.PI / 2;
  art.position.x = 0.0125;
  card.add(body, art);
  return card;
}

const INK = '#2f2b3d';
const imageFace = () => cardFace(256, 340, (g, bar) => {
  const band = g.createLinearGradient(0, 220, 0, 340);
  band.addColorStop(0, '#8ee8c3'); band.addColorStop(1, '#4fc59a');
  g.fillStyle = band; g.beginPath(); g.roundRect(0, 220, 256, 120, [0, 0, 26, 26]); g.fill();
  bar(40, 244, 176, 26, '#f3f1fb'); bar(40, 284, 176, 26, '#f3f1fb');
  g.fillStyle = INK;
  g.beginPath(); g.arc(52, 82, 13, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.moveTo(50, 190); g.lineTo(118, 96); g.lineTo(150, 140); g.lineTo(178, 70); g.lineTo(228, 190); g.closePath(); g.fill();
});
const playFace = () => cardFace(256, 320, (g, bar) => {
  const band = g.createLinearGradient(0, 200, 0, 320);
  band.addColorStop(0, '#f472b0'); band.addColorStop(1, '#e0478e');
  g.fillStyle = band; g.beginPath(); g.roundRect(0, 200, 256, 120, [0, 0, 26, 26]); g.fill();
  bar(46, 224, 164, 26, '#f6eef6'); bar(46, 262, 164, 26, '#f6eef6');
  g.fillStyle = INK; g.beginPath(); g.arc(128, 100, 62, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#f3f1fb'; g.beginPath(); g.moveTo(108, 66); g.lineTo(162, 100); g.lineTo(108, 134); g.closePath(); g.fill();
});
const browserFace = () => cardFace(320, 230, (g, bar) => {
  [['#f05a8f', 46], ['#f6b23c', 80], ['#3ccf9a', 114]].forEach(([c, x]) => { g.fillStyle = c; g.beginPath(); g.arc(x, 34, 12, 0, Math.PI * 2); g.fill(); });
  bar(40, 72, 226, 24, INK); bar(40, 112, 180, 24, INK);
  g.lineWidth = 15;
  g.strokeStyle = '#4fd6a6'; g.beginPath(); g.arc(98, 182, 26, 0, Math.PI * 2); g.stroke();
  g.strokeStyle = '#f472b0'; g.beginPath(); g.arc(238, 182, 22, 0, Math.PI * 2); g.stroke();
});

function makeCursor() {
  const s = new THREE.Shape();
  [[0, 0], [0, -0.078], [0.02, -0.06], [0.034, -0.09], [0.047, -0.084], [0.033, -0.055], [0.058, -0.055]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2 });
  const mesh = new THREE.Mesh(geo, std(0xff7a5c, { roughness: 0.35 }));
  // Outline toward the visitor: the shape's +x to screen right (-Z), +y up.
  mesh.rotation.y = Math.PI / 2;
  const cursor = new THREE.Group();
  cursor.add(mesh);
  return cursor;
}

// The palette's five dots (model space): the cursor's stops.
const DOTS = [[0.352, -0.165], [0.262, -0.183], [0.168, -0.203], [0.08, -0.222], [0.0, -0.24]].map(([z, y]) => new THREE.Vector3(0.335, y, z));
const DOT_COLS = ['#3a8cff', '#e6457a', '#3ccf9a', '#f6b23c', '#7a6cff'].map((c) => new THREE.Color(c));

async function buildDesk(st, base) {
  const gltf = await new GLTFLoader().loadAsync(base + 'desk.glb');
  const model = gltf.scene;
  const u = { uArm: { value: 0 }, uWrist: { value: 0 }, uNod: { value: 0 }, uTurn: { value: 0 }, uLeg: { value: 0 } };
  model.traverse((n) => {
    if (!n.isMesh) return;
    n.frustumCulled = false;
    const m = n.material;
    m.envMapIntensity = 0.9;
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, u);
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\n' + DESK_BEND)
        .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
${DESK_BEND_MAIN}
  objectNormal = rL * (rH * (rA * (rW * objectNormal)));`)
        // Tripo bakes soft, pastel textures: push the colour back up to
        // the Lottie's bold blues, reds and greens.
        .replace('#include <map_fragment>', `#include <map_fragment>
  float lum = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  diffuseColor.rgb = max(mix(vec3(lum), diffuseColor.rgb, 1.45), 0.0);
  diffuseColor.rgb = pow(diffuseColor.rgb, vec3(1.12));`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
  transformed = wrist + rW * (transformed - wrist);
  transformed = shoulder + rA * (transformed - shoulder);
  transformed = neck + rH * (transformed - neck);
  transformed = hip + rL * (transformed - hip);`);
    };
    m.customProgramCacheKey = () => 'ct-desk-bend';
  });

  // fig (scaled, sways) > facing (front to the visitor) > body (hops) > model + props
  const S = 3;
  const FLOOR = -0.445;
  const fig = new THREE.Group();
  fig.scale.setScalar(S);
  const facing = new THREE.Group();
  facing.rotation.y = -Math.PI / 2;
  const body = new THREE.Group();
  body.add(model);
  facing.add(body);
  fig.add(facing);
  st.root.add(fig);

  // A soft pool of light under the desk, and a thin ring that shows the turn.
  const dotTex = dotTexture();
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.1), new THREE.MeshBasicMaterial({ map: dotTex, color: 0x6c7dff, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = FLOOR - 0.004;
  pool.userData.noFit = true; // a soft glow: its corners are transparent
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.0035, 6, 120), new THREE.MeshBasicMaterial({ color: 0x8cd2ff, transparent: true, opacity: 0.55, toneMapped: false }));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = FLOOR;
  facing.add(pool, ring);

  // The Lottie's floating layers.
  const cards = [
    { o: makeCard(0.18, 0.24, imageFace()), at: [-0.04, 0.49, 0.35], tilt: 8, ph: 0 },
    { o: makeCard(0.17, 0.215, playFace()), at: [-0.04, 0.53, 0.12], tilt: 5, ph: 1.7 },
    { o: makeCard(0.25, 0.18, browserFace()), at: [0.03, 0.455, -0.35], tilt: -12, ph: 3.1 },
  ];
  for (const c of cards) body.add(c.o);

  const bang = new THREE.Group();
  bang.position.set(0.02, 0.27, 0.245);
  const bangMat = std(0xd9dcea, { roughness: 0.4 });
  [-32, 0, 32].forEach((a) => {
    const arm = new THREE.Group();
    arm.rotation.x = -a * D;
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.038, 4, 8), bangMat);
    m.position.y = 0.05;
    arm.add(m);
    bang.add(arm);
  });
  body.add(bang);

  const cursor = makeCursor();
  body.add(cursor);

  const dust = stardust(220, dotTex, 0.16);
  st.scene.add(dust.points);
  const pW = new THREE.Vector3(), vel = new THREE.Vector3();
  const sparkle = (local, n, speed, colors, up = 0) => {
    body.localToWorld(pW.copy(local));
    for (let k = 0; k < n; k++) {
      vel.set(Math.random() - 0.5, Math.random() - 0.5 + up, Math.random() - 0.5).normalize().multiplyScalar(S * speed * (0.4 + Math.random() * 0.6));
      dust.emit(pW, vel, colors[k % colors.length], 0.7 + Math.random() * 0.8);
    }
  };
  const hand = new THREE.Vector3(-0.1, 0.42, -0.29);

  const moves = actions([
    { name: 'wave', dur: 1.8 },
    { name: 'hop', dur: 1.2 },
    { name: 'cards', dur: 2.0 },
  ]);
  let stop = -1, clickAt = -9, confettiDone = true;

  function frame(t, dt) {
    const m = moves.at(t);
    const name = m?.name, p = m?.p ?? 0, e = easeIO(p), b = bump(p);

    // Idle: a slow sway and float, a lazy wave, a nod and a swinging foot.
    fig.position.y = sin(t * 0.8) * 0.03;
    fig.rotation.y = 0.18 + sin(t * 0.25) * 0.14;
    u.uArm.value = (-5 + sin(t * 1.5) * 6) * D;
    u.uWrist.value = sin(t * 3.2) * 10 * D;
    u.uNod.value = sin(t * 1.1) * 3 * D;
    u.uTurn.value = sin(t * 0.5) * 8 * D;
    u.uLeg.value = sin(t * 1.9) * 7 * D;

    // Tap actions.
    body.position.y = 0;
    body.scale.set(1, 1, 1);
    let orbit = 0, bangPop = 0;
    if (name === 'wave') {
      // Hi! A big, quick wave, head turned to the hand.
      u.uArm.value += (b * -8 + sin(t * 7) * 12 * b) * D;
      u.uWrist.value = sin(t * 11) * 32 * D * b;
      u.uTurn.value -= b * 14 * D;
      u.uNod.value += b * 6 * D;
    } else if (name === 'hop') {
      // Crouch, hop off the floor with everything on it, land, settle.
      const squash = (p < 0.18 ? bump(p / 0.18) : 0) + (p > 0.78 ? bump((p - 0.78) / 0.22) * 0.8 : 0);
      const air = p > 0.15 && p < 0.82 ? bump((p - 0.15) / 0.67) : 0;
      const sy = 1 - squash * 0.09 + air * 0.04, sxz = 1 + squash * 0.05 - air * 0.02;
      body.scale.set(sxz, sy, sxz);
      body.position.y = FLOOR - FLOOR * sy + air * 0.1;
      u.uLeg.value += air * 22 * D;
      u.uArm.value -= air * 10 * D;
      if (!confettiDone && p > 0.3) {
        confettiDone = true;
        DOTS.forEach((d, i) => sparkle(d, 14, 0.45, [DOT_COLS[i]], 0.6));
      }
    } else if (name === 'cards') {
      // The cards circle him once and the "!!!" pops.
      orbit = e * Math.PI * 2;
      bangPop = b;
      u.uNod.value += b * 9 * D;
    }

    // Cards bob; for the orbit they swing round his head's vertical axis.
    const co = cos(orbit), so = sin(orbit);
    for (const c of cards) {
      const [x, y, z] = c.at;
      const dx = x + 0.1, dz = z + 0.02;
      c.o.position.set(-0.1 + dx * co + dz * so, y + sin(t * 1.2 + c.ph) * 0.012 + (orbit ? b * 0.03 : 0), -0.02 - dx * so + dz * co);
      c.o.rotation.set((c.tilt + sin(t * 0.9 + c.ph) * 3) * D, orbit, 0);
    }

    // "!!!" pulses every couple of seconds (and on demand).
    const pulse = max(bump(((t % 2.6) - 0.1) / 0.45), bangPop);
    bang.scale.setScalar(0.85 + pulse * 0.35);

    // The cursor hops from colour to colour along the palette and clicks.
    const seg = (t * 0.55) % DOTS.length;
    const i0 = Math.floor(seg), i1 = (i0 + 1) % DOTS.length, f = smooth(0.45, 1, seg - i0);
    cursor.position.copy(DOTS[i0]).lerp(DOTS[i1], f);
    cursor.position.y += 0.005 + sin(f * Math.PI) * 0.05;
    cursor.position.z -= 0.01;
    fig.updateMatrixWorld(true);
    if (f === 0 && stop !== i0) { stop = i0; clickAt = t; sparkle(DOTS[i0], 6, 0.12, [DOT_COLS[i0]]); }
    cursor.scale.setScalar(1 - bump((t - clickAt) / 0.25) * 0.18);

    dust.update(dt);
  }

  function act(t) {
    const name = moves.start(t);
    if (!name) return;
    fig.updateMatrixWorld(true);
    if (name === 'hop') confettiDone = false;
    else if (name === 'wave') sparkle(hand, 30, 0.35, TRAIL);
    else cards.forEach((c, i) => sparkle(new THREE.Vector3(...c.at), 14, 0.25, [TRAIL[i]]));
  }

  return { frame, act, hit: model, busy: (t) => !!moves.at(t) };
}

/* ════════════ Mount ════════════ */

/* How far the figure reaches from `target`, over every vertex. */
function reach(root, target) {
  const c = new THREE.Vector3(...target), v = new THREE.Vector3();
  let r = 0;
  root.updateMatrixWorld(true);
  root.traverse((n) => {
    if (!n.isMesh || n.userData.noFit) return;
    const pos = n.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(n.matrixWorld);
      r = max(r, v.distanceTo(c));
    }
  });
  return r || 1;
}

const SETUPS = {
  astronaut: { build: buildAstronaut, fov: 30, target: [0, 0.02, 0], from: [0, 0.1, 1], pad: 1.08 },
  desk: { build: buildDesk, fov: 30, target: [0, 0.24, 0], from: [0, 0.14, 1], pad: 1.06 },
  // Chest up, at a fixed framing (the canvas edge cuts him off at the chest); no dragging.
  peek: { build: buildPeek, fov: 26, target: [0, 0.3, 0], from: [0, 0.04, 1], fit: 0.23, noDrag: true },
};

/** Mounts a figure into `host`; returns a disposer. Adds `is-ready` to the
    host once it has drawn, or `is-failed` if WebGL or the model fails.
    Drag (or arrow keys) turns the figure; a tap on it, Enter or Space plays
    one of its actions. */
export function mountFigure(host, kind, base = '/models/contact/') {
  const setup = SETUPS[kind];
  let st;
  try { st = stage(host, setup); } catch { host.classList.add('is-failed'); return () => {}; }

  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  let api = null, raf = 0, last = 0, t = 0, onScreen = false, dead = false;
  let yaw = 0, pitch = 0, vYaw = 0, drag = null;

  const render = () => {
    st.spin.rotation.set(pitch, yaw, 0);
    st.renderer.render(st.scene, st.camera);
  };
  // Idle motion is slow, so it draws at ~30fps; dragging, a coasting spin or
  // a tap action get every frame. If frames keep coming late, the canvas
  // drops to a lower resolution.
  let late = 0;
  const tick = (now) => {
    raf = 0;
    const active = drag || Math.abs(vYaw) > 0.03 || Math.abs(pitch) > 0.003 || api.busy(t);
    const gap = last ? now - last : 0;
    if (!active && gap && gap < 31) { schedule(); return; }
    const dt = Math.min(0.05, gap ? gap / 1000 : 0.016);
    last = now;
    late = late * 0.92 + (gap > (active ? 26 : 50) ? 1 : 0);
    if (late > 7 && st.lowerRes()) late = 0;
    t += dt;
    if (!drag) {
      // Let a flick coast, and settle the tilt back to level.
      yaw += vYaw * dt;
      vYaw *= Math.exp(-2.6 * dt);
      pitch *= Math.exp(-2.2 * dt);
    }
    api.frame(t, dt);
    render();
    schedule();
  };
  const schedule = () => {
    if (dead || !api || raf) return;
    if (still.matches) { last = 0; return; }
    if (!onScreen || document.hidden) { last = 0; return; }
    raf = requestAnimationFrame(tick);
  };
  const drawStill = () => {
    // A settled moment, with the stardust already drawn.
    for (let k = 0; k < 90; k++) { t += 1 / 30; api.frame(t, 1 / 30); }
    render();
  };
  // With reduced motion there is no loop, so redraw on demand.
  const nudge = () => { if (still.matches && api) render(); };

  /* ── Interaction ── */
  const canvas = st.renderer.domElement;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), box = new THREE.Box3();
  const onFigure = (e) => {
    if (!api) return false;
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, st.camera);
    return !!ray.ray.intersectBox(box.setFromObject(api.hit), new THREE.Vector3());
  };
  const touched = () => host.classList.add('is-touched');
  const act = () => { if (api && !still.matches) { api.act(t); touched(); } };

  const down = (e) => {
    if (!api || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag = { x: e.clientX, y: e.clientY, at: performance.now(), moved: 0, id: e.pointerId, lastT: performance.now() };
    vYaw = 0;
  };
  const move = (e) => {
    if (!drag || e.pointerId !== drag.id) {
      if (e.pointerType === 'mouse') { const c = onFigure(e) ? (setup.noDrag ? 'pointer' : 'grab') : ''; if (host.style.cursor !== c) host.style.cursor = c; }
      return;
    }
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag.x = e.clientX; drag.y = e.clientY;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    if (drag.moved > 6 && !setup.noDrag) {
      if (!drag.captured) { host.setPointerCapture(e.pointerId); drag.captured = true; host.style.cursor = 'grabbing'; touched(); }
      const now = performance.now();
      const step = dx * 0.012;
      yaw += step;
      pitch = Math.max(-0.35, Math.min(0.35, pitch + dy * 0.006));
      vYaw = step / Math.max(0.008, (now - drag.lastT) / 1000);
      drag.lastT = now;
      nudge();
    }
  };
  const up = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const tap = drag.moved <= 6 && performance.now() - drag.at < 600;
    if (performance.now() - drag.lastT > 90) vYaw = 0; // held still before letting go
    vYaw = Math.max(-9, Math.min(9, vYaw));
    drag = null;
    host.style.cursor = '';
    if (tap && onFigure(e)) act();
  };
  const cancel = () => { drag = null; host.style.cursor = ''; };
  const key = (e) => {
    if (e.target !== host) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      vYaw = 0;
      yaw += e.key === 'ArrowLeft' ? -0.3 : 0.3;
      touched();
      nudge();
    }
  };
  host.addEventListener('pointerdown', down);
  host.addEventListener('pointermove', move);
  host.addEventListener('pointerup', up);
  host.addEventListener('pointercancel', cancel);
  host.addEventListener('keydown', key);

  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; schedule(); }, { rootMargin: '120px' });
  io.observe(host);
  const onVis = () => schedule();
  document.addEventListener('visibilitychange', onVis);
  const onMotion = () => { if (still.matches && api) drawStill(); schedule(); };
  still.addEventListener('change', onMotion);

  setup.build(st, base).then((built) => {
    if (dead) return;
    api = built;
    api.frame(0, 0.016);
    st.fitTo(setup.fit || reach(st.root, setup.target) * setup.pad);
    if (still.matches) drawStill(); else render();
    host.classList.add('is-ready');
    schedule();
  }).catch((err) => { if (!dead) { console.error(err); host.classList.add('is-failed'); } });

  return () => {
    dead = true;
    cancelAnimationFrame(raf);
    io.disconnect();
    st.ro.disconnect();
    host.removeEventListener('pointerdown', down);
    host.removeEventListener('pointermove', move);
    host.removeEventListener('pointerup', up);
    host.removeEventListener('pointercancel', cancel);
    host.removeEventListener('keydown', key);
    document.removeEventListener('visibilitychange', onVis);
    still.removeEventListener('change', onMotion);
    disposeAll(st.scene);
    st.env.dispose();
    st.pmrem.dispose();
    st.renderer.dispose();
    st.renderer.forceContextLoss(); // free the GPU context now, not at GC
    st.renderer.domElement.remove();
  };
}
