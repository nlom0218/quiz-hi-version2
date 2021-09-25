import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import DetailTitle from '../components/Detail/DetailTitle';
import FollowTag from '../components/Detail/FollowTag';
import TotalInfo from '../components/Detail/TotalInfo';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import TagContents from '../components/Detail/TagContents';
import useTitle from '../hooks/useTitle';
import styled from 'styled-components';

const DetailContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const SEE_TAG_QUERY = gql`
  query seeTag($id: Int!) {
    seeTag(id: $id) {
      id
      name
      totalFollowUsers
      totalQuestions
      totalQuizzes
      isFollow
    }
  }
`

const FeedTag = () => {
  const history = useHistory()
  const titleUpdataer = useTitle("QUIZ HI | 태그")
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const onCompleted = (result) => {
    const { seeTag } = result
    if (!seeTag) {
      window.alert("요청하신 페이지가 없습니다.")
      history.push("/")
    } else {
      setLoading(false)
    }
  }
  const { data } = useQuery(SEE_TAG_QUERY, {
    variables: { id: parseInt(id) },
    onCompleted
  })
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        {loading && <div>loading...</div>}
        {data?.seeTag && <DetailContainer>
          <DetailTitle title={data?.seeTag?.name} />
          <FollowTag isFollow={data?.seeTag?.isFollow} id={parseInt(id)} name={data?.seeTag?.name} />
          <TotalInfo {...data?.seeTag} />
          <TagContents {...data?.seeTag} />
        </DetailContainer>}
      </BasicContainer>
      <NavBtn />
    </React.Fragment>
  );
}

export default FeedTag;