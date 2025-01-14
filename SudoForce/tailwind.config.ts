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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        integralHeavy: ['IntegralCF-Heavy'],
        dmsans: ['DM Sans', 'sans-serif'],
        integralcfBold: ['IntegralCF-Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
