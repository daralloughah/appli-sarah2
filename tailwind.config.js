/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Saira Condensed"', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
      },
      colors: {
        noir: '#0A0A0C',
        panel: '#141418',
        panel2: '#1C1C22',
        red:  { DEFAULT: '#E11D2B', bright: '#FF2A3A', dark: '#A50D18' },
        blue: { DEFAULT: '#107ACA', light: '#2E97E6', dark: '#0A5C9E' },
        dispo: '#22C55E',
        reserve: '#EF4444',
        indispo: '#52525B',
      },
    },
  },
  plugins: [],
};
