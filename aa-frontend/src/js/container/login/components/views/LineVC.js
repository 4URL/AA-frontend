import React, { memo } from 'react';
import styled from 'styled-components';

const LineVC = memo(props => {
  return (
    <LineBoxDiv>
      <LineDiv />
      <LineTextDiv> {props.text} </LineTextDiv>
      <LineDiv />
    </LineBoxDiv>
  );
});

const LineBoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 27px;

  margin-top: 25px;
  margin-bottom: 25px;
`;

const LineDiv = styled.div`
  display: flex;
  width: 201px;
  height: 2px;
  background-color: #000000;
`;

const LineTextDiv = styled.div`
  display: flex;
  width: 23px;
  height: 27px;
  font-size: 1.5rem;
  color: #000000;

  margin-left: 21px;
  margin-right: 21px;
`;

LineVC.displayName = 'LineVC';
export default LineVC;
