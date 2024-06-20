import { ChatRoomData } from '@_types/type';

interface PlaceCardProps {
  chatRoomData: ChatRoomData;
}

export default function PlaceCard({ chatRoomData }: PlaceCardProps) {
  return (
    <div className="w-[45%] flex flex-col gap-y-3">
      <div id="placeImage" className="h-[580px] overflow-hidden">
        <div className="w-full h-full">
          <img
            src={chatRoomData.imageUrl}
            alt={chatRoomData.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div id="placeDescription" className="h-[330px] bg-white rounded-lg">
        <h2 className="text-2xl font-bold p-6 font-main">
          {chatRoomData.name}
        </h2>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            <span className="font-custom">지역:</span> {chatRoomData.areaName}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-custom">주소:</span> {chatRoomData.address}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-custom">전화번호:</span>{' '}
            {chatRoomData.contact}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-custom">운영 시간:</span>{' '}
            {chatRoomData.openingHours} ~ {chatRoomData.closingHours}
          </p>
        </div>
      </div>
    </div>
  );
}
