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
        claude: {
          bg: "#FAF8F5",           // Warm parchment off-white background
          bgSubtle: "#F3EFF7",     // Subtle card background
          card: "#FFFFFF",         // Crisp white card surface
          border: "#EDE8E1",       // Soft warm border
          borderHover: "#D6CEBF",  // Hover border
          textMain: "#1A1915",     // Deep charcoal heading
          textMuted: "#6B675E",    // Warm muted gray
          terracotta: "#CC6B49",   // Muted warm terracotta accent (NOT bright orange/saffron)
          terracottaLight: "#F8EFEA", // Soft terracotta tint
          sage: "#386657",         // Elegant deep warm sage green
          sageLight: "#EEF4F1",    // Soft sage tint
        },
        irab: {
          marfoo: "#2563EB",  // Nominative - Slate Blue
          mansoob: "#16A34A", // Accusative - Deep Warm Sage/Green
          majroor: "#CC6B49", // Genitive - Terracotta / Clay
          majzoom: "#E11D48", // Jussive - Muted Crimson
          mabni: "#7C3AED",   // Fixed - Deep Purple
        },
      },
      fontFamily: {
        arabic: ["'Noto Naskh Arabic'", "Amiri", "serif"],
        sans: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        claudeCard: "0 2px 8px -2px rgba(26, 25, 21, 0.05), 0 1px 3px -1px rgba(26, 25, 21, 0.03)",
        claudeHover: "0 8px 24px -4px rgba(26, 25, 21, 0.08), 0 2px 6px -2px rgba(26, 25, 21, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
