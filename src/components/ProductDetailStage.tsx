import React, { useState } from 'react'
import type { Language, Translations } from '../i18n/translations'
import type { ProductItem } from '../types/bakery'
import { PastryScene } from './PastryScene'

interface ProductDetailStageProps {
  products: ProductItem[]
  activeProduct: ProductItem
  onSelectProduct: (product: ProductItem) => void
  lang: Language
  t: Translations
}

export const ProductDetailStage: React.FC<ProductDetailStageProps> = ({
  products,
  activeProduct,
  onSelectProduct,
  lang,
  t,
}) => {
  const [viewMode, setViewMode] = useState<'auto' | 'gallery'>('auto')

  // Whether active product has an active 3D GLB model
  const hasGLB = Boolean(activeProduct.glbPath)
  const is3DActive = hasGLB && viewMode !== 'gallery'

  return (
    <section className="product-detail-stage-section" id="studio">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <p className="section-eyebrow">{t.detailStage.sectionEyebrow}</p>
          <h2 className="section-title">{t.detailStage.sectionTitle}</h2>
        </div>

        {/* Product Switcher Selector Pills */}
        <div className="product-selector-nav" role="tablist" aria-label="Select Pastry Focus">
          {products.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === activeProduct.id}
              className={`product-pill-btn ${item.id === activeProduct.id ? 'active' : ''}`}
              onClick={() => onSelectProduct(item)}
            >
              <span className="pill-index">0{idx + 1}</span>
              <span className="pill-name">{item.name[lang]}</span>
              {item.glbPath && <span className="pill-3d-tag">3D</span>}
            </button>
          ))}
        </div>

        {/* Interactive Dual-Column Showcase Grid */}
        <div className="detail-stage-grid">
          {/* Left Column: Interactive 3D Canvas OR High-Res Photo Gallery */}
          <div className="detail-visual-viewport">
            {/* View Mode Indicator Bar */}
            <div className="viewport-status-bar">
              <div className="status-mode-pill">
                <span className="dot-live" aria-hidden="true" />
                <span>
                  {is3DActive
                    ? t.detailStage.view3DLabel
                    : t.detailStage.viewPhotoLabel}
                </span>
              </div>

              {/* Mode Toggle if product supports both */}
              {hasGLB && (
                <div className="mode-toggle-group">
                  <button
                    type="button"
                    className={`toggle-sub-btn ${is3DActive ? 'active' : ''}`}
                    onClick={() => setViewMode('auto')}
                  >
                    3D View
                  </button>
                  <button
                    type="button"
                    className={`toggle-sub-btn ${!is3DActive ? 'active' : ''}`}
                    onClick={() => setViewMode('gallery')}
                  >
                    Photo Gallery
                  </button>
                </div>
              )}
            </div>

            {/* Stage Body */}
            {is3DActive ? (
              <div className="active-3d-canvas-wrap">
                {/* 3D Scene Component with GLB loader */}
                <PastryScene
                  activePastry="canele"
                  onSelectPastry={() => {}}
                  t={t}
                />
              </div>
            ) : (
              <div className="active-photo-gallery-wrap">
                <div className="gallery-main-frame">
                  {activeProduct.hasRealPhoto ? (
                    <img
                      src={activeProduct.images[0]}
                      alt={activeProduct.name[lang]}
                      className="gallery-main-img"
                    />
                  ) : (
                    <div className="gallery-intake-placeholder">
                      <div className="placeholder-artisan-icon" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2 2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>

                      <div className="placeholder-text-group">
                        <h4 className="placeholder-title">
                          {activeProduct.name[lang]}
                        </h4>
                        <p className="placeholder-status-note">
                          {t.detailStage.noGLBNotice}
                        </p>
                        <div className="placeholder-slot-pill">
                          <span className="slot-label">{t.detailStage.intakeSlotLabel}</span>
                          <code className="slot-path">{activeProduct.intakeSlotPath}</code>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-thumbnails Strip */}
                <div className="gallery-thumb-strip">
                  <div className="thumb-item active">
                    <span>Angle 01 (Front Beauty)</span>
                  </div>
                  <div className="thumb-item">
                    <span>Angle 02 (Top Texture)</span>
                  </div>
                  <div className="thumb-item">
                    <span>Angle 03 (Crumb Detail)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Artisan Specifications & Inquire CTA */}
          <div className="detail-info-col">
            <div className="info-header-block">
              <span className="info-badge">
                {hasGLB ? '3D VERIFIED' : 'DEMO CATALOG ITEM'}
              </span>
              <h3 className="info-title">{activeProduct.name[lang]}</h3>
              {activeProduct.subtitle && (
                <p className="info-subtitle">{activeProduct.subtitle[lang]}</p>
              )}
            </div>

            <p className="info-description">{activeProduct.description[lang]}</p>

            {/* Product Craft Specifications */}
            <div className="info-specs-box">
              <h4 className="specs-box-title">{t.detailStage.specsHeading}</h4>
              <dl className="specs-list">
                {activeProduct.highlights.map((item, idx) => (
                  <div key={idx} className="spec-row">
                    <dt className="spec-term">{item.label[lang]}</dt>
                    <dd className="spec-desc">{item.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Price Note & Direct Facebook Messenger CTA */}
            <div className="info-cta-block">
              <div className="info-price-display">
                <span className="price-label">
                  {lang === 'th' ? 'การสั่งซื้อและราคา:' : 'Pricing & Availability:'}
                </span>
                <span className="price-value">
                  {activeProduct.priceDisplayNote
                    ? activeProduct.priceDisplayNote[lang]
                    : t.catalog.inquirePrice}
                </span>
              </div>

              <a
                href={
                  activeProduct.facebookPostUrl ||
                  'https://www.facebook.com/CroissantNanchao'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inquire-messenger-btn"
              >
                <span>{t.detailStage.inquireFbBtn}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Verification Status Notice */}
            <div className="verification-card">
              <h5 className="verif-title">{t.detailStage.verificationTitle}</h5>
              <p className="verif-text">{t.detailStage.verificationDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
