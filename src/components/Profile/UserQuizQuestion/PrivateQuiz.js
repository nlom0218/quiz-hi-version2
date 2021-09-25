import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import QuizList from '../../QuizFeed/QuizList';

const SEE_USER_PRIVATE_QUIZ_QUERY = gql`
  query seeUserPrivateQuiz($userId: Int!, $page: Int!) {
    seeUserPrivateQuiz(userId: $userId, page: $page) {
    id
    title
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
    questionNum
    isLiked
    likes
    hits
    createdAt
    }
  }
`

const PrivateQuiz = ({ totalNum, userId, setLastPage, setPutQuiz }) => {
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
  const { data, loading, refetch } = useQuery(SEE_USER_PRIVATE_QUIZ_QUERY, {
    variables: {
      page: parseInt(page),
      userId
    },
    onCompleted
  })
  return (<React.Fragment
  >
    {loading ? <div>loading...</div> : <QuizList
      setPutQuiz={setPutQuiz}
      loading={loading}
      seeQuiz={{ quiz: data.seeUserPrivateQuiz }}
    />}
  </React.Fragment>);
}

export default PrivateQuiz;