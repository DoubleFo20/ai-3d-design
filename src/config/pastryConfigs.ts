import type { PastryType } from '../components/PastryScene'

export interface PastryModelConfig {
  id: PastryType
  name: string
  /**
   * Future GLB file path (e.g., '/models/canele.glb').
   * In Phase 1, procedural Three.js geometries are rendered as high-fidelity placeholders.
   * When GLB assets become available in Phase 2, this path will seamlessly activate GLB rendering.
   */
  glbPath?: string
  scale?: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export const PASTRY_CONFIGS: Record<PastryType, PastryModelConfig> = {
  canele: {
    id: 'canele',
    name: 'Canelé de Bordeaux',
    glbPath: '/models/canele.glb',
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  sourdough: {
    id: 'sourdough',
    name: 'Pain au Levain',
    // glbPath: '/models/sourdough.glb',
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  brioche: {
    id: 'brioche',
    name: 'Brioche Tressée',
    // glbPath: '/models/brioche.glb',
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
}
