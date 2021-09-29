import { useQuery } from '@apollo/client';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PageBar, PageBarBtn, QuizQuestionList, TotalNum } from './sharedCss';

const ADMIN_SEE_QUIZ_COMPLAIN_QUERY = gql`
  query adminSeeQuizComplain($page: Int!) {
    adminSeeQuizComplain(page: $page) {
      totalNum
      quizComplain {
        quiz {
          title
          id
        }
        id
        message
        sender
        receiver
      }
    }
  }
`

const AdminQuizComplain = () => {
  const [contents, setContents] = useState([])
  const [totalNum, setTotalNum] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = (result) => {
    const { adminSeeQuizComplain: { totalNum, quizComplain } } = result
    setContents(quizComplain)
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
  const { data, loading } = useQuery(ADMIN_SEE_QUIZ_COMPLAIN_QUERY, {
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
  return (contents.length === 0 ? "신고된 퀴즈가 없습니다." :
    <React.Fragment>
      <div className="topContent">
        <TotalNum>{totalNum}명의 퀴즈 신고</TotalNum>
        <PageBar>
          <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
          <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
        </PageBar>
      </div>
      <QuizQuestionList>
        <div className="sortItem">
          <div>퀴즈ID</div>
          <div>보낸이ID</div>
          <div>받은이ID</div>
          <div>신고내용</div>
          <div className="detail_content">상세보기</div>
        </div>
        {/* {user.map((item, index) => {
          return <UserItem key={index} {...item} seeType={seeType} />
        })} */}
      </QuizQuestionList>
    </React.Fragment>
  );
}

export default AdminQuizComplain;