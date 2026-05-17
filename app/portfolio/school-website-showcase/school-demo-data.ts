const img = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const SCHOOL_NAME = "Elevate";
export const SCHOOL_FULL_NAME = "Elevate International School";
export const SCHOOL_TAGLINE = "Nurturing Minds, Shaping Futures";
export const SCHOOL_SOCIETY = "Elevate Education Foundation";
export const SCHOOL_PHONE = "9876543210";
export const SCHOOL_PHONE_DISPLAY = "+91 98765 43210";
export const SCHOOL_EMAIL = "admissions@elevateschool.edu.in";
export const SCHOOL_ADDRESS = "Plot 12, Knowledge Park II, Greater Noida, UP 201306";
export const SCHOOL_HOURS = "Mon–Fri: 7:30 AM – 2:30 PM";
export const SCHOOL_WHATSAPP_URL = `https://wa.me/91${SCHOOL_PHONE}?text=${encodeURIComponent("Hello Elevate Admissions, I would like to enquire about admission for 2026-27.")}`;

/** Stable SSR/client formatting (avoids locale hydration mismatches). */
export function formatVisitorCount(count: number): string {
  const str = String(count);
  if (str.length <= 3) return str;
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 0) {
    const chunk = remaining.length > 2 ? remaining.slice(-2) : remaining;
    result = `${chunk},${result}`;
    remaining = remaining.length > 2 ? remaining.slice(0, -2) : "";
  }
  return result;
}
/** Demo campus tour — replace with your YouTube embed on production */
export const SCHOOL_DEMO_VIDEO_EMBED = "https://www.youtube.com/embed/LXb3EKWsInQ?rel=0&modestbranding=1";

export const IMAGES = {
  heroBg: "/images/school-hero.jpg",
  heroBgFallback:
    "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  aboutCampus: "/images/school-about-campus.jpg",
  aboutCampusFallback:
    "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=900&h=1125&fit=crop",
  ctaPanel: "/images/school-cta-panel.jpg",
  ctaPanelFallback:
    "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  programEarly: img("photo-1543269865-cbf427effbad", 500, 320),
  programPrimary: img("photo-1503676260728-1c00da094a0b", 500, 320),
  programMiddle: img("photo-1562774053-701939374585", 500, 320),
  programSecondary: img("photo-1633356122544-f134324a6cee", 500, 320),
  programSenior: img("photo-1498243691581-b145c3f54a5a", 500, 320),
} as const;

export const STATS_BAR = [
  { value: "2500+", label: "Happy Students", icon: "users" },
  { value: "150+", label: "Expert Teachers", icon: "award" },
  { value: "25+", label: "Years of Legacy", icon: "calendar" },
  { value: "100%", label: "Board Results", icon: "trophy" },
] as const;

export const HERO_SUBHEADLINE =
  "At Elevate International School, we provide a holistic learning environment that empowers students to explore, excel and lead.";

export const HERO_BADGES = [
  { label: "CBSE Affiliated" },
  { label: "Smart Classrooms" },
  { label: "Holistic Development" },
  { label: "Future Ready" },
] as const;

export const ACADEMIC_YEARS = ["2026-27", "2027-28", "2028-29"] as const;

export const GRADE_OPTIONS = [
  "Playgroup",
  "Nursery",
  "KG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export const ABOUT_FEATURES = [
  "Experienced Faculty",
  "Innovative Teaching Methods",
  "Global Exposure Programmes",
  "Safe & Secure Environment",
] as const;

export const QUICK_ACTIONS = [
  { id: "admission", label: "Admission", desc: "Apply for 2026-27", icon: "graduation" },
  { id: "fees", label: "Fee Payment", desc: "Pay online securely", icon: "wallet" },
  { id: "portal", label: "Parent Portal", desc: "Track progress", icon: "users" },
  { id: "transport", label: "Transport", desc: "Bus routes & GPS", icon: "bus" },
  { id: "downloads", label: "Downloads", desc: "Forms & circulars", icon: "download" },
  { id: "calendar", label: "Academic Calendar", desc: "Term dates", icon: "calendar" },
] as const;

export const CAMPUS_LIFE = [
  { id: "c1", title: "Sports & athletics", image: img("photo-1571019613454-1cb2f99b2d8b", 600, 800), tall: true },
  { id: "c2", title: "Robotics lab", image: img("photo-1633356122544-f134324a6cee", 600, 400), tall: false },
  { id: "c3", title: "Music & arts", image: img("photo-1556761175-b413da4baf72", 600, 400), tall: false },
  { id: "c4", title: "Smart classrooms", image: img("photo-1503676260728-1c00da094a0b", 600, 500), tall: false },
  { id: "c5", title: "Science experiments", image: img("photo-1498243691581-b145c3f54a5a", 600, 700), tall: true },
  { id: "c6", title: "Library & reading", image: img("photo-1481627834876-b7833e8f5570", 600, 400), tall: false },
  { id: "c7", title: "Cultural events", image: img("photo-1529390079861-591de354faf5", 600, 400), tall: false },
  { id: "c8", title: "Campus grounds", image: IMAGES.aboutCampus, tall: false },
] as const;

export const FACILITIES_LIST = [
  { title: "Smart Classrooms", desc: "Digital boards & LMS in every wing" },
  { title: "Science Labs", desc: "Physics, Chemistry & Biology" },
  { title: "Sports Complex", desc: "Cricket, football & indoor courts" },
  { title: "Transport", desc: "GPS-enabled fleet across NCR" },
  { title: "Auditorium", desc: "800-seat cultural hub" },
  { title: "Counselling", desc: "Career guidance from middle school" },
] as const;

export const VISION_MISSION = [
  {
    id: "vision",
    title: "Our Vision",
    desc: "To be a leading institution that empowers learners to excel academically and lead with integrity globally.",
    icon: "eye",
  },
  {
    id: "mission",
    title: "Our Mission",
    desc: "Deliver holistic CBSE education through innovation, values and personalised mentorship for every child.",
    icon: "target",
  },
  {
    id: "values",
    title: "Our Values",
    desc: "Respect, curiosity, collaboration and resilience — the foundation of every Elevate classroom.",
    icon: "heart",
  },
] as const;

export const ACADEMIC_PROGRAMS = [
  {
    id: "early",
    title: "Early Years",
    grades: "Playgroup to KG",
    desc: "Play-based learning, phonics & social skills in a nurturing environment.",
    image: IMAGES.programEarly,
    iconColor: "#eab308",
  },
  {
    id: "primary",
    title: "Primary School",
    grades: "Grade 1 to 5",
    desc: "Strong foundations in literacy, numeracy & creative expression.",
    image: IMAGES.programPrimary,
    iconColor: "#22c55e",
  },
  {
    id: "middle",
    title: "Middle School",
    grades: "Grade 6 to 8",
    desc: "STEM labs, languages & leadership through projects and clubs.",
    image: IMAGES.programMiddle,
    iconColor: "#a855f7",
  },
  {
    id: "secondary",
    title: "Secondary School",
    grades: "Grade 9 & 10",
    desc: "Board-focused coaching with counselling and competitive prep.",
    image: IMAGES.programSecondary,
    iconColor: "#3b82f6",
  },
  {
    id: "senior",
    title: "Senior Secondary",
    grades: "Grade 11 & 12",
    desc: "Science, Commerce & Humanities streams with university counselling.",
    image: IMAGES.programSenior,
    iconColor: "#ef4444",
  },
] as const;

export const NEWS_ITEMS = [
  {
    id: "n1",
    title: "Elevate students shine at CBSE regional science fair",
    date: "10 May 2026",
    snippet: "Three gold medals in robotics and environmental projects.",
    image: img("photo-1529390079861-591de354faf5", 120, 120),
  },
  {
    id: "n2",
    title: "New innovation lab inaugurated on campus",
    date: "28 Apr 2026",
    snippet: "AI & coding modules for middle and senior students.",
    image: img("photo-1556761175-b413da4baf72", 120, 120),
  },
  {
    id: "n3",
    title: "Annual sports week concludes with house trophy",
    date: "15 Apr 2026",
    snippet: "Agni house wins overall championship for 2026.",
    image: img("photo-1571019613454-1cb2f99b2d8b", 120, 120),
  },
] as const;

export const UPCOMING_EVENTS = [
  { id: "e1", day: "25", month: "MAY", title: "Parent Orientation · New Session", time: "9:00 AM · Auditorium" },
  { id: "e2", day: "02", month: "JUN", title: "Inter-School Debate Championship", time: "11:00 AM · Hall B" },
  { id: "e3", day: "18", month: "JUN", title: "Summer Skill Workshop · Grades VI–VIII", time: "8:30 AM · Labs" },
] as const;

export const GALLERY = [
  { id: "g1", title: "Morning assembly", image: img("photo-1522202176988-66273c2fd55f", 400, 400) },
  { id: "g2", title: "Science lab", image: img("photo-1633356122544-f134324a6cee", 400, 400) },
  { id: "g3", title: "Sports day", image: img("photo-1571019613454-1cb2f99b2d8b", 400, 400) },
  { id: "g4", title: "Library", image: img("photo-1481627834876-b7833e8f5570", 400, 400) },
  { id: "g5", title: "Art class", image: img("photo-1503676260728-1c00da094a0b", 400, 400) },
  { id: "g6", title: "Campus", image: IMAGES.aboutCampus },
] as const;

export const FOOTER_QUICK = [
  "About Us",
  "Academics",
  "Admissions",
  "Campus Life",
  "News & Events",
  "Facilities",
  "Contact Us",
] as const;

export type UsefulLinkAction =
  | { type: "scroll"; sectionId: string }
  | { type: "modal"; modal: "principal" | "history" | "sports" | "circular" }
  | { type: "form"; form: "preschool" | "career" | "alumni" }
  | { type: "toast"; message: string }
  | { type: "enquiry" };

export const FOOTER_USEFUL: { label: string; action: UsefulLinkAction }[] = [
  { label: "Academic Calendar", action: { type: "scroll", sectionId: "programs" } },
  { label: "Holiday List", action: { type: "modal", modal: "circular" } },
  {
    label: "Fee Structure",
    action: {
      type: "toast",
      message: "Fee structure 2026-27 · Playgroup ₹48k · Grade I–V ₹72k · transport extra · brochure on enquiry",
    },
  },
  { label: "Transport Routes", action: { type: "enquiry" } },
  { label: "Downloads", action: { type: "modal", modal: "circular" } },
  { label: "Careers", action: { type: "form", form: "career" } },
];

export const CIRCULARS = [
  { date: "12 May 2026", title: "Summer vacation schedule · Nursery to XII" },
  { date: "28 Apr 2026", title: "PTM for classes VI–VIII · 10:00 AM" },
  { date: "15 Apr 2026", title: "Registration open · 2026–27" },
] as const;

export type QuickLink = {
  id: string;
  label: string;
  action: "modal" | "toast" | "form" | "scroll" | "enquiry";
  modal?: "principal" | "circular" | "history" | "sports";
  form?: "preschool" | "career" | "alumni";
  toast?: string;
  sectionId?: string;
};

export const QUICK_LINKS: QuickLink[] = [
  { id: "principal", label: "Principal's Message", action: "modal", modal: "principal" },
  { id: "history", label: "Our History", action: "modal", modal: "history" },
  { id: "sports", label: "Sports Achievements", action: "modal", modal: "sports" },
  { id: "circular", label: "Circulars", action: "modal", modal: "circular" },
  { id: "preschool", label: "Pre-school", action: "form", form: "preschool" },
  { id: "career", label: "Careers", action: "form", form: "career" },
  { id: "alumni", label: "Alumni", action: "form", form: "alumni" },
  { id: "fees", label: "Fee Structure", action: "toast", toast: "Fee structure 2026-27 · brochure on enquiry" },
  { id: "visit", label: "Book Campus Visit", action: "enquiry" },
];
