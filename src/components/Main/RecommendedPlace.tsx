import { useState, useEffect } from 'react';
import { Place } from '@_types/type';
import PlaceComponent from '@components/Main/PlaceComponent';

export default function RecommendedPlace() {
  const [recommendedPlaces, setRecommendedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places?size=8`
      );
      const result = await response.json();
      setRecommendedPlaces(result.places);
    }

    getData();
  }, []);

  return <PlaceComponent places={recommendedPlaces} />;
}