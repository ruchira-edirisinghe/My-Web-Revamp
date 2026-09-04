/* ══════════════════════════════════════════════════════════════════
   preloader-fx-3d.ts — the preloader's night sky

   The preloader is unchanged from its original design: aurora blobs,
   the water-fill wordmark, the progress bar. This adds one thing to it:
   the stars, in 3D. It fades up as the preloader opens and fades back
   down as the bar completes — no flash, nothing that punches.

   WHY 3D AT ALL, FOR SOMETHING THIS QUIET
   ---------------------------------------
   The preloader already had stars: a few dozen absolutely-positioned
   divs with a CSS twinkle keyframe. Those are still there and still
   doing their job - they are also the whole show on a machine without
   WebGL. What they cannot do is sit at different distances. These
   are spread through depth and drift very slowly toward the viewer, so
   near stars slide against far ones and the black behind the wordmark
   gains a floor. That is the whole ambition — no object, no subject,
   nothing to look at directly.

   SPARKLE, IN TWO PARTS
   ---------------------
   A single sine on brightness makes every star breathe at once, which
   reads as a screensaver. A single sharp flare on its own leaves the
   sky dead between flares. So there are two waves per star, on the same
   per-star rate and phase so nothing anywhere pulses in unison:

     • a gentle sine that never falls below 0.74 — the same quiet shimmer
       the page background uses, keeping the whole field alive; and
     • a sine raised to the 16th, near zero for most of its cycle and
       spiking briefly. That is the sparkle proper, and only a handful of
       stars are inside one at any moment.

   The flare does more than brighten. It is passed to the fragment shader,
   where it opens up the diffraction cross the sprite carries in a second
   channel, so a sparkling star grows spikes rather than just glowing
   harder — which is what a real point of light does through an aperture.

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

/** Stars, spread through depth. Fewer than the page background's 1380 - this
  * sky is on screen for two seconds behind a wordmark, and past this point the
  * extra points stop reading as stars and start reading as noise. */
const STAR_COUNT = 850;

/** How far back the field extends. Depth is the only reason this is 3D. */
const NEAR_Z = -6;
const FAR_Z = -70;

/** Peak alpha. The wordmark draws over the top of this, so the field can sit
  * up near full strength without competing with anything. */
const MAX_ALPHA = 0.92;

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
    // handful of bright ones, so the distribution is skewed toward small - but
    // the floor stays high enough that every star still reads on screen.
    const mag = Math.pow(Math.random(), 1.9);
    size[i] = 1.15 + mag * 2.5;
    phase[i] = Math.random() * Math.PI * 2;
    // Each star flares at its own rate; a shared rate reads as a strobe.
    rate[i] = 0.35 + Math.random() * 1.45;

    // A real sky is not white. Mostly cool, a few warm, none saturated.
    const warm = Math.random() > 0.84;
    tmp.setHSL(warm ? 0.08 : 0.57, warm ? 0.30 : 0.22, 0.78 + Math.random() * 0.22);
    // Faint stars are faint, not merely small: brightness tracks magnitude so
    // the field has depth instead of reading as an even scatter of dots. The
    // floor is 0.62 rather than near-zero - below that they vanish against
    // the preloader's black and the sky reads as empty.
    const lum = 0.62 + mag * 0.38;
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
      varying float vFlare;

      void main() {
        // Drift toward the viewer and wrap back to the far plane, so the field
        // is endless without ever being rebuilt on the CPU.
        float span = uNear - uFar;
        float z = uFar + mod(position.z - uFar + uDrift, span);

        vec3 p = vec3(position.xy, z);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);

        // SPARKLE, in two parts.
        //
        // The slow half is the shimmer the page background already uses: a
        // plain sine that never drops far, so the whole field is quietly
        // alive rather than static.
        float tw = 0.74 + 0.26 * sin(uTime * aRate * 0.5 + aPhase);
        // The fast half is the sparkle proper - a sine raised high enough
        // that it sits near zero for most of its cycle and spikes briefly.
        // Only a handful of stars are mid-flare at any moment, which is what
        // makes it read as sparkle rather than as a sky pulsing in unison.
        float s = 0.5 + 0.5 * sin(uTime * aRate + aPhase * 1.7);
        float flare = pow(s, 16.0);
        float bright = mix(1.0, tw + flare * 0.85, uSparkle);

        // Fade in at the far plane and out at the near one so wrapping is
        // never visible as a pop.
        float depth = clamp((z - uFar) / span, 0.0, 1.0);
        float edge = smoothstep(0.0, 0.12, depth) * (1.0 - smoothstep(0.86, 1.0, depth));

        vColor = aColor;
        vAlpha = bright * edge;
        vFlare = flare * uSparkle;

        gl_PointSize = aSize * (1.0 + flare * 0.55 * uSparkle) * (170.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      uniform float uAlpha;
      varying vec3  vColor;
      varying float vAlpha;
      varying float vFlare;
      void main() {
        // The sprite carries two shapes in two channels: the round core in
        // red, the diffraction cross in green. Weighting them separately is
        // the effect - a flaring star grows visible spikes instead of merely
        // turning brighter, which is how a real point of light behaves
        // through an aperture.
        vec4 tex = texture2D(uMap, gl_PointCoord);
        float shape = tex.r + tex.g * (0.16 + vFlare * 1.7);
        float a = clamp(shape * vAlpha * uAlpha, 0.0, 1.0);
        if (a < 0.004) discard;
        gl_FragColor = vec4(vColor, a);
      }
    `,
  });
  disposables.push(mat);

  const stars = new THREE.Points(geom, mat);
  stars.frustumCulled = false;
  scene.add(stars);

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
  let doneFired = false;
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
    // The preloader is only on screen for ~2.6s; a slow fade-in spends too
    // much of that with the sky still arriving.
    intro = Math.min(1, intro + dt * 2.6);
    elapsed += dt;
    // Barely moving. The drift is for parallax, not for travel.
    drift += dt * (reduceMotion ? 0.15 : 0.9 + p * 1.4);

    // FADE OUT. Once the bar completes the sky dims away over the same
    // ~560ms the CSS spends fading #preloader itself, so the two leave
    // together rather than one of them snapping off under the other.
    const fadeOut = doneFired ? Math.min(1, (now - doneAt) / 560) : 0;

    mat.uniforms.uTime.value = elapsed;
    mat.uniforms.uDrift.value = drift;
    // FADE IN is `intro`, ramping from zero on the first frame; the small
    // lift on `p` is the sky brightening as the bar fills.
    mat.uniforms.uAlpha.value = intro * MAX_ALPHA * (0.78 + p * 0.22) * (1 - fadeOut);

    if (p >= 0.999 && !doneFired) {
      doneFired = true;
      doneAt = now;
    }

    renderer.clear();
    renderer.render(scene, camera);

    if (doneFired && now - doneAt > 1400) stop();
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
    renderer.dispose();
    renderer.forceContextLoss?.();
  }

  raf = requestAnimationFrame(frame);
  bag.add(stop);
}

/**
 * One sprite, two shapes, drawn once and shared by every point.
 *
 * The channels are used as data rather than as colour: RED holds the round
 * core, GREEN holds the four-point diffraction cross. The fragment shader
 * mixes them per star per frame, so the spikes can bloom on a flare while
 * the core stays put. Alpha is unused - it is computed in the shader - so
 * the canvas is filled opaque black and everything is drawn additively on
 * top, which leaves each channel holding exactly the coverage written into it.
 */
function makeStarSprite(): THREE.CanvasTexture {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const m = size / 2;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'lighter';

  // RED - the round core. Roughly the falloff the page background uses, so
  // the two skies look like the same sky.
  const g = ctx.createRadialGradient(m, m, 0, m, m, m);
  g.addColorStop(0.0, 'rgba(255,0,0,1)');
  g.addColorStop(0.22, 'rgba(255,0,0,0.72)');
  g.addColorStop(0.5, 'rgba(255,0,0,0.16)');
  g.addColorStop(1.0, 'rgba(255,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  // GREEN - the cross. Written near full strength and scaled down in the
  // shader, so there is headroom for a flare to open it up.
  const streak = ctx.createLinearGradient(0, m, size, m);
  streak.addColorStop(0.0, 'rgba(0,255,0,0)');
  streak.addColorStop(0.5, 'rgba(0,255,0,0.9)');
  streak.addColorStop(1.0, 'rgba(0,255,0,0)');
  ctx.fillStyle = streak;
  ctx.fillRect(0, m - 0.9, size, 1.8);
  const streakV = ctx.createLinearGradient(m, 0, m, size);
  streakV.addColorStop(0.0, 'rgba(0,255,0,0)');
  streakV.addColorStop(0.5, 'rgba(0,255,0,0.9)');
  streakV.addColorStop(1.0, 'rgba(0,255,0,0)');
  ctx.fillStyle = streakV;
  ctx.fillRect(m - 0.9, 0, 1.8, size);

  return new THREE.CanvasTexture(c);
}
