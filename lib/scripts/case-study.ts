// @ts-nocheck
/* ════════════════════════════════════════
   case-study.ts — Shared engine for every /projects/web/<slug> case study.
   Faithful merge of projectui-modal.js + the two inline <script> blocks that
   every case-study page included (marquee pause, section reveal, cover parallax,
   animated counters, device gallery switcher, floating TOC, smooth scroll,
   redirect modal, and the UI-gallery lightbox).
   ════════════════════════════════════════ */
import { makeBag } from './_util';

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

    if (heroImg && heroBanner) {
      bag.on(window, 'scroll', () => {
        const rect = heroBanner.getBoundingClientRect();
        const windowH = window.innerHeight;
        if (rect.top < windowH && rect.bottom > 0) {
          const progress = (windowH - rect.top) / (windowH + rect.height);
          heroImg.style.transform = `scale(1.04) translateY(${(progress - 0.5) * 20}px)`;
        }
      }, { passive: true });
    }

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

    // The standard id/href-based TOC. Pages with an A/B `.cs-tabs` switcher (VeBuild)
    // use a panel-aware data-target TOC instead — handled by initVebuildTabs() — so
    // skip this block there to avoid two TOC systems fighting.
    if (!document.querySelector('.cs-tabs')) {
      const toc = document.getElementById('cs-toc');
      const tocItems = toc ? toc.querySelectorAll('.cs-toc-item') : [];
      function updateToc() {
        if (!toc) return;
        const scrollY = window.scrollY;
        const heroBottom = heroBanner ? heroBanner.offsetTop + heroBanner.offsetHeight : 600;
        if (scrollY > heroBottom - 200) { toc.classList.add('active'); }
        else { toc.classList.remove('active'); }
        let activeId = '';
        sections.forEach(sec => { if (sec.offsetTop - 300 <= scrollY) activeId = sec.id; });
        tocItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === '#' + activeId);
        });
      }
      bag.on(window, 'scroll', updateToc, { passive: true });
      updateToc();

      tocItems.forEach(item => {
        bag.on(item, 'click', (e) => {
          e.preventDefault();
          const href = item.getAttribute('href');
          const target = href && href.length > 1 ? document.querySelector(href) : null;
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    /* ── Redirection Modal Logic ── */
    const redirectModal = document.getElementById('redirect-modal');
    const redirectMsg = document.getElementById('redirect-msg');
    const redirectConfirm = document.getElementById('redirect-confirm');
    const redirectCancel = document.getElementById('redirect-cancel');
    const ctaBtns = document.querySelectorAll('.cs-cta-btn');

    if (redirectModal && redirectMsg && redirectConfirm && redirectCancel) {
      ctaBtns.forEach(btn => {
        bag.on(btn, 'click', (e) => {
          e.preventDefault();
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
        });
      });

      const closeRedirect = () => {
        redirectModal.classList.remove('active');
        redirectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };
      bag.on(redirectCancel, 'click', closeRedirect);
      bag.on(redirectConfirm, 'click', closeRedirect);
      bag.on(redirectModal, 'click', (e) => { if (e.target === redirectModal) closeRedirect(); });
    }

    bag.add(() => { document.body.style.overflow = ''; });
  })();

  /* ── UI-gallery lightbox (#cs-modal / .ui-card) — port of projectui-modal.js ── */
  (function () {
    const modal = document.getElementById('cs-modal');
    const modalImg = document.getElementById('cs-modal-img');
    const modalTitle = document.getElementById('cs-modal-title');
    const modalCounter = document.getElementById('cs-modal-counter');
    const closeBtn = document.getElementById('cs-modal-close');
    const prevBtn = document.getElementById('cs-modal-prev');
    const nextBtn = document.getElementById('cs-modal-next');
    if (!modal || !modalImg) return;

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
      currentIndex = index; resetZoom(); updateModal();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      resetZoom();
      setTimeout(() => { modalImg.src = ''; }, 500);
    }
    function showNext() { currentIndex = (currentIndex + 1) % galleryItems.length; resetZoom(); updateModal(); }
    function showPrev() { currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; resetZoom(); updateModal(); }

    uiCards.forEach(card => {
      card.style.cursor = 'pointer';
      bag.on(card, 'click', (e) => {
        e.preventDefault();
        buildGallery(card.closest('.cs-panel, .device-gallery') || document);
        const url = card.getAttribute('data-full');
        const index = galleryItems.findIndex(item => item.url === url);
        if (index !== -1) openModal(index);
      });
    });

    if (closeBtn) bag.on(closeBtn, 'click', closeModal);
    if (zoomBtn) bag.on(zoomBtn, 'click', (e) => { e.stopPropagation(); toggleZoom(); });
    if (prevBtn) bag.on(prevBtn, 'click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) bag.on(nextBtn, 'click', (e) => { e.stopPropagation(); showNext(); });
    bag.on(modal, 'click', (e) => { if (e.target === modal) closeModal(); });
    bag.on(modalImg, 'click', (e) => { e.stopPropagation(); if (hasDragged) return; if (window.innerWidth > 900) toggleZoom(); });
    bag.on(document, 'keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === ' ' || e.key === 'z') toggleZoom();
    });

    bag.add(() => { document.body.style.overflow = ''; document.body.classList.remove('modal-open'); });
  })();

  return () => bag.dispose();
}
