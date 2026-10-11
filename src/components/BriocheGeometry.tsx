import React, { useMemo } from 'react'

interface BriocheProps {
  wireframe?: boolean
}

export const BriocheGeometry: React.FC<BriocheProps> = ({ wireframe = false }) => {
  // Precompute 6 petal-like pull-apart brioche bun nodes in a ring plus central rosette
  const bunNodes = useMemo(() => {
    const nodes = []
    const count = 6
    const radius = 0.76
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      nodes.push({ x, z, angle, id: i })
    }
    return nodes
  }, [])

  // Scattered pearl sugar crystals
  const sugarCrystals = useMemo(() => {
    const crystals = []
    const count = 16
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + 0.2
      const r = 0.65 + ((i % 3) * 0.1)
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r
      const y = 0.82 + ((i % 2) * 0.08)
      crystals.push({ x, y, z, id: i })
    }
    return crystals
  }, [])

  return (
    <group position={[0, 0.65, 0]}>
      {/* Central brioche rosette knot */}
      <mesh castShadow receiveShadow position={[0, 0.28, 0]} scale={[1, 0.85, 1]}>
        <sphereGeometry args={[0.54, 24, 20]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#CF7E24'}
          roughness={wireframe ? 0.9 : 0.26}
          metalness={0.04}
          wireframe={wireframe}
        />
      </mesh>

      {/* 6 Peripheral interlocking braided buns */}
      {bunNodes.map((node) => (
        <mesh
          key={node.id}
          castShadow
          receiveShadow
          position={[node.x, 0.18, node.z]}
          scale={[0.9, 0.78, 0.9]}
        >
          <sphereGeometry args={[0.48, 24, 20]} />
          <meshStandardMaterial
            color={wireframe ? '#A44B2F' : '#DA8B29'}
            roughness={wireframe ? 0.9 : 0.24}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>
      ))}

      {/* Intertwining braided tension ring */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.12, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.72, 0.22, 16, 32]} />
        <meshStandardMaterial
          color={wireframe ? '#A44B2F' : '#9E5616'}
          roughness={wireframe ? 0.9 : 0.38}
          metalness={0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Pearl sugar crystal accents */}
      {!wireframe &&
        sugarCrystals.map((crystal) => (
          <mesh key={crystal.id} position={[crystal.x, crystal.y, crystal.z]}>
            <dodecahedronGeometry args={[0.04, 0]} />
            <meshStandardMaterial
              color="#FFF9ED"
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>
        ))}
    </group>
  )
}
