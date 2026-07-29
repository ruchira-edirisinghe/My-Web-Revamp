// @ts-nocheck
/* Project category filter - faithful port of the inline IIFE in
   web-projects.html / graphic-projects.html. */
import { makeBag } from './_util';

export function initProjectFilter(): () => void {
  const bag = makeBag();
  const bar = document.querySelector('.project-filter');
  if (!bar) return () => {};
  const btns = bar.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.projects-grid .project-card');
  const empty = document.getElementById('filter-empty');

  function apply(filter) {
    let shown = 0;
    cards.forEach(function (card) {
      const cats = (card.getAttribute('data-category') || '').split(/\s+/);
      const show = filter === 'all' || cats.indexOf(filter) !== -1;
      if (show) {
        card.style.display = '';
        card.classList.remove('fx');
        void card.offsetWidth; // restart the entrance animation
        card.classList.add('fx');
        shown++;
      } else {
        card.style.display = 'none';
      }
    });
    if (empty) empty.hidden = shown > 0;
  }

  btns.forEach(function (btn) {
    bag.on(btn, 'click', function () {
      btns.forEach(function (b) {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply(btn.getAttribute('data-filter'));
    });
  });

  return () => bag.dispose();
}
