import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PageBar, PageBarBtn, QuizQuestionList, TotalNum } from '../sharedCss';
import AdminSuggestionItem from './AdminSuggestionItem';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  .topContent {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: flex-end;
  }
`

const SugList = styled.ul`
display: grid;
grid-template-columns: 1fr;
background-color: rgb(200, 200, 200, 0.8);
row-gap: 1px;
border: 1px solid rgb(200, 200, 200, 0.8);
  .detail_content {
    justify-self: center;
    cursor: pointer;
  }
  .link_btn {
  cursor: pointer;
  }
  .sortItem {
  padding: 15px 20px;
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  display: grid;
  grid-template-columns: 2fr 4fr 0.5fr;
  column-gap: 10px;
  div {
    font-weight: 600;
  }
}
`

const SEE_SUGGESTIONS_QUERY = gql`
  query adminSeeSuggetions($page: Int!) {
    adminSeeSuggetions(page: $page) {
      suggestions {
        suggestion
        sender
        id
      }
      totalNum
    }
  }
`

const AdminSuggestion = () => {
  const [contents, setContents] = useState([])
  const [totalNum, setTotalNum] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = (result) => {
    const { adminSeeSuggetions: { totalNum, suggestions } } = result
    setContents(suggestions)
    setTotalNum(totalNum)
    if (totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalNum / 20)) {
      setLastPage(totalNum / 20)
      return
    }
    const lastPage = Math.floor(totalNum / 20) + 1
    setLastPage(lastPage)
  }
  const { data, loading } = useQuery(SEE_SUGGESTIONS_QUERY, {
    variables: {
      page
    },
    onCompleted
  })
  const onClickPageBtn = (btn) => {
    if (btn === "pre") {
      if (page === 1) {
        return
      } else {
        setPage(prev => prev - 1)
      }
    } else if (btn === "next") {
      if (lastPage === page) {
        return
      } else {
        setPage(prev => prev + 1)
      }
    }
  }
  return (
    <Container>
      <div className="topContent">
        <TotalNum>{totalNum}개의 건의사항</TotalNum>
        <PageBar>
          <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
          <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
        </PageBar>
      </div>
      <SugList>
        <div className="sortItem">
          <div>보낸이ID</div>
          <div>건의사항</div>
          <div className="detail_content">상세보기</div>
        </div>
        {contents.map((item, index) => {
          return <AdminSuggestionItem key={index} {...item} />
        })}
      </SugList>
    </Container>
  );
}

export default AdminSuggestion;