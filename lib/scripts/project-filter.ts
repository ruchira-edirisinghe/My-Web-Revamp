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

  /**
   * Show the cards matching `filter` and replay their entrance animation.
   *
   * THREE PASSES, AND THE REFLOW IS TAKEN ONCE.
   *
   * This used to be one pass that, for every visible card, wrote `display`,
   * removed `.fx`, read `card.offsetWidth` to force the animation to restart,
   * and wrote `.fx` back. Reading a layout property immediately after writing a
   * style is a forced synchronous reflow, and doing it inside the loop meant the
   * browser recomputed layout for the whole grid once PER CARD - twenty-six
   * times for the "All" button, on a page of glass cards with backdrop-filter,
   * which is about the most expensive thing there is to lay out. That is the
   * stutter on every filter click.
   *
   * The restart still needs a reflow between removing the class and adding it,
   * but it needs exactly one, and it can be a single read for the whole grid:
   * write all the display changes and strip every `.fx`, read once, then write
   * every `.fx` back.
   */
  function apply(filter) {
    const visible = [];

    // Pass 1 - writes only. No layout is read, so nothing is forced yet.
    cards.forEach(function (card) {
      const cats = (card.getAttribute('data-category') || '').split(/\s+/);
      const show = filter === 'all' || cats.indexOf(filter) !== -1;
      card.style.display = show ? '' : 'none';
      card.classList.remove('fx');
      if (show) visible.push(card);
    });

    // Pass 2 - one read, for the whole grid, which flushes the removals above.
    void bar.offsetWidth;

    // Pass 3 - writes only. Every card restarts from the same flushed state.
    for (const card of visible) card.classList.add('fx');

    if (empty) empty.hidden = visible.length > 0;
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
