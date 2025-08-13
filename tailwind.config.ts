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
        "primary-dark": "#04102D",
        "accent-blue": "#4BC3FE",
        "accent-purple": "#8694FF",
        "accent-orange": "#FE4D17",
      },
    },
  },
  plugins: [],
};
export default config;
