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

interface List {
  limit: number;
  offset: number;
  total: number;
}
interface PaginationList {
  limit: number;
  offset: number;
  total: number;
}

interface LocationInfo {
  id: string;
  name: string;
  imageLocation: string;
  latitude: Lat;
  longitude: Lng;
  categoryId: string;
}

interface LocationList extends PaginationList {
  items: LocationInfo[];
}

interface Review {
  id?: number;
  comment?: string;
  imageLocation?: string;
  createdDateTime?: string;
  likeCount?: number;
}

interface ReviewList extends List {
  items: Review[];
}