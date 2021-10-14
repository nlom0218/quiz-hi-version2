import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
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
  cursor: pointer;
  transition: background-color 0.6s ease, color 0.6s ease;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
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

const SubmitBtn = styled.input`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  color: ${props => props.theme.bgColor};
  text-align: center;
  border-radius: 5px;
  opacity: ${props => props.disabled ? "0.6" : "1"};
  transition: opacity 0.6s ease, background-color 1s ease, color 1s ease;
  cursor: pointer;
`

const ChangeMsg = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: tomato;
  animation: ${fadeIn} 0.4s ease;
  line-height: 160%;
`

const HomeworkAnswer = ({ type, register, id, isValid, setChange, watch }) => {
  const onClickAnswer = (id, answer) => {
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const questionObj = homeworkScore.filter((item) => item.id === id)[0]
    const existQuestion = homeworkScore.filter((item) => item.id !== id)
    if (type === "obj") {
      let newQuestionObj = {}
      if (!questionObj.answer) {
        newQuestionObj = { ...questionObj, answer: [answer] }
      } else {
        if (!questionObj.answer.includes(answer)) {
          const newAnswer = [...questionObj.answer, answer]
          newQuestionObj = { ...questionObj, answer: newAnswer }
        } else {
          const newAnswer = questionObj.answer.filter((item) => item !== answer)
          if (newAnswer.length === 0) {
            newQuestionObj = { id: questionObj.id, score: questionObj.score }
          } else {
            newQuestionObj = { ...questionObj, answer: newAnswer }
          }
        }
      }
      const newHomeworkSocre = [...existQuestion, newQuestionObj]
      localStorage.setItem("homeworkScore", JSON.stringify(newHomeworkSocre))
    }
    if (type === "tf") {
      const newQuestionObj = { ...questionObj, answer }
      const newHomeworkSocre = [...existQuestion, newQuestionObj]
      localStorage.setItem("homeworkScore", JSON.stringify(newHomeworkSocre))
    }
    setChange(prev => !prev)
  }
  const processAnswer = (id, answer) => {
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const questionObj = homeworkScore.filter((item) => item.id === id)[0]
    if (type === "sub") {
      if (questionObj.answer) {
        return true
      } else {
        return false
      }
    }
    if (type === "obj") {
      if (!questionObj.answer) {
        return false
      } else {
        if (!questionObj.answer.includes(answer)) {
          return false
        } else {
          return true
        }
      }
    }
    if (type === "tf") {
      if (questionObj.answer === answer) {
        return true
      } else {
        return false
      }
    }
  }
  const checkSubAnswer = () => {
    if (type !== "sub") {
      return
    }
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const questionObj = homeworkScore.filter((item) => item.id === id)[0]
    return questionObj.answer === watch("answer")
  }
  return (<React.Fragment>
    {type === "obj" && <ObjAnswerInput>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "1") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "1")}
        /> 1번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "2") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "2")}
        /> 2번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "3") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "3")}
        /> 3번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "4") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "4")}
        /> 4번
      </ObjAnswerList>
    </ObjAnswerInput>}
    {type === "tf" && <TFAnswerInput>
      <TFAnswerList onClick={() => onClickAnswer(id, "true")} check={processAnswer(id, "true")} >○</TFAnswerList>
      <TFAnswerList onClick={() => onClickAnswer(id, "false")} check={processAnswer(id, "false")} >✕</TFAnswerList>
    </TFAnswerInput>}
    {type === "sub" &&
      <Wrapper>
        <SubAnswerInput
          {...register(`answer`, { required: true })}
          type="text"
          autoComplete="off"
          placeholder="정답을 입력해 주세요."
        />
        <SubmitBtn
          value={processAnswer(id) && checkSubAnswer() ? "저장됨" : "저장"}
          type="submit"
          disabled={!isValid}
        />
        {!checkSubAnswer() && <ChangeMsg>
          <div>정답을 수정하였습니다. 위의 저장 버튼을 다시 눌러주세요.</div>
          <div>새로운 정답이 저장되면 해당 메시지는 사라집니다.</div>
        </ChangeMsg>}
      </Wrapper>
    }
  </React.Fragment>);
}

export default HomeworkAnswer;