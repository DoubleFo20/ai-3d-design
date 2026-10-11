import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

interface Editorial3DLoaderProps {
  label?: string
}

/**
 * Editorial3DLoader:
 * Refined editorial loading screen that tracks R3F/Three.js asset streaming
 * with smooth fade transitions and progress percentage.
 */
export const Editorial3DLoader: React.FC<Editorial3DLoaderProps> = ({
  label = 'PREPARING 3D ASSET',
}) => {
  const { active, progress } = useProgress()
  const [exited, setExited] = useState(!active)

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setExited(false), 0)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setExited(true), 400)
      return () => clearTimeout(timer)
    }
  }, [active])

  if (exited && !active) return null

  const displayPercent = Math.min(100, Math.round(progress))
  const isFading = !active

  return (
    <div
      className={`editorial-3d-loader ${isFading ? 'fading-out' : ''}`}
      role="progressbar"
      aria-valuenow={displayPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="3D Asset Loading"
    >
      <div className="loader-inner">
        <div className="loader-spinner-ring" aria-hidden="true" />
        <div className="loader-meta">
          <span className="loader-label">{label}</span>
          <span className="loader-percent">{displayPercent}%</span>
        </div>
        <div className="loader-bar-track">
          <div
            className="loader-bar-fill"
            style={{ width: `${displayPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
