import React from 'react';

interface TravelPlanPlaceProps {
  id: string;
  name: string;
  onClick: (id: string) => void;
}

export default function TravelPlanPlace({
  id,
  name,
  onClick,
}: TravelPlanPlaceProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-4 mb-4 cursor-pointer bg-white shadow-md hover:bg-gray-100 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold">{name}</h3>
    </div>
  );
}
