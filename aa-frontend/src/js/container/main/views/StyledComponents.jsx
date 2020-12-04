import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  width: 330px;
  height: 40px;
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

// module.exports = {
//   SearchBarContainer,
//   SearchBarDiv,
//   SearchBarIcon,
//   SearchBarInput,
// };
