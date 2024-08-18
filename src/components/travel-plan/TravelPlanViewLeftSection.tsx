import { useState, useEffect } from 'react';
import { fetchSavedPlaces } from '@utils/fetchFunctions';

interface travelPlanViewLeftSectionProps {
  name: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}

interface likedPlacesProp {
  id: string;
  name: string;
  imageUrl: string;
}

export default function TravelPlanViewLeftSection({
  name,
  startDate,
  endDate,
}: travelPlanViewLeftSectionProps) {
  const [likedPlaces, setLikedPlaces] = useState<likedPlacesProp[] | null>(
    null
  );

  useEffect(() => {
    async function getLikedPlaces() {
      try {
        const likedPlacesData = await fetchSavedPlaces();

        setLikedPlaces(likedPlacesData);
      } catch (error) {
        console.log(error);
      }
    }

    getLikedPlaces();
  }, []);

  return (
    <div className="w-[35%] flex flex-col items-center overflow-y-scroll scroll-box">
      <div className="w-full flex justify-between items-center px-2">
        <span className="font-main text-[32px]">{name}</span>
        <p className="font-main text-[20px] text-gray-400">
          {startDate} ~ {endDate}
        </p>
      </div>
      <div className="font-main text-2xl mt-5">저장된 장소</div>
      {likedPlaces &&
        likedPlaces.map((element) => {
          return (
            <div className="flex items-center w-[90%] mt-8" key={element.id}>
              <img
                src={element.imageUrl}
                alt="liked place image"
                className="w-44 h-24 object-cover rounded-xl"
              />
              <span className="text-xl text-center w-full font-main">
                {element.name}
              </span>
            </div>
          );
        })}
    </div>
  );
}
