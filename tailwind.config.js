/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Gugi', 'sans-serif'],
        text: ["Nanum Gothic", 'sans-serif'],
      },
      colors: {
        dftBackgroundGray: '#F4F5FF',
        logoOrange: '#FAAC64',
        logoBlue: '#93BCFA',
        textRed: '#FF8577',
        textGray: '#BBB8B8',
        textPurple: '#5551FF',
        chatRoomPurple: 'rgba(85, 81, 255, 0.90)',
      },
    },
  },
  plugins: [],
};
