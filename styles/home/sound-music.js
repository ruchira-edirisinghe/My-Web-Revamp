/* ════════════════════════════════════════
   sound-music.js — Ambient music, spectrum visualiser & interaction sounds
   ════════════════════════════════════════ */
(function () {
  /* ── Audio Context ── */
  let audioCtx = null;
  function getAC() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  let musicMuted    = false;
  let musicStarted  = false;
  let spectrumPlaying = false;

  const bgAudio = new Audio('./audio/ambient.mp3');
  bgAudio.loop      = true;
  bgAudio.volume    = 0;
  bgAudio.preload   = 'auto';
  bgAudio.playsInline = true;

  const MUSIC_VOLUME  = 0.25;
  const musicBtn      = document.getElementById('music-btn');
  const photoWrapper  = document.getElementById('photo-wrapper');

  /* ── Volume fade helper ── */
  function fadeAudioTo(target, durationMs) {
    const start     = bgAudio.volume;
    const diff      = target - start;
    const startTime = performance.now();

    function step(now) {
      const progress  = Math.min((now - startTime) / durationMs, 1);
      bgAudio.volume  = start + diff * progress;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── Start music ── */
  async function startMusic(force = false) {
    if (musicStarted && !force) return;

    try {
      await getAC().resume();

      const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
      // When forced by user interaction, always play — never let saved muted state block it
      const shouldMute = !force && sessionStorage.getItem('musicMuted') === 'true';

      bgAudio.muted  = false;
      bgAudio.volume = 0;
      if (savedTime > 0) bgAudio.currentTime = savedTime;

      if (!shouldMute) {
        await bgAudio.play();
        // Clear any stale muted flag so future page loads don't inherit it
        sessionStorage.setItem('musicMuted', 'false');
      }

      musicStarted    = true;
      musicMuted      = shouldMute;
      spectrumPlaying = !shouldMute;
      if (!shouldMute) musicBtn.classList.add('playing');
      if (!shouldMute) fadeAudioTo(MUSIC_VOLUME, 1800);

    } catch (err) {
      console.warn('Playback blocked:', err);
    }
  }

  /* ── Persist playback position across page navigations ── */
  function saveState() {
    sessionStorage.setItem('musicTime',  String(bgAudio.currentTime));
    sessionStorage.setItem('musicMuted', String(musicMuted));
  }
  window.addEventListener('pagehide',     saveState);
  window.addEventListener('beforeunload', saveState);

  /* ── Stop music ── */
  function stopMusic() {
    fadeAudioTo(0, 500);
    setTimeout(() => { bgAudio.pause(); }, 520);
    musicBtn.classList.remove('playing');
    spectrumPlaying = false;
    musicMuted      = true;
  }

  /* ── Toggle ── */
  function toggleMusic() {
    if (!musicStarted || bgAudio.paused || musicMuted) {
      startMusic(true);
    } else {
      stopMusic();
    }
  }

  musicBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleMusic();
  });

  /* ── Start triggers ──
     Desktop: hover over photo OR any button/link, OR click anywhere
     Mobile/touch: first touch anywhere
  ── */
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  let musicTriggered = false;
  function triggerMusic() {
    if (musicTriggered) return;
    musicTriggered = true;
    startMusic(true);
  }

  // Photo hover (desktop)
  if (photoWrapper) {
    photoWrapper.addEventListener('mouseenter', triggerMusic, { once: true });
  }

  // Any button / interactive element hover (desktop)
  document.querySelectorAll('a, button, .btn, .menu-item').forEach(el => {
    el.addEventListener('mouseenter', triggerMusic, { once: true });
  });

  // Any click anywhere (desktop) — the most reliable fallback
  window.addEventListener('click', triggerMusic, { once: true });

  // Touch devices: first touch or pointer
  if (isTouchDevice()) {
    window.addEventListener('touchstart',  triggerMusic, { once: true, passive: true });
    window.addEventListener('pointerdown', triggerMusic, { once: true, passive: true });
  }

  /* ════════════════════════════════════════
     SPECTRUM ANIMATION
  ════════════════════════════════════════ */
  const specCanvas = document.getElementById('spectrum-canvas');
  const spCtx      = specCanvas.getContext('2d');
  const SW         = specCanvas.width;
  const SH         = specCanvas.height;

  const BAR_COUNT = 7;
  const BAR_W     = 2;
  const BAR_GAP   = 2;
  const TOTAL_W   = BAR_COUNT * BAR_W + (BAR_COUNT - 1) * BAR_GAP;
  const LEFT_OFF  = (SW - TOTAL_W) / 2;

  const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
    phase:    i * (Math.PI * 2 / BAR_COUNT) + Math.random() * 0.5,
    speed:    2.8 + Math.random() * 2.2,
    currentH: 1,
    targetH:  1,
  }));

  let lastSpec = 0;
  let specRunning = true;
  function drawSpectrum(ts) {
    if (!specRunning) return;
    const dt = Math.min((ts - lastSpec) / 1000, 0.05);
    lastSpec = ts;

    spCtx.clearRect(0, 0, SW, SH);

    bars.forEach((bar, i) => {
      if (spectrumPlaying) {
        bar.phase   += bar.speed * dt;
        bar.targetH  = 2 + ((Math.sin(bar.phase) * 0.5 + 0.5)) * (SH - 3);
      } else {
        bar.targetH = 1;
      }
      bar.currentH += (bar.targetH - bar.currentH) * 0.18;

      const x    = LEFT_OFF + i * (BAR_W + BAR_GAP);
      const h    = Math.max(1, bar.currentH);
      const y    = (SH - h) / 2;
      const grad = spCtx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0,   'rgba(255,255,255,0.95)');
      grad.addColorStop(0.5, 'rgba(200,225,255,0.75)');
      grad.addColorStop(1,   'rgba(150,190,255,0.45)');

      spCtx.fillStyle = grad;
      spCtx.beginPath();
      spCtx.roundRect(x, y, BAR_W, h, 1);
      spCtx.fill();
    });

    requestAnimationFrame(drawSpectrum);
  }
  requestAnimationFrame(drawSpectrum);

  // Idle the spectrum loop while the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      specRunning = false;
    } else if (!specRunning) {
      specRunning = true;
      lastSpec = performance.now();
      requestAnimationFrame(drawSpectrum);
    }
  });

  /* ════════════════════════════════════════
     CLICK SOUND
  ════════════════════════════════════════ */
  function playClick(isButton) {
    try {
      const ac   = getAC();
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      const filt = ac.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isButton ? 900 : 660, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isButton ? 600 : 440, ac.currentTime + 0.12);

      filt.type = 'lowpass';
      filt.frequency.value = 3000;

      gain.gain.setValueAtTime(0, ac.currentTime);
      gain.gain.linearRampToValueAtTime(isButton ? 0.35 : 0.2, ac.currentTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + (isButton ? 0.28 : 0.18));

      osc.connect(filt); filt.connect(gain); gain.connect(ac.destination);
      osc.start(); osc.stop(ac.currentTime + 0.25);
    } catch (e) {}
  }

  function playHover() {
    try {
      const ac   = getAC();
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      const filt = ac.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ac.currentTime);
      osc.frequency.linearRampToValueAtTime(520, ac.currentTime + 0.08);

      filt.type = 'bandpass';
      filt.frequency.value = 1000;
      filt.Q.value = 2;

      gain.gain.setValueAtTime(0, ac.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ac.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.14);

      osc.connect(filt); filt.connect(gain); gain.connect(ac.destination);
      osc.start(); osc.stop(ac.currentTime + 0.14);
    } catch (e) {}
  }

  /* ════════════════════════════════════════
     RIPPLE & PARTICLE EFFECTS
  ════════════════════════════════════════ */
  function spawnRipple(btn, e) {
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className  = 'ripple';
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
    `;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  function spawnParticles(x, y) {
    // Cap concurrent particles so rapid clicking can't flood the DOM
    if (document.querySelectorAll('.click-particle').length > 24) return;
    const colors = [
      'rgba(255,255,255,0.7)',
      'rgba(180,220,255,0.65)',
      'rgba(200,200,255,0.55)'
    ];
    for (let i = 0; i < 6; i++) {
      const p     = document.createElement('div');
      p.className = 'click-particle';
      const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist  = 28 + Math.random() * 22;
      p.style.cssText = `
        left:${x}px; top:${y}px;
        width:${3 + Math.random() * 3}px;
        height:${3 + Math.random() * 3}px;
        background:${colors[i % colors.length]};
        --tx:calc(-50% + ${Math.cos(angle) * dist}px);
        --ty:calc(-50% + ${Math.sin(angle) * dist}px);
        animation-duration:${0.45 + Math.random() * 0.15}s;
      `;
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  /* ── Attach interaction sounds ── */
  const interactiveSelectors = '.btn, .menu-item, .social-links a, #menu-close, #music-btn';

  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', playHover);
  });

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      spawnRipple(btn, e);
      playClick(true);
      spawnParticles(e.clientX, e.clientY);
    });
  });

  document.querySelectorAll('.menu-item, .social-links a').forEach(el => {
    el.addEventListener('click', e => {
      playClick(false);
      spawnParticles(e.clientX, e.clientY);
    });
  });

  document.addEventListener('click', e => {
    const isHandled = e.target.closest('.btn, .menu-item, .social-links a, #music-btn');
    if (!isHandled) {
      playClick(false);
      spawnParticles(e.clientX, e.clientY);
    }
  });
})();
