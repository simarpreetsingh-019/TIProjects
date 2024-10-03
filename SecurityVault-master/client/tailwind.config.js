/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "300px",
        md: "800px",
        lg: "1444px",
      },
    },
  },
  plugins: [],
};