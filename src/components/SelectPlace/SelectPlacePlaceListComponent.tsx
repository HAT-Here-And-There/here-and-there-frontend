import { useState, useEffect, useRef } from 'react';
import { SelectPlacePlaceProps, SelectPlacePlace } from '@_types/type';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@context/store';

interface selectPlacePlacePlaceListCompontProp extends SelectPlacePlaceProps {
  setSelectPlace: Dispatch<SetStateAction<SelectPlacePlace[]>>;
}

export default function SelectPlacePlaceListComponent({
  places,
  setSelectPlace,
}: selectPlacePlacePlaceListCompontProp) {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // mainAreaId는 1 ~ 8로, 서울 ~ 제주에 대응
  const selectedMainAreaId = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );
  // sigunGu는 mainAreaId와는 별개인 areaId, sigunguId(둘다 string)으로 이루어짐
  const selectedSelectedSigungu = useAppSelector(
    (state) => state.selectPlace.selectedSigungu
  );

  const fetchSavedPlaces = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`
      );
      if (!response.ok) {
        throw new Error('저장된 장소 불러오기 실패');
      }
      const data = await response.json();

      const savedPlaceIds = data.map((place: { id: string }) => place.id);
      setSavedPlaces(savedPlaceIds);
    } catch (error) {
      console.error('저장된 장소 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  const handleSavePlace = async (placeId: string) => {
    const isSaved = savedPlaces.includes(placeId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`,
        {
          method: isSaved ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: placeId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          isSaved ? '저장된 장소 삭제하기 실패' : '장소 저장 실패'
        );
      }

      setSavedPlaces((prevSavedPlaces) => {
        const updatedSavedPlaces = isSaved
          ? prevSavedPlaces.filter((id) => id !== placeId)
          : [...prevSavedPlaces, placeId];
        return updatedSavedPlaces;
      });
    } catch (error) {
      console.error('장소 저장 오류 발생:', error);
    }
  };

  useEffect(() => {
    // page를 늘리기 위한 함수
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading) {
        setPage((prev) => prev + 1);
      }
    };
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById('observer');
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  useEffect(() => {
    setPage(0);
  }, [selectedSelectedSigungu]);

  const fetchMoreData = async () => {
    setIsLoading(true);

    async function getMainAreaFilterData(mainAreaId: number, page: number) {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/tour/places?majorRegionId=${mainAreaId}&page=${page}`
      );

      const result = await response.json();

      setSelectPlace((prev) => [...prev, ...result.places]);
    }

    async function getSigunguFilterData(
      areaId: string,
      sigunguId: string,
      page: number
    ) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_DOMAIN
          }/tour/places?areaId=${areaId}&sigunguId=${sigunguId}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // setSelectPlace(result.places);
        setSelectPlace((prev) => [...prev, ...result.places]);
      } catch (error) {
        if (error instanceof Error && error.message === '404') {
          // 현재 해당 시군구에 데이터가 존재하지 않음
          setSelectPlace([]);
        }
      }
    }

    if (selectedSelectedSigungu !== null) {
      getSigunguFilterData(
        selectedSelectedSigungu.areaId,
        selectedSelectedSigungu.sigunguId,
        page
      );
    } else if (selectedMainAreaId !== null && selectedSelectedSigungu == null) {
      getMainAreaFilterData(selectedMainAreaId, page);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, [page]);

  return (
    <div className="bg-dftBackgroundGray flex justify-center grow">
      <div className="w-full flex flex-col items-center pt-9 rounded-lg overflow-scroll scroll-box">
        {places.map((place, idx) => (
          <div
            key={idx}
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSavePlace(place.id);
                }}
              >
                <img
                  src={
                    savedPlaces.includes(place.id)
                      ? '/assets/bookmark-saved.svg'
                      : '/assets/bookmark.svg'
                  }
                  alt="저장 버튼"
                  className="w-11 h-12 mb-2"
                />
              </button>
              <img
                src="/assets/Message.svg"
                alt="댓글 개수"
                className="w-10 h-10"
              />
            </div>
          </div>
        ))}
        {/* {isLoading && <div>Loading...</div>} */}
        <div id="observer" style={{ height: '10px' }}></div>
      </div>
    </div>
  );
}
