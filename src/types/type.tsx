// Main 페이지 관련 타입
export interface MainRecommendPlace {
  id: string;
  name: string | null;
  imageUrl: string;
}

export interface MainRecommendPlaceComponentProps {
  places: MainRecommendPlace[];
}

export interface MainEightRegion {
  id: number;
  name: string;
  imageUrl: string;
}

export interface MainEightRegionComponentProps {
  regions: MainEightRegion[];
}

// Chat Room 관련 타입

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

// select place 관련 타입

export interface selectPlaceProps {
  selectedRegion: null | string;
  selectedCity: null | string;
}

export interface SelectPlacePlace {
  id: string;
  name: string;
  imageUrl: string;
}
