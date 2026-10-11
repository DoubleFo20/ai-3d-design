import React, { useState } from 'react'
import type { Language, Translations } from '../i18n/translations'
import type { ProductItem } from '../types/bakery'
import { PastryScene } from './PastryScene'

interface Developer3DPreviewProps {
  caneleAsset: ProductItem
  lang: Language
  t: Translations
}

export const Developer3DPreview: React.FC<Developer3DPreviewProps> = ({
  caneleAsset,
  lang,
  t,
}) => {
  const [autoSpin, setAutoSpin] = useState<boolean>(true)
  const [wireframe, setWireframe] = useState<boolean>(false)

  return (
    <section className="developer-3d-section" id="developer-3d">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="dev-header-badge">
            <span className="dev-badge-pulse" aria-hidden="true" />
            <span className="dev-badge-text">{t.dev3D.benchmarkBadge}</span>
          </div>
          <p className="section-eyebrow">{t.dev3D.sectionEyebrow}</p>
          <h2 className="section-title">{t.dev3D.sectionTitle}</h2>
          <p className="section-subtitle">{t.dev3D.sectionSubtitle}</p>
        </div>

        {/* 3D WebGL Canvas & Technical Benchmark Grid */}
        <div className="dev-3d-grid">
          {/* Left Column: Interactive 3D WebGL Canvas */}
          <div className="dev-canvas-card">
            <div className="dev-canvas-top-bar">
              <div className="dev-asset-label">
                <span className="asset-dot" aria-hidden="true" />
                <span className="asset-name">{caneleAsset.name[lang]}</span>
                <span className="asset-format">GLB + DRACO</span>
              </div>

              {/* Viewer Control Toggles */}
              <div className="dev-controls-toolbar">
                <button
                  type="button"
                  className={`toolbar-btn ${autoSpin ? 'active' : ''}`}
                  onClick={() => setAutoSpin(!autoSpin)}
                  title={t.dev3D.autoSpinLabel}
                >
                  <span className="btn-icon">↻</span>
                  <span>{autoSpin ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
                </button>

                <button
                  type="button"
                  className={`toolbar-btn ${wireframe ? 'active' : ''}`}
                  onClick={() => setWireframe(!wireframe)}
                  title={t.dev3D.wireframeLabel}
                >
                  <span className="btn-icon">⬡</span>
                  <span>{wireframe ? 'Wireframe: ON' : 'Wireframe: OFF'}</span>
                </button>
              </div>
            </div>

            {/* 3D Scene Viewport */}
            <div className="dev-webgl-viewport">
              <PastryScene
                activePastry="canele"
                onSelectPastry={() => {}}
                t={t}
              />

              {/* Floating Interaction Hint */}
              <div className="dev-interaction-hint">
                <span className="hint-icon">✦</span>
                <span className="hint-text">{t.dev3D.orbitHint}</span>
              </div>
            </div>

            {/* Viewport Footer Pipeline Status */}
            <div className="dev-canvas-footer">
              <span className="footer-pipeline-tag">
                THREE.JS r128+ • DRIKO DECODER (/draco/gltf/) • PBR BLINN-PHONG
              </span>
            </div>
          </div>

          {/* Right Column: Technical Benchmark & Pipeline Metrics */}
          <div className="dev-metrics-card">
            <div className="metrics-card-header">
              <span className="metrics-eyebrow">ENGINEERING BENCHMARK</span>
              <h3 className="metrics-title">{t.dev3D.benchmarkTitle}</h3>
              <p className="metrics-desc">{t.dev3D.benchmarkDesc}</p>
            </div>

            {/* Key Performance Indicators */}
            <div className="metrics-kpi-grid">
              <div className="kpi-cell">
                <span className="kpi-label">GEOMETRY / POLYCOUNT</span>
                <span className="kpi-val">{t.dev3D.metricPoly}</span>
              </div>

              <div className="kpi-cell">
                <span className="kpi-label">ASSET COMPRESSION</span>
                <span className="kpi-val">{t.dev3D.metricDraco}</span>
              </div>

              <div className="kpi-cell">
                <span className="kpi-label">RUNTIME PERFORMANCE</span>
                <span className="kpi-val">{t.dev3D.metricFPS}</span>
              </div>

              <div className="kpi-cell">
                <span className="kpi-label">MATERIAL & SHADING</span>
                <span className="kpi-val">{t.dev3D.metricPBR}</span>
              </div>
            </div>

            {/* Integration Specifications */}
            <div className="metrics-specs-box">
              <h4 className="specs-box-heading">ASSET INTEGRATION PIPELINE</h4>
              <ul className="specs-list-bullets">
                <li>
                  <strong>GLB Standard:</strong> Supports direct intake of photogrammetry scans & 3D Gaussian Splatting exports.
                </li>
                <li>
                  <strong>Local Decompression:</strong> Zero CDN latency using local Draco WASM workers in <code>public/draco/</code>.
                </li>
                <li>
                  <strong>Production Fallback:</strong> Automatic graceful fallback to responsive photo gallery if GLB is omitted.
                </li>
              </ul>
            </div>

            {/* Architecture Separation Notice */}
            <div className="dev-separation-notice">
              <span className="notice-icon">ℹ</span>
              <span className="notice-text">
                {lang === 'th'
                  ? 'ส่วนนี้แยกออกจากแค็ตตาล็อกสินค้าของร้าน "ฉันชอบกลิ่นเนย" เพื่อเป็นพื้นที่ทดสอบเทคโนโลยี 3D โดยเฉพาะ'
                  : 'Separated from commercial bakery catalog as a dedicated WebGL engineering testbed.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
