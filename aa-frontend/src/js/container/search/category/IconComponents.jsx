import styled, { css } from 'styled-components';
import { Restaurant, Hotel, Pets } from '@styled-icons/material-rounded';
import { Cafe } from '@styled-icons/ionicons-outline';
import { Home } from '@styled-icons/boxicons-regular';
import { Campground, Guitar } from '@styled-icons/fa-solid';

import size from '../../../StyledVariable';

const category = css`
  @media (max-width: ${size.mobileL}) {
    height: 20px;
    width: 20px;
  }
  height: 25px;
  width: 25px;
`;

export const RestaurantIcon = styled(Restaurant)`
  ${category}
  color: #1e90ff;
`;

export const HotelIcon = styled(Hotel)`
  ${category}
  color: #FFBC42;
`;

export const CafeIcon = styled(Cafe)`
  ${category}
  color: #1e90ff;
`;

export const PetsIcon = styled(Pets)`
  ${category}
  color: #79bd9a;
`;

export const HomeIcon = styled(Home)`
  ${category}
  color: #FFBC42;
`;

export const CampgroundIcon = styled(Campground)`
  ${category}
  color: #79bd9a;
`;

export const GuitarIcon = styled(Guitar)`
  ${category}
`;
