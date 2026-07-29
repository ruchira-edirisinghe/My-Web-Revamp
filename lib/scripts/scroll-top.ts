// @ts-nocheck
/* ══════════════════════════════════════════
   scroll-top.ts - Floating "Scroll to Top" control
   Self-contained: injects its own styles + markup.
   (faithful port of styles/scroll-top.js)
   ══════════════════════════════════════════ */
import { makeBag } from './_util';

export function initScrollTop(): () => void {
  const bag = makeBag();

  if (document.getElementById('scroll-top-btn')) return () => {}; // avoid duplicates

  /* ── Styles ── */
  const css =
    '.scroll-top-btn{position:fixed;right:16px;bottom:36px;z-index:390;display:flex;' +
    'flex-direction:column;align-items:center;gap:12px;background:none;border:0;outline:none;padding:8px 6px;' +
    'cursor:pointer;color:rgba(255,255,255,0.5);opacity:0;visibility:hidden;transform:translateY(14px);' +
    'transition:opacity .45s ease,visibility .45s ease,transform .45s cubic-bezier(.22,1,.36,1),color .3s ease;' +
    "font-family:'Montserrat',system-ui,-apple-system,'Segoe UI',sans-serif;-webkit-tap-highlight-color:transparent;}" +
    '.scroll-top-btn.visible{opacity:1;visibility:visible;transform:translateY(0);}' +
    '.scroll-top-btn:hover{color:#fff;}' +
    '.scroll-top-btn .st-arrow{font-size:14px;line-height:1;transition:transform .35s cubic-bezier(.22,1,.36,1);}' +
    '.scroll-top-btn:hover .st-arrow{transform:translateY(-3px);}' +
    '.scroll-top-btn .st-text{writing-mode:vertical-rl;text-orientation:mixed;font-size:10px;' +
    'font-weight:600;letter-spacing:.28em;text-transform:uppercase;}' +
    '.scroll-top-btn .st-line{width:1px;height:54px;background:linear-gradient(to bottom,currentColor,transparent);opacity:.65;}' +
    '@media (max-width:768px){.scroll-top-btn{right:8px;bottom:18px;gap:9px;}.scroll-top-btn .st-line{height:34px;}' +
    '.scroll-top-btn .st-text{font-size:9px;letter-spacing:.22em;}}';

  const style = document.createElement('style');
  style.id = 'scroll-top-style';
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Markup ── */
  const btn = document.createElement('button');
  btn.id = 'scroll-top-btn';
  btn.className = 'scroll-top-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML =
    '<span class="st-arrow" aria-hidden="true">&#8593;</span>' +
    '<span class="st-text">Scroll to Top</span>' +
    '<span class="st-line" aria-hidden="true"></span>';
  document.body.appendChild(btn);

  function easeInOutExpo(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2;
  }

  let animId = null;
  function stopAnim() {
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    window.removeEventListener('wheel', stopAnim);
    window.removeEventListener('touchstart', stopAnim);
    window.removeEventListener('keydown', stopAnim);
  }

  function scrollToTop() {
    const start = window.scrollY || window.pageYOffset || 0;
    if (start <= 0) return;

    stopAnim();
    const duration = 900;
    let startTime = null;

    window.addEventListener('wheel', stopAnim, { passive: true });
    window.addEventListener('touchstart', stopAnim, { passive: true });
    window.addEventListener('keydown', stopAnim);

    function frame(now) {
      if (startTime === null) startTime = now;
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, Math.round(start * (1 - easeInOutExpo(t))));
      if (t < 1) {
        animId = requestAnimationFrame(frame);
      } else {
        stopAnim();
      }
    }
    animId = requestAnimationFrame(frame);
  }

  bag.on(btn, 'click', scrollToTop);

  /* ── Show only when the page is scrollable AND scrolled down ── */
  let ticking = false;
  function update() {
    const docH = document.documentElement.scrollHeight;
    const scrollable = (docH - window.innerHeight) > 320;
    const scrolled = window.scrollY > 380;
    btn.classList.toggle('visible', scrollable && scrolled);
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }

  bag.on(window, 'scroll', onScroll, { passive: true });
  bag.on(window, 'resize', onScroll, { passive: true });
  bag.on(window, 'load', update);
  update();

  bag.add(() => {
    stopAnim();
    btn.remove();
    style.remove();
  });
  return () => bag.dispose();
}
