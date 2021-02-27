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

export function makeMarker(results, map, iconImage) {
  var markers = [];
  results.forEach((result, idx) => {
    console.log('makeMarker에서의 lat, lng :: ', result.lat);
    console.log('그리고 type :: ', typeof result.lat);
    const markerOption = {
      map,
      position: new window.naver.maps.LatLng(result.lat, result.lng), //지도의 중심좌표.
      title: result.name,
      icon: iconImage
    };
    let marker = new window.naver.maps.Marker(markerOption);

    // marker.get('seq')를 통해서 idx값을 얻을 수 있음
    marker.set('seq', idx);
    markers.push(marker);
  });
  return markers;
}

// 서로 다른 viewport width에서도 같은 px을 적용
export function pxToVw(size, width = document.documentElement.clientWidth) {
  return `${(size / width) * 100}vw`;
}
