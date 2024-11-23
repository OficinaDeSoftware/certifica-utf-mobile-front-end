/** @type {import('tailwindcss').Config} */

const { colors} = require("./src/styles/colors");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colors
    },
  },
  plugins: [],
}