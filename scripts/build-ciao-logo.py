"""build-ciao-logo.py - the Ciao Chat tile for the Logo Designs gallery.

The source (assets-src/logos/ciao.png) is drawn for dark backgrounds, with a
white "CIAO" and white eyes. To match the other logos' white artboards, those
white parts are recoloured deep navy (anti-aliased edges blend across), then
the logo is trimmed and centred on a 1800x1200 white tile like the rest.

Run: py scripts/build-ciao-logo.py                                          """
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/Images/artworks/logos'
W, H = 1800, 1200
NAVY = np.array([11, 27, 74], dtype=np.float32) / 255  # #0b1b4a

img = Image.open(ROOT / 'assets-src/logos/ciao.png').convert('RGBA')
img = img.crop(img.getbbox())
a = np.asarray(img).astype(np.float32) / 255
rgb = a[..., :3]
# How white a pixel is: bright and unsaturated. The blues stay as they are.
lo, hi = rgb.min(axis=2), rgb.max(axis=2)
t = np.clip((lo - 0.55) / 0.35, 0, 1) * np.clip(1 - (hi - lo) / 0.25, 0, 1)
a[..., :3] = rgb * (1 - t[..., None]) + NAVY * t[..., None]
logo = Image.fromarray((a * 255).round().astype(np.uint8), 'RGBA')
logo.thumbnail((int(W * 0.7), int(H * 0.6)), Image.LANCZOS)

tile = Image.new('RGB', (W, H), 'white')
tile.paste(logo, ((W - logo.width) // 2, (H - logo.height) // 2), logo)
tile.save(OUT / 'ciao.webp', quality=88)
tile.resize((600, 400), Image.LANCZOS).save(OUT / 'thumbs' / 'ciao.webp', quality=85)
