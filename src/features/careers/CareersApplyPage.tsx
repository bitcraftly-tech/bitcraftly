import { Suspense } from "react";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { PageShell } from "@/components/patterns/marketing-layout";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { CareersApplyWizard } from "./CareersApplyWizard";
import "./careers.css";

/**
 * Careers apply route — parity with bitcraftly.com/careers/apply chrome.
 */
export function CareersApplyPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: ROUTES.home },
    { label: "Careers", href: ROUTES.careers },
    { label: "Apply" },
  ]);

  return (
    <PageShell className="careers-page careers-apply-page">
      <Section
        spacing="lg"
        aria-labelledby="careers-apply-heading"
        className="border-b border-border/40"
      >
        <MarketingBreadcrumbs items={breadcrumbs} className="mb-[16px]" />
        <div className="careers-apply-page__shell">
          <div className="careers-apply-page__intro">
            <p className="careers-apply-page__eyebrow">Apply · Bitcraftly ATS</p>
            <h1 id="careers-apply-heading" className="careers-apply-page__title">
              Send your profile
            </h1>
            <p className="careers-apply-page__lede">
              Takes about 4–5 minutes. Founder reviews every application — no
              keyword bots.
            </p>
            <p className="careers-apply-page__note">
              Prefer email?{" "}
              <a href="mailto:hello@bitcraftly.com">hello@bitcraftly.com</a>
              {" · "}
              <Link href={ROUTES.careers}>Back to open roles</Link>
            </p>
          </div>

          <div className="careers-apply-page__panel">
            <Suspense
              fallback={
                <div className="careers-apply-wizard__fallback" aria-hidden>
                  Loading application form…
                </div>
              }
            >
              <CareersApplyWizard />
            </Suspense>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
