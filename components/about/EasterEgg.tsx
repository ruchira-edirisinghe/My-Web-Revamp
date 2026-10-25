'use client';
import { useEffect, useState } from 'react';
import Sheet from '@/components/Sheet';
import { cssVars } from '@/lib/css';
import { Icon } from '@/components/ui/Icon';

/* The About page's easter egg: five quick taps on the photo (AboutHero.tsx)
   open an "achievement unlocked" popup with a burst of sparkles. Its button
   doesn't say what the reward is; pressing it swaps the card for the video,
   embedded right there and playing at once (the press is the user gesture
   that lets it start with sound). A moment in, a caption pops up under it
   to rub it in. The popup can't be closed for the first few seconds of the
   video (the close button counts down, then lights up). Closing the popup
   unloads the video.
   Styles: styles/about/about-v2.css (.egg-). */

const VIDEO = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&playsinline=1&modestbranding=1';
const SPARKS = 22;
const LOCK_S = 8;
const COLORS = ['#ffc94d', '#5ce0ff', '#bc6fff', '#6dff8a', '#ff6bd5', '#ffffff'];
// Party flakes raining down the card: spread across it, each with its own
// colour, shape, size, sway, spin and timing.
const FLAKES = Array.from({ length: 34 }, (_, i) => ({
  '--x': `${(i * 29 + 7) % 100}%`,
  '--k': COLORS[i % COLORS.length],
  '--w': `${5 + (i % 3) * 2}px`,
  '--h': i % 4 === 0 ? `${5 + (i % 3) * 2}px` : `${9 + (i % 5) * 2}px`,
  '--br': i % 4 === 0 ? '50%' : '2px',
  '--sw': `${(i % 2 ? 1 : -1) * (14 + (i * 13) % 30)}px`,
  '--sp': `${(i % 2 ? 1 : -1) * (360 + (i * 47) % 360)}deg`,
  '--dur': `${2.6 + ((i * 17) % 13) / 10}s`,
  '--t': `${((i * 23) % 16) / 10}s`,
}));
// Glints: little stars dotted round the card, twinkling.
const GLINTS = [[12, 18], [86, 14], [8, 62], [92, 56], [22, 88], [78, 84], [50, 6], [64, 40]];

export default function EasterEgg({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [caption, setCaption] = useState(false);
  const [lock, setLock] = useState(0);

  // The caption, once the first second and a half has sunk in.
  useEffect(() => {
    if (!playing) { setCaption(false); return; }
    const id = setTimeout(() => setCaption(true), 1500);
    return () => clearTimeout(id);
  }, [playing]);

  // No escape for the first eight seconds: the close button, Escape and the
  // backdrop all wait out the countdown.
  useEffect(() => {
    if (!playing) { setLock(0); return; }
    setLock(LOCK_S);
    const id = setInterval(() => setLock((s) => (s <= 1 ? (clearInterval(id), 0) : s - 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);
  const locked = playing && lock > 0;
  const close = () => { if (!locked) onClose(); };

  return (
    <Sheet open={open} onClose={close} onClosed={() => setPlaying(false)} color="#ffc94d" labelledBy="egg-title" describedBy="egg-desc">
      {locked ? (
        <button type="button" className="xg-x egg-x-wait" disabled aria-label={`You can close this in ${lock} seconds`}
          style={cssVars({ '--p': `${(lock / LOCK_S) * 100}%` })}>
          <span aria-hidden="true">{lock}</span>
        </button>
      ) : (
        <button type="button" className={`xg-x${playing ? ' egg-x-ready' : ''}`} aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      )}

      {playing ? (
        <div className="egg-play">
          <h2 id="egg-title" className="xg-title">Enjoy your reward</h2>
          <p id="egg-desc" className="sr-only">A video, playing now.</p>
          <div className="egg-frame">
            <iframe
              src={VIDEO}
              title="Your easter egg reward"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          </div>
          {caption && (
            <p className="egg-caption" role="status">
              <span className="egg-caption-big">Imagine getting rickrolled by a portfolio website. In 2026. <Icon name="Skull" /></span>
              <span className="egg-caption-small">You tapped my face five times for this. No refunds, but I&rsquo;m never gonna let you down.</span>
            </p>
          )}
        </div>
      ) : (
        <>
        <div className="egg-confetti" aria-hidden="true">
          {FLAKES.map((f, i) => <i key={i} style={cssVars(f)} />)}
          {GLINTS.map(([x, y], i) => <b key={i} style={cssVars({ '--x': `${x}%`, '--y': `${y}%`, '--i': i })} />)}
        </div>
        <div className="egg-unlock">
          {/* The burst: sparks fly out from the trophy, then a few keep twinkling. */}
          <div className="egg-burst" aria-hidden="true">
            {Array.from({ length: SPARKS }, (_, i) => (
              <i key={i} style={cssVars({
                '--a': `${(360 / SPARKS) * i + (i % 3) * 7}deg`,
                '--r': `${90 + ((i * 37) % 70)}px`,
                '--s': `${6 + (i % 4) * 3}px`,
                '--k': COLORS[i % COLORS.length],
                '--t': `${(i % 5) * 0.04}s`,
              })} />
            ))}
          </div>
          <div className="egg-twinkles" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => <i key={i} style={cssVars({ '--i': i })} />)}
          </div>

          <div className="xg-orb egg-orb" aria-hidden="true">
            <span className="xg-orb-ring" />
            <svg className="xg-orb-icon" viewBox="0 0 24 24">
              <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
              <path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />
            </svg>
          </div>
          <p className="xg-kicker">Achievement unlocked</p>
          <h2 id="egg-title" className="xg-title egg-title">You found an easter egg!</h2>
          <p id="egg-desc" className="xg-desc">
            Five taps on the photo. Not many people find this one, so you&rsquo;ve earned a little <strong>reward</strong>.
          </p>
          <div className="xg-actions">
            <button type="button" className="xg-btn" onClick={onClose}>Maybe later</button>
            <button type="button" className="xg-btn is-go" data-autofocus onClick={() => setPlaying(true)}>
              Claim my reward
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
        </>
      )}
    </Sheet>
  );
}
