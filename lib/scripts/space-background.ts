// @ts-nocheck
/* ════════════════════════════════════════
   space-background.ts - Stars, aurora & shooting stars
   (faithful port of styles/home/space-background.js)
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { initSpaceField3D } from './space-field';

export function initSpaceBackground(): () => void {
  const bag = makeBag();
  // WebGL field first; the 2D starfield below is the no-WebGL fallback.
  if (initSpaceField3D(bag)) return () => bag.dispose();
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  bag.on(window, 'resize', resize);

  // ── Stars ──
  const STAR_COUNT = 200;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.3 + 0.2,
    baseA: Math.random() * 0.55 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.01 + 0.003,
    driftX: (Math.random() - 0.5) * 0.00007,
    driftY: (Math.random() - 0.5) * 0.00003,
  }));

  // ── Shooting stars ──
  const shooters = [];
  const MAX_SHOOTERS = 6;
  let shooterTimer = 0;
  function spawnShooter() {
    if (shooters.length >= MAX_SHOOTERS) return;
    const a  = (Math.random() * 30 + 10) * Math.PI / 180;
    const sp = Math.random() * 5 + 4;
    shooters.push({
      x: Math.random() * W, y: Math.random() * H * 0.4,
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      len: Math.random() * 100 + 50,
      alpha: 1, decay: Math.random() * 0.014 + 0.009,
    });
  }

  // ── Aurora ──
  const aColors = [[0, 220, 160], [90, 70, 240], [0, 180, 110], [50, 165, 240]];
  const auroras = Array.from({ length: 3 }, (_, i) => ({
    color: aColors[i],
    yBase: 0.04 + Math.random() * 0.18,
    amp: 35 + Math.random() * 50,
    freq: 0.0007 + Math.random() * 0.0005,
    phaseOff: Math.random() * Math.PI * 2,
    phaseSpd: 0.00025 + Math.random() * 0.00025,
    thickness: 55 + Math.random() * 70,
    alpha: 0, targetA: 0,
    fadeSpd: 0.0012 + Math.random() * 0.0008,
    nextShow: Math.random() * 5000,
    showDur: 5000 + Math.random() * 7000,
    timer: 0, showing: false,
  }));

  let auroraSteps = Math.ceil(window.innerWidth / 5);
  const auroraResize = () => { auroraSteps = Math.ceil(window.innerWidth / 5); };
  bag.on(window, 'resize', auroraResize);

  let lt = 0;
  let running = true;
  let rafId = 0;
  function draw(ts) {
    if (!running) return;
    const dt = Math.min(ts - lt, 50); lt = ts;

    shooterTimer += dt;
    if (shooterTimer >= 3000) {
      shooterTimer = 0;
      if (Math.random() < 0.35) spawnShooter();
    }
    ctx.fillStyle = '#02030a';
    ctx.fillRect(0, 0, W, H);

    // Aurora
    auroras.forEach(a => {
      if (!a.showing) {
        a.timer += dt;
        if (a.timer >= a.nextShow) { a.showing = true; a.timer = 0; a.targetA = 0.11 + Math.random() * 0.08; }
      } else {
        a.timer += dt;
        if (a.timer >= a.showDur) { a.showing = false; a.targetA = 0; a.timer = 0; a.nextShow = 4000 + Math.random() * 9000; }
      }
      a.alpha += (a.targetA - a.alpha) * a.fadeSpd * dt;
      if (a.alpha < 0.001) return;
      a.phaseOff += a.phaseSpd * dt;
      const [r, g, b] = a.color, yC = a.yBase * H;
      ctx.save();
      ctx.globalAlpha = a.alpha;
      ctx.filter = 'blur(16px)';
      ctx.beginPath();
      for (let i = 0; i <= auroraSteps; i++) {
        const x  = (i / auroraSteps) * W;
        const wv = Math.sin(x * a.freq + a.phaseOff) * a.amp + Math.sin(x * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35;
        i === 0 ? ctx.moveTo(x, yC + wv - a.thickness / 2) : ctx.lineTo(x, yC + wv - a.thickness / 2);
      }
      for (let i = auroraSteps; i >= 0; i--) {
        const x  = (i / auroraSteps) * W;
        const wv = Math.sin(x * a.freq + a.phaseOff) * a.amp + Math.sin(x * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35;
        ctx.lineTo(x, yC + wv + a.thickness / 2);
      }
      ctx.closePath();
      const g2 = ctx.createLinearGradient(0, yC - a.thickness, 0, yC + a.thickness);
      g2.addColorStop(0,   `rgba(${r},${g},${b},0)`);
      g2.addColorStop(0.3, `rgba(${r},${g},${b},0.85)`);
      g2.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
      g2.addColorStop(0.7, `rgba(${r},${g},${b},0.85)`);
      g2.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = g2; ctx.fill();
      ctx.restore();
    });

    // Stars
    stars.forEach(s => {
      s.x += s.driftX; s.y += s.driftY;
      if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
      if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;
      s.phase += s.speed;
      const tw = Math.sin(s.phase) * 0.5 + 0.5;
      const al = s.baseA * (0.4 + tw * 0.6);
      const sx = s.x * W, sy = s.y * H;
      if (s.r > 1.1 && tw > 0.75) {
        const gw = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 4.5);
        gw.addColorStop(0, `rgba(200,220,255,${al * 0.5})`);
        gw.addColorStop(1, 'rgba(200,220,255,0)');
        ctx.beginPath(); ctx.arc(sx, sy, s.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = gw; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,230,255,${al})`; ctx.fill();
    });

    // Shooting stars
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
      if (s.alpha <= 0) { shooters.splice(i, 1); continue; }
      const mag = Math.hypot(s.vx, s.vy);
      const tx  = s.x - s.vx * (s.len / mag), ty = s.y - s.vy * (s.len / mag);
      const gw  = ctx.createLinearGradient(tx, ty, s.x, s.y);
      gw.addColorStop(0, 'rgba(255,255,255,0)');
      gw.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = gw; ctx.lineWidth = 1.4; ctx.stroke();
      const tg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 3.5);
      tg.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
      tg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(s.x, s.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = tg; ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  }
  rafId = requestAnimationFrame(draw);

  // Pause the whole render loop when the tab is hidden - zero CPU in background
  bag.on(document, 'visibilitychange', () => {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      lt = performance.now();
      rafId = requestAnimationFrame(draw);
    }
  });

  bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  return () => bag.dispose();
}
