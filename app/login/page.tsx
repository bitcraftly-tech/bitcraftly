import type { Metadata } from "next";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";

import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Login | Bitcraftly",
  description: "Secure login to your Bitcraftly dashboard with Gmail.",
};

const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[#1A1916]/10 bg-white py-3">
          <div className={`${CONTAINER} text-xs text-[#1A1916]/60`}>
            Home <span className="px-2">/</span> Login
          </div>
        </section>
        <LoginContent googleEnabled={googleEnabled} />
      </main>
      <Footer />
    </>
  );
}
