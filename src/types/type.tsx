export interface MainRecommendPlace {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface MainRecommendPlaceComponentProps {
  places: MainRecommendPlace[];
}

export interface Region {
  id: number;
  name: string;
  imageUrl: string;
}

export interface RegionComponentProps {
  regions: Region[];
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

export interface commingMessageDataProp {
  id: string;
  userId: number;
  content: string;
  timeStamp: Date;
  originChatId?: string;
}

export interface chatProps {
  id: string;
  userId: number;
  content: string;
  timeStamp: Date;
  replies: chatProps[] | [];
}

export interface selectPlaceProps {
  selectedRegion: null | string;
  selectedCity: null | string;
}
