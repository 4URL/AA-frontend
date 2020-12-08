export function getResultBounds(results) {
  let ne_lat = Number.MIN_VALUE;
  let ne_lng = Number.MIN_VALUE;
  let sw_lat = Number.MAX_VALUE;
  let sw_lng = Number.MAX_VALUE;

  // get Region Box
  results.forEach(result => {
    if (ne_lat < result.Latitude) ne_lat = result.Latitude;
    if (ne_lng < result.Longitude) ne_lng = result.Longitude;
    if (sw_lat > result.Latitude) sw_lat = result.Latitude;
    if (sw_lng > result.Longitude) sw_lng = result.Longitude;
  });

  let lanLng_sw = new window.naver.maps.LatLng(sw_lat, sw_lng);
  let lanLng_ne = new window.naver.maps.LatLng(ne_lat, ne_lng);

  return new window.naver.maps.LatLngBounds(lanLng_sw, lanLng_ne);
}
