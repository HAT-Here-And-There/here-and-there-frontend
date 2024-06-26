import { MainEightRegionComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@context/store';
import { changeMainArea } from '@context/slices/select-place-slice';

export default function MainEightRegionListComponent({
  regions,
}: MainEightRegionComponentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
              onClick={() => {
                navigate(`/select-place`);
                dispatch(changeMainArea(region.id)); // 전역 상태를 변경
              }}
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
