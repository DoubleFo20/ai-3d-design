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

  // Simulated date mode for QA inspection (only shown when ?qa=true in URL)
  const [showQaControls] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get('qa') === 'true' || window.location.hash.includes('qa')
    }
    return false
  })
  const [simulatedDateOverride, setSimulatedDateOverride] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false)

  const effectiveReferenceDate = simulatedDateOverride || todayBangkok
  const activeResolution = getActivePopUpEvent(effectiveReferenceDate)

  // Current selected event
  const [selectedEventId, setSelectedEventId] = useState<string>(
    activeResolution?.event.id || POP_UP_SCHEDULE[0]?.id || '',
  )

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
      setTimeout(() => setCopyFeedback(false), 2400)
    } catch {
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2400)
    }
  }

  const cleanPhoneDial = currentEvent.contactPhone
    ? currentEvent.contactPhone.replace(/[^0-9+]/g, '')
    : '0836463651'

  // Standardize booth numbers presentation with en-dash
  const formattedBoothNumbers = currentEvent.boothNumbers.replace(/-/g, '–')

  return (
    <section
      className="popup-location-section"
      id="location"
      aria-labelledby="popup-location-title"
    >
      <div className="section-container">
        {/* Editorial Section Header */}
        <header className="location-section-header">
          <div className="header-meta-row">
            <span className="section-eyebrow">{t.popUpLocation.sectionEyebrow}</span>
            <div className="header-curated-badge" title={t.popUpLocation.curatedSourceDesc}>
              <span className="badge-dot" aria-hidden="true" />
              <span>{t.popUpLocation.curatedSourceBadge}</span>
            </div>
          </div>

          <h2 id="popup-location-title" className="section-title">
            {t.popUpLocation.sectionTitle}
          </h2>
          <p className="section-subtitle">{t.popUpLocation.sectionSubtitle}</p>
        </header>

        {/* Dynamic Pop-up Schedule Showcase Card */}
        <article className={`popup-main-card status-${currentStatus}`}>
          {/* Card Top Banner: Date Status Pill & Date Summary */}
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
                <span className="date-day">{currentEvent.dayOfWeek?.[lang]}</span>
                <span className="date-separator">•</span>
                <span className="date-formatted">{formatPopUpDate(currentEvent.eventDate, lang)}</span>
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

            {/* QA Date Controls (Hidden on public site, enabled only with ?qa=true) */}
            {showQaControls && (
              <div className="qa-date-test-controls" aria-label="Date QA Tester">
                <span className="qa-test-label">QA Mode:</span>
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
                  title="Test Future mode"
                >
                  Upcoming
                </button>
                <button
                  type="button"
                  className={`qa-date-btn ${simulatedDateOverride === '2026-10-20' ? 'active' : ''}`}
                  onClick={() => setSimulatedDateOverride('2026-10-20')}
                  title="Test Past mode"
                >
                  Past
                </button>
              </div>
            )}
          </div>

          {/* Past Announcement Warning Notice if date is past */}
          {currentStatus === 'past' && (
            <div className="expired-notice-banner" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
              <span>{t.popUpLocation.expiredNotice}</span>
            </div>
          )}

          {/* Main Card Grid: Desktop 2 Columns / Mobile 1 Column */}
          <div className="popup-card-grid">
            {/* Left Column: Venue Info, Booth Number, Announcement & Action Buttons */}
            <div className="popup-info-column">
              {/* 1 & 2. Venue Name & Address Block */}
              <div className="venue-heading-block">
                <div className="venue-tag-row">
                  <span className="venue-category-tag">
                    {lang === 'th' ? 'ตลาดนัดและงานออกบูธ' : 'POP-UP MARKET & FAIR'}
                  </span>
                </div>
                <h3 className="venue-title">{currentEvent.venueName[lang]}</h3>
                <div className="venue-address-box">
                  <svg
                    className="venue-address-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="venue-address-text">{currentEvent.venueAddress[lang]}</p>
                </div>
              </div>

              {/* 3. High-Impact Booth Number Display */}
              <div className="booth-highlight-box">
                <div className="booth-header">
                  <span className="booth-label">{t.popUpLocation.boothLabel}</span>
                  <span className="booth-sub">{t.popUpLocation.boothSubtitle}</span>
                </div>
                <div className="booth-numbers-display" aria-label={`Booth numbers ${currentEvent.boothNumbers}`}>
                  <span className="booth-number-tag">{formattedBoothNumbers}</span>
                </div>
                <p className="booth-disclaimer-sub">
                  {lang === 'th'
                    ? '*หมายเลขล็อกบูธอ้างอิงจากประกาศของเพจ ไม่ใช่พิกัด GPS'
                    : '*Booth numbers reflect official post declaration, not GPS coordinates.'}
                </p>
              </div>

              {/* 4. Announcement Excerpt from Page Post */}
              <div className="post-announcement-card">
                <div className="announcement-quote-icon" aria-hidden="true">“</div>
                <div className="announcement-body">
                  <span className="announcement-tag">{t.popUpLocation.announcementLabel}</span>
                  <blockquote className="announcement-quote">
                    {currentEvent.announcement[lang]}
                  </blockquote>
                </div>
              </div>

              {/* 5. Primary Action Buttons (Google Maps & Facebook) */}
              <div className="popup-actions-row">
                <a
                  href={currentEvent.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-btn popup-btn-maps"
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
                  className="popup-btn popup-btn-fb"
                  id="view-facebook-page-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>{t.popUpLocation.viewFbBtn}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Stylized Map Card, Operating Hours & Contact Phone */}
            <div className="popup-media-column">
              {/* Stylized Market Map Card */}
              <div className="market-map-frame">
                <div className="map-visual-card">
                  {/* Stylized Market Location Blueprint Graphic */}
                  <div className="map-artistic-canvas">
                    <div className="map-grid-lines" aria-hidden="true" />
                    <div className="map-river-shape" aria-hidden="true" />
                    
                    {/* Market Pin Representation */}
                    <div className="map-market-pin-cluster">
                      <div className="map-pin-pulse" aria-hidden="true" />
                      <div className="map-pin-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <div className="map-pin-label">
                        <span className="pin-title">{currentEvent.venueName[lang]}</span>
                        <span className="pin-booth">Booth {formattedBoothNumbers}</span>
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
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
                      aria-label="Copy market address to clipboard"
                    >
                      {copyFeedback ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{lang === 'th' ? 'คัดลอกแล้ว' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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

              {/* Operating Hours Notice */}
              <div className="compliance-hours-notice">
                <div className="notice-icon-box" aria-hidden="true">
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

              {/* 6. Contact Phone & Direct Dial Card (Verified Owner Contact) */}
              <div className="contact-card-box">
                <div className="contact-card-header">
                  <div className="contact-label-group">
                    <span className="contact-card-label">{t.popUpLocation.contactPhoneLabel}</span>
                    <span className="contact-verified-dot" title="Verified Owner Contact">
                      <span className="verified-dot-inner" />
                      <span>{lang === 'th' ? 'เบอร์จริงของทางร้าน' : 'Verified Contact'}</span>
                    </span>
                  </div>
                </div>

                <div className="phone-action-container">
                  <a
                    href={`tel:${cleanPhoneDial}`}
                    className="phone-call-action-btn"
                    id="call-bakery-btn"
                    title={`${t.popUpLocation.callShopBtn}: ${currentEvent.contactPhone}`}
                  >
                    <div className="phone-btn-icon-circle">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="phone-btn-content">
                      <span className="phone-btn-cta">{t.popUpLocation.callShopBtn}</span>
                      <span className="phone-btn-number">{currentEvent.contactPhone}</span>
                    </div>
                    <div className="phone-btn-arrow" aria-hidden="true">
                      <span>{lang === 'th' ? 'โทรออก' : 'Call'}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </a>
                </div>

                <p className="contact-explanatory-note">
                  {t.popUpLocation.callShopNote}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

