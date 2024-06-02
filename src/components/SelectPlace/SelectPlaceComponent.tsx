import { PlaceComponentProps } from '@_types/type';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { changeRegion, changeCity } from '@context/slices/select-place-slice'; 해당 action creator는 추후에 사용
import { RootState } from '@context/store';

export default function SelectPlaceComponent({ places }: PlaceComponentProps) {
  const navigate = useNavigate();
  const selectedRegion = useSelector(
    (state: RootState) => state.selectPlace.selectedRegion
  );

  const selectedCity = useSelector(
    (state: RootState) => state.selectPlace.selectedCity
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(places);
  }, []);

  const handleSave = (placeId: number) => {
    // 북마크 버튼 클릭 시 장소 저장할 로직을 추가하기
    console.log(`Saved place with ID: ${placeId}`);
  };

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
                onClick={() => {
                  handleSave(place.id);
                }}
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
