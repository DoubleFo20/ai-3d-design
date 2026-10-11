import React, { Suspense } from 'react'
import { CaneleGLBModel } from './CaneleGLBModel'
import { CaneleGeometry } from './CaneleGeometry'
import { SourdoughGeometry } from './SourdoughGeometry'
import { BriocheGeometry } from './BriocheGeometry'
import type { PastryType } from './PastryScene'
import { PASTRY_CONFIGS } from '../config/pastryConfigs'

interface PastryModelRendererProps {
  activePastry: PastryType
  wireframe: boolean
}

/**
 * PastryModelRenderer acts as an architectural abstraction layer.
 * For Canelé de Bordeaux, it loads the studio-photorealistic GLB asset
 * with full PBR textures (BaseColor, Roughness, Normal) and fallback support.
 */
export const PastryModelRenderer: React.FC<PastryModelRendererProps> = ({
  activePastry,
  wireframe,
}) => {
  const config = PASTRY_CONFIGS[activePastry]

  return (
    <group
      scale={config.scale}
      position={config.position}
      rotation={config.rotation}
    >
      <Suspense fallback={<CaneleGeometry wireframe={wireframe} />}>
        {activePastry === 'canele' && (
          <CaneleGLBModel wireframe={wireframe} />
        )}
        {activePastry === 'sourdough' && (
          <SourdoughGeometry wireframe={wireframe} />
        )}
        {activePastry === 'brioche' && (
          <BriocheGeometry wireframe={wireframe} />
        )}
      </Suspense>
    </group>
  )
}

