import dotenv from 'dotenv';

dotenv.config();

console.log('REACT_APP_ENV_TEST :: ', process.env.REACT_APP_ENV_TEST);

const endpoint = process.env.REACT_APP_ENDPOINT;

const getQueryOption = query => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  };
};

/**
 * 입력한 장소와 db의 장소 중 'Place Name'과 동일한 데이터가 있는지 확인한다.
 * @param {string} location - 입력한 장소
 * @returns {array} places - 검색한 장소에 대한 배열
 */
export function fetchPlaces(searchData, categoryList, curPage) {
  const categorySeqList = categoryList.concat();
  // const searchValue = searchData['searchValue'] || '';
  // const location = searchData['location'];
  const { location, searchValue } = searchData;
  const itemCount = 6;

  const query = `
    query {
      search(param:{categoryList:[${categorySeqList}],location: "${location}",searchValue:"${searchValue}", page: ${curPage}}) {
        stores {
          categorySeq
          subCategory
          convenience
          description
          homepage
          lat
          lng
          mapUrl
          modifiedAt
          name
          phoneNumber
          seq
          workingDay
          shortAddress
          address
          roadAddress
        }
        count
      }
    }
  `;

  return fetch(endpoint, getQueryOption(query))
    .then(res => res.json())
    .then(({ data }) => {
      const { stores, count } = data.search;
      return { stores, count };
    });
}

/**
 * 현재 화면 영역 안에 영역을 기준으로 장소를 검색한다.
 * @param {Object} latlng_ne - 현재 화면의 우측 상단 위도경도
 * @param {Object} latlng_sw - 현재 화면의 좌측 하단 위도경도
 */
export function fetchDisplayPlaces(categoryList, latlng_ne, latlng_sw) {
  const query = `
  query {
    search(
      param:{
        categoryList:[${categoryList}],
        location: "",
        searchValue:"",
        page: 1,
        ne: {lat: ${latlng_ne._lat}, lng: ${latlng_ne._lng}},
        ws: {lat: ${latlng_sw._lat}, lng: ${latlng_sw._lng}}
      }
    ) {
      stores {
        categorySeq
        subCategory
        convenience
        description
        homepage
        lat
        lng
        mapUrl
        modifiedAt
        name
        phoneNumber
        seq
        workingDay
        shortAddress
        address
        roadAddress
      }
      count
    }
  }
  `;

  return fetch(endpoint, getQueryOption(query))
    .then(res => res.json())
    .then(({ data }) => {
      const { stores, count } = data.search;
      return { stores, count };
    });
}

export function reqGetCategoryData() {
  const query = `
    query {
      searchCategory{
        categoryName,
        seq
      }
    }
  `;

  return fetch(endpoint, getQueryOption(query))
    .then(res => res.json())
    .then(({ data }) => {
      const categoryList = data.searchCategory;
      return categoryList;
    });
}
