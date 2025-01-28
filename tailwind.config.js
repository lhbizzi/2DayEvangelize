/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        customColor: 'var(bgLiturgia)', 
      },
    },
  },
  plugins: [],
};
