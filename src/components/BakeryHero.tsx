import React from 'react'
import type { Language, Translations } from '../i18n/translations'

interface BakeryHeroProps {
  lang: Language
  t: Translations
  onExploreMenu: () => void
}

export const BakeryHero: React.FC<BakeryHeroProps> = ({
  lang,
  t,
  onExploreMenu,
}) => {
  return (
    <section className="bakery-hero-section" id="hero">
      <div className="hero-editorial-container">
        {/* Left Column: Brand Story & Call to Actions */}
        <div className="hero-story-col">
          <div className="hero-badge-pill">
            <span className="badge-dot" aria-hidden="true" />
            <span className="badge-text">{t.hero.badge}</span>
          </div>

          <p className="hero-eyebrow">{t.hero.eyebrow}</p>

          <h1 className="hero-headline">
            <span className="headline-main">{t.hero.titleMain}</span>{' '}
            <span className="headline-accent">{t.hero.titleAccent}</span>
          </h1>

          <p className="hero-narrative">{t.hero.description}</p>

          {/* Quick Craft Indicators */}
          <div className="hero-spec-row">
            <div className="hero-spec-item">
              <span className="spec-indicator" aria-hidden="true">✦</span>
              <span className="spec-label">{t.hero.specBatch}</span>
            </div>
            <div className="hero-spec-divider" />
            <div className="hero-spec-item">
              <span className="spec-indicator" aria-hidden="true">✦</span>
              <span className="spec-label">{t.hero.specButter}</span>
            </div>
            <div className="hero-spec-divider" />
            <div className="hero-spec-item">
              <span className="spec-indicator" aria-hidden="true">✦</span>
              <span className="spec-label">{t.hero.specHearth}</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="hero-cta-group">
            <a
              href="https://www.facebook.com/CroissantNanchao"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-primary"
            >
              <span>{t.hero.orderFbBtn}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <button
              type="button"
              className="hero-btn-secondary"
              onClick={onExploreMenu}
            >
              <span>{t.hero.exploreMenuBtn}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

          {/* Independent Concept Prototype Disclaimer */}
          <div className="hero-prototype-notice">
            <span className="notice-icon">ℹ</span>
            <span className="notice-text">
              {lang === 'th'
                ? 'โปรเจกต์นี้อ้างอิงภาพและชื่อเพื่อสร้างต้นแบบเว็บไซต์เบเกอรี่ไทย (Demo Only)'
                : 'Prototype layout inspired by "Chan Chop Klin Noei" bakery (Concept Demo Only)'}
            </span>
          </div>
        </div>

        {/* Right Column: Hero Visual Frame & Craft Composition */}
        <div className="hero-visual-col">
          <div className="hero-visual-card">
            <div className="visual-card-header">
              <span className="card-tag">ATELIER SHOWCASE</span>
              <span className="card-batch">BATCH #245°C</span>
            </div>

            {/* Architectural Bakery Illustration Frame */}
            <div className="hero-art-frame">
              <svg
                viewBox="0 0 400 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hero-art-svg"
                aria-hidden="true"
              >
                {/* Subtle radiating warmth rays */}
                <circle cx="200" cy="160" r="140" stroke="rgba(164, 75, 47, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="160" r="110" stroke="rgba(164, 75, 47, 0.12)" strokeWidth="1" />
                
                {/* Laminated Croissant Architectural Cross-Section Blueprint */}
                {/* Outer crescent curvature */}
                <path
                  d="M100 200 C110 130, 200 100, 300 200 C270 230, 220 245, 200 245 C180 245, 130 230, 100 200 Z"
                  fill="rgba(194, 148, 93, 0.14)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                
                {/* Internal Lamination Flakes (Honeycomb layers) */}
                <path
                  d="M125 192 C145 155, 200 135, 275 192"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                  opacity="0.8"
                />
                <path
                  d="M145 186 C165 160, 200 150, 255 186"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <path
                  d="M165 180 C180 168, 200 165, 235 180"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  opacity="0.5"
                />

                {/* Central Honeycomb Pocket Core */}
                <ellipse cx="200" cy="188" rx="18" ry="10" stroke="var(--accent)" strokeWidth="1.2" fill="rgba(248, 239, 224, 0.6)" />

                {/* Pedestal plinth line */}
                <line x1="80" y1="260" x2="320" y2="260" stroke="rgba(37, 35, 31, 0.2)" strokeWidth="1.5" />
                <line x1="120" y1="268" x2="280" y2="268" stroke="rgba(37, 35, 31, 0.1)" strokeWidth="1" />

                {/* Dimension callout markers */}
                <line x1="330" y1="120" x2="330" y2="245" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                <text x="340" y="185" fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-secondary)" opacity="0.8">
                  36h FERMENT
                </text>
              </svg>

              {/* Center Overlay Tag */}
              <div className="hero-intake-badge">
                <span className="intake-badge-title">
                  {lang === 'th' ? 'ช่องรับภาพถ่ายสินค้าจริง' : 'OFFICIAL PHOTO INTAKE SLOT'}
                </span>
                <span className="intake-badge-sub">
                  {lang === 'th' ? 'เตรียมพร้อมรองรับรูปจากร้าน' : 'Ready for bakery high-res photography'}
                </span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="visual-card-footer">
              <div className="footer-metric">
                <span className="metric-num">100%</span>
                <span className="metric-text">{lang === 'th' ? 'เนยสดแท้' : 'PURE BUTTER'}</span>
              </div>
              <div className="footer-metric-divider" />
              <div className="footer-metric">
                <span className="metric-num">36h</span>
                <span className="metric-text">{lang === 'th' ? 'หมักบ่มเย็น' : 'COLD PROOF'}</span>
              </div>
              <div className="footer-metric-divider" />
              <div className="footer-metric">
                <span className="metric-num">3D</span>
                <span className="metric-text">{lang === 'th' ? 'โมเดลจำลอง' : 'INTERACTIVE'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
