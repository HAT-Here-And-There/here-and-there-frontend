import { useState, useEffect } from 'react';
import { Place } from '@_types/type';
import PlaceFilterComponent from '@components/SelectPlace/PlaceFilterComponent';

export default function PlaceFilter() {
  const [placeFilter, setPlaceFilter] = useState<Place[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/place/main-area`
      );
      const result = await response.json();
      setPlaceFilter(result.places);
    }

    getData();
  }, []);

  return <PlaceFilterComponent places={placeFilter} />;
}