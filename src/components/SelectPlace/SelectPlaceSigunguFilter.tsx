// 아무 권역도 선택되지 않았다면 일단 가장 인기 있는 10개의 도시를 꼽아줄 수도 있어야 함
import { useAppSelector } from '@context/store';
import { useState, useEffect } from 'react';
import { MainEightRegion } from '@_types/type';

export default function SelectPlaceSigunguFilter() {
  const [allSigunGuList, setAllSigunGuList] = useState<string[][]>([]);
  const [showingSigunguList, setShowingSigunguList] = useState<string[]>([]);

  // mainAreaId는 1 ~ 8로, 서울 ~ 제주에 대응
  const selectedMainAreaId = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );

  useEffect(() => {
    async function getTourMajorRegion() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/major-region`
      );

      const majorRigiondata = await response.json();

      const sigunGuList = majorRigiondata.map((regionData: MainEightRegion) => {
        return regionData.sigungu?.map((data) => data.name);
      });

      setAllSigunGuList(sigunGuList);
    }

    getTourMajorRegion();
  }, []);

  useEffect(() => {
    if (selectedMainAreaId !== null) {
      setShowingSigunguList(allSigunGuList[selectedMainAreaId - 1]);
    }
  }, [selectedMainAreaId]);

  return (
    <div className="flex text-black items-center justify-evenly bg-white-800 h-[85px] min-h-[85px]">
      {showingSigunguList.map((city) => (
        <div
          key={city}
          className=" hover: cursor-pointer hover:text-chatRoomPurple hover:text-white active:text-white w-24 bg-gray-200 text-center rounded-3xl font-main text-lg"
        >
          {city}
        </div>
      ))}
    </div>
  );
}
