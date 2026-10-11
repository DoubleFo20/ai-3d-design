export type Language = 'en' | 'th'

export interface PastryTranslation {
  subtitle: string
  title: string
  italicWord: string
  description: string
  specs: { label: string; value: string }[]
  tastingNote: string
  dailyYield: string
  formMetric: string
}

export interface Translations {
  nav: {
    brandTitle: string
    brandSub: string
    collection: string
    savoirFaire: string
    heritage: string
    atelier: string
    hearthActive: string
    reserveBtn: string
    facebookLink: string
    prototypeBadge: string
  }
  hero: {
    canele: PastryTranslation
    sourdough: PastryTranslation
    brioche: PastryTranslation
    reserveBtn: string
    exploreBtn: string
    bakerSignoff: string
    badge: string
    eyebrow: string
    titleMain: string
    titleAccent: string
    description: string
    orderFbBtn: string
    exploreMenuBtn: string
    specBatch: string
    specButter: string
    specHearth: string
  }
  tabs: {
    canele: string
    sourdough: string
    brioche: string
  }
  catalog: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    photoSlotNotice: string
    demoBadge: string
    inquirePrice: string
    viewDetailBtn: string
    view3DBtn: string
    viewGalleryBtn: string
    allFilter: string
    croissantFilter: string
    danishFilter: string
    pastryFilter: string
    intakeGuide: string
    demoVisualBadge: string
    intakeBannerTitle: string
    intakeBannerDesc: string
  }
  detailStage: {
    sectionEyebrow: string
    sectionTitle: string
    view3DLabel: string
    viewPhotoLabel: string
    noGLBNotice: string
    hasGLBNotice: string
    inquireFbBtn: string
    intakeSlotLabel: string
    specsHeading: string
    verificationTitle: string
    verificationDesc: string
  }
  dev3D: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    benchmarkBadge: string
    benchmarkTitle: string
    benchmarkDesc: string
    metricPoly: string
    metricDraco: string
    metricFPS: string
    metricPBR: string
    orbitHint: string
    autoSpinLabel: string
    wireframeLabel: string
    resetLabel: string
  }
  facebookFeed: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    curatedBadge: string
    curatedDesc: string
    demoFeedBadge: string
    demoFeedDesc: string
    simulatedSlot: string
    openPostBtn: string
    visitPageBtn: string
    postedOn: string
  }
  popUpLocation: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    statusToday: string
    statusUpcoming: string
    statusPast: string
    boothLabel: string
    venueLabel: string
    dateLabel: string
    addressLabel: string
    announcementLabel: string
    openMapsBtn: string
    viewFbBtn: string
    contactPhoneLabel: string
    verificationBadge: string
    verificationNotice: string
    mapNotice: string
    hoursNotice: string
    expiredNotice: string
    curatedSourceBadge: string
    curatedSourceDesc: string
    boothSubtitle: string
  }
  about: {
    sectionEyebrow: string
    sectionTitle: string
    leadStory: string
    storyP1: string
    storyP2: string
    pillar1Title: string
    pillar1Desc: string
    pillar2Title: string
    pillar2Desc: string
    pillar3Title: string
    pillar3Desc: string
    disclaimerTitle: string
    disclaimerDesc: string
  }
  contact: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    messengerBtn: string
    facebookPageBtn: string
    inquiryNote: string
  }
  viewer: {
    disclaimerTitle: string
    disclaimerSub: string
    caneleAssetTitle: string
    caneleAssetSub: string
    dragHint: string
    autoSpin: string
    autoSpinOn: string
    autoSpinOff: string
    wireframe: string
    wireframeMesh: string
    wireframeShaded: string
    resetView: string
    loading3D: string
  }
  demoModal: {
    badge: string
    title: string
    desc: string
    reservedItemLabel: string
    lotLabel: string
    pickupLabel: string
    pickupTime: string
    notice: string
    closeBtn: string
  }
  pillars: {
    eyebrow: string
    title: string
    desc: string
    items: {
      num: string
      title: string
      desc: string
      metaLeft: string
      metaRight: string
    }[]
  }
  footer: {
    tagline: string
    prototypeNote: string
    hearthHeading: string
    hours: string
    collectionsHeading: string
    collections: string[]
    dispatchHeading: string
    dispatchDesc: string
    emailPlaceholder: string
    joinBtn: string
    copyright: string
    legalTech: string
    legalStyle: string
  }
}

export const translations: Record<Language, Translations> = {
  th: {
    nav: {
      brandTitle: 'ฉันชอบกลิ่นเนย',
      brandSub: 'ครัวซองต์และขนมอบเนยสดแท้ • กรุงเทพฯ',
      collection: 'เมนูขนมอบ',
      savoirFaire: 'ความตั้งใจอบ',
      heritage: 'อัปเดตจากเพจ',
      atelier: 'เกี่ยวกับร้าน',
      hearthActive: 'เตาอบร้อน • พร้อมเสิร์ฟความสด',
      reserveBtn: 'สอบถามรอบอบ',
      facebookLink: 'เพจ Facebook ↗',
      prototypeBadge: 'CONCEPT PROTOTYPE',
    },
    hero: {
      badge: 'ต้นแบบแนวคิดเว็บไซต์ • CONCEPT PROTOTYPE',
      eyebrow: 'ARTISANAL CROISSANT & VIENNOISERIE',
      titleMain: 'หอมกรุ่นกลิ่นเนยแท้,',
      titleAccent: 'ทุกชั้นของความประณีต.',
      description:
        'แรงบันดาลใจจากเพจ "ฉันชอบกลิ่นเนย" ร้านขนมอบที่คราฟต์ครัวซองต์และเดนิชด้วยเนยสดคุณภาพสูง แป้งพับหลายชั้นกรอบฟูสอดรับกับไส้ครีมและผลไม้สดอย่างลงตัว (ข้อมูลและภาพในเว็บนี้จัดทำขึ้นเพื่อการศึกษาการออกแบบดิจิทัลและ 3D ไม่ใช่เว็บไซต์ทางการ)',
      orderFbBtn: 'ติดต่อสั่งซื้อทาง Facebook ↗',
      exploreMenuBtn: 'ชมเมนูขนมอบแนะนำ',
      specBatch: 'อบสดใหม่ตามรอบ',
      specButter: 'เนยสดแท้คุณภาพสูง',
      specHearth: 'คราฟต์ด้วยมือทุกชิ้น',
      canele: {
        subtitle: 'โมเดล 3D ศึกษา • กานาเล เดอ บอร์โด',
        title: 'คาราเมลน้ำตาลไหม้กรอบ,',
        italicWord: 'สอดไส้คัสตาร์ดนุ่มละมุน.',
        description: 'อบในพิมพ์ทองแดงเคลือบไขผึ้งธรรมชาติ ผิวนอกสีมะฮอกกานีกรอบหอม สอดไส้คัสตาร์ดวานิลลามาดากัสการ์และรัมบ่ม',
        specs: [
          { label: 'พิมพ์ทองแดงแท้', value: '65 นาที ที่ 230°C' },
          { label: 'การเคลือบเงา', value: 'ไขผึ้งธรรมชาติและน้ำตาลอ้อย' },
          { label: 'การพักแป้ง', value: 'บ่มแป้ง 48 ชั่วโมง' },
        ],
        tastingNote: '“สัมผัสแรกกรอบคาราเมล ตามด้วยเนื้อคัสตาร์ดหอมวานิลลาละมุนลิ้น”',
        dailyYield: 'จำกัดจำนวนต่อรอบอบ',
        formMetric: 'รูปทรง: 12 ร่องคานาเล (12 FLUTES)',
      },
      sourdough: {
        subtitle: 'เรขาคณิตศึกษา • ปัง โอ เลอแว็ง',
        title: 'เปลือกกรอบลายผ่า,',
        italicWord: 'เนื้อในฟูโปร่งดั่งรวงผึ้ง.',
        description: 'ขนมปังซาวโดว์หมักยีสต์ธรรมชาติ 100% หมักบ่มข้ามคืน ดึงรสเปรี้ยวละมุนและกลิ่นหอมของข้าวสาลีโบราณ',
        specs: [
          { label: 'การหมักบ่ม', value: '36 ชั่วโมง อุณหภูมิควบคุม' },
          { label: 'ระดับความชื้น', value: '82% ไฮเดรชันสูง' },
          { label: 'การอบบนหินเตา', value: 'อบไอน้ำ 245°C' },
        ],
        tastingNote: '“รสเปรี้ยวผลไม้อ่อนโยน เนื้อหนึบฉ่ำน้ำ และเปลือกกรอบกลิ่นคาราเมลข้าวสาลี”',
        dailyYield: 'หมักบ่มจำกัดต่อวัน',
        formMetric: 'รูปทรง: ทรงรีผ่าหลังเต่า (BÂTARD)',
      },
      brioche: {
        subtitle: 'เรขาคณิตศึกษา • บริออช แทรซเซ',
        title: 'เส้นใยเนยนุ่มดั่งแพรไหม,',
        italicWord: 'มงกุฎเปียสีทองอร่าม.',
        description: 'บริออชสูตรฝรั่งเศสดั้งเดิม นวดด้วยเนยแท้ในสัดส่วนสูง ถักเปียประณีต เปลือกนอกสีทองเงางาม',
        specs: [
          { label: 'ปริมาณเนยแท้', value: 'เนยสดคุณภาพสูง' },
          { label: 'เทคนิคการถักเปีย', value: 'ถักเปียทรงมงกุฎ' },
          { label: 'การเคลือบผิวหน้า', value: 'ทาไข่สองรอบเพิ่มความเงา' },
        ],
        tastingNote: '“เนื้อนุ่มละมุนดั่งเส้นไหม อวลกลิ่นเนยสดหอมหวาน”',
        dailyYield: 'ถักมือจำกัดต่อรอบ',
        formMetric: 'รูปทรง: วงเปียถัก (BRAIDED ROSETTE)',
      },
      reserveBtn: 'สอบถามรอบอบทาง Facebook',
      exploreBtn: 'ชมเมนูขนมอบ',
      bakerSignoff: '— ฉันชอบกลิ่นเนย (อ้างอิงแนวคิดร้าน)',
    },
    tabs: {
      canele: 'กานาเล (3D)',
      sourdough: 'ครัวซองต์',
      brioche: 'เดนิช',
    },
    catalog: {
      sectionEyebrow: 'MENU COLLECTION',
      sectionTitle: 'ขนมอบแนะนำจากเตา',
      sectionSubtitle:
        'คัดสรรเมนูยอดนิยมจากเพจร้าน ขนมอบสดใหม่หอมเนยแท้ กรอบนอกนุ่มใน (ข้อมูลและภาพจำลองแนวคิดสำหรับ Showcase Prototype)',
      photoSlotNotice:
        'ช่องรับรูปภาพสินค้าจริง • เตรียมพร้อมรับรูปถ่ายความละเอียดสูงจากร้านโดยตรง',
      demoBadge: 'DEMO CATALOG',
      demoVisualBadge: 'ภาพจำลองแนวคิด (Demo Visual)',
      intakeBannerTitle: 'ระบบจัดเก็บและรับภาพถ่ายสินค้าจริง (Asset Intake Protocol)',
      intakeBannerDesc:
        'เว็บไซต์แสดงภาพจำลองแนวคิดแบบ Editorial Photography เพื่อประเมินสุนทรียภาพและความเหมาะสมในการนำเสนอ ท่านสามารถวางไฟล์ภาพจริงลงใน public/products/ ตามชื่อที่กำหนดเพื่อเปลี่ยนเป็นภาพสินค้าจริงได้ทันที',
      inquirePrice: 'สอบถามราคาตามรอบอบ',
      viewDetailBtn: 'ดูรายละเอียด',
      view3DBtn: 'เปิดโหมด 3D',
      viewGalleryBtn: 'ชมภาพถ่าย',
      allFilter: 'ทั้งหมด (All)',
      croissantFilter: 'ครัวซองต์ (Croissant)',
      danishFilter: 'เดนิช (Danish)',
      pastryFilter: 'ขนมอบอื่น ๆ (Pastry)',
      intakeGuide: 'วางไฟล์รูปในโฟลเดอร์ public/products/ เพื่อให้แสดงรูปจริงทันที',
    },
    detailStage: {
      sectionEyebrow: 'ARTISAN PRODUCT GALLERY',
      sectionTitle: 'สุนทรียภาพและรายละเอียดขนมอบ',
      view3DLabel: '3D INTERACTIVE VIEW',
      viewPhotoLabel: 'PRODUCT PHOTO GALLERY',
      noGLBNotice:
        'สินค้ารายการนี้อยู่ระหว่างรอโมเดล 3D Scan จริง • กำลังแสดงมุมมอง Photo Gallery และช่องรับรูปภาพ',
      hasGLBNotice:
        'สินค้ารายการนี้มีโมเดล 3D PBR พร้อมหมุนดูรอบทิศทาง 360 องศา',
      inquireFbBtn: 'สอบถามสินค้านี้ทาง Facebook Messenger ↗',
      intakeSlotLabel: 'ช่องรับไฟล์ภาพจริง:',
      specsHeading: 'คุณลักษณะของขนมอบ (Product Specs)',
      verificationTitle: 'สถานะการตรวจสอบข้อมูล (Verification Status)',
      verificationDesc:
        'ข้อมูล รายละเอียด และรูปภาพในส่วนนี้เป็นข้อมูลจำลองเพื่อการศึกษาการจัดวางระบบ (Layout Prototype) สามารถอัปเดตข้อมูลจริงได้ทันทีเมื่อได้รับการยืนยันจากทางร้าน',
    },
    dev3D: {
      sectionEyebrow: '3D LAB & ASSET PIPELINE',
      sectionTitle: 'ระบบทดลอง 3D WebGL (Developer Preview)',
      sectionSubtitle:
        'ส่วนประเมินศักยภาพเทคโนโลยี 3D Interactive สำหรับนักพัฒนาและผู้บริหาร — สาธิตการโหลดโมเดล GLB ที่บีบอัดด้วย Draco และการเรนเดอร์ PBR เสมือนจริง',
      benchmarkBadge: 'BENCHMARK ASSET (~85% PHOTOREAL)',
      benchmarkTitle: 'กานาเล เดอ บอร์โด (Canelé 3D Study)',
      benchmarkDesc:
        'โมเดลอ้างอิงเพื่อทดสอบประสิทธิภาพ Three.js, WebGL Context, OrbitControls และ Draco Decompression บนทุกอุปกรณ์โดยไม่ลดทอนความลื่นไหล',
      metricPoly: '63,840 Triangles (1 Draw Call)',
      metricDraco: 'Draco Decompressed (590 KB)',
      metricFPS: '60 FPS Hardware Accelerated',
      metricPBR: '2K PBR Shaders (BaseColor, Normal, ORM)',
      orbitHint: 'คลิกค้างแล้วลากเพื่อหมุน 360° • สกอร์ลเพื่อซูมเข้า/ออก',
      autoSpinLabel: 'หมุนอัตโนมัติ (Auto Spin)',
      wireframeLabel: 'โครงลวดตาข่าย (Wireframe)',
      resetLabel: 'รีเซ็ตมุมกล้อง (Reset Camera)',
    },
    facebookFeed: {
      sectionEyebrow: 'LATEST FROM FACEBOOK',
      sectionTitle: 'ตัวอย่างฟีดจำลองจาก Facebook (Demo Feed)',
      sectionSubtitle:
        'โครงสร้างระบบคัดเลือกโพสต์สินค้าจากหน้าเพจ "ฉันชอบกลิ่นเนย" โดยไม่ต้อง Scrape และปลอดภัยตามมาตรฐาน API (ข้อมูลจำลองเพื่อทดสอบเลย์เอาต์)',
      curatedBadge: 'CURATED FEED PROTOTYPE',
      curatedDesc:
        'ระบบเตรียมโครงสร้าง Data Provider แยกส่วน พร้อมเชื่อมต่อ Facebook Graph API เมื่อได้รับสิทธิ์ยืนยันจากร้าน',
      demoFeedBadge: 'DEMO FEED • จำลองการนำเข้า',
      demoFeedDesc: 'โพสต์และวันที่ด้านล่างเป็นข้อมูลจำลองเพื่อทดสอบการจัดวางเค้าโครง ไม่ใช่โพสต์จริงจากเพจ',
      simulatedSlot: 'ช่องจำลองโพสต์ (Demo Slot)',
      openPostBtn: 'ดูโพสต์นี้บน Facebook ↗',
      visitPageBtn: 'เยี่ยมชมเพจ Facebook ของร้าน ↗',
      postedOn: 'ช่องจำลองวันที่:',
    },
    popUpLocation: {
      sectionEyebrow: 'WHERE TO FIND US',
      sectionTitle: 'วันนี้ร้านอยู่ที่ไหน?',
      sectionSubtitle:
        'อัปเดตสถานที่และล็อกบูธออกงานจำหน่าย จากประกาศอย่างเป็นทางการของเพจ ฉันชอบกลิ่นเนย',
      statusToday: 'ออกบูธตามประกาศวันนี้',
      statusUpcoming: 'ประกาศออกบูธล่วงหน้า',
      statusPast: 'ประกาศออกบูธย้อนหลัง',
      boothLabel: 'ล็อกบูธจำหน่าย',
      venueLabel: 'สถานที่ออกบูธ',
      dateLabel: 'วันและรอบออกบูธ',
      addressLabel: 'ที่ตั้งและเส้นทาง',
      announcementLabel: 'ประกาศจากเพจ',
      openMapsBtn: 'เปิดพิกัดใน Google Maps ↗',
      viewFbBtn: 'ดูเพจทางการบน Facebook ↗',
      contactPhoneLabel: 'เบอร์โทรศัพท์ติดต่อ',
      verificationBadge: 'รอตรวจยืนยัน (PENDING)',
      verificationNotice:
        'เบอร์โทรศัพท์จากบันทึกเดิม รอตรวจยืนยันข้อมูลก่อนเปิดโทรติดต่อโดยตรง',
      mapNotice:
        'หมุดแผนที่ระบุบริเวณตลาดเซฟวันโก ไม่ใช่พิกัดล็อกบูธโดยตรง',
      hoursNotice:
        'เวลาจำหน่ายขึ้นอยู่กับรอบอบและประกาศทางเพจ (ไม่มีการระบุเวลาในโพสต์)',
      expiredNotice:
        'ประกาศนี้ผ่านพ้นไปแล้ว กรุณาติดตามประกาศออกบูธรอบถัดไปทาง Facebook',
      curatedSourceBadge: 'ข้อมูลคัดลอกจาก Facebook Post',
      curatedSourceDesc:
        'คัดลอกจากโพสต์ทางการของเพจ ฉันชอบกลิ่นเนย โดยผู้ดูแลระบบ (ไม่ได้ใช้การ Scrape และยังไม่มีการเชื่อมต่อ Graph API)',
      boothSubtitle: 'ค้นหาป้ายร้านและเคาน์เตอร์ขนมอบได้ที่ล็อกนี้',
    },
    about: {
      sectionEyebrow: 'ABOUT THE BAKERY',
      sectionTitle: 'เรื่องราวของ "ฉันชอบกลิ่นเนย"',
      leadStory:
        'ร้านขนมอบที่เริ่มต้นจากความหลงใหลในความหอมละมุนและเสน่ห์ของเนยสดแท้ รังสรรค์ครัวซองต์และเบเกอรี่ด้วยหัวใจของช่างทำขนม',
      storyP1:
        'จุดเด่นของทางร้านคือการคัดสรรเนยสดแท้คุณภาพสูง การควบคุมอุณหภูมิและกระบวนการพับแป้งอย่างพิถีพิถัน เพื่อให้ได้ครัวซองต์ที่กรอบเป็นชั้นฟูสวยงาม ส่งกลิ่นเนยหอมอบอวลทั่วทั้งเตาอบในทุก ๆ เช้า',
      storyP2:
        'นอกจากครัวซองต์คลาสสิก ทางร้านยังสร้างสรรค์เมนูเดนิชหน้าผลไม้สดและขนมอบหลากหลายชนิด โดยเน้นความสดใหม่และรสชาติที่กลมกล่อมลงตัว ไม่หวานเลี่ยนจนเกินไป',
      pillar1Title: 'เนยสดแท้คุณภาพ',
      pillar1Desc: 'หัวใจสำคัญคือเนยแท้คุณภาพสูงที่ให้กลิ่นหอมเฉพาะตัวและเนื้อสัมผัสกรอบฉ่ำ',
      pillar2Title: 'แป้งพับหลายชั้น',
      pillar2Desc: 'เทคนิคการรีดพับแป้งที่ประณีต ทำให้เกิดโพรงรวงผึ้งโปร่งเบาและกรอบฟู',
      pillar3Title: 'อบสดใหม่ตามรอบ',
      pillar3Desc: 'อบสดใหม่เพื่อคงความกรอบและกลิ่นหอมอันเป็นเอกลักษณ์ไว้ดีที่สุด',
      disclaimerTitle: 'ข้อความแจ้งสถานะต้นแบบแนวคิด (Concept Prototype Notice)',
      disclaimerDesc:
        'เว็บไซต์นี้จัดทำขึ้นโดยทีมงานอิสระเพื่อเป็น "ตัวอย่างต้นแบบแนวคิด (Design Prototype)" ในการประยุกต์ใช้เทคโนโลยี 3D Interactive WebGL ร่วมกับธุรกิจเบเกอรี่ไทย โดยไม่ได้มีส่วนเกี่ยวข้องอย่างเป็นทางการ ไม่ได้มีระบบสั่งซื้อ ชำระเงิน หรือตัดสต็อกจริง และไม่ได้แอบอ้างสิทธิ์ในเครื่องหมายการค้าของทางร้านแต่อย่างใด',
    },
    contact: {
      sectionEyebrow: 'GET IN TOUCH',
      sectionTitle: 'สั่งซื้อและติดต่อทาง Facebook',
      sectionSubtitle:
        'เนื่องจากเป็นเว็บไซต์ต้นแบบแนวคิด หากต้องการสั่งซื้อขนมอบหรือสอบถามรอบอบจริง กรุณาติดต่อทางเพจ Facebook อย่างเป็นทางการของร้านโดยตรง',
      messengerBtn: 'ส่งข้อความทาง Messenger ↗',
      facebookPageBtn: 'ไปยังหน้าเพจ Facebook ↗',
      inquiryNote: 'ติดต่อ: facebook.com/CroissantNanchao',
    },
    viewer: {
      disclaimerTitle: 'โมเดล 3D สาธิต — ศึกษาแนวคิดผลิตภัณฑ์',
      disclaimerSub: 'ระบบ 3D Viewer รองรับการหมุน 360° และการตรวจสอบโครงตาข่าย PBR',
      caneleAssetTitle: 'โมเดล 3D PBR สาธิต — กานาเล เดอ บอร์โด (PHASE 2)',
      caneleAssetSub: 'โมเดล PBR ความละเอียดสูงสำหรับทดสอบตัวแสดงผล 3D ในระบบ',
      dragHint: 'ลากเพื่อหมุน 360° • เลื่อนเมาส์เพื่อซูม',
      autoSpin: 'หมุนอัตโนมัติ',
      autoSpinOn: 'เปิด',
      autoSpinOff: 'ปิด',
      wireframe: 'โครงลวดตาข่าย',
      wireframeMesh: 'โครงลวด',
      wireframeShaded: 'พื้นผิวจริง',
      resetView: 'รีเซ็ตมุมกล้อง',
      loading3D: 'กำลังโหลดสินทรัพย์ 3D',
    },
    demoModal: {
      badge: 'โหมดทดลองต้นแบบ • SIMULATION ONLY',
      title: 'บันทึกรายการจำลองสำเร็จ (Demo)',
      desc: 'นี่คือการศึกษาโปรโตไทป์ส่วนหน้า (Frontend Prototype) ไม่มีระบบหลังบ้าน บัญชีผู้ใช้ การชำระเงิน หรือการตัดสต็อกสินค้าจริงแต่อย่างใด',
      reservedItemLabel: 'รายการขนมอบที่เลือก',
      lotLabel: 'หมายเลขรอบอบจำลอง',
      pickupLabel: 'กำหนดเวลารับ',
      pickupTime: '11:30 น. (ตัวอย่างจำลอง)',
      notice: 'หากต้องการสั่งซื้อขนมอบจริง กรุณาติดต่อทาง Facebook ของร้านโดยตรง',
      closeBtn: 'ปิดหน้าต่าง',
    },
    pillars: {
      eyebrow: 'SAVOIR-FAIRE & PHILOSOPHY',
      title: 'เสาหลักแห่งความใส่ใจในขนมอบ',
      desc: 'เราคัดสรรวัตถุดิบและควบคุมกระบวนการอบอย่างประณีต เพื่อส่งมอบรสชาติและกลิ่นเนยที่น่าจดจำที่สุด',
      items: [
        {
          num: '01',
          title: 'เนยสดแท้คุณภาพสูง',
          desc: 'คัดสรรเนยสดแท้คุณภาพพรีเมียม ให้กลิ่นหอมอบอวลและความฉ่ำละมุนในทุกชั้นของแป้งพาย',
          metaLeft: 'PURE BUTTER',
          metaRight: 'ARISAN QUALITY',
        },
        {
          num: '02',
          title: 'ความพิถีพิถันในการรีดพับ',
          desc: 'ควบคุมอุณหภูมิและการรีดพับแป้ง เพื่อสร้างโครงสร้างโพรงรวงผึ้งที่โปร่งเบาและกรอบฟู',
          metaLeft: 'LAMINATION',
          metaRight: 'HONEYCOMB CRUST',
        },
        {
          num: '03',
          title: 'วัตถุดิบสดใหม่ตามฤดูกาล',
          desc: 'ผลไม้สด ครีมคัสตาร์ดหอมวานิลลา และถั่วคั่วใหม่ ตัดรสชาติหวานมันอย่างลงตัว',
          metaLeft: 'FRESH TOPPING',
          metaRight: 'SEASONAL SELECTION',
        },
        {
          num: '04',
          title: 'อบสดใหม่จากเตาทุกวัน',
          desc: 'ความสดใหม่จากเตาอบคือหัวใจ เพื่อให้ลูกค้าได้สัมผัสความกรอบและกลิ่นเนยที่ดีที่สุด',
          metaLeft: 'HEARTH BAKED',
          metaRight: 'DAILY FRESHNESS',
        },
      ],
    },
    footer: {
      tagline: 'ครัวซองต์และขนมอบเนยสดแท้ • คราฟต์ด้วยความตั้งใจในทุก ๆ รอบอบ',
      prototypeNote:
        'เว็บไซต์นี้เป็น Concept Prototype สำหรับศึกษาการออกแบบดิจิทัลและเทคโนโลยี 3D WebGL โดยอ้างอิงข้อมูลเบื้องต้นจากเพจ "ฉันชอบกลิ่นเนย" ไม่ใช่เว็บไซต์อย่างเป็นทางการของทางร้าน',
      hearthHeading: 'ช่องทางติดต่อทางการ',
      hours: 'ติดตามรอบอบและสั่งซื้อ: facebook.com/CroissantNanchao',
      collectionsHeading: 'เมนูขนมอบในระบบ',
      collections: [
        'ครัวซองต์ครีมสตรอว์เบอร์รี',
        'เดนิชผลไม้รวม',
        'ขนมอบหน้าครีมและถั่ว',
        'กานาเล เดอ บอร์โด (3D)',
      ],
      dispatchHeading: 'สอบถามข้อมูลเพิ่มเติม',
      dispatchDesc: 'สามารถติดต่อสอบถามรายละเอียดและรอบสั่งซื้อได้โดยตรงผ่านทาง Facebook Messenger',
      emailPlaceholder: 'กรอกอีเมลเพื่อติดตามข่าวสาร',
      joinBtn: 'ติดตาม',
      copyright: '© 2026 CHAN CHOP KLIN NOEI — CONCEPT SHOWCASE PROTOTYPE.',
      legalTech: 'WebGL 3D Engine • React 19 • TypeScript • Three.js',
      legalStyle: 'Editorial Minimal & Artisan Bakery Aesthetics',
    },
  },
  en: {
    nav: {
      brandTitle: 'CHAN CHOP KLIN NOEI',
      brandSub: 'ARTISANAL CROISSANT & VIENNOISERIE • BANGKOK',
      collection: 'Pastry Menu',
      savoirFaire: 'Baking Craft',
      heritage: 'Facebook Feed',
      atelier: 'About Us',
      hearthActive: 'HEARTH ACTIVE • BAKED DAILY',
      reserveBtn: 'INQUIRE BATCH',
      facebookLink: 'Facebook Page ↗',
      prototypeBadge: 'CONCEPT PROTOTYPE',
    },
    hero: {
      badge: 'CONCEPT DESIGN PROTOTYPE • NON-OFFICIAL',
      eyebrow: 'ARTISANAL CROISSANT & VIENNOISERIE',
      titleMain: 'Aroma of Pure Butter,',
      titleAccent: 'Every Layer Handcrafted.',
      description:
        'Inspired by "Chan Chop Klin Noei" (I Love the Smell of Butter), an artisanal bakery dedicated to pure butter croissants, laminated Danish pastries, and velvety creams. (This site is an independent digital showcase prototype exploring 3D interactive web experiences).',
      orderFbBtn: 'Contact via Facebook ↗',
      exploreMenuBtn: 'Explore Pastry Menu',
      specBatch: 'Fresh Batch Bakes',
      specButter: 'Pure Artisan Butter',
      specHearth: 'Handcrafted Daily',
      canele: {
        subtitle: '3D Research Model • Canelé de Bordeaux',
        title: 'Caramelised Armor,',
        italicWord: 'Molten Custard Heart.',
        description: 'Baked in seasoned French copper molds coated with pure beeswax. A contrast between a crisp mahogany crust and an airy custard honeycomb.',
        specs: [
          { label: 'COPPER MOLD BAKE', value: '65 min at 230°C' },
          { label: 'CRUST SHEEN', value: 'Pure Beeswax & Raw Cane' },
          { label: 'REST DURATION', value: '48h Batter Maturation' },
        ],
        tastingNote: '“Deep caramelized sugar crackle surrendering to a cool, velvety vanilla cloud.”',
        dailyYield: 'Handcrafted batch yield',
        formMetric: 'FORM: FLUTED CYLINDER (12 RIBS)',
      },
      sourdough: {
        subtitle: 'Geometric Study • Pain au Levain',
        title: 'Blistered Ear Score,',
        italicWord: 'Airy Wild Honeycomb.',
        description: 'Naturally fermented wild levain loaf with an open custard-like crumb and deeply caramelized crust.',
        specs: [
          { label: 'FERMENTATION', value: '36h Cold Proof' },
          { label: 'HYDRATION', value: '82% High Hydration' },
          { label: 'HEARTH BAKE', value: 'Steam Injected 245°C' },
        ],
        tastingNote: '“Gentle lactic acidity, custardy crumb, and toasted wheat crackle.”',
        dailyYield: 'Handmade daily batch',
        formMetric: 'FORM: ELONGATED BÂTARD',
      },
      brioche: {
        subtitle: 'Geometric Study • Brioche Tressée',
        title: 'Featherlight Silken Crumb,',
        italicWord: 'Gilded Braided Crown.',
        description: 'Enriched French brioche dough laminated with pure cultured butter, braided into a glistening crown.',
        specs: [
          { label: 'BUTTER CONTENT', value: 'High Pure Butter' },
          { label: 'BRAIDING TECHNIQUE', value: 'Six-Strand Crown' },
          { label: 'EGG WASH GLAZE', value: 'Double Gilded Glaze' },
        ],
        tastingNote: '“Melt-in-the-mouth tenderness infused with fresh cream and orange blossom.”',
        dailyYield: 'Limited crown batch',
        formMetric: 'FORM: BRAIDED ROSETTE',
      },
      reserveBtn: 'Inquire on Facebook',
      exploreBtn: 'Explore Menu',
      bakerSignoff: '— Chan Chop Klin Noei (Concept Inspiration)',
    },
    tabs: {
      canele: 'Canelé (3D)',
      sourdough: 'Croissant',
      brioche: 'Danish',
    },
    catalog: {
      sectionEyebrow: 'MENU COLLECTION',
      sectionTitle: 'Artisan Pastry Showcase',
      sectionSubtitle:
        'Curated selection inspired by the bakery’s Facebook page. Flaky, fragrant with pure butter, baked fresh in batches. (Concept demo visual showcase).',
      photoSlotNotice:
        'Official Photo Intake Slot • Ready to receive high-resolution bakery photography',
      demoBadge: 'DEMO CATALOG',
      demoVisualBadge: 'Demo Concept Visual',
      intakeBannerTitle: 'Asset Intake Protocol & Photography Status',
      intakeBannerDesc:
        'Displaying editorial demonstration visuals to evaluate composition and visual hierarchy. Official store photography can be deployed into public/products/ anytime to replace placeholders automatically.',
      inquirePrice: 'Inquire price per batch',
      viewDetailBtn: 'View Details',
      view3DBtn: 'Switch to 3D',
      viewGalleryBtn: 'View Photos',
      allFilter: 'All Items',
      croissantFilter: 'Croissants',
      danishFilter: 'Danish Pastries',
      pastryFilter: 'Specialty Pastries',
      intakeGuide: 'Place real product photos into public/products/ to display immediately',
    },
    detailStage: {
      sectionEyebrow: 'ARTISAN PRODUCT GALLERY',
      sectionTitle: 'Pastry Anatomy & Visual Showcase',
      view3DLabel: '3D INTERACTIVE VIEW',
      viewPhotoLabel: 'PRODUCT PHOTO GALLERY',
      noGLBNotice:
        'This item is currently awaiting real 3D scan intake • Displaying high-res photo gallery and intake slot',
      hasGLBNotice:
        'Interactive 3D PBR model active • Full 360° rotation and wireframe inspection enabled',
      inquireFbBtn: 'Inquire about this pastry on Facebook ↗',
      intakeSlotLabel: 'Assigned Intake Slot:',
      specsHeading: 'Pastry Craft Specifications',
      verificationTitle: 'Prototype Data Status',
      verificationDesc:
        'This product description and mock specs are provided as an editorial prototype layout. They can be updated seamlessly once verified bakery data is supplied.',
    },
    dev3D: {
      sectionEyebrow: '3D LAB & ASSET PIPELINE',
      sectionTitle: 'WebGL 3D Engine (Developer Preview)',
      sectionSubtitle:
        'Internal technology evaluation stage for engineering & management — Demonstrating real-time 3D PBR asset streaming, Draco decompression, and 360° product inspection.',
      benchmarkBadge: 'BENCHMARK ASSET (~85% PHOTOREAL)',
      benchmarkTitle: 'Canelé de Bordeaux (3D Study)',
      benchmarkDesc:
        'Benchmark asset testing Three.js rendering fidelity, WebGL context, OrbitControls, and Draco decompression across devices with zero frame drops.',
      metricPoly: '63,840 Triangles (1 Draw Call)',
      metricDraco: 'Draco Decompressed (590 KB)',
      metricFPS: '60 FPS Hardware Accelerated',
      metricPBR: '2K PBR Shaders (BaseColor, Normal, ORM)',
      orbitHint: 'Click and drag to rotate 360° • Scroll wheel to zoom in/out',
      autoSpinLabel: 'Auto Spin',
      wireframeLabel: 'Wireframe',
      resetLabel: 'Reset Camera',
    },
    facebookFeed: {
      sectionEyebrow: 'LATEST FROM FACEBOOK',
      sectionTitle: 'Simulated Facebook Feed (Demo Feed)',
      sectionSubtitle:
        'Curated post ingestion blueprint from "Chan Chop Klin Noei" page without unauthenticated scraping or client token exposure. (Layout evaluation template).',
      curatedBadge: 'CURATED FEED PROTOTYPE',
      curatedDesc:
        'Decoupled data provider ready for Facebook Graph API once page authentication is configured.',
      demoFeedBadge: 'DEMO FEED • Simulated Ingestion',
      demoFeedDesc: 'Posts and dates below are simulated layout templates for UI evaluation, not live scraped page content.',
      simulatedSlot: 'Demo Slot',
      openPostBtn: 'View on Facebook ↗',
      visitPageBtn: 'Visit Official Facebook Page ↗',
      postedOn: 'Simulated Date Slot:',
    },
    popUpLocation: {
      sectionEyebrow: 'WHERE TO FIND US',
      sectionTitle: 'Where to Find Us Today?',
      sectionSubtitle:
        'Official pop-up venue, booth location, and event announcements curated from Chan Chop Klin Noei Facebook page.',
      statusToday: 'Pop-up Booth Announced for Today',
      statusUpcoming: 'Upcoming Pop-up Announcement',
      statusPast: 'Past Pop-up Announcement',
      boothLabel: 'Booth Number',
      venueLabel: 'Pop-Up Venue',
      dateLabel: 'Event Date & Schedule',
      addressLabel: 'Address & Navigation',
      announcementLabel: 'Official Announcement',
      openMapsBtn: 'Open in Google Maps ↗',
      viewFbBtn: 'Visit Official Facebook Page ↗',
      contactPhoneLabel: 'Contact Telephone',
      verificationBadge: 'PENDING VERIFICATION',
      verificationNotice:
        'Phone number from previous records; verification pending before direct dial is enabled.',
      mapNotice:
        'Map pin indicates market premises, not exact booth coordinate.',
      hoursNotice:
        'Operating hours depend on daily baking batches announced on Facebook (unspecified in post).',
      expiredNotice:
        'This pop-up date has passed. Please check the official Facebook page for upcoming schedules.',
      curatedSourceBadge: 'Curated from Facebook Post',
      curatedSourceDesc:
        'Curated manually from official Facebook post of Chan Chop Klin Noei by admin (No automated scraping, no live Graph API connection).',
      boothSubtitle: 'Look for our bakery sign and display counter at this booth',
    },
    about: {
      sectionEyebrow: 'ABOUT THE BAKERY',
      sectionTitle: 'The Story of "Chan Chop Klin Noei"',
      leadStory:
        'Born from a genuine passion for the intoxicating aroma and warmth of pure artisan butter, crafting viennoiserie with dedication.',
      storyP1:
        'At the heart of the bakery is an unyielding focus on pure quality butter, careful temperature control, and precision lamination, creating crisp, airy honeycomb layers that fill the air with irresistible fragrance each morning.',
      storyP2:
        'Alongside classic croissants, the bakery creates seasonal fruit danishes and specialty pastries, balancing rich buttery flakiness with fresh cream and bright seasonal fruits.',
      pillar1Title: 'Pure Quality Butter',
      pillar1Desc: 'Authentic butter providing rich fragrance and a crisp, melting mouthfeel.',
      pillar2Title: 'Delicate Lamination',
      pillar2Desc: 'Precise multi-layer folding creating delicate honeycomb pockets and airy flakiness.',
      pillar3Title: 'Baked Fresh in Batches',
      pillar3Desc: 'Freshly hearth-baked to preserve signature aroma and crisp texture.',
      disclaimerTitle: 'Concept Prototype Notice',
      disclaimerDesc:
        'This website is an independent digital concept prototype exploring 3D interactive WebGL design for Thai artisan bakeries. It is not an official commercial site, has no live billing or inventory system, and does not claim ownership of the bakery trademark.',
    },
    contact: {
      sectionEyebrow: 'GET IN TOUCH',
      sectionTitle: 'Connect & Order via Facebook',
      sectionSubtitle:
        'As this is an experimental concept prototype, please reach out directly through the official Facebook page for actual pastry orders and batch availability.',
      messengerBtn: 'Send Message on Messenger ↗',
      facebookPageBtn: 'Visit Facebook Page ↗',
      inquiryNote: 'Official link: facebook.com/CroissantNanchao',
    },
    viewer: {
      disclaimerTitle: 'PROTOTYPE 3D GEOMETRY — CONCEPT STUDY',
      disclaimerSub: 'Interactive Three.js 3D viewer supporting 360° orbit, zoom, and wireframe',
      caneleAssetTitle: 'DEMONSTRATION 3D PBR ASSET — CANELÉ DE BORDEAUX',
      caneleAssetSub: 'High-poly PBR model demonstrating WebGL 3D capabilities',
      dragHint: 'DRAG TO ROTATE 360° • SCROLL TO ZOOM',
      autoSpin: 'AUTO-SPIN',
      autoSpinOn: 'ON',
      autoSpinOff: 'OFF',
      wireframe: 'WIREFRAME',
      wireframeMesh: 'MESH',
      wireframeShaded: 'SHADED',
      resetView: 'RESET VIEW',
      loading3D: 'STREAMING 3D ASSET',
    },
    demoModal: {
      badge: 'CONCEPT PROTOTYPE • SIMULATION ONLY',
      title: 'Batch Allocation Simulation (Demo)',
      desc: 'This is an interactive frontend prototype study. There is strictly no backend, user login, payment gateway, or live inventory deduction.',
      reservedItemLabel: 'Selected Pastry',
      lotLabel: 'Simulation Batch Number',
      pickupLabel: 'Estimated Pickup',
      pickupTime: '11:30 AM (Sample)',
      notice: 'For actual bakery orders, please message the official Facebook page directly.',
      closeBtn: 'Close Window',
    },
    pillars: {
      eyebrow: 'SAVOIR-FAIRE & PHILOSOPHY',
      title: 'Core Pillars of the Bakery Craft',
      desc: 'Handcrafted with meticulous dedication to pure butter, temperature control, and fresh baking.',
      items: [
        {
          num: '01',
          title: 'Pure Artisan Butter',
          desc: 'Carefully selected pure butter infusing every pastry with rich, comforting fragrance.',
          metaLeft: 'PURE BUTTER',
          metaRight: 'ARTISAN QUALITY',
        },
        {
          num: '02',
          title: 'Precision Lamination',
          desc: 'Temperature-controlled folding creating an open, airy honeycomb crust.',
          metaLeft: 'LAMINATION',
          metaRight: 'HONEYCOMB CRUST',
        },
        {
          num: '03',
          title: 'Fresh Seasonal Accents',
          desc: 'Fresh berries, aromatic vanilla custard, and lightly roasted nuts.',
          metaLeft: 'FRESH TOPPING',
          metaRight: 'SEASONAL SELECTION',
        },
        {
          num: '04',
          title: 'Baked Fresh Daily',
          desc: 'Hearth-baked in controlled batches to ensure optimal crispness and aroma.',
          metaLeft: 'HEARTH BAKED',
          metaRight: 'DAILY FRESHNESS',
        },
      ],
    },
    footer: {
      tagline: 'Artisanal croissants and viennoiserie handcrafted with pure butter and dedication.',
      prototypeNote:
        'This website is an independent concept prototype exploring 3D interactive WebGL showcase design, inspired by "Chan Chop Klin Noei". Not an official storefront.',
      hearthHeading: 'Official Inquiries',
      hours: 'Follow batches and message: facebook.com/CroissantNanchao',
      collectionsHeading: 'Featured Pastries',
      collections: [
        'Strawberry Cream Croissant',
        'Mixed Fruit Danish',
        'Nut & Cream Pastry',
        'Canelé de Bordeaux (3D)',
      ],
      dispatchHeading: 'Bakery Inquiries',
      dispatchDesc: 'Direct inquiries and order inquiries are managed through Facebook Messenger.',
      emailPlaceholder: 'Enter email for concept updates',
      joinBtn: 'Subscribe',
      copyright: '© 2026 CHAN CHOP KLIN NOEI — CONCEPT SHOWCASE PROTOTYPE.',
      legalTech: 'WebGL 3D Engine • React 19 • TypeScript • Three.js',
      legalStyle: 'Editorial Minimal & Artisan Bakery Aesthetics',
    },
  },
}
