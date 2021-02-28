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
    const markerOption = {
      map,
      position: new window.naver.maps.LatLng(result.lat, result.lng), //지도의 중심좌표.
      title: result.name,
      icon: iconImage
    };
    let marker = new window.naver.maps.Marker(markerOption);

    var contentString = '<div class="iw_inner">';
    if (result.name) contentString += '<h3>' + result.name + '</h3>';
    contentString += '<p>';
    if (result.description) contentString += result.description + '<br />';
    if (result.convenience) contentString += result.convenience + '<br />';
    if (result.homepage) contentString += '<a href="' + result.homepage + '" target="_blank">Homepage</a><br/>';
    if (result.mapUrl) contentString += '<a href="' + result.mapUrl + '" target="_blank">Place Info</a>';
    contentString += '</p>';
    contentString += '</div>';

    var infowindow = new naver.maps.InfoWindow({
      content: contentString
    });

    naver.maps.Event.addListener(marker, 'click', function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });

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
