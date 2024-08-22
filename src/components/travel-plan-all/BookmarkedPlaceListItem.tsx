import { SelectPlacePlace } from '@_types/type';

interface BookmarkedPlaceListItemProps {
  place: SelectPlacePlace;
  index: number;
  onPlaceClick: (placeId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function BookmarkedPlaceListItem({
  place,
  index,
  onPlaceClick,
  onMoveUp,
  onMoveDown,
  onDelete,
  isFirst,
  isLast,
}: BookmarkedPlaceListItemProps) {
  return (
    <div className="flex flex-col rounded-lg bg-white hover:cursor-pointer my-10">
      <div className="flex justify-between items-center">
        <h2
          className="text-lg font-bold font-main cursor-pointer"
          onClick={() => onPlaceClick(place.id)}
        >
          {place.name}
        </h2>
        <div className="flex">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="px-2 py-1 rounded disabled:opacity-50"
          >
            <img src="/assets/UP.svg" alt="위로" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="px-2 py-1 rounded disabled:opacity-50"
          >
            <img src="/assets/DOWN.svg" alt="아래로" />
          </button>
          <button onClick={onDelete}>
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
        className="w-[305px] h-[150px] object-cover cursor-pointer"
        onClick={() => onPlaceClick(place.id)}
      />
    </div>
  );
}
