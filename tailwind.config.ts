import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sacred: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
        },
        kumbh: {
          gold: "#D4A843",
          saffron: "#FF6B00",
          deepBlue: "#1A1A2E",
          river: "#0EA5E9",
          lotus: "#EC4899",
          sand: "#F5E6D3",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        hindi: ["Noto Sans Devanagari", "sans-serif"],
      },
      backgroundImage: {
        "gradient-sacred": "linear-gradient(135deg, #EA580C 0%, #D4A843 50%, #F97316 100%)",
        "gradient-river": "linear-gradient(135deg, #0EA5E9 0%, #1A1A2E 100%)",
        "gradient-sunset": "linear-gradient(135deg, #FF6B00 0%, #EC4899 50%, #D4A843 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(249, 115, 22, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(249, 115, 22, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
