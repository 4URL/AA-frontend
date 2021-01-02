import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Phone, Home, MessageSquareDetail } from '@styled-icons/boxicons-regular';
import { Clock } from '@styled-icons/bootstrap';
import { Close, ContentCopy } from '@styled-icons/material-rounded';
import { Location } from '@styled-icons/ionicons-outline';

import { showDetail } from '../../../redux/actions/index';

const PlaceDetailContainer = props => {
  const { placeDetail, showDetail } = props.mapState;
  return (
    <>
      {!showDetail ? (
        <></>
      ) : (
        <BoxContainer>
          <CloseIcon onClick={() => props.showDetail(false)} />
          <DetailContainer>
            <PlaceName>
              {placeDetail.name}
              <SubCategory>&nbsp;({placeDetail.subCategory})</SubCategory>
            </PlaceName>
            <DetailTableContainer>
              {placeDetail.phoneNumber ? (
                <TableColumn>
                  <TableHeader>
                    <PhoneIcon />
                  </TableHeader>
                  <TableData>{placeDetail.phoneNumber}</TableData>
                </TableColumn>
              ) : (
                <></>
              )}
              {placeDetail.address ? (
                <TableColumn>
                  <TableHeader>
                    <AddressIcon />
                  </TableHeader>
                  <TableData>
                    {placeDetail.roadAddress}
                    &nbsp;
                    <CopyToClipboard text={placeDetail.roadAddress}>
                      <CopiedIcon />
                    </CopyToClipboard>
                  </TableData>
                </TableColumn>
              ) : (
                <></>
              )}
              {placeDetail.workingDay ? (
                <TableColumn>
                  <TableHeader>
                    <ClockIcon />
                  </TableHeader>
                  <TableData>{splitWorkingday(placeDetail.workingDay)}</TableData>
                </TableColumn>
              ) : (
                <></>
              )}
              {placeDetail.homepage ? (
                <TableColumn>
                  <TableHeader>
                    <HomepageIcon />
                  </TableHeader>
                  <TableData>
                    <HomepageLink href={`${placeDetail.homepage}`}>{placeDetail.homepage}</HomepageLink>
                  </TableData>
                </TableColumn>
              ) : (
                <></>
              )}
              {placeDetail.convenience ? (
                <TableColumn>
                  <TableHeader>
                    <ConvenienceIcon />
                  </TableHeader>
                  <TableData>{placeDetail.convenience}</TableData>
                </TableColumn>
              ) : (
                <></>
              )}
            </DetailTableContainer>
          </DetailContainer>
        </BoxContainer>
      )}
    </>
  );

  function splitWorkingday(string) {
    const splitWords = string.split('|').map(time => time.trim());

    return (
      <WorkingdayList>
        {splitWords.map((word, idx) => {
          return <li key={idx}>{word}</li>;
        })}
      </WorkingdayList>
    );
  }
};

const mapStateToProps = state => {
  return {
    mapState: state.mapReducers
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showDetail
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailContainer);

const BoxContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 420px;
  height: calc(100vh - 110px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
`;

const CloseIcon = styled(Close)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
`;

const DetailContainer = styled.div`
  width: 70%;
`;

const PlaceName = styled.p`
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 800;
`;

const SubCategory = styled.span`
  font-weight: 400;
  color: gray;
`;

const DetailTableContainer = styled.table`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 10px 0;
`;

const TableColumn = styled.tr`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid lightgray;

  :last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  :first-child {
    padding-top: 0;
  }
`;

const TableHeader = styled.th`
  padding: 0 6px;
`;

const TableData = styled.td`
  border-bottom: 1px solid lightgray;
  width: 100%;
  word-break: break-word;

  :last-child {
    border-bottom: none;
  }
`;

const HomepageLink = styled.a`
  text-decoration: none;
  color: black;

  :hover {
    color: blue;
  }
`;

const WorkingdayList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

// icon components
const PhoneIcon = styled(Phone)`
  width: 20px;
  height: 20px;
`;

const ClockIcon = styled(Clock)`
  width: 18px;
  height: 18px;
`;

const AddressIcon = styled(Location)`
  width: 20px;
  height: 20px;
`;

const ConvenienceIcon = styled(MessageSquareDetail)`
  width: 20px;
  height: 20px;
`;

const HomepageIcon = styled(Home)`
  width: 20px;
  height: 20px;
`;

const CopiedIcon = styled(ContentCopy)`
  width: 15px;
  height: 15px;

  :hover {
    cursor: pointer;
    color: green;
  }
`;
