import { useState, useEffect } from 'react';
import { MainRecommendPlace } from '@_types/type';
import MainRecommendedPlaceListComponent from '@components/Main/MainRecommendedPlaceListComponent';

export default function MainRecommendedPlaceList() {
  const [recommendedPlaces, setRecommendedPlaces] = useState<
    MainRecommendPlace[]
  >([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places?size=9`
        );
        const result = await response.json();

        // 백엔드에서 받은 데이터가 8개보다 많으면 자르기
        const slicedPlaces = result.places.slice(0, 8);

        setRecommendedPlaces(slicedPlaces);
        console.log(slicedPlaces);
      } catch (error) {
        console.error('Error fetching recommended places:', error);
      }
    }

    getData();
  }, []);

  return <MainRecommendedPlaceListComponent places={recommendedPlaces} />;
}
