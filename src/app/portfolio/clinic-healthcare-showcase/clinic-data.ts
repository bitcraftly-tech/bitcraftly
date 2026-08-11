import {
  Ambulance,
  Baby,
  Bone,
  Brain,
  Building2,
  CalendarCheck,
  Clock,
  Ear,
  FlaskConical,
  Heart,
  HeartPulse,
  Microscope,
  Ribbon,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** Unsplash delivery URL — sized and cropped at the CDN so Next/Image gets a tight source. */
export function clinicImage(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const CLINIC_BRAND = {
  name: 'Clinic & Healthcare',
  tagline: 'Compassionate care, close to home',
  phone: '+91 90743 42210',
  emergency: '+91 98765 43210',
  /** Digits-only WhatsApp destination for emergency / care-desk chat. */
  whatsapp: '919876543210',
  email: 'care@clinichealthcare.com',
  address: 'Clinic & Healthcare Campus, Bistupur, Jamshedpur 831001',
} as const;

export const CLINIC_NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'AI Features', href: '#ai-solutions' },
  { label: 'Book Appointment', href: '#appointment' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ───────────────────────────── 1 · Hero ───────────────────────────── */

export const CLINIC_HERO = {
  titleLead: 'Your Health,',
  titleAccent: 'Our Priority',
  description:
    'Clinic & Healthcare is a trusted healthcare centre offering advanced medical care with compassion, expertise and cutting-edge technology.',
  image: '/clinic/hero-doctor.png',
  imageAlt: 'Clinic & Healthcare consultant in a white coat with a stethoscope',
  backgroundImage: '/clinic/hero-bg.png',
  trustPoints: [
    { icon: HeartPulse, title: 'Expert Doctors', copy: 'Leading specialists' },
    { icon: Clock, title: '24/7 Support', copy: 'Always here for you' },
    { icon: ShieldCheck, title: 'Advanced Care', copy: 'Modern facilities' },
    { icon: Users, title: 'Patient First', copy: 'Your health matters' },
  ] satisfies ReadonlyArray<{ icon: LucideIcon; title: string; copy: string }>,
} as const;

/* ─────────────────────── 2 · Quick services ───────────────────────── */

export type ClinicQuickService = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly copy: string;
  readonly href: string;
};

export const CLINIC_QUICK_SERVICES: readonly ClinicQuickService[] = [
  {
    icon: CalendarCheck,
    title: 'Book Appointment',
    copy: 'Choose your doctor and time slot',
    href: '#appointment',
  },
  { icon: Video, title: 'Telehealth', copy: 'Consult from home', href: '#telehealth' },
  { icon: FlaskConical, title: 'Lab Reports', copy: 'Get reports online', href: '#services' },
  {
    icon: Ambulance,
    title: 'Emergency Care',
    copy: '24/7 critical care support',
    href: '#emergency',
  },
];

/** Closing tile of the quick-services rail — the only filled card in the row. */
export const CLINIC_QUICK_CTA = {
  icon: CalendarCheck,
  label: 'Book Now',
  href: '#appointment',
} as const;

/* ───────────────────────── 3 · Statistics ─────────────────────────── */

export type ClinicStat = {
  readonly icon: LucideIcon;
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  /** Rendered instead of the counter when the metric is not numeric. */
  readonly display?: string;
};

export const CLINIC_STATS: readonly ClinicStat[] = [
  { icon: Users, value: 50000, suffix: '+', label: 'Happy Patients' },
  { icon: Stethoscope, value: 200, suffix: '+', label: 'Expert Doctors' },
  { icon: Building2, value: 10, suffix: '+', label: 'Specialized Departments' },
  { icon: Heart, value: 24, suffix: '/7', label: 'Emergency Support', display: '24/7' },
];

/* ─────────────────────────── 4 · Doctors ──────────────────────────── */

export type ClinicDoctor = {
  readonly id: string;
  readonly name: string;
  readonly speciality: string;
  readonly experience: string;
  readonly rating: number;
  readonly reviews: number;
  readonly image: string;
  readonly imageAlt: string;
};

export const CLINIC_DOCTORS: readonly ClinicDoctor[] = [
  {
    id: 'ananya-mehta',
    name: 'Dr. Ananya Mehta',
    speciality: 'General Medicine',
    experience: '15+ years experience',
    rating: 4.9,
    reviews: 412,
    image: '/clinic/doctors/ananya-mehta.webp',
    imageAlt: 'Dr. Ananya Mehta, general medicine consultant',
  },
  {
    id: 'rahul-kapadia',
    name: 'Dr. Rahul Kapadia',
    speciality: 'Cardiology',
    experience: '18+ years experience',
    rating: 4.8,
    reviews: 356,
    image: '/clinic/doctors/rahul-kapadia.webp',
    imageAlt: 'Dr. Rahul Kapadia, senior cardiologist',
  },
  {
    id: 'nikita-saraf',
    name: 'Dr. Nikita Saraf',
    speciality: 'Gynecology',
    experience: '12+ years experience',
    rating: 4.9,
    reviews: 508,
    image: '/clinic/doctors/nikita-saraf.webp',
    imageAlt: 'Dr. Nikita Saraf, gynaecologist and obstetrician',
  },
  {
    id: 'sunil-fernandes',
    name: 'Dr. Sunil Fernandes',
    speciality: 'Orthopedics',
    experience: '20+ years experience',
    rating: 4.7,
    reviews: 289,
    image: '/clinic/doctors/sunil-fernandes.webp',
    imageAlt: 'Dr. Sunil Fernandes, orthopaedic surgeon',
  },
  {
    id: 'imran-qureshi',
    name: 'Dr. Imran Qureshi',
    speciality: 'ENT Surgery',
    experience: '14+ years experience',
    rating: 4.8,
    reviews: 231,
    image: '/clinic/doctors/imran-qureshi.webp',
    imageAlt: 'Dr. Imran Qureshi, ENT surgeon',
  },
  {
    id: 'meera-iyer',
    name: 'Dr. Meera Iyer',
    speciality: 'Pediatrics',
    experience: '11+ years experience',
    rating: 4.9,
    reviews: 476,
    image: '/clinic/doctors/meera-iyer.webp',
    imageAlt: 'Dr. Meera Iyer, consultant paediatrician',
  },
];

/* ──────────────────── 5 · Healthcare services ─────────────────────── */

export type ClinicService = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly copy: string;
};

export const CLINIC_SERVICES: readonly ClinicService[] = [
  {
    icon: Stethoscope,
    title: 'General Medicine',
    copy: 'Complete health checkups and routine care',
  },
  { icon: HeartPulse, title: 'Cardiology', copy: 'Advanced heart care and diagnostics' },
  { icon: Ribbon, title: 'Gynecology', copy: "Women's health and maternity" },
  { icon: Bone, title: 'Orthopedics', copy: 'Joint, spine and sports injury care' },
  { icon: Baby, title: 'Pediatrics', copy: 'Complete care for your child' },
  { icon: Sparkles, title: 'Dermatology', copy: 'Healthy skin, hair and nails' },
  { icon: Ear, title: 'ENT', copy: 'Ear, nose and throat specialists' },
  { icon: ScanLine, title: 'Diagnostics', copy: 'In-house imaging and pathology' },
];

/* ────────────────────── 6 · Why choose Clinic & Healthcare ──────────────────── */

export type ClinicReason = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly copy: string;
};

export const CLINIC_REASONS: readonly ClinicReason[] = [
  {
    icon: Stethoscope,
    title: 'Experienced & Caring Doctors',
    copy: 'Consultants with 10+ years in their speciality, backed by a full residency team.',
  },
  {
    icon: Microscope,
    title: 'Modern Medical Technology',
    copy: '3T MRI, digital radiology and an NABL-accredited pathology lab under one roof.',
  },
  {
    icon: Ambulance,
    title: '24/7 Emergency Support',
    copy: 'Critical-care ambulances and a resident intensivist on the floor around the clock.',
  },
  {
    icon: Brain,
    title: 'Patient-Centric Approach',
    copy: 'One coordinator per admission, transparent estimates and follow-ups that actually happen.',
  },
];

export const CLINIC_WHY_IMAGE = {
  src: clinicImage('photo-1666214280557-f1b5022eb634', 900, 900),
  alt: 'Clinic & Healthcare consultant reviewing a treatment plan with a patient in the outpatient wing',
};

/* ───────────────────────── 9 · Telehealth ─────────────────────────── */

export const CLINIC_TELEHEALTH = {
  eyebrow: 'Telehealth',
  title: 'Consult Doctors from the Comfort of Your Home',
  copy: 'Our telehealth service links healthcare accessible, convenient and safe — anytime, anywhere.',
  image: clinicImage('photo-1590650153855-d9e808231d41', 1000, 760),
  imageAlt: 'Patient joining a video consultation with a Clinic & Healthcare doctor from home',
  benefits: [
    'Video consultations with top specialists',
    'Digital prescriptions and follow-ups',
    'Secure records shared with your family doctor',
  ],
} as const;

/* ──────────────────────── 8 · Testimonials ────────────────────────── */

export type ClinicTestimonial = {
  readonly id: string;
  readonly name: string;
  readonly context: string;
  readonly rating: number;
  readonly quote: string;
  readonly image: string;
};

export const CLINIC_TESTIMONIALS: readonly ClinicTestimonial[] = [
  {
    id: 'priya',
    name: 'Priya Sharma',
    context: 'Cardiology patient',
    rating: 5,
    quote:
      'Excellent care and very professional staff. I felt safe and cared for throughout my angioplasty and the follow-up calls were genuinely helpful.',
    image: clinicImage('photo-1494790108377-be9c29b29330', 160, 160),
  },
  {
    id: 'amit',
    name: 'Amit Verma',
    context: 'Orthopedics patient',
    rating: 5,
    quote:
      'The doctors are knowledgeable and take time to explain their opinions. My knee replacement was scheduled within a week and recovery was smooth.',
    image: clinicImage('photo-1507003211169-0a1dd7228f2d', 160, 160),
  },
  {
    id: 'neha',
    name: 'Neha Gupta',
    context: 'Maternity patient',
    rating: 5,
    quote:
      'Truly accurate and friendly service. Reports were shared the same evening and the maternity team stayed in touch until my delivery.',
    image: clinicImage('photo-1567532939604-b6b5b0db2604', 160, 160),
  },
  {
    id: 'rohan',
    name: 'Rohan Das',
    context: 'Telehealth patient',
    rating: 5,
    quote:
      'I consulted from another city on video, got my prescription in minutes and my lab reports were reviewed the next morning. Brilliantly organised.',
    image: clinicImage('photo-1500648767791-00dcc994a43e', 160, 160),
  },
];

/* ───────────────────────── 10 · Health blog ───────────────────────── */

export type ClinicPost = {
  readonly id: string;
  readonly category: string;
  readonly date: string;
  readonly publishedAt: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: string;
  readonly imageAlt: string;
};

export const CLINIC_POSTS: readonly ClinicPost[] = [
  {
    id: 'heart',
    category: 'Cardiology',
    date: 'May 28, 2026',
    publishedAt: '2026-05-28',
    title: '5 Simple Ways to Keep Your Heart Healthy',
    excerpt:
      'Small daily habits — a brisk 30-minute walk, less salt and better sleep — do more for your heart than any single test.',
    image: clinicImage('photo-1505751172876-fa1923c5c528', 800, 520),
    imageAlt: 'Stethoscope resting beside a heart-health chart',
  },
  {
    id: 'nutrition',
    category: 'Nutrition',
    date: 'May 21, 2026',
    publishedAt: '2026-05-21',
    title: 'The Role of Nutrition in a Healthy Life',
    excerpt:
      'Our clinical dietitians break down what a balanced Indian plate looks like across seasons and life stages.',
    image: clinicImage('photo-1512621776951-a57141f2eefd', 800, 520),
    imageAlt: 'Balanced bowl of fresh vegetables, pulses and greens',
  },
  {
    id: 'stress',
    category: 'Wellness',
    date: 'May 14, 2026',
    publishedAt: '2026-05-14',
    title: 'Managing Stress for a Better Life',
    excerpt:
      'Chronic stress shows up in blood pressure and sleep long before it shows up in mood. Here is how to spot it early.',
    image: clinicImage('photo-1506126613408-eca07ce68773', 800, 520),
    imageAlt: 'Person practising sunrise breathing exercises by the water',
  },
];

/* ──────────────────────── 11 · Appointment ────────────────────────── */

export const CLINIC_APPOINTMENT_IMAGE = {
  src: clinicImage('photo-1576091160399-112ba8d25d1d', 800, 900),
  alt: 'Clinic & Healthcare duty doctor confirming an appointment slot on a mobile phone',
};

export const CLINIC_DEPARTMENTS = CLINIC_SERVICES.map((service) => service.title);

/* ────────────────────────── 12 · Footer ───────────────────────────── */

export const CLINIC_FOOTER_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Services', href: '#services' },
  { label: 'AI Features', href: '#ai-solutions' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Book Appointment', href: '#appointment' },
  { label: 'Contact', href: '#contact' },
] as const;
