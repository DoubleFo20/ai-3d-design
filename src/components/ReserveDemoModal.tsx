import React, { useEffect } from 'react'
import type { Translations } from '../i18n/translations'
import type { PastryType } from './PastryScene'

interface ReserveDemoModalProps {
  isOpen: boolean
  onClose: () => void
  activePastry: PastryType
  t: Translations
}

export const ReserveDemoModal: React.FC<ReserveDemoModalProps> = ({
  isOpen,
  onClose,
  activePastry,
  t,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const pastryName = t.tabs[activePastry]
  const lotNumber =
    activePastry === 'canele'
      ? 'LOT-2026-CN01'
      : activePastry === 'sourdough'
        ? 'LOT-2026-SD02'
        : 'LOT-2026-BR03'

  return (
    <div
      className="demo-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="demo-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="demo-modal-top">
          <span className="demo-badge">
            <span className="badge-dot" aria-hidden="true" />
            {t.demoModal.badge}
          </span>
          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Title & Description */}
        <div className="demo-modal-body">
          <h2 id="modal-title" className="demo-modal-title">
            {t.demoModal.title}
          </h2>
          <p className="demo-modal-desc">{t.demoModal.desc}</p>

          {/* Allocation Ticket Strip */}
          <div className="allocation-ticket">
            <div className="ticket-row">
              <span className="ticket-label">
                {t.demoModal.reservedItemLabel}
              </span>
              <span className="ticket-value highlight">{pastryName}</span>
            </div>
            <div className="ticket-row">
              <span className="ticket-label">{t.demoModal.lotLabel}</span>
              <span className="ticket-value mono">{lotNumber}</span>
            </div>
            <div className="ticket-row">
              <span className="ticket-label">{t.demoModal.pickupLabel}</span>
              <span className="ticket-value">{t.demoModal.pickupTime}</span>
            </div>
          </div>

          <div className="demo-scope-card">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              className="scope-icon"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="scope-text">{t.demoModal.notice}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="demo-modal-actions">
          <button
            type="button"
            className="demo-modal-close-btn"
            onClick={onClose}
          >
            {t.demoModal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
