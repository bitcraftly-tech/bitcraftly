import { Icon, type IconName } from "@/components/ui/icon";

const PANEL_ITEMS: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: "violet" | "sky" | "emerald" | "amber";
}[] = [
  {
    id: "public",
    title: "Public summaries",
    description: "Approved standards available to visitors",
    icon: "globe",
    tone: "violet",
  },
  {
    id: "governed",
    title: "Governed areas",
    description: "Business, delivery, quality, security, privacy, AI",
    icon: "layout-grid",
    tone: "sky",
  },
  {
    id: "secure",
    title: "Controlled access",
    description: "Full library stays behind authenticated dashboard",
    icon: "shield",
    tone: "emerald",
  },
  {
    id: "founder",
    title: "Founder-led",
    description: "Clear ownership and accountability",
    icon: "star",
    tone: "amber",
  },
] as const;

/**
 * Trust hero visual — Services-style glass panel.
 */
export function TrustHeroVisual() {
  return (
    <div className="trust-hero-visual" aria-hidden="true">
      <div className="trust-hero-visual__glow" />
      <div className="trust-hero-visual__panel">
        <div className="trust-hero-visual__panel-head">
          <span className="trust-hero-visual__badge">
            <Icon name="shield" size="sm" aria-hidden />
            Trust Center
          </span>
          <p className="trust-hero-visual__panel-title">
            Transparency by design
          </p>
        </div>
        <ul className="trust-hero-visual__list">
          {PANEL_ITEMS.map((item) => (
            <li key={item.id} className="trust-hero-visual__item">
              <span
                className={`trust-hero-visual__icon trust-hero-visual__icon--${item.tone}`}
              >
                <Icon name={item.icon} size="sm" />
              </span>
              <span className="trust-hero-visual__copy">
                <span className="trust-hero-visual__item-title">{item.title}</span>
                <span className="trust-hero-visual__item-desc">
                  {item.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
