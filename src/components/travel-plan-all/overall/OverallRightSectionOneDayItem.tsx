import { planListAllPlaceItem } from '@_types/type';

interface overallRightSectionOneDayItemProps {
  placeList: planListAllPlaceItem[];
  dayIndex: number;
}

export default function OverallRightSectionOneDayItem({
  placeList,
  dayIndex,
}: overallRightSectionOneDayItemProps) {
  return (
    <div className="w-fit min-w-[500px] h-full flex flex-col justify-start items-center">
      <div className="mt-[35px] mb-[60px] w-full text-black font-main">
        Day{dayIndex}
      </div>

      {placeList.map((placeListItem) => (
        <div
          key={placeListItem.id}
          id="placeListItem-container"
          className="flex flex-col w-full h-[300px] mb-[60px]"
        >
          <div className="flex justify-between items-center">
            <span>{placeListItem.name}</span>
            {/* 위, 아래와 삭제 버튼이 위치하면 됩니다. */}
          </div>
          <img
            src={placeListItem.imageUrl}
            alt="장소이미지"
            className="w-[80%] h-[80%]"
          />
        </div>
      ))}
    </div>
  );
}
