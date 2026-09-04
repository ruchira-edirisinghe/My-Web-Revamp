// @ts-nocheck
/* ════════════════════════════════════════
   contact.ts - Contact page engine: preloader, space bg, cursor + SFX,
   audio, scroll-reveal, channel-card redirect modal, collab accordion,
   mobile menu, timezone clocks.
   (faithful port of styles/contact/contact.js)
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { initPreloaderFx } from './preloader-fx';
import { initSpaceField3D } from './space-field';
import { wireAmbientControls } from './ambient-audio';

export function initContact(): () => void {
  const bag = makeBag();
  const basePath = '/'; // assets live at the site root under Next.js public/

  /* ══════════ 1. PRELOADER & TRANSITION ══════════ */
  (function () {
    function initPreloader() {
      initPreloaderFx(bag);
      const pl = document.getElementById('preloader'),
        cv = document.getElementById('preloader-canvas'),
        pf = document.getElementById('progress-fill'),
        st = document.getElementById('split-top'),
        sb = document.getElementById('split-bottom');

      let alive = true;
      let rafId = 0;
      const timeouts: any[] = [];
      const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };
      const createdStars: HTMLElement[] = [];

      bag.add(() => {
        alive = false;
        cancelAnimationFrame(rafId);
        timeouts.forEach(clearTimeout);
        createdStars.forEach(s => s.remove());
      });

      function dismiss() {
        if (pl) { pl.style.transition = 'opacity 0.5s ease'; pl.style.opacity = '0'; pl.style.pointerEvents = 'none'; }
        if (st) st.classList.add('open');
        if (sb) sb.classList.add('open');
        later(() => {
          if (pl) pl.style.display = 'none';
          if (st) { st.classList.add('gone'); st.style.display = 'none'; }
          if (sb) { sb.classList.add('gone'); sb.style.display = 'none'; }
        }, 1000);
      }

      if (!pl || !cv || !pf || !st || !sb) {
        console.warn('Preloader elements missing.');
        dismiss();
        return;
      }
      if (pl.style.display === 'none') return;

      const cx = cv.getContext('2d');
      const CW = 900, CH = 240;
      cv.width = CW; cv.height = CH;

      const DUR = 2200, HOLD = 300, SPLIT = 900;
      let wp = 0, li = new Image(), lr = false;
      let finished = false;

      const safetyTimer = later(() => { if (!finished) { finished = true; dismiss(); } }, DUR + HOLD + 800);

      function onVisible() {
        if (document.visibilityState === 'visible' && !finished) {
          document.removeEventListener('visibilitychange', onVisible);
          startAnimation();
        }
      }

      function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

      let startTime = null;

      function frame(ts) {
        if (!alive || finished) return;
        if (!startTime) startTime = ts;
        const raw = Math.min((ts - startTime) / DUR, 1);
        const fp = ease(raw);
        wp += 0.045;
        pf.style.width = (fp * 100) + '%';

        cx.clearRect(0, 0, CW, CH);
        if (lr) { cx.save(); cx.globalAlpha = 0.1; cx.drawImage(li, 0, 0, CW, CH); cx.restore(); }

        const wt = CH * (1 - fp), amp = 5 + (1 - fp) * 9;
        cx.save(); cx.beginPath(); cx.moveTo(0, wt);
        for (let x = 0; x <= CW; x += 3) {
          const y = wt + Math.sin((x / CW) * Math.PI * 5 + wp) * amp + Math.sin((x / CW) * Math.PI * 9 + wp * 1.5) * amp * 0.35;
          cx.lineTo(x, y);
        }
        cx.lineTo(CW, CH); cx.lineTo(0, CH); cx.closePath(); cx.clip();
        if (lr) {
          cx.globalAlpha = 1; cx.drawImage(li, 0, 0, CW, CH); cx.globalCompositeOperation = 'source-atop'; cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, CW, CH);
        } else {
          cx.fillStyle = 'rgba(255,255,255,0.9)'; cx.fillRect(0, 0, CW, CH);
        }
        cx.restore();

        cx.save(); cx.beginPath(); cx.moveTo(0, wt);
        for (let x = 0; x <= CW; x += 3) {
          const y = wt + Math.sin((x / CW) * Math.PI * 5 + wp) * amp + Math.sin((x / CW) * Math.PI * 9 + wp * 1.5) * amp * 0.35;
          cx.lineTo(x, y);
        }
        cx.strokeStyle = 'rgba(255,255,255,0.5)'; cx.lineWidth = 1.5; cx.stroke(); cx.restore();

        if (raw < 1) {
          rafId = requestAnimationFrame(frame);
        } else {
          cx.clearRect(0, 0, CW, CH);
          pf.style.width = '100%';
          finished = true;
          clearTimeout(safetyTimer);
          later(() => {
            pl.style.transition = 'opacity 0.5s ease';
            pl.style.opacity = '0';
            pl.style.pointerEvents = 'none';
            requestAnimationFrame(() => { st.classList.add('open'); sb.classList.add('open'); });
            later(() => {
              pl.style.display = 'none';
              st.classList.add('gone'); sb.classList.add('gone');
              st.style.display = 'none';
              sb.style.display = 'none';
            }, SPLIT + 100);
          }, HOLD);
        }
      }

      function startAnimation() {
        if (document.visibilityState === 'hidden') {
          bag.on(document, 'visibilitychange', onVisible);
          return;
        }

        // Generate stars for Aurora Background
        const starsContainer = document.getElementById('preloader-stars');
        if (starsContainer) {
          const starCount = 55;
          for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'preloader-star';
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = 1 + Math.pow(Math.random(), 1.6) * 2;
            const delay = Math.random() * 6;
            const duration = 3 + Math.random() * 4;
            const opacity = 0.35 + Math.random() * 0.45;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--star-opacity', opacity);
            star.style.animation = `star-twinkle ${duration}s infinite ${delay}s ease-in-out`;
            starsContainer.appendChild(star);
            createdStars.push(star);
          }
        }

        li.onload = () => { lr = true; };
        li.onerror = () => { lr = false; };
        li.src = basePath + 'Images/longlogo.svg';
        rafId = requestAnimationFrame(frame);
      }

      startAnimation();
    }

    if (document.readyState === 'loading') {
      bag.on(document, 'DOMContentLoaded', initPreloader);
    } else {
      initPreloader();
    }
  })();

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

  /* ══════════ 3. INTERACTIVE CURSOR ══════════ */
  (function () {
    const cursorCanvas = document.getElementById('cursor-canvas');
    if (!cursorCanvas) return;
    const ctx = cursorCanvas.getContext('2d');
    const dot = document.getElementById('cursor-dot');
    let W = window.innerWidth, H = window.innerHeight;

    function resize() {
      W = cursorCanvas.width = window.innerWidth;
      H = cursorCanvas.height = window.innerHeight;
    }
    bag.on(window, 'resize', resize);
    resize();

    let mx = -100, my = -100; // mouse position
    let rx = -100, ry = -100; // ring position (smoothed)
    let tr = 26, cr = 26; // target radius, current radius
    const RN = 26, RH = 38; // radius normal, radius hover

    bag.on(document, 'mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    let running = true;
    let rafId = 0;
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      // Update center dot instantly for responsiveness
      if (dot) {
        dot.style.transform = `translate(${mx}px, ${my}px)`;
      }

      if (mx < 0 || my < 0 || W <= 900) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      // Smooth movement for the ring
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cr += (tr - cr) * 0.12;

      // 1. Outer Glow (Halo)
      const halo = ctx.createRadialGradient(rx, ry, cr * 0.8, rx, ry, cr * 2);
      halo.addColorStop(0, 'rgba(140, 210, 255, 0.12)');
      halo.addColorStop(1, 'rgba(80, 160, 255, 0)');
      ctx.beginPath();
      ctx.arc(rx, ry, cr * 2, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // 2. Liquid Glass Body (Refraction Rim)
      ctx.beginPath();
      ctx.arc(rx, ry, cr, 0, Math.PI * 2);
      ctx.arc(rx, ry, cr - 4, 0, Math.PI * 2, true);
      const rim = ctx.createRadialGradient(rx, ry, cr - 4, rx, ry, cr);
      rim.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      rim.addColorStop(0.5, 'rgba(200, 230, 255, 0.15)');
      rim.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.fillStyle = rim;
      ctx.fill('evenodd');

      // 3. Main Glass Stroke
      ctx.beginPath();
      ctx.arc(rx, ry, cr, 0, Math.PI * 2);
      const stroke = ctx.createLinearGradient(rx - cr, ry - cr, rx + cr, ry + cr);
      stroke.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      stroke.addColorStop(0.3, 'rgba(210, 235, 255, 0.4)');
      stroke.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
      stroke.addColorStop(1, 'rgba(180, 220, 255, 0.6)');
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 4. Specular Highlights (Sparkle)
      ctx.beginPath();
      ctx.arc(rx, ry, cr - 1.5, -Math.PI * 0.8, -Math.PI * 0.1);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    // Hover effect for all interactive elements
    const hoverables = 'a, button, .channel-card, .collab-item, .modal-btn, .nav-link, .nav-cta';
    document.querySelectorAll(hoverables).forEach(el => {
      bag.on(el, 'mouseenter', () => tr = RH);
      bag.on(el, 'mouseleave', () => tr = RN);
    });

    bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  })();

  /* ══════════ 4. SCROLL REVEAL ══════════ */
  (function () {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('sr-vis'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sr-elem, .orbit-visual-wrap, .channel-card, .collab-item, .orbit-text, .tz-heading, .tz-card').forEach(el => obs.observe(el));
    bag.add(() => obs.disconnect());
  })();

  /* ══════════ 5. AUDIO SYSTEM ══════════ */
  (function () {
    const musicBtn = document.getElementById('music-btn');
    const musicBtnD = document.getElementById('music-btn-desktop');
    const spectrumCanvas = document.getElementById('spectrum-canvas');
    const spectrumCanvasD = document.getElementById('spectrum-canvas-desktop');

    if (!musicBtn && !musicBtnD) return;

    let audioContext = null;
    function getAC() {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      return audioContext;
    }

    /* Ambient music - one shared <audio> (lib/scripts/ambient-audio.ts) plays
       continuously across every page and remembers its paused state; this engine
       only mirrors the playing flag into its spectrum visualiser below. */
    let spectrumPlaying = false;
    bag.add(wireAmbientControls(playing => { spectrumPlaying = playing; }));

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
      specRaf = requestAnimationFrame(drawSpectrum);
    }
    specRaf = requestAnimationFrame(drawSpectrum);

    // Click & hover sounds
    function playSfx(type) {
      try {
        const ac = getAC();
        const osc = ac.createOscillator(), gain = ac.createGain();
        if (type === 'hover') {
          osc.type = 'sine'; osc.frequency.setValueAtTime(440, ac.currentTime);
          osc.frequency.linearRampToValueAtTime(520, ac.currentTime + 0.08);
          gain.gain.setValueAtTime(0, ac.currentTime);
          gain.gain.linearRampToValueAtTime(0.1, ac.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.12);
          osc.connect(gain); gain.connect(ac.destination);
          osc.start(); osc.stop(ac.currentTime + 0.15);
        } else {
          osc.type = 'sine'; osc.frequency.setValueAtTime(660, ac.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ac.currentTime + 0.1);
          gain.gain.setValueAtTime(0, ac.currentTime);
          gain.gain.linearRampToValueAtTime(0.15, ac.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.15);
          osc.connect(gain); gain.connect(ac.destination);
          osc.start(); osc.stop(ac.currentTime + 0.2);
        }
      } catch (e) {}
    }

    document.querySelectorAll('a, button, .channel-card, .collab-item').forEach(el => {
      bag.on(el, 'mouseenter', () => playSfx('hover'));
      bag.on(el, 'click', () => playSfx('click'));
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
      try { if (audioContext) audioContext.close(); } catch {}
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
    });
  })();

  /* ══════════ 6. MODAL SYSTEM ══════════ */
  (function () {
    const overlay = document.getElementById('cert-prompt-overlay');
    const modalCard = overlay ? overlay.querySelector('.modal-card') : null;
    const cancelBtn = document.getElementById('modal-cancel');
    const confirmBtn = document.getElementById('modal-confirm');
    const cards = document.querySelectorAll('.channel-card');
    const modalIconWrap = document.getElementById('modal-icon-wrap');
    const modalAction = document.getElementById('modal-action-text');
    let pendingUrl = '';
    let modalOpener: any = null;

    if (!overlay || !cancelBtn || !confirmBtn) return;

    // Dialog semantics for assistive tech
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    if (modalAction) overlay.setAttribute('aria-labelledby', 'modal-action-text');
    else overlay.setAttribute('aria-label', 'Confirm navigation');

    const timeouts: any[] = [];
    const closeModal = () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (modalOpener && typeof modalOpener.focus === 'function') modalOpener.focus();
      modalOpener = null;
      const id = setTimeout(() => { pendingUrl = ''; }, 300);
      timeouts.push(id);
    };

    const openModal = (card) => {
      const url = card.getAttribute('data-url');
      if (!url) return;
      modalOpener = card;
      pendingUrl = url;
      const iconHtml = card.querySelector('.cc-icon-wrap').innerHTML;
      const detail = card.getAttribute('data-detail');
      const action = card.getAttribute('data-action');
      modalAction.textContent = action;
      document.getElementById('modal-detail-box').textContent = detail;
      modalIconWrap.innerHTML = iconHtml;

      const sourceStyles = window.getComputedStyle(card);
      ['--cc-color', '--cc-icon-border', '--cc-icon-bg', '--cc-glow'].forEach(prop => {
        modalIconWrap.style.setProperty(prop, sourceStyles.getPropertyValue(prop));
      });
      overlay.style.setProperty('--modal-glow', sourceStyles.getPropertyValue('--cc-glow').replace('0.08', '0.4').replace('0.15', '0.4'));
      modalCard.style.setProperty('--cc-color', sourceStyles.getPropertyValue('--cc-color'));
      modalCard.style.setProperty('--cc-glow', sourceStyles.getPropertyValue('--cc-glow'));
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus the safe (cancel) action so Enter doesn't fire the redirect
      if (cancelBtn && typeof cancelBtn.focus === 'function') cancelBtn.focus();
    };

    cards.forEach(card => {
      // Keyboard access: expose each contact channel as a button
      if (!card.hasAttribute('role')) card.setAttribute('role', 'button');
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      const action = card.getAttribute('data-action');
      const detail = card.getAttribute('data-detail');
      if (action && !card.getAttribute('aria-label')) {
        card.setAttribute('aria-label', detail ? `${action}: ${detail}` : action);
      }
      bag.on(card, 'click', () => openModal(card));
      bag.on(card, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
      });
    });

    bag.on(cancelBtn, 'click', (e) => { e.stopPropagation(); closeModal(); });
    bag.on(confirmBtn, 'click', (e) => {
      e.stopPropagation();
      if (pendingUrl) {
        // mailto:/tel: must navigate in-place so the OS handler opens (a blank tab otherwise)
        if (/^(mailto:|tel:)/i.test(pendingUrl)) window.location.href = pendingUrl;
        else window.open(pendingUrl, '_blank', 'noopener');
      }
      closeModal();
    });
    bag.on(overlay, 'click', (e) => { if (e.target === overlay) closeModal(); });
    // Escape closes the confirm modal
    bag.on(document, 'keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal(); });

    bag.add(() => { timeouts.forEach(clearTimeout); document.body.style.overflow = ''; });
  })();

  /* ══════════ 7. COLLAB ACCORDION ══════════ */
  (function () {
    const items = document.querySelectorAll('.collab-item');
    items.forEach(item => {
      bag.on(item, 'click', () => {
        if (item.classList.contains('active')) return;
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
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
