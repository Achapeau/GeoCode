/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Roboto Slab", "serif"],
      sans: ["Roboto", "sans-serif"],
    },

    extend: {
      colors: {
        primary: "#E5E9E7", // WHITE
        secondary: "#525B5A", // BLACK
        blue: "#21A89A",
        green: "#7CD858",
      },
      fontSize: {
        xxs: "0.625rem", // You can adjust the value as needed
      },
    },
  },
  plugins: [require("daisyui")],
};
