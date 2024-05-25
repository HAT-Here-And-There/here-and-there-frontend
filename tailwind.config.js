/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Gugi', 'sans-serif'],
      },
    },
    // colors: {
    //   dftBackgroundGray: '#F4F5FF',
    //   logoOrange: '#FAAC64',
    //   logoBlue: '#93BCFA',
    // },
  },
  plugins: [],
};

