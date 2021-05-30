import { gql } from '@apollo/client';

export const FETCH_PLACES = gql`
  query search($categoryList: [Long], $ne_lat: Float!, $ne_lng: Float!, $sw_lat: Float!, $sw_lng: Float!) {
    search(
      param: { categoryList: $categoryList, location: "", searchValue: "", page: 1, ne: { lat: $ne_lat, lng: $ne_lng }, ws: { lat: $sw_lat, lng: $sw_lng } }
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

export const FETCH_CATEGORIES = gql`
  query searchCategory {
    searchCategory {
      categoryName
      seq
    }
  }
`;
