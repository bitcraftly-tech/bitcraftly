export const DAYAL = {
  brand: "Dayal Builders",
  tagline: "Premium Township",
  location: "Govindpur, Jamshedpur",
  /** Township / project site */
  address: "Dayal City, Govindpur, Jamshedpur, Jharkhand",
  /** Registered office — shown in contact & footer */
  officeAddress:
    "4th Floor, Swamy Building, Opposite Ram Mandir, Bistupur, Jamshedpur, Jharkhand 831001",
  phones: [
    { display: "+91 90316 16363", tel: "919031616363" },
    { display: "+91 92048 90301", tel: "919204890301" },
  ] as const,
  phone: "919031616363",
  whatsapp: "919204890301",
  email: "dayal_builders@rediffmail.com",
  facebook: "https://www.facebook.com/dayal.builders/",
  instagram: "https://www.instagram.com/p/DXbVHJ3D7J6/",
} as const;

export const HERO_DESCRIPTION =
  "Thoughtfully planned residential township offering modern living, world-class amenities, and better lifestyle experiences.";

export const FOOTER_ABOUT =
  "Dayal Builders is a trusted real-estate brand delivering premium residential experiences in Jamshedpur.";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Amenities", href: "#amenities" },
  { label: "Master Plan", href: "#master-plan" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const TRUST_HIGHLIGHTS = [
  "Gated Community",
  "24×7 Security",
  "Modern Amenities",
  "Green Open Spaces",
  "RERA Approved",
] as const;

export const METRICS = [
  { value: 15, suffix: "+", label: "Years of Trust", icon: "award" },
  { value: 5000, suffix: "+", label: "Happy Families", icon: "users" },
  { value: 25, suffix: "+", label: "Acres Township", icon: "map" },
  { value: 10, suffix: "M+", label: "Sq Ft Delivered", icon: "building" },
] as const;

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS = [
  {
    id: "dayal-city",
    name: "Dayal City",
    status: "Premium Launch" as const,
    location: "Govindpur",
    bhk: "2 & 3 BHK",
    amenity: "Clubhouse",
    image: img("photo-1545324418-cc1a3fa10c00"),
  },
  {
    id: "dayal-residency",
    name: "Dayal Residency",
    status: "Ready to Move" as const,
    location: "Jamshedpur",
    bhk: "2 BHK",
    amenity: "Garden",
    image: img("photo-1512917774080-9991f1c4c750"),
  },
  {
    id: "dayal-villas",
    name: "Dayal Villas",
    status: "Under Construction" as const,
    location: "Govindpur",
    bhk: "3 & 4 BHK Villa",
    amenity: "Private Pool",
    image: img("photo-1600596542815-ffad4c1539a9"),
  },
  {
    id: "dayal-towers",
    name: "Dayal Towers",
    status: "Upcoming" as const,
    location: "Adityapur",
    bhk: "2 & 3 BHK",
    amenity: "Sky Lounge",
    image: img("photo-1486325212027-8081e485255e"),
  },
  {
    id: "dayal-greens",
    name: "Dayal Greens",
    status: "Ready to Move" as const,
    location: "Govindpur",
    bhk: "Plots & Villas",
    amenity: "Green Belt",
    image: img("photo-1600585154340-be6161a56a0c"),
  },
] as const;

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
  { name: "Govindpur Railway Station", time: "8 Min", icon: "train" },
  { name: "School & Colleges", time: "5 Min", icon: "school" },
  { name: "Hospital", time: "10 Min", icon: "hospital" },
  { name: "Market", time: "6 Min", icon: "market" },
  { name: "NH-33 Highway", time: "3 Min", icon: "highway" },
  { name: "Jamshedpur Airport", time: "45 Min", icon: "plane" },
] as const;

export const WHY_TRUST = [
  "35+ Years Legacy",
  "Quality Construction",
  "On-Time Delivery",
  "Transparent Dealings",
  "Customer-First Approach",
] as const;

export const GALLERY_IMAGES = [
  { src: img("photo-1600596542815-ffad4c1539a9", 900), alt: "Luxury villa exterior", span: "lg:col-span-2 lg:row-span-2" },
  { src: img("photo-1600607687939-ce8a6c25118c", 600), alt: "Modern living room", span: "" },
  { src: img("photo-1600585154340-be6161a56a0c", 600), alt: "Township landscape", span: "" },
  { src: img("photo-1600585154526-990dced4db0d", 600), alt: "Pool and amenities", span: "" },
] as const;

export const BLOG = [
  {
    title: "Real-estate growth in Govindpur",
    excerpt: "Why township living is reshaping family lifestyles near Jamshedpur.",
    date: "Mar 2026",
  },
] as const;

export const FAQ = [
  {
    q: "Is the project RERA approved?",
    a: "Yes. Dayal City is registered under applicable RERA norms.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Rajesh & Priya Sharma",
    location: "Govindpur",
    quote: "Dayal Builders delivered exactly what they promised — quality, transparency, and a beautiful community to raise our family.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    location: "Jamshedpur",
    quote: "The township planning, green spaces, and security gave us confidence from day one. Highly recommended for Jamshedpur buyers.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    location: "Adityapur",
    quote: "Professional team, clear paperwork, and a premium feel throughout the buying journey. We are proud Dayal homeowners.",
    rating: 5,
  },
] as const;
