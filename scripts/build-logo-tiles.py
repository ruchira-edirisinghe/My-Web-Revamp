"""build-logo-tiles.py - the Logo Designs gallery tiles, each logo on a
background drawn from its own colours instead of the same white artboard.

Sources are the lossless logo artboards in assets-src/logos/ (white
background, or transparent for ciao.png). The white that touches the edge of
the artboard is cut away (white inside a logo, like a face or a highlight,
stays), anti-aliased edges are un-blended from white so they don't leave a
halo, and the logo goes back on a gradient in its main hue: a deep, glowing
one for bright or light logos, a soft pale one for logos drawn in dark ink.
STYLE overrides the pick for any logo that needs it.

Writes public/Images/artworks/logos/<name>.webp (1800x1200) and
thumbs/<name>.webp (600x400).

Run: py scripts/build-logo-tiles.py [name ...]                              """
import colorsys
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'assets-src/logos'
OUT = ROOT / 'public/Images/artworks/logos'
W, H = 1800, 1200

# name: ('dark' | 'light', hue in degrees or None for auto)
STYLE: dict[str, tuple[str, float | None]] = {
    # Bright marks with dark lettering that sinks on a dark tile.
    'dns': ('light', 215),
    'imlan': ('light', 200),
    'ohl': ('light', 45),
    'wish': ('light', 150),
    # Black-ink logos: a pale tint instead of plain grey.
    'akila': ('light', 35),
    'heal': ('light', 195),
    'phurl': ('light', 265),
    'takg': ('light', 210),
}


def cut_white(img: Image.Image) -> np.ndarray:
    """RGBA float array with the edge-connected white made transparent."""
    a = np.asarray(img.convert('RGBA')).astype(np.float32) / 255
    rgb, alpha = a[..., :3], a[..., 3]
    if alpha.min() < 0.5:  # already transparent
        return a
    dist = 1 - rgb.min(axis=2)  # 0 = pure white
    near = dist < 0.07
    lab, _ = ndimage.label(near)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    bg = np.isin(lab, edge[edge > 0])
    # Un-blend a band of pixels around the background from white.
    band = ndimage.binary_dilation(bg, iterations=3) & ~bg
    out = a.copy()
    out[bg, 3] = 0
    k = np.clip(dist[band], 1e-3, 1)
    out[band, 3] = k
    out[band, :3] = np.clip((rgb[band] - (1 - k)[:, None]) / k[:, None], 0, 1)
    return out


def analyse(a: np.ndarray) -> tuple[str, float, float]:
    """(style, hue, saturation) for a cut-out logo."""
    m = a[..., 3] > 0.9
    px = a[m][:, :3]
    lum = px @ np.array([0.2126, 0.7152, 0.0722])
    dark = (lum < 0.22).mean()
    hsv = np.array([colorsys.rgb_to_hsv(*p) for p in px[:: max(1, len(px) // 20000)]])
    col = hsv[(hsv[:, 1] > 0.35) & (hsv[:, 2] > 0.25)]
    if len(col) > 50:
        hist, edges = np.histogram(col[:, 0], bins=36, range=(0, 1))
        i = hist.argmax()
        hue = (edges[i] + edges[i + 1]) / 2 * 360
        sat = min(1.0, len(col) / len(hsv) * 3)
    else:
        hue, sat = 230.0, 0.0
    return ('light' if dark > 0.12 else 'dark'), hue, sat


def hsl(h: float, s: float, l: float) -> np.ndarray:
    return np.array(colorsys.hls_to_rgb(h / 360 % 1, l, s), dtype=np.float32)


def background(style: str, hue: float, sat: float) -> np.ndarray:
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    r = np.sqrt(((x - W * 0.5) / (W * 0.62)) ** 2 + ((y - H * 0.44) / (H * 0.7)) ** 2)
    t = np.clip(r, 0, 1)[..., None] ** 1.2
    diag = (x / W * 0.6 + y / H * 0.4)[..., None]
    s = 0.25 + 0.45 * sat
    if style == 'dark':
        inner, outer, tint = hsl(hue, s, 0.17), hsl(hue + 15, s, 0.045), hsl(hue - 25, s, 0.10)
    else:
        inner, outer, tint = hsl(hue, s * 0.9, 0.97), hsl(hue + 12, s * 0.8, 0.84), hsl(hue - 20, s, 0.90)
    bg = inner * (1 - t) + outer * t
    bg = bg * (1 - diag * 0.25) + tint * diag * 0.25
    # A faint dot grid so the tile reads as an artboard, not a flat fill.
    dots = (((x % 36) - 18) ** 2 + ((y % 36) - 18) ** 2 < 2.2)[..., None]
    bg = np.where(dots, bg * (1.12 if style == 'dark' else 0.96), bg)
    return np.clip(bg, 0, 1)


def place(a: np.ndarray) -> np.ndarray:
    """Logos already on a 1800x1200 artboard keep their placement; anything
    else is trimmed and centred at the same scale."""
    if a.shape[:2] == (H, W):
        return a
    img = Image.fromarray((a * 255).astype(np.uint8), 'RGBA')
    img = img.crop(img.getbbox())
    img.thumbnail((int(W * 0.7), int(H * 0.6)), Image.LANCZOS)
    canvas = Image.new('RGBA', (W, H))
    canvas.paste(img, ((W - img.width) // 2, (H - img.height) // 2), img)
    return np.asarray(canvas).astype(np.float32) / 255


def build(path: Path) -> None:
    a = place(cut_white(Image.open(path)))
    style, hue, sat = analyse(a)
    style, hue = STYLE.get(path.stem, (style, hue))[0], STYLE.get(path.stem, (style, hue))[1] or hue
    bg = background(style, hue, sat)
    if style == 'dark':  # a soft glow behind bright logos
        glow = ndimage.gaussian_filter(a[..., 3], 40)[..., None] * 0.35
        bg = np.clip(bg + glow * hsl(hue, 0.7, 0.5), 0, 1)
    al = a[..., 3:4]
    out = Image.fromarray(((a[..., :3] * al + bg * (1 - al)) * 255).round().astype(np.uint8), 'RGB')
    out.save(OUT / f'{path.stem}.webp', quality=88)
    out.resize((600, 400), Image.LANCZOS).save(OUT / 'thumbs' / f'{path.stem}.webp', quality=85)
    print(f'{path.stem:12s} {style:5s} hue {hue:5.0f} sat {sat:.2f}')


names = sys.argv[1:]
for p in sorted(SRC.glob('*.png')):
    if not names or p.stem in names:
        build(p)
