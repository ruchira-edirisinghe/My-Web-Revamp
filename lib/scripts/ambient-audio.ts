// @ts-nocheck
/* ════════════════════════════════════════
   ambient-audio.ts — ONE ambient-music element shared across every page.

   In the static-export SPA a route change swaps React trees but keeps the JS
   module graph alive, so a module-scope <audio> keeps playing seamlessly from
   page to page. Each page's engine still owns its spectrum canvas and its
   click/hover SFX, but delegates the background track (play / pause / volume /
   persistence) to this singleton so the playback position AND the paused state
   stay continuous no matter how many pages the visitor moves through.

   sessionStorage still mirrors the state (musicTime / musicMuted) purely as a
   fallback for HARD reloads / direct deep-links, where the module — and thus
   the <audio> element — is created fresh.
   ════════════════════════════════════════ */

const SRC          = '/audio/ambient.mp3';
const MUSIC_VOLUME = 0.35;
const TIME_KEY     = 'musicTime';
const MUTED_KEY    = 'musicMuted';

let audio: HTMLAudioElement | null = null; // the single shared element (lazy)
let muted   = false;                        // visitor paused the music
let fadeRaf = 0;                            // active volume-fade rAF handle
const listeners = new Set<(playing: boolean) => void>();

/** True while the track is audibly playing — drives the spectrum + button glow. */
export function isAmbientPlaying(): boolean {
  return !!audio && !muted && !audio.paused;
}

function notify() {
  const playing = isAmbientPlaying();
  listeners.forEach(fn => { try { fn(playing); } catch {} });
}

/** Lazily create the shared <audio>. Only call in the browser (inside effects). */
function getAudio(): HTMLAudioElement {
  if (audio) return audio;

  audio = new Audio();
  audio.src         = SRC;
  audio.loop        = true;
  audio.volume      = 0;
  audio.preload     = 'auto';
  audio.playsInline = true;

  // Restore the persisted state (only meaningful on a hard reload / deep-link;
  // during SPA navigation this element is reused untouched).
  muted = sessionStorage.getItem(MUTED_KEY) === 'true';
  const savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || '0');
  if (savedTime > 0) {
    const seek = () => { try { audio!.currentTime = savedTime; } catch {} };
    if (audio.readyState >= 1) seek();
    else audio.addEventListener('loadedmetadata', seek, { once: true });
  }

  // Mirror state before the page is torn down by a real reload/close. These
  // listeners intentionally live for the app's lifetime (the element must too).
  const save = () => {
    if (!audio) return;
    sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
    sessionStorage.setItem(MUTED_KEY, String(muted));
  };
  window.addEventListener('pagehide', save);
  window.addEventListener('beforeunload', save);

  return audio;
}

function cancelFade() {
  if (fadeRaf) { cancelAnimationFrame(fadeRaf); fadeRaf = 0; }
}

/** Fade volume to `target` over `durationMs`; pause the element when it hits 0. */
function fadeTo(target: number, durationMs: number, pauseAtEnd = false) {
  const a = getAudio();
  cancelFade();
  const start = a.volume;
  const diff  = target - start;
  const t0    = performance.now();
  function step(now: number) {
    const p = Math.min((now - t0) / durationMs, 1);
    a.volume = Math.max(0, Math.min(1, start + diff * p));
    if (p < 1) { fadeRaf = requestAnimationFrame(step); }
    else { fadeRaf = 0; a.volume = target; if (pauseAtEnd && target === 0) a.pause(); }
  }
  fadeRaf = requestAnimationFrame(step);
}

/**
 * Begin (or resume) playback — call on the first user gesture on any page.
 * If the visitor previously paused, or the track is already playing (they just
 * navigated in), this is a no-op beyond re-broadcasting the current state, so
 * the music never restarts.
 */
export function startAmbient() {
  const a = getAudio();
  if (muted || !a.paused) { notify(); return; }
  a.volume = 0;
  a.play()
    .then(() => { fadeTo(MUSIC_VOLUME, 900); notify(); })
    .catch(() => {});
}

/** Toggle play/pause. The choice persists across pages AND hard reloads. */
export function toggleAmbient() {
  const a = getAudio();
  if (isAmbientPlaying()) {
    muted = true;
    sessionStorage.setItem(MUTED_KEY, 'true');
    fadeTo(0, 600, true);
  } else {
    muted = false;
    sessionStorage.setItem(MUTED_KEY, 'false');
    a.play().then(() => fadeTo(MUSIC_VOLUME, 600)).catch(() => {});
  }
  notify();
}

/** Subscribe to play/pause changes. Fires immediately; returns an unsubscribe fn. */
export function subscribeAmbient(cb: (playing: boolean) => void): () => void {
  listeners.add(cb);
  cb(isAmbientPlaying());
  return () => { listeners.delete(cb); };
}

/**
 * One-call wiring for a page's music UI. Attaches click-to-toggle on every
 * #music-btn / #music-btn-desktop, starts the track on the first user gesture,
 * keeps the buttons' `.playing` class in sync, and calls `onChange(playing)`
 * (immediately + on every change) so the caller can drive its spectrum canvas.
 * Returns a teardown that removes the listeners WITHOUT stopping the audio —
 * the singleton must outlive any single page.
 */
export function wireAmbientControls(onChange?: (playing: boolean) => void): () => void {
  const SELECTOR = '#music-btn, #music-btn-desktop';
  const teardowns: Array<() => void> = [];

  const onClick = (e: Event) => { e.stopPropagation(); toggleAmbient(); };
  document.querySelectorAll(SELECTOR).forEach(btn => {
    btn.addEventListener('click', onClick);
    teardowns.push(() => btn.removeEventListener('click', onClick));
  });

  const GESTURES = ['mousemove', 'mouseenter', 'pointerdown', 'touchstart', 'keydown', 'click'];
  const onFirstGesture = () => {
    GESTURES.forEach(ev => window.removeEventListener(ev, onFirstGesture));
    startAmbient();
  };
  GESTURES.forEach(ev =>
    window.addEventListener(ev, onFirstGesture, { once: true, passive: ev !== 'keydown' }),
  );
  teardowns.push(() => GESTURES.forEach(ev => window.removeEventListener(ev, onFirstGesture)));

  teardowns.push(
    subscribeAmbient(playing => {
      document.querySelectorAll(SELECTOR).forEach(b => b.classList.toggle('playing', playing));
      onChange?.(playing);
    }),
  );

  return () => teardowns.forEach(fn => fn());
}
