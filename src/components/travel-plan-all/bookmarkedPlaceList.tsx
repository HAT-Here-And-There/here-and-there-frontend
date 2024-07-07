import { useEffect, useState } from 'react';
import { SelectPlacePlace } from '@_types/type';

interface BookmarkedPlaceListProps {
  onPlaceClick: (placeId: string) => void;
}

export default function BookmarkedPlaceList({
  onPlaceClick,
}: BookmarkedPlaceListProps) {
  const [places, setPlaces] = useState<SelectPlacePlace[]>([]);

  const fetchSavedPlaces = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`
      );
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

  return (
    <div className="bg-gray-200 h-full flex justify-center grow pl-12">
      <div className="bg-white w-[450px] flex flex-col items-center overflow-scroll scroll-box">
        {places.map((place) => (
          <div
            key={place.id}
            className="flex flex-col w-[90%] mb-4 py-6 pl-20 pr-5 rounded-lg bg-white hover:cursor-pointer"
            onClick={() => onPlaceClick(place.id)}
          >
            <h2 className="text-2xl font-bold font-main mb-2">
              {place.name}
            </h2>
            <img
              src={place.imageUrl}
              alt="장소 사진"
              className="w-80 h-[150px] object-cover my-3.5"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
