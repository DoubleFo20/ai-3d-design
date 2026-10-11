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
      <div className="header-inner">
        {/* Brand identity */}
        <div className="brand-group">
          <a href="#" className="brand-logo" aria-label="Atelier 3D Home">
            <span className="brand-title">{t.nav.brandTitle}</span>
            <span className="brand-sub">{t.nav.brandSub}</span>
          </a>
        </div>

        {/* Minimal editorial navigation */}
        <nav className="header-nav" aria-label="Primary Navigation">
          <a href="#collection" className="nav-link active">
            <span className="nav-index">01</span>
            <span>{t.nav.collection}</span>
          </a>
          <a href="#savoir-faire" className="nav-link">
            <span className="nav-index">02</span>
            <span>{t.nav.savoirFaire}</span>
          </a>
          <a href="#heritage" className="nav-link">
            <span className="nav-index">03</span>
            <span>{t.nav.heritage}</span>
          </a>
          <a href="#atelier" className="nav-link">
            <span className="nav-index">04</span>
            <span>{t.nav.atelier}</span>
          </a>
        </nav>

        {/* Right Baker's live status, Language Switcher & CTA */}
        <div className="header-actions">
          {/* Language Switcher Pill */}
          <div className="lang-switcher-pill" role="group" aria-label="Select Language">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => onToggleLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <span className="lang-divider">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'th' ? 'active' : ''}`}
              onClick={() => onToggleLang('th')}
              aria-pressed={lang === 'th'}
            >
              TH
            </button>
          </div>

          {/* Oven live status */}
          <div className="baker-status">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-label">{t.nav.hearthActive}</span>
          </div>

          {/* Reserve CTA */}
          <button
            type="button"
            className="header-cta-btn"
            onClick={onReserveClick}
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
