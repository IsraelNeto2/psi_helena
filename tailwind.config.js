/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: "#425A45",
        clay: "#B4786A",
        cream: "#F5F2E9",
        charcoal: "#2A2E2B",
      },
    },
  },
  plugins: [],
}
