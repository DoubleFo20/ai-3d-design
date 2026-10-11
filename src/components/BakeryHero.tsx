import React, { useEffect, useRef, useState } from 'react'
import type { Language, Translations } from '../i18n/translations'

interface BakeryHeroProps {
  lang: Language
  t: Translations
  onExploreMenu: () => void
}

export const BakeryHero: React.FC<BakeryHeroProps> = ({ lang, t, onExploreMenu }) => {
  const heroRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return
      const scrollY = window.scrollY
      const offset = scrollY * 0.22
      imgRef.current.style.transform = `translateY(${offset}px) scale(1.06)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`hero-c-section${loaded ? ' hero-c-loaded' : ''}`} id="hero" ref={heroRef}>
      {/* ── Background Image Layer (Parallax) ── */}
      <div className="hero-c-bg-layer" aria-hidden="true">
        <div className="hero-c-bg-img-wrap" ref={imgRef}>
          <img
            src="/products/demo_hero_croissant.jpg"
            alt=""
            className="hero-c-bg-img"
            loading="eager"
            onError={(e) => {
              // Graceful fallback if image missing
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
        {/* Cinematic gradient overlays */}
        <div className="hero-c-overlay-left" />
        <div className="hero-c-overlay-bottom" />
        <div className="hero-c-overlay-vignette" />
      </div>

      {/* ── Content Layer ── */}
      <div className="hero-c-content">
        <div className="hero-c-inner">

          {/* Left: Editorial Text Column */}
          <div className="hero-c-text-col">
            {/* Eyebrow */}
            <div className="hero-c-eyebrow-row">
              <span className="hero-c-dot" aria-hidden="true" />
              <span className="hero-c-eyebrow">{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-c-headline">
              <span className="hero-c-hl-main">{t.hero.titleMain}</span>
              <em className="hero-c-hl-accent">{t.hero.titleAccent}</em>
            </h1>

            {/* Narrative */}
            <p className="hero-c-narrative">{t.hero.description}</p>

            {/* Craft Specs Row */}
            <div className="hero-c-spec-strip">
              <div className="hero-c-spec">
                <span className="hcs-star" aria-hidden="true">✦</span>
                <span>{t.hero.specBatch}</span>
              </div>
              <span className="hcs-divider" aria-hidden="true" />
              <div className="hero-c-spec">
                <span className="hcs-star" aria-hidden="true">✦</span>
                <span>{t.hero.specButter}</span>
              </div>
              <span className="hcs-divider" aria-hidden="true" />
              <div className="hero-c-spec">
                <span className="hcs-star" aria-hidden="true">✦</span>
                <span>{t.hero.specHearth}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-c-actions">
              <a
                href="https://www.facebook.com/CroissantNanchao"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-c-btn-primary"
                id="hero-fb-cta"
              >
                {t.hero.orderFbBtn}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <button
                type="button"
                className="hero-c-btn-secondary"
                onClick={onExploreMenu}
                id="hero-explore-btn"
              >
                {t.hero.exploreMenuBtn}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            {/* Disclaimer */}
            <p className="hero-c-disclaimer">
              <span className="hcd-icon">ℹ</span>
              {lang === 'th'
                ? 'โปรเจกต์นี้อ้างอิงร้าน "ฉันชอบกลิ่นเนย" เพื่อสร้างต้นแบบเว็บไซต์เบเกอรี่ไทย (Demo Only)'
                : 'Prototype layout inspired by "Chan Chop Klin Noei" bakery — Concept Demo Only'}
            </p>
          </div>

          {/* Right: Floating Product Card */}
          <div className="hero-c-card-col">
            <div className="hero-c-product-card" role="img" aria-label={lang === 'th' ? 'ครัวซองต์ครีมสตรอว์เบอร์รี' : 'Strawberry Cream Croissant'}>
              {/* Card Header */}
              <div className="hcpc-header">
                <span className="hcpc-label">SIGNATURE</span>
                <span className="hcpc-batch">BATCH #245°C</span>
              </div>

              {/* Product Photo */}
              <div className="hcpc-photo-wrap">
                <img
                  src="/products/demo_hero_croissant.jpg"
                  alt={lang === 'th' ? 'ครัวซองต์ครีมสตรอว์เบอร์รี เนยสดแท้' : 'Artisan Strawberry Cream Croissant'}
                  className="hcpc-photo"
                  loading="eager"
                />
                {/* Demo visual overlay */}
                <div className="hcpc-demo-pill">
                  <span className="hcpc-demo-dot" aria-hidden="true" />
                  <span>
                    {lang === 'th' ? 'ภาพจำลองแนวคิด' : 'Demo Visual'}
                  </span>
                </div>
                {/* Floating artisan badge */}
                <div className="hcpc-artisan-badge">
                  <span className="hab-star">✦</span>
                  <span className="hab-name">
                    {lang === 'th' ? 'ครัวซองต์ครีมสตรอว์เบอร์รี' : 'Strawberry Cream Croissant'}
                  </span>
                </div>
              </div>

              {/* Card Metrics */}
              <div className="hcpc-metrics">
                <div className="hcpc-metric">
                  <span className="hcpc-metric-val">100%</span>
                  <span className="hcpc-metric-lbl">{lang === 'th' ? 'เนยสดแท้' : 'PURE BUTTER'}</span>
                </div>
                <div className="hcpc-metric-divider" />
                <div className="hcpc-metric">
                  <span className="hcpc-metric-val">36h</span>
                  <span className="hcpc-metric-lbl">{lang === 'th' ? 'หมักบ่มเย็น' : 'COLD PROOF'}</span>
                </div>
                <div className="hcpc-metric-divider" />
                <div className="hcpc-metric">
                  <span className="hcpc-metric-val">HAND</span>
                  <span className="hcpc-metric-lbl">{lang === 'th' ? 'คราฟต์ด้วยมือ' : 'HANDCRAFTED'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="hero-c-scroll-indicator" aria-hidden="true">
          <div className="hcsi-line" />
          <span className="hcsi-label">SCROLL</span>
        </div>
      </div>

      {/* Transition Wave to FeaturedCatalog */}
      <div className="hero-c-wave-transition" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--bg-surface)" />
        </svg>
      </div>
    </section>
  )
}
