"""
Photorealistic Canelé de Bordeaux 2K PBR Texture Generator (v3 - Studio Photorealism)
Engineered against authentic French bakery reference photography:
- Eliminates mathematical vertical stripes: breaks up flute continuity with organic mottling, batter drip bands, and micro-cracking
- Eliminates radial pinwheel spokes in top crater: crater floor has organic caramelized crust pooling and bubbly blister relief
- Authentic edible color palette: charred espresso (#120703), dark mahogany (#260F05), warm caramelized amber (#52220B), honeyed wax glaze (#7B3512)
- Dielectric beeswax-caramel roughness calibration: satiny wax glaze (0.42 - 0.52) in valleys, crispy matte (0.70 - 0.85) on scorched crests
- Metalness strictly 0.0 everywhere
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

def generate_voronoi_blisters(width, height, num_cells=1100, seed=101):
    """Simulates organic baked crust blisters from boiling beeswax & batter moisture"""
    np.random.seed(seed)
    pts_x = np.random.rand(num_cells) * width
    pts_y = np.random.rand(num_cells) * height
    radii = np.random.uniform(3.0, 16.0, size=num_cells)
    
    y_coords, x_coords = np.ogrid[:height, :width]
    blister_map = np.zeros((height, width), dtype=np.float32)
    
    for i in range(num_cells):
        cx, cy, r = pts_x[i], pts_y[i], radii[i]
        x0 = max(0, int(cx - r * 1.6))
        x1 = min(width, int(cx + r * 1.6))
        y0 = max(0, int(cy - r * 1.6))
        y1 = min(height, int(cy + r * 1.6))
        if x1 <= x0 or y1 <= y0:
            continue
        
        dx = x_coords[0, x0:x1] - cx
        dy = y_coords[y0:y1, 0] - cy
        d2 = (dx[None, :]**2 + dy[:, None]**2)
        r2 = r**2
        mask = d2 < r2
        dome = np.maximum(0.0, 1.0 - (d2 / r2)) ** 1.6
        blister_map[y0:y1, x0:x1] += dome * mask * 0.42

    return np.clip(blister_map, 0.0, 1.0)

def generate_textures_v3(output_dir, size=2048):
    os.makedirs(output_dir, exist_ok=True)
    print(f"Generating v3 Studio Photorealistic 2K Textures in: {output_dir}")

    # UV Coordinates
    u = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    v = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    U, V = np.meshgrid(u, v)

    # 1. Zone Masks
    # V=0: Base Foot, V=0.82: Top Shoulder Rim, V=0.92-1.0: Crown Crater Basin
    base_foot_mask = np.clip(1.0 - (V / 0.08), 0.0, 1.0) ** 1.6
    shoulder_mask = np.clip((V - 0.78) / 0.10, 0.0, 1.0)
    crater_basin_mask = np.clip((V - 0.88) / 0.12, 0.0, 1.0)
    body_weight = (1.0 - base_foot_mask) * (1.0 - crater_basin_mask)

    # 2. 12-Flute Profile with Natural Breakup
    NUM_FLUTES = 12
    # Add horizontal waviness to flutes (simulates fluid batter & thermal convection during baking)
    flute_wave_offset = generate_noise_2d(size, size, scale=280.0, octaves=3, persistence=0.5, seed=77) * 0.035
    flute_phase = 2.0 * np.pi * NUM_FLUTES * (U + flute_wave_offset)
    cos_12 = np.cos(flute_phase)
    flute_rib = np.clip((cos_12 + 0.25) / 1.25, 0.0, 1.0)
    flute_valley = 1.0 - flute_rib

    # CRITICAL: Fade out flutes inside the top crater! The crater is a pool, NOT vertical stripes!
    flute_valley *= (1.0 - crater_basin_mask * 0.92)
    flute_rib *= (1.0 - crater_basin_mask * 0.92)

    # 3. Organic Noise Layers
    print("Generating natural baked crust noise layers (blisters, micro-pores, caramel crazing)...")
    macro_mottling = generate_noise_2d(size, size, scale=240.0, octaves=4, persistence=0.55, seed=42)
    mid_caramel = generate_noise_2d(size, size, scale=70.0, octaves=4, persistence=0.5, seed=128)
    fine_porosity = generate_noise_2d(size, size, scale=14.0, octaves=3, persistence=0.6, seed=88)
    crust_crazing = generate_noise_2d(size, size, scale=35.0, octaves=4, persistence=0.5, seed=233)
    blisters = generate_voronoi_blisters(size, size, num_cells=1100, seed=303)

    # Crater specific organic pooling (swirling caramelized beeswax crust in center basin)
    crater_swirl = generate_noise_2d(size, size, scale=120.0, octaves=4, persistence=0.6, seed=512)

    # 4. Color Palette (Deep, edible, artisanal tones matching authentic reference photography)
    # sRGB normalized [0..1]:
    C_BURNT_ESPRESSO = np.array([18.0/255.0, 7.0/255.0, 3.0/255.0], dtype=np.float32)   # #120703
    C_DARK_MAHOGANY  = np.array([38.0/255.0, 15.0/255.0, 6.0/255.0], dtype=np.float32)   # #260F06
    C_ROASTED_CARAMEL= np.array([66.0/255.0, 26.0/255.0, 10.0/255.0], dtype=np.float32)  # #421A0A
    C_WARM_HONEY_VAL = np.array([96.0/255.0, 42.0/255.0, 15.0/255.0], dtype=np.float32)  # #602A0F
    C_BEESWAX_AMBER  = np.array([128.0/255.0, 58.0/255.0, 20.0/255.0], dtype=np.float32) # #803A14

    # Body color synthesis
    # Blend ribs and valleys organically, modulated by macro mottling so stripes are broken up
    organic_valley_blend = flute_valley * 0.65 + (macro_mottling - 0.5) * 0.35 + (mid_caramel - 0.5) * 0.15
    organic_valley_blend = np.clip(organic_valley_blend, 0.0, 1.0)

    basecolor_rgb = np.zeros((size, size, 3), dtype=np.float32)
    for c in range(3):
        # Base pastry crust tone
        ch = C_DARK_MAHOGANY[c] * (1.0 - organic_valley_blend) + C_ROASTED_CARAMEL[c] * organic_valley_blend
        # Honey warmth in deep valleys
        ch += C_WARM_HONEY_VAL[c] * (flute_valley ** 2.0) * 0.30
        # Beeswax amber highlights on blister peaks
        ch += C_BEESWAX_AMBER[c] * blisters * 0.18
        
        # Scorched base foot (contact with intense oven hearth)
        ch = ch * (1.0 - base_foot_mask * 0.88) + C_BURNT_ESPRESSO[c] * (base_foot_mask * 0.88)
        
        # Scorched crown shoulder & crater floor
        crater_char = crater_basin_mask * (0.60 + crater_swirl * 0.35)
        ch = ch * (1.0 - crater_char) + C_BURNT_ESPRESSO[c] * crater_char
        
        # Edge darkening around crust blisters (caramelized sugar pooling at bubble base)
        ch -= blisters * 0.035
        # Fine batter aeration pores
        ch += (fine_porosity - 0.5) * 0.025
        # Micro-crazing contrast
        ch += (crust_crazing - 0.5) * 0.02
        
        basecolor_rgb[:, :, c] = np.clip(ch, 0.0, 1.0)

    # Natural micro-char specks
    np.random.seed(888)
    char_specks = (np.random.rand(size, size) > 0.994).astype(np.float32)
    char_blur = np.array(Image.fromarray(char_specks).resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    for c in range(3):
        basecolor_rgb[:, :, c] = basecolor_rgb[:, :, c] * (1.0 - char_blur * 0.70) + (C_BURNT_ESPRESSO[c] * 0.6) * char_blur

    # Save BaseColor
    img_bc = Image.fromarray((basecolor_rgb * 255.0).astype(np.uint8))
    path_bc = os.path.join(output_dir, "canele_basecolor.png")
    img_bc.save(path_bc, quality=98)
    print(f"Saved BaseColor v3: {path_bc}")

    # 5. Roughness Map: Calibrated Dielectric Beeswax Sheen (NO METAL / NO PLASTIC)
    # - Beeswax-coated valleys: ~0.44 - 0.54 (soft waxy satin)
    # - Charred crispy crests & crown rim: ~0.72 - 0.85 (dry, tactile matte)
    # - Blister bubbles: ~0.48 - 0.65
    print("Synthesizing calibrated Roughness v3...")
    roughness = 0.74 - (flute_valley * 0.22) + (macro_mottling - 0.5) * 0.12
    roughness += (blisters - 0.3) * 0.08
    roughness += base_foot_mask * 0.12 + crater_basin_mask * 0.08
    roughness = np.clip(roughness, 0.42, 0.86)

    img_rough = Image.fromarray((roughness * 255.0).astype(np.uint8))
    path_rough = os.path.join(output_dir, "canele_roughness.png")
    img_rough.save(path_rough)
    print(f"Saved Roughness v3: {path_rough}")

    # 6. Ambient Occlusion (AO) Map
    print("Synthesizing Ambient Occlusion v3...")
    ao = 1.0 - (flute_valley * 0.32) - (crater_basin_mask * 0.38) - (base_foot_mask * 0.25)
    ao = np.clip(ao, 0.45, 1.0)
    img_ao = Image.fromarray((ao * 255.0).astype(np.uint8))
    path_ao = os.path.join(output_dir, "canele_ao.png")
    img_ao.save(path_ao)
    print(f"Saved AO v3: {path_ao}")

    # 7. Packed ORM (R=AO, G=Roughness, B=Metalness=0.0)
    print("Synthesizing Packed glTF ORM v3 (Metalness strictly 0.0)...")
    orm = np.zeros((size, size, 3), dtype=np.uint8)
    orm[:, :, 0] = (ao * 255.0).astype(np.uint8)          # R: Occlusion
    orm[:, :, 1] = (roughness * 255.0).astype(np.uint8)   # G: Roughness
    orm[:, :, 2] = 0                                      # B: Metallic == 0.0 (Pure dielectric)

    img_orm = Image.fromarray(orm)
    path_orm = os.path.join(output_dir, "canele_orm.png")
    img_orm.save(path_orm)
    print(f"Saved Packed ORM v3: {path_orm}")

    # 8. Tangent Space Normal Map
    print("Synthesizing Tangent Space Normal Map v3 (Sobel filter)...")
    # Composite micro-surface height map
    height_map = (
        flute_rib * 0.25 +
        blisters * 0.48 +
        (mid_caramel - 0.5) * 0.14 +
        (fine_porosity - 0.5) * 0.09 +
        (crater_swirl - 0.5) * crater_basin_mask * 0.22
    )

    # Sobel kernels for gradients
    sobel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=np.float32)
    sobel_y = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]], dtype=np.float32)

    from scipy.signal import convolve2d
    dx = convolve2d(height_map, sobel_x, mode='same', boundary='wrap')
    dy = convolve2d(height_map, sobel_y, mode='same', boundary='symm')

    # Normal calculation
    NORMAL_INTENSITY = 2.4
    nx = -dx * NORMAL_INTENSITY
    ny = -dy * NORMAL_INTENSITY
    nz = np.ones_like(nx)
    length = np.sqrt(nx**2 + ny**2 + nz**2)
    nx /= length
    ny /= length
    nz /= length

    normal_rgb = np.zeros((size, size, 3), dtype=np.uint8)
    normal_rgb[:, :, 0] = ((nx * 0.5 + 0.5) * 255.0).astype(np.uint8)
    normal_rgb[:, :, 1] = ((ny * 0.5 + 0.5) * 255.0).astype(np.uint8)
    normal_rgb[:, :, 2] = ((nz * 0.5 + 0.5) * 255.0).astype(np.uint8)

    img_normal = Image.fromarray(normal_rgb)
    path_normal = os.path.join(output_dir, "canele_normal.png")
    img_normal.save(path_normal)
    print(f"Saved Tangent Normal Map v3: {path_normal}")

    print("All 2K PBR Textures v3 generated successfully!")

if __name__ == "__main__":
    out_dir = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\textures"
    generate_textures_v3(out_dir)
