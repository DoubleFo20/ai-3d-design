import React from 'react'
import type { Translations } from '../i18n/translations'
import type { PastryType } from './PastryScene'

interface HeroLeftProps {
  activePastry: PastryType
  onReserveClick: () => void
  t: Translations
}

export const HeroLeft: React.FC<HeroLeftProps> = ({
  activePastry,
  onReserveClick,
  t,
}) => {
  const data = t.hero[activePastry]

  return (
    <div className="hero-left-column">
      {/* Category Eyebrow */}
      <div className="editorial-eyebrow">
        <span className="eyebrow-accent-line" />
        <span className="eyebrow-text">{data.subtitle}</span>
        <span className="eyebrow-yield">[{data.dailyYield}]</span>
      </div>

      {/* Main Editorial Headline */}
      <h1 className="hero-editorial-title">
        <span className="title-line">{data.title}</span>
        <span className="title-line italic-accent">{data.italicWord}</span>
      </h1>

      {/* Narrative Body Text */}
      <p className="hero-narrative-text">{data.description}</p>

      {/* Editorial Specs Matrix */}
      <div className="pastry-specs-matrix">
        {data.specs.map((spec, i) => (
          <div key={i} className="spec-item">
            <span className="spec-label">{spec.label}</span>
            <span className="spec-value">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Action CTA Group */}
      <div className="hero-cta-group">
        <button
          type="button"
          className="cta-primary-btn"
          onClick={onReserveClick}
        >
          <span>{t.hero.reserveBtn}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <a href="#savoir-faire" className="cta-secondary-btn">
          <span>{t.hero.exploreBtn}</span>
        </a>
      </div>

      {/* Baker's Tasting Note */}
      <div className="tasting-quote-card">
        <div className="tasting-quote-mark">“</div>
        <div className="tasting-quote-content">
          <p className="tasting-quote-text">{data.tastingNote}</p>
          <span className="tasting-quote-author">{t.hero.bakerSignoff}</span>
        </div>
      </div>
    </div>
  )
}
