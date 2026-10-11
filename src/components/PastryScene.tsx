import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Float,
  ContactShadows,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { PastryModelRenderer } from './PastryModelRenderer'
import { CameraAutoFitController } from './CameraAutoFitController'
import { WebGLFallback } from './WebGLFallback'
import type { Translations } from '../i18n/translations'

export type PastryType = 'canele' | 'sourdough' | 'brioche'

interface PastrySceneProps {
  activePastry: PastryType
  onSelectPastry: (type: PastryType) => void
  t: Translations
}

// Check if WebGL is supported in the browser
function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return Boolean(gl && gl instanceof WebGLRenderingContext)
  } catch {
    return false
  }
}

// ErrorBoundary for Canvas
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('Canvas 3D rendering error caught by boundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Deterministic ambient floating bakery flour motes
const STATIC_MOTES = [
  { x: -1.8, y: 1.2, z: 1.4, scale: 0.022, speed: 1.1, id: 0 },
  { x: 1.5, y: 2.1, z: -1.2, scale: 0.018, speed: 0.9, id: 1 },
  { x: -0.7, y: 0.8, z: 2.0, scale: 0.025, speed: 1.3, id: 2 },
  { x: 2.2, y: 1.6, z: 0.8, scale: 0.016, speed: 1.0, id: 3 },
  { x: -1.4, y: 2.5, z: -1.6, scale: 0.028, speed: 1.2, id: 4 },
  { x: 0.9, y: 1.1, z: 1.8, scale: 0.019, speed: 0.85, id: 5 },
  { x: -2.1, y: 1.9, z: 0.3, scale: 0.024, speed: 1.15, id: 6 },
  { x: 1.8, y: 2.7, z: 1.5, scale: 0.017, speed: 0.95, id: 7 },
  { x: 0.4, y: 0.9, z: -2.1, scale: 0.026, speed: 1.4, id: 8 },
  { x: -0.9, y: 2.3, z: -0.8, scale: 0.021, speed: 1.05, id: 9 },
  { x: 1.2, y: 1.4, z: -1.7, scale: 0.023, speed: 1.25, id: 10 },
  { x: -1.6, y: 0.7, z: 1.1, scale: 0.018, speed: 0.9, id: 11 },
  { x: 2.0, y: 2.2, z: -0.5, scale: 0.027, speed: 1.35, id: 12 },
  { x: 0.2, y: 2.8, z: 1.9, scale: 0.02, speed: 1.1, id: 13 },
  { x: -2.4, y: 1.5, z: -1.1, scale: 0.022, speed: 1.0, id: 14 },
]

function FlourMotes() {
  return (
    <group>
      {STATIC_MOTES.map((mote) => (
        <Float
          key={mote.id}
          speed={mote.speed}
          rotationIntensity={0.5}
          floatIntensity={1.2}
          position={[mote.x, mote.y, mote.z]}
        >
          <mesh>
            <sphereGeometry args={[mote.scale, 8, 8]} />
            <meshBasicMaterial
              color="#F8EFE0"
              transparent
              opacity={0.35}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Limestone architectural presentation pedestal plate
function Pedestal({ wireframe }: { wireframe: boolean }) {
  const radius = 1.65
  return (
    <group position={[0, -0.05, 0]}>
      {/* Honed stone plinth */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius * 1.02, 0.08, 64]} />
        <meshStandardMaterial
          color={wireframe ? '#B8B2A5' : '#E8E2D5'}
          roughness={0.92}
          metalness={0.02}
          wireframe={wireframe}
        />
      </mesh>

      {/* Subtle brass edge inlay */}
      <mesh position={[0, 0.042, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.98, 0.008, 16, 64]} />
        <meshStandardMaterial
          color="#C2945D"
          roughness={0.35}
          metalness={0.65}
        />
      </mesh>

      {/* Inner circular demarcation ring */}
      <mesh position={[0, 0.042, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.65, 0.005, 16, 64]} />
        <meshStandardMaterial
          color="#25231F"
          transparent
          opacity={0.25}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

export const PastryScene: React.FC<PastrySceneProps> = ({
  activePastry,
  onSelectPastry,
  t,
}) => {
  const [hasWebGL] = useState(() => isWebGLSupported())
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)

  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const assemblyRef = useRef<THREE.Group | null>(null)

  const handleResetCamera = () => {
    setResetTrigger((prev) => prev + 1)
  }

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  if (!hasWebGL) {
    return <WebGLFallback message="WebGL support is disabled or unavailable. Showing static architectural blueprint." />
  }

  return (
    <div className="scene-wrapper" onPointerDown={handleInteraction}>
      {/* 3D Model Selector Tabs */}
      <div className="scene-pastry-tabs" role="tablist" aria-label="Select 3D Pastry Geometry">
        <button
          type="button"
          role="tab"
          aria-selected={activePastry === 'canele'}
          className={`tab-btn ${activePastry === 'canele' ? 'active' : ''}`}
          onClick={() => onSelectPastry('canele')}
        >
          <span className="tab-num">01</span>
          <span className="tab-title">{t.tabs.canele}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activePastry === 'sourdough'}
          className={`tab-btn ${activePastry === 'sourdough' ? 'active' : ''}`}
          onClick={() => onSelectPastry('sourdough')}
        >
          <span className="tab-num">02</span>
          <span className="tab-title">{t.tabs.sourdough}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activePastry === 'brioche'}
          className={`tab-btn ${activePastry === 'brioche' ? 'active' : ''}`}
          onClick={() => onSelectPastry('brioche')}
        >
          <span className="tab-num">03</span>
          <span className="tab-title">{t.tabs.brioche}</span>
        </button>
      </div>

      {/* Mandatory Prototype / Production Asset Badge */}
      <div className="scene-disclaimer-badge">
        <div className="badge-pulse-dot" aria-hidden="true" />
        <div className="badge-text-group">
          <span className="badge-primary-text">
            {activePastry === 'canele'
              ? t.viewer.caneleAssetTitle
              : t.viewer.disclaimerTitle}
          </span>
          <span className="badge-secondary-text">
            {activePastry === 'canele'
              ? t.viewer.caneleAssetSub
              : t.viewer.disclaimerSub}
          </span>
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="canvas-container">
        <CanvasErrorBoundary
          fallback={<WebGLFallback message="Failed to initialize 3D context." />}
        >
          <Canvas
            shadows={{ type: THREE.PCFShadowMap }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.05,
            }}
          >
            {/* Base perspective camera */}
            <PerspectiveCamera makeDefault fov={40} position={[3.5, 2.8, 4.5]} />

            {/* Dynamic Camera Auto-Fit Controller (Model + Pedestal assembly framing) */}
            <CameraAutoFitController
              assemblyRef={assemblyRef}
              controlsRef={controlsRef}
              activePastry={activePastry}
              resetTrigger={resetTrigger}
            />

            {/* Bakery Studio Lighting */}
            <ambientLight intensity={1.15} color="#FFF6EC" />

            {/* Hearth Sun / Main Key Light */}
            <directionalLight
              castShadow
              position={[4.5, 7.5, 3.5]}
              intensity={2.1}
              color="#FFEAD4"
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.5}
              shadow-camera-far={18}
              shadow-camera-left={-3}
              shadow-camera-right={3}
              shadow-camera-top={3}
              shadow-camera-bottom={-3}
              shadow-bias={-0.0005}
            />

            {/* Soft Warm Bread-Oven Fill Light (No cold steel reflections) */}
            <directionalLight
              position={[-4.0, 3.5, -2.5]}
              intensity={0.65}
              color="#F8EADB"
            />

            {/* Warm Caramel Rim Light */}
            <pointLight
              position={[0, -0.5, 3.2]}
              intensity={1.2}
              color="#E27F38"
              distance={6}
            />

            {/* Studio Environment HDR Reflection (calibrated subtle sheen) */}
            <Environment preset="studio" environmentIntensity={0.25} />

            <Suspense fallback={null}>
              {/* Assembly Group encompassing model + presentation plate for exact Box3 framing */}
              <group ref={assemblyRef}>
                {/* Limestone Presentation Plate */}
                <Pedestal wireframe={wireframe} />

                {/* Subtle Organic Hover & Breathing Motion */}
                <Float
                  speed={1.4}
                  rotationIntensity={0.12}
                  floatIntensity={0.25}
                  floatingRange={[-0.02, 0.04]}
                >
                  <PastryModelRenderer
                    activePastry={activePastry}
                    wireframe={wireframe}
                  />
                </Float>
              </group>

              {/* Floating Flour Dust Motes */}
              {!wireframe && <FlourMotes />}

              {/* Soft Ground Contact Shadow under Pedestal Plate */}
              <ContactShadows
                position={[0, -0.05, 0]}
                opacity={0.4}
                scale={4.5}
                blur={2.4}
                far={3.5}
                color="#281A12"
              />
            </Suspense>

            {/* Interactive Mouse & Touch Drag Controls */}
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={15.0}
              maxPolarAngle={Math.PI / 2 + 0.05}
              minPolarAngle={0.08}
              dampingFactor={0.05}
              autoRotate={autoRotate}
              autoRotateSpeed={1.1}
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN,
              }}
            />
          </Canvas>
        </CanvasErrorBoundary>

        {/* Interaction Hint Overlay */}
        {!hasInteracted && (
          <div className="drag-hint-pill" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            <span>{t.viewer.dragHint}</span>
          </div>
        )}
      </div>

      {/* 3D Viewport Action HUD Bar */}
      <div className="scene-hud-bar">
        <div className="hud-status">
          <span className="hud-metric">
            {t.hero[activePastry].formMetric}
          </span>
        </div>

        <div className="hud-actions">
          <button
            type="button"
            className={`hud-btn ${autoRotate ? 'active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle 360 Auto-Rotation"
            aria-pressed={autoRotate}
          >
            <span>{t.viewer.autoSpin}</span>
            <span className="hud-indicator">
              {autoRotate ? t.viewer.autoSpinOn : t.viewer.autoSpinOff}
            </span>
          </button>

          <button
            type="button"
            className={`hud-btn ${wireframe ? 'active' : ''}`}
            onClick={() => setWireframe(!wireframe)}
            title="Inspect Three.js Mesh Topology"
            aria-pressed={wireframe}
          >
            <span>{t.viewer.wireframe}</span>
            <span className="hud-indicator">
              {wireframe ? t.viewer.wireframeMesh : t.viewer.wireframeShaded}
            </span>
          </button>

          <button
            type="button"
            className="hud-btn reset-btn"
            onClick={handleResetCamera}
            title="Reset Camera View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>{t.viewer.resetView}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
