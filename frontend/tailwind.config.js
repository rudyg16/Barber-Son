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
        cream:'#FAF9F6',
        deep_blue:'#030380',
        teal:'#354F52',//dark sage
        teal_hover:'#008080',
        sage:'#52796F',
        bright_sage:'#6A8B83',

        mint:'#80CBC4',
        bright_mint:'#9FD7D2',
        logo_mint:'#B6FFBB'
      }
    },
  },
  plugins: [],
}

