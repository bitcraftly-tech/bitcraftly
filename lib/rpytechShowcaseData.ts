/** RPY Tech portfolio showcase — aligned to rpytech.html mock */

export const RPYTECH = {
  brand: "RPYTech",
  legalName: "RPY Technical & Training Services Pvt. Ltd.",
  trustName: "Ramakesh Prasad Yadav Educational and Welfare Trust",
  trustTagline: "Educational & Welfare Trust",
  trustNameLines: ["Ramakesh Prasad Yadav", "Educational and Welfare Trust"] as const,
  logoUrl: "/rpy-tech/logo.png",
  heroImageUrl: "/rpy-tech/hero-portrait.png",
  aboutImageUrl: "/rpy-tech/about-vocational.jpg",
  welcomeBar: "Welcome to RPY Technical & Training Services Pvt. Ltd.",
  footerBlurb: "Empowering skills. Building careers.\nTransforming lives.",
  heroEyebrow: "Vocational Training & Certification",
  heroSubtextLead: "Vocational Training, Fire & Safety, NDT, QA/QC,",
  heroSubtextStrong: "Industrial Certifications",
  heroSubtextTail: "and more.",
  email: "info@rpytech.in",
  phone: "+91 82105 99368",
  whatsapp: "918210599368",
  address: "D-218, Sector-63, Noida, Uttar Pradesh - 201301",
  mapLabel: "Head Office",
  website: "www.rpytech.in",
  copyrightYear: "2024",
} as const;

export const RPYTECH_TOP_LINKS = [
  { label: "Student Login", icon: "user" as const },
  { label: "Center Login", icon: "building" as const },
  { label: "Verify Certificate", icon: "check" as const },
  { label: "Contact Us", icon: "phone" as const },
] as const;

export type RpytechNavChild = {
  label: string;
  id: string;
};

export type RpytechNavItem = {
  label: string;
  id: string;
  children?: readonly RpytechNavChild[];
};

export const RPYTECH_NAV: readonly RpytechNavItem[] = [
  { label: "HOME", id: "top" },
  {
    label: "ABOUT US",
    id: "about",
    children: [
      { label: "ABOUT US", id: "about" },
      { label: "DIRECTOR MESSAGE", id: "director-message" },
      { label: "OUR MISSION/OUR VISION", id: "mission-vision" },
    ],
  },
  {
    label: "COURSES",
    id: "courses",
    children: [
      { label: "TRAINING SERVICES", id: "courses" },
      { label: "INSPECTION AND TESTING SERVICES", id: "inspection-services" },
    ],
  },
  {
    label: "STUDENT ZONE",
    id: "student-zone",
    children: [
      { label: "STUDENT VERIFICATION", id: "verification" },
      { label: "STUDENT LOGIN", id: "student-zone" },
      { label: "DOWNLOAD ADMITCARD", id: "student-zone" },
      { label: "MARKSHEET VERIFICATION", id: "verification" },
      { label: "CERTIFICATE VERIFICATION", id: "verification" },
    ],
  },
  {
    label: "FRANCHISE",
    id: "franchise",
    children: [
      { label: "BECOME A FRANCHISE", id: "franchise" },
      { label: "FRANCHISE ENQUIRY", id: "franchise" },
      { label: "FRANCHISE VERIFICATION", id: "franchise" },
      { label: "FRANCHISE LIST", id: "franchise" },
      { label: "FRANCHISE LOGIN", id: "franchise" },
    ],
  },
  {
    label: "GALLERY",
    id: "gallery",
    children: [
      { label: "PHOTOS", id: "gallery" },
      { label: "VIDEOS", id: "gallery" },
    ],
  },
  { label: "CONTACT US", id: "contact" },
];

/** Compact quick links — shown as chips in top bar */
export const RPYTECH_HIGHLIGHT_NAV = [
  { label: "OUR CERTIFICATES", shortLabel: "Certificates", id: "verification", tone: "orange" as const },
  { label: "PLACEMENT CELL", shortLabel: "Placement", id: "placement", tone: "blue" as const },
] as const;

export const RPYTECH_TRUST_BADGES = [
  { title: "ISO 9001:2015", subtitle: "Certified Institute", icon: "certificate" as const },
  { title: "MSME", subtitle: "Registered", icon: "landmark" as const },
  { title: "MCA", subtitle: "Approved", icon: "check" as const },
] as const;

export const RPYTECH_ABOUT = {
  title: "WELCOME TO RPY TECHNICAL AND TRAINING SERVICES PVT LTD",
  body:
    "RPY TECHNICAL & TRAINING Services Pvt. Ltd. is approved by MCA - Ministry of Corporate Affairs (Govt. of India) CIN: U74999BR2018PTC038904 and also approved by Ministry of MSME (Govt. of India) UDYAM-BR-13-0011251 and ISO 9001:2015 & ISO 45001:2018 Certified. Basically, it is based on service providing institution that recoups services in different sectors such as:- Industrial Piping, Non-Destructive Testing (NDT), Fire Fighting & Safety officer, Welding Technology, Maintenance & Repair, Power-Plant Work, Man Power Supply, filling the requirements of NDT, Piping, Welding, QA/QC, Training with 100% practical lab support & Certification. Not only it provides Training, It also provide NDT SERVICES in ultrasonic Testing, magnetic particle Testing, Penetrant Testing, ultrasonic thickeness Gauging, Metal hardness Testing etc.",
  previewLength: 320,
  readMoreLabel: "Read More",
  readLessLabel: "Read Less",
  featureOverlay: {
    line1: "INSIGHT INTO",
    highlight: "VOCATIONAL COURSES",
    line3: "IN INDIA & ITS BENEFITS",
  },
  credentials: [
    { label: "MCA Approved", detail: "CIN: U74999BR2018PTC038904" },
    { label: "MSME Registered", detail: "UDYAM-BR-13-0011251" },
    { label: "ISO 9001:2015", detail: "Certified" },
    { label: "ISO 45001:2018", detail: "Certified" },
  ],
  sectors: [
    "Industrial Piping",
    "Non-Destructive Testing (NDT)",
    "Fire Fighting & Safety",
    "Welding Technology",
    "Maintenance & Repair",
    "Power-Plant Work",
    "Man Power Supply",
    "QA/QC Training",
    "NDT Services",
  ],
} as const;

export const RPYTECH_DIRECTOR_MESSAGE = {
  label: "DIRECTOR'S MESSAGE",
  title: "Guiding Students Toward a Brighter Future",
  name: "Ramakesh Prasad Yadav",
  role: "Founder & Director",
  organization: "RPY Technical & Training Services Pvt. Ltd.",
  message: [
    "At RPY Technical & Training Services, we believe vocational education is the strongest bridge between talent and opportunity. Our goal is to help every learner gain skills that industries truly need.",
    "We are committed to industry-aligned training with 100% practical lab support, recognized certifications, and dedicated placement assistance — so students can step into the workforce with confidence.",
    "Through the Ramakesh Prasad Yadav Educational and Welfare Trust, we continue expanding access to quality skill development across India. Thank you for trusting RPYTech with your career journey.",
  ],
  highlights: [
    { value: "100%", label: "Practical Lab Support" },
    { value: "ISO", label: "Certified Institute" },
    { value: "24×7", label: "Student Support" },
  ],
} as const;

export const RPYTECH_MISSION_VISION = {
  label: "OUR MISSION / OUR VISION",
  title: "What Drives RPYTech Every Day",
  mission: {
    title: "Our Mission",
    icon: "target" as const,
    body: "To deliver accessible, industry-relevant vocational training and certification that empowers students with practical skills, national recognition, and confident career paths — because your bright future is our mission.",
    points: [
      "Skill-based vocational programs",
      "NDT, Piping, Welding & Safety training",
      "100% practical lab support & certification",
    ],
  },
  vision: {
    title: "Our Vision",
    icon: "eye" as const,
    body: "To become India's most trusted vocational training network — connecting learners, industry partners, and franchise centres through quality education, innovation, and nationwide opportunity.",
    points: [
      "Nationwide training & franchise network",
      "Internationally recognized certifications",
      "Industry-ready workforce for India",
    ],
  },
} as const;

export const RPYTECH_STATS = [
  { value: 43, label: "OUR CERTIFICATION", icon: "certification" as const },
  { value: 157, label: "OUR PARTNERS", icon: "partners" as const },
  { value: 69, label: "OUR ASSOCIATES", icon: "associate" as const },
  { value: 62572, label: "CERTIFIED CANDIDATES", icon: "graduates" as const },
  { value: 88503, label: "REGISTERED USERS", icon: "registered" as const },
  { value: 122377, label: "CERTIFICATES ISSUED", icon: "issued" as const },
  { value: 407363, label: "SITE VISITORS", icon: "visitors" as const },
] as const;

export const RPYTECH_VERIFICATION = [
  {
    title: "Student Verification",
    action: "View",
    tone: "orange" as const,
    icon: "student" as const,
    count: 88503,
    countLabel: "Registered",
    targetId: "verification",
  },
  {
    title: "Certification Verification",
    action: "View",
    tone: "green" as const,
    icon: "certificate" as const,
    count: 122377,
    countLabel: "Certificates",
    targetId: "verification",
  },
  {
    title: "Marksheet Verification",
    action: "View",
    tone: "green" as const,
    icon: "marksheet" as const,
    count: 62572,
    countLabel: "Candidates",
    targetId: "verification",
  },
  {
    title: "Become A Partner",
    action: "Submit",
    tone: "orange" as const,
    icon: "partner" as const,
    count: 157,
    countLabel: "Partners",
    targetId: "franchise",
  },
] as const;

export const RPYTECH_CERTIFICATIONS = {
  label: "CERTIFICATIONS",
  services: [
    {
      title: "TRAINING SERVICES",
      imageLabel: "Training Services",
      tone: "navy" as const,
      icon: "training" as const,
      targetId: "courses",
    },
    {
      title: "INSPECTION AND TESTING SERVICES",
      imageLabel: "Inspection & Testing",
      tone: "orange" as const,
      icon: "inspection" as const,
      targetId: "inspection-services",
    },
  ],
  steps: [
    { title: "Get the Skills", tone: "navy" as const, icon: "skills" as const },
    { title: "Get Certified", tone: "orange" as const, icon: "certified" as const },
    { title: "Get the Job", tone: "navy" as const, icon: "job" as const },
  ],
} as const;

export const RPYTECH_ELEARNING = {
  label: "E-LEARNING BENEFITS",
  ctaLabel: "GO TO E-LEARNING",
  ctaTargetId: "courses",
  benefits: [
    { title: "Improve Skills", icon: "skills" as const, tone: "orange" as const },
    { title: "Self Learning", icon: "self" as const, tone: "navy" as const },
    { title: "Get Knowledge", icon: "knowledge" as const, tone: "orange" as const },
    { title: "Accessibility & Time Saving", icon: "access" as const, tone: "navy" as const },
    { title: "Easy Refresh of Content", icon: "refresh" as const, tone: "orange" as const },
    { title: "Global Education", icon: "global" as const, tone: "navy" as const },
  ],
} as const;

export const RPYTECH_HOW_IT_WORKS = {
  label: "HOW IT WORKS",
  centerImageUrl: "/rpy-tech/rajiv-img.jpg",
  left: [
    {
      title: "Choose Your Certification",
      description:
        "We have many types of courses to choose from. Choose the one that's right for you.",
      icon: "cert" as const,
      tone: "navy" as const,
    },
    {
      title: "Make Your Schedule",
      description:
        "To schedule an exam, test takers have a wide choice of dates and locations to choose from.",
      icon: "schedule" as const,
      tone: "orange" as const,
    },
    {
      title: "RPY Technical and Training Services Pvt Ltd",
      description: "Get Vocational Training after successfully completing the Registration.",
      icon: "training" as const,
      tone: "navy" as const,
    },
  ],
  right: [
    {
      title: "Find Location (Examination Center)",
      description: "Find a nearby test center that offers your selected exam.",
      icon: "location" as const,
      tone: "orange" as const,
    },
    {
      title: "Attend Exam",
      description: "For test takers to attend the exam at the selected test center.",
      icon: "exam" as const,
      tone: "navy" as const,
    },
    {
      title: "Have a Bright Future",
      description: "Become internationally certified to have a bright future.",
      icon: "future" as const,
      tone: "orange" as const,
    },
  ],
} as const;

export const RPYTECH_COURSES = [
  { title: "Industrial Safety", emoji: "🦺", tone: 1 as const },
  { title: "Fire & Safety", emoji: "🔥", tone: 2 as const },
  { title: "QA/QC", emoji: "🔍", tone: 3 as const },
  { title: "Piping", emoji: "🔧", tone: 4 as const },
  { title: "Welding", emoji: "⚡", tone: 5 as const },
  { title: "NDT Level II", emoji: "📡", tone: 6 as const },
  { title: "HVAC", emoji: "❄️", tone: 7 as const },
  { title: "Fitter", emoji: "🛠️", tone: 8 as const },
] as const;

export const RPYTECH_PLACEMENTS = [
  { name: "Amit Kumar", role: "Safety Officer", company: "LARSEN & TOUBRO", companyTone: "default" as const },
  { name: "Pooja Yadav", role: "QA/QC Engineer", company: "adani", companyTone: "orange" as const },
  { name: "Ravi Shankar", role: "Piping Supervisor", company: "TATA", companyTone: "default" as const },
  { name: "Vikash Singh", role: "Safety Engineer", company: "Reliance", companyTone: "red" as const },
] as const;

export const RPYTECH_GALLERY = [
  { icon: "users" as const },
  { icon: "teacher" as const },
  { icon: "award" as const },
  { icon: "hardhat" as const },
  { icon: "fire" as const },
] as const;

export const RPYTECH_FRANCHISE_BENEFITS = [
  { label: "Low Investment\nHigh Returns", icon: "chart" as const },
  { label: "Complete Training\n& Support", icon: "help" as const },
  { label: "Brand Recognition\n& Growth", icon: "medal" as const },
  { label: "Marketing\nAssistance", icon: "megaphone" as const },
  { label: "Certification\nAuthority", icon: "certificate" as const },
  { label: "Business\nOpportunity", icon: "briefcase" as const },
] as const;

export const RPYTECH_TESTIMONIALS = [
  { name: "Sunil Kumar", role: "Safety Officer", quote: "RPYTech helped me build a great career in the safety industry. Excellent training and support!" },
  { name: "Neha Yadav", role: "QA/QC Engineer", quote: "The practical training and placement support is outstanding. Thank you RPYTech!" },
  { name: "Mohit Singh", role: "NDT Technician", quote: "I got placed in a top MNC after completing my NDT course from RPYTech." },
  { name: "Pooja Sharma", role: "Piping Engineer", quote: "Best institute for industrial training. Highly recommended!" },
] as const;

export const RPYTECH_FOOTER_QUICK = ["Home", "About Us", "Courses", "Student Zone", "Gallery", "Contact Us"] as const;

export const RPYTECH_FOOTER_COURSES = [
  "Industrial Safety",
  "Fire & Safety",
  "QA/QC",
  "Piping",
  "Welding",
  "NDT Level II",
  "HVAC",
  "Fitter",
] as const;

export const RPYTECH_FOOTER_VERIFY = ["Student Verification", "Certificate Verification", "Marksheet Verification"] as const;

export const RPYTECH_FLOATING_ACTIONS = [
  { label: "Apply Online", tone: "orange" as const },
  { label: "Call Now", tone: "navy" as const },
  { label: "WhatsApp", tone: "green" as const },
] as const;

export const RPYTECH_CONTAINER = "rpytech-container";
