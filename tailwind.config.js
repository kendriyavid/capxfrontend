/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        base: '#1B1B1B',
        accent: '#E4E4DE', // Change accent color
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('daisyui'),
  ],
}
