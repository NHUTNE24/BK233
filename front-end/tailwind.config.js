/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      colors: {
        primary: '#2D3748',
        secondary: '#4F6181',
        orange: '#D45B13',
        green: '#2F903F',
        grey: '#F1F1F1',
        warningColor: '#E74A3B',
        borderColor: '#8B8B8B',
        inputHiddenColor: '#DFDEDE',
        chipInactiveColor: '#B9B9B9'
      },
      fontFamily: {
        primary: ['Inter Tight'] 
      },
      extend: {},
    },
    plugins: [],
  }
  
