import { TravelPlanDetailsProps } from '@_types/type';
import OverallLeftSection from './overall/OverallLeftSection';
import OverallRightSection from './overall/OverallRightSection';

export default function TravelPlanDetails({
  onBackClick,
  places,
  travelPlanName,
  travelStartDate,
  travelEndDate,
}: TravelPlanDetailsProps) {
  return (
    <>
      <OverallLeftSection
        onBackClick={onBackClick}
        places={places}
        travelPlanName={travelPlanName}
        travelStartDate={travelStartDate}
        travelEndDate={travelEndDate}
      />
      <OverallRightSection places={places} />
    </>
  );
}
