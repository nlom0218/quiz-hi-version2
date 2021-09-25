import { useQuery } from '@apollo/client';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import SetQuestionOrder from '../components/Library/MakeNewQuiz/SetQuestionOrder';
import QuestionLibrary from '../components/Library/QuestionLibrary';
import QuizLibrary from '../components/Library/QuizLibrary';
import CompletionQuiz from '../components/MakeQuiz/CompletionQuiz';
import MakeQuizForm from '../components/MakeQuiz/MakeQuizForm';
import QuizFormLayout from '../components/MakeQuiz/QuizFormLayout';
import Step from '../components/MakeQuiz/Step';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';
import useUser from '../hooks/useUser';

const SEE_NEW_MAKE_QUESTION_ID = gql`
  query seeNewMakeQuestion($id: Int!, $questionId: String!) {
    seeNewMakeQuestion(id: $id, questionId: $questionId) {
      question
      id 
      distractor
      answer
    }
  }
`

const LibraryMakeQuiz = () => {
  const user = useUser()
  const [quizTitle, setQuizTitle] = useState("")
  const [quizTags, setQuizTags] = useState([])
  const [quizCaption, setQuizCaption] = useState("")
  const [state, setState] = useState("")
  const [questionIdArr, setQuestionIdArr] = useState([])
  const [makeQuestion, setMakeQuestion] = useState(false)
  const [makeQuiz, setMakeQuiz] = useState(false)
  const [orderArr, setOrderArr] = useState([])
  useEffect(() => {
    if (user?.type === "nomal") {
      setState("private")
    }
  }, [])
  const questionId = JSON.parse(localStorage.getItem("libraryQuestionBasket")).map((item) => item.id)
  const { data, loading } = useQuery(SEE_NEW_MAKE_QUESTION_ID, {
    variables: {
      id: user?.id,
      questionId: JSON.stringify(questionId)
    },
    skip: !user
  })
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <PageTitle><FontAwesomeIcon icon={faBookReader} /> 라이브러리 / 새로운 퀴즈 만들기</PageTitle>
        <Step step={1} msg="퀴즈의 제목과 태그를 입력하세요." frist={true}>
          <QuizFormLayout>
            <MakeQuizForm
              quizTags={quizTags}
              setQuizTags={setQuizTags}
              setQuizTitle={setQuizTitle}
              setQuizCaption={setQuizCaption}
              setMakeQuestion={setMakeQuestion}
              makeQuestion={makeQuestion}
              quizTitle={quizTitle}
              state={state}
              setState={setState}
              quizCaption={quizCaption}
            />
          </QuizFormLayout>
        </Step>
        {makeQuestion &&
          <Step step={2} msg="라이브러리에서 선택한 문제의 순서를 정하세요.">
            <QuizFormLayout>
              <SetQuestionOrder
                dataQuestions={data?.seeNewMakeQuestion}
                setMakeQuiz={setMakeQuiz}
                makeQuiz={makeQuiz}
                setQuestionIdArr={setQuestionIdArr}
                setOrderArr={setOrderArr}
              />
            </QuizFormLayout>
          </Step>
        }
        {makeQuiz && <Step step={3} msg="아래 내용을 확인 후 퀴즈 만들기 버튼을 눌러 퀴즈를 완성하세요.">
          <QuizFormLayout>
            <CompletionQuiz
              quizTags={quizTags}
              quizTitle={quizTitle}
              quizCaption={quizCaption}
              state={state}
              questionIdArr={questionIdArr}
              orderArr={orderArr}
            />
          </QuizFormLayout>
        </Step>}
      </BasicContainer>
    </React.Fragment>
  );
}

export default LibraryMakeQuiz;