import { useState, useEffect } from 'react';
import { ChatRoomData, SelectPlacePlace } from '@_types/type';
import BookmarkedPlaceList from './bookmarkedPlaceList';
import PlaceChat from './placeChat';

export default function PlanListALL() {
  const [selectedPlace, setSelectedPlace] = useState<SelectPlacePlace | null>(null);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const [places, setPlaces] = useState<SelectPlacePlace[]>([]);

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
    const selected = places.find((place) => place.id === placeId);
    setSelectedPlace(selected || null);
  };

  const fetchSavedPlaces = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`);
      if (!response.ok) {
        throw new Error('저장된 장소 불러오기 실패');
      }
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('저장된 장소 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newPlaces = [...places];
      [newPlaces[index - 1], newPlaces[index]] = [newPlaces[index], newPlaces[index - 1]];
      setPlaces(newPlaces);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < places.length - 1) {
      const newPlaces = [...places];
      [newPlaces[index + 1], newPlaces[index]] = [newPlaces[index], newPlaces[index + 1]];
      setPlaces(newPlaces);
    }
  };

  const handleDelete = (index: number) => {
    const newPlaces = places.filter((_, i) => i !== index);
    setPlaces(newPlaces);
  };

  return (
    <main className="flex h-screen">
      <div className="flex w-full h-full">
        <div className="w-1/3 h-full overflow-y-auto">
          <BookmarkedPlaceList
            onPlaceClick={handlePlaceClick}
            places={places}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={handleDelete}
          />
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
