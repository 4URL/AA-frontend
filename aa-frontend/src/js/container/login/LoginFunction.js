const encodingText = (text, callback) => {
  const repeatCount = 100000;
  const crypto = require('crypto');
  crypto.pbkdf2(text, '', repeatCount, 64, 'sha512', (err, key) => {
    const encodingText = key.toString('base64');
    console.log('singup key string ::: ', encodingText);
    if (callback != undefined) {
      callback(encodingText);
    }
  });
};

const onClickSnsLogin = e => {
  const id = e.target.id;
  console.log('onCLick SnsLogin !! ', id);
};

module.exports = {
  encodingText,
  onClickSnsLogin
};
