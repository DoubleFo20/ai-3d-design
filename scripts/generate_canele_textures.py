"""
Photorealistic Canelé de Bordeaux 2K PBR Texture Map Generator
Generates studio-quality PBR maps:
- canele_basecolor.png (2048x2048)
- canele_roughness.png (2048x2048)
- canele_normal.png (2048x2048)
- canele_ao.png (2048x2048)
"""

import os
import math
import numpy as np
from PIL import Image

def generate_noise_2d(width, height, scale, octaves=4, persistence=0.5):
    """Generate multi-octave coherent noise using vector math"""
    total = np.zeros((height, width), dtype=np.float32)
    frequency = 1.0 / scale
    amplitude = 1.0
    max_val = 0.0

    for _ in range(octaves):
        # Create grid with random phase
        np.random.seed(42 + _)
        gw = max(2, int(width * frequency))
        gh = max(2, int(height * frequency))
        rand_grid = np.random.rand(gh, gw).astype(np.float32)
        
        # Bilinear upsample to target resolution
        img = Image.fromarray(rand_grid)
        upsampled = np.array(img.resize((width, height), Image.Resampling.BICUBIC), dtype=np.float32)
        
        total += upsampled * amplitude
        max_val += amplitude
        amplitude *= persistence
        frequency *= 2.0

    return total / max_val

def generate_canele_textures(output_dir, size=2048):
    os.makedirs(output_dir, exist_ok=True)
    print(f"Generating 2K PBR textures ({size}x{size}) in: {output_dir}")

    # UV grid: u across width (0..1), v across height (0..1)
    u = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    v = np.linspace(0.0, 1.0, size, endpoint=False, dtype=np.float32)
    U, V = np.meshgrid(u, v)

    # 1. Flute harmonic coordinates (12 flutes)
    NUM_FLUTES = 12
    flute_phase = 2.0 * np.pi * NUM_FLUTES * U
    cos_flute = np.cos(flute_phase)
    # Flute valley is where cos_flute is near -1, ridge is near +1
    flute_valley_factor = np.clip((-cos_flute + 1.0) * 0.5, 0.0, 1.0)
    flute_ridge_factor = np.clip((cos_flute + 1.0) * 0.5, 0.0, 1.0)

    # 2. Vertical zones
    # V: 0 = base, ~0.88 = shoulder, 1.0 = crown center
    base_mask = np.clip(1.0 - (V / 0.06), 0.0, 1.0)
    shoulder_mask = np.clip((V - 0.85) / 0.08, 0.0, 1.0) * np.clip((0.95 - V) / 0.08 + 1.0, 0.0, 1.0)
    crown_mask = np.clip((V - 0.92) / 0.08, 0.0, 1.0)
    body_mask = np.clip((V - 0.04) / 0.04, 0.0, 1.0) * np.clip((0.92 - V) / 0.06, 0.0, 1.0)

    # 3. Procedural Noise Layers
    print("Computing noise layers...")
    macro_swirl = generate_noise_2d(size, size, scale=280.0, octaves=4, persistence=0.55)
    micro_blisters = generate_noise_2d(size, size, scale=24.0, octaves=3, persistence=0.6)
    fissure_noise = generate_noise_2d(size, size, scale=70.0, octaves=4, persistence=0.5)

    # 4. Color Synthesis (Caramelization & Burnt Sugar)
    print("Synthesizing BaseColor map...")
    # Palette definition (normalized 0..1):
    # C_DEEP_CHAR: Deepest charred foot & rim (#180803)
    c_deep_char = np.array([24.0/255.0, 8.0/255.0, 3.0/255.0], dtype=np.float32)
    # C_DARK_CRUST: Dark caramelized crust on ridges (#361507)
    c_dark_crust = np.array([54.0/255.0, 21.0/255.0, 7.0/255.0], dtype=np.float32)
    # C_MAHOGANY: Warm mahogany body (#5E260D)
    c_mahogany = np.array([94.0/255.0, 38.0/255.0, 13.0/255.0], dtype=np.float32)
    # C_AMBER_CARAMEL: Lighter amber caramel in valleys (#8D4018)
    c_amber_caramel = np.array([141.0/255.0, 64.0/255.0, 24.0/255.0], dtype=np.float32)
    # C_HONEY_GLAZE: Beeswax honey glaze highlights (#B85E26)
    c_honey_glaze = np.array([184.0/255.0, 94.0/255.0, 38.0/255.0], dtype=np.float32)

    # Blend body color based on flute valleys vs ridges + macro swirl
    body_blend = flute_valley_factor * 0.65 + macro_swirl * 0.35
    body_color = np.zeros((size, size, 3), dtype=np.float32)
    for c in range(3):
        # Valleys get warmer amber caramel, ridges get darker mahogany
        flute_color_ch = c_dark_crust[c] * (1.0 - body_blend) + c_amber_caramel[c] * body_blend
        # Add subtle honey glaze in deep recesses
        honey_accent = c_honey_glaze[c] * (flute_valley_factor ** 2) * 0.2
        body_color[:, :, c] = flute_color_ch + honey_accent

    # Apply base foot burn and crown darkening
    base_burn_weight = (base_mask ** 1.5) * 0.85
    crown_burn_weight = (crown_mask ** 1.2) * 0.75 + (shoulder_mask * 0.35)

    basecolor_rgb = np.zeros((size, size, 3), dtype=np.float32)
    for c in range(3):
        col = body_color[:, :, c]
        # Darken base
        col = col * (1.0 - base_burn_weight) + c_deep_char[c] * base_burn_weight
        # Darken crown
        col = col * (1.0 - crown_burn_weight) + c_deep_char[c] * crown_burn_weight
        # Add micro blister variation
        col += (micro_blisters - 0.5) * 0.06 * (1.0 - crown_burn_weight * 0.5)
        basecolor_rgb[:, :, c] = np.clip(col, 0.0, 1.0)

    # Add scattered tiny char specks
    np.random.seed(101)
    speck_mask = (np.random.rand(size, size) > 0.992).astype(np.float32)
    speck_blur = Image.fromarray(speck_mask).resize((size, size), Image.Resampling.BILINEAR)
    specks = np.clip(np.array(speck_blur, dtype=np.float32) * 2.5, 0.0, 1.0)
    for c in range(3):
        basecolor_rgb[:, :, c] = basecolor_rgb[:, :, c] * (1.0 - specks * 0.75) + (c_deep_char[c] * 0.5) * specks

    basecolor_img = Image.fromarray((basecolor_rgb * 255.0).astype(np.uint8))
    basecolor_path = os.path.join(output_dir, "canele_basecolor.png")
    basecolor_img.save(basecolor_path, quality=95)
    print(f"Saved BaseColor: {basecolor_path}")

    # 5. Roughness Map Synthesis (Non-uniform beeswax & crust sheen)
    print("Synthesizing Roughness map...")
    # Valleys (beeswax/sugar pooling) = glossy (~0.30 - 0.38)
    # Ridges (baked crust) = satiny/matte (~0.58 - 0.70)
    # Base and crown = baked crisp (~0.65 - 0.78)
    roughness = 0.62 - (flute_valley_factor * 0.28) + (macro_swirl - 0.5) * 0.15
    roughness += (micro_blisters - 0.5) * 0.08
    roughness += base_burn_weight * 0.12 + crown_burn_weight * 0.10
    roughness = np.clip(roughness, 0.25, 0.85)

    roughness_img = Image.fromarray((roughness * 255.0).astype(np.uint8))
    roughness_path = os.path.join(output_dir, "canele_roughness.png")
    roughness_img.save(roughness_path)
    print(f"Saved Roughness: {roughness_path}")

    # 6. Ambient Occlusion (AO) Synthesis
    print("Synthesizing Ambient Occlusion map...")
    ao = 1.0 - (flute_valley_factor * 0.35) - (crown_mask * 0.40) + (micro_blisters - 0.5) * 0.04
    ao = np.clip(ao, 0.25, 1.0)
    ao_img = Image.fromarray((ao * 255.0).astype(np.uint8))
    ao_path = os.path.join(output_dir, "canele_ao.png")
    ao_img.save(ao_path)
    print(f"Saved AO: {ao_path}")

    # 7. Normal Map Synthesis (Tangent Space Sobel filter)
    print("Synthesizing Tangent Normal map...")
    # Height map from flutes + micro blisters + fissures
    height_map = (cos_flute * 0.35) + (micro_blisters * 0.25) + (fissure_noise * 0.15)
    
    # Sobel gradients
    gx = np.zeros_like(height_map)
    gy = np.zeros_like(height_map)
    gx[:, 1:-1] = (height_map[:, 2:] - height_map[:, :-2]) * 0.5
    gy[1:-1, :] = (height_map[2:, :] - height_map[:-2, :]) * 0.5
    
    # Scale bump strength
    bump_strength = 2.4
    norm_x = -gx * bump_strength
    norm_y = -gy * bump_strength
    norm_z = np.ones_like(height_map)
    
    # Normalize vectors
    len_n = np.sqrt(norm_x**2 + norm_y**2 + norm_z**2)
    norm_x /= len_n
    norm_y /= len_n
    norm_z /= len_n

    # Convert to RGB [0..255]
    r_ch = ((norm_x * 0.5 + 0.5) * 255.0).astype(np.uint8)
    g_ch = ((norm_y * 0.5 + 0.5) * 255.0).astype(np.uint8)
    b_ch = ((norm_z * 0.5 + 0.5) * 255.0).astype(np.uint8)

    normal_rgb = np.stack([r_ch, g_ch, b_ch], axis=-1)
    normal_img = Image.fromarray(normal_rgb)
    normal_path = os.path.join(output_dir, "canele_normal.png")
    normal_img.save(normal_path)
    print(f"Saved Normal: {normal_path}")

    print("All 2K PBR texture maps generated successfully!")

if __name__ == "__main__":
    out_dir = r"D:\xampp\htdocs\Ai\Ai-test1\atelier-3d\public\models\textures"
    generate_canele_textures(out_dir, size=2048)
