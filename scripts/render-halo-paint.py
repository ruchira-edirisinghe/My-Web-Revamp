"""Paints the disc behind the photo on the About hero (AboutHero.tsx).

A street-art roundel: rough dry-brush bands crossing a dark concrete ground,
shorter bright slashes, then paint splatter and drips over the top, all
clipped to a circle. The colours are the site's: pale periwinkle bands,
cyan slashes, cyan / violet / pink splatter on deep navy.

    py scripts/render-halo-paint.py
writes public/Images/about/halo-paint.webp
"""
import math
import os

import numpy as np
from PIL import Image
from scipy import ndimage

SIZE = 1200
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'Images', 'about', 'halo-paint.webp')
rng = np.random.default_rng(7)

GROUND = np.array([12, 14, 38], float)
PALE = np.array([214, 220, 250], float)
CYAN = np.array([92, 224, 255], float)
VIOLET = np.array([188, 111, 255], float)
PINK = np.array([255, 107, 213], float)

yy, xx = np.mgrid[0:SIZE, 0:SIZE].astype(float)


def noise(scale, seed=None):
    """Smooth value noise in 0..1 with features about `scale` px wide."""
    r = np.random.default_rng(seed) if seed is not None else rng
    n = r.random((SIZE // scale + 3, SIZE // scale + 3))
    n = ndimage.zoom(n, scale, order=3)[:SIZE, :SIZE]
    return (n - n.min()) / (np.ptp(n) + 1e-9)


def fbm(scales):
    out = sum(noise(s) * w for s, w in scales)
    return (out - out.min()) / (np.ptp(out) + 1e-9)


def streaks(angle):
    """Noise smeared along `angle`, like bristle marks in a dry brush stroke."""
    n = rng.random((SIZE, SIZE))
    n = ndimage.rotate(n, -angle, reshape=False, order=1, mode='wrap')
    n = ndimage.uniform_filter1d(n, 90, axis=1)
    n = ndimage.uniform_filter1d(n, 3, axis=0)
    n = ndimage.rotate(n, angle, reshape=False, order=1, mode='wrap')
    return (n - n.min()) / (np.ptp(n) + 1e-9)


# Rough edges: every band's edge gets pushed around by this field.
EDGE = fbm([(6, 0.35), (18, 0.4), (60, 0.25)]) - 0.5


def band(x0, y0, x1, y1, width, rough=26):
    """A coverage mask (0..1) for a brushed band from (x0,y0) to (x1,y1)."""
    dx, dy = x1 - x0, y1 - y0
    length = math.hypot(dx, dy)
    ux, uy = dx / length, dy / length
    along = (xx - x0) * ux + (yy - y0) * uy
    across = np.abs(-(xx - x0) * uy + (yy - y0) * ux)
    half = width / 2 + EDGE * rough * 2
    side = half - across
    # The ends fray out: the band thins and breaks up over its last stretch.
    end = np.minimum(along, length - along) + EDGE * 80
    mask = np.clip(side / 4, 0, 1) * np.clip(end / 30, 0, 1)
    angle = math.degrees(math.atan2(dy, dx))
    # Dry brush: gaps where the paint ran thin, lined up with the stroke.
    dry = streaks(angle)
    gaps = np.clip((dry - 0.36) * 6, 0, 1)
    return mask * (0.25 + 0.75 * gaps)


def paint(img, mask, color, alpha=1.0):
    tex = 0.82 + 0.3 * fbm([(3, 0.5), (12, 0.5)])[..., None]
    c = np.clip(color * tex, 0, 255)
    m = (mask * alpha)[..., None]
    return img * (1 - m) + c * m


def disc(cx, cy, r):
    d = np.hypot(xx - cx, yy - cy)
    return np.clip(r - d + EDGE * r * 0.5, 0, 1)


def splat(cx, cy, r):
    """A blob with a spray of droplets thrown out round it."""
    m = disc(cx, cy, r)
    for _ in range(int(6 + r)):
        a = rng.random() * math.tau
        dist = r * (1.2 + rng.random() * 3.2)
        m = np.maximum(m, disc(cx + math.cos(a) * dist, cy + math.sin(a) * dist, max(1.5, r * rng.random() * 0.35)))
    return m


def drip(cx, cy, w, length):
    """A run of paint down from (cx, cy), ending in a fat drop."""
    wob = noise(40)[:, 0] * 6
    x = cx + wob[np.clip(yy.astype(int), 0, SIZE - 1)] - 3
    m = np.clip(w / 2 - np.abs(xx - x), 0, 1) * (yy >= cy) * (yy <= cy + length)
    return np.maximum(m, disc(cx, cy + length, w * 0.9))


# The ground: dark concrete, blotchy and speckled.
g = fbm([(4, 0.3), (20, 0.35), (90, 0.35)])
img = np.broadcast_to(GROUND, (SIZE, SIZE, 3)) * (0.7 + 0.6 * g[..., None])
speck = rng.random((SIZE, SIZE)) > 0.985
img[speck] = img[speck] * 1.9

C = SIZE / 2
# Pale bands crossing like a big asterisk, a little off-centre, plus a few strays.
for (a, off, w) in [(-58, -40, 120), (62, 60, 110), (8, -260, 95), (-70, 330, 80), (128, -330, 85), (95, 300, 70)]:
    t = math.radians(a)
    nx, ny = -math.sin(t), math.cos(t)
    x0, y0 = C + nx * off - math.cos(t) * 760, C + ny * off - math.sin(t) * 760
    x1, y1 = C + nx * off + math.cos(t) * 760, C + ny * off + math.sin(t) * 760
    img = paint(img, band(x0, y0, x1, y1, w), PALE, 0.92)

# Bright cyan slashes over them, short and thick, roughly one direction.
for (x, y, a, l, w) in [(250, 300, -22, 300, 90), (860, 260, -18, 260, 80), (180, 760, -26, 340, 100),
                        (900, 860, -20, 300, 85), (560, 1010, -14, 260, 70), (640, 150, -30, 200, 60)]:
    t = math.radians(a)
    img = paint(img, band(x - math.cos(t) * l / 2, y - math.sin(t) * l / 2, x + math.cos(t) * l / 2, y + math.sin(t) * l / 2, w, 20), CYAN, 0.95)

# Splatter and drips on top.
for (x, y, r, col) in [(330, 220, 16, CYAN), (980, 520, 14, CYAN), (240, 560, 12, VIOLET), (760, 740, 11, CYAN),
                       (520, 330, 9, PINK), (880, 1010, 13, VIOLET), (150, 900, 10, CYAN), (700, 420, 8, VIOLET),
                       (420, 870, 12, PINK), (1050, 760, 9, CYAN), (610, 600, 7, CYAN)]:
    img = paint(img, splat(x, y, r), col)
for (x, y, w, l, col) in [(300, 330, 9, 150, CYAN), (880, 300, 8, 120, CYAN), (210, 820, 10, 170, CYAN),
                          (930, 900, 8, 110, CYAN), (560, 1040, 7, 90, CYAN), (980, 520, 6, 140, CYAN),
                          (240, 560, 6, 120, VIOLET), (420, 870, 6, 100, PINK)]:
    img = paint(img, drip(x, y, w, l), col)

# Clip to a clean circle.
r = SIZE / 2 - 2
alpha = np.clip(r - np.hypot(xx - C + 0.5, yy - C + 0.5), 0, 1) * 255
out = np.dstack([np.clip(img, 0, 255), alpha]).astype(np.uint8)
Image.fromarray(out, 'RGBA').save(OUT, 'WEBP', quality=86, method=6)
print('wrote', os.path.normpath(OUT), os.path.getsize(OUT) // 1024, 'KB')
