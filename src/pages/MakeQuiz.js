import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import MakeQuestionContainer from '../components/MakeQuiz/MakeQuestionContainer';
import MakeQuizForm from '../components/MakeQuiz/MakeQuizForm';
import QuizFormLayout from '../components/MakeQuiz/QuizFormLayout';
import Step from '../components/MakeQuiz/Step';
import PageTitle from '../components/PageTitle';
import NavBtn from '../components/NavBtn';
import CompletionQuiz from '../components/MakeQuiz/CompletionQuiz';
import useUser from '../hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import useTitle from '../hooks/useTitle';

const MakeQuiz = () => {
  const titleUpdataer = useTitle("QUIZ HI | 퀴즈 만들기")
  const user = useUser()
  const [quizTitle, setQuizTitle] = useState("")
  const [quizTags, setQuizTags] = useState([])
  const [quizCaption, setQuizCaption] = useState("")
  const [state, setState] = useState("")
  const [questionIdArr, setQuestionIdArr] = useState([])
  const [makeQuestion, setMakeQuestion] = useState(false)
  const [makeQuiz, setMakeQuiz] = useState(false)
  const [questionNum, setQuestionNum] = useState(["q"])
  useEffect(() => {
    if (user?.type === "nomal") {
      setState("private")
    }
  }, [])
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle><FontAwesomeIcon icon={faPencilAlt} /> 퀴즈 만들기</PageTitle>
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
        questionNum.map((item, index) => {
          return <Step
            step={2}
            msg="문제의 유형을 선택한 후 문제와 정답을 입력하세요."
            key={index}
          >
            <QuizFormLayout>
              <MakeQuestionContainer
                num={index + 1}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                quizTags={quizTags}
                setQuestionIdArr={setQuestionIdArr}
                questionIdArr={questionIdArr}
                setMakeQuiz={setMakeQuiz}
                state={state}
                imageId={`${index}image`}
              />
            </QuizFormLayout>
          </Step>
        })
      }
      {makeQuiz && <Step step={3} msg="아래 내용을 확인 후 퀴즈 만들기 버튼을 눌러 퀴즈를 완성하세요.">
        <QuizFormLayout>
          <CompletionQuiz
            quizTags={quizTags}
            quizTitle={quizTitle}
            quizCaption={quizCaption}
            state={state}
            questionIdArr={questionIdArr}
          />
        </QuizFormLayout>
      </Step>}
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default MakeQuiz;