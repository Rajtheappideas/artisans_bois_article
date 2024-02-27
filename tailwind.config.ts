import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: "#0060AE",
        darkBlue: "#005294",
        blackText: "#1D1B23",
        grayText: "#6D6D6D",
        lightGray: "#fafafa",
        midGray: "#F5F5F5",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        "2xl": "1600px",
        "3xl": "1800px",
      },
     
    },
  },
  plugins: [],
};
export default config;
