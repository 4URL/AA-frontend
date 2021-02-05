import React, { memo } from 'react';
import styled from 'styled-components';

import ButtonVC from '../components/views/ButtonVC';
import InputVC from '../components/views/InputVC';
import LineVC from '../components/views/LineVC';

import { encodingText, onClickSnsLogin } from '../LoginFunction';

const SignupContainer = memo(props => {
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwdCheck, setPwdCheck] = React.useState('');
  const [confirmNum, setConfirmNum] = React.useState('');

  const onChangeInputID = e => {
    setId(e.target.value);
  };

  const onChangeInputPWD = e => {
    setPwd(e.target.value);
  };

  const onChangeInputPWDCheck = e => {
    setPwdCheck(e.target.value);
  };

  const onClickSignup = e => {
    // if (id == null || id == undefined || id === '') {
    //   console.log('plase input id');
    //   return;
    // }
    // if (pwd == null || pwd == undefined || pwd === '') {
    //   console.log('plase input pwd');
    //   return;
    // }
    // if (pwdCheck == null || pwdCheck == undefined || pwdCheck === '') {
    //   console.log('plase input pwd check');
    //   return;
    // }

    // console.log('signup Button Action ');

    if (pwd === pwdCheck) {
      console.log('signup! ');
      const encodingCallback = encodingText => {
        // console.log('signup Button onClick encodingTextCallback func encoding Text ::: ', encodingText);
      };
      encodingText(pwd, encodingCallback);
      // console.log('encodingPassword :: ', encodingPassword);
      // const repeatCount = 100000;
      // const crypto = require('crypto');
      // crypto.randomBytes(64, (err, buf) => {
      // crypto.pbkdf2(pwd, buf.toString('base64'), repeatCount, 64, 'sha512', (err, key) => {
      // crypto.pbkdf2(pwd, '', repeatCount, 64, 'sha512', (err, key) => {
      //   console.log('singup key string ::: ', key.toString('base64'));
      // });
      // });
    }
  };

  const onChangeInputConfirmNum = e => {
    setConfirmNum(e.target.value);
  };

  const SNSBUTTONS = [
    { type: 'google', id: 'google', text: 'Google', onClick: onClickSnsLogin },
    { type: 'kakao', id: 'kakao', text: 'Kakao', onClick: onClickSnsLogin },
    { type: 'naver', id: 'naver', text: 'Naver', onClick: onClickSnsLogin }
  ];

  return (
    <SignupContainerDiv>
      <SignupBoxDiv>
        <h1> 회 원 가 입 </h1>
        <InputVC id="id" placeholder="Input id" onChange={onChangeInputID} />
        <InputVC id="pwd" placeholder="Input passward" type="password" onChange={onChangeInputPWD} />
        <InputVC id="pwd" placeholder="Input passward check" type="password" onChange={onChangeInputPWDCheck} />
        <ButtonVC text="Signup" onClick={onClickSignup} />
        <LineVC text="or" />
        {SNSBUTTONS.map((value, index) => {
          return <ButtonVC key={value.id} id={value.id} type={value.type} text={value.text} onClick={value.onClick} />;
        })}
      </SignupBoxDiv>
    </SignupContainerDiv>
  );
});

const SignupContainerDiv = styled.div`
  position: relative;
  width: 60%;
  min-width: 300px;
  height: 100%;
  background-color: aqua;
  float: left;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const SignupBoxDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
`;

export default SignupContainer;
