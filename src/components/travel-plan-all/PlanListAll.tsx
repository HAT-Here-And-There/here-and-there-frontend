import { useState, useEffect } from 'react';
import { ChatRoomData, SelectPlacePlace } from '@_types/type';
import BookmarkedPlaceList from './bookmarkedPlaceList';
import PlaceChat from './placeChat';
import { fetchSavedPlaces, fetchChatRoomData } from '@utils/fetchFunctions';

export default function PlanListALL() {
  const [selectedPlace, setSelectedPlace] = useState<SelectPlacePlace | null>(null);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const [places, setPlaces] = useState<SelectPlacePlace[]>([]);

  useEffect(() => {
    if (selectedPlace) {
      fetchChatRoomData(selectedPlace.id).then(setChatRoomData).catch(console.error);
    }
  }, [selectedPlace]);

  useEffect(() => {
    fetchSavedPlaces().then(setPlaces).catch(console.error);
  }, []);

  const handlePlaceClick = (placeId: string) => {
    const selected = places.find((place) => place.id === placeId);
    setSelectedPlace(selected || null);
  };

  const movePlace = (fromIndex: number, toIndex: number) => {
    const updatedPlaces = [...places];
    const [movedPlace] = updatedPlaces.splice(fromIndex, 1);
    updatedPlaces.splice(toIndex, 0, movedPlace);
    setPlaces(updatedPlaces);
  };

  const deletePlace = (index: number) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  return (
    <main className="flex h-[calc(100vh-100px)]"> 
      <div className="flex w-full h-full overflow-y-scroll">
        <div className="w-1/3 h-full  flex-grow-0">
          <BookmarkedPlaceList 
            onPlaceClick={handlePlaceClick} 
            places={places}
            onMoveUp={(index) => movePlace(index, index - 1)}
            onMoveDown={(index) => movePlace(index, index + 1)}
            onDelete={deletePlace}
          />
        </div>
        <div className="w-2/3 h-full flex-grow">
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
