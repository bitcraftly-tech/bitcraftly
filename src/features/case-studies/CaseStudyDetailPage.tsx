import dynamic from "next/dynamic";
import { JsonLdScript } from "@/components/patterns/json-ld";
import { PageShell } from "@/components/patterns/marketing-layout";
import {
  getRelatedCaseStudies,
  type CaseStudy,
} from "@/content/case-studies";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { buildCaseStudyJsonLd } from "./case-study-schema";
import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CaseStudyCta } from "./CaseStudyCta";
import { CaseStudyFeatures } from "./CaseStudyFeatures";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyOverview } from "./CaseStudyOverview";
import { CaseStudyProblem } from "./CaseStudyProblem";
import { CaseStudyRelated } from "./CaseStudyRelated";
import { CaseStudyResults } from "./CaseStudyResults";
import { CaseStudySolution } from "./CaseStudySolution";
import { CaseStudyTechStack } from "./CaseStudyTechStack";
import { CaseStudyTestimonial } from "./CaseStudyTestimonial";

const CaseStudyScreenshots = dynamic(
  () =>
    import("./CaseStudyScreenshots").then((mod) => mod.CaseStudyScreenshots),
  {
    loading: () => (
      <div
        className="border-b border-border/50 px-[var(--container-padding)] py-[48px]"
        aria-hidden
      >
        <div className="mx-auto h-[280px] max-w-[var(--container-xl)] animate-pulse rounded-[16px] bg-surface" />
      </div>
    ),
  },
);

interface CaseStudyDetailPageProps {
  study: CaseStudy;
}

export function CaseStudyDetailPage({ study }: CaseStudyDetailPageProps) {
  const breadcrumbs = buildWorkBreadcrumbs([{ label: study.title }]);
  const related = getRelatedCaseStudies(study);

  return (
    <PageShell className="case-study-page">
      <JsonLdScript data={buildCaseStudyJsonLd(study)} />
      <CaseStudyHero study={study} breadcrumbs={breadcrumbs} />
      <CaseStudyOverview study={study} />
      <CaseStudyProblem study={study} />
      <CaseStudySolution study={study} />
      <CaseStudyTechStack study={study} />
      <CaseStudyArchitecture study={study} />
      <CaseStudyFeatures study={study} />
      <CaseStudyScreenshots study={study} />
      <CaseStudyResults study={study} />
      <CaseStudyTestimonial study={study} />
      <CaseStudyCta />
      <CaseStudyRelated studies={related} />
    </PageShell>
  );
}
