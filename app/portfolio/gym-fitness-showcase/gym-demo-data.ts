const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/** App promo reel — royalty-free gym footage for showcase demo */
export const APP_DEMO_REEL = {
  src: "https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4",
  poster: img("photo-1534438327276-14e5300c3a48", 1280, 720),
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

export type TrainerProfile = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
};

export const WORKOUT_FORMATS: WorkoutFormat[] = [
  {
    id: "hrx",
    name: "HRX",
    tagline: "Strength & conditioning",
    image: img("photo-1534438327276-14e5300c3a48", 520, 360),
    calories: "450–550 kcal",
    duration: "50 min",
  },
  {
    id: "burn",
    name: "BURN",
    tagline: "High intensity cardio",
    image: img("photo-1571019613454-1cb2f99b2d8b", 520, 360),
    calories: "500–650 kcal",
    duration: "45 min",
  },
  {
    id: "yoga",
    name: "YOGA",
    tagline: "Flexibility & mindfulness",
    image: img("photo-1544367567-0f2fcb009e0b", 520, 360),
    calories: "180–250 kcal",
    duration: "60 min",
  },
  {
    id: "dance",
    name: "DANCE",
    tagline: "Fun cardio workouts",
    image: img("photo-1518611012118-696072aa579a", 520, 360),
    calories: "400–500 kcal",
    duration: "50 min",
  },
  {
    id: "boxing",
    name: "BOXING",
    tagline: "Power & agility",
    image: img("photo-1541534741688-6078c6bfb5c5", 520, 360),
    calories: "550–700 kcal",
    duration: "50 min",
  },
  {
    id: "sc",
    name: "S&C",
    tagline: "Sports performance",
    image: img("photo-1571902943202-507ec2618e8f", 520, 360),
    calories: "420–520 kcal",
    duration: "55 min",
  },
];

export const MEMBERSHIP_PASSES: MembershipPass[] = [
  {
    id: "elite",
    name: "rallypass ELITE",
    price: "₹1,299",
    period: "/ month",
    highlight: "Unlimited gyms + all formats",
    perks: ["All centers in your city", "Unlimited group classes", "2 guest passes / month", "Pause up to 30 days"],
    featured: true,
  },
  {
    id: "pro",
    name: "rallypass PRO",
    price: "₹999",
    period: "/ month",
    highlight: "PRO gyms + 4 ELITE sessions",
    perks: ["Access to PRO partner gyms", "4 ELITE format sessions", "App workout plans", "Locker access"],
  },
  {
    id: "play",
    name: "rallypass PLAY",
    price: "₹799",
    period: "/ month",
    highlight: "Sports · badminton & swim",
    perks: ["Book courts & pools", "Coach-led drills", "Weekend leagues", "Gear rental discounts"],
  },
];

export const GYM_CENTERS: GymCenter[] = [
  {
    id: "connaught",
    name: "FitRally Connaught Place",
    area: "Central Delhi",
    city: "Delhi",
    distance: "1.8 km",
    image: img("photo-1534438327276-14e5300c3a48", 400, 280),
  },
  {
    id: "saket",
    name: "FitRally Saket",
    area: "Select Citywalk",
    city: "Delhi",
    distance: "4.2 km",
    image: img("photo-1571902943202-507ec2618e8f", 400, 280),
  },
  {
    id: "indiranagar",
    name: "FitRally Indiranagar",
    area: "100 Feet Road",
    city: "Bengaluru",
    distance: "2.1 km",
    image: img("photo-1534438327276-14e5300c3a48", 400, 280),
  },
  {
    id: "powai",
    name: "FitRally Powai",
    area: "Hiranandani",
    city: "Mumbai",
    distance: "4.8 km",
    image: img("photo-1571902943202-507ec2618e8f", 400, 280),
  },
  {
    id: "gachibowli",
    name: "FitRally Gachibowli",
    area: "Financial District",
    city: "Hyderabad",
    distance: "6.2 km",
    image: img("photo-1517838277536-f5f99be501cd", 400, 280),
  },
  {
    id: "saltlake",
    name: "FitRally Salt Lake",
    area: "Sector V",
    city: "Kolkata",
    distance: "3.4 km",
    image: img("photo-1540497077202-7c8a3999166f", 400, 280),
  },
];

export const TRAINERS: TrainerProfile[] = [
  {
    id: "t1",
    name: "Priya Nair",
    specialty: "HRX · Strength",
    experience: "8 yrs · ACE certified",
    image: img("photo-1571019613454-1cb2f99b2d8b", 320, 320),
  },
  {
    id: "t2",
    name: "Arjun Mehta",
    specialty: "BOXING · Conditioning",
    experience: "6 yrs · ex-national amateur",
    image: img("photo-1541534741688-6078c6bfb5c5", 320, 320),
  },
  {
    id: "t3",
    name: "Sneha Kapoor",
    specialty: "YOGA · Mobility",
    experience: "10 yrs · RYT-500",
    image: img("photo-1544367567-0f2fcb009e0b", 320, 320),
  },
];

export const TRANSFORM_STORIES = [
  { name: "Rahul K.", result: "Lost 8 kg in 12 weeks", program: "rallypass ELITE + HRX" },
  { name: "Meera S.", result: "Gained strength · −4% body fat", program: "S&C + nutrition" },
  { name: "Dev P.", result: "Completed first 10K", program: "BURN + PLAY running" },
] as const;
