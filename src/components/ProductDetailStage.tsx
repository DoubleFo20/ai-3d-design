import React, { useState } from 'react'
import type { Language, Translations } from '../i18n/translations'
import type { ProductItem } from '../types/bakery'

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
  const [selectedAngle, setSelectedAngle] = useState<number>(1)

  return (
    <section className="product-detail-stage-section" id="studio">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <p className="section-eyebrow">{t.detailStage.sectionEyebrow}</p>
          <h2 className="section-title">{t.detailStage.sectionTitle}</h2>
        </div>

        {/* Product Switcher Selector Pills (3 Bakery Items) */}
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
            </button>
          ))}
        </div>

        {/* Interactive Dual-Column Showcase Grid */}
        <div className="detail-stage-grid">
          {/* Left Column: High-Res Editorial Photo Gallery & Intake Slot */}
          <div className="detail-visual-viewport">
            {/* View Mode Indicator Bar */}
            <div className="viewport-status-bar">
              <div className="status-mode-pill">
                <span className="dot-live" aria-hidden="true" />
                <span>{t.detailStage.viewPhotoLabel}</span>
              </div>
              <span className="stage-item-cat-tag">
                {activeProduct.category.toUpperCase()}
              </span>
            </div>

            {/* Gallery Photo Frame */}
            <div className="active-photo-gallery-wrap">
              <div className="gallery-main-frame">
                {activeProduct.images && activeProduct.images[0] ? (
                  <div className="gallery-photo-display">
                    <img
                      src={activeProduct.images[0]}
                      alt={activeProduct.name[lang]}
                      className="gallery-main-img"
                    />
                    {activeProduct.isDemoVisual && (
                      <div className="gallery-demo-pill">
                        <span className="dot-mini" aria-hidden="true" />
                        <span>
                          {lang === 'th'
                            ? 'ภาพจำลองแนวคิด (Demo Visual) • รอไฟล์ภาพจริงจากทางร้าน'
                            : 'Demo Concept Visual • Awaiting official bakery photo'}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="gallery-intake-placeholder">
                    <div className="placeholder-artisan-icon" aria-hidden="true">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2 2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <h4 className="placeholder-title">{activeProduct.name[lang]}</h4>
                    <p className="placeholder-status-note">{t.detailStage.noGLBNotice}</p>
                  </div>
                )}
              </div>

              {/* Sub-thumbnails Angle Strip */}
              <div className="gallery-thumb-strip">
                <button
                  type="button"
                  className={`thumb-item ${selectedAngle === 1 ? 'active' : ''}`}
                  onClick={() => setSelectedAngle(1)}
                >
                  <span className="thumb-idx">01</span>
                  <span>{lang === 'th' ? 'มุมมองหลัก (Front View)' : 'Front Beauty'}</span>
                </button>
                <button
                  type="button"
                  className={`thumb-item ${selectedAngle === 2 ? 'active' : ''}`}
                  onClick={() => setSelectedAngle(2)}
                >
                  <span className="thumb-idx">02</span>
                  <span>{lang === 'th' ? 'มิติชั้นแป้ง (Lamination)' : 'Lamination Detail'}</span>
                </button>
                <button
                  type="button"
                  className={`thumb-item ${selectedAngle === 3 ? 'active' : ''}`}
                  onClick={() => setSelectedAngle(3)}
                >
                  <span className="thumb-idx">03</span>
                  <span>{lang === 'th' ? 'สัมผัสครีมและท็อปปิ้ง' : 'Cream & Fruit Close-up'}</span>
                </button>
              </div>

              {/* Designated File Intake Slot Card */}
              <div className="gallery-intake-info-box">
                <div className="intake-info-header">
                  <span className="intake-icon" aria-hidden="true">📁</span>
                  <span className="intake-info-title">{t.detailStage.intakeSlotLabel}</span>
                </div>
                <code className="intake-file-path">{activeProduct.intakeSlotPath}</code>
                <p className="intake-file-hint">
                  {lang === 'th'
                    ? 'เมื่อนำไฟล์ภาพจริงจากเพจร้านมาวางที่พาธนี้ ระบบจะแสดงผลภาพจริงแทนภาพจำลองทันที'
                    : 'Place official high-res image here to replace the conceptual demo photo seamlessly.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Specifications & Inquire CTA */}
          <div className="detail-info-col">
            <div className="info-header-block">
              <span className="info-badge">
                {activeProduct.category.toUpperCase()} • CRAFT SHOWCASE
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
