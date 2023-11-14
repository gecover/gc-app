const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      keyframes: {
        pump: {
          '0%': { bgOpacity: 20 },
          '100%': { bgOpacity: 50 },
        }
      },
      animation: {
        cardpump: 'pump 1s ease-in-out',
      }
      
    }
  },
  plugins: []
};
