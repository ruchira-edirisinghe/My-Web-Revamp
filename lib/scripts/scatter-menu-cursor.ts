// @ts-nocheck
/* ════════════════════════════════════════
   scatter-menu-cursor.ts - Scatter animation, menu open/close & liquid glass cursor
   (faithful port of styles/home/scatter-menu-cursor.js)
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { initCursor } from './cursor';

export function initScatterMenuCursor(): () => void {
  const bag = makeBag();
  const sc         = document.getElementById('scatter-canvas');
  if (!sc) return () => {};
  const sCtx       = sc.getContext('2d');
  const overlay    = document.getElementById('menu-overlay');
  const closeBtn   = document.getElementById('menu-close');
  const items      = document.querySelectorAll('.menu-item');
  const heroImg    = document.getElementById('hero-img');
  const wrapper    = document.getElementById('photo-wrapper');
  const btnEx      = document.getElementById('btn-explore');

  let W, H;
  function resize() {
    W = sc.width  = window.innerWidth;
    H = sc.height = window.innerHeight;
  }
  resize();
  bag.on(window, 'resize', resize);

  /* ── LIQUID GLASS CURSOR ── (shared DOM cursor; the ring grows into an
     "EXPLORE" lens over the photo and an arrow over the menu items) */
  initCursor(bag, 'a:not(.menu-item), button, .btn', [
    { sel: '#photo-wrapper', scale: 56 / 26, html: 'EXPLORE' },
    { sel: '.menu-item', scale: 56 / 26, html: '<svg width="11" height="8" viewBox="0 0 11 8" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 2px rgba(0,0,0,.8))"><path d="M1 4h9M7 1l3 3-3 3"/></svg>' },
  ]);

  /* ── SCATTER ANIMATION ── */
  const COLS = 7, ROWS = 7;
  let tiles = [], phase = 'idle', animating = false;
  let scatterT = 0, reassembleT = 0, floatTime = 0, lastTs = 0;
  let loopRaf = 0;
  const timeouts: any[] = [];
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

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
    loopRaf = requestAnimationFrame(loop);
  }

  function explode(e) {
    if (phase !== 'idle') return;
    if (e) e.preventDefault();
    buildTiles();
    document.body.classList.add('exploded');
    sc.style.opacity = '1'; animating = true; phase = 'scatter'; scatterT = 0;
    lastTs = performance.now(); loopRaf = requestAnimationFrame(loop);
  }

  function triggerMenu() {
    overlay.classList.add('visible'); overlay.style.opacity = '1';
    closeBtn.classList.add('visible');
    // Move keyboard focus into the open menu (a11y: focus follows the visible UI)
    closeBtn && closeBtn.focus();
    items.forEach((item, i) => {
      item.style.animation = 'none';
      item.style.opacity = '0'; item.style.transform = 'scale(0.2)'; item.style.filter = 'blur(12px)';
      void item.offsetWidth;
      item.style.animation = `menuPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09 + 0.04}s forwards`;
    });
  }

  function closeMenu() {
    // Return focus to the control that opened the menu (a11y)
    if (btnEx && typeof btnEx.focus === 'function') btnEx.focus();
    const total = items.length;
    items.forEach((item, i) => {
      item.style.animation = 'none';
      void item.offsetWidth;
      item.style.animation = `menuShrink 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s forwards`;
    });
    const closeDur = (total - 1) * 70 + 500;
    later(() => {
      overlay.style.opacity = '0'; overlay.classList.remove('visible');
      closeBtn.classList.remove('visible');
    }, closeDur - 150);
    later(() => {
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

  if (btnEx) bag.on(btnEx, 'click', explode);
  if (wrapper) bag.on(wrapper, 'click', explode);
  if (closeBtn) bag.on(closeBtn, 'click', closeMenu);
  bag.on(document, 'keydown', e => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('visible')) closeMenu();
  });

  bag.add(() => {
    cursorRunning = false; animating = false;
    cancelAnimationFrame(cursorRaf); cancelAnimationFrame(loopRaf);
    timeouts.forEach(clearTimeout);
    document.body.classList.remove('exploded');
  });
  return () => bag.dispose();
}
