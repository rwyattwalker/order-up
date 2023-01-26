/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#97BBAF',
        'success': '#4bb453',
        'black': '#222222'
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
