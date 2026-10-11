import React, { useRef, useLayoutEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { PastryType } from './PastryScene'

interface CameraAutoFitControllerProps {
  assemblyRef: React.RefObject<THREE.Group | null>
  controlsRef: React.RefObject<OrbitControlsImpl | null>
  activePastry: PastryType
  resetTrigger: number
}

/**
 * CameraAutoFitController:
 * 1. Measures the comprehensive 3D Bounding Box (THREE.Box3) of the assembly (model + pedestal/plate).
 * 2. Mathematically calculates camera distance and position to enclose the entire assembly
 *    with a 15–20% visual margin across any viewport aspect ratio (desktop, tablet, mobile).
 * 3. Updates OrbitControls target to the center of the bounding volume.
 * 4. Recalculates dynamically whenever the product changes or viewer size changes.
 * 5. Provides accurate Reset View restoring this mathematically ideal framing.
 */
export const CameraAutoFitController: React.FC<CameraAutoFitControllerProps> = ({
  assemblyRef,
  controlsRef,
  activePastry,
  resetTrigger,
}) => {
  const { camera, size } = useThree()
  const defaultTransform = useRef<{
    position: THREE.Vector3
    target: THREE.Vector3
  } | null>(null)

  const computeAndApplyFraming = useCallback(() => {
    if (!assemblyRef.current) return
    if (!(camera instanceof THREE.PerspectiveCamera)) return

    // Ensure all world matrices of the assembly and child meshes are updated
    assemblyRef.current.updateMatrixWorld(true)

    // Compute bounding box encompassing model + pedestal/plate
    const box = new THREE.Box3().setFromObject(assemblyRef.current)
    if (box.isEmpty()) return

    const center = new THREE.Vector3()
    box.getCenter(center)

    const sphere = new THREE.Sphere()
    box.getBoundingSphere(sphere)
    const radius = sphere.radius

    // Vertical FOV half-angle in radians
    const vFovRad = (camera.fov * Math.PI) / 360

    // Viewport aspect ratio
    const aspect = size.width / (size.height || 1)

    // Horizontal FOV half-angle in radians
    const hFovRad = Math.atan(Math.tan(vFovRad) * aspect)

    // Margin factor: calibrated so pastry is prominent and fills the viewport heroically
    // without clipping the plinth or overlapping UI badges
    const marginFactor = aspect < 1.0 ? 1.15 : 1.06

    // Calculate required camera distance for both vertical and horizontal view cones
    const distV = (radius / Math.sin(vFovRad)) * marginFactor
    const distH = (radius / Math.sin(hFovRad)) * marginFactor
    const requiredDistance = Math.max(distV, distH)

    // Editorial 3/4 perspective beauty angle direction (elevation ~28°, azimuth ~43°)
    const viewDirection = new THREE.Vector3(1.12, 0.82, 1.22).normalize()

    // Calculated camera position with calibrated headroom
    const framingTarget = center.clone()
    framingTarget.y -= 0.04 // Calibrated lower-third aesthetic center

    const camPosition = new THREE.Vector3()
      .copy(framingTarget)
      .addScaledVector(viewDirection, requiredDistance)

    // Save ideal framing transform for Reset View
    defaultTransform.current = {
      position: camPosition.clone(),
      target: framingTarget.clone(),
    }

    // Apply to camera
    camera.position.copy(camPosition)
    camera.lookAt(framingTarget)
    camera.updateProjectionMatrix()

    // Apply to OrbitControls
    if (controlsRef.current) {
      controlsRef.current.target.copy(framingTarget)
      controlsRef.current.update()
    }
  }, [assemblyRef, camera, controlsRef, size.height, size.width])

  // Recalculate whenever activePastry changes or viewer width/height changes
  useLayoutEffect(() => {
    computeAndApplyFraming()
  }, [activePastry, computeAndApplyFraming])

  // Reset view handler when resetTrigger updates
  useLayoutEffect(() => {
    if (resetTrigger === 0) return
    if (defaultTransform.current && controlsRef.current && camera instanceof THREE.PerspectiveCamera) {
      camera.position.copy(defaultTransform.current.position)
      camera.lookAt(defaultTransform.current.target)
      camera.updateProjectionMatrix()
      controlsRef.current.target.copy(defaultTransform.current.target)
      controlsRef.current.update()
    }
  }, [camera, controlsRef, resetTrigger])

  // Expose angle switcher for QA and automated multi-angle inspection
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as unknown as { __setCameraAngle: (angle: 'front' | 'top' | '45') => void }).__setCameraAngle = (
        angle: 'front' | 'top' | '45'
      ) => {
        if (!controlsRef.current || !(camera instanceof THREE.PerspectiveCamera) || !defaultTransform.current) return
        const target = defaultTransform.current.target
        const dist = camera.position.distanceTo(target)
        let dir = new THREE.Vector3(1.12, 0.82, 1.22).normalize() // 45 deg
        if (angle === 'front') {
          dir = new THREE.Vector3(0, 0.18, 1.0).normalize() // front eye-level
        } else if (angle === 'top') {
          dir = new THREE.Vector3(0.01, 0.98, 0.22).normalize() // top down into crown crater
        }
        camera.position.copy(target).addScaledVector(dir, dist)
        camera.lookAt(target)
        camera.updateProjectionMatrix()
        controlsRef.current.target.copy(target)
        controlsRef.current.update()
      }
    }
  }, [camera, controlsRef])

  return null
}
