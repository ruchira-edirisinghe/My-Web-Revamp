// @ts-nocheck
/* ════════════════════════════════════════
   sound-music.ts - Ambient music, spectrum visualiser & interaction sounds
   (faithful port of styles/home/sound-music.js)
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { wireAmbientControls } from './ambient-audio';

export function initSoundMusic(): () => void {
  const bag = makeBag();

  /* ── Audio Context ── */
  let audioCtx = null;
  function getAC() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  let spectrumPlaying = false;

  const musicBtn   = document.getElementById('music-btn');
  const specCanvas = document.getElementById('spectrum-canvas');
  if (!musicBtn || !specCanvas) return () => {};

  /* ── Ambient music ──
     Play/pause, volume fades, and cross-page continuity are owned by the shared
     singleton (lib/scripts/ambient-audio.ts) - one <audio> element persists for
     the whole SPA session, so navigating never restarts the track and a pause on
     any page stays paused on every other page. This engine only mirrors the
     playing state into `spectrumPlaying` to animate its visualiser. */
  bag.add(wireAmbientControls(playing => { spectrumPlaying = playing; }));

  /* ════════════════════════════════════════
     SPECTRUM ANIMATION
  ════════════════════════════════════════ */
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
  let specRaf = 0;
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

    specRaf = requestAnimationFrame(drawSpectrum);
  }
  specRaf = requestAnimationFrame(drawSpectrum);

  bag.on(document, 'visibilitychange', () => {
    if (document.hidden) {
      specRunning = false;
    } else if (!specRunning) {
      specRunning = true;
      lastSpec = performance.now();
      specRaf = requestAnimationFrame(drawSpectrum);
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
    bag.on(el, 'mouseenter', playHover);
  });

  document.querySelectorAll('.btn').forEach(btn => {
    bag.on(btn, 'click', e => {
      spawnRipple(btn, e);
      playClick(true);
      spawnParticles(e.clientX, e.clientY);
    });
  });

  document.querySelectorAll('.menu-item, .social-links a').forEach(el => {
    bag.on(el, 'click', e => {
      playClick(false);
      spawnParticles(e.clientX, e.clientY);
    });
  });

  bag.on(document, 'click', e => {
    const isHandled = e.target.closest('.btn, .menu-item, .social-links a, #music-btn');
    if (!isHandled) {
      playClick(false);
      spawnParticles(e.clientX, e.clientY);
    }
  });

  bag.add(() => {
    specRunning = false;
    cancelAnimationFrame(specRaf);
    try { if (audioCtx) audioCtx.close(); } catch {}
    document.querySelectorAll('.click-particle').forEach(p => p.remove());
  });
  return () => bag.dispose();
}
