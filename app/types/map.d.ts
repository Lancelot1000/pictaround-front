type NaverMap = naver.maps.Map;
type Lat = number;
type Lng = number;
type Coordinates = [Lat, Lng];
type MarkIcon = {
  content?: string;
  anchor?: naver.maps.Point;
}

type Bound = {
  x: number;
  y: number;
  _lat: number;
  _lng: number;
}

interface LocationInfo {
  id: string;
  name: string;
  location: string;
  lat: Lat;
  lng: Lng;
}

interface LocationList extends List {
  items: LocationInfo[];
}

interface Review {
  id?: string;
  name?: string;
  comment?: string;
  location?: string;
}

interface ReviewList extends List {
  items: Review[];
}