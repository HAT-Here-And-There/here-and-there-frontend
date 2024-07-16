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
    <div className="bg-gray-200 h-full flex justify-center grow ">
      <div id="day-selectionarea" className="!w-12">
        {[...Array(totalTravelDay).keys()]
          .map((i) => i + 1)
          .map((dayIndex) => (
            <div key={dayIndex} onClick={() => handleSelectedDay(dayIndex - 1)}>
              {dayIndex}일 차
            </div>
          ))}
      </div>
      <div className="bg-white  flex flex-col items-center overflow-scroll scroll-box">
        {places &&
          places.map((place, index) => (
            <div
              key={place.id}
              className="flex flex-col w-[90%] mb-4 py-6 pl-20 pr-5 rounded-lg bg-white hover:cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <h2
                  className="text-2xl font-bold font-main"
                  onClick={() => onPlaceClick(place.id, places)}
                >
                  {place.name}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    className="px-2 py-1 rounded disabled:opacity-50"
                  >
                    <img src="/assets/UP.svg" alt="위로" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => onMoveDown(index)}
                    disabled={index === places.length - 1}
                    className="px-2 py-1 rounded disabled:opacity-50"
                  >
                    <img
                      src="/assets/DOWN.svg"
                      alt="아래로"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="px-2 py-1 rounded"
                  >
                    <img
                      src="/assets/delete-icon.svg"
                      alt="삭제"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
              <img
                src={place.imageUrl}
                alt="장소 사진"
                className="w-80 h-[150px] object-cover my-3.5"
                onClick={() => onPlaceClick(place.id, places)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
