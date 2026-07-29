// @ts-nocheck
/* ════════════════════════════════════════
   quicklinks.ts - Quick Links page engine: space bg, preloader, cursor + SFX,
   nexus redirect modal, audio, scroll-reveal, social-card redirect modal,
   mobile menu.
   (faithful port of styles/quicklinks/quicklinks.js)
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { wireAmbientControls } from './ambient-audio';

export function initQuicklinks(): () => void {
  const bag = makeBag();
  const basePath = '/'; // assets live at the site root under Next.js public/

  /* ══════════ 1. SPACE BACKGROUND (AURORA VERSION) ══════════ */
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

    bag.on(document, 'visibilitychange', () => {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; lt = performance.now(); rafId = requestAnimationFrame(draw); }
    });
    bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  })();

  /* ══════════ 2. PRELOADER (High Fidelity) ══════════ */
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

    let startTime = null, lastTs = 0, fillPct = 0, wavePhase = 0, logoReady = false;
    let rafId = 0, alive = true;
    const timeouts: any[] = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };
    const logoImg = new Image();

    // Generate Preloader Stars
    const starsContainer = document.getElementById('preloader-stars');
    const createdStars: HTMLElement[] = [];
    if (starsContainer) {
      for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'preloader-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`; star.style.height = `${size}px`;
        star.style.setProperty('--star-opacity', 0.4 + Math.random() * 0.5);
        star.style.animation = `star-twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 5}s ease-in-out`;
        starsContainer.appendChild(star);
        createdStars.push(star);
      }
    }

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

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
      ctx.restore();

      ctx.save(); ctx.beginPath(); ctx.moveTo(0, waterTop);
      for (let x = 0; x <= CW; x += 3) {
        const y = waterTop + Math.sin((x / CW) * Math.PI * 5 + wavePhase) * amp + Math.sin((x / CW) * Math.PI * 9 + wavePhase * 1.5) * amp * 0.35;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();

      if (raw < 1) rafId = requestAnimationFrame(drawFrame);
      else {
        later(() => {
          preloader.style.opacity = '0'; preloader.style.pointerEvents = 'none';
          requestAnimationFrame(() => { if (splitTop) splitTop.classList.add('open'); if (splitBottom) splitBottom.classList.add('open'); });
          later(() => {
            preloader.style.display = 'none';
            if (splitTop) splitTop.style.display = 'none';
            if (splitBottom) splitBottom.style.display = 'none';
          }, SPLIT_MS + 100);
        }, HOLD_MS);
      }
    }
    let frameStarted = false;
    function startFrames() { if (!frameStarted) { frameStarted = true; rafId = requestAnimationFrame(drawFrame); } }
    logoImg.onload = () => { logoReady = true; startFrames(); };
    // If the logo fails, still run (and finish) the preloader so the page is never stuck
    logoImg.onerror = () => { startFrames(); };
    logoImg.src = basePath + 'Images/longlogo.svg';

    bag.add(() => { alive = false; cancelAnimationFrame(rafId); timeouts.forEach(clearTimeout); createdStars.forEach(s => s.remove()); });
  })();

  /* ══════════ 3. CURSOR & INTERACTION SFX ══════════ */
  (function () {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCanvas = document.getElementById('cursor-canvas');
    if (!cursorCanvas) return;
    const cCtx = cursorCanvas.getContext('2d');
    let W, H;
    function resize() { W = cursorCanvas.width = window.innerWidth; H = cursorCanvas.height = window.innerHeight; }
    resize(); bag.on(window, 'resize', resize);

    let mX = -300, mY = -300, rX = -300, rY = -300, currentR = 26, targetR = 26;
    const R_NORMAL = 26, R_HOVER = 36;

    let cursorRunning = false;
    let rafId = 0;
    function startCursor() {
      if (cursorRunning || W <= 900 || document.hidden) return;
      cursorRunning = true;
      rafId = requestAnimationFrame(drawCursor);
    }
    function stopCursor() { cursorRunning = false; cCtx.clearRect(0, 0, W, H); }

    function drawCursor() {
      if (!cursorRunning) return;
      cCtx.clearRect(0, 0, W, H);
      if (W <= 900) { stopCursor(); return; }
      rX += (mX - rX) * 0.1; rY += (mY - rY) * 0.1; currentR += (targetR - currentR) * 0.08;
      const R = currentR, cx = rX, cy = rY;
      if (mX < -200) { rafId = requestAnimationFrame(drawCursor); return; }

      // Halo
      const halo = cCtx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.5);
      halo.addColorStop(0, 'rgba(180,220,255,0.07)'); halo.addColorStop(1, 'rgba(80,140,255,0)');
      cCtx.beginPath(); cCtx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); cCtx.fillStyle = halo; cCtx.fill();

      // Rim
      cCtx.beginPath(); cCtx.arc(cx, cy, R, 0, Math.PI * 2); cCtx.arc(cx, cy, R - 5, 0, Math.PI * 2, true);
      const rim = cCtx.createRadialGradient(cx, cy, R - 5, cx, cy, R);
      rim.addColorStop(0, 'rgba(255,255,255,0.04)'); rim.addColorStop(0.5, 'rgba(200,230,255,0.08)'); rim.addColorStop(1, 'rgba(255,255,255,0.03)');
      cCtx.fillStyle = rim; cCtx.fill('evenodd');

      // Stroke
      cCtx.beginPath(); cCtx.arc(cx, cy, R, 0, Math.PI * 2);
      const stroke = cCtx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      stroke.addColorStop(0, 'rgba(255,255,255,0.88)'); stroke.addColorStop(0.3, 'rgba(210,235,255,0.52)'); stroke.addColorStop(1, 'rgba(190,220,255,0.7)');
      cCtx.strokeStyle = stroke; cCtx.lineWidth = 1.5; cCtx.stroke();

      // Center Dot
      if (cursorDot) { cursorDot.style.left = mX + 'px'; cursorDot.style.top = mY + 'px'; }
      rafId = requestAnimationFrame(drawCursor);
    }
    startCursor();
    bag.on(window, 'resize', () => { if (W <= 900) stopCursor(); else startCursor(); });
    bag.on(document, 'visibilitychange', () => { if (document.hidden) stopCursor(); else startCursor(); });

    bag.on(document, 'mousemove', e => { mX = e.clientX; mY = e.clientY; });
    document.querySelectorAll('a, button, .social-card, .platform-card, .stream-card').forEach(el => {
      bag.on(el, 'mouseenter', () => { targetR = R_HOVER; playHover(); });
      bag.on(el, 'mouseleave', () => { targetR = R_NORMAL; });
      bag.on(el, 'click', () => { spawnParticles(mX, mY); playClick(); });
    });

    /* SFX Engine */
    let audioCtx = null;
    function getAC() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
    function playClick() { try { const ac = getAC(); const osc = ac.createOscillator(); const gain = ac.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(660, ac.currentTime); osc.frequency.exponentialRampToValueAtTime(440, ac.currentTime + 0.1); gain.gain.setValueAtTime(0, ac.currentTime); gain.gain.linearRampToValueAtTime(0.1, ac.currentTime + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.15); osc.connect(gain); gain.connect(ac.destination); osc.start(); osc.stop(ac.currentTime + 0.2); } catch (e) { } }
    function playHover() { try { const ac = getAC(); const osc = ac.createOscillator(); const gain = ac.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(440, ac.currentTime); osc.frequency.linearRampToValueAtTime(520, ac.currentTime + 0.08); gain.gain.setValueAtTime(0, ac.currentTime); gain.gain.linearRampToValueAtTime(0.08, ac.currentTime + 0.03); gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.14); osc.connect(gain); gain.connect(ac.destination); osc.start(); osc.stop(ac.currentTime + 0.15); } catch (e) { } }

    function spawnParticles(x, y) {
      for (let i = 0; i < 6; i++) {
        const p = document.createElement('div'); p.className = 'click-particle';
        const angle = (i / 6) * Math.PI * 2, dist = 30 + Math.random() * 20;
        p.style.cssText = `left:${x}px;top:${y}px;width:4px;height:4px;background:#fff;--tx:${Math.cos(angle) * dist}px;--ty:${Math.sin(angle) * dist}px;`;
        document.body.appendChild(p); p.addEventListener('animationend', () => p.remove());
      }
    }

    bag.add(() => {
      cursorRunning = false; cancelAnimationFrame(rafId);
      try { if (audioCtx) audioCtx.close(); } catch {}
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
    });
  })();

  /* ══════════ 4. REDIRECTION MODAL LOGIC ══════════ */
  (function () {
    const portfolioLink = document.getElementById('portfolio-nexus-link');
    const modalOverlay = document.getElementById('nexus-redirect-overlay');
    const modalCancel = document.getElementById('nexus-modal-cancel');
    const modalConfirm = document.getElementById('nexus-modal-confirm');

    if (!portfolioLink || !modalOverlay) return;

    let redirectTimer = null;

    bag.on(portfolioLink, 'click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalCancel) {
      bag.on(modalCancel, 'click', closeModal);
    }

    if (modalConfirm) {
      bag.on(modalConfirm, 'click', () => {
        const targetUrl = portfolioLink.getAttribute('href');
        modalOverlay.style.opacity = '0';
        redirectTimer = setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      });
    }

    // Close on overlay click
    bag.on(modalOverlay, 'click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    bag.add(() => { if (redirectTimer) clearTimeout(redirectTimer); document.body.style.overflow = ''; });
  })();

  /* ══════════ 5. AUDIO PERSISTENCE ══════════ */
  (function () {
    /* Ambient music - one shared <audio> (lib/scripts/ambient-audio.ts) plays
       continuously across every page and remembers its paused state; this engine
       only mirrors the playing flag into its spectrum visualiser below. */
    let spectrumPlaying = false;
    bag.add(wireAmbientControls(playing => { spectrumPlaying = playing; }));

    const specCanvas = document.getElementById('spectrum-canvas-desktop');
    const specCanvasM = document.getElementById('spectrum-canvas');
    const spCtx = specCanvas?.getContext('2d'), spCtxM = specCanvasM?.getContext('2d');

    const bars = Array.from({ length: 7 }, (_, i) => ({ phase: i * (Math.PI * 2 / 7) + Math.random() * 0.5, speed: 1.2 + Math.random() * 1.5, currentH: 1, targetH: 1 }));
    let lastSpec = 0;
    let specRunning = true;
    let specRaf = 0;
    function drawSpectrum(ts) {
      if (!specRunning) return;
      const dt = Math.min((ts - lastSpec) / 1000, 0.05); lastSpec = ts;
      [spCtx, spCtxM].forEach(ctx => {
        if (!ctx) return; ctx.clearRect(0, 0, 26, 18);
        bars.forEach((bar, i) => {
          if (spectrumPlaying) { bar.phase += bar.speed * dt; bar.targetH = 2 + (Math.sin(bar.phase) * 0.5 + 0.5) * 14; }
          else bar.targetH = 1;
          bar.currentH += (bar.targetH - bar.currentH) * 0.18;
          const x = 3 + i * 4, h = bar.currentH, y = (18 - h) / 2;
          const grad = ctx.createLinearGradient(x, y, x, y + h);
          grad.addColorStop(0, 'rgba(255,255,255,0.95)');
          grad.addColorStop(0.5, 'rgba(200,225,255,0.75)');
          grad.addColorStop(1, 'rgba(150,190,255,0.45)');
          ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(x, y, 2, h, 1); ctx.fill();
        });
      });
      specRaf = requestAnimationFrame(drawSpectrum);
    }
    specRaf = requestAnimationFrame(drawSpectrum);

    bag.on(document, 'visibilitychange', () => {
      if (document.hidden) { specRunning = false; }
      else if (!specRunning) { specRunning = true; lastSpec = performance.now(); specRaf = requestAnimationFrame(drawSpectrum); }
    });

    bag.add(() => {
      specRunning = false; cancelAnimationFrame(specRaf);
    });
  })();

  /* ══════════ 6. SCROLL REVEAL ══════════ */
  (function () {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('sr-vis'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sr-elem, .social-card, .stream-card').forEach(el => obs.observe(el));
    bag.add(() => obs.disconnect());
  })();

  /* ══════════ 7. MODAL SYSTEM ══════════ */
  (function () {
    const overlay = document.getElementById('cert-prompt-overlay');
    const modalCard = overlay?.querySelector('.modal-card');
    const cancelBtn = document.getElementById('modal-cancel');
    const confirmBtn = document.getElementById('modal-confirm');
    const cards = document.querySelectorAll('.social-card, .stream-card');
    const modalIconWrap = document.getElementById('modal-icon-wrap');
    const modalAction = document.getElementById('modal-action-text');
    let pendingUrl = '';

    if (!overlay || !cancelBtn || !confirmBtn) return;

    const modalTimers: any[] = [];
    const closeModal = () => { overlay.classList.remove('active'); modalTimers.push(setTimeout(() => { pendingUrl = ''; }, 300)); };

    cards.forEach(card => {
      bag.on(card, 'click', (e) => {
        if (card.id === 'portfolio-nexus-link') return;
        // Prevent immediate navigation
        const url = card.getAttribute('data-url');
        if (url) {
          e.preventDefault();
          pendingUrl = url;
          const iconHtml = card.querySelector('.sc-icon-wrap, .brand-icon, .pc-icon-wrap').innerHTML;
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
        }
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

    bag.add(() => modalTimers.forEach(clearTimeout));
  })();

  /* ══════════ 8. MOBILE MENU TOGGLE ══════════ */
  (function () {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuCloseMob = document.getElementById('menu-close-mobile');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!menuBtn || !mobileMenu) return;

    const currentPage = document.body.dataset.page || 'links';
    menuLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === currentPage);
    });

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

    const timeouts: any[] = [];
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
      timeouts.push(id);
    }

    bag.on(menuBtn, 'click', e => {
      e.stopPropagation();
      mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });

    if (menuCloseMob) {
      bag.on(menuCloseMob, 'click', e => { e.stopPropagation(); closeMobileMenu(); });
    }

    bag.on(mobileMenu, 'click', e => { if (e.target === mobileMenu) closeMobileMenu(); });

    bag.on(document, 'keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
    });

    bag.add(() => {
      timeouts.forEach(clearTimeout);
      document.body.classList.remove('menu-open');
      if (injectedStyle) injectedStyle.remove();
    });
  })();

  return () => bag.dispose();
}
