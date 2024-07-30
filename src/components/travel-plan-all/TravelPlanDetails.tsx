import { TravelPlanDetailsProps } from '@_types/type';
import OverallLeftSection from './overall/OverallLeftSection';
import OverallRightSection from './overall/OverallRightSection';

export default function TravelPlanDetails({
  onBackClick,
  places,
}: TravelPlanDetailsProps) {
  return (
    <>
      <OverallLeftSection onBackClick={onBackClick} places={places} />
      <OverallRightSection places={places} />
    </>
  );
}
