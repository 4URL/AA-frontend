import React, { Component } from 'react';
import LoginInput from '../components/LoginInput';
import SnsLoginButton from '../components/SnsLoginButton';
import styled from 'styled-components';
import styledVariable from '../../../StyledVariable';

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.onChangeLoginIdInput = this.onChangeLoginIdInput.bind(this);
    this.onChangeLoginPwdInput = this.onChangeLoginPwdInput.bind(this);
    this.onClickLoginButton = this.onClickLoginButton.bind(this);
  }

  state = {
    id: '',
    pwd: ''
  };

  onChangeLoginIdInput = e => {
    this.setState({
      id: e.target.value
    });
  };

  onChangeLoginPwdInput = e => {
    this.setState({
      pwd: e.target.value
    });
  };

  onClickLoginButton = e => {
    const { id, pwd } = this.state;
    console.log('login id ::: ', id);
    console.log('login pwd ::: ', pwd);

    const repeatCount = 100000;
    const crypto = require('crypto');
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(pwd, buf.toString('base64'), repeatCount, 64, 'sha512', (err, key) => {
        console.log('random buf string ::: ', buf.toString('base64'));
        console.log('key string ::: ', key.toString('base64'));
      });
    });

    let reqData = {
      resCode: '200',
      data: {
        userId: id,
        userInfo: {
          name: 'hyoil',
          email: 'awesome@google.com'
        }
      }
    };
    if (reqData['resCode'] == 200) {
      let userData = reqData['data'];

      console.log('login Success userData ::: ', userData);
      window.localStorage.setItem('userId', userData['userId']);
      window.localStorage.setItem('isAutoLogin', true);
    }
  };

  onClickSnsLogin = e => {
    console.log(e.target);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <LoginInput id="id" placeholder="Input id" onChange={this.onChangeLoginIdInput} />
          <LoginInput id="pwd" placeholder="Input passward" type="password" onChange={this.onChangeLoginPwdInput} />
          {/* <button 
						className = 'login-button'
						onClick = { this.onClickLoginButton }
					> 로 그 인 </button> */}

          <LoginButtonTag onClick={this.onClickLoginButton}>로 그 인</LoginButtonTag>
        </div>
        <div className="login-line-box">
          <div className="login-line"></div>
          <div className="or-text"> or </div>
          <div className="login-line"></div>
        </div>
        <div className="sns-login-box">
          <SnsLoginButton id="google" type="google" text="Gooogle" />
          <SnsLoginButton id="kakao" type="kakao" text="Kakao" />
          <SnsLoginButton id="naver" type="naver" text="Naver" />
        </div>
        <div className="join-box">
          <div className="join-text"></div>
          <div className="join-button"></div>
        </div>
      </div>
    );
  }
}

const LoginButtonTag = styled.button.attrs(props => ({
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

	background-color: ${styledVariable.LOGIN_BUTTON_BG_COLOR}

	margin-top: 73px;
`;

export default LoginBox;
