import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';

export default function ChatRoomContent({
  placeId,
}: {
  placeId: string | undefined; // 추후에 수정 요망
}) {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData[]>([]);

  useEffect(() => {
    async function getChatRoomData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places/${placeId}`
      );

      const result = await response.json();

      setChatRoomData(result);
    }

    getChatRoomData();
  }, []);

  console.log(chatRoomData);

  return <>This is chat room content</>;
}
