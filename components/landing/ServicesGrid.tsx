import { CONTAINER } from "@/lib/constants";

const services = [
  {
    title: "Business Website Development",
    desc: "Clean brochure and lead-focused websites that build trust — clear services, hours, and WhatsApp contact.",
    icon: "🌐",
    accent: "border-indigo-500/30 bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Ecommerce Website Development",
    desc: "Online stores with straightforward shopping flows — products, payments guidance, and mobile-friendly checkout.",
    icon: "🛒",
    accent: "border-violet-500/30 bg-violet-500/10 text-violet-500",
  },
  {
    title: "Mobile App Development",
    desc: "Android & iOS apps designed around how your customers actually use their phones — stable releases and clear handoff.",
    icon: "📱",
    accent: "border-purple-500/30 bg-purple-500/10 text-purple-500",
  },
  {
    title: "Website Maintenance",
    desc: "Security updates, small content edits, and health checks so your site stays fast and reliable after launch.",
    icon: "🔧",
    accent: "border-sky-500/30 bg-sky-500/10 text-sky-500",
  },
  {
    title: "SEO & Digital Growth",
    desc: "Structured pages and local-friendly content so people nearby can find your business when they search.",
    icon: "📈",
    accent: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "AI Integrations",
    desc: "Optional smart helpers on your website or app — menus, FAQs, quick replies — kept practical and human-backed.",
    icon: "✨",
    accent: "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "WhatsApp Business Integration",
    desc: "Connect WhatsApp with your site and enquiries so customers can message you on the channel they already use.",
    icon: "💬",
    accent: "border-teal-500/30 bg-teal-500/10 text-teal-500",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Services</p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          Websites, apps &amp; digital services for local businesses
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
          We&apos;re a website &amp; app development company in Jamshedpur — focused on clear scope, solid delivery and support.
          From brochure sites and ecommerce to apps, maintenance and WhatsApp — plus optional smart features only where they
          genuinely help your visitors.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border-primary bg-bg-card p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(2,6,23,0.08)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:shadow-[0_12px_26px_rgba(2,6,23,0.35)]"
          >
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${item.accent}`}>
              <span aria-hidden>{item.icon}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
