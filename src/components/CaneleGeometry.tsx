import React, { useMemo } from 'react'

interface CaneleProps {
  wireframe?: boolean
}

export const CaneleGeometry: React.FC<CaneleProps> = ({ wireframe = false }) => {
  // Precompute 12 radial flute positions and rotations around the canelé body
  const flutes = useMemo(() => {
    const items = []
    const count = 12
    const radius = 0.88
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      items.push({ x, z, angle, id: i })
    }
    return items
  }, [])

  return (
    <group position={[0, 0.9, 0]}>
      {/* Central slightly tapered body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.96, 1.7, 32]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#33160A'}
          roughness={wireframe ? 0.9 : 0.35}
          metalness={wireframe ? 0 : 0.08}
          wireframe={wireframe}
        />
      </mesh>

      {/* 12 Traditional fluted ridges along the outer perimeter */}
      {flutes.map((flute) => (
        <mesh
          key={flute.id}
          castShadow
          receiveShadow
          position={[flute.x, 0, flute.z]}
          rotation={[0, -flute.angle, 0]}
        >
          <cylinderGeometry args={[0.13, 0.16, 1.68, 12]} />
          <meshStandardMaterial
            color={wireframe ? '#A44B2F' : '#271006'}
            roughness={wireframe ? 0.9 : 0.32}
            metalness={wireframe ? 0 : 0.1}
            wireframe={wireframe}
          />
        </mesh>
      ))}

      {/* Top crown rim (caramelized crust collar) */}
      <mesh castShadow position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.14, 16, 32]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#451D0C'}
          roughness={wireframe ? 0.9 : 0.4}
          metalness={wireframe ? 0 : 0.06}
          wireframe={wireframe}
        />
      </mesh>

      {/* Recessed crown well (signature inverted top depression) */}
      <mesh castShadow receiveShadow position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.62, 0.45, 0.18, 24]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#220D04'}
          roughness={wireframe ? 0.9 : 0.28}
          metalness={wireframe ? 0 : 0.12}
          wireframe={wireframe}
        />
      </mesh>

      {/* Base foot bevel */}
      <mesh receiveShadow position={[0, -0.84, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.08, 16, 32]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#200B03'}
          roughness={wireframe ? 0.9 : 0.5}
          metalness={0}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  )
}
