import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const QuizSetting = styled.div`
  margin-left: 20px;
  cursor: pointer;
`

const GoldenBellSetting = ({ setQuizList, order, quizList, setChange }) => {
  const onClickCheckBox = (order) => {
    const index = quizList.findIndex((item) => item.order === order)
    let changedQuiz = {}
    if (quizList[index].consolation) {
      changedQuiz = { ...quizList[index], consolation: false }
    } else {
      changedQuiz = { ...quizList[index], consolation: true }
    }
    quizList.splice(index, 1, changedQuiz)
    localStorage.setItem("quizList", JSON.stringify(quizList))
    setQuizList(quizList)
    setChange(prev => !prev)
  }
  const checkConsolation = (order) => {
    const index = quizList.findIndex((item) => item.order === order)
    if (quizList[index].consolation) {
      return true
    } else {
      return false
    }
  }
  return (<QuizSetting>
    <FontAwesomeIcon icon={checkConsolation(order) ? faCheckSquare : faSquare} onClick={() => onClickCheckBox(order)} />
  </QuizSetting>);
}

export default GoldenBellSetting;