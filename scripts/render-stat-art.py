"""Renders the three illustrations for the About page's "The story so far"
(components/about/AboutStats.tsx): the things the UFO beams down.

  laptop - 50+ projects: a laptop showing a glowing website
  planet - 4+ years: a ringed planet with four moons, one for each year
  star   - 30+ happy customers: a puffy, smiling gold star and two small ones

Each is modelled here, lit like the rest of the site (cyan and purple rims,
and a cool light from above as if from the beam) and rendered on a
transparent background to assets-src/about/stat-<name>.png. Turn those into
the page's WebPs with:  py scripts/render-stat-art.py --webp

Usage: "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe" -b -P scripts/render-stat-art.py [-- planet ...]
       py scripts/render-stat-art.py --webp   (needs Pillow)
"""
import sys
from math import cos, sin, pi, radians
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'assets-src' / 'about'
OUT = ROOT / 'public' / 'Images' / 'about'
NAMES = ('laptop', 'planet', 'star')

if '--webp' in sys.argv:
    from PIL import Image
    OUT.mkdir(parents=True, exist_ok=True)
    for n in NAMES:
        im = Image.open(SRC / f'stat-{n}.png').convert('RGBA')
        im = im.crop(im.getbbox())  # trim the empty margin
        im.thumbnail((560, 560), Image.LANCZOS)
        im.save(OUT / f'stat-{n}.webp', 'WEBP', quality=88, method=6)
        print('wrote', OUT / f'stat-{n}.webp', im.size)
    sys.exit()

import bmesh  # noqa: E402
import bpy  # noqa: E402
from mathutils import Vector  # noqa: E402


def hexcol(h, a=1.0):
    h = h.lstrip('#')
    srgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb]
    return (*lin, a)


def mat(name, color, metal=0.0, rough=0.5, emit=None, strength=1.0, coat=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = hexcol(color)
    b.inputs['Metallic'].default_value = metal
    b.inputs['Roughness'].default_value = rough
    b.inputs['Coat Weight'].default_value = coat
    if emit:
        b.inputs['Emission Color'].default_value = hexcol(emit)
        b.inputs['Emission Strength'].default_value = strength
    return m


def link(o, m=None, smooth=True):
    bpy.context.scene.collection.objects.link(o)
    if m and o.type == 'MESH':
        o.data.materials.append(m)
        if smooth:
            for p in o.data.polygons:
                p.use_smooth = True
    return o


def mesh_obj(name, verts, faces, m, smooth=True):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    return link(bpy.data.objects.new(name, me), m, smooth)


def box(name, size, at, m, bevel=0.0, segs=4):
    sx, sy, sz = (s / 2 for s in size)
    v = [(x * sx, y * sy, z * sz) for x in (-1, 1) for y in (-1, 1) for z in (-1, 1)]
    f = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
    o = mesh_obj(name, v, f, m, smooth=False)
    o.location = at
    if bevel:
        md = o.modifiers.new('Bevel', 'BEVEL')
        md.width, md.segments = bevel, segs
        for p in o.data.polygons:
            p.use_smooth = True
    return o


def ellipsoid(name, at, scale, m, seg=24):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=seg // 2, radius=1)
    bm.to_mesh(me)
    bm.free()
    o = link(bpy.data.objects.new(name, me), m)
    o.location, o.scale = at, scale
    return o


def aim(o, target):
    o.rotation_mode = 'QUATERNION'
    o.rotation_quaternion = (Vector(target) - o.location).to_track_quat('-Z', 'Y')


def stage(cam_at, look_at, lens=50):
    sc = bpy.context.scene
    for eng in ('BLENDER_EEVEE_NEXT', 'BLENDER_EEVEE'):
        try:
            sc.render.engine = eng
            break
        except TypeError:
            continue
    sc.eevee.taa_render_samples = 96
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = 900
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_mode = 'RGBA'
    sc.view_settings.view_transform = 'Standard'
    w = bpy.data.worlds.new('World')
    w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = hexcol('#0b1030')
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
    sc.world = w

    cam = bpy.data.objects.new('Cam', bpy.data.cameras.new('Cam'))
    cam.data.lens = lens
    cam.location = cam_at
    link(cam)
    aim(cam, look_at)
    sc.camera = cam

    def light(name, at, energy, color, size=2.5):
        l = bpy.data.objects.new(name, bpy.data.lights.new(name, 'AREA'))
        l.data.energy, l.data.size, l.data.color = energy, size, hexcol(color)[:3]
        l.location = at
        link(l)
        aim(l, look_at)

    light('Key', (2.6, -3.2, 3.8), 520, '#fff6ee', 3)
    light('RimCyan', (-3.4, 2.2, 2.2), 650, '#5ce0ff')
    light('RimPurple', (3.4, 2.6, 0.6), 520, '#bc6fff')
    light('Beam', (0, -0.4, 5), 360, '#cff6ff', 2)       # the UFO's light, from above
    light('Under', (0, -3, -2.4), 90, '#8a5cff')


def render(name):
    SRC.mkdir(parents=True, exist_ok=True)
    bpy.context.scene.render.filepath = str(SRC / f'stat-{name}.png')
    bpy.ops.render.render(write_still=True)
    print('rendered', name)


# ─────────────────────────── laptop ───────────────────────────
def laptop():
    shell = mat('Shell', '#202741', 0.85, 0.3, coat=0.4)
    keycap = mat('Key', '#0d1120', 0.2, 0.55)
    pad = mat('Pad', '#171d33', 0.6, 0.25)
    root = bpy.data.objects.new('Laptop', None)
    link(root)

    parts = [box('Base', (1.4, 0.95, 0.06), (0, 0, 0), shell, 0.03)]
    for r in range(4):
        for c in range(12):
            parts.append(box(f'K{r}{c}', (0.082, 0.07, 0.025), (-0.55 + c * 0.1, 0.33 - r * 0.09, 0.036), keycap, 0.008, 2))
    parts.append(box('Space', (0.46, 0.07, 0.025), (0, -0.03, 0.036), keycap, 0.008, 2))
    parts.append(box('Trackpad', (0.44, 0.24, 0.004), (0, -0.25, 0.031), pad, 0.01, 2))
    for p in parts:
        p.parent = root

    hinge = bpy.data.objects.new('Hinge', None)
    hinge.location = (0, 0.475, 0.03)
    link(hinge)
    hinge.parent = root
    lid = box('Lid', (1.4, 0.035, 0.92), (0, 0.0175, 0.46), shell, 0.03)
    lid.parent = hinge

    def panel(name, x, z, w, h, color, strength, y=-0.0185):
        m = mat(name, '#000000', 0, 0.4, color, strength)
        v = [(x - w / 2, y, z - h / 2), (x + w / 2, y, z - h / 2), (x + w / 2, y, z + h / 2), (x - w / 2, y, z + h / 2)]
        o = mesh_obj(name, v, [(0, 1, 2, 3)], m, smooth=False)
        o.parent = hinge
        return o

    # The website on screen: nav, headline, button, a picture, three cards.
    panel('Display', 0, 0.48, 1.28, 0.8, '#0a1030', 1.0)
    panel('Nav', 0, 0.83, 1.2, 0.05, '#1c2a5c', 1.2, -0.0195)
    panel('Logo', -0.54, 0.83, 0.05, 0.03, '#5ce0ff', 3, -0.02)
    for i in range(3):
        panel(f'Link{i}', 0.3 + i * 0.1, 0.83, 0.06, 0.016, '#c9d6ff', 1.4, -0.02)
    panel('Head1', -0.3, 0.71, 0.5, 0.05, '#eef4ff', 1.6, -0.0195)
    panel('Head2', -0.36, 0.635, 0.38, 0.05, '#eef4ff', 1.6, -0.0195)
    panel('Sub', -0.36, 0.57, 0.38, 0.02, '#8ea3d8', 1.2, -0.0195)
    panel('Button', -0.46, 0.5, 0.18, 0.055, '#5ce0ff', 2.6, -0.0195)
    panel('Picture', 0.3, 0.63, 0.44, 0.3, '#bc6fff', 1.8, -0.0195)
    panel('Sun', 0.4, 0.69, 0.08, 0.08, '#ffd27a', 2.4, -0.02)
    panel('Hill', 0.25, 0.53, 0.3, 0.07, '#6dff8a', 1.8, -0.02)
    for i, c in enumerate(('#5ce0ff', '#bc6fff', '#6dff8a')):
        panel(f'Card{i}', -0.4 + i * 0.4, 0.27, 0.34, 0.2, c, 0.55, -0.0195)
        panel(f'CardLine{i}', -0.43 + i * 0.4, 0.22, 0.2, 0.02, '#ffffff', 1.4, -0.02)
        panel(f'CardTop{i}', -0.4 + i * 0.4, 0.32, 0.26, 0.06, c, 2.4, -0.02)
    hinge.rotation_euler.x = radians(-14)
    root.rotation_euler.z = radians(22)
    root.location.z = -0.3
    stage((1.2, -3.6, 1.55), (0.05, 0.05, 0.05), 50)
    render('laptop')


# ─────────────────────────── planet ───────────────────────────
def planet():
    p = mat('Planet', '#7a3cd0', 0, 0.55)
    nt = p.node_tree
    n = nt.nodes
    tc = n.new('ShaderNodeTexCoord')
    noise = n.new('ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 2.4
    noise.inputs['Detail'].default_value = 8
    wave = n.new('ShaderNodeTexWave')
    wave.wave_type = 'BANDS'
    wave.bands_direction = 'Z'
    wave.inputs['Scale'].default_value = 1.6
    wave.inputs['Distortion'].default_value = 7
    mix = n.new('ShaderNodeMix')
    mix.data_type = 'FLOAT'
    mix.inputs['Factor'].default_value = 0.55
    ramp = n.new('ShaderNodeValToRGB')
    el = ramp.color_ramp.elements
    el[0].position, el[0].color = 0.0, hexcol('#1c0b44')
    el[1].position, el[1].color = 1.0, hexcol('#e6fbff')
    for pos, col in ((0.35, '#5a24b8'), (0.55, '#bc6fff'), (0.75, '#5ce0ff')):
        e = el.new(pos)
        e.color = hexcol(col)
    bsdf = n['Principled BSDF']
    nt.links.new(tc.outputs['Object'], noise.inputs['Vector'])
    nt.links.new(tc.outputs['Object'], wave.inputs['Vector'])
    nt.links.new(noise.outputs['Fac'], mix.inputs['A'])
    nt.links.new(wave.outputs['Fac'], mix.inputs['B'])
    nt.links.new(mix.outputs['Result'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Emission Color'])
    bsdf.inputs['Emission Strength'].default_value = 0.18
    body = ellipsoid('Planet', (0, 0, 0), (1, 1, 1), p, 64)
    body.rotation_euler = (radians(12), radians(-18), 0)

    # A thin glowing atmosphere, strongest at the edge.
    a = bpy.data.materials.new('Atmos')
    a.use_nodes = True
    an = a.node_tree.nodes
    for k in list(an):
        if k.type != 'OUTPUT_MATERIAL':
            an.remove(k)
    lw = an.new('ShaderNodeLayerWeight')
    lw.inputs['Blend'].default_value = 0.35
    tr = an.new('ShaderNodeBsdfTransparent')
    em = an.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = hexcol('#8fe4ff')
    em.inputs['Strength'].default_value = 2.2
    ms = an.new('ShaderNodeMixShader')
    a.node_tree.links.new(lw.outputs['Facing'], ms.inputs['Fac'])
    a.node_tree.links.new(tr.outputs['BSDF'], ms.inputs[1])
    a.node_tree.links.new(em.outputs['Emission'], ms.inputs[2])
    a.node_tree.links.new(ms.outputs['Shader'], an['Material Output'].inputs['Surface'])
    ellipsoid('Atmos', (0, 0, 0), (1.06, 1.06, 1.06), a, 64)

    # Rings, and a moon on four orbits - one for each year.
    tilt = bpy.data.objects.new('Tilt', None)
    link(tilt)
    tilt.rotation_euler = (radians(13), radians(-17), 0)  # nearly level, open toward the camera
    rings = (('#5ce0ff', 1.42, 0.022), ('#bc6fff', 1.62, 0.016), ('#ffffff', 1.8, 0.01), ('#6dff8a', 2.0, 0.014))
    for i, (c, R, rr) in enumerate(rings):
        bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=rr, major_segments=160, minor_segments=10)
        t = bpy.context.active_object
        t.data.materials.append(mat(f'Ring{i}', '#000000', 0, 0.4, c, 2.2 if i != 2 else 1.2))
        t.parent = tilt
        ang = radians((210, 320, 40, 140)[i])
        moon = ellipsoid(f'Moon{i}', (R * cos(ang), R * sin(ang), 0), (0.075 + 0.02 * (i % 2),) * 3,
                         mat(f'Moon{i}', c, 0, 0.35, c, 1.4), 24)
        moon.parent = tilt
    stage((0, -6.6, 1.2), (0, 0, 0), 50)
    render('planet')


# ─────────────────────────── star ───────────────────────────
def puffy_star(name, m, scale=1.0):
    """A plump five-pointed star standing in the XZ plane, facing -Y."""
    def outline(s, y):
        return [((1.12 if k % 2 == 0 else 0.5) * s * sin(k * pi / 5), y, (1.12 if k % 2 == 0 else 0.5) * s * cos(k * pi / 5)) for k in range(10)]
    rings = [outline(0.82, -0.24), outline(1.0, 0), outline(0.82, 0.24)]
    verts = [(0, -0.4, 0.05)] + rings[0] + rings[1] + rings[2] + [(0, 0.4, 0.05)]
    faces = [(0, 1 + (k + 1) % 10, 1 + k) for k in range(10)]
    for r in range(2):
        a, b = 1 + r * 10, 1 + (r + 1) * 10
        faces += [(a + k, a + (k + 1) % 10, b + (k + 1) % 10, b + k) for k in range(10)]
    last = len(verts) - 1
    faces += [(21 + k, 21 + (k + 1) % 10, last) for k in range(10)]
    o = mesh_obj(name, [(x * scale, y * scale, z * scale) for x, y, z in verts], faces, m)
    sub = o.modifiers.new('Subsurf', 'SUBSURF')
    sub.levels = sub.render_levels = 3
    return o


def star():
    gold = mat('Gold', '#ffc23d', 0.35, 0.26, '#ff9d00', 0.22, coat=0.6)
    star = puffy_star('Star', gold)
    bpy.context.view_layer.update()
    dg = bpy.context.evaluated_depsgraph_get()

    def front(x, z):
        hit, loc, *_ = star.ray_cast(Vector((x, -5, z)), Vector((0, 1, 0)), depsgraph=dg)
        return loc.y if hit else -0.3

    ink = mat('Ink', '#06070c', 0.2, 0.08, coat=1)
    for s in (-1, 1):
        ellipsoid(f'Eye{s}', (s * 0.17, front(s * 0.17, 0.12) + 0.01, 0.12), (0.072, 0.04, 0.105), ink)
        ellipsoid(f'Glint{s}', (s * 0.17 + 0.025, front(s * 0.17, 0.12) - 0.03, 0.16), (0.022, 0.012, 0.03),
                  mat(f'Glint{s}', '#ffffff', 0, 0.2, '#ffffff', 3))
        ellipsoid(f'Cheek{s}', (s * 0.33, front(s * 0.33, -0.05) + 0.004, -0.05), (0.075, 0.02, 0.045),
                  mat(f'Cheek{s}', '#ff7eb6', 0, 0.5, '#ff5fa8', 0.6))
    # The smile: a tube along an arc that follows the face.
    cu = bpy.data.curves.new('Smile', 'CURVE')
    cu.dimensions, cu.bevel_depth, cu.bevel_resolution = '3D', 0.026, 6
    sp = cu.splines.new('POLY')
    pts = [(0.15 * cos(radians(a)), -0.08 + 0.12 * sin(radians(a))) for a in range(200, 341, 10)]
    sp.points.add(len(pts) - 1)
    for p, (x, z) in zip(sp.points, pts):
        p.co = (x, front(x, z) - 0.005, z, 1)
    smile = bpy.data.objects.new('Smile', cu)
    link(smile)
    smile.data.materials.append(ink)

    for name, col, at, sc, rot in (('Mini1', '#5ce0ff', (1.05, 0.3, 0.95), 0.3, -18), ('Mini2', '#ff7eb6', (-1.1, 0.2, -0.75), 0.24, 20)):
        o = puffy_star(name, mat(name, col, 0.2, 0.3, col, 0.9, coat=0.5), sc)
        o.location, o.rotation_euler = at, (0, radians(rot), 0)
    stage((0.5, -5.4, 0.7), (0, 0, 0.05), 50)
    render('star')


# Render all three, or only those named after `--` (e.g. `-- planet`).
only = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else NAMES
for build in (laptop, planet, star):
    if build.__name__ in only:
        bpy.ops.wm.read_factory_settings(use_empty=True)
        build()
