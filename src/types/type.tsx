export interface Place {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface PlaceComponentProps {
  places: Place[];
}
