// @ts-nocheck
/* ════════════════════════════════════════
   experience.ts - Experience page engine.
   Faithful port of styles/experience/experience.js (10 IIFE sections:
   testimonial carousel, space bg, preloader, cursor + SFX/audio, CV-modal,
   logo-ticker, bio reveal + bio canvas, scroll-reveal, stat count-up,
   gaming reveal) PLUS experience.html's three inline <script> blocks
   (skills-universe physics, preloader/mobile-menu/scroll-reveal/testimonials/
   timeline-spine/cert-scrollbar, and the certification redirect modal).

   Every addEventListener → bag.on; every rAF loop guarded + cancelled;
   every interval/timeout tracked + cleared; every IntersectionObserver
   disconnected; Web Audio closed; appended nodes removed on dispose.
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { wireAmbientControls } from './ambient-audio';

export function initExperience(): () => void {
  const bag = makeBag();
  const basePath = '/'; // assets live at the site root under Next.js public/

  /* ══════════ 1. TESTIMONIAL CAROUSEL ══════════
   The testimonial carousel is handled once, below, by section "B4. TESTIMONIALS
   SLIDER (inline #2)". A second, duplicate carousel used to run here and fought
   B4 over the same DOM (#testi-* / .testi-slide) - two 7s auto-rotate intervals
   and doubled prev/next handlers. Removed so only B4 (dynamic slide count +
   .testi-progress-fill.run-anim, matching the markup/CSS) controls it. */

  /* ══════════ 2. SPACE BACKGROUND (experience.js #2) ══════════ */
  (function () {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); bag.on(window, 'resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.2,
      baseA: Math.random() * 0.55 + 0.3, phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.003,
      driftX: (Math.random() - 0.5) * 0.00007, driftY: (Math.random() - 0.5) * 0.00003,
    }));
    const shooters = [];
    function spawnShooter() {
      if (shooters.length >= 6) return; // cap - prevents buildup while rAF is paused
      const a = (Math.random() * 30 + 10) * Math.PI / 180, sp = Math.random() * 5 + 4;
      shooters.push({
        x: Math.random() * W, y: Math.random() * H * 0.4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        len: Math.random() * 100 + 50, alpha: 1, decay: Math.random() * 0.014 + 0.009
      });
    }
    const shooterInterval = setInterval(() => { if (!document.hidden && Math.random() < 0.35) spawnShooter(); }, 3000);
    bag.add(() => clearInterval(shooterInterval));

    const aC = [[0, 220, 160], [90, 70, 240], [0, 180, 110], [50, 165, 240]];
    const auroras = Array.from({ length: 3 }, (_, i) => ({
      color: aC[i], yBase: 0.04 + Math.random() * 0.18, amp: 35 + Math.random() * 50,
      freq: 0.0007 + Math.random() * 0.0005, phaseOff: Math.random() * Math.PI * 2,
      phaseSpd: 0.00025 + Math.random() * 0.00025, thickness: 55 + Math.random() * 70,
      alpha: 0, targetA: 0, fadeSpd: 0.0012 + Math.random() * 0.0008,
      nextShow: Math.random() * 5000, showDur: 5000 + Math.random() * 7000, timer: 0, showing: false,
    }));
    let auroraSteps = Math.ceil(window.innerWidth / 5);
    bag.on(window, 'resize', () => { auroraSteps = Math.ceil(window.innerWidth / 5); });

    let lt = 0;
    let running = true;
    let rafId = 0;
    function draw(ts) {
      if (!running) return;
      const dt = Math.min(ts - lt, 50); lt = ts;
      ctx.fillStyle = '#02030a'; ctx.fillRect(0, 0, W, H);
      auroras.forEach(a => {
        if (!a.showing) { a.timer += dt; if (a.timer >= a.nextShow) { a.showing = true; a.timer = 0; a.targetA = 0.11 + Math.random() * 0.08; } }
        else { a.timer += dt; if (a.timer >= a.showDur) { a.showing = false; a.targetA = 0; a.timer = 0; a.nextShow = 4000 + Math.random() * 9000; } }
        a.alpha += (a.targetA - a.alpha) * a.fadeSpd * dt;
        if (a.alpha < 0.001) return;
        a.phaseOff += a.phaseSpd * dt;
        const [r, g, b] = a.color, yC = a.yBase * H;
        ctx.save(); ctx.globalAlpha = a.alpha; ctx.filter = 'blur(16px)';
        ctx.beginPath();
        for (let i = 0; i <= auroraSteps; i++) { const x = (i / auroraSteps) * W, wv = Math.sin(x * a.freq + a.phaseOff) * a.amp + Math.sin(x * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35; i === 0 ? ctx.moveTo(x, yC + wv - a.thickness / 2) : ctx.lineTo(x, yC + wv - a.thickness / 2); }
        for (let i = auroraSteps; i >= 0; i--) { const x = (i / auroraSteps) * W, wv = Math.sin(x * a.freq + a.phaseOff) * a.amp + Math.sin(x * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35; ctx.lineTo(x, yC + wv + a.thickness / 2); }
        ctx.closePath();
        const g2 = ctx.createLinearGradient(0, yC - a.thickness, 0, yC + a.thickness);
        g2.addColorStop(0, `rgba(${r},${g},${b},0)`); g2.addColorStop(0.3, `rgba(${r},${g},${b},0.85)`);
        g2.addColorStop(0.5, `rgba(${r},${g},${b},1)`); g2.addColorStop(0.7, `rgba(${r},${g},${b},0.85)`);
        g2.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = g2; ctx.fill(); ctx.restore();
      });
      stars.forEach(s => {
        s.x += s.driftX; s.y += s.driftY;
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0; if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;
        s.phase += s.speed;
        const tw = Math.sin(s.phase) * 0.5 + 0.5, al = s.baseA * (0.4 + tw * 0.6);
        const sx = s.x * W, sy = s.y * H;
        if (s.r > 1.1 && tw > 0.75) { const gw = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 4.5); gw.addColorStop(0, `rgba(200,220,255,${al * 0.5})`); gw.addColorStop(1, 'rgba(200,220,255,0)'); ctx.beginPath(); ctx.arc(sx, sy, s.r * 4.5, 0, Math.PI * 2); ctx.fillStyle = gw; ctx.fill(); }
        ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(220,230,255,${al})`; ctx.fill();
      });
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]; s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
        if (s.alpha <= 0) { shooters.splice(i, 1); continue; }
        const mag = Math.hypot(s.vx, s.vy), tx = s.x - s.vx * (s.len / mag), ty = s.y - s.vy * (s.len / mag);
        const gw = ctx.createLinearGradient(tx, ty, s.x, s.y); gw.addColorStop(0, 'rgba(255,255,255,0)'); gw.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y); ctx.strokeStyle = gw; ctx.lineWidth = 1.4; ctx.stroke();
        const tg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 3.5); tg.addColorStop(0, `rgba(255,255,255,${s.alpha})`); tg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.arc(s.x, s.y, 3.5, 0, Math.PI * 2); ctx.fillStyle = tg; ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    // Zero background CPU: pause the loop while the tab is hidden
    bag.on(document, 'visibilitychange', () => {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; lt = performance.now(); rafId = requestAnimationFrame(draw); }
    });
    bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  })();

  /* ══════════ 3. PRELOADER (experience.js #3) ══════════ */
  (function () {
    const preloader = document.getElementById('preloader');
    const canvas = document.getElementById('preloader-canvas');
    if (!preloader || !canvas || preloader.style.display === 'none') return;
    const ctx = canvas.getContext('2d');
    const progressFill = document.getElementById('progress-fill');
    const splitTop = document.getElementById('split-top');
    const splitBottom = document.getElementById('split-bottom');

    const CW = 900, CH = 240;
    canvas.width = CW; canvas.height = CH;

    const DURATION = 2200;
    const HOLD_MS = 300;
    const SPLIT_MS = 900;

    let startTime = null, lastTs = 0, fillPct = 0, wavePhase = 0;
    let logoImg = new Image(), logoReady = false;
    let rafId = 0, alive = true;
    const timeouts = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    // Generate stars for Aurora Background
    const starsContainer = document.getElementById('preloader-stars');
    const createdStars = [];
    if (starsContainer) {
      const starCount = 80;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'preloader-star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 3;
        const opacity = 0.4 + Math.random() * 0.5;

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

    function drawFrame(ts) {
      if (!alive) return;
      if (!startTime) { startTime = ts; lastTs = ts; }
      const dt = Math.min(ts - lastTs, 50); lastTs = ts;
      const raw = Math.min((ts - startTime) / DURATION, 1);
      fillPct = ease(raw);
      wavePhase += 0.045 * (dt / 16.667);

      progressFill.style.width = (fillPct * 100) + '%';
      ctx.clearRect(0, 0, CW, CH);

      if (logoReady) { ctx.save(); ctx.globalAlpha = 0.1; ctx.drawImage(logoImg, 0, 0, CW, CH); ctx.restore(); }

      const waterTop = CH * (1 - fillPct);
      const amp = 5 + (1 - fillPct) * 9;
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, waterTop);
      for (let x = 0; x <= CW; x += 3) {
        const y = waterTop + Math.sin((x / CW) * Math.PI * 5 + wavePhase) * amp + Math.sin((x / CW) * Math.PI * 9 + wavePhase * 1.5) * amp * 0.35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(CW, CH); ctx.lineTo(0, CH); ctx.closePath(); ctx.clip();
      if (logoReady) { ctx.globalAlpha = 1; ctx.drawImage(logoImg, 0, 0, CW, CH); ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, CW, CH); }
      else { ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(0, 0, CW, CH); }
      ctx.restore();

      ctx.save(); ctx.beginPath(); ctx.moveTo(0, waterTop);
      for (let x = 0; x <= CW; x += 3) {
        const y = waterTop + Math.sin((x / CW) * Math.PI * 5 + wavePhase) * amp + Math.sin((x / CW) * Math.PI * 9 + wavePhase * 1.5) * amp * 0.35;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();

      if (raw < 1) {
        rafId = requestAnimationFrame(drawFrame);
      } else {
        ctx.clearRect(0, 0, CW, CH);
        if (logoReady) { ctx.save(); ctx.drawImage(logoImg, 0, 0, CW, CH); ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, CW, CH); ctx.restore(); }
        progressFill.style.width = '100%';

        later(() => {
          preloader.style.opacity = '0';
          preloader.style.pointerEvents = 'none';
          requestAnimationFrame(() => {
            if (splitTop) splitTop.classList.add('open');
            if (splitBottom) splitBottom.classList.add('open');
          });
          later(() => {
            preloader.style.display = 'none';
            if (splitTop) { splitTop.classList.add('gone'); splitTop.style.display = 'none'; }
            if (splitBottom) { splitBottom.classList.add('gone'); splitBottom.style.display = 'none'; }
          }, SPLIT_MS + 100);
        }, HOLD_MS);
      }
    }

    logoImg.onload = () => { logoReady = true; };
    logoImg.onerror = () => { logoReady = false; };
    logoImg.src = basePath + 'Images/longlogo.svg';
    rafId = requestAnimationFrame(drawFrame);

    bag.add(() => { alive = false; cancelAnimationFrame(rafId); timeouts.forEach(clearTimeout); createdStars.forEach(s => s.remove()); });
  })();

  /* ══════════ 4. CURSOR & MUSIC & SOUNDS (experience.js #4) ══════════ */
  (function () {
    /* ── Cursor ── */
    const cursorCanvas = document.getElementById('cursor-canvas');
    if (!cursorCanvas) return;
    const cCtx = cursorCanvas.getContext('2d');
    let W, H;
    function resize() { W = cursorCanvas.width = window.innerWidth; H = cursorCanvas.height = window.innerHeight; }
    resize(); bag.on(window, 'resize', resize);

    let mX = -300, mY = -300, rX = -300, rY = -300, currentR = 26, targetR = 26;
    const R_NORMAL = 26, R_HOVER = 36;

    let cursorRunning = false;
    let cursorRaf = 0;
    function startCursor() {
      if (cursorRunning || W <= 900 || document.hidden) return;
      cursorRunning = true;
      cursorRaf = requestAnimationFrame(drawCursor);
    }
    function stopCursor() { cursorRunning = false; cCtx.clearRect(0, 0, W, H); }

    function drawCursor() {
      if (!cursorRunning) return;
      cCtx.clearRect(0, 0, W, H);
      rX += (mX - rX) * 0.1; rY += (mY - rY) * 0.1; currentR += (targetR - currentR) * 0.08;
      const R = currentR, cx = rX, cy = rY;
      if (mX < -200) { cursorRaf = requestAnimationFrame(drawCursor); return; }
      const halo = cCtx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.5);
      halo.addColorStop(0, 'rgba(180,220,255,0.07)'); halo.addColorStop(1, 'rgba(80,140,255,0)');
      cCtx.beginPath(); cCtx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); cCtx.fillStyle = halo; cCtx.fill();
      cCtx.beginPath(); cCtx.arc(cx, cy, R, 0, Math.PI * 2); cCtx.arc(cx, cy, R - 5, 0, Math.PI * 2, true);
      const rim = cCtx.createRadialGradient(cx, cy, R - 5, cx, cy, R);
      rim.addColorStop(0, 'rgba(255,255,255,0.04)'); rim.addColorStop(0.5, 'rgba(200,230,255,0.08)'); rim.addColorStop(1, 'rgba(255,255,255,0.03)');
      cCtx.fillStyle = rim; cCtx.fill('evenodd');
      cCtx.beginPath(); cCtx.arc(cx, cy, R, 0, Math.PI * 2);
      const stroke = cCtx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      stroke.addColorStop(0, 'rgba(255,255,255,0.88)'); stroke.addColorStop(0.3, 'rgba(210,235,255,0.52)');
      stroke.addColorStop(0.65, 'rgba(255,255,255,0.13)'); stroke.addColorStop(1, 'rgba(190,220,255,0.7)');
      cCtx.strokeStyle = stroke; cCtx.lineWidth = 1.5; cCtx.stroke();
      cCtx.beginPath(); cCtx.arc(cx, cy, R - 1.5, -Math.PI * 0.8, -Math.PI * 0.06);
      cCtx.strokeStyle = 'rgba(255,255,255,0.68)'; cCtx.lineWidth = 2.2; cCtx.lineCap = 'round'; cCtx.stroke();
      cCtx.beginPath(); cCtx.arc(cx, cy, R - 2.5, Math.PI * 0.2, Math.PI * 0.7);
      cCtx.strokeStyle = 'rgba(130,190,255,0.22)'; cCtx.lineWidth = 1.2; cCtx.lineCap = 'round'; cCtx.stroke();
      cCtx.beginPath(); cCtx.arc(mX, mY, 2.5, 0, Math.PI * 2);
      cCtx.fillStyle = 'rgba(255,255,255,0.9)'; cCtx.shadowColor = 'rgba(200,230,255,0.7)'; cCtx.shadowBlur = 5; cCtx.fill();
      cCtx.shadowBlur = 0;
      cursorRaf = requestAnimationFrame(drawCursor);
    }
    startCursor();
    bag.on(window, 'resize', () => { if (W <= 900) stopCursor(); else startCursor(); });
    bag.on(document, 'visibilitychange', () => { if (document.hidden) stopCursor(); else startCursor(); });
    bag.on(document, 'mousemove', e => { mX = e.clientX; mY = e.clientY; });
    bag.on(document, 'mouseleave', () => { mX = -300; mY = -300; });
    document.querySelectorAll('a,button,.nav-link,.nav-cta,.skill-tag,.stat-pill,.about-block').forEach(el => {
      bag.on(el, 'mouseenter', () => { targetR = R_HOVER; });
      bag.on(el, 'mouseleave', () => { targetR = R_NORMAL; });
    });

    /* ── Audio ── */
    let audioCtx = null;
    function getAC() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume(); return audioCtx; }

    /* Ambient music - one shared <audio> (lib/scripts/ambient-audio.ts) plays
       continuously across every page and remembers its paused state; this engine
       only mirrors the playing flag into its spectrum visualiser below. */
    let spectrumPlaying = false;
    bag.add(wireAmbientControls(playing => { spectrumPlaying = playing; }));

    const specCanvas = document.getElementById('spectrum-canvas-desktop');
    const specCanvasM = document.getElementById('spectrum-canvas');
    const spCtx = specCanvas ? specCanvas.getContext('2d') : null;
    const spCtxM = specCanvasM ? specCanvasM.getContext('2d') : null;

    const SW = 26, SH = 18, BAR_COUNT = 7, BAR_W = 2, BAR_GAP = 2;
    const TOTAL_W = BAR_COUNT * BAR_W + (BAR_COUNT - 1) * BAR_GAP;
    const LEFT_OFF = (SW - TOTAL_W) / 2;
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({ phase: i * (Math.PI * 2 / BAR_COUNT) + Math.random() * 0.5, speed: 2.8 + Math.random() * 2.2, currentH: 1, targetH: 1 }));

    function drawBarsOnCtx(ctx) {
      if (!ctx) return;
      ctx.clearRect(0, 0, SW, SH);
      bars.forEach((bar, i) => {
        const x = LEFT_OFF + i * (BAR_W + BAR_GAP), h = Math.max(1, bar.currentH), y = (SH - h) / 2;
        const grad = ctx.createLinearGradient(x, y, x, y + h);
        grad.addColorStop(0, 'rgba(255,255,255,0.95)'); grad.addColorStop(0.5, 'rgba(200,225,255,0.75)'); grad.addColorStop(1, 'rgba(150,190,255,0.45)');
        ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(x, y, BAR_W, h, 1); ctx.fill();
      });
    }

    let lastSpec = 0;
    let specRunning = true;
    let specRaf = 0;
    function drawSpectrum(ts) {
      if (!specRunning) return;
      const dt = Math.min((ts - lastSpec) / 1000, 0.05); lastSpec = ts;
      bars.forEach(bar => {
        if (spectrumPlaying) { bar.phase += bar.speed * dt; bar.targetH = 2 + ((Math.sin(bar.phase) * 0.5 + 0.5)) * (SH - 3); }
        else bar.targetH = 1;
        bar.currentH += (bar.targetH - bar.currentH) * 0.18;
      });
      drawBarsOnCtx(spCtx);
      drawBarsOnCtx(spCtxM);
      specRaf = requestAnimationFrame(drawSpectrum);
    }
    specRaf = requestAnimationFrame(drawSpectrum);

    /* Click & hover sounds */
    function playClick(isBtn) {
      try {
        const ac = getAC(), osc = ac.createOscillator(), gain = ac.createGain(), filt = ac.createBiquadFilter();
        osc.type = 'sine'; osc.frequency.setValueAtTime(isBtn ? 900 : 660, ac.currentTime); osc.frequency.exponentialRampToValueAtTime(isBtn ? 600 : 440, ac.currentTime + 0.12);
        filt.type = 'lowpass'; filt.frequency.value = 3000;
        gain.gain.setValueAtTime(0, ac.currentTime); gain.gain.linearRampToValueAtTime(isBtn ? 0.35 : 0.2, ac.currentTime + 0.008); gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + (isBtn ? 0.28 : 0.18));
        osc.connect(filt); filt.connect(gain); gain.connect(ac.destination); osc.start(); osc.stop(ac.currentTime + 0.3);
      } catch (e) { }
    }
    function playHover() {
      try {
        const ac = getAC(), osc = ac.createOscillator(), gain = ac.createGain(), filt = ac.createBiquadFilter();
        osc.type = 'sine'; osc.frequency.setValueAtTime(440, ac.currentTime); osc.frequency.linearRampToValueAtTime(520, ac.currentTime + 0.08);
        filt.type = 'bandpass'; filt.frequency.value = 1000; filt.Q.value = 2;
        gain.gain.setValueAtTime(0, ac.currentTime); gain.gain.linearRampToValueAtTime(0.18, ac.currentTime + 0.03); gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.14);
        osc.connect(filt); filt.connect(gain); gain.connect(ac.destination); osc.start(); osc.stop(ac.currentTime + 0.15);
      } catch (e) { }
    }

    document.querySelectorAll('.nav-link,.nav-cta,.about-block,.skill-tag,.stat-pill,footer a').forEach(el => {
      bag.on(el, 'mouseenter', playHover);
      bag.on(el, 'click', () => playClick(false));
    });

    /* Particles */
    function spawnParticles(x, y) {
      const colors = ['rgba(255,255,255,0.7)', 'rgba(180,220,255,0.65)', 'rgba(200,200,255,0.55)'];
      for (let i = 0; i < 6; i++) {
        const p = document.createElement('div'); p.className = 'click-particle';
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.5, dist = 28 + Math.random() * 22;
        p.style.cssText = `left:${x}px;top:${y}px;width:${3 + Math.random() * 3}px;height:${3 + Math.random() * 3}px;background:${colors[i % colors.length]};--tx:calc(-50% + ${Math.cos(angle) * dist}px);--ty:calc(-50% + ${Math.sin(angle) * dist}px);animation-duration:${0.45 + Math.random() * 0.15}s;`;
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
      }
    }
    bag.on(document, 'click', e => {
      // Don't fire particles/sounds for menu button or menu overlay clicks
      if (e.target.closest('#menu-btn') || e.target.closest('#menu-close-mobile') || e.target.closest('#mobile-menu')) return;
      playClick(false); spawnParticles(e.clientX, e.clientY);
    });

    bag.add(() => {
      cursorRunning = false; cancelAnimationFrame(cursorRaf);
      specRunning = false; cancelAnimationFrame(specRaf);
      try { if (audioCtx) audioCtx.close(); } catch { }
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
    });
  })();

  /* ══════════ 6. LOGO-TICKER (experience.js #6) ══════════ */
  (function () {
    const inner = document.getElementById('logo-ticker-inner');
    const setA = document.getElementById('ticker-set-a');
    if (!inner || !setA) return;

    const PX_PER_SEC = 70;
    let setWidth = 0;
    let offset = 0;
    let last = null;
    let rafId = null;
    let running = true;

    function measure() {
      setWidth = setA.offsetWidth;
      if (offset === 0) offset = setWidth * 0.5;
    }

    function frame(ts) {
      if (!running) return;
      if (last === null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;

      offset += PX_PER_SEC * dt;
      if (offset >= setWidth) offset -= setWidth;   // seamless snap

      inner.style.transform = `translateX(-${offset}px)`;
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      measure();
      if (!rafId) rafId = requestAnimationFrame(frame);
    }

    if (document.readyState === 'complete') {
      start();
    } else {
      bag.on(window, 'load', start);
    }

    bag.on(window, 'resize', measure);
    bag.add(() => { running = false; if (rafId) cancelAnimationFrame(rafId); });
  })();

  /* ══════════ 7. BIO REVEAL + BIO CANVAS (experience.js #7) ══════════ */
  (function () {
    /* ── Scroll-reveal using IntersectionObserver ── */
    const bioTargets = document.querySelectorAll('.bio-greeting-line, .bio-para');
    let revealObs = null;
    if ('IntersectionObserver' in window) {
      revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bio-visible');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
      bioTargets.forEach(el => revealObs.observe(el));
    } else {
      bioTargets.forEach(el => el.classList.add('bio-visible'));
    }
    if (revealObs) bag.add(() => revealObs.disconnect());

    /* ── Bio canvas: drifting glow orbs + connecting sparks ── */
    const canvas = document.getElementById('bio-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
      const section = canvas.parentElement;
      W = canvas.width = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }
    resize();
    bag.on(window, 'resize', resize);

    const ORBS = Array.from({ length: 7 }, () => ({
      x: Math.random(), y: Math.random(), r: 80 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 0.00012, vy: (Math.random() - 0.5) * 0.00008,
      hue: Math.random() < 0.6 ? 200 : 260,
      alpha: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2, phaseSpd: 0.002 + Math.random() * 0.003,
    }));

    const PARTICLES = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.5 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.00008, vy: -0.00004 - Math.random() * 0.00006,
      alpha: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2, phaseSpd: 0.01 + Math.random() * 0.015,
    }));

    let bioRaf;
    let bioAlive = true;
    function drawBio(ts) {
      if (!bioAlive) return;
      bioRaf = requestAnimationFrame(drawBio);
      ctx.clearRect(0, 0, W, H);

      ORBS.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -0.2) o.x = 1.2;
        if (o.x > 1.2) o.x = -0.2;
        if (o.y < -0.2) o.y = 1.2;
        if (o.y > 1.2) o.y = -0.2;
        o.phase += o.phaseSpd;
        const pulse = 0.7 + 0.3 * Math.sin(o.phase);
        const g = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r * pulse);
        g.addColorStop(0, `hsla(${o.hue},80%,70%,${o.alpha * pulse})`);
        g.addColorStop(1, `hsla(${o.hue},80%,60%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x * W, o.y * H, o.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      PARTICLES.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        p.phase += p.phaseSpd;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,210,255,${a})`;
        ctx.fill();
      });

      const scanY = (ts * 0.00006 % 1) * H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'rgba(140,210,255,0)');
      scanGrad.addColorStop(0.5, 'rgba(140,210,255,0.025)');
      scanGrad.addColorStop(1, 'rgba(140,210,255,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, W, 120);
    }

    const bioSection = canvas.parentElement;
    const canvasObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!bioRaf) requestAnimationFrame(drawBio);
      } else {
        cancelAnimationFrame(bioRaf);
        bioRaf = null;
      }
    }, { threshold: 0 });
    canvasObs.observe(bioSection);
    bag.add(() => { bioAlive = false; canvasObs.disconnect(); if (bioRaf) cancelAnimationFrame(bioRaf); });
  })();

  /* ══════════ 8. SCROLL-REVEAL (experience.js #8 - about-page classes, inert here) ══════════ */
  (function () {
    var showAll = function () {
      document.querySelectorAll('.about-grid, .about-block, .techstack-heading, .stack-panel, .snode')
        .forEach(function (el) { el.classList.add('sr-vis'); });
    };

    if (!('IntersectionObserver' in window)) { showAll(); return; }

    var opts = { threshold: 0.07, rootMargin: '0px 0px -30px 0px' };

    var gridObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sr-vis'); gridObs.unobserve(e.target); }
      });
    }, opts);
    document.querySelectorAll('.about-grid').forEach(function (el) { gridObs.observe(el); });

    var blockObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sr-vis'); blockObs.unobserve(e.target); }
      });
    }, opts);
    document.querySelectorAll('.about-block').forEach(function (el, i) {
      el.style.setProperty('--sr-delay', (i * 0.12) + 's');
      blockObs.observe(el);
    });

    var headObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sr-vis'); headObs.unobserve(e.target); }
      });
    }, opts);
    document.querySelectorAll('.techstack-heading').forEach(function (el) { headObs.observe(el); });

    var panelObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sr-vis'); panelObs.unobserve(e.target); }
      });
    }, opts);
    document.querySelectorAll('.stack-panel').forEach(function (el, i) {
      el.style.setProperty('--sr-delay', (i * 0.1) + 's');
      panelObs.observe(el);
    });

    var snodeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sr-vis'); snodeObs.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
    document.querySelectorAll('.snode').forEach(function (el, i) {
      el.style.setProperty('--sr-delay', ((i % 9) * 0.06) + 's');
      snodeObs.observe(el);
    });

    let countAlive = true;
    const statTimeouts = [];
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var item = e.target;
        item.classList.add('sr-vis');
        var numEl = item.querySelector('.stat-number, .ufo-stat-number');
        if (!numEl) { statObs.unobserve(item); return; }
        var target = parseInt(numEl.getAttribute('data-target'), 10);
        var duration = 1400;
        var start = null;
        var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
        var delay = parseFloat(item.style.getPropertyValue('--sr-delay') || '0') * 1000;
        statTimeouts.push(setTimeout(function () {
          requestAnimationFrame(function step(ts) {
            if (!countAlive) return;
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            numEl.textContent = Math.floor(easeOut(progress) * target);
            if (progress < 1) requestAnimationFrame(step);
            else numEl.textContent = target;
          });
        }, delay));
        statObs.unobserve(item);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stat-item').forEach(function (el) {
      el.classList.remove('sr-vis');
      statObs.observe(el);
    });

    const pillarTimeouts = [];
    var pillarObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var pillar = e.target;
        pillar.classList.add('pillar-vis');
        var numEl = pillar.querySelector('.pillar-number');
        if (!numEl) { pillarObs.unobserve(pillar); return; }
        var target = parseInt(numEl.getAttribute('data-target'), 10);
        var duration = 1600;
        var start = null;
        var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
        var delay = parseFloat(pillar.style.getPropertyValue('--pillar-delay') || '0') * 1000;
        pillarTimeouts.push(setTimeout(function () {
          requestAnimationFrame(function step(ts) {
            if (!countAlive) return;
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            numEl.textContent = Math.floor(easeOut(progress) * target);
            if (progress < 1) requestAnimationFrame(step);
            else numEl.textContent = target;
          });
        }, delay));
        pillarObs.unobserve(pillar);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.ufo-pillar').forEach(function (el) {
      pillarObs.observe(el);
    });

    bag.add(() => {
      countAlive = false;
      gridObs.disconnect(); blockObs.disconnect(); headObs.disconnect();
      panelObs.disconnect(); snodeObs.disconnect(); statObs.disconnect(); pillarObs.disconnect();
      statTimeouts.forEach(clearTimeout); pillarTimeouts.forEach(clearTimeout);
    });
  })();

  /* ══════════ 10. GAMING-REVEAL (experience.js #10 - gaming classes, inert here) ══════════ */
  (function () {
    var ghObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('gs-vis');
          ghObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    var gh = document.getElementById('gaming-heading');
    if (gh) ghObs.observe(gh);

    var gcObs = null;
    var gcCards = document.querySelectorAll('.platform-card');
    if ('IntersectionObserver' in window) {
      gcObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('gc-vis');
            gcObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      gcCards.forEach(function (c, i) {
        c.style.setProperty('--gc-delay', (i * 0.08) + 's');
        gcObs.observe(c);
      });
    } else {
      gcCards.forEach(function (c) { c.classList.add('gc-vis'); });
    }

    bag.add(() => { ghObs.disconnect(); if (gcObs) gcObs.disconnect(); });
  })();

  /* ══════════ A. SKILLS-UNIVERSE PHYSICS (inline #1) ══════════ */
  (function () {
    const universe = document.getElementById("skills-universe");
    if (!universe) return;

    const nodes = universe.querySelectorAll(".nebula-node-wrap");
    const data = [];
    const MIN_DIST = 260; // Increased to 260 for multiline labels
    const FRICTION = 0.95;

    let dragOffset = { x: 0, y: 0 };

    nodes.forEach((node) => {
      const d = {
        el: node,
        baseX: 15 + Math.random() * 70, // Randomized initial home
        baseY: 15 + Math.random() * 65, // Biased slightly higher
        x: Math.random() * 800,
        y: Math.random() * 400,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speedX: 0.01 + Math.random() * 0.01,
        speedY: 0.01 + Math.random() * 0.01,
        amplitude: 30 + Math.random() * 30, // More wandering range
        depth: 0.5 + Math.random() * 1.5,
        isDragging: false
      };

      bag.on(node, "pointerdown", (e) => {
        e.preventDefault();
        d.isDragging = true;
        node.setPointerCapture(e.pointerId);
        const rect = universe.getBoundingClientRect();
        dragOffset.x = d.x - (e.clientX - rect.left);
        dragOffset.y = d.y - (e.clientY - rect.top);
      });

      bag.on(node, "pointermove", (e) => {
        if (d.isDragging) {
          const rect = universe.getBoundingClientRect();
          const targetX = (e.clientX - rect.left) + dragOffset.x;
          const targetY = (e.clientY - rect.top) + dragOffset.y;
          d.vx = (targetX - d.x) * 0.8;
          d.vy = (targetY - d.y) * 0.8;
          d.x = targetX;
          d.y = targetY;
        }
      });

      const onRelease = () => {
        if (d.isDragging) {
          d.isDragging = false;
          const rect = universe.getBoundingClientRect();
          d.baseX = (d.x / rect.width) * 100;
          d.baseY = (d.y / rect.height) * 100;
        }
      };
      bag.on(node, "pointerup", onRelease);
      bag.on(node, "pointercancel", onRelease);

      data.push(d);
    });

    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;

    bag.on(universe, "mousemove", (e) => {
      const rect = universe.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
      targetMouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
    });

    bag.on(universe, "mouseleave", () => {
      targetMouseX = 0; targetMouseY = 0;
    });

    function resolveCollisions() {
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          const a = data[i], b = data[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MIN_DIST && distance > 0) {
            const overlap = MIN_DIST - distance;
            const nx = dx / distance, ny = dy / distance;

            // 1. SOFT RELAXATION (Position)
            const relaxation = overlap * 0.08; // Even softer
            const rx = nx * relaxation, ry = ny * relaxation;
            if (!a.isDragging) { a.x -= rx * 0.5; a.y -= ry * 0.5; }
            if (!b.isDragging) { b.x += rx * 0.5; b.y += ry * 0.5; }

            // 2. SILK DEFLECTION (Force-based)
            const force = overlap * 0.04;
            if (!a.isDragging) { a.vx -= nx * force; a.vy -= ny * force; }
            if (!b.isDragging) { b.vx += nx * force; b.vy += ny * force; }

            // 3. ENHANCED TANGENTIAL GLIDE (Beautiful sliding)
            const tx = -ny, ty = nx;
            const relativeVelocityT = (a.vx * tx + a.vy * ty) - (b.vx * tx + b.vy * ty);
            const glide = relativeVelocityT * 0.15; // Increased for 'slide-off' feel
            if (!a.isDragging) { a.vx -= tx * glide; a.vy -= ty * glide; }
            if (!b.isDragging) { b.vx += tx * glide; b.vy += ty * glide; }

            // Subtle friction during contact for calm feel
            if (!a.isDragging) { a.vx *= 0.99; a.vy *= 0.99; }
            if (!b.isDragging) { b.vx *= 0.99; b.vy *= 0.99; }
          }
        }
      }
    }

    let running = true;
    let rafId = 0;
    function animate() {
      if (!running) return;
      // NO ANIMATION ON MOBILE: skip the physics work to save resources, but keep
      // the loop alive (cheap width check per frame) so it resumes if the viewport
      // grows back above 768px. Returning outright used to freeze it permanently.
      if (window.innerWidth <= 768) { rafId = requestAnimationFrame(animate); return; }

      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      const rect = universe.getBoundingClientRect();
      const w = rect.width, h = rect.height;

      data.forEach((d) => {
        if (d.isDragging) return;

        // 1. SILK DRIFT: Oscillation + Mouse Parallax
        d.phaseX += d.speedX; d.phaseY += d.speedY;
        const ox = Math.sin(d.phaseX) * d.amplitude;
        const oy = Math.cos(d.phaseY) * d.amplitude;
        const px = mouseX * 60 * d.depth;
        const py = mouseY * 60 * d.depth;

        // 2. SOFT HOME-SEEKING: Low-stiffness spring to avoid wiggling
        const hx = (d.baseX / 100) * w, hy = (d.baseY / 100) * h;
        const homeForce = 0.025; // Gentler seeking
        d.vx += (hx + ox + px - d.x) * homeForce;
        d.vy += (hy + oy + py - d.y) * homeForce;

        // 3. MOTION GUARANTEE: Keep them moving moderately
        const minSpeed = 1.2;
        const speed = Math.hypot(d.vx, d.vy);
        if (speed < minSpeed) {
          d.vx += (Math.random() - 0.5) * 0.2;
          d.vy += (Math.random() - 0.5) * 0.2;
        }

        d.vx *= FRICTION; d.vy *= FRICTION;
        d.x += d.vx; d.y += d.vy;

        // 4. TEXT-SAFE SOFT BOUNDARY (Asymmetric)
        const padX = 140; // Labels are 140px wide
        const padYTop = 80;
        const padYBot = 160; // Labels hang below node
        const ef = 0.08;

        // Left Repulsion
        if (d.x < padX) d.vx += (padX - d.x) * ef;
        // Right Repulsion
        if (d.x > w - padX) d.vx -= (d.x - (w - padX)) * ef;
        // Top Repulsion
        if (d.y < padYTop) d.vy += (padYTop - d.y) * ef;
        // Bottom Repulsion
        if (d.y > h - padYBot) d.vy -= (d.y - (h - padYBot)) * ef;

        // Final hard-wall safety (Large enough to keep text in)
        const safeX = 100;
        const safeYTop = 40;
        const safeYBot = 110;
        if (d.x < safeX) { d.x = safeX; d.vx *= 0.5; }
        if (d.x > w - safeX) { d.x = w - safeX; d.vx *= 0.5; }
        if (d.y < safeYTop) { d.y = safeYTop; d.vy *= 0.5; }
        if (d.y > h - safeYBot) { d.y = h - safeYBot; d.vy *= 0.5; }
      });

      resolveCollisions();
      data.forEach((d) => { d.el.style.transform = "translate3d(" + d.x + "px, " + d.y + "px, 0)"; });
      rafId = requestAnimationFrame(animate);
    }
    animate();
    bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  })();

  /* ══════════ B2. MOBILE MENU (inline #2) ══════════ */
  (function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuCloseMob = document.getElementById("menu-close-mobile");
    const menuLinks = document.querySelectorAll(".mobile-menu-link");
    if (!menuBtn || !mobileMenu) return;
    let ignoreBackdropClickUntil = 0;
    let closeTimer = null;

    const currentPage = document.body.dataset.page || "experience";
    menuLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.page === currentPage);
    });

    // Ensure menu starts closed even if the browser restores a cached page state.
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    if (menuCloseMob) menuCloseMob.classList.remove("visible");
    document.body.classList.remove("menu-open");
    menuLinks.forEach((link) => {
      link.style.animation = "";
      link.style.opacity = "";
      link.style.transform = "";
      link.style.filter = "";
    });

    let injectedStyle = null;
    if (!document.getElementById("mobile-menu-keyframes")) {
      const style = document.createElement("style");
      style.id = "mobile-menu-keyframes";
      style.textContent = `
        @keyframes mobileMenuPop {
          0%   { opacity:0; transform:scale(0.2); filter:blur(12px); }
          50%  { opacity:1; transform:scale(1.08); filter:blur(0px); }
          70%  { transform:scale(0.97); }
          85%  { transform:scale(1.02); }
          100% { opacity:1; transform:scale(1); filter:blur(0px); }
        }
        @keyframes mobileMenuShrink {
          0%   { opacity:1; transform:scale(1);   filter:blur(0px); }
          15%  { transform:scale(1.03); }
          30%  { transform:scale(0.96); }
          100% { opacity:0; transform:scale(0.2); filter:blur(12px); }
        }
      `;
      document.head.appendChild(style);
      injectedStyle = style;
    }

    function openMobileMenu() {
      ignoreBackdropClickUntil = Date.now() + 450;
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      mobileMenu.classList.add("open");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileMenu.style.pointerEvents = "none";
      requestAnimationFrame(() => {
        mobileMenu.style.pointerEvents = "";
      });
      menuBtn.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      if (menuCloseMob) menuCloseMob.classList.add("visible");
      document.body.classList.add("menu-open");

      menuLinks.forEach((link, i) => {
        link.style.animation = "none";
        link.style.opacity = "0";
        link.style.transform = "scale(0.2)";
        link.style.filter = "blur(12px)";
        void link.offsetWidth;
        link.style.animation = `mobileMenuPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09 + 0.04}s forwards`;
      });
    }

    function closeMobileMenu() {
      if (!mobileMenu.classList.contains("open")) return;
      if (closeTimer) clearTimeout(closeTimer);

      const total = menuLinks.length;
      menuLinks.forEach((link, i) => {
        link.style.animation = "none";
        void link.offsetWidth;
        link.style.animation = `mobileMenuShrink 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s forwards`;
      });

      const closeDur = (total - 1) * 70 + 500;
      closeTimer = setTimeout(() => {
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
        menuBtn.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        if (menuCloseMob) menuCloseMob.classList.remove("visible");
        document.body.classList.remove("menu-open");
        closeTimer = null;
      }, closeDur - 150);
    }

    bag.on(menuBtn, "click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.contains("open")
        ? closeMobileMenu()
        : openMobileMenu();
    });

    if (menuCloseMob) {
      bag.on(menuCloseMob, "click", (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    bag.on(mobileMenu, "click", (e) => {
      if (e.target !== mobileMenu) return;
      if (Date.now() < ignoreBackdropClickUntil) return;
      closeMobileMenu();
    });

    bag.on(document, "keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open"))
        closeMobileMenu();
    });

    bag.add(() => {
      if (closeTimer) clearTimeout(closeTimer);
      document.body.classList.remove("menu-open");
      if (injectedStyle) injectedStyle.remove();
    });
  })();

  /* ══════════ B3. SCROLL-REVEAL OBSERVER (inline #2) ══════════ */
  (function () {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(e.target.dataset.visClass || "tl-vis");
            // Trigger skill bars
            if (e.target.classList.contains("skill-panel")) {
              e.target
                .querySelectorAll(".sp-bar-fill")
                .forEach((b) => b.classList.add("bar-animate"));
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".exp-section-heading").forEach((el) => {
      el.dataset.visClass = "eh-vis";
      io.observe(el);
    });
    document.querySelectorAll(".skill-panel").forEach((el) => {
      el.dataset.visClass = "sk-vis";
      io.observe(el);
    });
    document.querySelectorAll(".edu-entry").forEach((el) => {
      el.dataset.visClass = "edu-vis";
      io.observe(el);
    });
    document.querySelectorAll(".cert-card").forEach((el) => {
      el.dataset.visClass = "cert-vis";
      io.observe(el);
    });
    document.querySelectorAll(".vol-card").forEach((el) => {
      el.dataset.visClass = "vol-vis";
      io.observe(el);
    });
    bag.add(() => io.disconnect());
  })();

  /* ══════════ B4. TESTIMONIALS SLIDER (inline #2) ══════════ */
  (function () {
    const DURATION = 7000;
    const N = document.querySelectorAll(".testi-slide").length;
    let current = 0;
    let timer = null;
    let wordTimers = [];
    const timeouts = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

    const slides = document.querySelectorAll(".testi-slide");
    const avs = document.querySelectorAll(".testi-avatar-thumb");
    const curEl = document.getElementById("testi-cur");
    const prog = document.getElementById("testi-prog");
    const shell = document.getElementById("testi-shell");
    if (!slides.length || !curEl || !prog) return;

    function pad(n) {
      return String(n + 1).padStart(2, "0");
    }

    function prepareQuote(slide) {
      const p = slide.querySelector(".testi-quote");
      if (!p || p.dataset.wrapped) return;
      const tokens = p.innerText.split(/(\s+)/);
      p.innerHTML = tokens
        .map((token) => {
          if (/^\s+$/.test(token)) return token;
          return '<span class="tq-word">' + token + "</span>";
        })
        .join("");
      p.dataset.wrapped = "1";
    }

    function cancelWordTimers() {
      wordTimers.forEach((t) => clearTimeout(t));
      wordTimers = [];
    }

    function resetWords(slide) {
      slide.querySelectorAll(".tq-word").forEach((w) => {
        w.classList.remove("tq-vis");
      });
    }

    function animateWords(slide) {
      cancelWordTimers();
      const words = slide.querySelectorAll(".tq-word");
      const stagger = Math.min(30, 2000 / Math.max(words.length, 1));
      words.forEach((w, i) => {
        const delay = 120 + i * stagger;
        w.style.setProperty("--wd", delay + "ms");
        wordTimers.push(
          setTimeout(() => {
            w.classList.add("tq-vis");
          }, delay),
        );
      });
    }

    function resetProgressBar() {
      prog.classList.remove("run-anim");
      void prog.offsetWidth; // Force reflow
      prog.classList.add("run-anim");
    }

    function showSlide(idx) {
      const prev = current;
      current = ((idx % N) + N) % N;

      prepareQuote(slides[current]);
      resetWords(slides[prev]);
      cancelWordTimers();

      slides[prev].classList.remove("active");
      slides[prev].classList.add("exit");
      later(() => {
        slides[prev].classList.remove("exit");
      }, 600);

      slides[current].classList.add("active");
      animateWords(slides[current]);

      curEl.style.opacity = "0";
      later(() => {
        curEl.textContent = pad(current);
        curEl.style.opacity = "1";
      }, 180);

      avs.forEach((a, i) => {
        a.classList.toggle("current-av", i === current);
      });

      resetProgressBar();
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => {
        showSlide(current + 1);
      }, DURATION);
    }

    const pBtn = document.getElementById("testi-prev");
    const nBtn = document.getElementById("testi-next");
    if (pBtn) {
      bag.on(pBtn, "click", (e) => {
        e.stopPropagation();
        showSlide(current - 1);
        startAuto();
      });
    }
    if (nBtn) {
      bag.on(nBtn, "click", (e) => {
        e.stopPropagation();
        showSlide(current + 1);
        startAuto();
      });
    }

    avs.forEach((av, i) => {
      bag.on(av, "click", () => {
        showSlide(i);
        startAuto();
      });
    });

    // Boot
    prepareQuote(slides[0]);
    slides[0].classList.add("active");
    animateWords(slides[0]);
    startAuto();
    resetProgressBar();

    bag.add(() => {
      clearInterval(timer);
      wordTimers.forEach(clearTimeout);
      timeouts.forEach(clearTimeout);
    });
  })();

  /* ══════════ B5. TIMELINE SPINE ANIMATIONS (inline #2) ══════════ */
  (function () {
    const tlTimeouts = [];

    function initTimelineAnimations() {
      const timelines = document.querySelectorAll('.timeline');

      timelines.forEach((timeline, index) => {
        let existingSvg = timeline.querySelector('.spine-svg');
        if (existingSvg) existingSvg.remove();
        if (timeline._animData && timeline._animData.animId) {
          cancelAnimationFrame(timeline._animData.animId);
        }
        if (timeline._animData && timeline._animData.observer) {
          timeline._animData.observer.disconnect();
        }

        const prevDrawY = timeline._animData ? timeline._animData.currentDrawY : 0;
        const prevTargetY = timeline._animData ? timeline._animData.targetDrawY : 0;
        const prevMap = timeline._animData ? timeline._animData.activatedMap : null;

        const clipId = `spine-clip-${index}`;
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("spine-svg");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.zIndex = "1";
        svg.style.pointerEvents = "none";

        svg.innerHTML = `
            <defs>
                <clipPath id="${clipId}">
                    <rect class="clip-rect" x="-50%" y="0" width="200%" height="0" />
                </clipPath>
                <linearGradient id="spine-grad-${index}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(140, 80, 255, 0)" />
                    <stop offset="15%" stop-color="rgba(255, 60, 150, 0.7)" />
                    <stop offset="35%" stop-color="rgba(140, 80, 255, 0.7)" />
                    <stop offset="65%" stop-color="rgba(255, 140, 60, 0.7)" />
                    <stop offset="85%" stop-color="rgba(140, 80, 255, 0.7)" />
                    <stop offset="100%" stop-color="rgba(140, 80, 255, 0)" />
                </linearGradient>
                <filter id="spine-glow-${index}" x="-50%" y="-10%" width="200%" height="120%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path class="spine-path" fill="none" stroke="url(#spine-grad-${index})" stroke-width="2.5" filter="url(#spine-glow-${index})" clip-path="url(#${clipId})" />
        `;
        timeline.insertBefore(svg, timeline.firstChild);

        const nodes = timeline.querySelectorAll('.tl-node');
        const items = timeline.querySelectorAll('.tl-item');
        if (nodes.length === 0) return;

        let pathStr = "";
        const timelineRect = timeline.getBoundingClientRect();
        const centerX = timelineRect.width / 2;

        let points = [];
        nodes.forEach((node) => {
          const nodeRect = node.getBoundingClientRect();
          const x = nodeRect.left - timelineRect.left + nodeRect.width / 2;
          const y = nodeRect.top - timelineRect.top + nodeRect.height / 2;
          points.push({ x, y });
        });

        if (points.length > 0) {
          const isMobile = window.innerWidth <= 900;
          const topAnchorX = isMobile ? points[0].x : centerX;
          const bottomAnchorX = isMobile ? points[points.length - 1].x : centerX;

          pathStr += `M ${topAnchorX}, 0 `;
          let cpY = points[0].y * 0.4;
          pathStr += `C ${topAnchorX}, ${cpY}, ${points[0].x}, ${cpY}, ${points[0].x}, ${points[0].y} `;

          for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const distY = next.y - current.y;
            pathStr += `C ${current.x}, ${current.y + distY / 2}, ${next.x}, ${next.y - distY / 2}, ${next.x}, ${next.y} `;
          }

          const lastPoint = points[points.length - 1];
          const remainingY = timelineRect.height - lastPoint.y;
          pathStr += `C ${lastPoint.x}, ${lastPoint.y + remainingY / 2}, ${bottomAnchorX}, ${lastPoint.y + remainingY / 2}, ${bottomAnchorX}, ${timelineRect.height} `;

          svg.querySelector('.spine-path').setAttribute('d', pathStr);
        }

        timeline._animData = {
          rect: timelineRect,
          points: points,
          clipRect: svg.querySelector('.clip-rect'),
          items: Array.from(items),
          currentDrawY: prevDrawY,
          targetDrawY: prevTargetY,
          activatedMap: prevMap || new Array(points.length).fill(false)
        };

        // Guarantee first two connected natively on desktop view initialization
        if (!prevMap) {
          if (points.length > 1 && window.innerWidth > 900) {
            timeline._animData.targetDrawY = points[1].y + 150;
          } else if (points.length > 0) {
            timeline._animData.targetDrawY = points[0].y + 150;
          }
        }

        // Dynamically increment target depth when user scrolls deeper
        const observer = new IntersectionObserver((entries) => {
          let maxTarget = timeline._animData.targetDrawY;
          let changed = false;
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = timeline._animData.items.indexOf(entry.target);
              if (idx !== -1) {
                let proposed = timeline._animData.points[idx].y + 160;
                if (idx === timeline._animData.points.length - 1) {
                  proposed = timeline._animData.rect.height; // Complete to the bottom entirely
                }
                if (proposed > maxTarget) {
                  maxTarget = proposed;
                  changed = true;
                }
              }
            }
          });
          if (changed) timeline._animData.targetDrawY = maxTarget;
        }, { threshold: 0.05 });

        timeline._animData.items.forEach(item => observer.observe(item));
        timeline._animData.observer = observer;

        // Fluid render loop
        function animate() {
          const data = timeline._animData;
          const diff = data.targetDrawY - data.currentDrawY;

          // A much smaller multiplier gives a slower, magical ease-out filling animation
          data.currentDrawY += diff * 0.012;

          if (Math.abs(diff) < 0.5) data.currentDrawY = data.targetDrawY;
          if (data.clipRect) data.clipRect.setAttribute('height', Math.max(0, data.currentDrawY));

          data.points.forEach((point, i) => {
            if (!data.activatedMap[i] && data.currentDrawY >= point.y - 12) {
              data.activatedMap[i] = true;
              data.items[i].classList.add('tl-vis');
            }
          });

          data.animId = requestAnimationFrame(animate);
        }
        animate();
      });
    }

    bag.on(window, 'resize', () => { tlTimeouts.push(setTimeout(initTimelineAnimations, 50)); });
    bag.on(window, 'load', initTimelineAnimations);
    tlTimeouts.push(setTimeout(initTimelineAnimations, 150));

    bag.add(() => {
      tlTimeouts.forEach(clearTimeout);
      document.querySelectorAll('.timeline').forEach((timeline) => {
        if (timeline._animData) {
          if (timeline._animData.animId) cancelAnimationFrame(timeline._animData.animId);
          if (timeline._animData.observer) timeline._animData.observer.disconnect();
          timeline._animData = null;
        }
        const svg = timeline.querySelector('.spine-svg');
        if (svg) svg.remove();
      });
    });
  })();

  /* ══════════ B6. CUSTOM CERT SCROLLBAR (inline #2) ══════════ */
  (function () {
    const grid = document.getElementById('cert-grid');
    const thumb = document.getElementById('cert-sb-thumb');
    const track = document.getElementById('cert-sb-track');
    if (!grid || !thumb || !track) return;

    let isDragging = false, startY = 0, startScrollTop = 0;

    function updateThumb() {
      const trackH = track.clientHeight;
      const ratio = grid.clientHeight / grid.scrollHeight;
      const thumbH = Math.max(ratio * trackH, 40);
      const maxScroll = grid.scrollHeight - grid.clientHeight;
      const maxTop = trackH - thumbH;
      const top = maxScroll > 0 ? (grid.scrollTop / maxScroll) * maxTop : 0;
      thumb.style.height = thumbH + 'px';
      thumb.style.top = top + 'px';
    }

    bag.on(grid, 'scroll', updateThumb);
    bag.on(window, 'resize', updateThumb);
    updateThumb();

    /* ── Drag the thumb ── */
    bag.on(thumb, 'mousedown', function (e) {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = grid.scrollTop;
      thumb.classList.add('is-dragging');
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    bag.on(document, 'mousemove', function (e) {
      if (!isDragging) return;
      const trackH = track.clientHeight;
      const thumbH = thumb.clientHeight;
      const maxTop = trackH - thumbH;
      const delta = e.clientY - startY;
      const scrollRatio = maxTop > 0
        ? (grid.scrollHeight - grid.clientHeight) / maxTop
        : 0;
      grid.scrollTop = startScrollTop + delta * scrollRatio;
    });

    bag.on(document, 'mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      thumb.classList.remove('is-dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });

    /* --- Click on track to jump --- */
    bag.on(track, 'click', function (e) {
      if (e.target === thumb || thumb.contains(e.target)) return;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const ratio = clickY / track.clientHeight;
      grid.scrollTop = ratio * grid.scrollHeight;
    });

    bag.add(() => { document.body.style.cursor = ''; document.body.style.userSelect = ''; });
  })();

  /* ══════════ C. CERTIFICATION REDIRECT MODAL (inline #3) ══════════ */
  (function () {
    const overlay = document.getElementById('cert-prompt-overlay');
    const cancelBtn = document.getElementById('modal-cancel');
    const confirmBtn = document.getElementById('modal-confirm');
    const cards = document.querySelectorAll('.cert-card');
    const modalLogo = document.getElementById('modal-logo');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    let pendingUrl = '';

    if (!overlay || !cancelBtn || !confirmBtn) return;

    const closeModal = () => {
      overlay.classList.remove('active');
      pendingUrl = '';
    };

    cards.forEach(card => {
      bag.on(card, 'click', (e) => {
        const url = card.getAttribute('data-url');
        if (url && url !== '#') {
          pendingUrl = url;

          const name = card.querySelector('.cert-name')?.textContent || '';
          const issuer = card.querySelector('.cert-issuer')?.textContent || '';
          const logoImg = card.querySelector('.cert-logo-img');

          modalTitle.textContent = name;
          modalIssuer.textContent = issuer;

          if (logoImg && logoImg.style.display !== 'none') {
            modalLogo.src = logoImg.src;
            modalLogo.style.display = 'inline-block';
          } else {
            // img hidden due to load error - fall back to initials
            modalLogo.style.display = 'none';
          }

          overlay.classList.add('active');
        }
      });
    });

    bag.on(cancelBtn, 'click', (e) => {
      e.stopPropagation();
      closeModal();
    });

    bag.on(confirmBtn, 'click', (e) => {
      e.stopPropagation();
      if (pendingUrl) {
        window.open(pendingUrl, '_blank', 'noopener');
      }
      closeModal();
    });

    bag.on(overlay, 'click', (e) => {
      if (e.target === overlay) closeModal();
    });

    bag.add(() => { overlay.classList.remove('active'); });
  })();

  return () => bag.dispose();
}
