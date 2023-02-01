/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        23: 'repeat(23, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
