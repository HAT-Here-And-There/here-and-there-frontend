import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';
import BookmarkedPlaceList from './bookmarkedPlaceList';
import PlaceChat from './placeChat';
import { fetchSavedPlaces, fetchChatRoomData } from '@utils/fetchFunctions';
import { getDateDiff } from '@utils/date';
import PlanAllButton from './PlanAllButton';
import TravelPlanDetails from './TravelPlanDetails';
import { planListAllPlaceItem } from '@_types/type';

export default function PlanListAll() {
  // 우측 채팅방에 보여질 장소를 의미함
  const [selectedPlace, setSelectedPlace] =
    useState<planListAllPlaceItem | null>(null);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  // 사용자가 저장한 장소들을 의미하며 차수에 맞게 2차원 배열로 유지함
  const [places, setPlaces] = useState<planListAllPlaceItem[][]>([]);
  const [bookMarkedPlaces, setBookMarkedPlaces] = useState<
    planListAllPlaceItem[]
  >([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [travelPlanName, setTravelPlanName] = useState<string | null>(
    localStorage.getItem('travelPlanName')
  );
  const [travelPlanStartDate, setTravelPlanStartDate] = useState<string>(
    localStorage.getItem('travelPlanStartDate') as string
  );
  const [travelPlanEndDate, setTravelPlanEndDate] = useState<string>(
    localStorage.getItem('travelPlanEndDate') as string
  );
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const totalTravelDay = getDateDiff(
    travelPlanStartDate as string,
    travelPlanEndDate as string
  );

  // 특정 장소가 골라지면 설정되는 채팅방 데이터
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
        const tmpPlaces = [];

        for (let i = 0; i < totalTravelDay; i++) {
          tmpPlaces.push(data);
        }
        setPlaces(tmpPlaces);
        setBookMarkedPlaces(tmpPlaces[selectedDayIndex]);
      } catch (error) {
        console.error(error);
      }
    };
    loadSavedPlaces();
  }, []);

  // 특정 장소를 고르면 bookkMarkedPlaces 상태에서 찾아서 오른쪽 채팅 화면에 띄워줌
  const handlePlaceClick = (
    placeId: string,
    bookMarkedPlaces: planListAllPlaceItem[]
  ) => {
    const selected = bookMarkedPlaces.find((place) => place.id === placeId);
    setSelectedPlace(selected || null);
  };

  // 기존의 전체 places를 복사 후 1차원 배열을 고르고 시작점으로부터 하나 잘라내어 목표 인덱스에 이어붙임
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
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  return (
    <main className="flex h-[calc(100vh-160px)]">
      {showDetails ? (
        <TravelPlanDetails
          onBackClick={handleBackClick}
          places={places}
          travelPlanName={travelPlanName as string}
          travelStartDate={new Date(travelPlanStartDate)}
          travelEndDate={new Date(travelPlanEndDate)}
        />
      ) : (
        <div className="flex w-full h-full overflow-y-scroll">
          <div
            id="left-section"
            className="w-[35%] h-full flex-grow-0 relative"
          >
            <BookmarkedPlaceList
              totalTravelDay={totalTravelDay}
              onPlaceClick={handlePlaceClick}
              handleSelectedDay={handleSelectedDay}
              places={bookMarkedPlaces}
              onMoveUp={(index) => movePlace(index, index - 1)}
              onMoveDown={(index) => movePlace(index, index + 1)}
              onDelete={deletePlace}
            />
            <div className="absolute bottom-10 w-[66px] flex justify-center">
              <PlanAllButton onClick={handleAllPlanClick} />
            </div>
          </div>
          <div id="right-secton" className="w-2/3 h-full flex-grow">
            {selectedPlace ? (
              <PlaceChat chatRoomData={chatRoomData} place={selectedPlace} />
            ) : (
              <p className="text-center text-gray-500 mt-4">
                장소를 선택하세요.
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
