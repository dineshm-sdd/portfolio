/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        smartdata: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#e31c23',
          600: '#c4161c',
          700: '#a31015',
          DEFAULT: '#e31c23',
        },
        primary: {
          DEFAULT: '#e31c23',
          hover: '#c4161c',
          glow: 'rgba(227, 28, 35, 0.25)',
        },
        dark: {
          bg: '#0a0d14',
          card: '#111726',
          border: '#1e293b',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
