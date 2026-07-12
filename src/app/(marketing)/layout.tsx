import { AskAiTab } from "@/features/homepage/AskAi";
import { FooterSection } from "@/features/homepage/Footer";
import { HeaderSection } from "@/features/homepage/Header";
import { NewsletterSection } from "@/features/homepage/Newsletter";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderSection />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <NewsletterSection />
      <FooterSection />
      <AskAiTab />
    </>
  );
}
