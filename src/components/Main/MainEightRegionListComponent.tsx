import { useState, useEffect } from 'react';
import {
  MainEightRegionComponentProps,
  MainRecommendPlace,
} from '@_types/type';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@context/store';
import { changeMainArea } from '@context/slices/select-place-slice';

interface RegionPlace {
  regionId: number;
  places: MainRecommendPlace[];
}

export default function MainEightRegionListComponent({
  regions,
}: MainEightRegionComponentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [regionPlaces, setRegionPlaces] = useState<RegionPlace[]>([]);

  useEffect(() => {
    async function fetchRegionPlaces(regionId: number) {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/tour/places?majorRegionId=${regionId}&pageSize=3`
      );
      const result = await response.json();
      return result.places.slice(0, 3); // 최대 3개의 장소만 가져옴
    }

    async function loadAllRegionsPlaces() {
      const placesPromises = regions.map(async (region) => {
        const places = await fetchRegionPlaces(region.id);
        return { regionId: region.id, places };
      });

      const allRegionPlaces = await Promise.all(placesPromises);
      setRegionPlaces(allRegionPlaces);
    }

    loadAllRegionsPlaces();
  }, [regions]);

  const getPopularPlaces = (regionId: number) => {
    const regionPlace = regionPlaces.find((rp) => rp.regionId === regionId);
    return regionPlace ? regionPlace.places : [];
  };

  if (!regions || regions.length === 0) {
    return <div>No regions available.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center py-24 bg-white">
      <div className="grid grid-cols-2 gap-10 ">
        {regions.map((region) => {
          const popularPlaces = getPopularPlaces(region.id);

          return (
            <div key={region.id} className="relative w-[560px] h-[350px]">
              <img
                src={region.imageUrl}
                alt={region.name}
                className="rounded-lg hover:cursor-pointer object-cover w-full h-3/4"
                onClick={() => {
                  navigate(`/select-place`);
                  dispatch(changeMainArea(region.id));
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-75 text-black p-4 rounded-b-lg">
                <p className="font-main text-xl mb-2 font-bold">
                  {region.name}
                </p>
                <p className="font-custom text-textPurple text-sm">
                  {popularPlaces.length > 0
                    ? popularPlaces.map((place, index) => (
                        <span key={place.id}>
                          #{place.name}
                          {index < popularPlaces.length - 1 && ' '}
                        </span>
                      ))
                    : '#No popular places found'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
