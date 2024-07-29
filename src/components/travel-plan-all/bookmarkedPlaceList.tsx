import { SelectPlacePlace } from '@_types/type';

interface planListAllPlaceItem {
  id: string;
  name: string;
  imageUrl: string;
}

interface BookmarkedPlaceListProps {
  totalTravelDay: number;
  onPlaceClick: (
    placeId: string,
    bookMarkedPlaces: planListAllPlaceItem[]
  ) => void;
  places: SelectPlacePlace[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
  handleSelectedDay: (dayIndex: number) => void;
}

export default function BookmarkedPlaceList({
  totalTravelDay,
  onPlaceClick,
  places,
  onMoveUp,
  onMoveDown,
  onDelete,
  handleSelectedDay,
}: BookmarkedPlaceListProps) {
  return (
    <div className=" h-full w-full flex">
      <div id="day-selectionarea" className="!w-[60px] h-full bg-gray-200">
        {[...Array(totalTravelDay).keys()]
          .map((i) => i + 1)
          .map((dayIndex) => (
            <div key={dayIndex} onClick={() => handleSelectedDay(dayIndex - 1)}>
              {dayIndex}일 차
            </div>
          ))}
      </div>
      <div className="bg-white grow flex flex-col items-center scroll-box">
        {places &&
          places.map((place, index) => {
            return (
              <div
                key={place.id}
                className="flex flex-col rounded-lg bg-white hover:cursor-pointer mb-10"
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="text-lg font-bold font-main"
                    onClick={() => onPlaceClick(place.id, places)}
                  >
                    {place.name}
                  </h2>
                  <div className="flex">
                    <button
                      onClick={() => onMoveUp(index)}
                      disabled={index === 0}
                      className="px-2 py-1 rounded disabled:opacity-50"
                    >
                      <img src="/assets/UP.svg" alt="위로" className="" />
                    </button>
                    <button
                      onClick={() => onMoveDown(index)}
                      disabled={index === places.length - 1}
                      className="px-2 py-1 rounded disabled:opacity-50"
                    >
                      <img src="/assets/DOWN.svg" alt="아래로" />
                    </button>
                    <button onClick={() => onDelete(index)}>
                      <img
                        src="/assets/delete-icon.svg"
                        alt="삭제"
                        className="w-6 h-6 object-cover"
                      />
                    </button>
                  </div>
                </div>
                <img
                  src={place.imageUrl}
                  alt="장소 사진"
                  className="w-full !h-[150px] object-cover"
                  onClick={() => onPlaceClick(place.id, places)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
