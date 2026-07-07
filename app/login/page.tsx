import type { Metadata } from "next";
import { Suspense } from "react";

import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER, PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";

import { isGoogleLoginConfigured } from "@/lib/googleAuthEnv";

import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Login | Bitcraftly Portal",
  description:
    "Sign in to the Bitcraftly Client Portal — manage projects, analytics, leads, and delivery tools from one secure workspace.",
};

/** Read OAuth env at request time (not baked into static HTML at build). */
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const googleEnabled = isGoogleLoginConfigured();

  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
        <Suspense fallback={<p className={`${CONTAINER} py-10 text-sm text-text-secondary`}>Loading…</p>}>
          <LoginContent googleEnabled={googleEnabled} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
