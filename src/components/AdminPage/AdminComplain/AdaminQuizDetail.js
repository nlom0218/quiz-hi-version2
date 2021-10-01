import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getCreatedDay } from '../../../sharedFn';
import { DeleteBtn } from '../sharedCss';

const Container = styled.div`
  grid-column: 2 / -1;
`

const ComplainList = styled.div`
  display: grid;
  background-color: rgb(200, 200, 200, 0.8);
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.8);

`

const ComplainItem = styled.div`
  background-color: ${props => props.theme.boxColor};
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 40px 1fr 3fr;
  column-gap: 10px;
  transition: background-color 1s ease;
`

const ADMIN_SEE_CONTENT_DETATIL = gql`
  query adminSeeContentDetail($contentId: Int!, $type: String!) {
    adminSeeContentDetail(contentId: $contentId, type: $type) {
      id
      QuestionComplain {
        message
        sender
      }
    }
  }
`

const ADMIN_SET_DELETE_DAY_MUTATION = gql`
  mutation adminSetDeleteDay($contentId: Int!, $type: String!, $deleteDay: String!) {
    adminSetDeleteDay(contentId: $contentId, type: $type, deleteDay: $deleteDay) {
      ok
      error
    }
  }
`

const AdaminQuizDetail = ({ QuizComplain }) => {
  // const { data, loading } = useQuery(ADMIN_SEE_CONTENT_DETATIL, {
  //   variables: {
  //     contentId: id,
  //     type
  //   }
  // })
  // const onCompleted = (result) => {
  //   const { adminSetDeleteDay: { ok, error } } = result
  //   if (!ok) {
  //     window.alert(error)
  //   } else {
  //     window.alert("삭제 날짜가 설정되었습니다.")
  //   }
  // }
  // const [adminSetDeleteDay, { loading: delLoading }] = useMutation(ADMIN_SET_DELETE_DAY_MUTATION, {
  //   onCompleted
  // })
  // const complainNum = data?.adminSeeContentDetail?.QuestionComplain.length || 1
  // const processType = () => {
  //   if (type === "quiz") {
  //     return "퀴즈"
  //   } else {
  //     return "문제"
  //   }
  // }
  const onClickDelBtn = () => {
    // if (complainNum < 10) {
    //   window.alert("신고 개수가 10개 이상이어야 삭제가 가능합니다.")
    //   return
    // } else {
    // if (delLoading) {
    //   return
    // }
    // const data = Date.now()
    // const delDay = data + 604800016
    // adminSetDeleteDay({
    //   variables: {
    //     contentId: id,
    //     type,
    //     deleteDay: "" + delDay
    //   }
    // })
    // }
  }
  const processSender = (str) => {
    const obj = JSON.parse(str)
    const { username } = obj
    return username
  }
  const onCLickUser = (str) => {
    const obj = JSON.parse(str)
    const { username } = obj
    window.open(`/profile/${username}/info`, "_blank")
  }
  return (<Container>
    <ComplainList>
      {QuizComplain.map((item, index) => {
        return <ComplainItem key={index}>
          <div>{index + 1}.</div>
          <div className="link_btn" onClick={() => onCLickUser(item.sender)}>보낸이: {processSender(item.sender)}</div>
          <div>{item.message}</div>
        </ComplainItem>
      })}
    </ComplainList>
    {/* <DeleteBtn onClick={onClickDelBtn}>문제 삭제하기</DeleteBtn> */}
  </Container>);
}

export default AdaminQuizDetail;