// @ts-nocheck
/* ════════════════════════════════════════
   about.ts - About page engine: testimonial carousel, space bg, preloader,
   liquid cursor + SFX, ambient audio, mobile menu, logo ticker, bio canvas,
   scroll-reveal + count-ups, gaming reveal, CV modal, redirect-prompt modal.
   (faithful port of styles/about/about.js + about.html inline CV-modal script)
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { initPreloaderFx } from './preloader-fx';
import { initSpaceField3D } from './space-field';
import { wireAmbientControls } from './ambient-audio';

export function initAbout(): () => void {
  const bag = makeBag();
  const basePath = '/'; // assets live at the site root under Next.js public/

  /* ══════════ 1. TESTIMONIAL CAROUSEL (+ word reveal) ══════════ */
  (function () {
    const DURATION = 7000;
    const N = 9;
    let current = 0;
    let timer = null;
    let wordTimers: any[] = [];
    const timeouts: any[] = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

    const slides = document.querySelectorAll('.testi-slide');
    const dots = document.querySelectorAll('.testi-dot');
    const avs = document.querySelectorAll('.testi-avatar-thumb');
    const curEl = document.getElementById('testi-cur');
    const prog = document.getElementById('testi-prog');
    const shell = document.getElementById('testi-shell');
    if (!shell || !slides.length || !curEl || !prog) return;

    function pad(n) { return String(n + 1).padStart(2, '0'); }

    function prepareQuote(slide) {
      const p = slide.querySelector('.testi-quote');
      if (!p || p.dataset.wrapped) return;
      const tokens = p.innerText.split(/(\s+)/);
      p.innerHTML = tokens.map(function (token) {
        if (/^\s+$/.test(token)) return token;
        return '<span class="tq-word">' + token + '</span>';
      }).join('');
      p.dataset.wrapped = '1';
    }

    function cancelWordTimers() { wordTimers.forEach(t => clearTimeout(t)); wordTimers = []; }

    function resetWords(slide) {
      slide.querySelectorAll('.tq-word').forEach(w => w.classList.remove('tq-vis'));
    }

    function animateWords(slide) {
      cancelWordTimers();
      const words = slide.querySelectorAll('.tq-word');
      const stagger = Math.min(30, 2000 / Math.max(words.length, 1));
      words.forEach((w, i) => {
        const delay = 120 + i * stagger;
        w.style.setProperty('--wd', delay + 'ms');
        wordTimers.push(setTimeout(() => { w.classList.add('tq-vis'); }, delay));
      });
    }

    function showSlide(idx) {
      const prev = current;
      current = ((idx % N) + N) % N;

      prepareQuote(slides[current]);
      resetWords(slides[prev]);
      cancelWordTimers();

      slides[prev].classList.remove('active');
      slides[prev].classList.add('exit');
      later(() => { slides[prev].classList.remove('exit'); }, 600);

      slides[current].classList.add('active');
      animateWords(slides[current]);

      curEl.style.opacity = '0';
      later(() => { curEl.textContent = pad(current); curEl.style.opacity = '1'; }, 180);

      avs.forEach((a, i) => a.classList.toggle('current-av', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));

      prog.style.transition = 'none';
      prog.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          prog.style.transition = 'width ' + DURATION + 'ms linear';
          prog.style.width = '100%';
        });
      });
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => { showSlide(current + 1); }, DURATION);
      prog.style.transition = 'width ' + DURATION + 'ms linear';
      prog.style.width = '100%';
    }

    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    if (prevBtn) bag.on(prevBtn, 'click', e => { e.stopPropagation(); showSlide(current - 1); startAuto(); });
    if (nextBtn) bag.on(nextBtn, 'click', e => { e.stopPropagation(); showSlide(current + 1); startAuto(); });

    dots.forEach((dot, i) => bag.on(dot, 'click', () => { showSlide(i); startAuto(); }));
    avs.forEach((av, i) => bag.on(av, 'click', () => { showSlide(i); startAuto(); }));

    // Boot
    prepareQuote(slides[0]);
    slides[0].classList.add('active');
    animateWords(slides[0]);
    startAuto();

    bag.add(() => { clearInterval(timer); cancelWordTimers(); timeouts.forEach(clearTimeout); });
  })();

  /* ══════════ 2. SPACE BACKGROUND (AURORA + STARS + SHOOTERS) ══════════ */
  (function () {
    // WebGL field first; the 2D starfield below is the no-WebGL fallback.
    if (initSpaceField3D(bag)) return;
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
      if (shooters.length >= 6) return;
      const a = (Math.random() * 30 + 10) * Math.PI / 180, sp = Math.random() * 5 + 4;
      shooters.push({
        x: Math.random() * W, y: Math.random() * H * 0.4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        len: Math.random() * 100 + 50, alpha: 1, decay: Math.random() * 0.014 + 0.009
      });
    }
    const shooterInterval = setInterval(() => { if (!document.hidden && Math.random() < 0.35) spawnShooter(); }, 3000);

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

    bag.on(document, 'visibilitychange', () => {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; lt = performance.now(); rafId = requestAnimationFrame(draw); }
    });
    bag.add(() => { running = false; cancelAnimationFrame(rafId); clearInterval(shooterInterval); });
  })();

  /* ══════════ 3. PRELOADER (water-fill logo) ══════════ */
  (function () {
    const preloader = document.getElementById('preloader');
    initPreloaderFx(bag);
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
    const logoImg = new Image(); let logoReady = false;
    let rafId = 0, alive = true;
    const timeouts: any[] = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    const starsContainer = document.getElementById('preloader-stars');
    const createdStars: HTMLElement[] = [];
    if (starsContainer) {
      for (let i = 0; i < 34; i++) {
        const star = document.createElement('div');
        star.className = 'preloader-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = 0.8 + Math.pow(Math.random(), 2) * 1.5;
        star.style.width = `${size}px`; star.style.height = `${size}px`;
        star.style.setProperty('--star-opacity', 0.18 + Math.random() * 0.3);
        star.style.animation = `star-twinkle ${3.5 + Math.random() * 4.5}s infinite ${Math.random() * 6}s ease-in-out`;
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

      if (raw < 1) { rafId = requestAnimationFrame(drawFrame); }
      else {
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

  /* ══════════ 4. LIQUID CURSOR, AMBIENT AUDIO, SFX & MOBILE MENU ══════════ */
  (function () {
    /* ── Liquid cursor ── */
    const cursorCanvas = document.getElementById('cursor-canvas');
    if (cursorCanvas) {
      const cCtx = cursorCanvas.getContext('2d');
      let W, H;
      function resize() { W = cursorCanvas.width = window.innerWidth; H = cursorCanvas.height = window.innerHeight; }
      resize(); bag.on(window, 'resize', resize);

      let mX = -300, mY = -300, rX = -300, rY = -300, currentR = 26, targetR = 26;
      const R_NORMAL = 26, R_HOVER = 36;
      let cursorRunning = true;
      let cursorRaf = 0;

      function drawCursor() {
        if (!cursorRunning) return;
        cCtx.clearRect(0, 0, W, H);
        if (W <= 900) { cursorRaf = requestAnimationFrame(drawCursor); return; }

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
      cursorRaf = requestAnimationFrame(drawCursor);
      bag.on(document, 'mousemove', e => { mX = e.clientX; mY = e.clientY; });
      bag.on(document, 'mouseleave', () => { mX = -300; mY = -300; });
      document.querySelectorAll('a,button,.nav-link,.nav-cta,.skill-tag,.stat-pill,.about-block').forEach(el => {
        bag.on(el, 'mouseenter', () => { targetR = R_HOVER; });
        bag.on(el, 'mouseleave', () => { targetR = R_NORMAL; });
      });
      bag.on(document, 'visibilitychange', () => {
        if (document.hidden) { cursorRunning = false; }
        else if (!cursorRunning) { cursorRunning = true; cursorRaf = requestAnimationFrame(drawCursor); }
      });
      bag.add(() => { cursorRunning = false; cancelAnimationFrame(cursorRaf); });
    }

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
    bag.on(document, 'visibilitychange', () => {
      if (document.hidden) { specRunning = false; }
      else if (!specRunning) { specRunning = true; lastSpec = performance.now(); specRaf = requestAnimationFrame(drawSpectrum); }
    });

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
    bag.on(document, 'click', e => { playClick(false); spawnParticles(e.clientX, e.clientY); });

    /* ── Mobile menu toggle ── */
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuCloseMob = document.getElementById('menu-close-mobile');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    const currentPage = document.body.dataset.page || 'about';
    menuLinks.forEach(link => { link.classList.toggle('active', link.dataset.page === currentPage); });

    let injectedStyle = null;
    if (!document.getElementById('mobile-menu-keyframes')) {
      const style = document.createElement('style');
      style.id = 'mobile-menu-keyframes';
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

    const menuTimeouts: any[] = [];

    function openMobileMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuBtn.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (menuCloseMob) menuCloseMob.classList.add('visible');
      document.body.classList.add('menu-open');

      menuLinks.forEach((link, i) => {
        link.style.animation = 'none';
        link.style.opacity = '0';
        link.style.transform = 'scale(0.2)';
        link.style.filter = 'blur(12px)';
        void link.offsetWidth;
        link.style.animation = `mobileMenuPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09 + 0.04}s forwards`;
      });
    }

    function closeMobileMenu() {
      const total = menuLinks.length;
      menuLinks.forEach((link, i) => {
        link.style.animation = 'none';
        void link.offsetWidth;
        link.style.animation = `mobileMenuShrink 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s forwards`;
      });

      const closeDur = (total - 1) * 70 + 500;
      const id = setTimeout(() => {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuBtn.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (menuCloseMob) menuCloseMob.classList.remove('visible');
        document.body.classList.remove('menu-open');
      }, closeDur - 150);
      menuTimeouts.push(id);
    }

    if (menuBtn && mobileMenu) {
      bag.on(menuBtn, 'click', e => {
        e.stopPropagation();
        mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
      });
      if (menuCloseMob) bag.on(menuCloseMob, 'click', e => { e.stopPropagation(); closeMobileMenu(); });
      bag.on(mobileMenu, 'click', e => { if (e.target === mobileMenu) closeMobileMenu(); });
      bag.on(document, 'keydown', e => { if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu(); });
    }

    bag.add(() => {
      specRunning = false; cancelAnimationFrame(specRaf);
      try { if (audioCtx) audioCtx.close(); } catch { }
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
      menuTimeouts.forEach(clearTimeout);
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      if (injectedStyle) injectedStyle.remove();
    });
  })();

  /* CV modal is controlled by AboutClient React state. */

  /* ══════════ 6. LOGO TICKER ══════════ */
  (function () {
    const inner = document.getElementById('logo-ticker-inner');
    const setA = document.getElementById('ticker-set-a');
    if (!inner || !setA) return;

    const PX_PER_SEC = 70;
    let setWidth = 0;
    let offset = 0;
    let last = null;
    let rafId = 0;
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
      if (offset >= setWidth) offset -= setWidth;
      inner.style.transform = `translateX(-${offset}px)`;
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      measure();
      if (!rafId) rafId = requestAnimationFrame(frame);
    }

    if (document.readyState === 'complete') start();
    else bag.on(window, 'load', start);

    bag.on(window, 'resize', measure);
    bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  })();

  /* ══════════ 7. BIO REVEAL + BIO CANVAS ══════════ */
  (function () {
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

    const canvas = document.getElementById('bio-canvas');
    if (!canvas) { bag.add(() => { if (revealObs) revealObs.disconnect(); }); return; }
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
      hue: Math.random() < 0.6 ? 200 : 260, alpha: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2, phaseSpd: 0.002 + Math.random() * 0.003,
    }));

    const PARTICLES = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.5 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.00008, vy: -0.00004 - Math.random() * 0.00006,
      alpha: 0.2 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2,
      phaseSpd: 0.01 + Math.random() * 0.015,
    }));

    let bioRaf = 0;
    let alive = true;
    function drawBio(ts) {
      if (!alive) return;
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
        if (!bioRaf) bioRaf = requestAnimationFrame(drawBio);
      } else {
        cancelAnimationFrame(bioRaf);
        bioRaf = 0;
      }
    }, { threshold: 0 });
    canvasObs.observe(bioSection);

    bag.add(() => {
      alive = false;
      cancelAnimationFrame(bioRaf);
      if (revealObs) revealObs.disconnect();
      canvasObs.disconnect();
    });
  })();

  /* ══════════ 8. SCROLL REVEAL + COUNT-UPS ══════════ */
  (function () {
    const observers: IntersectionObserver[] = [];
    const timeouts: any[] = [];
    let alive = true;

    const showAll = function () {
      document.querySelectorAll('.about-grid, .about-block, .techstack-heading, .stack-panel, .snode')
        .forEach(el => el.classList.add('sr-vis'));
    };

    if (!('IntersectionObserver' in window)) { showAll(); return; }

    const opts = { threshold: 0.07, rootMargin: '0px 0px -30px 0px' };

    const gridObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-vis'); gridObs.unobserve(e.target); } });
    }, opts);
    document.querySelectorAll('.about-grid').forEach(el => gridObs.observe(el));
    observers.push(gridObs);

    const blockObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-vis'); blockObs.unobserve(e.target); } });
    }, opts);
    document.querySelectorAll('.about-block').forEach((el, i) => { el.style.setProperty('--sr-delay', (i * 0.12) + 's'); blockObs.observe(el); });
    observers.push(blockObs);

    const headObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-vis'); headObs.unobserve(e.target); } });
    }, opts);
    document.querySelectorAll('.techstack-heading').forEach(el => headObs.observe(el));
    observers.push(headObs);

    const panelObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-vis'); panelObs.unobserve(e.target); } });
    }, opts);
    document.querySelectorAll('.stack-panel').forEach((el, i) => { el.style.setProperty('--sr-delay', (i * 0.1) + 's'); panelObs.observe(el); });
    observers.push(panelObs);

    const snodeObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-vis'); snodeObs.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
    document.querySelectorAll('.snode').forEach((el, i) => { el.style.setProperty('--sr-delay', ((i % 9) * 0.06) + 's'); snodeObs.observe(el); });
    observers.push(snodeObs);

    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const item = e.target;
        item.classList.add('sr-vis');
        const numEl = item.querySelector('.stat-number, .ufo-stat-number');
        if (!numEl) { statObs.unobserve(item); return; }
        const target = parseInt(numEl.getAttribute('data-target'), 10);
        const duration = 1400;
        let start = null;
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const delay = parseFloat(item.style.getPropertyValue('--sr-delay') || '0') * 1000;
        timeouts.push(setTimeout(() => {
          requestAnimationFrame(function step(ts) {
            if (!alive) return;
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            numEl.textContent = Math.floor(easeOut(progress) * target);
            if (progress < 1) requestAnimationFrame(step);
            else numEl.textContent = target;
          });
        }, delay));
        statObs.unobserve(item);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stat-item').forEach(el => { el.classList.remove('sr-vis'); statObs.observe(el); });
    observers.push(statObs);

    const pillarObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const pillar = e.target;
        pillar.classList.add('pillar-vis');
        const numEl = pillar.querySelector('.pillar-number');
        if (!numEl) { pillarObs.unobserve(pillar); return; }
        const target = parseInt(numEl.getAttribute('data-target'), 10);
        const duration = 1600;
        let start = null;
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const delay = parseFloat(pillar.style.getPropertyValue('--pillar-delay') || '0') * 1000;
        timeouts.push(setTimeout(() => {
          requestAnimationFrame(function step(ts) {
            if (!alive) return;
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            numEl.textContent = Math.floor(easeOut(progress) * target);
            if (progress < 1) requestAnimationFrame(step);
            else numEl.textContent = target;
          });
        }, delay));
        pillarObs.unobserve(pillar);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.ufo-pillar').forEach(el => pillarObs.observe(el));
    observers.push(pillarObs);

    bag.add(() => { alive = false; observers.forEach(o => o.disconnect()); timeouts.forEach(clearTimeout); });
  })();

  /* ══════════ 10. GAMING REVEAL ══════════ */
  (function () {
    const observers: IntersectionObserver[] = [];
    const ghObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('gs-vis'); ghObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    const gh = document.getElementById('gaming-heading');
    if (gh) ghObs.observe(gh);
    observers.push(ghObs);

    const gcCards = document.querySelectorAll('.platform-card');
    if ('IntersectionObserver' in window) {
      const gcObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('gc-vis'); gcObs.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      gcCards.forEach((c, i) => { c.style.setProperty('--gc-delay', (i * 0.08) + 's'); gcObs.observe(c); });
      observers.push(gcObs);
    } else {
      gcCards.forEach(c => c.classList.add('gc-vis'));
    }

    bag.add(() => observers.forEach(o => o.disconnect()));
  })();

  /* ══════════ 11. REDIRECT-PROMPT MODAL (gaming platform cards) ══════════ */
  (function () {
    const modalOverlay = document.getElementById('cert-prompt-overlay');
    const modalIconWrap = document.getElementById('modal-icon-wrap');
    const modalDetailBox = document.getElementById('modal-detail-box');
    const modalActionText = document.getElementById('modal-action-text');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');

    if (!modalOverlay) return;

    let pendingUrl = '';

    document.querySelectorAll('.platform-card').forEach(card => {
      bag.on(card, 'click', function (e) {
        if (this.dataset.url) {
          e.preventDefault();
          pendingUrl = this.dataset.url;

          const iconSource = this.querySelector('.pc-icon-wrap');
          if (iconSource && modalIconWrap) modalIconWrap.innerHTML = iconSource.innerHTML;

          if (modalDetailBox) modalDetailBox.textContent = this.dataset.detail || this.dataset.name || 'External Link';
          if (modalActionText) modalActionText.textContent = this.dataset.action || 'the application';

          const computed = getComputedStyle(this);
          const color = computed.getPropertyValue('--pc-color').trim() || '#fff';
          const glow = computed.getPropertyValue('--pc-glow').trim() || 'rgba(255,255,255,0.2)';

          document.documentElement.style.setProperty('--cc-color', color);
          document.documentElement.style.setProperty('--cc-glow', glow);

          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (modalCancel) bag.on(modalCancel, 'click', closeModal);
    if (modalConfirm) bag.on(modalConfirm, 'click', function () {
      if (pendingUrl) window.open(pendingUrl, '_blank', 'noopener');
      closeModal();
    });

    bag.on(modalOverlay, 'click', e => { if (e.target === modalOverlay) closeModal(); });

    bag.add(() => { document.body.style.overflow = ''; });
  })();

  return () => bag.dispose();
}
