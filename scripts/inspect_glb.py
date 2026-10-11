import struct
import json
import os
import sys

def inspect_glb(glb_path):
    if not os.path.exists(glb_path):
        print(f"File not found: {glb_path}")
        return

    file_size = os.path.getsize(glb_path)
    with open(glb_path, 'rb') as f:
        magic, version, length = struct.unpack('<4sII', f.read(12))
        chunk_len, chunk_type = struct.unpack('<I4s', f.read(8))
        gltf_json = json.loads(f.read(chunk_len).decode('utf-8'))

    print(f"=== GLB INSPECTION REPORT: {os.path.basename(glb_path)} ===")
    print(f"File size on disk: {file_size:,} bytes ({file_size / (1024*1024):.2f} MiB / {file_size / 1_000_000:.2f} MB)")
    print(f"glTF Version: {version}")
    print(f"Asset Generator: {gltf_json.get('asset', {}).get('generator', 'Unknown')}")
    print(f"Extensions Used: {gltf_json.get('extensionsUsed', [])}")
    print(f"Extensions Required: {gltf_json.get('extensionsRequired', [])}")

    meshes = gltf_json.get('meshes', [])
    total_triangles = 0
    total_vertices = 0
    print(f"\n--- Meshes ({len(meshes)}) ---")
    for i, m in enumerate(meshes):
        m_name = m.get('name', f'Mesh_{i}')
        for p in m.get('primitives', []):
            indices_acc_idx = p.get('indices')
            pos_acc_idx = p.get('attributes', {}).get('POSITION')
            tri_count = gltf_json['accessors'][indices_acc_idx]['count'] // 3 if indices_acc_idx is not None else 0
            vert_count = gltf_json['accessors'][pos_acc_idx]['count'] if pos_acc_idx is not None else 0
            total_triangles += tri_count
            total_vertices += vert_count
            mat_idx = p.get('material')
            mat_name = gltf_json['materials'][mat_idx].get('name', f'Material_{mat_idx}') if mat_idx is not None else 'None'
            print(f"  [{i}] {m_name}: {tri_count:,} tris, {vert_count:,} verts, Material: {mat_name}")
    print(f"Total Triangles: {total_triangles:,}")
    print(f"Total Vertices: {total_vertices:,}")

    materials = gltf_json.get('materials', [])
    print(f"\n--- Materials ({len(materials)}) ---")
    for i, mat in enumerate(materials):
        print(f"  [{i}] {mat.get('name', f'Mat_{i}')}")
        pbr = mat.get('pbrMetallicRoughness', {})
        print(f"      BaseColor Texture: {pbr.get('baseColorTexture')}")
        print(f"      Metallic-Roughness Texture: {pbr.get('metallicRoughnessTexture')}")
        print(f"      Roughness Factor: {pbr.get('roughnessFactor')}")
        print(f"      Metallic Factor: {pbr.get('metallicFactor')}")
        print(f"      Normal Texture: {mat.get('normalTexture')}")
        print(f"      Occlusion Texture: {mat.get('occlusionTexture')}")

    images = gltf_json.get('images', [])
    print(f"\n--- Embedded Textures ({len(images)}) ---")
    total_img_bytes = 0
    for i, img in enumerate(images):
        bv_idx = img.get('bufferView')
        if bv_idx is not None:
            bv = gltf_json['bufferViews'][bv_idx]
            img_bytes = bv['byteLength']
            total_img_bytes += img_bytes
            print(f"  [{i}] {img.get('name', 'unnamed')} ({img.get('mimeType')}): {img_bytes:,} bytes ({img_bytes / (1024*1024):.2f} MiB)")
        else:
            print(f"  [{i}] {img.get('name', 'unnamed')} ({img.get('uri')})")
    print(f"Total Texture Payload: {total_img_bytes:,} bytes ({total_img_bytes / (1024*1024):.2f} MiB)")
    geom_bytes = file_size - total_img_bytes - chunk_len
    print(f"Approx Geometry/Buffer Payload: {geom_bytes:,} bytes ({geom_bytes / (1024*1024):.2f} MiB)")

if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv) > 1 else 'public/models/canele.glb'
    inspect_glb(path)
