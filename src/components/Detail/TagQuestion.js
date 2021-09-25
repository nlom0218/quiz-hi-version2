import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import QuestionList from '../QuizFeed/QuestionList';
import TagQuizQuestionLayout from './TagQuizQuestionLayout';

const SEE_TAG_QUESTION_QUERY = gql`
  query seeTagQuestion($type: String!, $id: Int!, $page: Int!) {
    seeTagQuestion(type: $type, id: $id, page: $page) {
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
`

const TagQuestion = ({ id, totalQuestions }) => {
  const { page, sort } = useParams()
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(true)
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  const onCompleted = () => {
    if (totalQuestions === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalQuestions / 10)) {
      setLastPage(totalQuestions / 10)
      return
    }
    const lastPage = Math.floor(totalQuestions / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_TAG_QUESTION_QUERY, {
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
      contents="question"
    >
      {loading ? <div>loading...</div> : <QuestionList
        setPutQuiz={setPutQuiz}
        loading={loading}
        seeQuestion={{ question: data.seeTagQuestion }}
      />}
    </TagQuizQuestionLayout>
  );
}

export default TagQuestion;