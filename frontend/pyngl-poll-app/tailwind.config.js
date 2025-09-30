/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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

