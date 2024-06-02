import { RegionComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';

export default function RegionComponent({ regions }: RegionComponentProps) {
  const navigate = useNavigate();

  if (!regions || regions.length === 0) {
    return <div>No regions available.</div>;
  }

  return (
    <div className="grow flex flex-col justify-center items-center pt-[100px] pb-[70px] bg-white">
      <div className="grid grid-cols-2 gap-10">
        {regions.map((region) => (
          <div key={region.id} className="relative w-[350px] h-[175px]">
            <img
              src={region.imageUrl}
              alt={region.name}
              className="rounded-lg bg-gray-100 hover:cursor-pointer object-cover"
              onClick={() => navigate(`/select-place/${region.id}`)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 text-black p-4 rounded-b-lg">
              <p className="font-main text-xl mb-2 font-bold">
                {region.areaName}
              </p>
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
