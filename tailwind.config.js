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
    },
  },
  plugins: [],
}

