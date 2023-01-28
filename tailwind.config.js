/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-green': '#97BBAF',
        'success': '#4bb453',
        'black': '#222222',
        'offwhite': '#E8E8E8',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
