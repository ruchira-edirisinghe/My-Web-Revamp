"""Builds public/models/contact/gloves.glb: five-fingered spacesuit gloves for
the waving astronaut that peeks over the page footer ('peek' in
lib/scripts/contact-3d.ts). scripts/bake-astronaut-wave.py takes the Tripo
model's four-fingered mitts off; these go on in their place.

Both gloves are the same hand, built to a hand's proportions: a flat palm
that narrows to the heel, a fleshy pad at the root of the thumb, four fingers
of their proper lengths in three jointed sections each, swelling a little at
the knuckles, and a thumb that leaves the side of the palm near the wrist.
The parts are melted into one skin on a fine voxel grid and smoothed. Like a
real EVA glove it is white fabric with grey rubber caps on the fingertips and
a grip pad on the palm, joined to the sleeve by a metal wrist ring.

Two meshes, in the astronaut's model space (glTF: +X his front, +Y up, +Z his
right before the page mirrors him):
  GloveWave  the open hand on the arm that waves. It is posed here with the
             arm raised as the page holds it, palm to the viewer, then turned
             back to the arm's rest pose, so the page's arm bend carries it.
  GloveGrip  the hand on the pencil: palm against the shaft, the fingers
             curled round it and the thumb laid along it.

Usage: "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe" -b -P scripts/build-gloves.py [-- out.glb]
"""
import math
import sys
from pathlib import Path

import bmesh
import bpy
import numpy as np
from mathutils import Matrix, Vector

DST = Path(__file__).resolve().parent.parent / 'public' / 'models' / 'contact' / 'gloves.glb'
if '--' in sys.argv and len(sys.argv) > sys.argv.index('--') + 1:
    DST = Path(sys.argv[sys.argv.index('--') + 1])  # somewhere else, to try it out

D = math.pi / 180
SHOULDER = np.array([0.017, 0.066, -0.221])    # PEEK_SHOULDER in contact-3d.ts
RAISED = (-45, 105, 0)                         # the arm's wave, lift and swing once up (degrees)
PEN_END = np.array([0.198, -0.199, -0.443])    # PEEK_PENCIL_END
PEN_DIR = np.array([-0.0029, 0.5747, 0.8184])  # PEEK_PENCIL_DIR
PEN_R = 0.06
# Where the old mitts met the sleeves (from the bake): the wrist, the way the
# forearm points through it, and the sleeve's radius there.
WAVE_WRIST, WAVE_OUT, WAVE_R = np.array([0.184, 0.055, -0.17]), np.array([0.88, -0.08, 0.46]), 0.054
GRIP_WRIST, GRIP_OUT, GRIP_R = np.array([0.244, 0.16, 0.146]), np.array([0.82, 0.25, -0.5]), 0.05

# The hand, in its own frame: X across the palm toward the thumb, Y out of
# the palm, Z along the fingers; the origin is the middle of the palm.
PALM = (0.034, 0.0135, 0.035)  # half-width, half-thickness, half-length
# Index to little finger: across the knuckles, how far up, the three sections'
# lengths, the radius at the root and at the tip, and how far it fans out.
FINGERS = [
    (0.0245, 0.000, (0.025, 0.017, 0.015), 0.0098, 0.0083, 6),
    (0.0082, 0.003, (0.028, 0.019, 0.016), 0.0101, 0.0086, 1),
    (-0.0082, 0.001, (0.026, 0.018, 0.015), 0.0096, 0.0082, -4),
    (-0.0240, -0.006, (0.020, 0.014, 0.013), 0.0086, 0.0073, -10),
]
TIP_CAP = 0.012  # how far the rubber cap comes down each fingertip


def unit(v):
    v = np.asarray(v, float)
    return v / np.linalg.norm(v)


def rot(ax, r):
    x, y, z = unit(ax)
    s, c = math.sin(r), math.cos(r)
    o = 1 - c
    return np.array([[o*x*x+c, o*x*y-z*s, o*z*x+y*s], [o*x*y+z*s, o*y*y+c, o*y*z-x*s], [o*z*x-y*s, o*y*z+x*s, o*z*z+c]])


def arm_turn():
    """The arm's rotation once raised, as the page's shader builds it."""
    w, l, s = (a * D for a in RAISED)
    return rot((1, 0, 0), w) @ rot((0, 0, 1), l) @ rot((0, 1, 0), s)


def g2b(p):
    """glTF model space to Blender's (the exporter turns it back)."""
    return Vector((p[0], -p[2], p[1]))


def b2g(v):
    return np.array([v[0], v[2], -v[1]])


bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def material(name, hexc, rough, metal=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']
    c = int(hexc[1:], 16)
    bsdf.inputs['Base Color'].default_value = (*(((c >> s) & 255) / 255 for s in (16, 8, 0)), 1)
    bsdf.inputs['Roughness'].default_value = rough
    bsdf.inputs['Metallic'].default_value = metal
    return m


# The fabric and rubber share one material and are told apart by vertex
# colour, so the rubber's edges blend softly instead of following triangles.
FABRIC = material('Glove', '#ffffff', 0.74)
RING = material('GloveRing', '#aab3c0', 0.32, 0.85)
MATS = (FABRIC, RING)


def lin(hexc):
    c = int(hexc[1:], 16)
    out = []
    for sh in (16, 8, 0):
        v = ((c >> sh) & 255) / 255
        out.append(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4)
    return np.array(out + [1.0])


WHITE_C, CLOTH_C, RUBBER_C = lin('#ffffff'), lin('#eceef2'), lin('#6b717c')


def smooth(a, b, x):
    t = min(1.0, max(0.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def paint(me, colour):
    """Vertex colours: colour(p) gives each vertex's (glTF space)."""
    at = me.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for v, c in zip(me.vertices, at.data):
        c.color = colour(b2g(v.co))


class Hand:
    """Primitives (glTF space) melted into one skin."""

    def __init__(self, name):
        self.name = name
        self.bm = bmesh.new()
        self.tips = []  # (last knuckle, tip end, radius): where the rubber caps go

    def ball(self, c, r):
        bmesh.ops.create_uvsphere(self.bm, u_segments=40, v_segments=24, radius=r, matrix=Matrix.Translation(g2b(c)))

    def seg(self, a, b, r0, r1):
        self.ball(a, r0)
        self.ball(b, r1)
        A, B = g2b(a), g2b(b)
        d = B - A
        q = Vector((0, 0, 1)).rotation_difference(d.normalized())
        m = Matrix.Translation((A + B) / 2) @ q.to_matrix().to_4x4()
        bmesh.ops.create_cone(self.bm, cap_ends=False, segments=40, radius1=r0, radius2=r1, depth=d.length, matrix=m)

    def chain(self, pts, radii):
        for k in range(len(pts) - 1):
            self.seg(pts[k], pts[k + 1], radii[k], radii[k + 1])

    def blob(self, c, axes, size, e=0.42, taper=None):
        """A superellipsoid - e below 1 squares it off - with half-sizes along
        the axes; taper(z in -1..1) narrows its width along its length."""
        nu, nv = 40, 28
        ax = [np.asarray(a, float) for a in axes]
        f = lambda x, p: math.copysign(abs(x) ** p, x)
        rows = []
        for i in range(nv + 1):
            v = -math.pi / 2 + math.pi * i / nv
            row = []
            for j in range(nu):
                t = 2 * math.pi * j / nu
                z = f(math.sin(v), e)
                k = taper(z) if taper else 1
                x = f(math.cos(v), e) * f(math.cos(t), e) * size[0] * k
                y = f(math.cos(v), e) * f(math.sin(t), e) * size[1]
                row.append(self.bm.verts.new(g2b(c + ax[0] * x + ax[1] * y + ax[2] * z * size[2])))
            rows.append(row)
        for i in range(nv):
            for j in range(nu):
                jj = (j + 1) % nu
                self.bm.faces.new((rows[i][j], rows[i][jj], rows[i + 1][jj], rows[i + 1][j]))

    def mesh(self, faces, pad):
        """The skin; pad(p) says how far a point is on the palm's grip pad (0-1)."""
        me = bpy.data.meshes.new(self.name)
        self.bm.to_mesh(me)
        self.bm.free()
        ob = bpy.data.objects.new(self.name, me)
        scene.collection.objects.link(ob)
        rm = ob.modifiers.new('fuse', 'REMESH')
        rm.mode, rm.voxel_size = 'VOXEL', 0.0009
        sm = ob.modifiers.new('smooth', 'SMOOTH')
        sm.factor, sm.iterations = 0.5, 4
        with bpy.context.temp_override(object=ob, active_object=ob, selected_objects=[ob], selected_editable_objects=[ob]):
            for m in list(ob.modifiers):
                bpy.ops.object.modifier_apply(modifier=m.name)
            dec = ob.modifiers.new('trim', 'DECIMATE')
            dec.ratio = min(1, faces / max(1, len(ob.data.polygons)))
            bpy.ops.object.modifier_apply(modifier='trim')
        ob.data.materials.append(FABRIC)
        ob.data.materials.append(RING)
        for p in ob.data.polygons:
            p.use_smooth = True

        def colour(c):
            w = pad(c)
            for k0, k1, r in self.tips:
                d = unit(k1 - k0)
                if np.linalg.norm(c - k1) < r * 2.4:
                    w = max(w, smooth(-TIP_CAP + r - 0.003, -TIP_CAP + r + 0.003, (c - k1) @ d))
            return CLOTH_C + (RUBBER_C - CLOTH_C) * w
        paint(ob.data, colour)
        return ob


def build_hand(h, C, X, Y, Z, finger_path, thumb_path):
    """One hand. finger_path(knuckle, i, lengths) and thumb_path(base) give
    each digit's joints, so the same hand can wave or hold on."""
    P = lambda x, y, z: C + X * x + Y * y + Z * z
    pw, pt, pl = PALM
    # The palm: flat, squarish, narrowing to the heel.
    h.blob(C, (X, Y, Z), PALM, taper=lambda z: 0.86 + 0.14 * (z + 1) / 2)
    # Knuckle ridge across the top of the palm, and the back of the hand.
    h.seg(P(-0.022, -0.001, pl * 0.8), P(0.024, -0.001, pl * 0.82), 0.0118, 0.0122)
    # The heel and the wrist, flattened like a real wrist.
    h.blob(P(0, -0.001, -pl - 0.012), (X, Y, Z), (0.024, 0.0145, 0.02), e=0.7)
    # The fleshy pad at the root of the thumb.
    h.blob(P(0.019, 0.006, -0.012), (X, Y, Z), (0.017, 0.011, 0.024), e=0.8)
    for i, (x, up, lens, r0, r1, fan) in enumerate(FINGERS):
        k = P(x, -0.0005, pl * 0.86 + up)
        pts = finger_path(k, i, lens, fan)
        radii = [r0 * 1.03, r0 * 0.97 * 1.04, (r0 + r1) / 2 * 1.03, r1]  # a touch fuller at each knuckle
        h.chain(pts, radii)
        h.tips.append((pts[-2], pts[-1], r1))
    base = P(pw * 0.78, 0.004, -pl * 0.45)
    pts = thumb_path(base)
    h.chain(pts, [0.0132, 0.0118, 0.0108, 0.0098])
    h.tips.append((pts[-2], pts[-1], 0.0098))
    def pad(c):
        # A faint oval grip pad on the palm, its edge well feathered.
        q = np.array([(c - C) @ X, (c - C) @ Y, (c - C) @ Z])
        e = (q[0] / (pw * 0.66)) ** 2 + ((q[2] + 0.004) / (pl * 0.64)) ** 2
        return 0.55 * (1 - smooth(0.45, 1.0, e)) * smooth(pt * 0.2, pt * 0.7, q[1])
    return pad


def cuff(name, wrist, out, r):
    """The glove's gauntlet tucked into the sleeve, a metal wrist ring, and
    the fabric narrowing from the ring to the wrist."""
    out = unit(out)
    a = unit(np.cross(out, [0.3, 1, 0.2]))
    b = np.cross(out, a)
    # (along the forearm, radius, material)
    prof = [
        (-0.042, r * 0.9, 0), (-0.012, r * 0.94, 0), (-0.009, r * 0.96, 0),
        (-0.008, r * 1.0, 2), (-0.004, r * 1.06, 2), (-0.001, r * 1.06, 2), (0.0005, r * 1.0, 2),
        (0.002, r * 1.0, 2), (0.0035, r * 1.06, 2), (0.0075, r * 1.06, 2), (0.0105, r * 0.98, 2),
        (0.012, r * 0.9, 0), (0.022, r * 0.8, 0), (0.032, r * 0.62, 0), (0.04, r * 0.5, 0),
    ]
    seg = 48
    verts, faces, mats = [], [], []
    for z, rr, _ in prof:
        for k in range(seg):
            t = 2 * math.pi * k / seg
            verts.append(g2b(wrist + out * z + (a * math.cos(t) + b * math.sin(t)) * rr))
    for i in range(len(prof) - 1):
        for k in range(seg):
            j = (k + 1) % seg
            faces.append((i * seg + k, i * seg + j, (i + 1) * seg + j, (i + 1) * seg + k))
            mats.append(1 if prof[i][2] == 2 and prof[i + 1][2] == 2 else 0)
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    for m in MATS:
        me.materials.append(m)
    for p, m in zip(me.polygons, mats):
        p.use_smooth = True
        p.material_index = m
    ring = [c == 2 for _, _, c in prof for _ in range(seg)]
    at = me.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for k, c in enumerate(at.data):
        c.color = WHITE_C if ring[k] else CLOTH_C
    ob = bpy.data.objects.new(name, me)
    scene.collection.objects.link(ob)
    return ob


def join(obs, name):
    with bpy.context.temp_override(active_object=obs[0], selected_editable_objects=obs, selected_objects=obs):
        bpy.ops.object.join()
    obs[0].name = obs[0].data.name = name
    return obs[0]


# ── The waving glove: an open hand, palm out, the fingers relaxed ──
R = arm_turn()
up_wrist = SHOULDER + R @ (WAVE_WRIST - SHOULDER)
Zw = unit(R @ WAVE_OUT)
Yw = unit(np.array([1.0, 0, 0]) - Zw * Zw[0])  # palm to the front, where the viewer is
Xw = np.cross(Yw, Zw)
Cw = up_wrist + Zw * (0.034 + PALM[2])


def open_finger(k, i, lens, fan):
    d = unit(Zw * math.cos(fan * D) + Xw * math.sin(fan * D))
    pts, p, bend = [k], k, 0.0
    for ln, flex in zip(lens, (5, 11, 9)):  # each joint bends a little toward the palm
        bend += flex
        dd = unit(d * math.cos(bend * D) + Yw * math.sin(bend * D))
        p = p + dd * ln
        pts.append(p)
    return pts


def open_thumb(base):
    d0 = unit(Xw * 0.72 + Zw * 0.52 + Yw * 0.45)
    d1 = unit(Xw * 0.5 + Zw * 0.8 + Yw * 0.32)
    d2 = unit(Xw * 0.3 + Zw * 0.92 + Yw * 0.22)
    p1 = base + d0 * 0.026
    p2 = p1 + d1 * 0.022
    return [base, p1, p2, p2 + d2 * 0.019]


h = Hand('GloveWave')
pad = build_hand(h, Cw, Xw, Yw, Zw, open_finger, open_thumb)
wave = join([h.mesh(10000, pad), cuff('CuffWave', up_wrist, Zw, WAVE_R)], 'GloveWave')
# Back to the arm's rest pose: the page turns it up again with the arm.
Rt = R.T
for v in wave.data.vertices:
    v.co = g2b(SHOULDER + Rt @ (b2g(v.co) - SHOULDER))


# ── The gripping glove: the palm on the pencil, the fingers curled round it ──
u = unit(PEN_DIR)
out = unit(GRIP_OUT)
axis_at = lambda p: PEN_END + u * ((p - PEN_END) @ u)
a0 = axis_at(GRIP_WRIST)
e1 = unit((GRIP_WRIST - a0) - u * ((GRIP_WRIST - a0) @ u))
e2 = np.cross(u, e1)
if out @ e2 < 0:  # the hand goes on round the way it leaves the wrist
    e2 = -e2
around = lambda ang: e1 * math.cos(ang * D) + e2 * math.sin(ang * D)
PALM_ANG = 62  # how far round the shaft from the wrist the middle of the palm sits
Yg = -around(PALM_ANG)                     # the palm faces the shaft
Zg = unit(np.cross(u, around(PALM_ANG)))   # the fingers run round it
if Zg @ e2 < 0:
    Zg = -Zg
Xg = np.cross(Yg, Zg)                      # the thumb's side: along the shaft
Cg = a0 + around(PALM_ANG) * (PEN_R + PALM[1] + 0.002)


def wrap_finger(k, i, lens, fan):
    """Each section follows the shaft's curve, its knuckle bent to suit."""
    pts, p = [k], k
    for ln in lens:
        a = axis_at(p)
        rr = np.linalg.norm(p - a)
        r_ = p - a
        t = unit(np.cross(u, r_))
        if t @ Zg < 0:
            t = -t
        ang = ln / rr
        nxt = a + r_ * math.cos(ang) + t * rr * math.sin(ang)
        # Sink toward the shaft a little so the fingers sit on it.
        q = axis_at(nxt)
        nxt = q + unit(nxt - q) * max(PEN_R + 0.009, np.linalg.norm(nxt - q) - 0.002)
        pts.append(nxt)
        p = nxt
    return pts


def lay_thumb(base):
    """Round the shaft the other way from the fingers, so the hand closes on it."""
    pts, p = [base], base
    for ln, back in ((0.026, 0.45), (0.022, 0.75), (0.019, 0.9)):
        d = unit(-Zg * back + Xg * (1 - back))
        nxt = p + d * ln
        q = axis_at(nxt)
        nxt = q + unit(nxt - q) * (PEN_R + 0.011)
        pts.append(nxt)
        p = nxt
    return pts


h = Hand('GloveGrip')
pad = build_hand(h, Cg, Xg, Yg, Zg, wrap_finger, lay_thumb)
grip = join([h.mesh(10000, pad), cuff('CuffGrip', GRIP_WRIST, out, GRIP_R)], 'GloveGrip')

for ob in (wave, grip):
    ob.select_set(True)
bpy.ops.export_scene.gltf(
    filepath=str(DST), export_format='GLB', use_selection=True, export_normals=True,
    export_texcoords=False, export_materials='EXPORT', export_apply=True, export_vertex_color='ACTIVE',
)
print('wrote', DST, DST.stat().st_size, 'bytes')
