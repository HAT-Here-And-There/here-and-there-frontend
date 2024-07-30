import { planListAllPlaceItem } from '@_types/type';
import OverallRightSectionOneDayItem from './OverallRightSectionOneDayItem';

interface overallRightSectionProps {
  places: planListAllPlaceItem[][];
}

export default function OverallRightSection({
  places,
}: overallRightSectionProps) {
  return (
    <div
      id="overall-right-section"
      className="w-[65%] travel-plan-scroll-box flex font-main"
    >
      {places.map((place, idx) => (
        <OverallRightSectionOneDayItem
          key={idx}
          placeList={place}
          dayIndex={idx + 1}
        />
      ))}
    </div>
  );
}
