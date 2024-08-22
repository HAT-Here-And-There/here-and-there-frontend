/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Gugi', 'sans-serif'],
        text: ['Nanum Gothic', 'sans-serif'],
      },
      colors: {
        dftBackgroundGray: '#F4F5FF',
        logoOrange: '#FAAC64',
        logoBlue: '#93BCFA',
        textRed: '#FF8577',
        textGray: '#BBB8B8',
        textPurple: '#5551FF',
        chatRoomPurple: 'rgba(85, 81, 255, 0.90)',
        bookmarkRed: '#FF8577',
        backgroundLightGray: '#F7F8F9',
        borderLightGray: '#d9d9d9',
        chatModalPurple: '#9DA7FF',
        planListRed:'#FF7878',
        planListGray: '#F3F5FF',
      },
      height: {
        travelListSection: 'calc(100% - 160px)',
        selectPlaceListMainSection: 'cal(100dvh - 330px)',
      },
    },
  },
};
