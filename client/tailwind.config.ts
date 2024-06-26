import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: colors.violet,
        "accent-main": colors.violet[400],
        "accent-border": colors.violet[500],
        grayscale: colors.zinc,
        "grayscale-bg-light": colors.zinc[200],
        "grayscale-bg-dark": colors.zinc[800],
      },
    },
  },
  variants: {
    extend: {
      display: ["dark"],
    },
  },
  plugins: [],
};
export default config;
