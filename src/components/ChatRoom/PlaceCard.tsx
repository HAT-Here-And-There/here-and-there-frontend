import { ChatRoomData } from '@_types/type';

interface PlaceCardProps {
  chatRoomData: ChatRoomData;
}

export default function PlaceCard({ chatRoomData }: PlaceCardProps) {
  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="flex flex-col items-center lg:items-start bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="w-full h-full">
          <img
            src={chatRoomData.imageUrl}
            alt={chatRoomData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[320px]">
          <h2 className="text-2xl font-bold p-6 font-main">{chatRoomData.name}</h2>
          <div className='p-6'>
            <p className="text-gray-700 mb-4">
                <span className="font-custom">지역:</span> {chatRoomData.areaName}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-custom">주소:</span> {chatRoomData.address}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-custom">전화번호:</span> {chatRoomData.contact}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-custom">운영 시간:</span> {chatRoomData.openingHours} ~ {chatRoomData.closingHours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
