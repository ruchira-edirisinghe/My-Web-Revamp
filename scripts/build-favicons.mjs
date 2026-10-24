/* build-favicons.mjs - every favicon in public/Images/favicon/, drawn from the
   RE monogram (public/Images/shortlogo.svg).

   The monogram's off-white would vanish on a light browser tab, so it sits on a
   rounded tile in the site's background colour, edged in the same cyan-violet
   neon its accents use. One SVG master is written as icon.svg (modern browsers
   scale it crisply) and rasterised to the PNG sizes and a multi-size .ico for
   everything else.

   Run: node scripts/build-favicons.mjs                                       */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const OUT = path.join(root, 'public/Images/favicon');

// The monogram's inner markup (defs, style and shapes), reused inside the tile.
const mono = await readFile(path.join(root, 'public/Images/shortlogo.svg'), 'utf8');
const inner = mono.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>.*?<\/title>/, '');

// Monogram viewBox 871 556 933x358, scaled to 400 wide and centred in 512.
const S = 400 / 933;
const tx = (512 - 400) / 2 - 871 * S;
const ty = (512 - 358 * S) / 2 - 556 * S;

const master = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <title>Ruchira Edirisinghe</title>
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b1026"/>
      <stop offset="1" stop-color="#02030a"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5ce0ff"/>
      <stop offset="1" stop-color="#bc6fff"/>
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="496" height="496" rx="112" fill="url(#tile)" stroke="url(#edge)" stroke-opacity="0.55" stroke-width="16"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${S.toFixed(5)})">${inner}</g>
</svg>
`;
await writeFile(path.join(OUT, 'icon.svg'), master);

const png = (size) => sharp(Buffer.from(master), { density: Math.max(72, (72 * size) / 512 * 4) })
  .resize(size, size).png({ compressionLevel: 9 }).toBuffer();

const SIZES = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
};
for (const [name, size] of Object.entries(SIZES)) {
  await writeFile(path.join(OUT, name), await png(size));
  console.log(`${name} ${size}x${size}`);
}

// favicon.ico: 16, 32 and 48 px PNG entries in one ICO container.
const icoSizes = [16, 32, 48];
const images = await Promise.all(icoSizes.map(png));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((img, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(icoSizes[i] % 256, e);     // width (0 means 256)
  header.writeUInt8(icoSizes[i] % 256, e + 1); // height
  header.writeUInt16LE(1, e + 4);              // colour planes
  header.writeUInt16LE(32, e + 6);             // bits per pixel
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
await writeFile(path.join(OUT, 'favicon.ico'), Buffer.concat([header, ...images]));
console.log(`favicon.ico ${icoSizes.join(', ')}`);
