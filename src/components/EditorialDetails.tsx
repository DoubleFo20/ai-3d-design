import React from 'react'
import type { Translations } from '../i18n/translations'

interface EditorialDetailsProps {
  t: Translations
}

export const EditorialDetails: React.FC<EditorialDetailsProps> = ({ t }) => {
  return (
    <section id="savoir-faire" className="editorial-details-section">
      <div className="details-header">
        <div className="details-header-left">
          <span className="section-eyebrow">{t.pillars.eyebrow}</span>
          <h2 className="section-title">{t.pillars.title}</h2>
        </div>
        <p className="details-header-desc">{t.pillars.desc}</p>
      </div>

      <div className="pillars-grid">
        {t.pillars.items.map((item) => (
          <div key={item.num} className="pillar-card">
            <div className="pillar-num">{item.num}</div>
            <h3 className="pillar-title">{item.title}</h3>
            <p className="pillar-desc">{item.desc}</p>
            <div className="pillar-meta">
              <span>{item.metaLeft}</span>
              <span>•</span>
              <span>{item.metaRight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
