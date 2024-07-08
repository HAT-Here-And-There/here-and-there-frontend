import { BookmarkedPlaceListProps } from '@_types/type';

export default function BookmarkedPlaceList({
  onPlaceClick,
  places,
  onMoveUp,
  onMoveDown,
  onDelete,
}: BookmarkedPlaceListProps) {
  return (
    <div className="bg-gray-200 h-full flex justify-center grow pl-12">
      <div className="bg-white w-[450px] flex flex-col items-center overflow-scroll scroll-box">
        {places.map((place, index) => (
          <div
            key={place.id}
            className="flex flex-col w-[90%] mb-4 py-6 pl-20 pr-5 rounded-lg bg-white hover:cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <h2
                className="text-lg font-bold font-main"
                onClick={() => onPlaceClick(place.id)}
              >
                {place.name}
              </h2>
              <div className="flex">
                <button
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  className="px-1 disabled:opacity-50"
                >
                  <img src="/assets/UP.svg" alt="위로" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === places.length - 1}
                  className="px-1 disabled:opacity-50"
                >
                  <img
                    src="/assets/DOWN.svg"
                    alt="아래로"
                    className="w-6 h-6"
                  />
                </button>
                <button onClick={() => onDelete(index)} className="px-2">
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
              onClick={() => onPlaceClick(place.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
