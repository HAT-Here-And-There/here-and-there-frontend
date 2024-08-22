import { SelectPlacePlace } from '@_types/type';
import BookmarkedPlaceListItem from './BookmarkedPlaceListItem';

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
    <div className="h-full w-full flex">
      <div
        id="day-selectionarea"
        className="w-[65px] h-full flex flex-col items-end bg-gray-200 pt-3"
      >
        {[...Array(totalTravelDay).keys()]
          .map((i) => i + 1)
          .map((dayIndex) => (
            <div
              key={dayIndex}
              onClick={() => handleSelectedDay(dayIndex - 1)}
              className="bg-[#ffabab] mb-3 text-2 w-[90%] h-12 rounded-tl-lg rounded-bl-lg flex justify-center items-center cursor-pointer"
            >
              {dayIndex}일 차
            </div>
          ))}
      </div>
      <div className="bg-white grow flex flex-col items-center overflow-auto border border-t-0 border-black border-b-[5px]">
        {places &&
          places.map((place, index) => (
            <BookmarkedPlaceListItem
              key={place.id}
              place={place}
              index={index}
              onPlaceClick={(placeId) => onPlaceClick(placeId, places)}
              onMoveUp={() => onMoveUp(index)}
              onMoveDown={() => onMoveDown(index)}
              onDelete={() => onDelete(index)}
              isFirst={index === 0}
              isLast={index === places.length - 1}
            />
          ))}
      </div>
    </div>
  );
}
