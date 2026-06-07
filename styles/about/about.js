/* ══════════ 1. SPACE-CANVAS-STARS ══════════ */
(function () {
        var DURATION = 7000;
        var N = 9;
        var current = 0;
        var timer = null;
        var wordTimers = [];

        var slides = document.querySelectorAll('.testi-slide');
        var dots = document.querySelectorAll('.testi-dot');
        var avs = document.querySelectorAll('.testi-avatar-thumb');
        var curEl = document.getElementById('testi-cur');
        var prog = document.getElementById('testi-prog');
        var shell = document.getElementById('testi-shell');
        var hint = document.getElementById('testi-hint');

        function pad(n) { return String(n + 1).padStart(2, '0'); }

        /* Wrap each word in a span on first access */
        function prepareQuote(slide) {
          var p = slide.querySelector('.testi-quote');
          if (!p || p.dataset.wrapped) return;
          var tokens = p.innerText.split(/(\s+)/);
          p.innerHTML = tokens.map(function (token) {
            if (/^\s+$/.test(token)) return token;
            return '<span class="tq-word">' + token + '</span>';
          }).join('');
          p.dataset.wrapped = '1';
        }

        /* Cancel any pending word-reveal timers */
        function cancelWordTimers() {
          wordTimers.forEach(function (t) { clearTimeout(t); });
          wordTimers = [];
        }

        /* Hide all words in a slide instantly */
        function resetWords(slide) {
          slide.querySelectorAll('.tq-word').forEach(function (w) {
            w.classList.remove('tq-vis');
          });
        }

        /* Staggered word reveal */
        function animateWords(slide) {
          cancelWordTimers();
          var words = slide.querySelectorAll('.tq-word');
          var stagger = Math.min(30, 2000 / Math.max(words.length, 1));
          words.forEach(function (w, i) {
            var delay = 120 + i * stagger;
            w.style.setProperty('--wd', delay + 'ms');
            wordTimers.push(setTimeout(function () { w.classList.add('tq-vis'); }, delay));
          });
        }

        function showSlide(idx) {
          var prev = current;
          current = ((idx % N) + N) % N;

          prepareQuote(slides[current]);
          resetWords(slides[prev]);
          cancelWordTimers();

          // Slide exit
          slides[prev].classList.remove('active');
          slides[prev].classList.add('exit');
          setTimeout(function () { slides[prev].classList.remove('exit'); }, 600);

          // Slide enter
          slides[current].classList.add('active');
          animateWords(slides[current]);

          // Counter
          curEl.style.opacity = '0';
          setTimeout(function () {
            curEl.textContent = pad(current);
            curEl.style.opacity = '1';
          }, 180);

          // Avatar highlights
          avs.forEach(function (a, i) {
            a.classList.toggle('current-av', i === current);
          });

          // Dots
          dots.forEach(function (d, i) {
            d.classList.toggle('active', i === current);
          });

          // Reset + restart progress bar
          prog.style.transition = 'none';
          prog.style.width = '0%';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              prog.style.transition = 'width ' + DURATION + 'ms linear';
              prog.style.width = '100%';
            });
          });
        }

        function startAuto() {
          clearInterval(timer);
          timer = setInterval(function () { showSlide(current + 1); }, DURATION);
          prog.style.transition = 'width ' + DURATION + 'ms linear';
          prog.style.width = '100%';
        }

        // Prev / Next
        document.getElementById('testi-prev').addEventListener('click', function (e) {
          e.stopPropagation();
          showSlide(current - 1);
          startAuto();
        });
        document.getElementById('testi-next').addEventListener('click', function (e) {
          e.stopPropagation();
          showSlide(current + 1);
          startAuto();
        });

        // Dot clicks
        dots.forEach(function (dot, i) {
          dot.addEventListener('click', function () {
            showSlide(i);
            startAuto();
          });
        });

        // Avatar clicks
        avs.forEach(function (av, i) {
          av.addEventListener('click', function () {
            showSlide(i);
            startAuto();
          });
        });

        shell.addEventListener('mouseenter', function () { });
        shell.addEventListener('mouseleave', function () { });

        // Boot
        prepareQuote(slides[0]);
        slides[0].classList.add('active');
        animateWords(slides[0]);
        startAuto();
      })();


/* ══════════ 2. NAV-MOBILE-MUSIC ══════════ */
(function () {
      const canvas = document.getElementById('space-canvas');
      const ctx = canvas.getContext('2d');
      let W, H;
      function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
      resize(); window.addEventListener('resize', resize);

      const stars = Array.from({ length: 200 }, () => ({
        x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.2,
        baseA: Math.random() * 0.55 + 0.3, phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.003,
        driftX: (Math.random() - 0.5) * 0.00007, driftY: (Math.random() - 0.5) * 0.00003,
      }));
      const shooters = [];
      function spawnShooter() {
        const a = (Math.random() * 30 + 10) * Math.PI / 180, sp = Math.random() * 5 + 4;
        shooters.push({
          x: Math.random() * W, y: Math.random() * H * 0.4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          len: Math.random() * 100 + 50, alpha: 1, decay: Math.random() * 0.014 + 0.009
        });
      }
      setInterval(() => { if (Math.random() < 0.35) spawnShooter(); }, 3000);

      const aC = [[0, 220, 160], [90, 70, 240], [0, 180, 110], [50, 165, 240]];
      const auroras = Array.from({ length: 3 }, (_, i) => ({
        color: aC[i], yBase: 0.04 + Math.random() * 0.18, amp: 35 + Math.random() * 50,
        freq: 0.0007 + Math.random() * 0.0005, phaseOff: Math.random() * Math.PI * 2,
        phaseSpd: 0.00025 + Math.random() * 0.00025, thickness: 55 + Math.random() * 70,
        alpha: 0, targetA: 0, fadeSpd: 0.0012 + Math.random() * 0.0008,
        nextShow: Math.random() * 5000, showDur: 5000 + Math.random() * 7000, timer: 0, showing: false,
      }));
      let auroraSteps = Math.ceil(window.innerWidth / 5);
      window.addEventListener('resize', () => { auroraSteps = Math.ceil(window.innerWidth / 5); });

      let lt = 0;
      function draw(ts) {
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
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
    })();


/* ══════════ 3. PRELOADER ══════════ */
(function () {
      const preloader = document.getElementById('preloader');
      const canvas = document.getElementById('preloader-canvas');
      const ctx = canvas.getContext('2d');
      const progressFill = document.getElementById('progress-fill');
      const splitTop = document.getElementById('split-top');
      const splitBottom = document.getElementById('split-bottom');

      const CW = 900, CH = 240;
      canvas.width = CW; canvas.height = CH;

      const DURATION = 2200;
      const HOLD_MS = 300;
      const SPLIT_MS = 900;

      let startTime = null, fillPct = 0, wavePhase = 0;
      let logoImg = new Image(), logoReady = false;

      function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

      // Generate stars for Aurora Background
      const starsContainer = document.getElementById('preloader-stars');
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
        }
      }

      function drawFrame(ts) {
        if (!startTime) startTime = ts;
        const raw = Math.min((ts - startTime) / DURATION, 1);
        fillPct = ease(raw);
        wavePhase += 0.045;

        progressFill.style.width = (fillPct * 100) + '%';
        ctx.clearRect(0, 0, CW, CH);

        // Ghost logo
        if (logoReady) { ctx.save(); ctx.globalAlpha = 0.1; ctx.drawImage(logoImg, 0, 0, CW, CH); ctx.restore(); }

        // Water clip
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

        // Wave shimmer
        ctx.save(); ctx.beginPath(); ctx.moveTo(0, waterTop);
        for (let x = 0; x <= CW; x += 3) {
          const y = waterTop + Math.sin((x / CW) * Math.PI * 5 + wavePhase) * amp + Math.sin((x / CW) * Math.PI * 9 + wavePhase * 1.5) * amp * 0.35;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();

        if (raw < 1) {
          requestAnimationFrame(drawFrame);
        } else {
          // Final frame
          ctx.clearRect(0, 0, CW, CH);
          if (logoReady) { ctx.save(); ctx.drawImage(logoImg, 0, 0, CW, CH); ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, CW, CH); ctx.restore(); }
          progressFill.style.width = '100%';

          setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            requestAnimationFrame(() => {
              splitTop.classList.add('open');
              splitBottom.classList.add('open');
            });
            setTimeout(() => {
              preloader.remove();
              splitTop.classList.add('gone'); splitBottom.classList.add('gone');
              splitTop.remove(); splitBottom.remove();
            }, SPLIT_MS + 100);
          }, HOLD_MS);
        }
      }

      logoImg.onload = () => { logoReady = true; };
      logoImg.onerror = () => { logoReady = false; };
      logoImg.src = './Images/longlogo.svg';
      requestAnimationFrame(drawFrame);
    })();


/* ══════════ 4. CURSOR-MUSIC-SOUNDS ══════════ */
(function () {
      /* ── Cursor ── */
      const cursorCanvas = document.getElementById('cursor-canvas');
      const cCtx = cursorCanvas.getContext('2d');
      let W, H;
      function resize() { W = cursorCanvas.width = window.innerWidth; H = cursorCanvas.height = window.innerHeight; }
      resize(); window.addEventListener('resize', resize);

      let mX = -300, mY = -300, rX = -300, rY = -300, currentR = 26, targetR = 26;
      const R_NORMAL = 26, R_HOVER = 36;

      function drawCursor() {
        cCtx.clearRect(0, 0, W, H);
        // Disable liquid cursor render on mobile view
        if (W <= 900) {
            requestAnimationFrame(drawCursor);
            return;
        }

        rX += (mX - rX) * 0.1; rY += (mY - rY) * 0.1; currentR += (targetR - currentR) * 0.08;
        const R = currentR, cx = rX, cy = rY;
        if (mX < -200) { requestAnimationFrame(drawCursor); return; }
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
        requestAnimationFrame(drawCursor);
      }
      requestAnimationFrame(drawCursor);
      document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
      document.addEventListener('mouseleave', () => { mX = -300; mY = -300; });
      document.querySelectorAll('a,button,.nav-link,.nav-cta,.skill-tag,.stat-pill,.about-block').forEach(el => {
        el.addEventListener('mouseenter', () => { targetR = R_HOVER; });
        el.addEventListener('mouseleave', () => { targetR = R_NORMAL; });
      });

      /* ── Audio ── */
      let audioCtx = null;
      function getAC() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume(); return audioCtx; }

      const bgAudio = new Audio();
      bgAudio.src = './audio/ambient.mp3'; bgAudio.loop = true; bgAudio.volume = 0; bgAudio.preload = 'auto';
      const MUSIC_VOLUME = 0.35;
      let musicMuted = false, musicStarted = false;

      function fadeAudioTo(target, durationMs) {
        const steps = 50, stepMs = durationMs / steps, delta = (target - bgAudio.volume) / steps;
        let count = 0;
        const iv = setInterval(() => { count++; bgAudio.volume = Math.max(0, Math.min(1, bgAudio.volume + delta)); if (count >= steps) { clearInterval(iv); bgAudio.volume = target; } }, stepMs);
      }

      let spectrumPlaying = false;

      function startMusic() {
        if (musicStarted) return;
        musicStarted = true;
        bgAudio.volume = 0;

        // Resume from where home page left off
        const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
        const savedMuted = sessionStorage.getItem('musicMuted') === 'true';
        if (savedTime > 0) bgAudio.currentTime = savedTime;

        if (savedMuted) {
          // Was muted — stay muted, don't play
          musicMuted = true;
          spectrumPlaying = false;
          return;
        }

        bgAudio.play().then(() => {
          fadeAudioTo(MUSIC_VOLUME, 800);
          // Sync both desktop + mobile buttons
          document.querySelectorAll('#music-btn-desktop, #music-btn').forEach(b => b && b.classList.add('playing'));
          spectrumPlaying = true;
        }).catch(() => { musicStarted = false; });
      }

      // Save position before navigating away
      function savePos() {
        sessionStorage.setItem('musicTime', String(bgAudio.currentTime));
        sessionStorage.setItem('musicMuted', String(musicMuted));
      }
      window.addEventListener('pagehide', savePos);
      window.addEventListener('beforeunload', savePos);

      function onFirstInteraction() {
        ['mousemove', 'mouseenter', 'pointerdown', 'touchstart', 'keydown', 'click'].forEach(ev => window.removeEventListener(ev, onFirstInteraction));
        startMusic();
      }
      ['mousemove', 'mouseenter', 'pointerdown', 'touchstart', 'keydown', 'click'].forEach(ev => window.addEventListener(ev, onFirstInteraction, { once: true, passive: ev !== 'keydown' }));

      /* Music btns — desktop fixed button + mobile topbar button, kept in sync */
      const musicBtnDesktop = document.getElementById('music-btn-desktop');
      const musicBtnMobile = document.getElementById('music-btn');
      const allMusicBtns = [musicBtnDesktop, musicBtnMobile].filter(Boolean);

      /* Spectrum on desktop canvas */
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
      function drawSpectrum(ts) {
        const dt = Math.min((ts - lastSpec) / 1000, 0.05); lastSpec = ts;
        bars.forEach(bar => {
          if (spectrumPlaying) { bar.phase += bar.speed * dt; bar.targetH = 2 + ((Math.sin(bar.phase) * 0.5 + 0.5)) * (SH - 3); }
          else bar.targetH = 1;
          bar.currentH += (bar.targetH - bar.currentH) * 0.18;
        });
        drawBarsOnCtx(spCtx);
        drawBarsOnCtx(spCtxM);
        requestAnimationFrame(drawSpectrum);
      }
      requestAnimationFrame(drawSpectrum);

      function setMusicPlaying(playing) {
        allMusicBtns.forEach(btn => { if (!btn) return; playing ? btn.classList.add('playing') : btn.classList.remove('playing'); });
        spectrumPlaying = playing;
      }

      allMusicBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', e => {
          e.stopPropagation();
          if (!musicStarted) { startMusic(); musicMuted = false; }
          else {
            musicMuted = !musicMuted;
            if (musicMuted) { fadeAudioTo(0, 600); setMusicPlaying(false); }
            else { bgAudio.play().catch(() => { }); fadeAudioTo(MUSIC_VOLUME, 600); setMusicPlaying(true); }
          }
        });
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
        el.addEventListener('mouseenter', playHover);
        el.addEventListener('click', () => playClick(false));
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
      document.addEventListener('click', e => { playClick(false); spawnParticles(e.clientX, e.clientY); });

      /* ══════════════════════════════════════
         MOBILE MENU TOGGLE
      ══════════════════════════════════════ */
      const menuBtn = document.getElementById('menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuCloseMob = document.getElementById('menu-close-mobile');
      const menuLinks = document.querySelectorAll('.mobile-menu-link');

      // Detect current page and mark active link
      const currentPage = document.body.dataset.page || 'about';
      menuLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === currentPage);
      });

      // Inject keyframes once
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
      }

      function openMobileMenu() {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        menuBtn.classList.add('is-open');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuCloseMob.classList.add('visible');
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
        setTimeout(() => {
          mobileMenu.classList.remove('open');
          mobileMenu.setAttribute('aria-hidden', 'true');
          menuBtn.classList.remove('is-open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuCloseMob.classList.remove('visible');
          document.body.classList.remove('menu-open');
        }, closeDur - 150);
      }

      menuBtn.addEventListener('click', e => {
        e.stopPropagation();
        mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
      });

      menuCloseMob.addEventListener('click', e => {
        e.stopPropagation();
        closeMobileMenu();
      });

      // Close on overlay backdrop click
      mobileMenu.addEventListener('click', e => {
        if (e.target === mobileMenu) closeMobileMenu();
      });

      // Close on Escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
      });

    })();


/* ══════════ 5. CV-MODAL ══════════ */
function openCVModal() {
      document.getElementById('cv-close-btn').classList.add('visible');
      const overlay = document.getElementById('cv-modal-overlay');
      overlay.setAttribute('aria-hidden', 'false');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeCVModal(event) {
      // Only close if clicking the overlay backdrop itself
      if (event && event.target !== document.getElementById('cv-modal-overlay')) return;
      _doCloseCVModal();
    }

    function closeCVModalDirect() {
      _doCloseCVModal();
    }

    function _doCloseCVModal() {
      document.getElementById('cv-close-btn').classList.remove('visible');
      const overlay = document.getElementById('cv-modal-overlay');
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') _doCloseCVModal();
    });


/* ══════════ 6. TESTIMONIALS ══════════ */
(function () {
      const inner = document.getElementById('logo-ticker-inner');
      const setA = document.getElementById('ticker-set-a');
      if (!inner || !setA) return;

      const PX_PER_SEC = 70;
      let setWidth = 0;
      let offset = 0;
      let last = null;
      let rafId = null;

      function measure() {
        setWidth = setA.offsetWidth;
        // Start half-way into Set A so the left edge always shows a mid-sequence logo
        // (never the very first logo flush against the left fade)
        if (offset === 0) offset = setWidth * 0.5;
      }

      function frame(ts) {
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
        window.addEventListener('load', start);
      }

      window.addEventListener('resize', measure);
    })();


/* ══════════ 7. NAV-SCROLL ══════════ */
(function () {
      /* ── Scroll-reveal using IntersectionObserver ── */
      const bioTargets = document.querySelectorAll('.bio-greeting-line, .bio-para');
      if ('IntersectionObserver' in window) {
        const revealObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('bio-visible');
              revealObs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
        bioTargets.forEach(el => revealObs.observe(el));
      } else {
        // Fallback — show everything immediately
        bioTargets.forEach(el => el.classList.add('bio-visible'));
      }

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
      window.addEventListener('resize', resize);

      /* Orbs — slow drifting glowing blobs */
      const ORBS = Array.from({ length: 7 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 80 + Math.random() * 140,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.00008,
        hue: Math.random() < 0.6 ? 200 : 260,   // cyan or purple
        alpha: 0.04 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        phaseSpd: 0.002 + Math.random() * 0.003,
      }));

      /* Tiny floating particles */
      const PARTICLES = Array.from({ length: 40 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.5 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.00008,
        vy: -0.00004 - Math.random() * 0.00006,
        alpha: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        phaseSpd: 0.01 + Math.random() * 0.015,
      }));

      let bioRaf;
      function drawBio(ts) {
        bioRaf = requestAnimationFrame(drawBio);
        ctx.clearRect(0, 0, W, H);

        /* Draw orbs */
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

        /* Draw particles */
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

        /* Faint horizontal scan-line that drifts top to bottom */
        const scanY = (ts * 0.00006 % 1) * H;
        const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
        scanGrad.addColorStop(0, 'rgba(140,210,255,0)');
        scanGrad.addColorStop(0.5, 'rgba(140,210,255,0.025)');
        scanGrad.addColorStop(1, 'rgba(140,210,255,0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 60, W, 120);
      }

      /* Only run canvas when bio section is visible (perf) */
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
    })();


/* ══════════ 8. SCROLL-REVEAL ══════════ */
(function () {
      var showAll = function () {
        document.querySelectorAll('.about-grid, .about-block, .techstack-heading, .stack-panel, .snode')
          .forEach(function (el) { el.classList.add('sr-vis'); });
      };

      if (!('IntersectionObserver' in window)) { showAll(); return; }

      var opts = { threshold: 0.07, rootMargin: '0px 0px -30px 0px' };

      // about-grid wrapper (just makes it visible so layout works)
      var gridObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('sr-vis'); gridObs.unobserve(e.target); }
        });
      }, opts);
      document.querySelectorAll('.about-grid').forEach(function (el) { gridObs.observe(el); });

      // about-block cards — staggered individually
      var blockObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('sr-vis'); blockObs.unobserve(e.target); }
        });
      }, opts);
      document.querySelectorAll('.about-block').forEach(function (el, i) {
        el.style.setProperty('--sr-delay', (i * 0.12) + 's');
        blockObs.observe(el);
      });

      // techstack heading
      var headObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('sr-vis'); headObs.unobserve(e.target); }
        });
      }, opts);
      document.querySelectorAll('.techstack-heading').forEach(function (el) { headObs.observe(el); });

      // stack panels — staggered
      var panelObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('sr-vis'); panelObs.unobserve(e.target); }
        });
      }, opts);
      document.querySelectorAll('.stack-panel').forEach(function (el, i) {
        el.style.setProperty('--sr-delay', (i * 0.1) + 's');
        panelObs.observe(el);
      });

      // snodes — staggered within each panel
      var snodeObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('sr-vis'); snodeObs.unobserve(e.target); }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
      document.querySelectorAll('.snode').forEach(function (el, i) {
        el.style.setProperty('--sr-delay', ((i % 9) * 0.06) + 's');
        snodeObs.observe(el);
      });

      // stat items — count-up animation on scroll
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
          setTimeout(function () {
            requestAnimationFrame(function step(ts) {
              if (!start) start = ts;
              var progress = Math.min((ts - start) / duration, 1);
              numEl.textContent = Math.floor(easeOut(progress) * target);
              if (progress < 1) requestAnimationFrame(step);
              else numEl.textContent = target;
            });
          }, delay);
          statObs.unobserve(item);
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.stat-item').forEach(function (el) {
        el.classList.remove('sr-vis');
        statObs.observe(el);
      });

      // UFO pillar count-up + fade-in on scroll
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
          setTimeout(function () {
            requestAnimationFrame(function step(ts) {
              if (!start) start = ts;
              var progress = Math.min((ts - start) / duration, 1);
              numEl.textContent = Math.floor(easeOut(progress) * target);
              if (progress < 1) requestAnimationFrame(step);
              else numEl.textContent = target;
            });
          }, delay);
          pillarObs.unobserve(pillar);
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.ufo-pillar').forEach(function (el) {
        pillarObs.observe(el);
      });

    })();


/* ══════════ 9. STAT-COUNTUP ══════════ */
const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-target'));
          let count = 0;
          const step = countTo / 50;

          const updateCount = () => {
            count += step;
            if (count < countTo) {
              target.innerText = Math.floor(count);
              requestAnimationFrame(updateCount);
            } else {
              target.innerText = countTo;
            }
          };
          updateCount();
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(num => observer.observe(num));


/* ══════════ 10. GAMING-REVEAL ══════════ */
(function () {
      // Gaming heading reveal
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

      // Gaming cards staggered reveal
      var gcCards = document.querySelectorAll('.platform-card');
      if ('IntersectionObserver' in window) {
        var gcObs = new IntersectionObserver(function (entries) {
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
    })();

/* ══════════ 9. REDIRECTION MODAL SYSTEM ══════════ */
(function() {
  const modalOverlay = document.getElementById('cert-prompt-overlay');
  const modalIconWrap = document.getElementById('modal-icon-wrap');
  const modalDetailBox = document.getElementById('modal-detail-box');
  const modalActionText = document.getElementById('modal-action-text');
  const modalCancel = document.getElementById('modal-cancel');
  const modalConfirm = document.getElementById('modal-confirm');
  
  if (!modalOverlay) return;

  var pendingUrl = "";

  document.querySelectorAll('.platform-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (this.dataset.url) {
        e.preventDefault();
        pendingUrl = this.dataset.url;
        
        // Sync Icon
        var iconSource = this.querySelector('.pc-icon-wrap');
        if (iconSource) modalIconWrap.innerHTML = iconSource.innerHTML;
        
        // Sync Details
        modalDetailBox.textContent = this.dataset.detail || this.dataset.name || "External Link";
        modalActionText.textContent = this.dataset.action || "the application";
        
        // Dynamic Theme Colors based on platform card CSS variables
        var computed = getComputedStyle(this);
        var color = computed.getPropertyValue('--pc-color').trim() || '#fff';
        var glow = computed.getPropertyValue('--pc-glow').trim() || 'rgba(255,255,255,0.2)';
        
        document.documentElement.style.setProperty('--cc-color', color);
        document.documentElement.style.setProperty('--cc-glow', glow);
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modalConfirm) {
    modalConfirm.addEventListener('click', function() {
      if (pendingUrl) window.open(pendingUrl, '_blank');
      closeModal();
    });
  }

  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });
})();