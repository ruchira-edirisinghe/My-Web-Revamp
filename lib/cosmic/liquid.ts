/* ════════════════════════════════════════
   liquid.ts - the liquid space stage the intro and the page transition are
   drawn on (lib/cosmic/intro.ts, lib/cosmic/transition.ts). After the WebGL
   liquid texture loader on freefrontend.com (2025-11-20): textures morphing
   into each other through a displacement map, in a fragment shader.

   One full-screen WebGL canvas, one quad, a few numbers the timelines move:
     scenes    nebulae baked once into textures from a palette (warped fbm
               gas and stars), and photos. Two are on screen at a time and
               `mix` pours one into the other, each pulled along the
               displacement map, so the boundary flows like liquid with a
               glowing front
     form      the brand mark (logotype or RE monogram) rasterised from its
               SVG, crisp and blurred. At 0 it is a few drops of liquid glass;
               they gather (the blurred copy thresholded, so they merge like
               mercury) and set into the real letters at 1
     in / out  the liquid flooding up over the page and draining off it the
               same way, along the same displacement, with a neon surface
     flash     a sheen sweeping across the set letters
     prog      the loading progress, as a thread of liquid (the intro's)
     fx        the sky's life: twinkling stars, shooting stars
   The displacement map is a tileable fbm, baked once and scrolled over time,
   so everything keeps flowing even while a load stalls. Nothing heavy runs
   per frame: the gas is baked, the frame is a few texture reads per pixel at
   up to 1.5x device pixels.
   ════════════════════════════════════════ */

export type Mark = 'logotype' | 'monogram';
type RGB = [number, number, number];

/** The skies: a nebula's gas, a second gas through it and its glow. */
export const PALETTES: { a: RGB; b: RGB; c: RGB }[] = [
  { a: [0.26, 0.11, 0.6], b: [0.05, 0.32, 0.78], c: [0.86, 0.4, 1] }, // 0 violet deep
  { a: [0.04, 0.42, 0.66], b: [0.62, 0.1, 0.52], c: [0.36, 0.88, 1] }, // 1 cyan and magenta
  { a: [0.6, 0.2, 0.1], b: [0.28, 0.07, 0.46], c: [1, 0.64, 0.32] }, // 2 ember
  { a: [0.09, 0.13, 0.42], b: [0.34, 0.14, 0.6], c: [0.42, 0.78, 1] }, // 3 calm navy (the site's own)
  { a: [0.03, 0.38, 0.36], b: [0.1, 0.14, 0.52], c: [0.4, 1, 0.82] }, // 4 teal
  { a: [0.5, 0.08, 0.38], b: [0.2, 0.1, 0.55], c: [1, 0.5, 0.86] }, // 5 rose
  { a: [0.05, 0.4, 0.22], b: [0.35, 0.3, 0.06], c: [1, 0.85, 0.4] }, // 6 emerald and gold
  { a: [0.1, 0.28, 0.45], b: [0.25, 0.3, 0.5], c: [0.75, 0.9, 1] }, // 7 ice
  { a: [0.5, 0.05, 0.12], b: [0.15, 0.08, 0.5], c: [1, 0.4, 0.4] }, // 8 crimson and indigo
  { a: [0.45, 0.25, 0.08], b: [0.35, 0.1, 0.35], c: [1, 0.75, 0.45] }, // 9 golden dusk
];

const MARKS = {
  logotype: { src: '/Images/longlogo.svg', w: 1762, h: 446 },
  monogram: { src: '/Images/shortlogo.svg', w: 933, h: 358 },
} as const;

/** Where the mark sits, in CSS pixels (its letters, not the padded texture). */
export function logoBox(mark: Mark, vw: number, vh: number) {
  const m = MARKS[mark];
  // A short screen (a phone on its side) keeps the logotype smaller and higher,
  // leaving room for the tagline and the readout under it.
  const short = vh < 520;
  const w = mark === 'logotype' ? Math.min(vw * 0.84, 980, vh * (short ? 1.3 : 1.6)) : Math.min(vw * 0.42, 210, vh * 0.5);
  const h = (w * m.h) / m.w;
  const cx = vw / 2, cy = vh * (mark === 'logotype' ? (short ? 0.4 : 0.45) : 0.46);
  return { x: cx - w / 2, y: cy - h / 2, w, h, cx, cy };
}

const VERT = `attribute vec2 aPos; varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const HASH = `float hash(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }`;

/* A nebula: domain-warped fbm (gas, dark lanes, a glow), and three layers of stars. */
const BAKE_NEBULA = `precision highp float;
varying vec2 vUv;
uniform vec3 uA, uB, uC;
uniform float uSeed;
uniform vec2 uSize;
${HASH}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + 1.0), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
void main() {
  float asp = uSize.x / uSize.y;
  vec2 p = (vUv - 0.5) * vec2(max(asp, 1.0), max(1.0 / asp, 1.0)) * 2.4 + uSeed;
  vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
  vec2 r = vec2(fbm(p + 3.6 * q + vec2(1.7, 9.2)), fbm(p + 3.6 * q + vec2(8.3, 2.8)));
  float f = fbm(p + 3.2 * r);
  vec3 col = vec3(0.006, 0.008, 0.026);
  col = mix(col, uA, clamp(f * f * 2.4, 0.0, 1.0));
  col = mix(col, uB, clamp(length(q) * 0.95 - 0.3, 0.0, 1.0) * 0.8);
  col = mix(col, uC, smoothstep(0.55, 0.95, r.x) * f * 1.3);
  col *= 0.2 + 1.25 * smoothstep(0.18, 0.92, f);
  for (int L = 0; L < 3; L++) {
    float k = 3.0 + float(L) * 5.0;
    vec2 s = vUv * uSize / k, id = floor(s);
    float h = hash(id + uSeed + float(L) * 17.0);
    vec2 o = vec2(hash(id + 1.3), hash(id + 4.1)) - 0.5;
    float d = length(fract(s) - 0.5 - o * 0.5) * k;
    float b = smoothstep(0.965 - float(L) * 0.01, 1.0, h);
    vec3 tint = mix(vec3(0.8, 0.88, 1.0), uC, hash(id + 9.0) * 0.6);
    col += tint * b * (smoothstep(1.3, 0.0, d) * 1.4 + exp(-d * 0.6) * 0.25 * float(L));
  }
  col += (hash(vUv * uSize) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`;

/* The displacement map: tileable fbm (periodic lattice), warped by itself. */
const BAKE_DISP = `precision highp float;
varying vec2 vUv;
${HASH}
float pn(vec2 p, float per, float seed) {
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(mod(i, per) + seed), b = hash(mod(i + vec2(1, 0), per) + seed);
  float c = hash(mod(i + vec2(0, 1), per) + seed), d = hash(mod(i + 1.0, per) + seed);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float pfbm(vec2 uv, float seed) {
  float v = 0.0, a = 0.5, per = 4.0;
  for (int i = 0; i < 5; i++) { v += a * pn(uv * per, per, seed); per *= 2.0; a *= 0.5; }
  return v;
}
float stretch(float v) { return clamp((v - 0.5) * 2.1 + 0.5, 0.0, 1.0); }
void main() {
  vec2 w = vec2(pfbm(vUv, 1.0), pfbm(vUv, 7.0));
  float r = pfbm(vUv + 0.35 * w, 3.0), g = pfbm(vUv + 0.35 * w.yx, 11.0);
  gl_FragColor = vec4(stretch(r), stretch(g), stretch(w.x), 1.0);
}`;

const MAIN = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uA, uB, uDisp, uLogo, uBlur;
uniform vec2 uSA, uSB, uRes;
uniform vec4 uRect;
uniform float uMix, uTime, uIn, uOut, uForm, uFlash, uLogoOn, uAngle;
uniform vec4 uBar;
uniform float uProg, uBarOn, uDpr, uFx;
const vec3 CYAN = vec3(0.36, 0.88, 1.0), VIOLET = vec3(0.74, 0.44, 1.0), PINK = vec3(1.0, 0.42, 0.84);
${HASH}
// Mirrored at the edges, so a pull past them reflects rather than smearing the edge.
vec3 scene(sampler2D t, vec2 uv, vec2 s) { vec2 p = (uv - 0.5) * s + 0.5; return texture2D(t, 1.0 - abs(1.0 - mod(abs(p), 2.0))).rgb; }
void main() {
  vec2 uv = vUv;
  float asp = uRes.x / uRes.y;
  vec2 duv = vec2(uv.x * asp, uv.y) * 0.6;
  vec4 d1 = texture2D(uDisp, duv + vec2(0.013, -0.021) * uTime);
  vec4 d2 = texture2D(uDisp, duv * 1.6 + vec2(-0.019, 0.009) * uTime + 0.37);
  float n = clamp(d1.r * 0.6 + d2.g * 0.4, 0.0, 1.0);
  vec2 flow = vec2(d1.g, d2.r) - 0.5;

  // The surface: flooding up from the bottom, then draining off the same way.
  float fIn = mix(uv.y, n, 0.38), lIn = uIn * 1.5 - 0.25;
  float fOut = mix(uv.y, 1.0 - n, 0.38), lOut = uOut * 1.5 - 0.25;
  float alpha = (1.0 - smoothstep(lIn - 0.012, lIn + 0.012, fIn)) * smoothstep(lOut - 0.012, lOut + 0.012, fOut);
  float movingIn = step(0.001, uIn) * step(uIn, 0.999), movingOut = step(0.001, uOut) * step(uOut, 0.999);
  float rim = exp(-abs(fIn - lIn) * 70.0) * movingIn + exp(-abs(fOut - lOut) * 70.0) * movingOut;
  float churn = exp(-abs(fIn - lIn) * 6.0) * movingIn + exp(-abs(fOut - lOut) * 6.0) * movingOut;
  vec2 wuv = uv + flow * (0.012 + 0.09 * churn);

  // Two scenes, poured into each other along the displacement.
  vec2 dir = vec2(cos(uAngle), sin(uAngle));
  vec3 ca = scene(uA, wuv + dir * n * uMix * 0.3, uSA);
  vec3 cb = scene(uB, wuv - dir * n * (1.0 - uMix) * 0.3, uSB);
  float m = smoothstep(n - 0.12, n + 0.12, uMix * 1.24 - 0.12);
  vec3 col = mix(ca, cb, m);
  col += mix(CYAN, PINK, n) * m * (1.0 - m) * 4.0 * 0.35;
  col *= 1.0 - 0.5 * smoothstep(0.4, 1.0, length(uv - 0.5) * 1.414);

  // The sky's life, kept quiet: a few stars that twinkle and glint, and now
  // and then a shooting star. (The aurora is the site background's alone.)
  if (uFx > 0.0) {
    vec3 sky = vec3(0.0);
    float x = uv.x * asp;
    vec2 sp = gl_FragCoord.xy / uDpr;
    vec2 cid = floor(sp / 48.0), cf = sp - (cid + 0.5) * 48.0;
    float ch = hash(cid + 3.7);
    if (ch > 0.8) {
      vec2 dd = cf - (vec2(hash(cid + 1.1), hash(cid + 2.3)) - 0.5) * 33.0;
      float tw = pow(0.5 + 0.5 * sin(uTime * (0.7 + 2.0 * hash(cid + 5.0)) + ch * 40.0), 5.0);
      float glint = (exp(-abs(dd.x) * 1.3 - abs(dd.y) / 5.0) + exp(-abs(dd.y) * 1.3 - abs(dd.x) / 5.0)) * step(0.955, ch);
      sky += vec3(0.86, 0.91, 1.0) * tw * (exp(-dot(dd, dd) / 1.5) + glint * 0.55);
    }
    float si = floor(uTime / 7.0), st = uTime - si * 7.0;
    if (st < 1.2) {
      float a = radians(14.0 + 22.0 * hash(vec2(si, 4.2)));
      vec2 dir = vec2((hash(vec2(si, 9.9)) > 0.5 ? 1.0 : -1.0) * cos(a), -sin(a));
      vec2 head = vec2((0.15 + 0.7 * hash(vec2(si, 1.3))) * asp, 0.7 + 0.25 * hash(vec2(si, 7.1))) + dir * st * 0.8;
      vec2 rel = vec2(x, uv.y) - head;
      float along = dot(rel, -dir), across = dot(rel, vec2(-dir.y, dir.x));
      float w = 1.1 * uDpr / uRes.y;
      float tail = step(0.0, along) * pow(1.0 - smoothstep(0.0, 0.2, along), 2.0);
      float fade = smoothstep(0.0, 0.15, st) * (1.0 - smoothstep(0.75, 1.2, st));
      sky += vec3(0.9, 0.95, 1.0) * (exp(-across * across / (w * w)) * tail + exp(-dot(rel, rel) / (w * w * 6.0))) * fade * 0.85;
    }
    col += sky * uFx;
  }

  // The mark: drops of liquid glass gathering into the letters.
  float melt = 1.0 - uForm;
  vec2 lw = (uv - uRect.xy) / uRect.zw + flow * (0.045 * melt + 0.03 * churn) / uRect.zw;
  float inR = step(0.0, lw.x) * step(lw.x, 1.0) * step(0.0, lw.y) * step(lw.y, 1.0) * uLogoOn;
  // (only inside the mark's box: the rest of the screen skips the glass)
  if (inR > 0.0) {
    vec4 lc = texture2D(uLogo, lw);
    float bl = texture2D(uBlur, lw).a;
    float goo = smoothstep(0.47, 0.53, bl * (0.7 + 0.9 * uForm) + (n - 0.5) * 0.3 * melt);
    float set = smoothstep(0.58, 0.95, uForm);
    vec2 e = 3.0 / (uRes * uRect.zw);
    float gx = texture2D(uBlur, lw + vec2(e.x, 0.0)).a - texture2D(uBlur, lw - vec2(e.x, 0.0)).a;
    float gy = texture2D(uBlur, lw + vec2(0.0, e.y)).a - texture2D(uBlur, lw - vec2(0.0, e.y)).a;
    vec3 nrm = normalize(vec3(-gx, -gy, 0.25));
    float spec = pow(max(dot(nrm, normalize(vec3(-0.4, 0.6, 0.7))), 0.0), 24.0);
    vec2 bend = wuv - nrm.xy * 0.05;
    vec3 under = mix(scene(uA, bend, uSA), scene(uB, bend, uSB), m) * 1.7 + vec3(0.06, 0.08, 0.16);
    col += mix(CYAN, VIOLET, lw.x) * bl * 0.3 * uForm;
    col = mix(col, under + spec * 1.2 + mix(CYAN, VIOLET, lw.x) * 0.25, goo * (1.0 - set));
    float la = lc.a * set;
    col = col * (1.0 - la) + lc.rgb * set + spec * la * 0.5;
    float band = exp(-pow((lw.x + lw.y * 0.35 - (uFlash * 1.8 - 0.4)) * 6.0, 2.0)) * step(0.001, uFlash) * step(uFlash, 0.999);
    col += vec3(0.9, 0.97, 1.0) * band * max(la, goo * (1.0 - set)) * 0.9;
  }

  // The progress: a thread of liquid with a mercury drop at its head, merging
  // with it (a smooth union of the two), rippling with the same flow.
  if (uBarOn > 0.0) {
    vec2 bp = gl_FragCoord.xy - uBar.xy;
    if (bp.x > -24.0 * uDpr && bp.x < uBar.z + 24.0 * uDpr && bp.y > -uBar.w && bp.y < uBar.w * 2.0) {
      float L = uProg * uBar.z;
      vec2 q = vec2(bp.x, bp.y - uBar.w * 0.5 - (n - 0.5) * 2.4 * uDpr * smoothstep(0.0, 30.0 * uDpr, bp.x));
      float th = 1.5 * uDpr * uBarOn;
      float tube = length(vec2(q.x - clamp(q.x, 0.0, L), q.y)) - th;
      float hr = (4.2 + 0.8 * sin(uTime * 3.1)) * uDpr * uBarOn;
      vec2 hc = vec2(L, 0.7 * uDpr * sin(uTime * 2.3));
      float head = length(q - hc) - hr;
      float k = 7.0 * uDpr;
      float hm = clamp(0.5 + 0.5 * (head - tube) / k, 0.0, 1.0);
      float d = mix(head, tube, hm) - k * hm * (1.0 - hm);
      float t = clamp(bp.x / uBar.z, 0.0, 1.0);
      vec3 neon = t < 0.55 ? mix(CYAN, VIOLET, t / 0.55) : mix(VIOLET, PINK, (t - 0.55) / 0.45);
      // the path still to fill: a faint hairline
      float ahead = (1.0 - smoothstep(0.35 * uDpr, 1.1 * uDpr, abs(q.y))) * step(L, bp.x) * step(bp.x, uBar.z);
      col = mix(col, vec3(0.82, 0.86, 1.0), ahead * 0.2 * uBarOn);
      col += neon * exp(-max(d, 0.0) / (5.0 * uDpr)) * 0.5 * uBarOn;
      float fill = 1.0 - smoothstep(-0.6 * uDpr, 0.6 * uDpr, d);
      float shine = exp(-length(q - hc - vec2(-0.35, 0.45) * hr) / (1.3 * uDpr));
      vec3 liquid = mix(neon, vec3(1.0), 0.25 + 0.35 * clamp(q.y / (th + 2.0 * uDpr), 0.0, 1.0)) + shine * 0.8;
      col = mix(col, liquid, fill);
    }
  }

  col += mix(CYAN, PINK, uv.x) * rim * 1.2;
  alpha = max(alpha, clamp(rim * 0.9, 0.0, 1.0));
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(col * alpha, alpha);
}`;

interface Tex { t: WebGLTexture; w: number; h: number }

export class LiquidStage {
  /* What the timelines move. */
  mix = 0;
  in = 1;
  out = 0;
  form = 0;
  flash = 0;
  angle = 0.8;
  /** The liquid progress thread: its box (CSS px, from the top left), fill (0-1) and presence (0-1). */
  bar: { left: number; top: number; width: number; height: number } | null = null;
  prog = 0;
  barOn = 1;
  /** How fast the liquid flows (0 holds it still, for reduced motion). */
  speed = 1;
  /** The sky's twinkles and shooting stars (0 turns them off, for reduced motion). */
  fx = 1;
  onFirstFrame?: () => void;
  onLost?: () => void;

  private gl: WebGLRenderingContext;
  private main: WebGLProgram;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private scenes: Tex[] = [];
  private baked = new Map<number, number>();
  private a = 0;
  private b = 0;
  private disp: Tex;
  private logo: Tex | null = null;
  private blur: Tex | null = null;
  private img: HTMLImageElement | null = null;
  private rasterW = 0;
  private letterH = 1;
  private nebula: WebGLProgram | null = null;
  private rect = [0, 0, 1, 1];
  private raf = 0;
  private last = 0;
  private time = Math.random() * 40;
  private drawn = false;
  private lost = false;
  private dpr = 1;
  /** Drops (never rises) when frames run slow, trading sharpness for smoothness. */
  private quality = 1;
  private slow = 0;
  private frames = 0;
  /** Resolves when the mark is ready to draw. */
  readonly ready: Promise<void>;

  /** A stage, or null if this browser can't draw one. */
  static create(canvas: HTMLCanvasElement, mark: Mark): LiquidStage | null {
    try { return new LiquidStage(canvas, mark); } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('[liquid] no stage:', e);
      return null;
    }
  }

  private constructor(private canvas: HTMLCanvasElement, private mark: Mark) {
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) throw new Error('no webgl');
    this.gl = gl;
    canvas.addEventListener('webglcontextlost', this.onContextLost);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    this.main = this.program(MAIN);
    for (const n of ['uA', 'uB', 'uDisp', 'uLogo', 'uBlur', 'uSA', 'uSB', 'uRes', 'uRect', 'uMix', 'uTime', 'uIn', 'uOut', 'uForm', 'uFlash', 'uLogoOn', 'uAngle', 'uBar', 'uProg', 'uBarOn', 'uDpr', 'uFx']) {
      this.u[n] = gl.getUniformLocation(this.main, n);
    }
    const dispProg = this.program(BAKE_DISP);
    this.disp = this.bake(dispProg, 512, 512, true);
    gl.deleteProgram(dispProg);
    this.layout();

    const img = new Image();
    img.src = MARKS[mark].src;
    this.ready = img.decode().then(() => {
      this.img = img;
      this.raster();
    }).catch(() => { /* the liquid flows without the mark */ });
  }

  /** The scene for a palette (baked the first time it's asked for). */
  palette(i: number): number {
    let s = this.baked.get(i);
    if (s === undefined) {
      const w = Math.round(Math.min(1024, window.innerWidth * this.dpr));
      const h = Math.round(Math.min(1024, (w * window.innerHeight) / window.innerWidth));
      const p = PALETTES[i % PALETTES.length];
      const seed = 3.7 + i * 11.3;
      this.nebula ??= this.program(BAKE_NEBULA);
      this.scenes.push(this.bake(this.nebula, w, h, false, (gl, prog) => {
        gl.uniform3fv(gl.getUniformLocation(prog, 'uA'), p.a);
        gl.uniform3fv(gl.getUniformLocation(prog, 'uB'), p.b);
        gl.uniform3fv(gl.getUniformLocation(prog, 'uC'), p.c);
        gl.uniform1f(gl.getUniformLocation(prog, 'uSeed'), seed);
        gl.uniform2f(gl.getUniformLocation(prog, 'uSize'), w, h);
      }));
      s = this.scenes.length - 1;
      this.baked.set(i, s);
    }
    return s;
  }

  /** Bakes palettes ahead, one per idle moment, so no pour waits on one.
   *  Resolves once they're all in. */
  prebake(list: number[]): Promise<void> {
    const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 60));
    return new Promise((resolve) => {
      const next = () => {
        const i = list.find((p) => !this.baked.has(p));
        if (i === undefined || this.lost) return resolve();
        this.palette(i);
        idle(next, { timeout: 250 });
      };
      idle(next, { timeout: 250 });
    });
  }

  /** A photo as a scene. */
  image(img: HTMLImageElement): number {
    const gl = this.gl;
    const t = this.texture(false);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    this.scenes.push({ t, w: img.naturalWidth, h: img.naturalHeight });
    return this.scenes.length - 1;
  }

  /** The two scenes on screen; `mix` pours a into b. */
  show(a: number, b = a) { this.a = a; this.b = b; }

  /** Fits the canvas and the mark to the window. */
  layout() {
    const vw = window.innerWidth, vh = window.innerHeight;
    // Up to 1.5x device pixels, within a budget so a big screen keeps its frame rate.
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2.2e6 / (vw * vh))) * this.quality;
    this.canvas.width = Math.round(vw * this.dpr);
    this.canvas.height = Math.round(vh * this.dpr);
    const box = logoBox(this.mark, vw, vh);
    if (this.img && Math.abs(box.w - this.rasterW) > this.rasterW * 0.2) this.raster();
    else this.place();
    return box;
  }

  /** Draws the mark into two textures: crisp (its own colours) and blurred (for the drops). */
  private raster() {
    if (!this.img || this.lost) return;
    const gl = this.gl;
    const m = MARKS[this.mark];
    const box = logoBox(this.mark, window.innerWidth, window.innerHeight);
    const dw = Math.round(Math.min(2048, box.w * Math.min(window.devicePixelRatio || 1, 2)));
    const dh = Math.round((dw * m.h) / m.w);
    const pad = Math.round(dh * 0.35);
    const draw = (blur: number) => {
      const c = document.createElement('canvas');
      c.width = dw + pad * 2;
      c.height = dh + pad * 2;
      const ctx = c.getContext('2d')!;
      if (blur) {
        ctx.filter = `blur(${blur}px)`;
        if (ctx.filter === 'none' || !ctx.filter) {
          // No canvas filters (older Safari): blur by shrinking and growing.
          const s = document.createElement('canvas');
          s.width = Math.max(8, Math.round(c.width / (blur * 0.6)));
          s.height = Math.max(4, Math.round(c.height / (blur * 0.6)));
          const sc = s.getContext('2d')!;
          sc.drawImage(this.img!, (pad / c.width) * s.width, (pad / c.height) * s.height, (dw / c.width) * s.width, (dh / c.height) * s.height);
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(s, 0, 0, c.width, c.height);
          return c;
        }
      }
      ctx.drawImage(this.img!, pad, pad, dw, dh);
      return c;
    };
    const upload = (src: HTMLCanvasElement, old: Tex | null): Tex => {
      if (old) gl.deleteTexture(old.t);
      const t = this.texture(false);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      return { t, w: src.width, h: src.height };
    };
    this.logo = upload(draw(0), this.logo);
    this.blur = upload(draw(dh * 0.07), this.blur);
    this.rasterW = box.w;
    this.letterH = dh;
    this.place();
  }

  /** The padded mark texture's place on screen, in uv (from the bottom left). */
  private place() {
    if (!this.logo) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const box = logoBox(this.mark, vw, vh);
    const scale = box.h / this.letterH; // CSS px per texture px
    const w = this.logo.w * scale, h = this.logo.h * scale;
    this.rect = [(box.cx - w / 2) / vw, 1 - (box.cy + h / 2) / vh, w / vw, h / vh];
  }

  start() {
    if (this.raf || this.lost) return;
    this.last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      const ms = now - this.last;
      this.time += Math.min(0.05, ms / 1000) * this.speed;
      this.last = now;
      this.adapt(ms);
      this.draw();
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /** If the frames keep running long (a slow GPU, a big screen), draw fewer
   *  pixels. Single hiccups (the page doing work, a hidden tab) don't count. */
  private adapt(ms: number) {
    if (++this.frames < 20 || ms > 120 || this.quality <= 0.55) return;
    this.slow = ms > 24 ? this.slow + 1 : Math.max(0, this.slow - 1);
    if (this.slow < 24) return;
    this.slow = 0;
    this.quality *= 0.8;
    this.layout();
  }

  draw() {
    if (this.lost || !this.scenes.length) return;
    const gl = this.gl, u = this.u;
    const W = this.canvas.width, H = this.canvas.height, asp = W / H;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, W, H);
    gl.useProgram(this.main);
    this.attrib(this.main);
    const A = this.scenes[this.a] ?? this.scenes[0], B = this.scenes[this.b] ?? A;
    const bind = (unit: number, tex: Tex | null, name: string) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex ? tex.t : A.t);
      gl.uniform1i(u[name], unit);
    };
    bind(0, A, 'uA');
    bind(1, B, 'uB');
    bind(2, this.disp, 'uDisp');
    bind(3, this.logo, 'uLogo');
    bind(4, this.blur, 'uBlur');
    // Each scene covers the screen, cropped to keep its proportions.
    const fit = (t: Tex): [number, number] => {
      const ta = t.w / t.h;
      return asp > ta ? [1, ta / asp] : [asp / ta, 1];
    };
    gl.uniform2fv(u.uSA, fit(A));
    gl.uniform2fv(u.uSB, fit(B));
    gl.uniform1f(u.uFx, this.fx);
    gl.uniform2f(u.uRes, W, H);
    gl.uniform4fv(u.uRect, this.rect);
    gl.uniform1f(u.uMix, this.mix);
    gl.uniform1f(u.uTime, this.time);
    gl.uniform1f(u.uIn, this.in);
    gl.uniform1f(u.uOut, this.out);
    gl.uniform1f(u.uForm, this.form);
    gl.uniform1f(u.uFlash, this.flash);
    gl.uniform1f(u.uLogoOn, this.logo ? 1 : 0);
    gl.uniform1f(u.uAngle, this.angle);
    const r = this.bar, k = W / window.innerWidth;
    gl.uniform4f(u.uBar, r ? r.left * k : 0, r ? H - (r.top + r.height) * k : 0, r ? r.width * k : 0, r ? r.height * k : 0);
    gl.uniform1f(u.uProg, this.prog);
    gl.uniform1f(u.uBarOn, r ? this.barOn : 0);
    gl.uniform1f(u.uDpr, k);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!this.drawn) {
      this.drawn = true;
      this.onFirstFrame?.();
    }
  }

  destroy() {
    this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    if (!this.lost) this.gl.getExtension('WEBGL_lose_context')?.loseContext();
    this.lost = true;
  }

  private onContextLost = (e: Event) => {
    e.preventDefault();
    this.lost = true;
    this.stop();
    this.onLost?.();
  };

  /* ── GL plumbing ── */

  private program(frag: string) {
    const gl = this.gl;
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, shader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
    return p;
  }

  private attrib(p: WebGLProgram) {
    const gl = this.gl;
    const loc = gl.getAttribLocation(p, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  }

  private texture(repeat: boolean) {
    const gl = this.gl;
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const wrap = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    return t;
  }

  /** Renders a shader once into a texture. */
  private bake(p: WebGLProgram, w: number, h: number, repeat: boolean, set?: (gl: WebGLRenderingContext, p: WebGLProgram) => void): Tex {
    const gl = this.gl;
    const t = this.texture(repeat);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    gl.viewport(0, 0, w, h);
    gl.useProgram(p);
    this.attrib(p);
    set?.(gl, p);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(fb);
    return { t, w, h };
  }
}
