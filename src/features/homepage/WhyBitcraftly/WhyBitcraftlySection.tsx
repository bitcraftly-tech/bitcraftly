import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import { WhyBitcraftlyCardView } from "./WhyBitcraftlyCard";
import {
  WHY_CARDS,
  WHY_DESCRIPTION_LINE_1,
  WHY_DESCRIPTION_LINE_2,
  WHY_HEADING,
  WHY_HEADING_ID,
  WHY_LABEL,
  WHY_SECTION_ID,
} from "./why-bitcraftly.constants";
import "./why-bitcraftly.css";

export function WhyBitcraftlySection() {
  return (
    <section
      id={WHY_SECTION_ID}
      aria-labelledby={WHY_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl" className="max-w-[1280px] px-[var(--space-4)]">
        <HomepageReveal name="why" className="mx-auto w-full text-center">
          <p
            className={cn(
              "why-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {WHY_LABEL}
          </p>

          <h2
            id={WHY_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[22px] leading-[1.25] tracking-[-0.02em]",
              "sm:text-[28px] md:text-[30px] lg:text-[32px]",
              "md:whitespace-nowrap",
            )}
          >
            {WHY_HEADING}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[880px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            <span className="sm:block">{WHY_DESCRIPTION_LINE_1}</span>{" "}
            <span className="sm:block">{WHY_DESCRIPTION_LINE_2}</span>
          </p>
        </HomepageReveal>

        <ul
          className={cn(
            "m-0 mt-[var(--space-6)] grid list-none gap-[24px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {WHY_CARDS.map((card, index) => (
            <li key={card.id} className="min-w-0">
              <HomepageReveal name="why" delayMs={index * 70} className="h-full">
                <WhyBitcraftlyCardView card={card} />
              </HomepageReveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
