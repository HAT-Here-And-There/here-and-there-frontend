import { PlaceComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';

export default function PlaceComponent({ places }: PlaceComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="grow flex flex-col px-80 py-20 bg-dftBackgroundGray">
      <div>
        <h2 className="text-3xl font-main text-center tracking-tight text-gray-900">
          여기저기 여행을 시작해보세요!
        </h2>
        <p className="mt-4 mb-4 font-main text-center text-gray-500">
          지금 대한민국에서{' '}
          <span className="text-red-300">인기 많은 여행지</span>는 어디일까요?
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {places.map((place, index) => (
          <div 
            key={place.id} 
            className="relative pb-[100%] overflow-hidden rounded-lg bg-gray-100 hover:cursor-pointer"
            onClick={() => navigate(`/chatroom/${place.id}`)}
          >
            <img
              src={place.imageUrl}
              alt={place.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gray-800 text-white text-center py-2">
              Top. {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
