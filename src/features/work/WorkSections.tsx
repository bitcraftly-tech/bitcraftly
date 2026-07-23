import { Section } from "@/components/ui/section";
import { WORK_LANDING_SECTIONS } from "./work.content";

function scaffoldCopy(sectionId: string): {
  title: string;
  description: string;
} {
  const meta = WORK_LANDING_SECTIONS.find((item) => item.id === sectionId);
  return {
    title: meta?.title ?? sectionId,
    description: meta?.description ?? "",
  };
}

function WorkSectionScaffold({
  id,
  headingId,
  background = "default",
}: {
  id: string;
  headingId: string;
  background?: "default" | "surface";
}) {
  const { title, description } = scaffoldCopy(id);

  return (
    <Section
      id={id === "portfolio-grid" ? "work-portfolio" : id}
      spacing="lg"
      background={background}
      aria-labelledby={headingId}
      className="work-section border-b border-border/40"
    >
      <div className="work-section__scaffold">
        <p className="work-section__eyebrow">Work</p>
        <h2 id={headingId} className="work-section__title">
          {title}
        </h2>
        <p className="work-section__description">{description}</p>
        <p className="work-section__placeholder">
          Foundation scaffold — UI ships in a later sprint.
        </p>
      </div>
    </Section>
  );
}

export function WorkCategoriesSection() {
  return (
    <WorkSectionScaffold
      id="portfolio-categories"
      headingId="work-categories-heading"
    />
  );
}

export function WorkPortfolioSection() {
  return (
    <WorkSectionScaffold
      id="portfolio-grid"
      headingId="work-portfolio-heading"
      background="surface"
    />
  );
}

export { WorkResultsSection } from "./WorkResultsSection";

export { WorkTechSection } from "./WorkTechSection";

export { WorkProcessSection } from "./WorkProcessSection";

export { WorkTestimonialsSection } from "./WorkTrustSection";

export { WorkFaqSection } from "./WorkFaqSection";

export { WorkRelatedServicesSection } from "./WorkRelatedServicesSection";
