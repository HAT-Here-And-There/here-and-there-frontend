import { ChatRoomData } from '@_types/type';

interface PlaceCardProps {
  chatRoomData: ChatRoomData;
}

export default function PlaceCard({ chatRoomData }: PlaceCardProps) {
  return (
    <div className="w-[42%] flex flex-col justify-between gap-y-2">
      <div id="placeImage" className="h-[560px] overflow-hidden">
        <div className="w-full h-full">
          <img
            src={chatRoomData.imageUrl}
            alt={chatRoomData.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div id="placeDescription" className="h-[150px] bg-white rounded-lg">
        good
      </div>
    </div>
  );
}
