import { useAppSelector, useAppDispatch } from '@context/store';
import { changeSigungu } from '@context/slices/select-place-slice';
import { useState, useEffect } from 'react';
import { MainEightRegion, sigunGuInfo } from '@_types/type';

export default function SelectPlaceSigunguFilter() {
  const [allSigunGuList, setAllSigunGuList] = useState<sigunGuInfo[][]>([]);
  const [showingSigunguList, setShowingSigunguList] = useState<sigunGuInfo[]>([]);

  // mainAreaId는 1 ~ 8로, 서울 ~ 제주에 대응
  const selectedMainAreaId = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );

  const selectedSigungu = useAppSelector(
    (state) => state.selectPlace.selectedSigungu
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getTourMajorRegion() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/major-region`
      );

      const majorRegionData = await response.json();
      // 백엔드 데이터 확인
      console.log('Major Region Data:', majorRegionData);

      const sigunGuList = majorRegionData.map((regionData: MainEightRegion) => {
        return regionData.sigungu;
      });

      setAllSigunGuList(sigunGuList);
    }

    getTourMajorRegion();
  }, []);

  useEffect(() => {
    if (selectedMainAreaId !== null) {
      setShowingSigunguList(allSigunGuList[selectedMainAreaId - 1] || []);
    }
  }, [selectedMainAreaId, allSigunGuList]);

  const handleCityClick = (city: sigunGuInfo) => {
    dispatch(changeSigungu({ areaId: city.areaId, sigunguId: city.id }));
    console.log(city);
  };

  if (showingSigunguList.length === 0) {
    return null;
  }

  return (
    <div className="flex text-black items-center justify-evenly bg-white-800 h-[85px] min-h-[85px] overflow-x-auto w-full">
      <div className="flex whitespace-nowrap space-x-4 px-4 w-full">
        {selectedMainAreaId !== null &&
          showingSigunguList.map((city) => (
            <div
              key={city.name}
              className={`cursor-pointer flex-shrink-0 w-36 py-2 text-center rounded-2xl font-main text-lg
                ${
                  selectedSigungu?.sigunguId === city.id &&
                  selectedSigungu.areaId === city.areaId
                    ? 'bg-textPurple text-white'
                    : 'bg-backgroundLightGray hover:bg-chatRoomPurple hover:text-white active:text-white'
                }`}
              onClick={() => handleCityClick(city)}
            >
              {city.name}
            </div>
          ))}
      </div>
    </div>
  );
}
