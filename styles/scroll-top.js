/* ══════════════════════════════════════════
   Floating "Scroll to Top" control
   Self-contained: injects its own styles + markup.
   Appears only on pages that are actually scrollable,
   once the user has scrolled down.
   ══════════════════════════════════════════ */
(function () {
  'use strict';

  function init() {
    if (document.getElementById('scroll-top-btn')) return; // avoid duplicates

    /* ── Styles ── */
    var css =
      '.scroll-top-btn{position:fixed;right:16px;bottom:36px;z-index:390;display:flex;' +
      'flex-direction:column;align-items:center;gap:12px;background:none;border:0;padding:8px 6px;' +
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

    var style = document.createElement('style');
    style.id = 'scroll-top-style';
    style.textContent = css;
    document.head.appendChild(style);

    /* ── Markup ── */
    var btn = document.createElement('button');
    btn.id = 'scroll-top-btn';
    btn.className = 'scroll-top-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML =
      '<span class="st-arrow" aria-hidden="true">&#8593;</span>' +
      '<span class="st-text">Scroll to Top</span>' +
      '<span class="st-line" aria-hidden="true"></span>';
    document.body.appendChild(btn);

    /* ── Animated "reverse scroll" back to the top ── */
    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Matches the old site's jQuery "easeInOutExpo" — slow start, fast middle, slow stop
    function easeInOutExpo(t) {
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
    }

    var animId = null;
    function stopAnim() {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
      window.removeEventListener('wheel', stopAnim);
      window.removeEventListener('touchstart', stopAnim);
      window.removeEventListener('keydown', stopAnim);
    }

    function scrollToTop() {
      var start = window.scrollY || window.pageYOffset || 0;
      if (start <= 0) return;
      if (prefersReduced) { window.scrollTo(0, 0); return; }

      stopAnim(); // cancel any run already in flight
      var duration = 900; // fixed 900ms easeInOutExpo, matching the old site
      var startTime = null;

      // Let the user interrupt the rewind with their own scroll input
      window.addEventListener('wheel', stopAnim, { passive: true });
      window.addEventListener('touchstart', stopAnim, { passive: true });
      window.addEventListener('keydown', stopAnim);

      function frame(now) {
        if (startTime === null) startTime = now;
        var t = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, Math.round(start * (1 - easeInOutCubic(t))));
        if (t < 1) {
          animId = requestAnimationFrame(frame);
        } else {
          stopAnim();
        }
      }
      animId = requestAnimationFrame(frame);
    }

    btn.addEventListener('click', scrollToTop);

    /* ── Show only when the page is scrollable AND scrolled down ── */
    var ticking = false;
    function update() {
      var docH = document.documentElement.scrollHeight;
      var scrollable = (docH - window.innerHeight) > 320;
      var scrolled = window.scrollY > 380;
      btn.classList.toggle('visible', scrollable && scrolled);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
