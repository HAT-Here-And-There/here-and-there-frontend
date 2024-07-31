import { formatDateToYYYYMMDD } from '@utils/date';
import { planListAllPlaceItem } from '@_types/type';
import { useState, useEffect } from 'react';
import { fetchSavedPlaces } from '@utils/fetchFunctions';
import { useNavigate } from 'react-router-dom';

interface overallLeftSectionProp {
  onBackClick: () => void;
  places: planListAllPlaceItem[][];
  travelPlanName: string;
  travelStartDate: Date;
  travelEndDate: Date;
}

export default function OverallLeftSection({
  onBackClick,
  places,
  travelPlanName,
  travelStartDate,
  travelEndDate,
}: overallLeftSectionProp) {
  const [savedPlaces, setSavedPlaces] = useState<planListAllPlaceItem[]>([]);
  const navigate = useNavigate();

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

  const handleSaveTravelPlan = async () => {
    const sendingTravelPlanObject = {
      name: travelPlanName,
      startDate: formatDateToYYYYMMDD(travelStartDate.toDateString()),
      endDate: formatDateToYYYYMMDD(travelEndDate.toDateString()),
      dailyPlans: places.map((place) => ({
        dailyPlanItems: place.map((placeItem) => ({
          placeId: placeItem.id,
          memo: '',
        })),
      })),
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendingTravelPlanObject),
      }
    );

    if (!response.ok) {
      throw new Error('여행 계획 저장이 실패했습니다.');
    } else {
      localStorage.removeItem('travelPlanName');
      localStorage.removeItem('travelPlanStartDate');
      localStorage.removeItem('travelPlanEndDate');
      navigate('/travel-plans-list');
    }
  };

  return (
    <div
      id="overall-left-section"
      className="w-[35%] bg-[#F3F5FF] flex font-main"
    >
      <div
        id="tag-area"
        className="w-[52px] flex flex-col justify-start items-end pt-4"
      >
        <div className="bg-white w-[50px] h-[50px] flex flex-col justify-center items-center rounded-md hover:cursor-pointer">
          <img
            src="/assets/Arrow.svg"
            alt="뒤로 가기"
            className="w-10 h-10"
            onClick={onBackClick}
          />
        </div>
        <div className='pb-4'> </div>
        <p
          className="bg-[#B1B1B1] w-[52px] h-[102px] flex flex-col justify-center items-center rounded-tl-2xl rounded-bl-2xl"
        >
          <span>전체</span>
          <span>일정</span>
        </p>
      </div>
      <div
        id="places-area"
        className="grow flex flex-col bg-white w-[375px] mr-2 rounded-xl overflow-y-scroll scroll-box items-center"
      >
        <div className="w-full flex justify-between items-center my-10">
          <span className="text-4xl ml-6">여행지</span>
          <span className="text-gray-400 text-xl mr-6">
            {formatDateToYYYYMMDD(
              localStorage.getItem('travelPlanStartDate') as string
            )}
            ~
            {formatDateToYYYYMMDD(
              localStorage.getItem('travelPlanEndDate') as string
            )}
          </span>
        </div>
        <span className="text-2xl font-text font-bold mb-5 w-full ml-12">저장된 장소</span>
        {savedPlaces.map((savedPlacesItems) => {
          return (
            <div
              key={savedPlacesItems.id}
              className="flex items-center w-[90%] mb-6"
            >
              <div className="flex-shrink-0 mr-4">
                <img
                  src={savedPlacesItems.imageUrl}
                  alt="장소"
                  className="w-44 h-24 object-cover rounded-xl"
                />
              </div>
              <span id="장소 이름" className="text-xl text-center w-full">
                {savedPlacesItems.name}
              </span>
            </div>
          );
        })}

        <button
          className="w-[80%] h-14 flex-shrink-0 rounded-lg text-[25px] text-white bg-textPurple mt-6 mb-2"
          onClick={handleSaveTravelPlan}
        >
          계획 저장하기
        </button>
      </div>
    </div>
  );
}
