/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      lato: "'Lato',sans-serif",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
