export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  photoSrc?: string;
}

export interface TestimonialsCta {
  label: string;
  href: string;
}
