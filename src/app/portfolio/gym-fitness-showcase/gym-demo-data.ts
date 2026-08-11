const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/** FitRally showcase brand config (demo contact desk). */
export const GYM_BRAND = {
  name: 'FitRally',
  /** E.164 without + — demo WhatsApp desk */
  whatsapp: '919667710954',
} as const;

/** App promo reel — royalty-free gym footage for showcase demo */
export const APP_DEMO_REEL = {
  src: 'https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4',
  poster: img('photo-1534438327276-14e5300c3a48', 1280, 720),
} as const;

export type WorkoutFormat = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  calories: string;
  duration: string;
};

export type MembershipPass = {
  id: string;
  name: string;
  price: string;
  period: string;
  highlight: string;
  perks: string[];
  featured?: boolean;
};

export type GymCenter = {
  id: string;
  name: string;
  area: string;
  city: string;
  distance: string;
  image: string;
};

export const GYM_CITIES = ['Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Kolkata'] as const;

export type GymCity = (typeof GYM_CITIES)[number];

export type TrainerProfile = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
};

export const WORKOUT_FORMATS: WorkoutFormat[] = [
  {
    id: 'hrx',
    name: 'HRX',
    tagline: 'Strength & conditioning',
    image: img('photo-1534438327276-14e5300c3a48', 520, 360),
    calories: '450–550 kcal',
    duration: '50 min',
  },
  {
    id: 'burn',
    name: 'BURN',
    tagline: 'High intensity cardio',
    image: img('photo-1571019613454-1cb2f99b2d8b', 520, 360),
    calories: '500–650 kcal',
    duration: '45 min',
  },
  {
    id: 'yoga',
    name: 'YOGA',
    tagline: 'Flexibility & mindfulness',
    image: img('photo-1544367567-0f2fcb009e0b', 520, 360),
    calories: '180–250 kcal',
    duration: '60 min',
  },
  {
    id: 'dance',
    name: 'DANCE',
    tagline: 'Fun cardio workouts',
    image: img('photo-1518611012118-696072aa579a', 520, 360),
    calories: '400–500 kcal',
    duration: '50 min',
  },
  {
    id: 'boxing',
    name: 'BOXING',
    tagline: 'Power & agility',
    image: img('photo-1541534741688-6078c6bfb5c5', 520, 360),
    calories: '550–700 kcal',
    duration: '50 min',
  },
  {
    id: 'sc',
    name: 'S&C',
    tagline: 'Sports performance',
    image: img('photo-1571902943202-507ec2618e8f', 520, 360),
    calories: '420–520 kcal',
    duration: '55 min',
  },
];

export const MEMBERSHIP_PASSES: MembershipPass[] = [
  {
    id: 'elite',
    name: 'rallypass ELITE',
    price: '₹1,299',
    period: '/ month',
    highlight: 'Unlimited gyms + all formats',
    perks: [
      'All centers in your city',
      'Unlimited group classes',
      '2 guest passes / month',
      'Pause up to 30 days',
    ],
    featured: true,
  },
  {
    id: 'pro',
    name: 'rallypass PRO',
    price: '₹999',
    period: '/ month',
    highlight: 'PRO gyms + 4 ELITE sessions',
    perks: [
      'Access to PRO partner gyms',
      '4 ELITE format sessions',
      'App workout plans',
      'Locker access',
    ],
  },
  {
    id: 'play',
    name: 'rallypass PLAY',
    price: '₹799',
    period: '/ month',
    highlight: 'Sports · badminton & swim',
    perks: ['Book courts & pools', 'Coach-led drills', 'Weekend leagues', 'Gear rental discounts'],
  },
];

export const GYM_CENTERS: GymCenter[] = [
  {
    id: 'connaught',
    name: 'FitRally Connaught Place',
    area: 'Central Delhi',
    city: 'Delhi',
    distance: '1.8 km',
    image: img('photo-1534438327276-14e5300c3a48', 960, 720),
  },
  {
    id: 'saket',
    name: 'FitRally Saket',
    area: 'Select Citywalk',
    city: 'Delhi',
    distance: '4.2 km',
    image: img('photo-1571902943202-507ec2618e8f', 400, 280),
  },
  {
    id: 'indiranagar',
    name: 'FitRally Indiranagar',
    area: '100 Feet Road',
    city: 'Bengaluru',
    distance: '2.1 km',
    image: img('photo-1517838277536-f5f99be501cd', 960, 720),
  },
  {
    id: 'powai',
    name: 'FitRally Powai',
    area: 'Hiranandani',
    city: 'Mumbai',
    distance: '4.8 km',
    image: img('photo-1540497077202-7c8a3999166f', 960, 720),
  },
  {
    id: 'gachibowli',
    name: 'FitRally Gachibowli',
    area: 'Financial District',
    city: 'Hyderabad',
    distance: '6.2 km',
    image: img('photo-1518611012118-696072aa579a', 960, 720),
  },
  {
    id: 'saltlake',
    name: 'FitRally Salt Lake',
    area: 'Sector V',
    city: 'Kolkata',
    distance: '3.4 km',
    image: img('photo-1571019613454-1cb2f99b2d8b', 960, 720),
  },
];

export function getPrimaryCenterForCity(city: string): GymCenter {
  const match = GYM_CENTERS.find((c) => c.city === city);
  return match ?? GYM_CENTERS[0];
}

/** Hero background slides (3–4) per training city */
export const GYM_CITY_HERO_SLIDES: Record<GymCity, readonly string[]> = {
  Delhi: [
    img('photo-1534438327276-14e5300c3a48', 1600, 1000),
    img('photo-1571902943202-507ec2618e8f', 1600, 1000),
    img('photo-1517836357463-d25dfeac3438', 1600, 1000),
    img('photo-1541534741688-6078c6bfb5c5', 1600, 1000),
  ],
  Bengaluru: [
    img('photo-1517838277536-f5f99be501cd', 1600, 1000),
    img('photo-1571019613454-1cb2f99b2d8b', 1600, 1000),
    img('photo-1518611012118-696072aa579a', 1600, 1000),
    img('photo-1583454110551-21d2ab4ba1e1', 1600, 1000),
  ],
  Mumbai: [
    img('photo-1540497077202-7c8a3999166f', 1600, 1000),
    img('photo-1534438327276-14e5300c3a48', 1600, 1000),
    img('photo-1550345332-09e3ac987658', 1600, 1000),
    img('photo-1434682881908-b43d0467b798', 1600, 1000),
  ],
  Hyderabad: [
    img('photo-1518611012118-696072aa579a', 1600, 1000),
    img('photo-1517836357463-d25dfeac3438', 1600, 1000),
    img('photo-1571902943202-507ec2618e8f', 1600, 1000),
    img('photo-1581009146145-2160a1e99577', 1600, 1000),
  ],
  Kolkata: [
    img('photo-1571019613454-1cb2f99b2d8b', 1600, 1000),
    img('photo-1517838277536-f5f99be501cd', 1600, 1000),
    img('photo-1544367567-0f2fcb009e0b', 1600, 1000),
    img('photo-1541534741688-6078c6bfb5c5', 1600, 1000),
  ],
};

export function getHeroSlidesForCity(city: string): readonly string[] {
  if ((GYM_CITIES as readonly string[]).includes(city)) {
    return GYM_CITY_HERO_SLIDES[city as GymCity];
  }
  return GYM_CITY_HERO_SLIDES.Delhi;
}

export const TRAINERS: TrainerProfile[] = [
  {
    id: 't1',
    name: 'Priya Nair',
    specialty: 'HRX · Strength',
    experience: '8 yrs · ACE certified',
    image: img('photo-1594381898411-846e7d193883', 480, 600),
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    specialty: 'BOXING · Conditioning',
    experience: '6 yrs · ex-national amateur',
    image: img('photo-1571019614242-c5c5dee9f50b', 480, 600),
  },
  {
    id: 't3',
    name: 'Sneha Kapoor',
    specialty: 'YOGA · Mobility',
    experience: '10 yrs · RYT-500',
    image: img('photo-1599901860904-17e6ed7083a0', 480, 600),
  },
];

export const TRANSFORM_STORIES = [
  { name: 'Rahul K.', result: 'Lost 8 kg in 12 weeks', program: 'rallypass ELITE + HRX' },
  { name: 'Meera S.', result: 'Gained strength · −4% body fat', program: 'S&C + nutrition' },
  { name: 'Dev P.', result: 'Completed first 10K', program: 'BURN + PLAY running' },
] as const;

export type HealthTip = {
  id: string;
  title: string;
  body: string;
  tag: string;
};

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'warm-up',
    title: 'Warm up before every lift or class',
    body: '5–8 minutes of light cardio plus mobility before HRX, S&C, or Boxing. Cold starts raise gym injury risk — treat warm-up as set zero.',
    tag: 'Training',
  },
  {
    id: 'progressive',
    title: 'Add load only when form is solid',
    body: 'Progressive overload works when reps stay clean. If your squat or press form breaks, drop weight — ego lifting stalls gains and risks joints.',
    tag: 'Strength',
  },
  {
    id: 'rest-sets',
    title: 'Rest between heavy sets',
    body: '2–3 minutes on compound lifts keeps power for the next set. Rushing rest on S&C days cuts performance more than most members expect.',
    tag: 'Gym floor',
  },
  {
    id: 'recovery',
    title: 'Rest days build muscle too',
    body: 'Schedule at least one recovery day between hard gym weeks. Sleep, light mobility, and a protein-rich meal after sessions support repair — educational only, not medical advice.',
    tag: 'Recovery',
  },
];

export type GymFaq = {
  id: string;
  question: string;
  answer: string;
};

export const GYM_FAQS: GymFaq[] = [
  {
    id: 'pause',
    question: 'Can I pause my rallypass?',
    answer:
      'ELITE includes up to 30 days pause per year on production builds. This demo illustrates the flow — no real billing is charged.',
  },
  {
    id: 'centers',
    question: 'Do I need one home gym?',
    answer:
      'With ELITE you can train across FitRally centers in your city. PRO focuses on partner gyms plus limited ELITE sessions. Change city in the header to preview locations.',
  },
  {
    id: 'trial',
    question: 'How does the free trial work?',
    answer:
      'Tap Get free trial in the header to open the demo form. In production this would start a 7-day rallypass trial with OTP verification.',
  },
  {
    id: 'classes',
    question: 'How do I book a group class?',
    answer:
      'Open Pick your workout, choose a format (HRX, Yoga, Boxing…), then Book class. Spots and schedules are illustrative in this showcase.',
  },
  {
    id: 'bmi',
    question: 'Is the BMI tool medical advice?',
    answer:
      'No. The BMI calculator is a demo wellness widget only. For health concerns, consult a qualified physician — FitRally coaching does not replace clinical care.',
  },
  {
    id: 'guest',
    question: 'Are guest passes included?',
    answer:
      'ELITE includes 2 guest passes per month in the demo plan. PLAY and PRO focus on sports or partner access — check each card’s perk list.',
  },
];
