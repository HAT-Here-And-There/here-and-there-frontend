import { planListAllPlaceItem } from '@_types/type';
import { useAppDispatch } from '@context/store';
import { updateMemo } from '@context/slices/plan-list-slice';

interface overallRightSectionOneDayItemProps {
  placeList: planListAllPlaceItem[];
  dayIndex: number;
  onMoveUp: (dayIndex: number, placeIndex: number) => void;
  onMoveDown: (dayIndex: number, placeIndex: number) => void;
  onDelete: (dayIndex: number, placeIndex: number) => void;
  onAddPlace: (
    dayIndex: number,
    placeIndex: number,
    newPlace: planListAllPlaceItem
  ) => void;
  selectedPlace: planListAllPlaceItem | null;
}

export default function OverallRightSectionOneDayItem({
  placeList,
  dayIndex,
  onMoveUp,
  onMoveDown,
  onDelete,
  onAddPlace,
  selectedPlace,
}: overallRightSectionOneDayItemProps) {
  const dispatch = useAppDispatch();

  const handleMemoChange = (dayIndex: number, placeIndex: number, memo: string) => {
    dispatch(updateMemo({ dayIndex, placeIndex, memo }));
  };

  return (
    <div className="w-fit min-w-[500px] h-auto flex flex-col pt-5 pl-10 border-t-[5px] border-r-[1px] border-b-[5px] border-l-[1px] border-black rounded-lg bg-white overflow-y-auto">
      <div className="mb-6 text-black text-xl font-main">
        Day {dayIndex + 1}
      </div>
      <div className="relative w-full flex-grow">
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-black"></div>
        {placeList.map((placeListItem, placeIndex) => (
          <div
            key={`${placeListItem.id}-${placeIndex}`}
            className="flex w-full relative mb-12 items-start"
          >
            {/* 장소 추가 버튼 퍼블리싱 */}
            {selectedPlace && (
              <button
                onClick={() => onAddPlace(dayIndex, placeIndex, selectedPlace)}
                className="absolute left-1 flex items-center"
              >
                <img
                  src="/assets/Add-icon.svg"
                  alt="장소 추가"
                  className="w-6 h-6 mr-2"
                />
              </button>
            )}
            {/* 장소 정보 및 장소 순서 변경 버튼 */}
            <div className="flex-grow flex flex-col ml-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold font-main ml-14">
                    {placeListItem.name}
                  </h2>
                </div>
                <div className="flex mr-10">
                  <button
                    onClick={() => onMoveUp(dayIndex, placeIndex)}
                    disabled={placeIndex === 0}
                    className="px-1 rounded"
                  >
                    <img src="/assets/UP.svg" alt="위로" />
                  </button>
                  <button
                    onClick={() => onMoveDown(dayIndex, placeIndex)}
                    disabled={placeIndex === placeList.length - 1}
                    className="px-1 rounded"
                  >
                    <img src="/assets/DOWN.svg" alt="아래로" />
                  </button>
                  <button
                    onClick={() => onDelete(dayIndex, placeIndex)}
                    className="px-5"
                  >
                    <img
                      src="/assets/delete-icon.svg"
                      alt="삭제"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-center relative">
                <img
                  src={placeListItem.imageUrl}
                  alt="장소이미지"
                  className="w-[305px] h-[132px] rounded-xl object-cover"
                />
              </div>
              {/* 메모장 기능 */}
              <div className="mt-2 flex justify-center">
                <textarea
                  className="w-[305px] h-[50px] rounded-xl border border-gray-300 p-2"
                  placeholder="메모장"
                  value={placeListItem.memo || ''}
                  onChange={(e) =>
                    handleMemoChange(dayIndex, placeIndex, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
