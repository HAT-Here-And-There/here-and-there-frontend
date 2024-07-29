import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';
import BookmarkedPlaceList from './bookmarkedPlaceList';
import PlaceChat from './placeChat';
import { fetchSavedPlaces, fetchChatRoomData } from '@utils/fetchFunctions';
import { getDateDiff } from '@utils/date';
import PlanAllButton from './PlanAllButton';
import { useNavigate } from 'react-router-dom';

interface planListAllPlaceItem {
  id: string;
  name: string;
  imageUrl: string;
}

export default function PlanListAll() {
  const [selectedPlace, setSelectedPlace] =
    useState<planListAllPlaceItem | null>(null);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const [places, setPlaces] = useState<planListAllPlaceItem[][]>([]);
  const [bookMarkedPlaces, setBookMarkedPlaces] = useState<
    planListAllPlaceItem[]
  >([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [travelPlanName, setTravelPlanName] = useState<string | null>(null);
  const [travelPlanStartDate, setTravelPlanStartDate] = useState<string | null>(
    null
  );
  const [travelPlanEndDate, setTravelPlanEndDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    const localStorageTravelPlanName = localStorage.getItem('travelPlanName');
    const localStorageTravelStartTime = localStorage.getItem(
      'travelPlanStartDate'
    );
    const localStorageTravelEndTime = localStorage.getItem('travelPlanEndDate');

    setTravelPlanName(localStorageTravelPlanName);
    setTravelPlanStartDate(localStorageTravelStartTime);
    setTravelPlanEndDate(localStorageTravelEndTime);
  }, []);

  const totalTravelDay = getDateDiff(
    travelPlanStartDate as string,
    travelPlanEndDate as string
  );

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
    setBookMarkedPlaces(places[selectedDayIndex]);
  }, [selectedDayIndex, places]);

  useEffect(() => {
    const loadSavedPlaces = async () => {
      try {
        const data = await fetchSavedPlaces();
        const tmpTwoDemensionLikedPlaces = Array.from(
          { length: totalTravelDay },
          () => data
        );
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
    const dayPlaces = [...updatedPlaces[selectedDayIndex]];
    const [movedPlace] = dayPlaces.splice(fromIndex, 1);
    dayPlaces.splice(toIndex, 0, movedPlace);
    updatedPlaces[selectedDayIndex] = dayPlaces;
    setPlaces(updatedPlaces);
    setBookMarkedPlaces(dayPlaces);
  };

  const deletePlace = (index: number) => {
    const updatedPlaces = [...places];
    const dayPlaces = [...updatedPlaces[selectedDayIndex]];
    dayPlaces.splice(index, 1);
    updatedPlaces[selectedDayIndex] = dayPlaces;
    setPlaces(updatedPlaces);
    setBookMarkedPlaces(dayPlaces);
  };

  const handleSelectedDay = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
  };

  const handleAllPlanClick = () => {
    // 전체일정 보러가기 클릭 시 동작하는 함수
    // console.log('전체일정 보러가기 클릭됨');
    // 전체일정 페이지로 이동하는 로직 추가할 예정.
  };

  return (
    <main className="flex h-[calc(100vh-160px)]">
      <div className="flex w-full h-full overflow-y-scroll">
        <div id="left-section" className="w-[35%] h-full flex-grow-0 relative">
          <BookmarkedPlaceList
            totalTravelDay={totalTravelDay}
            onPlaceClick={handlePlaceClick}
            handleSelectedDay={handleSelectedDay}
            places={bookMarkedPlaces}
            onMoveUp={(index) => movePlace(index, index - 1)}
            onMoveDown={(index) => movePlace(index, index + 1)}
            onDelete={deletePlace}
          />
          {/* <div className="absolute bottom-10 left-1.5 w-[66px] flex justify-center">
            <PlanAllButton onClick={handleAllPlanClick} />
          </div> */}
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
