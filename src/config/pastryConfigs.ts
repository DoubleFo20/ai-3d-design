import type { PastryType } from '../components/PastryScene'

export type AssetDeliveryTier = 'production_glb' | 'procedural_placeholder'
export type ModelSourceType = 'blender_pbr_v4' | 'threejs_procedural' | 'photogrammetry_scan' | 'licensed_glb'

export interface AssetValidationSpec {
  maxFileSizeMb: number
  targetTriangles: number
  maxTriangles: number
  requiredTextures: ('baseColor' | 'normal' | 'orm' | 'roughness')[]
  maxTextureDimension: number
  dielectricOnly: boolean
}

export interface PastryModelConfig {
  id: PastryType
  name: string
  /**
   * Delivery Tier clearly distinguishes active production GLB assets
   * from procedural geometry placeholders awaiting physical 3D scans.
   */
  tier: AssetDeliveryTier
  sourceType: ModelSourceType
  /**
   * Relative path to the production GLB asset in /public
   */
  glbPath?: string
  /**
   * Designated intake slot for incoming Photogrammetry / 3D Scan / Licensed asset
   */
  scanIntakeSlot: string
  /**
   * Ground-truth fidelity assessment (no false claims of 90-100% photorealism)
   */
  fidelityAssessment: {
    statusNote: string
    estimatedVisualFidelity: string // e.g. '~85% Photorealistic Approximation'
    limitations: string[]
  }
  validationSpec: AssetValidationSpec
  scale?: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export const PASTRY_CONFIGS: Record<PastryType, PastryModelConfig> = {
  canele: {
    id: 'canele',
    name: 'Canelé de Bordeaux',
    tier: 'production_glb',
    sourceType: 'blender_pbr_v4',
    glbPath: '/models/canele.glb',
    scanIntakeSlot: '/models/production/canele_scan.glb',
    fidelityAssessment: {
      statusNote: 'Interim Production Asset (Engineered Blender 4.2 LTS PBR Model)',
      estimatedVisualFidelity: '~85% Photorealistic Approximation',
      limitations: [
        'Pure procedural/subdivision mesh cannot simulate true sub-millimeter (<0.1mm) baked batter micro-fissures',
        'Lacks natural gravitational batter sag occurred during copper mold baking',
        'Awaiting high-resolution photogrammetry / optical 3D scan of physical baked sample',
      ],
    },
    validationSpec: {
      maxFileSizeMb: 5.0,
      targetTriangles: 65_000,
      maxTriangles: 120_000,
      requiredTextures: ['baseColor', 'normal', 'orm'],
      maxTextureDimension: 2048,
      dielectricOnly: true,
    },
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  sourdough: {
    id: 'sourdough',
    name: 'Pain au Levain',
    tier: 'procedural_placeholder',
    sourceType: 'threejs_procedural',
    scanIntakeSlot: '/models/production/sourdough_scan.glb',
    fidelityAssessment: {
      statusNote: 'Procedural Concept Placeholder (Parametric Three.js Geometry)',
      estimatedVisualFidelity: 'Parametric Wireframe/Form Study Only (Non-Photorealistic)',
      limitations: [
        'Procedural ellipsoid with sine-wave ear score; not an authentic crumb or crust scan',
        'Phase 2D rule strictly forbids continuing procedural geometry iterations for Sourdough',
        'Intake slot reserved for licensed photogrammetry scan GLB',
      ],
    },
    validationSpec: {
      maxFileSizeMb: 6.0,
      targetTriangles: 80_000,
      maxTriangles: 150_000,
      requiredTextures: ['baseColor', 'normal', 'orm'],
      maxTextureDimension: 2048,
      dielectricOnly: true,
    },
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  brioche: {
    id: 'brioche',
    name: 'Brioche Tressée',
    tier: 'procedural_placeholder',
    sourceType: 'threejs_procedural',
    scanIntakeSlot: '/models/production/brioche_scan.glb',
    fidelityAssessment: {
      statusNote: 'Procedural Concept Placeholder (Parametric Three.js Geometry)',
      estimatedVisualFidelity: 'Parametric Wireframe/Form Study Only (Non-Photorealistic)',
      limitations: [
        'Procedural 6-strand braid torus approximation; not an authentic baked brioche scan',
        'Phase 2D rule strictly forbids continuing procedural geometry iterations for Brioche',
        'Intake slot reserved for licensed photogrammetry scan GLB',
      ],
    },
    validationSpec: {
      maxFileSizeMb: 6.0,
      targetTriangles: 80_000,
      maxTriangles: 150_000,
      requiredTextures: ['baseColor', 'normal', 'orm'],
      maxTextureDimension: 2048,
      dielectricOnly: true,
    },
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
}
