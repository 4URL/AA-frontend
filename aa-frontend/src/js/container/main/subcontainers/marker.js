import { makeInfowindow } from './infowindow';
import icon from '../views/iconStyles';

export function makeMarker(results, map) {
  var markers = [];
  results.forEach((result, idx) => {
    if (!result.name) return;

    var iconImage;
    if (result.categorySeq == 1) iconImage = icon.restaurant_icon;
    else if (result.categorySeq == 2) iconImage = icon.cafe_icon;
    else if (result.categorySeq == 3) iconImage = icon.hotel_icon;
    else if (result.categorySeq == 4) iconImage = icon.pets_icon;
    else if (result.categorySeq == 5) iconImage = icon.home_icon;
    else if (result.categorySeq == 6) iconImage = icon.campground_icon;
    else iconImage = icon.guitar_icon;

    const markerOption = {
      map,
      position: new window.naver.maps.LatLng(result.lat, result.lng), //지도의 중심좌표.
      title: result.name,
      icon: iconImage
    };
    let marker = new window.naver.maps.Marker(markerOption);

    let infowindow = makeInfowindow(result);

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
