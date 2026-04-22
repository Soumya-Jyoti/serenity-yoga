/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        ink: '#0A0A0A',
        sage: '#9CAF88',
        clay: '#E8B298',
        moss: '#5D6B4F',
        stone: {
          50: '#FDFCFA',
          100: '#F5F2ED',
          200: '#EAEAEA',
          300: '#D4D4D4',
          500: '#A0A0A0',
          700: '#6B6B6B',
          900: '#141414',
        },
      },
      fontFamily: {
        sans: ['Onest', '"Onest Placeholder"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
