/* ════════════════════════════════════════
   scatter-menu-cursor.js — Scatter animation, menu open/close & liquid glass cursor
   ════════════════════════════════════════ */
(function () {
  const sc         = document.getElementById('scatter-canvas');
  const sCtx       = sc.getContext('2d');
  const overlay    = document.getElementById('menu-overlay');
  const closeBtn   = document.getElementById('menu-close');
  const items      = document.querySelectorAll('.menu-item');
  const heroImg    = document.getElementById('hero-img');
  const wrapper    = document.getElementById('photo-wrapper');
  const btnEx      = document.getElementById('btn-explore');
  const cursorCanvas = document.getElementById('cursor-canvas');
  const cCtx       = cursorCanvas.getContext('2d');

  let W, H;
  function resize() {
    W = sc.width = cursorCanvas.width  = window.innerWidth;
    H = sc.height = cursorCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ─────────────────────────────────
     LIQUID GLASS CURSOR
  ───────────────────────────────── */
  let mX = -300, mY = -300, rX = -300, rY = -300;
  let isOnImage = false, isOnMenuItem = false;
  const R_NORMAL = 26, R_HOVER = 36, R_IMAGE = 56, R_MENU = 56;
  let currentR = R_NORMAL, targetR = R_NORMAL;

  function drawCursor() {
    cCtx.clearRect(0, 0, W, H);
    // Disable liquid cursor render on mobile view
    if (W <= 900) {
        requestAnimationFrame(drawCursor);
        return;
    }

    rX += (mX - rX) * 0.1;
    rY += (mY - rY) * 0.1;
    currentR += (targetR - currentR) * 0.08;
    const R = currentR, cx = rX, cy = rY;
    if (mX < -200) { requestAnimationFrame(drawCursor); return; }

    // Outer glow halo
    const halo = cCtx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.5);
    halo.addColorStop(0, 'rgba(180,220,255,0.07)');
    halo.addColorStop(1, 'rgba(80,140,255,0)');
    cCtx.beginPath(); cCtx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
    cCtx.fillStyle = halo; cCtx.fill();

    // Thin rim fill (annular)
    cCtx.beginPath();
    cCtx.arc(cx, cy, R, 0, Math.PI * 2);
    cCtx.arc(cx, cy, R - 5, 0, Math.PI * 2, true);
    const rim = cCtx.createRadialGradient(cx, cy, R - 5, cx, cy, R);
    rim.addColorStop(0,   'rgba(255,255,255,0.04)');
    rim.addColorStop(0.5, 'rgba(200,230,255,0.08)');
    rim.addColorStop(1,   'rgba(255,255,255,0.03)');
    cCtx.fillStyle = rim; cCtx.fill('evenodd');

    // Border ring
    cCtx.beginPath(); cCtx.arc(cx, cy, R, 0, Math.PI * 2);
    const stroke = cCtx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    stroke.addColorStop(0,    'rgba(255,255,255,0.88)');
    stroke.addColorStop(0.3,  'rgba(210,235,255,0.52)');
    stroke.addColorStop(0.65, 'rgba(255,255,255,0.13)');
    stroke.addColorStop(1,    'rgba(190,220,255,0.7)');
    cCtx.strokeStyle = stroke; cCtx.lineWidth = 1.5; cCtx.stroke();

    // Specular arc top-left
    cCtx.beginPath();
    cCtx.arc(cx, cy, R - 1.5, -Math.PI * 0.80, -Math.PI * 0.06);
    cCtx.strokeStyle = 'rgba(255,255,255,0.68)';
    cCtx.lineWidth = 2.2; cCtx.lineCap = 'round'; cCtx.stroke();

    // Accent arc bottom-right
    cCtx.beginPath();
    cCtx.arc(cx, cy, R - 2.5, Math.PI * 0.2, Math.PI * 0.7);
    cCtx.strokeStyle = 'rgba(130,190,255,0.22)';
    cCtx.lineWidth = 1.2; cCtx.lineCap = 'round'; cCtx.stroke();

    // Centre dot
    if (!isOnImage && !isOnMenuItem) {
      cCtx.save();
      cCtx.beginPath(); cCtx.arc(mX, mY, 2.5, 0, Math.PI * 2);
      cCtx.fillStyle = 'rgba(255,255,255,0.9)';
      cCtx.shadowColor = 'rgba(200,230,255,0.7)'; cCtx.shadowBlur = 5;
      cCtx.fill(); cCtx.restore();
    }

    // EXPLORE label
    if (isOnImage) {
      cCtx.save();
      cCtx.font = 'bold 11px Montserrat, sans-serif';
      cCtx.textAlign = 'center'; cCtx.textBaseline = 'middle';
      cCtx.shadowColor = 'rgba(0,0,0,1)'; cCtx.shadowBlur = 8; cCtx.shadowOffsetY = 1;
      cCtx.fillStyle = '#ffffff';
      cCtx.fillText('EXPLORE', cx, cy);
      cCtx.shadowBlur = 3; cCtx.fillText('EXPLORE', cx, cy);
      cCtx.restore();
    }

    // Arrow for menu items
    if (isOnMenuItem) {
      cCtx.save();
      const aw = R * 0.42, ah = R * 0.28;
      const ax = cx - aw * 0.1, ay = cy;
      cCtx.shadowColor = 'rgba(0,0,0,0.8)'; cCtx.shadowBlur = 6;
      cCtx.shadowOffsetX = 1; cCtx.shadowOffsetY = 1;
      cCtx.strokeStyle = '#ffffff'; cCtx.lineWidth = 2.8;
      cCtx.lineCap = 'round'; cCtx.lineJoin = 'round';
      cCtx.beginPath(); cCtx.moveTo(ax - aw * 0.5, ay); cCtx.lineTo(ax + aw * 0.5, ay); cCtx.stroke();
      cCtx.beginPath();
      cCtx.moveTo(ax + aw * 0.5 - ah * 0.8, ay - ah * 0.55);
      cCtx.lineTo(ax + aw * 0.5, ay);
      cCtx.lineTo(ax + aw * 0.5 - ah * 0.8, ay + ah * 0.55);
      cCtx.stroke();
      cCtx.restore();
    }

    requestAnimationFrame(drawCursor);
  }
  requestAnimationFrame(drawCursor);

  document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
  document.addEventListener('mouseleave', () => { mX = -300; mY = -300; });
  document.querySelectorAll('a:not(.menu-item),button,.btn').forEach(el => {
    el.addEventListener('mouseenter', () => { if (!isOnImage && !isOnMenuItem) targetR = R_HOVER; });
    el.addEventListener('mouseleave', () => { if (!isOnImage && !isOnMenuItem) targetR = R_NORMAL; });
  });
  wrapper.addEventListener('mouseenter', () => { isOnImage = true;  targetR = R_IMAGE; });
  wrapper.addEventListener('mouseleave', () => { isOnImage = false; targetR = R_NORMAL; });
  items.forEach(el => {
    el.addEventListener('mouseenter', () => { isOnMenuItem = true;  targetR = R_MENU; });
    el.addEventListener('mouseleave', () => { isOnMenuItem = false; targetR = R_NORMAL; });
  });

  /* ─────────────────────────────────
     SCATTER ANIMATION
  ───────────────────────────────── */
  const COLS = 7, ROWS = 7;
  let tiles = [], phase = 'idle', animating = false;
  let scatterT = 0, reassembleT = 0, floatTime = 0, lastTs = 0;

  function easeOutBack(t) { const c = 2.70158; return 1 + c * Math.pow(t - 1, 3) + (c - 1) * Math.pow(t - 1, 2); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function buildTiles() {
    const rect = wrapper.getBoundingClientRect();
    const off  = document.createElement('canvas');
    off.width = rect.width; off.height = rect.height;
    const oc   = off.getContext('2d');
    const grad = oc.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#0d2340'); grad.addColorStop(0.5, '#1a3a5c'); grad.addColorStop(1, '#0a1a2e');
    oc.fillStyle = grad; oc.fillRect(0, 0, rect.width, rect.height);
    try { oc.drawImage(heroImg, 0, 0, rect.width, rect.height); } catch (e) {}
    const tw = rect.width / COLS, th = rect.height / ROWS;
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    tiles = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const angle  = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 300;
        const tc     = document.createElement('canvas');
        tc.width = tw; tc.height = th;
        tc.getContext('2d').drawImage(off, col * tw, row * th, tw, th, 0, 0, tw, th);
        tiles.push({
          ox: rect.left + col * tw, oy: rect.top + row * th,
          x:  rect.left + col * tw, y:  rect.top + row * th,
          sx: cx + Math.cos(angle) * radius - tw / 2,
          sy: cy + Math.sin(angle) * radius - th / 2,
          w: tw, h: th, img: tc, alpha: 1, rotation: 0,
          targetRot: (Math.random() - 0.5) * Math.PI * 1.6,
          delay: Math.random() * 0.28,
          floatOffX: (Math.random() - 0.5) * 16,
          floatOffY: (Math.random() - 0.5) * 16,
          floatPhase: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  function loop(ts) {
    if (!animating) return;
    const dt = Math.min((ts - lastTs) / 1000, 0.05); lastTs = ts;
    sCtx.clearRect(0, 0, W, H);

    if (phase === 'scatter') {
      scatterT = Math.min(scatterT + dt * 0.85, 1);
      tiles.forEach(t => {
        const p = Math.max(0, Math.min((scatterT - t.delay) / (1 - t.delay), 1));
        const e = easeOutBack(p);
        t.x = lerp(t.ox, t.sx, e); t.y = lerp(t.oy, t.sy, e);
        t.rotation = t.targetRot * e; t.alpha = p < 0.05 ? p * 20 : 1;
      });
      if (scatterT >= 1) { phase = 'float'; floatTime = 0; triggerMenu(); }
    }

    if (phase === 'float') {
      floatTime += dt;
      tiles.forEach(t => {
        t.x = t.sx + Math.sin(floatTime * 0.6  + t.floatPhase) * t.floatOffX;
        t.y = t.sy + Math.cos(floatTime * 0.45 + t.floatPhase) * t.floatOffY;
      });
    }

    if (phase === 'reassemble') {
      reassembleT = Math.min(reassembleT + dt * 0.65, 1);
      tiles.forEach(t => {
        const p = Math.max(0, Math.min((reassembleT - t.delay * 0.4) / (1 - t.delay * 0.4), 1));
        const e = easeOutBack(p);
        t.x = lerp(t.sx, t.ox, e); t.y = lerp(t.sy, t.oy, e);
        t.rotation = t.targetRot * (1 - e); t.alpha = p > 0.85 ? (1 - p) * 6.67 : 1;
      });
      if (reassembleT >= 1) {
        phase = 'idle'; animating = false;
        sc.style.opacity = '0';
        document.body.classList.remove('exploded');
        sCtx.clearRect(0, 0, W, H);
        restoreHero(); return;
      }
    }

    tiles.forEach(t => {
      const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
      sCtx.save();
      sCtx.globalAlpha = Math.max(0, t.alpha) * 0.4;
      sCtx.translate(cx, cy); sCtx.rotate(t.rotation);
      sCtx.drawImage(t.img, -t.w / 2, -t.h / 2, t.w, t.h);
      sCtx.strokeStyle = 'rgba(255,255,255,0.09)'; sCtx.lineWidth = 0.5;
      sCtx.strokeRect(-t.w / 2, -t.h / 2, t.w, t.h);
      sCtx.restore();
    });
    requestAnimationFrame(loop);
  }

  function explode(e) {
    if (phase !== 'idle') return;
    if (e) e.preventDefault();
    buildTiles();
    document.body.classList.add('exploded');
    sc.style.opacity = '1'; animating = true; phase = 'scatter'; scatterT = 0;
    lastTs = performance.now(); requestAnimationFrame(loop);
  }

  function triggerMenu() {
    overlay.classList.add('visible'); overlay.style.opacity = '1';
    closeBtn.classList.add('visible');
    items.forEach((item, i) => {
      item.style.animation = 'none';
      item.style.opacity = '0'; item.style.transform = 'scale(0.2)'; item.style.filter = 'blur(12px)';
      void item.offsetWidth;
      item.style.animation = `menuPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09 + 0.04}s forwards`;
    });
  }

  function closeMenu() {
    const total = items.length;
    items.forEach((item, i) => {
      item.style.animation = 'none';
      void item.offsetWidth;
      item.style.animation = `menuShrink 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s forwards`;
    });
    const closeDur = (total - 1) * 70 + 500;
    setTimeout(() => {
      overlay.style.opacity = '0'; overlay.classList.remove('visible');
      closeBtn.classList.remove('visible');
    }, closeDur - 150);
    setTimeout(() => {
      if (animating && phase === 'float') {
        phase = 'reassemble'; reassembleT = 0;
        tiles.forEach(t => { t.delay = Math.random() * 0.25; });
      }
    }, closeDur);
  }

  function restoreHero() {
    const els = [
      { el: document.querySelector('.photo-wrapper'), delay: '0s' },
      { el: document.querySelector('.subtitle'),      delay: '0.1s' },
      { el: document.querySelector('.name'),          delay: '0.18s' },
      { el: document.querySelector('.cta-row'),       delay: '0.26s' },
    ];
    els.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.animation = 'none'; el.style.opacity = '0';
      void el.offsetWidth;
      el.style.animation = `heroReturn 0.65s cubic-bezier(0.22,0.61,0.36,1) ${delay} forwards`;
    });
  }

  btnEx.addEventListener('click', explode);
  wrapper.addEventListener('click', explode);
  closeBtn.addEventListener('click', closeMenu);
})();
