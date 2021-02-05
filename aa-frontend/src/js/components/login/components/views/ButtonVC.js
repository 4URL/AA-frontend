import React, { memo } from 'react';
import styled from 'styled-components';
import styledVariable from './StyledVariable';

const ButtonVC = memo(props => {
  const { id, type, text, onClick } = props;
  return (
    <ButtonView id={id} btntype={type} onClick={onClick}>
      {text}
    </ButtonView>
  );
});

const ButtonView = styled.button.attrs(props => ({
  type: 'button'
}))`
	  width: ${styledVariable.SNS_LOGIN_BUTTON_WIDTH}
	  min-width: ${styledVariable.SNS_LOGIN_BUTTON_MIN_WIDTH}
	  height: ${styledVariable.SNS_LOGIN_BUTTON_HEIGHT}
	  min-height: ${styledVariable.SNS_LOGIN_BUTTON_MIN_HEIGHT}
	  border-radius: 10px;
	  text-align: center;
	  line-height: ${styledVariable.SNS_LOGIN_BUTTON_HEIGHT}
	  cursor: pointer;
  
	  background-color: ${props => {
      if (props.btntype == 'google') return styledVariable.GOOGLE_LOGIN_BUTTON_BG_COLOR;
      else if (props.btntype == 'kakao') return styledVariable.KAKAO_LOGIN_BUTTON_BG_COLOR;
      else if (props.btntype == 'naver') return styledVariable.NAVER_LOGIN_BUTTON_BG_COLOR;
      else return styledVariable.LOGIN_BUTTON_BG_COLOR;
    }}
  
	  margin-top: ${props => {
      if (props.btntype != undefined) return '25px';
      else return '73px';
    }}
  `;

ButtonVC.displayName = 'ButtonVC';
export default ButtonVC;
