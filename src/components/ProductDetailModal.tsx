import React from 'react'
import type { Language, Translations } from '../i18n/translations'
import type { ProductItem } from '../types/bakery'

interface ProductDetailModalProps {
  isOpen: boolean
  product: ProductItem | null
  onClose: () => void
  onFocusProductInStudio: (product: ProductItem) => void
  lang: Language
  t: Translations
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  product,
  onClose,
  onFocusProductInStudio,
  lang,
  t,
}) => {
  if (!isOpen || !product) return null

  return (
    <div className="product-modal-backdrop" role="dialog" aria-modal="true">
      <div className="product-modal-dialog">
        {/* Header */}
        <div className="modal-top-bar">
          <div className="modal-status-badge">
            <span className="modal-badge-dot" aria-hidden="true" />
            <span>{product.glbPath ? '3D VERIFIED' : t.catalog.demoBadge}</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="modal-content-grid">
          {/* Visual column */}
          <div className="modal-media-col">
            {product.images && product.images[0] ? (
              <div className="modal-photo-wrap">
                <img
                  src={product.images[0]}
                  alt={product.name[lang]}
                  className="modal-img"
                />
                {product.isDemoVisual && (
                  <div className="modal-demo-tag">
                    <span className="dot-mini" aria-hidden="true" />
                    <span>
                      {lang === 'th'
                        ? 'ภาพจำลองแนวคิด (Demo Visual)'
                        : 'Demo Concept Visual'}
                    </span>
                  </div>
                )}
                <div className="modal-intake-reference">
                  <span className="ref-label">{lang === 'th' ? 'ช่องรับภาพถ่ายจริง:' : 'Official intake slot:'}</span>
                  <code className="ref-path">{product.intakeSlotPath}</code>
                </div>
              </div>
            ) : (
              <div className="modal-intake-card">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="modal-intake-tag">
                  {lang === 'th' ? 'ช่องรับภาพถ่ายจริง' : 'PHOTO INTAKE SLOT'}
                </span>
                <span className="modal-intake-path">{product.intakeSlotPath}</span>
                <p className="modal-intake-hint">
                  {lang === 'th'
                    ? 'วางไฟล์ภาพลงในโฟลเดอร์นี้เพื่อแสดงผลจริง'
                    : 'Place official image file here to display'}
                </p>
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="modal-info-col">
            <h3 className="modal-title">{product.name[lang]}</h3>
            {product.subtitle && (
              <p className="modal-subtitle">{product.subtitle[lang]}</p>
            )}

            <p className="modal-desc">{product.description[lang]}</p>

            {/* Highlights */}
            <div className="modal-specs-wrap">
              <h4 className="modal-specs-title">{t.detailStage.specsHeading}</h4>
              <dl className="modal-specs-dl">
                {product.highlights.map((h, i) => (
                  <div key={i} className="modal-spec-entry">
                    <dt className="modal-spec-term">{h.label[lang]}</dt>
                    <dd className="modal-spec-val">{h.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Price Note & Actions */}
            <div className="modal-footer-action">
              <div className="modal-price-note">
                <span className="modal-price-label">
                  {lang === 'th' ? 'ราคา / รอบอบ:' : 'Batch Pricing:'}
                </span>
                <span className="modal-price-val">
                  {product.price
                    ? `฿${product.price}`
                    : product.priceDisplayNote
                    ? product.priceDisplayNote[lang]
                    : t.catalog.inquirePrice}
                </span>
              </div>

              <div className="modal-btn-row">
                <button
                  type="button"
                  className="modal-studio-btn"
                  onClick={() => {
                    onClose()
                    onFocusProductInStudio(product)
                  }}
                >
                  {product.glbPath ? t.catalog.view3DBtn : t.catalog.viewGalleryBtn}
                </button>

                <a
                  href={
                    product.facebookPostUrl ||
                    'https://www.facebook.com/CroissantNanchao'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-fb-btn"
                >
                  <span>{t.detailStage.inquireFbBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
