import { useState, useEffect } from 'react';

export default function RecommendedPlace() {
  const [recommendedPlaces, setRecommendedPlaces] = useState<null | object>(
    null
  );

  useEffect(() => {
    async function getData() {
      const response = await fetch('http://172.233.70.162/tour/places?size=8');

      const result = await response.json();

      setRecommendedPlaces(result.places);
    }

    getData();
  }, []);

  console.log(recommendedPlaces);
  return <div className="container mx-auto flex items-center"></div>;
}
