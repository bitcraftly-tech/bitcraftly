import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import SiteFooter from "@/components/layout/SiteFooter";
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
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Home
            </Link>
            <span className="px-2">/</span> Login
          </div>
        </section>
        <Suspense fallback={<p className={`${CONTAINER} py-10 text-sm text-text-secondary`}>Loading…</p>}>
          <LoginContent googleEnabled={googleEnabled} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
