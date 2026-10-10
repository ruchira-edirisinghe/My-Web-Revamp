/* Pause the CSS animations of page sections that are scrolled out of view.

   The pages run a lot of looping CSS animation (spinning rings, glows,
   shimmering text, pinging icons), and the browser keeps every one of them
   ticking, and some repainting, even when they're far off screen. Each
   section of the page (main's direct children, any <section>, the footer) is
   watched; while one is well out of view it gets [data-off], and
   globals.css pauses every animation inside it. They pick up where they left
   off a little before they scroll back in. Transitions and script-driven
   animation aren't affected. */

const SEL = 'main > *, main section, body > footer, main ~ footer';

export function pauseOffscreen(): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.removeAttribute('data-off');
      else e.target.setAttribute('data-off', '');
    }
  }, { rootMargin: '300px 0px' });
  const els = Array.from(document.querySelectorAll<HTMLElement>(SEL));
  els.forEach((el) => io.observe(el));
  return () => {
    io.disconnect();
    els.forEach((el) => el.removeAttribute('data-off'));
  };
}
