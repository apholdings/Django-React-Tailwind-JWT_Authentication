const colors = require('tailwindcss/colors')
module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
          'dark-main': '#18191A',
          'dark-second': '#242526',
          'dark-third': '#3A3B3C',
          'dark-txt': '#B8BBBF',
          sky: colors.sky,
          teal: colors.teal,
          rose: colors.rose,
        }
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      transform: ['group-hover'],
      scale: ['group-hover'],
      textOpacity: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-question-mark'),
  ],
}
