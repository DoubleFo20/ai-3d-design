import React from 'react'
import type { Language, Translations } from '../i18n/translations'

interface NavbarProps {
  lang: Language
  onToggleLang: (lang: Language) => void
  t: Translations
  onReserveClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  t,
  onReserveClick,
}) => {
  return (
    <header className="editorial-header">
      {/* Topmost Concept Prototype Disclaimer Banner */}
      <div className="top-prototype-banner">
        <span className="banner-badge">{t.nav.prototypeBadge}</span>
        <span className="banner-text">
          {lang === 'th'
            ? 'ต้นแบบแนวคิดเว็บไซต์สำหรับศึกษาการออกแบบ 3D & Digital Showcase • ไม่ใช่เว็บไซต์ทางการของร้าน "ฉันชอบกลิ่นเนย"'
            : 'Independent 3D & digital showcase design prototype • Non-official concept website'}
        </span>
        <a
          href="https://www.facebook.com/CroissantNanchao"
          target="_blank"
          rel="noopener noreferrer"
          className="banner-link"
        >
          {t.nav.facebookLink}
        </a>
      </div>

      <div className="header-inner">
        {/* Brand identity */}
        <div className="brand-group">
          <a href="#" className="brand-logo" aria-label="Chan Chop Klin Noei Home">
            <span className="brand-title">{t.nav.brandTitle}</span>
            <span className="brand-sub">{t.nav.brandSub}</span>
          </a>
        </div>

        {/* Minimal editorial navigation */}
        <nav className="header-nav" aria-label="Primary Navigation">
          <a href="#menu" className="nav-link active">
            <span className="nav-index">01</span>
            <span>{t.nav.collection}</span>
          </a>
          <a href="#studio" className="nav-link">
            <span className="nav-index">02</span>
            <span>{lang === 'th' ? 'มุมมอง 3D & รูปภาพ' : '3D & Gallery'}</span>
          </a>
          <a href="#facebook" className="nav-link">
            <span className="nav-index">03</span>
            <span>{t.nav.heritage}</span>
          </a>
          <a href="#about" className="nav-link">
            <span className="nav-index">04</span>
            <span>{t.nav.atelier}</span>
          </a>
        </nav>

        {/* Right Status, Language Switcher & Facebook CTA */}
        <div className="header-actions">
          {/* Language Switcher Pill */}
          <div className="lang-switcher-pill" role="group" aria-label="Select Language">
            <button
              type="button"
              className={`lang-btn ${lang === 'th' ? 'active' : ''}`}
              onClick={() => onToggleLang('th')}
              aria-pressed={lang === 'th'}
            >
              TH
            </button>
            <span className="lang-divider">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => onToggleLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          {/* Oven live status */}
          <div className="baker-status">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-label">{t.nav.hearthActive}</span>
          </div>

          {/* Order/Inquire Demo CTA */}
          <button
            type="button"
            onClick={onReserveClick}
            className="header-cta-btn"
            aria-label={t.nav.reserveBtn}
          >
            <span>{t.nav.reserveBtn}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
