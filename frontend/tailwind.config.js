/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Include all your component paths here
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // 🎯 The plugin MUST be here, where Tailwind processes it
    require('tailwind-scrollbar-hide'), 
  ],
}