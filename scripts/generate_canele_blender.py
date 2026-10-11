"""
Blender 4.2 LTS: Photorealistic Canelé de Bordeaux 3D Asset Generator (v3 - Artisanal Anatomy)
- Models authentic 12-flute copper mold pastry geometry with natural thermal expansion
- Sculpts 12 scalloped, puffy crown lobes cresting over the top shoulder rim
- Generates deep signature organic central crater cavity (7.5 mm depth) with blistered basin
- Adds flared bottom foot chamfer with baking contact ring
- Implements organic surface displacement for baked crust micro-blister relief
- Binds 2K PBR materials (BaseColor, Packed ORM Roughness/AO/Metalness=0, Tangent Normal Map)
- Exports web-optimized self-contained binary GLB to /public/models/canele.glb
"""

import bpy
import bmesh
import math
import os
from mathutils import Vector, noise

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in list(bpy.data.meshes):
        bpy.data.meshes.remove(block)
    for block in list(bpy.data.materials):
        bpy.data.materials.remove(block)
    for block in list(bpy.data.textures):
        bpy.data.textures.remove(block)
    for block in list(bpy.data.images):
        bpy.data.images.remove(block)

def create_canele_mesh():
    mesh = bpy.data.meshes.new("Canele_Mesh")
    obj = bpy.data.objects.new("Canele_de_Bordeaux", mesh)
    bpy.context.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)

    bm = bmesh.new()

    NUM_FLUTES = 12
    CIRCUM_SEGS = 120      # 10 segments per flute for organic smooth curvature
    HEIGHT = 0.046         # 46 mm authentic height
    R_BASE = 0.0238        # 23.8 mm base radius
    R_SHOULDER = 0.0208    # 20.8 mm shoulder radius
    FLUTE_DEPTH = 0.0021   # 2.1 mm flute depth
    TOP_CATER_DEPTH = 0.0078 # 7.8 mm signature crater depth

    # Profile helper: calculates radius along normalized height [0..1]
    def get_radius(t):
        # Thermal bulge: wider in lower third (t around 0.25 - 0.35)
        bulge = math.sin(t * math.pi) * 0.0011 if t < 0.65 else 0.0
        # Gentle taper towards shoulder
        taper = 1.0 - 0.125 * (t ** 1.15)
        return R_BASE * taper + bulge

    # Flute amplitude helper along height
    def get_flute_factor(t):
        if t < 0.05:
            # Soft fade at bottom foot chamfer
            return (t / 0.05) ** 1.4
        elif t > 0.85:
            # Maintain flutes into top shoulder for the 12 scalloped lobes
            return 1.0 - 0.35 * ((t - 0.85) / 0.15)
        else:
            return 1.0

    rings = []

    # 1. Base center vertex (slightly indented base foot)
    v_base_center = bm.verts.new(Vector((0, 0, 0.0006)))

    # Concentric inner base ring
    ring_base_inner = []
    for i in range(CIRCUM_SEGS):
        angle = 2.0 * math.pi * i / CIRCUM_SEGS
        r = R_BASE * 0.45
        v = bm.verts.new(Vector((r * math.cos(angle), r * math.sin(angle), 0.0002)))
        ring_base_inner.append(v)
    rings.append(ring_base_inner)

    # Base ring 2 (bottom foot corner contact ring)
    ring_base_corner = []
    for i in range(CIRCUM_SEGS):
        angle = 2.0 * math.pi * i / CIRCUM_SEGS
        r = R_BASE * 0.90
        v = bm.verts.new(Vector((r * math.cos(angle), r * math.sin(angle), 0.0)))
        ring_base_corner.append(v)
    rings.append(ring_base_corner)

    # Base fillet ring 3 (rounding the bottom foot edge with flare)
    ring_base_fillet = []
    for i in range(CIRCUM_SEGS):
        angle = 2.0 * math.pi * i / CIRCUM_SEGS
        r = R_BASE * 1.01
        v = bm.verts.new(Vector((r * math.cos(angle), r * math.sin(angle), 0.0015)))
        ring_base_fillet.append(v)
    rings.append(ring_base_fillet)

    # 2. Main fluted body rings
    BODY_STEPS = 40
    for s in range(BODY_STEPS + 1):
        t = s / BODY_STEPS
        z = 0.0028 + t * (HEIGHT - 0.0070)
        r_base_z = get_radius(t)
        flute_fac = get_flute_factor(t)

        ring = []
        for i in range(CIRCUM_SEGS):
            angle = 2.0 * math.pi * i / CIRCUM_SEGS
            
            # Harmonic flute curve (broad rounded convex ribs, soft concave valleys)
            flute_harmonic = (math.cos(NUM_FLUTES * angle) * 0.88 - math.cos(2 * NUM_FLUTES * angle) * 0.12)
            flute_mod = flute_harmonic * FLUTE_DEPTH * flute_fac

            # Subtle organic asymmetry noise per vertex
            noise_val = noise.noise(Vector((math.cos(angle) * 1.8, math.sin(angle) * 1.8, t * 3.5)))
            asymmetry = (noise_val - 0.5) * 0.00045

            r_total = r_base_z + flute_mod + asymmetry
            x = r_total * math.cos(angle)
            y = r_total * math.sin(angle)
            v = bm.verts.new(Vector((x, y, z)))
            ring.append(v)
        rings.append(ring)

    # 3. Top shoulder curving over into the 12 Scalloped Crown Lobes
    # The 12 rib crests stay puffy and dome upwards, while valleys dip slightly
    SHOULDER_STEPS = 10
    Z_SHOULDER_START = HEIGHT - 0.0042
    for s in range(1, SHOULDER_STEPS + 1):
        p = s / SHOULDER_STEPS
        angle_rad = p * (math.pi / 2.0)
        
        # Inward radius progression
        r_shoulder = R_SHOULDER * (1.0 - (1.0 - math.cos(angle_rad)) * 0.16)
        
        ring = []
        for i in range(CIRCUM_SEGS):
            angle = 2.0 * math.pi * i / CIRCUM_SEGS
            
            # Each flute rib forms a distinct puffy lobe cresting over the shoulder
            flute_harmonic = math.cos(NUM_FLUTES * angle)
            flute_mod = flute_harmonic * FLUTE_DEPTH * (1.0 - p * 0.35)
            
            # Height scalloping: rib lobes are taller than valley dips
            lobe_height_lift = (flute_harmonic * 0.5 + 0.5) * 0.0012 * p
            z = Z_SHOULDER_START + math.sin(angle_rad) * 0.0042 + lobe_height_lift
            
            r_total = r_shoulder + flute_mod
            x = r_total * math.cos(angle)
            y = r_total * math.sin(angle)
            v = bm.verts.new(Vector((x, y, z)))
            ring.append(v)
        rings.append(ring)

    # 4. Deep Organic Crown Crater / Depression (7.8 mm deep signature cavity)
    CRATER_STEPS = 12
    Z_CROWN_APEX = HEIGHT
    for s in range(1, CRATER_STEPS + 1):
        p = s / CRATER_STEPS
        # Smooth bowl curve dipping down into the center
        cup_curve = math.sin(p * (math.pi / 2.0))
        z_base = Z_CROWN_APEX - cup_curve * TOP_CATER_DEPTH
        r_crater = (R_SHOULDER * 0.82) * (1.0 - p)

        ring = []
        for i in range(CIRCUM_SEGS):
            angle = 2.0 * math.pi * i / CIRCUM_SEGS
            # The 12 lobes ripple softly down the crater inner wall, fading toward bottom
            inner_ripple = math.cos(NUM_FLUTES * angle) * 0.00065 * ((1.0 - p) ** 1.5)
            r_total = max(0.0005, r_crater + inner_ripple)
            
            # Subtle organic crater blister noise
            n_crater = noise.noise(Vector((math.cos(angle) * 2.4, math.sin(angle) * 2.4, 9.0 + p * 2.5))) * 0.00030
            
            x = r_total * math.cos(angle)
            y = r_total * math.sin(angle)
            v = bm.verts.new(Vector((x, y, z_base + n_crater)))
            ring.append(v)
        rings.append(ring)

    # Crater center apex vertex
    v_crater_center = bm.verts.new(Vector((0, 0, Z_CROWN_APEX - TOP_CATER_DEPTH + 0.0002)))

    # Faces Construction
    # 1. Base center fan
    for i in range(CIRCUM_SEGS):
        i_next = (i + 1) % CIRCUM_SEGS
        bm.faces.new([v_base_center, rings[0][i_next], rings[0][i]])

    # 2. Quad rings along the entire body, shoulder, and crater
    for r_idx in range(len(rings) - 1):
        ring_a = rings[r_idx]
        ring_b = rings[r_idx + 1]
        for i in range(CIRCUM_SEGS):
            i_next = (i + 1) % CIRCUM_SEGS
            bm.faces.new([ring_a[i], ring_a[i_next], ring_b[i_next], ring_b[i]])

    # 3. Crater center apex fan
    last_ring = rings[-1]
    for i in range(CIRCUM_SEGS):
        i_next = (i + 1) % CIRCUM_SEGS
        bm.faces.new([last_ring[i], last_ring[i_next], v_crater_center])

    bm.normal_update()
    for face in bm.faces:
        face.smooth = True

    # UV Mapping: Dual-Island Layout (Body Strip in V=[0..0.58], Crown Disc at U=0.5, V=0.815)
    uv_layer = bm.loops.layers.uv.verify()
    num_body_rings = 3 + BODY_STEPS + 1 # rings up to shoulder

    # 1. Base center fan
    for f in v_base_center.link_faces:
        for loop in f.loops:
            if loop.vert == v_base_center:
                loop[uv_layer].uv = Vector((0.5, 0.0))
            else:
                for idx, v_cand in enumerate(rings[0]):
                    if loop.vert == v_cand:
                        loop[uv_layer].uv = Vector((idx / CIRCUM_SEGS, 0.01))

    # 2. Quad rings
    for r_idx in range(len(rings) - 1):
        ring_a = rings[r_idx]
        ring_b = rings[r_idx + 1]
        
        is_crown_zone = (r_idx >= num_body_rings - 1)

        for i in range(CIRCUM_SEGS):
            i_next = (i + 1) % CIRCUM_SEGS
            u_a = i / CIRCUM_SEGS
            u_b = (i + 1) / CIRCUM_SEGS
            if i_next == 0:
                u_b = 1.0

            # Find matching quad face
            for f in ring_a[i].link_faces:
                if ring_b[i] in f.verts and ring_a[i_next] in f.verts:
                    for loop in f.loops:
                        vert = loop.vert
                        if not is_crown_zone:
                            # Island 1: Fluted cylindrical body
                            v_coord = (r_idx / num_body_rings) * 0.58
                            if loop.vert == ring_a[i]:
                                loop[uv_layer].uv = Vector((u_a, (r_idx / num_body_rings) * 0.58))
                            elif loop.vert == ring_a[i_next]:
                                loop[uv_layer].uv = Vector((u_b, (r_idx / num_body_rings) * 0.58))
                            elif loop.vert == ring_b[i_next]:
                                loop[uv_layer].uv = Vector((u_b, ((r_idx + 1) / num_body_rings) * 0.58))
                            elif loop.vert == ring_b[i]:
                                loop[uv_layer].uv = Vector((u_a, ((r_idx + 1) / num_body_rings) * 0.58))
                        else:
                            # Island 2: Crown Rim & Crater Floor (Planar disc projection from above)
                            u_disc = 0.50 + (vert.co.x / (2.0 * R_BASE)) * 0.32
                            v_disc = 0.815 + (vert.co.y / (2.0 * R_BASE)) * 0.32
                            loop[uv_layer].uv = Vector((u_disc, v_disc))

    # 3. Crater center apex fan
    for f in v_crater_center.link_faces:
        for loop in f.loops:
            if loop.vert == v_crater_center:
                loop[uv_layer].uv = Vector((0.50, 0.815))
            else:
                u_disc = 0.50 + (loop.vert.co.x / (2.0 * R_BASE)) * 0.32
                v_disc = 0.815 + (loop.vert.co.y / (2.0 * R_BASE)) * 0.32
                loop[uv_layer].uv = Vector((u_disc, v_disc))

    bm.to_mesh(mesh)
    bm.free()

    # Add Subdivision Surface Modifier for smooth organic curvature
    subsurf = obj.modifiers.new(name="Subsurf", type='SUBSURF')
    subsurf.levels = 1
    subsurf.render_levels = 2

    # Add Displacement Modifier for physical baked crust micro-blisters
    displace = obj.modifiers.new(name="BakedCrustBlisters", type='DISPLACE')
    displace.strength = 0.00048 # 0.48 mm physical surface micro-relief
    
    disp_tex = bpy.data.textures.new("CrustBlistersNoise", type='CLOUDS')
    disp_tex.noise_scale = 0.0045
    disp_tex.noise_depth = 4
    displace.texture = disp_tex

    # Apply modifiers to bake physical geometry detail
    bpy.ops.object.modifier_apply(modifier="Subsurf")
    bpy.ops.object.modifier_apply(modifier="BakedCrustBlisters")

    # Center origin and place base on ground (z=0)
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    bbox = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    min_z = min(v.z for v in bbox)
    obj.location.z -= min_z
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

    return obj

def setup_pbr_material(texture_dir):
    mat = bpy.data.materials.new(name="M_Canele_PBR")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    node_output = nodes.new(type='ShaderNodeOutputMaterial')
    node_output.location = (800, 0)

    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (400, 0)
    links.new(node_bsdf.outputs['BSDF'], node_output.inputs['Surface'])

    node_uv = nodes.new(type='ShaderNodeUVMap')
    node_uv.location = (-700, 0)

    # 1. BaseColor Texture
    path_bc = os.path.join(texture_dir, "canele_basecolor.png")
    if os.path.exists(path_bc):
        img_bc = bpy.data.images.load(path_bc)
        img_bc.colorspace_settings.name = 'sRGB'
        node_tex_bc = nodes.new(type='ShaderNodeTexImage')
        node_tex_bc.location = (-300, 300)
        node_tex_bc.image = img_bc
        links.new(node_uv.outputs['UV'], node_tex_bc.inputs['Vector'])
        links.new(node_tex_bc.outputs['Color'], node_bsdf.inputs['Base Color'])

    # 2. Packed ORM Texture (Occlusion=R, Roughness=G, Metalness=B)
    path_orm = os.path.join(texture_dir, "canele_orm.png")
    if os.path.exists(path_orm):
        img_orm = bpy.data.images.load(path_orm)
        img_orm.colorspace_settings.name = 'Non-Color'
        node_tex_orm = nodes.new(type='ShaderNodeTexImage')
        node_tex_orm.location = (-300, 0)
        node_tex_orm.image = img_orm
        links.new(node_uv.outputs['UV'], node_tex_orm.inputs['Vector'])
        
        node_sep = nodes.new(type='ShaderNodeSeparateColor')
        node_sep.location = (-50, 0)
        links.new(node_tex_orm.outputs['Color'], node_sep.inputs['Color'])
        
        # Connect Roughness (Green channel)
        links.new(node_sep.outputs['Green'], node_bsdf.inputs['Roughness'])
        # Connect Metallic (Blue channel == 0.0)
        links.new(node_sep.outputs['Blue'], node_bsdf.inputs['Metallic'])

    # 3. Normal Map Texture
    path_norm = os.path.join(texture_dir, "canele_normal.png")
    if os.path.exists(path_norm):
        img_norm = bpy.data.images.load(path_norm)
        img_norm.colorspace_settings.name = 'Non-Color'
        node_tex_norm = nodes.new(type='ShaderNodeTexImage')
        node_tex_norm.location = (-450, -350)
        node_tex_norm.image = img_norm
        
        node_normal_map = nodes.new(type='ShaderNodeNormalMap')
        node_normal_map.location = (-150, -350)
        node_normal_map.inputs['Strength'].default_value = 1.6
        
        links.new(node_uv.outputs['UV'], node_tex_norm.inputs['Vector'])
        links.new(node_tex_norm.outputs['Color'], node_normal_map.inputs['Color'])
        links.new(node_normal_map.outputs['Normal'], node_bsdf.inputs['Normal'])

    return mat

def export_gltf(output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
        export_materials='EXPORT',
        export_image_format='AUTO',
        export_normals=True,
        export_tangents=True
    )
    print(f"Successfully exported photorealistic Canelé GLB (v3) to: {output_path}")

def main():
    clear_scene()
    obj = create_canele_mesh()
    tex_dir = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\textures"
    mat = setup_pbr_material(tex_dir)
    obj.data.materials.append(mat)
    
    out_glb = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\canele.glb"
    export_gltf(out_glb)

if __name__ == "__main__":
    main()
