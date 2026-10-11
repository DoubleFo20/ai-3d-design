import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { BakeryHero } from './components/BakeryHero'
import { BakeryIdentitySection } from './components/BakeryIdentitySection'
import { BakeryPopUpLocation } from './components/BakeryPopUpLocation'
import { FeaturedCatalog } from './components/FeaturedCatalog'
import { ProductDetailStage } from './components/ProductDetailStage'
import { Developer3DPreview } from './components/Developer3DPreview'
import { FacebookFeedPreview } from './components/FacebookFeedPreview'
import { AboutBakery } from './components/AboutBakery'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ProductDetailModal } from './components/ProductDetailModal'
import { ReserveDemoModal } from './components/ReserveDemoModal'
import { translations, type Language } from './i18n/translations'
import {
  defaultCatalogProvider,
  MOCK_PRODUCTS,
  DEVELOPER_3D_ASSET,
  CURATED_FACEBOOK_POSTS,
} from './services/catalogProvider'
import type { ProductItem, FacebookPostItem } from './types/bakery'
import './App.css'

export default function App() {
  const [lang, setLang] = useState<Language>('th')
  const [products, setProducts] = useState<ProductItem[]>(MOCK_PRODUCTS)
  const [activeProduct, setActiveProduct] = useState<ProductItem>(MOCK_PRODUCTS[0])
  const [posts, setPosts] = useState<FacebookPostItem[]>(CURATED_FACEBOOK_POSTS)

  // Modals state
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false)
  const [detailModalProduct, setDetailModalProduct] = useState<ProductItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const t = translations[lang]

  // Initialize data from decoupled Catalog Provider
  useEffect(() => {
    let mounted = true
    defaultCatalogProvider.getFeaturedProducts().then((data) => {
      if (mounted && data.length > 0) {
        setProducts(data)
        setActiveProduct(data[0])
      }
    })
    defaultCatalogProvider.getCuratedFacebookPosts().then((feed) => {
      if (mounted) {
        setPosts(feed)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const handleOpenReserveModal = () => {
    setIsReserveModalOpen(true)
  }

  const handleCloseReserveModal = () => {
    setIsReserveModalOpen(false)
    const name = activeProduct.name[lang]
    setToastMessage(
      lang === 'th'
        ? `จำลองการสอบถาม ${name} บันทึกสำเร็จ (ติดต่อสั่งซื้อจริงทาง Facebook)`
        : `Simulated inquiry for ${name} recorded (For official orders, visit Facebook)`
    )
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  const handleSelectProduct = (product: ProductItem) => {
    setActiveProduct(product)
  }

  const handleExploreMenu = () => {
    const el = document.getElementById('menu')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="atelier-app" lang={lang}>
      {/* 1. Header with Language Switcher & Concept Prototype Banner */}
      <Navbar
        lang={lang}
        onToggleLang={setLang}
        t={t}
        onReserveClick={handleOpenReserveModal}
      />

      <main className="main-content-flow">
        {/* 2. Premium Hero Section */}
        <BakeryHero
          lang={lang}
          t={t}
          onExploreMenu={handleExploreMenu}
        />

        {/* 2.2 Brand Recognition: Page Identity & Real Storefront Booth */}
        <BakeryIdentitySection
          lang={lang}
          t={t}
        />

        {/* 2.5 Pop-up Schedule & Booth Location (Phase 4.3) */}
        <BakeryPopUpLocation
          lang={lang}
          t={t}
        />

        {/* 3. Featured Products Catalog (3 Items + 3D Study) */}
        <FeaturedCatalog
          products={products}
          activeProductId={activeProduct.id}
          onSelectProduct={handleSelectProduct}
          onOpenDetailsModal={(prod) => setDetailModalProduct(prod)}
          lang={lang}
          t={t}
        />

        {/* 4. Product Detail & Photo Showcase Stage (3 Bakery Items) */}
        <ProductDetailStage
          products={products}
          activeProduct={activeProduct}
          onSelectProduct={handleSelectProduct}
          lang={lang}
          t={t}
        />

        {/* 5. 3D WebGL Engine & Asset Pipeline (Developer Preview) */}
        <Developer3DPreview
          caneleAsset={DEVELOPER_3D_ASSET}
          lang={lang}
          t={t}
        />

        {/* 6. Latest From Facebook Preview (Simulated Demo Feed) */}
        <FacebookFeedPreview
          posts={posts}
          lang={lang}
          t={t}
        />

        {/* 6. About the Bakery & Factual Narrative */}
        <AboutBakery
          lang={lang}
          t={t}
        />

        {/* 7. Contact / Messenger CTA Section */}
        <ContactSection
          lang={lang}
          t={t}
        />
      </main>

      {/* 8. Editorial Footer */}
      <Footer t={t} />

      {/* Product Detail Full Inspection Modal */}
      <ProductDetailModal
        isOpen={Boolean(detailModalProduct)}
        product={detailModalProduct}
        onClose={() => setDetailModalProduct(null)}
        onFocusProductInStudio={(prod) => {
          setActiveProduct(prod)
          const studioEl = document.getElementById('studio')
          if (studioEl) {
            studioEl.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        lang={lang}
        t={t}
      />

      {/* Simulated Batch Reservation Modal */}
      <ReserveDemoModal
        isOpen={isReserveModalOpen}
        onClose={handleCloseReserveModal}
        activePastry="canele"
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
