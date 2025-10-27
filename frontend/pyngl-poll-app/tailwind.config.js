/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }, animation: {
        'slide-in-from-bottom': 'slide-in-from-bottom 0.4s ease-in-out',
      },
      colors: {
        'pyngl-dark': '#131526',
        'pyngl-pink': '#FF4DA6',
        'pyngl-purple': '#7B4CFF',
        'pyngl-teal': '#008080',
        'pyngl-gray': '#F0F0F0',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

