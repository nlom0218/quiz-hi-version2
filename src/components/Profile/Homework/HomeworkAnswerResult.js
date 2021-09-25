import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { compare } from '../../../sharedFn';

const ObjAnswerInput = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* justify-items: center; */
`

const ObjAnswerList = styled.div`
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`

const TFAnswerInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`

const TFAnswerList = styled.div`
  background-color: ${props => props.check ? props.theme.blueColor : "rgb(200, 200, 200, 0.2)"};
  color: ${props => props.check ? props.theme.bgColor : props.theme.fontColor};
  padding: 10px 0px;
  border-radius: 5px;
  text-align: center;
  transition: background-color 1s ease, color 1s ease;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
`

const SubAnswerInput = styled.input`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
  }
`

const HomeworkAnswerResult = ({ type, id, resultArr }) => {
  const processAnswer = (id, answer) => {
    const homeworkQuizArr = JSON.parse(localStorage.getItem("homeworkQuiz"))
    const questionObj = homeworkQuizArr.filter((item) => item.id === id)[0]
    if (type === "obj") {
      const answerArr = questionObj.answer.split(",")
      if (answerArr.includes(answer)) {
        return true
      } else {
        return false
      }
    } else if (type === "tf") {
      if (questionObj.answer === "" + answer) {
        return true
      } else {
        return false
      }
    } else if (type === "sub") {
      return questionObj.answer
    }
  }
  return (<React.Fragment>
    {type === "obj" && <ObjAnswerInput>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "1") ? faCheckCircle : faCircle}
        /> 1번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "2") ? faCheckCircle : faCircle}
        /> 2번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "3") ? faCheckCircle : faCircle}
        /> 3번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "4") ? faCheckCircle : faCircle}
        /> 4번
      </ObjAnswerList>
    </ObjAnswerInput>}
    {type === "tf" && <TFAnswerInput>
      <TFAnswerList check={processAnswer(id, true)} >○</TFAnswerList>
      <TFAnswerList check={processAnswer(id, false)} >✕</TFAnswerList>
    </TFAnswerInput>}
    {type === "sub" &&
      <Wrapper>
        <SubAnswerInput
          type="text"
          autoComplete="off"
          value={processAnswer(id)}
          readOnly={true}
        />
      </Wrapper>
    }
  </React.Fragment>);
}

export default HomeworkAnswerResult;