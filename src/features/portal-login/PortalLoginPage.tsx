import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { PageShell } from "@/components/patterns/marketing-layout";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { PortalLoginForm } from "./PortalLoginForm";
import {
  PORTAL_LOGIN_LANDING,
  resolvePortalCallbackUrl,
} from "./portal-login.content";
import "./portal-login.css";

interface PortalLoginPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

/**
 * Client portal login — layout/copy mirrored from https://bitcraftly.com/login
 */
export function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: ROUTES.home },
    { label: "Login" },
  ]);
  const callbackUrl = resolvePortalCallbackUrl(searchParams?.callbackUrl);

  return (
    <PageShell className="portal-login-page">
      <Section
        spacing="lg"
        aria-labelledby="login-system-title"
        className="portal-login border-b border-border/40"
      >
        <Container size="xl" className="portal-login__container">
          <MarketingBreadcrumbs
            items={breadcrumbs}
            className="mb-[var(--space-4)]"
          />

          <div className="portal-login__card">
            <header className="portal-login__card-head">
              <p className="portal-login__eyebrow">
                {PORTAL_LOGIN_LANDING.eyebrow}
              </p>
              <h1 id="login-system-title" className="portal-login__title">
                {PORTAL_LOGIN_LANDING.title}
              </h1>
              <p className="portal-login__description">
                {PORTAL_LOGIN_LANDING.description}
              </p>
            </header>

            <PortalLoginForm callbackUrl={callbackUrl} />
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
