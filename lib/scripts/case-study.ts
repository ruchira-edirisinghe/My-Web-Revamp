// @ts-nocheck
/* ════════════════════════════════════════
   case-study.ts - Shared engine for every /projects/web/<slug> case study.
   Faithful merge of projectui-modal.js + the two inline <script> blocks that
   every case-study page included (marquee pause, section reveal, cover parallax,
   animated counters, device gallery switcher, floating TOC, smooth scroll,
   redirect modal, and the UI-gallery lightbox).
   ════════════════════════════════════════ */
import { makeBag, scrollBehavior } from './_util';

export function initCaseStudy(): () => void {
  const bag = makeBag();

  /* ── Pause UI marquees while offscreen ── */
  (function () {
    const tracks = document.querySelectorAll('.ui-marquee-track');
    if (!tracks.length || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.style.animationPlayState = en.isIntersecting ? '' : 'paused';
      });
    }, { rootMargin: '120px' });
    tracks.forEach(function (t) { obs.observe(t); });
    bag.add(() => obs.disconnect());
  })();

  /* ── Sections, parallax, counters, device switch, TOC, redirect modal ── */
  (function () {
    const sections = document.querySelectorAll('.cs-section[id]');
    const heroBanner = document.getElementById('hero-banner');
    const heroImg = document.getElementById('hero-img');

    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.cs-section').forEach(el => sectionObs.observe(el));
    bag.add(() => sectionObs.disconnect());

    /* ══════════════════════════════════════════════════════════════════
       ONE SCROLL PASS, COALESCED INTO A FRAME, READING NO LAYOUT.

       There were two independent `scroll` listeners on this page and between
       them they did the two worst things a scroll handler can do.

       The parallax one called `getBoundingClientRect()` and then WROTE
       `heroImg.style.transform` - a layout read followed by a style write, on
       every scroll event, unthrottled. A trackpad fires those faster than the
       browser paints, so most of that work was for frames that never existed.

       The TOC one was worse: it read `offsetTop` for the hero AND for every
       `.cs-section` on the page, every event. Each of those reads, coming after
       the parallax handler had just written a transform, forces the browser to
       flush layout again - so a single scroll event could trigger eight
       synchronous layout recalculations of a very tall page. That is the
       juddery scrolling on the case studies.

       Now: geometry is measured once into `metrics` and re-measured only when
       something can actually have moved it (resize, or the last image landing
       and changing the document height). The listener does nothing but ask for a
       frame, and the frame does all the reading from the cache and all the
       writing together.
       ══════════════════════════════════════════════════════════════════ */

    const tocEl = document.getElementById('cs-toc');
    /* VeBuild uses a panel-aware data-target TOC driven by initVebuildTabs();
       running this one there would give the page two TOC systems fighting. */
    const wantToc = !!tocEl && !document.querySelector('.cs-tabs');
    const tocItems = wantToc ? tocEl.querySelectorAll('.cs-toc-item') : [];

    let metrics = null;

    function measure() {
      metrics = {
        winH: window.innerHeight,
        heroTop: heroBanner ? heroBanner.offsetTop : 0,
        heroH: heroBanner ? heroBanner.offsetHeight : 600,
        docH: document.documentElement.scrollHeight,
        sections: Array.prototype.map.call(sections, (s) => ({ id: s.id, top: s.offsetTop })),
      };
    }

    let lastTocId = null;
    let tocActive = null;

    function paint() {
      frameQueued = false;
      if (!metrics) measure();
      const y = window.scrollY;

      /* Hero parallax. `rect.top` is just `heroTop - y`, so the cached value
         gives the identical number with no layout read. */
      if (heroImg && heroBanner) {
        const top = metrics.heroTop - y;
        if (top < metrics.winH && top + metrics.heroH > 0) {
          const progress = (metrics.winH - top) / (metrics.winH + metrics.heroH);
          heroImg.style.transform = `scale(1.04) translateY(${(progress - 0.5) * 20}px)`;
        }
      }

      if (!wantToc) return;

      /* Only touch classList when the answer has actually changed - a
         `classList.toggle` to the value it already holds still invalidates
         style for that element. */
      const wantActive = y > metrics.heroTop + metrics.heroH - 200;
      if (wantActive !== tocActive) {
        tocActive = wantActive;
        tocEl.classList.toggle('active', wantActive);
      }

      let activeId = '';
      for (const s of metrics.sections) if (s.top - 300 <= y) activeId = s.id;
      if (activeId !== lastTocId) {
        lastTocId = activeId;
        tocItems.forEach((item) => {
          item.classList.toggle('active', item.getAttribute('href') === '#' + activeId);
        });
      }
    }

    let frameQueued = false;
    function onScroll() {
      if (frameQueued) return;
      frameQueued = true;
      requestAnimationFrame(paint);
    }

    function remeasure() {
      metrics = null;
      lastTocId = null;
      tocActive = null;
      onScroll();
    }

    bag.on(window, 'scroll', onScroll, { passive: true });
    bag.on(window, 'resize', remeasure);
    /* Section offsets shift as lazy images arrive and give their cards height,
       so the first measurement is not the final one. `load` is the cheap catch;
       a ResizeObserver on <body> covers the rest without polling. */
    bag.on(window, 'load', remeasure);
    if ('ResizeObserver' in window) {
      let firstObservation = true;
      const ro = new ResizeObserver(() => {
        // The observer fires once on registration; that is not a change.
        if (firstObservation) { firstObservation = false; return; }
        if (metrics && document.documentElement.scrollHeight !== metrics.docH) remeasure();
      });
      ro.observe(document.body);
      bag.add(() => ro.disconnect());
    }
    onScroll();

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = 'true';

        const text = el.dataset.text;
        if (text) { el.textContent = text; return; }

        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.outcome-metric[data-count], .outcome-metric[data-text]').forEach(el => counterObs.observe(el));
    bag.add(() => counterObs.disconnect());

    const deviceToggle = document.querySelector('.device-toggle');
    if (deviceToggle) {
      const deviceBtns = deviceToggle.querySelectorAll('.device-btn');
      const galleries = document.querySelectorAll('.device-gallery');
      bag.on(deviceToggle, 'click', function (e) {
        const btn = e.target.closest('.device-btn');
        if (!btn) return;
        const dev = btn.getAttribute('data-device');
        deviceBtns.forEach(function (b) {
          const on = b === btn;
          b.classList.toggle('active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        galleries.forEach(function (g) { g.hidden = g.getAttribute('data-device') !== dev; });
      });
    }

    /* The TOC's highlighting is driven by the coalesced scroll pass above; all
       that is left here is what happens when one is clicked. */
    tocItems.forEach(item => {
      bag.on(item, 'click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        const target = href && href.length > 1 ? document.querySelector(href) : null;
        if (target) target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
      });
    });

    /* ── Redirection Modal Logic ── */
    const redirectModal = document.getElementById('redirect-modal');
    const redirectMsg = document.getElementById('redirect-msg');
    const redirectConfirm = document.getElementById('redirect-confirm');
    const redirectCancel = document.getElementById('redirect-cancel');
    const ctaBtns = document.querySelectorAll('.cs-cta-btn');

    if (redirectModal && redirectMsg && redirectConfirm && redirectCancel) {
      // Dialog semantics for assistive tech
      redirectModal.setAttribute('role', 'dialog');
      redirectModal.setAttribute('aria-modal', 'true');
      if (document.getElementById('redirect-title')) redirectModal.setAttribute('aria-labelledby', 'redirect-title');
      let redirectOpener: any = null;

      ctaBtns.forEach(btn => {
        bag.on(btn, 'click', (e) => {
          e.preventDefault();
          redirectOpener = btn;
          const url = btn.getAttribute('href');
          const t = btn.textContent.toLowerCase();
          const platform = t.includes('figma') ? 'Figma'
            : (t.includes('github') || t.includes('code') || t.includes('repo')) ? 'GitHub'
            : (t.includes('live') || t.includes('site')) ? 'the live website'
            : 'Behance';
          redirectMsg.textContent = `Do you wish to continue to view this project on ${platform}?`;
          redirectConfirm.setAttribute('href', url);
          redirectConfirm.setAttribute('target', '_blank');
          redirectConfirm.setAttribute('rel', 'noopener');
          redirectModal.classList.add('active');
          redirectModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          // Focus the safe (cancel) action so Enter doesn't fire the redirect
          if (redirectCancel && typeof redirectCancel.focus === 'function') redirectCancel.focus();
        });
      });

      const closeRedirect = () => {
        redirectModal.classList.remove('active');
        redirectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (redirectOpener && typeof redirectOpener.focus === 'function') redirectOpener.focus();
        redirectOpener = null;
      };
      bag.on(redirectCancel, 'click', closeRedirect);
      bag.on(redirectConfirm, 'click', closeRedirect);
      bag.on(redirectModal, 'click', (e) => { if (e.target === redirectModal) closeRedirect(); });
      // Escape closes the redirect modal (previously only the lightbox handled Escape)
      bag.on(document, 'keydown', (e) => {
        if (!redirectModal.classList.contains('active')) return;
        if (e.key === 'Escape') { closeRedirect(); return; }

        /* Same trap as the lightbox, and it matters more here: the two stops are
           "Stay Here" and a link that opens a new tab, so focus wandering out of
           this dialog leaves a visitor tabbing an inert page with a confirmation
           they cannot answer. */
        if (e.key === 'Tab') {
          const stops = [redirectCancel, redirectConfirm].filter(Boolean);
          if (!stops.length) return;
          const first = stops[0];
          const last = stops[stops.length - 1];
          const active = document.activeElement;
          if (!redirectModal.contains(active)) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    bag.add(() => { document.body.style.overflow = ''; });
  })();

  /* ── UI-gallery lightbox (#cs-modal / .ui-card) - port of projectui-modal.js ── */
  (function () {
    const modal = document.getElementById('cs-modal');
    const modalImg = document.getElementById('cs-modal-img');
    const modalTitle = document.getElementById('cs-modal-title');
    const modalCounter = document.getElementById('cs-modal-counter');
    const closeBtn = document.getElementById('cs-modal-close');
    const prevBtn = document.getElementById('cs-modal-prev');
    const nextBtn = document.getElementById('cs-modal-next');
    if (!modal || !modalImg) return;

    // Dialog semantics for assistive tech
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    if (modalTitle) modal.setAttribute('aria-labelledby', 'cs-modal-title');
    let lastFocused: any = null;

    let galleryItems = [];
    const uiCards = document.querySelectorAll('.ui-card, #onboarding-grid .cs-card');

    function buildGallery(scope) {
      const root = scope || document;
      const seenUrls = new Set();
      galleryItems = [];
      root.querySelectorAll('.ui-card, #onboarding-grid .cs-card').forEach(card => {
        const fullUrl = card.getAttribute('data-full');
        const title = card.querySelector('.ui-card-label')?.textContent || '';
        if (fullUrl && !seenUrls.has(fullUrl)) { seenUrls.add(fullUrl); galleryItems.push({ url: fullUrl, title }); }
      });
    }
    buildGallery(document);

    let currentIndex = 0, isZoomed = false, currentScrollY = 0, isDragging = false, startY = 0, startScrollY = 0, hasDragged = false;
    const zoomBtn = document.getElementById('cs-modal-zoom');
    const container = modal.querySelector('.cs-modal-container');

    function updateModal() {
      const item = galleryItems[currentIndex];
      if (!item) return;
      resetZoom();
      modalImg.style.opacity = '0';
      modalImg.style.transform = 'translateY(0) scale(0.98)';
      modalTitle.textContent = item.title;
      modalImg.alt = item.title ? `${item.title} - full screenshot` : 'Case study screenshot';
      modalCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
      modalImg.onload = () => { modalImg.style.opacity = '1'; modalImg.style.transform = 'translateY(0) scale(1)'; };
      modalImg.src = item.url;
      if (modalImg.complete) { modalImg.style.opacity = '1'; modalImg.style.transform = 'translateY(0) scale(1)'; }
    }

    function toggleZoom() {
      if (window.innerWidth <= 900) return;
      isZoomed = !isZoomed;
      if (isZoomed) {
        resetZoom(); isZoomed = true;
        modalImg.classList.add('zoomed');
        container.classList.add('is-zoomed');
        container.style.cursor = 'grab';
      } else { resetZoom(); }
    }
    function resetZoom() {
      isZoomed = false; currentScrollY = 0; isDragging = false;
      modalImg.classList.remove('zoomed');
      if (container) { container.classList.remove('is-zoomed'); container.style.cursor = ''; }
      modalImg.style.transform = 'translateY(0)';
    }

    if (container) {
      bag.on(container, 'wheel', (e) => {
        if (!isZoomed || window.innerWidth <= 900) return;
        e.preventDefault();
        const overflow = modalImg.offsetHeight - container.offsetHeight;
        if (overflow <= 0) return;
        currentScrollY = Math.max(0, Math.min(currentScrollY + e.deltaY, overflow));
        modalImg.style.transform = `translateY(-${currentScrollY}px)`;
      }, { passive: false });
      bag.on(container, 'mousedown', (e) => {
        if (!isZoomed || window.innerWidth <= 900) return;
        isDragging = true; hasDragged = false; startY = e.pageY; startScrollY = currentScrollY;
        container.style.cursor = 'grabbing'; e.preventDefault();
      });
    }
    bag.on(window, 'mousemove', (e) => {
      if (!isDragging || !isZoomed) return;
      const deltaY = startY - e.pageY;
      if (Math.abs(deltaY) > 5) hasDragged = true;
      const overflow = modalImg.offsetHeight - container.offsetHeight;
      if (overflow <= 0) return;
      currentScrollY = Math.max(0, Math.min(startScrollY + deltaY, overflow));
      modalImg.style.transform = `translateY(-${currentScrollY}px)`;
    });
    bag.on(window, 'mouseup', () => { if (!isDragging) return; isDragging = false; if (container) container.style.cursor = 'grab'; });
    bag.on(window, 'mouseleave', () => { if (isDragging) { isDragging = false; if (container) container.style.cursor = 'grab'; } });

    function openModal(index) {
      lastFocused = document.activeElement;
      currentIndex = index; resetZoom(); updateModal();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      if (closeBtn && typeof closeBtn.focus === 'function') closeBtn.focus();
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      resetZoom();
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      setTimeout(() => { modalImg.removeAttribute('src'); }, 500);
    }
    function showNext() { currentIndex = (currentIndex + 1) % galleryItems.length; resetZoom(); updateModal(); }
    function showPrev() { currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; resetZoom(); updateModal(); }

    uiCards.forEach(card => {
      card.style.cursor = 'pointer';

      /* A card the page has marked aria-hidden is the marquee's duplicate copy,
         there only so the CSS loop has no seam. Giving it role="button" and
         tabindex="0" would put a focusable control inside an aria-hidden subtree
         - a control a keyboard user can reach and a screen reader refuses to
         announce, which is the specific combination that leaves someone tabbing
         into silence. It still opens on click, because a sighted visitor sees a
         real card there. */
      const decorative = card.closest('[aria-hidden="true"]') !== null;
      if (!decorative) {
        // Keyboard access: expose each screenshot card as a button
        if (!card.hasAttribute('role')) card.setAttribute('role', 'button');
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      }
      const label = card.querySelector('.ui-card-label')?.textContent;
      if (label && !card.getAttribute('aria-label')) card.setAttribute('aria-label', `View ${label.trim()}`);
      const openFromCard = (e) => {
        e.preventDefault();
        buildGallery(card.closest('.cs-panel, .device-gallery') || document);
        const url = card.getAttribute('data-full');
        const index = galleryItems.findIndex(item => item.url === url);
        if (index !== -1) openModal(index);
      };
      bag.on(card, 'click', openFromCard);
      bag.on(card, 'keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openFromCard(e); });
    });

    if (closeBtn) bag.on(closeBtn, 'click', closeModal);
    if (zoomBtn) bag.on(zoomBtn, 'click', (e) => { e.stopPropagation(); toggleZoom(); });
    if (prevBtn) bag.on(prevBtn, 'click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) bag.on(nextBtn, 'click', (e) => { e.stopPropagation(); showNext(); });
    bag.on(modal, 'click', (e) => { if (e.target === modal) closeModal(); });
    bag.on(modalImg, 'click', (e) => { e.stopPropagation(); if (hasDragged) return; if (window.innerWidth > 900) toggleZoom(); });
    /* The lightbox's own controls, in DOM order, minus anything CSS has taken
       out of the layout - the zoom button is hidden below 900px, and a trap that
       cycled through a display:none button would strand focus on nothing.
       Queried per keypress rather than cached because that visibility changes
       with the viewport while the modal is open. */
    function modalStops() {
      return [...modal.querySelectorAll('button')].filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length
      );
    }

    bag.on(document, 'keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') { closeModal(); return; }

      /* TRAP TAB INSIDE THE OVERLAY.
         The dialog already set aria-modal and moved focus to the close button,
         but nothing held focus here: one Tab put the caret on the first link of
         the page BEHIND a full-screen opaque overlay, and from there a keyboard
         visitor was navigating a document they could not see, with no way back
         to the close button except Shift+Tab-ing blindly. aria-modal tells a
         screen reader to ignore the rest of the page; it does not stop the Tab
         key, which is a separate job and this is it. */
      if (e.key === 'Tab') {
        const stops = modalStops();
        if (!stops.length) return;
        const first = stops[0];
        const last = stops[stops.length - 1];
        const active = document.activeElement;
        if (!modal.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      /* Space is a real activation key on a focused <button>, so swallowing it
         for zoom would break whichever control the visitor has just tabbed to. */
      if (e.key === 'z' || (e.key === ' ' && !modal.contains(document.activeElement))) {
        e.preventDefault();
        toggleZoom();
      }
    });

    bag.add(() => { document.body.style.overflow = ''; document.body.classList.remove('modal-open'); });
  })();

  return () => bag.dispose();
}
