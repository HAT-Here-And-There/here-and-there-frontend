import { useAppSelector, useAppDispatch } from '@context/store';
import { changeSigungu } from '@context/slices/select-place-slice';
import { useState, useEffect } from 'react';
import { MainEightRegion, sigunGuInfo } from '@_types/type';

export default function SelectPlaceSigunguFilter() {
  const [allSigunGuList, setAllSigunGuList] = useState<sigunGuInfo[][]>([]);
  const [showingSigunguList, setShowingSigunguList] = useState<sigunGuInfo[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // mainAreaId는 1 ~ 8로, 서울 ~ 제주에 대응
  const selectedMainAreaId = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getTourMajorRegion() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/major-region`
      );

      const majorRegionData = await response.json();

      const sigunGuList = majorRegionData.map((regionData: MainEightRegion) => {
        return regionData.sigungu;
      });

      setAllSigunGuList(sigunGuList);
    }

    getTourMajorRegion();
  }, []);

  useEffect(() => {
    if (selectedMainAreaId !== null) {
      console.log('yes!');
      console.log(allSigunGuList);
      setShowingSigunguList(allSigunGuList[selectedMainAreaId - 1]);
    }
  }, [selectedMainAreaId]);

  if (showingSigunguList === undefined) {
    return null;
  }

  const handleCityClick = (city: sigunGuInfo) => {
    setSelectedCity(city.id);
    dispatch(
      changeSigungu({ areaId: city.areaId, sigunguId: city.id })
    );
  };

  return (
    <div className="flex text-black items-center justify-evenly bg-white-800 h-[85px] min-h-[85px]">
      {selectedMainAreaId !== null &&
        showingSigunguList.map((city) => (
          <div
            key={city.name}
            className={`cursor-pointer w-36 py-2 text-center rounded-2xl font-main text-lg
              ${selectedCity === city.id ? 'bg-textPurple text-white' : 'bg-backgroundLightGray hover:bg-chatRoomPurple hover:text-white active:text-white'}`}
            onClick={() => handleCityClick(city)}
          >
            {city.name}
          </div>
        ))}
    </div>
  );
}
