import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubQuestion from './SubQuestion';
import ObjQuestion from "./ObjQuestion"
import TFQuestion from "./TFQuestion"
import { fadeIn } from '../../animation/fade';

const SMakeQuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 60px;
`

const QuestionNum = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const QuestionType = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
`

const Types = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   justify-items: start;
   align-items: center;
   svg {
     margin-right: 10px;
     cursor: pointer;
   }
`

const QuizSaveMsg = styled.div`
    animation: ${fadeIn} 0.6s linear forwards;
    .mainMsg{
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 600;
    }
    .subMsg {
      color: tomato;
    }
`

const MakeQuestionContainer = ({ quizTags, setQuestionIdArr, questionIdArr, questionNum, setQuestionNum, num, imageId, setMakeQuiz, state }) => {
  const [nextMode, setNextMode] = useState("")
  const [quizType, setQuizType] = useState("sub")
  const onClickType = (type) => {
    setQuizType(type)
  }
  useEffect(() => {
    if (nextMode === "newQuestion") {
      setQuestionNum([...questionNum, "p"])
    } else if (nextMode === "nextStep") {
      setMakeQuiz(true)
    }
  }, [nextMode])
  return (<SMakeQuestionContainer>
    <QuestionNum>{num}번 문제</QuestionNum>
    { nextMode === "" ?
      <QuestionType>
        <span>문제 유형</span>
        <Types>
          <div>
            <FontAwesomeIcon
              onClick={() => onClickType("sub")}
              icon={quizType === "sub" ? faCheckCircle : faCircle}
            />
          주관식
          </div>
          <div>
            <FontAwesomeIcon
              onClick={() => onClickType("obj")}
              icon={quizType === "obj" ? faCheckCircle : faCircle}
            />
          객관식
          </div>
          <div>
            <FontAwesomeIcon
              onClick={() => onClickType("tf")}
              icon={quizType === "tf" ? faCheckCircle : faCircle}
            />
          ○ / ✕
          </div>
        </Types>
      </QuestionType> :
      <QuizSaveMsg>
        <div className="mainMsg">{num}번 문제가 생성되었습니다.</div>
        <div className="subMsg">문제는 자동으로 프로필 ‣ 퀴즈 & 문제에 저장이 됩니다.</div>
      </QuizSaveMsg>
    }
    {quizType === "sub"
      && <SubQuestion
        quizTags={quizTags}
        quizType={quizType}
        setQuestionIdArr={setQuestionIdArr}
        questionIdArr={questionIdArr}
        nextMode={nextMode}
        setNextMode={setNextMode}
        imageId={imageId}
        state={state}
      />}
    {quizType === "obj"
      && <ObjQuestion
        quizTags={quizTags}
        quizType={quizType}
        setQuestionIdArr={setQuestionIdArr}
        questionIdArr={questionIdArr}
        nextMode={nextMode}
        setNextMode={setNextMode}
        imageId={imageId}
        state={state}
      />}
    {quizType === "tf"
      && <TFQuestion
        quizTags={quizTags}
        quizType={quizType}
        setQuestionIdArr={setQuestionIdArr}
        questionIdArr={questionIdArr}
        nextMode={nextMode}
        setNextMode={setNextMode}
        imageId={imageId}
        state={state}
      />}
  </SMakeQuestionContainer>);
}

export default MakeQuestionContainer;