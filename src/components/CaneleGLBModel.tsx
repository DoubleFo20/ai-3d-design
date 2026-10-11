import React, { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface CaneleGLBModelProps {
  wireframe?: boolean
}

/**
 * CaneleGLBModel loads the studio-photorealistic Canelé de Bordeaux asset
 * exported from Blender 4.2 LTS with 2K PBR Materials (BaseColor, Normal, Roughness).
 * It dynamically synchronizes wireframe mode, shadows, and material properties.
 */
export const CaneleGLBModel: React.FC<CaneleGLBModelProps> = ({
  wireframe = false,
}) => {
  const { scene } = useGLTF('/models/canele.glb')

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

  return (
    <primitive
      object={clonedScene}
      position={[0, 0, 0]}
      // Scale from meters (~0.045m real scale) to Three.js scene dimensions (~1.75 height)
      scale={[38.5, 38.5, 38.5]}
    />
  )
}

useGLTF.preload('/models/canele.glb')
