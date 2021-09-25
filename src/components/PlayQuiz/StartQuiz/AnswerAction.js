import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import Marking from './Marking';
import { ActionBox, ActionContent, BottomLine, LeaveBtn, NextStep } from './sharedStyles';

const AnswerAction = ({ question, questionNum, totalNum, setQuestionNum, setAction, student, setStduent, fontSize }) => {
  const [markingStudent, setMarkingStudent] = useState(false)
  const [passStudentArr, setPassStudentArr] = useState(JSON.parse(localStorage.getItem("joinStudent")).filter((item) => item.pass === true).map((item) => item.id))
  const [failStudentArr, setFailStudentArr] = useState(JSON.parse(localStorage.getItem("joinStudent")).filter((item) => item.pass === false).map((item) => item.id))
  const quizMode = localStorage.getItem("selectMode")
  const processAnswer = () => {
    if (question.type === "tf") {
      if (question.answer === "false") {
        return "✕"
      } else {
        return "○"
      }
    }
    return question.answer
  }
  const onClickNextBtn = () => {
    if (questionNum === totalNum) {
      return
    }
    const newQuestionNum = questionNum + 1
    localStorage.setItem("questionNum", newQuestionNum)
    setQuestionNum(newQuestionNum)
    setAction(null)
    if (localStorage.getItem("selectMode") === "goldenBell") {
      const newStudent = student.map((item) => {
        if (passStudentArr.includes(item.id)) {
          return { ...item, pass: true }
        } else {
          return { ...item, pass: false }
        }
      })
      localStorage.setItem("joinStudent", JSON.stringify(newStudent))
      setStduent(newStudent)
    } else {
      const newStudent = student.map((item) => {
        if (passStudentArr.includes(item.id)) {
          return { ...item, score: item.score + question.score }
        } else {
          return { ...item }
        }
      })
      localStorage.setItem("joinStudent", JSON.stringify(newStudent))
      setStduent(newStudent)
    }
  }
  const onCLickLeaveBtn = () => {
    setAction(null)
  }
  const onClickStudentBtn = () => {
    setMarkingStudent(prev => !prev)
  }
  const onClickResultBtn = () => {
    if (lastQuestionBtn() === true) {
      if (window.confirm("퀴즈를 종료하시겠습니까?")) {
        localStorage.removeItem("startQuiz")
        localStorage.removeItem("joinStudent")
        localStorage.removeItem("questionNum")
        window.location.reload()
      }
      return
    }
    setAction("result")
    if (localStorage.getItem("selectMode") === "goldenBell") {
      const newStudent = student.map((item) => {
        if (passStudentArr.includes(item.id)) {
          return { ...item, pass: true }
        } else {
          return { ...item, pass: false }
        }
      })
      localStorage.setItem("joinStudent", JSON.stringify(newStudent))
      setStduent(newStudent)
    } else {
      const newStudent = student.map((item) => {
        if (passStudentArr.includes(item.id)) {
          return { ...item, score: item.score + question.score }
        } else {
          return { ...item }
        }
      })
      localStorage.setItem("joinStudent", JSON.stringify(newStudent))
      setStduent(newStudent)
    }
  }
  const lastQuestionBtn = () => {
    if (quizMode === "nomal") {
      return true
    } else if (student.length === 0) {
      return true
    } else {
      return false
    }
  }
  return (<ActionBox>
    <LeaveBtn><FontAwesomeIcon icon={faTimes} onClick={onCLickLeaveBtn} /></LeaveBtn>
    {!markingStudent && <ActionContent fontSize={fontSize}>{processAnswer()}</ActionContent>}
    {markingStudent &&
      <Marking
        student={student}
        passStudentArr={passStudentArr}
        setPassStudentArr={setPassStudentArr}
        question={question}
        failStudentArr={failStudentArr}
        setFailStudentArr={setFailStudentArr}
        questionNum={questionNum}
        totalNum={totalNum}
      />
    }
    <NextStep>
      {student.length !== 0 &&
        <div>
          {markingStudent ?
            <div onClick={onClickStudentBtn}>정답 보기</div> :
            <div onClick={onClickStudentBtn}><span>다음 문제로 넘어가기 전 맞춘 학생을 꼭 선택하세요.</span>맞춘 학생</div>
          }
        </div>
      }
      {questionNum !== totalNum ?
        <div onClick={onClickNextBtn}>다음 문제</div>
        :
        <div onClick={onClickResultBtn}>{lastQuestionBtn() ? "퀴즈 종료하기" : "결과 보기"}</div>
      }
    </NextStep>
    <BottomLine></BottomLine>
  </ActionBox>);
}

export default AnswerAction;