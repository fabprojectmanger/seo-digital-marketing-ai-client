/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'selector',
  content: [
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}

      },
      boxShadow:{
        '6xl':'0px 47px 154px 0px #1567A321, 0px 5px 24px 0px #041F3317'
      },
      screens: {
        "max-5xl": { max: "1699px" },
        "max-4xl": { max: "1580px" },
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
