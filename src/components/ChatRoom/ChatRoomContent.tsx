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
  }, []);

  if (!chatRoomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grow bg-dftBackgroundGray w-full h-[1000px] flex justify-between items-start pr-6 pl-[20px] py-12">
      <div className="w-fit flex flex-col justify-start h-full">
        <div className="bg-white w-[70px] h-[70px] flex justify-center items-center rounded-md hover:cursor-pointer">
          <img
            src="/assets/Arrow.svg"
            alt="뒤로 가기"
            className="w-10 h-10"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      <PlaceCard chatRoomData={chatRoomData} />
      <ChatRoomCard chatRoomData={chatRoomData} placeId={placeId} />
    </div>
  );
}
