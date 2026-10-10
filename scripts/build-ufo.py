"""Builds public/models/about/ufo.glb, the flying saucer over the About page's
"The story so far" stats (the 'ufo' figure in lib/scripts/contact-3d.ts).

Modelled after the site's old UFO artwork: a dark gunmetal saucer with a
neon rim, a glass dome (with a small alien inside), a ring of lights under
the hull and portholes on the deck, and a glowing emitter underneath for the
tractor beam. The page restyles the parts by material name and animates the
lights by object name, so keep those names in step with buildUfo().

Usage: "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe" -b -P scripts/build-ufo.py
"""
from math import atan2, cos, sin, pi, radians
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix

OUT = Path(__file__).resolve().parent.parent / 'public' / 'models' / 'about' / 'ufo.glb'
SEG = 96

bpy.ops.wm.read_factory_settings(use_empty=True)


def material(name, color, metal=0.0, rough=0.5, emit=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Metallic'].default_value = metal
    b.inputs['Roughness'].default_value = rough
    if emit:
        b.inputs['Emission Color'].default_value = (*emit, 1)
        b.inputs['Emission Strength'].default_value = 1.0
    return m


MAT = {
    'Hull': material('Hull', (0.07, 0.08, 0.12), 0.85, 0.32),
    'HullLower': material('HullLower', (0.05, 0.06, 0.09), 0.8, 0.4),
    'Trim': material('Trim', (0.55, 0.6, 0.72), 1.0, 0.25),
    'Rim': material('Rim', (0.36, 0.88, 1.0), 0.0, 0.3, (0.36, 0.88, 1.0)),
    'Dome': material('Dome', (0.62, 0.86, 1.0), 0.0, 0.05),
    'Emitter': material('Emitter', (0.36, 0.88, 1.0), 0.0, 0.3, (0.36, 0.88, 1.0)),
    'Light': material('Light', (0.36, 0.88, 1.0), 0.0, 0.3, (0.36, 0.88, 1.0)),
    'Port': material('Port', (0.74, 0.44, 1.0), 0.0, 0.3, (0.74, 0.44, 1.0)),
    'Alien': material('Alien', (0.43, 1.0, 0.54), 0.0, 0.45),
    'AlienEye': material('AlienEye', (0.01, 0.01, 0.02), 0.3, 0.08),
}


def obj(name, mesh, mat, parent=None):
    mesh.materials.append(MAT[mat])
    for p in mesh.polygons:
        p.use_smooth = True
    o = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(o)
    if parent:
        o.parent = parent
    return o


def lathe(name, prof, mat, closed=False, seg=SEG):
    """A surface of revolution about Z. Walk the (r, z) profile counter-
    clockwise around the solid (outside on the right) so the faces point out;
    a point with r == 0 becomes a single pole vertex."""
    verts, faces, rings = [], [], []
    for r, z in prof:
        if r == 0:
            rings.append([len(verts)])
            verts.append((0, 0, z))
            continue
        rings.append(list(range(len(verts), len(verts) + seg)))
        verts += [(r * cos(2 * pi * k / seg), r * sin(2 * pi * k / seg), z) for k in range(seg)]
    pairs = list(zip(rings, rings[1:])) + ([(rings[-1], rings[0])] if closed else [])
    for a, b in pairs:
        for k in range(seg):
            k1 = (k + 1) % seg
            if len(a) == 1:
                faces.append((a[0], b[k1], b[k]))
            elif len(b) == 1:
                faces.append((a[k], a[k1], b[0]))
            else:
                faces.append((a[k], a[k1], b[k1], b[k]))
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    return obj(name, me, mat)


def torus(name, R, z, rr, mat, n=16):
    return lathe(name, [(R + rr * cos(2 * pi * i / n - pi / 2), z + rr * sin(2 * pi * i / n - pi / 2)) for i in range(n)], mat, closed=True)


def sphere(name, mat, at, scale, rot_z=0.0, parent=None, seg=20):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=seg // 2, radius=1)
    bm.transform(Matrix.Translation(at) @ Matrix.Rotation(rot_z, 4, 'Z') @ Matrix.Diagonal((*scale, 1)))
    bm.to_mesh(me)
    bm.free()
    return obj(name, me, mat, parent)


def cylinder(name, mat, a, b, rad, parent=None):
    """A thin rod from a to b (both in the XZ plane at y = 0)."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    length = ((b[0] - a[0]) ** 2 + (b[2] - a[2]) ** 2) ** 0.5
    bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=rad, radius2=rad, depth=length)
    mid = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2)
    bm.transform(Matrix.Translation(mid) @ Matrix.Rotation(atan2(b[0] - a[0], b[2] - a[2]), 4, 'Y'))
    bm.to_mesh(me)
    bm.free()
    return obj(name, me, mat, parent)


def deck_z(r):   # top deck: flat by the dome, curving down to the rim
    u = (r - 0.4) / 0.6
    return 0.035 + 0.17 * (1 - u ** 1.7)


def under_z(r):  # under the hull: from the rim down to the emitter's skirt
    u = (r - 0.56) / 0.44
    return -0.035 - 0.135 * (1 - u ** 1.5)


N = 28
# Top deck, rim to dome (going up and in); under the hull, skirt to rim.
lathe('Deck', [(1.0 - 0.6 * i / N, deck_z(1.0 - 0.6 * i / N)) for i in range(N + 1)], 'Hull')
lathe('Under', [(0.56 + 0.44 * i / N, under_z(0.56 + 0.44 * i / N)) for i in range(N + 1)], 'HullLower')
torus('Rim', 1.0, 0.0, 0.048, 'Rim', n=20)
# The emitter's skirt (a short wall and a lip) and the emitter itself.
lathe('Skirt', [(0.47, -0.206), (0.56, -0.2), (0.56, -0.17)], 'Trim')
lathe('Emitter', [(0, -0.25)] + [(0.47 * i / 10, -0.25 + 0.044 * (i / 10) ** 2) for i in range(1, 11)], 'Emitter')
torus('EmitterRing', 0.32, -0.236, 0.012, 'Trim')
torus('EmitterRing2', 0.17, -0.246, 0.01, 'Trim')
# Panel lines on the deck and the hull, and the dome's collar.
torus('DeckLine', 0.84, deck_z(0.84), 0.011, 'Trim')
torus('UnderLine', 0.66, under_z(0.66), 0.01, 'Trim')
torus('Collar', 0.4, 0.205, 0.03, 'Trim', n=16)
# The glass dome.
lathe('Dome', [(0.37 * cos(radians(a)), 0.2 + 0.3 * sin(radians(a))) for a in range(0, 90, 6)] + [(0, 0.5)], 'Dome')

# Lights: a ring under the hull, portholes on the deck.
for i in range(18):
    a = 2 * pi * i / 18
    sphere(f'Light_{i:02d}', 'Light', (0.8 * cos(a), 0.8 * sin(a), under_z(0.8) - 0.004), (0.032, 0.032, 0.026), seg=12)
for i in range(12):
    a = 2 * pi * (i + 0.5) / 12
    sphere(f'Port_{i:02d}', 'Port', (0.64 * cos(a), 0.64 * sin(a), deck_z(0.64) + 0.002), (0.04, 0.04, 0.018), seg=12)

# The alien in the dome, looking out toward -Y (the viewer's side in glTF's +Z).
alien = bpy.data.objects.new('Alien', None)
bpy.context.scene.collection.objects.link(alien)
sphere('AlienHead', 'Alien', (0, 0, 0.3), (0.1, 0.095, 0.115), parent=alien, seg=28)
for s in (-1, 1):
    sphere(f'AlienEye{s}', 'AlienEye', (s * 0.043, -0.077, 0.31), (0.032, 0.018, 0.046), parent=alien, seg=20)
    cylinder(f'AlienAntenna{s}', 'Alien', (s * 0.03, 0, 0.4), (s * 0.075, 0, 0.462), 0.006, parent=alien)
    sphere(f'AlienTip{s}', 'Port', (s * 0.077, 0, 0.466), (0.016, 0.016, 0.016), parent=alien, seg=12)
# Tilt the eyes in, for that alien look.
for s in (-1, 1):
    e = bpy.data.objects[f'AlienEye{s}']
    for v in e.data.vertices:
        x, z = v.co.x - s * 0.043, v.co.z - 0.31
        t = radians(-24 * s)
        v.co.x, v.co.z = s * 0.043 + x * cos(t) - z * sin(t), 0.31 + x * sin(t) + z * cos(t)

OUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.export_scene.gltf(filepath=str(OUT), export_format='GLB', export_yup=True, export_apply=True)
print('wrote', OUT)
