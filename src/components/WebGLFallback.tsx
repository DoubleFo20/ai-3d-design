import React from 'react'

interface WebGLFallbackProps {
  message?: string
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  message = 'WebGL hardware acceleration is paused or unavailable in this environment.',
}) => {
  return (
    <div className="webgl-fallback-container">
      <div className="webgl-fallback-card">
        <div className="webgl-fallback-badge">
          <span>STATIC ARCHITECTURAL STUDY</span>
        </div>

        {/* Minimalist procedural SVG pastry blueprint */}
        <div className="webgl-fallback-illustration" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pedestal plate */}
            <ellipse cx="100" cy="165" rx="70" ry="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
            <ellipse cx="100" cy="160" rx="60" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            
            {/* Canelé fluted profile blueprint */}
            <path
              d="M65 80 C65 65, 80 55, 100 55 C120 55, 135 65, 135 80 L140 145 C140 152, 122 156, 100 156 C78 156, 60 152, 60 145 Z"
              stroke="var(--accent)"
              strokeWidth="1.5"
              fill="rgba(164, 75, 47, 0.04)"
            />
            {/* Fluted vertical contour lines */}
            <line x1="75" y1="74" x2="72" y2="148" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="90" y1="78" x2="88" y2="154" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="100" y1="79" x2="100" y2="156" stroke="var(--accent)" strokeWidth="1.2" opacity="0.8" />
            <line x1="110" y1="78" x2="112" y2="154" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="125" y1="74" x2="128" y2="148" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Crown concave well */}
            <ellipse cx="100" cy="74" rx="28" ry="8" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="100" cy="72" rx="14" ry="4" stroke="var(--accent)" strokeWidth="1.2" />
            {/* Blueprint dimension tick marks */}
            <line x1="45" y1="55" x2="45" y2="156" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
            <line x1="40" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="40" y1="156" x2="50" y2="156" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <text x="32" y="110" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.5" transform="rotate(-90 32,110)">
              H: 52mm
            </text>
          </svg>
        </div>

        <h3 className="webgl-fallback-title">L'Atelier 3D Viewport</h3>
        <p className="webgl-fallback-text">{message}</p>
        <div className="webgl-fallback-meta">
          <span>GEOMETRY: THREE.CYLINDER (FLUTED)</span>
          <span>•</span>
          <span>EST. OVEN EXPANSION: +18%</span>
        </div>
      </div>
    </div>
  )
}
