import { PlaceComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';

export default function PlaceComponent({ places }: PlaceComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="grow flex flex-col px-80 justify-center bg-dftBackgroundGray">
      <div>
        <h2 className="text-2xl font-main text-center tracking-tight text-gray-900 sm:text-4xl">
          여기저기 여행을 시작해보세요!
        </h2>
        <p className="mt-4 mb-4 font-main text-center text-gray-500">
          지금 대한민국에서{' '}
          <span className="text-red-300 ">인기 많은 여행지</span>는 어디일까요?
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
  );
}
