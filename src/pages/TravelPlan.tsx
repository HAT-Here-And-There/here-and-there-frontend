import { useParams } from 'react-router-dom';

export default function TravelPlanPage() {
  const { travelPlanName } = useParams();

  return <div>This is travel plan {travelPlanName} page</div>;
}
