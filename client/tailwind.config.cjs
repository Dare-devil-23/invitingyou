/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        forum: ["Forum"],
        dance: ["Dancing Script"]
      },
      cursor: {
        pencil: 'url(cursor/pencil.cur), pointer',
      }
    },
  },
  plugins: [],
}