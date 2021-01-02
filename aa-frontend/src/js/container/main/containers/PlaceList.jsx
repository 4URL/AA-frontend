import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ContentCopy, ArrowBackIos, ArrowForwardIos } from '@styled-icons/material-rounded';

import { placeDetail, showDetail, changePageNumber } from '../../../redux/actions/index';

// pagination을 한 장소리스트가 등장
const PlaceList = props => {
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // const { placesList, showList } = props.mapState;
  const { placesList, showList, curPage } = props.mapState;
  // const { count, curPage, handleCurPage } = props;
  const { count } = props;

  const PLACES_PER_PAGE = 6;
  const TOTAL_PAGES = Math.ceil(count / PLACES_PER_PAGE);

  const pageList = showedPageList(curPage, TOTAL_PAGES);

  useEffect(() => {
    if (curPage === 1) {
      setIsFirstPage(true);
    } else if (isFirstPage) {
      setIsFirstPage(false);
    }

    if (curPage === TOTAL_PAGES) {
      setIsLastPage(true);
    } else if (isLastPage) {
      setIsLastPage(false);
    }
  }, [curPage, count]);

  return (
    <>
      {!showList ? (
        <></>
      ) : (
        <BoxContainer>
          <ListTable>
            {placesList.map((place, idx) => {
              return (
                <TableColumn key={idx}>
                  <TableData>
                    <PlaceName onClick={() => clickPlaceName(place)}>{place.name}</PlaceName>
                    &nbsp;
                    <SubCategory>({place.subCategory})</SubCategory>
                  </TableData>
                  <TableData>
                    <Address>
                      {place.roadAddress}
                      &nbsp;
                      <CopyToClipboard text={place.roadAddress}>
                        <CopiedIcon />
                      </CopyToClipboard>
                    </Address>
                  </TableData>
                </TableColumn>
              );
            })}
          </ListTable>

          <PageContainer>
            <BackArrow onClick={previousPage} isFirstPage={isFirstPage} />
            {pageList.map((pageNum, idx) => {
              return (
                <PageDiv key={idx} curPage={curPage} pageIdx={Number(pageNum)} onClick={() => clickPage(pageNum)}>
                  {pageNum}
                </PageDiv>
              );
            })}
            <FowardArrow onClick={nextPage} isLastPage={isLastPage} />
          </PageContainer>
        </BoxContainer>
      )}
    </>
  );

  function previousPage() {
    if (curPage <= 1) return;
    // handleCurPage(curPage - 1);
    props.changePageNumber(curPage - 1);
  }

  function nextPage() {
    if (TOTAL_PAGES <= curPage) return;
    // handleCurPage(curPage + 1);
    props.changePageNumber(pageNum + 1);
  }

  function clickPage(pageNum) {
    // handleCurPage(pageNum);
    props.changePageNumber(pageNum);
  }

  function showedPageList(curPage, totalPages) {
    let arr = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (curPage < 3) {
        startPage = 1;
        endPage = 5;
        //page list가 변하기 시작할 때
      } else if (curPage + 2 > totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = curPage - 2;
        endPage = curPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      arr.push(i);
    }
    return arr;
  }

  function clickPlaceName(place) {
    props.placeDetail(place);
    props.showDetail(true);
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
      placeDetail,
      showDetail,
      changePageNumber
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);

const BoxContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 4;
  width: 420px;
  height: calc(100vh - 110px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
`;

const ListTable = styled.table`
  width: 100%;
`;

const TableColumn = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 12vh;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;

  :first-child {
    border-top: 1px solid gray;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const TableData = styled.div`
  margin-left: 20px;

  :first-child {
    margin-bottom: 5px;
  }
`;

const PlaceName = styled.span`
  text-decoration: none;
  font-weight: 800;

  :hover {
    cursor: pointer;
    color: blue;
  }
`;

const SubCategory = styled.span``;

const Address = styled.span``;

const PageContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackArrow = styled(ArrowBackIos)`
  width: 16px;
  height: 16px;
  color: ${({ isFirstPage }) => (isFirstPage ? 'gray' : 'black')};
  cursor: ${({ isFirstPage }) => (isFirstPage ? 'default' : 'pointer')};
`;

const FowardArrow = styled(ArrowForwardIos)`
  width: 16px;
  height: 16px;
  color: ${({ isLastPage }) => (isLastPage ? 'gray' : 'black')};
  cursor: ${({ isLastPage }) => (isLastPage ? 'default' : 'pointer')};
`;

const PageDiv = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  color: ${({ curPage, pageIdx }) => (curPage === pageIdx ? 'blue' : 'black')};
  cursor: pointer;
  font-size: 15px;
  margin-left: 5px;
  line-height: 16px;

  :last-child {
    margin-right: 5px;
  }
`;

const CopiedIcon = styled(ContentCopy)`
  width: 15px;
  height: 15px;

  :hover {
    cursor: pointer;
    color: green;
  }
`;
