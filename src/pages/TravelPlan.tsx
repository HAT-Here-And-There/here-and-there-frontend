import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@components/all/Header';
import Footer from '@components/all/Footer';
import TravelPlanViewSections from '@components/travel-plan/TravelPlanViewSection';

interface dailyPlanItemsProps {
  id: number; // 백엔드에서 부여한 고유 ID임
  memo: string;
  place: {
    id: string; // 장소에 대한 숫자 id를 문자열로 직렬화해서 보내준 것임
    imageUrl: string;
    name: string;
  };
}

export interface dailyPlansProps {
  id: number; // 특정 날짜 일정에 대한 id
  dayNumber: number; // 1부터 오름차순으로 올라감
  date: string;
  dailyPlanItems: dailyPlanItemsProps[];
}

export interface travelPlanDataProp {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  dailyPlans: dailyPlansProps[];
}

export default function TravelPlanPage() {
  const { travelPlanId } = useParams();
  const [travelPlanData, setTravelPlanData] =
    useState<travelPlanDataProp | null>(null);

  useEffect(() => {
    async function getSpecificPlanData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan/${travelPlanId}`
      );

      if (!response.ok) {
        throw new Error('여행 계획 세부 정보를 가져오는 데에 실패했습니다!');
      }
      const data = await response.json();

      setTravelPlanData(data);
    }

    getSpecificPlanData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <TravelPlanViewSections
        travelPlanData={travelPlanData}
        handleTravelPlanData={setTravelPlanData}
      />
      <Footer />
    </div>
  );
}
