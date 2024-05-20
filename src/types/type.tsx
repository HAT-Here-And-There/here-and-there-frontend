export interface Place {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface PlaceComponentProps {
  places: Place[];
}

export interface ChatRoomData {
  id: number;
  name: string;
  imageUrl: string;
  contact: string;
  openingHours: string;
  closingHours: string;
  areaName: string;
  sigunguName: string;
  address: string;
}
