import { PlaceComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';

export default function PlaceComponent({ places }: PlaceComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-dftBackgroundGray">
      <div className="mx-auto max-w-2xl grid grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-1 lg:px-8">
        <div>
          <h2 className="text-2xl font-custom text-center tracking-tight text-gray-900 sm:text-4xl">
            여기저기 여행을 시작해보세요!
          </h2>
          <p className="mt-4 font-custom text-center text-gray-500">
            지금 대한민국에서{' '}
            <span className="text-red-300">인기 많은 여행지</span>는 어디일까요?
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {places.map((place) => (
            <img
              key={place.id}
              src={place.imageUrl}
              alt={place.name}
              className="rounded-lg bg-gray-100 hover:cursor-pointer"
              onClick={() => navigate(`/chatroom/${place.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
