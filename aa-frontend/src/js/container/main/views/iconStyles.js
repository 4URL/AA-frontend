const CAFE_MARKER = './cafe.svg';
const CAMPGROUND_MARKER = './campground.svg';
const GUITAR_MARKER = './guitar.svg';
const HOME_MARKER = './home.svg';
const HOTEL_MARKER = './hotel.svg';
const PETS_MARKER = './pets.svg';
const RESTAURANT_MARKER = './restaurant.svg';

const isMonitor = document.documentElement.clientWidth <= 768 ? true : false;
const ICON_STYLE = isMonitor ? 'width: 26px; height: 30px;' : 'width: 30px; height: 34px;';
const ANCHOR = { x: isMonitor ? 13 : 15, y: isMonitor ? 30 : 34 };

export default {
  cafe_icon: {
    content: `<img src="${CAFE_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  campground_icon: {
    content: `<img src="${CAMPGROUND_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  guitar_icon: {
    content: `<img src="${GUITAR_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  home_icon: {
    content: `<img src="${HOME_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  hotel_icon: {
    content: `<img src="${HOTEL_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  pets_icon: {
    content: `<img src="${PETS_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  restaurant_icon: {
    content: `<img src="${RESTAURANT_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },

  homepage_svg: 'homepage.svg',
  instagram_svg: 'instagram.svg',
  naver_svg: 'naver.svg'
};
