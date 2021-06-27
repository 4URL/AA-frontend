// import React, { forwardRef } from 'react';
// import { SwiperSlide } from 'swiper/react';
// import styled, { css } from 'styled-components';

// import { RestaurantIcon, HotelIcon, CafeIcon, PetsIcon, HomeIcon, CampgroundIcon, GuitarIcon } from './IconComponents';

// import 'swiper/swiper.min.css';
// import './style.css';

// const MCategoryView = forwardRef((props) => {
//   const { category, idxValue, onClickCategory, children } = props;
//   return (
//     // <SwiperSlide idx={idxValue} value={category['seq']} onClick={onClickCategory}>
//     //   {categorySwitch(category['seq'])}
//     // </SwiperSlide>
//     <SwiperSlide>호텔</SwiperSlide>
//   );

//   function categorySwitch(seq) {
//     let icon = null;
//     let categoryName = null;
//     let type = 0;

//     switch (seq) {
//       case 1:
//         icon = <RestaurantIcon />;
//         categoryName = '식당';
//         type = 1;
//         break;
//       case 2:
//         icon = <CafeIcon />;
//         categoryName = '카페';
//         type = 2;
//         break;
//       case 3:
//         icon = <HotelIcon />;
//         categoryName = '숙소';
//         type = 3;
//         break;
//       case 4:
//         icon = <PetsIcon />;
//         categoryName = '호텔';
//         type = 4;
//         break;
//       case 5:
//         icon = <HomeIcon />;
//         categoryName = '펜션';
//         type = 5;
//         break;
//       case 6:
//         icon = <CampgroundIcon />;
//         categoryName = '놀이터';
//         type = 6;
//         break;
//       default:
//         icon = <GuitarIcon />;
//         categoryName = '기타';
//         type = 99;
//         break;
//     }

//     return (
//       <Category>
//         <IconWrap>{icon}</IconWrap>
//         <ContentsWrap>{categoryName}</ContentsWrap>
//       </Category>
//     );
//   }
// });

// const CategoryWrap = styled.button.attrs({
//   'data-isselected': 'true'
// })`
//   &[data-isselected='true'] {
//     background-color: #f0f0f0;
//   }
//   background: none;
//   box-sizing: border-box;
//   height: 35px;
//   width: 100%;
//   border-radius: 6px;
//   cursor: pointer;
//   color: #3f4040;
//   font-weight: 600;
// `;

// // 카테고리 아이템 div
// const Category = styled.div`
//   /* height: 100%; */
// `;

// const IconWrap = styled.div`
//   display: inline-block;
//   height: 25px;
//   width: 25px;
//   margin-right: 5px;
//   line-height: 25px;
// `;

// const ContentsWrap = styled.div`
//   height: 20px;
//   font-size: 14px;
//   line-height: 20px;
//   display: inline-block;

//   ${CategoryWrap}:hover & {
//     color: #1e90ff;
//   }
// `;

// MCategoryView.displayName = "MCategoryView";

// export default MCategoryView;
