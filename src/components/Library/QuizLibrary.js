import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import QuizItem from "./QuizItem"
import LibraryContainer from "./LibraryContainer"
import NoDataMsg from './NoDataMsg';

const SEE_FOLLOW_QUIZ_QUERY = gql`
  query seeFollowQuiz($id: Int!, $page: Int!) {
    seeFollowQuiz(id: $id, page: $page) {
      totalNum
      quiz {
      id
      title
      user {
        nickname
        avatarURL
        username
      }
      tags {
        id
        name
      }
      questionNum
      isLiked
      likes
      hits
      createdAt
      }
    }
  }
`

const QuizList = styled.div`
  grid-column: 1 / 2;
  align-self: flex-start;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const QuizLibrary = () => {
  const user = useUser()
  const { page } = useParams()
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(false)
  const onCompleted = (data) => {
    if (data.seeFollowQuiz.totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(data.seeFollowQuiz.totalNum / 10)) {
      setLastPage(data.seeFollowQuiz.totalNum / 10)
      return
    }
    const lastPage = Math.floor(data.seeFollowQuiz.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading } = useQuery(SEE_FOLLOW_QUIZ_QUERY, {
    variables: {
      id: user?.id,
      page: parseInt(page)
    },
    skip: Boolean(!user),
    onCompleted
  })
  return (
    <LibraryContainer loading={loading} totalNum={data?.seeFollowQuiz?.totalNum} lastPage={lastPage} quiz={true} setPutQuiz={setPutQuiz}>
      {data?.seeFollowQuiz?.quiz.length === 0 ?
        <NoDataMsg content="퀴즈" />
        :
        <QuizList>
          {
            data?.seeFollowQuiz?.quiz.map((item, index) => {
              return <QuizItem key={index} {...item} setPutQuiz={setPutQuiz} />
            })
          }
        </QuizList>}
    </LibraryContainer>);
}

export default QuizLibrary;