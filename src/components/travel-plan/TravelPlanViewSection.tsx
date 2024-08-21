import { travelPlanDataProp } from '@pages/TravelPlan';
import TravelPlanViewLeftSection from './TravelPlanViewLeftSection';
import TravelPlanViewRightSection from './TravelPlanViewRightSection';
import { SetStateAction, Dispatch } from 'react';

interface hocTravelPlanDataPropSignature {
  (prevData: travelPlanDataProp): travelPlanDataProp;
}

interface travelPlanViewSectionsProps {
  travelPlanData: travelPlanDataProp | null;
  handleTravelPlanData: Dispatch<SetStateAction<travelPlanDataProp | null>>;
}

export default function TravelPlanViewSections({
  travelPlanData,
  handleTravelPlanData,
}: travelPlanViewSectionsProps) {
  return (
    <section className="w-full flex h-[calc(100vh-160px)]">
      <TravelPlanViewLeftSection
        name={travelPlanData?.name}
        startDate={travelPlanData?.startDate}
        endDate={travelPlanData?.endDate}
      />
      {travelPlanData?.dailyPlans && (
        <TravelPlanViewRightSection
          dailyPlans={travelPlanData?.dailyPlans}
          handleTravelPlanData={handleTravelPlanData}
        />
      )}
    </section>
  );
}
