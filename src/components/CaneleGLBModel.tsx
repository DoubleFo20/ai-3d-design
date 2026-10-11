import React from 'react'
import { useGLTF } from '@react-three/drei'
import { ProductionGLBModel } from './ProductionGLBModel'

interface CaneleGLBModelProps {
  wireframe?: boolean
}

const CANELE_GLB_PATH = '/models/canele.glb'

/**
 * CaneleGLBModel renders the Canelé de Bordeaux 3D asset
 * using the universal ProductionGLBModel pipeline with local Draco decoder support.
 */
export const CaneleGLBModel: React.FC<CaneleGLBModelProps> = ({
  wireframe = false,
}) => {
  return (
    <ProductionGLBModel
      url={CANELE_GLB_PATH}
      wireframe={wireframe}
      scale={[38.5, 38.5, 38.5]}
      position={[0, 0, 0]}
    />
  )
}

useGLTF.preload(CANELE_GLB_PATH, '/draco/gltf/')
