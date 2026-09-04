/* ══════════════════════════════════════════════════════════════════
   preloader-fx-3d.ts — the preloader's night sky

   The preloader is unchanged from its original design: aurora blobs,
   the water-fill wordmark, the progress bar. This adds one thing to it
   — the stars, in 3D — and a small flash when the load completes.

   WHY 3D AT ALL, FOR SOMETHING THIS QUIET
   ---------------------------------------
   The preloader already had stars: a few dozen absolutely-positioned divs
   with a CSS twinkle keyframe. Those are still there and still doing
   their job. What they cannot do is sit at different distances. These
   are spread through depth and drift very slowly toward the viewer, so
   near stars slide against far ones and the black behind the wordmark
   gains a floor. That is the whole ambition — no object, no subject,
   nothing to look at directly.

   SPARKLE, NOT PULSE
   ------------------
   A sine wave on brightness gives every star a slow breathing glow,
   which reads as a screensaver. Real sparkle is brief, sharp and small:
   a star is steady almost all of the time and lifts only slightly when
   it does move. So the twinkle is a sine raised to a very high power —
   near zero for nearly its whole cycle, spiking briefly — scaled down
   to a fraction of the star's brightness, and each star gets its own
   rate and phase so nothing pulses in sync.

   All motion happens in the vertex shader from a time uniform, so the
   CPU never touches a position: one draw call, no per-frame work.

   HOW IT KNOWS THE PROGRESS
   -------------------------
   It reads the width of #progress-fill every frame. There are seven
   separate preloader implementations in this codebase and they do not
   agree on duration — 2200 ms, 2600 ms and 7000 ms are all in use. The
   one thing all seven already do is set that element's width, so
   reading it needs no per-page wiring and cannot drift out of sync with
   the bar the user is watching.

   Everything here is decoration: if the module never loads, the
   preloader behaves exactly as it did before.
   ══════════════════════════════════════════════════════════════════ */

import * as THREE from 'three';
import type { Bag } from './_util';

/** Stars, spread across three depths. Kept sparse: a real sky is mostly dark. */
const STAR_COUNT = 380;

/** How far back the field extends. Depth is the only reason this is 3D. */
const NEAR_Z = -6;
const FAR_Z = -70;

/** Peak alpha. This sits behind a wordmark and must never compete with it. */
const MAX_ALPHA = 0.44;

export function mountPreloaderFx(bag: Bag, canvas: HTMLCanvasElement): void {
  const preloader = document.getElementById('preloader');
  if (!preloader || preloader.style.display === 'none') return;

  const progressFill = document.getElementById('progress-fill');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.autoClear = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 140);
  camera.position.set(0, 0, 0);

  const disposables: Array<{ dispose: () => void }> = [];

  /* ── The stars ────────────────────────────────────────────────── */
  const position = new Float32Array(STAR_COUNT * 3);
  const size = new Float32Array(STAR_COUNT);
  const phase = new Float32Array(STAR_COUNT);
  const rate = new Float32Array(STAR_COUNT);
  const color = new Float32Array(STAR_COUNT * 3);
  const tmp = new THREE.Color();

  for (let i = 0; i < STAR_COUNT; i++) {
    const z = NEAR_Z + Math.random() * (FAR_Z - NEAR_Z);
    // Spread wide enough that the slow drift never reveals an edge.
    const spread = -z * 1.25;
    position[i * 3] = (Math.random() - 0.5) * spread * 2;
    position[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.3;
    position[i * 3 + 2] = z;

    // Magnitude, not uniform size: a real sky is mostly faint pinpricks with a
    // handful of bright ones, so the distribution is skewed hard toward small.
    const mag = Math.pow(Math.random(), 2.6);
    size[i] = 0.65 + mag * 1.9;
    phase[i] = Math.random() * Math.PI * 2;
    // Each star flares at its own rate; a shared rate reads as a strobe.
    rate[i] = 0.22 + Math.random() * 0.95;

    // A real sky is not white. Mostly cool, a few warm, none saturated.
    const warm = Math.random() > 0.84;
    tmp.setHSL(warm ? 0.08 : 0.57, warm ? 0.30 : 0.24, 0.62 + Math.random() * 0.24);
    // Faint stars are faint, not merely small: brightness tracks magnitude so
    // the field has depth instead of reading as an even scatter of dots.
    const lum = 0.34 + mag * 0.66;
    color[i * 3] = tmp.r * lum;
    color[i * 3 + 1] = tmp.g * lum;
    color[i * 3 + 2] = tmp.b * lum;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geom.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geom.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  geom.setAttribute('aRate', new THREE.BufferAttribute(rate, 1));
  geom.setAttribute('aColor', new THREE.BufferAttribute(color, 3));
  geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, FAR_Z / 2), 200);
  disposables.push(geom);

  const sprite = makeStarSprite();
  disposables.push(sprite);

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uDrift: { value: 0 },
      uMap: { value: sprite },
      uSparkle: { value: reduceMotion ? 0 : 1 },
      uNear: { value: NEAR_Z },
      uFar: { value: FAR_Z },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      attribute float aRate;
      attribute vec3  aColor;

      uniform float uTime;
      uniform float uDrift;
      uniform float uSparkle;
      uniform float uNear;
      uniform float uFar;

      varying vec3  vColor;
      varying float vAlpha;

      void main() {
        // Drift toward the viewer and wrap back to the far plane, so the field
        // is endless without ever being rebuilt on the CPU.
        float span = uNear - uFar;
        float z = uFar + mod(position.z - uFar + uDrift, span);

        vec3 p = vec3(position.xy, z);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);

        // SPARKLE: a high power on the sine keeps each star steady most of the
        // time and flares it briefly, which is what a twinkle actually looks
        // like. A plain sine would make the whole sky breathe together.
        float s = 0.5 + 0.5 * sin(uTime * aRate + aPhase);
        // A higher power narrows each flare, so fewer stars are mid-sparkle at
        // any moment; the smaller multiplier keeps the peaks from shouting.
        float flare = pow(s, 26.0);
        float bright = mix(1.0, 0.88 + 0.24 * flare, uSparkle);

        // Fade in at the far plane and out at the near one so wrapping is
        // never visible as a pop.
        float depth = clamp((z - uFar) / span, 0.0, 1.0);
        float edge = smoothstep(0.0, 0.12, depth) * (1.0 - smoothstep(0.86, 1.0, depth));

        vColor = aColor;
        vAlpha = bright * edge;

        gl_PointSize = aSize * (1.0 + flare * 0.12 * uSparkle) * (170.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      uniform float uAlpha;
      varying vec3  vColor;
      varying float vAlpha;
      void main() {
        vec4 tex = texture2D(uMap, gl_PointCoord);
        float a = tex.a * vAlpha * uAlpha;
        if (a < 0.004) discard;
        gl_FragColor = vec4(vColor * tex.rgb, a);
      }
    `,
  });
  disposables.push(mat);

  const stars = new THREE.Points(geom, mat);
  stars.frustumCulled = false;
  scene.add(stars);

  /* ── The flash ────────────────────────────────────────────────────
     A brief lift across the frame as the bar completes, landing on the
     split-screen reveal the preloader already does. Deliberately small:
     it punctuates the transition rather than being one. */
  const flashScene = new THREE.Scene();
  const flashCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const flashGeom = new THREE.PlaneGeometry(2, 2);
  disposables.push(flashGeom);
  const flashMat = new THREE.MeshBasicMaterial({
    color: 0xdce9ff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(flashMat);
  flashScene.add(new THREE.Mesh(flashGeom, flashMat));

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  bag.on(window, 'resize', resize);

  let raf = 0;
  let last = performance.now();
  let alive = true;
  let intro = 0;
  let elapsed = 0;
  let drift = 0;
  let flash = 0;
  let flashFired = false;
  let doneAt = 0;

  function readProgress(): number {
    if (!progressFill) return 0;
    const inline = progressFill.style.width;
    if (inline.endsWith('%')) {
      const v = parseFloat(inline);
      if (Number.isFinite(v)) return Math.max(0, Math.min(1, v / 100));
    }
    const track = progressFill.parentElement;
    if (track && track.clientWidth > 0) {
      return Math.max(0, Math.min(1, progressFill.clientWidth / track.clientWidth));
    }
    return 0;
  }

  function frame(now: number) {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    const p = readProgress();
    intro = Math.min(1, intro + dt * 1.5);
    elapsed += dt;
    // Barely moving. The drift is for parallax, not for travel.
    drift += dt * (reduceMotion ? 0.15 : 0.9 + p * 1.4);

    const bloom = flashFired ? Math.min(1, (now - doneAt) / 420) : 0;

    mat.uniforms.uTime.value = elapsed;
    mat.uniforms.uDrift.value = drift;
    // The sky lifts a little as the load completes, then clears for the reveal.
    mat.uniforms.uAlpha.value = intro * MAX_ALPHA * (0.62 + p * 0.38) * (1 - bloom);

    if (p >= 0.999 && !flashFired) {
      flashFired = true;
      flash = 1;
      doneAt = now;
    }
    if (flash > 0) {
      flash = Math.max(0, flash - dt * (reduceMotion ? 4.0 : 2.6));
      flashMat.opacity = (reduceMotion ? 0.1 : 0.3) * Math.pow(flash, 2.4);
    }

    renderer.clear();
    renderer.render(scene, camera);
    if (flashMat.opacity > 0.001) renderer.render(flashScene, flashCam);

    if (flashFired && now - doneAt > 1400) stop();
  }

  function stop() {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(raf);
    canvas.style.display = 'none';
    for (const d of disposables) {
      try {
        d.dispose();
      } catch {
        /* ignore */
      }
    }
    scene.clear();
    flashScene.clear();
    renderer.dispose();
    renderer.forceContextLoss?.();
  }

  raf = requestAnimationFrame(frame);
  bag.add(stop);
}

/** A soft star with a faint cross flare, drawn once and shared by every point. */
function makeStarSprite(): THREE.CanvasTexture {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const m = size / 2;

  // The round core.
  const g = ctx.createRadialGradient(m, m, 0, m, m, m);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.16, 'rgba(255,255,255,0.42)');
  g.addColorStop(0.42, 'rgba(255,255,255,0.07)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  // A very faint four-point flare. It is what separates a star from a dot —
  // subtle enough that you read it rather than notice it.
  ctx.globalCompositeOperation = 'lighter';
  const streak = ctx.createLinearGradient(0, m, size, m);
  streak.addColorStop(0.0, 'rgba(255,255,255,0)');
  streak.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  streak.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = streak;
  ctx.fillRect(0, m - 0.5, size, 1.0);
  const streakV = ctx.createLinearGradient(m, 0, m, size);
  streakV.addColorStop(0.0, 'rgba(255,255,255,0)');
  streakV.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  streakV.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = streakV;
  ctx.fillRect(m - 0.5, 0, 1.0, size);

  return new THREE.CanvasTexture(c);
}
