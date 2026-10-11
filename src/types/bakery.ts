/**
 * ATELIER 3D — Real Bakery Showcase Data Types (Phase 4)
 * Reference: ฉันชอบกลิ่นเนย (https://www.facebook.com/CroissantNanchao)
 */

export type ProductStatus = 'demo' | 'verified'

export interface LocalizedString {
  th: string
  en: string
}

export interface ProductHighlight {
  label: LocalizedString
  value: LocalizedString
}

export interface ProductItem {
  id: string
  name: LocalizedString
  subtitle?: LocalizedString
  description: LocalizedString
  /**
   * Product image intake paths in /public or /assets.
   * If real file is not yet supplied by user, the UI displays the designated intake slot.
   */
  images: string[]
  hasRealPhoto: boolean
  isDemoVisual?: boolean
  intakeSlotPath: string
  price: number | null
  priceDisplayNote?: LocalizedString
  facebookPostUrl: string | null
  postDate: string | null
  status: ProductStatus
  /**
   * Optional 3D GLB path. If null, UI displays high-res Photo Gallery instead of 3D Canvas.
   */
  glbPath: string | null
  category: 'croissant' | 'danish' | 'pastry' | 'specialty'
  tags: LocalizedString[]
  highlights: ProductHighlight[]
}

export interface FacebookPostItem {
  postId: string
  message: LocalizedString
  image: string
  permalink: string
  publishedTime: string
  productClassification: 'croissant' | 'danish' | 'specialty' | 'announcement'
  approvalStatus: 'pending' | 'approved' | 'rejected'
  authorName: string
}

export interface BakeryMeta {
  brandName: LocalizedString
  brandSub: LocalizedString
  facebookUrl: string
  messengerUrl: string
  disclaimer: LocalizedString
}

export type PopUpStatus = 'today' | 'upcoming' | 'past'

export interface PopUpEvent {
  id: string
  eventDate: string // YYYY-MM-DD
  dayOfWeek?: LocalizedString
  venueName: LocalizedString
  venueAddress: LocalizedString
  boothNumbers: string
  mapUrl: string
  sourcePageUrl: string
  sourcePostUrl: string | null
  announcement: LocalizedString
  startTime: string | null
  endTime: string | null
  contactPhone: string | null
  contactVerified: boolean
  sourceType: 'manual_facebook_post'
  verificationStatus: 'PENDING' | 'VERIFIED'
  notes?: LocalizedString
}

