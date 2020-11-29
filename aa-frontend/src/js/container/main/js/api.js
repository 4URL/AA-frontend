import dummyPlacesData from '../../../../dummy/placesDummy';

function dummyData(location) {
  return dummyPlacesData.filter(place => place['Place Name'] === location);
}

export function searchPlaces(location) {
  console.log('api searchPlaces');
  const lat = dummyData(location).Latitude;
  const lng = dummyData(location).Longitude;

  const markerPosition = new window.kakao.maps.LatLng(lat, lng);
  const marker = new window.kakao.maps.Marker({
    position: markerPosition
  });

  return marker;
}
