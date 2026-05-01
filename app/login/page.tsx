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
        <section className="border-b border-[#1A1916]/10 bg-white py-1.5">
          <div className={`${CONTAINER} text-xs text-[#1A1916]/60`}>
            <Link href="/" className="hover:text-[#1A1916] hover:underline">
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
