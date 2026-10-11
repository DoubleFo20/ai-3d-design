import React from 'react'
import type { Language, Translations } from '../i18n/translations'

interface AboutBakeryProps {
  lang: Language
  t: Translations
}

export const AboutBakery: React.FC<AboutBakeryProps> = ({
  lang,
  t,
}) => {
  return (
    <section className="about-bakery-section" id="about">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <p className="section-eyebrow">{t.about.sectionEyebrow}</p>
          <h2 className="section-title">{t.about.sectionTitle}</h2>
        </div>

        {/* Story Narrative Asymmetric Grid */}
        <div className="about-narrative-grid">
          <div className="about-lead-col">
            <p className="lead-paragraph">{t.about.leadStory}</p>
            <div className="story-quote-card">
              <span className="quote-mark">“</span>
              <p className="quote-text">
                {lang === 'th'
                  ? 'กลิ่นเนยสดที่อบอวลออกจากเตาอบ คือคำสัญญาของความสุขในทุก ๆ เช้า'
                  : 'The intoxicating fragrance of pure butter from the hearth is a promise of morning delight.'}
              </p>
              <span className="quote-author">
                {lang === 'th' ? '— ฉันชอบกลิ่นเนย' : '— Chan Chop Klin Noei'}
              </span>
            </div>
          </div>

          <div className="about-text-col">
            <p className="body-paragraph">{t.about.storyP1}</p>
            <p className="body-paragraph">{t.about.storyP2}</p>

            {/* Three Craft Pillars */}
            <div className="craft-pillars-list">
              <div className="pillar-row">
                <span className="pillar-num">01</span>
                <div className="pillar-content">
                  <h4 className="pillar-title">{t.about.pillar1Title}</h4>
                  <p className="pillar-desc">{t.about.pillar1Desc}</p>
                </div>
              </div>

              <div className="pillar-row">
                <span className="pillar-num">02</span>
                <div className="pillar-content">
                  <h4 className="pillar-title">{t.about.pillar2Title}</h4>
                  <p className="pillar-desc">{t.about.pillar2Desc}</p>
                </div>
              </div>

              <div className="pillar-row">
                <span className="pillar-num">03</span>
                <div className="pillar-content">
                  <h4 className="pillar-title">{t.about.pillar3Title}</h4>
                  <p className="pillar-desc">{t.about.pillar3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Concept Prototype Disclaimer Notice Box */}
        <div className="about-disclaimer-box">
          <div className="disclaimer-badge-row">
            <span className="disclaimer-pill">IMPORTANT PROTOYPE NOTICE</span>
            <span className="disclaimer-title-text">{t.about.disclaimerTitle}</span>
          </div>
          <p className="disclaimer-body-text">{t.about.disclaimerDesc}</p>
        </div>
      </div>
    </section>
  )
}
