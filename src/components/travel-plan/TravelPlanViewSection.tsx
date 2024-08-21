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
  travelPlanId: number;
}

export default function TravelPlanViewSections({
  travelPlanData,
  handleTravelPlanData,
  travelPlanId,
}: travelPlanViewSectionsProps) {
  return (
    <section className="w-full flex h-[calc(100vh-160px)]">
      <TravelPlanViewLeftSection
        travelPlanData={travelPlanData}
        travelPlanId={travelPlanId}
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
