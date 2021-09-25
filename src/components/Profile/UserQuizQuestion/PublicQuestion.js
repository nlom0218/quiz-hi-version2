import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import QuestionList from '../../QuizFeed/QuestionList';

const SEE_USER_PUBLIC_QUESTION_QUERY = gql`
  query seeUserPublicQuestion($userId: Int!, $page: Int!) {
    seeUserPublicQuestion(userId: $userId, page: $page) {
      id
      question
      user {
        id
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
`

const PublicQuestion = ({ totalNum, userId, setLastPage, setPutQuiz }) => {
  const { page } = useParams()
  const onCompleted = () => {
    if (totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalNum / 10)) {
      setLastPage(totalNum / 10)
      return
    }
    const lastPage = Math.floor(totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading } = useQuery(SEE_USER_PUBLIC_QUESTION_QUERY, {
    variables: {
      page: parseInt(page),
      userId
    },
    onCompleted
  })
  return (<React.Fragment>
    {loading ? <div>loading...</div> : <QuestionList
      setPutQuiz={setPutQuiz}
      loading={loading}
      seeQuestion={{ question: data.seeUserPublicQuestion }}
    />}
  </React.Fragment>);
}

export default PublicQuestion;