import { useState, useEffect } from 'react';
import { SelectPlacePlace } from '@_types/type';
import SelectPlacePlaceListComponent from '@components/SelectPlace/SelectPlacePlaceListComponent';

export default function SelectPlacePlaceList() {
  const [selectPlace, setSelectPlace] = useState<SelectPlacePlace[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places?size=20`
      );
      const result = await response.json();
      setSelectPlace(result.places);
    }

    getData();
  }, []);

  return <SelectPlacePlaceListComponent regions={selectPlace} />;
}
