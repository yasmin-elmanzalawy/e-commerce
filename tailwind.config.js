/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'main-green':'#4FA74F',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  
}