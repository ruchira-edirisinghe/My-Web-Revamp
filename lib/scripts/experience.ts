// @ts-nocheck
/* ════════════════════════════════════════
   experience.ts - Experience page engine.
   The shared shell (space background, preloader, cursor + sounds + music,
   mobile menu) plus the page's own two pieces: the scroll reveal and the
   work timeline's spine, drawn down through the role nodes as you scroll.
   Certifications, skills and testimonials are plain React in
   components/pages/ExperienceClient.tsx.

   Every addEventListener → bag.on; every rAF loop guarded + cancelled;
   every interval/timeout tracked + cleared; every IntersectionObserver
   disconnected; Web Audio closed; appended nodes removed on dispose.
   ════════════════════════════════════════ */
import { initCursor } from './cursor';
import { makeBag } from './_util';
import { initSpaceField3D } from './space-field';
import { sfxClick, sfxHover, sfxTap } from '@/lib/sfx';
import { wireAmbientControls } from './ambient-audio';

export function initExperience(): () => void {
  const bag = makeBag();

  /* ══════════ 2. SPACE BACKGROUND (experience.js #2) ══════════ */
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

  /* The preloader runs itself now: components/Preloader.tsx (lib/scripts/preloader.ts). */

  /* ══════════ 4. CURSOR & MUSIC & SOUNDS (experience.js #4) ══════════ */
  (function () {
    /* ── Pointer (dot + glass ring): lib/scripts/cursor.ts ── */
    initCursor(bag);

    /* ── Audio ── */

    /* Ambient music - one shared <audio> (lib/scripts/ambient-audio.ts) plays
       continuously across every page and remembers its paused state; this engine
       only mirrors the playing flag into its spectrum visualiser below. */
    let spectrumPlaying = false;
    let wakeSpectrum = () => {};
    bag.add(wireAmbientControls(playing => { spectrumPlaying = playing; wakeSpectrum(); }));

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
      // Paused and flat: nothing changes until the music starts again.
      if (!spectrumPlaying && bars.every(b => Math.abs(b.currentH - 1) < 0.02)) { specRaf = 0; return; }
      specRaf = requestAnimationFrame(drawSpectrum);
    }
    specRaf = requestAnimationFrame(drawSpectrum);
    wakeSpectrum = () => { if (specRunning && !specRaf) { lastSpec = performance.now(); specRaf = requestAnimationFrame(drawSpectrum); } };

    /* Click & hover sounds: lib/sfx.ts */
    const playClick = () => sfxClick();
    const playHover = sfxHover;

    document.querySelectorAll('.nav-link,.nav-cta,.xp-snd,.so-btn,footer a').forEach(el => {
      bag.on(el, 'mouseenter', playHover);
      bag.on(el, 'click', () => playClick());
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
      sfxTap(); spawnParticles(e.clientX, e.clientY);
    });

    bag.add(() => {
      specRunning = false; cancelAnimationFrame(specRaf);
      document.querySelectorAll('.click-particle').forEach(p => p.remove());
    });
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

  /* ══════════ REVEAL ══════════ */
  (function () {
    const els = document.querySelectorAll('.xp-rv');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    bag.add(() => io.disconnect());
  })();

  /* ══════════ TIMELINE SPINE ══════════
     A curve threaded through every role's node, drawn downward as the page
     scrolls (it never undraws). Each role lights up as the line reaches its
     node, and a bright head rides the tip. The colour runs through the roles'
     own accents. The loop only runs while the line is still catching up. */
  (function () {
    const tl = document.querySelector('.xp-tl');
    if (!tl) return;
    const NS = 'http://www.w3.org/2000/svg';
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'xp-spine');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `
      <defs>
        <linearGradient id="xp-spine-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1"></linearGradient>
        <clipPath id="xp-spine-clip"><rect x="-9999" y="0" width="99999" height="0" /></clipPath>
      </defs>
      <path class="xp-spine-track" />
      <g clip-path="url(#xp-spine-clip)">
        <path class="xp-spine-glow" stroke="url(#xp-spine-grad)" />
        <path class="xp-spine-line" stroke="url(#xp-spine-grad)" />
      </g>
      <circle class="xp-spine-halo" r="9" />
      <circle class="xp-spine-head" r="3.5" />`;
    tl.prepend(svg);
    const grad = svg.querySelector('linearGradient');
    const clip = svg.querySelector('clipPath rect');
    const paths = svg.querySelectorAll('path');
    const head = svg.querySelector('.xp-spine-head');
    const halo = svg.querySelector('.xp-spine-halo');
    const items = Array.from(tl.querySelectorAll('.xp-role'));

    let H = 0, pts = [], lut = [], drawn = 0, target = 0, raf = 0;

    function build() {
      const box = tl.getBoundingClientRect();
      H = box.height;
      svg.setAttribute('viewBox', `0 0 ${box.width} ${H}`);
      pts = items.map((it) => {
        const n = it.querySelector('.xp-node').getBoundingClientRect();
        return { x: n.left - box.left + n.width / 2, y: n.top - box.top + n.height / 2 };
      });
      if (!pts.length) return;
      const mobile = window.innerWidth <= 900;
      const x0 = mobile ? pts[0].x : box.width / 2;
      const x1 = mobile ? pts[pts.length - 1].x : box.width / 2;
      let d = `M ${x0} 0 C ${x0} ${pts[0].y * 0.5}, ${pts[0].x} ${pts[0].y * 0.5}, ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1], m = (b.y - a.y) / 2;
        d += ` C ${a.x} ${a.y + m}, ${b.x} ${b.y - m}, ${b.x} ${b.y}`;
      }
      const last = pts[pts.length - 1], rest = (H - last.y) / 2;
      d += ` C ${last.x} ${last.y + rest}, ${x1} ${last.y + rest}, ${x1} ${H}`;
      paths.forEach((p) => p.setAttribute('d', d));

      // The roles' accents, each placed at its node.
      grad.setAttribute('y2', String(H));
      grad.innerHTML = '<stop offset="0" stop-color="rgba(140,210,255,0)" />' +
        items.map((it, i) => `<stop offset="${(pts[i].y / H).toFixed(4)}" stop-color="${getComputedStyle(it).getPropertyValue('--c').trim() || '#8cd2ff'}" />`).join('') +
        '<stop offset="1" stop-color="rgba(195,155,255,0)" />';

      // Samples down the curve, for placing the head at a given depth.
      const line = paths[0], len = line.getTotalLength();
      lut = [];
      for (let k = 0; k <= 240; k++) lut.push(line.getPointAtLength((k / 240) * len));
    }

    function headAt(y) {
      let lo = 0, hi = lut.length - 1;
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (lut[mid].y < y) lo = mid; else hi = mid; }
      const a = lut[lo], b = lut[hi], f = b.y > a.y ? (y - a.y) / (b.y - a.y) : 0;
      return { x: a.x + (b.x - a.x) * f, y };
    }

    function paint() {
      clip.setAttribute('height', String(max0(drawn)));
      const p = headAt(drawn);
      const show = drawn > 2 && drawn < H - 2 ? '1' : '0';
      head.setAttribute('cx', p.x); head.setAttribute('cy', p.y); head.style.opacity = show;
      halo.setAttribute('cx', p.x); halo.setAttribute('cy', p.y); halo.style.opacity = show;
      pts.forEach((pt, i) => { if (drawn >= pt.y - 10) items[i].classList.add('is-lit'); });
    }
    const max0 = (v) => (v > 0 ? v : 0);

    function aim() {
      // The tip follows a line 70% of the way down the viewport.
      const top = tl.getBoundingClientRect().top;
      const want = Math.min(H, window.innerHeight * 0.7 - top);
      if (want > target) target = want;
      if (target >= (pts[pts.length - 1]?.y ?? H)) target = H;
    }
    // Measure (aim) at the start of a frame, then write (paint): reading the
    // timeline's position straight from every scroll event, after the last
    // frame's writes, forced the browser to redo layout on each one.
    function loop() {
      raf = 0;
      aim();
      const diff = target - drawn;
      drawn += diff * 0.07;
      if (Math.abs(diff) < 0.5) drawn = target;
      paint();
      if (drawn !== target) raf = requestAnimationFrame(loop);
    }
    const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };

    function rebuild() {
      build();
      if (still) { drawn = target = H; paint(); return; }
      wake();
      paint();
    }

    let pending = 0;
    const ro = new ResizeObserver(() => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; rebuild(); }); });
    ro.observe(tl);
    bag.on(window, 'scroll', wake, { passive: true });
    rebuild();

    bag.add(() => { ro.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(pending); svg.remove(); });
  })();

  return () => bag.dispose();
}
