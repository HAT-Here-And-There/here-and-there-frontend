import { useAppSelector } from '@context/store';

export default function TravelPlanPage() {
  const travelPlanName = useAppSelector((state) => state.travelPlan.name);
  const travelStartDate = useAppSelector((state) => state.travelPlan.startDate);
  const travelEndDate = useAppSelector((state) => state.travelPlan.endDate);

  console.log(travelPlanName);
  console.log(travelStartDate);
  console.log(travelEndDate);
  return <div>This is travel plan page</div>;
}
