// @ts-nocheck
/* ════════════════════════════════════════
   contact.ts - Contact page engine: preloader, space bg, cursor + SFX,
   audio, scroll-reveal,
   mobile menu, timezone clocks.
   (faithful port of styles/contact/contact.js)
   ════════════════════════════════════════ */
import { initCursor } from './cursor';
import { makeBag } from './_util';
import { initSpaceField3D } from './space-field';
import { sfxClick, sfxHover } from '@/lib/sfx';
import { wireAmbientControls } from './ambient-audio';

export function initContact(): () => void {
  const bag = makeBag();

  /* The preloader is the cosmic overlay system now (lib/cosmic/*, components/Preloader.tsx). */

  /* ══════════ 2. SPACE BACKGROUND - with Aurora & Shooting Stars ══════════ */
  (function () {
    // WebGL field first; the 2D starfield below is the no-WebGL fallback.
    if (initSpaceField3D(bag)) return;
    const sc = document.getElementById('space-canvas');
    if (!sc) return;
    const sctx = sc.getContext('2d');
    let stars = [];
    const shooters = [];
    let W, H;
    let hidden = false;
    let lastDraw = 0;

    // ── AURORA CONFIG ──
    const aC = [[0, 220, 160], [90, 70, 240], [0, 180, 110], [50, 165, 240]];
    const auroras = Array.from({ length: 3 }, (_, i) => ({
      color: aC[i % 4],
      yBase: 0.04 + Math.random() * 0.18,
      amp: 35 + Math.random() * 50,
      freq: 0.0007 + Math.random() * 0.0005,
      phaseOff: Math.random() * Math.PI * 2,
      phaseSpd: 0.00025 + Math.random() * 0.00025,
      thickness: 55 + Math.random() * 70,
      alpha: 0,
      targetA: 0,
      fadeSpd: 0.0012 + Math.random() * 0.0008,
      nextShow: Math.random() * 5000,
      showDur: 5000 + Math.random() * 7000,
      timer: 0,
      showing: false,
    }));
    let auroraSteps = Math.ceil(window.innerWidth / 5);

    bag.on(document, 'visibilitychange', () => { hidden = document.visibilityState === 'hidden'; });

    function spawnShooter() {
      if (shooters.length >= 6) return; // cap - prevents buildup while drawing is paused
      const a = (Math.random() * 30 + 10) * Math.PI / 180, sp = Math.random() * 5 + 4;
      shooters.push({
        x: Math.random() * W, y: Math.random() * H * 0.4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        len: Math.random() * 100 + 50, alpha: 1, decay: Math.random() * 0.014 + 0.009
      });
    }
    const shooterInterval = setInterval(() => { if (!hidden && Math.random() < 0.35) spawnShooter(); }, 3000);

    function res() {
      W = sc.width = window.innerWidth;
      H = sc.height = window.innerHeight;
      auroraSteps = Math.ceil(W / 5);
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random(), y: Math.random(),
          r: Math.random() * 1.3 + 0.2,
          o: Math.random() * 0.8 + 0.2,
          p: Math.random() * Math.PI,
          s: 0.015 + Math.random() * 0.02,
          driftX: (Math.random() - 0.5) * 0.00007,
          driftY: (Math.random() - 0.5) * 0.00003,
        });
      }
    }
    let resizeTimer;
    bag.on(window, 'resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(res, 150); });
    res();

    let running = true;
    let rafId = 0;
    function loop(ts) {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      if (hidden) return;

      const dt = Math.min(ts - lastDraw, 50);
      lastDraw = ts;

      sctx.fillStyle = '#02030a';
      sctx.fillRect(0, 0, W, H);

      // ── DRAW AURORAS ──
      auroras.forEach(a => {
        if (!a.showing) {
          a.timer += dt;
          if (a.timer >= a.nextShow) {
            a.showing = true; a.timer = 0; a.targetA = 0.11 + Math.random() * 0.08;
          }
        } else {
          a.timer += dt;
          if (a.timer >= a.showDur) {
            a.showing = false; a.targetA = 0; a.timer = 0; a.nextShow = 4000 + Math.random() * 9000;
          }
        }
        a.alpha += (a.targetA - a.alpha) * a.fadeSpd * dt;
        if (a.alpha < 0.001) return;
        a.phaseOff += a.phaseSpd * dt;
        const [r, g, b] = a.color, yC = a.yBase * H;

        sctx.save();
        sctx.globalAlpha = a.alpha;
        sctx.filter = 'blur(16px)';
        sctx.beginPath();
        for (let i = 0; i <= auroraSteps; i++) {
          const x = (i / auroraSteps) * W,
                wv = Math.sin(x * a.freq + a.phaseOff) * a.amp + Math.sin(x * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35;
          i === 0 ? sctx.moveTo(x, yC + wv - a.thickness / 2) : sctx.lineTo(x, yC + wv - a.thickness / 2);
        }
        for (let i = auroraSteps; i >= 0; i--) {
          const x = (i / auroraSteps) * W,
                wv = Math.sin(x * a.freq + a.phaseOff) * a.amp + Math.sin(x * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35;
          sctx.lineTo(x, yC + wv + a.thickness / 2);
        }
        sctx.closePath();
        const grad = sctx.createLinearGradient(0, yC - a.thickness, 0, yC + a.thickness);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},0.85)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},0.85)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        sctx.fillStyle = grad; sctx.fill();
        sctx.restore();
      });

      // ── DRAW STARS ──
      sctx.beginPath();
      stars.forEach(s => {
        s.x += s.driftX; s.y += s.driftY;
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0; if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;
        s.p += s.s;
        const tw = Math.sin(s.p) * 0.5 + 0.5;
        const sx = s.x * W, sy = s.y * H;
        sctx.moveTo(sx + s.r, sy);
        sctx.arc(sx, sy, s.r * (0.8 + tw * 0.4), 0, Math.PI * 2);
      });
      sctx.fillStyle = 'rgba(255,255,255,0.65)';
      sctx.fill();

      // ── DRAW SHOOTERS ──
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]; s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
        if (s.alpha <= 0) { shooters.splice(i, 1); continue; }
        const mag = Math.hypot(s.vx, s.vy), tx = s.x - s.vx * (s.len / mag), ty = s.y - s.vy * (s.len / mag);
        const grad = sctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        sctx.beginPath(); sctx.moveTo(tx, ty); sctx.lineTo(s.x, s.y);
        sctx.strokeStyle = grad; sctx.lineWidth = 1.4; sctx.stroke();
      }
    }
    rafId = requestAnimationFrame(loop);

    bag.add(() => {
      running = false;
      cancelAnimationFrame(rafId);
      clearInterval(shooterInterval);
      clearTimeout(resizeTimer);
    });
  })();

  /* ══════════ 3. CURSOR (lib/scripts/cursor.ts) ══════════ */
  initCursor(bag);

  /* ══════════ 4. SCROLL REVEAL ══════════ */
  (function () {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('sr-vis'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sr-elem, .ct-rv').forEach(el => obs.observe(el));
    bag.add(() => obs.disconnect());
  })();

  /* ══════════ 5. AUDIO SYSTEM ══════════ */
  (function () {
    const musicBtn = document.getElementById('music-btn');
    const musicBtnD = document.getElementById('music-btn-desktop');
    const spectrumCanvas = document.getElementById('spectrum-canvas');
    const spectrumCanvasD = document.getElementById('spectrum-canvas-desktop');

    if (!musicBtn && !musicBtnD) return;


    /* Ambient music - one shared <audio> (lib/scripts/ambient-audio.ts) plays
       continuously across every page and remembers its paused state; this engine
       only mirrors the playing flag into its spectrum visualiser below. */
    let spectrumPlaying = false;
    let wakeSpectrum = () => {};
    bag.add(wireAmbientControls(playing => { spectrumPlaying = playing; wakeSpectrum(); }));

    // Spectrum bars config
    const SW = 26, SH = 18, BAR_COUNT = 7, BAR_W = 2, BAR_GAP = 2;
    const TOTAL_W = BAR_COUNT * BAR_W + (BAR_COUNT - 1) * BAR_GAP;
    const LEFT_OFF = (SW - TOTAL_W) / 2;
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
      phase: i * (Math.PI * 2 / BAR_COUNT) + Math.random() * 0.5,
      speed: 2.8 + Math.random() * 2.2,
      currentH: 1,
      targetH: 1
    }));

    const spCtx = spectrumCanvas ? spectrumCanvas.getContext('2d') : null;
    const spCtxD = spectrumCanvasD ? spectrumCanvasD.getContext('2d') : null;

    function drawBarsOnCtx(ctx) {
      if (!ctx) return;
      ctx.clearRect(0, 0, SW, SH);
      bars.forEach((bar, i) => {
        const x = LEFT_OFF + i * (BAR_W + BAR_GAP), h = Math.max(1, bar.currentH), y = (SH - h) / 2;
        const grad = ctx.createLinearGradient(x, y, x, y + h);
        grad.addColorStop(0, 'rgba(255,255,255,0.95)');
        grad.addColorStop(0.5, 'rgba(200,225,255,0.75)');
        grad.addColorStop(1, 'rgba(150,190,255,0.45)');
        ctx.fillStyle = grad; ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, BAR_W, h, 1);
        else ctx.rect(x, y, BAR_W, h); // Fallback
        ctx.fill();
      });
    }

    let lastSpec = 0;
    let specRunning = true;
    let specRaf = 0;
    function drawSpectrum(ts) {
      if (!specRunning) return;
      const dt = Math.min((ts - lastSpec) / 1000, 0.05); lastSpec = ts;
      bars.forEach(bar => {
        if (spectrumPlaying) {
          bar.phase += bar.speed * dt;
          bar.targetH = 2 + (Math.sin(bar.phase) * 0.5 + 0.5) * (SH - 3);
        } else {
          bar.targetH = 1;
        }
        bar.currentH += (bar.targetH - bar.currentH) * 0.18;
      });
      drawBarsOnCtx(spCtx);
      drawBarsOnCtx(spCtxD);
      // Paused and flat: nothing changes until the music starts again.
      if (!spectrumPlaying && bars.every(b => Math.abs(b.currentH - 1) < 0.02)) { specRaf = 0; return; }
      specRaf = requestAnimationFrame(drawSpectrum);
    }
    specRaf = requestAnimationFrame(drawSpectrum);
    wakeSpectrum = () => { if (specRunning && !specRaf) { lastSpec = performance.now(); specRaf = requestAnimationFrame(drawSpectrum); } };

    // Click & hover sounds: lib/sfx.ts

    document.querySelectorAll('a, button').forEach(el => {
      bag.on(el, 'mouseenter', sfxHover);
      bag.on(el, 'click', () => sfxClick());
    });

    // Click Particles
    function spawnParticles(x, y) {
      const colors = ['#5ce0ff', '#bc6fff', '#6dff8a', '#ffffff'];
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'click-particle';
        const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.5);
        const dist = 30 + Math.random() * 30;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.setProperty('--tx', `calc(-50% + ${tx}px)`);
        p.style.setProperty('--ty', `calc(-50% + ${ty}px)`);
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
      }
    }
    bag.on(document, 'mousedown', e => spawnParticles(e.clientX, e.clientY));

    bag.add(() => {
      specRunning = false;
      cancelAnimationFrame(specRaf);
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
    });
  })();

  /* ══════════ 8. MOBILE MENU TOGGLE ══════════ */
  (function () {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('menu-close-mobile');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    const timeouts: any[] = [];

    function openMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.classList.add('is-open');
      document.body.classList.add('menu-open');
      if (closeBtn) closeBtn.classList.add('visible');
      mobileMenu.querySelectorAll('.mobile-menu-link').forEach((el, i) => {
        el.style.opacity = '0'; el.style.transform = 'scale(0.2)';
        const id = setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          el.style.opacity = '1'; el.style.transform = 'scale(1)';
        }, 60 + i * 55);
        timeouts.push(id);
      });
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      if (closeBtn) closeBtn.classList.remove('visible');
      mobileMenu.querySelectorAll('.mobile-menu-link').forEach(el => {
        el.style.opacity = '0'; el.style.transform = 'scale(0.2)';
      });
    }

    bag.on(menuBtn, 'click', () => { if (mobileMenu.classList.contains('open')) closeMenu(); else openMenu(); });
    if (closeBtn) bag.on(closeBtn, 'click', closeMenu);
    bag.on(mobileMenu, 'click', e => { if (e.target === mobileMenu) closeMenu(); });

    bag.add(() => { timeouts.forEach(clearTimeout); document.body.classList.remove('menu-open'); });
  })();

  /* ══════════ 9. TIMEZONE CLOCKS ══════════ */
  (function () {
    const zones = [
      { id: 'tz-colombo', tz: 'Asia/Colombo' },
      { id: 'tz-london', tz: 'Europe/London' },
      { id: 'tz-newyork', tz: 'America/New_York' },
      { id: 'tz-sydney', tz: 'Australia/Sydney' },
    ];
    function tick() {
      zones.forEach(({ id, tz }) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      });
    }
    tick();
    const tzInterval = setInterval(tick, 1000);
    bag.add(() => clearInterval(tzInterval));
  })();

  return () => bag.dispose();
}
