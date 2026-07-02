import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        "sans-brand": ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#FFFFFF",
          secondary: "#FAFAFA",
          card: "#FFFFFF",
          section: "#F8FAFC",
          hover: "#F1F5F9",
        },
        text: {
          primary: "#0F172A",
          secondary: "#334155",
          tertiary: "#64748B",
          disabled: "#94A3B8",
        },
        border: {
          primary: "#E2E8F0",
          secondary: "#E5E7EB",
          divider: "#F1F5F9",
        },
        accent: {
          primary: "#2563EB",
          hover: "#1D4ED8",
          soft: "#DBEAFE",
        },
        brand: {
          primary: "#2563EB",
          hover: "#1D4ED8",
          soft: "#DBEAFE",
        },
        status: {
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#0EA5E9",
        },
        btn: {
          secondary: {
            bg: "#FFFFFF",
            border: "#CBD5E1",
            text: "#2563EB",
            hover: "#F8FAFC",
          },
        },
        dark: {
          bg: {
            primary: "#0A0A0F",
            secondary: "#13131A",
            card: "#1C1C27",
          },
          text: {
            primary: "#F0EFF8",
            secondary: "#B8B7C8",
            tertiary: "#8888AA",
          },
          border: {
            primary: "#2A2A3D",
            secondary: "#3A3A4D",
          },
        },
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "5rem", fontWeight: "700" }],
        "display-l": ["3.75rem", { lineHeight: "4.25rem", fontWeight: "700" }],
        h1: ["3.5rem", { lineHeight: "4rem", fontWeight: "700" }],
        h2: ["2.75rem", { lineHeight: "3.25rem", fontWeight: "700" }],
        h3: ["2.25rem", { lineHeight: "2.75rem", fontWeight: "600" }],
        h4: ["1.875rem", { lineHeight: "2.375rem", fontWeight: "600" }],
        h5: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        h6: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.875rem", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
        nav: ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        button: ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        "card-hover":
          "0 4px 6px -1px rgb(15 23 42 / 0.06), 0 2px 4px -2px rgb(15 23 42 / 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
