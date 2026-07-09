// @ts-nocheck
/* ════════════════════════════════════════
   gallery-modal.ts — Full-screen image viewer for the graphic galleries
   (faithful port of styles/projects/artworks-modal.js)
   ════════════════════════════════════════ */
import { makeBag } from './_util';

export function initGalleryModal(): () => void {
  const bag = makeBag();

  const modal = document.getElementById('artwork-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.getElementById('modal-close');
  const masonryItems = document.querySelectorAll('.masonry-item, .wallpaper-item, .poster-item');

  if (!modal || !modalImg || !closeBtn) return () => {};

  // Dialog semantics for assistive tech
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  if (modalTitle) modal.setAttribute('aria-labelledby', 'modal-title');

  let lastFocused = null;
  const timeouts: any[] = [];

  function openModal(src, tag, title, desc) {
    // Fade the new image in on load to avoid a flash of the previous/blank image
    modalImg.style.opacity = '0';
    modalImg.alt = title || tag || 'Full size image';
    modalImg.onload = () => { modalImg.style.opacity = '1'; };
    modalImg.src = src;
    if (modalImg.complete) modalImg.style.opacity = '1';
    if (modalTag) modalTag.textContent = tag || '';
    if (modalTitle) modalTitle.textContent = title || '';
    if (modalDesc) modalDesc.textContent = desc || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-active');
    lastFocused = document.activeElement;
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-active');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    const id = setTimeout(() => {
      modalImg.removeAttribute('src');
      if (modalTag) modalTag.textContent = '';
      if (modalTitle) modalTitle.textContent = '';
      if (modalDesc) modalDesc.textContent = '';
    }, 400);
    timeouts.push(id);
  }

  masonryItems.forEach(item => {
    const img = item.querySelector('.artwork-img');
    const viewBtn = item.querySelector('.view-btn');
    const info = item.querySelector('.artwork-info');

    const highResUrl = viewBtn ? viewBtn.getAttribute('href') : (img.getAttribute('data-highres') || img.src);
    const tag = info ? info.querySelector('.info-tag')?.textContent : '';
    const title = info ? info.querySelector('.info-title')?.textContent : '';
    const desc = info ? info.querySelector('.info-sub')?.textContent : '';

    bag.on(item, 'click', (e) => {
      if (e.target.closest('.view-btn')) return;
      openModal(highResUrl, tag, title, desc);
    });

    if (viewBtn) {
      bag.on(viewBtn, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(highResUrl, tag, title, desc);
      });
    } else {
      // Cards without a focusable child (e.g. logo cards) are mouse-only —
      // expose them as keyboard-operable buttons.
      if (!item.hasAttribute('role')) item.setAttribute('role', 'button');
      if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
      if ((title || tag) && !item.getAttribute('aria-label')) {
        item.setAttribute('aria-label', `View ${title || tag}`);
      }
      bag.on(item, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(highResUrl, tag, title, desc);
        }
      });
    }
  });

  bag.on(closeBtn, 'click', closeModal);
  bag.on(modal, 'click', (e) => { if (e.target === modal) closeModal(); });
  bag.on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  bag.add(() => {
    timeouts.forEach(clearTimeout);
    document.body.style.overflow = '';
    document.body.classList.remove('modal-active');
  });

  return () => bag.dispose();
}
