import { SelectPlacePlaceProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@context/store';

export default function SelectPlacePlaceListComponent({
  places,
}: SelectPlacePlaceProps) {
  const navigate = useNavigate();

  const selectedMainAreaId: number | null = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );

  console.log(selectedMainAreaId);

  return (
    <div className="bg-dftBackgroundGray flex justify-center">
      <div className="w-full flex flex-col items-center pt-9 rounded-lg overflow-scroll scroll-box">
        {places.map((place) => (
          <div
            key={place.id}
            className="flex items-center w-[90%] h-[150px] mb-4 py-3.5 pl-10 pr-5 rounded-lg bg-white hover:cursor-pointer"
            onClick={() => navigate(`/chatroom/${place.id}`)}
          >
            <img
              src={place.imageUrl}
              alt="장소 사진"
              className="w-52 h-full rounded-lg object-cover my-3.5"
            />
            <div className="flex-grow flex items-center justify-center">
              <h2 className="text-2xl text-textPurple font-bold font-main">
                {place.name}
              </h2>
            </div>
            <div className="flex flex-col items-center mt-2">
              <img
                src="/assets/bookmark.svg"
                alt="저장 버튼"
                className="w-10 h-10 mb-2 hover:cursor-pointer"
              />
              <img
                src="/assets/Message.svg"
                alt="댓글 개수"
                className="w-10 h-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
