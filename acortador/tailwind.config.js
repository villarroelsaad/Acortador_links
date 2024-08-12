/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        700: '700px',
        1200: '1200px'
      },
      backgroundColor: {
        back: '#121212'
      }
    }
  },
  plugins: []
}
