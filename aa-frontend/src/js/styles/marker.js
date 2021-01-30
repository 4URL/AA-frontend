import styled, { css } from 'styled-components';

import size from '../StyledVariable';

export const markerIcon = css`
  width: 25px;
  height: 34px; // 1.4의 비율

  @media (max-width: ${size.laptop}) {
    width: 20px;
    height: 28px;
  }

  @media (max-width: ${size.mobile}) {
    width: 18px;
    height: 25px;
  }
`;
