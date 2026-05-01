import { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
/** Re-enable when chatbot should ship: uncomment import + <ChatSupportWidget /> below */
// import ChatSupportWidget from "@/components/chat/ChatSupportWidget";
import FloatingScrollButton from "@/components/landing/FloatingScrollButton";
import FloatingThemeTumbler from "@/components/landing/FloatingThemeTumbler";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Toaster from "@/components/ui/Toaster";

type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-[var(--font-inter)] antialiased">
        <ThemeProvider>
          {children}
          {/* <ChatSupportWidget /> */}
          <FloatingScrollButton />
          <FloatingThemeTumbler />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

