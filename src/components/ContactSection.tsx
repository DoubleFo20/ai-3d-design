import type { Language, Translations } from '../i18n/translations'

interface ContactSectionProps {
  lang?: Language
  t: Translations
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  t,
}) => {
  return (
    <section className="contact-cta-section" id="contact">
      <div className="section-container">
        <div className="contact-card-box">
          <p className="contact-eyebrow">{t.contact.sectionEyebrow}</p>
          <h2 className="contact-title">{t.contact.sectionTitle}</h2>
          <p className="contact-subtitle">{t.contact.sectionSubtitle}</p>

          <div className="contact-btn-group">
            {/* Primary Messenger Link */}
            <a
              href="https://m.me/CroissantNanchao"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-primary-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{t.contact.messengerBtn}</span>
            </a>

            {/* Secondary Facebook Page Link */}
            <a
              href="https://www.facebook.com/CroissantNanchao"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span>{t.contact.facebookPageBtn}</span>
            </a>
          </div>

          <div className="contact-inquiry-note">
            <span>{t.contact.inquiryNote}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
