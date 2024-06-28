import { useState, useEffect } from 'react';
import { SelectPlacePlaceProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';

export default function SelectPlacePlaceListComponent({
  places,
}: SelectPlacePlaceProps) {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);

  const fetchSavedPlaces = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`
      );
      if (!response.ok) {
        throw new Error('저장된 장소 불러오기 실패');
      }
      const data = await response.json();

      const savedPlaceIds = data.map((place: { id: string }) => place.id);
      setSavedPlaces(savedPlaceIds);
    } catch (error) {
      console.error('저장된 장소 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  const handleSavePlace = async (placeId: string) => {
    const isSaved = savedPlaces.includes(placeId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`,
        {
          method: isSaved ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: placeId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          isSaved ? '저장된 장소 삭제하기 실패' : '장소 저장 실패'
        );
      }

      setSavedPlaces((prevSavedPlaces) => {
        const updatedSavedPlaces = isSaved
          ? prevSavedPlaces.filter((id) => id !== placeId)
          : [...prevSavedPlaces, placeId];
        return updatedSavedPlaces;
      });
    } catch (error) {
      console.error('장소 저장 오류 발생:', error);
    }
  };

  return (
    <div className="bg-dftBackgroundGray flex justify-center grow">
      <div className="w-full flex flex-col items-center pt-9 rounded-lg overflow-scroll scroll-box">
        {places.map((place) => (
          <div
            key={place.id}
            className="flex items-center w-[90%] h-[150px] mb-4 py-3.5 pl-10 pr-5 rounded-lg bg-white hover:cursor-pointer"
            onClick={() => navigate(`/chatroom/${place.id}`)}
          >
            <img
              src={place.imageUrl}
              alt="장소 사진"
              className="w-52 h-full rounded-lg object-cover my-3.5"
            />
            <div className="flex-grow flex items-center justify-center">
              <h2 className="text-2xl text-textPurple font-bold font-main">
                {place.name}
              </h2>
            </div>
            <div className="flex flex-col items-center mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSavePlace(place.id);
                }}
              >
                <img
                  src={
                    savedPlaces.includes(place.id)
                      ? '/assets/bookmark-saved.svg'
                      : '/assets/bookmark.svg'
                  }
                  alt="저장 버튼"
                  className="w-11 h-12 mb-2"
                />
              </button>
              <img
                src="/assets/Message.svg"
                alt="댓글 개수"
                className="w-10 h-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
