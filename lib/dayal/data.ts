export const DAYAL = {
  brand: "Dayal Builders",
  tagline: "Leading the New Era of Real Estate in Jamshedpur",
  heroHighlight: "Char Sahebzade",
  location: "Jamshedpur, Jharkhand",
  siteAddress: "Near Chatt Ghat, Govindpur, Jamshedpur",
  officeAddress: "4th Floor, Swamy Building, Main Road, Bistupur, Jamshedpur",
  phones: [
    { display: "+91 92048 90301", tel: "919204890301" },
    { display: "+91 92047 92092", tel: "919204792092" },
  ] as const,
  phone: "919204890301",
  whatsapp: "919204890301",
  email: "dayal_builders@rediffmail.com",
  website: "https://www.dayalbuilder.com/",
  facebook: "https://www.facebook.com/dayal.builders/",
  instagram: "https://www.instagram.com/p/DXbVHJ3D7J6/",
} as const;

export const PROPRIETOR = {
  name: "Surender Pal Singh",
  role: "Proprietor",
  company: "M/S Dayal Builders",
  image: "/dayal-builders/projects/proprietor.jpg",
} as const;

export const HERO_DESCRIPTION =
  "Explore Char Sahebzade — where modern design and quality construction come together to create exceptional living and commercial spaces.";

export const HERO_IMAGE = "/dayal-builders/projects/hero-char-sahebzade.png";

export const ABOUT_INTRO =
  "Mr Surender Pal Singh (Proprietor, M/S Dayal Builders) derives core strength from state-of-the-art engineering techniques and top-quality materials — delivering cost-effective, holistic solutions for residential complexes and business centers across Jamshedpur.";

export const ABOUT_EXTENDED =
  "Dayal Builders has forged linkages with leading consulting architecture firms to introduce new design and construction concepts. In a globalized economy, we take an integrated approach across segments — and have emerged as one of the most prominent entities in Jamshedpur real estate.";

export const FOOTER_ABOUT =
  "Dayal Builders is a trusted real-estate brand in Jamshedpur — building foundations and creating futures through quality construction, prime locations, and a customer-first approach.";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Ongoing Projects", href: "#ongoing-projects" },
  { label: "Past Projects", href: "#past-projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Ongoing Projects", href: "#ongoing-projects" },
  { label: "Past Projects", href: "#past-projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const TRUST_HIGHLIGHTS = [
  "Quality Construction",
  "Prime Locations",
  "Modern Design",
  "Transparent Dealings",
  "Customer-First Approach",
] as const;

/** About-page pillars — shown in trust bar (no fabricated counters) */
export const ABOUT_PILLARS = [
  { label: "Exceptional Design", icon: "design" },
  { label: "Superior Construction", icon: "build" },
  { label: "Prime Locations", icon: "location" },
  { label: "Customer-Centric", icon: "people" },
] as const;

/** Local copies from dayalbuilder.com (Wix CDN) */
const IMG = {
  tegBahadur: "/dayal-builders/projects/teg-bahadur.jpg",
  vatika: "/dayal-builders/projects/dayal-vatika.jpg",
  galaxy: "/dayal-builders/projects/dayal-galaxy.jpg",
  enclave: "/dayal-builders/projects/dayal-enclave.jpg",
  tower: "/dayal-builders/projects/dayal-tower.jpg",
  residency: "/dayal-builders/projects/dayal-residency.jpg",
  gallery1: "/dayal-builders/projects/gallery-1.jpg",
  gallery2: "/dayal-builders/projects/gallery-2.jpg",
  gallery3: "/dayal-builders/projects/gallery-3.jpg",
  gallery4: "/dayal-builders/projects/gallery-4.jpg",
} as const;

export const ONGOING_PROJECTS = [
  {
    id: "teg-bahadur-block",
    name: "Teg Bahadur Block",
    status: "Ongoing" as const,
    location: "Jamshedpur",
    tagline: "A visionary living space in progress",
    description:
      "An upcoming residential landmark designed for comfort, convenience, and community living.",
    image: IMG.tegBahadur,
  },
  {
    id: "dayal-vatika",
    name: "Dayal Vatika",
    status: "Ongoing" as const,
    location: "Jamshedpur",
    tagline: "Where serenity meets modern living",
    description:
      "An ongoing project crafted to offer peaceful, well-designed homes in a thriving neighborhood.",
    image: IMG.vatika,
  },
  {
    id: "dayal-galaxy",
    name: "Dayal Galaxy",
    status: "Ongoing" as const,
    location: "Jamshedpur",
    tagline: "Elevating urban lifestyle",
    description:
      "Contemporary architecture with premium amenities for a refined living experience.",
    image: IMG.galaxy,
  },
  {
    id: "dayal-enclave",
    name: "Dayal Enclave",
    status: "Ongoing" as const,
    location: "Jamshedpur",
    tagline: "Designed for comfortable living",
    description:
      "Modern homes with a perfect balance of style and functionality.",
    image: IMG.enclave,
  },
] as const;

export const PAST_PROJECTS = [
  {
    id: "dayal-tower",
    name: "Dayal Tower",
    status: "Completed" as const,
    location: "Parsudih, Jamshedpur",
    tagline: "Legacy project",
    description:
      "An exquisite haven for peaceful living nestled in the heart of Parsudih, Jamshedpur.",
    image: IMG.tower,
  },
  {
    id: "dayal-residency",
    name: "Dayal Residency",
    status: "Completed" as const,
    location: "Karandih, Jamshedpur",
    tagline: "Legacy project",
    description:
      "A spacious, pristine, and beautifully crafted retreat in the serene locale of Karandih.",
    image: IMG.residency,
  },
] as const;

/** @deprecated Use ONGOING_PROJECTS + PAST_PROJECTS */
export const PROJECTS = [...ONGOING_PROJECTS, ...PAST_PROJECTS] as const;

export const AMENITIES = [
  { name: "Clubhouse", icon: "club" },
  { name: "Gym & Fitness", icon: "gym" },
  { name: "Landscaped Gardens", icon: "garden" },
  { name: "Kids Play Area", icon: "play" },
  { name: "Jogging Track", icon: "track" },
  { name: "Temple", icon: "temple" },
  { name: "CCTV Security", icon: "cctv" },
  { name: "Swimming Pool", icon: "pool" },
  { name: "Power Backup", icon: "power" },
  { name: "Wide Roads & Parking", icon: "parking" },
] as const;

export const NEARBY = [
  { name: "Govindpur Railway Station", time: "Nearby", icon: "train" },
  { name: "Schools & Colleges", time: "Nearby", icon: "school" },
  { name: "Hospital", time: "Nearby", icon: "hospital" },
  { name: "Local Market", time: "Nearby", icon: "market" },
  { name: "NH-33 Highway", time: "Nearby", icon: "highway" },
  { name: "Jamshedpur City", time: "Well connected", icon: "plane" },
] as const;

export const WHY_FAMILY_IMAGE = "/dayal-builders/why-home.jpg";

export const WHY_TRUST = [
  "State-of-the-art engineering",
  "Top-quality materials",
  "Leading architecture partners",
  "Residential & commercial expertise",
  "Prominent Jamshedpur real-estate brand",
] as const;

export const GALLERY_IMAGES = [
  { src: IMG.gallery1, alt: "Dayal Builders project exterior", span: "lg:col-span-2 lg:row-span-2" },
  { src: IMG.gallery2, alt: "Residential development", span: "" },
  { src: IMG.gallery3, alt: "Dayal Builders construction", span: "" },
  { src: IMG.gallery4, alt: "Crafted living spaces", span: "" },
] as const;

export const BLOG = [
  {
    title: "Building Foundations. Creating Futures.",
    excerpt: "How Dayal Builders is shaping urban living in Jamshedpur.",
    date: "2025",
  },
] as const;

export const FAQ = [
  {
    q: "What ongoing projects does Dayal Builders have?",
    a: "Teg Bahadur Block, Dayal Vatika, Dayal Galaxy, and Dayal Enclave are currently in development.",
  },
  {
    q: "Where is the site office located?",
    a: `Site address: ${DAYAL.siteAddress}. Head office: ${DAYAL.officeAddress}.`,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Ravi Sinha",
    location: "Dayal Galaxy Resident",
    quote:
      "Choosing Dayal Galaxy was the best decision I made for my family. The quality of construction, spacious layout, and peaceful environment exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Neha Agarwal",
    location: "Dayal Vatika Homeowner",
    quote:
      "From start to finish, the experience with Dayal Builders was smooth and professional. They delivered exactly what was promised — a beautiful, well-planned home.",
    rating: 5,
  },
  {
    name: "Sahil Gupta",
    location: "Investor",
    quote:
      "Dayal Builders combines timely delivery with modern designs and transparency. I've invested in two of their projects and have full confidence in their commitment to quality.",
    rating: 5,
  },
] as const;
