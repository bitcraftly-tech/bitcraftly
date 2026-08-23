/**
 * Case study domain types — content contract for /work/[slug].
 */

export interface CaseStudyMetric {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface CaseStudyScreenshot {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

export interface CaseStudyTestimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
}

export interface CaseStudyArchitectureLayer {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly description: string;
  readonly coverImage: string;
  readonly coverImageAlt: string;
  readonly client: {
    readonly name: string;
    readonly industry: string;
    readonly size: string;
    readonly location: string;
    readonly website?: string;
  };
  readonly engagement: {
    readonly role: string;
    readonly duration: string;
    readonly year: number;
  };
  readonly problem: string;
  readonly challenges: readonly string[];
  readonly solution: string;
  readonly approach: readonly string[];
  readonly techStack: readonly string[];
  readonly architecture: readonly CaseStudyArchitectureLayer[];
  readonly features: readonly string[];
  readonly screenshots: readonly CaseStudyScreenshot[];
  /** Outcome copy. Shown on the page when present. Index/schema only if `resultsApproved`. */
  readonly results?: {
    readonly summary: string;
    readonly metrics: readonly CaseStudyMetric[];
  };
  /**
   * Explicit sourcing/approval for SEO of results metrics and outcome summary.
   * Presence of `results` data is not approval.
   */
  readonly resultsApproved?: boolean;
  /** Named quote. Shown on the page when present. Index/schema only if `quoteApproved`. */
  readonly testimonial?: CaseStudyTestimonial;
  /**
   * Explicit approval to index/schema the named quote.
   * Presence of `testimonial` data is not approval.
   */
  readonly quoteApproved?: boolean;
  /**
   * Explicit approval to associate this page with `client` in JSON-LD `about`.
   * Presence of a client name is not approval.
   */
  readonly clientAssociationApproved?: boolean;
  /** Real ISO-8601 publication date. Never synthesize from `engagement.year`. */
  readonly publishedAt?: string;
  /**
   * Explicit approval to index this case-study URL.
   * Unset/false means noindex. Do not infer from other fields.
   */
  readonly indexApproved?: boolean;
  readonly relatedSlugs: readonly string[];
  readonly tags: readonly string[];
  readonly seoTitle?: string;
  readonly seoDescription?: string;
}
