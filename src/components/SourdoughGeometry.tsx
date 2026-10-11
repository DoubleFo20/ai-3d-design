import React from 'react'

interface SourdoughProps {
  wireframe?: boolean
}

export const SourdoughGeometry: React.FC<SourdoughProps> = ({ wireframe = false }) => {
  return (
    <group position={[0, 0.75, 0]}>
      {/* Main rustic sourdough boule body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} scale={[1.35, 0.82, 1.3]}>
        <sphereGeometry args={[1.15, 36, 24]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#AC662E'}
          roughness={wireframe ? 0.9 : 0.78}
          metalness={0.02}
          wireframe={wireframe}
        />
      </mesh>

      {/* Deep toasted bottom hearth crust */}
      <mesh receiveShadow position={[0, -0.42, 0]} scale={[1.3, 0.45, 1.25]}>
        <cylinderGeometry args={[1.05, 0.92, 0.35, 32]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#5C2D13'}
          roughness={wireframe ? 0.9 : 0.85}
          metalness={0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Artisanal baker's ear / scoring incision (grigne) */}
      <mesh
        castShadow
        position={[0.1, 0.58, 0.05]}
        rotation={[0.3, 0.4, -0.2]}
        scale={[1.1, 0.6, 0.9]}
      >
        <torusGeometry args={[0.75, 0.11, 16, 32, Math.PI * 0.75]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#E2A25D'}
          roughness={wireframe ? 0.9 : 0.65}
          metalness={0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Secondary scoring expansion seam */}
      <mesh
        position={[0.12, 0.52, 0.08]}
        rotation={[0.3, 0.4, -0.2]}
        scale={[1.05, 0.5, 0.85]}
      >
        <torusGeometry args={[0.72, 0.07, 12, 24, Math.PI * 0.7]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#3E1B09'}
          roughness={wireframe ? 0.9 : 0.82}
          metalness={0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Stoneground flour dusting layer over crown */}
      {!wireframe && (
        <mesh position={[0, 0.45, 0]} scale={[1.28, 0.45, 1.22]}>
          <sphereGeometry args={[1.1, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.38]} />
          <meshStandardMaterial
            color="#F7F1E5"
            roughness={0.96}
            metalness={0}
            transparent
            opacity={0.72}
          />
        </mesh>
      )}
    </group>
  )
}
