/**
 * ATELIER 3D — Bakery Brand Recognition & Storefront Data
 * Reference Business: ฉันชอบกลิ่นเนย (https://www.facebook.com/CroissantNanchao)
 */

import type { LocalizedString } from '../types/bakery'

export interface BakeryScheduleItem {
  venue: LocalizedString
  days: LocalizedString
}

export interface RecognitionMarker {
  id: string
  label: LocalizedString
  description: LocalizedString
}

export interface BakeryBrandIdentityData {
  pageIdentity: {
    pageName: string
    category: LocalizedString
    logoImage: string
    cardScreenshot: string
    pageUrl: string
    messengerUrl: string
    displayUrl: string
    followers: LocalizedString
    schedules: BakeryScheduleItem[]
    helperCopy: LocalizedString
  }
  storefront: {
    title: LocalizedString
    photoImage: string
    photoAlt: LocalizedString
    description: LocalizedString
    markers: RecognitionMarker[]
  }
}

export const BAKERY_BRAND_IDENTITY: BakeryBrandIdentityData = {
  pageIdentity: {
    pageName: 'ฉันชอบกลิ่นเนย',
    category: {
      th: 'เบเกอรี่',
      en: 'Bakery',
    },
    logoImage: '/brand/bakery_logo.png',
    cardScreenshot: '/brand/facebook_page_card.png',
    pageUrl: 'https://www.facebook.com/CroissantNanchao',
    messengerUrl: 'https://m.me/CroissantNanchao',
    displayUrl: 'm.facebook.com/CroissantNanchao',
    followers: {
      th: 'ผู้ติดตาม 2.7 พันคน',
      en: '2.7K Followers',
    },
    schedules: [
      {
        venue: {
          th: 'เซฟวันโกแยกคปอ.',
          en: 'Save One Go Yaek Kor Por Aor',
        },
        days: {
          th: 'อังคาร / พฤหัสบดี',
          en: 'Tuesday / Thursday',
        },
      },
      {
        venue: {
          th: 'เซฟวันโกบางนา',
          en: 'Save One Go Bangna',
        },
        days: {
          th: 'พุธ / ศุกร์ / เสาร์ / อาทิตย์',
          en: 'Wednesday / Friday / Saturday / Sunday',
        },
      },
    ],
    helperCopy: {
      th: 'สำหรับลูกค้าที่ไม่เคยซื้อ สามารถดูข้อมูลเพจร้านและติดตามการอัปเดตวันขายได้จาก Facebook',
      en: 'For first-time customers, this page card helps identify the bakery and follow event/sales updates on Facebook.',
    },
  },
  storefront: {
    title: {
      th: 'ภาพหน้าร้านจริง',
      en: 'Real Storefront',
    },
    photoImage: '/brand/real_storefront_booth.jpg',
    photoAlt: {
      th: 'ภาพบูธหน้าร้านจริงของ ฉันชอบกลิ่นเนย ที่ตลาด',
      en: 'Real storefront booth photograph of Chan Chop Klin Noei at the market',
    },
    description: {
      th: 'ภาพบูธจริงของร้าน เพื่อช่วยให้ลูกค้าจดจำและมองหาร้านได้ง่ายเมื่อไปถึงตลาด',
      en: 'This real booth photo helps customers recognize the bakery more easily when arriving at the market.',
    },
    markers: [
      {
        id: 'signboard',
        label: {
          th: 'ป้ายร้าน “ฉันชอบกลิ่นเนย”',
          en: 'Signboard: "Chan Chop Klin Noei"',
        },
        description: {
          th: 'ป้ายไวนิลตัวอักษรสีแดงสลับขอบเหลืองสะดุดตาติดเหนือเต็นท์บูธ',
          en: 'Prominent vinyl banner with bold red and yellow lettering above the booth tent.',
        },
      },
      {
        id: 'display-counter',
        label: {
          th: 'ตู้โชว์ขนมด้านหน้า',
          en: 'Front Wooden Glass Display',
        },
        description: {
          th: 'ตู้กระจกกรอบไม้คลาสสิก เรียงทาร์ตไข่และขนมอบเนยสดอย่างเป็นระเบียบ',
          en: 'Classic wooden framed glass display showcasing freshly baked egg tarts and pastries.',
        },
      },
      {
        id: 'logo',
        label: {
          th: 'โลโก้ร้านบนป้าย',
          en: 'Bakery Logo on Banner',
        },
        description: {
          th: 'ตราสัญลักษณ์คุกกี้และหมวกเชฟ "ทำเอง...อบเอง" ที่มุมป้ายหน้าร้าน',
          en: 'Signature cookie and chef hat emblem marked on the storefront banner.',
        },
      },
      {
        id: 'contact-phone',
        label: {
          th: 'เบอร์โทรติดต่อบนป้าย',
          en: 'Contact Phone on Banner',
        },
        description: {
          th: 'ระบุ 083-646-3651 พร้อมป้ายข้อความ "เนยฝรั่งเศสแท้ 100%"',
          en: 'Shows 083-646-3651 alongside the "100% Pure French Butter" seal.',
        },
      },
    ],
  },
}
