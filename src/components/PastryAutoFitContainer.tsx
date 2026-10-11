import React, { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import type { PastryType } from './PastryScene'

interface PastryAutoFitContainerProps {
  children: React.ReactNode
  activePastry: PastryType
}

/**
 * PastryAutoFitContainer
 * Computes the exact 3D Bounding Box (THREE.Box3) of the active model:
 * 1. Measures true bounds of the child geometry.
 * 2. Normalizes scale with uniform setScalar to preserve 100% geometric proportions (NEVER stretched or squished).
 * 3. Centers X and Z at origin (0, 0) over the stone plinth.
 * 4. Positions lowest point (min.y) to rest cleanly at the pedestal surface (y = 0.05).
 */
export const PastryAutoFitContainer: React.FC<PastryAutoFitContainerProps> = ({
  children,
  activePastry,
}) => {
  const groupRef = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    if (!groupRef.current) return

    // Reset local transforms before measuring bounding box
    groupRef.current.position.set(0, 0, 0)
    groupRef.current.scale.set(1, 1, 1)
    groupRef.current.rotation.set(0, 0, 0)
    groupRef.current.updateMatrixWorld(true)

    // Compute bounding box of child meshes
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    // Target ideal visual size: ~2.0 units maximum dimension
    const maxDimension = Math.max(size.x, size.y, size.z)
    const targetScale = maxDimension > 0 ? 2.0 / maxDimension : 1.0

    // Set uniform scalar scale to preserve exact 1:1 aspect ratio
    groupRef.current.scale.setScalar(targetScale)
    groupRef.current.updateMatrixWorld(true)

    // Recompute bounding box with uniform scale applied
    const scaledBox = new THREE.Box3().setFromObject(groupRef.current)
    const scaledCenter = new THREE.Vector3()
    scaledBox.getCenter(scaledCenter)

    // Position model so:
    // - X and Z are perfectly centered at origin
    // - Bottom rests cleanly on top of the limestone pedestal at y = 0.05
    groupRef.current.position.x = -scaledCenter.x
    groupRef.current.position.z = -scaledCenter.z
    groupRef.current.position.y = -scaledBox.min.y + 0.05
  }, [activePastry])

  return <group ref={groupRef}>{children}</group>
}
