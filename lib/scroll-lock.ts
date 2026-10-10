/* Freeze the page under a popup without moving it.
   Toggling `overflow: hidden` on <html>/<body> makes some mobile browsers
   (Safari, Chrome on Android) throw the page back to the top. Instead the body
   is pinned with `position: fixed` at its current offset, and the exact scroll
   position is put back on unlock. Counted, so nested popups are fine. */

let locks = 0;
let savedY = 0;

export function lockScroll(): void {
  if (locks++ > 0) return;
  savedY = window.scrollY;
  const html = document.documentElement;
  // Keep the scrollbar's gutter on desktop so nothing shifts sideways.
  if (html.scrollHeight > html.clientHeight && window.innerWidth > html.clientWidth) html.style.overflowY = 'scroll';
  Object.assign(document.body.style, { position: 'fixed', top: `-${savedY}px`, left: '0', right: '0', width: '100%' });
}

export function unlockScroll(): void {
  if (locks === 0 || --locks > 0) return;
  const html = document.documentElement;
  Object.assign(document.body.style, { position: '', top: '', left: '', right: '', width: '' });
  html.style.overflowY = '';
  // Jump straight back - `scroll-behavior: smooth` would animate from the top.
  const behavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, savedY);
  html.style.scrollBehavior = behavior;
}
