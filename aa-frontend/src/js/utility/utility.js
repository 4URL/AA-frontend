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

export function makeMarker(results, map, icon) {
  var markers = [];
  results.forEach((result, idx) => {
    var iconImage;
    if (result.categorySeq == 1) iconImage = icon.restaurant_unselected_icon;
    else if (result.categorySeq == 2) iconImage = icon.cafe_unselected_icon;
    else if (result.categorySeq == 3 || result.categorySeq == 5) iconImage = icon.room_unselected_icon;
    else if (result.categorySeq == 4) iconImage = icon.doghouse_unselected_icon;
    else if (result.categorySeq == 6) iconImage = icon.playground_unselected_icon;
    else iconImage = icon.etc_unselected_icon;
    const markerOption = {
      map,
      position: new window.naver.maps.LatLng(result.lat, result.lng), //지도의 중심좌표.
      title: result.name,
      icon: iconImage
    };
    let marker = new window.naver.maps.Marker(markerOption);

    if (!result.name) return;

    const storeTitle = result.subCategory
      ? `<div class='info'><h3 style="display: inline-block;">${result.name}</h3><p style="display: inline-block;">&nbsp${result.subCategory}</p></div>`
      : `<h3><div>${result.name}</div></h3>`;
    const description = result.description ? `${result.description}<br />` : '';
    let convenience = '';
    if (result.convenience) {
      let convList = result.convenience.split('#');
      for (let i = 1; i < convList.length; i++) {
        convenience += `#${convList[i]}`;
        if (i % 6 == 0) convenience += '<br />';
        else if (i == convList.length - 1) convenience += '<br />';
      }
    }
    const homepage = result.homepage ? `<a href="${result.homepage}"><img src="homepage.png" alt="Homepage" width="25" height="25"></a>` : '';
    const mapUrl = result.mapUrl ? `<a href="${result.mapUrl}"><img src="map.png" alt="Naver Map" width="25" height="25"></a><br/>` : '';
    const newContent = `
    <div class="iw_inner" style="padding: 5px font-family: 'Roboto','Noto Sans KR',AppleSDGothicNeo-Regular,'Malgun Gothic','맑은 고딕',dotum,'돋움',sans-serif">
      ${storeTitle}
      <p>
      ${window.innerWidth > 768 ? description : ''}
      <div style="color:#6e96ff;">
        ${window.innerWidth > 768 ? convenience : ''}
      </div>
      <div style="padding-top: 12px">
        ${homepage}
        ${mapUrl}
      <div>
      </p>
    </div>
    `;

    var infowindow = new naver.maps.InfoWindow({
      content: newContent,
      borderColor: '#E6C128',
      borderWidth: 3,
      anchorSkew: true
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
