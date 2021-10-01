import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getCreatedDay } from '../../../sharedFn';
import { DeleteBtn } from '../sharedCss';

const Container = styled.div`
  justify-self: center;
  grid-column: 1 / -1;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  align-items: center;
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

const AdminComplainDetail = ({ type, id }) => {
  const { data, loading } = useQuery(ADMIN_SEE_CONTENT_DETATIL, {
    variables: {
      contentId: id,
      type
    }
  })
  const onCompleted = (result) => {
    const { adminSetDeleteDay: { ok, error } } = result
    if (!ok) {
      window.alert(error)
    } else {
      window.alert("삭제 날짜가 설정되었습니다.")
    }
  }
  const [adminSetDeleteDay, { loading: delLoading }] = useMutation(ADMIN_SET_DELETE_DAY_MUTATION, {
    onCompleted
  })
  const complainNum = data?.adminSeeContentDetail?.QuestionComplain.length || 1
  const processType = () => {
    if (type === "quiz") {
      return "퀴즈"
    } else {
      return "문제"
    }
  }
  const onClickDelBtn = () => {
    // if (complainNum < 10) {
    //   window.alert("신고 개수가 10개 이상이어야 삭제가 가능합니다.")
    //   return
    // } else {
    if (delLoading) {
      return
    }
    const data = Date.now()
    const delDay = data + 604800016
    adminSetDeleteDay({
      variables: {
        contentId: id,
        type,
        deleteDay: "" + delDay
      }
    })
    // }
  }
  return (<Container>
    {loading ? "loading..." :
      <Layout>
        <div>해당 {processType()}의 신고 개수: {data?.adminSeeContentDetail?.QuestionComplain.length}</div>
        <DeleteBtn onClick={onClickDelBtn}>문제 삭제하기</DeleteBtn>
      </Layout>
    }
  </Container>);
}

export default AdminComplainDetail;