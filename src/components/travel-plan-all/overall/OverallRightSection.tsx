import { useEffect } from 'react';
import { planListAllPlaceItem } from '@_types/type';
import OverallRightSectionOneDayItem from './OverallRightSectionOneDayItem';
import { useAppSelector, useAppDispatch } from '@context/store';
import { addPlaceToDay, setPlaces } from '@context/slices/plan-list-slice';

interface overallRightSectionProps {
  places: planListAllPlaceItem[][];
}

export default function OverallRightSection({
  places,
}: overallRightSectionProps) {
  const dispatch = useAppDispatch();
  const placeList = useAppSelector((state) => state.planList.places); // Redux 상태로 placeList를 가져옴
  const selectedPlace = useAppSelector((state) => state.planList.selectedPlace);

  useEffect(() => {
    // 컴포넌트가 마운트될 때만 초기화
    if (places.length > 0) {
      dispatch(setPlaces(places));  // Redux의 places 상태를 초기화
    }
  }, [dispatch, places]);

  const handleMoveUp = (dayIndex: number, placeIndex: number) => {
    if (placeIndex > 0) {
      const updatedPlaces = [...placeList];
      const temp = updatedPlaces[dayIndex][placeIndex - 1];
      updatedPlaces[dayIndex][placeIndex - 1] =
        updatedPlaces[dayIndex][placeIndex];
      updatedPlaces[dayIndex][placeIndex] = temp;
      dispatch(setPlaces(updatedPlaces));
    }
  };

  const handleMoveDown = (dayIndex: number, placeIndex: number) => {
    if (placeIndex < placeList[dayIndex].length - 1) {
      const updatedPlaces = [...placeList];
      const temp = updatedPlaces[dayIndex][placeIndex + 1];
      updatedPlaces[dayIndex][placeIndex + 1] =
        updatedPlaces[dayIndex][placeIndex];
      updatedPlaces[dayIndex][placeIndex] = temp;
      dispatch(setPlaces(updatedPlaces));
    }
  };

  const handleDelete = (dayIndex: number, placeIndex: number) => {
    const updatedPlaces = placeList.map((dayPlaces, index) => {
      if (index === dayIndex) {
        return dayPlaces.filter((_, idx) => idx !== placeIndex);
      }
      return dayPlaces;
    });
    dispatch(setPlaces(updatedPlaces));
  };

  const handleAddPlace = (
    dayIndex: number,
    placeIndex: number,
    newPlace: planListAllPlaceItem
  ) => {
    dispatch(addPlaceToDay({ dayIndex, placeIndex, newPlace }));
  };

  return (
    <div
      id="overall-right-section"
      className="w-[65%] h-full travel-plan-scroll-box flex bg-planListGray font-main overflow-x-auto"
    >
      {placeList.map((place, idx) => (
        <OverallRightSectionOneDayItem
          key={`day-${idx}`} // 고유한 키 값 생성
          placeList={place}
          dayIndex={idx}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDelete={handleDelete}
          onAddPlace={handleAddPlace}
          selectedPlace={selectedPlace}
        />
      ))}
    </div>
  );
}
