import { useState, useEffect } from 'react';
import { Region } from '@_types/type';
import RegionComponent from '@components/Main/RegionComponent';

export default function RegionList() {
  const [regionList, setRegionList] = useState<Region[]>([]);

  useEffect(() => {
    // 임시 데이터를 사용하여 상태 설정
    async function getEightRegionImage() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/major-region`
      );

      const data = await response.json();

      console.log(data);
      const processedData = data.map((item: Region) => {
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

  return <RegionComponent regions={regionList} />;
}
