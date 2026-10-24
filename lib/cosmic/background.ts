/* ════════════════════════════════════════
   background.ts - CosmicBackground: the intro's sky and its energy effects,
   on one 2D canvas behind the characters.

   A restrained star field turns slowly about the centre (the orbit) and
   twinkles; on top, short-lived sparks (impacts, milestones) and energy motes
   that fly from a point into the logo along a curve. Everything is drawn
   additively, at a capped pixel ratio, with fewer stars on small screens.
   Positions are viewport pixels.
   ════════════════════════════════════════ */

interface Star { a: number; r: number; size: number; tw: number; c: string }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; s: number }
interface Mote { x0: number; y0: number; cx: number; cy: number; x1: number; y1: number; t: number; dur: number; c: string; done?: () => void }

const TINTS = ['#ffffff', '#ffffff', '#cfe9ff', '#8cd2ff', '#c39bff', '#5ce0ff'];

export class CosmicBackground {
  private ctx: CanvasRenderingContext2D | null;
  private stars: Star[] = [];
  private sparks: Spark[] = [];
  private motes: Mote[] = [];
  private w = 0;
  private h = 0;
  private dpr = 1;
  private spin = 0;
  private last = 0;
  private raf = 0;
  private alive = true;

  constructor(private canvas: HTMLCanvasElement, small: boolean) {
    this.ctx = canvas.getContext('2d');
    for (let i = 0; i < (small ? 110 : 230); i++) {
      this.stars.push({
        a: Math.random() * Math.PI * 2,
        r: Math.sqrt(Math.random()) * 0.75,
        size: Math.random() < 0.08 ? 1.6 + Math.random() : 0.5 + Math.random() * 0.9,
        tw: Math.random() * Math.PI * 2,
        c: TINTS[(Math.random() * TINTS.length) | 0],
      });
    }
    this.resize();
    window.addEventListener('resize', this.resize);
    this.raf = requestAnimationFrame(this.frame);
  }

  resize = () => {
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
  };

  /** A burst of sparks at a point (an impact, a milestone). */
  burst(x: number, y: number, c: string, n = 18, speed = 1) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = (40 + Math.random() * 160) * speed;
      this.sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, max: 0.4 + Math.random() * 0.5, c, s: 0.8 + Math.random() * 1.8 });
    }
  }

  /** An energy mote flying from one point into another along a curve. */
  mote(x0: number, y0: number, x1: number, y1: number, c: string, done?: () => void) {
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    const bend = (Math.random() - 0.5) * Math.hypot(x1 - x0, y1 - y0) * 0.6;
    this.motes.push({ x0, y0, x1, y1, cx: mx + bend, cy: my - Math.abs(bend) * 0.4, t: 0, dur: 0.55 + Math.random() * 0.5, c, done });
  }

  private frame = (now: number) => {
    if (!this.alive) return;
    const ctx = this.ctx;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 0.016;
    this.last = now;
    this.raf = requestAnimationFrame(this.frame);
    if (!ctx) return;
    const { w, h } = this;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    // The field, turning slowly about the centre.
    this.spin += dt * 0.012;
    const cx = w / 2, cy = h / 2, R = Math.hypot(w, h) * 0.62;
    for (const s of this.stars) {
      const a = s.a + this.spin;
      const x = cx + Math.cos(a) * s.r * R, y = cy + Math.sin(a) * s.r * R * 0.8;
      s.tw += dt * (1.2 + s.size);
      ctx.globalAlpha = 0.35 + 0.35 * Math.sin(s.tw);
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sparks: fly out, slow down, fade.
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const p = this.sparks[i];
      p.life += dt;
      if (p.life >= p.max) { this.sparks.splice(i, 1); continue; }
      const k = Math.pow(0.04, dt);
      p.vx *= k; p.vy *= k;
      p.x += p.vx * dt; p.y += p.vy * dt;
      ctx.globalAlpha = 1 - p.life / p.max;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fill();
    }

    // Motes: a bright head with a short tail along a quadratic curve.
    for (let i = this.motes.length - 1; i >= 0; i--) {
      const m = this.motes[i];
      m.t += dt / m.dur;
      if (m.t >= 1) { this.motes.splice(i, 1); m.done?.(); continue; }
      for (let j = 0; j < 4; j++) {
        const t = Math.max(0, m.t - j * 0.035), u = 1 - t;
        const x = u * u * m.x0 + 2 * u * t * m.cx + t * t * m.x1;
        const y = u * u * m.y0 + 2 * u * t * m.cy + t * t * m.y1;
        ctx.globalAlpha = (1 - j / 4) * 0.9;
        ctx.fillStyle = j ? m.c : '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 2.2 - j * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  stop() {
    this.alive = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
  }
}
