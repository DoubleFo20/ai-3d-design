import React, { useState } from 'react'
import type { Language, Translations } from '../i18n/translations'
import {
  POP_UP_SCHEDULE,
  getActivePopUpEvent,
  getEventStatus,
  formatPopUpDate,
  getBangkokTodayString,
} from '../data/popUpSchedule'
import type { PopUpEvent, PopUpStatus } from '../types/bakery'

interface BakeryPopUpLocationProps {
  lang: Language
  t: Translations
}

export const BakeryPopUpLocation: React.FC<BakeryPopUpLocationProps> = ({
  lang,
  t,
}) => {
  const todayBangkok = getBangkokTodayString()
  const activeResolution = getActivePopUpEvent(todayBangkok)

  // Current selected event
  const [selectedEventId, setSelectedEventId] = useState<string>(
    activeResolution?.event.id || POP_UP_SCHEDULE[0]?.id || '',
  )

  // Simulated date mode for QA inspection (allows reviewing today / upcoming / past behaviors)
  const [simulatedDateOverride, setSimulatedDateOverride] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false)
  const [showPhoneAlert, setShowPhoneAlert] = useState<boolean>(false)

  const effectiveReferenceDate = simulatedDateOverride || todayBangkok

  const currentEvent: PopUpEvent | undefined =
    POP_UP_SCHEDULE.find((e) => e.id === selectedEventId) ||
    activeResolution?.event ||
    POP_UP_SCHEDULE[0]

  if (!currentEvent) {
    return null
  }

  const currentStatus: PopUpStatus = getEventStatus(
    currentEvent.eventDate,
    effectiveReferenceDate,
  )

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(currentEvent.venueAddress[lang])
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2500)
    } catch {
      // Fallback
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2500)
    }
  }

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Enforce strict rule: Only enable click-to-call once verified.
    if (!currentEvent.contactVerified) {
      setShowPhoneAlert(true)
      setTimeout(() => setShowPhoneAlert(false), 4000)
    }
  }

  return (
    <section
      className="popup-location-section"
      id="location"
      aria-labelledby="popup-location-title"
    >
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="location-section-header">
          <div className="header-meta-row">
            <p className="section-eyebrow">{t.popUpLocation.sectionEyebrow}</p>
            <div className="header-curated-badge" title={t.popUpLocation.curatedSourceDesc}>
              <span className="badge-dot" aria-hidden="true" />
              <span>{t.popUpLocation.curatedSourceBadge}</span>
            </div>
          </div>

          <h2 id="popup-location-title" className="section-title">
            {t.popUpLocation.sectionTitle}
          </h2>
          <p className="section-subtitle">{t.popUpLocation.sectionSubtitle}</p>
        </div>

        {/* Dynamic Pop-up Schedule Showcase Card */}
        <div className={`popup-main-card status-${currentStatus}`}>
          {/* Card Top Banner: Date Status Pill & Expired Alert */}
          <div className="card-top-bar">
            <div className="status-indicator-group">
              <span className={`status-pill pill-${currentStatus}`}>
                <span className="pill-dot" aria-hidden="true" />
                <span className="pill-text">
                  {currentStatus === 'today' && t.popUpLocation.statusToday}
                  {currentStatus === 'upcoming' && t.popUpLocation.statusUpcoming}
                  {currentStatus === 'past' && t.popUpLocation.statusPast}
                </span>
              </span>

              <span className="date-summary-text">
                {currentEvent.dayOfWeek?.[lang]} • {formatPopUpDate(currentEvent.eventDate, lang)}
              </span>
            </div>

            {/* Multi-event Selector if more than one pop-up exists */}
            {POP_UP_SCHEDULE.length > 1 && (
              <div className="popup-events-picker" role="tablist" aria-label="Pop-up events">
                {POP_UP_SCHEDULE.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    role="tab"
                    aria-selected={ev.id === currentEvent.id}
                    className={`event-picker-tab ${ev.id === currentEvent.id ? 'active' : ''}`}
                    onClick={() => setSelectedEventId(ev.id)}
                  >
                    {ev.venueName[lang]}
                  </button>
                ))}
              </div>
            )}

            {/* Simulated Reference Date QA Controls (For testing date transitions) */}
            <div className="qa-date-test-controls" aria-label="Date QA Tester">
              <span className="qa-test-label">QA Date Transition:</span>
              <button
                type="button"
                className={`qa-date-btn ${simulatedDateOverride === null || simulatedDateOverride === currentEvent.eventDate ? 'active' : ''}`}
                onClick={() => setSimulatedDateOverride(currentEvent.eventDate)}
                title="Test Today mode (2026-10-11)"
              >
                Today
              </button>
              <button
                type="button"
                className={`qa-date-btn ${simulatedDateOverride === '2026-10-01' ? 'active' : ''}`}
                onClick={() => setSimulatedDateOverride('2026-10-01')}
                title="Test Future / Upcoming mode (Ref: Oct 1)"
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`qa-date-btn ${simulatedDateOverride === '2026-10-20' ? 'active' : ''}`}
                onClick={() => setSimulatedDateOverride('2026-10-20')}
                title="Test Past / Expired mode (Ref: Oct 20)"
              >
                Past
              </button>
            </div>
          </div>

          {/* Expired Announcement Warning Notice if date is past */}
          {currentStatus === 'past' && (
            <div className="expired-notice-banner" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
              <span>{t.popUpLocation.expiredNotice}</span>
            </div>
          )}

          {/* Main Card Grid */}
          <div className="popup-card-grid">
            {/* Left Column: Venue, Large Booth Badge & Announcement Excerpt */}
            <div className="popup-info-column">
              {/* Venue Name & Category */}
              <div className="venue-heading-block">
                <span className="venue-category-tag">
                  {lang === 'th' ? 'ตลาดนัดและงานออกบูธ' : 'POP-UP MARKET & FAIR'}
                </span>
                <h3 className="venue-title">{currentEvent.venueName[lang]}</h3>
                <p className="venue-address-text">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{currentEvent.venueAddress[lang]}</span>
                </p>
              </div>

              {/* High-Impact Booth Number Display */}
              <div className="booth-highlight-box">
                <div className="booth-header">
                  <span className="booth-label">{t.popUpLocation.boothLabel}</span>
                  <span className="booth-sub">{t.popUpLocation.boothSubtitle}</span>
                </div>
                <div className="booth-numbers-display" aria-label={`Booth numbers ${currentEvent.boothNumbers}`}>
                  <span className="booth-number-tag">{currentEvent.boothNumbers}</span>
                </div>
                <p className="booth-disclaimer-sub">
                  {lang === 'th'
                    ? '*หมายเลขล็อกบูธอ้างอิงจากประกาศของเพจ ไม่ใช่พิกัด GPS'
                    : '*Booth numbers reflect official post declaration, not GPS coordinates.'}
                </p>
              </div>

              {/* Announcement Excerpt from Page Post */}
              <div className="post-announcement-card">
                <div className="announcement-quote-icon" aria-hidden="true">“</div>
                <div className="announcement-body">
                  <span className="announcement-tag">{t.popUpLocation.announcementLabel}</span>
                  <blockquote className="announcement-quote">
                    {currentEvent.announcement[lang]}
                  </blockquote>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="popup-actions-row">
                <a
                  href={currentEvent.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-btn-primary"
                  id="open-google-maps-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                  <span>{t.popUpLocation.openMapsBtn}</span>
                </a>

                <a
                  href={currentEvent.sourcePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-btn-secondary"
                  id="view-facebook-page-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>{t.popUpLocation.viewFbBtn}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Compliant Map Card, Schedule Rules & Contact Phone */}
            <div className="popup-media-column">
              {/* Compliant Stylized Market Map Card */}
              <div className="market-map-frame">
                <div className="map-visual-card">
                  {/* Stylized Market Location Blueprint Graphic */}
                  <div className="map-artistic-canvas">
                    <div className="map-grid-lines" aria-hidden="true" />
                    <div className="map-river-shape" aria-hidden="true" />
                    
                    {/* Market Pin Representation */}
                    <div className="map-market-pin-cluster">
                      <div className="map-pin-pulse" />
                      <div className="map-pin-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <div className="map-pin-label">
                        <span className="pin-title">ตลาดเซฟวันโก บางนา</span>
                        <span className="pin-booth">Booth {currentEvent.boothNumbers}</span>
                      </div>
                    </div>

                    <a
                      href={currentEvent.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-overlay-launch-link"
                      aria-label="Open location in Google Maps"
                    >
                      <span>Google Maps ↗</span>
                    </a>
                  </div>

                  {/* Map Information Bar */}
                  <div className="map-footer-bar">
                    <div className="map-legend-group">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <span className="map-legend-text">{t.popUpLocation.mapNotice}</span>
                    </div>

                    <button
                      type="button"
                      className="copy-address-action-btn"
                      onClick={handleCopyAddress}
                    >
                      {copyFeedback ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{lang === 'th' ? 'คัดลอกแล้ว' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>{lang === 'th' ? 'คัดลอกที่อยู่' : 'Copy Address'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Operating Hours Compliance Notice */}
              <div className="compliance-hours-notice">
                <div className="notice-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="notice-content">
                  <span className="notice-heading">
                    {lang === 'th' ? 'รอบเวลาจำหน่าย' : 'OPERATING HOURS'}
                  </span>
                  <p className="notice-body">{t.popUpLocation.hoursNotice}</p>
                </div>
              </div>

              {/* Telephone & Contact Verification Box */}
              <div className="contact-verification-box">
                <div className="contact-box-header">
                  <span className="contact-box-label">{t.popUpLocation.contactPhoneLabel}</span>
                  <span className={`verification-badge badge-${currentEvent.verificationStatus.toLowerCase()}`}>
                    {t.popUpLocation.verificationBadge}
                  </span>
                </div>

                <div className="phone-display-row">
                  {currentEvent.contactPhone ? (
                    <button
                      type="button"
                      onClick={handlePhoneClick}
                      className="phone-unverified-btn"
                      aria-label="Contact phone number pending verification"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="phone-number-text">{currentEvent.contactPhone}</span>
                      <span className="phone-locked-tag">
                        {lang === 'th' ? 'รอตรวจยืนยันเบอร์' : 'Verification Pending'}
                      </span>
                    </button>
                  ) : (
                    <span className="phone-number-text">—</span>
                  )}
                </div>

                <p className="verification-explanatory-note">
                  {t.popUpLocation.verificationNotice}
                </p>

                {showPhoneAlert && (
                  <div className="phone-pending-toast" role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>
                      {lang === 'th'
                        ? 'หมายเลขนี้ยังไม่ผ่านการตรวจยืนยัน เพื่อความปลอดภัยกรุณาติดต่อผ่าน Facebook Messenger ของทางร้านโดยตรง'
                        : 'Phone number is pending formal verification. Please contact the shop via Facebook Messenger directly.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
