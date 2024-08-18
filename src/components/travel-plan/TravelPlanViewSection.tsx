import { travelPlanDataProp } from '@pages/TravelPlan';
import TravelPlanViewLeftSection from './TravelPlanViewLeftSection';
import TravelPlanViewRightSection from './TravelPlanViewRightSection';

interface travelPlanViewSectionsProps {
  travelPlanData: travelPlanDataProp | null;
}

export default function TravelPlanViewSections({
  travelPlanData,
}: travelPlanViewSectionsProps) {
  return (
    <section className="w-full flex h-[calc(100vh-160px)]">
      <TravelPlanViewLeftSection
        name={travelPlanData?.name}
        startDate={travelPlanData?.startDate}
        endDate={travelPlanData?.endDate}
      />
      {travelPlanData?.dailyPlans && (
        <TravelPlanViewRightSection dailyPlans={travelPlanData?.dailyPlans} />
      )}
    </section>
  );
}
