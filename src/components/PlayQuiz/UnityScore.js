import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SUnityScore = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`

const Socre = styled.div`
  svg {
    font-size: 16px;
    cursor: pointer;
  }
`

const UnityScore = ({ quizList, setQuizList, setChange }) => {
  const onClickUnityScore = (score) => {
    const newQuizList = quizList.map((item) => { return { ...item, score } })
    localStorage.setItem("quizList", JSON.stringify(newQuizList))
    setQuizList(newQuizList)
    setChange(prev => !prev)
  }
  const checkUnityScore = (score) => {
    const scoreArr = quizList.map((item) => item.score)
    if (scoreArr.every((item) => item === score)) {
      return true
    } else {
      return false
    }
  }
  return (
    <SUnityScore>
      <Socre>
        <FontAwesomeIcon
          icon={checkUnityScore(5) ? faCheckCircle : faCircle}
          onClick={() => onClickUnityScore(5)} /> 5점
      </Socre>
      <Socre>
        <FontAwesomeIcon
          icon={checkUnityScore(10) ? faCheckCircle : faCircle}
          onClick={() => onClickUnityScore(10)} /> 10점
      </Socre>
      <Socre>
        <FontAwesomeIcon
          icon={checkUnityScore(20) ? faCheckCircle : faCircle}
          onClick={() => onClickUnityScore(20)} /> 20점
      </Socre>
      <Socre>
        <FontAwesomeIcon
          icon={checkUnityScore(30) ? faCheckCircle : faCircle}
          onClick={() => onClickUnityScore(30)} /> 30점
      </Socre>
    </SUnityScore>);
}

export default UnityScore;