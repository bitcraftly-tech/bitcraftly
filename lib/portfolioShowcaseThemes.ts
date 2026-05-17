export type ShowcaseThemeId =
  | "gym"
  | "restaurant"
  | "school"
  | "ecommerce"
  | "builder"
  | "society"
  | "chatbot"
  | "clinic"
  | "local"
  | "video";

export type ShowcaseNavLink = { label: string; href: string };

export type ShowcaseTheme = {
  id: ShowcaseThemeId;
  fictionalBrand: string;
  fictionalTagline: string;
  shell: string;
  mainBg: string;
  navBar: string;
  navBrand: string;
  navBrandSub: string;
  navLink: string;
  navCtaClass: string;
  navCtaLabel: string;
  navCtaHref: string;
  navLinks: ShowcaseNavLink[];
  footerBar: string;
  footerBorder: string;
  footerHeading: string;
  footerMuted: string;
  footerLink: string;
  footerSectionLabel: string;
  footerColumns: { title: string; links: ShowcaseNavLink[] }[];
};

function lightShowcaseTheme(config: {
  id: ShowcaseThemeId;
  brand: string;
  tagline: string;
  accent: "fuchsia" | "orange" | "blue" | "violet" | "zinc" | "emerald" | "indigo" | "cyan" | "amber" | "rose";
  navLinks: ShowcaseNavLink[];
  navCta: { label: string; href: string };
  footerColumns: { title: string; links: ShowcaseNavLink[] }[];
}): ShowcaseTheme {
  const a = config.accent;
  const accentMap = {
    fuchsia: {
      border: "border-fuchsia-200",
      brand: "text-fuchsia-900",
      sub: "text-fuchsia-600",
      link: "text-slate-600 hover:text-fuchsia-700",
      cta: "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:brightness-105",
      footerBorder: "border-fuchsia-100",
      footerBg: "bg-gradient-to-b from-fuchsia-50/80 to-white",
      footerLabel: "text-fuchsia-700/80",
      footerLink: "text-fuchsia-800 hover:text-fuchsia-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(192,38,211,0.25)]",
    },
    orange: {
      border: "border-orange-200",
      brand: "text-orange-950",
      sub: "text-orange-600",
      link: "text-slate-600 hover:text-orange-700",
      cta: "bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:brightness-105",
      footerBorder: "border-orange-100",
      footerBg: "bg-gradient-to-b from-orange-50/90 to-white",
      footerLabel: "text-orange-700/80",
      footerLink: "text-orange-800 hover:text-orange-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(234,88,12,0.22)]",
    },
    blue: {
      border: "border-blue-200",
      brand: "text-blue-950",
      sub: "text-blue-600",
      link: "text-slate-600 hover:text-blue-700",
      cta: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-105",
      footerBorder: "border-blue-100",
      footerBg: "bg-gradient-to-b from-blue-50/90 to-white",
      footerLabel: "text-blue-700/80",
      footerLink: "text-blue-800 hover:text-blue-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(37,99,235,0.2)]",
    },
    violet: {
      border: "border-violet-200",
      brand: "text-violet-950",
      sub: "text-violet-600",
      link: "text-slate-600 hover:text-violet-700",
      cta: "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:brightness-105",
      footerBorder: "border-violet-100",
      footerBg: "bg-gradient-to-b from-violet-50/90 to-white",
      footerLabel: "text-violet-700/80",
      footerLink: "text-violet-800 hover:text-violet-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(124,58,237,0.22)]",
    },
    zinc: {
      border: "border-zinc-200",
      brand: "text-zinc-900",
      sub: "text-zinc-600",
      link: "text-slate-600 hover:text-zinc-900",
      cta: "bg-zinc-900 text-white hover:bg-zinc-800",
      footerBorder: "border-zinc-200",
      footerBg: "bg-gradient-to-b from-zinc-50 to-white",
      footerLabel: "text-zinc-600",
      footerLink: "text-zinc-800 hover:text-zinc-950",
      ring: "shadow-sm",
    },
    emerald: {
      border: "border-emerald-200",
      brand: "text-emerald-950",
      sub: "text-emerald-600",
      link: "text-slate-600 hover:text-emerald-700",
      cta: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-105",
      footerBorder: "border-emerald-100",
      footerBg: "bg-gradient-to-b from-emerald-50/90 to-white",
      footerLabel: "text-emerald-700/80",
      footerLink: "text-emerald-800 hover:text-emerald-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(16,185,129,0.2)]",
    },
    indigo: {
      border: "border-indigo-200",
      brand: "text-indigo-950",
      sub: "text-indigo-600",
      link: "text-slate-600 hover:text-indigo-700",
      cta: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:brightness-105",
      footerBorder: "border-indigo-100",
      footerBg: "bg-gradient-to-b from-indigo-50/90 to-white",
      footerLabel: "text-indigo-700/80",
      footerLink: "text-indigo-800 hover:text-indigo-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(79,70,229,0.22)]",
    },
    cyan: {
      border: "border-cyan-200",
      brand: "text-cyan-950",
      sub: "text-cyan-600",
      link: "text-slate-600 hover:text-cyan-700",
      cta: "bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:brightness-105",
      footerBorder: "border-cyan-100",
      footerBg: "bg-gradient-to-b from-cyan-50/90 to-white",
      footerLabel: "text-cyan-700/80",
      footerLink: "text-cyan-800 hover:text-cyan-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(8,145,178,0.2)]",
    },
    amber: {
      border: "border-amber-200",
      brand: "text-amber-950",
      sub: "text-amber-600",
      link: "text-slate-600 hover:text-amber-700",
      cta: "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:brightness-105",
      footerBorder: "border-amber-100",
      footerBg: "bg-gradient-to-b from-amber-50/90 to-white",
      footerLabel: "text-amber-700/80",
      footerLink: "text-amber-900 hover:text-amber-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(217,119,6,0.22)]",
    },
    rose: {
      border: "border-rose-200",
      brand: "text-rose-950",
      sub: "text-rose-600",
      link: "text-slate-600 hover:text-rose-700",
      cta: "bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white hover:brightness-105",
      footerBorder: "border-rose-100",
      footerBg: "bg-gradient-to-b from-rose-50/90 to-white",
      footerLabel: "text-rose-700/80",
      footerLink: "text-rose-800 hover:text-rose-950",
      ring: "shadow-[0_8px_30px_-12px_rgba(244,63,94,0.22)]",
    },
  }[a];

  return {
    id: config.id,
    fictionalBrand: config.brand,
    fictionalTagline: config.tagline,
    shell: "portfolio-showcase-light flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100",
    mainBg: "flex-1 bg-slate-50 dark:bg-slate-950",
    navBar: `sticky top-0 z-50 border-b ${accentMap.border} bg-white/95 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 ${accentMap.ring}`,
    navBrand: `font-[var(--font-playfair)] text-lg font-semibold tracking-tight sm:text-xl ${accentMap.brand}`,
    navBrandSub: `hidden text-[10px] font-semibold uppercase tracking-[0.18em] sm:block ${accentMap.sub}`,
    navLink: `text-sm font-medium ${accentMap.link}`,
    navCtaClass: `inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-xs font-semibold sm:text-sm ${accentMap.cta}`,
    navCtaLabel: config.navCta.label,
    navCtaHref: config.navCta.href,
    navLinks: config.navLinks,
    footerBar: `border-t ${accentMap.footerBorder} ${accentMap.footerBg} dark:border-slate-700 dark:bg-slate-900`,
    footerBorder: accentMap.footerBorder,
    footerHeading: `font-[var(--font-playfair)] text-lg font-semibold ${accentMap.brand}`,
    footerMuted: "text-sm leading-relaxed text-slate-600",
    footerLink: `text-sm font-medium ${accentMap.footerLink}`,
    footerSectionLabel: `text-[11px] font-semibold uppercase tracking-[0.14em] ${accentMap.footerLabel}`,
    footerColumns: config.footerColumns,
  };
}

export const PORTFOLIO_SHOWCASE_THEMES: Record<ShowcaseThemeId, ShowcaseTheme> = {
  gym: lightShowcaseTheme({
    id: "gym",
    brand: "FitRally",
    tagline: "Group fitness · gyms · sports — membership & class booking demo.",
    accent: "fuchsia",
    navLinks: [
      { label: "Programs", href: "#programs" },
      { label: "Membership", href: "#programs" },
      { label: "BMI tool", href: "#bmi" },
    ],
    navCta: { label: "Join now", href: "/contact?intent=membership&source=gym-fitness-showcase" },
    footerColumns: [
      {
        title: "Club",
        links: [
          { label: "Programs", href: "#programs" },
          { label: "BMI calculator", href: "#bmi" },
        ],
      },
      {
        title: "Hours",
        links: [
          { label: "Floor · 5 AM – 11 PM", href: "#programs" },
          { label: "24×7 elite lane", href: "#programs" },
        ],
      },
    ],
  }),
  restaurant: lightShowcaseTheme({
    id: "restaurant",
    brand: "Copper & Ember Dining",
    tagline: "Chef-led dining · reservations · delivery-ready menu UX.",
    accent: "orange",
    navLinks: [
      { label: "Menu", href: "#menu" },
      { label: "Reserve", href: "#reservation" },
    ],
    navCta: { label: "Book table", href: "#reservation" },
    footerColumns: [
      {
        title: "Dine",
        links: [
          { label: "Full menu", href: "#menu" },
          { label: "Reservations", href: "#reservation" },
        ],
      },
      {
        title: "Service",
        links: [
          { label: "Delivery strip", href: "#menu" },
          { label: "WhatsApp handoff", href: "/contact?intent=restaurant&source=restaurant-showcase" },
        ],
      },
    ],
  }),
  school: lightShowcaseTheme({
    id: "school",
    brand: "Heritage Crown School",
    tagline: "CBSE portal · admissions · campus life & parent resources.",
    accent: "blue",
    navLinks: [
      { label: "Campus", href: "#campus" },
      { label: "Admissions", href: "#admissions" },
    ],
    navCta: { label: "Apply now", href: "#admissions" },
    footerColumns: [
      {
        title: "School",
        links: [
          { label: "Campus life", href: "#campus" },
          { label: "Admissions", href: "#admissions" },
        ],
      },
      {
        title: "Parents",
        links: [
          { label: "Notices", href: "#campus" },
          { label: "Fee enquiry", href: "#admissions" },
        ],
      },
    ],
  }),
  ecommerce: lightShowcaseTheme({
    id: "ecommerce",
    brand: "ShopKart",
    tagline: "Everything store — search-first marketplace UI (fictional).",
    accent: "amber",
    navLinks: [
      { label: "Today's Deals", href: "#deals" },
      { label: "All", href: "#catalog" },
    ],
    navCta: { label: "Cart", href: "#cart" },
    footerColumns: [
      {
        title: "Online shopping",
        links: [
          { label: "Women", href: "#catalog-women" },
          { label: "Men", href: "#catalog-men" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Track orders", href: "#catalog" },
          { label: "Returns", href: "#catalog" },
        ],
      },
    ],
  }),
  builder: lightShowcaseTheme({
    id: "builder",
    brand: "Stonecrest Developers",
    tagline: "Project showcases · floor plans · enquiry-first real estate UX.",
    accent: "zinc",
    navLinks: [
      { label: "Projects", href: "#featured-projects" },
      { label: "Gallery", href: "#gallery" },
      { label: "Enquire", href: "#contact-enquiry" },
    ],
    navCta: { label: "Site visit", href: "#booking" },
    footerColumns: [
      {
        title: "Inventory",
        links: [
          { label: "Featured", href: "#featured-projects" },
          { label: "Floor plans", href: "#floor-plans" },
        ],
      },
      {
        title: "Trust",
        links: [
          { label: "Testimonials", href: "#testimonials" },
          { label: "About builder", href: "#about" },
        ],
      },
    ],
  }),
  society: lightShowcaseTheme({
    id: "society",
    brand: "Riverstone Resident Portal",
    tagline: "Notices · bills · visitors · amenity bookings for housing societies.",
    accent: "emerald",
    navLinks: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Notices", href: "#notices" },
      { label: "Amenities", href: "#amenities" },
    ],
    navCta: { label: "Resident login", href: "#dashboard" },
    footerColumns: [
      {
        title: "Portal",
        links: [
          { label: "Pay bills", href: "#bills" },
          { label: "Visitors", href: "#visitors" },
        ],
      },
      {
        title: "Committee",
        links: [
          { label: "Complaints", href: "#complaints" },
          { label: "Emergency", href: "#emergency" },
        ],
      },
    ],
  }),
  chatbot: lightShowcaseTheme({
    id: "chatbot",
    brand: "Tasting Desk AI",
    tagline: "Menu answers · hours · WhatsApp handoff for restaurants.",
    accent: "indigo",
    navLinks: [
      { label: "Live demo", href: "#demo" },
      { label: "Features", href: "#features" },
    ],
    navCta: { label: "Try chat", href: "#demo" },
    footerColumns: [
      {
        title: "Assistant",
        links: [
          { label: "Menu FAQs", href: "#demo" },
          { label: "WhatsApp route", href: "#features" },
        ],
      },
      {
        title: "Ops",
        links: [
          { label: "Hours sync", href: "#features" },
          { label: "Staff handoff", href: "#features" },
        ],
      },
    ],
  }),
  clinic: lightShowcaseTheme({
    id: "clinic",
    brand: "Northstar Polyclinic",
    tagline: "Doctors · services · calm appointment flows for healthcare brands.",
    accent: "cyan",
    navLinks: [
      { label: "Services", href: "#services" },
      { label: "Book visit", href: "#appointment" },
    ],
    navCta: { label: "Appointment", href: "#appointment" },
    footerColumns: [
      {
        title: "Care",
        links: [
          { label: "Departments", href: "#services" },
          { label: "Book slot", href: "#appointment" },
        ],
      },
      {
        title: "Patient",
        links: [
          { label: "OPD timings", href: "#services" },
          { label: "Emergency", href: "#services" },
        ],
      },
    ],
  }),
  local: lightShowcaseTheme({
    id: "local",
    brand: "Steel City Home Pros",
    tagline: "Hyperlocal services · verified pros · WhatsApp-first lead funnels.",
    accent: "amber",
    navLinks: [
      { label: "Services", href: "#services" },
      { label: "Book", href: "#booking" },
    ],
    navCta: { label: "Book now", href: "#booking" },
    footerColumns: [
      {
        title: "Services",
        links: [
          { label: "Plumbing", href: "#services" },
          { label: "Electrician", href: "#services" },
        ],
      },
      {
        title: "Coverage",
        links: [
          { label: "Jamshedpur zones", href: "#services" },
          { label: "24×7 desk", href: "#booking" },
        ],
      },
    ],
  }),
  video: lightShowcaseTheme({
    id: "video",
    brand: "Lumen Stream Originals",
    tagline: "OTT rails · hero banners · watchlists — streaming UI portfolio demo.",
    accent: "rose",
    navLinks: [
      { label: "Browse", href: "#browse" },
      { label: "Plans", href: "#plans" },
    ],
    navCta: { label: "Start trial", href: "#plans" },
    footerColumns: [
      {
        title: "Stream",
        links: [
          { label: "Trending", href: "#browse" },
          { label: "Originals", href: "#browse" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Plans", href: "#plans" },
          { label: "Devices", href: "#plans" },
        ],
      },
    ],
  }),
};

export function getPortfolioShowcaseTheme(id: ShowcaseThemeId): ShowcaseTheme {
  return PORTFOLIO_SHOWCASE_THEMES[id];
}
