const endpoint = 'http://13.125.243.220:8081/graphql';

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
  let categeorySeq = 0;
  const categorySeqList = categoryList.concat();
  if (categorySeqList.length == 0) {
    categeorySeq = 0;
  } else {
    categeorySeq = categorySeqList[0];
  }
  // const searchValue = searchData['searchValue'] || '';
  // const location = searchData['location'];
  const { location, searchValue } = searchData;
  const itemCount = 6;
  console.log('categorySeqList :: ', categorySeqList);
  console.log('categoryList :: ', categoryList);
  console.log('categeorySeq ::: ', categeorySeq);
  console.log('location ::: ', location);

  const query = `
    query {
      search(param:{categorySeq:${categeorySeq},location: "${location}",searchValue:"${searchValue}", limit: ${itemCount}, page: ${curPage}}) {
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
