/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
          'Very-Dark-Gray': 'hsl(0, 0%, 17%)',
          'Dark-Gray': 'hsl(0, 0%, 59%)',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      backgroundImage: {
        'map-pattern-desktop': "url('/build/images/pattern-bg-desktop.png')",
        'map-pattern-mobile': "url('/build/images/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
}

