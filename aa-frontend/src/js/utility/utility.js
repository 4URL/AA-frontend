export function getResultBounds(results) {
  let ne_lat = Number.MIN_VALUE;
  let ne_lng = Number.MIN_VALUE;
  let sw_lat = Number.MAX_VALUE;
  let sw_lng = Number.MAX_VALUE;

  // get Region Box
  results.forEach(result => {
    result.lat = Number(result.lat);
    result.lng = Number(result.lng);
    if (ne_lat < result.lat) ne_lat = result.lat;
    if (ne_lng < result.lng) ne_lng = result.lng;
    if (sw_lat > result.lat) sw_lat = result.lat;
    if (sw_lng > result.lng) sw_lng = result.lng;
  });

  const lat_diff = ne_lat - sw_lat;
  const lng_diff = ne_lng - sw_lng;
  const DIFF_MIN = 0.05;
  const HALF_DIFF_MIN = 0.01;

  if (lat_diff < DIFF_MIN) {
    const lat_center = (sw_lat + ne_lat) / 2;
    ne_lat = lat_center + HALF_DIFF_MIN;
    sw_lat = lat_center - HALF_DIFF_MIN;
  }

  if (lng_diff < DIFF_MIN) {
    const lng_center = (sw_lng + ne_lng) / 2;
    ne_lng = lng_center + HALF_DIFF_MIN;
    sw_lng = lng_center - HALF_DIFF_MIN;
  }

  let lanLng_sw = new window.naver.maps.LatLng(sw_lat, sw_lng);
  let lanLng_ne = new window.naver.maps.LatLng(ne_lat, ne_lng);

  return new window.naver.maps.LatLngBounds(lanLng_sw, lanLng_ne);
}
