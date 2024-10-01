/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./PageComponents/**/*.{js,ts,jsx,tsx}",
    "./PageComponents/Components/**/*.{js,ts,jsx,tsx}",
    "./PageComponents/Components/GardenComponents/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
  ],
};
