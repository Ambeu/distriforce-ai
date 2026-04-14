/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: { 400:'#4ade80', 500:'#22c55e', 600:'#16a34a' },
        dark: { 900:'#edf7f1', 800:'#f7fcf9', 700:'#eff7f2', 600:'#d6e7dc', 500:'#bdd3c5' }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
      },
      keyframes: {
        fadeIn: { from:{opacity:'0'}, to:{opacity:'1'} },
        slideUp: { from:{opacity:'0',transform:'translateY(12px)'}, to:{opacity:'1',transform:'translateY(0)'} },
      }
    },
  },
  plugins: [],
}
