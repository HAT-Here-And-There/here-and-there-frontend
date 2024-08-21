import { useState, useEffect } from 'react';
import { fetchSavedPlaces } from '@utils/fetchFunctions';
import { travelPlanDataProp } from '@pages/TravelPlan';

interface travelPlanViewLeftSectionProps {
  travelPlanData: travelPlanDataProp | null;
  travelPlanId: number;
}

interface likedPlacesProp {
  id: string;
  name: string;
  imageUrl: string;
}

export default function TravelPlanViewLeftSection({
  travelPlanData,
  travelPlanId,
}: travelPlanViewLeftSectionProps) {
  console.log(travelPlanData);
  const [likedPlaces, setLikedPlaces] = useState<likedPlacesProp[] | null>(
    null
  );

  useEffect(() => {
    async function getLikedPlaces() {
      try {
        const likedPlacesData = await fetchSavedPlaces();

        setLikedPlaces(likedPlacesData);
      } catch (error) {
        console.log(error);
      }
    }

    getLikedPlaces();
  }, []);

  const patchTravelPlan = async (travelPlanId: number) => {
    const sendingObject = {
      dailyPlans: travelPlanData?.dailyPlans.map((element, idx) => {
        return {
          id: element.id,
          dailyPlanItems: element.dailyPlanItems,
        };
      }),
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/tour/plan/${travelPlanId}/daily-plans`,
        {
          method: 'PATCH',
          body: JSON.stringify(sendingObject),
        }
      );

      if (!response.ok) {
        throw new Error('patch 실패입니다!');
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[35%] flex flex-col items-center overflow-y-scroll scroll-box">
      <div className="w-full flex justify-between items-center px-2">
        <span className="font-main text-[32px]">{travelPlanData?.name}</span>
        <p className="font-main text-[20px] text-gray-400">
          {travelPlanData?.startDate} ~ {travelPlanData?.endDate}
        </p>
      </div>
      <div className="font-main text-2xl mt-5">저장된 장소</div>
      {likedPlaces &&
        likedPlaces.map((element) => {
          return (
            <div className="flex items-center w-[90%] mt-8" key={element.id}>
              <img
                src={element.imageUrl}
                alt="liked place image"
                className="w-44 h-24 object-cover rounded-xl"
              />
              <span className="text-xl text-center w-full font-main">
                {element.name}
              </span>
            </div>
          );
        })}
      <button
        className="w-[80%] h-14 flex-shrink-0 rounded-lg font-main text-[25px] text-white bg-textPurple mt-6 mb-2"
        onClick={() => patchTravelPlan(travelPlanId)}
      >
        계획 저장하기
      </button>
    </div>
  );
}
