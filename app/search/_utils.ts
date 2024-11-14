export const createMyPosition = (marker: Coordinates, ref: NaverMap) => {
  if (typeof marker !== 'object') return;

  new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(marker[1], marker[0]),
    map: ref,
    icon: {
      content: `<div class="currentPosition_outer"><div class="currentPosition_inner"></div></div>`,
    },
  });
};


export const createMarkers = (items: LocationInfo[], ref: NaverMap) => {
  if (items.length === 0) return;

  const markerIdList: string[] = ref.markerList.map((item: any) => item.id);

  items.forEach(item => {
    if (markerIdList.includes(item.id)) return;

    ref.marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(item.lat, item.lng),
      map: ref,
    });

    ref.markerList.push({ markerInfo: ref.marker, id: item.id });

    // TODO: APPLY PHOTO POPUP
    window.naver.maps.Event.addListener(ref.marker, 'click', () => {
      console.log(item);
    });
  });

  cleanupMarkers(items, ref);
};

const cleanupMarkers = (items: LocationInfo[], ref: NaverMap) => {
  if (ref.markerList.length < 100) return;

  const mapBounds = ref.getBounds();

  for (let i = 0; i < ref.markerList.length; i++) {

    const marker = ref.markerList[i].markerInfo;
    const position = marker.getPosition();

    if (mapBounds.hasLatLng(position)) {
      marker.setMap(ref);
    } else {
      marker.setMap(null);
    }
  }
}