/* build-og-image.mjs - render public/Images/og-card.jpg, the 1200x630 card shown
   when the site is shared (LinkedIn, X, WhatsApp, Slack) and used by Google as
   the page image. Square mynew.png gets cropped badly in that slot, so this puts
   the portrait on the right and the name and role on the left.

   Run: node scripts/build-og-image.mjs                                        */
import sharp from 'sharp';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const W = 1200, H = 630;
const BG = '#191818'; // mynew.png's own backdrop, so the two halves read as one
const GOLD = '#f5b82e';

const portrait = await sharp(path.join(root, 'public/Images/mynew.png'))
  .resize(H, H)
  .toBuffer();

// Fade the portrait's left edge into the background so the seam disappears.
const fade = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="f" x1="0" x2="1">
    <stop offset="0" stop-color="${BG}" stop-opacity="1"/>
    <stop offset="1" stop-color="${BG}" stop-opacity="0"/>
  </linearGradient></defs>
  <rect x="${W - H}" y="0" width="140" height="${H}" fill="url(#f)"/>
</svg>`);

const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .n { font: 800 64px 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; fill: #ffffff; letter-spacing: 2px; }
    .r { font: 600 30px 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; fill: ${GOLD}; }
    .s { font: 400 24px 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; fill: #b8b8b8; }
  </style>
  <rect x="64" y="196" width="72" height="6" rx="3" fill="${GOLD}"/>
  <text x="64" y="282" class="n">RUCHIRA</text>
  <text x="64" y="356" class="n">EDIRISINGHE</text>
  <text x="64" y="414" class="r">UI/UX Engineer &amp; Game Developer</text>
  <text x="64" y="460" class="s">Product design · Web &amp; mobile · Unity games</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    { input: portrait, left: W - H, top: 0 },
    { input: fade, left: 0, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(root, 'public/Images/og-card.jpg'));

console.log('wrote public/Images/og-card.jpg');
