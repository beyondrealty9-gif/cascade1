import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        surfaceLight: "#F1F5F9",
        borderDark: "#E2E8F0",
        brandRed: {
          500: "#D9232D",
          600: "#C81E2B",
          700: "#991B1B",
        },
        brandAccent: {
          500: "#E05800",
          600: "#C74E00",
          700: "#B34400",
        },
        cerulean: {
          300: "#3395B9",
          400: "#1A88B0",
          500: "#007BA7", // Cerulean #007BA7 (rgb(0, 123, 167))
          600: "#00678C",
          700: "#005371",
        },
        river: {
          300: "#3395B9",
          400: "#1A88B0",
          500: "#007BA7", // Cerulean #007BA7 (rgb(0, 123, 167))
          600: "#00678C",
          700: "#005371",
        },
        gold: {
          300: "#FCD34D",
          400: "#F59E0B",
          500: "#D97706",
          600: "#B45309",
        },
        textDark: "#0F172A",
        textMuted: "#64748B",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(135deg, #E11D48 0%, #D9232D 50%, #991B1B 100%)",
        "river-gradient": "linear-gradient(135deg, #1A88B0 0%, #007BA7 50%, #005371 100%)",
        "hero-overlay": "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.1) 100%)",
        "glass-light": "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
      },
      boxShadow: {
        "red-glow": "0 10px 25px -5px rgba(217, 35, 45, 0.4)",
        "cerulean-glow": "0 10px 25px -5px rgba(0, 123, 167, 0.4)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
