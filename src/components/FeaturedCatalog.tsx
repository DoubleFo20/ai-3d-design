import React, { useState } from 'react'
import type { Language, Translations } from '../i18n/translations'
import type { ProductItem } from '../types/bakery'

interface FeaturedCatalogProps {
  products: ProductItem[]
  activeProductId: string
  onSelectProduct: (product: ProductItem) => void
  onOpenDetailsModal: (product: ProductItem) => void
  lang: Language
  t: Translations
}

export const FeaturedCatalog: React.FC<FeaturedCatalogProps> = ({
  products,
  activeProductId,
  onSelectProduct,
  onOpenDetailsModal,
  lang,
  t,
}) => {
  const [filter, setFilter] = useState<string>('all')

  const filteredProducts = products.filter((item) => {
    if (filter === 'all') return true
    return item.category === filter
  })

  return (
    <section className="featured-catalog-section" id="menu">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <p className="section-eyebrow">{t.catalog.sectionEyebrow}</p>
          <h2 className="section-title">{t.catalog.sectionTitle}</h2>
          <p className="section-subtitle">{t.catalog.sectionSubtitle}</p>
        </div>

        {/* Filter Bar */}
        <div className="catalog-filter-bar" role="tablist" aria-label="Product Categories">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t.catalog.allFilter}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'croissant' ? 'active' : ''}`}
            onClick={() => setFilter('croissant')}
          >
            {t.catalog.croissantFilter}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'danish' ? 'active' : ''}`}
            onClick={() => setFilter('danish')}
          >
            {t.catalog.danishFilter}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'pastry' ? 'active' : ''}`}
            onClick={() => setFilter('pastry')}
          >
            {t.catalog.pastryFilter}
          </button>
        </div>

        {/* Product Grid */}
        <div className="catalog-grid">
          {filteredProducts.map((product, index) => {
            const isSelected = product.id === activeProductId
            return (
              <article
                key={product.id}
                className={`product-card ${isSelected ? 'selected' : ''}`}
              >
                {/* Card Header & Status */}
                <div className="card-top-bar">
                  <span className="card-num">0{index + 1}</span>
                  <span className="card-status-badge">
                    {product.glbPath ? '3D GLB READY' : t.catalog.demoBadge}
                  </span>
                </div>

                {/* Product Photo Showcase / Intake Slot */}
                <div
                  className="card-media-stage"
                  onClick={() => onSelectProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectProduct(product)
                    }
                  }}
                  aria-label={`Select ${product.name[lang]}`}
                >
                  {product.hasRealPhoto ? (
                    <img
                      src={product.images[0]}
                      alt={product.name[lang]}
                      className="card-photo"
                      loading="lazy"
                    />
                  ) : (
                    <div className="photo-intake-slot">
                      <div className="intake-camera-icon" aria-hidden="true">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </div>
                      <span className="intake-slot-tag">
                        {lang === 'th' ? 'ช่องรับภาพถ่ายจริง' : 'OFFICIAL PHOTO INTAKE'}
                      </span>
                      <span className="intake-slot-file">{product.intakeSlotPath}</span>
                    </div>
                  )}

                  {/* 3D Model Badge indicator if GLB is attached */}
                  {product.glbPath && (
                    <span className="glb-pill-indicator">
                      ✦ {lang === 'th' ? 'พร้อมหมุน 3D' : '3D Orbit Available'}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <h3 className="card-title">{product.name[lang]}</h3>
                  {product.subtitle && (
                    <p className="card-subtitle">{product.subtitle[lang]}</p>
                  )}

                  <p className="card-desc">{product.description[lang]}</p>

                  {/* Tags */}
                  <div className="card-tags-row">
                    {product.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="card-tag-chip">
                        {tag[lang]}
                      </span>
                    ))}
                  </div>

                  {/* Footer Meta: Price Note & Action Buttons */}
                  <div className="card-footer">
                    <span className="card-price-note">
                      {product.price
                        ? `฿${product.price}`
                        : product.priceDisplayNote
                        ? product.priceDisplayNote[lang]
                        : t.catalog.inquirePrice}
                    </span>

                    <div className="card-actions-group">
                      <button
                        type="button"
                        className="card-inspect-btn"
                        onClick={() => {
                          onSelectProduct(product)
                          const studioEl = document.getElementById('studio')
                          if (studioEl) {
                            studioEl.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        title={product.glbPath ? t.catalog.view3DBtn : t.catalog.viewGalleryBtn}
                      >
                        {product.glbPath ? t.catalog.view3DBtn : t.catalog.viewGalleryBtn}
                      </button>

                      <button
                        type="button"
                        className="card-detail-btn"
                        onClick={() => onOpenDetailsModal(product)}
                      >
                        {t.catalog.viewDetailBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Official Photography Intake Guide Banner for User */}
        <div className="intake-guide-callout">
          <div className="guide-icon-col" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="guide-text-col">
            <h4 className="guide-heading">
              {lang === 'th'
                ? 'คำแนะนำการเพิ่มรูปภาพสินค้าจริงจากร้าน (Photo Intake Protocol)'
                : 'Official Photography Intake Protocol'}
            </h4>
            <p className="guide-desc">
              {lang === 'th'
                ? 'เมื่อมีรูปถ่ายสินค้าจริงจากร้านหรือ Facebook สามารถนำไฟล์นามสกุล .jpg หรือ .png ไปวางไว้ที่โฟลเดอร์ public/products/ ตามชื่อที่ระบุในแต่ละการ์ด ระบบจะดึงรูปถ่ายจริงมาแสดงผลแทนช่องร่างโดยอัตโนมัติทันที'
                : 'When official high-resolution photographs are provided, place .jpg or .png files into public/products/ according to each assigned path. The site will automatically display official photos.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
