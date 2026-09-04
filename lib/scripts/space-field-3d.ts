/* ══════════════════════════════════════════════════════════════════
   space-field-3d.ts — the shared WebGL background

   One three.js scene rendered into the #space-canvas that already sits
   behind every page. It replaces the hand-rolled 2D starfield that was
   duplicated verbatim in six page scripts (home, projects, about,
   quicklinks, experience, contact, coming-soon).

   HOW IT IS REACHED
   -----------------
   Never imported directly by a page. `space-field.ts` decides
   synchronously whether this browser can do WebGL and, if so, streams
   this module in behind first paint — three.js is ~340 kB and a
   backdrop should not delay the page's own text. Callers are written as

       if (initSpaceField3D(bag)) return;
       ...existing 2D starfield...

   so the 2D version stays in place as a real fallback rather than being
   deleted. A machine that cannot do WebGL still gets a night sky.

   WHAT IT DRAWS
   -------------
   Three things, in the palette the 2D version used, so the site's look
   is carried over rather than replaced:

     • Three star layers at different depths. Depth is the whole point —
       the near layer parallaxes against the far one as the camera moves,
       which is the thing a 2D starfield cannot fake.
     • Nebula billboards drifting on an additive blend, tinted with the
       same four aurora colours the 2D version cycled through.
     • Shooting stars, recycled from a fixed pool so nothing allocates
       during the animation loop.

   The camera eases toward the pointer and the scroll position. Motion is
   damped, not snapped: a background that tracks the cursor exactly reads
   as a gimmick, one that lags behind it reads as depth.
   ══════════════════════════════════════════════════════════════════ */

import * as THREE from 'three';
import type { Bag } from './_util';

/** The aurora palette the 2D field used, as normalised RGB. */
const NEBULA_COLORS = [
  [0.00, 0.86, 0.63], // teal
  [0.35, 0.27, 0.94], // violet
  [0.00, 0.71, 0.43], // green
  [0.20, 0.65, 0.94], // blue
];

/* Star counts are deliberately modest. Three layers is what buys the parallax;
   density past this is invisible against a dark page and costs both buffer
   memory and fill rate on every frame. */
const STAR_LAYERS = [
  { count: 700, z: -60, size: 1.1, speed: 0.055, opacity: 0.55 },
  { count: 460, z: -35, size: 1.7, speed: 0.10, opacity: 0.75 },
  { count: 220, z: -16, size: 2.6, speed: 0.17, opacity: 1.0 },
];

const SHOOTER_POOL = 6;

/**
 * Build the field into a canvas that `space-field.ts` has already claimed.
 * WebGL support was checked there, so this only has to handle the renderer
 * itself refusing to construct.
 */
export function mountSpaceField(bag: Bag, canvas: HTMLCanvasElement): void {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // points and additive sprites gain nothing from MSAA
      powerPreference: 'high-performance',
    });
  } catch {
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);
  camera.position.set(0, 0, 12);

  // The drawing buffer is by far the largest allocation here: at DPR 2 on a
  // 1440x900 window it is 2880x1800, and this is an out-of-focus backdrop of
  // soft points — nothing in it resolves detail a second sample would show.
  // Capping at 1.5 costs nothing visible and drops the buffer by ~44%.
  const isSmall = window.innerWidth < 780;
  const dprCap = isSmall ? 1.25 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  renderer.setClearColor(0x000000, 0);

  const disposables: Array<{ dispose: () => void }> = [];

  /* ── Star layers ──────────────────────────────────────────────── */
  const starMeshes: Array<{ pts: THREE.Points; mat: THREE.ShaderMaterial; speed: number }> = [];
  const starSprite = makeStarSprite();
  disposables.push(starSprite);

  for (const layer of STAR_LAYERS) {
    const n = isSmall ? Math.round(layer.count * 0.55) : layer.count;
    const positions = new Float32Array(n * 3);
    const phases = new Float32Array(n);
    const scales = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      // Spread wider than the frustum so the parallax never reveals an edge.
      positions[i * 3] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 2] = layer.z + (Math.random() - 0.5) * 12;
      phases[i] = Math.random() * Math.PI * 2;
      scales[i] = 0.45 + Math.random() * 0.9;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geom.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    disposables.push(geom);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: layer.size * (isSmall ? 0.85 : 1) },
        uOpacity: { value: layer.opacity },
        uMap: { value: starSprite },
        uTwinkle: { value: reduceMotion ? 0.0 : 1.0 },
      },
      vertexShader: `
        attribute float aPhase;
        attribute float aScale;
        uniform float uTime;
        uniform float uSize;
        uniform float uTwinkle;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // Twinkle rides on the per-star phase so no two pulse together.
          float tw = 0.65 + 0.35 * sin(uTime * 1.6 + aPhase) * uTwinkle;
          vAlpha = tw;
          gl_PointSize = uSize * aScale * tw * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(tex.rgb, tex.a * vAlpha * uOpacity);
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
    });
    disposables.push(mat);

    const pts = new THREE.Points(geom, mat);
    scene.add(pts);
    starMeshes.push({ pts, mat, speed: layer.speed });
  }

  /* ── Nebula billboards ────────────────────────────────────────── */
  const nebulaGeom = new THREE.PlaneGeometry(1, 1);
  disposables.push(nebulaGeom);
  const nebulae: THREE.Mesh[] = [];

  // Each nebula is a large additive plane running noise per fragment, so they
  // are the most expensive thing on screen per unit of visual effect. Two reads
  // the same as four once they overlap.
  const nebulaCount = isSmall ? 1 : 2;
  for (let i = 0; i < nebulaCount; i++) {
    const c = NEBULA_COLORS[i % NEBULA_COLORS.length];
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: Math.random() * 100 },
        uColor: { value: new THREE.Vector3(c[0], c[1], c[2]) },
        uSeed: { value: Math.random() * 10 },
        uIntensity: { value: 0.16 + Math.random() * 0.10 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // Cheap 3-octave value noise. A real fbm would be prettier and this runs
      // behind text on every page, so it buys frames instead.
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uSeed;
        uniform vec3 uColor;
        uniform float uIntensity;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
                     mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
        }
        void main() {
          vec2 p = vUv * 3.0 + uSeed;
          float t = uTime * 0.03;
          float n = noise(p + vec2(t, -t)) * 0.55
                  + noise(p * 2.1 - vec2(t * 1.3, t)) * 0.30
                  + noise(p * 4.3 + vec2(t * 0.7, t * 1.1)) * 0.15;
          // Radial falloff keeps the billboard from showing its own edges.
          float d = distance(vUv, vec2(0.5));
          float fall = smoothstep(0.5, 0.05, d);
          float a = n * fall * uIntensity;
          gl_FragColor = vec4(uColor * a, a);
        }
      `,
    });
    disposables.push(mat);

    const mesh = new THREE.Mesh(nebulaGeom, mat);
    const scale = 70 + Math.random() * 90;
    mesh.scale.set(scale, scale * 0.7, 1);
    mesh.position.set(
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 70,
      -70 - Math.random() * 30
    );
    scene.add(mesh);
    nebulae.push(mesh);
  }

  /* ── Shooting stars ───────────────────────────────────────────── */
  type Shooter = {
    line: THREE.Line;
    mat: THREE.LineBasicMaterial;
    vel: THREE.Vector3;
    life: number;
    maxLife: number;
    active: boolean;
  };
  const shooters: Shooter[] = [];

  for (let i = 0; i < SHOOTER_POOL; i++) {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    disposables.push(geom);
    const mat = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xbfe9ff,
    });
    disposables.push(mat);
    const line = new THREE.Line(geom, mat);
    line.visible = false;
    line.frustumCulled = false;
    scene.add(line);
    shooters.push({ line, mat, vel: new THREE.Vector3(), life: 0, maxLife: 1, active: false });
  }

  function launchShooter() {
    const s = shooters.find((x) => !x.active);
    if (!s) return;
    const startX = -50 + Math.random() * 40;
    const startY = 18 + Math.random() * 16;
    const z = -22 - Math.random() * 14;
    const speed = 26 + Math.random() * 22;
    const angle = -0.45 - Math.random() * 0.35;

    s.vel.set(Math.cos(angle) * speed, Math.sin(angle) * speed, 0);
    s.maxLife = 1.1 + Math.random() * 0.7;
    s.life = 0;
    s.active = true;
    s.line.visible = true;

    const pos = s.line.geometry.getAttribute('position') as THREE.BufferAttribute;
    pos.setXYZ(0, startX, startY, z);
    pos.setXYZ(1, startX, startY, z);
    pos.needsUpdate = true;
  }

  /* ── Sizing ───────────────────────────────────────────────────── */
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  bag.on(window, 'resize', resize);

  /* ── Pointer + scroll parallax ────────────────────────────────── */
  const target = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  let scrollEased = 0;

  if (!reduceMotion) {
    bag.on(
      window,
      'pointermove',
      (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );
  }

  /* ── Loop ─────────────────────────────────────────────────────── */
  let raf = 0;
  let last = performance.now();
  let elapsed = 0;
  let shooterTimer = 2 + Math.random() * 3;
  let running = true;

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    // Clamp dt so a backgrounded tab doesn't teleport everything on return.
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!running) return;
    elapsed += dt;

    // Camera eases toward the pointer; the lag is what sells the depth.
    eased.x += (target.x - eased.x) * Math.min(dt * 2.2, 1);
    eased.y += (target.y - eased.y) * Math.min(dt * 2.2, 1);
    const scrollNorm = reduceMotion
      ? 0
      : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 3);
    scrollEased += (scrollNorm - scrollEased) * Math.min(dt * 2.5, 1);

    camera.position.x = eased.x * 1.6;
    camera.position.y = -eased.y * 1.1 - scrollEased * 1.4;
    camera.lookAt(0, -scrollEased * 0.5, -30);

    for (const layer of starMeshes) {
      layer.pts.rotation.z += dt * 0.004 * layer.speed;
      layer.mat.uniforms.uTime.value = elapsed;
    }

    for (let i = 0; i < nebulae.length; i++) {
      const mat = nebulae[i].material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = elapsed + i * 13;
      if (!reduceMotion) {
        nebulae[i].position.x += Math.sin(elapsed * 0.04 + i) * dt * 0.35;
      }
    }

    if (!reduceMotion) {
      shooterTimer -= dt;
      if (shooterTimer <= 0) {
        launchShooter();
        shooterTimer = 3 + Math.random() * 5;
      }
      for (const s of shooters) {
        if (!s.active) continue;
        s.life += dt;
        const pos = s.line.geometry.getAttribute('position') as THREE.BufferAttribute;
        // Head runs ahead; tail chases it, which draws the streak.
        const hx = pos.getX(1) + s.vel.x * dt;
        const hy = pos.getY(1) + s.vel.y * dt;
        pos.setXYZ(1, hx, hy, pos.getZ(1));
        pos.setXYZ(0, hx - s.vel.x * 0.16, hy - s.vel.y * 0.16, pos.getZ(0));
        pos.needsUpdate = true;

        const t = s.life / s.maxLife;
        s.mat.opacity = t < 0.15 ? t / 0.15 : Math.max(0, 1 - (t - 0.15) / 0.85);
        if (s.life >= s.maxLife) {
          s.active = false;
          s.line.visible = false;
          s.mat.opacity = 0;
        }
      }
    }

    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  // Stop burning GPU on a tab nobody is looking at.
  function onVisibility() {
    running = !document.hidden;
    last = performance.now();
  }
  bag.on(document, 'visibilitychange', onVisibility);

  /* ── Teardown ─────────────────────────────────────────────────── */
  bag.add(() => {
    cancelAnimationFrame(raf);
    for (const d of disposables) {
      try {
        d.dispose();
      } catch {
        /* ignore */
      }
    }
    scene.clear();
    renderer.dispose();
    // Release the drawing buffer so a route change doesn't leak a context;
    // browsers cap live WebGL contexts and silently kill the oldest.
    renderer.forceContextLoss?.();
  });

}

/** A soft round star, drawn once into a canvas texture and shared by all layers. */
function makeStarSprite(): THREE.CanvasTexture {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(224,242,255,0.85)');
  g.addColorStop(0.55, 'rgba(150,190,255,0.25)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
