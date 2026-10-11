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
  }
  hero: {
    canele: PastryTranslation
    sourdough: PastryTranslation
    brioche: PastryTranslation
    reserveBtn: string
    exploreBtn: string
    bakerSignoff: string
  }
  tabs: {
    canele: string
    sourdough: string
    brioche: string
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
  en: {
    nav: {
      brandTitle: 'ATELIER 3D',
      brandSub: 'HAUTE BOULANGERIE • PARIS',
      collection: 'La Collection',
      savoirFaire: 'Savoir-Faire',
      heritage: 'Heritage Wheat',
      atelier: "L'Atelier",
      hearthActive: 'HEARTH ACTIVE • 245°C',
      reserveBtn: 'RESERVE BATCH',
    },
    hero: {
      canele: {
        subtitle: 'N° 01 • SPÉCIALITÉ BORDELAISE',
        title: 'Caramelised Armor,',
        italicWord: 'Molten Custard Heart.',
        description:
          'Baked in seasoned French copper molds coated with pure beeswax. A contrast between a crisp mahogany crust and an airy custard honeycomb infused with Madagascar vanilla bean and aged Martinique rum.',
        specs: [
          { label: 'COPPER MOLD BAKE', value: '65 min at 230°C' },
          { label: 'CRUST SHEEN', value: 'Pure Beeswax & Raw Cane' },
          { label: 'REST DURATION', value: '48h Batter Maturation' },
        ],
        tastingNote:
          '“Deep caramelized sugar crackle surrendering to a cool, velvety vanilla cloud.”',
        dailyYield: '120 pieces handcrafted daily',
        formMetric: 'FORM: FLUTED CYLINDER (12 RIBS)',
      },
      sourdough: {
        subtitle: 'N° 02 • PAIN DE CAMPAGNE',
        title: 'Sculpted by Wild Yeast,',
        italicWord: 'Basalt Hearth & Time.',
        description:
          'Born from unbleached Type 80 stoneground ancient wheat and our century-old sourdough mother. Fermented for 36 hours in woven wicker bannetons, then blistered on red-hot refractory stone.',
        specs: [
          { label: 'HYDRATION LEVEL', value: '78% Pure Alpine Water' },
          { label: 'WILD LEVAIN', value: 'Centennial Mother (1924)' },
          { label: 'HEARTH BAKE', value: 'Direct Basalt Stone • 245°C' },
        ],
        tastingNote:
          '“A deeply blistered ear, roasted hazelnut aroma, and an open custard crumb with balanced acidity.”',
        dailyYield: '80 boules pulled at dawn',
        formMetric: 'FORM: ELLIPSOID BOULE + CRESCENT EAR',
      },
      brioche: {
        subtitle: 'N° 03 • VIENNOISERIE ARTISANALE',
        title: 'Layers of Golden Sun,',
        italicWord: 'Charentes Butter Weave.',
        description:
          'Hand-braided couronne using high-fat cultured Charentes-Poitou butter and organic free-range egg yolks. Slow cold-proofed overnight to produce an impossibly tender, featherlight crumb.',
        specs: [
          { label: 'AOP BUTTER CONTENT', value: '84% Charentes-Poitou' },
          { label: 'WEAVE TECHNIQUE', value: 'Six-Strand Twisted Crown' },
          { label: 'SURFACE FINISH', value: 'Double Egg Glaze & Pearl Sugar' },
        ],
        tastingNote:
          '“Tender shreds that melt like spun silk, rich with sweet cream and floral orange blossom.”',
        dailyYield: '60 crowns braided per batch',
        formMetric: 'FORM: BRAIDED ROSETTE CLUSTER',
      },
      reserveBtn: "RESERVE TODAY’S BAKE",
      exploreBtn: 'EXPLORE MILLING HERITAGE',
      bakerSignoff: '— Guillaume Vasseur, Maître Boulanger',
    },
    tabs: {
      canele: 'Canelé de Bordeaux',
      sourdough: 'Pain au Levain',
      brioche: 'Brioche Tressée',
    },
    viewer: {
      disclaimerTitle: 'PROTOTYPE 3D GEOMETRY — CONCEPT STUDY',
      disclaimerSub:
        'Procedural Three.js geometry placeholder • Architecture ready for GLB production models',
      caneleAssetTitle: 'PRODUCTION 3D ASSET — CANELÉ DE BORDEAUX (PHASE 2)',
      caneleAssetSub:
        'Blender 4.2 LTS PBR model • 2K caramelized albedo, normal & beeswax roughness maps',
      dragHint: 'DRAG TO ROTATE 360° • SCROLL TO ZOOM',
      autoSpin: 'AUTO-SPIN',
      autoSpinOn: 'ON',
      autoSpinOff: 'OFF',
      wireframe: 'WIREFRAME',
      wireframeMesh: 'MESH',
      wireframeShaded: 'SHADED',
      resetView: 'RESET VIEW',
    },
    demoModal: {
      badge: 'PHASE 1 DEMO MODE • SIMULATION ONLY',
      title: 'Batch Allocation Reserved (Demo)',
      desc: 'This is an interactive frontend prototype study. In Phase 1, there is strictly no backend, user login, payment gateway, or live inventory deduction.',
      reservedItemLabel: 'RESERVED PRODUCT',
      lotLabel: 'SIMULATED BATCH N°',
      pickupLabel: 'PROJECTED HEARTH PULL',
      pickupTime: 'Tomorrow 07:15 AM (Le Marais Atelier)',
      notice:
        'Phase 1 constraint compliance: Ready for Art Director & Client visual sign-off.',
      closeBtn: 'CLOSE PREVIEW',
    },
    pillars: {
      eyebrow: 'SAVOIR-FAIRE & PHILOSOPHY',
      title: 'The Four Pillars of Pure Levain',
      desc: 'We strip breadmaking down to its sacred fundamentals: unadulterated heirloom grain, living microbes, pure spring water, and radiant fire.',
      items: [
        {
          num: '01',
          title: 'Stoneground Heirloom Wheat',
          desc: 'Type 80 semi-complete flour milled on granite millstones in Auvergne. Rich in germ oils, minerals, and rustic bran flakes without chemical additives.',
          metaLeft: 'PROVENANCE: AUVERGNE',
          metaRight: 'EXTRACTION: 82%',
        },
        {
          num: '02',
          title: 'Centennial Sourdough Levain',
          desc: 'A living microbial culture nurtured with rye and spring water every eight hours since 1924. Gives rise to complex organic acids, deep aroma, and digestible crumb.',
          metaLeft: 'AGE: EST. 1924',
          metaRight: 'FERMENT: 36 HOURS',
        },
        {
          num: '03',
          title: 'Basalt Wood-Fired Hearth',
          desc: 'Baking directly on 250-year-old French volcanic stones. Sustained conductive heat caramelizes complex sugars into a blistered, crackling dark crust.',
          metaLeft: 'FUEL: FRENCH OAK',
          metaRight: 'HEAT: 245°C STEADY',
        },
        {
          num: '04',
          title: 'Zero-Compromise Dawn Batches',
          desc: 'Every loaf is shaped by hand using traditional wooden bannetons. Pulling only 80 signature loaves and 120 canelés each morning until sold out.',
          metaLeft: 'START: 03:30 AM',
          metaRight: 'HAND-SHAPED 100%',
        },
      ],
    },
    footer: {
      tagline:
        'Artisanal Boulangerie & Digital Geometric Studies.\nWhere centuries of French craft meet real-time 3D craftsmanship.',
      prototypeNote: 'PHASE 1 HOMEPAGE PROTOTYPE • EDITORIAL MINIMAL',
      hearthHeading: 'L’ATELIER HEARTH',
      hours:
        'Mardi – Dimanche: 07:00 – 14:00\n(Or until the day’s bake is claimed)',
      collectionsHeading: 'GRAIN COLLECTIONS',
      collections: [
        'Canelé de Bordeaux (Beeswax)',
        'Pain au Levain (Type 80 Heritage)',
        'Brioche Tressée (AOP Charentes)',
        'Auvergne Stone Mill Flours',
      ],
      dispatchHeading: 'MORNING BAKE DISPATCH',
      dispatchDesc:
        'Receive morning notifications when fresh sourdough leaves the hearth.',
      emailPlaceholder: 'boulangerie@domaine.fr',
      joinBtn: 'JOIN',
      copyright: '© 2026 ATELIER 3D. Tous droits réservés.',
      legalTech: 'THREE.JS • REACT THREE FIBER • DREI',
      legalStyle: 'EDITORIAL MINIMAL • CINEMATIC LUXURY',
    },
  },
  th: {
    nav: {
      brandTitle: 'ATELIER 3D',
      brandSub: 'โอต บูลองเฌอรี • ปารีส',
      collection: 'คอลเลกชันขนมอบ',
      savoirFaire: 'ศาสตร์และศิลป์แห่งขนมปัง',
      heritage: 'มรดกข้าวสาลีโบราณ',
      atelier: 'สตูดิโอเตาอบ',
      hearthActive: 'เตาอบทำงาน • 245°C',
      reserveBtn: 'สำรองรอบอบ',
    },
    hero: {
      canele: {
        subtitle: 'ลำดับที่ 01 • สเปเชียลตี้แห่งบอร์โด',
        title: 'เกราะคาราเมลกรอบหอม,',
        italicWord: 'เนื้อคัสตาร์ดนุ่มละมุนใจกลาง',
        description:
          'อบในพิมพ์ทองแดงฝรั่งเศสโบราณเคลือบไขผึ้งธรรมชาติ ผิวกรอบคาราเมลสีมะฮอกกานีผสานเนื้อคัสตาร์ดด้านในที่นุ่มชุ่มฉ่ำ หอมกลิ่นวานิลลามาดากัสการ์และเหล้ารัมชั้นเลิศ',
        specs: [
          { label: 'พิมพ์ทองแดงโบราณ', value: '65 นาที ที่ 230°C' },
          { label: 'การเคลือบผิวสัมผัส', value: 'ไขผึ้งธรรมชาติแท้' },
          { label: 'การบ่มพักแป้ง', value: 'พักแป้งหมักเย็น 48 ชม.' },
        ],
        tastingNote:
          '“เสียงสัมผัสกรอบกรุบของน้ำตาลไหม้ ก่อนจะละลายสู่ความนุ่มเนียนดั่งปุยเมฆวานิลลา”',
        dailyYield: 'ผลิตจำกัด 120 ชิ้นต่อวัน',
        formMetric: 'เรขาคณิต: ทรงกระบอก 12 ร่องนูน (FLUTED CYLINDER)',
      },
      sourdough: {
        subtitle: 'ลำดับที่ 02 • ซาวโดว์ชนบทฝรั่งเศส',
        title: 'รังสรรค์จากยีสต์ธรรมชาติ,',
        italicWord: 'เตาหินบะซอลต์และกาลเวลา',
        description:
          'อบจากแป้งสาลีโบราณโม่หิน Type 80 และหัวเชื้อซาวโดว์อายุร้อยปี หมักบ่มช้าๆ 36 ชั่วโมงในตะกร้าหวาย ก่อนอบบนแผ่นหินบะซอลต์ภูเขาไฟจนผิวดอกปูดพองกรอบแน่น',
        specs: [
          { label: 'อัตราส่วนน้ำบริสุทธิ์', value: '78% น้ำแร่ธรรมชาติแอลป์' },
          { label: 'หัวเชื้อซาวโดว์ป่า', value: 'แม่พันธุ์ซาวโดว์ดั้งเดิม (1924)' },
          { label: 'การอบบนแผ่นหิน', value: 'หินบะซอลต์ภูเขาไฟ • 245°C' },
        ],
        tastingNote:
          '“รอยกรีดกรอบเด่นชัด หอมกลิ่นฮาเซลนัทคั่ว เนื้อขนมปังโปร่งเหนียวนุ่มและรสเปรี้ยวกลมกล่อม”',
        dailyYield: 'อบสดใหม่ 80 ก้อนยามรุ่งอรุณ',
        formMetric: 'เรขาคณิต: ทรงรีพร้อมรอยกรีดกรอบ (ELLIPSOID + EAR)',
      },
      brioche: {
        subtitle: 'ลำดับที่ 03 • เวียนนัวเซอรีคราฟต์',
        title: 'เกลียวสีทองประกายแดด,',
        italicWord: 'เปียเนยสดแท้ AOP ชารองต์',
        description:
          'บริออชถักเปียมงกุฎด้วยมือ ใช้เนยหมัก AOP Charentes-Poitou แท้และไข่ไก่ออร์แกนิก พักบ่มเย็นข้ามคืนเพื่อเนื้อสัมผัสเบานุ่ม ดึงเป็นเส้นใยละเอียดดั่งไหม',
        specs: [
          { label: 'ปริมาณเนย AOP แท้', value: '84% ชารองต์-ปัวตู (AOP)' },
          { label: 'เทคนิคการถักเปีย', value: 'ถักเปียหกเส้นทรงมงกุฎ' },
          { label: 'การเคลือบผิวหน้า', value: 'ทาไข่สองรอบและโรยน้ำตาลไข่มุก' },
        ],
        tastingNote:
          '“เนื้อนุ่มละมุนดั่งเส้นไหม อวลกลิ่นครีมสดหอมหวานและละอองดอกส้ม”',
        dailyYield: 'ถักมือจำกัด 60 มงกุฎต่อรอบ',
        formMetric: 'เรขาคณิต: วงเปียถักทรงดอกไม้ (BRAIDED ROSETTE)',
      },
      reserveBtn: 'สำรองขนมอบรอบวันนี้',
      exploreBtn: 'ศึกษาแหล่งกำเนิดเมล็ดข้าวสาลี',
      bakerSignoff: '— กิโยม วาสเซอร์, ปรมาจารย์ช่างทำขนมปัง',
    },
    tabs: {
      canele: 'กานาเล เดอ บอร์โด',
      sourdough: 'ปัง โอ เลอแว็ง',
      brioche: 'บริออช แทรซเซ',
    },
    viewer: {
      disclaimerTitle: 'เรขาคณิต 3D ต้นแบบ — ศึกษาแนวคิดผลิตภัณฑ์',
      disclaimerSub:
        'โมเดลทดลอง Three.js (Placeholder) • เตรียมสถาปัตยกรรมพร้อมสลับเป็นโมเดล GLB สินค้าจริง',
      caneleAssetTitle: 'โมเดล 3D สินค้าจริง — CANELÉ DE BORDEAUX (PHASE 2)',
      caneleAssetSub:
        'โมเดล PBR ส่งออกจาก Blender 4.2 LTS • แผนที่เนื้อสัมผัสคาราเมล นอร์มอล และไขผึ้ง 2K',
      dragHint: 'ลากเพื่อหมุน 360° • สองนิ้วเพื่อซูม',
      autoSpin: 'หมุนอัตโนมัติ',
      autoSpinOn: 'เปิด',
      autoSpinOff: 'ปิด',
      wireframe: 'โครงลวดตาข่าย',
      wireframeMesh: 'โครงลวด',
      wireframeShaded: 'พื้นผิวจริง',
      resetView: 'รีเซ็ตมุมกล้อง',
    },
    demoModal: {
      badge: 'โหมดทดลองต้นแบบ PHASE 1 • การจำลองการทำงาน',
      title: 'บันทึกการสำรองรอบอบจำลองสำเร็จ (Demo)',
      desc: 'นี่คือการศึกษาโปรโตไทป์ส่วนหน้า (Frontend Prototype) ใน Phase 1 จะไม่มีระบบหลังบ้าน บัญชีผู้ใช้ การชำระเงิน หรือการตัดสต็อกสินค้าจริงแต่อย่างใด',
      reservedItemLabel: 'รายการขนมอบที่เลือก',
      lotLabel: 'หมายเลขรอบอบจำลอง',
      pickupLabel: 'กำหนดออกจากเตาอบ',
      pickupTime: 'พรุ่งนี้ 07:15 น. (สตูดิโอ เลอ มาเรส์ ปารีส)',
      notice:
        'พร้อมสำหรับการตรวจสอบด้านทัศนศิลป์และการใช้งาน (Visual & Interaction QA)',
      closeBtn: 'ปิดหน้าต่างแสดงผล',
    },
    pillars: {
      eyebrow: 'ศาสตร์ ประณีตศิลป์ และปรัชญา',
      title: 'สี่เสาหลักแห่งการอบขนมปังบริสุทธิ์',
      desc: 'เราคงหัวใจของการทำขนมปังไว้ที่แก่นแท้: ข้าวสาลีพันธุ์โบราณ จุลินทรีย์มีชีวิต น้ำแร่บริสุทธิ์ และความร้อนจากเปลวไฟ',
      items: [
        {
          num: '01',
          title: 'แป้งข้าวสาลีโบราณโม่หิน',
          desc: 'แป้ง Type 80 โม่ด้วยหินแกรนิตจากแคว้นโอแวร์ญ อุดมด้วยจมูกข้าว แร่ธาตุ และรำข้าวธรรมชาติ ปราศจากสารเคมีสังเคราะห์',
          metaLeft: 'แหล่งกำเนิด: แคว้นโอแวร์ญ',
          metaRight: 'การสกัด: 82%',
        },
        {
          num: '02',
          title: 'หัวเชื้อซาวโดว์อายุ 100 ปี',
          desc: 'จุลินทรีย์มีชีวิตที่ได้รับการดูแลด้วยแป้งไรย์และน้ำแร่อย่างประณีตทุก 8 ชั่วโมงมาตั้งแต่ปี 1924 ให้รสเปรี้ยวนุ่มนวล ย่อยง่าย สบายท้อง',
          metaLeft: 'อายุ: ก่อตั้ง ค.ศ. 1924',
          metaRight: 'การหมัก: 36 ชั่วโมง',
        },
        {
          num: '03',
          title: 'เตาอบหินบะซอลต์ฟืนไม้โอ๊ก',
          desc: 'อบลงบนแผ่นหินภูเขาไฟฝรั่งเศสเก่าแก่กว่า 250 ปี ความร้อนสะสมสม่ำเสมอทำให้ผิวด้านนอกเกิดคาราเมลกรอบหอมแตกลายงา',
          metaLeft: 'เชื้อเพลิง: ไม้โอ๊กฝรั่งเศส',
          metaRight: 'ความร้อน: 245°C คงที่',
        },
        {
          num: '04',
          title: 'อบสดใหม่จำกัดจำนวนยามเช้า',
          desc: 'ขึ้นรูปด้วยมือทุกลูกในตะกร้าหวายธรรมชาติ จำกัดเพียง 80 ก้อนและกานาเล 120 ชิ้นในแต่ละเช้า หมดแล้วหมดเลยเพื่อความสดใหม่ที่สุด',
          metaLeft: 'เริ่มอบ: 03:30 น.',
          metaRight: 'ขึ้นรูปด้วยมือ 100%',
        },
      ],
    },
    footer: {
      tagline:
        'โรงอบขนมปังคราฟต์ฝรั่งเศสและการศึกษาเรขาคณิตสามมิติ\nจุดบรรจบของศิลปะดั้งเดิมและเทคโนโลยีดิจิทัล',
      prototypeNote: 'โปรโตไทป์หน้าแรก PHASE 1 • สไตล์ EDITORIAL MINIMAL',
      hearthHeading: 'ที่ตั้งเตาอบและสตูดิโอ',
      hours:
        'อังคาร – อาทิตย์: 07:00 – 14:00 น.\n(หรือจนกว่าขนมอบประจำวันจะหมด)',
      collectionsHeading: 'รายการคอลเลกชัน',
      collections: [
        'กานาเล เดอ บอร์โด (เคลือบไขผึ้ง)',
        'ปัง โอ เลอแว็ง (แป้งโบราณ Type 80)',
        'บริออช แทรซเซ (เนย AOP ชารองต์)',
        'แป้งสาลีโม่หินแคว้นโอแวร์ญ',
      ],
      dispatchHeading: 'รับแจ้งเตือนรอบอบยามเช้า',
      dispatchDesc:
        'รับข้อความแจ้งเตือนทันทีที่ขนมปังออกจากเตาอบร้อนๆ ในแต่ละวัน',
      emailPlaceholder: 'boulangerie@domaine.fr',
      joinBtn: 'ติดตาม',
      copyright: '© 2026 ATELIER 3D. สงวนลิขสิทธิ์',
      legalTech: 'THREE.JS • REACT THREE FIBER • DREI',
      legalStyle: 'EDITORIAL MINIMAL • CINEMATIC LUXURY',
    },
  },
}
