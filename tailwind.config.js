/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,tsx,jsx,svg}",
    "./pages/**/*.{html,js,tsx,jsx,svg}",
  ],
  theme: {
    extend: {
      screens: {
        "h-800": { raw: "(max-height: 800px)" },
      },
      fontSize: {
        title: "16px",
        xsmall: "12px",
        small: "14px",
      },
      fontFamily: {
        overpass: "'overpass','serif'",
      },
      colors: {
        purple2: "#644d99",
        pink2: "#DD187F",
        inactive: "#CCCCCC",
        gray2: "#828282",
        f9: "#F9F9F9",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
