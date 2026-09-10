/**
 * The card-sized sibling of a gallery capture.
 *
 * Case-study captures are stored at up to 1920px because the lightbox draws
 * them at viewport width, but the marquee cards they scroll past in are 540px
 * on desktop and 300px on a phone. `scripts/optimize-images.mjs` writes a
 * 1100px `-card` sibling beside every capture for exactly that job - 1100px
 * covers a 540px card at DPR 2 and a 300px one at DPR 3 - and `to-webp.mjs`
 * re-encodes the pair, so what ships is `<name>.webp` / `<name>-card.webp`.
 * This maps one filename onto the other.
 *
 * Most galleries are written out as literal markup and carry the `-card`
 * filename directly in the `src`. This exists for the three that build their
 * cards from an array (Aether Dynasty, Catalogie, PropBet), where the same
 * string has to serve as both the card's `src` and the lightbox's `data-full`
 * and so cannot simply be spelt differently in each place.
 *
 * A path that is not a `.webp` comes back untouched, so passing an already
 * carded or non-raster URL through it is harmless.
 */
export const cardSrc = (src: string): string =>
  /-card\.webp$/i.test(src) ? src : src.replace(/\.webp$/i, '-card.webp');
