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

            {/* Editorial Bakery Photography Showcase Frame */}
            <div className="hero-art-frame photo-mode">
              <div className="hero-photo-container">
                <img
                  src="/products/demo_hero_croissant.jpg"
                  alt={lang === 'th' ? 'ครัวซองต์ครีมสตรอว์เบอร์รี เนยสดแท้' : 'Artisan Strawberry Cream Croissant'}
                  className="hero-signature-img"
                  loading="eager"
                />

                {/* Aesthetic Floating Signature Badge */}
                <div className="hero-floating-artisan-tag">
                  <span className="tag-flair">✦</span>
                  <span className="tag-title">
                    {lang === 'th' ? 'ครัวซองต์เนยสดครีมสตรอว์เบอร์รี' : 'Strawberry Cream Croissant'}
                  </span>
                </div>

                {/* Concept Visual Notice Overlay */}
                <div className="hero-demo-visual-pill">
                  <span className="pill-dot" aria-hidden="true" />
                  <span className="pill-text">
                    {lang === 'th'
                      ? 'ภาพจำลองแนวคิด (Demo Visual) • รอไฟล์ภาพจริงจากร้าน'
                      : 'Demo Showcase Visual • Awaiting official photo intake'}
                  </span>
                </div>
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
                <span className="metric-num">HAND</span>
                <span className="metric-text">{lang === 'th' ? 'คราฟต์ด้วยมือ' : 'HANDCRAFTED'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
