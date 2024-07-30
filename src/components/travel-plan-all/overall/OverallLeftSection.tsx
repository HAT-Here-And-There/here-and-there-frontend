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
  // savedPlaces는 북마크 되어있는 장소들을 의미해서 여기에서 그냥 한번 더 가져온다. 추후에 리팩터링 가능
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
    // 백엔드 엔드포인트로 전송하고, 로컬 스토리지를 비우는 로직. 추후에 travel-plans-list 페이지로 이동
    const sendingTravelPlanObject = {
      name: travelPlanName,
      startDate: travelStartDate.toDateString(),
      endDate: travelEndDate.toDateString(),
      dailyPlans: places,
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
        className="grow flex flex-col bg-white overflow-y-scroll scroll-box items-center"
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
        <span className="mb-5 w-full">저장된 장소</span>
        {savedPlaces.map((savedPlacesItems, idx) => {
          return (
            <div
              key={savedPlacesItems.id}
              className="flex justify-between items-center w-[90%] mb-[30px]"
            >
              <div className="grow">
                <img
                  src={savedPlacesItems.imageUrl}
                  alt="장소"
                  className="object-none rounded-xl"
                />
              </div>

              <span id="장소 이름" className="min-w-[30%] text-center">
                {savedPlacesItems.name}
              </span>
            </div>
          );
        })}

        <button
          className="w-[80%] rounded-lg text-[25px] text-white bg-textPurple"
          onClick={handleSaveTravelPlan}
        >
          계획 저장하기
        </button>
      </div>
    </div>
  );
}
