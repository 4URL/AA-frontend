import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/Close';

const Popup = memo(props => {
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupBottomButtonObjs, setPopupBottomButtonObjs] = useState([]);

  useEffect(() => {
    switch (popupType) {
      case 'Alert':
        setPopupBottomButtonObjs([{ key: '1', type: 'ok', text: '확인' }]);
        break;

      default:
        setPopupBottomButtonObjs([
          { key: '2', type: 'ok', text: '확인' },
          { key: '3', type: 'cancel', text: '취소' }
        ]);
    }
  }, []);

  return (
    <PopupWrap>
      <PopupBg></PopupBg>
      <PopupBox>
        <PopupTop>
          {/* <div> Top </div> */}
          <PopupTitle> Top </PopupTitle>
          <DeleteSearchItemIcon />
        </PopupTop>

        <PopupMiddle>
          {/* <div> Middle </div> */}
          <PopupContent>
            <PopupContentText>Text Align Center</PopupContentText>
          </PopupContent>
        </PopupMiddle>

        <PopupBottom>
          {/* <div> Bottom </div> */}
          {popupBottomButtonObjs.map((element, idx) => (
            <BottomButton key={idx} type={element.type}>
              {element.text}
            </BottomButton>
          ))}
        </PopupBottom>
      </PopupBox>
    </PopupWrap>
  );
});

Popup.displayName = 'Popup';

export default Popup;

const PopupWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  &[show='off'] {
    display: none;
  }
  &[show='on'] {
    display: fixed;
  }
`;

const PopupBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.1;
`;

const PopupBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
`;

const PopupTop = styled.div`
  width: 500px;
`;

const PopupTitle = styled.div`
  display: inline-block;
`;

const DeleteSearchItemIcon = styled(Close)`
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
`;

const PopupMiddle = styled.div`
  width: 500px;
`;

const PopupContent = styled.div`
  width: 100%;
`;

const PopupContentText = styled.div`
  width: 100%;
  text-align: center;
`;

const PopupBottom = styled.div`
  width: 500px;
`;

const BottomButton = styled.div`
  display: inline-block;
  color: white;
  background-color: black;
  cursor: pointer;
  text-align: center;
`;
