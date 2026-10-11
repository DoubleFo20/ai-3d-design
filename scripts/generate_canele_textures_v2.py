"""
Photorealistic Canelé de Bordeaux 2K PBR Texture Generator (v2 - Studio Photorealism)
Based on authentic French bakery reference photography:
- Eliminates bright copper/orange artificial tint
- Replaces with deep espresso burnt sugar, rich mahogany crust, and warm honeyed caramel
- Adds realistic Voronoi crust blisters, batter bubbling pores, and beeswax glaze variation
- Calibrates non-uniform roughness (0.40 - 0.85) to eliminate plastic/silvery sheen
"""

import os
import math
import numpy as np
from PIL import Image

def generate_noise_2d(width, height, scale, octaves=4, persistence=0.5, seed=42):
    np.random.seed(seed)
    total = np.zeros((height, width), dtype=np.float32)
    frequency = 1.0 / scale
    amplitude = 1.0
    max_val = 0.0

    for i in range(octaves):
        gw = max(2, int(width * frequency))
        gh = max(2, int(height * frequency))
        rand_grid = np.random.rand(gh, gw).astype(np.float32)
        img = Image.fromarray(rand_grid)
        upsampled = np.array(img.resize((width, height), Image.Resampling.BICUBIC), dtype=np.float32)
        total += upsampled * amplitude
        max_val += amplitude
        amplitude *= persistence
        frequency *= 2.0

    return total / max_val

def generate_voronoi_blisters(width, height, num_cells=600, seed=101):
    """Simulates organic baked crust blisters from boiling beeswax & batter moisture"""
    np.random.seed(seed)
    # Random cell centers
    pts_x = np.random.rand(num_cells) * width
    pts_y = np.random.rand(num_cells) * height
    radii = np.random.uniform(4.0, 18.0, size=num_cells)
    
    # Grid coordinates
    y_coords, x_coords = np.ogrid[:height, :width]
    blister_map = np.zeros((height, width), dtype=np.float32)
    
    for i in range(num_cells):
        cx, cy, r = pts_x[i], pts_y[i], radii[i]
        # Bounding box for speed
        x0 = max(0, int(cx - r * 1.5))
        x1 = min(width, int(cx + r * 1.5))
        y0 = max(0, int(cy - r * 1.5))
        y1 = min(height, int(cy + r * 1.5))
        if x1 <= x0 or y1 <= y0:
            continue
        
        dx = x_coords[0, x0:x1] - cx
        dy = y_coords[y0:y1, 0] - cy
        d2 = (dx[None, :]**2 + dy[:, None]**2)
        r2 = r**2
        mask = d2 < r2
        # Smooth parabolic dome
        dome = np.maximum(0.0, 1.0 - (d2 / r2)) ** 1.5
        blister_map[y0:y1, x0:x1] += dome * mask * 0.45

    return np.clip(blister_map, 0.0, 1.0)

def generate_textures_v2(output_dir, size=2048):
    os.makedirs(output_dir, exist_ok=True)
    print(f"Generating v2 Studio 2K Textures in: {output_dir}")

    # UV Coordinates
    u = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    v = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    U, V = np.meshgrid(u, v)

    # 1. 12-Flute Profile: Rounded convex ribs (crest) + smooth valleys
    NUM_FLUTES = 12
    flute_phase = 2.0 * np.pi * NUM_FLUTES * U
    cos_12 = np.cos(flute_phase)
    # Realistic flute curve: broad rounded rib, narrower valley
    flute_rib = np.clip((cos_12 + 0.3) / 1.3, 0.0, 1.0)
    flute_valley = 1.0 - flute_rib

    # 2. Vertical Zones
    # V=0: Base Foot, V=0.88: Top Shoulder, V=1.0: Crown Center
    base_foot_mask = np.clip(1.0 - (V / 0.07), 0.0, 1.0) ** 1.5
    crown_rim_mask = np.clip((V - 0.86) / 0.08, 0.0, 1.0)
    crater_center_mask = np.clip((V - 0.93) / 0.07, 0.0, 1.0)
    body_mask = (1.0 - base_foot_mask) * (1.0 - crown_rim_mask)

    # 3. Multi-layer Organic Noise
    print("Generating natural baked crust noise layers...")
    macro_swirl = generate_noise_2d(size, size, scale=220.0, octaves=4, persistence=0.55, seed=42)
    fine_porosity = generate_noise_2d(size, size, scale=16.0, octaves=3, persistence=0.6, seed=88)
    crackle_noise = generate_noise_2d(size, size, scale=50.0, octaves=4, persistence=0.5, seed=142)
    blisters = generate_voronoi_blisters(size, size, num_cells=850, seed=303)

    # 4. Color Palette (Deep, rich, edible studio tones - NO bright copper/orange)
    # Normalized [0..1] sRGB:
    C_BURNT_ESPRESSO = np.array([22.0/255.0, 9.0/255.0, 3.0/255.0], dtype=np.float32)   # #160903
    C_DEEP_MAHOGANY  = np.array([44.0/255.0, 18.0/255.0, 7.0/255.0], dtype=np.float32)   # #2C1207
    C_WARM_CARAMEL   = np.array([78.0/255.0, 34.0/255.0, 13.0/255.0], dtype=np.float32)  # #4E220D
    C_HONEY_VALLEY   = np.array([115.0/255.0, 52.0/255.0, 18.0/255.0], dtype=np.float32) # #733412
    C_BEESWAX_AMBER  = np.array([142.0/255.0, 68.0/255.0, 24.0/255.0], dtype=np.float32) # #8E4418

    # Body color blend
    # Ribs get deep mahogany; valleys get warm caramel and honey amber
    valley_weight = flute_valley * 0.7 + (macro_swirl - 0.5) * 0.25
    valley_weight = np.clip(valley_weight, 0.0, 1.0)

    basecolor_rgb = np.zeros((size, size, 3), dtype=np.float32)
    for c in range(3):
        # Base flute color
        ch = C_DEEP_MAHOGANY[c] * (1.0 - valley_weight) + C_WARM_CARAMEL[c] * valley_weight
        # Add honey amber in deep valleys
        ch += C_HONEY_VALLEY[c] * (flute_valley ** 2.2) * 0.35
        # Add subtle beeswax amber flecks
        ch += C_BEESWAX_AMBER[c] * blisters * 0.15
        
        # Scorched foot and crown rim darkening
        burn_amount = base_foot_mask * 0.85 + crown_rim_mask * 0.70 + (crater_center_mask * 0.5)
        ch = ch * (1.0 - burn_amount) + C_BURNT_ESPRESSO[c] * burn_amount
        
        # Add subtle blister edge darkening (caramel crust rim around bubbles)
        ch -= blisters * 0.04
        # Add fine baked pores
        ch += (fine_porosity - 0.5) * 0.03
        
        basecolor_rgb[:, :, c] = np.clip(ch, 0.0, 1.0)

    # Natural micro-char specks
    np.random.seed(999)
    char_specks = (np.random.rand(size, size) > 0.993).astype(np.float32)
    char_blur = np.array(Image.fromarray(char_specks).resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    for c in range(3):
        basecolor_rgb[:, :, c] = basecolor_rgb[:, :, c] * (1.0 - char_blur * 0.75) + (C_BURNT_ESPRESSO[c] * 0.5) * char_blur

    # Save BaseColor
    img_bc = Image.fromarray((basecolor_rgb * 255.0).astype(np.uint8))
    path_bc = os.path.join(output_dir, "canele_basecolor.png")
    img_bc.save(path_bc, quality=98)
    print(f"Saved BaseColor v2: {path_bc}")

    # 5. Calibrated Roughness Map (NO PLASTIC GLOSS)
    # - Satiny baked crust on ribs: ~0.65 - 0.78
    # - Scorched crown and base: ~0.75 - 0.85
    # - Beeswax glaze pooling in valleys: ~0.42 - 0.52 (satin wax, NOT wet chrome!)
    print("Synthesizing calibrated Roughness v2...")
    roughness = 0.72 - (flute_valley * 0.24) + (macro_swirl - 0.5) * 0.10
    # Blisters have slight variation
    roughness += (blisters - 0.3) * 0.08
    # Scorched foot and crown are drier / more matte
    roughness += base_foot_mask * 0.10 + crown_rim_mask * 0.08
    roughness = np.clip(roughness, 0.40, 0.88)

    img_rough = Image.fromarray((roughness * 255.0).astype(np.uint8))
    path_rough = os.path.join(output_dir, "canele_roughness.png")
    img_rough.save(path_rough)
    print(f"Saved Roughness v2: {path_rough}")

    # 6. Ambient Occlusion (AO) Map
    print("Synthesizing Ambient Occlusion v2...")
    ao = 1.0 - (flute_valley * 0.30) - (crater_center_mask * 0.45) - (blisters * 0.10)
    ao = np.clip(ao, 0.30, 1.0)
    img_ao = Image.fromarray((ao * 255.0).astype(np.uint8))
    path_ao = os.path.join(output_dir, "canele_ao.png")
    img_ao.save(path_ao)
    print(f"Saved AO v2: {path_ao}")

    # 7. Tangent Normal Map (Micro-Displacement + Blister relief)
    print("Synthesizing Tangent Normal Map v2...")
    # Height displacement: flute macro profile + blisters + fine pores
    height_map = (cos_12 * 0.30) + (blisters * 0.40) + (crackle_noise * 0.18) + (fine_porosity * 0.12)
    
    gx = np.zeros_like(height_map)
    gy = np.zeros_like(height_map)
    gx[:, 1:-1] = (height_map[:, 2:] - height_map[:, :-2]) * 0.5
    gy[1:-1, :] = (height_map[2:, :] - height_map[:-2, :]) * 0.5
    
    bump_scale = 1.8
    nx = -gx * bump_scale
    ny = -gy * bump_scale
    nz = np.ones_like(height_map)
    
    length = np.sqrt(nx**2 + ny**2 + nz**2)
    nx /= length
    ny /= length
    nz /= length

    r_ch = ((nx * 0.5 + 0.5) * 255.0).astype(np.uint8)
    g_ch = ((ny * 0.5 + 0.5) * 255.0).astype(np.uint8)
    b_ch = ((nz * 0.5 + 0.5) * 255.0).astype(np.uint8)

    normal_rgb = np.stack([r_ch, g_ch, b_ch], axis=-1)
    img_norm = Image.fromarray(normal_rgb)
    path_norm = os.path.join(output_dir, "canele_normal.png")
    img_norm.save(path_norm)
    print(f"Saved Normal v2: {path_norm}")

    # 8. Standard glTF Packed ORM Texture (Occlusion = R, Roughness = G, Metallic = B)
    # This guarantees every glTF loader loads the roughness and metallic maps!
    orm_r = (ao * 255.0).astype(np.uint8)
    orm_g = (roughness * 255.0).astype(np.uint8)
    orm_b = np.zeros((size, size), dtype=np.uint8) # 0 Metallic (dielectric pastry)
    
    orm_rgb = np.stack([orm_r, orm_g, orm_b], axis=-1)
    img_orm = Image.fromarray(orm_rgb)
    path_orm = os.path.join(output_dir, "canele_orm.png")
    img_orm.save(path_orm)
    print(f"Saved glTF Packed ORM: {path_orm}")

    print("All v2 PBR textures successfully generated!")

if __name__ == "__main__":
    out_dir = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\textures"
    generate_textures_v2(out_dir, size=2048)
