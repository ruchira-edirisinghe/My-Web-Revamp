/* ════════════════════════════════════════
   preloader.js — Water-fill preloader & split-screen reveal
   ════════════════════════════════════════ */
(function () {
  const preloader    = document.getElementById('preloader');
  const canvas       = document.getElementById('preloader-canvas');
  const ctx          = canvas.getContext('2d');
  const progressFill = document.getElementById('progress-fill');
  const splitTop     = document.getElementById('split-top');
  const splitBottom  = document.getElementById('split-bottom');

  const CW = 900, CH = 240;
  canvas.width  = CW;
  canvas.height = CH;

  const DURATION = 2600;
  const HOLD_MS  = 320;
  const SPLIT_MS = 900; // matches CSS transition

  let startTime = null;
  let fillPct   = 0;
  let wavePhase = 0;
  let logoImg   = new Image();
  let logoReady = false;

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function drawFrame(ts) {
    if (!startTime) startTime = ts;
    const raw = Math.min((ts - startTime) / DURATION, 1);
    fillPct   = ease(raw);
    wavePhase += 0.045;

    // Sync progress bar
    progressFill.style.width = (fillPct * 100) + '%';

    ctx.clearRect(0, 0, CW, CH);

    // Ghost logo
    if (logoReady) {
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.drawImage(logoImg, 0, 0, CW, CH);
      ctx.restore();
    }

    // Water clip shape
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

    // Filled white logo inside water
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

    // Wave shimmer line
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
      requestAnimationFrame(drawFrame);
    } else {
      // Draw full bright logo
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

      // Hold, then trigger split reveal
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';

        requestAnimationFrame(() => {
          splitTop.classList.add('open');
          splitBottom.classList.add('open');
        });

        setTimeout(() => {
          preloader.remove();
          splitTop.classList.add('gone');
          splitBottom.classList.add('gone');
          splitTop.remove();
          splitBottom.remove();
        }, SPLIT_MS + 100);

      }, HOLD_MS);
    }
  }

  logoImg.onload  = () => { logoReady = true; };
  logoImg.onerror = () => { logoReady = false; };
  logoImg.src = './Images/longlogo.svg';

  requestAnimationFrame(drawFrame);
})();
