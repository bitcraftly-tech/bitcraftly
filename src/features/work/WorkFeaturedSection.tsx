import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { WORK_LANDING_SECTIONS } from "./work.content";
import "./work.css";

const FEATURED_META = WORK_LANDING_SECTIONS.find(
  (item) => item.id === "featured-projects",
);

const OPTIMIZE_ITEMS = [
  {
    id: "01",
    title: "Thumb-first",
    label: "Mobile UX",
    description: "Layouts tested for small screens first.",
    icon: "smartphone" as const,
  },
  {
    id: "02",
    title: "WhatsApp-ready",
    label: "Lead paths",
    description: "Enquiry CTAs above scroll fatigue.",
    icon: "message" as const,
  },
  {
    id: "03",
    title: "Crawlable",
    label: "SEO structure",
    description: "Titles, hierarchy, local discovery basics.",
    icon: "search" as const,
  },
  {
    id: "04",
    title: "React / Next",
    label: "Stack",
    description: "Maintainable frontends, not locked templates.",
    icon: "code" as const,
  },
] as const;

/**
 * Portfolio catalog intro — aligned with bitcraftly.com/portfolio.
 */
export function WorkFeaturedSection() {
  return (
    <Section
      id="featured-projects"
      spacing="lg"
      background="surface"
      aria-labelledby="work-featured-heading"
      className="work-featured border-b border-border/40"
    >
      <header className="work-pf-intro">
        <p className="work-featured__eyebrow">Featured Work</p>
        <h2 id="work-featured-heading" className="work-featured__title">
          {FEATURED_META?.title ?? "Our Portfolio"}
        </h2>
        <p className="work-featured__description">
          {FEATURED_META?.description ??
            "A showcase of modern, fast, and AI-powered digital solutions built with React.js, Next.js & cutting-edge technologies."}
        </p>
      </header>

      <div className="work-pf-proof">
        <article className="work-pf-proof__experience">
          <span className="work-pf-proof__icon" aria-hidden>
            <Icon name="star" size="sm" className="h-[20px] w-[20px]" />
          </span>
          <div>
            <h3 className="work-pf-proof__title">20+ Years of Experience</h3>
            <p className="work-pf-proof__text">
              Delivering high-quality solutions that drive real business results.
            </p>
          </div>
        </article>

        <div className="work-pf-proof__optimize">
          <p className="work-pf-proof__optimize-label">What we optimize</p>
          <ul className="work-pf-proof__grid" aria-label="Delivery principles">
            {OPTIMIZE_ITEMS.map((item) => (
              <li key={item.id} className="work-pf-proof__item">
                <span className="work-pf-proof__item-icon" aria-hidden>
                  <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
                </span>
                <p className="work-pf-proof__item-kicker">{item.label}</p>
                <h3 className="work-pf-proof__item-title">{item.title}</h3>
                <p className="work-pf-proof__item-text">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
