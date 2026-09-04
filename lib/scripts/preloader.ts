// @ts-nocheck
/* ════════════════════════════════════════
   preloader.ts - Water-fill preloader & split-screen reveal
   (faithful port of styles/home/preloader.js)

   Adapted for React: the original removed the preloader / split panels from the
   DOM via .remove(); since those nodes are React-rendered, we hide them instead
   (visually identical) to avoid React reconciliation errors on unmount.
   ════════════════════════════════════════ */
import { makeBag } from './_util';
import { initPreloaderFx } from './preloader-fx';

export function initPreloader(): () => void {
  const bag = makeBag();
  initPreloaderFx(bag);
  const preloader    = document.getElementById('preloader');
  const canvas       = document.getElementById('preloader-canvas');
  const progressFill = document.getElementById('progress-fill');
  const splitTop     = document.getElementById('split-top');
  const splitBottom  = document.getElementById('split-bottom');
  if (!preloader || !canvas || !progressFill || !splitTop || !splitBottom) return () => {};
  if (preloader.style.display === 'none') return () => {};
  const ctx = canvas.getContext('2d');

  const CW = 900, CH = 240;
  canvas.width  = CW;
  canvas.height = CH;

  const DURATION = 2600;
  const HOLD_MS  = 320;
  const SPLIT_MS = 900; // matches CSS transition

  let startTime = null;
  let lastTs    = 0;
  let fillPct   = 0;
  let wavePhase = 0;
  let logoImg   = new Image();
  let logoReady = false;
  let rafId = 0;
  let alive = true;

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  // Generate stars for Aurora Background
  const starsContainer = document.getElementById('preloader-stars');
  const createdStars: HTMLElement[] = [];
  if (starsContainer) {
    const starCount = 34;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'preloader-star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 0.8 + Math.pow(Math.random(), 2) * 1.5;
        const delay = Math.random() * 6;
        const duration = 3.5 + Math.random() * 4.5;
        const opacity = 0.18 + Math.random() * 0.3;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--star-opacity', opacity);
        star.style.animation = `star-twinkle ${duration}s infinite ${delay}s ease-in-out`;
        starsContainer.appendChild(star);
        createdStars.push(star);
    }
  }

  const timeouts: any[] = [];
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

  function drawFrame(ts) {
    if (!alive) return;
    if (!startTime) { startTime = ts; lastTs = ts; }
    const dt = Math.min(ts - lastTs, 50); lastTs = ts;
    const raw = Math.min((ts - startTime) / DURATION, 1);
    fillPct   = ease(raw);
    wavePhase += 0.045 * (dt / 16.667);

    progressFill.style.width = (fillPct * 100) + '%';

    ctx.clearRect(0, 0, CW, CH);

    if (logoReady) {
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.drawImage(logoImg, 0, 0, CW, CH);
      ctx.restore();
    }

    const waterTop = CH * (1 - fillPct);
    const amp      = 5 + (1 - fillPct) * 9;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, waterTop);
    for (let x = 0; x <= CW; x += 3) {
      const y = waterTop
        + Math.sin((x / CW) * Math.PI * 5 + wavePhase) * amp
        + Math.sin((x / CW) * Math.PI * 9 + wavePhase * 1.5) * amp * 0.35;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(CW, CH); ctx.lineTo(0, CH);
    ctx.closePath();
    ctx.clip();

    if (logoReady) {
      ctx.globalAlpha = 1;
      ctx.drawImage(logoImg, 0, 0, CW, CH);
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, CW, CH);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillRect(0, 0, CW, CH);
    }
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, waterTop);
    for (let x = 0; x <= CW; x += 3) {
      const y = waterTop
        + Math.sin((x / CW) * Math.PI * 5 + wavePhase) * amp
        + Math.sin((x / CW) * Math.PI * 9 + wavePhase * 1.5) * amp * 0.35;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    if (raw < 1) {
      rafId = requestAnimationFrame(drawFrame);
    } else {
      ctx.clearRect(0, 0, CW, CH);
      if (logoReady) {
        ctx.save();
        ctx.drawImage(logoImg, 0, 0, CW, CH);
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, CW, CH);
        ctx.restore();
      }
      progressFill.style.width = '100%';

      later(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';

        requestAnimationFrame(() => {
          splitTop.classList.add('open');
          splitBottom.classList.add('open');
        });

        later(() => {
          preloader.style.display = 'none';
          splitTop.classList.add('gone');
          splitBottom.classList.add('gone');
        }, SPLIT_MS + 100);

      }, HOLD_MS);
    }
  }

  logoImg.onload  = () => { logoReady = true; };
  logoImg.onerror = () => { logoReady = false; };
  logoImg.src = '/Images/longlogo.svg';

  rafId = requestAnimationFrame(drawFrame);

  bag.add(() => {
    alive = false;
    cancelAnimationFrame(rafId);
    timeouts.forEach(clearTimeout);
    createdStars.forEach(s => s.remove());
  });
  return () => bag.dispose();
}
