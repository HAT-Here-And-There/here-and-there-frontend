import { useState, useEffect } from 'react';
import { SelectPlacePlace } from '@_types/type';
import SelectPlacePlaceListComponent from '@components/SelectPlace/SelectPlacePlaceListComponent';
import { useAppSelector } from '@context/store';

export default function SelectPlacePlaceList() {
  const [selectPlace, setSelectPlace] = useState<SelectPlacePlace[]>([]);

  const selectedMainAreaId = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );

  const selectedSelectedSigungu = useAppSelector(
    (state) => state.selectPlace.selectedSigungu
  );

  useEffect(() => {
    async function getMainAreaFilterData(mainAreaId: number) {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/tour/places?majorRegionId=${mainAreaId}`
      );

      const result = await response.json();

      setSelectPlace(result.places);
    }

    async function getSigunguFilterData(areaId: string, sigunguId: string) {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/tour/places?areaId=${areaId}&sigunguId=${sigunguId}`
      );

      const result = await response.json();

      setSelectPlace(result.places);
    }

    async function getNofilterData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places?size=20`
      );
      const result = await response.json();
      setSelectPlace(result.places);
    }

    // mainAreaId만 있으면 이걸로 요청을 보내고, 시군구 정보도 있으면 그걸로 요청 보내고 없으면 그냥 상위 20개 정보를 요청한다
    if (selectedSelectedSigungu !== null) {
      getSigunguFilterData(
        selectedSelectedSigungu.areaId,
        selectedSelectedSigungu.sigunguId
      );
    } else if (selectedMainAreaId !== null && selectedSelectedSigungu == null) {
      getMainAreaFilterData(selectedMainAreaId);
    } else {
      getNofilterData();
    }
  }, [selectedMainAreaId, selectedSelectedSigungu]);

  return <SelectPlacePlaceListComponent places={selectPlace} />;
}
