// @ts-nocheck
/* ════════════════════════════════════════
   vebuild.ts - VeBuild-only A/B version switcher + panel-aware floating TOC.
   (faithful port of the page-specific portion of vebuild-case-study.html's inline
   script; the rest of the page is handled by initProjects() + initCaseStudy().)
   ════════════════════════════════════════ */
import { makeBag } from './_util';

export function initVebuildTabs(): () => void {
  const bag = makeBag();

  const heroBanner = document.getElementById('hero-banner');
  const tabs = document.querySelectorAll('.cs-tab');
  const panels = document.querySelectorAll('.cs-panel');
  const tabsEl = document.querySelector('.cs-tabs');
  const activePanel = () => document.querySelector('.cs-panel.active');
  const toc = document.getElementById('cs-toc');
  const tocItems = toc ? toc.querySelectorAll('.cs-toc-item') : [];

  function updateToc() {
    const scrollY = window.scrollY;
    const heroBottom = heroBanner ? heroBanner.offsetTop + heroBanner.offsetHeight : 600;
    if (tabsEl) tabsEl.classList.toggle('visible', scrollY > heroBottom - 220);
    if (!toc) return;
    toc.classList.toggle('active', scrollY > heroBottom - 200);
    const ap = activePanel();
    const secs = ap ? ap.querySelectorAll('.cs-section[data-sec]') : [];
    let activeKey = '';
    secs.forEach(sec => { if (sec.offsetTop - 300 <= scrollY) activeKey = sec.dataset.sec; });
    tocItems.forEach(item => { item.classList.toggle('active', item.dataset.target === activeKey); });
  }

  tabs.forEach(tab => {
    bag.on(tab, 'click', () => {
      const key = tab.dataset.panel;
      if (tabsEl) tabsEl.dataset.active = key;
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));

      const ap = activePanel();
      if (ap) {
        ap.querySelectorAll('.cs-section').forEach(s => s.classList.add('visible'));
        const y = ap.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
      updateToc();
    });
  });

  bag.on(window, 'scroll', updateToc, { passive: true });
  updateToc();

  tocItems.forEach(item => {
    bag.on(item, 'click', (e) => {
      e.preventDefault();
      const ap = activePanel();
      const target = ap && ap.querySelector('[data-sec="' + item.dataset.target + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  return () => bag.dispose();
}
