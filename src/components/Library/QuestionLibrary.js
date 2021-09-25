import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import QuestionItem from "./QuestionItem"
import LibraryContainer from "./LibraryContainer"
import NoDataMsg from './NoDataMsg';

const SEE_FOLLOW_QUESTION_QUERY = gql`
  query seeFollowQuestion($id: Int!, $page: Int!) {
    seeFollowQuestion(id: $id, page: $page) {
      totalNum
      question {
        id
        question
        user {
          nickname
          avatarURL
          username
        }
        tags {
          id
          name
        }
        type
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

const QuestionLibrary = () => {
  const user = useUser()
  const { page } = useParams()
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(false)
  const onCompleted = (data) => {
    if (data.seeFollowQuestion.totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(data.seeFollowQuestion.totalNum / 10)) {
      setLastPage(data.seeFollowQuestion.totalNum / 10)
      return
    }
    const lastPage = Math.floor(data.seeFollowQuestion.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading } = useQuery(SEE_FOLLOW_QUESTION_QUERY, {
    variables: {
      id: user?.id,
      page: parseInt(page)
    },
    skip: Boolean(!user),
    onCompleted
  })
  return (
    <LibraryContainer loading={loading} totalNum={data?.seeFollowQuestion?.totalNum} lastPage={lastPage} quiz={false} setPutQuiz={setPutQuiz}>
      {data?.seeFollowQuestion?.question.length === 0 ?
        <NoDataMsg content="문제" />
        :
        <QuizList>
          {
            data?.seeFollowQuestion?.question.map((item, index) => {
              return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} />
            })
          }
        </QuizList>}
    </LibraryContainer>);
}

export default QuestionLibrary;