/** @type {import('tailwindcss').Config} */

import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
  animation: {
    'loader-line': 'loaderLine 1.4s ease-in-out infinite',
    'fade-in': 'fadeIn 0.6s ease-out',
  },
  keyframes: {
    loaderLine: {
      '0%': { transform: 'translateX(-100%)' },
      '50%': { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(100%)' },
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  },
}

  },
  plugins: [tailwindAnimate],
}