import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  // Specify all files that should be scanned for Tailwind classes
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
    // Add any other directories containing Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
