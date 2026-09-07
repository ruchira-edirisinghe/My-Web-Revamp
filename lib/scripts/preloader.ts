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

  /* ────────────────────────────────────────────────────────────────────
     HOW LONG THE INTRO HOLDS THE PAGE, AND WHY IT IS NOT ONE NUMBER

     The water fill is a FIXED-LENGTH animation, not a real progress bar -
     nothing is being waited on, the bar is drawn from a timer. So its length is
     purely a question of how long the visitor should be made to look at it, and
     the answer is different the first time and the fifth.

     FIRST_MS is the full signature intro and is unchanged. It plays on a cold
     load, which is the one moment the wordmark filling up is doing a job.

     REPEAT_MS is for every navigation after that. StandardShell replays this on
     every in-site route change by design, and at the original length that put
     2.6s of fill + 0.32s hold + 0.9s split - nearly four seconds - between a
     click and the page behind it, EVERY time. Six clicks around the site was
     twenty-three seconds of watching the same logo fill. 900ms keeps the same
     animation and the same reveal and stops it being a toll.

     Reduced motion collapses it to a beat, because a 2.6s decorative animation
     is exactly what that preference is asking not to see.

     To go back to the old behaviour, set REPEAT_MS = FIRST_MS.
     ──────────────────────────────────────────────────────────────────── */
  const FIRST_MS  = 2600;
  const REPEAT_MS = 900;
  const REDUCED_MS = 260;
  /** Marks that the signature intro has already been shown this session. */
  const SEEN_KEY = 'preloaderShown';

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let seen = false;
  try {
    seen = sessionStorage.getItem(SEEN_KEY) === '1';
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* Private mode or storage disabled - fall through as a first visit. It only
       costs a longer intro, never a broken one. */
  }

  const DURATION = reduceMotion ? REDUCED_MS : seen ? REPEAT_MS : FIRST_MS;
  const HOLD_MS  = reduceMotion ? 60 : seen ? 140 : 320;
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
    /* Fewer of them on a phone: they are 1-3px dots on a backdrop that is on
       screen for well under a second on a repeat visit, and fifty-five absolutely
       positioned elements each running its own infinite keyframe is work the
       compositor does not need to be doing while the page behind is still
       parsing. */
    const starCount = window.innerWidth < 780 ? 26 : 55;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'preloader-star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 1 + Math.pow(Math.random(), 1.6) * 2;
        const delay = Math.random() * 6;
        const duration = 3 + Math.random() * 4;
        const opacity = 0.35 + Math.random() * 0.45;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--star-opacity', opacity);
        // A twinkle is motion. Reduced motion gets the same sky, held still.
        if (!reduceMotion) {
          star.style.animation = `star-twinkle ${duration}s infinite ${delay}s ease-in-out`;
        } else {
          star.style.opacity = String(opacity);
        }
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
