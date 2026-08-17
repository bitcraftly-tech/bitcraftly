export const DAYAL = {
  brand: 'Dayal Builders',
  tagline: 'The Promise of New Keys in Real Estate · Jamshedpur',
  heroHeadline: 'Crafting Tomorrow’s Landmarks',
  heroHighlight: 'Char Sahebzade',
  location: 'Jamshedpur, Jharkhand',
  siteAddress: 'Near Chatt Ghat, Govindpur, Jamshedpur',
  officeAddress: '4th Floor, Swamy Building, Main Road, Bistupur, Jamshedpur',
  phones: [
    { display: '+91 92048 90301', tel: '919204890301' },
    { display: '+91 92047 92092', tel: '919204792092' },
  ] as const,
  phone: '919204890301',
  whatsapp: '919204890301',
  email: 'dayal_builders@rediffmail.com',
  website: 'https://www.dayalbuilder.com/',
  facebook: 'https://www.facebook.com/dayal.builders/',
  instagram: 'https://www.instagram.com/p/DXbVHJ3D7J6/',
} as const;

export type DayalMapLocationId = 'office' | 'site';

export type DayalMapLocation = {
  id: DayalMapLocationId;
  title: string;
  address: string;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
};

/** Head office — Bistupur (default map). Site — Govindpur / Chatt Ghat. */
export const DAYAL_LOCATIONS: readonly DayalMapLocation[] = [
  {
    id: 'office',
    title: 'Head Office',
    address: DAYAL.officeAddress,
    label: 'Dayal Builders',
    lat: 22.7935,
    lng: 86.1835,
    zoom: 15,
  },
  {
    id: 'site',
    title: 'Site Address',
    address: DAYAL.siteAddress,
    label: 'Dayal Builders Site',
    lat: 22.8128,
    lng: 86.2285,
    zoom: 15,
  },
] as const;

export const DAYAL_DEFAULT_LOCATION_ID: DayalMapLocationId = 'office';

export function getDayalLocation(
  id: DayalMapLocationId = DAYAL_DEFAULT_LOCATION_ID,
): DayalMapLocation {
  return DAYAL_LOCATIONS.find((loc) => loc.id === id) ?? DAYAL_LOCATIONS[0];
}

export function dayalMapQuery(location: DayalMapLocation): string {
  return `${location.label}, ${location.address}, Jharkhand`;
}

export function dayalMapEmbed(location: DayalMapLocation): string {
  return `https://maps.google.com/maps?hl=en&ll=${location.lat},${location.lng}&z=${location.zoom}&t=m&output=embed`;
}

export function dayalMapDirections(location: DayalMapLocation): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    dayalMapQuery(location),
  )}`;
}

export function dayalMapLink(location: DayalMapLocation): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    dayalMapQuery(location),
  )}`;
}

/** @deprecated Prefer getDayalLocation('office') — kept for existing imports */
export const DAYAL_MAP = {
  label: DAYAL_LOCATIONS[0].label,
  lat: DAYAL_LOCATIONS[0].lat,
  lng: DAYAL_LOCATIONS[0].lng,
  zoom: DAYAL_LOCATIONS[0].zoom,
} as const;

/** Google Maps embed — map only (marker is our clickable overlay) */
export const DAYAL_MAP_EMBED = dayalMapEmbed(DAYAL_LOCATIONS[0]);

export const DAYAL_MAP_DIRECTIONS = dayalMapDirections(DAYAL_LOCATIONS[0]);

export const DAYAL_MAP_LINK = dayalMapLink(DAYAL_LOCATIONS[0]);

/** Official Wix blog listing */
export const BLOG_PAGE_URL = 'https://www.dayalbuilder.com/blog';

/** Globe + house mark (logo text is set in DayalLogo with Caudex) */
export const DAYAL_LOGO_MARK = '/dayal-builders/projects/dayal-logo.avif';
export const DAYAL_LOGO = DAYAL_LOGO_MARK;

export const PROPRIETOR = {
  name: 'Surender Pal Singh',
  role: 'Proprietor',
  company: 'M/S Dayal Builders',
  image: '/dayal-builders/projects/proprietor.png',
} as const;

export const HERO_DESCRIPTION =
  'Since 1999, Dayal Builders has shaped Jamshedpur’s skyline with quality construction, prime locations, and thoughtfully planned residential and commercial spaces.';

export const HERO_CATEGORIES = [
  { label: 'Showcase', href: '#home', icon: 'sparkles' },
  { label: 'Residential', href: '#future-projects', icon: 'home' },
  { label: 'Commercial', href: '#ongoing-projects', icon: 'building' },
  { label: 'Amenities', href: '#amenities', icon: 'layers' },
  { label: 'Premium Plots', href: '#past-projects', icon: 'map' },
] as const;

export const HERO_IMAGE = '/dayal-builders/projects/char-sahib-zaade.avif';

/** Optional hero MP4 — H.264 + AAC, faststart; web copy at public/dayal-builders/hero.mp4 */
export const HERO_VIDEO = '/dayal-builders/hero.mp4';
/** Smaller mobile copy (~720p) — generate with: npm run encode:dayal-hero */
export const HERO_VIDEO_MOBILE = '/dayal-builders/hero-mobile.mp4';
export const HERO_VIDEO_POSTER = HERO_IMAGE;
/** The source file opens with ~10s of title/credit cards — skip straight to the walkthrough */
export const HERO_VIDEO_START = 10;

export const ABOUT_INTRO =
  'Mr Surender Pal Singh (Proprietor, M/S Dayal Builders) derives core strength from state-of-the-art engineering techniques and top-quality materials — delivering cost-effective, holistic solutions for residential complexes and business centers across Jamshedpur.';

export const ABOUT_EXTENDED =
  'Dayal Builders has forged linkages with leading consulting architecture firms to introduce new design and construction concepts. In a globalized economy, we take an integrated approach across segments — and have emerged as one of the most prominent entities in Jamshedpur real estate.';

export const FOOTER_ABOUT =
  'Dayal Builders is a trusted real-estate brand in Jamshedpur — building foundations and creating futures through quality construction, prime locations, and a customer-first approach.';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#future-projects' },
  { label: 'About Us', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#blog' },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'Future Projects', href: '#future-projects' },
      { label: 'Ongoing Projects', href: '#ongoing-projects' },
      { label: 'Past Projects', href: '#past-projects' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Amenities', href: '#amenities' },
      { label: 'Location', href: '#location' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Official Website', href: 'https://www.dayalbuilder.com/' },
    ],
  },
] as const;

export const TRUST_HIGHLIGHTS = [
  'Quality Construction',
  'Prime Locations',
  'Modern Design',
  'Transparent Dealings',
  'Customer-First Approach',
] as const;

/** About-page pillars — shown in trust bar (no fabricated counters) */
export const ABOUT_PILLARS = [
  { label: 'Exceptional Design', icon: 'design' },
  { label: 'Superior Construction', icon: 'build' },
  { label: 'Prime Locations', icon: 'location' },
  { label: 'Customer-Centric', icon: 'people' },
] as const;

/** Local copies from dayalbuilder.com (Wix CDN) */
const IMG = {
  tegBahadur: '/dayal-builders/projects/teg-bahadur.avif',
  vatika: '/dayal-builders/projects/dayal-vatika.avif',
  galaxy: '/dayal-builders/projects/dayal-galaxy.avif',
  enclave: '/dayal-builders/projects/dayal-enclave.avif',
  tower: '/dayal-builders/projects/dayal-tower.avif',
  residency: '/dayal-builders/projects/dayal-residency.avif',
  gallery1: '/dayal-builders/projects/gallery1.avif',
  gallery2: '/dayal-builders/projects/gallery2.avif',
  gallery3: '/dayal-builders/projects/gallery3.avif',
  gallery4: '/dayal-builders/projects/gallery4.avif',
  gallery5: '/dayal-builders/projects/gallery5.avif',
  gallery6: '/dayal-builders/projects/gallery6.avif',
  gallery7: '/dayal-builders/projects/gallery7.avif',
  gallery8: '/dayal-builders/projects/gallery8.avif',
  gallery9: '/dayal-builders/projects/gallery9.avif',
  gallery10: '/dayal-builders/projects/gallery10.avif',
  dayalSkyline: '/dayal-builders/projects/dayal-skyline.avif',
  charSahibZaade: '/dayal-builders/projects/char-sahib-zaade.avif',
  blogProfile: '/dayal-builders/projects/blog-profile.avif',
  blogAerial: '/dayal-builders/projects/blog-img.avif',
  nextProject: '/dayal-builders/projects/next-project.avif',
} as const;

export type HeroMediaSlide = {
  readonly id: string;
  readonly label: string;
  readonly type: 'video' | 'image';
  readonly src: string;
  readonly thumb: string;
};

/** Hero carousel — video + flagship project stills */
export const HERO_MEDIA_SLIDES: readonly HeroMediaSlide[] = [
  {
    id: 'char-video',
    label: 'Char Sahebzade',
    type: 'video',
    src: HERO_VIDEO,
    thumb: IMG.charSahibZaade,
  },
  {
    id: 'teg-bahadur',
    label: 'Teg Bahadur Block',
    type: 'image',
    src: IMG.tegBahadur,
    thumb: IMG.tegBahadur,
  },
  {
    id: 'galaxy',
    label: 'Dayal Galaxy',
    type: 'image',
    src: IMG.galaxy,
    thumb: IMG.galaxy,
  },
  {
    id: 'vatika',
    label: 'Dayal Vatika',
    type: 'image',
    src: IMG.vatika,
    thumb: IMG.vatika,
  },
  {
    id: 'enclave',
    label: 'Dayal Enclave',
    type: 'image',
    src: IMG.enclave,
    thumb: IMG.enclave,
  },
  {
    id: 'skyline',
    label: 'Dayal Skyline',
    type: 'image',
    src: IMG.dayalSkyline,
    thumb: IMG.dayalSkyline,
  },
] as const;

export const CONTACT_FORM_BG = IMG.nextProject;

export const FUTURE_PROJECTS = [
  {
    id: 'dayal-skyline',
    name: 'Dayal Skyline',
    status: 'Future' as const,
    location: 'Kharbani, Jamshedpur',
    tagline: 'The future of elevated living',
    headlineSuffix: 'The Future of Elevated Living in Kharbani.',
    description:
      'An upcoming residential marvel in Kharbani, envisioned to offer contemporary comfort with panoramic views.',
    descriptionRich: [
      { text: 'An upcoming residential marvel in ' },
      { text: 'Kharbani, Jamshedpur, Dayal Skyline', bold: true },
      { text: ' is envisioned to offer contemporary comfort with panoramic views.' },
    ],
    image: IMG.dayalSkyline,
  },
  {
    id: 'char-sahib-zaade',
    name: 'Char Sahib Zaade',
    status: 'Future' as const,
    location: 'Chhota Govindpur, Jamshedpur',
    tagline: 'Legacy-inspired modern living',
    headlineSuffix: 'A Tribute to Legacy, Designed for Modern Living.',
    description:
      'Blends heritage-inspired architecture with contemporary comforts for a truly unique living experience.',
    descriptionRich: [
      { text: 'Located in ' },
      { text: 'Chhota Govindpur, Jamshedpur', bold: true },
      {
        text: ', this upcoming project blends heritage-inspired architecture with contemporary comforts for a truly unique living experience.',
      },
    ],
    image: IMG.charSahibZaade,
  },
] as const;

export const ONGOING_PROJECTS = [
  {
    id: 'teg-bahadur-block',
    name: 'Teg Bahadur Block',
    status: 'Ongoing' as const,
    location: 'Jamshedpur',
    tagline: 'A visionary living space in progress',
    description:
      'An upcoming residential landmark designed for comfort, convenience, and community living.',
    image: IMG.tegBahadur,
  },
  {
    id: 'dayal-vatika',
    name: 'Dayal Vatika',
    status: 'Ongoing' as const,
    location: 'Jamshedpur',
    tagline: 'Where serenity meets modern living',
    description:
      'An ongoing project crafted to offer peaceful, well-designed homes in a thriving neighborhood.',
    image: IMG.vatika,
  },
  {
    id: 'dayal-galaxy',
    name: 'Dayal Galaxy',
    status: 'Ongoing' as const,
    location: 'Jamshedpur',
    tagline: 'Elevating urban lifestyle',
    description:
      'Contemporary architecture with premium amenities for a refined living experience.',
    image: IMG.galaxy,
  },
  {
    id: 'dayal-enclave',
    name: 'Dayal Enclave',
    status: 'Ongoing' as const,
    location: 'Jamshedpur',
    tagline: 'Designed for comfortable living',
    description: 'Modern homes with a perfect balance of style and functionality.',
    image: IMG.enclave,
  },
] as const;

export const PAST_PROJECTS = [
  {
    id: 'dayal-tower',
    name: 'Dayal Tower',
    status: 'Completed' as const,
    location: 'Parsudih, Jamshedpur',
    tagline: 'Legacy project',
    headlineSuffix: 'An Exquisite Haven for Peaceful Living.',
    description:
      'An exquisite haven for peaceful living nestled in the heart of Parsudih, Jamshedpur.',
    descriptionRich: [
      { text: 'An exquisite haven for peaceful living nestled in the heart of ' },
      { text: 'Parsudih, Jamshedpur', bold: true },
      { text: '.' },
    ],
    image: IMG.tower,
  },
  {
    id: 'dayal-residency',
    name: 'Dayal Residency',
    status: 'Completed' as const,
    location: 'Karandih, Jamshedpur',
    tagline: 'Legacy project',
    headlineSuffix: 'A Spacious Retreat in a Serene Locale.',
    description:
      'A spacious, pristine, and beautifully crafted retreat in the serene locale of Karandih.',
    descriptionRich: [
      { text: 'A spacious, pristine, and beautifully crafted retreat in the serene locale of ' },
      { text: 'Karandih, Jamshedpur', bold: true },
      { text: '.' },
    ],
    image: IMG.residency,
  },
] as const;

/** @deprecated Use FUTURE / ONGOING / PAST project lists */
export const PROJECTS = [...FUTURE_PROJECTS, ...ONGOING_PROJECTS, ...PAST_PROJECTS] as const;

export const AMENITIES = [
  { name: 'Clubhouse', icon: 'club' },
  { name: 'Gym & Fitness', icon: 'gym' },
  { name: 'Landscaped Gardens', icon: 'garden' },
  { name: 'Kids Play Area', icon: 'play' },
  { name: 'Jogging Track', icon: 'track' },
  { name: 'Temple', icon: 'temple' },
  { name: 'CCTV Security', icon: 'cctv' },
  { name: 'Swimming Pool', icon: 'pool' },
  { name: 'Power Backup', icon: 'power' },
  { name: 'Wide Roads & Parking', icon: 'parking' },
] as const;

export const NEARBY = [
  { name: 'Govindpur Railway Station', time: 'Nearby', icon: 'train' },
  { name: 'Schools & Colleges', time: 'Nearby', icon: 'school' },
  { name: 'Hospital', time: 'Nearby', icon: 'hospital' },
  { name: 'Local Market', time: 'Nearby', icon: 'market' },
  { name: 'NH-33 Highway', time: 'Nearby', icon: 'highway' },
  { name: 'Jamshedpur City', time: 'Well connected', icon: 'plane' },
] as const;

export const WHY_FAMILY_IMAGE = '/dayal-builders/projects/dayal-skyline.avif';

export const WHY_TRUST = [
  'State-of-the-art engineering',
  'Top-quality materials',
  'Leading architecture partners',
  'Residential & commercial expertise',
  'Prominent Jamshedpur real-estate brand',
] as const;

export const GALLERY_IMAGES = [
  { src: IMG.gallery1, alt: 'Dayal Builders crafted space' },
  { src: IMG.gallery2, alt: 'Dayal Builders project interior' },
  { src: IMG.gallery3, alt: 'Dayal Builders residential development' },
  { src: IMG.gallery4, alt: 'Dayal Builders construction detail' },
  { src: IMG.gallery5, alt: 'Dayal Builders living space' },
  { src: IMG.gallery6, alt: 'Dayal Builders amenity area' },
  { src: IMG.gallery7, alt: 'Dayal Builders project exterior view' },
  { src: IMG.gallery8, alt: 'Dayal Builders crafted home' },
  { src: IMG.gallery9, alt: 'Dayal Builders urban living' },
  { src: IMG.gallery10, alt: 'Dayal Builders completed project' },
] as const;

export const BLOG = [
  {
    id: 'commitment-to-quality-and-innovation',
    title: 'Commitment to Quality and Innovation',
    excerpt:
      'Dayal Builders: Building with Innovation, Quality, and Trust. Behind every strong structure lies a strong vision. At Dayal Builders, that vision is led by Mr. Surender Pal Singh…',
    date: 'Sep 27, 2025',
    readTime: '1 min read',
    image: IMG.blogProfile,
    href: 'https://www.dayalbuilder.com/post/commitment-to-quality-and-innovation',
  },
  {
    id: 'crafting-spaces-creating-legacies',
    title: 'Dayal Builders: Crafting Spaces, Creating Legacies',
    excerpt:
      'When it comes to building not just structures but experiences, Dayal Builders stands as a trusted name in real estate. With years of commitment, innovation, and precision…',
    date: 'Sep 27, 2025',
    readTime: '1 min read',
    image: IMG.blogAerial,
    href: 'https://www.dayalbuilder.com/post/dayal-builders-crafting-spaces-creating-legacies',
  },
] as const;

export const FAQ = [
  {
    q: 'What ongoing projects does Dayal Builders have?',
    a: 'Teg Bahadur Block, Dayal Vatika, Dayal Galaxy, and Dayal Enclave are currently in development.',
  },
  {
    q: 'Where is the site office located?',
    a: `Site address: ${DAYAL.siteAddress}. Head office: ${DAYAL.officeAddress}.`,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Ravi Sinha',
    location: 'Dayal Galaxy Resident',
    quote:
      'Choosing Dayal Galaxy was the best decision I made for my family. The quality of construction, spacious layout, and peaceful environment exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Neha Agarwal',
    location: 'Dayal Vatika Homeowner',
    quote:
      'From start to finish, the experience with Dayal Builders was smooth and professional. They delivered exactly what was promised — a beautiful, well-planned home.',
    rating: 5,
  },
  {
    name: 'Sahil Gupta',
    location: 'Investor',
    quote:
      "Dayal Builders combines timely delivery with modern designs and transparency. I've invested in two of their projects and have full confidence in their commitment to quality.",
    rating: 5,
  },
] as const;
