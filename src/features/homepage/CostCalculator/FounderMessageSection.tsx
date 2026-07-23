import { Container } from "@/components/ui/container";
import { HomepageReveal } from "../shared/HomepageReveal";
import { COST_CALCULATOR_CONTENT } from "./cost-calculator.content";
import { FounderMessageExperienceLazy } from "./FounderMessageExperienceLazy";
import "./cost-calculator.css";

/**
 * Standalone founder audio section — sits above the cost calculator.
 */
export function FounderMessageSection() {
  const content = COST_CALCULATOR_CONTENT.founder;

  return (
    <section
      id={content.sectionId}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal name="founder-message">
          <FounderMessageExperienceLazy />
        </HomepageReveal>
      </Container>
    </section>
  );
}
