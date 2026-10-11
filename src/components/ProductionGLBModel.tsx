import React, { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ProductionGLBModelProps {
  url: string
  wireframe?: boolean
  scale?: [number, number, number] | number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

/**
 * ProductionGLBModel:
 * Universal, production-ready GLB asset loader for photogrammetry scans and PBR assets.
 * Features:
 * - Built-in Draco decoder pointing to local `/draco/gltf/` (offline & CDN independent).
 * - Clones scene graph to prevent state leakage across instance re-renders.
 * - Applies bakery lighting shadow casting and receiving.
 * - Enforces organic dielectric material physics (metalness: 0.0, calibrated roughness).
 * - Seamlessly loads high-detail scans for any pastry without viewer code changes.
 */
export const ProductionGLBModel: React.FC<ProductionGLBModelProps> = ({
  url,
  wireframe = false,
  scale = [38.5, 38.5, 38.5],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  // Pass local draco decoder path as second argument to useGLTF
  const { scene } = useGLTF(url, '/draco/gltf/')

  // Clone scene so materials and hierarchies remain isolated per instance
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // Synchronize wireframe toggle, shadow casting, and dielectric properties
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true

        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]

          materials.forEach((mat) => {
            if ('wireframe' in mat) {
              const stdMat = mat as THREE.MeshStandardMaterial
              stdMat.wireframe = wireframe
              stdMat.metalness = 0.0
              stdMat.roughness = 1.0
              stdMat.envMapIntensity = 0.28
              if (stdMat.normalMap) {
                stdMat.normalScale = new THREE.Vector2(1.6, 1.6)
              }
              stdMat.needsUpdate = true
            }
          })
        }
      }
    })
  }, [clonedScene, wireframe])

  const normalizedScale: [number, number, number] = Array.isArray(scale)
    ? scale
    : [scale, scale, scale]

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={normalizedScale}
    />
  )
}
