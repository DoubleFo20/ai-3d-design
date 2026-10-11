"""
Photorealistic Canelé de Bordeaux 2K PBR Texture Generator (v4 - Dual Island Studio Photorealism)
Engineered against authentic French bakery reference photography:
- Eliminates radial pinwheel spokes by using a dedicated 2D circular disc UV island for the crown & crater
- Crater floor has organic caramelized crust pooling, blistered bubbles, and beeswax glaze
- Fluted body has organic mottling, micro-porosity, and charred foot
- Dielectric beeswax-caramel roughness calibration (0.42 - 0.85)
- Metalness strictly 0.0 everywhere
"""

import os
import math
import numpy as np
from PIL import Image
from scipy.signal import convolve2d

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

def generate_voronoi_blisters(width, height, num_cells=1200, seed=101):
    np.random.seed(seed)
    pts_x = np.random.rand(num_cells) * width
    pts_y = np.random.rand(num_cells) * height
    radii = np.random.uniform(3.0, 15.0, size=num_cells)
    
    y_coords, x_coords = np.ogrid[:height, :width]
    blister_map = np.zeros((height, width), dtype=np.float32)
    
    for i in range(num_cells):
        cx, cy, r = pts_x[i], pts_y[i], radii[i]
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
        dome = np.maximum(0.0, 1.0 - (d2 / r2)) ** 1.6
        blister_map[y0:y1, x0:x1] += dome * mask * 0.42

    return np.clip(blister_map, 0.0, 1.0)

def generate_textures_v4(output_dir, size=2048):
    os.makedirs(output_dir, exist_ok=True)
    print(f"Generating v4 Dual-Island Studio 2K Textures in: {output_dir}")

    # UV Coordinates
    u = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    v = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    U, V = np.meshgrid(u, v)

    # Color Palette: Artisanal Bordeaux caramelization (Warm honey-amber glow + espresso char)
    C_BURNT_ESPRESSO = np.array([20.0/255.0, 8.0/255.0, 3.0/255.0], dtype=np.float32)   # #140803 deep char
    C_DARK_MAHOGANY  = np.array([56.0/255.0, 24.0/255.0, 9.0/255.0], dtype=np.float32)   # #381809 rich crust
    C_ROASTED_CARAMEL= np.array([102.0/255.0, 45.0/255.0, 16.0/255.0], dtype=np.float32) # #662D10 caramel flanks
    C_WARM_HONEY_VAL = np.array([152.0/255.0, 72.0/255.0, 24.0/255.0], dtype=np.float32) # #984818 honey valleys
    C_BEESWAX_AMBER  = np.array([192.0/255.0, 96.0/255.0, 32.0/255.0], dtype=np.float32) # #C06020 beeswax blister sheen

    # Noise maps across the entire 2K canvas
    macro_mottling = generate_noise_2d(size, size, scale=240.0, octaves=4, persistence=0.55, seed=42)
    mid_caramel = generate_noise_2d(size, size, scale=60.0, octaves=4, persistence=0.5, seed=128)
    fine_porosity = generate_noise_2d(size, size, scale=12.0, octaves=3, persistence=0.6, seed=88)
    blisters = generate_voronoi_blisters(size, size, num_cells=1300, seed=303)

    # ----------------------------------------------------
    # ISLAND 1: Fluted Body (V in [0.0, 0.62])
    # ----------------------------------------------------
    # Normalized height along body: V_body = V / 0.60
    V_body = np.clip(V / 0.60, 0.0, 1.0)
    base_foot_mask = np.clip(1.0 - (V_body / 0.12), 0.0, 1.0) ** 1.6
    shoulder_top_mask = np.clip((V_body - 0.88) / 0.12, 0.0, 1.0)

    NUM_FLUTES = 12
    flute_wave_offset = generate_noise_2d(size, size, scale=280.0, octaves=3, persistence=0.5, seed=77) * 0.03
    flute_phase = 2.0 * np.pi * NUM_FLUTES * (U + flute_wave_offset)
    cos_12 = np.cos(flute_phase)
    flute_rib = np.clip((cos_12 + 0.25) / 1.25, 0.0, 1.0)
    flute_valley = 1.0 - flute_rib

    body_valley_blend = flute_valley * 0.65 + (macro_mottling - 0.5) * 0.35 + (mid_caramel - 0.5) * 0.15
    body_valley_blend = np.clip(body_valley_blend, 0.0, 1.0)

    body_rgb = np.zeros((size, size, 3), dtype=np.float32)
    for c in range(3):
        ch = C_DARK_MAHOGANY[c] * (1.0 - body_valley_blend) + C_ROASTED_CARAMEL[c] * body_valley_blend
        ch += C_WARM_HONEY_VAL[c] * (flute_valley ** 2.0) * 0.30
        ch += C_BEESWAX_AMBER[c] * blisters * 0.18
        # Scorched foot
        ch = ch * (1.0 - base_foot_mask * 0.88) + C_BURNT_ESPRESSO[c] * (base_foot_mask * 0.88)
        # Scorched top shoulder
        ch = ch * (1.0 - shoulder_top_mask * 0.70) + C_BURNT_ESPRESSO[c] * (shoulder_top_mask * 0.70)
        # Detail adjustments
        ch -= blisters * 0.035
        ch += (fine_porosity - 0.5) * 0.025
        body_rgb[:, :, c] = np.clip(ch, 0.0, 1.0)

    # ----------------------------------------------------
    # ISLAND 2: Crown Rim & Crater Floor (Circular Disc at U=0.5, V=0.815, Radius=0.165)
    # ----------------------------------------------------
    disc_cx, disc_cy, disc_r = 0.50, 0.815, 0.165
    dx = (U - disc_cx) / disc_r
    dy = (V - disc_cy) / disc_r
    r_disc = np.sqrt(dx**2 + dy**2)
    angle_disc = np.arctan2(dy, dx)

    # 12-lobed crown rim along disc circumference
    cos_crown_12 = np.cos(NUM_FLUTES * angle_disc)
    crown_lobe_rib = np.clip((cos_crown_12 + 0.25) / 1.25, 0.0, 1.0)
    
    # Crater center depression mask (r_disc < 0.60)
    crater_floor_mask = np.clip((0.65 - r_disc) / 0.35, 0.0, 1.0)
    crown_rim_zone = np.clip((r_disc - 0.50) / 0.50, 0.0, 1.0) * np.clip((1.15 - r_disc) / 0.15, 0.0, 1.0)

    # Organic swirling caramelized beeswax crust on crater floor
    crater_swirl = generate_noise_2d(size, size, scale=90.0, octaves=4, persistence=0.6, seed=999)
    crater_mottling = generate_noise_2d(size, size, scale=180.0, octaves=3, persistence=0.5, seed=444)

    crater_rgb = np.zeros((size, size, 3), dtype=np.float32)
    for c in range(3):
        # Base crown tone: rich mahogany
        ch = C_DARK_MAHOGANY[c]
        # Valleys on crown rim
        ch = ch * (1.0 - (1.0 - crown_lobe_rib) * 0.35 * crown_rim_zone) + C_ROASTED_CARAMEL[c] * ((1.0 - crown_lobe_rib) * 0.35 * crown_rim_zone)
        # Deep charred crater basin floor
        basin_char = crater_floor_mask * (0.65 + crater_swirl * 0.30)
        ch = ch * (1.0 - basin_char) + C_BURNT_ESPRESSO[c] * basin_char
        # Caramel puddles in crater
        ch += C_WARM_HONEY_VAL[c] * crater_floor_mask * (crater_mottling > 0.55).astype(np.float32) * 0.20
        # Beeswax blisters
        ch += C_BEESWAX_AMBER[c] * blisters * 0.16
        ch -= blisters * 0.03
        ch += (fine_porosity - 0.5) * 0.02
        crater_rgb[:, :, c] = np.clip(ch, 0.0, 1.0)

    # Composite the two islands
    # V < 0.62 is Body, V >= 0.62 uses Crown Disc
    is_disc_area = (r_disc <= 1.25) & (V >= 0.58)
    basecolor_rgb = np.where(is_disc_area[:, :, None], crater_rgb, body_rgb)

    # Add micro-char specks
    np.random.seed(888)
    char_specks = (np.random.rand(size, size) > 0.994).astype(np.float32)
    char_blur = np.array(Image.fromarray(char_specks).resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    for c in range(3):
        basecolor_rgb[:, :, c] = basecolor_rgb[:, :, c] * (1.0 - char_blur * 0.70) + (C_BURNT_ESPRESSO[c] * 0.6) * char_blur

    # Save BaseColor
    img_bc = Image.fromarray((basecolor_rgb * 255.0).astype(np.uint8))
    path_bc = os.path.join(output_dir, "canele_basecolor.png")
    img_bc.save(path_bc, quality=98)
    print(f"Saved BaseColor v4: {path_bc}")

    # Roughness Map
    # Body roughness
    body_rough = 0.74 - (flute_valley * 0.22) + (macro_mottling - 0.5) * 0.12
    body_rough += (blisters - 0.3) * 0.08 + base_foot_mask * 0.12 + shoulder_top_mask * 0.08
    body_rough = np.clip(body_rough, 0.42, 0.86)

    # Crater roughness (waxier pools, matte charred spots)
    crater_rough = 0.62 - (crater_floor_mask * 0.15) + (crater_swirl - 0.5) * 0.15 + (blisters - 0.3) * 0.08
    crater_rough += (basin_char * 0.12)
    crater_rough = np.clip(crater_rough, 0.42, 0.86)

    roughness = np.where(is_disc_area, crater_rough, body_rough)
    img_rough = Image.fromarray((roughness * 255.0).astype(np.uint8))
    path_rough = os.path.join(output_dir, "canele_roughness.png")
    img_rough.save(path_rough)
    print(f"Saved Roughness v4: {path_rough}")

    # AO Map
    body_ao = 1.0 - (flute_valley * 0.32) - (base_foot_mask * 0.25)
    crater_ao = 1.0 - (crater_floor_mask * 0.40) - ((1.0 - crown_lobe_rib) * 0.20 * crown_rim_zone)
    ao = np.where(is_disc_area, crater_ao, body_ao)
    ao = np.clip(ao, 0.45, 1.0)
    img_ao = Image.fromarray((ao * 255.0).astype(np.uint8))
    path_ao = os.path.join(output_dir, "canele_ao.png")
    img_ao.save(path_ao)
    print(f"Saved AO v4: {path_ao}")

    # Packed ORM (R=AO, G=Roughness, B=0.0)
    orm = np.zeros((size, size, 3), dtype=np.uint8)
    orm[:, :, 0] = (ao * 255.0).astype(np.uint8)
    orm[:, :, 1] = (roughness * 255.0).astype(np.uint8)
    orm[:, :, 2] = 0 # Strictly 0.0 Metalness (Dielectric Pastry)

    img_orm = Image.fromarray(orm)
    path_orm = os.path.join(output_dir, "canele_orm.png")
    img_orm.save(path_orm)
    print(f"Saved Packed ORM v4: {path_orm}")

    # Tangent Space Normal Map
    height_map = (
        flute_rib * 0.25 +
        blisters * 0.48 +
        (mid_caramel - 0.5) * 0.14 +
        (fine_porosity - 0.5) * 0.09
    )
    sobel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=np.float32)
    sobel_y = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]], dtype=np.float32)
    dx = convolve2d(height_map, sobel_x, mode='same', boundary='wrap')
    dy = convolve2d(height_map, sobel_y, mode='same', boundary='symm')

    NORMAL_INTENSITY = 2.2
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
    print(f"Saved Tangent Normal Map v4: {path_normal}")
    print("All v4 2K PBR Textures generated successfully!")

if __name__ == "__main__":
    out_dir = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\textures"
    generate_textures_v4(out_dir)
