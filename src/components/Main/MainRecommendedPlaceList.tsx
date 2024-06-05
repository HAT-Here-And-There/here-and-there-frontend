import { useState, useEffect } from 'react';
import { MainRecommendPlace } from '@_types/type';
import PlaceComponent from '@components/Main/PlaceComponent';

export default function MainRecommendedPlaceList() {
  const [recommendedPlaces, setRecommendedPlaces] = useState<
    MainRecommendPlace[]
  >([]);

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
