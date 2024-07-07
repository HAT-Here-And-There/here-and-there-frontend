import { useState, useEffect } from 'react';
import { ChatRoomData, SelectPlacePlace } from '@_types/type';
import BookmarkedPlaceList from './bookmarkedPlaceList';
import PlaceChat from './placeChat';

export default function PlanListALL() {
  const [selectedPlace, setSelectedPlace] = useState<SelectPlacePlace | null>(null);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);

  useEffect(() => {
    const getChatRoomData = async (placeId: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/chat/place/${placeId}/chats`);
        if (response.ok) {
          const data = await response.json();
          setChatRoomData(data);
        } else {
          console.error('Failed to fetch chat room data:', response.status, response.statusText);
          throw new Error('Fetching chat room data failed');
        }
      } catch (error) {
        console.error('Error fetching chat room data:', error);
      }
    };

    if (selectedPlace) {
      getChatRoomData(selectedPlace.id);
    }
  }, [selectedPlace]);

  const handlePlaceClick = async (placeId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`);
      if (response.ok) {
        const places: SelectPlacePlace[] = await response.json();
        const selected = places.find((place) => place.id === placeId);
        setSelectedPlace(selected || null);
      } else {
        console.error('Failed to fetch places:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <main className="flex h-screen">
      <div className="flex w-full h-full">
        <div className="w-1/3 h-full overflow-y-auto">
          <BookmarkedPlaceList onPlaceClick={handlePlaceClick} />
        </div>
        <div className="w-2/3 h-full">
          {selectedPlace ? (
            <PlaceChat chatRoomData={chatRoomData} place={selectedPlace} />
          ) : (
            <p className="text-center text-gray-500 mt-4">장소를 선택하세요.</p>
          )}
        </div>
      </div>
    </main>
  );
}
