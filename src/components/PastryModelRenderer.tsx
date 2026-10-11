import React, { Suspense } from 'react'
import { ProductionGLBModel } from './ProductionGLBModel'
import { CaneleGeometry } from './CaneleGeometry'
import { SourdoughGeometry } from './SourdoughGeometry'
import { BriocheGeometry } from './BriocheGeometry'
import type { PastryType } from './PastryScene'
import { PASTRY_CONFIGS } from '../config/pastryConfigs'

interface PastryModelRendererProps {
  activePastry: PastryType
  wireframe: boolean
}

interface ModelErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  ModelErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Model loading failed in PastryModelRenderer:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

/**
 * PastryModelRenderer:
 * Dispatches 3D models according to their declared delivery tier:
 * - Production Tier: Loads the universal ProductionGLBModel (supports Draco & WebP).
 * - Placeholder Tier: Renders explicit parametric geometry for study only.
 * - Enforces resilient ModelErrorBoundary fallbacks.
 */
export const PastryModelRenderer: React.FC<PastryModelRendererProps> = ({
  activePastry,
  wireframe,
}) => {
  const config = PASTRY_CONFIGS[activePastry]

  // Model-level fallback in case GLB loading encounters network or shader issues
  const fallbackGeometry = (
    <group>
      {activePastry === 'canele' && <CaneleGeometry wireframe={wireframe} />}
      {activePastry === 'sourdough' && <SourdoughGeometry wireframe={wireframe} />}
      {activePastry === 'brioche' && <BriocheGeometry wireframe={wireframe} />}
    </group>
  )

  return (
    <group
      scale={config.scale}
      position={config.position}
      rotation={config.rotation}
    >
      <ModelErrorBoundary fallback={fallbackGeometry}>
        <Suspense fallback={fallbackGeometry}>
          {config.tier === 'production_glb' && config.glbPath ? (
            <ProductionGLBModel
              url={config.glbPath}
              wireframe={wireframe}
              scale={[38.5, 38.5, 38.5]}
              position={[0, 0, 0]}
            />
          ) : activePastry === 'sourdough' ? (
            <SourdoughGeometry wireframe={wireframe} />
          ) : (
            <BriocheGeometry wireframe={wireframe} />
          )}
        </Suspense>
      </ModelErrorBoundary>
    </group>
  )
}
