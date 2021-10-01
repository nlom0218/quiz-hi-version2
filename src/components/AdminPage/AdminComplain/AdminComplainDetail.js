import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
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

const AdminComplainDetail = ({ type, id }) => {
  const { data, loading } = useQuery(ADMIN_SEE_CONTENT_DETATIL, {
    variables: {
      contentId: id,
      type
    }
  })
  const processType = () => {
    if (type === "quiz") {
      return "퀴즈"
    } else {
      return "문제"
    }
  }
  return (<Container>
    {loading ? "loading..." :
      <Layout>
        <div>해당 {processType()}의 신고 개수: {data?.adminSeeContentDetail?.QuestionComplain.length}</div>
        <DeleteBtn>문제 삭제하기</DeleteBtn>
      </Layout>
    }
  </Container>);
}

export default AdminComplainDetail;