
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import AdminQuestionComplainItem from './AdminQuestionComplainItem';
import { PageBar, PageBarBtn, QuizQuestionList, TotalNum } from '../sharedCss';

const ADMIN_SEE_QUESTION_COMPLAIN_QUERY = gql`
  query adminSeeQuestionComplain($page: Int!) {
    adminSeeQuestionComplain(page: $page) {
      totalNum
      questionComplain {
        question {
          question
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

const AdminQuestionComplain = () => {
  const [seeInfo, setSeeInfo] = useState(false)
  const [contents, setContents] = useState([])
  const [totalNum, setTotalNum] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = (result) => {
    const { adminSeeQuestionComplain: { totalNum, questionComplain } } = result
    setContents(questionComplain)
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
  const { data, loading } = useQuery(ADMIN_SEE_QUESTION_COMPLAIN_QUERY, {
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
  return (contents.length === 0 ? "신고된 문제가 없습니다." :
    <React.Fragment>
      <div className="topContent">
        <TotalNum>{totalNum}명의 문제 신고</TotalNum>
        <PageBar>
          <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
          <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
        </PageBar>
      </div>
      <QuizQuestionList>
        <div className="sortItem">
          <div>문제ID</div>
          <div>보낸이ID</div>
          <div>받은이ID</div>
          <div>신고내용</div>
          <div className="detail_content">상세보기</div>
        </div>
        {contents.map((item, index) => {
          return <AdminQuestionComplainItem key={index} {...item} />
        })}
      </QuizQuestionList>
    </React.Fragment>);
}

export default AdminQuestionComplain;