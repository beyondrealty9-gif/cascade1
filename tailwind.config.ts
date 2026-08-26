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
        // 4 Exact Requested Electric Waterfront Colors
        electric: "#7DF9FF", // Electric Blue #7DF9FF rgb(125,249,255)
        turquoise: "#AFEEEE", // Pale Turquoise #AFEEEE rgb(175,238,238)
        waterspout: "#A4F4F9", // Waterspout #A4F4F9 rgb(164,244,249)
        cyanLight: "#E0FFFF", // Light Cyan #E0FFFF rgb(224,255,255)

        // Mapped river / cerulean palette using the 4 requested bright cyan/turquoise codes
        cerulean: {
          300: "#E0FFFF", // Light Cyan
          400: "#A4F4F9", // Waterspout
          500: "#AFEEEE", // Pale Turquoise
          600: "#7DF9FF", // Electric Blue
          700: "#50E0F0",
        },
        river: {
          300: "#E0FFFF", // Light Cyan
          400: "#A4F4F9", // Waterspout
          500: "#AFEEEE", // Pale Turquoise
          600: "#7DF9FF", // Electric Blue
          700: "#50E0F0",
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
        "river-gradient": "linear-gradient(135deg, #7DF9FF 0%, #A4F4F9 50%, #AFEEEE 100%)",
        "electric-gradient": "linear-gradient(135deg, #7DF9FF 0%, #A4F4F9 50%, #AFEEEE 100%)",
        "hero-overlay": "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.1) 100%)",
        "glass-light": "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
      },
      boxShadow: {
        "red-glow": "0 10px 25px -5px rgba(217, 35, 45, 0.4)",
        "electric-glow": "0 10px 25px -5px rgba(125, 249, 255, 0.5)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
