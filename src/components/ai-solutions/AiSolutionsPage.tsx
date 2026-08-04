import { AiSolutionsCategories } from './AiSolutionsCategories';
import { AiSolutionsFaq } from './AiSolutionsFaq';
import { AiSolutionsFinalCta } from './AiSolutionsFinalCta';
import { AiSolutionsHero } from './AiSolutionsHero';
import { AiSolutionsIndustries } from './AiSolutionsIndustries';
import { AiSolutionsProcess } from './AiSolutionsProcess';
import { AiSolutionsTechStack } from './AiSolutionsTechStack';
import { AiSolutionsWhy } from './AiSolutionsWhy';
import './ai-solutions-page.css';

export interface AiSolutionsPageProps {
  readonly className?: string;
}

export function AiSolutionsPage({ className }: AiSolutionsPageProps) {
  return (
    <div className={['ai-solutions-page', className].filter(Boolean).join(' ')}>
      <AiSolutionsHero />
      <AiSolutionsCategories />
      <AiSolutionsIndustries />
      <AiSolutionsProcess />
      <AiSolutionsTechStack />
      <AiSolutionsWhy />
      <AiSolutionsFaq />
      <AiSolutionsFinalCta />
    </div>
  );
}
