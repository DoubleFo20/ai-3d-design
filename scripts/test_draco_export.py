import bpy
import bmesh
import math
import os
import sys

# Import functions from generate_canele_blender
sys.path.append(r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\scripts")
import generate_canele_blender as gen

def test_export():
    gen.clear_scene()
    obj = gen.create_canele_mesh()
    tex_dir = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\textures"
    mat = gen.setup_pbr_material(tex_dir)
    obj.data.materials.append(mat)
    
    out_opt = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\canele_optimized.glb"
    
    # Test exporting with Draco and WebP/optimized textures
    bpy.ops.export_scene.gltf(
        filepath=out_opt,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
        export_materials='EXPORT',
        export_image_format='AUTO',
        export_image_quality=90,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=7,
        export_normals=True,
        export_tangents=False # Draco requires false for tangents as it reconstructs or compresses
    )
    
    size = os.path.getsize(out_opt)
    print(f"Exported Draco GLB size: {size:,} bytes ({size / (1024*1024):.2f} MiB)")

if __name__ == '__main__':
    test_export()
