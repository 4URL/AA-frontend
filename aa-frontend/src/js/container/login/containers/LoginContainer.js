import React, { PureComponent } from 'react';

import ButtonVC from '../components/views/ButtonVC';
import InputVC from '../components/views/InputVC';
import LineVC from '../components/views/LineVC';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { getEncodingText, onClickSnsLogin } from '../LoginFunction';

const SNSBUTTONS = [
  { type: 'google', id: 'google', text: 'Google', onClick: onClickSnsLogin },
  { type: 'kakao', id: 'kakao', text: 'Kakao', onClick: onClickSnsLogin },
  { type: 'naver', id: 'naver', text: 'Naver', onClick: onClickSnsLogin }
];

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      pwd: ''
    };

    this.onChangeLoginIdInput = this.onChangeLoginIdInput.bind(this);
    this.onChangeLoginPwdInput = this.onChangeLoginPwdInput.bind(this);
    this.onClickLoginButton = this.onClickLoginButton.bind(this);
  }

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
    console.log('loginButton action! return!!! ');

    // const repeatCount = 100000;
    // const crypto = require('crypto');
    // crypto.randomBytes(64, (err, buf) => {
    //   crypto.pbkdf2(pwd, buf.toString('base64'), repeatCount, 64, 'sha512', (err, key) => {
    //     console.log('random buf string ::: ', buf.toString('base64'));
    //     console.log('key string ::: ', key.toString('base64'));
    //   });
    // });

    const encodingPassword = getEncodingText(pwd);
    console.log('encodingPassword :: ', encodingPassword);

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
          <InputVC id="id" placeholder="Input id" onChange={this.onChangeLoginIdInput} />
          <InputVC id="pwd" placeholder="Input passward" type="password" onChange={this.onChangeLoginPwdInput} />
          <ButtonVC onClick={this.onClickLoginButton} text="로 그 인" />
        </div>
        <LineVC text="or" />
        <div className="sns-login-box">
          {SNSBUTTONS.map((value, index) => {
            return <ButtonVC key={value.id} id={value.id} type={value.type} text={value.text} onClick={value.onClick} />;
          })}
        </div>
        <div className="join-box">
          <div className="join-text"></div>
          <div className="join-button">
            <Link to="/signup"> 회 원 가 입 </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
