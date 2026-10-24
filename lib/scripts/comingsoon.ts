// @ts-nocheck
/* ════════════════════════════════════════
   comingsoon.ts - standalone "Coming Soon" page engine.
   Faithful port of the inline <script> blocks in comingsoon.html:
   space background, preloader, cursor + music + SFX + mobile menu,
   countdown, the interactive SVG constellation, and the email-notify
   validator. Scroll-top is NOT ported here - the page renders the shared
   <ScrollTop/> component instead. Every self-running loop/listener is
   registered for teardown via makeBag() so the page is StrictMode- and
   route-unmount-safe. Asset paths rewritten ./Images → /Images, ./audio → /audio.
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { initCursor } from './cursor';
import { initSpaceField3D } from './space-field';
import { sfxClick, sfxHover, sfxTap } from '@/lib/sfx';
import { wireAmbientControls } from './ambient-audio';

export function initComingSoon(): () => void {
  const bag = makeBag();

  /* ══════════ SPACE BACKGROUND ══════════ */
  (function () {
    // WebGL field first; the 2D starfield below is the no-WebGL fallback.
    if (initSpaceField3D(bag)) return;
    const c = document.getElementById('space-canvas'), x = c && c.getContext('2d');
    if (!c || !x) return;
    let W, H;
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    resize();
    bag.on(window, 'resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      baseA: Math.random() * 0.55 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.003,
      driftX: (Math.random() - 0.5) * 0.00007,
      driftY: (Math.random() - 0.5) * 0.00003
    }));

    const shooters = [];
    function spawnS() {
      if (shooters.length >= 6) return; // cap
      const a = (Math.random() * 30 + 10) * Math.PI / 180, sp = Math.random() * 5 + 4;
      shooters.push({
        x: Math.random() * W, y: Math.random() * H * 0.4,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        len: Math.random() * 100 + 50, alpha: 1,
        decay: Math.random() * 0.014 + 0.009
      });
    }
    const spawnTimer = setInterval(() => { if (!document.hidden && Math.random() < 0.35) spawnS(); }, 3000);
    bag.add(() => clearInterval(spawnTimer));

    const aC = [[0, 220, 160], [90, 70, 240], [0, 180, 110], [50, 165, 240]];
    const auroras = Array.from({ length: 3 }, (_, i) => ({
      color: aC[i], yBase: 0.04 + Math.random() * 0.18,
      amp: 35 + Math.random() * 50, freq: 0.0007 + Math.random() * 0.0005,
      phaseOff: Math.random() * Math.PI * 2, phaseSpd: 0.00025 + Math.random() * 0.00025,
      thickness: 55 + Math.random() * 70, alpha: 0, targetA: 0,
      fadeSpd: 0.0012 + Math.random() * 0.0008, nextShow: Math.random() * 5000,
      showDur: 5000 + Math.random() * 7000, timer: 0, showing: false
    }));

    let auroraSteps = Math.ceil(window.innerWidth / 5);
    bag.on(window, 'resize', () => { auroraSteps = Math.ceil(window.innerWidth / 5); });

    let lt = 0;
    let running = true;
    let rafId = 0;
    function draw(ts) {
      if (!running) return;
      const dt = Math.min(ts - lt, 50); lt = ts;
      x.fillStyle = '#02030a';
      x.fillRect(0, 0, W, H);

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
        x.save(); x.globalAlpha = a.alpha; x.filter = 'blur(16px)';
        x.beginPath();
        for (let i = 0; i <= auroraSteps; i++) {
          const px = (i / auroraSteps) * W, wv = Math.sin(px * a.freq + a.phaseOff) * a.amp + Math.sin(px * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35;
          i === 0 ? x.moveTo(px, yC + wv - a.thickness / 2) : x.lineTo(px, yC + wv - a.thickness / 2);
        }
        for (let i = auroraSteps; i >= 0; i--) {
          const px = (i / auroraSteps) * W, wv = Math.sin(px * a.freq + a.phaseOff) * a.amp + Math.sin(px * a.freq * 1.6 + a.phaseOff * 0.75) * a.amp * 0.35;
          x.lineTo(px, yC + wv + a.thickness / 2);
        }
        x.closePath();
        const g2 = x.createLinearGradient(0, yC - a.thickness, 0, yC + a.thickness);
        g2.addColorStop(0, `rgba(${r},${g},${b},0)`);
        g2.addColorStop(0.3, `rgba(${r},${g},${b},0.85)`);
        g2.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
        g2.addColorStop(0.7, `rgba(${r},${g},${b},0.85)`);
        g2.addColorStop(1, `rgba(${r},${g},${b},0)`);
        x.fillStyle = g2; x.fill(); x.restore();
      });

      stars.forEach(s => {
        s.x += s.driftX; s.y += s.driftY;
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
        if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;
        s.phase += s.speed;
        const tw = Math.sin(s.phase) * 0.5 + 0.5, al = s.baseA * (0.4 + tw * 0.6);
        const sx = s.x * W, sy = s.y * H;
        if (s.r > 1.1 && tw > 0.75) {
          const gw = x.createRadialGradient(sx, sy, 0, sx, sy, s.r * 4.5);
          gw.addColorStop(0, `rgba(200,220,255,${al * 0.5})`);
          gw.addColorStop(1, 'rgba(200,220,255,0)');
          x.beginPath(); x.arc(sx, sy, s.r * 4.5, 0, Math.PI * 2);
          x.fillStyle = gw; x.fill();
        }
        x.beginPath(); x.arc(sx, sy, s.r, 0, Math.PI * 2);
        x.fillStyle = `rgba(220,230,255,${al})`; x.fill();
      });

      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
        if (s.alpha <= 0) { shooters.splice(i, 1); continue; }
        const mag = Math.hypot(s.vx, s.vy), tx = s.x - s.vx * (s.len / mag), ty = s.y - s.vy * (s.len / mag);
        const gw = x.createLinearGradient(tx, ty, s.x, s.y);
        gw.addColorStop(0, 'rgba(255,255,255,0)');
        gw.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        x.beginPath(); x.moveTo(tx, ty); x.lineTo(s.x, s.y);
        x.strokeStyle = gw; x.lineWidth = 1.4; x.stroke();
        const tg = x.createRadialGradient(s.x, s.y, 0, s.x, s.y, 3.5);
        tg.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
        tg.addColorStop(1, 'rgba(255,255,255,0)');
        x.beginPath(); x.arc(s.x, s.y, 3.5, 0, Math.PI * 2);
        x.fillStyle = tg; x.fill();
      }
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);
    bag.add(() => { running = false; cancelAnimationFrame(rafId); });
  })();

  /* The preloader is the cosmic overlay system now (lib/cosmic/*, components/Preloader.tsx). */

  /* ══════════ CURSOR + MUSIC + SOUNDS + MOBILE MENU ══════════ */
  (function () {
    initCursor(bag, 'a, button, [role="button"], .cs-tag');

    // Ambient music - one shared <audio> (lib/scripts/ambient-audio.ts) plays
    // continuously across every page; this engine only reads the playing flag.
    let sp = false;
    let wakeDs = () => {};
    bag.add(wireAmbientControls(playing => { sp = playing; wakeDs(); }));

    const sC = document.getElementById('spectrum-canvas-desktop'), sCm = document.getElementById('spectrum-canvas');
    const sX = sC ? sC.getContext('2d') : null, sXm = sCm ? sCm.getContext('2d') : null;
    const SW = 26, SH = 18, BC = 7, BW = 2, BG = 2, TW = BC * BW + (BC - 1) * BG, LO = (SW - TW) / 2;
    const bars = Array.from({ length: BC }, (_, i) => ({ phase: i * (Math.PI * 2 / BC) + Math.random() * 0.5, speed: 2.8 + Math.random() * 2.2, cH: 1, tH: 1 }));
    function db(ctx) { if (!ctx) return; ctx.clearRect(0, 0, SW, SH); bars.forEach((b, i) => { const x = LO + i * (BW + BG), h = Math.max(1, b.cH), y = (SH - h) / 2; const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(0.5, 'rgba(200,225,255,0.75)'); g.addColorStop(1, 'rgba(150,190,255,0.45)'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, y, BW, h, 1); ctx.fill(); }); }
    let ls = 0, dsRunning = true, dsRaf = 0; function ds(ts) { if (!dsRunning) return; const dt = Math.min((ts - ls) / 1000, 0.05); ls = ts; bars.forEach(b => { if (sp) { b.phase += b.speed * dt; b.tH = 2 + ((Math.sin(b.phase) * 0.5 + 0.5)) * (SH - 3); } else b.tH = 1; b.cH += (b.tH - b.cH) * 0.18; }); db(sX); db(sXm); if (!sp && bars.every(b => Math.abs(b.cH - 1) < 0.02)) { dsRaf = 0; return; } dsRaf = requestAnimationFrame(ds); } dsRaf = requestAnimationFrame(ds); wakeDs = () => { if (dsRunning && !dsRaf) { ls = performance.now(); dsRaf = requestAnimationFrame(ds); } };
    bag.add(() => { dsRunning = false; cancelAnimationFrame(dsRaf); });

    document.querySelectorAll('a,button,.cs-tag,footer a').forEach(el => { bag.on(el, 'mouseenter', sfxHover); bag.on(el, 'click', () => sfxClick()); });

    function sp2(x, y) { const colors = ['rgba(255,255,255,0.7)', 'rgba(180,220,255,0.65)', 'rgba(200,200,255,0.55)', 'rgba(220,160,255,0.6)']; for (let i = 0; i < 6; i++) { const p = document.createElement('div'); p.className = 'click-particle'; const a = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.5, d = 28 + Math.random() * 22; p.style.cssText = `left:${x}px;top:${y}px;width:${3 + Math.random() * 3}px;height:${3 + Math.random() * 3}px;background:${colors[i % colors.length]};--tx:calc(-50% + ${Math.cos(a) * d}px);--ty:calc(-50% + ${Math.sin(a) * d}px);animation-duration:${0.45 + Math.random() * 0.15}s;`; document.body.appendChild(p); p.addEventListener('animationend', () => p.remove()); } }
    bag.on(document, 'click', e => { sfxTap(); sp2(e.clientX, e.clientY); });

    const mb = document.getElementById('menu-btn'), mm2 = document.getElementById('mobile-menu'), mc = document.getElementById('menu-close-mobile'), ml = document.querySelectorAll('.mobile-menu-link');
    const cp = document.body.dataset.page || ''; ml.forEach(l => { l.classList.toggle('active', l.dataset.page === cp); });
    let injectedStyle = null;
    if (!document.getElementById('mmkf')) { const s = document.createElement('style'); s.id = 'mmkf'; s.textContent = '@keyframes mobileMenuPop{0%{opacity:0;transform:scale(0.2);filter:blur(12px);}50%{opacity:1;transform:scale(1.08);filter:blur(0px);}70%{transform:scale(0.97);}85%{transform:scale(1.02);}100%{opacity:1;transform:scale(1);filter:blur(0px);}}@keyframes mobileMenuShrink{0%{opacity:1;transform:scale(1);filter:blur(0px);}15%{transform:scale(1.03);}30%{transform:scale(0.96);}100%{opacity:0;transform:scale(0.2);filter:blur(12px);}}'; document.head.appendChild(s); injectedStyle = s; }
    const menuTimeouts: any[] = [];
    function oMM() { mm2.classList.add('open'); mm2.setAttribute('aria-hidden', 'false'); mb.classList.add('is-open'); mb.setAttribute('aria-expanded', 'true'); mc.classList.add('visible'); document.body.classList.add('menu-open'); ml.forEach((l, i) => { l.style.animation = 'none'; l.style.opacity = '0'; l.style.transform = 'scale(0.2)'; l.style.filter = 'blur(12px)'; void l.offsetWidth; l.style.animation = `mobileMenuPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09 + 0.04}s forwards`; }); }
    function cMM() { const tot = ml.length; ml.forEach((l, i) => { l.style.animation = 'none'; void l.offsetWidth; l.style.animation = `mobileMenuShrink 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s forwards`; }); const id = setTimeout(() => { mm2.classList.remove('open'); mm2.setAttribute('aria-hidden', 'true'); mb.classList.remove('is-open'); mb.setAttribute('aria-expanded', 'false'); mc.classList.remove('visible'); document.body.classList.remove('menu-open'); }, (tot - 1) * 70 + 350); menuTimeouts.push(id); }
    if (mb) bag.on(mb, 'click', e => { e.stopPropagation(); mm2.classList.contains('open') ? cMM() : oMM(); });
    if (mc) bag.on(mc, 'click', e => { e.stopPropagation(); cMM(); });
    if (mm2) bag.on(mm2, 'click', e => { if (e.target === mm2) cMM(); });
    bag.on(document, 'keydown', e => { if (e.key === 'Escape' && mm2 && mm2.classList.contains('open')) cMM(); });

    bag.add(() => {
      menuTimeouts.forEach(clearTimeout);
      try { if (ac) ac.close(); } catch {}
      document.body.classList.remove('menu-open');
      if (injectedStyle) injectedStyle.remove();
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
    });
  })();

  /* ══════════ COUNTDOWN - 30 days with flip animation ══════════ */
  (function () {
    const target = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    let alive = true, toId = 0;
    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }
    function flip(el, val) { if (!el || el.textContent === val) return; el.classList.remove('flip'); void el.offsetWidth; el.textContent = val; el.classList.add('flip'); }
    function tick() {
      if (!alive) return;
      const diff = target - Date.now();
      if (diff <= 0) { ['d', 'h', 'm', 's'].forEach(id => { const el = document.getElementById('cd-' + id); if (el) el.textContent = '00'; }); return; }
      const d = pad(Math.floor(diff / 86400000));
      const h = pad(Math.floor((diff % 86400000) / 3600000));
      const m = pad(Math.floor((diff % 3600000) / 60000));
      const s = pad(Math.floor((diff % 60000) / 1000));
      [['d', d], ['h', h], ['m', m], ['s', s]].forEach(([id, val]) => flip(document.getElementById('cd-' + id), val));
      toId = setTimeout(tick, 1000);
    }
    tick();
    bag.add(() => { alive = false; clearTimeout(toId); });
  })();

  /* ══════════ CONSTELLATION - interactive SVG starfield ══════════ */
  (function () {
    const svg = document.getElementById('cs-constellation');
    if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    let W = window.innerWidth, H = window.innerHeight;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    const NUM = 36, CONNECT_DIST = 155;
    let mx = W / 2, my = H / 2;
    const stars = Array.from({ length: NUM }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.4 + 0.5,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.012 + Math.random() * 0.018,
      el: null, glow: null
    }));
    const lineGroup = document.createElementNS(NS, 'g');
    svg.appendChild(lineGroup);
    const starGroup = document.createElementNS(NS, 'g');
    svg.appendChild(starGroup);
    const mGlow = document.createElementNS(NS, 'circle');
    mGlow.setAttribute('r', '20'); mGlow.setAttribute('fill', 'rgba(160,100,255,0.07)');
    starGroup.appendChild(mGlow);
    const mDot = document.createElementNS(NS, 'circle');
    mDot.setAttribute('r', '2.8'); mDot.setAttribute('fill', 'rgba(210,170,255,0.6)');
    starGroup.appendChild(mDot);
    let msx = mx, msy = my;
    stars.forEach(s => {
      const glow = document.createElementNS(NS, 'circle');
      glow.setAttribute('r', String(s.r * 5)); glow.setAttribute('fill', 'rgba(180,140,255,0)');
      starGroup.appendChild(glow); s.glow = glow;
      const el = document.createElementNS(NS, 'circle');
      el.setAttribute('r', String(s.r)); el.setAttribute('fill', 'rgba(220,200,255,0.55)');
      starGroup.appendChild(el); s.el = el;
    });
    bag.on(window, 'mousemove', e => { mx = e.clientX; my = e.clientY; });
    bag.on(window, 'resize', () => { W = window.innerWidth; H = window.innerHeight; svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); });
    let lastT = 0;
    let running = true, rafId = 0;
    function frame(t) {
      if (!running) return;
      const dt = Math.min(t - lastT, 40); lastT = t;
      stars.forEach(s => {
        s.pulse += s.speed; s.x += s.vx; s.y += s.vy;
        if (s.x < -10) s.x = W + 10; if (s.x > W + 10) s.x = -10;
        if (s.y < -10) s.y = H + 10; if (s.y > H + 10) s.y = -10;
        const dx = mx - s.x, dy = my - s.y, d = Math.hypot(dx, dy);
        if (d < 200 && d > 1) { s.vx += dx / d * 0.003; s.vy += dy / d * 0.003; }
        s.vx *= 0.998; s.vy *= 0.998;
        const a = (Math.sin(s.pulse) * 0.5 + 0.5) * 0.6 + 0.15;
        s.el.setAttribute('cx', String(s.x)); s.el.setAttribute('cy', String(s.y));
        s.el.setAttribute('fill', 'rgba(220,200,255,' + a + ')');
        s.glow.setAttribute('cx', String(s.x)); s.glow.setAttribute('cy', String(s.y));
        s.glow.setAttribute('fill', 'rgba(180,140,255,' + (Math.sin(s.pulse) * 0.04 + 0.04) + ')');
      });
      msx += (mx - msx) * 0.09; msy += (my - msy) * 0.09;
      mDot.setAttribute('cx', String(msx)); mDot.setAttribute('cy', String(msy));
      mGlow.setAttribute('cx', String(msx)); mGlow.setAttribute('cy', String(msy));
      while (lineGroup.firstChild) lineGroup.removeChild(lineGroup.firstChild);
      const all = [...stars, { x: msx, y: msy }];
      for (let i = 0; i < all.length - 1; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x, dy = all[i].y - all[j].y, d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const a = (1 - d / CONNECT_DIST) * 0.16;
            const line = document.createElementNS(NS, 'line');
            line.setAttribute('x1', String(all[i].x)); line.setAttribute('y1', String(all[i].y));
            line.setAttribute('x2', String(all[j].x)); line.setAttribute('y2', String(all[j].y));
            line.setAttribute('stroke', 'rgba(180,140,255,' + a + ')'); line.setAttribute('stroke-width', '0.8');
            lineGroup.appendChild(line);
          }
        }
      }
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    bag.add(() => { running = false; cancelAnimationFrame(rafId); lineGroup.remove(); starGroup.remove(); });
  })();

  /* ══════════ NOTIFY (email validator - markup is commented out in source, so this no-ops) ══════════ */
  (function () {
    const btn = document.getElementById('cs-notify-btn'), inp = document.getElementById('cs-email'), suc = document.getElementById('cs-success');
    if (!btn) return;
    bag.on(btn, 'click', () => {
      const v = inp.value.trim();
      if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        inp.style.borderColor = 'rgba(255,80,120,0.6)';
        inp.style.boxShadow = '0 0 16px rgba(255,80,120,0.15)';
        setTimeout(() => { inp.style.borderColor = ''; inp.style.boxShadow = ''; }, 1500);
        return;
      }
      inp.style.display = 'none'; btn.style.display = 'none'; suc.style.display = 'block';
    });
  })();

  return () => bag.dispose();
}
