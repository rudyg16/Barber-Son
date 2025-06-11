/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // important!
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
      },
      colors:{
        maroon:'#7A0000',
        teal:'#007373',
        teal_hover:'#008080'
      }
    },
  },
  plugins: [],
}

