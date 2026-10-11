import React, { useState } from 'react'
import type { Language, Translations } from '../i18n/translations'
import { BAKERY_BRAND_IDENTITY } from '../data/bakeryIdentity'

interface BakeryIdentitySectionProps {
  lang: Language
  t: Translations
  onNavigateToLocation?: () => void
  onNavigateToFacebook?: () => void
}

export const BakeryIdentitySection: React.FC<BakeryIdentitySectionProps> = ({
  lang,
  t,
  onNavigateToLocation,
  onNavigateToFacebook,
}) => {
  const { pageIdentity, storefront } = BAKERY_BRAND_IDENTITY
  const [showOriginalCardModal, setShowOriginalCardModal] = useState<boolean>(false)

  const handleScrollToLocation = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigateToLocation) {
      onNavigateToLocation()
    } else {
      const el = document.getElementById('location')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToFacebook = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigateToFacebook) {
      onNavigateToFacebook()
    } else {
      const el = document.getElementById('facebook')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className="bakery-identity-section"
      id="identity"
      aria-labelledby="identity-heading"
    >
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="identity-section-header">
          <p className="section-eyebrow">{t.brandIdentity.sectionEyebrow}</p>
          <h2 id="identity-heading" className="section-title">
            {t.brandIdentity.sectionTitle}
          </h2>
          <p className="section-subtitle">{t.brandIdentity.sectionSubtitle}</p>
        </div>

        {/* 2-Column Responsive Recognition Grid */}
        <div className="identity-cards-grid">
          {/* ==============================================================
              LEFT CARD: Official Facebook Page Identity
              ============================================================== */}
          <article className="identity-card page-identity-card">
            {/* Top Chip & Verification */}
            <div className="identity-card-header">
              <span className="identity-chip chip-page">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>{t.brandIdentity.pageCardChip}</span>
              </span>

              <span className="official-page-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{t.brandIdentity.officialBadge}</span>
              </span>
            </div>

            {/* Profile Avatar & Primary Meta */}
            <div className="page-profile-block">
              <div className="page-avatar-frame">
                <img
                  src={pageIdentity.logoImage}
                  alt={`${pageIdentity.pageName} Official Logo`}
                  className="page-avatar-img"
                  loading="lazy"
                />
                <span className="avatar-active-dot" aria-label="Verified identity" />
              </div>

              <div className="page-meta-content">
                <div className="page-title-row">
                  <h3 className="page-name-title">{pageIdentity.pageName}</h3>
                  <span className="page-verified-check" title="Verified Bakery Page">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                </div>

                <div className="page-tags-row">
                  <span className="page-category-tag">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span>{pageIdentity.category[lang]}</span>
                  </span>

                  <span className="page-followers-tag">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{pageIdentity.followers[lang]}</span>
                  </span>
                </div>

                <a
                  href={pageIdentity.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-display-url-link"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{pageIdentity.displayUrl}</span>
                </a>
              </div>
            </div>

            {/* Selling Schedule Summary Box */}
            <div className="selling-schedule-box">
              <div className="schedule-box-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="schedule-box-title">{t.brandIdentity.scheduleHeading}</span>
              </div>

              <div className="schedule-items-list">
                {pageIdentity.schedules.map((item, idx) => (
                  <div key={idx} className="schedule-item-row">
                    <span className="schedule-venue-name">{item.venue[lang]}</span>
                    <span className="schedule-days-pill">{item.days[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helper Copy */}
            <p className="page-helper-copy">
              {t.brandIdentity.pageHelperCopy}
            </p>

            {/* Action Buttons */}
            <div className="card-actions-row">
              <a
                href={pageIdentity.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-identity-primary"
                id="identity-view-facebook-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>{t.brandIdentity.visitPageBtn}</span>
              </a>

              <a
                href={pageIdentity.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-identity-secondary"
                id="identity-message-facebook-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.5 3.14 7.27V22l3.07-1.68c1.17.32 2.44.5 3.79.5 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.08 13.06l-2.61-2.78-5.1 2.78 5.61-5.96 2.67 2.78 5.04-2.78-5.61 5.96z" />
                </svg>
                <span>{t.brandIdentity.messagePageBtn}</span>
              </a>
            </div>

            {/* View Original Snapshot Trigger */}
            <div className="snapshot-preview-trigger-row">
              <button
                type="button"
                className="snapshot-preview-trigger"
                onClick={() => setShowOriginalCardModal(true)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>{lang === 'th' ? 'ดูภาพบันทึกหน้าเพจฉบับจริง' : 'View Original Page Snapshot'}</span>
              </button>
            </div>
          </article>

          {/* ==============================================================
              RIGHT CARD: Real Storefront & Booth Photo Card
              ============================================================== */}
          <article className="identity-card storefront-photo-card">
            {/* Top Chip */}
            <div className="identity-card-header">
              <span className="identity-chip chip-storefront">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>{t.brandIdentity.storefrontChip}</span>
              </span>

              <span className="storefront-photo-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <span>{lang === 'th' ? 'บันทึกภาพจริง ณ ตลาด' : 'Live Market Photo'}</span>
              </span>
            </div>

            {/* Real Storefront Booth Photograph Frame */}
            <div className="storefront-media-frame">
              <img
                src={storefront.photoImage}
                alt={storefront.photoAlt[lang]}
                className="storefront-booth-img"
                loading="lazy"
              />
              <div className="storefront-media-overlay">
                <div className="overlay-pill">
                  <span className="overlay-dot" />
                  <span>{lang === 'th' ? 'บรรยากาศบูธจริง ณ ตลาดเซฟวันโก' : 'Actual Booth at Save One Go Market'}</span>
                </div>
              </div>
            </div>

            {/* Storefront Info & Description */}
            <div className="storefront-content-block">
              <h3 className="storefront-card-title">{t.brandIdentity.storefrontTitle}</h3>
              <p className="storefront-desc-text">{t.brandIdentity.storefrontDesc}</p>

              {/* 4 Recognition Points List */}
              <div className="recognition-markers-block">
                <h4 className="markers-heading">{t.brandIdentity.pointsHeading}</h4>
                <ul className="markers-list">
                  {storefront.markers.map((marker) => (
                    <li key={marker.id} className="marker-item">
                      <span className="marker-bullet" aria-hidden="true">✓</span>
                      <div className="marker-text-wrap">
                        <strong className="marker-title">{marker.label[lang]}</strong>
                        <span className="marker-detail"> — {marker.description[lang]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions-row">
              <a
                href="#location"
                onClick={handleScrollToLocation}
                className="btn-identity-primary"
                id="identity-view-location-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t.brandIdentity.viewTodayLocationBtn}</span>
              </a>

              <a
                href="#facebook"
                onClick={handleScrollToFacebook}
                className="btn-identity-secondary"
                id="identity-view-posts-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{t.brandIdentity.viewLatestPostBtn}</span>
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* Snapshot Lightbox Modal if user wants to see full original card */}
      {showOriginalCardModal && (
        <div
          className="snapshot-modal-overlay"
          onClick={() => setShowOriginalCardModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Original Facebook Page Snapshot"
        >
          <div
            className="snapshot-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="snapshot-modal-close"
              onClick={() => setShowOriginalCardModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="snapshot-modal-header">
              <h4 className="snapshot-modal-title">
                {lang === 'th' ? 'ภาพบันทึกหน้าเพจ ฉันชอบกลิ่นเนย บน Facebook' : 'Original Facebook Page Snapshot'}
              </h4>
              <p className="snapshot-modal-sub">
                {lang === 'th'
                  ? 'ข้อมูลอ้างอิงภาพจริงที่นำมาใช้จัดทำโครงสร้างในต้นแบบแนวคิดนี้'
                  : 'Authentic reference snapshot used to structure this concept prototype'}
              </p>
            </div>
            <div className="snapshot-modal-img-wrap">
              <img
                src={pageIdentity.cardScreenshot}
                alt="Facebook Page Original Snapshot"
                className="snapshot-modal-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
