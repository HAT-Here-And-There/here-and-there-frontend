import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';
import BookmarkedPlaceList from './bookmarkedPlaceList';
import PlaceChat from './placeChat';
import { fetchSavedPlaces, fetchChatRoomData } from '@utils/fetchFunctions';
import { useAppSelector } from '@context/store';
import { getDateDiff } from '@utils/date';

interface planListAllPlaceItem {
  id: string;
  name: string;
  imageUrl: string;
}

export default function PlanListALL() {
  const [selectedPlace, setSelectedPlace] =
    useState<planListAllPlaceItem | null>(null);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  // 각 차수를 모두 상태로 관리해야 하므로 2차원 배열의 형태로 관리함
  const [places, setPlaces] = useState<planListAllPlaceItem[][]>([]);
  const [bookMarkedPlaces, setBookMarkedPlaces] = useState<
    planListAllPlaceItem[]
  >([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1);

  const travelPlanName = useAppSelector((state) => state.travelPlan.name);
  console.log(travelPlanName);

  const travelPlanStartDate = useAppSelector(
    (state) => state.travelPlan.startDate
  ) as string;
  const travelPlanEndDate = useAppSelector(
    (state) => state.travelPlan.endDate
  ) as string;

  const totalTravelDay = getDateDiff(travelPlanStartDate, travelPlanEndDate);

  useEffect(() => {
    const loadChatRoomData = async () => {
      if (selectedPlace) {
        try {
          const data = await fetchChatRoomData(selectedPlace.id);
          setChatRoomData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadChatRoomData();
  }, [selectedPlace]);

  useEffect(() => {
    const loadSavedPlaces = async () => {
      try {
        const data = await fetchSavedPlaces();
        const tmpTwoDemensionLikedPlaces = new Array(totalTravelDay).fill(data);
        setPlaces(tmpTwoDemensionLikedPlaces);
        setBookMarkedPlaces(tmpTwoDemensionLikedPlaces[selectedDayIndex]);
      } catch (error) {
        console.error(error);
      }
    };
    loadSavedPlaces();
  }, []);

  const handlePlaceClick = (
    placeId: string,
    bookMarkedPlaces: planListAllPlaceItem[]
  ) => {
    const selected = bookMarkedPlaces.find((place) => place.id === placeId);
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

  const handleSelectedDay = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
  };

  return (
    <main className="flex h-[calc(100vh-160px)]">
      <div className="flex w-full h-full overflow-y-scroll">
        <div id="left-section" className="w-1/3 h-full flex-grow-0">
          <BookmarkedPlaceList
            totalTravelDay={totalTravelDay}
            onPlaceClick={handlePlaceClick}
            handleSelectedDay={handleSelectedDay}
            places={bookMarkedPlaces}
            onMoveUp={(index) => movePlace(index, index - 1)}
            onMoveDown={(index) => movePlace(index, index + 1)}
            onDelete={deletePlace}
          />
        </div>
        <div id="right-secton" className="w-2/3 h-full flex-grow">
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
