import React from 'react';
import styled from 'styled-components';
import styledVariable from '../../../StyledVariable';

function SnsLoginButton(props) {
  const { id, type, text } = props;

  return (
    // <button
    // 	className = 'sns-login-button'
    // 	id = { id }
    // 	btntype = { type }
    // 	type = 'button'
    // 	>
    // 		{ text }
    // </button>

    <SnsLoginButtonTag id={id} btntype={type}>
      {text}
    </SnsLoginButtonTag>
  );
}

const SnsLoginButtonTag = styled.button.attrs(props => ({
  type: 'button'
}))`
	width: ${styledVariable.SNS_LOGIN_BUTTON_WIDTH}
	min-width: ${styledVariable.SNS_LOGIN_BUTTON_MIN_WIDTH}
	height: ${styledVariable.SNS_LOGIN_BUTTON_HEIGHT}
	min-height: ${styledVariable.SNS_LOGIN_BUTTON_MIN_HEIGHT}
	border-radius: 10px;

	text-align: center;
	line-height: 63px;

	cursor: pointer;

	margin-top: 25px;

	background-color: ${props => {
    if (props.btntype == 'google') return styledVariable.GOOGLE_LOGIN_BUTTON_BG_COLOR;
    else if (props.btntype == 'kakao') return styledVariable.KAKAO_LOGIN_BUTTON_BG_COLOR;
    else if (props.btntype == 'naver') return styledVariable.NAVER_LOGIN_BUTTON_BG_COLOR;
  }};
`;

// width: $snsLoginButtonWidth;
// min-width: $snsLoginButtonMinWidth;
// height: $snsLoginButtonHeight;
// min-height: $snsLoginButtonMinHeight;
// line-height: $snsLoginButtonHeight;
// background-color: $googleLoginButtonBG;
// background-color: $naverLoginButtonBG;
// background-color: $kakaoLoginButtonBG;
export default SnsLoginButton;
