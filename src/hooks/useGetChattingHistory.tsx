// import { useState, useEffect } from 'react';

// export default function useGetChattingHistory() {
//   const [messageData, setMessageData] = useState(null);
//   useEffect(() => {
//     async function getChattingHistory() {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/chat/chats`
//       );

//       const data = await response.json();

//       console.log(data);
//     }

//     getChattingHistory();
//   }, []);

//   return;
// }
