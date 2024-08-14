import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TravelPlanPage() {
  const { travelPlanId } = useParams();

  useEffect(() => {
    async function getSpecificPlanData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan/${travelPlanId}`
      );

      if (!response.ok) {
        throw new Error('여행 계획 세부 정보를 가져오는 데에 실패했습니다!');
      }
      const data = await response.json();

      console.log(data);
    }

    getSpecificPlanData();
  }, []);

  return <div>This is travel plan page</div>;
}
