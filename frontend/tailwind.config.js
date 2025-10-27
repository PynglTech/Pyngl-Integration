/** @type {import('tailwindcss').Config} */

export default {
  // 1. Enable dark mode using the 'class' strategy
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 2. Add your new dark background color for easy reference
        'pyngl-dark': '#131526',
        'pyngl-pink': '#FF4DA6',
        'pyngl-purple': '#7B4CFF',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

