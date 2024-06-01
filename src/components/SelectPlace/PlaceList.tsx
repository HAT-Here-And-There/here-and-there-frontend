import { useState, useEffect } from 'react';
import { Place } from '@_types/type';
import SelectPlaceComponent from '@components/SelectPlace/SelectPlaceComponent';

export default function PlaceList() {
  const [selectPlace, setSelectPlace] = useState<Place[]>([]);

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

  return <SelectPlaceComponent places={selectPlace} />;
}
