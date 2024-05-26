import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoomData } from '@_types/type';
import PlaceCard from './PlaceCard';
import ChatRoomCard from './ChatRoomCard';

interface ChatRoomContentProps {
  placeId: string | undefined;
}

export default function NewChatRoomContent({ placeId }: ChatRoomContentProps) {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getChatRoomData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places/${placeId}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setChatRoomData(result);
      } catch (error) {
        console.error('Failed to fetch chat room data:', error);
      }
    }

    if (placeId) {
      getChatRoomData();
    }
  }, [placeId]);

  if (!chatRoomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dftBackgroundGray w-[1920px] h-[1000px] flex items-center">
      <button
        onClick={() => navigate(-1)}
        className="bg-white text-gray-700 p-2 rounded mt-[-850px]"
      >
        <img src="/assets/Arrow.svg" alt="뒤로 가기" className="w-10 h-10" />
      </button>
      <section className="flex bg-white shadow-md rounded-lg overflow-hidden w-full h-[940px] mr-6">
        <PlaceCard chatRoomData={chatRoomData} />
        <ChatRoomCard chatRoomData={chatRoomData} placeId={placeId} />
      </section>
    </div>
  );
}
