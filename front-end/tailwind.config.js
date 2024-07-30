/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      subinfo: '#474747',
      main: '#2D3748',
      alert: '#E74A3B',
      unmodified: '#8B8B8B',
      orange: '#D45B13',
      female: '#FF7568',
      green: '#2F903F',
      primary: '#EDF2F7',
      box: '#DFDEDE',
      background: '#ECF8FF',
      white: '#FFFFFF',
    },
    // fontFamily: {
    //   primary: ['Inter Tight'] 
    // },
    fontSize: {
      "xxs": ".625rem", // 10
      'xs': '.75rem',   // 12
      'sm': '.875rem',  // 14
      'base': '1rem',   // 16
      'xl': '1.125rem', // h6
      '2xl': '1.25rem', // h5
      '3xl': '1.5rem',  // h4
      '4xl': '2rem',    // h3
      '5xl': '3rem',    // h2
      '6xl': '4rem',    // h1
    },  
    extend: {},
  },
  plugins: [],
}

