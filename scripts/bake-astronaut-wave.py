"""Builds public/models/contact/astronaut-wave.glb from astronaut.glb for the
waving astronaut that peeks over the Experience page's footer ('peek' in
lib/scripts/contact-3d.ts).

The Tripo model is one welded mesh in which both gloves grip the pencil, so
his free arm can't simply be bent in the shader: the pencil would stretch with
it. This script:
  1. finds the pencil (a cylinder about the line from its eraser end to its
     tip) and the left glove that wraps it;
  2. walks the mesh surface from that glove, with the pencil removed, to find
     the arm (glove, forearm, upper arm), easing the weight to 0 over a band
     where the arm joins the shoulder;
  3. cuts the glove's triangles free of the pencil's (duplicating the shared
     vertices) and drops the scraps of glove texture left on the pencil, so
     the glove can lift away cleanly;
  4. writes the weight as a `_WAVE` vertex attribute (`_wave` in three.js).
The page then turns the arm about the shoulder by that weight and fills the
gap in the pencil with a gold core.

Usage: py scripts/bake-astronaut-wave.py
Needs numpy, scipy and Pillow.
"""
import io
import json
import struct
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import dijkstra

DIR = Path(__file__).resolve().parent.parent / 'public' / 'models' / 'contact'
SRC, DST = DIR / 'astronaut.glb', DIR / 'astronaut-wave.glb'

GLOVE = np.array([0.2, 0.02, -0.14])  # the left glove, around the pencil (model space)
ARM_END = (0.56, 0.68)                # surface distance from the glove where the arm eases out


def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


# ── Read the GLB ──
b = SRC.read_bytes()
off, ch = 12, {}
while off < len(b):
    ln, typ = struct.unpack('<II', b[off:off + 8])
    ch[typ] = b[off + 8:off + 8 + ln]
    off += 8 + ln
js = json.loads(ch[0x4E4F534A])
bin_ = ch[0x004E4942]
prim = js['meshes'][0]['primitives'][0]
acc = js['accessors']
bvs = js['bufferViews']
vbv = bvs[acc[prim['attributes']['POSITION']]['bufferView']]
ibv = bvs[acc[prim['indices']]['bufferView']]
V = np.frombuffer(bin_, np.float32, vbv['byteLength'] // 4, vbv['byteOffset']).reshape(-1, 8).copy()  # pos, normal, uv
I = np.frombuffer(bin_, np.uint16, ibv['byteLength'] // 2, ibv['byteOffset']).copy().reshape(-1, 3)
P = V[:, :3].astype(float)

# Base colour at each vertex, to tell gold pencil from white glove.
tex = js['textures'][js['materials'][prim['material']]['pbrMetallicRoughness']['baseColorTexture']['index']]
img = js['images'][tex.get('source', tex.get('extensions', {}).get('EXT_texture_webp', {}).get('source'))]
ib = bvs[img['bufferView']]
A = np.asarray(Image.open(io.BytesIO(bin_[ib['byteOffset']:ib['byteOffset'] + ib['byteLength']])).convert('RGB'))
h, w_ = A.shape[:2]
uv = V[:, 6:8]
C = A[np.clip((uv[:, 1] % 1) * h, 0, h - 1).astype(int), np.clip((uv[:, 0] % 1) * w_, 0, w_ - 1).astype(int)].astype(float)

# ── 1. The pencil: from the eraser end to the tip ──
along = np.array([0.0, 0.57, 0.82]) / np.linalg.norm([0.0, 0.57, 0.82])
tip = P[np.argmax(P @ along)]
low = (P[:, 0] > -0.1) & (P[:, 2] < -0.3)
end = P[low][np.argsort((P @ along)[low])[:200]].mean(0)
u = (tip - end) / np.linalg.norm(tip - end)
q = P - end
t = q @ u
r = np.linalg.norm(q - np.outer(t, u), axis=1)
pen = (r < np.where(t < 0.235, 0.073, 0.06)) & (t > -0.03) & (t < 1.12)
print('pencil end', end.round(3), 'dir', u.round(4))

# ── 2. The arm: surface distance from the glove, not crossing the pencil ──
_, inv = np.unique(np.round(P, 5), axis=0, return_inverse=True)
inv = inv.ravel()
n = inv.max() + 1
T = inv[I]
Pw = np.zeros((n, 3))
Pw[inv] = P
penw = np.zeros(n, bool)
penw[inv[pen]] = True
ed = np.r_[T[:, [0, 1]], T[:, [1, 2]], T[:, [2, 0]]]
ed = ed[~penw[ed[:, 0]] & ~penw[ed[:, 1]]]
L = np.linalg.norm(Pw[ed[:, 0]] - Pw[ed[:, 1]], axis=1) + 1e-9
G = coo_matrix((np.r_[L, L], (np.r_[ed[:, 0], ed[:, 1]], np.r_[ed[:, 1], ed[:, 0]])), shape=(n, n)).tocsr()
seed = np.where((np.linalg.norm(Pw - GLOVE, axis=1) < 0.06) & ~penw & (Pw[:, 0] > 0.14))[0]
dist = dijkstra(G, indices=seed, min_only=True)[inv]
w = 1 - smoothstep(*ARM_END, dist)
w[~np.isfinite(dist) | pen] = 0
band = (dist > 0.6) & (dist < 0.68)
print('shoulder pivot', P[band].mean(0).round(3), '(PEEK_SHOULDER in contact-3d.ts)')

# ── 3. Cut the glove free of the pencil ──
triPen = pen[I].sum(1) >= 2
tc = C[I].mean(1)
mx = tc.max(1)
sat = (mx - tc.min(1)) / np.maximum(mx, 1)
whiteT = (sat < 0.22) & (mx > 140)
goldT = (sat > 0.35) & (tc[:, 0] > tc[:, 2] + 30)
tt = t[I].mean(1)
wT = w[I].max(1)
drop = (triPen & whiteT & (tt > 0.22) & (tt < 0.52)) | (~triPen & (wT > 0.3) & (goldT | (pen[I].any(1) & ~whiteT)))
I, triPen = I[~drop], triPen[~drop]

newV, newW, dup = [V], [w], {}
nxt = len(V)


def copy_of(v, wt):
    """The index of vertex v carrying weight wt, duplicating it if needed."""
    global nxt
    k = (v, round(float(wt), 4))
    if k not in dup:
        dup[k] = nxt
        nxt += 1
        newV.append(V[v:v + 1])
        newW.append(np.array([wt]))
    return dup[k]


I2 = I.copy()
for ti, tri in enumerate(I):
    if triPen[ti]:
        # Pencil triangles stay put.
        for c in range(3):
            if w[tri[c]] > 1e-4:
                I2[ti, c] = copy_of(tri[c], 0.0)
    else:
        # Glove triangles touching the pencil move whole with the glove.
        nonpen = [w[v] for v in tri if not pen[v]]
        wt = max(nonpen) if nonpen else 0.0
        if wt > 1e-4:
            for c in range(3):
                if pen[tri[c]]:
                    I2[ti, c] = copy_of(tri[c], wt)
V2 = np.concatenate(newV)
W2 = np.concatenate(newW).astype(np.float32)
assert len(V2) < 65536
print('vertices', len(V), '->', len(V2), '| triangles dropped', int(drop.sum()))

# ── 4. Write: images as they were, then indices and vertices (+ weight) ──
parts, views = [], []


def add(data, **kw):
    o = sum(len(p) for p in parts)
    views.append(dict(buffer=0, byteOffset=o, byteLength=len(data), **kw))
    parts.append(data + b'\0' * ((-len(data)) % 4))
    return len(views) - 1


remap = {}
for im in js['images']:
    bv = bvs[im['bufferView']]
    remap[im['bufferView']] = add(bin_[bv['byteOffset']:bv['byteOffset'] + bv['byteLength']])
for im in js['images']:
    im['bufferView'] = remap[im['bufferView']]
iv = add(I2.astype(np.uint16).tobytes(), target=34963)
vv = add(np.concatenate([V2, W2[:, None]], 1).astype(np.float32).tobytes(), byteStride=36, target=34962)
js['bufferViews'] = views
acc[prim['indices']].update(count=int(I2.size), bufferView=iv, byteOffset=0)
for k, o in (('POSITION', 0), ('NORMAL', 12), ('TEXCOORD_0', 24)):
    acc[prim['attributes'][k]].update(count=len(V2), bufferView=vv, byteOffset=o)
acc.append(dict(type='SCALAR', componentType=5126, count=len(V2), bufferView=vv, byteOffset=32))
prim['attributes']['_WAVE'] = len(acc) - 1
binall = b''.join(parts)
js['buffers'] = [dict(byteLength=len(binall))]
jb = json.dumps(js, separators=(',', ':')).encode()
jb += b' ' * ((-len(jb)) % 4)
DST.write_bytes(
    struct.pack('<III', 0x46546C67, 2, 28 + len(jb) + len(binall))
    + struct.pack('<II', len(jb), 0x4E4F534A) + jb
    + struct.pack('<II', len(binall), 0x004E4942) + binall
)
print('wrote', DST, DST.stat().st_size, 'bytes')
