(function () {

  /* ══════════ 1. PRELOADER & TRANSITION ══════════ */
  (function () {
    function initPreloader() {
      const pl = document.getElementById('preloader'),
        cv = document.getElementById('preloader-canvas'),
        pf = document.getElementById('progress-fill'),
        st = document.getElementById('split-top'),
        sb = document.getElementById('split-bottom');

      // Helper: force-dismiss everything regardless of state
      function dismiss() {
        if (pl) { pl.style.transition = 'opacity 0.5s ease'; pl.style.opacity = '0'; pl.style.pointerEvents = 'none'; }
        if (st) st.classList.add('open');
        if (sb) sb.classList.add('open');
        setTimeout(() => {
          if (pl && pl.parentNode) pl.remove();
          if (st && st.parentNode) { st.classList.add('gone'); st.remove(); }
          if (sb && sb.parentNode) { sb.classList.add('gone'); sb.remove(); }
        }, 1000);
      }

      if (!pl || !cv || !pf || !st || !sb) {
        console.warn('Preloader elements missing. Skipping transition.');
        dismiss();
        return;
      }

      const cx = cv.getContext('2d');
      const CW = 900, CH = 240;
      cv.width = CW; cv.height = CH;

      const DUR = 2200, HOLD = 300, SPLIT = 900;
      let wp = 0, li = new Image(), lr = false;
      let finished = false;

      // Safety: always dismiss after DUR + HOLD + 800ms no matter what
      const safetyTimer = setTimeout(() => { if (!finished) { finished = true; dismiss(); } }, DUR + HOLD + 800);

      // Also dismiss if tab becomes visible after being hidden during load
      function onVisible() {
        if (document.visibilityState === 'visible' && !finished) {
          document.removeEventListener('visibilitychange', onVisible);
          startAnimation();
        }
      }

      function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

      let startTime = null;

      function frame(ts) {
        if (finished) return;
        if (!startTime) startTime = ts;
        const raw = Math.min((ts - startTime) / DUR, 1);
        const fp = ease(raw);
        wp += 0.045;
        pf.style.width = (fp * 100) + '%';

        cx.clearRect(0, 0, CW, CH);
        if (lr) {
          cx.save(); cx.globalAlpha = 0.1; cx.drawImage(li, 0, 0, CW, CH); cx.restore();
        }

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
          requestAnimationFrame(frame);
        } else {
          cx.clearRect(0, 0, CW, CH);
          pf.style.width = '100%';
          finished = true;
          clearTimeout(safetyTimer);
          setTimeout(() => {
            pl.style.transition = 'opacity 0.5s ease';
            pl.style.opacity = '0';
            pl.style.pointerEvents = 'none';
            requestAnimationFrame(() => {
              st.classList.add('open');
              sb.classList.add('open');
            });
            setTimeout(() => {
              if (pl.parentNode) pl.remove();
              st.classList.add('gone'); sb.classList.add('gone');
              if (st.parentNode) st.remove();
              if (sb.parentNode) sb.remove();
            }, SPLIT + 100);
          }, HOLD);
        }
      }

      function startAnimation() {
        if (document.visibilityState === 'hidden') {
          // Page loaded in a background tab — wait until it's visible
          document.addEventListener('visibilitychange', onVisible);
          return;
        }
        li.onload = () => { lr = true; };
        li.onerror = () => { lr = false; };
        li.src = './Images/longlogo.svg';
        requestAnimationFrame(frame);
      }

      startAnimation();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
      initPreloader();
    }
  })();

  /* ══════════ 2. SPACE BACKGROUND ══════════ */
  (function () {
    var sc = document.getElementById('space-canvas');
    if (!sc) return;
    var sctx = sc.getContext('2d');
    var stars = [];
    var W, H;

    function res() {
      W = sc.width = window.innerWidth;
      H = sc.height = window.innerHeight;
      stars = [];
      for (var i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.1,
          o: Math.random() * 0.8 + 0.2,
          p: Math.random() * Math.PI,
          s: 0.02 + Math.random() * 0.03
        });
      }
    }
    window.addEventListener('resize', res);
    res();

    function loop() {
      sctx.fillStyle = '#02030a';
      sctx.fillRect(0, 0, W, H);
      stars.forEach(function (s) {
        s.p += s.s;
        var op = s.o * (0.6 + 0.4 * Math.sin(s.p));
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sctx.fillStyle = 'rgba(255,255,255,' + op + ')';
        sctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  })();

  /* ══════════ 3. INTERACTIVE CURSOR ══════════ */
  (function () {
    const dot = document.getElementById('cursor-dot');
    const cv = document.getElementById('cursor-canvas');
    if (!dot || !cv) return;
    const cx = cv.getContext('2d');
    let W, H;

    function rs() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    }
    window.addEventListener('resize', rs);
    rs();

    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      cr = 26,
      tr = 26;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function drcs() {
      cx.clearRect(0, 0, W, H);
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cr += (tr - cr) * 0.12;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (mx < 0) { requestAnimationFrame(drcs); return; }
      const g1 = cx.createRadialGradient(rx, ry, cr * 0.8, rx, ry, cr * 1.5);
      g1.addColorStop(0, 'rgba(128, 180, 255, 0.08)');
      g1.addColorStop(1, 'rgba(80, 140, 255, 0)');
      cx.beginPath(); cx.arc(rx, ry, cr * 1.5, 0, Math.PI * 2); cx.fillStyle = g1; cx.fill();
      cx.beginPath(); cx.arc(rx, ry, cr, 0, Math.PI * 2);
      const s1 = cx.createLinearGradient(rx - cr, ry - cr, rx + cr, ry + cr);
      s1.addColorStop(0, 'rgba(255,255,255,0.8)');
      s1.addColorStop(1, 'rgba(255,255,255,0.1)');
      cx.strokeStyle = s1; cx.lineWidth = 1.2; cx.stroke();
      requestAnimationFrame(drcs);
    }
    drcs();

    document.querySelectorAll('a, button, .nav-link, .nav-cta, .cc-card').forEach(el => {
      el.addEventListener('mouseenter', () => tr = 40);
      el.addEventListener('mouseleave', () => tr = 26);
    });
  })();

  /* ══════════ 4. SCROLL REVEAL ══════════ */
  (function () {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('sr-vis');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sr-elem, .orbit-visual-wrap, .channel-card, .collab-item, .orbit-text, .tz-heading, .tz-card').forEach(el => obs.observe(el));
  })();

  /* ══════════ 5. AUDIO SYSTEM ══════════ */
  (function () {
    const mbtn = document.getElementById('music-btn');
    const mbtnD = document.getElementById('music-btn-desktop');
    if (!mbtn && !mbtnD) return;
    const bga = new Audio('./Audio/ambient.mp3');
    bga.loop = true; bga.volume = 0.3;
    let playing = false;

    function toggleMusic(btn, btnOther) {
      if (!playing) {
        bga.play();
        if (btn) btn.classList.add('playing');
        if (btnOther) btnOther.classList.add('playing');
        playing = true;
      } else {
        bga.pause();
        if (btn) btn.classList.remove('playing');
        if (btnOther) btnOther.classList.remove('playing');
        playing = false;
      }
    }

    if (mbtn) mbtn.addEventListener('click', () => toggleMusic(mbtn, mbtnD));
    if (mbtnD) mbtnD.addEventListener('click', () => toggleMusic(mbtnD, mbtn));

    function makeSpectrum(canvasId) {
      const sv = document.getElementById(canvasId);
      if (!sv) return;
      const scx = sv.getContext('2d');
      const bars = 7;
      let bhs = Array(bars).fill(2);
      function drv() {
        scx.clearRect(0, 0, 26, 18);
        bhs.forEach((h, i) => {
          if (playing) {
            let th = 2 + Math.random() * 14;
            h += (th - h) * 0.2;
          } else {
            h += (2 - h) * 0.2;
          }
          bhs[i] = h;
          scx.fillStyle = 'rgba(255,255,255,0.8)';
          scx.fillRect(i * 4 + 1, 18 - h, 2, h);
        });
        requestAnimationFrame(drv);
      }
      drv();
    }

    makeSpectrum('spectrum-canvas');
    makeSpectrum('spectrum-canvas-desktop');
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

    if (!overlay || !cancelBtn || !confirmBtn) return;

    const closeModal = () => {
      overlay.classList.remove('active');
      setTimeout(() => { pendingUrl = ''; }, 300);
    };

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        if (url) {
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
        }
      });
    });

    cancelBtn.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
    confirmBtn.addEventListener('click', (e) => { e.stopPropagation(); if (pendingUrl) window.open(pendingUrl, '_blank'); closeModal(); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  })();

  /* ══════════ 7. COLLAB ACCORDION ══════════ */
  (function () {
    const items = document.querySelectorAll('.collab-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
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

    function openMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.classList.add('is-open');
      document.body.classList.add('menu-open');
      if (closeBtn) closeBtn.classList.add('visible');
      // animate links in
      mobileMenu.querySelectorAll('.mobile-menu-link').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.2)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
        }, 60 + i * 55);
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
        el.style.opacity = '0';
        el.style.transform = 'scale(0.2)';
      });
    }

    menuBtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) closeMenu();
      else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });
  })();

  /* ══════════ 9. TIMEZONE CLOCKS ══════════ */
  (function () {
    const zones = [
      { id: 'tz-colombo',  tz: 'Asia/Colombo' },
      { id: 'tz-london',   tz: 'Europe/London' },
      { id: 'tz-newyork',  tz: 'America/New_York' },
      { id: 'tz-sydney',   tz: 'Australia/Sydney' },
    ];
    function tick() {
      zones.forEach(({ id, tz }) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      });
    }
    tick();
    setInterval(tick, 1000);
  })();

})();