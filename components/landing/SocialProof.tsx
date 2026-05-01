import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const automationBlocks = [
  {
    title: "AI Chatbots",
    desc: "24/7 automated responses on WhatsApp, website and social channels.",
  },
  {
    title: "Document Processing",
    desc: "Invoices, receipts and forms are extracted, structured and routed automatically.",
  },
  {
    title: "Data Analytics",
    desc: "AI-powered insights for sales trends, customer behavior and team productivity.",
  },
];

export default function SocialProof() {
  return (
    <section id="ai-automation" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-16 dark:border-dark-border-primary lg:py-24`}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/10 text-xl">🤖</span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-500">Service 03</span>
          </div>
          <h2 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            AI Automation Solutions
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary dark:text-dark-text-secondary">
            Repetitive tasks ko AI se automate karo: customer support, document flows aur reporting. Teams zyada focus
            karengi strategy par, manual kaam par nahi.
          </p>

          <div className="mt-6 space-y-4">
            {automationBlocks.map((block) => (
              <article key={block.title} className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
                <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{block.title}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">{block.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pink-700">
              Discuss AI Solution
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-pink-500 hover:text-pink-400">
              View Use Cases →
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-xs font-semibold text-white">
                  AI
                </div>
                <div className="rounded-2xl rounded-tl-none border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary">
                  Namaste! Main aapki kaise madad kar sakta hoon?
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <div className="rounded-2xl rounded-tr-none border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm text-text-primary dark:text-dark-text-primary">
                  Mujhe kal ka sales report chahiye.
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-secondary text-xs dark:bg-dark-bg-secondary">
                  U
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-tl-none border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm italic text-text-tertiary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-tertiary">
                  Typing...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
