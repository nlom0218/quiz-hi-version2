import { useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { compare } from '../../../sharedFn';
import QuestionBox from './QuestionBox';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const QuizTitle = styled.div`
  margin-bottom: 10px;
  font-size: 28px;
  svg {
    margin-right: 20px;
  }
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
    }
  }
`

const StartQuiz = () => {
  const quizList = JSON.parse(localStorage.getItem("quizList"))
  const totalNum = quizList.length
  const [questionNum, setQuestionNum] = useState(parseInt(localStorage.getItem("questionNum")) || 1)
  const [student, setStduent] = useState(JSON.parse(localStorage.getItem("joinStudent")).sort(compare("id")))
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: {
      id: parseInt(localStorage.getItem("selectQuiz"))
    }
  })
  return (<Container>
    <QuizTitle>
      <FontAwesomeIcon icon={faBook} />
      {data?.detailQuiz?.title.length > 40 ? `${data?.detailQuiz?.title.substring(0, 40)}...` : data?.detailQuiz?.title}
    </QuizTitle>
    <QuestionBox setQuestionNum={setQuestionNum} questionNum={questionNum} quizList={quizList} totalNum={totalNum} student={student} setStduent={setStduent} />
  </Container>);
}

export default StartQuiz;