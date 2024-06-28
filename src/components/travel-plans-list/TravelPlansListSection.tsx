import { useState, useEffect } from 'react';
import { travelPlanProp } from '@_types/type';

export default function TravelPlansListSection() {
  const [travelPlanList, setTravelPlanList] = useState<travelPlanProp[]>([]);

  useEffect(() => {
    async function getTravelPlanList() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan`
      );

      if (response.ok) {
        const data = await response.json();
        setTravelPlanList(data);
      } else {
        console.log(response);
        throw new Error('fetching travel plan list is failed!');
      }
    }

    try {
      getTravelPlanList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(travelPlanList);
  return (
    <main className="h-travelListSection flex flex-col items-center mt-20">
      <p className="w-[70%] text-2xl font-main mb-[20px]">
        여행 계획서 둘러보기
      </p>
    </main>
  );
}
