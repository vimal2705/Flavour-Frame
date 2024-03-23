/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        grey: "#c5c7c7",
        // "dark-grey": "#383838",
        "dark-grey": "#0A0A0A",
      },
    },
  },
  plugins: [],
};
