import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/curriculum/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        claude: {
          bg: "#F8FAF6",           // Unified cool sage-parchment background
          bgSubtle: "#F1F5F9",     // Subtle card background
          card: "#FFFFFF",         // Crisp white card surface
          border: "#E2E8F0",       // Soft warm border
          borderHover: "#CBD5E1",  // Hover border
          textMain: "#0F172A",     // Deep charcoal heading
          textMuted: "#64748B",    // Warm muted gray
          terracotta: "#C2410C",   // Muted warm terracotta accent
          terracottaLight: "#FFF7ED", // Soft terracotta tint
          sage: "#386657",         // Elegant deep warm sage green
          sageLight: "#EEF4F1",    // Soft sage tint
        },
        // Direct hyphenated keys for Tailwind class compatibility (e.g. bg-claude-bg, border-claude-border)
        "claude-bg": "#F8FAF6",
        "claude-bgSubtle": "#F1F5F9",
        "claude-card": "#FFFFFF",
        "claude-border": "#E2E8F0",
        "claude-borderHover": "#CBD5E1",
        "claude-textMain": "#0F172A",
        "claude-textMuted": "#64748B",
        "claude-terracotta": "#C2410C",
        "claude-terracottaLight": "#FFF7ED",
        "claude-sage": "#386657",
        "claude-sageLight": "#EEF4F1",
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
        claudeCard: "0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)",
        claudeHover: "0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
