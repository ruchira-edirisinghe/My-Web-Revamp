/* ════════════════════════════════════════
   sfx.ts - the site's interaction sounds, shared by every page.

   One AudioContext for the whole session, made on the first sound. Every
   sound runs through a soft compressor and a short, airy space reverb, and
   is synthesised on the spot (nothing to download):

     hover  a soft glassy tick, a little higher or lower each time (notes
            from D minor pentatonic, so they never clash with each other or
            the music); throttled, and skipped on touch screens
     click  a two-note chime for buttons and links
     tap    a gentle pluck for a tap anywhere else

   They stay quiet: they're there to be felt more than heard.
   ════════════════════════════════════════ */

type Ctx = { ac: AudioContext; bus: GainNode; wet: GainNode };
let ctx: Ctx | null = null;

// D minor pentatonic: D F G A C.
const HOVER_NOTES = [1174.66, 1396.91, 1567.98, 1760, 2093];
const TAP_NOTES = [587.33, 698.46, 783.99, 880, 1046.5];

function reverbImpulse(ac: AudioContext, seconds: number): AudioBuffer {
  const len = Math.round(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  return buf;
}

function get(): Ctx | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ac = new AC();
      const comp = ac.createDynamicsCompressor();
      comp.threshold.value = -18; comp.ratio.value = 4;
      comp.connect(ac.destination);
      const bus = ac.createGain();
      bus.gain.value = 0.9;
      bus.connect(comp);
      const verb = ac.createConvolver();
      verb.buffer = reverbImpulse(ac, 1.4);
      const wet = ac.createGain();
      wet.gain.value = 0.32;
      wet.connect(verb); verb.connect(comp);
      ctx = { ac, bus, wet };
    }
    if (ctx.ac.state === 'suspended') void ctx.ac.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** One enveloped oscillator into the dry bus and the reverb. */
function voice(c: Ctx, type: OscillatorType, freq: number, at: number, peak: number, decay: number, glide = 1) {
  const { ac } = c;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (glide !== 1) osc.frequency.exponentialRampToValueAtTime(freq * glide, at + decay);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  osc.connect(g);
  g.connect(c.bus);
  g.connect(c.wet);
  osc.start(at);
  osc.stop(at + decay + 0.05);
}

const pick = (a: number[], not?: number) => {
  let v = a[(Math.random() * a.length) | 0];
  if (v === not) v = a[(a.indexOf(v) + 1) % a.length];
  return v;
};

const coarse = () => typeof matchMedia !== 'undefined' && matchMedia('(hover: none), (pointer: coarse)').matches;

let lastHover = 0;
let lastNote = 0;
export function sfxHover(): void {
  if (coarse()) return;
  const now = performance.now();
  if (now - lastHover < 70) return;
  lastHover = now;
  const c = get();
  if (!c) return;
  const t = c.ac.currentTime;
  const f = (lastNote = pick(HOVER_NOTES, lastNote));
  voice(c, 'sine', f, t, 0.035, 0.09, 1.02);
  voice(c, 'triangle', f * 2, t, 0.008, 0.05);
}

let lastClick = 0;
/** A button or link: a soft rising two-note chime. `strong` for main buttons. */
export function sfxClick(strong = false): void {
  const now = performance.now();
  if (now - lastClick < 40) return;
  lastClick = now;
  const c = get();
  if (!c) return;
  const t = c.ac.currentTime;
  const v = strong ? 0.11 : 0.08;
  voice(c, 'sine', 587.33, t, v, 0.32, 0.995);
  voice(c, 'sine', 880, t + 0.045, v * 0.8, 0.42, 0.995);
  voice(c, 'triangle', 1760, t + 0.045, v * 0.12, 0.18);
}

/** A tap on the page itself: a gentle pluck. */
export function sfxTap(): void {
  const now = performance.now();
  if (now - lastClick < 40) return;
  lastClick = now;
  const c = get();
  if (!c) return;
  const t = c.ac.currentTime;
  const f = pick(TAP_NOTES);
  voice(c, 'triangle', f, t, 0.06, 0.22, 0.99);
  voice(c, 'sine', f * 2, t, 0.015, 0.12);
}
