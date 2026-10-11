import React from 'react'
import type { Translations } from '../i18n/translations'

interface FooterProps {
  t: Translations
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="editorial-footer">
      <div className="footer-top-strip">
        <div className="footer-col brand-col">
          <span className="footer-logo">{t.nav.brandTitle}</span>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <div className="prototype-note">
            <span>{t.footer.prototypeNote}</span>
          </div>
        </div>

        <div className="footer-col">
          <span className="col-heading">{t.footer.hearthHeading}</span>
          <p className="col-content">
            <a
              href="https://www.facebook.com/CroissantNanchao"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-fb-link"
            >
              facebook.com/CroissantNanchao ↗
            </a>
            <br />
            {t.nav.brandSub}
          </p>
          <p className="col-hours">{t.footer.hours}</p>
        </div>

        <div className="footer-col">
          <span className="col-heading">{t.footer.collectionsHeading}</span>
          <ul className="footer-links">
            {t.footer.collections.map((item, idx) => (
              <li key={idx}>
                <a href="#menu">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <span className="col-heading">{t.footer.dispatchHeading}</span>
          <p className="dispatch-desc">{t.footer.dispatchDesc}</p>
          <a
            href="https://m.me/CroissantNanchao"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-msg-btn"
          >
            <span>Message on Facebook ↗</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom-strip">
        <span className="copyright">{t.footer.copyright}</span>
        <div className="footer-legal-badges">
          <span className="legal-tag">{t.footer.legalTech}</span>
          <span className="legal-tag">{t.footer.legalStyle}</span>
        </div>
      </div>
    </footer>
  )
}
