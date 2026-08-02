import { Container } from '@/components/ui/container';
import { HomepageReveal } from '../shared/HomepageReveal';
import { COST_CALCULATOR_CONTENT } from './cost-calculator.content';
import { CostCalculatorExperienceLazy } from './CostCalculatorExperienceLazy';
import './cost-calculator.css';

function CostCalculatorJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bitcraftly Project Cost Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: COST_CALCULATOR_CONTENT.calculator.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '8999',
      description: COST_CALCULATOR_CONTENT.intro.pricingBadge,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Server-rendered cost calculator section shell.
 */
export function CostCalculatorSection() {
  const content = COST_CALCULATOR_CONTENT;

  return (
    <section
      id={content.sectionId}
      role="region"
      aria-label={content.intro.heading}
      className="bg-background text-foreground homepage-section"
    >
      <CostCalculatorJsonLd />
      <Container size="xl">
        <HomepageReveal name="cost-calculator">
          <CostCalculatorExperienceLazy />
        </HomepageReveal>
      </Container>
    </section>
  );
}
