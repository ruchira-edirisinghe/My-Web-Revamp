// @ts-nocheck
/* ════════════════════════════════════════
   about.ts - About page engine: space bg, preloader, liquid cursor + SFX,
   ambient audio, mobile menu, logo ticker, and the redesigned sections'
   motion (reveal, card spotlight, count-ups). The testimonial
   carousel and the CV modal are React state (components/about, AboutClient).
   (faithful port of styles/about/about.js + about.html inline CV-modal script)
   ════════════════════════════════════════ */
import { initCursor } from './cursor';
import { makeBag, makeDirtyClear } from './_util';
import { initSpaceField3D } from './space-field';
import { sfxClick, sfxHover, sfxTap } from '@/lib/sfx';
import { wireAmbientControls } from './ambient-audio';

export function initAbout(): () => void {
  const bag = makeBag();

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

  /* The preloader runs itself now: components/Preloader.tsx (lib/scripts/preloader.ts). */

  /* ══════════ 4. LIQUID CURSOR, AMBIENT AUDIO, SFX & MOBILE MENU ══════════ */
  (function () {
    /* ── Pointer (dot + glass ring): lib/scripts/cursor.ts ── */
    initCursor(bag, 'a, button, [role="button"], .nav-link, .nav-cta, .skill-tag, .stat-pill');

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
    bag.on(document, 'visibilitychange', () => {
      if (document.hidden) { specRunning = false; }
      else if (!specRunning) { specRunning = true; lastSpec = performance.now(); specRaf = requestAnimationFrame(drawSpectrum); }
    });

    /* Click & hover sounds: lib/sfx.ts */
    const playClick = () => sfxClick();
    const playHover = sfxHover;

    document.querySelectorAll('.nav-link,.nav-cta,.ab-craft,.ab-cn-node,.ql-bento a,.ab-tx-btn,.so-btn,footer a').forEach(el => {
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
    bag.on(document, 'click', e => { sfxTap(); spawnParticles(e.clientX, e.clientY); });

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
    // A Web Animation runs on the compositor, so the strip keeps scrolling
    // without touching the main thread (it used to rewrite a transform from JS
    // every frame).
    let anim: Animation | null = null;

    function measure() {
      const w = setA.offsetWidth;
      if (!w || w === setWidth) return;
      // Keep the strip where it is when the width changes (resize, font swap).
      const progress = anim ? ((anim.currentTime as number) || 0) / (setWidth / PX_PER_SEC * 1000) : 0.5;
      setWidth = w;
      const duration = setWidth / PX_PER_SEC * 1000;
      const wasPlaying = anim ? anim.playState === 'running' : true;
      anim?.cancel();
      anim = inner.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(-${setWidth}px)` }],
        { duration, iterations: Infinity },
      );
      anim.currentTime = (progress % 1) * duration;
      if (!wasPlaying) anim.pause();
    }

    let visible = true, loaded = false;
    function start() {
      if (!loaded) return; // logo widths aren't known until the images load
      measure();
      if (anim && visible && !document.hidden) anim.play();
    }
    function stop() { anim?.pause(); }

    const onLoad = () => { loaded = true; start(); };
    if (document.readyState === 'complete') onLoad();
    else bag.on(window, 'load', onLoad);

    // Only scroll the strip while it is on screen - otherwise it rewrote a
    // transform every frame for the whole visit, long after it scrolled away.
    if ('IntersectionObserver' in window) {
      const tickerObs = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      });
      tickerObs.observe(inner);
      bag.add(() => tickerObs.disconnect());
    }
    bag.on(document, 'visibilitychange', () => { if (document.hidden) stop(); else start(); });

    bag.on(window, 'resize', () => { if (loaded) measure(); });
    bag.add(() => { anim?.cancel(); anim = null; });
  })();

  /* ══════════ 7. REVEAL, CARD SPOTLIGHT, COUNT-UPS ══════════ */
  (function () {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal: .ab-rv (and each bio paragraph, whose words then fade in) gets
    // .is-in the first time it's on screen.
    const rv = document.querySelectorAll('.ab-rv, .ab-words');
    if (!('IntersectionObserver' in window)) rv.forEach((el) => el.classList.add('is-in'));
    else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      rv.forEach((el) => io.observe(el));
      bag.add(() => io.disconnect());
    }

    // The UFO scene (the stats) plays out in sequence, so it waits until a
    // good part of it is on screen.
    const SCENE = { threshold: 0.3 };
    document.querySelectorAll('.ab-ufo').forEach((el) => {
      if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.classList.add('is-in');
      }, SCENE);
      io.observe(el);
      bag.add(() => io.disconnect());
    });

    // Count-ups: each [data-count] runs from 0 as its capsule is beamed down
    // (its --d after the scene starts).
    const timers: any[] = [];
    let alive = true;
    document.querySelectorAll('.ab-pod').forEach((g) => {
      const b = g.querySelector('[data-count]') as HTMLElement | null;
      if (!b || still || !('IntersectionObserver' in window)) return;
      const target = parseInt(b.dataset.count, 10);
      const scene = g.closest('.ab-ufo');
      b.textContent = '0';
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const delay = parseFloat(getComputedStyle(g).getPropertyValue('--d')) * 1000 || 0;
        timers.push(setTimeout(() => {
          let t0 = 0;
          requestAnimationFrame(function step(ts) {
            if (!alive) return;
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / 1600, 1);
            b.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
          });
        }, delay + 650));
      }, scene ? SCENE : { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      io.observe(scene || g);
      bag.add(() => io.disconnect());
    });
    bag.add(() => { alive = false; timers.forEach(clearTimeout); });

    // Spotlight: cards follow the pointer with a soft glow (--mx / --my).
    if (window.matchMedia('(hover: hover)').matches) {
      document.querySelectorAll('.ab-spot').forEach((el: HTMLElement) => {
        bag.on(el, 'pointermove', (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${e.clientX - r.left}px`);
          el.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
      });
    }
  })();

  /* (The gaming channel cards are outside links: components/ExternalGuard.tsx asks first.) */

  return () => bag.dispose();
}
