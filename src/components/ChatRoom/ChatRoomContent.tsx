import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';

export default function ChatRoomContent({
  placeId,
}: {
  placeId: string | undefined;
}) {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);

  useEffect(() => {
    async function getChatRoomData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places/${placeId}`
      );

      const result = await response.json();

      setChatRoomData(result);
    }

    getChatRoomData();
  }, [placeId]);

  if (!chatRoomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-0 py-0">
      <section className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section: Place Card */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex flex-col items-center lg:items-start bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <div className="w-[875px] h-[560px] flex-shrink-0 mb-4 lg:mb-0">
              <img
                src={chatRoomData.imageUrl}
                alt={chatRoomData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[875px] h-[300px] flex-shrink-0 p-6">
              <h2 className="text-2xl font-bold mb-2">{chatRoomData.name}</h2>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">지역:</span>{' '}
                {chatRoomData.areaName}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">주소:</span>{' '}
                {chatRoomData.address}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">전화번호:</span>{' '}
                {chatRoomData.contact}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">운영 시간:</span>{' '}
                {chatRoomData.openingHours} ~ {chatRoomData.closingHours}
              </p>
            </div>
          </div>
        </div>
        {/* Right Section: Chat Room Card */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex flex-col items-center lg:items-start bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <div className="w-full p-6">
              <h2 className="text-2xl font-bold mb-2">채팅방 정보</h2>
              {/* 채팅방 정보 및 기타 내용 */}
              <p className="text-gray-700 mb-4">채팅방 내용</p>
              {/* 예시 내용, 실제 데이터로 대체 필요 */}
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">사용자 ID: 댓글</span>
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">댓글달기...</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
