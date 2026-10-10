"""Builds the ZUSE Technologies and Trex Labs logos for the About page's
"Teams & brands" strip (public/Images/logobar/).

Both come from the stacked logos on the Experience page
(public/Images/experience/zuse.webp, trexlabs.webp), re-laid out
horizontally (mark on the left, name on the right) and greyed to match the
other strip logos, which are stored in a flat mid grey around #7a7a7a.

    py scripts/build-logobar-logos.py
"""
import os

import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'Images')
SRC = os.path.join(ROOT, 'experience')
OUT = os.path.join(ROOT, 'logobar')
H = 120          # canvas height, like the other strip logos
INK_H = 90       # height of the artwork inside it
PAD_X = 14


def band(im, y0, y1):
    """The artwork between rows y0 and y1, trimmed to its edges."""
    part = im.crop((0, y0, im.width, y1))
    return part.crop(part.getbbox())


def scaled(im, h):
    return im.resize((max(1, round(im.width * h / im.height)), h), Image.LANCZOS)


def grey(im, lo=104, hi=140):
    """Flat grey, keeping a little of the artwork's light and shade."""
    a = np.array(im).astype(float)
    lum = a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114
    lum = (lum - lum.min()) / (np.ptp(lum) + 1e-9)
    g = lo + lum * (hi - lo)
    a[..., 0] = a[..., 1] = a[..., 2] = g
    return Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGBA')


def save(art, name):
    art = scaled(art, INK_H)
    canvas = Image.new('RGBA', (art.width + PAD_X * 2, H), (0, 0, 0, 0))
    canvas.alpha_composite(art, (PAD_X, (H - INK_H) // 2))
    path = os.path.join(OUT, name)
    canvas.save(path, 'WEBP', quality=92, method=6)
    print('wrote', name, canvas.size)


# ZUSE: the Z mark beside the name, ZUSE over TECHNOLOGIES (same width).
z = Image.open(os.path.join(SRC, 'zuse.webp')).convert('RGBA')
mark = band(z, 0, 330)
word = band(z, 330, z.height)            # ZUSE + TECHNOLOGIES, as stacked
mark = scaled(mark, round(word.height * 1.06))
gap = round(word.height * 0.26)
art = Image.new('RGBA', (mark.width + gap + word.width, mark.height), (0, 0, 0, 0))
art.alpha_composite(mark, (0, 0))
art.alpha_composite(word, (mark.width + gap, (mark.height - word.height) // 2))
save(grey(art, 118, 126), 'zuse-technologies.webp')

# Trex Labs: the tick-in-a-square beside "Trex Labs".
t = Image.open(os.path.join(SRC, 'trexlabs.webp')).convert('RGBA')
icon = band(t, 0, 310)
name = band(t, 310, t.height)
icon = scaled(icon, round(name.height * 1.75))
gap = round(name.height * 0.3)
art = Image.new('RGBA', (icon.width + gap + name.width, icon.height), (0, 0, 0, 0))
art.alpha_composite(icon, (0, 0))
art.alpha_composite(name, (icon.width + gap, round((icon.height - name.height) * 0.62)))
save(grey(art, 86, 150), 'trex-labs.webp')
