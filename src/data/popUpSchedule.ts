/**
 * ATELIER 3D — Pop-Up Schedule & Booth Location Data (Phase 4.3.1)
 * Reference Business: ฉันชอบกลิ่นเนย (https://www.facebook.com/CroissantNanchao)
 *
 * DATA POLICY:
 * - Data manually curated from user-provided Facebook post snapshot.
 * - Map marker represents the market venue, not individual booth GPS.
 * - Business hours and exact post permalink are unverified; not fabricated.
 * - Phone number is verified by owner: 083-646-3651 (Call Bakery direct).
 */

import type { PopUpEvent, PopUpStatus } from '../types/bakery'

export const POP_UP_SCHEDULE: PopUpEvent[] = [
  {
    id: 'save-one-go-bangna-20261011',
    eventDate: '2026-10-11',
    dayOfWeek: {
      th: 'วันอาทิตย์',
      en: 'Sunday',
    },
    venueName: {
      th: 'ตลาดเซฟวันโก บางนา',
      en: 'Save One Go Market Bangna',
    },
    venueAddress: {
      th: '1646 ถนนเทพรัตน แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260',
      en: '1646 Thep Rattana Rd, Bang Na Tai, Bang Na, Bangkok 10260',
    },
    boothNumbers: 'C97-C98-C99',
    mapUrl: 'https://share.google/hmyskC2sfz8L4qjNZ',
    sourcePageUrl: 'https://www.facebook.com/CroissantNanchao',
    sourcePostUrl: null, // Unknown permalink; not invented
    announcement: {
      th: 'ขนเมนูใหม่และเมนูยอดฮิตตลอดกาล กลับมาให้ลูกค้าได้ลิ้มลองกันให้หายคิดถึง',
      en: 'Bringing back our newest creations and all-time classic favorites to delight our lovely customers.',
    },
    startTime: null, // Unknown; do not invent
    endTime: null,
    contactPhone: '083-646-3651',
    contactVerified: true, // Verified by owner confirmation
    sourceType: 'manual_facebook_post',
    verificationStatus: 'VERIFIED',
    notes: {
      th: 'หมุดแผนที่ระบุตำแหน่งตลาดเซฟวันโก ไม่ใช่พิกัดล็อกบูธโดยตรง • เวลาจำหน่ายขึ้นอยู่กับรอบอบและประกาศทางเพจ',
      en: 'Map pin marks the market venue, not exact booth coordinates. Operating hours depend on daily bake schedule announced on page.',
    },
  },
]

/**
 * Returns current date string (YYYY-MM-DD) in Asia/Bangkok timezone.
 */
export function getBangkokTodayString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    return formatter.format(new Date())
  } catch {
    // Fallback if Intl timeZone is unavailable
    const d = new Date()
    return d.toISOString().slice(0, 10)
  }
}

/**
 * Calculates event status relative to Thai calendar date in Asia/Bangkok.
 */
export function getEventStatus(eventDate: string, referenceDate?: string): PopUpStatus {
  const today = referenceDate || getBangkokTodayString()
  if (eventDate === today) {
    return 'today'
  }
  return eventDate > today ? 'upcoming' : 'past'
}

/**
 * Resolves active pop-up event for display.
 * Priority: Today's event > Next upcoming event > Most recent past event.
 */
export function getActivePopUpEvent(referenceDate?: string): {
  event: PopUpEvent
  status: PopUpStatus
} | null {
  if (POP_UP_SCHEDULE.length === 0) return null

  const today = referenceDate || getBangkokTodayString()

  // 1. Check for today
  const todayEvent = POP_UP_SCHEDULE.find((e) => e.eventDate === today)
  if (todayEvent) {
    return { event: todayEvent, status: 'today' }
  }

  // 2. Check for upcoming
  const upcoming = POP_UP_SCHEDULE.filter((e) => e.eventDate > today).sort(
    (a, b) => a.eventDate.localeCompare(b.eventDate),
  )
  if (upcoming.length > 0) {
    return { event: upcoming[0], status: 'upcoming' }
  }

  // 3. Fallback to latest past event
  const past = POP_UP_SCHEDULE.filter((e) => e.eventDate < today).sort(
    (a, b) => b.eventDate.localeCompare(a.eventDate),
  )
  if (past.length > 0) {
    return { event: past[0], status: 'past' }
  }

  return { event: POP_UP_SCHEDULE[0], status: getEventStatus(POP_UP_SCHEDULE[0].eventDate, today) }
}

const THAI_MONTHS = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
]

const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Formats YYYY-MM-DD into human-readable bilingual date.
 */
export function formatPopUpDate(eventDate: string, lang: 'th' | 'en'): string {
  const [yearStr, monthStr, dayStr] = eventDate.split('-')
  const year = parseInt(yearStr, 10)
  const monthIdx = parseInt(monthStr, 10) - 1
  const day = parseInt(dayStr, 10)

  if (isNaN(year) || isNaN(monthIdx) || isNaN(day)) {
    return eventDate
  }

  if (lang === 'th') {
    const buddhistYear = year + 543
    const month = THAI_MONTHS[monthIdx] || monthStr
    return `${day} ${month} ${buddhistYear}`
  }

  const month = ENGLISH_MONTHS[monthIdx] || monthStr
  return `${month} ${day}, ${year}`
}
