/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff0044',
        'primary-dark': '#cc0036',
        'secondary': '#4b0082',
        'accent': '#ffcc00',
        'dark': '#0a0a0a',
        'dark-surface': '#121212',
        'dark-surface-2': '#1e1e1e',
        'gray-dark': '#2d2d2d',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(255, 0, 68, 0.7), 0 0 20px rgba(255, 0, 68, 0.5)',
      }
    },
  },
  plugins: [],
}
