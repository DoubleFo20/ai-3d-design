import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroLeft } from './components/HeroLeft'
import { PastryScene, type PastryType } from './components/PastryScene'
import { EditorialDetails } from './components/EditorialDetails'
import { Footer } from './components/Footer'
import { ReserveDemoModal } from './components/ReserveDemoModal'
import { translations, type Language } from './i18n/translations'
import './App.css'

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const [activePastry, setActivePastry] = useState<PastryType>('canele')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const t = translations[lang]

  const handleOpenReserveModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    const pastryName = t.tabs[activePastry]
    setToastMessage(
      lang === 'th'
        ? `จำลองการสำรอง ${pastryName} สำเร็จ (Phase 1 Demo)`
        : `Simulated allocation for ${pastryName} recorded (Phase 1 Demo)`
    )
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  return (
    <div className="atelier-app" lang={lang}>
      {/* Editorial Masthead with Language Switcher */}
      <Navbar
        lang={lang}
        onToggleLang={setLang}
        t={t}
        onReserveClick={handleOpenReserveModal}
      />

      {/* Main Hero Section: Left Story + Right 3D Scene */}
      <main className="hero-editorial-section" id="collection">
        <div className="hero-asymmetric-grid">
          {/* Left Column: Heading, Craft Narrative, Specs, CTA */}
          <HeroLeft
            activePastry={activePastry}
            onReserveClick={handleOpenReserveModal}
            t={t}
          />

          {/* Right Column: Interactive 3D Product Scene */}
          <PastryScene
            activePastry={activePastry}
            onSelectPastry={setActivePastry}
            t={t}
          />
        </div>
      </main>

      {/* Four Pillars of Savoir-Faire */}
      <EditorialDetails t={t} />

      {/* Editorial Footer */}
      <Footer t={t} />

      {/* Explicit Phase 1 Prototype Demo State Modal */}
      <ReserveDemoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activePastry={activePastry}
        t={t}
      />

      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div className="reservation-toast" role="status" aria-live="polite">
          <span className="toast-badge">
            {lang === 'th' ? 'สถานะจำลอง' : 'DEMO STATUS'}
          </span>
          <span className="toast-msg">{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
