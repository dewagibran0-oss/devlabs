import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050505",       // Deep Jet Black
          card: "#0F0F15",       // Dark Slate Blue
          primary: "#2563EB",    // Electric Royal Blue
          secondary: "#7C3AED",  // Neon Violet
          muted: "#9CA3AF",      // Muted Gray
        },
      },
    },
  },
  plugins: [],
};
export default config;