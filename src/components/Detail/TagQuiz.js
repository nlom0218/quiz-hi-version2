import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import QuizList from '../QuizFeed/QuizList';
import TagQuizQuestionLayout from './TagQuizQuestionLayout';

const SEE_TAG_QUIZ_QUERY = gql`
  query Query($type: String!, $id: Int!, $page: Int!) {
    seeTagQuiz(type: $type, id: $id, page: $page) {
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
`

const TagQuiz = ({ id, totalQuizzes }) => {
  const { page, sort } = useParams()
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(true)
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  const onCompleted = () => {
    if (totalQuizzes === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalQuizzes / 10)) {
      setLastPage(totalQuizzes / 10)
      return
    }
    const lastPage = Math.floor(totalQuizzes / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_TAG_QUIZ_QUERY, {
    variables: {
      type: sort,
      page: parseInt(page),
      id
    },
    onCompleted
  })
  return (
    <TagQuizQuestionLayout
      setPutQuiz={setPutQuiz}
      page={parseInt(page)}
      lastPage={lastPage}
      refetch={refetch}
      contents="quiz"
    >
      {loading ? <div>loading...</div> : <QuizList
        setPutQuiz={setPutQuiz}
        loading={loading}
        seeQuiz={{ quiz: data.seeTagQuiz }}
      />}
    </TagQuizQuestionLayout>
  );
}

export default TagQuiz;