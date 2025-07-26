/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'klarvia-blue': '#0ea5e9',
        'klarvia-blue-dark': '#0284c7',
        'klarvia-blue-light': '#7dd3fc',
      },
      fontSize: {
        'hero-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};
