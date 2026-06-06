import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sacred: {
          50: "#faf5f0",
          100: "#f5ebe1",
          500: "#d4756b",
          600: "#c85a4f",
          900: "#4a1f1a",
        },
        pilgrim: {
          blue: "#1e40af",
          orange: "#ea580c",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        devanagari: ["Noto Sans Devanagari", ...defaultTheme.fontFamily.sans],
        tamil: ["Noto Sans Tamil", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
