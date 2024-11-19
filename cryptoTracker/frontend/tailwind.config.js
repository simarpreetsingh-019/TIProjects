/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [ "class" ],
  content: [
    "./index.html",
    './pages/**/*.{js,jsx}',
    './component/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
    },
  },
  plugins: [ require( "tailwindcss-animate" ) ],
}
