import styled from 'styled-components';
import { Search } from '@styled-icons/fa-solid';

export const MapDiv = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  width: 330px;
  height: 30px;
  position: absolute;
  left: 25px;
  top: 15px;
  z-index: 10;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 3px 2px #9e9e9e;
  padding: 10px 5px 10px 5px;
`;

export const SearchBarDiv = styled.div`
  flex: ${props => props.size};
`;

export const SearchBarIcon = styled.div`
  flex: ${props => props.size};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  margin-left: 15px;
`;

export const SearchIcon = styled(Search)`
  color: #949494;
  width: 16px;
  height: 16px;
`;

export const DetailInfoDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 420px;
  height: 100vh;
  background-color: #fff;
`;
