/**
 * ATELIER 3D — Data Provider Architecture (Phase 4 / Phase E)
 * Decoupled catalog and Facebook page ingestion providers.
 */

import type {
  ProductItem,
  FacebookPostItem,
  BakeryMeta,
} from '../types/bakery'

export interface ICatalogProvider {
  getFeaturedProducts(): Promise<ProductItem[]>
  getProductById(id: string): Promise<ProductItem | null>
  getCuratedFacebookPosts(): Promise<FacebookPostItem[]>
  getBakeryMeta(): BakeryMeta
}

export const BAKERY_META: BakeryMeta = {
  brandName: {
    th: 'ฉันชอบกลิ่นเนย',
    en: 'CHAN CHOP KLIN NOEI',
  },
  brandSub: {
    th: 'ครัวซองต์และขนมอบเนยสดแท้ • กรุงเทพฯ',
    en: 'ARTISANAL CROISSANT & VIENNOISERIE • BANGKOK',
  },
  facebookUrl: 'https://www.facebook.com/CroissantNanchao',
  messengerUrl: 'https://m.me/CroissantNanchao',
  disclaimer: {
    th: 'เว็บไซต์นี้เป็น Concept Prototype สำหรับศึกษาการออกแบบดิจิทัลและ 3D ไม่ใช่เว็บไซต์ทางการของร้านฉันชอบกลิ่นเนย',
    en: 'This site is an experimental Concept Prototype exploring 3D & digital showcase design, not the official store website.',
  },
}

/**
 * 3 Target Mock Products based on "ฉันชอบกลิ่นเนย" Facebook reference
 * Note: Names, specs, and descriptions are experimental demonstration data
 * strictly designed to be easily replaced when verified store data is provided.
 */
export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'strawberry-croissant',
    name: {
      th: 'ครัวซองต์ครีมสตรอว์เบอร์รี',
      en: 'Strawberry Cream Croissant',
    },
    subtitle: {
      th: 'แป้งพับเนยสดแท้ สอดไส้ครีมละมุนและสตรอว์เบอร์รีสด',
      en: 'Laminated Pure Butter Pastry with Velvety Cream & Fresh Strawberry',
    },
    description: {
      th: 'ครัวซองต์สูตรเนยสดแท้ อบจนแป้งกรอบเป็นชั้นโปร่งด้านนอกและนุ่มชุ่มฉ่ำด้านใน สอดไส้ครีมสดรสละมุน ไม่หวานเลี่ยน ท็อปด้วยผลสตรอว์เบอร์รีสดตัดรสชาติอย่างลงตัว (ชื่อและภาพจำลองแนวคิดเพื่อการศึกษาการออกแบบดิจิทัล)',
      en: 'Artisan croissant made with pure butter, baked to a delicate honeycomb crust. Filled with light diplomat cream and topped with fresh strawberries. (Concept demonstration visual for showcase evaluation).',
    },
    images: ['/products/demo_strawberry_croissant.jpg'],
    hasRealPhoto: false,
    isDemoVisual: true,
    intakeSlotPath: 'public/products/strawberry_croissant_official.jpg',
    price: null,
    priceDisplayNote: {
      th: 'สอบถามราคาตามรอบอบทาง Facebook',
      en: 'Inquire current batch price on Facebook',
    },
    facebookPostUrl: 'https://www.facebook.com/CroissantNanchao',
    postDate: null,
    status: 'demo',
    glbPath: null, // No GLB -> Activates Photo Gallery view
    category: 'croissant',
    tags: [
      { th: 'เนยสดแท้', en: 'Pure Butter' },
      { th: 'ผลไม้สด', en: 'Fresh Berries' },
      { th: 'ครีมสดละมุน', en: 'Velvet Cream' },
    ],
    highlights: [
      {
        label: { th: 'ชนิดแป้ง', en: 'Lamination' },
        value: { th: 'แป้งพับเนยสดหลายชั้น', en: 'Multi-layer Butter Lamination' },
      },
      {
        label: { th: 'ไส้ขนม', en: 'Filling' },
        value: { th: 'ครีมสดรสละมุน', en: 'Light Fresh Cream' },
      },
      {
        label: { th: 'ท็อปปิ้ง', en: 'Topping' },
        value: { th: 'สตรอว์เบอร์รีสด', en: 'Fresh Strawberry' },
      },
      {
        label: { th: 'สถานะรูปภาพ', en: 'Photo Status' },
        value: { th: 'ภาพจำลองแนวคิด • รอภาพถ่ายจริงจากร้าน', en: 'Demo Concept Visual • Awaiting Official Photo Intake' },
      },
    ],
  },
  {
    id: 'mixed-fruit-danish',
    name: {
      th: 'เดนิชผลไม้รวม',
      en: 'Mixed Fruit Danish',
    },
    subtitle: {
      th: 'แป้งเดนิชกรอบ พับเนยคุณภาพ คัสตาร์ดและผลไม้สดรวม',
      en: 'Crisp Danish Pastry with Vanilla Bean Custard & Seasonal Fruits',
    },
    description: {
      th: 'แป้งเดนิชสูตรพิเศษกรอบเป็นชั้นเบา สอดไส้คัสตาร์ดวานิลลาหอมเนียน แต่งหน้าด้วยผลไม้สดหลากหลายชนิดตามฤดูกาล ให้รสสัมผัสสดชื่นตัดกับความหอมมันของเนยสด (ชื่อและภาพจำลองแนวคิดเพื่อการศึกษาการออกแบบดิจิทัล)',
      en: 'Flaky Danish pastry folded with rich butter, layered with aromatic vanilla custard, and generously topped with seasonal fresh fruits. (Concept demonstration visual for showcase evaluation).',
    },
    images: ['/products/demo_mixed_fruit_danish.jpg'],
    hasRealPhoto: false,
    isDemoVisual: true,
    intakeSlotPath: 'public/products/mixed_fruit_danish_official.jpg',
    price: null,
    priceDisplayNote: {
      th: 'สอบถามราคาตามรอบอบทาง Facebook',
      en: 'Inquire current batch price on Facebook',
    },
    facebookPostUrl: 'https://www.facebook.com/CroissantNanchao',
    postDate: null,
    status: 'demo',
    glbPath: null, // No GLB -> Activates Photo Gallery view
    category: 'danish',
    tags: [
      { th: 'แป้งเดนิชกรอบ', en: 'Flaky Danish' },
      { th: 'ผลไม้รวม', en: 'Mixed Fruits' },
      { th: 'คัสตาร์ดหอมเนียน', en: 'Vanilla Custard' },
    ],
    highlights: [
      {
        label: { th: 'โครงสร้างแป้ง', en: 'Dough Structure' },
        value: { th: 'เดนิชกรอบพับเนย', en: 'Layered Danish Pastry' },
      },
      {
        label: { th: 'ฐานครีม', en: 'Custard Base' },
        value: { th: 'วานิลลาคัสตาร์ดนุ่ม', en: 'Smooth Vanilla Custard' },
      },
      {
        label: { th: 'การคัดสรร', en: 'Selection' },
        value: { th: 'ผลไม้สดตามฤดูกาล', en: 'Seasonal Fresh Fruits' },
      },
      {
        label: { th: 'สถานะรูปภาพ', en: 'Photo Status' },
        value: { th: 'ภาพจำลองแนวคิด • รอภาพถ่ายจริงจากร้าน', en: 'Demo Concept Visual • Awaiting Official Photo Intake' },
      },
    ],
  },
  {
    id: 'nut-cream-pastry',
    name: {
      th: 'ขนมอบหน้าครีมและถั่ว',
      en: 'Nut & Cream Pastry',
    },
    subtitle: {
      th: 'แป้งพายกรอบคาราเมล ครีมเนื้อเนียน และถั่วคั่วหอมกรุบกรอบ',
      en: 'Caramelized Crispy Crust with Smooth Cream & Roasted Nuts',
    },
    description: {
      th: 'ขนมอบแป้งพายกรอบกลิ่นเนยเตาอบ สอดไส้ครีมเนียนนุ่ม ท็อปปิ้งด้วยถั่วคั่วพรีเมียมเคลือบคาราเมลบางเบา ให้สัมผัสกรุบกรอบเคี้ยวเพลินควบคู่กับความหอมของเนยแท้ (ชื่อและภาพจำลองแนวคิดเพื่อการศึกษาการออกแบบดิจิทัล)',
      en: 'Crisp layered butter pastry layered with smooth diplomat cream and crowned with lightly caramelized roasted nuts for a delightful textural crunch. (Concept demonstration visual for showcase evaluation).',
    },
    images: ['/products/demo_nut_cream_pastry.jpg'],
    hasRealPhoto: false,
    isDemoVisual: true,
    intakeSlotPath: 'public/products/nut_cream_pastry_official.jpg',
    price: null,
    priceDisplayNote: {
      th: 'สอบถามราคาตามรอบอบทาง Facebook',
      en: 'Inquire current batch price on Facebook',
    },
    facebookPostUrl: 'https://www.facebook.com/CroissantNanchao',
    postDate: null,
    status: 'demo',
    glbPath: null, // No GLB -> Activates Photo Gallery view
    category: 'pastry',
    tags: [
      { th: 'ถั่วคั่วหอม', en: 'Roasted Nuts' },
      { th: 'คาราเมลบาง', en: 'Caramel Glaze' },
      { th: 'แป้งกรอบชุ่มเนย', en: 'Buttery Crust' },
    ],
    highlights: [
      {
        label: { th: 'เนื้อสัมผัส', en: 'Texture' },
        value: { th: 'กรอบนอก ครีมนุ่มใน', en: 'Crispy Crust & Smooth Interior' },
      },
      {
        label: { th: 'ถั่วคั่ว', en: 'Nut Blend' },
        value: { th: 'ถั่วพรีเมียมคั่วสด', en: 'Fresh Roasted Nut Blend' },
      },
      {
        label: { th: 'ความหวาน', en: 'Sweetness' },
        value: { th: 'หวานน้อย ละมุน', en: 'Balanced, Mild Sweetness' },
      },
      {
        label: { th: 'สถานะรูปภาพ', en: 'Photo Status' },
        value: { th: 'ภาพจำลองแนวคิด • รอภาพถ่ายจริงจากร้าน', en: 'Demo Concept Visual • Awaiting Official Photo Intake' },
      },
    ],
  },
]

/**
 * Benchmark 3D Engineering Asset preserved for Developer Preview section
 */
export const DEVELOPER_3D_ASSET: ProductItem = {
  id: 'canele-study',
  name: {
    th: 'กานาเล เดอ บอร์โด (3D ศึกษา)',
    en: 'Canelé de Bordeaux (3D Study)',
  },
  subtitle: {
    th: 'โมเดล 3D ทดลอง PBR ฉบับสมบูรณ์ (พร้อมหมุนดู 360 องศา)',
    en: 'Interactive 3D PBR Asset (~85% Photoreal Benchmark)',
  },
  description: {
    th: 'โมเดล 3D ของกานาเลที่สร้างขึ้นในระบบ ATELIER 3D เพื่อสาธิตความสามารถของตัวแสดงผล 3D Viewer Interactive รองรับการหมุน 360°, ส่องโครงลวดตาข่าย และทดสอบระบบโหลด GLB',
    en: 'The benchmark 3D PBR asset retained to demonstrate the interactive 3D viewer capabilities, full OrbitControls, wireframe inspection, and GLB asset loading pipeline.',
  },
  images: ['/models/textures/canele_basecolor.png'],
  hasRealPhoto: false,
  intakeSlotPath: 'public/models/canele.glb',
  price: null,
  priceDisplayNote: {
    th: 'โมเดลสำหรับทดสอบ 3D Viewer',
    en: '3D Viewer Demonstration Model',
  },
  facebookPostUrl: 'https://www.facebook.com/CroissantNanchao',
  postDate: null,
  status: 'demo',
  glbPath: '/models/canele.glb',
  category: 'specialty',
  tags: [
    { th: '3D Interactive', en: '3D Interactive' },
    { th: 'GLB Production', en: 'GLB Production' },
    { th: 'PBR Shaders', en: 'PBR Shaders' },
  ],
  highlights: [
    {
      label: { th: 'ระบบแสดงผล', en: 'Renderer' },
      value: { th: 'WebGL Three.js 60 FPS', en: 'WebGL Three.js 60 FPS' },
    },
    {
      label: { th: 'โพลีกอน', en: 'Geometry' },
      value: { th: '63,840 Triangles (1 Draw Call)', en: '63,840 Triangles (1 Draw Call)' },
    },
    {
      label: { th: 'เนื้อสัมผัส', en: 'Textures' },
      value: { th: '2K PBR (BaseColor, Normal, ORM)', en: '2K PBR (BaseColor, Normal, ORM)' },
    },
    {
      label: { th: 'การควบคุม', en: 'Interaction' },
      value: { th: 'Drag Rotate • Zoom • Reset', en: 'Drag Rotate • Zoom • Reset' },
    },
  ],
}

/**
 * Curated Facebook Post Ingestion Blueprints (Simulated Feed Slots)
 * Demonstrates the curated post pipeline without scraping or live token coupling.
 */
export const CURATED_FACEBOOK_POSTS: FacebookPostItem[] = [
  {
    postId: 'post-fb-001',
    message: {
      th: '[ตัวอย่างการจัดวาง Demo Feed] ครัวซองต์อบสดใหม่จากเตาเช้าวันนี้ กลิ่นเนยหอมฟุ้งทั่วร้าน แป้งกรอบฟูเป็นชั้น สอดไส้ครีมสดสตรอว์เบอร์รีพร้อมเสิร์ฟ 🍓🥐',
      en: '[Simulated Demo Feed] Freshly baked croissants out of the hearth this morning! Fragrant pure butter aroma, crispy flaky layers, filled with fresh strawberry cream 🍓🥐',
    },
    image: '/products/demo_strawberry_croissant.jpg',
    permalink: 'https://www.facebook.com/CroissantNanchao',
    publishedTime: 'Demo Slot #01',
    productClassification: 'croissant',
    approvalStatus: 'approved',
    authorName: 'ฉันชอบกลิ่นเนย',
  },
  {
    postId: 'post-fb-002',
    message: {
      th: '[ตัวอย่างการจัดวาง Demo Feed] เดนิชผลไม้รวม ผลไม้สดฉ่ำตัดกับคัสตาร์ดวานิลลานุ่มนวล แป้งเดนิชกรอบสะท้อนแสงคาราเมล อบจำนวนจำกัดในแต่ละรอบ ✨',
      en: '[Simulated Demo Feed] Mixed Fruit Danish — juicy fresh fruits paired with velvety vanilla custard on golden crispy pastry. Limited batch each bake ✨',
    },
    image: '/products/demo_mixed_fruit_danish.jpg',
    permalink: 'https://www.facebook.com/CroissantNanchao',
    publishedTime: 'Demo Slot #02',
    productClassification: 'danish',
    approvalStatus: 'approved',
    authorName: 'ฉันชอบกลิ่นเนย',
  },
  {
    postId: 'post-fb-003',
    message: {
      th: '[ตัวอย่างการจัดวาง Demo Feed] สำหรับคนรักถั่วและคาราเมล ขนมอบหน้าครีมและถั่วคั่วสดใหม่ กรอบ มัน หวานน้อย ทานคู่กับกาแฟยามเช้า ☕🥜',
      en: '[Simulated Demo Feed] For nut and caramel lovers: freshly roasted nut and cream pastry. Crisp, nutty, gently sweet, perfect pairing with morning coffee ☕🥜',
    },
    image: '/products/demo_nut_cream_pastry.jpg',
    permalink: 'https://www.facebook.com/CroissantNanchao',
    publishedTime: 'Demo Slot #03',
    productClassification: 'specialty',
    approvalStatus: 'approved',
    authorName: 'ฉันชอบกลิ่นเนย',
  },
]

/**
 * MockCatalogProvider:
 * Production-ready mock implementation for frontend prototype evaluation.
 */
export class MockCatalogProvider implements ICatalogProvider {
  async getFeaturedProducts(): Promise<ProductItem[]> {
    return Promise.resolve(MOCK_PRODUCTS)
  }

  async getProductById(id: string): Promise<ProductItem | null> {
    const item = MOCK_PRODUCTS.find((p) => p.id === id) || null
    return Promise.resolve(item)
  }

  async getCuratedFacebookPosts(): Promise<FacebookPostItem[]> {
    // Only return posts with approvalStatus === 'approved' (curated filter)
    const approved = CURATED_FACEBOOK_POSTS.filter((post) => post.approvalStatus === 'approved')
    return Promise.resolve(approved)
  }

  getBakeryMeta(): BakeryMeta {
    return BAKERY_META
  }
}

/**
 * FacebookPageProvider:
 * Decoupled blueprint adapter for future Facebook Graph API integration.
 * Strictly adheres to Phase E security constraints:
 * - Does not embed tokens in client code.
 * - Does not scrape or bypass Facebook rate limits.
 * - Enforces server-side authentication proxy verification.
 */
export class FacebookPageProvider implements ICatalogProvider {
  private pageId?: string
  private backendProxyUrl?: string

  constructor(pageId?: string, backendProxyUrl?: string) {
    this.pageId = pageId
    this.backendProxyUrl = backendProxyUrl
  }

  async getFeaturedProducts(): Promise<ProductItem[]> {
    if (!this.backendProxyUrl || !this.pageId) {
      console.warn(
        '[FacebookPageProvider] Backend proxy not configured. Falling back to MockCatalogProvider.'
      )
      return new MockCatalogProvider().getFeaturedProducts()
    }
    // Future implementation will fetch via secure backend proxy
    throw new Error(
      'FacebookPageProvider requires verified server-side proxy credentials before activation.'
    )
  }

  async getProductById(id: string): Promise<ProductItem | null> {
    return new MockCatalogProvider().getProductById(id)
  }

  async getCuratedFacebookPosts(): Promise<FacebookPostItem[]> {
    if (!this.backendProxyUrl) {
      return new MockCatalogProvider().getCuratedFacebookPosts()
    }
    throw new Error('FacebookPageProvider server proxy endpoint not yet deployed.')
  }

  getBakeryMeta(): BakeryMeta {
    return BAKERY_META
  }
}

// Active singleton instance for application use
export const defaultCatalogProvider: ICatalogProvider = new MockCatalogProvider()
