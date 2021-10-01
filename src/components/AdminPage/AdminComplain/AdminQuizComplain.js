import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import AdminQuizComplainItem from './AdminQuizComplainItem';
import { PageBar, PageBarBtn, QuizQuestionList, TotalNum } from '../sharedCss';

const ADMIN_SEE_QUIZ_COMPLAIN_QUERY = gql`
  query adminSeeQuizComplain($page: Int!) {
    adminSeeQuizComplain(page: $page) {
      quiz {
        title
        id
        complain
        deleteDay
        user {
          username
        }
        QuizComplain {
          id
          message
          sender
          receiver
        }
      }
      totalNum
    }
  }
`

const AdminQuizComplain = () => {
  const [contents, setContents] = useState([])
  const [totalNum, setTotalNum] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = (result) => {
    const { adminSeeQuizComplain: { totalNum, quiz } } = result
    setContents(quiz)
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
          <div>작성자ID</div>
          <div>퀴즈 제목</div>
          <div className="detail_content">상세보기</div>
        </div>
        {contents.map((item, index) => {
          return <AdminQuizComplainItem key={index} {...item} />
        })}
      </QuizQuestionList>
    </React.Fragment>
  );
}

export default AdminQuizComplain;