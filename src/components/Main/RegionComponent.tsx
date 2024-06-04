import { RegionComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';

export default function RegionComponent({ regions }: RegionComponentProps) {
  const navigate = useNavigate();

  if (!regions || regions.length === 0) {
    return <div>No regions available.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center py-24 bg-white">
      <div className="grid grid-cols-2 gap-10 ">
        {regions.map((region) => (
          <div key={region.id} className="relative w-[560px] h-[350px]">
            <img
              src={region.imageUrl}
              alt={region.name}
              className="rounded-lg hover:cursor-pointer object-cover w-full h-3/4"
              onClick={() => navigate(`/select-place`)} // 해당 핸들러 함수에서 전역으로 선택된 권역 상태를 바꿔줘야 한다
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-75 text-black p-4 rounded-b-lg">
              <p className="font-main text-xl mb-2 font-bold">{region.name}</p>
              <p className="font-custom text-textPurple text-sm">
                #해당 지역 인기 장소1 #해당 지역 인기 장소2 #해당 지역 인기
                장소3
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
