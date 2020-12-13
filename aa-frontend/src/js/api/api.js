import dummyPlacesData from '../../dummy/placesDummy';
import { defaultPlace } from '../../dummy/dummyData';

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
 * @returns {array} places - 검색한 장소에 대한 배열
 */
export function searchPlaces(location) {
  console.log('location in searchPlace function ', location);
  // fetch data from server => 가게들의 배열로 오겠지?
  // 현재는 여러개의 핀이 뜨도록 하는게 카테고리라서 이렇게 만들어 놓음 api 완성되면 연결하면 됨
  if (location) {
    return dummyPlacesData.filter(place => (place.Category === location ? true : false));
  } else {
    return dummyPlacesData;
  }
}
