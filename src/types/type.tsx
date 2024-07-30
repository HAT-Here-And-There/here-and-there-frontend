// Main 페이지 관련 타입
export interface MainRecommendPlace {
  id: string;
  name: string | null;
  imageUrl: string;
}

export interface MainRecommendPlaceComponentProps {
  places: MainRecommendPlace[];
}

export interface sigunGuInfo {
  // 아래의 인터페이스에서 활용하기 위한 것
  id: string;
  areaId: string;
  name: string;
}

export interface MainEightRegion {
  id: number;
  name: string;
  imageUrl: string;
  sigungu?: sigunGuInfo[]; // 해당 속성은 선택적임
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

export interface sigunguProps {
  areaId: string; // 시군구가 속한 areaId. mainAreadId와는 다를 수 있음. 추후에 쿼리에 필요하기 때문에 포함
  sigunguId: string; // 시군구 고유의 id
}

export interface selectedPlaceFilterProps {
  selectedMainArea: number | null;
  selectedSigungu: sigunguProps | null;
}

export interface SelectPlacePlace {
  // select-place 페이지에서 필터된 장소목록을 보여주는 요소들에 대한 타입. 더 좋은 네이밍이 있으면 바꾸고, 연관 코드에 대한 수정 요망
  id: string;
  name: string;
  imageUrl: string;
}

export interface SelectPlacePlaceProps {
  places: SelectPlacePlace[];
}

export interface travelPlanProp {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface travelDates {
  startDate: Date | null;
  endDate: Date | null;
}

// travel-plan-all 관련 타입

export interface planListAllPlaceItem {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PlaceChatProps {
  place: SelectPlacePlace;
  chatRoomData: ChatRoomData | null;
}

export interface BookmarkedPlaceListProps {
  onPlaceClick: (placeId: string) => void;
  places: SelectPlacePlace[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
}

export interface TravelPlanDetailsProps {
  onBackClick: () => void;
  places: planListAllPlaceItem[][];
  travelPlanName: string;
  travelStartDate: Date;
  travelEndDate: Date;
}
