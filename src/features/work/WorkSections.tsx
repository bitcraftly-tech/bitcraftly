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

export { WorkPageCta } from "./WorkPageCta";

/** Hub foundation shell — content UI later. */
export function WorkHubPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Section
      spacing="lg"
      aria-labelledby="work-hub-heading"
      className="work-section"
    >
      <div className="work-section__scaffold">
        <p className="work-section__eyebrow">Work hub</p>
        <h1 id="work-hub-heading" className="work-section__title">
          {title}
        </h1>
        <p className="work-section__description">{description}</p>
        <p className="work-section__placeholder">
          Hub foundation scaffold — UI ships in a later sprint.
        </p>
      </div>
    </Section>
  );
}

/** Project detail foundation shell — UI later. */
export function WorkProjectDetailPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Section
      spacing="lg"
      aria-labelledby="work-project-detail-heading"
      className="work-section"
    >
      <div className="work-section__scaffold">
        <p className="work-section__eyebrow">Project</p>
        <h1 id="work-project-detail-heading" className="work-section__title">
          {title}
        </h1>
        <p className="work-section__description">{description}</p>
        <p className="work-section__placeholder">
          Project detail foundation scaffold — UI ships in a later sprint.
        </p>
      </div>
    </Section>
  );
}
