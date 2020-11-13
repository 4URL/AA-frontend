import React, { memo } from 'react';
import styled from 'styled-components';
import styledVariable from './StyledVariable';

const InputVC = memo(props => {
  const { id, placeholder, onChange } = props;
  let { type } = props;

  if (type !== 'password') {
    type = 'text';
  }

  return <InputView id={'input-' + id} placeholder={placeholder} type={type} onChange={onChange} />;
});

const InputView = styled.input.attrs(props => ({
  type: props.type
}))`
	width: ${styledVariable.LOGIN_INPUT_WIDTH}
	min-width: ${styledVariable.LOGIN_INPUT_MIN_WIDTH}

	height: ${styledVariable.LOGIN_INPUT_HEIGHT}
	min-height: ${styledVariable.LOGIN_INPUT_MIN_HEIGHT}

	padding: 16px 27px;

	border-radius: 10px;
	border: solid 1px #000000;
	background-color: #ffffff;

	box-sizing: border-box;

	margin-top: 36px;
	&:first-child{
		margin-top: 0px;
	}
`;

InputVC.displayName = 'InputVC';
export default InputVC;
