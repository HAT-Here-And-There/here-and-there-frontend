import { formatDateToYYYYMMDD } from '@utils/date';
import { planListAllPlaceItem } from '@_types/type';
import { useState, useEffect } from 'react';
import { fetchSavedPlaces } from '@utils/fetchFunctions';

interface overallLeftSectionProp {
  onBackClick: () => void;
  places: planListAllPlaceItem[][];
}

export default function OverallLeftSection({
  onBackClick,
  places,
}: overallLeftSectionProp) {
  // savedPlaces는 북마크 되어있는 장소들을 의미해서 여기에서 그냥 한번 더 가져온다. 추후에 리팩터링 가능
  const [savedPlaces, setSavedPlaces] = useState<planListAllPlaceItem[]>([]);

  useEffect(() => {
    const loadSavedPlaces = async () => {
      try {
        const data = await fetchSavedPlaces();
        setSavedPlaces(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadSavedPlaces();
  }, []);

  return (
    <div id="overall-left-section" className="w-[35%] bg-[#F3F5FF] flex">
      <div
        id="tag-area"
        className="w-[100px] flex flex-col justify-start items-end pt-[30px]"
      >
        <p
          className="bg-[#B1B1B1] w-[72px] h-[90px] flex justify-center items-center rounded-tl-lg rounded-bl-lg hover:cursor-pointer"
          onClick={onBackClick}
        >
          전체일정
        </p>
      </div>
      <div
        id="places-area"
        className="grow flex flex-col bg-white overflow-y-scroll scroll-box"
      >
        <div className="w-full flex justify-between items-center mb-10">
          <span>여행지</span>
          <span>
            {formatDateToYYYYMMDD(
              localStorage.getItem('travelPlanStartDate') as string
            )}
            ~
            {formatDateToYYYYMMDD(
              localStorage.getItem('travelPlanEndDate') as string
            )}
          </span>
        </div>
        <span className="mb-5">저장된 장소</span>
        {savedPlaces.map((savedPlacesItems, idx) => {
          return (
            <div
              key={savedPlacesItems.id}
              className="flex justify-between items-center"
            >
              <img
                src={savedPlacesItems.imageUrl}
                alt="장소"
                className="w-[80%] h-[80%]"
              />
              <span id="장소 이름">{savedPlacesItems.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
