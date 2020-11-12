const getEncodingText = text => {
  const repeatCount = 100000;
  const crypto = require('crypto');
  crypto.pbkdf2(text, '', repeatCount, 64, 'sha512', (err, key) => {
    console.log('singup key string ::: ', key.toString('base64'));
    return key.toString('base64');
  });
};

const onClickSnsLogin = e => {
  const id = e.target.id;
  console.log('onCLick SnsLogin !! ', id);
};

module.exports = {
  getEncodingText,
  onClickSnsLogin
};
