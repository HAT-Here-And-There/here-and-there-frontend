import { useState, useEffect } from 'react';
import { MainEightRegion } from '@_types/type';
import MainEightRegionListComponent from '@components/Main/MainEightRegionListComponent';

export default function MainEightRegionList() {
  const [regionList, setRegionList] = useState<MainEightRegion[]>([]);

  useEffect(() => {
    // 임시 데이터를 사용하여 상태 설정
    async function getEightRegionImage() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/major-region`
      );

      const data = await response.json();

      console.log(data);
      const processedData = data.map((item: MainEightRegion) => {
        return {
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
        };
      });

      setRegionList(processedData);
    }

    getEightRegionImage();
  }, []);

  return <MainEightRegionListComponent regions={regionList} />;
}
