import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";

import { isGoogleLoginConfigured } from "@/lib/googleAuthEnv";

import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Login | Bitcraftly",
  description: "Secure login to your Bitcraftly dashboard with Gmail.",
};

/** Read OAuth env at request time (not baked into static HTML at build). */
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const googleEnabled = isGoogleLoginConfigured();

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Home
            </Link>
            <span className="px-2">/</span> Login
          </div>
        </section>
        <LoginContent googleEnabled={googleEnabled} />
      </main>
      <Footer />
    </>
  );
}
