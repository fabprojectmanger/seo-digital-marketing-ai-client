/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightblue: {
          100: "#D4EAF7",
        },
        dark: {
          100: "#00668C",
        },
      },
      screens: {
        "max-3xl": { max: "1440px" },
        "max-2xl": { max: "1366px" },
        "max-xl": { max: "1280px" },
        "max-lg": { max: "1166px" },
        "max-lg-tab": { max: "1024px" },
        "max-md-tab": { max: "990px" },
        "max-sm-tab": { max: "768px" },
        "max-xs-tab": { max: "749px" },
        "max-md-mobile": { max: "600px" },
        "max-mb": { max: "475px" },
      },
    },
  },
  plugins: [],
};
