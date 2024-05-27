import { useState, useEffect } from 'react';
import { Region } from '@_types/type';
import RegionComponent from '@components/Main/RegionComponent';

const mockRegions: Region[] = [
  {
    id: 1,
    name: 'Region 1',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '서울',
  },
  {
    id: 2,
    name: 'Region 2',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '경기/인천',
  },
  {
    id: 3,
    name: 'Region 3',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '강원도',
  },
  {
    id: 4,
    name: 'Region 4',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '충청도',
  },
  {
    id: 5,
    name: 'Region 5',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '전라도',
  },
  {
    id: 6,
    name: 'Region 6',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '경상도',
  },
  {
    id: 7,
    name: 'Region 7',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '제주도',
  },
  {
    id: 8,
    name: 'Region 8',
    imageUrl: 'https://via.placeholder.com/500x250',
    areaName: '독도/울릉도',
  },
];

export default function RegionList() {
  const [regionList, setRegionList] = useState<Region[]>([]);

  useEffect(() => {
    // 임시 데이터를 사용하여 상태 설정
    setRegionList(mockRegions);
  }, []);

  return <RegionComponent regions={regionList} />;
}
