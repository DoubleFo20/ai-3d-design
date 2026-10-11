import React, { useState, useEffect } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on nav-link click
  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className={`editorial-header${scrolled ? ' scrolled' : ''}`}>
      {/* Top Prototype Disclaimer */}
      <div className="top-prototype-banner">
        <span className="banner-badge">{t.nav.prototypeBadge}</span>
        <span className="banner-text">
          {lang === 'th'
            ? 'ต้นแบบแนวคิดเว็บไซต์สำหรับศึกษาการออกแบบ 3D & Digital Showcase • ไม่ใช่เว็บไซต์ทางการของร้าน'
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
        {/* Brand */}
        <div className="brand-group">
          <a href="#" className="brand-logo" aria-label="Chan Chop Klin Noei Home">
            <span className="brand-title">{t.nav.brandTitle}</span>
            <span className="brand-sub">{t.nav.brandSub}</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Primary Navigation">
          <a href="#menu" className="nav-link active" onClick={handleNavClick}>
            <span className="nav-index">01</span>
            <span>{t.nav.collection}</span>
          </a>
          <a href="#studio" className="nav-link" onClick={handleNavClick}>
            <span className="nav-index">02</span>
            <span>{lang === 'th' ? 'ภาพสินค้า' : 'Gallery'}</span>
          </a>
          <a href="#developer-3d" className="nav-link" onClick={handleNavClick}>
            <span className="nav-index">03</span>
            <span>{lang === 'th' ? 'ห้องทดลอง 3D' : '3D Lab'}</span>
          </a>
          <a href="#about" className="nav-link" onClick={handleNavClick}>
            <span className="nav-index">04</span>
            <span>{t.nav.atelier}</span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Language Switcher */}
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

          {/* Hearth Status */}
          <div className="baker-status" aria-label="Bakery status">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-label">{t.nav.hearthActive}</span>
          </div>

          {/* Reserve CTA */}
          <button
            type="button"
            onClick={onReserveClick}
            className="header-cta-btn"
            aria-label={t.nav.reserveBtn}
          >
            <span>{t.nav.reserveBtn}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line mid ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-list" aria-label="Mobile Navigation">
          <a href="#menu" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="nav-index">01</span>{t.nav.collection}
          </a>
          <a href="#studio" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="nav-index">02</span>{lang === 'th' ? 'ภาพสินค้า' : 'Gallery'}
          </a>
          <a href="#developer-3d" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="nav-index">03</span>{lang === 'th' ? 'ห้องทดลอง 3D' : '3D Lab'}
          </a>
          <a href="#about" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="nav-index">04</span>{t.nav.atelier}
          </a>
        </nav>
        <button
          type="button"
          className="mobile-reserve-btn"
          onClick={() => { setMenuOpen(false); onReserveClick() }}
        >
          {t.nav.reserveBtn} ↗
        </button>
      </div>
    </header>
  )
}
