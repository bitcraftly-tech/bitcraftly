import { CONTAINER } from "@/lib/constants";

type ProofStat = {
  value: string;
};

type Testimonial = {
  business: string;
  city: string;
  quote: string;
  rating: string;
};

const stats: ProofStat[] = [
  { value: "142 Leads Generated" },
  { value: "24 Active Clients" },
  { value: "48hr Average Setup" },
];

const testimonials: Testimonial[] = [
  {
    business: "Spice Route Cafe",
    city: "Pune",
    quote: "Pehle month mein hi WhatsApp se daily inquiries double ho gayi.",
    rating: "★★★★★",
  },
  {
    business: "Aarogya Dental Care",
    city: "Indore",
    quote: "Setup simple tha, dashboard se team ka follow-up discipline improve hua.",
    rating: "★★★★★",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-bg-secondary py-12 dark:bg-dark-bg-secondary">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="rounded-xl border border-border-primary bg-bg-card px-5 py-4 text-center dark:border-dark-border-primary dark:bg-dark-bg-card">
              <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.business} className="rounded-xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
              <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                {item.business} · <span className="font-normal text-text-tertiary dark:text-dark-text-tertiary">{item.city}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">{item.quote}</p>
              <p className="mt-3 text-sm text-[#1A6B3C]">{item.rating}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
