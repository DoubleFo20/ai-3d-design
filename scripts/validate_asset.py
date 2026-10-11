#!/usr/bin/env python3
"""
ATELIER 3D — Production 3D Asset Validation & Gate Audit Tool
Audits incoming Photogrammetry / Licensed 3D GLB assets against production web delivery standards.

Usage:
    python scripts/validate_asset.py [path/to/asset.glb]
"""

import sys
import os
import struct
import json

class TerminalColor:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    RESET = '\033[0m'

def validate_glb_asset(file_path: str):
    print(f"\n{TerminalColor.BOLD}{TerminalColor.CYAN}======================================================{TerminalColor.RESET}")
    print(f"{TerminalColor.BOLD} ATELIER 3D — ASSET VALIDATION AUDIT{TerminalColor.RESET}")
    print(f"{TerminalColor.BOLD}{TerminalColor.CYAN}======================================================{TerminalColor.RESET}")
    
    if not os.path.exists(file_path):
        print(f"{TerminalColor.RED}[FAIL] File not found: {file_path}{TerminalColor.RESET}")
        return False

    file_size_bytes = os.path.getsize(file_path)
    file_size_mb = file_size_bytes / (1024 * 1024)
    print(f"Auditing file: {TerminalColor.BOLD}{os.path.basename(file_path)}{TerminalColor.RESET}")
    print(f"Path: {os.path.abspath(file_path)}")
    print(f"File Size: {file_size_mb:.2f} MiB ({file_size_bytes:,} bytes)")

    # Read GLB header
    with open(file_path, 'rb') as f:
        magic = f.read(4)
        if magic != b'glTF':
            print(f"{TerminalColor.RED}[FAIL] Not a valid binary glTF (.glb) container. Magic: {magic}{TerminalColor.RESET}")
            return False

        version, length = struct.unpack('<II', f.read(8))
        if version != 2:
            print(f"{TerminalColor.RED}[FAIL] Unsupported glTF version: {version}. Expected version 2.{TerminalColor.RESET}")
            return False

        chunk_len, chunk_type = struct.unpack('<I4s', f.read(8))
        if chunk_type != b'JSON':
            print(f"{TerminalColor.RED}[FAIL] First chunk is not JSON.{TerminalColor.RESET}")
            return False

        json_bytes = f.read(chunk_len)
        gltf = json.loads(json_bytes.decode('utf-8'))

    warnings = []
    failures = []
    passes = []

    # 1. FILE SIZE CHECK
    if file_size_mb > 15.0:
        failures.append(f"File size exceeds hard production limit of 15 MB: {file_size_mb:.2f} MiB")
    elif file_size_mb > 5.0:
        warnings.append(f"File size exceeds recommended budget of 5 MB: {file_size_mb:.2f} MiB. Consider Draco or WebP/KTX2.")
    else:
        passes.append(f"File size is optimal: {file_size_mb:.2f} MiB (<= 5 MB budget)")

    # 2. GEOMETRY / TRIANGLE COUNT CHECK
    meshes = gltf.get('meshes', [])
    total_triangles = 0
    total_vertices = 0
    total_primitives = 0
    has_uv = True
    has_normals = True

    for mesh in meshes:
        for prim in mesh.get('primitives', []):
            total_primitives += 1
            indices_idx = prim.get('indices')
            pos_idx = prim.get('attributes', {}).get('POSITION')
            uv_idx = prim.get('attributes', {}).get('TEXCOORD_0')
            norm_idx = prim.get('attributes', {}).get('NORMAL')

            if uv_idx is None:
                has_uv = False
            if norm_idx is None:
                has_normals = False

            if indices_idx is not None:
                tri_count = gltf['accessors'][indices_idx]['count'] // 3
            elif pos_idx is not None:
                tri_count = gltf['accessors'][pos_idx]['count'] // 3
            else:
                tri_count = 0

            vert_count = gltf['accessors'][pos_idx]['count'] if pos_idx is not None else 0
            total_triangles += tri_count
            total_vertices += vert_count

    if total_triangles > 250_000:
        failures.append(f"Triangle count exceeds max threshold of 250k: {total_triangles:,} triangles.")
    elif total_triangles > 90_000:
        warnings.append(f"Triangle count exceeds desktop target of 90k: {total_triangles:,} triangles. May impact mobile 60 FPS.")
    else:
        passes.append(f"Triangle count is within budget: {total_triangles:,} tris ({total_vertices:,} verts)")

    # 3. DRAW CALLS / PRIMITIVES CHECK
    if total_primitives > 4:
        warnings.append(f"Multiple primitives/draw calls detected: {total_primitives}. Single-draw call mesh is recommended.")
    else:
        passes.append(f"Draw calls optimized: {total_primitives} mesh primitive(s)")

    # 4. UV & NORMAL MAP CHANNELS CHECK
    if not has_uv:
        failures.append("Missing TEXCOORD_0 (UV coordinate) channel on mesh primitives.")
    else:
        passes.append("TEXCOORD_0 UV coordinates verified")

    if not has_normals:
        warnings.append("Missing vertex normals on mesh primitives.")
    else:
        passes.append("Vertex normals verified")

    # 5. PBR MATERIAL & TEXTURE VALIDATION
    materials = gltf.get('materials', [])
    if not materials:
        warnings.append("No materials defined in GLB.")
    else:
        for idx, mat in enumerate(materials):
            pbr = mat.get('pbrMetallicRoughness', {})
            metallic = pbr.get('metallicFactor', 1.0)
            if metallic > 0.05:
                warnings.append(f"Material '{mat.get('name', idx)}' metallic factor is {metallic}. Pastry is dielectric (metalness must be 0.0).")
            else:
                passes.append(f"Material '{mat.get('name', idx)}' dielectric properties verified (metalness <= 0.05)")

            has_basecolor = 'baseColorTexture' in pbr
            has_normal = 'normalTexture' in mat
            has_orm = 'metallicRoughnessTexture' in pbr or 'occlusionTexture' in mat

            if not has_basecolor:
                warnings.append(f"Material '{mat.get('name', idx)}' missing BaseColor / Albedo texture.")
            else:
                passes.append(f"Material '{mat.get('name', idx)}' BaseColor texture linked")

            if not has_normal:
                warnings.append(f"Material '{mat.get('name', idx)}' missing Tangent Normal map.")
            else:
                passes.append(f"Material '{mat.get('name', idx)}' Normal map linked")

            if has_orm:
                passes.append(f"Material '{mat.get('name', idx)}' ORM / Roughness texture linked")

    # 6. EXTENSIONS & COMPRESSION AUDIT
    exts_used = gltf.get('extensionsUsed', [])
    print(f"\n{TerminalColor.BOLD}--- Compression & Extensions ---{TerminalColor.RESET}")
    print(f"Extensions Used: {exts_used or 'None (Standard glTF 2.0)'}")
    if 'KHR_draco_mesh_compression' in exts_used:
        passes.append("Draco geometry compression active (KHR_draco_mesh_compression)")
    if 'EXT_texture_webp' in exts_used:
        passes.append("WebP texture compression active (EXT_texture_webp)")
    if 'KHR_texture_basisu' in exts_used:
        passes.append("KTX2 Basis Universal texture compression active (KHR_texture_basisu)")

    # 7. SUMMARY & VERDICT
    print(f"\n{TerminalColor.BOLD}--- AUDIT RESULTS ---{TerminalColor.RESET}")
    for p in passes:
        print(f"  {TerminalColor.GREEN}[PASS]{TerminalColor.RESET} {p}")
    for w in warnings:
        print(f"  {TerminalColor.YELLOW}[WARN]{TerminalColor.RESET} {w}")
    for f in failures:
        print(f"  {TerminalColor.RED}[FAIL]{TerminalColor.RESET} {f}")

    print(f"\n{TerminalColor.BOLD}--- FINAL VERDICT ---{TerminalColor.RESET}")
    if failures:
        print(f"{TerminalColor.RED}{TerminalColor.BOLD}GATE STATUS: REJECTED{TerminalColor.RESET} ({len(failures)} critical defect(s) must be remediated)")
        return False
    elif warnings:
        print(f"{TerminalColor.YELLOW}{TerminalColor.BOLD}GATE STATUS: ACCEPTED WITH ADVISORIES{TerminalColor.RESET} ({len(warnings)} optimization notice(s))")
        return True
    else:
        print(f"{TerminalColor.GREEN}{TerminalColor.BOLD}GATE STATUS: PRODUCTION READY (100% COMPLIANT){TerminalColor.RESET}")
        return True

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else 'public/models/canele.glb'
    success = validate_glb_asset(target)
    sys.exit(0 if success else 1)
