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
      colors: {
        bg: {
          primary: "#FAFAF8",
          secondary: "#F4F3F0",
          card: "#FFFFFF",
        },
        text: {
          primary: "#1A1916",
          secondary: "#4A4845",
          tertiary: "#8A8885",
        },
        border: {
          primary: "#E8E6E1",
          secondary: "#D4D1CA",
        },
        accent: {
          primary: "#2B5CE6",
          hover: "#1A3D9E",
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
    },
  },
  plugins: [],
};

export default config;
