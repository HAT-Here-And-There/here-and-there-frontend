import { useState } from 'react';
import { planListAllPlaceItem } from '@_types/type';
import OverallRightSectionOneDayItem from './OverallRightSectionOneDayItem';

interface overallRightSectionProps {
  places: planListAllPlaceItem[][];
}

export default function OverallRightSection({ places }: overallRightSectionProps) {
  const [placeList, setPlaceList] = useState(places);

  const handleMoveUp = (dayIndex: number, placeIndex: number) => {
    if (placeIndex > 0) {
      const updatedPlaces = [...placeList];
      const temp = updatedPlaces[dayIndex][placeIndex - 1];
      updatedPlaces[dayIndex][placeIndex - 1] = updatedPlaces[dayIndex][placeIndex];
      updatedPlaces[dayIndex][placeIndex] = temp;
      setPlaceList(updatedPlaces);
    }
  };

  const handleMoveDown = (dayIndex: number, placeIndex: number) => {
    if (placeIndex < placeList[dayIndex].length - 1) {
      const updatedPlaces = [...placeList];
      const temp = updatedPlaces[dayIndex][placeIndex + 1];
      updatedPlaces[dayIndex][placeIndex + 1] = updatedPlaces[dayIndex][placeIndex];
      updatedPlaces[dayIndex][placeIndex] = temp;
      setPlaceList(updatedPlaces);
    }
  };

  const handleDelete = (dayIndex: number, placeIndex: number) => {
    const updatedPlaces = placeList.map((dayPlaces, index) => {
      if (index === dayIndex) {
        return dayPlaces.filter((_, idx) => idx !== placeIndex);
      }
      return dayPlaces;
    });
    setPlaceList(updatedPlaces);
  };

  return (
    <div id="overall-right-section" className="w-[65%] h-full travel-plan-scroll-box flex font-main overflow-x-auto">
      {placeList.map((place, idx) => (
        <OverallRightSectionOneDayItem
          key={idx}
          placeList={place}
          dayIndex={idx}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
