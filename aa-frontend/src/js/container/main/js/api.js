import dummyPlacesData from '../../../../dummy/placesDummy';
import { defaultPlace } from '../../../../dummy/dummyData';

// 입력한 내용에 대한 결과값이 배열로 와야한다.
/*
  {
    'Place Name': '개떼놀이터 남양주',
    Category: '애견카페',
    Tel: '0507-1442-9956',
    'Business Hour':
      '수요일 11:00~22:00 | 월요일 11:00~22:00 | 화요일 11:00~22:00 | 토요일 11:00~24:00 ✔밤 12시까지~~(식사,음료,주류 마감시까지 주문가능) | 금요일 11:00~24:00 ✔밤 12시까지~~(식사,음료,주류 마감시까지 주문가능) | 목요일 11:00~24:00 ✔밤 12시까지~~(식사,음료,주류 마감시까지 주문가능) | 일요일 11:00~22:00',
    Homepage: 'https://blog.naver.com/dogsplay',
    Description: '',
    Convenience: '#단체석 #주차 #무선 인터넷 #반려동물 동반 #남/녀 화장실 구분 #지역화폐(카드형) #지역화폐(모바일형)',
    Latitude: 37.6500405,
    Longitude: 127.1904287,
    'Map Url': 'https://map.naver.com/v5/entry/place/285718237?c=14158289.8184923,4530188.5780633,15,0,0,0,dh'
  },
*/

/**
 * 입력한 장소와 db의 장소 중 'Place Name'과 동일한 데이터가 있는지 확인한다.
 * @param {string} location - 입력한 장소
 */
export function searchPlaces(location) {
  console.log('입력한 장소에 맞는 데이터를 가져온다.');

  return dummyPlacesData;
}

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

export function getMarkers(location) {}
