/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const flowbite = require('flowbite/plugin');
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,css,scss}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [flowbite, lineClamp],
};
